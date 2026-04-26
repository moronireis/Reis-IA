# Ramp — Stack Detected

Source: https://ramp.com/expense-management
Harvested: 2026-04-15 (1.5 MB HTML — subpage; homepage returned only 15 KB likely due to anti-bot/SPA rendering)

## Framework

- **Next.js** — `_next/` references
- **React**

## Motion / Animation

- **Lottie** — confirmed in payload (only Top 10 ref with explicit Lottie usage)
- No GSAP, Lenis, Three.js, Framer Motion, Spline

## CSS Strategy

- Custom CSS (no Tailwind markers detected)

## Fonts

- Proprietary display sans (editorial signature)

## Build / Perf

- Standard Next optimizations
- Heavy image/chart preload

## Harvest Note

Ramp's homepage initial HTML returned only ~15 KB — classic SPA shell with client-rendered content. The `/expense-management` subpage returned a full 1.5 MB of server-rendered content. This is the recommended harvest target for any future Ramp extraction.
