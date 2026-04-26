# Stripe — Motion Config

Source: https://stripe.com
Harvested: 2026-04-15

## Libraries Detected

No GSAP, Lenis, Framer Motion, or Three.js in the static HTML. Stripe famously ships its own in-house WebGL gradient system (the animated hero gradient) plus hand-rolled canvas effects.

## Signature Motion

- **Animated gradient mesh hero** — custom WebGL shader rendered into a `<canvas>` element. The gradient slowly drifts over multiple keyframe positions. This is Stripe's most copied motion artifact.
- **Industry strip scroll-snap** — horizontally paging logos using CSS scroll-snap + IntersectionObserver (no library).
- **Product mock reveals** — IntersectionObserver fade + small translateY, standard pattern.

## Easing & Duration

- House curves trend toward `cubic-bezier(0.4, 0, 0.2, 1)` (Material-ish ease-in-out) and `cubic-bezier(0.2, 0.8, 0.2, 1)` for entrance reveals
- Durations 200ms (micro) / 400–500ms (reveals) / 1200–2000ms (gradient drift cycle)

## Scroll Behavior

- Native scroll — no Lenis
- Sticky section headings for dense docs-style pages
- No parallax on marketing home

## Transferable for REIS [IA]

The gradient-mesh hero is high-value but heavy. For REIS we should instead adapt Stripe's **grid discipline on motionless sections**: the motion restraint in the middle of the page is more valuable than the hero animation. Static is not a failure — it is a choice.
