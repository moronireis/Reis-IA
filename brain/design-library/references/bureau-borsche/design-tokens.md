# Bureau Borsche — Design Tokens

Source: https://bureauborsche.com
Harvested: 2026-04-15 (html.html, 124 KB)

## Color System

Bureau Borsche runs an even more extreme version of the Pentagram palette — the harvested HTML contains **zero hex colors** in inline styles. Everything is defined in external CSS files not in the initial fetch. Based on visual signature (this is a studio we know), the palette is:
- Pure black
- Pure white
- Occasional strong display accent (usually red or yellow, editorial magazine style)

### REIS [IA] mapping
Even more than Pentagram, Bureau Borsche is a philosophy reference. The lesson: a magazine spread can carry an entire page. The type is the composition. Do not harvest values from this site.

## Typography

- This is the whole point of the reference. Bureau Borsche treats web pages as magazine spreads:
- Massive display type (often 150px+ on desktop)
- Asymmetric typographic axes — text sits at unexpected anchors, strong vertical or diagonal composition
- Custom editorial type (often licensed or custom-cut)
- Body copy deliberately small against massive display
- Strong contrast between display and body

## Spacing

- Magazine spread composition — content anchored to asymmetric points, not centered
- Strong use of negative space as compositional element
- Grid visible and broken intentionally

## Shadows

- None. Pure flat composition.

## Implementation

- No framework hints in the HTML payload (payload was thin — 124 KB — likely most content lives in external CSS or client JS)
