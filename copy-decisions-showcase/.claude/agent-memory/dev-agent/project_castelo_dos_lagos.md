---
name: Castelo dos Lagos — site structure and conventions
description: Key patterns, component contracts, CSS tokens, and editorial rules for castelo-dos-lagos-site
type: project
---

## Site location
`/Users/moronireis/Projetos vscode/castelo-dos-lagos-site/`

## Stack
- Astro (static, no React islands)
- CSS custom properties (no Tailwind) — tokens in `src/styles/global.css`
- Google Fonts: Cormorant Garamond (300/400/500, italic) + Inter (300/400/500)
- No JS framework — `src/scripts/motion.js` for scroll animations

## Key CSS tokens (from global.css)
- `--font-display`: Cormorant Garamond
- `--font-structural`: Inter
- `--forest-deep`: dark forest green background (primary)
- `--forest-mid`: mid-tone forest green (alternate sections)
- `--cream`: warm cream (light surface — used in O Espaço section)
- `--gold` / `--border-bronze`: bronze/warm gold accent (#8A6A3E range)
- `--on-dark-heading`: primary text on dark
- `--on-dark-secondary`, `--on-dark-muted`, `--on-dark-quiet`: text hierarchy
- `--border`, `--border-strong`: hairline rules
- `--section-padding-y`: section vertical padding
- `--motion-fast`, `--ease-editorial`: animation tokens

## Component contracts
- `ChapterSection.astro`: props roman, label, id, title, titleEm?, lead, surface?, bronzeNumeral?, reversed?
  - surface: 'dark' | 'cream' | 'forest-mid'
  - slot receives photo/content blocks
- `Photo.astro`: props src, alt, aspect ("16:9" | "4:3" | "3:4" | "3:2")
- `PhotoPlaceholder.astro`: props aspect, description
- `CtaEditorial.astro`: props href, label, size? ('default' | 'large') — serif underline, never pill
- `Hero.astro`: standalone, no props
- `Nav.astro`, `Footer.astro`, `ConfidentialBar.astro`: no props

## v2 page structure (index.astro — 2026-04-15)
Hero + I. Chegada (#chegada) + II. A Casa (#casa) + III. O Espaço (#espaco) + IV. Celebrações (#celebracoes) + V. Parceiros (#parceiros) + VI. Visita (#visita)

## Nav (v2)
5 items: A Casa · O Espaço · Celebrações · Parceiros · Visita
First 4 = anchor links. Visita = /visita route. CTA = "Agendar visita →" text link.

## Remaining [A VERIFICAR] (before production deploy)
1. Número real de lagos na propriedade (index.astro §II meta strip)
2. Anos de operação / "recebemos há décadas" → número real
3. Gerador · plano B chuva · acessibilidade PNE (infra-table last row)

## Key design rules (art-direction-brief)
- Cormorant headings only, Inter body only — never mixed within same role
- Italic = voice (one phrase in hero H1, chapter leads) — never decorative
- Bronze/gold accent: `--gold` (#8A6A3E range) — never "gold" in the CSS yellow sense
- No pills, no filled buttons — CTAs are serif underline only
- Chapter numerals Roman (I. II. III.) — canonical brand element
- "O tempo é rei" watermark allowed ONLY in footer / §VI Visita — never headline

## visita.astro (created 2026-04-15)
- IDS decision: CREATE — no prior /visita page existed (only index.astro in pages/)
- Editorial form page, not SaaS contact form
- `<form method="POST" action="#">` — backend integration pending Phase 2
- Form fields: nome, email, telefone, data_evento, tipo_evento (select with 10 types grouped), mensagem
- Contact block with real address, phones, WhatsApps, email
- Hero: 55vh reduced, same hero photo as index + darker gradient overlay
