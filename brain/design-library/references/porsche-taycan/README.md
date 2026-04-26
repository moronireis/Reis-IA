# Porsche — Taycan Model Page

- **Source**: https://www.porsche.com/international/models/taycan/taycan-models/taycan/
- **Harvested**: 2026-04-15
- **Extraction method**: WebFetch (structural only — raw CSS not retrievable)
- **Why it matters**: Porsche sets the gold standard for editorial grid, image sequencing, and premium motion pacing in automotive. The brand's discipline with color restraint (99% neutral surfaces, 1% paint-as-accent) is directly transferable to REIS [IA]'s black/white/blue palette philosophy. Particularly relevant for offer pages and Moroni's personal brand site where restraint = authority.

## What we harvested
- Editorial grid structure (full-bleed hero → stacked variant grid → hotspot carousel)
- Section rhythm (11-variant Sport Saloon grid, standardized 5000×1390 aspect crop)
- Interaction vocabulary (hotspot nav, sound player "hold-to-play", configure/compare CTAs)
- NOT harvested (needs Playwright): CSS tokens, scroll smoothing library, hotspot interaction code, video player motion

## Reusable techniques spotted

1. **Ruthless aspect-ratio standardization** — Every car variant in the grid uses the identical 5000×1390 side-profile crop. This enforces visual rhythm at zero design cost. The brain reads "catalog" instantly. For REIS [IA]: case study grids must use one aspect ratio, never mixed.

2. **Color restraint as authority signal** — The page surface is deep charcoal (#1a1a1a-ish). The ONLY color in the frame is the car's paint finish. Every CTA, divider, and section break is monochrome. Paint = protagonist. For REIS [IA]: blue (#4A90FF) is the only accent; everything else stays black/white/gray.

3. **Hotspot carousel over spec table** — Instead of a boring spec sheet, Porsche uses a hero image with numbered hotspots. Click a hotspot → detail panel slides in. Transforms information density into interactive curiosity. Reusable for REIS [IA] Systems page (architecture diagrams with clickable nodes).

4. **Performance metrics as display typography** — "0-100 km/h" figures rendered as hero-size display type, not table rows. Numbers ARE the design. Directly applicable to REIS [IA] ROI/result callouts — stop using tables, start using display type.

5. **Editorial side-profile reverence** — The hero car is always shot in pure profile, centered, on neutral surface. No 3/4 angles, no dramatic Dutch tilts. Flat-out product reverence. For REIS [IA] product pages: present the product flat, let the copy do the dramatizing.

## Screenshot plan (for Playwright re-run)

| Frame | Device | Section | What to capture |
|-------|--------|---------|-----------------|
| hero-fullbleed | 1440px | 0,0 | 3840×1158 opening frame |
| variant-grid | 1440px | model grid section | 11-variant standardized grid |
| hotspot-closed | 1440px | hotspot section | Default hotspot state |
| hotspot-open | 1440px | hotspot section | One hotspot detail panel active |
| metrics-display | 1440px | spec section | Performance numbers as display type |
| mobile-hero | 390px | 0,0 | Mobile adaptation of hero |

## Limitations
- WebFetch gave structural description only; no raw CSS, no motion library detection.
- Porsche likely uses Lenis + GSAP ScrollTrigger (automotive industry standard) but this needs Playwright to confirm via bundle inspection.
- The "hold for sound / release to stop" interaction needs JS source to replicate.

See `distillation-plan.md` for 3 patterns to promote.
