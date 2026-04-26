# Stack Detected — castelo-estrategia.vercel.app

> Extracted: 2026-04-15
> Source URL: https://castelo-estrategia.vercel.app/
> HTML size: 100,489 bytes (single file, CSS + JS inline)

---

## 1. Framework / Build

- **No framework detected.** This is a single hand-written HTML document.
- No `<script type="module">`, no Astro/Next.js hydration markers, no React root, no Vue, no Svelte compile artifacts, no `_next/`, no `_astro/`, no hashed bundle names.
- No CSS framework (no Tailwind class soup, no Bootstrap, no utility library). All CSS is hand-written inline inside a single `<style>` block at the top of `<head>`.
- Document declared `lang="pt-BR"`.
- Deployment: Vercel static hosting (domain `castelo-estrategia.vercel.app`). Vercel serves it as plain HTML — this is the simplest possible Vercel deploy (likely a `public/index.html` with no build step, or an Astro project with zero components).

## 2. Fonts

Single Google Fonts request:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- **Cormorant Garamond**: 300/400/500/600/700 regular + 300/400 italic
- **Inter**: 300/400/500/600/700
- `display=swap` (FOUT over FOIT)
- Correct preconnect pattern (both `googleapis.com` and `gstatic.com` with `crossorigin`)
- Fonts are NOT self-hosted. For a production REIS [IA] build derived from this reference, self-hosting would be recommended to eliminate the external request and the FOUT flash.

## 3. JavaScript

Entirely vanilla. One inline `<script>` block at the end of `<body>`, ~20 lines:

- `addEventListener('scroll', ...)` → toggle nav `.scrolled` class
- `IntersectionObserver` → fade-in reveal
- `querySelectorAll('a[href^="#"]')` → smooth anchor scroll

No libraries loaded:
- No GSAP
- No ScrollTrigger
- No Lenis
- No Framer Motion
- No Three.js / R3F / Drei
- No Spline
- No Alpine
- No jQuery
- No Swiper / Embla
- No AOS / ScrollReveal
- No Lottie

Total JS weight: under 1KB uncompressed.

## 4. CSS Architecture

- Single `<style>` block inside `<head>` (everything inline, no external stylesheet).
- Organized via comment headers: `/* ── Hero ── */`, `/* ── Navigation ── */`, `/* ── Diagnosis ── */`, etc. — BEM-ish naming but flat (`.diagnosis-card`, `.diagnosis-grid`, `.phase-timeline`).
- Uses CSS custom properties for tokens (`:root { --gold: ...; }`).
- `clamp()` for fluid hero/section titles.
- `grid` for layout (diagnosis, SWOT, pillars, KPIs, budget, steps).
- `flex` for nav, hero meta, badges.
- Two simple media queries (`≤768px`, `≤480px`). No container queries, no subgrid, no `@scope`.
- No `@layer`, no CSS nesting — but would benefit from both in a production rewrite.

## 5. Images / Media

- Grep showed no `<img>` tags in the body sample I inspected (the document is a text + mockup-frame-driven presentation, not a photo-heavy site).
- "Mockups" (brandbook, hub/CRM, site previews) are rendered in pure HTML/CSS — fake browser chrome with HTML-drawn content inside, not screenshots.
- No SVG filters, no `<canvas>`, no `<video>`, no WebGL.
- Icons are inline SVG (stroke-based, Lucide/Feather style, gold-tinted).

## 6. HTTP Headers / Build Artifacts Observable

- Vercel static: the page is straight HTML served with default Vercel headers.
- No service worker, no manifest, no meta robots tags noted, no OG image configured (a gap for social sharing).
- No analytics script (no GA, no Plausible, no Fathom, no Vercel Analytics `_vercel/insights`).
- Favicon: not verified via the captured HTML — likely missing or default.

## 7. Approximate Total Page Weight

- HTML: ~100KB (includes all CSS + JS inline)
- Fonts: ~200KB (Cormorant Garamond x10 cuts + Inter x5 cuts from Google Fonts)
- Images: ~0KB (no raster assets in the document)
- JS: under 1KB

**Total first paint: ~300KB**. Extremely light for the visual richness on screen.

## 8. Takeaway for REIS [IA] Usage

This is the simplest possible premium stack: hand-written HTML + CSS + vanilla JS on Vercel. Zero dependencies, zero build step, zero framework weight. It is NOT the right stack for the real Castelo dos Lagos + Buffet Di Matoso production sites (which will need a CMS, image galleries, booking integration, forms, i18n), but it is the **perfect skeleton** to prove the aesthetic direction in a brief / mood board / stakeholder presentation with zero overhead.

For production, port the token system and motion discipline into Astro (matches the REIS [IA] default stack) with Tailwind + CSS custom properties as the bridge layer.
