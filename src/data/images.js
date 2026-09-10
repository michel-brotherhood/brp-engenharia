/**
 * Imagens curadas da BPF — pacote entregue pelo usuário em `public/img/`.
 *
 * O README na raiz (upload do usuário no commit 9c31ede) documenta a
 * intenção de cada asset e o tratamento visual esperado. Este módulo
 * apenas mapeia esses arquivos para os slots do site que o
 * `injectImage()` em src/main.js pluga no DOM.
 *
 * As fotos já vêm com paleta baked in (navy + azul elétrico + acentos
 * verde-limão nas instalações internas). Por isso os overlays CSS ficam
 * leves — só o suficiente para garantir contraste do texto sobreposto.
 * Ver src/styles/components.css → bloco `.has-image`.
 */

const IMG = '/img';

export const heroImage = {
  src: `${IMG}/bpf-hero-vertical-architecture.webp`,
  width: 1664,
  height: 2080,
  alt: 'Edifício contemporâneo com instalações aparentes iluminado ao anoitecer',
  eager: true, // preload/high priority — first-fold LCP
};

export const ambientImage = {
  src: `${IMG}/bpf-portfolio-works-editorial.webp`,
  width: 2560,
  height: 1440,
  alt: '',
};

// Mapeamento variant → foto, alinhado ao README do usuário.
// Variants sem foto própria reutilizam o portfolio (recomendado).
export const projectImages = {
  residential: {
    src: `${IMG}/bpf-installations-technical-study.webp`,
    width: 2304, height: 1536,
    alt: 'Estudo técnico — instalações elétricas e infraestrutura',
  },
  commercial: {
    src: `${IMG}/bpf-energy-efficiency-technical-study.webp`,
    width: 2304, height: 1536,
    alt: 'Estudo técnico — eficiência energética e sistemas HVAC',
  },
  solar: {
    src: `${IMG}/bpf-photovoltaic-energy-study.webp`,
    width: 2304, height: 1536,
    alt: 'Estudo técnico — energia fotovoltaica',
  },
  infra:      { src: `${IMG}/bpf-portfolio-works-editorial.webp`, width: 2560, height: 1440, alt: '' },
  coastal:    { src: `${IMG}/bpf-portfolio-works-editorial.webp`, width: 2560, height: 1440, alt: '' },
  industrial: { src: `${IMG}/bpf-portfolio-works-editorial.webp`, width: 2560, height: 1440, alt: '' },
  hospital:   { src: `${IMG}/bpf-portfolio-works-editorial.webp`, width: 2560, height: 1440, alt: '' },
};

export function imageForVariant(variant) {
  return projectImages[variant] || projectImages.commercial;
}
