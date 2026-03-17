---
name: Icon System
description: Inline SVG icon system — design standards, component location, and placement rules
type: project
---

## Icon component location
`src/components/icons/` — 32 Astro components, all inline SVG, no npm icon libraries.

## Design standards (every icon must follow)
- Style: outline only (no filled icons)
- Stroke width: 1.5px consistently
- Corners: `stroke-linecap="round" stroke-linejoin="round"`
- ViewBox: 24x24
- Color: `currentColor` by default
- Props: `size` (default 24) and `class`
- Always `aria-hidden="true"` on decorative icons

## Brand icons updated to match system
- `HourglassIcon.astro` — updated to stroke-width 1.5, round caps, 24x24 viewBox
- `ChessKnightIcon.astro` — updated from filled to outline style, same standards

## Icon placement rules
- Feature/pillar cards: size 28–32, `text-accent`, add `icon-hover` + `group` on parent
- Process steps: size 22, `text-accent`, next to step number
- Benefit lists: size 16–18, accent or green
- Guarantee/shield icons: size 32–48, standalone above heading
- Nav: size 24, `IconMenu` and `IconX`

## Icon hover animation
Add `class="icon-hover"` to icon + `class="... group"` to parent card.
CSS in global.css: `.group:hover .icon-hover { transform: scale(1.1); color: var(--color-accent) }`

## Existing inline SVG X/close icons
For "not for" qualifier lists, use inline SVG directly (not IconX component) to keep color customization via style attribute: `style="color: rgba(239,68,68,0.45);"`.

## Green checkmarks
Use `IconCheckCircle` with `style="color: #4ade80;"` — not class, because Tailwind text-green-500 may not purge correctly in all contexts.

**Why:** Consistent visual DNA across all 3 pages. No external network requests. Full control over stroke/color/size.
**How to apply:** Every new icon added to this project should be an Astro component in `src/components/icons/` following these standards.
