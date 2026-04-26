# Linear — Suggested Patterns

Source: https://linear.app
Harvested: 2026-04-15

The orchestrator should consider distilling these into `brain/design-library/patterns/` for `vfx-motion-designer` consumption.

## Pattern 1 — `patterns/dark-editorial/near-black-tonal-ladder.md`

- **Category**: dark-editorial
- **Rationale**: Defines a 4-step near-black ladder (`#000000` → `#080808` → `#191D20` → `#0F3338`) used as sectional tonal shifts instead of dividers. This is the atomic move that makes dark mode feel premium instead of generic-SaaS-black. Directly portable to the REIS [IA] home.
- **File/line hints**: Linear styled-components class attributes on `<section>`-like divs carry `background-color` tokens — search the harvested `html.html` for `background:#08090A` and `background:#191D20` to see how sections alternate.

## Pattern 2 — `patterns/hero-effects/radial-spotlight-pointermove.md`

- **Category**: hero-effects
- **Rationale**: Pointermove-driven `radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(accent, 0.15), transparent 40%)` on a full-bleed hero background. Zero dependencies, zero performance cost, delivers the "interactive hero" feeling without any 3D. Perfect fit for REIS hero where we want gravity but no theatre.
- **File/line hints**: Inspect Linear's hero `<div>` — the background gradient uses CSS custom props updated via a pointermove listener on the viewport.

## Pattern 3 — `patterns/motion/ease-out-expo-house-curve.md`

- **Category**: motion
- **Rationale**: Codify `cubic-bezier(0.16, 1, 0.3, 1)` as a REIS design-system easing token (name it `--ease-out-expo` or `--ease-inevitable`). Paired with 400–600ms durations for reveals and 150–200ms for micro-hover, this single curve produces the "inevitable not animated" feel we want across the whole site.
- **File/line hints**: Grep harvested HTML for `cubic-bezier(0.16` to see usage context.
