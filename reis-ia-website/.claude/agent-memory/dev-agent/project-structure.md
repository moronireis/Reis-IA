---
name: Project Structure
description: Astro project layout, key file paths, CSS architecture for reis-ia-website after Phase 6.1 rebuild
type: project
---

**Project root:** `/Users/moronireis/Projetos vscode/reis-ia-website/`

**Why:** Phase 6.1 Foundation rebuild from zero. All styles, components, and layout rebuilt with complete design system tokens including layer-specific tokens (Builder, Systems, Moroni Reis), Z7 animations, kinetic typography, and sand particle transitions.

**How to apply:** Always use absolute paths. Run `npm run build` to verify changes. Dev server: `npm run dev`.

## CSS Layer Order (Critical)
1. `src/styles/design-system.css` — All CSS custom properties (:root tokens). Never add styles here, only variables. Includes layer-specific tokens (--builder-*, --systems-*, --moroni-*).
2. `src/styles/animations.css` — All animation classes, signature effects (sapphire-scanner, aurora-bg, etc.), VFX (H1-B interactions, Z7 animations, kinetic typography, compression bar, sand particles), ambient effects, utility animations.
3. `src/styles/global.css` — Imports both above + Tailwind. Contains @theme block for Tailwind v4, base styles, button system (btn/btn-primary/btn-secondary/btn-ghost + btn-md/btn-lg/btn-hero), component classes (badge, input, hairline grid, kpi-card, tabs, skip-to-content, card-interactive, card-featured), hardware-adaptive rendering rules.

## Tailwind v4 Setup
- Uses `@tailwindcss/vite` plugin (not PostCSS, no tailwind.config.mjs)
- Theme tokens defined in `@theme` block inside global.css
- React integration via `@astrojs/react`

## Key Components
- `Nav.astro` — Fixed top, transparent default, glassmorphism on scroll via `data-scrolled` JS attribute. Links: Home, Time Builders, Systems. CTA: Agendar -> /agendar
- `Footer.astro` — Surface-1 bg, blue gradient divider at top, 4-col (brand + Ecossistema + Recursos + Contato). "O Tempo e Rei" tagline. Social icons (LinkedIn, Instagram).
- `MainLayout.astro` — Base layout with lang="pt-BR", imports global.css, skip-to-content link, all IntersectionObservers (scroll reveal, grid stagger, text reveal, counter, compress-bar, nav scroll state), hardware-adaptive rendering script (3 tiers: low/medium/high)
- `HourglassIcon.astro` — H1-B Variation A brand mark (viewBox 0 0 64 64, 5 lines: M14,8-L50,8 / L50,8-L14,56 / L14,8-L25,25 / L39,39-L50,56 / L14,56-L50,56). Default strokeWidth=5.
- `HourglassWatermark.astro` — H1-B as watermark (3-4% opacity, absolute positioned, breathing animation via .hourglass-watermark-animate)
- `Button.astro` — Uses btn system classes. Variants: primary/secondary/ghost/hero. Sizes: md/lg/hero.
- `Badge.astro` — accent/success/warning/error/neutral using global CSS badge classes
- `SectionLabel.astro` — `[01] LABEL` pattern in accent blue
- `StatBlock.astro` — Auto-detects numeric values for counter animation via data attributes
- `TestimonialBlock.astro` — Blue left border, decorative quote mark at 20% blue opacity
- `HighlightBanner.astro` — Blue-tinted bg gradient, badge, CTA with arrow
- `SapphireScanner.astro` — Wrapper applying `.sapphire-scanner` rotating blue border class
- `AmbientPool.astro` — Configurable floating blue/neutral radial gradient with position prop
- `FaqAccordion.tsx` — React island, exclusive-open, chevron icon rotation
- `LogoMarquee.astro` — Text or image logos with marquee-mask edge fade
- `Z7Icon.astro` — NEW: Z7 combined SVG (Z at 0.7 opacity, 7 at 1.0). Variants: stroke/fill/glow.

## Brand Rules
- H1-B Hourglass is the ONLY brand mark. Z7 is secondary symbol.
- NO chess pieces, crowns, gold/amber/terracotta anywhere
- "Reis IA" wordmark uses font-weight 300 (light) in lockups
- All accent blue #4A90FF, hover #6AADFF, muted #3570CC
- All colors via CSS custom variables, never hardcoded hex in components

## Observer Classes (handled by MainLayout.astro script)
- `.animate-on-scroll` -> adds `.is-visible` on intersection
- `.animate-fade-in` -> adds `.is-visible`
- `.animate-scale-reveal` -> adds `.is-visible`
- `.animate-perspective-up` -> adds `.is-visible`
- `.grid-stagger` -> adds `.in-view` on parent
- `.text-reveal` -> adds `.in-view`
- `.compress-bar` -> adds `.is-visible`
- `[data-counter]` -> triggers counter animation
