# Design Tokens — castelo-estrategia.vercel.app

> Extracted: 2026-04-15
> Source: https://castelo-estrategia.vercel.app/
> HTML size: 100,489 bytes (single self-contained document, CSS + JS inline)
> Document type: Strategic presentation ("Documento Confidencial") prepared by REIS [IA] for Castelo dos Lagos + Buffet Di Matoso branded house

---

## 1. Color Palette

### CSS Custom Properties (from `:root`)

| Token | Hex | Role |
|---|---|---|
| `--gold` | `#C9A96E` | PRIMARY ACCENT — warm antique gold, the defining signature |
| `--gold-light` | `#D4B97A` | Hover / highlight variant |
| `--gold-dark` | `#A68B5B` | Pressed / deep variant |
| `--cream` | `#F5F0E8` | Surface warm light |
| `--cream-dark` | `#E8E0D0` | Secondary warm surface |
| `--charcoal` | `#1A1A1A` | PRIMARY DARK — near-black, dominant background in dark sections |
| `--charcoal-light` | `#2A2A2A` | Raised surface on dark |
| `--text-dark` | `#0D0D0D` | Max-contrast body text on light |
| `--text-muted` | `#6B6B6B` | Secondary body text |
| `--text-light` | `#999` | Tertiary / meta / strike-through |
| `--white` | `#FFFFFF` | Pure white surface |
| `--surface` | `#FAFAF7` | WARM OFF-WHITE — the "paper" feel, the actual body bg on light sections |

### Derived / Contextual Colors

| Use | Value |
|---|---|
| `--border` | `rgba(201, 169, 110, 0.2)` — gold @ 20% (default divider) |
| `--border-strong` | `rgba(201, 169, 110, 0.4)` — gold @ 40% (hover state divider) |
| Hero glow (dark) | `radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.08) 0%, transparent 60%)` + second at `80% 20%` @ 0.05 |
| Text on dark primary | `rgba(255,255,255,0.5)` |
| Text on dark secondary | `rgba(255,255,255,0.45)` |
| Text on dark tertiary | `rgba(255,255,255,0.35)` / `.25` / `.2` |
| Dividers on dark | `rgba(255,255,255,0.06)` |
| Badge high (risk) | bg `rgba(220,38,38,0.15)` / text `#FCA5A5` |
| Badge medium (risk) | bg `rgba(245,158,11,0.15)` / text `#FCD34D` |
| Badge advantage | bg `rgba(201,169,110,0.15)` / text `--gold` |

### Palette Strategy

- Monochromatic warm: gold is the ONLY chromatic hue. Everything else is black/white/warm grey.
- Light sections use `--surface` (#FAFAF7) — never pure white — which reads as "museum paper".
- Dark sections use `--charcoal` (#1A1A1A) — never #000 — which reads as "architecture/editorial".
- Section alternation: white → surface → charcoal → surface → charcoal creates editorial rhythm.

---

## 2. Typography

### Loaded Fonts (Google Fonts, single request)

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- **Cormorant Garamond** — display serif. Weights 300/400/500/600/700 + italic 300/400. Used for ALL headings, numerals, section numbers, pillar names, KPI values, budget totals, nav brand, footer brand. The "luxury" voice.
- **Inter** — UI sans. Weights 300/400/500/600/700. Used for body, labels, card titles (diagnosis/funnel/step), micro-caps. The "modern" voice.

### Type Hierarchy

| Element | Family | Size | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| Hero H1 | Cormorant | `clamp(2.5rem, 6vw, 5rem)` | 300 | -0.02em | 1.1 |
| Hero H1 `<em>` | Cormorant italic | — | 400 | — | — (gold color) |
| Section title | Cormorant | `clamp(2rem, 4vw, 3rem)` | 300 | -0.02em | 1.15 |
| H2/H3 global | Cormorant | — | 400 | -0.02em | — |
| Phase number | Cormorant | 3rem | 300 | — | 1 (opacity 0.6) |
| Pillar percentage | Cormorant | 2.5rem | 300 | — | — |
| KPI target | Cormorant | 2.5rem | 400 | — | — |
| KPI current (strike) | Cormorant | 1.5rem | — | — | line-through |
| Nav brand | Cormorant | 1.1rem | 400 | 0.05em | — |
| Body | Inter | 16px base | 400 | — | 1.7 |
| Section subtitle | Inter | 1rem | 300 | — | 1.8 |
| Card title (Inter override) | Inter | 1.1rem | 600 | -0.01em | — |
| Section number marker | Cormorant | 0.875rem | — | 0.15em | — (gold) |
| Section-label micro-cap | Inter | 0.7rem | 500 | 0.12–0.15em | uppercase |
| Nav link | Inter | 0.75rem | — | 0.1em | uppercase |
| Confidential bar | Inter | 0.6rem | 600 | 0.2em | uppercase |
| Hero meta label | Inter | 0.7rem | — | 0.12em | uppercase |
| Badge / metric pill | Inter | 0.65–0.7rem | — | 0.05em | — |

### Typography Rules

- Headings ALWAYS serif (Cormorant), ALWAYS `font-weight: 300` or `400` (never bold).
- Italic serif + gold color = signature emphasis (hero H1 `<em>`).
- All micro-caps are uppercase + wide letter-spacing (0.1–0.2em) in Inter.
- Body line-height is generous: 1.7 body / 1.8 subtitles. Editorial pacing.
- `-webkit-font-smoothing: antialiased` on body.

---

## 3. Spacing System

Not formal tokens, but the observable scale:

| Use | Value |
|---|---|
| Section vertical padding (desktop) | `6rem 0` (96px) |
| Section vertical padding (mobile ≤768) | `3rem 0` |
| Container max-width | `1100px` |
| Container narrow max-width | `800px` |
| Container horizontal padding | `0 2rem` desktop / `0 1.25rem` mobile |
| Section header bottom margin | `4rem` desktop / `2.5rem` mobile |
| Card padding | `2.5rem` desktop / `1.5rem` mobile |
| Grid gap (cards) | `2rem` or `1px` (hairline divider pattern) |
| Hero padding-top | `2rem` (sits under fixed confidential bar + nav) |

The "1px gap" trick on grids (SWOT, pillars, KPIs) uses `background: var(--border)` + `gap: 1px` to simulate hairline dividers between cards — no borders on individual cards needed.

---

## 4. Radius & Shadows

### Radius

| Use | Value |
|---|---|
| Badges / pills / metric chips | `100px` (full pill) |
| Mockup containers | `12px` |
| Color swatches (brandbook) | `8px` |
| Mockup URL bar | `4px` |
| Sharp cards (diagnosis, SWOT, phase, pillar, KPI, budget) | `0` — ALL cards have zero radius |

**Signature rule**: cards are always square. Rounded radius ONLY appears on pills and interactive mockup frames. This is a deliberate editorial/architectural choice.

### Shadows

| Use | Value |
|---|---|
| Mockup container (light) | `0 20px 60px rgba(0,0,0,0.08)` |
| Mockup container (dark) | `0 20px 60px rgba(0,0,0,0.4)` |

That is the ONLY shadow definition in the entire document. Cards rely on borders + surface contrast, not shadow.

---

## 5. Borders

- Default divider: `1px solid var(--border)` (gold @ 20%)
- Hover divider: `1px solid var(--border-strong)` (gold @ 40%)
- On-dark dividers: `1px solid rgba(255,255,255,0.06)` (extremely subtle)
- Section-number underline / separator: 1px lines with gold tint

Borders do 90% of the structural work. There is almost zero reliance on drop-shadow.

---

## 6. Breakpoints

| Name | Width |
|---|---|
| Mobile small | ≤ 480px |
| Mobile | ≤ 768px |
| Desktop | > 768px (base) |

Only two media queries — very simple responsive strategy. No tablet-specific breakpoint.

---

## 7. Iconography

- All icons are inline SVG using `stroke` (not fill), 1.5–2px stroke-width, 32×32 default box, `color: var(--gold)`.
- Geometric minimal — line icons, Lucide/Feather-style.

---

## 8. Global Reset

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: var(--white);
  color: var(--text-dark);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
```

No normalize.css, no Tailwind, no framework — hand-written CSS.
