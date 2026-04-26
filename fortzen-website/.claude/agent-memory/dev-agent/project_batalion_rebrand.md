---
name: Batalion Defense AI rebrand
description: Complete rebrand of fortzen-website from FORTZEN to BATALION Defense AI, including SVG logo, design tokens, and 4 new sections.
type: project
---

Rebrand completed on 2026-04-08.

**New brand**: BATALION Defense AI — "Inteligência que protege. Resposta que age"

**Key files:**
- `src/components/BatalionLogo.astro` — SVG logo component with sm/md/lg sizes. Shield + 3 chevron stripes icon, metallic chrome gradient text, thin blue separator line.
- `src/styles/global.css` — Updated color palette (darker tactical tones) + `.carbon-texture` class added.
- `src/components/GaleriaDeteccao.astro` — 6-card real image gallery of AI detection scenes.
- `src/components/MapaTempoReal.astro` — Real-time map section using `mapa-tempo-real.jpeg`.
- `src/components/AreaCliente.astro` — Client dashboard section using `area-cliente.jpeg`.
- `src/components/VideosReais.astro` — Video placeholder section (3 cards ready for `<video>` tags).

**Section order in index.astro:** Navbar → Hero → Diferenciais → GaleriaDeteccao → Servicos → TecnologiaIA → ComoFunciona → SobreNos → MapaTempoReal → AreaCliente → VideosReais → SocialProof → FAQ → CTABanner → ContactForm → Footer → WhatsAppFloat

**Why:** Full brand migration from old "Fortzen" identity to military-defense premium brand.

**How to apply:** CSS variable names kept as `fort-*` to avoid breaking Tailwind utility classes across all components. Only values changed.
