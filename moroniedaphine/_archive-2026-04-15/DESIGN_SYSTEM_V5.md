# Moroni & Daphine — Design System v5

> "Romantic Couture Vintage" — Bridgerton chamber meets Dior couture invitation.
> Versão: 5.0 — 2026-04-14 (v1-v4 descartadas)

---

## 0. North Star Principle

**A Velvet Section é a marca.** Cada seção do site precisa parecer uma câmara iluminada por velas: burgundy profundo, rose gold líquido, luz pulsando nas bordas, tipografia serif italic como sussurro caligráfico. Se uma seção não faz o visitante sentir que acabou de entrar num salão privado, ela está errada.

---

## 1. Color Token System

### Burgundy scale (dominante — 60% do site)
```css
--burgundy-950: #0F0307;  /* Near-black core, footer, modal backdrop */
--burgundy-900: #1A050A;  /* Vignette outer, deep shadow */
--burgundy-800: #2E0810;  /* Velvet radial mid-stop */
--burgundy-700: #4A0E1C;  /* Velvet radial center (north star) */
--burgundy-600: #6B1527;  /* Button hover, rim light */
--burgundy-500: #8E4B4E;  /* Dusty rose highlight, gradient start */
```

### Rose Gold scale (metal principal — 30%)
```css
--rose-gold-900: #6B3A3F;  /* Dark foil edge */
--rose-gold-700: #B76E79;  /* Core rose gold (signature) */
--rose-gold-500: #D4A5A5;  /* Light petal highlight */
--rose-gold-300: #EFD0CC;  /* Whisper wash */
```

### Champagne scale (accent cálido — 10%)
```css
--champagne-700: #8E6B3A;  /* Candle dark edge */
--champagne-500: #D4B996;  /* Candle glow center */
--champagne-300: #EFE2CC;  /* Highlight, parchment wash on burgundy */
```

### Cream / Parchment scale (base para seções claras)
```css
--parchment-300: #FBF6EB;  /* Lightest parchment */
--parchment-500: #F5EEE0;  /* Base parchment */
--parchment-700: #E8DCC2;  /* Folded shadow */
```

### NOIR scale (secondary tier — black-tie)
```css
--noir-950: #050505;  /* Absolute core */
--noir-900: #0D0A08;  /* Radial mid, warm-black */
--noir-800: #181512;  /* Rim light */
```

### IVORY scale (noir tier text)
```css
--ivory-100: #FFFDF7;  /* Pure cream over noir */
--ivory-300: #F4ECD6;  /* Aged ivory, serif body on noir */
```

### Gold Yellow scale (noir tier metal)
```css
--gold-900: #5E4511;  /* Dark foil */
--gold-700: #A7842E;  /* Core yellow gold */
--gold-500: #D4B24C;  /* Highlight foil */
--gold-300: #F0D98C;  /* Candle cast */
```

### Ink text tokens
```css
--ink-on-burgundy:  #F4ECD6;  /* Body text over velvet */
--ink-on-burgundy-muted: rgba(244, 236, 214, 0.66);
--ink-on-parchment:  #1F0610;  /* Body text over cream */
--ink-on-parchment-muted: rgba(31, 6, 16, 0.64);
--ink-on-noir:  #F4ECD6;
--ink-on-noir-muted: rgba(244, 236, 214, 0.58);
```

### Signature Gradients

**`--grad-rose-gold-foil`** — usado em nomes, números, ornamentos principais:
```css
background: linear-gradient(135deg, #8E4B4E 0%, #D4A5A5 28%, #EFD0CC 48%, #D4B996 62%, #B76E79 85%, #6B3A3F 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

**`--grad-gold-foil`** (noir tier):
```css
background: linear-gradient(135deg, #5E4511 0%, #D4B24C 35%, #F0D98C 55%, #A7842E 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

**`--grad-candle-glow`** — usado como background radial dos cards e seções velvet:
```css
background: radial-gradient(ellipse 80% 60% at 50% 45%, #4A0E1C 0%, #2E0810 42%, #1A050A 72%, #0F0307 100%);
```

---

## 2. Typography System

**Três fontes. Só três.** Tudo mais é ruído.

### Display — `Cormorant Garamond` italic
- **Uso:** nomes dos noivos, títulos de seção, números grandes (12, Junho), leads italic.
- **Weight:** 500 (never 700 — peso médio italic tem mais alma que heavy).
- **Style:** italic sempre, exceto em labels.
- **Letter-spacing:** -0.01em nos displays gigantes, 0 no resto.
- **Scale de nomes:** `clamp(4rem, 12vw, 11rem)`, line-height 0.92.
- **Por quê:** já testada e APROVADA na velvet section. Italic médio em tamanhos couture lê como caligrafia fluida, não como template wedding.

### Script — `Great Vibes`
- **Uso:** APENAS o "&" ampersand, a palavra "Junho", e assinatura no footer. Nada mais.
- **Scale:** `clamp(4rem, 9vw, 7rem)` no "&" hero; `clamp(3rem, 7vw, 5rem)` em "Junho".
- **Color:** sempre `--rose-gold-500` no velvet tier ou `--gold-500` no noir tier.
- **Regra:** NUNCA em palavras longas. Great Vibes em frases inteiras é doce demais. Só como flourish isolado.
- **Por quê:** a única script que passou o teste da velvet section. Tem swash natural, peso certo, mãos delicadas.

### Body — `EB Garamond` roman
- **Uso:** parágrafos, textos de capítulo, labels de gift.
- **Size:** 17px desktop, 16px mobile, line-height 1.8, max-width 58ch.
- **Style:** roman (não italic) para não cansar. Italic é função do display.

### Type Scale (6 tamanhos)
```css
--fs-hero:     clamp(4rem,  12vw, 11rem);   /* Nomes */
--fs-display:  clamp(2.5rem, 6vw,  5.5rem); /* Títulos seção */
--fs-script:   clamp(3rem,  7vw,  5rem);    /* & / Junho */
--fs-lead:     clamp(1.25rem, 2vw, 1.75rem);/* Italic lead */
--fs-body:     1.0625rem;                    /* 17px */
--fs-label:    0.6875rem;                    /* 11px Montserrat caps — mas Montserrat NÃO está na lista. Usar Cormorant SC uppercase 11px tracking 0.35em. */
```

Labels = **Cormorant SC** (small caps já desenhadas), uppercase, 11px, letter-spacing 0.35em, color `--rose-gold-500`. (Cormorant SC está na lista aprovada; mantém coerência serif.)

### Regras
1. **Nunca** usar Playfair, Italianno, Pinyon, Tangerine, DM Serif, Forum, Italiana. Descartadas por falharem em v1-v4.
2. **Nunca** ALL CAPS nos nomes. V2 tentou isso — frio demais. Usar italic minúscula lower-case, como a velvet section já comprovou.
3. **Nunca** misturar script e display no mesmo bloco salvo "&" entre nomes.

---

## 3. Component Library

### 3.1 Velvet Card (`.velvet-card`) — north star
```css
.velvet-card {
  background: radial-gradient(ellipse 85% 70% at 50% 40%, #4A0E1C 0%, #2E0810 45%, #1A050A 100%);
  border: 1px solid rgba(183, 110, 121, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(239, 208, 204, 0.08),
    inset 0 0 80px rgba(15, 3, 7, 0.55),
    0 40px 120px -30px rgba(15, 3, 7, 0.8),
    0 0 0 1px rgba(183, 110, 121, 0.08);
  padding: clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem);
  position: relative;
  overflow: hidden;
}
.velvet-card::before {
  /* grain overlay */
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E");
  opacity: 0.08;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

### 3.2 Noir Velvet Card (`.noir-card`) — premium tier
```css
.noir-card {
  background: radial-gradient(ellipse 90% 75% at 50% 40%, #181512 0%, #0D0A08 55%, #050505 100%);
  border: 1px solid rgba(212, 178, 76, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(240, 217, 140, 0.1),
    inset 0 0 90px rgba(0, 0, 0, 0.7),
    0 50px 140px -40px #000;
  padding: clamp(4rem, 8vw, 8rem) clamp(2rem, 6vw, 6rem);
}
```

### 3.3 Ivory Card (`.ivory-card`) — lighter sections
```css
.ivory-card {
  background: radial-gradient(ellipse at top, #FBF6EB 0%, #F5EEE0 60%, #E8DCC2 100%);
  border: 1px solid rgba(183, 110, 121, 0.2);
  box-shadow: 0 30px 80px -20px rgba(74, 14, 28, 0.18);
  padding: clamp(3rem, 6vw, 6rem);
}
```

### 3.4 Candle Glow (`.candle`) — pulsing background element
```css
.candle {
  position: absolute;
  width: 480px; height: 480px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 185, 150, 0.22) 0%, rgba(183, 110, 121, 0.09) 35%, transparent 70%);
  filter: blur(50px);
  animation: candle-pulse 6s ease-in-out infinite;
  pointer-events: none;
}
@keyframes candle-pulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%      { opacity: 1;   transform: scale(1.08); }
}
```
Posicionar 2-3 candles por seção velvet, em offsets diferentes (top-left, bottom-right, center-back) com `animation-delay` -2s e -4s para assíncrona.

### 3.5 Wax Seal (`.wax-seal`) — proper implementation
**Approach: real SVG monogram.** Drop the script-character approach entirely.
```html
<div class="wax-seal">
  <svg viewBox="0 0 120 120" class="wax-seal__svg">
    <defs>
      <radialGradient id="wax" cx="35%" cy="30%">
        <stop offset="0%" stop-color="#8E4B4E"/>
        <stop offset="55%" stop-color="#4A0E1C"/>
        <stop offset="100%" stop-color="#1A050A"/>
      </radialGradient>
    </defs>
    <circle cx="60" cy="60" r="56" fill="url(#wax)"
            stroke="#B76E79" stroke-width="0.6" stroke-opacity="0.5"/>
    <circle cx="60" cy="60" r="50" fill="none"
            stroke="#D4A5A5" stroke-width="0.4" stroke-opacity="0.3"/>
    <!-- Intertwined M + D in Cormorant italic as TEXT elements, manually kerned -->
    <text x="42" y="78" font-family="Cormorant Garamond" font-style="italic"
          font-weight="500" font-size="58" fill="#EFD0CC" opacity="0.92">M</text>
    <text x="62" y="78" font-family="Cormorant Garamond" font-style="italic"
          font-weight="500" font-size="58" fill="#D4A5A5" opacity="0.92">D</text>
  </svg>
}
```
```css
.wax-seal { width: 120px; height: 120px; filter: drop-shadow(0 8px 24px rgba(15,3,7,0.7)); }
```
Rationale: two glyphs overlapping with tight kerning read as a monogram. Cormorant italic has the ligature-like swash. No illegible `&` ampersand.

### 3.6 Section Header (`.section-header`)
```html
<header class="section-header">
  <p class="section-label">Capítulo II</p>
  <div class="ornament-rule"></div>
  <h2 class="section-title">Nossa História</h2>
  <p class="section-subtitle">um convite aos que caminharam conosco</p>
</header>
```
```css
.section-header { text-align: center; margin-bottom: clamp(4rem, 8vw, 8rem); }
.section-label  { font-family: "Cormorant SC"; font-size: 11px; letter-spacing: 0.35em; color: var(--rose-gold-500); text-transform: uppercase; margin-bottom: 1.5rem; }
.section-title  { font-family: "Cormorant Garamond"; font-style: italic; font-weight: 500; font-size: var(--fs-display); background: var(--grad-rose-gold-foil); -webkit-background-clip: text; color: transparent; line-height: 1; margin: 1.5rem 0; }
.section-subtitle { font-family: "Cormorant Garamond"; font-style: italic; font-size: var(--fs-lead); color: var(--ink-on-burgundy-muted); }
```

### 3.7 Ornamental Rule (`.ornament-rule`)
Richer than thin gold rule. SVG com mini flourish central.
```html
<svg class="ornament-rule" viewBox="0 0 320 18" aria-hidden="true">
  <line x1="10" y1="9" x2="140" y2="9" stroke="url(#rgf)" stroke-width="0.8"/>
  <line x1="180" y1="9" x2="310" y2="9" stroke="url(#rgf)" stroke-width="0.8"/>
  <path d="M140 9 Q150 2, 160 9 T180 9" fill="none" stroke="url(#rgf)" stroke-width="1.2"/>
  <circle cx="160" cy="9" r="2.2" fill="#D4A5A5"/>
  <circle cx="142" cy="9" r="1.1" fill="#B76E79" opacity="0.7"/>
  <circle cx="178" cy="9" r="1.1" fill="#B76E79" opacity="0.7"/>
  <defs>
    <linearGradient id="rgf" x1="0" x2="1">
      <stop offset="0" stop-color="#B76E79" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#D4A5A5"/>
      <stop offset="1" stop-color="#B76E79" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>
```
Width 320px desktop, 220px mobile. Opacity 0.85.

### 3.8 Ornamental Divider (`.ornament-divider`) — the ribbon concept, done right
SVG path with real bezier curves forming a flowing ribbon shape, no rectangles.
```html
<svg class="ornament-divider" viewBox="0 0 600 80" aria-hidden="true">
  <path d="M20 40 C 100 10, 200 70, 300 40 S 500 10, 580 40"
        fill="none" stroke="url(#rgf)" stroke-width="1.4" stroke-linecap="round"/>
  <path d="M20 44 C 100 14, 200 74, 300 44 S 500 14, 580 44"
        fill="none" stroke="url(#rgf)" stroke-width="0.6" opacity="0.5"/>
  <circle cx="300" cy="40" r="3.5" fill="#D4A5A5"/>
  <circle cx="300" cy="40" r="8" fill="none" stroke="#B76E79" stroke-width="0.5" opacity="0.6"/>
</svg>
```
600×80 viewBox. Usado como seção-ender / seção-opener.

### 3.9 Buttons
**Primary (`.btn-primary`)** — só sobre velvet:
```css
.btn-primary {
  background: linear-gradient(135deg, #6B1527 0%, #4A0E1C 50%, #2E0810 100%);
  color: #F4ECD6;
  border: 1px solid rgba(212, 165, 165, 0.4);
  padding: 1.25rem 3rem;
  font-family: "Cormorant SC"; font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase;
  box-shadow: inset 0 1px 0 rgba(239, 208, 204, 0.15), 0 12px 40px -12px rgba(15, 3, 7, 0.9);
  transition: all 700ms cubic-bezier(0.22, 1, 0.36, 1);
}
.btn-primary:hover {
  background: linear-gradient(135deg, #8E4B4E 0%, #6B1527 50%, #4A0E1C 100%);
  box-shadow: inset 0 1px 0 rgba(239, 208, 204, 0.25), 0 18px 50px -12px #000, 0 0 60px rgba(183, 110, 121, 0.3);
  transform: translateY(-2px);
}
```
**Ghost (`.btn-ghost`)**: 1px border rose-gold, transparent bg, same typography, hover fills bg with `rgba(183,110,121,0.1)`.

### 3.10 Form Input (underline only)
```css
.input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(212, 165, 165, 0.35);
  padding: 0.75rem 0;
  font-family: "Cormorant Garamond";
  font-style: italic;
  font-size: 1.25rem;
  color: var(--ink-on-burgundy);
  outline: none;
  transition: border-color 500ms;
}
.input::placeholder { color: rgba(244, 236, 214, 0.4); font-style: italic; }
.input:focus { border-bottom-color: #D4A5A5; }
```

---

## 4. Signature Ornament — "La Flamme"

**Decision:** a candle flame rendered as a stylized baroque flourish. Specific, unique, evokes the chamber, non-floral, non-geometric.

**SVG spec** (`#ornament-flamme`, viewBox `0 0 60 120`):
- Base: slender elliptical base at (30, 105), width 12, with a small horizontal serif 4px above (the wick cup).
- Main flame body: a single bezier path starting at (30, 100), curving up through (22, 70) → (26, 40) → (30, 15) → (34, 40) → (38, 70) → back to (30, 100). Fill with radial gradient from `#F0D98C` at (30, 85) through `#D4B996` to `#B76E79` at tip.
- Inner flame: second path half-size inside, fill `rgba(255, 253, 230, 0.7)`.
- A single calligraphic swash (ink-style curve) leaves the base at (30, 108) and spirals once to the right, 18px wide, stroke `#B76E79` width 0.8 — the "drip" that identifies this as the Moroni-Daphine flame.

Used at: hero (above the names, 80px tall), as section bullet divider (40px), footer (120px with candle glow behind). Single flame, never repeated in a row. It is the fingerprint.

---

## 5. Hero Composition

```
SECTION .hero (min-h 100vh, bg: --grad-candle-glow extended full-bleed)
├── 3× .candle absolutely positioned (top-left -10%/-5%, bottom-right 5%/-10%, center-back 50%/50%)
├── .grain overlay (svg noise, opacity 0.06, mix-blend soft-light)
├── .hero__inner (max-width 920px, centered, z-10, py 12rem)
│   ├── .section-label  "12 · vi · mmxxvi"  (rose-gold-500, tracking 0.4em)
│   ├── svg #ornament-flamme (80px, margin-bottom 2rem, candle-pulse delay)
│   ├── h1.hero-names
│   │    ├── span.name "moroni reis"   — cormorant italic 500, lowercase,
│   │    │                                fs-hero, grad-rose-gold-foil, line-height 0.92
│   │    ├── span.amp  "&"             — Great Vibes, fs-script, --rose-gold-500,
│   │    │                                block display, margin -1rem 0
│   │    └── span.name "daphine oliveira"
│   ├── .ornament-divider (margin 4rem auto 2rem)
│   ├── p.hero-lead "o tempo, como um sopro, nos trouxe até aqui."
│   │               (Cormorant italic fs-lead, --ink-on-burgundy-muted, max-w 42ch)
│   ├── .hero-date — script "Junho" + display "12" + tiny "XII · VI · MMXXVI"
│   │   arranged: "12" gigante (clamp 8rem 20vw 16rem) gradient rose-gold,
│   │   "Junho" Great Vibes sobreposto na base com transform translateY(-40%),
│   │   "XII · VI · MMXXVI" Cormorant SC 14px tracking 0.4em abaixo
│   ├── .btn-ghost "leia nossa história" (margin-top 4rem)
│   └── .wax-seal (margin-top 6rem, 120px, centered)
└── .section-transition (svg ornament-divider full-width fade into next section)
```

**Transition to next section:** não há "torn paper". Usar um fade vertical: os últimos 120px do hero são um gradient linear de `rgba(15,3,7,0)` para `var(--burgundy-900)` sólido, que emenda no próximo bloco velvet. Bordas dissolvem em vez de cortar.

---

## 6. Page Sections

| # | Seção | Background | Typography | Componentes | Hierarchy |
|---|-------|-----------|------------|-------------|-----------|
| 1 | **Hero** | velvet radial fullbleed + 3 candles + grain | names lowercase italic, Great Vibes "&", SC label | wax-seal, ornament-flamme, ornament-divider, btn-ghost | label → flamme → nomes → & → nomes → divisor → lead → data → CTA → selo |
| 2 | **Nossa História** | velvet radial (slightly darker center) + 2 candles | Cormorant italic display, EB Garamond body | 5× velvet-card chapters (stacked, alternating alignment), ornament-divider entre cards | section-header centralizado → 5 cards (cada card: capitulo label + title italic + body EB + mini ornament rule) |
| 3 | **The Date** (NOIR TIER) | noir radial + gold candle glow | gold-foil gradient on "12", Great Vibes "Junho" em gold-300 | noir-card envolvente, ornament-flamme em gold | label gold → noir-card{ script "sábado" → gigante "12" → script "Junho" → "XII · VI · MMXXVI" SC → convite lead italic} |
| 4 | **Galeria** | velvet radial + subtle grain | Cormorant italic captions | 6 ivory-cards dentro de velvet-card wrapper, grid 12-col | section-header → asymmetric grid (1 large + 2 medium + 3 small), each tile ivory-card with aspect-ratio, hover candle-glow behind |
| 5 | **Presentes** | velvet radial | label SC, display italic names, body EB | 6× velvet-card gift tiles with btn-primary | section-header → grid 3-col (2 mobile) → card{label valor → nome italic → divisor ornament → EB descrição → btn-primary "presentear via pix"} → modal noir-card |
| 6 | **Mensagens** | velvet radial + 1 candle central | Cormorant italic | velvet-card form, underline inputs, btn-primary | section-header → velvet-card form (nome input, mensagem textarea, btn-primary) |
| 7 | **Footer** | noir radial fullbleed + central candle | gold-foil, Great Vibes | wax-seal (large), ornament-flamme, gold-foil script | ornament-flamme (120px pulsing) → names script gold → data SC → "o tempo é rei de amor" decorative italic muted → wax-seal |

---

## 7. Motion System

1. **reveal-up** — `opacity 0→1, translateY 40px→0`, duration 1200ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`. Triggered by IntersectionObserver at `threshold 0.15`, `rootMargin '0px 0px -80px 0px'`. Once only.

2. **candle-pulse** — CSS keyframes loop (already spec'd in 3.4). Applied automatically on `.candle`.

3. **rule-draw** — `.ornament-rule` / `.ornament-divider` paths use `stroke-dasharray: path-length; stroke-dashoffset: path-length;` animated to `0` over 1600ms ease-out after reveal. JS sets `el.style.strokeDasharray = el.getTotalLength()`.

4. **seal-press** — `.wax-seal` starts `scale(0.9) opacity 0`, transitions to `scale(1) opacity 1` over 900ms with `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight back). Triggered on reveal.

5. **cursor-halo** — fixed 400px radial gradient `rgba(212,165,165,0.08) → transparent`, follows mouse with `requestAnimationFrame` lerp (factor 0.12), mix-blend `screen`. Disabled on touch. Only active over velvet/noir sections.

6. **hero-names-shimmer-on-load** — on page load only, the rose-gold gradient on names animates `background-position: 0% 50% → 100% 50%` over 2800ms, then freezes. Runs once. Not a loop.

7. **parallax-candles** — each `.candle` translates at `0.08x` scroll offset (very subtle) via `window.scrollY` listener with throttle. Respects `prefers-reduced-motion`.

All motion respects `@media (prefers-reduced-motion: reduce)` — reveals become instant opacity-only, candle-pulse pauses, cursor-halo disabled, shimmer static.

---

## 8. Prohibitions v5 (Hard List)

1. ❌ Italiana, Playfair Display, Didot, DM Serif, Forum, Italianno, Pinyon Script, Tangerine — qualquer uso.
2. ❌ ALL CAPS letter-spaced nos nomes dos noivos. Sempre lowercase italic.
3. ❌ SVG geométrico de flor (8 pétalas, diamante, mandala).
4. ❌ Art Nouveau line-art botânica.
5. ❌ Watercolor rose em SVG circular ("concentric petals").
6. ❌ Wax seal usando o caractere "&" como monograma. Só usar texts M + D sobrepostos.
7. ❌ Corner frames L-shape em qualquer componente.
8. ❌ Thin gold-on-cream rule solitário. Sempre usar ornament-rule com flourish.
9. ❌ Velvet card com flat radial. Sempre ellipse + inner shadow + grain overlay + border glow (os 4 layers).
10. ❌ Floating roses / parallax de flores flutuantes no hero.
11. ❌ Torn paper edge / clip-path de papel rasgado.
12. ❌ Gold shimmer animado em loop. Só shimmer once-on-load nos nomes.
13. ❌ Marquee infinito horizontal.
14. ❌ Letter-by-letter reveal nos nomes.
15. ❌ Drop caps em parágrafos de corpo.

---

## 9. Migration Path (ordem de execução obrigatória)

**Fase 1 — Foundation (dia 1):**
1. Reescrever `src/styles/global.css` com todos os tokens da seção 1 e 2. Remover tokens v2.
2. Em `Layout.astro`, reduzir `@import` de fontes a **exatamente**: Cormorant Garamond (400, 500 italic), Cormorant SC (400), Great Vibes (400), EB Garamond (400, 500).
3. Criar `src/components/Candle.astro` — uma div `.candle` com props `position`, `size`, `delay`.
4. Criar `src/components/WaxSeal.astro` — svg spec da seção 3.5, monograma M+D.
5. Criar `src/components/OrnamentFlamme.astro` — svg da seção 4.
6. Criar `src/components/OrnamentRule.astro` e `src/components/OrnamentDivider.astro`.

**Fase 2 — Primitives (dia 1-2):**
7. Criar `src/components/VelvetCard.astro` — wrapper com grain pseudoelement.
8. Criar `src/components/NoirCard.astro` e `src/components/IvoryCard.astro`.
9. Criar `src/components/SectionHeader.astro` aceitando props label/title/subtitle.
10. Criar `src/components/Button.astro` com variants `primary` | `ghost`.

**Fase 3 — Hero rebuild (dia 2):**
11. Reescrever completamente `src/pages/index.astro` hero conforme seção 5. Apagar tudo que estava lá.
12. Implementar motion 1-7 em `src/scripts/motion.ts`.
13. Testar hero isoladamente em /home, ajustar candles positioning.

**Fase 4 — Section by section (dia 3-4):**
14. Nossa História (5 chapter cards).
15. The Date (NOIR tier — primeira aplicação do secondary tier).
16. Galeria.
17. Presentes + modal noir.
18. Mensagens (form).
19. Footer.

**Fase 5 — Audit (dia 5):**
20. Reescrever `src/pages/design-system.astro` para renderizar TODOS os tokens e componentes dessa spec como referência visual.
21. Passar pelo brand-audit-checklist (v5 version).
22. Deploy.

**Regra de ouro da migração:** não escrever uma seção sem primeiro ter VelvetCard + Candle + WaxSeal + OrnamentFlamme funcionando isoladamente. Os primitives vêm antes das páginas.

---

**Fim da spec v5.** Toda decisão está tomada. Nenhum "propor". Implementar.
