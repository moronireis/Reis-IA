# Ease-Out-Expo House Curve

**Category**: motion
**Difficulty**: foundational (token set — every other pattern consumes it)
**Dependencies**: None. Pure CSS custom properties. No libraries.

**Use when**: Always. This is the motion vocabulary that every REIS [IA] surface speaks. If a transition or animation does not declare one of these curves, it is wrong.

## What it is

A canonized set of **named easing tokens** that encode the REIS [IA] motion accent. Instead of letting each component pick a random `cubic-bezier(...)` or fall back to the browser default `ease`, every transition pulls from this small, deliberate vocabulary. One house curve owns the brand, three companions cover the edge cases, and nothing else is allowed.

The house curve is `cubic-bezier(0.16, 1, 0.3, 1)` — the "ease-out-expo" family — which is Linear's confirmed transition signature and the dominant curve in the Apple / Stripe / Vercel motion lineage. It lands fast, settles slow, and reads as *inevitable* rather than *bouncy*. It is the exact opposite of a spring.

## Why REIS-grade

- **Single accent, applied everywhere** — the same curve that moves a headline moves a hover state moves a chapter tonal shift. Consistency is the luxury signal.
- **Landings, not launches** — ease-out curves front-load the motion and settle into place. Matches the "confident arrival" tone of consultivo premium copy. The UI never looks like it is *trying*.
- **Zero library weight** — this is `:root` CSS custom properties. It costs nothing. Every pattern in the library references `--ease-house` instead of hard-coding a `cubic-bezier()` string.
- **Named, not numeric** — engineers using the design system see `var(--ease-house)`, not a magic number. The intent is legible in the CSS itself.

## Dependencies

- None. Ships as CSS custom properties in the global token sheet.
- Optional: a small TypeScript companion export so GSAP / Framer Motion consumers reference the same names (`EASE.house`, `EASE.inOut`, `EASE.outQuart`, `EASE.dramatic`) instead of drifting.

## Code recipe

### 1. Token sheet — the four canonized curves

```css
/* tokens-motion.css — REIS [IA] house motion vocabulary */
/* Pattern: brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md */
/* Source ref: brain/design-library/references/linear/motion-config.md */

:root {
  /* 1. THE house curve — ease-out-expo. Use this 80% of the time. */
  --ease-house: cubic-bezier(0.16, 1, 0.3, 1);

  /* 2. Symmetric in/out — for layout shifts, chapter tonal drifts,
        anything that should arrive AND leave with the same cadence. */
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* 3. Calmer ease-out — ease-out-quart. For slower, softer landings
        (long scroll reveals, chapter-entry fades) where expo feels too aggressive. */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  /* 4. The dramatic curve — reserved for ONE moment per page.
        Hero reveal, CTA confirmation, final-frame landing. Never for hover. */
  --ease-dramatic: cubic-bezier(0.22, 1, 0.36, 1);

  /* Canonical durations — the curves pair with these, not arbitrary ms values */
  --dur-micro:    150ms;  /* hover, focus, active states */
  --dur-short:    300ms;  /* small layout shifts, tooltip, dropdown */
  --dur-base:     500ms;  /* the default for reveals */
  --dur-long:     800ms;  /* chapter tonal shifts, hero entrance */
  --dur-cinema:  1200ms;  /* the dramatic moment — once per page */
}
```

### 2. Usage — every transition references a token

```css
/* GOOD — speaks the house vocabulary */
.button {
  transition:
    background-color var(--dur-micro) var(--ease-house),
    transform        var(--dur-micro) var(--ease-house);
}

.hero-title {
  animation: hero-in var(--dur-cinema) var(--ease-dramatic) both;
}

.chapter {
  transition: background-color var(--dur-long) var(--ease-in-out);
}

/* BAD — hard-coded, will drift */
.button {
  transition: background-color 0.2s ease-in-out;
}
```

### 3. TypeScript companion — for GSAP and Framer Motion

```ts
// tokens-motion.ts — same vocabulary, JS-addressable
// Pattern: brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md

export const EASE = {
  house:    [0.16, 1, 0.3, 1]  as const,
  inOut:    [0.65, 0, 0.35, 1] as const,
  outQuart: [0.25, 1, 0.5, 1]  as const,
  dramatic: [0.22, 1, 0.36, 1] as const,
} as const;

export const DURATION = {
  micro:  0.15,
  short:  0.30,
  base:   0.50,
  long:   0.80,
  cinema: 1.20,
} as const;

// GSAP usage — pass the array directly, GSAP 3.12+ accepts bezier arrays via CustomEase,
// or construct a cubic-bezier string once and reuse:
import { CustomEase } from 'gsap/CustomEase';
CustomEase.create('house', `M0,0 C${EASE.house.join(',')} 1,1`);
// then: gsap.to(el, { y: 0, ease: 'house', duration: DURATION.base })

// Framer Motion usage — native tuple support:
// <motion.div transition={{ ease: EASE.house, duration: DURATION.base }} />
```

### 4. Decision table — which curve, when

| Situation | Curve | Duration |
|-----------|-------|----------|
| Hover state (color, scale, glow) | `--ease-house` | `--dur-micro` |
| Dropdown / tooltip / popover | `--ease-house` | `--dur-short` |
| Scroll reveal (fade + translateY) | `--ease-house` | `--dur-base` |
| Chapter tonal shift / layout reflow | `--ease-in-out` | `--dur-long` |
| Long soft entry (below-fold headlines) | `--ease-out-quart` | `--dur-long` |
| Hero entrance, CTA confirmation (once per page) | `--ease-dramatic` | `--dur-cinema` |
| Exit animation (anything leaving the screen) | `--ease-in-out` | `--dur-short` |

If the situation is not in this table, it defaults to `--ease-house` + `--dur-base`. That combination is the house motion signature.

## Variables to tune

- **Do not tune the curves themselves.** They are canonized. Editing them drifts the brand.
- **Duration tokens** are the only knob. If a specific surface needs a slower reveal, it references `--dur-long` instead of `--dur-base` — it does not invent a new ms value.
- If a new situation truly cannot be served by the four curves (rare), add a fifth curve *here*, in this file, with a documented rationale — not inline in a component.

## Accessibility

- `prefers-reduced-motion: reduce` collapses every duration to `0.01ms` via a global override. The curves still resolve but have no perceptible duration:

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-micro:  0.01ms;
    --dur-short:  0.01ms;
    --dur-base:   0.01ms;
    --dur-long:   0.01ms;
    --dur-cinema: 0.01ms;
  }
  *, *::before, *::after {
    animation-iteration-count: 1 !important;
  }
}
```

- Because every component references the same tokens, reduced motion takes effect everywhere at once. No per-component audit needed.
- Keyboard focus transitions use `--dur-micro` + `--ease-house`. They remain snappy enough to not lag keyboard users, and they never exceed 150ms even at full motion settings.

## Performance

- CSS custom properties are free. Zero runtime cost.
- Naming the curves prevents accidental per-component allocation of different `cubic-bezier` strings in compiled CSS, which reduces style recalc surface area on large pages.
- The TypeScript companion is tree-shakeable — unused curves do not ship.

## Known variants

- **Spring overlay** — if a specific interaction truly needs a spring (drag-release, magnetic cursor pullback), use Framer Motion's `type: 'spring'` with conservative `{ stiffness: 200, damping: 25 }`. Never mix a spring into a CSS-animated element; keep them on separate layers.
- **Stripe-style exit curve** — Stripe uses `cubic-bezier(0.4, 0, 0.6, 1)` for outgoing elements. REIS stays with `--ease-in-out` for exits because the asymmetry of two different curves (house-in, stripe-out) reads as noise on dark surfaces.
- Pairs with every other pattern in the library — this is the substrate they all run on. Specifically consumed by `hero-effects/03-scripted-state-machine-demo.md`, `layout/02-chaptered-scroll-composition.md`, `editorial/01-split-text-word-reveal.md`, and the proof patterns below.

## Source references

- `brain/design-library/references/linear/motion-config.md` — confirms `cubic-bezier(0.16, 1, 0.3, 1)` as Linear's house curve, extracted from styled-components transition strings.
- `brain/design-library/references/linear/css-snippets.md` — raw transition declarations showing the curve in production use.
- `brain/design-library/references/stripe/` and `brain/design-library/references/vercel/` — cross-checked the same curve family appears as the dominant transition across premium dark-first marketing surfaces.
- Cross-reference: `brain/design-library/patterns/SEED.md` — this file canonizes the easing vocabulary referenced throughout the seed catalog.
