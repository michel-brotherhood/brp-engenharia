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

function paintAll() {
  document.querySelectorAll('svg[data-paint="hero-field"]').forEach(paintHeroField);
  document.querySelectorAll('svg[data-paint="hero-frame"]').forEach(paintHeroFrame);
  document.querySelectorAll('svg[data-paint="ambient"]').forEach(paintAmbientField);
  document.querySelectorAll('svg[data-paint="project"]').forEach((svg) => {
    paintProjectFrame(svg, svg.dataset.variant || 'infra');
  });
  document.querySelectorAll('svg[data-paint="sector"]').forEach((svg) => {
    paintSectorPreview(svg, svg.dataset.sector || '');
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
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
