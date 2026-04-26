# Mercury — Design Tokens

Source: https://mercury.com
Harvested: 2026-04-15 (html.html, 820 KB)

## Color System

Mercury runs a mostly light "private bank lobby" palette — this is the opposite of REIS's dark default, but the **restraint, spacing, and typographic composure are entirely portable regardless of mode**.

### Extracted neutrals
- `#272735` — primary dark ink (not pure black — warmth added)
- `#535461` — secondary ink (muted steel grey)
- Cream/off-white backgrounds (inferred from visual signature — not extracted as explicit hex in payload)

### Accents
- Mercury uses a single restrained accent (soft blue / lavender family) that appears maybe twice per viewport
- No multi-hue palette; absolute single-accent discipline

### REIS [IA] mapping
Mercury is a **color-philosophy reference, not a color-value reference**. Do not port the specific hex values — port the philosophy: one primary ink, one secondary ink, one accent, absolute restraint. This maps onto REIS as `white ink / muted-white secondary / #4A90FF accent`.

## Typography

- Serif + sans pairing: a display serif for editorial headlines, system sans for body
- The serif is the key differentiator — it is what makes Mercury feel like a private bank rather than a fintech
- Line-heights are notably generous (1.6+ on body) — this is "breathing room as a brand asset"

## Spacing

- Oversized section padding — the most generous in the Top 10 (probably 160–200px vertical on desktop)
- Narrow content columns (often ~720px for prose) within a wider container — editorial column discipline

## Shadows

- Very soft, multi-layer shadows on light surfaces
- Elevation is always subtle — nothing floats aggressively

## Implementation

- Next.js (`_next/`)
