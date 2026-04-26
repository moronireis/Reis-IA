# Lenis Smooth Scroll Baseline (Castelo / Di Matoso)

**Category**: motion / foundation
**Difficulty**: foundational
**Dependencies**: Lenis (~8 KB minified, OSS). Optional — native `scroll-behavior: smooth` is acceptable fallback for document-length pages.
**Source refs**:
- `brain/design-library/patterns/lenis-smooth-scroll/01-global-smooth-scroll.md`
- `brain/design-library/patterns/SEED.md` §9
- `brain/assets/branding/art-direction-brief-castelo-dimatoso.md` §3.1

## Intent

A calm, inertial smooth-scroll base layer underneath every other motion pattern. Lenis interpolates scroll deltas so fade-ups and clip-path reveals receive a smooth input signal. Without it on heavy-photography pages, IntersectionObserver triggers can feel jittery on trackpads.

**For Castelo + Di Matoso specifically**: the ceiling reference (`castelo-estrategia`) chose native `scroll-behavior: smooth` over Lenis. That is acceptable for document-length strategy pages. For the final Castelo + Di Matoso marketing sites — which are **image-heavy with 1vh+ sections and clip-path plate reveals** — Lenis is justified. The weight (~8KB) is earned.

## When to use

- Castelo dos Lagos production site (YES)
- Buffet Di Matoso production site (YES)
- Any page with 3+ full-viewport photographic sections
- Any page using clip-path plate reveals or parallax pull-quotes
- **Skip** on strategy/internal documents, text-first pages, long-form articles without hero imagery — native smooth scroll suffices

## Dependencies

```bash
npm install @studio-freight/lenis
```

## Config — Castelo dos Lagos

```js
/* Pattern: brain/design-library/patterns/motion/lenis-smooth-scroll-baseline.md */
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,                                              // catch-up time
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),   // ease-out-expo (matches house curve)
  smoothWheel: true,
  smoothTouch: false,         // iOS/Android keep native momentum
  wheelMultiplier: 1,         // do not amplify wheel — luxo calmo
  touchMultiplier: 2,
  lerp: 0.1,                  // interpolation rate — lower = slower/smoother
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Accessibility: disable if user prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  lenis.destroy();
  document.documentElement.style.scrollBehavior = 'auto';
}
```

## Config — Buffet Di Matoso

Identical config to Castelo. Intentional — the two brands share the same scroll cadence so the overall "luxo calmo" is consistent across the branded house.

## Key rules

- **`wheelMultiplier: 1`** — never amplify. Luxury scroll is calm, not eager.
- **`lerp: 0.1`** — slower interpolation than Lenis default (0.15). Reinforces the "felt, not seen" philosophy.
- **No smoothTouch** — mobile native momentum is better than any JS simulation.
- **Destroy on reduced-motion** — mandatory. Falls back to native scroll.
- **Load order**: Lenis initializes BEFORE the IntersectionObserver for fade-ups, so observers receive smoothed scroll events.

## Weight / budget

- Lenis: ~8KB minified, ~3KB gzipped.
- Total motion JS budget for Castelo/Di Matoso MVP: Lenis (8KB) + fade-up observer (~0.6KB) = under 10KB. Well within premium-site budget.

## Reduced motion fallback

- Lenis is `destroy()`'d at init time if `prefers-reduced-motion: reduce` matches.
- `html.style.scrollBehavior = 'auto'` overrides any CSS smooth-scroll rule.

## Brand usage

Both brands. Same config. Ship first — it is the substrate under every other motion pattern.

## Common mistakes

- Using Lenis defaults (`lerp: 0.15`, `wheelMultiplier: 1.0` but no `lerp` tuning) — too "bouncy" for luxury
- Forgetting to sync with IntersectionObserver (works anyway; Lenis uses native scroll events under the hood)
- Loading Lenis on text-only pages (weight with no payoff)
- Skipping the reduced-motion destroy (accessibility fail)
