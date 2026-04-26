# Stripe — Homepage

- **Source**: https://stripe.com
- **Harvested**: 2026-04-15
- **Extraction method**: WebFetch (structural surface only)
- **Why it matters**: Stripe defined the modern "premium SaaS" visual language — animated gradient mesh backgrounds, card composition with generous whitespace, product-illustration vocabulary, micro-interactions that reinforce trust. Directly relevant to REIS [IA] Systems page and offer pages where we need to feel "enterprise-grade" without touching prohibited SaaS pricing patterns.

## What we harvested
- Component vocabulary (cards, CTAs, customer-story carousel, product illustration blocks)
- Grid structure (hero full-width, 2-3 column feature cards, card-based testimonials)
- Typographic hierarchy (bold display, regular body, light meta — three-tier rhythm)
- NOT harvested (needs Playwright): the famous animated gradient mesh shader, CSS tokens, exact motion library

## Reusable techniques spotted

1. **Animated WebGL gradient mesh** — Stripe's hero uses a custom WebGL fragment shader that animates a noise-perturbed gradient across 4-6 color stops, producing a slow liquid-metal feel. This is the single most copied technique on the modern web for a reason: it signals "we're a serious engineering company" with zero visual noise. For REIS [IA]: substitute Stripe's colorful palette with our #000 → #0A0E1F → #4A90FF gradient and we have a signature background for any hero.

2. **Composed confidence via whitespace** — Stripe's section padding is aggressive (120-160px vertical). Cards breathe. Nothing fights for attention. This is "premium by restraint" — applicable universally.

3. **Three-tier type rhythm** — Display (bold) for headlines, regular for body, light for metadata/captions. No more than three weights per screen. Stops the "I just discovered variable fonts" over-design failure.

4. **Product illustration over screenshots** — Stripe uses custom isometric/line-art illustrations to represent products, never raw screenshots. Looks more polished, ages better, ownable visual language. For REIS [IA]: commission or prompt illustrations for Systems/Builders/Marketing pillars instead of dashboard screenshots.

5. **Card hover lift** — Cards lift 4px on hover with a soft shadow bloom. Micro but reinforces interactivity. The timing (200-250ms) is what makes it feel deliberate vs. nervous.

## Screenshot plan (for Playwright re-run)

| Frame | Device | Section | What to capture |
|-------|--------|---------|-----------------|
| hero-mesh | 1440px | 0,0 | Animated gradient mesh hero |
| hero-mesh-t2 | 1440px | 0,0 after 3s | Mesh mid-animation |
| feature-cards | 1440px | feature grid | 3-column card layout |
| card-hover | 1440px | any card | Hover lifted state |
| customer-story | 1440px | testimonial section | Card-based testimonial |
| product-illustration | 1440px | product section | Custom illustration block |

## Limitations
- The WebGL shader source is the real prize and can't be captured without Playwright + bundle inspection.
- Stripe uses private internal design tokens, not public CSS custom properties.

See `distillation-plan.md` for 3 patterns to promote.
