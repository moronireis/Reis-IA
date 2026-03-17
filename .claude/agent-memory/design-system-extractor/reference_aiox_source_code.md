---
name: AIOX Source Code Extraction
description: Detailed source code extraction from 13 AIOX brandbook interactive pages -- motion, effects, VFX, components, patterns, sections, charts, advanced UI
type: reference
---

Completed deep source extraction on 2026-03-17 from all 13 interactive AIOX brandbook pages. Output in `brain/assets/design-systems/source-code-extractions/`:

- `aiox-motion-source.md` -- 8 logo animations, easing tokens (spring/smooth/decel cubic-beziers), Framer Motion reveal patterns, ticker/marquee keyframes, click-to-replay mechanism
- `aiox-effects-source.md` -- Glow system (neon/soft/ring), pattern library CSS (6 sections: grids, HUD frames, hazard, circuits, textures, dividers), VFX overlays (grain/scanlines/vignette/CRT/edge-fade), badge variants
- `aiox-vfx-source.md` -- Film grain SVG noise implementation, 6 blend modes, backdrop blur scale (0/4/8/16px), complete glow CSS values, overlay composites CSS
- `aiox-components-source.md` -- Full token system (Lime + Gold themes), 80+ CSS custom properties, complete shadcn/ui mapping, buttons/cards/forms/tables/charts/navigation/feedback/states
- `aiox-interactive-patterns.md` -- 14 interactive pattern categories synthesized across all pages

Key technical findings:
- AIOX uses oklch() color space for Lime theme, hex for Gold theme
- Accent opacity ladder: 14 steps (0.02 to 0.90) -- excellent architecture
- Three easing curves: spring `cubic-bezier(0.34,1.56,0.64,1)`, smooth `cubic-bezier(0.25,0.1,0.25,1)`, decel `cubic-bezier(0,0,0.2,1)`
- Font stack: TASA Orbiter (display), Geist (sans), Roboto Mono (mono)
- WebFetch cannot access compiled CSS/JS bundles -- extractions are reconstructed from rendered content + token pages
