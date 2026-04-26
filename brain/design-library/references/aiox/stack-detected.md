# AIOX Squad -- Stack Detected
## Source: https://brand.aioxsquad.ai/
## Extracted: 2026-04-22

---

## Framework

| Component | Detected | Evidence |
|-----------|----------|----------|
| **Next.js** | YES | `/_next/static/` paths in HTML, `__next` div wrapper (17 occurrences), `dpl_` deployment hashes in asset URLs, `<html lang="en" class="dark">` SSR output |
| **React** | YES | Radix UI primitives (45 occurrences), component hydration scripts |
| **Tailwind CSS v4.2.1** | YES | `/*! tailwindcss v4.2.1 | MIT License */` at top of 214KB stylesheet, `@layer theme` + `@layer properties` structure, `--tw-*` custom properties |

## UI Component Library

| Component | Detected | Evidence |
|-----------|----------|----------|
| **Radix UI** | YES | 45 `radix` references in main HTML, accordion Radix variables (`--radix-accordion-content-height`) in CSS keyframes |
| **shadcn/ui** | YES | Radix primitives + Tailwind class patterns + component structure matches shadcn conventions; `--radius-*` tokens, `--border`, `--card` CSS variables |
| **Recharts** | YES | 38 `recharts` references in CSS (chart components), 12 chart types documented including SVG bar/donut/line/area/pie/radar |
| **Lucide Icons** | YES | 10 `lucide` references in main HTML, stroke-based icon system matching Lucide conventions |

## Motion / Animation

| Library | Detected | Evidence |
|---------|----------|----------|
| **Framer Motion** | YES | `Framer` (1x) + `motion` (14x) + `Motion` (5x) in motion page HTML; motion page explicitly states "Framer Motion (GPU-Accelerated)"; 8 named animations with spring physics |
| GSAP | NO | Zero matches for `gsap`, `ScrollTrigger`, `CustomEase`, `SplitText` across all 20+ harvested pages |
| Three.js / R3F | NO | Zero matches for `three`, `THREE.`, `@react-three`, `Canvas`, `useFrame` |
| Spline | NO | Zero matches for `spline-viewer`, `splinetool` |
| Lenis | NO | Zero matches for `lenis`, `@studio-freight` |
| Custom WebGL | NO | Zero matches for `.glsl`, `gl_FragColor`, `precision mediump` |

## Typography / Fonts

| Font | Detected | Evidence |
|------|----------|----------|
| **Geist** (sans) | YES | `var(--font-geist-sans)` in CSS theme, 15 `geist`/`Geist` references in CSS, `.woff2` preload in HTML head |
| **Geist Mono** | YES | `var(--font-geist-mono)` in CSS theme |
| **TASA Orbiter** | YES | Referenced in brandbook as display font (weight 800) |
| **Roboto Mono** | YES | In font stack fallback: `"Roboto Mono"` |
| **Inter** | YES | In font stack fallback: `"Inter"` (after Geist) |

Font loading: `<link rel="preload" href="/_next/static/media/...woff2" as="font" crossorigin="" type="font/woff2"/>` -- two woff2 files preloaded (Geist Sans + Geist Mono).

## Hosting / Deployment

| Component | Detected | Evidence |
|-----------|----------|----------|
| **Vercel** | YES | `dpl_EZqVyWMFBqr2dr6MzRanLJ7GcyZe` deployment hash in all asset URLs; Next.js default deployment platform |
| **Domain** | brand.aioxsquad.ai | Subdomain for brandbook; canonical URL `https://aiox.ai` |

## CSS Architecture

- **Methodology:** Tailwind CSS v4 utility-first + custom `--bb-*` brand token layer
- **Color space:** oklch (modern perceptual color space) throughout
- **Token namespace:** All brand tokens prefixed `--bb-` (brandbook)
- **Minification:** Yes -- single minified CSS file (214KB)
- **CSS Layers:** `@layer properties`, `@layer theme` (Tailwind v4 native layers)
- **Color mixing:** `color-mix(in oklab, ...)` for opacity variants with `@supports` fallbacks

## Content Management

- Static content rendered server-side via Next.js
- 27 pages total in the brandbook
- Portuguese + English bilingual content
- Version labeled: "Brand Identity System v2.0 // Dark Cockpit Edition"

## GitHub Repository

- Public repo: https://github.com/SynkraAI/aiox-core (linked in footer)

---

## Stack Summary

```
Next.js (SSR/SSG) + React
  UI: shadcn/ui + Radix UI primitives
  Styling: Tailwind CSS v4.2.1 (oklch, @layer, color-mix)
  Motion: Framer Motion (GPU-accelerated, spring physics)
  Charts: Recharts (12 chart types)
  Icons: Lucide (stroke-only, currentColor)
  Fonts: Geist (sans + mono), TASA Orbiter (display), Roboto Mono (code)
  Deploy: Vercel
```

This is a **modern 2026 stack** -- Tailwind v4 with oklch colors and native CSS layers is bleeding-edge. The shadcn/ui + Radix + Framer Motion combination is the current React premium standard.
