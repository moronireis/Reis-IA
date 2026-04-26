# Raycast — Suggested Patterns

Source: https://www.raycast.com
Harvested: 2026-04-15

## Pattern 1 — `patterns/hero-effects/scripted-state-machine-demo.md`

- **Category**: hero-effects
- **Rationale**: A React component that replaces a hero video/GIF with a scripted state machine advancing through method phases at a premium cadence. Uses `setTimeout`/`setInterval` (or better, an explicit state-machine library like XState) to drive content updates inside a framed panel. Accessible, responsive, themeable, respects reduced-motion. For REIS this becomes "Diagnóstico → Roadmap → Implementação → Resultado" playing out in the hero. Single highest-value interactive pattern from the Raycast harvest.
- **File/line hints**: Raycast's hero demo component lives in client JS; behavior observable via visual inspection of the live site.

## Pattern 2 — `patterns/typography/monospace-editorial-punctuation.md`

- **Category**: typography
- **Rationale**: Formalize monospace usage as *editorial punctuation* rather than *technical content marker*. Rules: mono for method-step labels, phase numbers, metadata, keyboard hints, file paths, and small-caps section headers. Never for body. This pattern overlaps slightly with Vercel's `mono-companion-for-metadata` — they should probably be consolidated into a single definitive pattern.
- **File/line hints**: Raycast uses monospace in dozens of small-label contexts throughout the harvested HTML.

## Pattern 3 — `patterns/layout/mathematical-card-stacking.md`

- **Category**: layout
- **Rationale**: A component-gallery pattern enforcing rigidly uniform card dimensions (fixed aspect ratio, fixed padding, fixed inner type scale) across a section. Prohibits "hero card" variants or dimension-breaking decorative cards. The discipline itself is the composition. Directly applicable to the REIS pillar/case-study grid.
- **File/line hints**: Raycast's extension gallery section — all cards are visibly identical in dimensions in the rendered page.
