# Arc Browser — Stack Detected

Source: https://arc.net
Harvested: 2026-04-15 (641 KB HTML)

## Framework

- **Next.js** — `__NEXT_DATA__` blob + `_next/` references
- **React**

## Fonts

- Rich CSS custom property system: `--fonts-body`, `--fonts-exposure`, `--fonts-mono`, `--font-sans`
- **Space Mono** confirmed in payload
- Custom display family likely named "Exposure" or similar

## Motion / 3D

- No motion library strings in static payload
- Likely Framer Motion + possibly Lenis in later chunks

## CSS Strategy

- Custom CSS with named font-role tokens (sophisticated design system)

## Build / Perf

- Next Image pipeline
- Heavy font preload (multiple custom families)

## Harvest Note

The mood report flagged Arc as **medium risk** because arc.net is client-rendered in parts. The 641 KB fetch is healthy but some interactive chapters may live in client JS and not be represented in the HTML payload.
