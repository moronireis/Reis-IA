---
name: wedding_site_project
description: Core facts about the moroniedaphine wedding site project — stack, palette, typography, page structure.
type: project
---

Stack: Astro 6 + Tailwind v4 (via @tailwindcss/vite plugin). No React islands — all pages are pure Astro/HTML. Tailwind is installed but NOT used on wedding pages — all CSS is vanilla custom properties.

**Why:** Static informational site. 3-color locked palette is cleaner with vanilla CSS tokens.
**How to apply:** No Tailwind utility classes on wedding pages. Use CSS custom properties from `src/styles/global.css` and scoped `<style>` blocks per page/component.

Palette (3 tokens, locked):
- `--burgundy: #4A1619` — primary text, backgrounds
- `--white: #FFFFFF` — dominant background
- `--gold: #D4AF37` — tertiary only (hairlines, borders, small accents — NEVER background or main text)

Typography (2 families, locked):
- Fraunces variable — display weight **200** (not 300), `font-variation-settings: "opsz" 144, "SOFT" 50`. Body weight 300, `opsz 14`.
- Inter 300-400 — metadata/labels/eyebrows only (uppercase, tracking-wide)
- NO script fonts, NO Playfair, NO other fonts

## File structure (post Phase 1 restructure, 2026-04-15)

```
src/
  styles/global.css       — tokens, reset, shared utilities
  components/
    Nav.astro             — fixed topbar, activePage prop, .site-nav--light variant
    Footer.astro          — burgundy bg, Fraunces italic + gold rule + Inter date
  pages/
    index.astro           — home: hero photo · história (burgundy) · photo grid · O grande dia · photo break · countdown · CTA presentes
    sobre-nos.astro       — his/hers: MORONI (white bg) + DAPHINE (burgundy bg), 2-col alternating
    presentes.astro       — dark burgundy: PRESENTES · text · Pix · CSS QR placeholder
    faq.astro             — dark burgundy: sticky title col + numbered Q&A col (01-08)
    hub.astro             — untouched internal hub
```

Google Fonts URL (correct, weight 200 included):
`family=Fraunces:ital,opsz,wght@0,9..144,200;0,9..144,300;0,9..144,400;1,9..144,200;1,9..144,300;1,9..144,400&family=Inter:wght@300;400`

Nav light variant: add `.site-nav--light` via inline `<script>` on white-bg pages (sobre-nos pattern).

Page structure: every page is a full `<!DOCTYPE html>` document importing Nav + Footer components. No shared layout wrapper file. Font link repeated per page.
