# Ramp — Motion Config

Source: https://ramp.com/expense-management
Harvested: 2026-04-15

## Libraries Detected

- **Lottie** — confirmed in payload. Used almost certainly for chart/infographic intro animations (financial dashboards loading in, numbers counting up).
- No GSAP, Lenis, Three.js, or Framer Motion strings found in the static HTML.

## Signature Motion

- **Chart reveal animations** — likely Lottie-rendered JSON animations played on IntersectionObserver
- **Number tickers** — counting-up animations for financial metrics (standard Lottie or hand-rolled requestAnimationFrame)
- **Tonal section transitions** — atmospheric shifts via background color changes, not transforms
- **Hover states on table rows and cards** — subtle border color changes

## Easing & Duration

- Financial data reveals typically use ease-out curves (numbers land) with 800–1200ms durations
- Hover micro-interactions at 150–200ms

## Scroll Behavior

- Native scroll
- Sticky section headers on dense comparison pages

## Transferable for REIS [IA]

The Lottie-for-chart-reveal move is high-value for REIS when we present proof — revenue numbers, case study outcomes, pillar metrics. A Lottie animation of a number counting up, framed as an editorial figure with a caption, is exactly the "publication-grade proof" move we want. This is arguably the single most actionable technique in the Top 10 for our case-study section.
