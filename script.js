const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const moonIcon = document.getElementById('moonIcon');
const sunIcon = document.getElementById('sunIcon');
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileClose = document.getElementById('mobileClose');
const mobilePanel = document.getElementById('mobile-panel');
const mobileOverlay = document.getElementById('mobile-overlay');
const hamburger = document.getElementById('hamburger');
let isDark = localStorage.getItem('theme') !== 'light';

function applyTheme() {
  if (isDark) { body.classList.remove('light'); body.classList.add('dark'); moonIcon.classList.remove('hidden'); sunIcon.classList.add('hidden'); }
  else { body.classList.remove('dark'); body.classList.add('light'); sunIcon.classList.remove('hidden'); moonIcon.classList.add('hidden'); }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
applyTheme();
themeToggle.addEventListener('click', () => { isDark = !isDark; applyTheme(); });

function openMobile() { mobilePanel.classList.add('open'); mobileOverlay.classList.add('open'); hamburger.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closeMobile() { mobilePanel.classList.remove('open'); mobileOverlay.classList.remove('open'); hamburger.classList.remove('active'); document.body.style.overflow = ''; }
window.closeMobile = closeMobile;
mobileBtn.addEventListener('click', openMobile);
mobileOverlay.addEventListener('click', closeMobile);
document.querySelectorAll('#mobile-panel a').forEach(l => l.addEventListener('click', closeMobile));

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(s => { const top = s.offsetTop - 120; if (window.scrollY >= top) current = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  if (window.__syncNavIndicator) window.__syncNavIndicator();
}

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  updateActiveLink();
});
updateActiveLink();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => { bar.style.width = bar.dataset.w; });
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

const c = document.createElement('canvas');
const ctx = c.getContext('2d');
document.getElementById('particles').appendChild(c);
c.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
let pts = [];
function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
window.addEventListener('resize', resize);
resize();
for (let i = 0; i < 50; i++) pts.push({ x: Math.random() * c.width, y: Math.random() * c.height, r: Math.random() * 1.5 + 0.5, dx: (Math.random() - 0.5) * 0.2, dy: (Math.random() - 0.5) * 0.2 });
/* Types "Muhammad Faizan" one letter at a time, with a caret that follows along. */
(function () {
  const el = document.getElementById('heroName');
  if (!el) return;

  const lines = [...el.querySelectorAll('span')];
  const chars = [];

  lines.forEach(line => {
    const text = line.textContent;
    line.textContent = '';
    [...text].forEach(ch => {
      const s = document.createElement('span');
      s.className = 'char-reveal';
      s.textContent = ch;
      line.appendChild(s);
      chars.push(s);
    });
  });
  el.style.opacity = '1';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    chars.forEach(s => s.classList.add('show'));
    return;
  }

  // Every letter is already in the DOM (just invisible), so the line never
  // reflows while typing — the caret is inserted right after the newest letter.
  const caret = document.createElement('i');
  caret.className = 'type-caret';

  const STEP = 95;
  let timers = [];

  function play() {
    timers.forEach(clearTimeout);
    timers = [];
    caret.classList.remove('done');
    chars.forEach(s => s.classList.remove('show'));
    void el.offsetWidth;                         // restart the CSS animations

    chars.forEach((s, i) => {
      timers.push(setTimeout(() => {
        s.classList.add('show');
        s.insertAdjacentElement('afterend', caret);
      }, i * STEP));
    });
    timers.push(setTimeout(() => caret.classList.add('done'), chars.length * STEP + 1500));
  }

  play();

  // Replay whenever the hero scrolls back into view.
  const hero = document.getElementById('hero');
  if (hero) {
    let away = false;
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) { away = true; }
        else if (away) { away = false; play(); }
      });
    }, { threshold: 0.35 }).observe(hero);
  }
})();

function anim() {
  ctx.clearRect(0, 0, c.width, c.height);
  const dm = body.classList.contains('dark');
  ctx.fillStyle = dm ? 'rgba(99,102,241,0.3)' : 'rgba(79,70,229,0.2)';
  pts.forEach(p => { p.x += p.dx; p.y += p.dy; if (p.x < 0 || p.x > c.width) p.dx *= -1; if (p.y < 0 || p.y > c.height) p.dy *= -1; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill(); });
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) { const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy); if (d < 100) { ctx.strokeStyle = dm ? `rgba(99,102,241,${0.06 * (1 - d / 100)})` : `rgba(79,70,229,${0.04 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); } }
requestAnimationFrame(anim);
  }
  anim();

  // Scroll progress bar
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progressBar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Back to top
  const toTopBtn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTopBtn.classList.toggle('show', window.scrollY > 500);
  }, { passive: true });
  toTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Button shine sweep
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(b => {
    if (!b.querySelector('.btn-sweep')) {
      const s = document.createElement('span');
      s.className = 'btn-sweep';
      b.appendChild(s);
    }
  });

  // Staggered reveal for project cards
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children).filter(el => el.classList.contains('reveal'));
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx % 3) * 0.12 + 's';
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // 3D tilt on project cards
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
  }

/* =========================================================
   Scroll-driven 3D layer: floating photo shards + avatars
   ========================================================= */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.querySelector('#photo3d .p3d-stage');
  const flips = Array.from(document.querySelectorAll('.flip3d-orbit'));
  if (reduced || (!stage && !flips.length)) return;

  const PHOTO = 'IMG-20250126-WA0018.jpg';

  // x / y are percentages of viewport width / height, measured from the centre.
  const DEFS = [
    { x: -40, y: -30, size: 190, z: -520, rot: -12, speed: 0.55, op: 0.30, blur: 2.5 },
    { x: 41, y: 8, size: 210, z: -460, rot: 10, speed: 0.42, op: 0.28, blur: 2 },
    { x: -33, y: 42, size: 150, z: -300, rot: 8, speed: 0.75, op: 0.22, blur: 1.2 },
    { x: 36, y: -46, size: 130, z: -240, rot: -16, speed: 0.85, op: 0.20, blur: 1 },
    { x: -46, y: 12, size: 110, z: -140, rot: 14, speed: 1.00, op: 0.16, blur: 0 },
    { x: 47, y: 40, size: 120, z: -120, rot: -9, speed: 1.10, op: 0.15, blur: 0 },
    { x: -18, y: -58, size: 95, z: -620, rot: 18, speed: 0.35, op: 0.26, blur: 3 },
    { x: 20, y: 58, size: 100, z: -580, rot: -20, speed: 0.38, op: 0.25, blur: 3 }
  ];

  const shards = [];

  function buildShards() {
    if (!stage) return;
    stage.innerHTML = '';
    shards.length = 0;
    const w = window.innerWidth;
    const count = w < 640 ? 4 : w < 1024 ? 6 : DEFS.length;
    const scale = w < 640 ? 0.6 : w < 1024 ? 0.8 : 1;

    DEFS.slice(0, count).forEach(d => {
      const el = document.createElement('figure');
      el.className = 'p3d-shard';
      const size = Math.round(d.size * scale);
      el.style.width = size + 'px';
      el.style.height = Math.round(size * 1.15) + 'px';
      if (d.blur) el.style.filter = 'blur(' + d.blur + 'px)';

      const img = document.createElement('img');
      img.src = PHOTO;
      img.alt = '';
      img.decoding = 'async';
      el.appendChild(img);

      const tint = document.createElement('span');
      tint.className = 'p3d-tint';
      el.appendChild(tint);

      const edge = document.createElement('span');
      edge.className = 'p3d-edge';
      el.appendChild(edge);

      stage.appendChild(el);
      shards.push({ el, d, w: size, h: Math.round(size * 1.15) });
    });
  }

  let targetScroll = window.scrollY;
  let smoothScroll = targetScroll;
  let lastSmooth = smoothScroll;
  let velocity = 0;
  let tmx = 0, tmy = 0, mx = 0, my = 0;

  window.addEventListener('scroll', () => { targetScroll = window.scrollY; }, { passive: true });

  // Only rebuild when the responsive bucket actually changes (mobile URL-bar
  // resizes fire constantly and would otherwise thrash the DOM).
  let bucket = null;
  function bucketOf(w) { return w < 640 ? 's' : w < 1024 ? 'm' : 'l'; }
  window.addEventListener('resize', () => {
    const b = bucketOf(window.innerWidth);
    if (b !== bucket) { bucket = b; buildShards(); }
  });

  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', e => {
      tmx = e.clientX / window.innerWidth - 0.5;
      tmy = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });
  }

  const mod = (n, m) => ((n % m) + m) % m;

  function frame() {
    smoothScroll += (targetScroll - smoothScroll) * 0.09;
    velocity = smoothScroll - lastSmooth;
    lastSmooth = smoothScroll;
    mx += (tmx - mx) * 0.06;
    my += (tmy - my) * 0.06;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const cx = W / 2;
    const cy = H / 2;
    const range = H * 2.4;

    if (stage) {
      stage.style.transform =
        'rotateX(' + (velocity * 0.06).toFixed(3) + 'deg) rotateY(' + (mx * 4).toFixed(3) + 'deg)';

      for (const s of shards) {
        const d = s.d;
        const depth = 1 - d.z / -700;                       // 0 = far, ~1 = near
        const baseY = (d.y / 100) * H;
        const yy = mod(baseY - smoothScroll * d.speed + range / 2, range) - range / 2;

        const px = cx + (d.x / 100) * W - s.w / 2 + mx * 90 * depth;
        const py = cy + yy - s.h / 2 + my * 60 * depth;

        const spinY = d.rot + smoothScroll * d.speed * 0.035;
        const spinX = -velocity * 0.22 * d.speed;
        const roll = d.rot * 0.4 + Math.sin((smoothScroll + baseY) * 0.0016) * 5;

        const edge = Math.abs(yy) / (range / 2);
        const fade = edge > 0.55 ? Math.max(0, 1 - (edge - 0.55) / 0.45) : 1;

        s.el.style.transform =
          'translate3d(' + px.toFixed(2) + 'px,' + py.toFixed(2) + 'px,' + d.z + 'px)' +
          ' rotateX(' + spinX.toFixed(2) + 'deg)' +
          ' rotateY(' + spinY.toFixed(2) + 'deg)' +
          ' rotateZ(' + roll.toFixed(2) + 'deg)';
        s.el.style.opacity = (d.op * fade).toFixed(3);
      }
    }

    // Avatars keep spinning gently as the page scrolls.
    for (const f of flips) {
      f.style.setProperty('--spin', (smoothScroll * 0.05).toFixed(2) + 'deg');
      f.style.setProperty('--tiltx', (my * 10).toFixed(2) + 'deg');
    }

    requestAnimationFrame(frame);
  }

  bucket = bucketOf(window.innerWidth);
  buildShards();
  requestAnimationFrame(frame);
})();


/* Slides one gradient pill between the desktop nav links. */
(function () {
  const wrap = document.getElementById('navLinks');
  const pill = document.getElementById('navIndicator');
  if (!wrap || !pill) return;

  const links = [...wrap.querySelectorAll('.nav-link')];

  function moveTo(el) {
    if (!el) { pill.style.opacity = '0'; return; }
    pill.style.width = el.offsetWidth + 'px';
    pill.style.transform = 'translate(' + el.offsetLeft + 'px, -50%)';
    pill.style.opacity = '1';
  }

  function syncToActive() { moveTo(wrap.querySelector('.nav-link.active')); }
  window.__syncNavIndicator = syncToActive;

  links.forEach(l => l.addEventListener('mouseenter', () => moveTo(l)));
  wrap.addEventListener('mouseleave', syncToActive);
  window.addEventListener('resize', syncToActive);
  // Tailwind is a CDN runtime, so link widths are only final once it has painted.
  window.addEventListener('load', syncToActive);

  syncToActive();
})();
