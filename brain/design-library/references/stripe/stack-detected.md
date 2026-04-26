# Stripe — Stack Detected

Source: https://stripe.com
Harvested: 2026-04-15 (629 KB HTML)

## Framework

- **Next.js** — `__NEXT_DATA__` blob present, `_next/` asset paths
- **React** under Next
- Custom CSS architecture (no Tailwind, no styled-components markers)

## Hero Animation

- Custom in-house WebGL gradient mesh (Stripe's open-sourced idea, widely forked as "Stripe gradient")
- Canvas-based, not DOM-based

## Fonts

- Proprietary Sohne-family display + system stack fallback
- Heavy preload in `<head>`

## Motion / 3D

- No GSAP, no Lenis, no Framer Motion, no Three.js, no Spline, no Lottie detected in payload
- Motion budget spent on the hero gradient only; rest of page is nearly motionless

## Build / Perf

- Aggressive font preload
- Image optimization via Next pipeline
- Heavy code splitting
