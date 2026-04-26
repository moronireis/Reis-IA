# Fade-Up IntersectionObserver (Restrained Scroll Reveal)

**Category**: motion
**Difficulty**: foundational
**Dependencies**: Vanilla JS only. No GSAP, no Framer, no Lenis required.
**Source refs**:
- `brain/design-library/references/castelo-estrategia/motion-config.md` §4
- `brain/design-library/references/castelo-estrategia/suggested-patterns.md` Pattern 4
- `brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md` (house curve)

## Intent

The DEFAULT scroll reveal for every premium editorial page. Before reaching for GSAP, Framer Motion, or Lenis-scrubbed animations, ship this. 90% of "premium scroll reveals" in competitive refs are just opacity + 20–24px translateY + the house curve at 800–900ms. Slower than you think feels premium; 400ms reveals feel reactive.

## When to use

- ALWAYS as the baseline scroll reveal on any REIS [IA] marketing page, brandbook, client deliverable, or long-form editorial layout.
- First motion pattern to ship on any new site — gate everything else on this existing.
- Castelo dos Lagos, Buffet Di Matoso, reis-ia-website, reis-ia-brand, all consumer-facing landing pages.

## Trigger

IntersectionObserver fires when the element crosses the viewport threshold. One-shot: once revealed, stays revealed.

## CSS

```css
/* Pattern: brain/design-library/patterns/motion/fade-up-intersection-observer.md */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity   var(--motion-base, 900ms) var(--ease-house, cubic-bezier(0.16, 1, 0.3, 1)),
    transform var(--motion-base, 900ms) var(--ease-house, cubic-bezier(0.16, 1, 0.3, 1));
  will-change: opacity, transform;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hardware acceleration cleanup once animation is settled */
.fade-in.visible {
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

## JS

```js
/* Pattern: brain/design-library/patterns/motion/fade-up-intersection-observer.md */
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target); // one-shot — stop watching
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -80px 0px', // fire 80px before element enters bottom
});

document.querySelectorAll('.fade-in').forEach((el) => io.observe(el));
```

Total weight: ~0.6 KB of JS + ~0.3 KB of CSS. No library.

## Key rules

- **Distance is subtle**: 24px translateY. Never more than 40px (becomes theme-park).
- **Duration is slow**: 800–900ms is the floor. Faster breaks the premium feel.
- **One curve only**: `cubic-bezier(0.16, 1, 0.3, 1)` — the house curve. Never substitute.
- **One-shot**: use `unobserve()`. Reverse-on-exit is cheap and distracting.
- **Threshold 0.12** with `rootMargin: -80px` gives a preload feel — element is already fading in by the time it fully enters.

## Performance notes

- Only animates `opacity` + `transform` → GPU-accelerated, 60fps everywhere.
- `will-change` applied in initial state, reverted post-reveal.
- IntersectionObserver is native (no rAF loop, no scroll listener).

## Reduced motion fallback

`@media (prefers-reduced-motion: reduce)` → elements arrive in final state with zero transition. Mandatory. Do not ship this pattern without it.

## Brand usage

- **Castelo dos Lagos**: base duration 900ms. Every section heading, body paragraph, image.
- **Buffet Di Matoso**: base duration 1200ms (slightly slower — culinary calm). Every non-plate content element.
- **REIS [IA] marketing**: 900ms default.

## Common mistakes

- Using 300–500ms (feels reactive, not editorial)
- Using spring easing (breaks brand — luxury never bounces)
- Re-triggering on exit (cheap)
- Forgetting prefers-reduced-motion (a11y fail)
- Animating on `top/left/height` (kills 60fps)
