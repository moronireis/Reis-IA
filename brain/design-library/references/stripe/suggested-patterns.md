# Stripe — Suggested Patterns

Source: https://stripe.com
Harvested: 2026-04-15

## Pattern 1 — `patterns/layout/twelve-col-grid-as-argument.md`

- **Category**: layout
- **Rationale**: Codify a 12-column grid with fixed gutters (64px desktop, 24px mobile) and a rule that **no block breaks the column system for decorative reasons**. This becomes the structural law for the REIS [IA] method sections. Stripe is the proof that this discipline reads as premium.
- **File/line hints**: Harvested HTML shows grid-template-columns declarations in inline styles of section containers.

## Pattern 2 — `patterns/hero-effects/webgl-gradient-mesh.md`

- **Category**: hero-effects
- **Rationale**: The Stripe-style animated gradient mesh hero, rendered in a `<canvas>` via custom shaders. High impact, single-purpose, perfect for the REIS hero frame if we want a subtle alive-but-silent background. Should be gated behind `prefers-reduced-motion` and a hardware tier check.
- **File/line hints**: Stripe's own implementation is obfuscated; use the open-source fork at github.com/kevinhufnagl/stripe-gradient as the reference source.

## Pattern 3 — `patterns/motion/single-motion-budget.md`

- **Category**: motion
- **Rationale**: A policy pattern (not a code pattern): document the rule that **only one section of a page should carry active motion**. Everything else holds still. This is the most important transferable lesson from Stripe and it should be a written design-library rule, not a component.
- **File/line hints**: Observed in how Stripe's home has exactly one moving element (the hero gradient) and every other section is static.
