# BPF Engenharia

Site institucional da **BPF Engenharia** — engenharia de instalações e eficiência energética.

Stack: **Vite 5 + JavaScript ES2025 + HTML/CSS**. Sem framework pesado. Assinatura visual em SVG procedural (`src/lib/engineering-field.js`). Design system em CSS tokens (`src/styles/`). Conteúdo editorial em `src/data/content.js`.

## Desenvolvimento

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output em dist/
npm run preview   # serve dist/ em http://localhost:4173
```

## Deploy — Cloudflare Pages

Este projeto foi adaptado para Cloudflare Pages.

**Configuração do projeto (dashboard Cloudflare Pages → Create project → Connect Git):**

| Campo | Valor |
|---|---|
| Framework preset | `None` (Vite não tem preset) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Node version | `20` (variável `NODE_VERSION=20`) |
| Environment variables | nenhuma |

**Arquivos já incluídos que o Cloudflare Pages lê automaticamente:**

- `public/_redirects` — pretty URLs (`/sobre` serve `/sobre.html`) e 301s de todas as URLs legadas do site atual (WordPress)
- `public/_headers` — cache imutável para `/assets/*`, cache curto para HTML, cabeçalhos de segurança (CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- `public/robots.txt` e `public/sitemap.xml`

**Passos:**

1. Crie o projeto no dashboard Cloudflare Pages apontando para este repositório.
2. Use os valores da tabela acima na primeira tela de build.
3. Após o primeiro deploy, aponte o domínio `bpfengenharia.eng.br` em **Custom domains** — o Cloudflare emite o certificado TLS automaticamente.
4. Confirme que o registro DNS `www` (se usado) aponta para o mesmo Pages project ou faça redirect via **Rules → Redirect Rules**.

**URLs preservadas (301 permanente):**

- `/hospitais-e-clinicas`, `/residencias-alto-padrao`, `/concessionarias`, `/restauracoes`, `/fotovoltaicas`, `/hoteis`, `/escolas`, `/shoppings-e-lojas`, `/restaurantes`, `/torres-comerciais-e-residenciais`, `/obras-industriais-de-infraestrutura-e-galpoes` → `/obras?setor=…`
- `/obrasemandamento` → `/obras-em-andamento`
- `/obrasnovas` → `/obras`

## Arquitetura de conteúdo

Toda a informação editada com frequência vive em `src/data/content.js`. Placeholders explícitos (`[CONFIRMAR LOCALIZAÇÃO]`, `isPlaceholder: true`) indicam campos que a BPF ainda precisa validar antes da publicação definitiva.

## Formulário de contato

Hoje sem endpoint público — o submit valida os campos, mostra estados de erro por campo e abre o cliente de e-mail do usuário com a mensagem já formatada para `contato@bpfengenharia.eng.br`. Para integrar SMTP/HubSpot/RD Station, editar `initForm()` em `src/lib/interactions.js`.

## Rotas

| URL | Descrição |
|---|---|
| `/` | Home cinematográfica (11 capítulos) |
| `/sobre` | História, missão, visão, valores, linha do tempo |
| `/solucoes` | Instalações, eficiência energética, fotovoltaica |
| `/obras` | Portfólio editorial |
| `/obras-em-andamento` | Cards de acompanhamento |
| `/clientes` | Alguns clientes atendidos |
| `/contato` | Formulário + contatos |

## Assets de marca

Em `public/brand/` — todas as variações oficiais do logo (horizontal, wordmark, mono, ícones, favicons). Uso atual:

- Nav e footer → `bpf-logo-horizontal-white.svg`
- Favicon SVG → `bpf-icon-navy.svg`
- Apple touch / PWA → `apple-touch-icon.png`, `bpf-icon-512.png`
- OG preview → `bpf-preview.png`
- Schema.org → `bpf-logo-horizontal.svg`
