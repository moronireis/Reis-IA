# Linear — Stack Detected

Source: https://linear.app
Harvested: 2026-04-15 (2.24 MB HTML)

## Framework

- **Next.js** — confirmed via `_next/` asset paths throughout
- **styled-components** — confirmed via `/*!sc*/` markers and `sc-` hashed class names
- **React** (implicit, underneath Next)

## CSS Strategy

- CSS-in-JS runtime (styled-components), not Tailwind, not CSS modules
- All design tokens live as CSS custom properties injected at runtime

## Motion / 3D / Scroll

- No GSAP, no Lenis, no Three.js, no Framer Motion, no Spline, no Lottie found in HTML payload
- Motion is CSS transitions + IntersectionObserver + pointermove listeners

## Fonts

- `--font-monospace` CSS var (likely Berkeley Mono or JetBrains Mono based on visual signature)
- Sans-serif via system stack fallback + custom Inter-family display font for headlines

## Build / Perf Hints

- Font preloads visible in `<head>`
- Aggressive code splitting (many `_next/static/chunks/*` scripts)
- Image optimization via Next `/image` pipeline

## Takeaway for REIS [IA]

Linear's stack is identical to our reis-ia-hub stack (Next + React) except that REIS uses Astro + Tailwind for marketing pages. The **tokens and motion language are fully portable**; only the implementation layer differs.
