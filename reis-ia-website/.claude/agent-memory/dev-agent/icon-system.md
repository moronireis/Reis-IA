---
name: Icon System
description: Inline SVG icon system — design standards, component location, brand mark rules after Phase 1 rebuild
type: project
---

## Icon component location
`src/components/icons/` — 31 Astro components (IconMenu, IconX removed from Nav, now inline SVG), all inline SVG, no npm icon libraries.

## Design standards (every icon must follow)
- Style: outline only (no filled icons)
- Stroke width: 1.5px consistently
- Corners: `stroke-linecap="round" stroke-linejoin="round"`
- ViewBox: 24x24
- Color: `currentColor` by default
- Props: `size` (default 24) and `class`
- Always `aria-hidden="true"` on decorative icons

## Brand Mark: H1-B Hourglass ONLY
- `HourglassIcon.astro` — H1-B Variation A (viewBox 0 0 64 64, 6 lines). Used for inline brand mark.
- `HourglassWatermark.astro` — H1-B Open Intersection (viewBox 0 0 100 140, gap at center). Used for section watermarks at 3-4% opacity.
- `ChessKnightIcon.astro` — DEPRECATED STUB. Renders HourglassIcon. Remove when pages are rebuilt.
- NO chess pieces, crowns, or non-hourglass brand marks.

## Icon color in new design system
- Accent icons: `text-[var(--accent-blue)]` or `class="icon-accent"`
- Default icons: `class="icon-default"` (text-secondary)
- Sizes via classes: `.icon-xs` (12px) through `.icon-xl` (32px)

## Icon placement rules
- Feature/pillar cards: size 28-32, accent blue
- Process steps: size 22, accent blue
- Nav brand lockup: HourglassIcon size 24 + "REIS IA" font-weight 300 (light)
- Footer brand lockup: same pattern as nav
- Section watermarks: HourglassWatermark at 200-300px, 3-4% opacity, positioned at section corners

**Why:** Unified visual identity with hourglass as sole brand mark. Blue accent replaces gold.
**How to apply:** Every new icon should be an Astro component in `src/components/icons/`. Brand mark is always HourglassIcon or HourglassWatermark.
