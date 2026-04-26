# Design System · Buffet Di Matoso · v1.0 · 2026-04-15 · Derived from art-direction-brief-castelo-dimatoso.md

> Phase 3 — Protocolo Branding
> Author: designer-agent
> Status: LOCKED (pending visual validation of 3 decisions flagged at end of file)
> Consumes: art-direction-brief-castelo-dimatoso.md, buffet-gastronomia-premium-2026.md, castelo-estrategia harvest
> Sibling: `brain/assets/branding/castelo-dos-lagos/design-system.md` — shares 100% of type system, 90% of spacing/radius/shadows/breakpoints. Divergence is palette, hero treatment, and motion signature.
> Branded-house signature: Roman numerals (I. II. III. IV.) shared with Castelo dos Lagos.
> CTAs: editorial serif underlines routing to `/orcamento`. Zero pricing. Zero "pacotes". Zero "por pessoa".

---

## 1. Color Tokens

### 1.1 Core palette

| Token | Hex | Role | Usage | Max screen coverage |
|---|---|---|---|---|
| `--charcoal` | `#1A1A1A` | Primary dark surface — dominant background | Hero, plate backgrounds, dark sections, footer | ~60% of total pixels |
| `--charcoal-warm` | `#242020` | Secondary dark surface (warm-shifted) | Section alternation on dark, card surfaces on dark | ~15% |
| `--charcoal-light` | `#2A2A2A` | Tertiary dark surface | Subtle hover states, elevated micro-surfaces | ~5% |
| `--cream` | `#FAFAF7` | Primary light surface — "paper" | Menu editorial pages, long-form reading, essay body | ~15% |
| `--gold-deep` | `#B8860B` | **Primary accent — editorial deep gold — HAIRLINES ONLY** | Section numerals, hairline rules, CTA serif underline, italic emphasis, pull-quote accents, nav wordmark italic, course-card underline | **≤ 8% (HARD CAP)** |
| `--gold-shadow` | `#8E6A0A` | Pressed/hover variant of gold-deep | Interactive gold states (hover, active) | ≤ 1% |
| `--burgundy-whisper` | `#3D1F1F` | Tertiary accent — wine, warmth, depth | One touch per page maximum — usually one pull-quote or one menu header | ≤ 2% |

### 1.2 Derived borders (from gold-deep)

| Token | Value | Use |
|---|---|---|
| `--border` | `rgba(184, 134, 11, 0.35)` | Default hairline divider, card border on dark |
| `--border-strong` | `rgba(184, 134, 11, 0.60)` | Hover divider, focused card border |
| `--border-whisper` | `rgba(184, 134, 11, 0.12)` | Ultra-subtle divider for dense editorial blocks |

### 1.3 Type opacities on charcoal

| Token | Value | Use |
|---|---|---|
| `--on-dark-heading` | `rgba(250, 250, 247, 1.00)` | Hero H1, section titles on dark |
| `--on-dark-primary` | `rgba(250, 250, 247, 0.94)` | Body / primary type on charcoal |
| `--on-dark-secondary` | `rgba(250, 250, 247, 0.65)` | Meta, caption, subtitle, ingredient list on dark |
| `--on-dark-muted` | `rgba(250, 250, 247, 0.50)` | Italic dish description, poetic caption |
| `--on-dark-quiet` | `rgba(250, 250, 247, 0.35)` | Confidential-bar micro-cap, deep meta |
| `--on-dark-hairline` | `rgba(250, 250, 247, 0.25)` | Hairline divider when gold is not appropriate (e.g., over cream islands) |
| `--on-dark-whisper` | `rgba(250, 250, 247, 0.06)` | Ghost-grid overlays, watermark glyphs |

### 1.4 Radial glow gradients (hero atmosphere)

Replicate the ceiling reference glow pattern, warm-gold-tinted, positioned as if a single kitchen pendant lamp glows from inside the frame.

```
--hero-glow-dimatoso:
  radial-gradient(ellipse 80% 55% at 25% 75%,
    rgba(184, 134, 11, 0.14) 0%,
    rgba(184, 134, 11, 0.06) 35%,
    rgba(26, 26, 26, 0) 70%);
```

Optional secondary glow for menu-course dividers:

```
--section-glow-burgundy:
  radial-gradient(ellipse 50% 30% at 50% 100%,
    rgba(61, 31, 31, 0.25) 0%,
    rgba(26, 26, 26, 0) 60%);
```

### 1.5 THE GOLD RULE (most important rule in the system)

Gold lives **exclusively** in: hairlines, rules, underlines, numerals, italic emphasis, typographic strokes. Gold **NEVER** appears as:

- A button fill
- A block background
- A card surface
- A gradient fill
- An icon fill
- A decorative shape

**Maximum screen coverage of gold pixels: 8%.** Measured at any viewport, any scroll position. The designer-agent enforces at review time by sampling rendered pages (color-histogram sampling during visual-qa-agent pass).

**Component-level audit rules** (enforce at build):
- `Nav`: gold appears in wordmark italic emphasis (`<em>Di Matoso</em>`) and in CTA underline only. Never in nav background.
- `Hero`: gold appears in hero H1 `<em>` phrase and in scroll-hint arrow. Never as background, never as overlay.
- `CourseCard`: gold appears in Roman numeral, italic dish description, and self-drawing hairline underneath. Never as card fill, never as card background.
- `CtaSerifUnderline`: gold is the serif underline stroke (1px) + type color. Never a pill background.
- `Footer`: gold appears in wordmark italic and in the single confidential hairline. Never as strip fill.

If a component draft violates the gold-as-fill rule, the draft fails review. No exceptions.

### 1.6 Prohibited colors (hard block)

- Saturated credit-card gold (`#FFD700`, `#FFC700`, anything brighter than `#C9A96E`) — tacky wedding-buffet grammar
- Rose, blush, peach, coral — belongs to the wedding category we refuse
- Chartreuse, neon green, lime — too restaurant-tech
- Pure white `#FFFFFF` — always cream `#FAFAF7`
- Pure black `#000000` — always charcoal
- Olive, sage, mint (forest palette belongs to Castelo)
- Any rainbow / multi-hue accent scheme

---

## 2. Typography Scale

**Fonts**: Cormorant Garamond (display, self-hosted woff2, weights 300/400/500 + italic 300/400) + Inter (structural, weights 300/400/500). **Shared 100% with Castelo dos Lagos** — same woff2 files, same vertical metrics, same pairing rules.

### 2.1 Scale

| Role | Family | Size | Weight | LS | LH | Usage |
|---|---|---|---|---|---|---|
| Hero H1 | Cormorant | `clamp(2.5rem, 6vw, 5rem)` | 300 | -0.02em | 1.05 | Single editorial sentence. One per hero. |
| Hero H1 `<em>` emphasis | Cormorant italic | inherit | 400 | -0.025em | 1.05 | One phrase, `color: var(--gold-deep)`. |
| Section title | Cormorant | `clamp(2.25rem, 4.5vw, 3.5rem)` | 300 | -0.02em | 1.15 | Menu titles (Raízes, Colheita), section headings |
| Section eyebrow (chapter / course marker) | Cormorant | 0.875rem | 400 | 0.15em | 1 | Roman numeral ("I. MENU RAÍZES") + Inter micro-cap label |
| Chapter Roman numeral (large) | Cormorant | `clamp(3rem, 5vw, 4.5rem)` | 300 | -0.02em | 1 | Oversized anchors inside `CourseCard` and section chapters |
| Pull quote (the italic voice of the family) | Cormorant italic | `clamp(1.75rem, 3vw, 2.5rem)` | 400 | -0.01em | 1.25 | Chef quotes, family ritual quotes. Parallax 0.6x over MACRO photography. |
| Dish name | Cormorant | 1.5rem | 400 | -0.01em | 1.25 | Course card dish titles |
| Dish description (italic poetic) | Cormorant italic | 1rem | 400 | -0.005em | 1.5 | The 2-line poetic description under dish name. `color: var(--on-dark-muted)` |
| Ingredient list | Inter | 0.8125rem (13px) | 400 | 0.02em | 1.7 | Comma-separated, no bullets, `color: var(--on-dark-secondary)` |
| Body long-form (essay lead) | Inter | 1rem (16px) | 400 | 0 | 1.75 | 800px max column. Menu essay intros. |
| Body short | Inter | 0.875rem | 400 | 0 | 1.6 | Captions, label copy |
| Micro-cap (nav, label, menu subtitle) | Inter | 0.7rem | 500 | 0.15em | 1 | UPPERCASE |
| Confidential/footer bar | Inter | 0.6rem | 500 | 0.20em | 1 | UPPERCASE |
| CTA serif underline | Cormorant | 1.125rem | 400 | 0 | 1 | `border-bottom: 1px solid var(--gold-deep); padding-bottom: 0.35em` |
| Metadata row (functional) | Inter | 0.8125rem | 400 | 0.02em | 1.7 | Address, phone, functional arabics |
| Metadata numeral (typographic) | Cormorant | 2.5rem | 300 | 0 | 1 | Year founded, generations count, menu count |

### 2.2 Pairing rules (non-negotiable — shared with Castelo)

1. Headings ALWAYS Cormorant. Even dish names, even course titles.
2. Body ALWAYS Inter. Cormorant italic appears only as the dish description voice-line, never as running body.
3. Italic serif is the voice of the family describing the plate. It is voice, not decoration. Reserved for: (a) hero H1 emphasis, (b) dish poetic descriptions, (c) chef/family pull-quotes, (d) the `[Di Matoso]` of the wordmark.
4. Weight discipline: Cormorant 300 for hero, 400 for emphasis and body headings. Inter 400 for body, 500 for micro-caps. Bold banned in both faces.
5. Never italic within a single word. Phrase-scoped minimum.

### 2.3 Numeral system

- **Roman numerals** (I. II. III. IV. V. VI. VII.): Cormorant 300/400, `color: var(--gold-deep)`. Always paired with Inter micro-cap uppercase label (`I. MENU RAÍZES`, `III. PRATO PRINCIPAL`). This is the branded-house signature shared with Castelo — both sites use Roman, never Arabic, for chapter/course markers.
- **Arabic numerals**: Cormorant 300 when typographic (year founded, generations count), Inter 400 when functional (phone, address, WhatsApp number).
- No mixing within one section.
- **Zero price numerals anywhere on the site** — this is a content rule, not a typography rule, but enforce at review.

### 2.4 Letter-spacing table

| Context | LS |
|---|---|
| Cormorant hero (72px+) | -0.025em |
| Cormorant section title (32–56px) | -0.02em |
| Cormorant dish name / body heading (24px) | -0.01em |
| Cormorant italic dish description | -0.005em |
| Cormorant CTA serif underline | 0 |
| Inter body (16px) | 0 |
| Inter ingredient list (13px) | 0.02em |
| Inter micro-cap UPPERCASE | 0.15em |
| Inter confidential bar UPPERCASE | 0.20em |
| Cormorant wordmark | 0.05em |

---

## 3. Spacing System

Base unit: 0.25rem (4px). Shared 100% with Castelo dos Lagos — the grid is the grid.

| Token | Value | Use |
|---|---|---|
| `--section-padding-y` | `clamp(4rem, 10vh, 10rem)` | Default section top/bottom |
| `--section-padding-y-desktop` | 6rem | Explicit floor |
| `--section-padding-y-mobile` | 3rem | Explicit floor |
| `--section-header-margin-b` | 4rem desktop / 2.5rem mobile | |
| `--container` | 1100px | Editorial shell |
| `--container-narrow` | 800px | Long-form reading, menu essay prose |
| `--container-wide` | 1320px | Full-bleed photography breakouts (plate hero, environment wides) |
| `--container-padding-x-desktop` | 2rem | |
| `--container-padding-x-mobile` | 1.25rem | |
| `--card-padding-desktop` | 2.5rem | |
| `--card-padding-mobile` | 1.5rem | |
| `--grid-gap-default` | 2rem | |
| `--grid-gap-hairline` | 1px | Hairline divider trick on gallery/swatch grids |
| `--rhythm-body-lh` | 1.75 | |
| `--rhythm-lead-lh` | 1.8 | |
| `--rhythm-ingredient-lh` | 1.7 | Ingredient list specific |

**Rule**: Text columns never exceed 800px. The 1100px container is for page chrome.

**Rule**: Every `<section>` targets `min-height: 100vh` on desktop. 6 sections maximum on homepage (hero, kitchen story, menus, plates, rituals, contact).

**Editorial grid**: 3-column asymmetric (`260px | 1fr | 260px`). Sections alternate which column is wide. Mobile collapses to single column.

---

## 4. Radius & Shadows

### 4.1 Radius

| Token | Value | Use |
|---|---|---|
| `--radius-0` | 0 | All cards, all images, all section containers, CourseCard. Default. |
| `--radius-pill` | 100px | Score pills, confidential-bar badges, meta chips ONLY |
| `--radius-mockup` | 12px | Interactive mockup frames (if any — initial build ships zero) |

Square is the manuscript statement. CourseCard is explicitly radius 0 — the "printed card motif" depends on square corners.

### 4.2 Shadows

**Only one shadow in the system.** Borders and hairlines do 90% of the structural work; the dark charcoal background does the rest.

| Token | Value | Use |
|---|---|---|
| `--shadow-image` | `0 20px 60px rgba(0, 0, 0, 0.40)` (dark context) / `0 20px 60px rgba(0, 0, 0, 0.08)` (cream context) | Image frames only (plate hero, environment photo wrapper) |

Cards: `1px solid var(--border)`, no shadow. Nav: no shadow (uses `backdrop-filter: blur(12px)` on scroll state). CourseCards: no shadow (1px gold hairline at bottom, self-drawing). Modals: no shadow.

---

## 5. Breakpoints

Shared 100% with Castelo.

| Name | Range |
|---|---|
| Mobile | ≤ 768px |
| Desktop | ≥ 769px |
| Mobile small | ≤ 480px (padding tuning only) |

Zero tablet breakpoint.

---

## 6. Component Specs

### 6.1 `Nav` (fixed)

**Anatomy**
```
<nav>
  <div class="brand">Buffet <em>Di Matoso</em></div>
  <ul class="nav-links">
    <li>A Cozinha</li> <li>Menus</li> <li>Rituais</li> <li>Contato</li>
  </ul>
  <a class="nav-cta">Solicitar orçamento</a>
</nav>
```

**Default state** (top of page)
- Position: `fixed`, top 0, full width, `z-index: 100`
- Background: transparent
- Padding: 1.5rem 2rem desktop / 1rem 1.25rem mobile
- Brand wordmark: Cormorant 1.1rem weight 400 LS 0.05em, `color: var(--on-dark-heading)`. `"Di Matoso"` in italic 400, `color: var(--gold-deep)`.
- Nav links: Inter micro-cap 0.7rem weight 500 LS 0.15em UPPERCASE, `color: var(--on-dark-secondary)`. Hover → `color: var(--gold-deep)` + self-drawing 1px hairline underline below (400ms).
- Nav CTA: Cormorant 1rem, `color: var(--gold-deep)`, `border-bottom: 1px solid var(--gold-deep)`, padding-bottom 0.3em. No pill fill.

**Scrolled state** (`scrollY > 40`)
- Background: `rgba(26, 26, 26, 0.85)` + `backdrop-filter: blur(12px) saturate(1.1)`
- Bottom hairline: `1px solid var(--border)`
- Padding: 1rem 2rem
- Transition: 400ms ease-out-expo on background/padding/backdrop

**Mobile** (≤ 768px)
- Hamburger icon: 3 hairlines 20px wide 1.5px stroke, `color: var(--on-dark-heading)`
- Full-screen overlay: background `var(--charcoal)`, Cormorant 2rem stacked links, fade 400ms

Tokens: `--on-dark-heading`, `--on-dark-secondary`, `--gold-deep`, `--border`, `--charcoal`

---

### 6.2 `ConfidentialBar`

**Anatomy**
```
<div class="confidential-bar">
  <span class="badge">Orçamento Por Consulta</span>
  <span class="meta">Eventos privados · Cozinha rural</span>
</div>
```

- Height: 28px desktop / 32px mobile
- Background: `var(--charcoal)` or darker `#0F0F0F`
- Text: Inter 0.6rem weight 500 LS 0.2em UPPERCASE, `color: var(--on-dark-quiet)`
- Badge: `border-radius: 100px`, background `rgba(184, 134, 11, 0.10)`, border `1px solid var(--border-strong)`, `color: var(--gold-deep)`, padding 0.25rem 0.75rem
- Separator `·`: `color: var(--on-dark-muted)`

**Gold audit**: the badge background is `rgba(184, 134, 11, 0.10)` — a gold tint at 10% opacity, which counts against the 8% coverage cap. Verify that the badge's on-screen footprint is tiny (< 0.5% of viewport).

Tokens: `--charcoal`, `--on-dark-quiet`, `--on-dark-muted`, `--gold-deep`, `--border-strong`

---

### 6.3 `HeroPlate` / `HeroHands` (two variants)

**Shared anatomy**
```
<section class="hero-plate">
  <div class="hero-image" role="img" aria-label="..."></div>
  <div class="hero-glow"></div>
  <div class="hero-meta-chips">...</div>
  <h1 class="hero-headline"><em>A cozinha</em> imprime o menu como quem imprime um livro.</h1>
  <div class="hero-scroll-hint">I. A Cozinha ↓</div>
</section>
```

**Shared specs**
- Section: 100vh, relative, overflow hidden, background `var(--charcoal)`
- `.hero-image`: absolute inset 0, `background-image: url(...)`, `background-size: cover`, `background-position: center`, z-index 1. For `HeroPlate` the image is a 3/4 angle plate on dark stone; for `HeroHands` it's hands plating at overhead 3/4. NO autoplay video, NO audio.
- `.hero-glow`: absolute inset 0, z-index 2, `background: var(--hero-glow-dimatoso)`, pointer-events none
- Meta chips: top-left or bottom-left, z-index 3, Inter 0.6rem UPPERCASE LS 0.2em, `color: var(--on-dark-secondary)`, example "MENU OUTONO · FAMÍLIA DI MATOSO · SOB CONSULTA"
- H1: bottom-left, padding 2rem 2rem 5rem, z-index 3, Cormorant 300 `clamp(2.5rem, 6vw, 5rem)` LH 1.05 LS -0.025em. One italic `<em>` in `var(--gold-deep)`. Max-width 900px. Color `var(--on-dark-heading)`.
- Scroll hint: bottom-center, Inter micro-cap 0.65rem UPPERCASE, `color: var(--on-dark-quiet)`, with hairline arrow ↓

**Seasonal swap**: rotate between `HeroPlate` and `HeroHands` every 6 months. Both share this exact spec — only the image source changes.

**NO scrim** over the plate photo. If the H1 can't be read, re-grade the photo.

**Reduced motion**: `hero-image` is a static background (no motion at baseline anyway). Nothing changes.

Tokens: `--charcoal`, `--hero-glow-dimatoso`, `--on-dark-heading`, `--on-dark-secondary`, `--on-dark-quiet`, `--gold-deep`

---

### 6.4 `ChapterHeader` (section head)

**Anatomy** identical to Castelo — same grid (260 | 1fr), same order (marker → title → lead). Token swaps:

- `.roman`: `color: var(--gold-deep)` (no bronze variant on Di Matoso)
- `.label`: Inter micro-cap UPPERCASE, `color: var(--gold-deep)` default or `var(--on-dark-secondary)` for reduced emphasis
- `.chapter-title`: `color: var(--on-dark-heading)` on dark / `var(--near-black-equivalent: #1A1A1A text)` on cream. `<em>` in italic 400 `color: var(--gold-deep)`.
- `.chapter-lead`: `color: var(--on-dark-primary)` on dark / `color: #1A1A1A` on cream

**Hairline**: bottom of header, 1px, `background: var(--gold-deep)`, self-drawing on scroll entry (Di Matoso uses this EVERYWHERE — see §8).

Tokens: `--gold-deep`, `--on-dark-heading`, `--on-dark-primary`, `--on-dark-secondary`

---

### 6.5 `SwatchGrid` (palette / environment grid)

Identical mechanics to Castelo — `gap: 1px`, parent `background: var(--border)`, child cells `background: var(--charcoal-warm)` or image.

Tokens: `--border`, `--charcoal-warm`

---

### 6.6 `DirectionCard` / `PilarCard`

Identical anatomy to Castelo. Token swaps:
- `background: var(--charcoal)` (or `var(--cream)` on light context)
- `border: 1px solid var(--border)`
- `.roman-large`: `color: var(--gold-deep)`
- `.card-title`: `color: var(--on-dark-heading)` (Cormorant 400 1.5rem)
- `.card-body`: `color: var(--on-dark-primary)` (Inter 0.9375rem)
- Hover: border `var(--border) → var(--border-strong)` over 400ms

Tokens: `--charcoal`, `--cream`, `--border`, `--border-strong`, `--gold-deep`, `--on-dark-heading`, `--on-dark-primary`

---

### 6.7 `ReferenceCard` (family/kitchen reference card)

Identical to Castelo. Token swaps: `color: var(--gold-deep)` on ref-link arrow, `color: var(--on-dark-secondary)` on ref-num.

---

### 6.8 `CourseCard` (**Di Matoso signature component** — not present on Castelo)

**Anatomy**
```
<article class="course-card">
  <div class="course-marker">
    <span class="roman">I.</span>
    <span class="label">Entrada</span>
  </div>
  <h3 class="dish-name">Pão da casa, manteiga defumada</h3>
  <p class="dish-description"><em>A massa mãe dessa focaccia vem da avó. A manteiga, do fogo.</em></p>
  <p class="ingredient-list">Farinha de trigo da serra, fermento natural, manteiga artesanal, sal marinho, alecrim fresco</p>
  <div class="hairline-rule"></div>
</article>
```

**Specs**
- Background: `var(--charcoal)` (or `var(--cream)` on light context)
- Border: `1px solid var(--border-whisper)` top and sides — the bottom border is the self-drawing hairline
- Border-radius: 0
- Padding: 2.5rem desktop / 1.5rem mobile
- Display: flex column, gap 1rem

- `.course-marker`: flex row align-baseline gap 0.75rem, margin-bottom 1rem
- `.course-marker .roman`: Cormorant 300 2.5rem `color: var(--gold-deep)` LH 1
- `.course-marker .label`: Inter micro-cap 0.7rem UPPERCASE LS 0.15em weight 500 `color: var(--gold-deep)`

- `.dish-name`: Cormorant 400 1.5rem LS -0.01em LH 1.25 `color: var(--on-dark-heading)`
- `.dish-description`: Cormorant italic 400 1rem LS -0.005em LH 1.5 `color: var(--on-dark-muted)`. This is the voice of the cook.
- `.ingredient-list`: Inter 400 0.8125rem LS 0.02em LH 1.7 `color: var(--on-dark-secondary)`, comma-separated, no bullets. Margin-top 0.5rem.
- `.hairline-rule`: absolute bottom 0 left 0, width 0 → 100% on scroll entry, 1px height, `background: var(--gold-deep)`, transition `width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 300ms`, self-draws on reveal

**Zero price** anywhere in this component. At review, any rendered CourseCard with a price visible fails the audit.

**Hover state**: no transform, no background change. The border-whisper top/sides transition to `var(--border)` over 400ms. Nothing else.

Tokens: `--charcoal`, `--cream`, `--border-whisper`, `--border`, `--gold-deep`, `--on-dark-heading`, `--on-dark-muted`, `--on-dark-secondary`

---

### 6.9 `PullQuote` (oversized italic, 0.6x parallax variant)

**Anatomy**
```
<blockquote class="pull-quote">
  <p>A cozinha não decora. <em>A cozinha decide.</em></p>
  <footer class="attribution">— Família Di Matoso · III. Rituais</footer>
</blockquote>
```

- Container: max-width 900px, margin 0 auto, padding `clamp(4rem, 8vh, 8rem) 2rem`
- Background: optional full-bleed MACRO photograph behind the quote (flour, dough, hands) with `opacity: 0.4` overlay
- `p`: Cormorant italic 400 `clamp(1.75rem, 3vw, 2.5rem)` LH 1.25 LS -0.01em `color: var(--on-dark-heading)`. Inline `<em>` in `color: var(--gold-deep)`.
- `.attribution`: Inter micro-cap 0.7rem UPPERCASE LS 0.15em weight 500 `color: var(--on-dark-secondary)`, margin-top 2rem

**Parallax variant** (0.6x — the only parallax license on the site)
- Background MACRO photo translates at 0.6x scroll speed while the quote text scrolls at 1x
- Implementation: prefer native CSS `animation-timeline: scroll()` if supported; fall back to Lenis + ScrollTrigger (see §8)

**Reduced motion**: disable parallax entirely, photo stays static.

Tokens: `--on-dark-heading`, `--on-dark-secondary`, `--gold-deep`

---

### 6.10 `ScorePill` (meta chips)

Identical to Castelo. Tokens: background `rgba(184, 134, 11, 0.10)`, border `var(--border-strong)`, text `var(--gold-deep)`.

---

### 6.11 `BrandCardSplit` (branded-house card — links to Castelo dos Lagos)

Identical mechanics to the one spec'd in Castelo's design-system.md §6.9. On Di Matoso this card sits near the footer and its "you are here" half is the Di Matoso half. Palette strips at the bottom of each half use each brand's swatches.

Tokens: `--charcoal`, `--gold-deep`, `--on-dark-heading`, `--on-dark-secondary`, `--cream`, plus Castelo tokens referenced by name for the sibling half.

---

### 6.12 `CtaSerifUnderline` (only CTA pattern)

**Anatomy**
```
<a class="cta-serif" href="/orcamento">
  <span class="cta-line">Solicitar orçamento</span>
  <span class="cta-meta">Orçamento sob consulta · Eventos privados</span>
</a>
```

- Display: inline-flex column align-start gap 0.5rem
- `.cta-line`: Cormorant 1.125rem weight 400, `color: var(--gold-deep)`, `border-bottom: 1px solid var(--gold-deep)`, padding-bottom 0.35em
- `.cta-meta`: Inter 0.7rem UPPERCASE LS 0.15em weight 500, `color: var(--on-dark-secondary)`
- Hover: border-bottom-color transitions `var(--gold-deep) → var(--cream)` over 300ms. No background fill.
- Active/pressed: `color: var(--gold-shadow)`, border-bottom `var(--gold-shadow)`
- Focus: outline 1px dashed `var(--gold-deep)` offset 4px

**Link destination**: `/orcamento` is the only CTA destination on homepage. Secondary CTAs may open `/menu/raizes`, `/menu/colheita`, `/menu/festanca` — never a pricing page, never a checkout, never a tier selector.

**Zero price rule**: no CTA copy may include a price, a "por pessoa", or a "a partir de". Ever.

Tokens: `--gold-deep`, `--gold-shadow`, `--cream`, `--on-dark-secondary`

---

### 6.13 `Footer`

**Anatomy**
```
<footer>
  <div class="footer-line-1">
    <span class="wordmark">Buffet <em>Di Matoso</em></span>
    <span class="sep">·</span>
    <span class="family">Família Di Matoso</span>
    <span class="sep">·</span>
    <span class="since">Quatro gerações</span>
  </div>
  <div class="hairline-rule"></div>
  <div class="footer-line-2">
    <span class="confidential">ORÇAMENTO SOB CONSULTA · EVENTOS PRIVADOS · COZINHA RURAL</span>
  </div>
</footer>
```

- Background: `var(--charcoal)`
- Padding: 4rem 2rem 3rem desktop / 3rem 1.25rem mobile
- Line 1: Cormorant 1rem weight 400, `color: var(--on-dark-primary)`. `<em>Di Matoso</em>` italic `color: var(--gold-deep)`. Separators in `var(--on-dark-muted)`.
- Hairline: 1px full-width `background: var(--border)`, self-drawing once on scroll-into-view
- Line 2: Inter 0.6rem UPPERCASE LS 0.2em weight 500, `color: var(--on-dark-quiet)`

Tokens: `--charcoal`, `--on-dark-primary`, `--on-dark-muted`, `--on-dark-quiet`, `--gold-deep`, `--border`

---

## 7. Anti-Patterns (explicit prohibitions)

Inherited from buffet-gastronomia-premium-2026.md + brand-audit-checklist.md + Moroni permanent rules:

1. **Saturated credit-card gold** (#FFD700, #FFC700, anything brighter than `#C9A96E`). Gold is always `#B8860B` deep-editorial or darker.
2. **Gold as fill** — button backgrounds, block colors, gradients, card surfaces, icon fills. Gold is exclusively hairline, rule, underline, numeral, italic-type color. **Max 8% coverage enforced at review.**
3. **Flat-lay top-down food photography.** Every plate is 3/4 angle, always. Delivery-app grammar is banned.
4. **Pure white marble background** (iFood / stock photography). Real kitchen surfaces only — pedra, madeira, linho.
5. **Script / cursive "invitation" fonts.** Cormorant italic is the only italic allowed.
6. **Champagne glasses clinking / guests toasting / happy-couple stock imagery.** Zero.
7. **Price per person, tier pricing ("Prata / Ouro / Diamante"), "a partir de R$X"**. Zero pricing on the site. Ever.
8. **Chef's face closeup as hero.** Hands only, never face. Arms fine, wrists fine, faces no.
9. **"Sabor e sofisticação", "sua festa dos sonhos", "pacotes personalizados"** — every tired catering cliché banned.
10. **Emojis in UI.** Zero.
11. **Rounded "friendly" button pills.** CTA is serif underline, always.
12. **Chess pieces, crowns, heraldic shields** — deprecated REIS [IA]-wide.
13. **Gradient text, blue shimmer, azure whisper.** Deprecated.
14. **Pure white `#FFFFFF` backgrounds.** Cream `#FAFAF7` only.
15. **Pure black `#000000`.** Always charcoal `#1A1A1A`.
16. **Counter-up animations on numerals.** Numerals are typography, not dashboards.
17. **Snap-scroll, spring physics, bounce/elastic easing, page-transition animations.**
18. **Testimonial carousels** with quote marks and names.
19. **Cool/Nordic color grade on food photography.** Too clinical — food is warm.
20. **Four plates in a row in any gallery.** Rhythm rule: PLATE → MACRO → ENVIRONMENT → HANDS → PLATE.

---

## 8. Handoff to vfx-motion-designer

### 8.1 Self-drawing hairlines (**signature motion for Di Matoso — everywhere**)

Di Matoso uses the self-drawing hairline as its signature structural-motion gesture. Castelo uses it sparingly; Di Matoso uses it on:
- Every `ChapterHeader` bottom hairline
- Every `CourseCard` bottom hairline (replacing the bottom border)
- Every section divider
- Every nav-link hover underline
- The `Footer` center hairline

**Spec**
```
width: 0 → 100%
height: 1px
background: var(--gold-deep)
transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 300ms
```

Trigger: IntersectionObserver `threshold: 0.15, rootMargin: '0px 0px -80px 0px'`. One-shot.

Consider native `animation-timeline: scroll()` before adding JS — this is the first place the 2026 native primitive should be evaluated.

### 8.2 Clip-path plate reveal (**second signature — plate heroes and MACRO entries**)

```
clip-path: inset(100% 0 0 0) → inset(0 0 0 0)
transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1)
```

- Target: any `.plate-reveal` element — plate photographs inside sections, MACRO shots on reveal
- Trigger: IntersectionObserver threshold 0.15
- Paired staggering: italic dish name fades in at +400ms, ingredient list at +600ms
- This is the only place GSAP ScrollTrigger is potentially justified; attempt vanilla CSS `clip-path` + IntersectionObserver first.

### 8.3 Fade-up pattern (global, shared with Castelo)

- Opacity 0 → 1, translateY 24px → 0
- 900ms, cubic-bezier(0.16, 1, 0.3, 1)
- Applied to ChapterHeader, DirectionCard, ReferenceCard, CourseCard, PullQuote, BrandCardSplit
- Order-of-reveal rule: photograph T=0, type T=+200ms

### 8.4 0.6x parallax on pull-quotes (**the only parallax license**)

- Target: `PullQuote` background MACRO photograph
- Background translates at 0.6x scroll speed
- Text stays at 1x
- Prefer native `animation-timeline: scroll()`; fall back to Lenis + minimal ScrollTrigger
- Reduced motion: disable entirely

### 8.5 Nav scroll-state invert

Shared pattern with Castelo. Background + backdrop-filter transition at `scrollY > 40`.

### 8.6 Hero — static photograph (no motion)

Di Matoso's hero is a static photograph, not a cinemagraph. Zero hero motion. The only motion on the hero is the scroll hint subtle up-down 2s loop.

### 8.7 Reduced motion (MANDATORY)

```
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  .fade-in, .plate-reveal, .hairline-rule {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    width: 100% !important;
  }
  html { scroll-behavior: auto; }
}
```

Non-negotiable. Gate every animation on this existing first.

### 8.8 Explicitly NOT implemented

- Framer Motion (weight, React-only)
- Three.js / R3F / Spline / any 3D
- Particle effects, glitter, shimmer, sparkle
- Cursor magnetism / magnetic buttons
- Counter-up animations
- Snap-scroll
- Page-transition animations

### 8.9 Patterns to distill back into `brain/design-library/patterns/`

After implementation, file these:
- `patterns/motion/self-drawing-hairline-rule.md`
- `patterns/motion/clip-path-plate-reveal.md`
- `patterns/motion/course-card-editorial-layout.md`
- `patterns/motion/pull-quote-06x-parallax.md`

---

## 9. Decisions Requiring Visual Validation Before Dev-Agent Implementation

1. **Gold-deep `#B8860B` at 8% hard-cap screen coverage** — needs tooling proof that we can actually measure coverage at review time. Option A: manual visual audit using a color-histogram Chrome extension on deployed previews. Option B: a Playwright script that samples pixel histograms per page. Without a measurement harness, "max 8%" is an honor-system rule that will drift. Validate with Moroni which enforcement path is acceptable.

2. **Hero as static photograph (no cinemagraph)** — Castelo gets a cinemagraph, Di Matoso gets a still. This divergence is brand-meaningful (estate = timeless motion / kitchen = decisive stillness) but it may read as "Di Matoso is less premium than Castelo" if not handled right. Verify that the still photograph + clip-path reveal + scroll-hint gives enough atmosphere that the hero doesn't feel flat by comparison. Render both heroes side-by-side before dev-agent starts.

3. **CourseCard without any price** — the zero-price rule is a business-content rule formalized into the component contract. Before dev-agent scaffolds the component, confirm with Moroni that the sales team is aligned: every inbound inquiry via `/orcamento` will be treated as a conversation, not a quote form. If sales needs a "starting at" or "average ticket" indicator anywhere, it must live on the `/orcamento` page, NOT on the homepage or menu pages. Lock this before the component ships.

---

*End of Buffet Di Matoso design system v1.0. Handoff to vfx-motion-designer + logo-brand-mark-designer + dev-agent on Moroni's approval of the 3 decisions above.*
