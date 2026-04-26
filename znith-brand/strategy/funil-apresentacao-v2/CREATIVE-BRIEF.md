# CREATIVE BRIEF — ZNITH Deck V2

**Client**: Leilaine Campioto Messias / ZNITH
**Deliverable**: Strategic presentation deck, 16 slides, dark editorial, Apple-keynote tier
**Author**: Creative Director (Reis IA Agency)
**Date**: 2026-04-13
**Status**: v1 — ready for design-agent + dev-agent handoff
**Consumes**: `znith-brand/strategy/funil-planejamento-v2.md` §9 (16-slide storyboard), `znith-brand/design-system/znith-design-system.md`, `znith-brand/branding/company-znith-concept.md`
**Voice profile**: ZNITH company — consultive, arquitetônico, maduro, zero hype

---

## 0. Why This Brief Exists

V1 (`znith-funil-estrategia.vercel.app`) was rejected by the client as "amador". The rejection is correct. V1 reads as a landing page cosplaying a deck: centralized bullets, flat type, no hierarchy of silence. This brief is not a visual refresh. It is a full reconstruction of the presentation language under the premise that **the client will stop scrolling within the first two slides — and everything must earn the next click**.

This deck is not selling. It is a document of authority. The prospect (or Leilaine, presenting it) must feel that it could have come out of a McKinsey retainer — except more deliberate, more current, and more distinctly ZNITH.

---

## 1. Macro Concept

### Tagline (internal, not shown in deck)
> **"A arquitetura vista de cima."**

### Central metaphor
The deck is a **blueprint unfolding**. ZNITH means zenith — the highest point, the view from above. Every slide is a layer of blueprint being revealed on an architect's table. Gold is the ink of the architect. Navy is the paper at night. White space is the unmarked territory — it is the most important material in the composition.

The prospect is not being pitched. The prospect is being **shown a plan** that the architect already drew.

### Mood
- **Silent authority**. The deck behaves like a private briefing, not a sales event. It does not raise its voice.
- **Editorial, not promotional**. Closer to The Economist print editorial or a Porsche configurator than to a SaaS pitch deck.
- **Architectural restraint**. If a slide can survive with 7 words, it lives with 7 words. If it needs 3, it lives with 3.
- **Cinematic pacing**. Slides transition like scenes in a film, not like PowerPoint pages.

### What the viewer should feel, slide to slide
| Slide | Feeling |
|---|---|
| 1 | *"This is serious."* |
| 2 | *"This is about me, not about them."* |
| 3 | *"They know my exact history."* |
| 4 | *"Oh. I never thought about it this way."* |
| 5 | *"This has structure I can trust."* |
| 6 | *"This person has actually done it."* |
| 7 | *"There's a real first step, not a sales call."* |
| 8 | *"This is the product. I can see it."* (anchor slide) |
| 9–12 | *"I understand exactly what I'm buying."* |
| 13 | *"The number is smaller than I expected for this level of work."* |
| 14 | *"They're not forcing me into anything."* |
| 15 | *"They might not even accept me."* (status inversion) |
| 16 | *"The only thing to do now is the Leitura."* |

---

## 2. Anti-Amador Rules (Hard Laws — No Exceptions)

These rules exist because V1 broke all of them. Any slide violating one of these ships rejected.

1. **Zero centered bullet lists.** A centered bullet list is the single most damning signal of a slide made in a hurry. Bullets, when they exist, are left-aligned inside a column that respects the 12-col grid, with no dot marker — use a thin 1px gold rule or a numeric prefix (`01 / 02 / 03`) instead.
2. **One idea per slide. Always.** If a slide has two ideas, it is two slides. The deck earns its density from sequence, not from per-slide cramming.
3. **Typographic layering is mandatory.** Every slide must have at least three type sizes visible simultaneously (eyebrow / headline / body or caption). A slide with a single type size is a wireframe, not a deliverable.
4. **12-column grid. Desktop: 1440px canvas, 96px outer margin, 24px gutter.** No element sits on a random pixel. Every element snaps to a column boundary or a half-column intentionally offset.
5. **Whitespace is content.** No slide may fill more than 55% of its canvas with painted pixels. The 45% of silence is the premium signal.
6. **No decorative icons.** No icon packs, no Feather, no generic. If a mark appears, it is custom SVG line art at 1px or 1.5px stroke, gold or white only.
7. **No gradients on text.** Ever. Gold text is `#DF9F3E` solid. Gradient text is a V1 relic and is banned.
8. **No drop shadows on body text.** No glow, no text-shadow, no emboss. Silent clarity.
9. **No emoji. No stock imagery. No AI-generated hero images.** Imagery is custom — diagrams, mockup objects, or tasteful editorial photography only.
10. **No "Lorem ipsum" behavior under any disguise.** Every word ships deliberate. If a slide has filler text, it is not finished.
11. **Numbers are protagonists.** When a slide contains a number (R$35.000, 8 semanas, R$500M+, 20+ anos), that number is the largest element on the slide by at least 3x.
12. **The eyebrow is mandatory on every non-cover slide.** Every interior slide has a small top-left eyebrow `01 — CENÁRIO` / `02 — DIAGNÓSTICO` etc. This is the institutional signature.
13. **The ZNITH wordmark and slide counter live in the footer at 10px, 40% opacity.** Always. No exceptions. It is the quiet watermark of authority.

---

## 3. Deck Typographic System

The deck uses a strict, narrow type system. Not every weight of Cinzel and Montserrat is available to every slide — the roles are fixed.

### Families
- **Display** — Cinzel 700, for slide headlines and hero numbers. Institutional, classical, architectural.
- **Body / UI** — Montserrat 300 / 400 / 500 / 600. For subheads, body, eyebrow, caption.
- **Mono** — JetBrains Mono 400 for slide counter and data labels only. Never body.

### Type Roles

| Role | Family | Weight | Size (desktop) | Tracking | Line-height | Color |
|---|---|---|---|---|---|---|
| **Eyebrow** | Montserrat | 500 | 11px | +0.24em | 1.0 | `#DF9F3E` |
| **Display XL** (hero numbers, cover) | Cinzel | 700 | 200px | -0.04em | 0.9 | `#FFFFFF` or `#DF9F3E` |
| **Display L** (slide headlines) | Cinzel | 700 | 96px | -0.03em | 1.0 | `#FFFFFF` |
| **Display M** (secondary headlines) | Cinzel | 600 | 64px | -0.02em | 1.05 | `#FFFFFF` |
| **Subhead** | Montserrat | 300 | 28px | -0.005em | 1.3 | `#BBBBBB` |
| **Body L** | Montserrat | 400 | 20px | 0 | 1.55 | `#BBBBBB` |
| **Body** | Montserrat | 400 | 16px | 0 | 1.6 | `#999999` |
| **Caption** | Montserrat | 500 | 12px | +0.06em | 1.4 | `#7A7A7A` |
| **Slide counter** | JetBrains Mono | 400 | 10px | +0.1em | 1 | `rgba(255,255,255,0.4)` |

### Typographic laws
- **Display L (headlines) always breaks intentionally into 2 or 3 lines.** The line break is a design decision, not browser accident. Use `<br>` explicitly.
- **Tracking is always negative on display sizes**, always positive on eyebrows/captions. This is how the deck signals hierarchy without color.
- **Numbers use Cinzel, not Montserrat.** The number 35.000 set in Cinzel 200px feels like engraving. In Montserrat it feels like a spreadsheet.
- **Mono is reserved for slide counters and data labels.** Do not use it as a stylistic flex.
- **No all-caps Cinzel bigger than 32px.** Cinzel is already uppercase-feeling; forcing actual uppercase at display sizes makes it read as a movie poster.

---

## 4. Palette of Moments — Three Slide Temperaments

The deck has three slide temperatures. Each slide in the storyboard must be categorized into one of them, and the categorization dictates its palette, density, and motion.

### Calm slides (narrative, setup, context)
- **Background**: `#091022` (Navy 900) — the deck default
- **Text**: white + `#BBBBBB` body
- **Accent**: a single 1px gold rule or a single gold dot. Maximum 1 gold element on screen.
- **Density**: low (25–40% coverage)
- **Motion**: slow reveals, 800–1200ms
- **Slides**: 1, 2, 4, 5, 7, 9, 10, 11, 12, 14, 15

### Impact slides (confrontation, pivot, anchor)
- **Background**: `#050B17` (Navy 950) — deeper, darker, the void
- **Text**: white display, no body copy, or body copy is <15 words total
- **Accent**: gold, but used architecturally — a single vertical or horizontal line, a single framing rule, a single luminous point
- **Density**: very low (15–25% coverage). These are the "breathe" slides.
- **Motion**: dramatic, 1400–2000ms, with a beat of stillness before the headline arrives
- **Slides**: 2 (opening confrontation), 3 (cemitério), 8 (anchor — product reveal), 16 (close)

### Number-hero slides (proof, price, credentials)
- **Background**: `#091022` with a subtle vignette toward `#050B17` at edges
- **Hero number**: Cinzel 200px+, white OR gold (see rules per slide)
- **Supporting text**: Montserrat 300, muted
- **Density**: the number IS the composition. Nothing competes.
- **Motion**: count-up for numeric values (see §8)
- **Slides**: 6 (credentials), 13 (investment)

---

## 5. Slide-by-Slide Storyboard

Every slide below follows the same card format: **[Temperament] — Layout — Protagonistas — Type treatment — Imagery/graphism — Motion in — Notes**.

Canvas: 1440 × 810 (16:9). All measurements are desktop; see §10 for mobile.

---

### SLIDE 1 — COVER

**Temperament**: Impact
**Layout**: Full-bleed, single-anchor centered composition. No grid compromise — this is the cinematic open.
**Protagonistas**: ZNITH wordmark + a single luminous point ("o cenit")
**Type treatment**:
- ZNITH wordmark in Cinzel 700, 72px, letter-spaced +0.32em, centered horizontally at 45% vertical (slightly above center).
- Above wordmark: eyebrow `— DIREÇÃO. CONSCIÊNCIA. LEGADO.` Montserrat 500 11px, gold, +0.32em tracking.
- Below wordmark: a 1px horizontal gold rule 120px wide, centered.
- Below rule: subhead `Arquitetura Comercial com Direção` Cinzel 400 italic 20px, white at 60% opacity.
- Bottom-right corner: `APRESENTAÇÃO ESTRATÉGICA / V2 / 04.2026` in JetBrains Mono 10px, white 30%, right-aligned.
**Imagery/graphism**: A single luminous dot, 4px diameter, positioned 8px above the `Z` of ZNITH — the cenit. Glowing at `rgba(223,159,62,0.6)` with a soft 16px radial bloom (NOT a drop shadow on text — a separate radial gradient div).
**Motion in**:
1. Navy background fades in from pure black — 600ms.
2. The cenit dot pulses in (scale 0→1, opacity 0→1) — 800ms, ease-out-expo, delay 400ms.
3. Wordmark fades in with a 12px upward translate — 1200ms, ease-out, delay 600ms.
4. Gold rule draws from center outward (`transform: scaleX(0→1)`, transform-origin center) — 1000ms, ease-out-expo, delay 1200ms.
5. Subhead and eyebrow fade in simultaneously — 600ms, delay 1800ms.
Total choreography: ~2.4s, ends in complete stillness.

**Notes**: No logo pulse, no background video, no particles. The cenit dot is the only moving thing in the final state — and it is still. Silence is the design.

---

### SLIDE 2 — "Sua empresa não está crescendo. Está se movimentando."

**Temperament**: Impact
**Layout**: **Editorial split (60/40)** — headline occupies left 60%, right 40% holds a small data visualization.
**Protagonistas**: The headline. The contrast chart is supporting.
**Type treatment**:
- Eyebrow top-left: `01 — O PROBLEMA QUE NINGUÉM NOMEIA`
- Headline (Display L, Cinzel 700, 88px, white, -0.03em tracking) breaks across three lines:
  `Sua empresa`
  `não está crescendo.`
  `Está se movimentando.`
  The word `movimentando.` in white at 50% opacity — so the sentence fades as it ends, visually echoing the feeling of drift.
**Imagery/graphism**: In the right column, a minimal line chart:
- Two lines on the same axis.
- Line A: jagged, serrated zigzag going up-and-down-and-up-and-down, in `#555555` (muted gray). Labeled below: `RECEITA MENSAL`.
- Line B: flat horizontal, in `#DF9F3E` 30% opacity, barely visible. Labeled below: `PREVISIBILIDADE`.
- Chart is rendered as inline SVG, no axes, no gridlines, no numbers. It is a gesture, not a chart.
- Chart occupies ~280px wide × 140px tall, right-aligned.
**Motion in**:
1. Previous slide exits (see §8 transitions).
2. Eyebrow fades in first — 400ms.
3. Headline lines reveal **one line at a time**, with a 200ms stagger, each line 600ms, ease-out-expo, upward translate 16px. The final word `movimentando.` arrives and then fades its opacity from 100→50% over 400ms, 600ms after it lands.
4. The chart lines draw in: serrated line first (1600ms, path length animation), then the flat gold line (800ms, delay 1600ms).
Total: ~3.0s.

**Notes**: The trick of the fading final word is the emotional payload of the slide. Do not skip it.

---

### SLIDE 3 — O Cemitério de Ferramentas

**Temperament**: Impact
**Layout**: Full-bleed. A sparse grid of 12 tool "ghosts" in 4 columns × 3 rows occupying the center 60% of canvas. Headline above.
**Protagonistas**: The headline. The grid of ghost-logos is scenography.
**Type treatment**:
- Eyebrow top-left: `02 — O INVENTÁRIO DO QUE NÃO FUNCIONOU`
- Headline (Display M, Cinzel 700, 56px, white, centered, 2 lines):
  `Você já tentou. CRM. Automação.`
  `Tráfego. Treinamento. Não funcionou.`
- The four nouns `CRM. Automação. Tráfego. Treinamento.` are rendered at 100% white; everything else at 65% white. This creates an inline emphasis without bolding.
- Body caption below grid, centered: `O problema nunca foi a ferramenta.` Cinzel 400 italic 18px, gold.
**Imagery/graphism**: 12 generic tool silhouettes (NOT real logos — legal risk and wrong vibe). Each silhouette is a custom SVG wordmark placeholder: a 80×28 rounded rectangle outline 1px in `#555555` containing a fake wordmark like `CRM+`, `FLOW`, `LEAD.io`, `PIPE`, `AUTO`, `TRACK`, `ADS`, `LEARN`, `CHAT`, `SEND`, `SYNC`, `HUB`. Each rectangle is at 25% opacity and slightly desaturated. They form a sparse, even grid with 40px gaps.
**Motion in**:
- Headline and eyebrow in (800ms, 300ms delay between eyebrow and headline).
- Grid items fade in with stagger: each cell 400ms, 60ms stagger between cells, total grid takes ~1100ms.
- Final caption fades in 400ms after grid completes.

**Notes**: Do not make the grid noisy with 30 items. 12 is the maximum; 9 is fine. The silhouettes must feel like fossils, not inventory.

---

### SLIDE 4 — O Diagnóstico Honesto

**Temperament**: Calm
**Layout**: **Editorial wide-center** — headline centered on column 3–10 (8 columns wide). Blueprint graphism fills the background at 12% opacity.
**Protagonistas**: The reframe headline.
**Type treatment**:
- Eyebrow top-left: `03 — O DIAGNÓSTICO`
- Headline (Display L 96px Cinzel 700, white), 2 lines:
  `O problema nunca foi a ferramenta.`
  `Foi a ausência de arquitetura.`
- The word `arquitetura.` is in `#DF9F3E` (gold). Everything else in white. This is the single gold word on this slide — no other gold element allowed.
**Imagery/graphism**: Background blueprint. A technical architectural diagram of an abstract "commercial operation" — isometric line art, 1px gold strokes at 12% opacity, showing geometric shapes connected by lines (think McKinsey org diagram meets Dieter Rams product exploded view). This is custom SVG, not generated. Lives behind text, does not compete.
**Motion in**:
- Blueprint draws in: stroke-dasharray path animation, 2000ms, ease-out. It is deliberately slow, because this is a "calm" slide.
- Headline arrives in two lines with 300ms stagger, each 700ms, ease-out, upward translate 12px.
- The gold word `arquitetura.` triggers a color transition FROM white TO gold, 600ms after the second line lands, 400ms transition ease-in-out.

**Notes**: The gold-word color change is the signature move of this slide. It must feel like a realization, not a button press.

---

### SLIDE 5 — O Que É Arquitetura Comercial

**Temperament**: Calm
**Layout**: **Left-aligned editorial, 2 columns (6-col / 6-col)**. Left: headline + subhead. Right: vertical layered diagram of the architecture stack.
**Protagonistas**: The diagram is the protagonist on this slide. Text is context.
**Type treatment**:
- Eyebrow top-left: `04 — DEFINIÇÃO`
- Left column headline (Display M 56px Cinzel 700, white, 3 lines):
  `Arquitetura comercial:`
  `a estrutura invisível`
  `que separa crescer de se esforçar.`
  The word `invisível` in gold.
- Below headline: 1px gold rule 80px wide, then body L subhead (Montserrat 300 20px, `#BBBBBB`, max-width 440px):
  `Cinco camadas. Uma ordem. Uma só direção.`
**Imagery/graphism**: Right column — a vertical stack of 5 thin horizontal plates, each labeled at right:
  `05 — IA APLICADA` (top — narrowest)
  `04 — CRM / DADOS`
  `03 — CADÊNCIA`
  `02 — PLAYBOOKS`
  `01 — ESTRATÉGIA` (bottom — widest)
Each plate is a 1px white outline rectangle, filled with `rgba(255,255,255,0.02)`. Plates are slightly trapezoidal — narrower toward the top — creating an architectural ziggurat/zenith silhouette. The top plate has a single gold point above it (the cenit).
Labels are in Montserrat 500 14px, white 70%, right-aligned, +0.1em tracking.
Plate numbering in JetBrains Mono 11px, gold, left of labels.
**Motion in**:
- Left column (eyebrow → headline → rule → subhead) reveals in sequence, 1800ms total.
- Right column plates build **from bottom up**: `01` first, then `02`, etc., 250ms stagger per plate, each plate fading in + translating down 8px into place, 500ms ease-out-expo.
- Cenit point pulses in last, 600ms delay after final plate.

**Notes**: The "building upward" of the ziggurat is the structural metaphor of the entire deck. Do not reverse it.

---

### SLIDE 6 — Quem Fala (Credentials / Number Hero)

**Temperament**: Number-hero
**Layout**: **Editorial portrait-left (4/8 split)**. Left 4 cols: portrait of Leilaine. Right 8 cols: three-line credentials block in Cinzel display.
**Protagonistas**: The numbers. The portrait is atmospheric.
**Type treatment**:
- Eyebrow top-right: `05 — AUTORIDADE`
- Right column — three stacked credentials, each as a Display M line:
  Line 1: `20+` (Cinzel 700 112px, gold) followed by `ANOS EM LIDERANÇA COMERCIAL` (Montserrat 500 14px, white 70%, +0.1em tracking, positioned as baseline suffix — not next line).
  Line 2: `R$ 500M+` (Cinzel 700 112px, gold) + `EM VENDAS INFLUENCIADAS` (same treatment).
  Line 3: `R$20M → R$80M` (Cinzel 700 88px, white) + `UMA EMPRESA ESCALADA POR LEILAINE` (same treatment).
- Between lines: 1px rule 60px wide `rgba(255,255,255,0.2)`.
- Bottom of right column: signature line `— LEILAINE CAMPIOTO / FOUNDER, ZNITH` Cinzel 400 italic 18px gold.
**Imagery/graphism**: Left column — editorial B&W portrait of Leilaine, full column width (4 cols ≈ 432px), aspect ratio portrait 3:4. The image is treated with a subtle navy duotone (`#091022` → `#BBBBBB`) so it sits within the palette. Image has a 1px gold hairline border on its right edge ONLY (not a full frame) — a vertical gold line separating image from credentials. Image has NO shadow, NO rounded corners, NO vignette.
**Motion in**:
- Portrait fades in from 0 → 100% opacity + 20px horizontal slide from left, 1000ms.
- Vertical gold hairline draws in top-to-bottom, 800ms, 400ms delay.
- Each credential line reveals sequentially: the number **counts up** (see §8 — count-up spec) over 900ms, then the suffix text fades in next to it 200ms before count-up ends.
- Stagger between credential lines: 600ms.
Total: ~4s — this is the longest choreography in the deck, intentionally, because authority needs breath.

**Notes**: If no portrait asset exists yet, use a placeholder navy block with a single gold frame line on right edge. Never use a silhouette or an avatar.

---

### SLIDE 7 — O Que Vem Antes

**Temperament**: Calm
**Layout**: Full-bleed, single centered headline + mark.
**Protagonistas**: A small architectural mark (a cenit/lens symbol) above the headline.
**Type treatment**:
- Eyebrow top-left: `06 — PRIMEIRO TOQUE`
- Subhead above headline: `O que vem antes de qualquer implantação` (Montserrat 300 24px, white 60%, centered).
- Headline Display L 120px Cinzel 700, centered, 1 line only: `A Leitura Estratégica.` The period in gold, everything else in white.
**Imagery/graphism**: Above the subhead, a 64×64px custom SVG mark: a downward-pointing triangle of 1px gold lines converging to a single gold point below it — representing "looking down from the zenith onto the operation." It is the most minimalistic mark in the entire deck.
**Motion in**:
- Mark draws in (triangle edges stroke animation, 1200ms).
- Subhead fades in (400ms, delay 800ms).
- Headline arrives with 12px upward translate, 900ms, delay 1200ms.
- Gold period "blinks" in last, scale 0→1 + opacity 0→1, 400ms, delay 2100ms.

**Notes**: This slide is a breath. It is the last quiet slide before the anchor.

---

### SLIDE 8 — ⭐ THE ANCHOR — ZNITH Consulting Expansão

**Temperament**: Impact (maximum)
**Layout**: **Full-bleed cinematic reveal.** Background goes to `#050B17` (deepest navy). This is the slide the whole deck has been climbing toward. It must feel like a product reveal.

This is the slide that must make the prospect stop breathing for half a second.

**Protagonistas**: The product lockup. Nothing else.
**Type treatment**:
- Eyebrow top-left: `07 — PRODUTO`
- Small line above the lockup, centered: `A entrada real pro trabalho com a ZNITH —` Cinzel 400 italic 20px, gold, centered.
- Product lockup, centered on slide:
  Line 1: `ZNITH` — Cinzel 700 144px, white, letter-spacing +0.12em.
  Line 2: `Consulting Expansão` — Cinzel 400 64px italic, gold, letter-spacing +0.02em.
- Below lockup: a 120px wide 1px gold rule, centered.
- Below rule: subhead `Arquitetura Comercial em 8 Semanas` Montserrat 300 22px white 80% +0.06em tracking.
**Imagery/graphism**:
- **Framing rule**: A single 1px gold rectangle frames the entire product lockup composition. Not the slide — just the lockup block. The rectangle is drawn 80px outward from the lockup bounding box. The top edge of the rectangle has a 16px gap centered at the top where the eyebrow passes through — making it feel like a cartouche or a museum label.
- **Ambient light**: A very subtle radial gradient behind the lockup, gold at `rgba(223,159,62,0.06)` center fading to transparent — 400px radius. This is the only "glow" in the entire deck and it is almost imperceptible.
- **The cenit point** returns here: a single 6px gold luminous dot positioned precisely above the `Z` of ZNITH, 24px above the cap line. Same bloom treatment as Slide 1 cover. The callback is intentional — this slide is "the cover for the product".
**Motion in (cinematic — ~4 seconds total)**:
1. Previous slide exits. Navy 950 background holds for **400ms of complete stillness** before anything arrives. This beat of silence is critical — do not skip it.
2. Ambient gold radial gradient fades in, 1200ms ease-out.
3. The frame rectangle draws in: top edge left→right, right edge top→bottom, bottom edge right→left, left edge bottom→top, each edge 400ms, sequenced — total 1600ms. It draws like a blueprint snapping into place.
4. Simultaneously with the frame completion, the lockup arrives: `ZNITH` line fades in with 16px upward translate, 1000ms ease-out-expo.
5. `Consulting Expansão` fades in with 12px upward translate, 800ms ease-out, delay 300ms after line 1.
6. Gold rule scales in from center (transform-origin: center, scaleX 0→1), 700ms, delay 400ms after Consulting Expansão.
7. Subhead fades in, 500ms, delay 300ms.
8. Cenit dot pulses in last, same as cover, 600ms, delay 400ms.
9. Eyebrow and top italic line fade in subtly in the background throughout steps 2–3.

**Notes**:
- This slide is the pitch in one frame. Everything before this was prologue; everything after this is specification.
- If Leilaine ever needs to present only one slide, this is the slide.
- Hold on this slide longer than others — give it an extra beat in live presentation.

---

### SLIDE 9 — O Que É (Em Uma Frase)

**Temperament**: Calm
**Layout**: Horizontal timeline occupying the center 8 columns. Headline above the timeline.
**Protagonistas**: The timeline. The 8 weeks rendered as a single horizontal line with 8 luminous points.
**Type treatment**:
- Eyebrow top-left: `08 — ESCOPO`
- Headline (Display M 56px Cinzel 700, white, centered) single line:
  `8 semanas. Diagnóstico. Arquitetura. Roadmap. Executável.`
  Each of the four nouns after "8 semanas" is separated by a period-space. The four nouns are in white; "8 semanas" is in gold.
**Imagery/graphism**: Below the headline, centered, a horizontal 1px white rule 960px wide. On the rule, 8 equally-spaced 6px circles (gold outline, navy fill). Above each circle, a tiny label `S1 / S2 / ... / S8` in JetBrains Mono 10px, white 50%.
**Motion in**:
- Headline arrives, 800ms.
- Timeline rule draws left→right, 1400ms ease-out-expo.
- The 8 circles pop in sequentially, 120ms stagger, each 300ms scale 0→1.
- Week labels fade in underneath, 200ms after last circle.

**Notes**: Don't over-decorate the timeline. It is a rule with dots. That is the composition.

---

### SLIDE 10 — As 8 Semanas (Cronograma)

**Temperament**: Calm
**Layout**: **12-col dense editorial** — a 4-phase timetable table. Full width.
**Protagonistas**: The table/timeline itself — a structured 2D block that rewards reading.
**Type treatment**:
- Eyebrow top-left: `09 — CRONOGRAMA`
- Headline (Display M 56px Cinzel 700, white) left-aligned, 1 line: `As 8 semanas, dia a dia.`
- Table: 4 columns, one per phase.
  Column headers (JetBrains Mono 11px gold +0.12em tracking, top-aligned): `FASE 01 / COLETA` / `FASE 02 / DIAGNÓSTICO` / `FASE 03 / DESENHO` / `FASE 04 / PLANO`
  Week labels under each: `S1` / `S2—S3` / `S4—S5` / `S6—S7—S8`
  Under week labels: 3–4 line description in Montserrat 400 14px white 75% line-height 1.6.
- 1px rule `rgba(255,255,255,0.1)` separating each column, top to bottom, ONLY between columns (not outer borders).
**Imagery/graphism**: No separate imagery. Above the table, a 1px gold rule 1248px wide (full table width) with a small gold dot at position 12% (kickoff), 37% (diagnosis peak), 62% (architecture draft), 87% (delivery). This rule acts as a "progress bar" of the phases and anchors the table.
**Motion in**:
- Headline 700ms.
- Top gold rule draws in 1400ms. Dots pulse in sequentially 100ms stagger.
- Column contents reveal left-to-right: each column fades in + 8px upward, 500ms, 200ms stagger.

**Notes**: This is the densest slide of the deck. It is OK. Density rewards the analytical buyer. But every word in the descriptions must earn its place.

---

### SLIDE 11 — The Caderno (Object Reveal)

**Temperament**: Impact
**Layout**: **Split 7/5** — left 7 cols: mockup of the Caderno as a physical object; right 5 cols: headline + caption.
**Protagonistas**: The mockup of the Caderno. It is treated as a luxury object, not a document.
**Type treatment**:
- Eyebrow top-right (right column): `10 — O ENTREGÁVEL CENTRAL`
- Headline (Display M 64px Cinzel 700, white, right-aligned, 2 lines):
  `Caderno de`
  `Arquitetura Comercial.`
  The word `Comercial.` in gold.
- Below headline: 1px gold rule 80px, right-aligned.
- Caption (Montserrat 300 18px white 70% line-height 1.5 max-width 360px, right-aligned):
  `Um objeto. Não um PDF. Editado, impresso, entregue. O artefato estratégico que a liderança leva à reunião de sócios.`
**Imagery/graphism**: Mockup of the Caderno as an editorial object:
- A closed book rendered in 3/4 perspective, navy cover with gold spine detail.
- On the cover (visible through the 3/4 angle): the ZNITH wordmark embossed in gold (Cinzel 28px) + a thin gold rule + the words `ARQUITETURA COMERCIAL / EDIÇÃO DO CLIENTE` in small caps.
- Subtle shadow cast behind it (single soft drop shadow, navy 40%, 40px blur, 20px offset down-right) — this is the ONE drop shadow allowed in the deck, because it's on a physical object, not UI.
- Render via CSS 3D transform + layered divs, OR as an SVG/PNG asset. Do not use a stock book mockup generator — it will look fake.
- The object sits on an invisible "shelf" — a 1px gold rule 400px wide under the base of the book, at the book's bottom edge, implying surface without drawing one.
**Motion in**:
- Eyebrow → headline → rule → caption sequence on right column (1800ms total).
- Caderno: enters from below with upward translate 40px + fade in, 1200ms ease-out-expo, delay 400ms.
- The shelf gold rule draws in left→right 800ms AFTER Caderno lands.

**Notes**: If the team does not have budget for a custom 3D render, use a flat 2D editorial treatment: a navy rectangle with proper proportions (1.414 aspect ratio — A-series) and typographic cover treatment. Flat and elegant beats 3D and cheap.

---

### SLIDE 12 — O Que Você Vai Ter (Deliverables)

**Temperament**: Calm
**Layout**: **Left-headline / right-numbered-list** (5/7 split).
**Protagonistas**: The list — seven deliverables, numbered 01–07.
**Type treatment**:
- Eyebrow top-left: `11 — ENTREGÁVEIS`
- Left column headline (Display M 56px Cinzel 700, white, 2 lines):
  `Não é um PDF.`
  `É uma decisão documentada.`
- Right column: 7 items, each:
  - Number prefix (JetBrains Mono 14px gold): `01 —` `02 —` `03 —` etc.
  - Item title (Cinzel 400 22px white, +0.01em tracking): `Diagnóstico Comercial Profundo` / `Desenho de Arquitetura Customizada` / `Caderno de Arquitetura Comercial` / `Playbooks Comerciais Base (3–5)` / `Roadmap de Implantação Priorizado` / `Recomendação de IA Aplicável` / `Apresentação Executiva à Liderança`
  - 1px rule `rgba(255,255,255,0.08)` 100% width below each item except last.
- No descriptions. No body copy. Just titles. The absence of description is the design.
**Imagery/graphism**: None. This slide is pure typography.
**Motion in**:
- Headline 800ms.
- Right-column items reveal top-to-bottom: each fades in + 6px upward, 400ms, 120ms stagger.

**Notes**: The temptation will be to add icons or descriptions. Do not.

---

### SLIDE 13 — Investment (Number Hero)

**Temperament**: Number-hero
**Layout**: **Full-bleed vertical center**. Single dominant number, minimal supporting text.
**Protagonistas**: The number `R$35.000` as an engraved object.
**Type treatment**:
- Eyebrow top-left: `12 — INVESTIMENTO`
- Above the number: `INVESTIMENTO` Montserrat 500 12px gold +0.32em tracking centered.
- **The number**: `R$ 35.000` Cinzel 700 **240px** white, centered, letter-spacing -0.04em. This is the largest single element in the entire deck.
- Below the number: a 200px 1px gold rule, centered.
- Below the rule: `8 semanas — Prazo fechado — Garantia de Arquitetura Implantável` Cinzel 400 italic 22px gold 80% centered.
- Bottom-right corner: a small seal — a 72×72px circle outlined 1px gold with the text `GARANTIA / ZNITH` inscribed as curved text around the inner edge, and a tiny gold zenith mark in the center.
**Imagery/graphism**: The seal is the only ornament. It functions as a notary stamp.
**Motion in**:
- Eyebrow + label fade in, 600ms.
- The number **counts up** from `R$ 0` to `R$ 35.000` over 1400ms, ease-out-expo — see §8 count-up spec. During the count-up, the number translates upward 20px as it counts, settling into place.
- Gold rule scales in from center, 800ms, delay 400ms after count.
- Subhead fades in, 500ms, delay 300ms.
- Seal in bottom-right draws in last: circle stroke animation 800ms, inner mark pulses 400ms after.

**Notes**: The count-up must NOT feel like a slot machine. It must feel like a carving being revealed. Slow, heavy, final.

---

### SLIDE 14 — Three Paths (Post-Consultoria)

**Temperament**: Calm
**Layout**: **3 equal columns (4/4/4)**, each representing one implementation path.
**Protagonistas**: The structural equivalence. The three columns must read as **equal** — no visual hierarchy between them. This honesty is the design.
**Type treatment**:
- Eyebrow top-left: `13 — CAMINHOS DE IMPLANTAÇÃO`
- Headline above columns (Display M 48px Cinzel 700, white, centered, 1 line):
  `Semana 8: três caminhos. Honestamente apresentados.`
- Each column:
  - Header label (JetBrains Mono 11px gold +0.12em): `OPÇÃO A` / `OPÇÃO B` / `OPÇÃO C`
  - Product name (Cinzel 700 32px white): `ZNITH.AI OS` / `Consulting Receita` / `Execução Interna`
  - 1px gold rule 40px wide.
  - Description (Montserrat 300 15px white 70% line-height 1.6 max ~45 words).
  - No CTA, no button, no "recommended" badge. All three are equal.
- Vertical 1px `rgba(255,255,255,0.08)` rules between columns.
**Imagery/graphism**: None. Honesty is the graphism.
**Motion in**:
- Headline 800ms.
- All three columns reveal **simultaneously** (not staggered) — 700ms fade + upward 8px. The simultaneous reveal is intentional: no column "wins."

**Notes**: If any team member wants to "highlight Option A because it's the upsell," block it. The whole point of this slide, per the strategy, is that equality is the sales tactic.

---

### SLIDE 15 — Qualification (Is This For You)

**Temperament**: Calm
**Layout**: **Split 6/6, two-column list**. Left: "É para quem". Right: "Não é para quem".
**Protagonistas**: The contrast of the two lists. The NOT column is the louder one.
**Type treatment**:
- Eyebrow top-left: `14 — FILTRO`
- Headline above columns (Display M 48px Cinzel 700, white, left-aligned, 2 lines):
  `Não é pra qualquer empresa.`
  `É pra quem já vende e quer estruturar.`
- Left column header (Cinzel 600 20px gold +0.1em tracking): `É PARA QUEM —`
- Left column list: 4–5 items, each as a single line Cinzel 400 20px white.
- Right column header (Cinzel 600 20px white 40% +0.1em tracking): `NÃO É PARA QUEM —`
- Right column list: 4–5 items, each as a single line Cinzel 400 20px white **50% opacity**, with a 1px gold rule struck through each item (text-decoration: line-through, decoration-color gold).
**Imagery/graphism**: None.
**Motion in**:
- Headline 800ms.
- Left column items fade in + 6px up, 400ms, 100ms stagger.
- Right column items reveal with a **strike-through animation**: each item appears first at full opacity, then the gold line draws across left-to-right (500ms), and opacity drops to 50% as the line completes. 150ms stagger between items. This is the signature move of the slide.

**Notes**: The strike-through animation is the slide's moment. It physically "rejects" the wrong prospect on screen.

---

### SLIDE 16 — Close (Single CTA)

**Temperament**: Impact
**Layout**: Full-bleed, single anchor center composition. Background to pure `#050B17`. This is the mirror of the cover.
**Protagonistas**: A single CTA block.
**Type treatment**:
- Eyebrow top center: `— PRÓXIMO PASSO —` Montserrat 500 11px gold +0.32em.
- Headline (Display L 88px Cinzel 700, white, centered, 1 line):
  `Leitura Estratégica.`
- Subhead (Montserrat 300 28px white 70%, centered, 1 line):
  `45 minutos. Com a Leilaine. Sem custo.`
- 1px gold rule 120px, centered.
- CTA button: a 320×64 outlined rectangle, 1px gold border, transparent fill, Cinzel 600 18px gold centered label `AGENDAR A LEITURA ESTRATÉGICA`, +0.12em tracking. On hover: fill animates to `rgba(223,159,62,0.08)`, border opacity 100%, text translates 2px right. Never fill solid gold.
- Below CTA: tiny footer `zenith.com.br/leitura` Montserrat 400 12px white 40%.
- Bottom center: the cenit gold dot again, 4px + bloom, placed 80px below the URL. Third and final callback to the cover.
**Motion in**:
1. 500ms beat of stillness (the slide holds dark before anything arrives).
2. Eyebrow fades in, 400ms.
3. Headline arrives with 12px upward translate, 900ms, ease-out-expo.
4. Subhead fades in, 600ms, delay 400ms.
5. Gold rule scales from center, 700ms.
6. CTA fades in + 8px upward, 600ms.
7. Cenit dot pulses in last, 800ms delay.

**Notes**: This is the only slide in the deck where a CTA button exists. The deck earned the right to ask for the action precisely because every prior slide refused to.

---

## 6. The Anchor Slide (Slide 8) — Why It Matters

Slide 8 is not just the product reveal. It is the slide the entire deck is architecturally built toward. Every prior slide is a setup for this frame. Every subsequent slide is a specification of what this frame promised.

The slide must be treated as a **product unveiling**, not a page. Specifically:

1. **It gets the longest time budget.** If the whole deck's motion runs ~45 seconds of choreography total, Slide 8 alone should own 4 seconds of it. That proportion is correct.
2. **The silence before it matters more than the animation.** The 400ms beat of black before anything arrives is the single most important timing decision in the deck. It is the design equivalent of a presenter pausing before naming the product. Do not compress it.
3. **Three visual elements must simultaneously coexist**: the framing rectangle (architectural language), the lockup (product), and the cenit dot (brand callback). Three is the maximum. Anything else is noise.
4. **It is a photograph, not a poster.** The goal is that if a prospect screenshot this slide and sent it to a colleague, the colleague would believe it came from a real product launch, not a consulting proposal.
5. **Reference**: the first reveal slide of an Apple product announcement (AirPods Max 2020 reveal, Mac Studio 2022 reveal) — dark background, product object centered, typographic restraint, single gold/chrome accent, absolute stillness after motion ends.

---

## 7. Cover & Close — The Bookends

Slides 1 and 16 are mirrors of each other, and they hold the deck closed.

### Shared bookend language:
- Both use the darkest navy (`#050B17`).
- Both feature the cenit gold dot (signature brand element).
- Both use a 120px horizontal gold rule, centered.
- Both have ~400ms of absolute stillness at the start (the beat of silence).
- Both end in stillness — no idle animations, no pulse loops.
- Both use Cinzel at display scale.

### Difference between cover and close:
- **Cover (S1)** asserts identity. It is the brand signing itself. No action requested.
- **Close (S16)** asks for action. It is the only slide in the deck with a CTA button. The CTA is soft — an outlined rectangle, never a filled button.

### Cinematic device: the three cenit dots
The gold cenit dot appears exactly **three times** in the entire deck:
1. Slide 1 (cover) — the brand announces itself.
2. Slide 8 (anchor) — the product inherits the brand.
3. Slide 16 (close) — the callback closes the loop.

No other slide may use the cenit dot. This scarcity is the whole point — the dot becomes a recognizable signature across the deck without ever being decorative.

---

## 8. Motion System

### 8.1 Global easing curves
Define as CSS custom properties and use consistently:
```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-cubic: cubic-bezier(0.65, 0, 0.35, 1);
--ease-architectural: cubic-bezier(0.22, 1, 0.36, 1);
```
`--ease-out-expo` is the deck's default — it creates the "arrives with authority, then settles" feel. Use it for 80% of motion.

### 8.2 Slide transitions (between slides)
**NOT fade.** Fade-to-fade is the hallmark of amateur decks.

The deck uses a **horizontal-parallax layered transition**:
1. Outgoing slide: all elements translate left by `-60px` (not the whole slide — per-element, with slight stagger 30ms), opacity to 0. Duration 500ms, `--ease-in-out-cubic`.
2. Background hold: the navy background does NOT animate. It stays. The background is the stage; only the content on it changes.
3. Incoming slide: 200ms of stillness (empty stage).
4. Incoming elements enter per their slide's choreography (see §5).

This creates the sense that the slides are layers sliding across a fixed architectural stage — not pages flipping. The background stillness is the institutional signature.

### 8.3 Count-up numbers (S6, S13)
Custom JS function, NOT a library:
```
- Easing: ease-out-expo
- Duration: 900–1400ms depending on target number magnitude
- Formatting: live — use Intl.NumberFormat('pt-BR') so "R$ 35.000" formats correctly during the count
- Starting value: 0
- For R$ values, "R$" prefix is static (not counting)
- During count, the text has a subtle 4px downward motion blur-equivalent: use a slight translateY oscillation or skip
- When final value lands, trigger a 200ms opacity pulse (100% → 85% → 100%) — the "settling" beat
```

### 8.4 Path drawing (blueprint, rules, frames)
For every SVG line, rule, or frame:
```
- stroke-dasharray = path length
- stroke-dashoffset animates from path length → 0
- Duration 800–1600ms depending on length
- Easing: --ease-out-expo
- Never start multiple paths simultaneously — always stagger by 100ms minimum for layered effect
```

### 8.5 Scroll-reveal in navigable deck mode
If the deck also supports scroll navigation (not just keyboard ←/→), use IntersectionObserver with `threshold: 0.6` to trigger slide-entry choreography when a slide enters viewport. The choreography is identical to keyboard-triggered entry.

### 8.6 Hover micro-interactions
- CTA button (S16): border opacity 70%→100%, background rgba gold 0→0.08, text translate 0→2px right, 200ms ease-out. No scale, no shadow.
- All other elements: no hover. The deck is a document, not an app.

### 8.7 Reduced motion
Respect `prefers-reduced-motion: reduce`:
- All stagger → 0
- All translate → 0
- Fades compressed to 200ms
- Count-ups become instant with a 200ms fade-in
- Path drawing becomes instant reveal with 200ms fade

### 8.8 Total choreography budget per slide
Target: 1.8–2.5s per slide (calm), 3–4.5s per slide (impact). S8 is the only slide allowed to exceed 4s.

---

## 9. Visual References (5–8 Named Precedents)

These are the visual precedents the design-agent and dev-agent should study before execution.

### 1. Apple Mac Studio reveal (March 2022 event)
- **Take**: the anchor-slide pacing. Dark background hold, then the product appears with silence around it. The restraint of using only one accent element.
- **Apply to**: Slide 8 anchor specifically, plus Slide 1 cover and Slide 16 close.

### 2. Stripe Sessions 2022 stage design (and their press kit typography)
- **Take**: the editorial tension between a serif display and a neutral sans body. The use of a small eyebrow above every content module. The mono used only for data, never for flex.
- **Apply to**: The entire typographic system. The eyebrow pattern comes straight from Stripe's visual identity playbook.

### 3. Linear launch posts / Linear.app marketing site (2023 releases)
- **Take**: pace of content reveal. One idea per viewport. Every section has generous silence. Never more than 3 visual elements simultaneously active.
- **Apply to**: Slide density rules (§2 rule #5 — max 55% painted) and the principle of "one idea per slide."

### 4. Porsche Configurator — dark theme (911 model pages)
- **Take**: the treatment of objects (cars) as hero subjects in empty dark space, with a single accent light and typographic restraint. Also: the use of a subtle vignette instead of hard backgrounds.
- **Apply to**: Slide 11 (Caderno object reveal). The Caderno should be photographed/rendered the way Porsche photographs a 911 at night.

### 5. McKinsey Executive Summary PDFs (internal client decks, leaked and public samples)
- **Take**: dense typographic structure without feeling cluttered. Numbered hierarchies. Serif headlines + sans body. Zero ornament. The feeling that "this document cost someone R$500K to produce."
- **Apply to**: Slide 10 (cronograma table), Slide 12 (deliverables list), Slide 14 (three paths). Density is allowed when it is structured.

### 6. The Economist print editorial (daily print, specifically full-page features)
- **Take**: the editorial split layouts (60/40, 7/5), the use of thin 1px rules to define columns, the refusal to fill page with color.
- **Apply to**: Slides 2, 5, 6, 11 — every split-layout slide.

### 7. Aesop brand campaigns (web + print, 2023–2024)
- **Take**: the tone of silent confidence. The use of restraint as a branding strategy. The refusal to show off.
- **Apply to**: the overall tonality. When in doubt on a decision, ask "would Aesop do this?" If no, don't.

### 8. Cartier "Love Bracelet" campaign (2023 refresh)
- **Take**: how legacy brands treat gold as a ceremonial material, not a decoration. Gold appears precisely where authority lives, and nowhere else.
- **Apply to**: Every gold usage decision in the deck. The 15% max gold coverage rule comes from this principle.

---

## 10. Mobile Version

The deck is designed for 1440×810 desktop. Mobile is a preserved version, not a degraded one.

### Breakpoint: 375–767px (mobile portrait)
- Canvas becomes 375 × 812 (portrait).
- 12-col grid collapses to 4-col.
- All split layouts (60/40, 5/7, 4/8) stack vertically — image/diagram on top, text below — except:
  - **Slide 8 anchor**: stays as a centered lockup, resized. The framing rectangle becomes 24px outward (not 80px). The lockup scales down proportionally.
  - **Slide 1 cover** and **Slide 16 close**: stay centered, proportionally scaled.
- Display XL (S13 number) scales from 240px → 96px but remains the largest element on slide.
- Display L scales from 96px → 56px.
- Body scales from 16–20px → 14–16px.
- All motion durations shortened by 30% for mobile to account for faster perceived scroll.

### Navigation on mobile:
- Swipe left/right to advance slides.
- A thin bottom progress rule (1px gold) fills left-to-right as the user advances.
- No bottom nav buttons — they break the editorial feel.

### Slides that require special mobile treatment:
- **S10 cronograma**: the 4-column table becomes a vertical accordion. Each phase is a collapsible section. Default open: Phase 01.
- **S14 three paths**: the 3 columns become 3 vertically stacked blocks, separated by 1px gold rules.
- **S15 qualification**: the 2-column contrast becomes stacked — "É para quem" first, "Não é para quem" below, with the gold strikethrough animation preserved.

---

## 11. Output Specification (for dev-agent)

### Technology stack
- **Standalone HTML deck** — single `.html` file with inlined CSS and JS where possible.
- **No framework dependency.** Vanilla HTML/CSS/JS. No React, no Vue, no Astro for this deliverable. This keeps the deck portable, fast, and offline-capable.
- **Fonts**: Google Fonts CDN for Cinzel, Montserrat, JetBrains Mono. Preload critical weights.
- **SVG**: all diagrams, marks, and graphism as inline SVG in the HTML (not separate files) — guarantees no asset-fetch failures.
- **Images**: Leilaine portrait, Caderno mockup — as optimized WebP with JPEG fallback, inlined via base64 for < 100KB assets, externally hosted if larger.

### Navigation
- Keyboard: `←` / `→` advance slides. `Esc` shows overview grid. `F` toggles fullscreen.
- Mouse: click-zones on left/right thirds of screen advance back/forward.
- Touch/mobile: swipe left/right.
- Deep-linking: URL hash `#/slide/N` — reload on slide N loads correctly.

### PDF export
- A "Print to PDF" mode triggered by `?print=1` URL param.
- Print CSS: each slide becomes a landscape A4 page, all motion stripped, all content instantly visible in final state.
- Page size: 297 × 210mm (A4 landscape).
- Print mode must render server-side-safe (no motion dependency).

### Responsive
- Mobile (375–767): as specified §10.
- Tablet (768–1279): scale desktop canvas proportionally, maintain split layouts.
- Desktop (1280+): full spec.
- Large (1920+): canvas caps at 1600px wide, centered, with navy padding around it — never stretches beyond.

### Performance budget
- First paint < 1.2s on 4G.
- Total bundle < 400KB (excluding fonts, which are CDN).
- Lighthouse: 90+ performance, 100 accessibility.

### Deployment
- **Vercel**. Deploy target: `znith-deck-v2.vercel.app` (or client-preferred custom subdomain).
- `vercel.json` with correct headers (Cache-Control, font preload).
- Deploy triggered by push to main on dev branch; production deploy manual.

### Accessibility
- All text maintains 4.5:1 contrast on navy (gold at `#DF9F3E` on `#091022` = 5.8:1 ✓; white on navy = 18:1 ✓).
- All animations respect `prefers-reduced-motion`.
- All interactive elements (slide nav, CTA) reachable via keyboard, with visible focus states (1px gold outline).
- Slide headings use proper semantic `<h1>` (slide headline) and `<h2>` (subheads) so screen readers can navigate.
- ARIA: slide container has `role="region"` and `aria-label="Slide N of 16: {title}"`.

---

## 12. Notes for Designer Agent

- **Before touching Figma**, read this brief end-to-end and the design system. The design system tokens are non-negotiable — all colors, all type sizes, all easings must derive from them.
- **Start with Slide 8.** Design the anchor slide first. Once the anchor lands, the rest of the deck inherits its visual language. Designing linearly (S1 → S16) produces inconsistency.
- **Second priority**: S1, S16 bookends. Lock the cover/close language before designing interior slides.
- **Third priority**: the three number-hero slides (S6, S13) because they test the type system under the hardest constraint.
- **Then**: calm slides in order.
- **Deliver Figma frames at 1440×810** with a "desktop" and "mobile (375×812)" variant per slide. Total: 32 frames.
- **Label every frame**: `S{N} — {Temperament} — {Title}`.
- **Do not propose alternative color palettes.** The palette is locked by the design system. Gold is `#DF9F3E`. Navy is `#091022`. Darkest is `#050B17`. That is it.
- **Do not propose alternative type pairings.** Cinzel + Montserrat + JetBrains Mono. Locked.

---

## 13. Notes for Dev Agent

- **Build as 16 HTML sections inside a single file**, one section per slide, with a state machine in JS that controls which slide is active.
- **Use CSS custom properties** for every token — colors, type sizes, easings, durations. Reference the design system CSS variables directly.
- **Use `requestAnimationFrame`** for the count-up animations (S6, S13). Do not use setInterval.
- **Use IntersectionObserver** for scroll-triggered reveal IF scroll mode is enabled; otherwise use a simple "active slide" class toggle that triggers CSS animations.
- **All animations as CSS keyframes + `animation-delay`**, not JS-driven. JS only orchestrates the "active slide" class. This keeps the motion code clean and the paint work on the GPU.
- **No animation libraries.** No GSAP, no Framer Motion, no Anime.js. Vanilla CSS + vanilla JS only.
- **SVG path animations**: precalculate `stroke-dasharray` and `stroke-dashoffset` in CSS or via a small JS helper that measures `getTotalLength()` on load.
- **Test the deck on**: 1440×900 Retina, 1920×1080 non-retina, 375×812 iPhone, and a projector (1280×720). The projector test matters — clients will present this on low-res projectors.
- **Critical**: the 400ms beat of silence on Slide 8 must NOT be optimized away. It is the emotional payload of the deck. If reduced-motion is active, it collapses to 100ms but does not disappear.

---

## 14. Definition of Done

The deck ships when all of the following are true:

1. 16 slides match this brief's specification exactly.
2. Desktop (1440×810) and mobile (375×812) both render correctly at final state and during motion.
3. Keyboard nav (← → Esc F) works, touch nav works, URL hash deep-linking works.
4. `?print=1` produces a clean PDF via browser print-to-PDF with all 16 slides on individual A4 landscape pages.
5. All anti-amador rules (§2) are satisfied — a senior creative director can review any slide in isolation and not find a violation.
6. Slide 8 stops a viewer's breath. If it doesn't, it's not done.
7. Deployed to Vercel with a stable public URL.
8. Lighthouse ≥ 90 performance, 100 accessibility, 0 console errors.
9. Reduced-motion variant verified.
10. Leilaine's review: "This looks like a McKinsey deck from 2027."

---

## 15. What This Brief Refuses

For clarity on what is NOT in scope and will not be approved:

- Any pricing table, tier card, or comparison grid.
- Any emoji anywhere in the deck.
- Any stock photography or AI-generated imagery of people, offices, or concepts.
- Any generic icon library usage (Feather, Heroicons, Lucide, FontAwesome). Custom SVG only.
- Any "AI-style" hero visuals (neon gradients, cyber grids, particle fields, glowing orbs).
- Any drop shadow on text or UI.
- Any gradient on text.
- Any animated background (no video, no canvas, no particle systems).
- Any "scroll-jacking" effects. Scroll is smooth or non-existent.
- Any chess/gold/crown/royal iconography (prohibited by parent project rules).
- Any "Made with [tool]" watermark.
- Any reference to "Tempo é Rei", H1-B hourglass, Z7, or Reis IA brand elements. This is ZNITH, not Reis IA.

---

## CHANGELOG

- [2026-04-13] v1.0 — Initial creative brief. 16-slide deck spec produced from planning doc §9 storyboard, design system, and company concept. Ready for designer-agent + dev-agent consumption.
