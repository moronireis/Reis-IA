# Self-Drawing Hairline

**Category**: motion
**Difficulty**: foundational
**Dependencies**: Vanilla JS (IntersectionObserver) + CSS. No libraries.
**Source refs**:
- `brain/assets/branding/art-direction-brief-castelo-dimatoso.md` §3.4
- `brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md`

## Intent

A 1px accent-colored rule that draws itself left-to-right beneath section titles when the section enters the viewport. Acts as an editorial punctuation mark — the closing stroke that signals "this title is placed." The motion is slow enough (1200ms) to be felt as deliberate, not decorative.

## When to use

- Beneath every section title in long-form editorial pages.
- Under numbered section markers (e.g., `I. Arrival`, `II. The Lakes`).
- As the closing element of a chapter-entry composition.
- Castelo dos Lagos (gold `#C9A96E`), Buffet Di Matoso (deep gold `#B8860B` or bronze `#8A6A3E`).

## Trigger

IntersectionObserver — fires when the parent section enters viewport. Piggy-backs on the same observer that drives fade-up.

## CSS

```css
/* Pattern: brain/design-library/patterns/motion/self-drawing-hairline.md */
.hairline-rule {
  display: block;
  width: 64px;        /* target width */
  height: 1px;
  background: var(--gold, #C9A96E);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 1200ms var(--ease-house, cubic-bezier(0.16, 1, 0.3, 1)) 300ms;
  /* 300ms delay lets the title fade-up land first */
}

.hairline-rule.visible {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .hairline-rule {
    transform: scaleX(1);
    transition: none;
  }
}
```

Use `transform: scaleX()` with `transform-origin: left` — NOT `width` animation. Width animates box model (slow, layout). Scale is GPU-accelerated.

## JS

Reuse the same `.fade-in` IntersectionObserver. Give the hairline the `.fade-in` class alongside `.hairline-rule` — the same `.visible` class triggers both. Or, simpler, add a second selector to the observer query:

```js
document.querySelectorAll('.fade-in, .hairline-rule').forEach((el) => io.observe(el));
```

## Key rules

- **Transform-origin: left** (for LTR). RTL flips to right.
- **1px only** on standard displays. Retina handles crispness automatically.
- **Delay 300ms** so the title has landed before the rule starts drawing.
- **Duration 1200ms** — longer than fade-ups. The rule is the slowest motion on the page.
- **Width 48–80px** — contained, never full-bleed.
- **Accent color only** — gold for Castelo, deep gold/bronze for Di Matoso. Never body color.

## Performance notes

- `transform: scaleX()` — GPU-accelerated, 60fps on any hardware.
- Zero JS beyond the existing observer.

## Reduced motion fallback

Rule is rendered at full width instantly, no transition.

## Brand usage

- **Castelo dos Lagos**: `background: #C9A96E` (gold), below every chapter title.
- **Buffet Di Matoso**: `background: #B8860B` (deep gold) — 1px only, never fill. Optional bronze variant `#8A6A3E` for secondary divisions.

## Common mistakes

- Animating `width` instead of `transform: scaleX()` (kills 60fps)
- `transform-origin: center` (rule grows both ways — breaks the "drawing" metaphor)
- Duration under 800ms (feels nervous)
- Full-bleed hairlines (loses the punctuation quality — becomes a divider, not a rule)
