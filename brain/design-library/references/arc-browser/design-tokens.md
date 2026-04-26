# Arc Browser — Design Tokens

Source: https://arc.net
Harvested: 2026-04-15 (html.html, 641 KB)

## Color System

Arc runs a rich blue-family palette built around deep indigo surfaces — more saturated than any other ref in the Top 10.

### Extracted hex
- `#171717` — base near-black
- `#000354` — deepest indigo surface
- `#210784`, `#2404AA`, `#26069C`, `#2702C2` — indigo-to-purple ladder
- `#0034FE`, `#0047FF` — primary electric blues (accents)
- `#3139FB` — mid-blue (frequent usage)
- `#96C4FF` — light-blue highlight
- `#F0F1FF` — off-white ground (for light sections)
- `#E5484D`, `#FB3A4D` — red accents (used sparingly)
- `#6F6F6F` — neutral grey for body

### REIS [IA] mapping
Arc's palette is the **most saturated** in the Top 10 — it is close to REIS's electric blue register but pushes further into indigo territory. For REIS we can validate that `#4A90FF` sits correctly; Arc shows what the next step of saturation would look like and why we should probably not take that step (the indigo tint pushes toward "creative tool" rather than "consulting firm").

## Typography

- `--fonts-body`, `--fonts-exposure`, `--fonts-mono`, `--font-sans` — rich CSS custom property system with named roles
- `Space Mono` — confirmed in payload (used for monospace accents)
- `--fonts-exposure` suggests a display family named "Exposure" or similar (custom)
- Editorial scale with generous line-heights

## Spacing

- Chaptered scroll with generous section padding
- Each "chapter" has its own atmospheric pressure (background, type scale, pacing)

## Shadows

- Soft multi-layer shadows on light sections
- Subtle borders on dark

## Implementation

- Next.js (`__NEXT_DATA__`, `_next/`)
