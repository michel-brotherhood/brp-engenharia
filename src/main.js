// Flip no-js → js as early as possible so the .reveal CSS knows JS is
// alive. If JS never runs (or fails), CSS keeps content visible by default.
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

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
import { heroImage, ambientImage, imageForVariant } from './data/images.js';

/**
 * Insere <img> como camada de atmosfera atrás do SVG técnico.
 * Se a imagem falhar ao carregar (rede, 404), remove-se sozinha e o
 * SVG procedural fica visível como fallback — o site não quebra.
 */
function injectImage(svg, imageData, extraClass) {
  const parent = svg.parentElement;
  if (!parent || parent.querySelector('img[data-atmos]')) return;
  const img = document.createElement('img');
  img.dataset.atmos = 'true';
  img.src = imageData.src;
  img.alt = imageData.alt || '';
  img.decoding = 'async';
  if (imageData.eager) {
    img.loading = 'eager';
    img.setAttribute('fetchpriority', 'high');
  } else {
    img.loading = 'lazy';
  }
  if (imageData.width) img.width = imageData.width;
  if (imageData.height) img.height = imageData.height;
  img.addEventListener('error', () => img.remove(), { once: true });
  parent.classList.add('has-image');
  if (extraClass) parent.classList.add(extraClass);
  parent.insertBefore(img, svg);
}

const painters = {
  'hero-field': (svg) => paintHeroField(svg),
  'hero-frame': (svg) => {
    injectImage(svg, heroImage);
    paintHeroFrame(svg);
  },
  'ambient': (svg) => {
    injectImage(svg, ambientImage);
    paintAmbientField(svg);
  },
  'project': (svg) => {
    const variant = svg.dataset.variant || 'infra';
    injectImage(svg, imageForVariant(variant));
    paintProjectFrame(svg, variant);
  },
  'sector': (svg) => {
    // Reuse the project image mapping for the sector preview atmosphere.
    const slug = svg.dataset.sector || '';
    const map = {
      'torres-comerciais-e-residenciais': 'commercial',
      'fotovoltaicas': 'solar',
      'obras-industriais-de-infraestrutura-e-galpoes': 'industrial',
      'hoteis': 'commercial',
      'hospitais-e-clinicas': 'hospital',
      'escolas': 'residential',
      'shoppings-e-lojas': 'commercial',
      'residencias-alto-padrao': 'residential',
      'concessionarias': 'commercial',
      'restauracoes': 'residential',
      'restaurantes': 'commercial',
    };
    injectImage(svg, imageForVariant(map[slug] || 'commercial'));
    paintSectorPreview(svg, slug);
  },
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
  const origin = window.location.origin;
  document.querySelectorAll('a[href^="/"]').forEach((a) => {
    // Only same-origin, non-hash, non-mailto/tel routes worth prefetching
    if (!a.href.startsWith(origin) || a.hash) return;
    if (a.getAttribute('href') === '/') return;
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
