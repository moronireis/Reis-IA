# Withjoy Demo — Stack Detected
Source: https://withjoy.com/demo/ | Fetched: 2026-04-14 | HTML: 253 KB SSR

## Fonts (loaded in-page)
- **Austin News Headline Web** — display serif, used for couple names + section H1. Commercial Type foundry. Classic editorial style (Vogue, Bloomberg Businessweek). Has high-contrast strokes, narrow counters, elegant italic.
- **Austin News Deck Web** — secondary editorial serif for subheadings and date lines. Slightly lower contrast than Headline.
- **Inter UI** — body + UI (navigation, buttons, form labels).
- Georgia serif fallback.
- SFMono-Regular for code-ish metadata.

## Colors (sampled, demo is indigo — swap for our burgundy)
Most-used hex in the SSR CSS:
```
#ffffff (39x) — canvas
#4951ef (5x)  — demo primary (indigo — REPLACE with #5C1A24 burgundy)
#200041 (2x)  — deep accent (REPLACE with #0F0A08 velvet black)
#502080 (1x)  — secondary (REPLACE with #C9A77A rose gold)
#717172       — muted text
#D0CCFF       — tint surface (REPLACE with #F5E6D3 candlelight cream)
#f7f7f7       — off-white surface
```
Overlays use `rgba(0,0,0,0.04..0.80)` for the hero photo darkening.

## Framework & motion
- **React** (styled-components classnames: `text__TextComponent-z0bjr2-0`, `Headerstyles__ToggleNavParent-wy7lag-5`)
- **react-helmet** for SSR title tags
- No GSAP, no Three.js, no Lenis detected in the harvested HTML. Motion is CSS transitions + a `top-header-link-hero-transition` class (likely a CSS transform on scroll — classic translateY fade).
- Image CDN: Withjoy assets served from their own `joy.com` CDN (user-upload photos).

## Type scale captured
`10, 11, 13, 14, 15, 16, 17, 18, 20, 24, 30, 32, 36, 38` px + rem fallbacks. The jump from 38px body to ~72-96px couple name is hero-only — it's set inline at the hero component.

## Stack to emulate (for us)
- Swap Austin News → **Playfair Display** (Google) + italic variant. Alternative: **Cormorant Garamond** (more couture/Bridgerton, narrower counters).
- Keep Inter (already our stack).
- Skip the indigo system entirely — take only the STRUCTURE (centered couple name, date line, full-bleed photo, dark overlay, thin rule ornament).
- Add GSAP ScrollTrigger ourselves (Withjoy doesn't use it — we can do better than the reference).
