# Cursor — Stack Detected

Source: https://cursor.com
Harvested: 2026-04-15 (693 KB HTML)

## Framework

- **Next.js** — `_next/` references
- **React**

## Fonts

- Custom display serif (`--font-serif` CSS var) with stack fallback `Iowan Old Style, Palatino Linotype, URW Palladio L, P052, ui-serif, Georgia, Cambria, Times New Roman`
- System sans for body
- **CursorIcons16** — proprietary icon-as-font system (rare — most sites use SVG sprites)

## Motion / 3D

- No motion library strings in static payload
- Likely Framer Motion in later chunks

## CSS Strategy

- Custom CSS (no Tailwind markers detected, though Tailwind-typical `#3B82F6` is present)

## Build / Perf

- Standard Next optimizations
- Heavy font preload (display serif + icon font)
