# therealansh.github.io

Personal site of Ansh Tyagi, live at https://therealansh.com

## Editing

1. Edit `content.json` (all copy, metrics, roles, projects, photos, stack).
2. Run `node prerender.mjs`. It regenerates everything search engines read:
   - the static copy of the page inside `index.html` (what crawlers, link previews and no-JS readers see)
   - the JSON-LD structured data (Person, ProfilePage, projects, videos, publication)
   - `sitemap.xml` (with image and video entries) and `llms.txt` (plain-text profile for AI search)
3. Commit and push.

`prerender.mjs` needs Google Chrome (set `CHROME=/path/to/chrome` if it isn't in /Applications).

To link more of your profiles (dev.to, Codeforces, Google Scholar…), add their URLs to `profile.sameAs` in `content.json` and re-run the script.

Local preview: `python3 -m http.server 8765`, then open http://localhost:8765
