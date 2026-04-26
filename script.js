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

// ———————————— MOBILE NAV ————————————
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
