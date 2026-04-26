# Pentagram — Suggested Patterns

Source: https://www.pentagram.com
Harvested: 2026-04-15

## Pattern 1 — `patterns/layout/asymmetric-disciplined-case-grid.md`

- **Category**: layout
- **Rationale**: A case-study grid pattern where thumbnails are staggered (intentionally broken from a uniform row) but still honor a shared vertical rhythm and column grid. The asymmetry creates editorial cadence, the shared grid prevents chaos. Directly applicable to the REIS case-study section.
- **File/line hints**: Pentagram's home grid uses CSS grid with offset rows visible in the harvested HTML structure.

## Pattern 2 — `patterns/typography/oversized-swiss-display-type.md`

- **Category**: typography
- **Rationale**: H1 set at 100–140px on desktop, weight 600–700, letter-spacing -0.04em, line-height 0.9–1.0. The single move that separates "clean" from "editorial luxe". For REIS this means cranking the hero H1 scale far beyond conventional SaaS-site sizes. Inter at weight 600 at 120px is the closest REIS-compatible equivalent.
- **File/line hints**: Pentagram hero H1 visible in the harvested HTML with inline font-size declarations.

## Pattern 3 — `patterns/motion/work-as-motion-budget.md`

- **Category**: motion
- **Rationale**: A design-system rule stating that motion budget should be spent on the *content* (videos, animated artifacts, case-study previews) rather than on the *chrome* (backgrounds, transitions, hover effects). Inverts the SaaS default. Overlaps with Stripe's `single-motion-budget` — they can be consolidated or cross-referenced.
- **File/line hints**: N/A — philosophy pattern.
