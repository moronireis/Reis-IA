# Wedding Premium References — Harvest Log
Date: 2026-04-14 | Purpose: feed Moroni & Daphine design system (burgundy + rose gold + velvet + Bridgerton/Dior couture)

## URLs attempted

| # | URL | Status | Usable? | Why |
|---|-----|--------|---------|-----|
| 1 | https://withjoy.com/demo/ | 200, 253 KB | YES (best) | Live demo wedding site. Real hero, real couple-name treatment, editorial serif (Austin News) |
| 2 | https://www.paperlesspost.com | 200, 394 KB SSR + 174 KB external CSS | YES | Couture stationery co. Plantin + Area Inktrap stack — the reference for editorial invite typography |
| 3 | https://www.zola.com/wedding-planning/website/designs | 200, 174 KB | PARTIAL | Gallery index only, not a single full template. Fonts: new-spirit serif + circular |
| 4 | https://www.minted.com/wedding-websites | 200, 1 MB | PARTIAL | Gallery listing. Fonts: Chronicle + Mier-A + GT Super Display. Too ecommerce-heavy for direct hero extraction |

## Top-level observations

**Withjoy** — closest to what we need. Hero is a single centered couple-name lockup in `Austin News Headline Web` at ~72-96px, date as small caps, minimal ornamental line. Background photo full-bleed, dark overlay. Accent color is indigo `#4951ef` / `#502080` in the demo (swappable to burgundy for us). Inter UI for body. This is the structural template to mimic.

**Paperless Post** — typography gold mine. The couture invitation aesthetic lives in **Plantin** (body serif — warm, renaissance feel) and **Area Inktrap** (display serif with ink-trap joints — the signature of editorial modern couture since ~2020). Basis Grotesque for UI. Colors lean warm cream (`#fffaf2`, `#F8F3C5`, `#f0e9c9`) with dusty rose (`#fde3e7`, `#f55c70`). These are EXACTLY the palette anchors Daphine's Pinterest board wants.

**Zola** — useful only for font discovery: `new-spirit` is a good display serif alternative if Austin News is inaccessible.

**Minted** — used `Chronicle` (editorial serif — used by many premium wedding stationers). Confirms the genre consensus: all premium wedding sites converge on a warm editorial serif + a clean humanist sans.

## Cross-site font consensus (the "premium wedding type DNA")

| Role | Withjoy | Paperless | Zola | Minted | Recommended for us |
|------|---------|-----------|------|--------|--------------------|
| Display serif | Austin News Headline | Area Inktrap | new-spirit | GT Super Display | **Playfair Display** (free Austin News proxy) or **Cormorant Garamond** |
| Body serif | Austin News Deck | Plantin | — | Chronicle | **Cormorant Garamond** or **EB Garamond** |
| UI sans | Inter UI | Basis Grotesque | circular | Mier-A | **Inter** (already in our stack) |

## Color consensus (warm couture)

Withjoy demo is indigo — skip that. Paperless Post is the palette reference:
`#fffaf2` cream, `#f0e9c9` parchment, `#F8F3C5` champagne, `#fde3e7` dusty rose, `#f55c70` coral pink, `#d70040` deep rose, and they contrast against `#000`/`#333`.

For Moroni & Daphine (burgundy + rose gold + velvet) derive:
- `#0F0A08` velvet black | `#2B0A0F` wine black | `#5C1A24` burgundy | `#8B3A4A` rose burgundy | `#C9A77A` rose gold | `#F5E6D3` candlelight cream | `#FFFBF5` parchment
