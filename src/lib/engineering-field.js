/**
 * EngineeringField — sistema visual em SVG que compõe o hero e camadas
 * técnicas: grade modular, linhas de fluxo, pontos de distribuição,
 * marcadores de coordenadas. Leve, sem WebGL, respeita reduced-motion.
 *
 * A ideia é evocar plantas, sistemas e camadas de infraestrutura sem
 * simular uma maquete real da BPF.
 */

const NS = 'http://www.w3.org/2000/svg';

const NAVY = '#0F1A31';
const RULE = 'rgba(231, 235, 243, 0.10)';
const RULE_STRONG = 'rgba(231, 235, 243, 0.22)';
const TECH = '#2DA9E1';
const SIGNAL = '#E85A1F';

function el(name, attrs = {}) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}

/**
 * Cria o campo modular do HERO: grid + fluxos horizontais + pontos + marcadores.
 * @param {SVGSVGElement} svg
 */
export function paintHeroField(svg, opts = {}) {
  const w = 1600, h = 1000;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

  const defs = el('defs');
  // fade mask top+bottom to soften edges
  const grad = el('linearGradient', { id: 'ef-vfade', x1: '0', y1: '0', x2: '0', y2: '1' });
  grad.appendChild(el('stop', { offset: '0%',  'stop-color': '#000', 'stop-opacity': '0' }));
  grad.appendChild(el('stop', { offset: '18%', 'stop-color': '#000', 'stop-opacity': '1' }));
  grad.appendChild(el('stop', { offset: '82%', 'stop-color': '#000', 'stop-opacity': '1' }));
  grad.appendChild(el('stop', { offset: '100%','stop-color': '#000', 'stop-opacity': '0' }));
  defs.appendChild(grad);

  const mask = el('mask', { id: 'ef-vmask' });
  mask.appendChild(el('rect', { x: 0, y: 0, width: w, height: h, fill: 'url(#ef-vfade)' }));
  defs.appendChild(mask);

  svg.appendChild(defs);

  const stage = el('g', { mask: 'url(#ef-vmask)' });
  svg.appendChild(stage);

  // GRID VERTICAL (25 col)
  const cols = 32;
  const rows = 20;
  const gridV = el('g', { stroke: RULE, 'stroke-width': '1', fill: 'none' });
  for (let i = 1; i < cols; i++) {
    const x = (w / cols) * i;
    gridV.appendChild(el('line', { x1: x, y1: 0, x2: x, y2: h }));
  }
  stage.appendChild(gridV);

  // GRID HORIZONTAL
  const gridH = el('g', { stroke: RULE, 'stroke-width': '1', fill: 'none' });
  for (let i = 1; i < rows; i++) {
    const y = (h / rows) * i;
    gridH.appendChild(el('line', { x1: 0, y1: y, x2: w, y2: y }));
  }
  stage.appendChild(gridH);

  // Marcadores de coordenadas nas margens
  const ticks = el('g', { fill: RULE_STRONG });
  for (let i = 4; i < cols; i += 4) {
    const x = (w / cols) * i;
    ticks.appendChild(el('rect', { x: x - 6, y: 20, width: 12, height: 2 }));
    ticks.appendChild(el('rect', { x: x - 6, y: h - 22, width: 12, height: 2 }));
  }
  stage.appendChild(ticks);

  // Fluxos técnicos principais (linhas mais fortes)
  const flow = el('g', { stroke: TECH, 'stroke-width': '1.2', fill: 'none', opacity: '0.55' });
  // linha 1
  flow.appendChild(el('path', {
    d: `M 0 320 L 600 320 L 720 200 L 1600 200`,
    'stroke-dasharray': '2400',
    'stroke-dashoffset': '2400',
    class: 'ef-draw',
  }));
  // linha 2 — barramento inferior
  flow.appendChild(el('path', {
    d: `M 0 720 L 400 720 L 520 820 L 1200 820 L 1320 720 L 1600 720`,
    'stroke-dasharray': '2600',
    'stroke-dashoffset': '2600',
    class: 'ef-draw ef-draw-2',
  }));
  // linha 3 — ramificação vertical
  flow.appendChild(el('path', {
    d: `M 900 0 L 900 460 L 1080 620 L 1080 1000`,
    'stroke-dasharray': '1600',
    'stroke-dashoffset': '1600',
    class: 'ef-draw ef-draw-3',
  }));
  stage.appendChild(flow);

  // Nodes (pontos de distribuição)
  const nodes = el('g');
  const nodePositions = [
    [600, 320], [720, 200], [1200, 820], [520, 820], [900, 460], [1080, 620], [1320, 720], [400, 720],
  ];
  for (const [x, y] of nodePositions) {
    nodes.appendChild(el('circle', { cx: x, cy: y, r: 4, fill: NAVY, stroke: TECH, 'stroke-width': 1.2 }));
    nodes.appendChild(el('circle', { cx: x, cy: y, r: 12, fill: 'none', stroke: TECH, 'stroke-width': 0.6, opacity: 0.4 }));
  }
  // signal accents on two nodes
  nodes.appendChild(el('circle', { cx: 720, cy: 200, r: 6, fill: SIGNAL }));
  nodes.appendChild(el('circle', { cx: 1200, cy: 820, r: 6, fill: SIGNAL }));
  stage.appendChild(nodes);

  // Faint plant-block accents (bottom-right)
  const plans = el('g', { stroke: RULE_STRONG, 'stroke-width': 1, fill: 'none' });
  plans.appendChild(el('rect', { x: 1200, y: 500, width: 260, height: 160 }));
  plans.appendChild(el('rect', { x: 1220, y: 520, width: 100, height: 60 }));
  plans.appendChild(el('rect', { x: 1330, y: 520, width: 110, height: 120 }));
  plans.appendChild(el('line', { x1: 1200, y1: 580, x2: 1330, y2: 580 }));
  stage.appendChild(plans);

  // Micro coord markers
  const labels = el('g', {
    fill: RULE_STRONG,
    'font-family': 'JetBrains Mono, ui-monospace, monospace',
    'font-size': '11',
    'letter-spacing': '1.5'
  });
  labels.appendChild(el('text', { x: 12, y: 12, 'dominant-baseline': 'hanging' })).textContent = 'N 22°54\'';
  labels.appendChild(el('text', { x: w - 12, y: 12, 'text-anchor': 'end', 'dominant-baseline': 'hanging' })).textContent = 'W 043°10\'';
  labels.appendChild(el('text', { x: 12, y: h - 12 })).textContent = 'BPF / FIELD-01';
  labels.appendChild(el('text', { x: w - 12, y: h - 12, 'text-anchor': 'end' })).textContent = 'REV. 2026';
  stage.appendChild(labels);

  // draw animation
  const style = el('style');
  style.textContent = `
    .ef-draw { animation: efDraw 3.6s cubic-bezier(0.22,1,0.36,1) 0.2s forwards; }
    .ef-draw-2 { animation-delay: 0.6s; }
    .ef-draw-3 { animation-delay: 1s; }
    @keyframes efDraw { to { stroke-dashoffset: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .ef-draw { animation: none; stroke-dashoffset: 0; }
    }
  `;
  svg.appendChild(style);
}

/**
 * Hero media frame — mostra volume arquitetônico abstrato com camadas de instalações.
 * @param {SVGSVGElement} svg
 */
export function paintHeroFrame(svg) {
  const w = 800, h = 1000;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

  // Sky/background gradient
  const defs = el('defs');
  const bgGrad = el('linearGradient', { id: 'hf-bg', x1: '0', y1: '0', x2: '0', y2: '1' });
  bgGrad.appendChild(el('stop', { offset: '0%', 'stop-color': '#182A50' }));
  bgGrad.appendChild(el('stop', { offset: '100%', 'stop-color': '#0A1020' }));
  defs.appendChild(bgGrad);
  svg.appendChild(defs);

  svg.appendChild(el('rect', { x: 0, y: 0, width: w, height: h, fill: 'url(#hf-bg)' }));

  // Distant grid (city plane)
  const gridG = el('g', { stroke: 'rgba(255,255,255,0.06)', 'stroke-width': 1, fill: 'none' });
  for (let i = 0; i < 24; i++) {
    const y = 620 + i * 22;
    if (y > h) break;
    gridG.appendChild(el('line', { x1: 0, y1: y, x2: w, y2: y }));
  }
  for (let i = -12; i <= 12; i++) {
    const x1 = w / 2 + i * 90;
    gridG.appendChild(el('line', { x1: w / 2, y1: 620, x2: x1, y2: h }));
  }
  svg.appendChild(gridG);

  // Building volumes (abstract)
  const build = el('g', { fill: 'rgba(15, 26, 49, 0.9)', stroke: 'rgba(255,255,255,0.08)' });
  // Tall central
  build.appendChild(el('rect', { x: 300, y: 180, width: 180, height: 500 }));
  // Side left
  build.appendChild(el('rect', { x: 120, y: 340, width: 160, height: 340 }));
  // Side right
  build.appendChild(el('rect', { x: 500, y: 260, width: 200, height: 420 }));
  // Small front
  build.appendChild(el('rect', { x: 200, y: 500, width: 90, height: 180 }));
  svg.appendChild(build);

  // Windows grid on center tower (representing floors)
  const win = el('g', { fill: 'rgba(45,169,225,0.10)', stroke: 'rgba(45,169,225,0.25)' });
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 5; c++) {
      win.appendChild(el('rect', { x: 316 + c * 32, y: 200 + r * 38, width: 24, height: 26 }));
    }
  }
  svg.appendChild(win);

  // Installation lines flowing over the building (energia / instalações)
  const flows = el('g', { stroke: '#2DA9E1', 'stroke-width': 1.5, fill: 'none', opacity: 0.75 });
  flows.appendChild(el('path', {
    d: 'M 40 240 L 300 240 L 480 240 L 480 400 L 700 400',
    'stroke-dasharray': '2000',
    'stroke-dashoffset': '2000',
    class: 'ef-draw',
  }));
  flows.appendChild(el('path', {
    d: 'M 760 620 L 500 620 L 300 620 L 300 720 L 40 720',
    'stroke-dasharray': '2000',
    'stroke-dashoffset': '2000',
    class: 'ef-draw ef-draw-2',
  }));
  flows.appendChild(el('path', {
    d: 'M 390 60 L 390 500 L 260 500 L 260 780',
    'stroke-dasharray': '1600',
    'stroke-dashoffset': '1600',
    class: 'ef-draw ef-draw-3',
  }));
  svg.appendChild(flows);

  // Nodes / signal markers
  const nodes = el('g');
  const pts = [[480, 400], [300, 240], [500, 620], [300, 720], [390, 500]];
  for (const [x, y] of pts) {
    nodes.appendChild(el('circle', { cx: x, cy: y, r: 4, fill: '#0A1020', stroke: '#2DA9E1', 'stroke-width': 1.2 }));
    nodes.appendChild(el('circle', { cx: x, cy: y, r: 12, fill: 'none', stroke: '#2DA9E1', 'stroke-width': 0.6, opacity: 0.5 }));
  }
  nodes.appendChild(el('circle', { cx: 480, cy: 400, r: 7, fill: '#E85A1F' }));
  svg.appendChild(nodes);

  // Solar panel abstract on top of right building
  const solar = el('g', { fill: 'rgba(45,169,225,0.20)', stroke: 'rgba(45,169,225,0.55)' });
  for (let i = 0; i < 4; i++) {
    solar.appendChild(el('rect', { x: 508 + i * 46, y: 232, width: 40, height: 20 }));
  }
  svg.appendChild(solar);

  // Foreground silhouettes / ground
  svg.appendChild(el('rect', { x: 0, y: 940, width: w, height: 60, fill: '#060911' }));

  const style = el('style');
  style.textContent = `
    .ef-draw { animation: efDraw 3.6s cubic-bezier(0.22,1,0.36,1) 0.3s forwards; }
    .ef-draw-2 { animation-delay: 0.9s; }
    .ef-draw-3 { animation-delay: 1.3s; }
    @keyframes efDraw { to { stroke-dashoffset: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .ef-draw { animation: none; stroke-dashoffset: 0; }
    }
  `;
  svg.appendChild(style);
}

/**
 * Small project preview SVG. Variant controls composition style.
 */
export function paintProjectFrame(svg, variant = 'infra') {
  const w = 1200, h = 750;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');

  const palettes = {
    infra: { bg1: '#0A1020', bg2: '#182A50', line: '#2DA9E1', accent: '#E85A1F' },
    commercial: { bg1: '#0F1A31', bg2: '#24344F', line: '#6BC5EB', accent: '#E85A1F' },
    residential: { bg1: '#12182A', bg2: '#26303F', line: '#2DA9E1', accent: '#F27538' },
    coastal: { bg1: '#0A1020', bg2: '#0F1A31', line: '#6BC5EB', accent: '#E85A1F' },
    industrial: { bg1: '#060911', bg2: '#172642', line: '#2DA9E1', accent: '#E85A1F' },
    hospital: { bg1: '#0F1A31', bg2: '#24344F', line: '#6BC5EB', accent: '#E85A1F' },
    solar: { bg1: '#0A1020', bg2: '#182A50', line: '#2DA9E1', accent: '#F27538' },
  };
  const P = palettes[variant] || palettes.infra;

  const defs = el('defs');
  const grad = el('linearGradient', { id: `pf-${variant}-g`, x1: '0', y1: '0', x2: '1', y2: '1' });
  grad.appendChild(el('stop', { offset: '0%', 'stop-color': P.bg2 }));
  grad.appendChild(el('stop', { offset: '100%', 'stop-color': P.bg1 }));
  defs.appendChild(grad);
  svg.appendChild(defs);

  svg.appendChild(el('rect', { x: 0, y: 0, width: w, height: h, fill: `url(#pf-${variant}-g)` }));

  // Faint grid
  const g = el('g', { stroke: 'rgba(255,255,255,0.06)', fill: 'none' });
  for (let i = 1; i < 20; i++) g.appendChild(el('line', { x1: (w / 20) * i, y1: 0, x2: (w / 20) * i, y2: h }));
  for (let i = 1; i < 12; i++) g.appendChild(el('line', { x1: 0, y1: (h / 12) * i, x2: w, y2: (h / 12) * i }));
  svg.appendChild(g);

  // Variant-specific composition
  const stage = el('g');
  if (variant === 'infra') {
    // Long horizontal system + tanks
    stage.appendChild(el('rect', { x: 60, y: 460, width: 1080, height: 40, fill: 'rgba(255,255,255,0.06)', stroke: 'rgba(255,255,255,0.15)' }));
    for (let i = 0; i < 3; i++) {
      stage.appendChild(el('circle', { cx: 220 + i * 340, cy: 340, r: 90, fill: 'none', stroke: 'rgba(255,255,255,0.20)', 'stroke-width': 2 }));
      stage.appendChild(el('circle', { cx: 220 + i * 340, cy: 340, r: 70, fill: 'rgba(45,169,225,0.10)' }));
    }
    stage.appendChild(el('path', { d: `M 60 500 L 1140 500`, stroke: P.line, 'stroke-width': 2, fill: 'none' }));
  } else if (variant === 'commercial') {
    // Tall facade grid
    for (let r = 0; r < 12; r++) {
      for (let c = 0; c < 14; c++) {
        stage.appendChild(el('rect', { x: 220 + c * 60, y: 100 + r * 50, width: 46, height: 34, fill: r % 3 === 0 ? 'rgba(45,169,225,0.12)' : 'rgba(255,255,255,0.03)', stroke: 'rgba(255,255,255,0.08)' }));
      }
    }
    stage.appendChild(el('path', { d: 'M 60 380 L 1140 380', stroke: P.accent, 'stroke-width': 2, 'stroke-dasharray': '6 6' }));
  } else if (variant === 'residential') {
    // Interior plan lines
    stage.appendChild(el('rect', { x: 120, y: 120, width: 960, height: 510, fill: 'none', stroke: 'rgba(255,255,255,0.20)', 'stroke-width': 2 }));
    stage.appendChild(el('line', { x1: 500, y1: 120, x2: 500, y2: 630, stroke: 'rgba(255,255,255,0.15)' }));
    stage.appendChild(el('line', { x1: 120, y1: 380, x2: 1080, y2: 380, stroke: 'rgba(255,255,255,0.15)' }));
    stage.appendChild(el('line', { x1: 500, y1: 380, x2: 800, y2: 500, stroke: 'rgba(255,255,255,0.15)' }));
    stage.appendChild(el('rect', { x: 140, y: 140, width: 200, height: 100, fill: 'rgba(45,169,225,0.10)' }));
    stage.appendChild(el('rect', { x: 820, y: 400, width: 220, height: 200, fill: 'rgba(232,90,31,0.10)' }));
  } else if (variant === 'coastal') {
    // Skyline over horizon
    stage.appendChild(el('line', { x1: 0, y1: 420, x2: w, y2: 420, stroke: 'rgba(255,255,255,0.20)' }));
    stage.appendChild(el('polygon', { points: '160,420 220,320 280,420', fill: 'rgba(255,255,255,0.08)' }));
    stage.appendChild(el('polygon', { points: '300,420 420,240 540,420', fill: 'rgba(255,255,255,0.10)' }));
    stage.appendChild(el('polygon', { points: '620,420 780,300 940,420', fill: 'rgba(255,255,255,0.08)' }));
    stage.appendChild(el('rect', { x: 60, y: 420, width: 1080, height: 250, fill: 'rgba(45,169,225,0.10)' }));
  }

  // Overlay flow lines
  const flow = el('g', { stroke: P.line, 'stroke-width': 1.6, fill: 'none', opacity: 0.75 });
  flow.appendChild(el('path', { d: `M 0 120 L 240 120 L 360 240 L 1200 240` }));
  flow.appendChild(el('path', { d: `M 0 620 L 300 620 L 420 720 L 1200 720`, opacity: 0.4 }));
  stage.appendChild(flow);

  // Nodes
  stage.appendChild(el('circle', { cx: 360, cy: 240, r: 5, fill: P.accent }));
  stage.appendChild(el('circle', { cx: 360, cy: 240, r: 14, fill: 'none', stroke: P.accent, opacity: 0.4 }));

  // Coords labels
  const txt = el('g', { fill: 'rgba(255,255,255,0.35)', 'font-family': 'JetBrains Mono, ui-monospace, monospace', 'font-size': 14, 'letter-spacing': 2 });
  txt.appendChild(el('text', { x: 20, y: 30, 'dominant-baseline': 'hanging' })).textContent = 'BPF / VISUAL STUDY';
  txt.appendChild(el('text', { x: w - 20, y: 30, 'text-anchor': 'end', 'dominant-baseline': 'hanging' })).textContent = variant.toUpperCase();
  txt.appendChild(el('text', { x: 20, y: h - 20 })).textContent = 'ILLUSTRATIVE SYSTEM';
  stage.appendChild(txt);

  svg.appendChild(stage);
}

/**
 * Small ambient field used behind CTA final section.
 */
export function paintAmbientField(svg) {
  const w = 1600, h = 800;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
  const g = el('g', { stroke: RULE, fill: 'none' });
  for (let i = 1; i < 40; i++) g.appendChild(el('line', { x1: (w / 40) * i, y1: 0, x2: (w / 40) * i, y2: h }));
  for (let i = 1; i < 16; i++) g.appendChild(el('line', { x1: 0, y1: (h / 16) * i, x2: w, y2: (h / 16) * i }));
  svg.appendChild(g);

  const flow = el('g', { stroke: TECH, 'stroke-width': 1.4, fill: 'none', opacity: 0.7 });
  flow.appendChild(el('path', { d: 'M 0 400 L 600 400 L 720 500 L 1600 500' }));
  flow.appendChild(el('path', { d: 'M 0 200 L 300 200 L 420 350 L 1600 350', opacity: 0.5 }));
  flow.appendChild(el('path', { d: 'M 900 0 L 900 400 L 1080 500 L 1080 800', opacity: 0.55 }));
  svg.appendChild(flow);

  svg.appendChild(el('circle', { cx: 720, cy: 500, r: 6, fill: SIGNAL }));
  svg.appendChild(el('circle', { cx: 420, cy: 350, r: 5, fill: TECH }));
}

export function paintSectorPreview(svg, sectorSlug) {
  const w = 800, h = 1000;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  const variantMap = {
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
  paintProjectFrame(svg, variantMap[sectorSlug] || 'infra');
}
