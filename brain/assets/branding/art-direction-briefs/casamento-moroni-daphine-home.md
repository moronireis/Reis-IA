# ART DIRECTION BRIEF: Casamento Moroni & Daphine — Home Page

Last updated: 2026-04-15
Art Director: art-director
Project: Site de casamento Moroni Reis × Daphine Oliveira (12 de junho)
Repo: `/Users/moronireis/Projetos vscode/moroniedaphine/`
Voice profile: `.claude/voice-profiles/moroni-daphine-wedding.md`
Mood report: `brain/design-library/mood-reports/casamento-moroni-daphine/wedding-romantic-burgundy.md`
Hero skeleton: `brain/design-library/hero-prompts/moroni-daphine-skeleton.md`

> **Project Context Override**: This brief IGNORES REIS [IA] brand DNA. No electric blue, no architectural brutalism, no cold-within-cold. This is warm-within-warm. Gold is required. Serifa display is required. Dark mode burgundy is the hero mode.

---

## 1. CONCEPT & VISION

**Vision statement**
Um convite de papel grosso que virou site — a calor de uma sala onde as velas acabaram de ser acesas, revelado lentamente, como quem abre um envelope lacrado à cera.

**Narrative arc**
- **Entry state**: silêncio. Borgonha profundo preenchendo a tela inteira, monograma M&D em gold leaf flickering sob filtro de turbulência, nomes surgindo em fade lento.
- **Transformation**: o site abre para creme. A luz fica legível. A história é contada em tipografia serifa grande, dois blocos assimétricos, imagens como protagonistas editoriais, não como decoração.
- **Resolution**: volta para borgonha no rodapé. A página fecha com a mesma reverência que abriu. O leitor sai com a sensação de que foi convidado, não notificado.

**Reference stack** (all from the mood report, cited by ref number)
1. **Valentino Beauty (Ref #05)** — borgonha como FUNDO do hero, não como acento. Inverte a lógica "cor sobre branco". Âncora do modo escuro.
2. **Magnolia Rouge Bordeaux Feature (Ref #02)** — começar a narrativa com DETALHE (aliança, flor, convite), não com foto de casal. Controle cinematográfico da história.
3. **Ralph Lauren Romance (Ref #07)** — overlay radial gold 8% fabrica a "hora dourada" sobre toda fotografia. Temperatura unificada em toda a página.
4. **Tom Ford Beauty (Ref #24)** — parallax com ratio 0.15 (não 0.5). Velocidade de luxo.
5. **Chateau Pichon Baron (Ref #08)** — navegação minimal em background borgonha, underline gold 1px ao hover. Lê como château privado.

---

## 2. TYPOGRAPHY SYSTEM

### Display pair (3 voices, 2 famílias + 1 script ornamental)

| Family | Weight | Role | Uses per page |
|---|---|---|---|
| **Cormorant Garamond** (Google Fonts) | 300, 300i, 400, 400i | Coluna vertebral — todos os H1, H2, H3, lede, corpo de história | unlimited |
| **Great Vibes** (Google Fonts) | 400 | Monograma M&D — script ornamental | **max 2 usos na página inteira** (hero + footer) |
| **Inter** (Google Fonts) | 300, 400 | UI/meta ONLY — labels de cronograma, datas ISO, botões, footer meta | apenas funcional |

**Pesos acima de Cormorant 400 são proibidos**. O tipo perde elegância em Medium/SemiBold/Bold. 300 para display/H1, 400 para corpo e H2-H3. Italic (300i/400i) como terceira voz — subheadings, citações, legendas de galeria.

### Text scale (com clamp() ranges — adaptada para display serif)

| Step | Desktop | Mobile | Clamp | Tracking | Leading | Weight |
|---|---|---|---|---|---|---|
| Monograma script | 18vw | 36vw | `clamp(144px, 18vw, 280px)` | 0 (script is self-tracked) | 0.9 | Great Vibes 400 |
| H1 display | 10-14vw | 16vw | `clamp(64px, 12vw, 200px)` | +0.02em | 1.1 | Cormorant 300 |
| H2 section | 6-8vw | 10vw | `clamp(44px, 7vw, 112px)` | +0.02em | 1.15 | Cormorant 300 |
| H3 | 3-4vw | 6vw | `clamp(28px, 3.5vw, 56px)` | +0.03em | 1.2 | Cormorant 400 or 400i |
| Lede (story open) | 22-26px | 20px | `clamp(20px, 1.6vw, 26px)` | +0.01em | 1.6 | Cormorant 400i |
| Body (story) | 18-20px | 17px | `clamp(17px, 1.3vw, 20px)` | 0 | 1.75 | Cormorant 400 |
| Meta label (UI) | 12-13px | 12px | `clamp(11px, 0.85vw, 13px)` | **+0.18em** UPPERCASE | 1.4 | Inter 400 |
| Caption | 13-14px | 12px | `clamp(12px, 0.95vw, 14px)` | +0.02em | 1.5 | Cormorant 400i |

**Modular scale**: non-modular editorial jumps. The leap from body 20px to H3 56px to H2 112px to H1 200px is intentional — it is the "either monumental or micro, never in the middle" Playfair rule (mood report Ref #18), applied to Cormorant.

### Tracking (letter-spacing)
- Display serif (H1/H2/H3): **+0.02em to +0.04em** — serifa display pede tracking positivo, não negativo. This is the OPPOSITE of the REIS Inter-negative-tracking rule.
- Body Cormorant: 0em
- Inter meta UPPERCASE: **+0.18em** — wide-tracked caps are the luxury-whisper move (mood report Ref #14, Letterform Archive).
- Inter regular (rare): 0em
- Great Vibes monograma: 0em (script handles its own spacing)

### Leading (line-height)
- Monograma: 0.9
- H1 display: 1.1
- H2/H3: 1.15 to 1.2
- Lede italic: 1.6 (generous — italic reads slower)
- Body: **1.75** (longer than REIS 1.5 — serif body at warm color pair NEEDS air to breathe)
- UI Inter: 1.4

### OpenType features (declare explicitly)
- `liga` on (standard ligatures — Cormorant has beautiful fi, fl, ffi)
- `dlig` on for display H1 ONLY (discretionary ligatures: ct, st — these are signature romantic serif moves)
- `onum` on for body (old-style figures — 1234 with varying heights, reads historical)
- `lnum` on for UI Inter (lining figures — dates and times need even baseline)
- `tnum` on for cronograma table (tabular figures — times align vertically)
- `calt` on
- `smcp` (small caps) for Cormorant meta-labels when used in place of Inter UPPERCASE
- `kern` on (default but declare it)

### Responsive behavior
- **390px (mobile)**: H1 stays monumental (takes 3-4 lines, that is the point — mood report Ref #06 Dior rule). Body scales DOWN to 17px but leading HOLDS at 1.75. Parallax DISABLED on touch (mood report Receita 3 is explicit).
- **768px**: grid transitions from stacked to 2-col asymmetric. Monograma drops from 36vw to 24vw.
- **1024px**: full editorial grid activates.
- **1440px**: max-width of content column at 1280px. H1 peaks at 200px.
- **1920px+**: layout holds max-width. Background extends; content does not grow beyond 1280px.

### Micro-typography
- Non-breaking space before the final word of every H1 and H2 — no widows, ever.
- Hanging punctuation on body pull-quotes (optical alignment).
- Em-dash `—` (not en-dash, not hyphen) for narrative pauses in story copy. Em-dash with hair spaces around it on desktop.
- Curly quotes always: " " ' ' — never straight.
- Apostrophe curly: ’ — never straight.
- Italic for voice ("o nosso dia"), never for mere emphasis.
- PT-BR ordinal indicators preserved (12º not 12o).
- Numeric date "12.06" in Cormorant 300 — dots not slashes, serif not mono.

### Hierarchy rules
- Maximum 3 type sizes per viewport (not counting monograma).
- Contrast through WEIGHT (300 vs 400) and VOICE (Roman vs Italic), not through size.
- Never mix Cormorant 300 and Cormorant 400 in the same headline.
- Great Vibes appears twice and only twice on the entire home page: (1) monograma hero, (2) assinatura rodapé. Zero exceptions.
- Inter is forbidden above 14px. If you see Inter at 16px, it is a bug.
- All CAPS only through Inter meta-labels with +0.18em tracking. Cormorant is never set in all-caps.

---

## 3. GRID & COMPOSITION

### Editorial grid
- **12-column** desktop base with 32px gutter
- **Max content width 1280px** centered
- Dual-mode sections alternate full-bleed burgundy-deep against contained cream — the SECTION CONTAINER itself is the rhythm instrument, not a background color swap inside a single container

### Vertical rhythm
- Baseline unit: **8px**
- Section vertical padding: **160px top / 160px bottom desktop**, **96px/96px mobile**
- Inter-element spacing inside sections follows 8/16/24/48/96/160 (fibonacci-ish jumps, no middle values)
- No section is ever shorter than 100vh on desktop — brevity kills reverence here

### Full-page composition — reader eye path
1. **Land**: monograma centered, names below, date below names — symmetrical, centered, ceremonial
2. **Break symmetry**: "Nossa história" enters as 2-col asymmetric (text 5 / image 7) — the first asymmetry signals "now we tell the story"
3. **Widen**: "O grande dia" uses editorial 3-col asymmetric (2:1:1) — cronograma mid-wide, dress code narrow, mensagem narrow
4. **Photograph**: Galeria 2:1:1 editorial grid (mood report Ref #04 Junebug pattern)
5. **Close**: Mensagem final centered again (returns to ceremonial symmetry)
6. **Footer**: borgonha, centered monograma small, meta Inter

### Whitespace as active element
- **Hero**: ~70% of viewport is empty burgundy. Monograma + names + date occupy a vertical strip ~30% of height, dead-centered. Negative space is NOT emptiness — it is candle-dark room.
- **Nossa história**: whitespace right-margin is wider than left-margin (asymmetric 5/7 split). The empty right side is where the reader's breath lives.
- **Grand day cronograma**: whitespace between rows of the schedule IS the baseline grid made visible. Each event breathes.
- **Mensagem final**: maximum whitespace — the closing note is a single short paragraph in the center of an otherwise empty cream section.

### Breakpoint grammar
- **390px**: centered stack. H1 takes 3-4 lines. No parallax. Gallery becomes vertical 1-col with full-width images at 16:10. Asymmetric 2-col collapses to stacked: image on top, text below.
- **768px**: 2-col asymmetric activates. Gallery 2-col.
- **1024px**: 3-col editorial possible. Gallery 2:1:1.
- **1440px**: full grid, max content 1280px centered.

### Mobile composition
Not a degraded desktop — a DIFFERENT grammar. Mobile holds monumental display type even more aggressively (H1 at 16vw takes 3-4 lines and that is the feature, not the bug). No parallax. Gallery becomes a vertical stack where each image holds 100vh with caption below, like pages of a photo album turning.

---

## 4. SHOT LIST & LIGHTING

### Home page shot sequence — 6 shots

**Shot 1 — HERO: ceremonial entry**
- Type: full-bleed burgundy, centered typographic monolith
- Content: monograma M&D in Great Vibes gold-leaf (candlelight flicker active), "Moroni & Daphine" in Cormorant 300 cream, "12.06" in Cormorant 300 antique-gold below
- Duration / scroll: holds for 100vh — user must scroll to release
- Motion grammar: Receita 1 (slow fade + upward drift, 1.4s cascade). SVG turbulence flicker on monograma runs forever at 4s loop.
- Lighting language: single warm candle glow at 30% center, dying to pure burgundy-deep at edges

**Shot 2 — TRANSITION: burgundy → cream**
- Type: dissolve cross-fade over 900ms (Receita 2)
- Content: section boundary where hero burgundy crossfades into cream-warm content section. A single 1px gold-leaf horizontal divider draws in from 0% → 100% width over 1200ms (Receita 4)
- Motion grammar: pure opacity dissolve, no slide, no wipe

**Shot 3 — NOSSA HISTÓRIA: editorial asymmetric**
- Type: 2-col asymmetric (text 5 / photo 7)
- Content: H2 "Nossa história" in Cormorant 300 left; lede italic; body paragraphs in Cormorant 400; photo variant B (bouquet) on the right extending full-bleed to right edge
- Motion grammar: image enters via clip-path reveal (SEED pattern #10) from right to left over 1200ms as section enters viewport. H2 fades up.

**Shot 4 — O GRANDE DIA: cronograma editorial**
- Type: 3-col cream section, centered H2, cronograma as vertical list with gold dividers
- Content: H2 "O grande dia" centered; cronograma left (hora em Inter UPPERCASE meta + evento em Cormorant 300); dress code middle; mensagem aos convidados right. No location.
- Motion grammar: staggered fade-in per row, 80ms stagger, 800ms each (IntersectionObserver — SEED pattern #11)

**Shot 5 — GALERIA: 2:1:1 editorial warm**
- Type: photographic grid per mood report Ref #04 Junebug pattern
- Content: large left image (place setting or detail) spans 6 cols, two narrow right images (bouquet close, calla lily) span 3 cols each. All warm-graded per Ralph Lauren overlay.
- Duration: 100vh section
- Motion grammar: parallax on large image at ratio 0.15 (mood report Receita 3), small images static. DISABLED on mobile.

**Shot 6 — MENSAGEM FINAL + FOOTER**
- Type: cream → burgundy dissolve for footer. Mensagem final in cream centered; footer fade to burgundy-deep with monograma small, meta Inter.
- Content: short closing note in Cormorant 400i centered, then ghost CTA ("Lista de presentes") with gold-leaf 1px border; below it the footer in burgundy with second (and final) Great Vibes monograma at small scale as signature.
- Motion grammar: Receita 2 dissolve into footer. CTA button is the one magnetic element (SEED pattern #5, strength reduced to 0.2 for elegance).

### Lighting rig (across all photographic shots)
- **Key**: single warm tungsten 2700-2800K, upper-left/upper-right at 30-45°
- **Fill**: warm cream bounce ONLY (cool fill is forbidden)
- **Rim**: warm amber when subject sits on burgundy; none when subject sits on cream (cream already separates)
- **Practicals**: candles visible or implied as bokeh blooms
- **Atmosphere**: warm haze, dust motes in key beam, halation on brightest highlights

### Color grade: WARM-WITHIN-WARM
- **Base grade**: +15 warm, -10 cyan on all photography
- **Unifying overlay**: 8% gold radial from center to transparent (Ralph Lauren Romance treatment — mood report Ref #07)
- **Vignette**: 15-22% warm charcoal (#1A1312) toward edges
- **Halation**: Gaussian blur 2-4px at 20-30% opacity, screen blend, on all candle/metal highlights
- **Never**: cool shadows, blue hour, P&B, crushed shadows, HDR punch, sharpness stack

---

## 5. IMAGE PROMPTS & 3D DIRECTION

### Hero prompt skeleton (new template — project-specific)
`brain/design-library/hero-prompts/moroni-daphine-skeleton.md`

### Hero image prompts (3 variants)
1. **Rings on burgundy velvet** (hero A) — `brain/design-library/hero-prompts/examples/moroni-daphine-hero-rings.md`
2. **Burgundy bouquet still-life** (hero B / nossa-historia) — `brain/design-library/hero-prompts/examples/moroni-daphine-hero-florals.md`
3. **Wedding table with candelabra** (galeria / o-grande-dia) — `brain/design-library/hero-prompts/examples/moroni-daphine-hero-table.md`

### 3D demo direction
**None.** This project does NOT use Three.js, R3F, or any WebGL. 3D would betray the "convite de papel grosso" philosophy — printed, tactile, still. The only "three-dimensionality" on the page is the candlelight flicker SVG filter on the monograma and the parallax 0.15 on the gallery.

### Photo / illustration style direction
- **Photography language**: medium-format film aesthetic (Pentax 67 / Contax 645 / Hasselblad). 85-105mm lenses. f/1.4-f/2.8 shallow. Kodak Portra 400 pushed +1 or Fuji 400H pushed +1.
- **Subject rules**: lead with DETAIL, not couple. When couple appears (later phases), posed-candid editorial — never laughing-at-camera stock. Backs, hands, silhouette against candlelight preferred over face-on.
- **Illustration**: none. If any mark is needed, it is typographic or the custom M&D monogram. No floral clip-art, no watercolor, no hand-drawn hearts.
- **Anti-stock rules**: no Pinterest-generic wedding couple, no confetti, no bubbles, no sparklers, no fairy lights, no rustic farmhouse, no hygge minimal, no Scandinavian wedding.

---

## 6. MOTION LANGUAGE DIRECTION

### Pacing beats
- **Hero**: hold for a full second of stillness before first element fades in. Nothing should move in the first 1000ms. Silence creates reverence.
- **Section entries**: 900ms dissolve (Receita 2). Never instant.
- **Scroll feel**: Lenis lerp 0.08 (heavier than the default 0.1, as mood report prescribes) — scroll feels like silk sliding on marble
- **Overall rhythm**: three slow beats per section — enter, breathe, release. Never more than one moving element at a time in a single viewport. Ever.

### Motion grammars in play
- **Slow fade + upward drift** (entry of hero + every H2)
- **Dissolve** (section-to-section transitions)
- **Gentle parallax** (gallery only, ratio 0.15, desktop only)
- **Clip-path reveal** (nossa historia image)
- **Candlelight flicker** (monograma only — SVG turbulence, 4s loop)
- **Gold-line draw-in** (section dividers and underlines on H2)
- **Staggered fade** (cronograma rows)
- **Magnetic CTA** (only on Lista de presentes button — strength 0.2, not 0.4)

### Patterns referenced from SEED.md
- **Pattern #9 — Lenis Smooth Scroll Setup** (mandatory base, configured per mood report: lerp 0.08, wheelMultiplier 0.9, touchMultiplier 1.5)
- **Pattern #10 — Image Reveal on Scroll (clip-path)** for nossa historia image
- **Pattern #11 — IntersectionObserver Fade-In** as universal fallback and for cronograma stagger
- **Pattern #6 — Noise Grain Overlay** adapted: warm grain matrix, opacity 0.08, NOT the cool REIS grain
- **Pattern #5 — Magnetic Cursor** with strength REDUCED to 0.2 (not 0.4) for the single CTA

### Mood-report motion receitas referenced
- **Receita 1** — Hero slow fade + upward drift (hero entry)
- **Receita 2** — Dissolve de seção (all section transitions)
- **Receita 3** — Parallax 0.15 (gallery only, desktop only)
- **Receita 4** — Gold border reveal (section dividers, H2 underlines)
- **Receita 5** — Candlelight flicker (monograma ONLY — never on functional icons)

### Timing intent (NOT exact values — vfx-motion-designer finalizes)
- **Nothing under 600ms**. Luxury has patience.
- **Nothing with overshoot or bounce**. No spring, no elastic, no back-out.
- **Preferred easing families**: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for entries (Armani Privé curve), `cubic-bezier(0.16, 1, 0.3, 1)` for gold-line draw-ins (starts fast, settles slow — "envelope opening"), `ease-out` for dissolves.
- **Forbidden easings**: any `*-in-out` generic, any spring, any back, any elastic, any bounce.
- **prefers-reduced-motion**: respect always. Fallback = instant opacity with no transform. Monograma flicker disables.

---

## 7. BRAND SYMBOL INTEGRATION

- **M&D Monograma**: the ONLY mark on the entire site. Rendered in Great Vibes 400 gold-leaf (#D4AF37). Two uses total on home page — (1) HERO centerpiece, large, with candlelight flicker filter active; (2) FOOTER signature, small (~48px), no flicker.
- **Optional secondary**: a minimal single-line floral motif COULD appear as a section divider instead of the plain gold 1px line, but only if designer-agent can source or render a line-only flourish that reads editorial, not WordPress-wedding-template. Default is the plain gold line.
- **Prohibited here**: H1-B Hourglass, Z7, chess pieces, crowns, any REIS [IA] mark. These marks do not exist in this project's universe.

---

## 8. HANDOFF NOTES

### For designer-agent
- Produce Tailwind v4 design tokens from the color system in section 2 of the mood report and the typography scale in section 2 of this brief. Tailwind v4 means `@theme` directives, not `tailwind.config.js` — use CSS custom properties.
- Component specs needed: (1) burgundy hero section with centered typographic monolith, (2) cream editorial 2-col asymmetric, (3) cream 3-col cronograma with gold dividers, (4) 2:1:1 gallery grid, (5) cream mensagem final with ghost CTA, (6) burgundy footer with small monograma.
- Buttons: ghost-only, 1px gold-leaf (#D4AF37) border, Inter 300 UPPERCASE label at +0.18em tracking, 14px. Zero filled buttons on this page. Hover = border brightens to #E8C87A, no fill change.
- Forms: N/A on home page. (No RSVP backend per brief.)
- Dividers: 1px solid #D4AF37 at 40% opacity (translated: `rgba(212,175,55,0.4)`), not 100%.
- Section containers alternate burgundy-deep (#4A1619) and cream-warm (#F4ECDC). There is no "in-between" neutral.

### For dev-agent
- **Stack**: Astro 6 + Tailwind v4 + Vercel (already provisioned).
- **Fonts**: Google Fonts via `<link>` in base layout. Load Cormorant Garamond (300, 400, 300i, 400i), Great Vibes (400), Inter (300, 400). `font-display: swap` with critical CSS to prevent FOUT. Subset to Latin Extended (PT-BR accents).
- **Lenis**: install `@studio-freight/lenis`, configure per mood report (lerp 0.08, wheelMultiplier 0.9, touchMultiplier 1.5, smoothWheel true). Initialize in a client-only Astro island.
- **Grain overlay**: SVG filter pattern #6 adapted — swap the color matrix to warm (values that push toward cream instead of pure white). Opacity 0.08, mix-blend-mode overlay.
- **Accessibility**: `prefers-reduced-motion: reduce` must disable Lenis, disable monograma flicker, disable parallax, collapse all animations to instant opacity.
- **Performance**: images served as AVIF with WebP fallback. Hero prompts will yield 16:10 or 4:5 ratio images at 2400px long edge. LCP target < 2.5s on 4G.
- **No RSVP, no /local page**. Home links only to `/lista-de-presentes` and `/informacoes`.

### For vfx-motion-designer
- **Base layer**: Lenis setup (SEED pattern #9) with mood-report config — MANDATORY first step.
- **Hero entry**: Receita 1 — cascade timing (title 0ms, name 200ms, date 400ms, CTA 600ms), duration 1400ms, easing `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- **Monograma flicker**: Receita 5 — SVG `feTurbulence` with `feDisplacementMap`, animate seed 0→100 over 4000ms loop infinite, baseFrequency 0.9 numOctaves 3, displacement scale 1.5. Apply ONLY to the monograma `<text>` or `<g>`. Must be disabled on `prefers-reduced-motion`.
- **Section transitions**: Receita 2 — dissolve 900ms ease-out triggered at 20% IntersectionObserver threshold (SEED pattern #11).
- **Gallery parallax**: Receita 3 — ratio 0.15, large image only, desktop only. Use `requestAnimationFrame` tied to Lenis, NOT scroll event. Disable via matchMedia `(hover: none) and (pointer: coarse)`.
- **Gold line draw-in**: Receita 4 — CSS `@keyframes` width 0→100%, 1200ms, `cubic-bezier(0.16, 1, 0.3, 1)`, triggered when H2 enters viewport.
- **Clip-path reveal**: SEED pattern #10 on nossa historia image, 1200ms `cubic-bezier(0.77, 0, 0.175, 1)`.
- **Magnetic CTA**: SEED pattern #5 with strength 0.2 (reduced from 0.4).
- **Budget**: 60fps on M1 / iPhone 13 baseline. Tier down gracefully to "reduced" (no parallax, no flicker) on lower hardware.

### For visual-qa-agent
- **Judge against**: `brain/design-library/mood-reports/casamento-moroni-daphine/wedding-romantic-burgundy.md` — specifically Direction 1 (Borgonha & Dourado Formal, refs #01-#12) as primary rubric, Direction 2 (Tipografia Serif, refs #13-#20) as typography rubric, Direction 3 (Motion Cinematográfico Quente, refs #21-#26) as motion rubric.
- **Top-3 anchors for the verdict**: Valentino Beauty (Ref #05), Magnolia Rouge (Ref #02), Ralph Lauren Romance (Ref #07). If the implementation does not feel like these three in concert, the verdict is REVISE or REJECT.
- **REJECT triggers**: any of the 8 anti-patterns from the mood report present on the page. Pastel pink, script as body, bright gold, excessive ornaments, bounce motion, SaaS form, P&B/cold photos, gradient-text.
- **REVISE triggers**: type tracking wrong, monograma flicker too aggressive, section transition too fast, parallax too obvious, H1 undersized, Lenis default 0.1 instead of 0.08.
- **APPROVE criteria**: a reader arriving cold must think "this is a château wedding invitation" in the first 3 seconds. If they think "this is a wedding website" they are seeing the template, not the art.

### Accessibility
- `prefers-reduced-motion`: Lenis disabled, flicker off, parallax off, transitions collapse to instant opacity fade (no transform).
- Contrast: cream (#F4ECDC) on burgundy-deep (#4A1619) ratio ≈ 10.5:1 — passes AAA. Gold-leaf (#D4AF37) on burgundy-deep ≈ 4.8:1 — AA only, therefore gold is reserved for decorative elements and large display, NOT body text. Body text is always cream on burgundy OR ink-charcoal on cream.
- Reading order: DOM order matches visual order in every section. Asymmetric 2-col Nossa Historia places text BEFORE image in DOM (text is primary).
- Focus states: ghost CTA on focus = 2px gold-leaf outline offset 4px, not browser default.
- Script font (Great Vibes) is ONLY used for the monograma which is DECORATIVE. It is provided `aria-hidden="true"` and the real name "Moroni & Daphine" is delivered as an adjacent Cormorant `<h1>` which screen readers announce.
- Language attribute: `<html lang="pt-BR">`.

---

## CHANGELOG

- **2026-04-15** — Initial brief created by art-director. Consumed: voice-profile `moroni-daphine-wedding.md`, mood-report `wedding-romantic-burgundy.md` (31 refs + color + type + motion receitas), SEED.md (patterns #5, #6, #9, #10, #11). Produced: this brief + new skeleton `moroni-daphine-skeleton.md` + 3 hero prompts (rings, florals, table) in `hero-prompts/examples/`.
