# Pentagram — Design Tokens

Source: https://www.pentagram.com
Harvested: 2026-04-15 (html.html, 963 KB)

## Color System

Pentagram runs an almost absurdly restrained palette — this is the purest "the type is the design" reference in the Top 10.

### Extracted hex
- `#000000` — primary ink
- `#ffffff` — primary ground
- `#6F6F6F`, `#767676` — secondary ink (greys)

**That's it.** The entire Pentagram home uses essentially four colors. Every accent, every highlight, every color in the design is carried by **the project thumbnails themselves** — because Pentagram's work is the color, the frame is neutral.

### REIS [IA] mapping
This is a philosophy reference, not a value reference. The lesson: a page can be monochrome (or in REIS's case, near-black + white + a single accent) and still feel premium if the type scale and the content imagery carry the chromatic weight. For REIS, our case-study imagery and proof visuals should be the "color" of the site — the chrome stays quiet.

## Typography

- Oversized display sans (likely Neue Haas Grotesk or a close editorial cousin — the Pentagram/Swiss signature font)
- Extreme type scale range — H1 is genuinely huge on desktop (100–140px+), body is comparatively tiny
- Tight letter-spacing on display (-0.04em to -0.05em)
- All-caps small labels for metadata

## Spacing

- Museum-like vertical rhythm — sections breathe
- Asymmetric grid: case-study thumbnails staggered with intentional misalignment that is still disciplined
- Narrow prose columns within wide containers (Mercury-adjacent)

## Shadows

- Zero shadows. Flat composition.
- Borders minimal or absent. The type defines the grid.

## Implementation

- Next.js (`_next/`)
