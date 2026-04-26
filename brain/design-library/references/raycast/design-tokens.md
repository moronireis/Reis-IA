# Raycast — Design Tokens

Source: https://www.raycast.com
Harvested: 2026-04-15 (html.html, 368 KB)

## Color System

Raycast's home has a staggeringly large palette of blues — **32+ distinct blue-family hex values** in the harvested HTML — because the page showcases many accent themes simultaneously (user-contributed themes, extensions, etc). This is a multi-accent showcase site, not a single-brand dark site. For REIS we harvest the **structural discipline**, not the color values.

### Core neutrals (inferred)
- `#000000` — base
- Near-black surface ladder matching the cluster norm (`#0A0A0A`, `#111`, `#171717`)

### Notable accents (sample — there are many more)
- `#00069A`, `#002445`, `#002762`, `#004596`, `#023D72`, `#025791`, `#035B9B` — deep-blue family used for theme cards
- `#030F81`, `#031781`, `#031E81` — near-monochrome indigo cluster
- `#026065`, `#026F91`, `#03779B`, `#037A81` — teal-leaning accents
- All used as theme-card backgrounds, not as page-level branding

### REIS [IA] mapping
Do **not** port Raycast's color approach. Raycast is a multi-accent showcase by necessity — it shows user themes. REIS is the opposite: a single-accent brand. The transferable lesson here is the **monospace punctuation**, the **mathematical grid stacking**, and the **keyboard-first composition**, not the color palette.

## Typography

- Sans display + monospace companion — the monospace is used as editorial punctuation for keyboard shortcuts, metadata, and section labels
- Type scale feels closer to 1.2 (tight modular scale) — denser than Linear or Vercel
- Small caps and all-caps labels for metadata

## Spacing

- Dense but disciplined — section padding in the 80–120px range (tighter than Mercury/Vercel)
- 12-column grid with tight gutters
- Component galleries (extension cards, command previews) use rigid uniform card dimensions

## Shadows

- Subtle borders on cards (`rgba(255,255,255,0.08)` style)
- Soft inset highlights on light-theme previews

## Implementation

- Next.js + Tailwind CSS (both confirmed)
