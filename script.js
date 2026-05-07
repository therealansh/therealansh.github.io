// ———————————— Live clock ————————————
function updateClock() {
  const now = new Date();
  const ny = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hh = String(ny.getHours()).padStart(2, '0');
  const mm = String(ny.getMinutes()).padStart(2, '0');
  const clock = document.getElementById('clock');
  if (clock) clock.textContent = `${hh}:${mm}`;
  const day = document.getElementById('day');
  if (day) {
    day.textContent = ny.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', timeZone: 'America/New_York'
    });
  }
}
updateClock();
setInterval(updateClock, 30 * 1000);

// ———————————— Smooth-scroll for nav ————————————
document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ———————————— Cursor-tilt parallax (subtle) ————————————
document.querySelectorAll('.card:not(.contact-card):not(.hero)').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (y - 0.5) * -2;
    const ry = (x - 0.5) * 2;
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ———————————— MODAL ————————————
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modalBody');
const templates = document.querySelectorAll('#modal-data template');
const tplMap = new Map();
templates.forEach(t => tplMap.set(t.dataset.id, t));

function openModal(id) {
  const tpl = tplMap.get(id);
  if (!tpl) return;
  modalBody.innerHTML = '';
  modalBody.appendChild(tpl.content.cloneNode(true));
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('[data-open]').forEach(el => {
  el.addEventListener('click', () => openModal(el.dataset.open));
});
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeModal);
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// ———————————— PHOTOS WIDGET ————————————
// To add photos, drop new entries into PHOTO_LIBRARY under the matching category.
// Each entry: { src, caption, when }. The widget builds slides from this list.
const PHOTO_LIBRARY = {
  travel: [
    { src: 'assets/photo-2.png', caption: 'Mt. Rainier',  when: '3 weeks ago' },
    { src: 'assets/photo-1.png', caption: 'Puget Sound',  when: '1 month ago' },
      { src: 'assets/photo-3.png', caption: 'Golden hour',  when: '2 months ago' },
  ],
  love: [
     { src: 'assets/photo-4.png', caption: 'Long Island',  when: '6 months ago' },
  ],
  food: [
      { src: 'assets/photo-5.png', caption: 'Pasta night',  when: '2 months ago' },
  ],
};

const photoFrame = document.getElementById('photoFrame');
if (photoFrame) {
  const whenEl = document.getElementById('photoWhen');
  const captionEl = document.getElementById('photoCaption');
  const tabs = Array.from(photoFrame.querySelectorAll('.photo-tab'));
  const overlay = photoFrame.querySelector('.photo-overlay');
  let category = 'travel';
  let idx = 0;
  let slides = []; // DOM elements for current category
  let autoTimer = null;

  function buildSlides(cat) {
    // Remove any existing slides
    photoFrame.querySelectorAll('.photo-slide').forEach(s => s.remove());
    const list = PHOTO_LIBRARY[cat] || [];
    slides = list.map((item, i) => {
      const el = document.createElement('div');
      el.className = 'photo-slide' + (i === 0 ? ' active' : '');
      el.style.backgroundImage = `url('${item.src}')`;
      el.dataset.caption = item.caption || '';
      el.dataset.when = item.when || '';
      // Insert before overlay so overlay/tabs stay on top
      photoFrame.insertBefore(el, overlay);
      return el;
    });
  }
  function render() {
    if (!slides.length) {
      if (whenEl) whenEl.textContent = '';
      if (captionEl) captionEl.textContent = 'No photos';
      return;
    }
    idx = ((idx % slides.length) + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    const cur = slides[idx];
    if (whenEl) whenEl.textContent = cur.dataset.when || '';
    if (captionEl) captionEl.textContent = cur.dataset.caption || '';
  }
  function setCategory(cat) {
    category = cat;
    idx = 0;
    buildSlides(cat);
    tabs.forEach(t => {
      const on = t.dataset.cat === cat;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', String(on));
    });
    render();
  }
  tabs.forEach(t => t.addEventListener('click', (e) => {
    e.stopPropagation();
    setCategory(t.dataset.cat);
  }));
  // Auto-advance
  autoTimer = setInterval(() => {
    if (slides.length > 1) { idx += 1; render(); }
  }, 5000);

  setCategory('travel');
}
const navToggle = document.querySelector('.nav-toggle');
const navDrawer = document.getElementById('navDrawer');
const navScrim = document.getElementById('navScrim');
function setDrawer(open) {
  if (!navDrawer || !navToggle) return;
  navDrawer.classList.toggle('open', open);
  if (navScrim) navScrim.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navDrawer.setAttribute('aria-hidden', String(!open));
}
if (navToggle) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navDrawer.classList.contains('open');
    setDrawer(!isOpen);
  });
}
if (navDrawer) {
  navDrawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => setDrawer(false));
  });
}
if (navScrim) {
  navScrim.addEventListener('click', () => setDrawer(false));
}
// Close on scroll
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  if (Math.abs(window.scrollY - lastScrollY) > 8 && navDrawer && navDrawer.classList.contains('open')) {
    setDrawer(false);
  }
  lastScrollY = window.scrollY;
}, { passive: true });
