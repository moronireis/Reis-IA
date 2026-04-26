# Stripe — Design Tokens

Source: https://stripe.com
Harvested: 2026-04-15 (html.html, 629 KB)

## Color System

Stripe's home is a hybrid: light hero, dark deep-sections, rich brand-library accents for industry strips. The lesson for REIS is less about the specific hex values and more about the **grid discipline that lets the color system stay quiet**.

### Core neutrals (extracted from HTML)
- `#010202`, `#181818`, `#171D27` — deep surfaces (used on dark sections)
- `#031323`, `#012939`, `#194756` — tinted dark surfaces (industry-specific sections)
- `#0052FF`, `#0090DA`, `#003478`, `#0061A0` — Stripe blue family (accents, CTA)
- `#0AAD0A` — status/success green
- `#E5484D`-adjacent reds for error

### REIS [IA] mapping
Stripe's `#0052FF` sits in the same register as REIS `#4A90FF` — slightly deeper and more saturated. Note: Stripe uses a **family** of blues (4+ shades), not a single token. For REIS we should stay closer to the single-accent discipline of Linear rather than Stripe's blue-family approach.

## Typography

- System stack with custom Stripe sans (inherits from `sohne`-family weight system)
- Surgical type scale: ratios feel close to 1.25–1.333 modular scale
- Tight letter-spacing on headlines (-0.02em to -0.035em)
- Body set at 17px / line-height 1.5+ — the "editorial not marketing" signature

## Spacing & Grid

- **Grid as argument**: the entire Stripe home is a disciplined 12-column grid with generous gutters. Columns are never broken for decorative reasons.
- Section vertical padding: ~96–128px desktop, halved on mobile
- Max content width ~1200px with ~64px gutters

## Shadows & Elevation

- Virtually no drop shadows on dark sections — elevation = tonal background shift
- Light sections use soft multi-layer shadows (0 1px 3px + 0 8px 24px style ladder)

## Implementation

- Next.js (`__NEXT_DATA__`, `_next/`)
- Custom CSS (no Tailwind detected)
- Heavy font preloading in `<head>`
