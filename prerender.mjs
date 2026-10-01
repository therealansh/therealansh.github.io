// Refreshes the static SEO layer in index.html from content.json:
//   - #prerender: the page as the runtime renders it, for crawlers, link previews and no-JS readers
//   - JSON-LD (Person, ProfilePage, WebSite, ScholarlyArticle)
//   - sitemap.xml (with image and video entries) and llms.txt
// Run after editing content.json:  node prerender.mjs   (needs Google Chrome; override with CHROME=/path)
import { createServer } from 'node:http';
import { readFile, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { extname, join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SITE = 'https://therealansh.com/';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.gif': 'image/gif', '.png': 'image/png', '.jpg': 'image/jpeg' };

const between = (html, tag, body) => {
  const re = new RegExp(`(<!-- ${tag}:start -->)[\\s\\S]*?(<!-- ${tag}:end -->)`);
  if (!re.test(html)) throw new Error(`marker ${tag} missing in index.html`);
  return html.replace(re, `$1${body}$2`);
};

// 1. Render the page with the real runtime in headless Chrome.
const server = createServer(async (req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  try {
    const body = await readFile(join(root, p === '/' ? 'index.html' : p));
    res.writeHead(200, { 'content-type': types[extname(p)] || 'text/html' }).end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const url = `http://127.0.0.1:${server.address().port}/?prerender`;
const dom = await new Promise((ok, fail) => execFile(CHROME,
  ['--headless=new', '--disable-gpu', '--virtual-time-budget=20000', '--dump-dom', url],
  { maxBuffer: 1 << 26 }, (e, out) => e ? fail(e) : ok(out)));
server.close();

const open = '<div id="dc-root">';
const start = dom.indexOf(open), end = dom.indexOf('<!-- dc-root:end -->');
if (start < 0 || end < start) throw new Error('render failed: #dc-root not found before the dc-root:end marker');
const raw = dom.slice(start + open.length, end).trim().replace(/<\/div>$/, '');
if (!/<h1[\s>]/.test(raw) || /\{\{|sc-missing|sc-unresolved/.test(raw)) throw new Error('render incomplete: no <h1> or unresolved {{ }}');
// Drop runtime-only markup; the unstyled interpolation spans and template ids change nothing visually.
const inner = raw.replace(/ data-dc-tpl="\d+"/g, '').replace(/<span class="sc-interp">([^<]*)<\/span>/g, '$1');

// 2. Structured data from content.json.
const d = JSON.parse(await readFile(join(root, 'content.json'), 'utf8'));
const P = d.profile, pub = d.publication || {};
const abs = p => new URL(p, SITE).href;
const school = e => ({ '@type': 'CollegeOrUniversity', name: e.school, ...(e.url ? { url: e.url } : {}) });
const skills = [...(d.stack.languages || []).map(l => l.name), ...(d.stack.tools || [])];
const person = {
  '@type': 'Person', '@id': SITE + '#person',
  name: P.name, givenName: P.name.split(' ')[0], familyName: P.name.split(' ').slice(1).join(' '), alternateName: P.handle,
  url: SITE, mainEntityOfPage: { '@id': SITE + '#profile' },
  image: [P.photo, P.avatar].filter(Boolean).map(abs),
  jobTitle: d.hero.title,
  description: d.hero.lede,
  email: 'mailto:' + P.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Stony Brook', addressRegion: 'NY', addressCountry: 'US' },
  // current school: the program ends this year or later
  affiliation: (d.education || []).filter(e => +((String(e.dates).match(/(\d{4})\D*$/) || [])[1]) >= new Date().getFullYear()).map(school),
  alumniOf: (d.education || []).map(school),
  hasOccupation: { '@type': 'Occupation', name: d.hero.title, occupationLocation: { '@type': 'City', name: 'New York' }, skills: skills.join(', ') },
  award: (d.highlights || []).filter(h => /winner|award/i.test(h)),
  knowsAbout: ['Distributed systems', 'Backend engineering', 'Identity and authentication', 'Concurrency control', ...skills],
  sameAs: [P.github, P.linkedin, P.orcid, ...(P.sameAs || [])].filter(Boolean),
};
const projects = (d.projects || []).map(p => {
  const repo = /github\.com\/[^/]+\/[^/]+/.test(p.link || '');
  return {
    '@type': repo ? 'SoftwareSourceCode' : 'CreativeWork', '@id': SITE + '#' + p.id,
    name: p.longTitle || p.title, alternateName: p.title, description: p.intro, keywords: (p.tags || []).join(', '),
    author: { '@id': SITE + '#person' },
    ...(repo ? { codeRepository: p.link, programmingLanguage: p.pills || [] } : {}),
    ...(p.video ? { video: { '@id': SITE + '#' + p.id + '-reel' } } : {}),
    ...(p.poster ? { image: abs(p.poster) } : {}),
  };
});
const videos = (d.projects || []).filter(p => p.video).map(p => ({
  '@type': 'VideoObject', '@id': SITE + '#' + p.id + '-reel', name: `${p.title}: project reel`, description: p.intro,
  thumbnailUrl: abs(p.poster), contentUrl: abs(p.video), uploadDate: '2026-10-01', duration: 'PT12S',
  creator: { '@id': SITE + '#person' }, about: { '@id': SITE + '#' + p.id },
}));
const coAuthors = String(pub.authors || '').split(',').map(a => a.trim()).filter(a => a && !/tyagi/i.test(a));
const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': SITE + '#website', url: SITE, name: P.name, alternateName: [P.handle, 'therealansh.com'], inLanguage: 'en-US', publisher: { '@id': SITE + '#person' } },
    { '@type': 'ProfilePage', '@id': SITE + '#profile', url: SITE, name: `${P.name} — ${d.hero.title}`, description: d.hero.sub || d.hero.lede, inLanguage: 'en-US', isPartOf: { '@id': SITE + '#website' }, mainEntity: { '@id': SITE + '#person' }, primaryImageOfPage: abs('assets/og.jpg'), dateModified: new Date().toISOString().slice(0, 10) },
    person,
    ...projects,
    ...videos,
    ...(pub.doi ? [{ '@type': 'ScholarlyArticle', '@id': SITE + '#publication', headline: pub.title, name: pub.title, url: pub.url, sameAs: pub.url,
      author: [{ '@id': SITE + '#person' }, ...coAuthors.map(name => ({ '@type': 'Person', name }))],
      datePublished: pub.year, publisher: { '@type': 'Organization', name: 'Springer' }, isPartOf: pub.venue, description: pub.note,
      identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: pub.doi } }] : []),
  ],
};
const ldJson = JSON.stringify(ld).replace(/</g, '\\u003c');

// 3. Write.
let html = await readFile(join(root, 'index.html'), 'utf8');
html = between(html, 'prerender', `\n<div id="prerender">${inner}</div>\n`);
html = between(html, 'ld', `<script type="application/ld+json">${ldJson}</script>`);
await writeFile(join(root, 'index.html'), html);
const imgs = [...new Set([P.avatar, P.photo, ...((d.photos || [])[0] || { items: [] }).items.map(p => p.src)])];
const xmlEsc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const vidXml = (d.projects || []).filter(p => p.video).map(p => `<video:video><video:thumbnail_loc>${new URL(p.poster, SITE).href}</video:thumbnail_loc><video:title>${xmlEsc(p.title + ': project reel')}</video:title><video:description>${xmlEsc(p.intro)}</video:description><video:content_loc>${new URL(p.video, SITE).href}</video:content_loc><video:duration>12</video:duration></video:video>`).join('');
const imgXml = imgs.map(src => `<image:image><image:loc>${new URL(src, SITE).href}</image:loc></image:image>`).join('');
await writeFile(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url><loc>${SITE}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>${imgXml}${vidXml}</url>
</urlset>
`);
// llms.txt: a plain-text profile for AI search engines and assistants.
const strip = t => String(t || '').replace(/\*\*?/g, '');
await writeFile(join(root, 'llms.txt'), [
  `# ${P.name}`, '',
  `> ${P.name} (${P.handle}) is a ${d.hero.title.toLowerCase()}. ${d.hero.sub || ''} ${d.hero.status}.`, '',
  strip(d.hero.lede), '',
  '## Experience',
  ...(d.experience || []).map(x => `- ${x.role}, ${x.company} (${x.heroLabel.split(' · ').pop()}): ${x.title}. ${(x.bullets || []).map(strip).join(' ')}`), '',
  '## Measured results',
  ...(d.metrics || []).map(m => `- ${m.label} at ${m.where}: ${m.from} to ${m.to} (${m.conditions})`), '',
  '## Projects',
  ...(d.projects || []).map(p => `- [${p.longTitle || p.title}](${p.link}): ${p.intro} ${(p.bullets || []).map(strip).join(' ')}`), '',
  '## Education',
  ...(d.education || []).map(e => `- ${e.school}: ${e.degree}, ${e.detail} (${e.dates})`), '',
  '## Publication',
  `- ${pub.authors}, "${pub.title}," ${pub.venue}. DOI ${pub.doi}`, '',
  '## Recognition',
  ...(d.highlights || []).map(h => `- ${h}`), '',
  '## Open source',
  `- ${d.openSource.count} ${d.openSource.label}: ${(d.openSource.repos || []).map(r => r.name).join(', ')}`, '',
  '## Contact',
  `- Email: ${P.email}`, `- Website: ${SITE}`, `- GitHub: ${P.github}`, `- LinkedIn: ${P.linkedin}`, `- ORCID: ${P.orcid}`, `- Résumé: ${abs(P.resume)}`, '',
].join('\n'));
console.log(`prerendered ${(inner.length / 1024).toFixed(1)} KB, JSON-LD ${ld['@graph'].length} nodes`);
