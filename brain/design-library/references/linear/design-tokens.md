# Linear — Design Tokens

Source: https://linear.app
Harvested: 2026-04-15 (html.html, 2.24 MB)

## Color System

Linear runs a tightly controlled dark palette. Near-black tones are layered (not a single #000) to produce section-by-section "atmospheric pressure". Accent colors appear as punctuation only.

### Near-black layering (the most transferable lesson)
- `#000000` — reserved base
- `#020000` — deep body
- `#08090A` / `#080808` — primary surface
- `#191D20` — elevated card surface
- `#0F3338` — tinted surface (section shift)

### Accents (used sparingly across the page)
- `#0E63FF` — primary electric blue (the Linear signature)
- `#02B8CC` — cool accent
- `#06B6D4` — cyan highlight
- `#10B981` / `#01C646` / `#008D2C` — success / status tokens
- White (`#FFFFFF`) for headlines, muted white (opacity-stepped) for body

### REIS [IA] mapping
`#0E63FF` is almost identical to REIS `#4A90FF` (slightly more saturated). Linear proves our accent choice is in the right register. Their 4-tone near-black ladder is directly portable to the REIS home.

## Typography

- CSS variables: `--font-monospace` drives all code spans; sans body uses Inter Display-style system stack (Inter + `-apple-system` fallback)
- Heading rhythm uses near-musical intervals — H1 oversized, H2 ~55–60% of H1, body ~16–17px with line-height 1.5+
- Letter-spacing is slightly negative on large headings (-0.02em to -0.04em range visible in styled-components classes)

## Spacing & Rhythm

- Section padding consistently large (120–180px vertical on desktop) — whitespace as premium material
- Grid areas declared inline (styled-components): e.g. `--grid-areas:"c c c c c c c c"` with `--grid-areas-mobile:"a a a a"` — 8-col desktop collapsing to 4-col mobile
- Max content width in the ~1200–1280px range

## Shadows & Effects

- Soft radial glows at section transitions (background gradients, not box-shadows)
- No hard drop shadows — elevation is handled by background tonal shift only

## Implementation Notes

- Stack: Next.js + styled-components (evidence: `_next`, numerous `sc-` class hashes, `/*!sc*/` CSS-in-JS markers)
- All tokens are runtime CSS custom properties — no static token file exposed
