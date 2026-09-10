# Assets visuais — BPF Engenharia

Pacote de imagens WebP geradas para a one page da BPF Engenharia, alinhadas à direção visual atual do site: navy técnico, azul elétrico, cyan e pequenos acentos verde-limão.

## Mapeamento recomendado

| Arquivo | Onde utilizar | Tratamento recomendado |
|---|---|---|
| `bpf-hero-vertical-architecture.webp` | **Hero / FIELD-00** — substituir a imagem atual de arquitetura vertical no painel visual à direita do headline “A engenharia que sustenta cada detalhe.” | Desktop em proporção vertical, `object-fit: cover`, `object-position: center center`. Preservar a área escura à esquerda quando o asset ocupar uma área mais ampla. Usar overlay navy moderado, sem ocultar a fachada e as instalações visíveis. Em mobile, usar como imagem de destaque abaixo do CTA ou como background com `background-position: 66% center`. |
| `bpf-installations-technical-study.webp` | **CAPÍTULO 03 — SOLUÇÕES / item 01** — “Engenharia de instalações”. Substituir o visual técnico atual do primeiro card. | Landscape 3:2. Desktop no bloco de mídia à direita do texto. `object-fit: cover`; foco no terço direito, onde estão bandejas, dutos, cabos e quadros elétricos. Usar overlay navy/cyan leve. |
| `bpf-energy-efficiency-technical-study.webp` | **CAPÍTULO 03 — SOLUÇÕES / item 02** — “Eficiência energética e gestão de energia”. | Landscape 3:2. Usar no bloco de mídia associado ao segundo item, preferencialmente com composição invertida em relação ao item 01. `object-fit: cover`; manter fachada e equipamentos HVAC visíveis. Overlay navy discreto para integrar com o fundo off-white/dark. |
| `bpf-photovoltaic-energy-study.webp` | **CAPÍTULO 03 — SOLUÇÕES / item 03** — “Energia fotovoltaica”. Substituir o visual atual de painéis fotovoltaicos. | Landscape 3:2. Usar como imagem principal do terceiro card. `object-fit: cover`; `object-position: center center`. Preservar a área negativa escura à esquerda para eventual label técnico ou microcopy. |
| `bpf-portfolio-works-editorial.webp` | **CAPÍTULO 06 — OBRAS SELECIONADAS**, como imagem de abertura da grade de portfólio; também pode ser reutilizada como destaque de uma obra/segmento. | Wide 16:9. Usar em destaque full-width ou no primeiro card da grade, com altura controlada. `object-fit: cover`; manter a massa arquitetônica no lado direito e espaço para metadados no lado esquerdo. Overlay navy/cyan mais forte para textos sobrepostos. |

## Ordem de implementação

1. Trocar primeiro o asset do **Hero**, pois ele define a primeira impressão e já foi composto com área de respiro para o headline.
2. Trocar os três assets da seção **Soluções** em conjunto. O resultado deve ser uma sequência visual coerente para Instalações, Eficiência Energética e Fotovoltaica.
3. Aplicar o asset de **Portfólio** na seção “O trabalho fala por meio das obras”, preferencialmente como abertura visual antes dos cards de projetos.
4. Após a implementação, reutilizar crops do asset de portfólio nos segmentos que não tiverem fotografia própria. Não é necessário gerar 11 imagens diferentes de imediato.

## Sugestão de HTML

```html
<picture>
  <source srcset="/assets/images/bpf-hero-vertical-architecture.webp" type="image/webp" />
  <img
    src="/assets/images/bpf-hero-vertical-architecture.jpg"
    alt="Edifício contemporâneo com instalações aparentes iluminado ao anoitecer"
    width="1664"
    height="2080"
    loading="eager"
    fetchpriority="high"
  />
</picture>
```

Para os assets abaixo do primeiro viewport, usar `loading="lazy"` e `decoding="async"`. Manter `width` e `height` definidos para evitar layout shift.

## Sugestão de CSS

```css
.visual-media {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  background: #0f1a31;
}

.visual-media--hero {
  object-position: center center;
}

.visual-media--portfolio {
  object-position: center center;
}

.visual-frame {
  position: relative;
  overflow: hidden;
  background: #0f1a31;
}

.visual-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(15, 26, 49, .12), rgba(15, 26, 49, .46));
  mix-blend-mode: multiply;
}
```

## Direção de uso

As imagens não contêm textos, logotipos ou marcas d’água. Todo título, label, número, CTA e informação de projeto deve continuar sendo renderizado pelo HTML/CSS do site, garantindo acessibilidade, SEO e precisão tipográfica.

Evitar aplicar filtros verdes fortes ou overlays muito opacos: a paleta já foi construída dentro das imagens para conversar com o navy, o azul elétrico e o verde-limão da interface. O overlay deve apenas garantir contraste para a interface.

## Acessibilidade e performance

Usar textos alternativos descritivos e objetivos. Quando a imagem for puramente decorativa e o conteúdo já estiver totalmente expresso no HTML, usar `alt=""`. Manter os arquivos WebP como fonte principal, com JPEG apenas como fallback para navegadores antigos. Para o hero, pré-carregar somente a imagem acima da dobra; não pré-carregar as demais.

## Arquivos

- `bpf-hero-vertical-architecture.webp` — 1664 × 2080
- `bpf-installations-technical-study.webp` — 2304 × 1536
- `bpf-energy-efficiency-technical-study.webp` — 2304 × 1536
- `bpf-photovoltaic-energy-study.webp` — 2304 × 1536
- `bpf-portfolio-works-editorial.webp` — 2560 × 1440
