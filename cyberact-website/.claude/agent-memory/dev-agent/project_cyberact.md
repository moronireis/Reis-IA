---
name: CyberAct Website — Project State
description: Stack, component locations, visual kit install, hero setup for cyberact-website
type: project
---

# CyberAct Website

**Stack**: Astro (static, no SSR adapter) + React islands + Tailwind CSS v4 (@tailwindcss/vite)  
**Build command**: `npm run build` from `/Users/moronireis/Projetos vscode/cyberact-website/`  
**Dev command**: `npm run dev`

## Key Directories

- Pages: `src/pages/` (index.astro, servicos.astro, sobre.astro, contato.astro, ticket.astro)
- Layouts: `src/layouts/Layout.astro` — single layout wrapping all pages, has nav + footer
- Components: `src/components/` — AnimatedNumbers.tsx, MockupDashboard.tsx, TestimonialCarousel.tsx, HeroDashboard.tsx, StatsStrip.tsx, ComparisonMockup.tsx, PhoneMockup.tsx
- Backgrounds: `src/components/backgrounds/` — CyberGridHero.tsx (active hero), ShaderGradientHero.tsx, GlowOrbHero.tsx
- Styles: `src/styles/global.css` — particle/scanline/noise-overlay CSS classes already defined here

## Visual Kit (installed 2026-06-01)

Packages added: `three @react-three/fiber @react-three/drei shadergradient framer-motion gsap @gsap/react lenis @tsparticles/react @tsparticles/slim simplex-noise`

## Hero Setup (index.astro) — Updated 2026-06-01

- **Layout**: Split 2-column on desktop (lg:grid-cols-2). Left = text, right = HeroDashboard mockup (hidden on mobile). Below hero = StatsStrip section.
- **HeroDashboard**: macOS-style 4-camera monitoring grid with animated detection box, scan line, sidebar icons, floating glass badges (precision 98.7%, alert CAM-02). Uses setInterval for alert toggle (3.5s) and scan line (50ms). All inline styles — no external deps.
- **StatsStrip**: 4-stat counter strip. grid-cols-2 md:grid-cols-4 (Tailwind classes for responsive). IntersectionObserver fade-up on scroll. Hover: subtle red tint bg shift via onMouseEnter/Leave inline style.
- **Background**: `CyberGridHero` (client:load) — Canvas 2D, no external deps
  - Perspective grid converging to vanishing point + 18 floating nodes + 4s pulse scan
  - Accent color: #e63946. Falls back to static CSS radial gradient on prefers-reduced-motion.
  - Throttled to 30fps to save battery. ResizeObserver handles resize.
  - Also copied to `/brain/design-library/hero-components/CyberGridHero.tsx`
- **Particles**: 6x `.particle` divs + 2x `.hero-scanline` divs inside hero (CSS-driven, complement the grid)
- **Noise overlay**: `noise-overlay` class on `<body>` in Layout.astro

## Shared Library

Hero components also saved to: `/Users/moronireis/Projetos vscode/brain/design-library/hero-components/`
- CyberGridHero.tsx — Canvas 2D perspective grid + nodes + pulse (no deps, 30fps, cybersecurity aesthetic)
- ShaderGradientHero.tsx — fluid mesh gradient (shadergradient)
- ParticleFieldHero.tsx — constellation particles (@tsparticles)
- GlowOrbHero.tsx — Canvas 2D floating orbs, no heavy deps

## Section Mockup Map (index.astro)

- Suporte Avançado section → `SuporteMockup` (from MockupDashboard.tsx)
- Segurança section → `SegurancaMockup` (from MockupDashboard.tsx)
- Monitoramento section → `PhoneMockup` (replaced MonitoramentoMockup 2026-06-01)
- Comparativo section → `ComparisonMockup` (replaced text table 2026-06-01)

## h2 Font Weights (index.astro)

"Simples. Prático. Eficiente." → font-light (intentional, hero intro tone)
All other section h2s → font-bold (Automatizamos, Seu ambiente precisa, Seu ambiente protegido, Nossos parceiros, Por que a diferença importa, Pronto para uma TI)

## Visual Polish (2026-06-01)

Surface token system added to global.css: `--color-cyber-base` (#080808, body bg), `--color-cyber-surface-1/2/3` for layered depth.
Card upgrade: border-top 2px red accent at 0.25 opacity, deeper shadow system on hover.
New utility classes: `.glow-ambient`, `.stat-glow`, `.quote-warm`, `.compare-row-hover`.
Gradient-line dividers before Depoimentos and CTA Final sections.
Segurança section: subtle blue radial tint overlay (rgba(20,20,60,0.15)).
Comparativo section: right-side red gradient tension (rgba(230,57,70,0.06)).
CTA Final gradient: strengthened to 0.08 opacity.

## Design System Tokens — Updated 2026-06-01

### Colors
- `cyber-red`: #e63946 | `cyber-red-dark`: #c1121f | `cyber-red-glow`: #ff1744
- `cyber-blue`: #2a5a8f (protected/safe states) | `cyber-blue-glow`: #3388cc
- `cyber-green`: #22c55e | `cyber-amber`: #f59e0b
- `cyber-base`: #060608 (body bg) | surface-1: #0c0c12 | surface-2: #131320 | surface-3: #1a1a2a
- `cyber-black`: #0a0a0a | `cyber-dark`: #111111 | `cyber-white`: #ffffff | `cyber-text`: #a0a0a0 | `cyber-border`: #2a2a2a

### Typography
- `--font-sans`: Inter (weights 300–900) via Google Fonts
- `--font-mono`: JetBrains Mono (weights 400/500/600) via Google Fonts
- Utility class: `.font-mono`

### Noise Overlay
- `.noise-overlay::before` opacity: 0.035 (was 0.015 — now visible)

### Cards
- Hover: translateY(-4px), box-shadow 0.12 red tint, bg shifts to surface-3

### Gradient Line
- `.gradient-line` uses rgba(230,57,70,0.4) — more visible than solid red

### Partner Logos
- `.partner-logo`: 0.5 opacity + grayscale, hover → full opacity + color

## Notes

- shadergradient is heavy (Three.js under the hood) — chunk size warning on build is expected and non-blocking
- `ShaderGradientCanvas` and `ShaderGradient` must be lazy-imported to avoid SSR errors
- GlowOrbHero uses Canvas 2D with hexToRgba helper (handles #rrggbb, #rgb, shorthand formats)
- Astro config: no output adapter set → pure static generation

**Why:** Needed to track stack details, visual kit state, and component locations for future sessions.
**How to apply:** When resuming CyberAct work, check this file first before reading source files.
