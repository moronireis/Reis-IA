---
name: AIOX Full Extraction Complete (Phase A)
description: Complete extraction of brand.aioxsquad.ai — 40 pages, 120+ CSS tokens, 60+ components, 31 patterns, 8 animations, 9 chart types. Produced 45 files total in aiox-full-extraction/ directory.
type: project
---

Completed FULL extraction of all 40 pages from brand.aioxsquad.ai on 2026-03-16.

**Why:** Marked as HIGHEST PRIORITY reference by user. Blueprint for building the Reis IA brand site.

**How to apply:** AIOX's architecture (token organization, component catalog, navigation structure, section patterns) is the structural model for Reis IA. Visual language (lime/HUD/cyberpunk) should NOT be adopted -- only structural patterns. Key adoptable patterns: accent opacity ladder, 1px-gap hairline grid technique, shadcn/ui bridge tokens, 14-step spacing scale, 4-tier text opacity hierarchy, clamp() fluid typography, section numbered labels, staircase layouts.

Key technical notes:
- Site uses Next.js 14+ with RSC streaming + Tailwind CSS + Framer Motion
- OKLCH color space for primary tokens; hex/rgba for export compatibility
- Dual theme (lime #D1FF00 / gold #DDD1BB) via CSS variable swapping
- 31 CSS-only background patterns (grids, frames, hazard, circuit, textures, dividers)
- shadcn/ui compatibility built into token export (--background, --primary, etc.)
- Font fallback stack includes Inter (Reis IA's primary font)
- 45 output files in: `/Users/moronireis/Projetos vscode/brain/assets/design-systems/aiox-full-extraction/`
  - 40 individual page files (page-*.md)
  - 5 aggregate files: sitemap-structure.md, css-tokens-complete.md, components-catalog.md, navigation-structure.md, layout-patterns.md
