# Vercel — Design Tokens

Source: https://vercel.com
Harvested: 2026-04-15 (html.html, 596 KB)

## Color System

Vercel's dark palette is the cleanest expression of "tonal-shift backgrounds instead of dividers" in the B2B space.

### Core greys (inferred from Geist design system signatures)
- `#000000` — base
- `#0A0A0A`, `#111111`, `#171717` — section elevation ladder
- `#FAFAFA` — primary foreground (near-white, not pure)
- Mid-greys in steps of ~10% lightness for secondary text

### Accents (extracted from HTML)
- `#0096FF` — primary blue (Vercel signature)
- `#52AEFF` — soft blue variant
- `#00DC82` — success green (Nuxt co-branding context)
- `#FF3E00` — Svelte orange accent
- `#FF1E56` — error / highlight red
- `#E5484D` — destructive red
- `#45DEC4` — teal edge

### REIS [IA] mapping
Vercel's `#0096FF` is brighter/more cyan than REIS `#4A90FF`. Their palette approach — **one primary blue + muted status colors** — is exactly what REIS needs. The non-blue accents (green, orange, red) are framework co-brand tokens, not house colors; we ignore them.

## Typography

- **Geist** family (Vercel's in-house font, Inter-adjacent geometric sans)
- `--font-mono` CSS var for code (Geist Mono)
- Display headlines oversized, tight letter-spacing (-0.03em range)
- Body ~16px, line-height ~1.5

## Spacing

- Section vertical padding ~96–144px desktop
- Max content width ~1200px
- 12-column grid, often subdivided into 6+6 or 4+8 for editorial asymmetry

## Shadows

- Zero drop shadows on dark — tonal background elevation only
- Subtle borders at `rgba(255,255,255,0.08)` — the "glass outline" trick

## Implementation

- Next.js (self-hosted, naturally)
- Evidence of Tailwind + nuxt/sveltekit references in the payload (because Vercel showcases multiple frameworks)
