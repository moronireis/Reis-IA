# Design Tokens — asimov.academy

**Source**: Static HTML grep of https://asimov.academy (2026-04-14)

## Colors Detected (raw, unfiltered — not a real palette)

All 23 hex codes found in the served HTML. Most come from WordPress core block defaults and Elementor's default kit, not from a curated brand palette.

| Hex | Likely role | Verdict |
|-----|-------------|---------|
| `#000000` | Pure black — headings / text | core |
| `#ffffff` | White — page bg | core |
| `#32373c` | WP default button bg (classic theme) | WP default, not brand |
| `#B1C0C3` | Neutral gray | likely secondary text |
| `#0693e3` | WP block blue | WP default |
| `#304cb6` | Indigo | possibly brand link color |
| `#00d084` | WP block green | WP default |
| `#7bdcb5` | WP block light green | WP default |
| `#8ed1fc` | WP block light blue | WP default |
| `#9b51e0` | WP block purple | WP default |
| `#cf76aa` | WP block pink | WP default |
| `#d696c2` | WP block mauve | WP default |
| `#eaeaab` | WP block yellow | WP default |
| `#f3c72c` | Mustard yellow | possibly CTA accent |
| `#f44beb` | WP block magenta | WP default |
| `#f78da7` | WP block rose | WP default |
| `#fcb900` | WP block amber | WP default |
| `#ff5757` | Red | possibly highlight |
| `#ff6900` | WP block orange | WP default |
| `#cf2e2e` | WP block dark red | WP default |
| `#abb8c3` | WP block gray | WP default |
| `#B2FF77` | Bright lime | likely brand accent (unusual) |
| `#FF2D61` | Hot pink / red-pink | likely brand accent (unusual) |

**Inferred actual brand accents (the two that don't match any WP/Elementor default):**
- `#B2FF77` — bright lime green
- `#FF2D61` — hot pink-red
- possibly `#304cb6` — deep indigo

These are the only colors that feel intentional. The rest is template noise.

**Implication for REIS [IA]**: Nothing to borrow. Our locked palette (#000000, #FFFFFF, #4A90FF + surface levels) is already far more disciplined.

## Typography Detected

Six Google Font families loaded via Elementor Global Fonts registry:

| Family | Weights loaded |
|--------|---------------|
| Roboto | 100–900 + italics |
| Poppins | 100–900 + italics |
| DM Sans | 100–900 + italics |
| Source Code Pro | 100–900 + italics |
| Rethink Sans | 100–900 + italics |
| Voltaire | 100–900 + italics |

This is ~30 font files loaded on initial paint. It is the opposite of a curated type system. A designer would pick one display + one text face max.

**Implication for REIS [IA]**: Keep Inter as single family. Already correct.

## Spacing / Layout

Cannot determine without fetching per-post CSS. Elementor defaults to 1140px container, 20px gutter. Observed grid patterns (from class names): 3-column card rows for courses, single-column stacked sections, elementor-spacer widgets for vertical rhythm.

## Shadows / Borders / Radius

No custom shadow tokens detected in the served HTML. Elementor widget defaults apply (small radius, subtle drop shadows on cards).
