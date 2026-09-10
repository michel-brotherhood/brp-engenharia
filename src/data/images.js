/**
 * Imagens ilustrativas — Unsplash CDN.
 *
 * IMPORTANTE: são fotografias de banco de imagens (licença Unsplash — uso
 * comercial livre, sem atribuição obrigatória). Servem como camada de
 * atmosfera visual até a BPF entregar fotografias reais das próprias obras.
 * Ficam propositalmente com opacidade baixa e mix-blend-mode luminosity
 * para que a foto vire textura navy monocromática, com o sistema técnico
 * SVG por cima — a intenção é enfatizar a linguagem de engenharia,
 * NÃO passar as fotos como registros reais da BPF.
 *
 * As URLs apontam direto para images.unsplash.com com resize e
 * `auto=format` (Unsplash serve WebP/AVIF automaticamente). O host
 * está liberado na CSP (`img-src https:`).
 *
 * Se qualquer URL falhar, o handler onerror remove a <img> e o SVG
 * procedural (paint no engineering-field.js) permanece visível — o site
 * não quebra.
 *
 * Para migrar para fotos reais: substituir cada URL pelo path local
 * `/photos/<obra>.webp` que a BPF fornecer.
 */

const U = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&fit=crop&q=80`;

// Photo IDs escolhidos por permanência na Unsplash Editorial (baixo risco de 404).
// Estilo: arquitetura noturna, canteiros, estruturas industriais, energia solar.
export const heroImage = {
  src: U('1486718448742-163732cd1544', 1600),
  width: 1600,
  height: 2000,
  alt: 'Estudo visual — arquitetura vertical em tom noturno',
};

export const ambientImage = {
  src: U('1518005020951-eccb494ad742', 2400),
  width: 2400,
  height: 1000,
  alt: 'Estudo visual — canteiro em atividade',
};

export const projectImages = {
  infra:       { src: U('1581094794329-c8112a89af12', 1920), alt: 'Estudo visual — infraestrutura industrial' },
  commercial:  { src: U('1497366216548-37526070297c', 1920), alt: 'Estudo visual — fachada comercial' },
  residential: { src: U('1503174971373-b1f69850bded', 1920), alt: 'Estudo visual — residencial em construção' },
  coastal:     { src: U('1519821172144-4f87d6c11e17', 1920), alt: 'Estudo visual — empreendimento costeiro' },
  solar:       { src: U('1509391366360-2e959784a276', 1920), alt: 'Estudo visual — painéis fotovoltaicos' },
  industrial:  { src: U('1587293852726-70cdb56c2866', 1920), alt: 'Estudo visual — estrutura industrial' },
  hospital:    { src: U('1519494026892-80bbd2d6fd0d', 1920), alt: 'Estudo visual — edifício institucional' },
};

export function imageForVariant(variant) {
  return projectImages[variant] || projectImages.commercial;
}
