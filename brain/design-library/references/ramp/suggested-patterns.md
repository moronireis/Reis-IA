# Ramp — Suggested Patterns

Source: https://ramp.com/expense-management
Harvested: 2026-04-15

## Pattern 1 — `patterns/proof/publication-grade-figure-frame.md`

- **Category**: proof
- **Rationale**: A wrapper component for case-study charts and data displays that enforces: figure number (e.g. "Fig. 03"), caption line, source line, grid alignment, tabular-figure numerals, and a subtle `rgba(255,255,255,0.06)` border. Turns every proof element into a publication figure. Directly consumed by the REIS case-study section.
- **File/line hints**: Ramp's content pages wrap charts in `<figure>` elements with caption siblings — inspect the harvested HTML around chart SVG/Lottie containers.

## Pattern 2 — `patterns/motion/lottie-number-ticker-on-reveal.md`

- **Category**: motion
- **Rationale**: A Lottie-driven or hand-rolled `requestAnimationFrame` number-counter animation that plays once when the element enters the viewport. Duration ~1000ms with ease-out, start from 0, end at the target metric (e.g. "R$2.3M"). Respect `prefers-reduced-motion` by jumping straight to final value. The single highest-impact motion technique in the Top 10 for REIS proof sections.
- **File/line hints**: Lottie player initialization inside Ramp's chart containers — not in the fetched HTML directly, but confirmed by the presence of the Lottie library in the payload.

## Pattern 3 — `patterns/typography/tabular-figures-for-numbers.md`

- **Category**: typography
- **Rationale**: A one-line CSS rule (`font-variant-numeric: tabular-nums;`) applied to any element displaying financial or statistical data. This is a trivial change with an outsized effect on perceived professionalism. Should be a global utility class in the REIS design system (`.tabular` or `.nums`).
- **File/line hints**: Ramp applies this to chart labels, case-study metrics, and hero statistics throughout the harvested HTML.
