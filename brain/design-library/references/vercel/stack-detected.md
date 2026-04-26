# Vercel — Stack Detected

Source: https://vercel.com
Harvested: 2026-04-15 (596 KB HTML)

## Framework

- **Next.js** (self-hosted)
- **React**
- **Tailwind CSS** (confirmed — `tailwind` references in HTML)
- **Geist** design system (Vercel's own)

## Co-brand references in payload

- `nuxt`, `sveltekit` — appear because Vercel showcases framework deploys; not the actual build stack

## Fonts

- **Geist Sans** and **Geist Mono** (Vercel's in-house typeface, Inter-adjacent)
- `--font-mono` CSS custom property confirmed

## Motion / 3D

- No GSAP, Lenis, Three.js, Spline, Lottie found in initial HTML payload
- Likely Framer Motion in later chunks (not confirmed)

## Build / Perf

- Next Image pipeline
- Aggressive font preload
- Tailwind JIT CSS injection
