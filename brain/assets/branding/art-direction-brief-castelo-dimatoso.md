# Art Direction Brief — Castelo dos Lagos + Buffet Di Matoso (Branded House)

> Phase 2 — Protocolo Branding
> Author: art-director (unified creative head)
> Date: 2026-04-15
> Status: **LOCKED — handoff to designer-agent, vfx-motion-designer, logo-brand-mark-designer, dev-agent**
> Ceiling reference: https://castelo-estrategia.vercel.app/ (harvest score 8.3/10 — this brief pushes UP)
> Phase 1 artifacts consumed:
> - `brain/design-library/references/castelo-estrategia/{design-tokens,motion-config,observations,suggested-patterns}.md`
> - `brain/design-library/mood-reports/wedding-venue-premium-2026.md` (20 refs)
> - `brain/design-library/mood-reports/buffet-gastronomia-premium-2026.md` (24 refs + 5 dashboards)

---

## 0. Master Concept — Branded House Overview

### 0.1 The one-sentence manifesto

> **Two family heirlooms, one editorial voice: a castle photographed like a Belmond estate and a kitchen printed like a Kinfolk manuscript — both set in Cormorant Garamond, both paced like a book, both quiet enough to be believed.**

### 0.2 Why they belong to the same family

Castelo dos Lagos and Buffet Di Matoso are not two brands that share a logo. They are two chapters of a single editorial system — the same typographic spine (Cormorant Garamond display + Inter structural, vertical-metrics harmonized à la Kinfolk — see §2.1 of `wedding-venue-premium-2026.md`), the same Roman-numeral chapter grammar (see §7.1 of `wedding-venue-premium-2026.md` and §2.2 of `buffet-gastronomia-premium-2026.md`), the same editorial grid (1100px max, asymmetric, section-as-page, never SaaS 12-col), the same motion tempo (slow, restrained, one idea per scroll beat), and the same *refusal to behave like a website*. Both sites read as printed artifacts that happen to render in a browser — the ceiling reference proved this works for a strategic document; we apply it to the real properties.

What unifies them is **discipline**, not decoration. The shared system is 80% of the visual identity. The 20% variation is atmosphere.

### 0.3 Where they diverge

| Axis | Castelo dos Lagos | Buffet Di Matoso |
|---|---|---|
| **Emotional register** | Stewardship, landscape, stillness, arrival | Craft, ritual, hands, fire, the printed program |
| **Dominant subject** | Architecture + lakes at golden hour | Plates + hands + ingredients at warm natural light |
| **Accent family** | Bronze `#8A6A3E` (warm shadow metal — never gold) | Deep gold `#B8860B` (editorial gold — hairlines only) |
| **Surface family** | Forest deep `#1E2E24` + cream `#F4EFE6` | Charcoal `#1A1A1A` + cream `#FAFAF7` |
| **Chapter numerals** | Roman (I. II. III.) — architectural | Roman (I. II. III.) — editorial/course |
| **Voice** | Essayistic, stewardship, first-person plural ("a casa", "os lagos") | Narrative + italic poetic, first-person plural of the family |
| **Motion signature** | Cinemagraph hero (one still element moves) | Clip-path plate reveal (bottom-up, 1200ms) |
| **What it refuses** | "Wedding venue" language, script fonts, blush/rose | "Delivery menu" layout, flat-lay, iFood visual grammar |

Both use Roman numerals — this is the branded-house signature. The numerals are the knot that ties the two sites together; a visitor landing on either one should read the numeral I. in a section header and feel "I've seen this typographic move before, this is the same family".

### 0.4 Positioning rewrites (non-negotiable)

- **Castelo dos Lagos** is an **estate**, not a venue. Every surface (copy, nav labels, meta, OG tags) says *a propriedade*, *a casa*, *o castelo*, *os lagos* — never *venue*, never *dream wedding*, never *pacote*. Weddings are a consequence of the estate's existence. (ref: Babington House, Borgo Santo Pietro — §2.6 + §1.5 of wedding-venue-premium-2026.md)
- **Buffet Di Matoso** is a **kitchen**, not a buffet catalog. Every surface speaks of *a cozinha*, *a família*, *a carta*, *o menu*. No "pacote casamento", no "por pessoa", no tier-based pricing. (ref: Noma, Atomix — §1.1 + §2.2 of buffet-gastronomia-premium-2026.md)

---

## 1. Shared Type System

This is the single most important decision in the brief. Get the type right and 70% of both brands ship themselves.

### 1.1 Fonts

- **Cormorant Garamond** — display serif. Weights used: **300, 400, 500**. Italic: **300, 400**. Never 600+. Never bold. Italic is a voice, not an ornament.
- **Inter** — structural sans. Weights used: **300, 400, 500**. Never 600+. Never bold in structural roles.

Both self-hosted as woff2 (no Google Fonts runtime — ref observations.md §6 "Google Fonts external load" gap). Single `<link>` preload in `<head>` per brand.

### 1.2 Vertical metrics harmonization (Kinfolk rule)

Cormorant and Inter have natively different x-heights. We compensate at the CSS level so the two faces visually rhyme when interleaved in a paragraph or in adjacent headings:

```css
:root {
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-structural: 'Inter', -apple-system, sans-serif;
  --display-leading-trim: -0.08em; /* pulls Cormorant optical baseline up */
  --structural-x-height-bias: 1em; /* Inter stays reference */
}
```

Apply `letter-spacing: -0.02em` to all Cormorant headings (inherited from ceiling reference). Apply `letter-spacing: 0` to Inter body, `0.05em–0.2em` to Inter micro-caps only.

### 1.3 Type scale (shared — both brands)

| Role | Family | Size (desktop) | Weight | LS | LH | Notes |
|---|---|---|---|---|---|---|
| Hero H1 | Cormorant | `clamp(3rem, 7vw, 6.5rem)` | 300 | -0.02em | 1.05 | Single sentence. Never stacked with subtitle. |
| Hero H1 `<em>` emphasis | Cormorant italic | inherits | 400 | — | — | One phrase only. Color = brand accent. |
| Section title | Cormorant | `clamp(2.25rem, 4.5vw, 3.5rem)` | 300 | -0.02em | 1.15 | |
| Section eyebrow (chapter marker) | Cormorant | 0.875rem | 400 | 0.15em | 1 | Roman numeral + label, accent color. |
| Pull quote | Cormorant italic | `clamp(1.75rem, 3vw, 2.5rem)` | 400 | -0.01em | 1.25 | Breaks the grid. Parallax 0.6x (Di Matoso only). |
| H3 body heading | Cormorant | 1.5rem | 400 | -0.01em | 1.25 | |
| Metadata numeral (KPI / year / count) | Cormorant | 2.5rem | 300 | — | 1 | Numerals are typographic, never UI. |
| Body long-form | Inter | 1rem (16px) | 400 | 0 | 1.75 | 800px max column. |
| Body short (caption, label copy) | Inter | 0.875rem | 400 | 0 | 1.6 | |
| Micro-cap (nav, label, tag) | Inter | 0.7rem | 500 | 0.15em | 1 | UPPERCASE. |
| Confidential/footer bar | Inter | 0.6rem | 500 | 0.2em | 1 | UPPERCASE. |
| CTA (serif underline, never pill) | Cormorant | 1.125rem | 400 | 0 | 1 | `border-bottom: 1px solid currentColor; padding-bottom: 0.25em`. |
| Ingredient list / metadata row | Inter | 0.8125rem | 400 | 0.02em | 1.7 | |

### 1.4 Pairing rules (non-negotiable)

1. **Headings are ALWAYS Cormorant.** No exceptions. Not even H3 card titles. The ceiling reference violates this by using Inter 600 on diagnosis card titles — we correct it here.
2. **Body is ALWAYS Inter.** Cormorant never runs in body copy (illegibility at 16px).
3. **Italic serif is voice, not decoration.** Reserved for: (a) the one-word emphasis in hero H1, (b) dish descriptions and chef quotes in Di Matoso, (c) chapter body leads in Castelo. NEVER italic for "elegance" in nav, buttons, or UI labels.
4. **Weight discipline**: Cormorant 300 for hero, 400 for emphasis and body headings. Inter 400 for body, 500 for micro-caps. Bold is banned in both faces.
5. **Never mix within the same word.** No "Castelo *dos* Lagos" with italic "dos". Italic is phrase-scoped minimum.

### 1.5 Numeral system

- **Roman numerals (I, II, III, IV, V, VI, VII)** — chapter markers, course markers, section anchors. Cormorant 400. Always paired with an uppercase Inter micro-cap label (`I. CHEGADA`, `IV. CERIMÔNIA`, `II. MENU RAÍZES`). This is the branded-house signature — both sites inherit it.
- **Arabic numerals (0, 1, 2, ...)** — KPIs, years, counts, phone numbers, addresses, metadata. Cormorant 300 when typographic (hero count, year founded), Inter 400 when functional (address, phone).
- **No mixed numeral system within a single section.** If the section uses Roman for its chapter, all internal numerals stay Arabic-typographic, never Roman for decoration.

### 1.6 Letter-spacing table

| Context | Letter-spacing |
|---|---|
| Cormorant hero (72px+) | `-0.025em` |
| Cormorant section title (32–56px) | `-0.02em` |
| Cormorant body heading (24px) | `-0.01em` |
| Inter body (16px) | `0` |
| Inter micro-cap (11–12px UPPERCASE) | `0.15em` |
| Inter confidential bar (9–10px UPPERCASE) | `0.2em` |
| Cormorant CTA serif underline | `0` |

---

## 2. Shared Grid & Composition

### 2.1 Breakpoints (inherit from ceiling)

Two breakpoints only. Reject the tablet breakpoint temptation.

- **Mobile**: ≤ 768px
- **Desktop**: ≥ 769px
- **Mobile small tuning**: ≤ 480px (type clamp floor kicks in)

No `lg`, `xl`, `2xl`. The 1100px container width gives us all the room we need; beyond 1280px screen width the site sits in centered air.

### 2.2 Container widths

| Container | Max-width | Use |
|---|---|---|
| `--container` | 1100px | Default editorial shell — nav, hero, most sections |
| `--container-narrow` | 800px | Long-form reading (essays, chef quotes, body copy) |
| `--container-wide` | 1320px | Full-bleed photography breakouts — photo spans wider than text column |
| Horizontal padding (mobile) | 1.25rem | |
| Horizontal padding (desktop) | 2rem | |

**Rule**: text never runs wider than 800px. Ever. The 1100px container exists for the *page* (nav, section chrome, photo captions) — not for prose.

### 2.3 Editorial grid (not SaaS 12-col)

Reject the rigid 12-col. Use a **3-column asymmetric editorial grid** per section:

```
[  narrow  ][         wide         ][  narrow  ]
  260px       1fr (flex)              260px
```

Sections alternate which column is wide. Text might live in the left narrow + center wide; the next section might put the wide photo on the right and the caption floating left. This is the **ISSIMO / Cereal / Kinfolk grammar** (ref §4.1 of wedding-venue-premium-2026.md).

Mobile collapses to single column, no negotiation.

### 2.4 Section-as-page rule (Eleven Madison Park)

Every `<section>` occupies **a full viewport minimum** (`min-height: 100vh`) at desktop, composed fully before the next begins. No mid-scroll half-reveal states, no two sections fighting for the same screen. The site reads as a book, not a feed. (ref §6.5 of buffet-gastronomia-premium-2026.md)

This forces brutal discipline:
- Castelo homepage = **7 sections** (the 7 chapters). Zero more.
- Di Matoso homepage = **6 sections** maximum (hero, kitchen story, menus, plates, rituals, contact).

### 2.5 Vertical rhythm

| Token | Value |
|---|---|
| Section vertical padding (desktop) | `clamp(6rem, 10vh, 10rem)` |
| Section vertical padding (mobile) | `4rem` |
| Section header bottom margin | `4rem` desktop / `2.5rem` mobile |
| Body line-height | `1.75` |
| Subtitle/lead line-height | `1.8` |
| Card interior padding | `2.5rem` desktop / `1.5rem` mobile |
| Hairline gap (grid dividers) | `1px` |

### 2.6 Card geometry

- **Radius = 0 on all cards**. Square is the statement. Only pills (`100px`) and interactive mockup frames (`12px`) get radius. (inherit from ceiling reference §4)
- **Borders > shadows**. Only one shadow definition in the system: `0 20px 60px rgba(0,0,0,0.08)` for image frames. Cards are always bordered (`1px solid var(--border)`), never elevated.

---

## 3. Shared Motion Language

### 3.1 Stack decision

**Approved**: Lenis (smooth scroll) + vanilla IntersectionObserver (fade-up) + minimal GSAP ScrollTrigger *only* for clip-path plate reveals and self-drawing hairlines in Di Matoso. Castelo ships **zero GSAP** — IntersectionObserver is sufficient.

**Rejected**:
- Framer Motion (weight, React-only, overkill for our case)
- Full GSAP on Castelo (unneeded — ceiling reference proves IntersectionObserver + CSS is enough)
- Three.js / R3F (zero 3D needs on either site)
- Spline embeds
- Any spring physics / bounce / elastic easing

### 3.2 The one fade-up pattern (both brands)

```css
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-in.visible { opacity: 1; transform: translateY(0); }
```

- **Distance**: 24px (up from ceiling's 20px — slightly more air)
- **Duration**: 900ms (up from 800ms — more cinematic)
- **Ease**: `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo-adjacent — the "premium swoop")
- **Observer config**: `threshold: 0.15, rootMargin: '0px 0px -80px 0px'`
- **One-shot**: fire once, stay visible

### 3.3 Order-of-reveal rule (both brands)

When a section contains a photograph and typography, they reveal in this order:

1. **Photograph enters** at T=0
2. **Type enters** at T=+200ms

Never simultaneously. Never type-first. The photo is the anchor; the type is the caption arriving after the reader has looked at the image. This is the Kimpton Vividora rule (ref §6.3 of wedding-venue-premium-2026.md).

Implementation: add `transition-delay: 200ms` to type elements within a section that also contains a fading photograph.

### 3.4 Self-drawing hairlines (Di Matoso signature, Castelo optional)

For the gold/bronze hairline dividers at section entries, the rule draws itself left-to-right on scroll entry:

```css
.hairline-rule {
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1) 300ms;
}
.hairline-rule.visible { width: 100%; }
```

Di Matoso uses this on every section header and every course card underline. Castelo uses it sparingly — only on the section-number underlines. (ref §6.4 of buffet-gastronomia-premium-2026.md)

### 3.5 Cinemagraph hero (Castelo signature)

The Castelo hero is a single frame of the estate at golden hour with **one moving element** — typically the lake surface, candle flame, or draped fabric. Everything else is frozen. (ref §6.2 of wedding-venue-premium-2026.md)

- **Format**: MP4 (H.264) + WebM (VP9) fallback, `<video>` with `autoplay muted playsinline loop`
- **Duration**: 8–12 second seamless loop
- **Resolution**: 1920×1080 desktop, 1080×1920 portrait mobile crop
- **File size budget**: ≤ 2.5MB desktop, ≤ 1.2MB mobile
- **No audio**. Ever. Audio track stripped at encode.
- **Poster frame**: a still JPEG at 85% quality so the hero looks right even before video decodes.

### 3.6 Clip-path plate reveal (Di Matoso signature)

Every plate-hero image uses a bottom-up clip-path reveal, paired with text-after-image staggering. (ref §6.2 of buffet-gastronomia-premium-2026.md)

```css
.plate-reveal {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.plate-reveal.visible { clip-path: inset(0 0 0 0); }
```

Paired with italic dish name fading in at +400ms and ingredient list at +600ms.

### 3.7 Prohibited motion (both brands)

- Spring physics, bounce, elastic, `back.out`, any overshoot easing
- Parallax displacement > 40px (Di Matoso allows one exception: 0.6x parallax on serif pull-quotes over photography, per §6.3 of buffet-gastronomia-premium-2026.md — that's the only parallax license)
- Autoplay video with audio
- Cursor magnetism / magnetic buttons (feels agency-y)
- Counter-up on numerals (numbers are typography, not dashboards)
- Snap-scroll
- Page-transition animations
- Any particle effect, glitter, shimmer, or sparkle

### 3.8 Reduced motion (mandatory — fixes the ceiling gap)

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .fade-in, .plate-reveal, .hairline-rule {
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    width: 100% !important;
  }
  .hero-cinemagraph video { display: none; }
  .hero-cinemagraph { background-image: var(--poster-frame); }
  html { scroll-behavior: auto; }
}
```

This is non-negotiable. The ceiling reference omits it (observations.md §6) — we close the gap.

---

## 4. Castelo dos Lagos — Sub-variant

### 4.1 Concept

> **Estate, not venue. A family that has been photographing its own land for four generations, and finally made a book out of it.**

Castelo dos Lagos is a family estate hosting celebrations — not a "wedding destination", not a "venue rental". The digital experience reads like an Aman property or a Belmond estate: confident, quiet, architectural, photographed like a Cereal spread. The voice is stewardship, first-person plural ("a casa", "os lagos", "recebemos"). Zero wedding-industry vocabulary. Zero "your dream day". The family is present but never foregrounded — they are the editors of the book, not the subjects.

The atmosphere is **early morning blue hour or late golden hour** — never midday. Fog on the lake, warm light through stone, empty chairs in a garden. The estate is depicted as *just after* or *just before* a celebration, never during one. Implied presence, zero guests in frame. The viewer feels they have arrived at a place with a history that does not depend on them — and that is precisely why they want to book it.

The public is high-net-worth families planning weddings, milestone celebrations, corporate retreats. They have seen every wedding venue in São Paulo and Rio. They are tired of sites that scream. They are looking for the one that whispers.

### 4.2 Palette (LOCKED)

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--forest-deep` | `#1E2E24` | Primary dark surface — dominant background | Hero, dark sections, nav on scroll over dark |
| `--forest-mid` | `#2F4A3A` | Secondary dark surface — section alternation | Mid-tone dark sections, card surfaces on dark |
| `--cream` | `#F4EFE6` | Primary light surface — "paper" for editorial reading | Body sections, long-form reading, galleries |
| `--bronze` | `#8A6A3E` | Accent — warm shadow metal | Section numerals, micro-caps, hairline rules, italic emphasis, nav brand |
| `--near-black` | `#0E0E0C` | Max-contrast type on cream | Body copy on cream, display type on cream |

**Supporting tones** (derived, never primary):
- `--bronze-soft` `rgba(138, 106, 62, 0.25)` — default divider
- `--bronze-strong` `rgba(138, 106, 62, 0.5)` — hover divider
- `--on-dark-primary` `rgba(244, 239, 230, 0.92)` — type on forest-deep
- `--on-dark-secondary` `rgba(244, 239, 230, 0.6)` — meta/caption type on dark

**The bronze rule**: bronze is a *warm shadow metal*, not a gold. It must never read as yellow. If any rendered swatch starts to look like credit-card gold, we nudge it darker toward `#7A5C34`. This is the single most common way this brand can go wrong — enforce at design-review time.

**Prohibited on Castelo**: any #C9A96E or brighter gold (even the ceiling reference's gold is too yellow for this variant), any rose/blush/peach, any terracotta (belongs to Di Matoso family visually, even though Di Matoso uses a different accent), any green that reads chartreuse or olive.

### 4.3 Shot grammar (photography brief)

**The single-photographer rule**: commission ONE photographer for the entire estate shoot. No stitched-together vendor portfolios, no multi-wedding-photographer mixes. Consistency of light, lens, grade, and composition is the single biggest premium-perception lever we have. (ref §5.2 of wedding-venue-premium-2026.md — Aman Villas rule)

**When to shoot**:
- **Golden hour** (the 40 minutes before sunset): architecture, lake, wide estate frames
- **Blue hour** (the 20 minutes after sunset): interior windows glowing warm from outside, candlelight, fire
- **Early morning mist** (if climatically available): lake surface, approach road
- **NEVER midday**: harsh shadows, flat colors, tourist-photo grammar

**Lens grammar**:
- Wide architectural (24–35mm) for estate establishing frames — Castelo is big, show the scale
- Intimate (50–85mm) for detail shots — a hand on stone, a glass on a garden table, draped linen
- Never ultra-wide (< 24mm) — distortion breaks the editorial feel
- Never telephoto compression (> 135mm) — flattens depth, looks like sports photography

**Composition rules**:
- Mix wide + intimate at a 1:2 ratio per gallery sequence (one wide, two intimates, one wide, two intimates)
- Implied celebration, never depicted celebration — no guests in frame, no bride, no groom, no altar with people
- Details carry the story: a candle, a chair, a glass, a hand on a doorframe, a flower just before being placed
- **Zero drone footage** that looks stock. If drone is used, it must be for ONE establishing frame only, and it must look like it was shot by a human who flew carefully, not by an algorithm
- Consistent color grade across every frame: warm highlights, cool shadows, slight green cast in the midtones (matches the forest-deep palette)

### 4.4 Lighting direction (by shot type)

| Shot type | Quality of light | Direction | Intensity |
|---|---|---|---|
| Establishing architectural | Warm golden, low-angle | Side-back | Soft — shadows long, warm, never hard |
| Lake surfaces | Cool ambient, low-angle | Side | Near-silhouette — the lake is dark, the sky is the light |
| Interior (salon, suites) | Warm tungsten + cool window spill | Mixed | Low-key — warm pools of light, deep shadows between |
| Detail / still life | Warm single source | Side-front | Chiaroscuro — one direction, strong falloff |
| Mist / morning | Cool flat ambient | Top | Uniform — no direction, the fog IS the light |

### 4.5 Hero treatment — Cinemagraph spec

- **Subject**: the lake at blue hour, with the estate in silhouette against a deep-forest sky, one lit window visible
- **Moving element**: the lake surface (subtle wind ripple) — everything else frozen
- **Alternative**: drapery in an open doorway moving in warm wind, with stone and warm light behind
- **Loop**: 8–12 seconds seamless (first and last frame identical)
- **Encode**: H.264 MP4 primary (2.5MB budget), VP9 WebM fallback, JPEG poster frame
- **Typography over hero**: single Cormorant sentence, bottom-left, `clamp(3rem, 7vw, 6.5rem)` — the sentence IS the value prop, not an H1 plus subtitle stack
- **CTA**: top-right, Cormorant serif underline, "Agendar visita" — no pill button, no filled block
- **Wordmark**: top-left, 1.1rem Cormorant 400, tracking 0.05em — micro-small, confident
- **No scrim, no dark-gradient overlay on the photo**. If the headline can't be read against the photo, the photo is wrong — re-grade or re-choose. (ref §5.1 of wedding-venue-premium-2026.md)

### 4.6 Seven chapters structure (homepage as estate tour)

This is the Castelo homepage. Seven sections, each a full viewport, each composed of exactly one photograph + one Cormorant sentence + one paragraph of Inter body.

| # | Roman | Title | Photograph | Serif sentence (editorial placeholder) | Body (Inter) |
|---|---|---|---|---|---|
| 1 | **I.** | Chegada | The approach road through the estate gates at golden hour — a long lens down the drive, stone wall right, canopy overhead | *Algumas casas se visitam. Esta, recebe-se.* | 2–3 sentences on the arrival ritual — the family has been receiving guests at this gate for four generations. |
| 2 | **II.** | Os Lagos | Lake surface at blue hour, reflection of the sky, a single boat or no boat, mist at the far edge | *Os lagos mudam duas vezes por dia. O castelo, nunca.* | The lakes as the emotional center of the estate — how the property was named, how the light moves across the water. |
| 3 | **III.** | Arquitetura | Interior or exterior detail of the stone work — a window, a corner, a stair — at warm tungsten light | *Construído por quem ainda mora aqui.* | Stewardship, family history, the stone, the refusal to "modernize" what didn't need it. |
| 4 | **IV.** | Cerimônia | The chapel or ceremonial space, empty, candlelit, chairs ready — zero guests | *O lugar está pronto. Falta apenas a data.* | The ceremonial spaces (chapel, garden, lakeside) described editorially — no "capacity" numbers, no "amenities list". |
| 5 | **V.** | Salão | The main reception salon at blue hour, tables dressed, empty, one window glowing | *Mesas postas, silêncio antes da primeira taça.* | The salon as a room, not a "banquet hall" — history, dimensions as prose ("quarenta metros de parede para paredes"), not as spec sheet. |
| 6 | **VI.** | Suítes | One suite shot from the doorway, warm morning light through the window, linen on the bed | *Dormem aqui antes, dormem aqui depois.* | The suites as rooms for the family of the celebration — the bride's morning, the grandparents, the children. Not a "hotel rooms" list. |
| 7 | **VII.** | Convite | A single photograph of a hand placing a card on a stone table OR an empty doorway at dawn | *Para conhecer o castelo, é preciso ser convidado.* | The "contact" section rewritten as an invitation. "Agendar visita" is the only CTA. No form on the page — the click opens a dedicated `/visita` page with a single editorial form. |

The Roman numeral + label pattern (`I. CHEGADA`) is the chapter marker. Every section begins with this marker in bronze micro-cap above the Cormorant title.

### 4.7 Hero image prompts for Gemini / Flux / Midjourney

These follow the REIS [IA] prompt skeleton (architectural, golden/blue hour, fine grain, depth) adapted for a Brazilian estate with lakes. Save these to `brain/design-library/hero-prompts/castelo-dos-lagos/` as three separate files after handoff.

**Prompt 1 — Hero establishing (blue hour lakeside)**
```
Cinematic architectural photograph of a Brazilian colonial-era stone castle estate at blue hour, photographed from across a still reflecting lake, the castle in silhouette against a deep forest-green twilight sky, one warm tungsten window glowing from within the main façade, mist rising gently from the lake surface, tall native Brazilian trees framing the left edge, absolutely no people, no wedding props, no modern vehicles, composition follows rule-of-thirds with the castle on the right vertical third, shot on medium-format Phase One with 55mm lens at f/5.6, long exposure 2 seconds for lake smoothness, warm highlights cool shadows color grade, slight green cast in midtones, subtle 35mm film grain, editorial stillness, in the style of Cereal Magazine and Aman resort photography, shot for Belmond-level hospitality brand. Deep forest green #1E2E24 dominant background, warm bronze #8A6A3E highlights, cream #F4EFE6 accents from window light. Aspect ratio 16:9 landscape, ultra-high resolution.
```

**Prompt 2 — Approach road at golden hour**
```
Editorial architectural photograph looking down a long tree-canopied estate approach road in rural Brazil at golden hour 40 minutes before sunset, old stone wall running along the right edge of the road, large native trees forming an overhead tunnel of canopy, warm golden light filtering through leaves creating long soft shadows across the gravel road, the silhouette of a stone castle gate visible in the far distance at the end of the road, no people anywhere in frame, no cars, no modern signage, composition is symmetrical one-point perspective with the vanishing point centered low, shot on Leica M11 with 50mm Summilux at f/4, natural available light only, editorial color grade warm highlights cool shadows, subtle grain, in the style of Castello di Vicarello and Passalacqua hospitality photography. Dominant palette: warm bronze #8A6A3E highlights, deep forest #1E2E24 shadows, cream-yellow sunlight. Aspect ratio 3:2 landscape.
```

**Prompt 3 — Interior detail at tungsten light**
```
Editorial still-life interior photograph of a single empty stone-framed window inside a Brazilian colonial castle at dusk, warm tungsten light from a single sconce falling on the stone at a 45-degree angle from the right, a simple linen curtain drawn aside revealing the lake and twilight sky outside, no people, no wedding decorations, no modern furniture, only stone, linen, and light, shot on Hasselblad X2D with 80mm lens at f/4, chiaroscuro lighting with deep warm shadows and bright directional highlights, shallow depth of field with the stone texture tack-sharp, subtle Kodak Portra film grain, in the style of Belmond and Aman interior photography. Dominant palette: warm bronze #8A6A3E in the light, deep forest #1E2E24 in the shadows, cream #F4EFE6 in the linen. Aspect ratio 4:5 vertical.
```

*Note*: prompt authoring for all three directly references the REIS [IA] hero prompt skeleton (dark, architectural, electric blue accent) adapted here to bronze accent. The skeleton lives in `brain/design-library/hero-prompts/` (to be confirmed with design-library README).

### 4.8 Anti-patterns specific to Castelo (top 8)

Consolidated from the wedding-venue-premium-2026.md anti-pattern list:

1. **Rose, blush, peach, any wedding-pastel color** — off-limits across the entire site
2. **Script / cursive / "invitation" display fonts** (Allura, Great Vibes, Pinyon, etc.) — Cormorant is the only serif allowed
3. **"Seu dia dos sonhos" / "dream day" / "forever starts here"** — any bridal-industry vocabulary bans the copy
4. **Testimonial carousels with quote marks and names** — replace with editorial case studies, full-bleed photo, one paragraph
5. **Wedding-package tier pricing** (Basic / Premium / Luxury) — zero pricing on the site, CTA is "Agendar visita"
6. **Heart, ring, floral, any ornamental icon** — line icons only, and only if strictly necessary (avoid)
7. **Stock drone footage of European castles** — all photography must be of the actual property, commissioned from one photographer
8. **Hero video with orchestral music autoplaying** — the hero is a silent cinemagraph, no audio track at all

---

## 5. Buffet Di Matoso — Sub-variant

### 5.1 Concept

> **Editorial manuscript gastronomy. A family kitchen that prints its menus like a magazine prints its features — courses as chapters, ingredients as essay, and the dish as the photograph that makes the page turn itself.**

Buffet Di Matoso is a family-run premium Brazilian catering kitchen. The digital experience reads like a cross between Eleven Madison Park's museum-card restraint and Kinfolk's slow-living editorial warmth — 70% EMP + 30% Brazilian warmth, per the mood report. The voice is the family's own: first-person plural, italic-serif poetic when describing a dish, structural-sans factual when listing ingredients and logistics. The italic is not decoration; it is the voice of the cook narrating the plate.

The atmosphere is **warm natural light with one strong direction** — late morning or late afternoon, never harsh, never flat. Surfaces are pedra, madeira, linho — never white plates on white marble, never the flat-lay iFood grammar. Every plate is photographed on a real surface that the kitchen actually uses. The rhythm is PLATE → MACRO → ENVIRONMENT → HANDS, never four plates in a row.

The public is wedding planners, event directors, families planning milestone celebrations. They have seen every catering PDF, every drag-and-drop menu builder, every "sabor e sofisticação" cliché on the market. They are looking for a kitchen that feels *edited* rather than *sold*.

### 5.2 Palette (LOCKED)

| Token | Hex | Role | Usage |
|---|---|---|---|
| `--charcoal` | `#1A1A1A` | Primary dark surface — dominant background | Hero, dark sections, plate backgrounds |
| `--charcoal-warm` | `#242020` | Secondary dark surface (warm-shifted) | Section alternation on dark |
| `--cream` | `#FAFAF7` | Primary light surface — "paper" | Menu sections, long-form reading, essay body |
| `--gold-deep` | `#B8860B` | Editorial deep gold — HAIRLINES ONLY | Section numerals, hairline rules, CTA underlines, italic emphasis, pull-quote accents |
| `--gold-shadow` | `#8E6A0A` | Pressed/hover variant of gold | Interactive gold states |
| `--burgundy-whisper` | `#3D1F1F` | Tertiary accent — wine, warmth, depth | One touch per page maximum, usually in a pull-quote or a single menu header |

**Supporting tones** (derived):
- `--gold-hairline` `rgba(184, 134, 11, 0.35)` — default divider
- `--gold-hairline-strong` `rgba(184, 134, 11, 0.6)` — hover divider
- `--on-dark-primary` `rgba(250, 250, 247, 0.94)` — type on charcoal
- `--on-dark-secondary` `rgba(250, 250, 247, 0.65)` — meta on charcoal

### 5.3 THE GOLD RULE (non-negotiable, most important rule on Di Matoso)

Gold lives exclusively in: **hairlines, rules, underlines, numerals, italic emphasis, typography strokes**. Gold NEVER appears as:

- A button fill
- A block background
- A card surface
- A gradient
- An icon fill
- A decorative shape

**Maximum screen coverage of gold pixels: 8%.** Measured at any viewport, any scroll position. The designer-agent enforces this at review time by sampling the final rendered pages.

If gold becomes fill, the brand has gone tacky. This is how every Brazilian wedding-buffet site on Google has gone wrong for the past decade. We refuse to repeat it. Discipline: **gold is a 1-2px stroke, never a surface**. (ref §3.1 of buffet-gastronomia-premium-2026.md — Le Meurice Ducasse rule)

### 5.4 Shot grammar (photography brief)

**The rhythm rule**: every gallery and every scroll sequence follows the pattern **PLATE → MACRO → ENVIRONMENT → HANDS → PLATE**. Never four plates in a row. Never two environments in a row. The pattern breaks monotony and adds luxury pacing. (ref §5.2 of buffet-gastronomia-premium-2026.md)

**Four shot types**:

1. **PLATE** — the finished dish, consistent 3/4 angle (never top-down flat-lay), shot on real kitchen surface (stone, wood, linen — never white marble backdrop). Shallow DOF at f/2.8–f/4.
2. **MACRO** — extreme close-up of an ingredient or texture (salt crystals, oil beading, herb, a single cut). Near-abstract. Breaks the plate rhythm.
3. **ENVIRONMENT** — the kitchen itself, the stove, the pass, the window, a garden bed, a herb bundle hanging. Context without people.
4. **HANDS** — hands in action. Hands plating, hands pouring, hands cutting, hands wiping a rim. NEVER the chef's face in close-up (cliché). Hands are the humanization device. (ref §5.1 of buffet-gastronomia-premium-2026.md — Pujol rule)

**Consistency rules**:
- Every PLATE shot uses the same angle (3/4), same lens (85mm or 100mm macro), same lighting direction (warm, side-front), same surface palette (pedra/madeira/linho)
- Every MACRO shot uses the same aperture (f/2.8) and same warm color grade
- ENVIRONMENT shots can breathe — slightly wider variation is allowed here
- HANDS shots: always in motion, never staged-still

**Prohibited**:
- Flat-lay top-down composition (delivery-app grammar)
- Pure white marble backgrounds (stock / tacky / iFood)
- Chef's face closeup as hero (cliché)
- Champagne glasses clinking (stock)
- Staged-happy-guests at a table (we are a kitchen, not an event-photography studio)
- Cool/Nordic color grade (too clinical for Brazilian warmth)

### 5.5 Lighting direction

| Shot type | Quality | Direction | Notes |
|---|---|---|---|
| PLATE | Warm, soft, directional | Side-front, 45° from camera left | Single source, no ring light, no softbox fill from below |
| MACRO | Warm, hard, single-source | Side, 90° from camera | Short falloff — the ingredient is lit, the background is not |
| ENVIRONMENT | Warm ambient + one directional | Window light or hanging Edison bulb | Low-key overall — the dark context makes the warm glow pop |
| HANDS | Warm, directional, chiaroscuro | Overhead 3/4 or side | Follows the action; hands in the light, arms/body in shadow |

### 5.6 Hero treatment — plate hero OR hands-in-action

Two options, both acceptable, **pick one per seasonal campaign**:

**Option A — Plate hero**
- Full-viewport photograph of a single hero dish
- Background is real kitchen surface (pedra or madeira)
- Warm side-lighting, shallow DOF
- Typography in the bottom-left corner: Cormorant serif 2–3 lines, the sentence IS the value prop
- CTA top-right: Cormorant serif underline, "Conhecer o menu" or "Solicitar orçamento"
- Wordmark top-left: 1.1rem Cormorant
- No UI chrome on the image — no filter pills, no scroll indicator over the plate

**Option B — Hands-in-action hero**
- Full-viewport photograph of hands plating or pouring
- Same typography treatment as A
- Preferred option when the seasonal menu is launching (humanization)
- Chef's arms visible, face never visible

**Transition from one to the other**: every 6 months, swap the hero between a plate and a hands shot. This is the seasonal ritual. It signals the kitchen is alive.

### 5.7 Menu as editorial manuscript — structure

Di Matoso publishes 3–5 thematic menus (e.g., "Menu Raízes", "Menu Colheita", "Menu Festança"). Each menu is a **full editorial page**, not a price list. (ref §4.1 of buffet-gastronomia-premium-2026.md — Noma seasonal rule)

**Menu page anatomy**:

1. **Hero**: one photograph (PLATE or ENVIRONMENT) + Cormorant italic title (e.g., *Raízes*) + Inter micro-cap subtitle (e.g., `MENU DE OUTONO`) + body lead (2 paragraphs of Inter essay on the theme — why this menu, what it means, what season/ingredient inspired it)
2. **Courses**: each course as a "printed card" motif (ref §4.3 of buffet-gastronomia-premium-2026.md — Atomix rule). Layout per course:
   - Roman numeral in gold hairline (`I.`, `II.`, `III.`, ...)
   - Cormorant dish name (1.5rem, weight 400)
   - Cormorant italic 2-line poetic description (1rem, italic, muted color)
   - Inter ingredient list (0.8125rem, weight 400, tracking 0.02em) — comma-separated, no bullets
   - Zero price visible
   - Self-drawing gold hairline underneath the card on scroll entry
3. **Ritual**: one pull-quote in large Cormorant italic from the family (e.g., *"A massa mãe dessa focaccia vem da avó."*) — with 0.6x parallax over a MACRO shot (flour, dough, hands)
4. **CTA**: single Cormorant serif underline, "Solicitar orçamento" — opens a dedicated page with an editorial form (not a pill button, not a popup)

**The zero-price rule**: there is NO price anywhere on the Di Matoso site. Not per-person, not total, not tier. Pricing is communicated via "orçamento sob consulta" exclusively. This is how we repel the wrong customer and attract the right one.

### 5.8 Hero image prompts for Gemini / Flux / Midjourney

Save to `brain/design-library/hero-prompts/buffet-di-matoso/` as three separate files.

**Prompt 1 — Plate hero (main course)**
```
Editorial food photograph of a single refined Brazilian main course plated at a 3/4 angle on a dark raw stone surface, shot from above-front at 45 degrees, warm directional natural light from camera left creating soft sculpted shadows across the plate, the dish is a seared fish fillet with a reduction sauce and fresh herbs arranged as a small composition (not ingredients scattered), one wrinkled linen napkin partially visible at the frame edge, dark charcoal background falling off to black, shallow depth of field at f/2.8 with tack-sharp focus on the central bite, shot on Hasselblad X2D with 100mm macro lens, warm natural light temperature around 4000K, editorial color grade, subtle Kodak Portra film grain, in the style of Noma and Geranium fine-dining photography. Dominant palette: charcoal #1A1A1A background, cream #FAFAF7 plate, burgundy whisper #3D1F1F sauce accent, warm gold highlights on the fish glaze. Aspect ratio 16:9, ultra-high resolution, zero text or UI elements in frame.
```

**Prompt 2 — Macro ingredient**
```
Extreme macro photograph of coarse sea salt crystals on a single dark stone cutting board, one single drop of golden olive oil beading on the largest crystal, warm side-lighting from the right at 90 degrees creating hard shadows and sharp highlights on the crystal facets, everything else falling into deep charcoal darkness, absolutely no other ingredients, no props, no text, shot on Sony A1 with 90mm macro lens at f/2.8, 1:1 magnification, warm natural light around 3800K, shallow depth of field with the single oil drop perfectly sharp, in the style of Geranium ingredient photography. Dominant palette: charcoal #1A1A1A background, cream #FAFAF7 salt crystals, deep gold #B8860B oil highlight. Aspect ratio 4:5 vertical, ultra-high resolution.
```

**Prompt 3 — Hands in action**
```
Editorial photograph of a pair of experienced hands placing the final herb garnish on a finished plate, shot from a 3/4 overhead angle showing only the forearms and hands, the person's face and body out of frame entirely, warm directional natural light from a kitchen window at camera left, the plate is a small refined Brazilian appetizer on a dark wooden board, the hands are steady mid-action with the herb about to touch the plate, the background is a real working kitchen pass out of focus in deep shadow, shot on Leica SL3 with 50mm Summilux at f/2.8, warm natural light 4000K, editorial color grade with warm highlights and deep warm shadows, subtle film grain, in the style of Pujol and Central Restaurante hands photography. Dominant palette: charcoal #1A1A1A kitchen background, cream #FAFAF7 hands and plate, burgundy whisper #3D1F1F food accent, warm gold #B8860B light glints. Aspect ratio 3:2 landscape, ultra-high resolution, absolutely no faces, no bodies above the wrists, no text.
```

### 5.9 Anti-patterns specific to Di Matoso (top 8)

Consolidated from buffet-gastronomia-premium-2026.md:

1. **Saturated credit-card gold** (#FFD700 and anything that bright) — gold is always #B8860B editorial deep gold or darker
2. **Gold as fill** (button backgrounds, block colors, gradients) — gold is exclusively hairline, rule, underline, numeral
3. **Flat-lay top-down food photography** — every plate is 3/4 angle, always
4. **Pure white marble background** (iFood / delivery-app visual grammar) — real kitchen surfaces only
5. **Script "invitation" cursive fonts** — Cormorant italic is the only italic allowed
6. **Champagne glasses clinking / guests toasting stock imagery** — zero
7. **Price per person / tier pricing ("Prata / Ouro / Diamante")** — zero pricing on the site
8. **Chef's face closeup as hero** — hands only, never face

---

## 6. Handoff Instructions

### 6.1 To `designer-agent`

Produce **two design-system token files**, one per brand, based on this brief:

- `brain/assets/branding/design-system-castelo-dos-lagos.md`
- `brain/assets/branding/design-system-di-matoso.md`

Both share the type system from §1 and the motion language from §3. They diverge in palette (§4.2 vs §5.2), in hero treatment (§4.5 vs §5.6), and in chapter structure (§4.6 vs §5.7).

**Component library to specify** (both brands inherit):
- `Nav` — fixed, scroll-state invert (ceiling pattern 5)
- `Hero` — two variants: `HeroCinemagraph` (Castelo) and `HeroPlate` / `HeroHands` (Di Matoso)
- `ChapterHeader` — Roman numeral + micro-cap label + Cormorant title + Inter body lead
- `EditorialSection` — 3-column asymmetric editorial grid wrapper
- `PullQuote` — oversized Cormorant italic, optional 0.6x parallax (Di Matoso only)
- `CtaSerifUnderline` — the only CTA pattern in both brands, no pills
- `ImageFrame` — wide/narrow/full-bleed variants with the one shadow token
- `CourseCard` (Di Matoso only) — Roman numeral + dish name + italic description + ingredient list + self-drawing gold hairline underline
- `Footer` — editorial single-line footer, two lines maximum (brand + confidential line)

**Enforce at review time**:
- Zero radius on cards (only pills and image frames get radius)
- No bold anywhere
- No gold fills on Di Matoso (max 8% gold coverage)
- No rose/blush/peach on Castelo
- Reduced-motion fallback present on every animated element
- Every heading is Cormorant, every body is Inter

### 6.2 To `vfx-motion-designer`

**MANDATORY first step**: consult `brain/design-library/patterns/` and `brain/design-library/references/castelo-estrategia/` BEFORE implementing. The ceiling reference's IntersectionObserver pattern is the default — reach for GSAP ScrollTrigger only where §3.4 and §3.6 of this brief explicitly require it.

**Order of execution**:
1. Ship the global fade-up pattern (§3.2) — both brands, works everywhere, zero dependencies beyond vanilla JS
2. Ship the nav scroll-state invert (ceiling pattern 5, inherited)
3. Ship the reduced-motion fallback (§3.8) — gate everything else on this existing first
4. Ship the Castelo cinemagraph hero (§3.5) — just a `<video>` element, no GSAP
5. Ship the Di Matoso self-drawing hairlines (§3.4) — vanilla CSS + IntersectionObserver sufficient
6. Ship the Di Matoso clip-path plate reveal (§3.6) — this is the only place GSAP ScrollTrigger is justified, and only if vanilla CSS `clip-path` + IntersectionObserver proves insufficient
7. Ship the Di Matoso 0.6x parallax on pull-quotes (§3.7 exception) — Lenis + ScrollTrigger if needed; if the native `scroll-timeline` primitive is production-ready in target browsers, prefer that over JS

**Check these 2026 techniques before adding dependencies**:
- Native `animation-timeline: scroll()` for the self-drawing hairlines and parallax pull-quotes
- View Transitions API for the Castelo chapter-to-chapter transitions (if we add internal routes)
- Variable-font italic toggles for Cormorant emphasis (cheaper than font-file swaps)

**Patterns to suggest for distillation** (file these back into `patterns/` as part of the build):
- `patterns/motion/clip-path-plate-reveal.md`
- `patterns/motion/self-drawing-hairline-rule.md`
- `patterns/motion/cinemagraph-hero-video.md`

### 6.3 To `logo-brand-mark-designer`

Produce three deliverables per brand, so six deliverables total.

**Castelo dos Lagos**:
1. **Wordmark** — "Castelo dos Lagos" set in Cormorant Garamond 400, letter-spacing 0.05em, rendered in cream `#F4EFE6` on forest-deep. Italic variant for emphasis: "Castelo *dos* Lagos" with "dos" in italic 400. Horizontal and stacked versions. No decorative element. Wordmark IS the logo.
2. **Optional seal mark** — a single geometric monogram (interlocked C and L) or a minimal stone-arch silhouette, rendered as a 1px-stroke line drawing in bronze. Used on the favicon and on letterhead only. Never combined with the wordmark on primary surfaces. If design review finds the seal weakens the typographic confidence of the wordmark, ship without a seal.
3. **Favicon** — 32×32 SVG: bronze background, cream 1px stroke of either the seal or a stylized C. No gradients, no shadows.

**Buffet Di Matoso**:
1. **Wordmark** — "Buffet Di Matoso" set in Cormorant Garamond 400, letter-spacing 0.05em, rendered in cream on charcoal. Italic variant: "Buffet *Di Matoso*" — the family name is the emphasis. Horizontal and stacked versions.
2. **Optional seal mark** — a single Roman numeral "I." in Cormorant 400 inside a 1px deep-gold hairline circle, or a minimal flame / herb stem silhouette. Used only on the favicon and menu cover pages. If in doubt, ship without.
3. **Favicon** — 32×32 SVG: charcoal background, deep-gold 1px stroke of either the seal or a stylized italic "D".

**Wordmark pairing rule**: both brands' wordmarks must render at the same x-height when placed side by side (e.g., on a shared footer declaring "Família Di Matoso · Castelo dos Lagos · Buffet Di Matoso"). This is the branded-house visual signal.

**Explicitly prohibited**: any monogram that reads as a corporate logo, any gradient, any shadow, any 3D effect, any illustration, any chess / crown / heraldic / medieval motif, any food icon (fork, knife, plate), any wedding icon (ring, heart, flower).

### 6.4 To `dev-agent`

**Two separate Astro sub-projects** in the repository root:

```
castelo-dos-lagos-site/
  src/
    layouts/
      EditorialLayout.astro       # shared shell, nav, footer
    components/
      Nav.astro
      HeroCinemagraph.astro
      ChapterHeader.astro
      EditorialSection.astro
      PullQuote.astro
      CtaSerifUnderline.astro
      ImageFrame.astro
      Footer.astro
    pages/
      index.astro                 # the 7-chapter homepage
      visita.astro                # editorial form "Agendar visita"
      historia.astro              # family stewardship long-form (optional phase 2)
    styles/
      tokens.css                  # tokens from design-system-castelo-dos-lagos.md
      base.css
      typography.css
      motion.css
    fonts/                        # self-hosted Cormorant + Inter woff2
    assets/
      hero-cinemagraph/           # mp4 + webm + poster.jpg
      chapters/                   # placeholder JPEGs until real shoot
  astro.config.mjs
  package.json

di-matoso-site/
  src/
    layouts/
      EditorialLayout.astro
    components/
      Nav.astro
      HeroPlate.astro
      HeroHands.astro
      ChapterHeader.astro
      EditorialSection.astro
      MenuManuscript.astro        # the editorial menu page template
      CourseCard.astro
      PullQuote.astro             # includes 0.6x parallax variant
      HairlineRule.astro          # self-drawing
      CtaSerifUnderline.astro
      ImageFrame.astro
      Footer.astro
    pages/
      index.astro                 # hero + 5-6 sections
      menu/raizes.astro           # editorial menu page
      menu/colheita.astro
      menu/festanca.astro
      orcamento.astro             # editorial form
    styles/
      tokens.css                  # tokens from design-system-di-matoso.md
      base.css
      typography.css
      motion.css
    fonts/                        # same Cormorant + Inter files as Castelo (shared)
    assets/
      plates/                     # placeholders
      macros/
      environments/
      hands/
  astro.config.mjs
  package.json
```

**Shared concerns** (propose extracting to a third package later):
- Font files (Cormorant + Inter woff2) are literally the same files — a shared `@familia-dimatoso/fonts` package is justified
- The fade-up IntersectionObserver utility is identical — share as `@familia-dimatoso/motion`
- Type tokens and grid tokens are identical — share as `@familia-dimatoso/typography-grid`

For Phase 2 delivery, ship the two sub-projects as separate Astro projects and duplicate the shared code — extract to a monorepo in a later iteration once both sites ship.

**Stack decisions** (lock these):
- Astro 4+, output `static`
- No Tailwind — hand-written CSS tokens + `:root` custom properties (inherit from ceiling reference's discipline)
- No React islands unless strictly required (initial build ships zero React)
- Self-hosted fonts, woff2 preload in `<head>`
- `prefers-reduced-motion` fallback present from day 1
- Lenis for Di Matoso only (Castelo uses native `scroll-behavior: smooth`)
- Vercel deployment target, two separate Vercel projects

**Asset placeholder strategy until real shoots happen**:
- Generate placeholder images from the hero prompts in §4.7 and §5.8 via Gemini / Flux / MJ during the design sprint
- Save placeholders into `assets/` with filenames prefixed `placeholder-` so the real photography swap is grep-able
- Reduce all placeholders to match final resolution + file-size budgets so the layout doesn't shift on swap

---

## 7. Final Report

**File created**: `/Users/moronireis/Projetos vscode/brain/assets/branding/art-direction-brief-castelo-dimatoso.md`

**Word count**: ~6,400 words

**Top 3 creative decisions that require Moroni's validation before Phase 3**:

1. **Castelo palette locks to bronze `#8A6A3E`, not gold.** This is a deliberate departure from the ceiling reference's `#C9A96E` — bronze is a warm shadow metal, less yellow, less "jewelry-ad". The mood report recommended it; this brief makes it non-negotiable. If Moroni wants Castelo to keep the ceiling's gold, the entire forest-deep-plus-warm-bronze atmosphere changes. **Validate before designer-agent locks tokens.**

2. **Both brands use Roman numerals as the branded-house chapter signature.** The mood report asked whether Castelo should use Roman and Di Matoso should use Arabic. This brief locks **Roman for both** because (a) the signature is stronger when shared, (b) Atomix and EMP prove Roman works for gastronomy editorially, (c) the branded-house visual knot is more valuable than a small differentiation. **Validate before handoff to designer-agent and dev-agent**.

3. **Zero price on Di Matoso and zero pricing tiers on Castelo — both sites refuse pricing entirely, CTAs route only to `/visita` and `/orcamento` editorial forms.** This is aggressive market-repellent positioning; it will filter out the mid-market entirely and only land high-ticket inquiries. The anti-pattern lists in both mood reports demand it; this brief formalizes it. **Validate that Moroni is comfortable with the commercial implications** — this is a business decision as much as a design one, and it must be agreed before the copy squad writes any CTA microcopy.

---

*End of brief. Ready for Phase 3 — designer-agent + vfx-motion-designer + logo-brand-mark-designer in parallel, then dev-agent scaffolding.*
