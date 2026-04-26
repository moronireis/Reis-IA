# Design System · Castelo dos Lagos · v1.0 · 2026-04-15 · Derived from art-direction-brief-castelo-dimatoso.md

> Phase 3 — Protocolo Branding
> Author: designer-agent
> Status: LOCKED (pending visual validation of 3 decisions flagged at end of file)
> Consumes: art-direction-brief-castelo-dimatoso.md, wedding-venue-premium-2026.md, castelo-estrategia harvest
> Overrides from Moroni (2026-04-15):
> 1. Castelo primary accent is **gold `#C9A96E`**, not bronze. Preserves the ceiling reference.
> 2. **Bronze `#8A6A3E` is a secondary optional accent** — available as a tertiary token for specific editorial moments (chapter numerals in the "Arquitetura" section, hairlines of long-form body, golden-hour photo print accents). Never protagonist. Never hero. Never nav/wordmark/primary CTA.
> 3. Roman numerals (I. II. III. IV.) shared with Buffet Di Matoso as the branded-house signature. Zero arabic numerals in section markers.
> 4. CTAs are editorial serif underlines routing to `/visita`. Zero pricing tiers, zero "pacotes", zero price visible.

---

## 1. Color Tokens

### 1.1 Core palette

| Token | Hex | Role | Usage | Max screen coverage |
|---|---|---|---|---|
| `--forest-deep` | `#1E2E24` | Primary dark surface — dominant background | Hero, nav over dark, dark sections, footer | ~55% of total pixels across site |
| `--forest-mid` | `#2F4A3A` | Secondary dark surface — section alternation | Mid-tone dark sections, card surfaces on dark sections | ~15% |
| `--cream` | `#F4EFE6` | Primary light surface — "paper" for editorial reading | Body/long-form sections, galleries on cream, chapter body | ~25% |
| `--near-black` | `#0E0E0C` | Max-contrast type on cream | Body copy on cream, display type on cream | Type only |
| `--gold` | `#C9A96E` | **Primary accent** — warm editorial gold | Hero serif italic emphasis, section numerals, micro-caps, hairline rules, nav wordmark accent, CTA serif underline, scroll hint, active link | ≤ 6% |
| `--bronze` | `#8A6A3E` | **Secondary optional accent** — warm shadow metal | Chapter III (Arquitetura) numeral, long-form essay hairlines, golden-hour print accents, letterhead. NEVER hero, NEVER nav, NEVER primary CTA | ≤ 2% per page, tertiary only |

### 1.2 Derived borders (from gold)

| Token | Value | Use |
|---|---|---|
| `--border` | `rgba(201, 169, 110, 0.20)` | Default divider, card border on dark |
| `--border-strong` | `rgba(201, 169, 110, 0.40)` | Hover divider, focused card border |
| `--border-bronze` | `rgba(138, 106, 62, 0.25)` | Optional bronze variant for long-form essay blocks |

### 1.3 Type opacities on forest-deep

| Token | Value | Use |
|---|---|---|
| `--on-dark-primary` | `rgba(244, 239, 230, 0.92)` (≈ 0.92) | Body / primary type on forest-deep |
| `--on-dark-heading` | `rgba(244, 239, 230, 1)` (≈ 1.00) | Hero H1, section titles on dark |
| `--on-dark-secondary` | `rgba(244, 239, 230, 0.60)` (≈ 0.60) | Meta, caption, subtitle on dark |
| `--on-dark-muted` | `rgba(244, 239, 230, 0.45)` (≈ 0.45) | Deep meta, footer secondary |
| `--on-dark-quiet` | `rgba(244, 239, 230, 0.35)` (≈ 0.35) | Confidential-bar micro-cap |
| `--on-dark-hairline` | `rgba(244, 239, 230, 0.25)` (≈ 0.25) | Hairline over dark when gold is not appropriate |
| `--on-dark-whisper` | `rgba(244, 239, 230, 0.06)` (≈ 0.06) | Ghost-grid overlays, watermark glyphs |

### 1.4 Radial glow gradients (hero atmosphere)

Replicate the ceiling reference ceiling-glow pattern. One radial glow per hero, positioned bottom-left behind the wordmark so warm light appears to come from within the estate.

```
--hero-glow-castelo:
  radial-gradient(ellipse 90% 60% at 20% 85%,
    rgba(201, 169, 110, 0.18) 0%,
    rgba(201, 169, 110, 0.08) 30%,
    rgba(30, 46, 36, 0) 70%);
```

Optional secondary subtle glow for chapter transitions (very low intensity):

```
--section-glow-forest:
  radial-gradient(ellipse 60% 40% at 50% 100%,
    rgba(201, 169, 110, 0.06) 0%,
    rgba(30, 46, 36, 0) 60%);
```

### 1.5 Prohibited colors (hard block)

- Any rose, blush, peach, salmon, coral, pastel wedding tones
- Chartreuse or olive greens (only forest-deep family allowed)
- Yellow-gold above `#E5C580` brightness threshold (reads as credit-card gold / tacky)
- Terracotta (belongs to Di Matoso emotional register)
- Any `#C9A96E` fill on Di Matoso surface — bronze/gold is **never** a fill on Castelo either (max coverage rule applies)
- Pure white `#FFFFFF` — always cream `#F4EFE6`
- Pure black `#000000` — always forest-deep or near-black

---

## 2. Typography Scale

**Fonts**: Cormorant Garamond (display, self-hosted woff2, weights 300/400/500 + italic 300/400) + Inter (structural, weights 300/400/500). Shared 100% with Di Matoso.

**Vertical metrics**: `--display-leading-trim: -0.08em` on Cormorant headings to pull optical baseline up toward Inter x-height. `letter-spacing: -0.02em` inherited on all Cormorant headings.

### 2.1 Scale

| Role | Family | Size | Weight | LS | LH | Usage |
|---|---|---|---|---|---|---|
| Hero H1 | Cormorant | `clamp(2.5rem, 6vw, 5rem)` | 300 | -0.02em | 1.05 | Single editorial sentence. One per hero. Never stacked with subtitle. |
| Hero H1 `<em>` emphasis | Cormorant italic | inherit | 400 | -0.025em | 1.05 | One phrase only. `color: var(--gold)`. |
| Section title | Cormorant | `clamp(2.25rem, 4.5vw, 3.5rem)` | 300 | -0.02em | 1.15 | Chapter headings (Chegada, Os Lagos, etc.) |
| Section eyebrow (chapter marker) | Cormorant | 0.875rem | 400 | 0.15em | 1 | Roman numeral + label ("I. CHEGADA"), `color: var(--gold)`, UPPERCASE label portion (Inter) |
| Chapter Roman numeral (large) | Cormorant | `clamp(3rem, 5vw, 4.5rem)` | 300 | -0.02em | 1 | "I." "II." etc. used as oversized chapter anchors within editorial cards |
| Pull quote | Cormorant italic | `clamp(1.75rem, 3vw, 2.5rem)` | 400 | -0.01em | 1.25 | Essayistic breaks, voice of the stewards |
| H3 body heading | Cormorant | 1.5rem | 400 | -0.01em | 1.25 | Subheadings in long-form pages |
| Metadata numeral (year, count) | Cormorant | 2.5rem | 300 | 0 | 1 | Typographic numerals (1890, 4 gerações, etc.) |
| Body long-form | Inter | 1rem (16px) | 400 | 0 | 1.75 | 800px max column. Editorial prose. |
| Body short | Inter | 0.875rem | 400 | 0 | 1.6 | Captions, label copy, meta |
| Micro-cap (nav, label, tag) | Inter | 0.7rem | 500 | 0.15em | 1 | UPPERCASE. Nav items, eyebrow labels. |
| Confidential/footer bar | Inter | 0.6rem | 500 | 0.2em | 1 | UPPERCASE. |
| CTA serif underline | Cormorant | 1.125rem | 400 | 0 | 1 | `border-bottom: 1px solid var(--gold); padding-bottom: 0.35em` |
| Metadata row (functional) | Inter | 0.8125rem | 400 | 0.02em | 1.7 | Address, phone, year, functional arabics |

### 2.2 Pairing rules (non-negotiable)

1. Headings ALWAYS Cormorant. No exception (including card titles).
2. Body ALWAYS Inter. Cormorant never in running 16px body.
3. Italic serif is voice, not decoration. Reserved for: (a) hero H1 emphasis, (b) chapter body leads, (c) the `[dos]` of Castelo *dos* Lagos in the wordmark.
4. Weight discipline: Cormorant 300 for hero, 400 for emphasis and body headings. Inter 400 for body, 500 for micro-caps. Bold banned.
5. Never italic within a single word. Phrase-scoped minimum.

### 2.3 Numeral system

- **Roman numerals** (I. II. III. IV. V. VI. VII.): Cormorant 300/400, `color: var(--gold)` default. Chapter III "Arquitetura" may override to `color: var(--bronze)` as the signature moment where bronze surfaces as tertiary accent. Always paired with Inter micro-cap uppercase label (`I. CHEGADA`).
- **Arabic numerals**: Cormorant 300 when typographic (year founded, count of generations), Inter 400 when functional (phone, address).
- No mixing within one section.

### 2.4 Letter-spacing table

| Context | LS |
|---|---|
| Cormorant hero (72px+) | -0.025em |
| Cormorant section title (32–56px) | -0.02em |
| Cormorant body heading (24px) | -0.01em |
| Cormorant CTA serif underline | 0 |
| Inter body (16px) | 0 |
| Inter micro-cap UPPERCASE | 0.15em |
| Inter confidential bar UPPERCASE | 0.20em |
| Cormorant wordmark | 0.05em |

---

## 3. Spacing System

Base unit: 0.25rem (4px). All values use `clamp()` between mobile and desktop where variance exceeds 2x.

| Token | Value | Use |
|---|---|---|
| `--section-padding-y` | `clamp(4rem, 10vh, 10rem)` | Section top/bottom. Default 6rem desktop / 3rem mobile reference. |
| `--section-padding-y-desktop` | 6rem | Explicit desktop floor |
| `--section-padding-y-mobile` | 3rem | Explicit mobile floor |
| `--section-header-margin-b` | 4rem desktop / 2.5rem mobile | Space between section marker+title and section body |
| `--container` | 1100px | Editorial shell. Nav, hero, most sections. |
| `--container-narrow` | 800px | Long-form reading. Body prose column. |
| `--container-wide` | 1320px | Full-bleed photography breakouts |
| `--container-padding-x-desktop` | 2rem | |
| `--container-padding-x-mobile` | 1.25rem | |
| `--card-padding-desktop` | 2.5rem | |
| `--card-padding-mobile` | 1.5rem | |
| `--grid-gap-default` | 2rem | Editorial 2-col grids |
| `--grid-gap-hairline` | 1px | **Signature move**: 1px gap between swatch/gallery cells on a parent with `background: var(--border)` — creates a hairline divider from the gap itself, not a border |
| `--rhythm-body-lh` | 1.75 | Body line-height |
| `--rhythm-lead-lh` | 1.8 | Subtitle/lead line-height |

**Rule**: text columns never exceed 800px. Ever. The 1100px container exists for the page chrome — not for prose. Enforce at review.

**Rule**: Every `<section>` targets `min-height: 100vh` on desktop. Seven chapters = seven full viewports. No half-reveals.

---

## 4. Radius & Shadows

### 4.1 Radius

| Token | Value | Use |
|---|---|---|
| `--radius-0` | 0 | All cards, all images, all section containers. Default. |
| `--radius-pill` | 100px | Score pills, confidential-bar badges, meta chips ONLY |
| `--radius-mockup` | 12px | Interactive mockup frames (e.g., embedded map viewer for estate tour) |

Square is the editorial statement. Any radius above 0 must be explicitly justified against one of the two exceptions above.

### 4.2 Shadows

**Only one shadow definition exists in the system.** Borders do 90% of the structural work.

| Token | Value | Use |
|---|---|---|
| `--shadow-image` | `0 20px 60px rgba(0, 0, 0, 0.4)` (dark context) / `0 20px 60px rgba(0, 0, 0, 0.08)` (cream context) | Image frames only (hero photograph, section photograph wrapper) |

Cards: `1px solid var(--border)`, no shadow. Nav: no shadow (uses `backdrop-filter: blur(12px)` on scroll state). Buttons: no shadow (no button fills exist). Modals: no shadow (minimal use).

---

## 5. Breakpoints

| Name | Range |
|---|---|
| Mobile | ≤ 768px |
| Desktop | ≥ 769px |
| Mobile small | ≤ 480px (padding tuning only — `--container-padding-x-mobile` drops to 1rem, hero type clamp hits floor) |

**Zero tablet breakpoint.** Editorial grid collapses directly from 3-col asymmetric to single column at 768px.

---

## 6. Component Specs

### 6.1 `Nav` (fixed)

**Anatomy**
```
<nav>
  <div class="brand"><span>Castelo</span> <em>dos</em> <span>Lagos</span></div>
  <ul class="nav-links">
    <li>I. Chegada</li> <li>II. Os Lagos</li> ... <li>VII. Convite</li>
  </ul>
  <a class="nav-cta">Agendar visita</a>
</nav>
```

**Default state** (top of page, over hero)
- Position: `fixed`, top 0, full width, `z-index: 100`
- Background: transparent
- Padding: 1.5rem 2rem desktop / 1rem 1.25rem mobile
- Brand wordmark: Cormorant 1.1rem, weight 400, LS 0.05em, `color: var(--on-dark-heading)`. `"dos"` in italic 400, `color: var(--gold)`.
- Nav links: Inter micro-cap 0.7rem, weight 500, LS 0.15em, UPPERCASE, `color: var(--on-dark-secondary)`. Hover → `color: var(--gold)`, hairline underline draws below (transition `width 400ms`).
- Nav CTA: Cormorant serif underline 1rem, `color: var(--gold)`, `border-bottom: 1px solid var(--gold)`, padding-bottom 0.3em.

**Scrolled state** (triggered when `window.scrollY > 40`)
- Background: `rgba(30, 46, 36, 0.82)` + `backdrop-filter: blur(12px) saturate(1.1)`
- Bottom hairline: `1px solid var(--border)`
- Padding compresses: 1rem 2rem
- Transition: `background 400ms, padding 400ms, backdrop-filter 400ms` on ease-out-expo

**Mobile behavior** (≤ 768px)
- Nav links collapse into a hamburger (three micro-cap hairlines, 20px wide, 1.5px stroke, color `var(--on-dark-heading)`)
- Tap opens full-screen overlay: background `var(--forest-deep)`, Cormorant 2rem links stacked, fade-in 400ms
- Nav CTA visible in the overlay bottom as serif underline

**Tokens consumed**: `--on-dark-heading`, `--on-dark-secondary`, `--gold`, `--border`, `--forest-deep`

---

### 6.2 `ConfidentialBar` (top strip)

**Anatomy**
```
<div class="confidential-bar">
  <span class="badge">Reservas Por Convite</span>
  <span class="meta">Visitas mediante agendamento · Rural SP</span>
</div>
```

- Position: Fixed top OR first-in-dom (above nav). Height 28px desktop / 32px mobile.
- Background: `var(--near-black)`
- Text: Inter 0.6rem weight 500 LS 0.2em UPPERCASE, `color: var(--on-dark-quiet)`
- Badge: rounded-pill (100px), background `rgba(201, 169, 110, 0.15)`, border `1px solid var(--border-strong)`, `color: var(--gold)`, padding 0.25rem 0.75rem
- Meta: left of badge, separator `·` in `var(--on-dark-muted)`

Tokens: `--near-black`, `--on-dark-quiet`, `--on-dark-muted`, `--gold`, `--border-strong`

---

### 6.3 `HeroCinemagraph` (Castelo signature)

**Anatomy**
```
<section class="hero-cinemagraph">
  <video autoplay muted playsinline loop poster="/assets/hero-poster.jpg">
    <source src="/assets/hero.webm" type="video/webm">
    <source src="/assets/hero.mp4" type="video/mp4">
  </video>
  <div class="hero-glow"></div>
  <div class="hero-meta-chips">...</div>
  <h1 class="hero-headline">Algumas casas <em>se visitam</em>. Esta, recebe-se.</h1>
  <div class="hero-scroll-hint">I. Chegada ↓</div>
</section>
```

**Specs**
- Section: 100vh, position relative, overflow hidden, background `var(--forest-deep)`
- Video: absolute inset 0, `object-fit: cover`, z-index 1. Budget: ≤ 2.5MB desktop, ≤ 1.2MB mobile (portrait crop 1080×1920). Silent. 8–12s loop. MP4 primary + WebM fallback + JPEG poster.
- `.hero-glow`: absolute inset 0, z-index 2, background `var(--hero-glow-castelo)`, pointer-events none
- Meta chips: bottom-left or top-left, z-index 3, row of Inter 0.6rem UPPERCASE micro-caps separated by `·`, `color: var(--on-dark-secondary)`, example "FUNDADA EM 1890 · RECEBEMOS POR CONVITE · RURAL SP"
- H1 headline: bottom-left, padding 2rem 2rem 5rem 2rem (desktop), z-index 3, Cormorant 300 `clamp(2.5rem, 6vw, 5rem)` LH 1.05 LS -0.025em. One italic phrase (`<em>`) in `var(--gold)`. Max-width 900px. Color default `var(--on-dark-heading)`.
- Scroll hint: bottom-center, z-index 3, Inter micro-cap 0.65rem UPPERCASE `color: var(--on-dark-quiet)`, hairline arrow ↓ (1px stroke via SVG or unicode), subtle loop animation 2s up-down 4px

**NO dark scrim gradient over the photo.** If the headline can't be read against the cinemagraph, the cinemagraph is wrong — regrade or reshoot.

**Reduced motion**: `<video>` hidden, replace with `background-image: var(--hero-poster)`, cover, center.

Tokens: `--forest-deep`, `--hero-glow-castelo`, `--on-dark-heading`, `--on-dark-secondary`, `--on-dark-quiet`, `--gold`

---

### 6.4 `ChapterHeader` (section head)

**Anatomy**
```
<header class="chapter-header">
  <div class="chapter-marker">
    <span class="roman">I.</span>
    <span class="label">Chegada</span>
  </div>
  <h2 class="chapter-title">Algumas casas <em>se visitam</em>. Esta, recebe-se.</h2>
  <p class="chapter-lead">A família recebe hóspedes neste portão há quatro gerações…</p>
</header>
```

**Grid**: desktop 2-col asymmetric — left column 260px for marker, right column 1fr for title + lead. Mobile single column, marker stacks above title.

- `.roman`: Cormorant 400, `clamp(3rem, 5vw, 4.5rem)`, `color: var(--gold)` (default) or `var(--bronze)` for Chapter III only, LH 1, display block
- `.label`: Inter micro-cap 0.7rem, UPPERCASE, LS 0.15em, `color: var(--gold)` or `var(--on-dark-secondary)`, spaced 0.5rem below roman
- `.chapter-title`: Cormorant 300, `clamp(2.25rem, 4.5vw, 3.5rem)`, LH 1.15, LS -0.02em, `color: var(--on-dark-heading)` on dark / `var(--near-black)` on cream. Max-width 800px. `<em>` in `var(--gold)` italic 400.
- `.chapter-lead`: Inter 400, 1rem, LH 1.8, `color: var(--on-dark-primary)` on dark / `var(--near-black)` on cream. Max-width 800px. Margin-top 2rem.

**Hairline**: bottom of header, 1px full-width hairline, `background: var(--border)`, self-drawing on scroll entry (see Handoff §8).

Tokens: `--gold`, `--bronze` (Chapter III only), `--on-dark-heading`, `--on-dark-primary`, `--near-black`, `--border`

---

### 6.5 `SwatchGrid` (palette / architectural detail grid)

**Anatomy**: parent container with `background: var(--border)` (gold @ 20%). Children are cells with `background: var(--forest-mid)` or image, gap `1px` — the gap reveals the parent background as a hairline divider.

```
<div class="swatch-grid">
  <div class="swatch">...</div>
  <div class="swatch">...</div>
  <div class="swatch">...</div>
</div>
```

- Display: grid, `grid-template-columns: repeat(3, 1fr)` desktop, `repeat(1, 1fr)` mobile
- `gap: 1px`
- Parent: `background: var(--border)`, `border: 1px solid var(--border)` (so outer frame matches inner)
- Child cells: `background: var(--forest-mid)` or image, padding 2.5rem

Tokens: `--border`, `--forest-mid`

---

### 6.6 `DirectionCard` / `PilarCard`

**Anatomy**
```
<article class="direction-card">
  <span class="roman-large">I.</span>
  <h3 class="card-title">Estate, não venue</h3>
  <p class="card-body">A casa é a anfitriã. O evento é o hóspede.</p>
</article>
```

- Grid cell in editorial 2-col or 3-col layout
- `background: var(--forest-deep)` (or `var(--cream)` inverted context)
- `border: 1px solid var(--border)`
- `border-radius: 0`
- Padding: 2.5rem desktop / 1.5rem mobile
- `.roman-large`: Cormorant 300, 3.5rem, `color: var(--gold)`, LH 1, margin-bottom 1.5rem, display block
- `.card-title`: Cormorant 400, 1.5rem, LS -0.01em, LH 1.25, `color: var(--on-dark-heading)`, margin-bottom 0.75rem
- `.card-body`: Inter 400, 0.9375rem, LH 1.75, `color: var(--on-dark-primary)`

**Hover state**: border transitions to `var(--border-strong)` over 400ms ease-out. No transform, no shadow, no background change.

Tokens: `--forest-deep`, `--cream`, `--border`, `--border-strong`, `--gold`, `--on-dark-heading`, `--on-dark-primary`

---

### 6.7 `ReferenceCard` (estate history / inspiration card)

**Anatomy**
```
<article class="reference-card">
  <span class="ref-num">REF. 01 · 1890</span>
  <h3 class="ref-name">Fundação da Casa</h3>
  <p class="ref-lesson">A pedra veio do rio da propriedade…</p>
  <a class="ref-link">Ler a história <span class="arrow">→</span></a>
</article>
```

- `.ref-num`: Inter micro-cap 0.65rem UPPERCASE LS 0.15em, `color: var(--on-dark-secondary)`, margin-bottom 1rem
- `.ref-name`: Cormorant 400, 1.5rem, LS -0.01em, `color: var(--on-dark-heading)`
- `.ref-lesson`: Inter 400, 0.9375rem, LH 1.75, `color: var(--on-dark-primary)`, margin 0.75rem 0 1.5rem
- `.ref-link`: Cormorant 1rem, `color: var(--gold)`, border-bottom 1px solid currentColor, padding-bottom 0.25em. `.arrow` translates +4px on hover (300ms).

Tokens: `--on-dark-secondary`, `--on-dark-heading`, `--on-dark-primary`, `--gold`

---

### 6.8 `ScorePill` (confidential chips, meta pills)

**Anatomy**: small pill for contextual badges (e.g., "VII Capítulos", "1890", "Por Convite").

- Display: inline-flex, align center, gap 0.4rem
- Padding: 0.3rem 0.75rem
- `border-radius: 100px` (exception to radius 0)
- `background: rgba(201, 169, 110, 0.15)` (gold @ 15%)
- `border: 1px solid var(--border-strong)`
- Text: Inter 0.65rem weight 500 LS 0.12em UPPERCASE, `color: var(--gold)`

Tokens: `--gold`, `--border-strong`

---

### 6.9 `BrandCardSplit` (branded house footer card — links to Buffet Di Matoso)

**Anatomy**
```
<section class="brand-card-split">
  <article class="brand-half castelo">
    <div class="bg-image"></div>
    <div class="content">
      <span class="eyebrow">I. CASTELO</span>
      <h3>Castelo dos Lagos</h3>
      <p>A propriedade.</p>
      <a class="cta">Você está aqui</a>
    </div>
    <div class="palette-strip"></div>
  </article>
  <article class="brand-half dimatoso">
    <div class="bg-image"></div>
    <div class="content">
      <span class="eyebrow">II. COZINHA</span>
      <h3>Buffet Di Matoso</h3>
      <p>A cozinha da família.</p>
      <a class="cta">Conhecer a cozinha →</a>
    </div>
    <div class="palette-strip"></div>
  </article>
</section>
```

- Grid: 2 columns equal, 1px gap (hairline divider trick), parent background `var(--border)`
- Each `.brand-half`: min-height 70vh desktop / 50vh mobile (mobile stacks single col)
- `.bg-image`: absolute inset 0, cover image (Castelo: estate at blue hour / Di Matoso: plate hero), opacity 0.75
- `.content`: relative, padding 3rem desktop / 2rem mobile, flex column justify-end
- Overlay: `linear-gradient(to top, rgba(30,46,36,0.9) 0%, rgba(30,46,36,0) 60%)` (Castelo half) / `rgba(26,26,26,0.9)` (Di Matoso half)
- `.eyebrow`: Inter micro-cap 0.7rem UPPERCASE LS 0.15em `color: var(--gold)`
- `h3`: Cormorant 300 clamp(1.75rem, 3vw, 2.5rem) `color: var(--on-dark-heading)`
- `p`: Inter 0.9375rem `color: var(--on-dark-secondary)` italic (optional)
- `.cta`: Cormorant serif underline `color: var(--gold)` border-bottom 1px
- `.palette-strip`: bottom 4px strip, 4 cells 25% each showing the half's dominant palette swatches. Castelo strip: forest-deep, forest-mid, cream, gold. Di Matoso strip: charcoal, charcoal-warm, cream, gold-deep.

Tokens: `--border`, `--forest-deep`, `--gold`, `--on-dark-heading`, `--on-dark-secondary`, `--cream`, plus Di Matoso tokens referenced by name.

---

### 6.10 `CtaSerifUnderline` (only CTA pattern in the system)

**Anatomy**
```
<a class="cta-serif" href="/visita">
  <span class="cta-line">Solicitar convite para visita</span>
  <span class="cta-meta">Visitas mediante agendamento · Rural SP</span>
</a>
```

- Display: inline-flex column, align-items flex-start, gap 0.5rem
- `.cta-line`: Cormorant 1.125rem weight 400, `color: var(--gold)`, `border-bottom: 1px solid var(--gold)`, padding-bottom 0.35em, LS 0
- `.cta-meta`: Inter 0.7rem UPPERCASE LS 0.15em weight 500, `color: var(--on-dark-secondary)`
- Hover: `.cta-line` border-bottom-color transitions to `var(--cream)` (or `var(--near-black)` on cream context) over 300ms. No background fill, no pill transformation, no arrow pop.
- Focus: outline 1px dashed `var(--gold)`, offset 4px. Never a ring.

**Link destinations**: `/visita` is the only CTA destination on the homepage. Zero pricing. Zero "pacotes". Secondary CTAs may route to `/historia` (long-form estate story) but never to commerce.

Tokens: `--gold`, `--cream`, `--near-black`, `--on-dark-secondary`

---

### 6.11 `Footer`

**Anatomy** (two-line editorial footer)
```
<footer>
  <div class="footer-line-1">
    <span class="wordmark">Castelo <em>dos</em> Lagos</span>
    <span class="sep">·</span>
    <span class="family">Família Di Matoso</span>
    <span class="sep">·</span>
    <span class="since">Desde 1890</span>
  </div>
  <div class="footer-line-2">
    <span class="confidential">POR CONVITE · VISITAS MEDIANTE AGENDAMENTO · RURAL SP</span>
  </div>
</footer>
```

- Background: `var(--forest-deep)` (or `var(--near-black)` for maximum contrast)
- Padding: 4rem 2rem 3rem desktop / 3rem 1.25rem mobile
- Line 1: Cormorant 1rem weight 400, `color: var(--on-dark-primary)`. `<em>dos</em>` italic `color: var(--gold)`. Separators `·` in `var(--on-dark-muted)`.
- Line 2: Inter 0.6rem UPPERCASE LS 0.2em weight 500, `color: var(--on-dark-quiet)`
- Optional tertiary line: Bronze hairline decorative rule 1px, full-width, `background: var(--border-bronze)`, positioned between lines 1 and 2 as the one tertiary-accent moment where bronze surfaces

Tokens: `--forest-deep`, `--near-black`, `--on-dark-primary`, `--on-dark-muted`, `--on-dark-quiet`, `--gold`, `--border-bronze`

---

## 7. Anti-Patterns (explicit prohibitions)

Inherited from wedding-venue-premium-2026.md + brand-audit-checklist.md + Moroni permanent rules:

1. **Rose, blush, peach, coral, salmon, ANY wedding-pastel.** Off-limits across the entire site.
2. **Script / cursive / "invitation" display fonts** (Allura, Great Vibes, Pinyon, Pacifico, Dancing Script). Cormorant is the only serif allowed.
3. **"Seu dia dos sonhos", "dream day", "forever starts here", "venue", "pacote casamento"** — zero wedding-industry vocabulary.
4. **Testimonial carousels** with quote marks and photos of couples. Replace with editorial case studies (full-bleed photo, one paragraph of prose).
5. **Wedding package tier pricing** (Basic / Premium / Luxury / Gold / Diamond). Zero pricing visible. CTA is "Solicitar convite para visita".
6. **Heart, ring, floral icons.** No decorative icon set. If an icon is strictly necessary, 1px-stroke line drawing only.
7. **Stock drone footage of European castles.** All photography must be of the actual property, commissioned from one photographer.
8. **Hero video with orchestral music autoplay.** Silent cinemagraph only, audio track stripped at encode.
9. **Emojis in UI.** Zero. Anywhere.
10. **SaaS pricing patterns** — no tier cards, no comparison tables, no "most popular" badges, no self-serve checkout.
11. **Chess pieces, knights, kings, crowns, heraldic shields** — deprecated across all REIS [IA] ecosystem brands.
12. **Gradient text, blue shimmer / azure whisper effects.**
13. **Round / soft / friendly button pills.** CTA is always serif underline, never pill.
14. **Gold as surface fill.** Gold is stroke, hairline, type color. Never background. Max 6% screen coverage. Bronze max 2%.
15. **Pure white backgrounds.** Always cream `#F4EFE6`. Pure white is stock, cream is paper.
16. **Parallax > 40px displacement.** No heavy parallax scenes.
17. **Mid-day harsh-sun photography.** Blue hour / golden hour / morning mist only.
18. **Any 5+ adjacent elements starting with the same grammatical structure.** Copy audit rule.
19. **Counter-up animations on numerals.** Numerals are typography, not dashboards.
20. **Snap-scroll, page-transition animations, spring physics, bounce/elastic easing.**

---

## 8. Handoff to vfx-motion-designer

The following tokens and components require motion implementation. Everything else ships static.

### 8.1 Self-drawing hairlines (sparingly, only on section-number underlines)

- Target: the 1px hairline at the bottom of `ChapterHeader` and the underline beneath the large Roman numeral in `DirectionCard`
- CSS: `.hairline-rule { width: 0; transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 300ms; } .visible { width: 100%; }`
- Trigger: IntersectionObserver `threshold: 0.15, rootMargin: '0px 0px -80px 0px'`. One-shot.
- Color: `var(--gold)` default; `var(--bronze)` on Chapter III
- Castelo uses this sparingly (Di Matoso uses it everywhere — that's the signature divergence)

### 8.2 Fade-up pattern (applied to ALL editorial blocks)

- Target: every ChapterHeader, DirectionCard, ReferenceCard, SwatchGrid, BrandCardSplit, PullQuote
- CSS: `opacity 0 → 1, translateY(24px → 0)` over 900ms on `cubic-bezier(0.16, 1, 0.3, 1)`
- Order-of-reveal rule: photograph at T=0, type at T=+200ms. Apply `transition-delay: 200ms` to text elements inside a section containing a fading photograph.
- Reduced motion: `opacity 1, transform none, transition 0.01ms` — mandatory.

### 8.3 Nav scroll-state invert

- Target: `<nav>` fixed element
- Trigger: scroll listener, boolean at `scrollY > 40`
- Transitions: `background`, `backdrop-filter`, `padding`, `border-bottom` over 400ms ease-out

### 8.4 Cinemagraph hero (Castelo signature)

- Target: `HeroCinemagraph` `<video>` element
- Native `<video>` with `autoplay muted playsinline loop`, no JS beyond the existing preload + poster fallback
- Reduced motion: hide `<video>`, show poster JPEG as background-image

### 8.5 Radial glow ambient

- Target: `.hero-glow` absolute overlay
- Static CSS gradient (no motion) — listed here so vfx-motion-designer explicitly does NOT animate it

### 8.6 Hover states (no heavy motion)

- `DirectionCard` border `var(--border) → var(--border-strong)` over 400ms
- `CtaSerifUnderline` border-bottom color transition over 300ms
- `ReferenceCard` arrow `translateX(+4px)` over 300ms

### 8.7 Explicitly NOT implemented on Castelo

- GSAP ScrollTrigger (not needed — vanilla IntersectionObserver sufficient)
- Clip-path plate reveal (Di Matoso signature only)
- Parallax (Di Matoso pull-quotes only, 0.6x exception)
- Lenis smooth scroll (Castelo uses native `scroll-behavior: smooth`)
- Three.js / R3F / Spline / any 3D
- Particle, glitter, shimmer, sparkle, cursor magnetism

---

## 9. Decisions Requiring Visual Validation Before Dev-Agent Implementation

1. **Gold `#C9A96E` as primary accent over dark forest-deep surfaces** — needs render test. The Moroni override locks gold as primary, but gold-over-forest-deep has a narrower contrast window than bronze-over-forest-deep. Verify WCAG AA on `gold → on-dark-primary` pairing and that the italic `<em>` emphasis in hero H1 reads as confidently as the ceiling reference's gold-on-black.

2. **Bronze `#8A6A3E` as secondary optional accent on Chapter III (Arquitetura)** — needs visual proof that bronze as tertiary surface-moment reads as "the warm metal of old stone" and not as "a second gold that competes with the primary gold". If bronze weakens gold's signature role, demote bronze to letterhead-only and remove from the site.

3. **Hairline 1px gap divider trick** (`SwatchGrid` + `BrandCardSplit`) — needs render test to confirm that the 1px gold-at-20% gap reads as a "printed rule" and not as "a Tailwind border accident". This pattern is inherited from Kinfolk / Cereal — verify it survives at target resolutions and retina.

---

*End of Castelo dos Lagos design system v1.0. Handoff to vfx-motion-designer + logo-brand-mark-designer + dev-agent on Moroni's approval of the 3 decisions above.*
