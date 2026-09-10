import './styles/main.css';
import {
  paintHeroField,
  paintHeroFrame,
  paintProjectFrame,
  paintAmbientField,
  paintSectorPreview,
} from './lib/engineering-field.js';
import {
  initNav,
  initFAQ,
  initReveal,
  initSectors,
  initForm,
  initYear,
} from './lib/interactions.js';

const painters = {
  'hero-field': (svg) => paintHeroField(svg),
  'hero-frame': (svg) => paintHeroFrame(svg),
  'ambient': (svg) => paintAmbientField(svg),
  'project': (svg) => paintProjectFrame(svg, svg.dataset.variant || 'infra'),
  'sector': (svg) => paintSectorPreview(svg, svg.dataset.sector || ''),
};

function paint(svg) {
  if (svg.dataset.painted === 'true') return;
  const kind = svg.dataset.paint;
  const fn = painters[kind];
  if (fn) {
    fn(svg);
    svg.dataset.painted = 'true';
  }
}

/**
 * Paint above-the-fold SVGs immediately; defer the rest until near viewport
 * via IntersectionObserver — cuts initial JS work and improves TTI on pages
 * that carry 15+ procedural SVGs (home).
 */
function paintAll() {
  const all = document.querySelectorAll('svg[data-paint]');
  if (!('IntersectionObserver' in window)) {
    all.forEach(paint);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        paint(entry.target);
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: '400px 0px' });

  all.forEach((svg) => {
    // Paint hero and any SVG already in the first viewport eagerly.
    const rect = svg.getBoundingClientRect();
    const inFirstFold = rect.top < window.innerHeight * 1.2;
    if (svg.dataset.paint === 'hero-field' || svg.dataset.paint === 'hero-frame' || inFirstFold) {
      paint(svg);
    } else {
      io.observe(svg);
    }
  });
}

/**
 * Prefetch internal HTML on nav-link hover — makes cross-page navigation
 * feel instant without the cost of prefetching every route up front.
 */
function initPrefetch() {
  if (!('requestIdleCallback' in window)) return;
  const seen = new Set();
  const prefetch = (href) => {
    if (seen.has(href)) return;
    seen.add(href);
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);
  };
  document.querySelectorAll('a[href$=".html"]').forEach((a) => {
    a.addEventListener('mouseenter', () => prefetch(a.href), { once: true, passive: true });
    a.addEventListener('focus', () => prefetch(a.href), { once: true, passive: true });
  });
}

function boot() {
  paintAll();
  initNav();
  initFAQ();
  initReveal();
  initSectors();
  initForm();
  initYear();
  initPrefetch();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
