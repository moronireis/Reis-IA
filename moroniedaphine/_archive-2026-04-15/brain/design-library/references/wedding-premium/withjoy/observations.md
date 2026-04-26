# Withjoy Demo — Observations

## What makes it premium (vs. template-y)
1. **Editorial serif restraint**. Austin News is a Vogue/Bloomberg font — not a wedding-catalog font. The single biggest lever. When a wedding site uses Playfair/Cormorant/Austin, it reads magazine-couture. When it uses Great Vibes or Allura, it reads template.
2. **No floral clip art**. Zero SVG flourishes, zero monogram crests, zero wax-seal emoji stand-ins. The only ornament is a 1px horizontal rule.
3. **Full-bleed photography with cinematic grade** (saturation 0.92, contrast 1.05). The photo is treated like a film still, not a filter-stack selfie.
4. **Tracked uppercase micro-type**. Every secondary label (nav, date, eyebrow, scroll hint) is set in Inter at 11-12px with 0.22-0.38em letter-spacing. This is the #1 signal of editorial design.
5. **Centered lockup, single focal point**. No split hero, no side illustration, no "save the date" badge in a corner. One idea per screen.

## What we should steal (prioritized)
1. The centered couple-name lockup structure (hero-harvested.md has the exact CSS).
2. The ampersand-as-only-ornament convention — italic, accent-colored, tucked between names.
3. The 1px gradient-faded rule as section divider (we can reuse this in every section, not just hero).
4. Tracked-uppercase micro-type system for ALL navigation and labels.
5. The desaturation photo filter for cinematic mood.

## What we should avoid
1. The indigo `#4951ef` — it's Withjoy's brand, not ours. Swap entirely for burgundy + rose gold.
2. The `react-helmet` / styled-components class soup — we'll use Astro + clean classes.
3. Withjoy has NO scroll-triggered motion. We upgrade this with GSAP ScrollTrigger + Lenis.
4. Withjoy's "Registry" section is ecommerce-heavy. We're not registering on Amazon — skip that pattern entirely.
5. Default Inter body at 15-16px can feel SaaS-y. For our site, body text should be **Cormorant Garamond** at 18px with generous line-height (1.7), not Inter. Inter is for labels only.

## Extraction limitations
- Could not load rendered Austin News webfont files (licensed). We substitute Cormorant Garamond + Playfair Display (free, Google Fonts).
- Withjoy gates some sections behind account login — we only harvested the public demo landing.
- No motion library detected = nothing to import for motion config. We're building our own GSAP timeline from scratch.

## Patterns to distill (suggested to orchestrator)
- `patterns/wedding/wedding-velvet-background.md` — velvet black + radial candlelight gradient base for every section
- `patterns/wedding/wedding-serif-name-treatment.md` — the couple-name lockup with italic ampersand (from this harvest)
- `patterns/wedding/wedding-ornamental-divider.md` — 1px gradient rule (from this harvest)
- `patterns/wedding/wedding-candle-glow.md` — radial warm-amber glow emitter for behind-text hotspots
- `patterns/wedding/wedding-tracked-micro-type.md` — tracked uppercase Inter 11-12px system for all labels (from this harvest)

Non-code idea to steal: magazine masthead rhythm. Treat the site like a print editorial spread — not like a SaaS landing page. Pacing should feel like turning pages of Vogue, not scrolling a Stripe homepage.
