# Patterns Index — REIS [IA] Design Library

Last updated: 2026-04-15

Single entry point for all distilled patterns. Read this first before implementing motion. Consult the matching file for the full recipe.

See also: `SEED.md` (11 curated starter patterns), `README.md` (library rules).

---

## gsap-scroll-trigger/

- **[01-pinned-hero-reveal.md](gsap-scroll-trigger/01-pinned-hero-reveal.md)** — Pin the hero while copy and an accent-blue sweep land on scroll. Signature entrance.
- **[02-horizontal-section-scroll.md](gsap-scroll-trigger/02-horizontal-section-scroll.md)** — Horizontal showcase driven by vertical scroll with snap + easing. Three-pillar reels.

## three-js/

- **[01-product-spin-r3f.md](three-js/01-product-spin-r3f.md)** — GLTF product spin with React Three Fiber + Drei, studio lighting, spring-drag controls.
- **[02-shader-gradient-mesh.md](three-js/02-shader-gradient-mesh.md)** — Fullscreen shader backdrop (dark + #4A90FF) as living ambient layer. One per view.

## lenis-smooth-scroll/

- **[01-global-smooth-scroll.md](lenis-smooth-scroll/01-global-smooth-scroll.md)** — Lenis foundation with rAF ticker. MANDATORY base layer for every REIS [IA] surface.
- **[02-lenis-scrolltrigger-sync.md](lenis-smooth-scroll/02-lenis-scrolltrigger-sync.md)** — The sync trap: driving ScrollTrigger from Lenis's rAF so scrubs stay locked.

## editorial/

- **[01-split-text-word-reveal.md](editorial/01-split-text-word-reveal.md)** — Word-by-word headline reveal (no paid SplitText). 40ms stagger, overflow mask.
- **[02-magnetic-cursor-cta.md](editorial/02-magnetic-cursor-cta.md)** — Magnetic primary CTA with rAF interpolation. Premium confidence signal.

## hero-effects/

- **[03-scripted-state-machine-demo.md](hero-effects/03-scripted-state-machine-demo.md)** — React state-machine hero "product demo" with no video. Timed phases, pause on hover, reset on scroll-out. Raycast-lineage.

## layout/

- **[02-chaptered-scroll-composition.md](layout/02-chaptered-scroll-composition.md)** — Long-form page composed as 4–6 narrative chapters with distinct tonal registers and film-cut boundaries. Home architecture pattern.

## motion/

- **[02-ease-out-expo-house-curve.md](motion/02-ease-out-expo-house-curve.md)** — Canonizes `cubic-bezier(0.16, 1, 0.3, 1)` as house curve plus three companions as named CSS tokens. Every motion in the library consumes this.

## proof/

- **[01-lottie-number-ticker-on-reveal.md](proof/01-lottie-number-ticker-on-reveal.md)** — IntersectionObserver-triggered number count-up via vanilla `requestAnimationFrame`. Fires once, tabular-nums, format-aware. No Lottie runtime despite the name.
- **[02-publication-grade-figure-frame.md](proof/02-publication-grade-figure-frame.md)** — FT/Bloomberg-style `<figure>` container with mono figure-number, editorial caption, source line, hairline border. Default frame for all REIS proof.

---

## Consumption rules

1. `vfx-motion-designer` MUST check this index before implementing motion. Reuse before reinvent.
2. Every pattern includes mandatory `prefers-reduced-motion` handling — never strip it.
3. All code examples use REIS [IA] tokens: `#000000`, `#4A90FF`, Inter font, dark-mode assumption.
4. When adding a new pattern: create the file under the matching category, add a one-liner here, cross-link from `SEED.md` if relevant.

## Changelog

- 2026-04-15 — Initial seeding: 8 patterns across 4 categories (2 per category).
- 2026-04-15 — Phase 2 distillation: +5 patterns from harvest (raycast, arc-browser, linear, ramp, mercury). New categories populated: `hero-effects/`, `layout/`, `motion/`, `proof/`. Total: 13 patterns.
