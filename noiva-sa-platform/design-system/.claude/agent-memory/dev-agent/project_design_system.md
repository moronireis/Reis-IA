---
name: NOIVA S.A. Design System
description: Structure, logo paths, CSS tokens, and deploy info for the design-system preview site
type: project
---

Single-file design system at `index.html` (~5700 lines as of v2.5). No build step — pure HTML/CSS/JS.

**Deploy:** `cd "/Users/moronireis/Projetos vscode/noiva-sa-platform/design-system" && vercel --prod --yes`
**Live URL:** https://design-system-roan-nine.vercel.app

**Logo folder:** `logos/` — all transparent PNGs (1500×720 RGBA)
- White versions (10.png, 11.png) require dark backgrounds
- logos/24.png and logos/28.png have baked-in backgrounds — render as-is
- For white monogram on dark bg: use `logos/17.png` with `filter: brightness(0) invert(1)`

**Brand tokens:**
- Rose: #DBA99F (primary), Blush: #FFCBC1, Cream: #F4F3EE
- Eucalyptus: #4A6741, Taupe: #9C958F, Silver: #BAB9B6
- Body text: #1a1a1a, Secondary: #6b635d, Tertiary: #9C958F

**CSS logo rendering:** For footer, mockups, dark sections — always use CSS text instead of PNG. Pattern: `<span style="color:var(--color-rose);">NOIVA</span> <span style="color:var(--color-taupe);">S.A.</span>` with `font-family: var(--font-serif)`. PNG logos are only for the main logo sections where src is explicit.

**Botanical motifs count:** 3 only (Ramo Eucalipto, Folha Simples, Ramo com Bagas). "Flor Delicada/Geométrica" was removed by user request in v2.5. Keep 3-column grid.

**Sub-brands layout (v2.5):** 3-column grid (21-23), then another 3-column grid (24-26), then 2-column dark grid (27-28). Not a 4-column grid.

**Essence section (v2.5):** Dark background (#000). 5 columns with divider borders, no gap. Use CSS column border trick (border-left on grid + border-right on each card).

**Why:** Deploy is manual via vercel --prod (not git-based auto-deploy).
**How to apply:** Always run deploy command explicitly after changes.
