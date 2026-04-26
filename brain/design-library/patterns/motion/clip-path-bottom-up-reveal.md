# Clip-Path Bottom-Up Reveal

**Category**: motion
**Difficulty**: intermediate
**Dependencies**: Vanilla CSS + IntersectionObserver. GSAP only as fallback if vanilla proves insufficient.
**Source refs**:
- `brain/assets/branding/art-direction-brief-castelo-dimatoso.md` §3.6
- `brain/design-library/references/buffet-gastronomia-premium-2026.md` §6.2
- `brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md`

## Intent

A plate photograph reveals from bottom to top as if a waiter is placing it on the table. Motion is slow (1200ms) and single-directional — never top-down, never side-to-side. The metaphor is physical arrival, not a transition effect.

This is the **Buffet Di Matoso signature hero move**. Paired with the image-first / text-after stagger rule, it becomes the brand's motion fingerprint.

## When to use

- Di Matoso plate hero sections (mandatory)
- Plate galleries where each row reveals on scroll
- Course reveal sequences (appetizer → main → dessert)
- NEVER on Castelo (Castelo's signature is the cinemagraph — keep them distinct)
- NEVER on non-food imagery

## Trigger

IntersectionObserver — same observer as fade-up.

## CSS

```css
/* Pattern: brain/design-library/patterns/motion/clip-path-bottom-up-reveal.md */
.plate-reveal {
  clip-path: inset(100% 0 0 0); /* fully clipped from the bottom */
  transition: clip-path 1200ms var(--ease-house, cubic-bezier(0.16, 1, 0.3, 1));
  will-change: clip-path;
}

.plate-reveal.visible {
  clip-path: inset(0 0 0 0); /* revealed */
}

.plate-reveal.visible {
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .plate-reveal {
    clip-path: none;
    transition: none;
  }
}
```

## JS

Reuse the fade-up observer:

```js
document.querySelectorAll('.fade-in, .plate-reveal').forEach((el) => io.observe(el));
```

## Staggered gallery variant

For plate grids, add a 300ms stagger per row:

```css
.plate-grid .plate-reveal:nth-child(3n + 1) { transition-delay: 0ms; }
.plate-grid .plate-reveal:nth-child(3n + 2) { transition-delay: 150ms; }
.plate-grid .plate-reveal:nth-child(3n + 3) { transition-delay: 300ms; }
```

Across a row of 3, total stagger is 300ms — consistent with the image-first/text-after interval doubling.

## Key rules

- **Always bottom-up**: `inset(100% 0 0 0)` → `inset(0 0 0 0)`. Never top-down, never diagonal, never side-to-side.
- **1200ms duration** — longer than fade-up (900ms). Plates are heavier than text; motion must feel heavier.
- **House curve only**: `cubic-bezier(0.16, 1, 0.3, 1)`.
- **No additional transforms**: do not combine with scale or translateY. Clip-path alone.
- **One-shot via IntersectionObserver**.

## Performance notes

- `clip-path` is GPU-accelerated on modern browsers (Chrome 63+, Firefox 54+, Safari 14.1+).
- On older Safari, falls back to `will-change: clip-path` which is still smooth.
- Avoid combining with box-shadow animation on same element (compositor thrash).

## Reduced motion fallback

`clip-path: none` + no transition. Plate renders instantly.

## Brand usage

- **Buffet Di Matoso only**. This is half of the brand motion fingerprint.
- Every plate hero, every course reveal, every menu photo-grid.

## Common mistakes

- Top-down reveal (wrong metaphor — feels like a curtain drop)
- Combining with scale (doubles the motion, kills the "placing" feel)
- Using on Castelo (dilutes the brand distinction)
- 600ms duration (too quick — plates are not quick)
