# Direction 1 — Editorial Gravity

Last updated: 2026-04-15
Art Director: art-director (REIS [IA])
Status: Brief — ready for vfx-motion-designer
Lineage: Mercury + Pentagram + Stripe + Bureau Borsche + Ramp

---

## 1. Concept & Soul

Editorial Gravity is the REIS [IA] home composed as a financial essay — the kind of long-form piece a CFO prints and reads with a pen in hand. It refuses the posture of a tech startup entirely. There is no hero effect, no scripted demo, no atmospheric fog. The protagonist is the typography itself, set with merciless Swiss discipline at display scale, breathing inside an asymmetric grid that behaves like a magazine spread. The page holds still. The reader leans in because the composition invites leaning in, not because something moved. Every chapter looks like it could have been torn out of the Financial Times and reset in dark mode, and the executive on the other side of the screen recognizes the register instantly — this is how serious money talks to serious money. The accent blue almost disappears. When it shows up, it is because a single word needed an underline of electricity, and that underline will be the only colored pixel on the screen for the next 1200px of scroll. Motion is a whispered exception, never a rule. The soul is that of a private-bank prospectus translated to pixels and given the dark-mode dignity of a Bloomberg feature.

> Pull quote: "Reads like an FT editorial printed on obsidian."

---

## 2. Editorial Typography System

Inter is the only type family. The entire burden of premium falls on how Inter is set — tracking, leading, measure, feature flags. This is where this direction earns or fails its authority.

**Display scale (editorial, tight, confident):**

- **H1 — Headline Prime**: `clamp(64px, 8.5vw, 128px)`, weight 600 (Inter Display if available, else Inter 600), letter-spacing `-0.035em`, line-height `0.95`. This is Bureau Borsche territory: a single sentence, maybe seven words, occupying an entire frame. Hyphenation off. Widow/orphan control mandatory.
- **H2 — Chapter Mark**: `clamp(48px, 5.5vw, 80px)`, weight 500, letter-spacing `-0.025em`, line-height `1.0`. Each chapter opens with an H2 that carries as much gravity as a magazine section head.
- **H3 — Figure & Section**: `clamp(28px, 2.6vw, 40px)`, weight 500, letter-spacing `-0.015em`, line-height `1.15`.
- **H4 — Editorial sub**: `clamp(20px, 1.6vw, 24px)`, weight 500, letter-spacing `-0.005em`, line-height `1.3`.

**Body scale (reading-optimized):**

- **Body Prime**: `18px/1.65` desktop, `17px/1.6` mobile. Inter 400. Letter-spacing `0`. This is the prose column for methodology paragraphs and case captions.
- **Body Secondary**: `16px/1.6`, Inter 400, color tertiary. For deck copy under H2.
- **Lede**: `clamp(20px, 1.8vw, 26px)`, Inter 400, line-height `1.5`. One lede paragraph directly under each chapter H2, max 3 lines.

**Metadata / micro (mono):**

- **Mono Family**: JetBrains Mono, weight 400, `13px/1.4`, letter-spacing `0.02em`, `text-transform: uppercase` for chapter marks and figure numbers. Used for:
  - Chapter numerals (`CHAPTER 01 / METHOD`)
  - Figure numbers (`FIG 1.1 — REVENUE ATTRIBUTION`)
  - Source lines under figures
  - Eyebrow labels above H2s
- **Mono small**: `11px/1.3` for footnotes and legal micro only.

**Pairing philosophy:**

Inter carries three voices inside this direction and each voice is held in a separate tonal and spatial register. Display Inter is the headline voice — tight, large, confident, set with negative letter-spacing that only becomes legible above 48px. Body Inter is the reading voice — generous leading, neutral tracking, never competing with display. Mono Inter's companion (JetBrains Mono) is the editorial voice of apparatus — the chapter marks, figure numbers, source lines, captions under publication-grade figures. The three voices never share a line. Mono sits above or below display/body as a labeling layer; it is the typographic equivalent of the running header in a quarterly report.

**OpenType features (mandatory):**

- `font-feature-settings: "tnum" 1, "cv11" 1, "ss01" 1;` on all numeric content (proof section, figure numbers, metrics)
- `font-variant-numeric: tabular-nums;` on any column of numbers
- `text-rendering: optimizeLegibility;` globally
- Smart quotes and true em-dashes throughout — no ASCII substitutes

**Max measure:**

Prose columns cap at `720px`. Even on a 1600px viewport the reading column stays at 720px, anchored left inside a 1200px content container with the remaining space becoming the editorial gutter. This is the Mercury lesson: narrow prose inside wide containers is the single strongest signal of publication-grade editorial.

---

## 3. Color System (near-black ladder + accents)

**Near-black ladder (4 steps, strict):**

- `--bg-0: #000000` — absolute black, chapter frames, hero background
- `--bg-1: #0A0A0A` — chapter body, default section surface
- `--bg-2: #141414` — figure frames, card surfaces, publication-grade callouts
- `--bg-3: #1A1A1A` — hairline-separated blocks, code/mono blocks, secondary cards

The ladder is used as **tonal chapter shift**: each of the 5 content chapters lives on its own step, with the hero on `bg-0`, pillars on `bg-1`, method on `bg-0`, proof on `bg-1`, close on `bg-0`. The shift is not decorative — it is the editorial breath between chapters.

**Accent discipline (Editorial Gravity is the most restrained direction):**

- `--accent: #4A90FF` — electric blue, used **at most twice per chapter**. Allowed surfaces:
  - The primary CTA (`/agendar`) — filled button with blue background on one location per page, echo link on one location
  - A single word or phrase underline in the hero headline (e.g. an electric-blue underline bar under the operative word, 2px height, 85% width of the word)
  - Figure number labels in the proof chapter (`FIG 1.1` in `#4A90FF`, mono)
- Everything else — every other link, every other accent surface — uses text hierarchy colors (white/grey). **Forbidden in this direction: blue hover effects, blue icons, blue hairlines, blue backgrounds behind anything other than the primary CTA.** The rule is: if the reader sees blue, it means something. If blue is decorative, cut it.

**Text hierarchy (on dark):**

- `--text-primary: #FFFFFF` — headlines, CTAs, primary prose
- `--text-secondary: rgba(255, 255, 255, 0.72)` — body paragraphs, ledes
- `--text-tertiary: rgba(255, 255, 255, 0.52)` — captions, metadata, footnotes
- `--text-quaternary: rgba(255, 255, 255, 0.32)` — source lines, legal micro

**Hairlines:**

- `--hairline: rgba(255, 255, 255, 0.08)` — all figure frame borders, chapter separators, card outlines
- `--hairline-strong: rgba(255, 255, 255, 0.14)` — emphasized borders (proof figure frames only)
- No glass morphism. No backdrop-blur. No gradient borders. Hairlines are flat and disciplined.

**Forbidden in Direction 1 specifically:**

- Gradient meshes of any kind (reserved for Direction 3)
- Radial spotlights (reserved for Direction 2)
- Glow effects on text or buttons
- Any use of `#4A90FF` outside the 3 allowed surfaces above
- Any tonal step below `#1A1A1A` — no "darker than black" surfaces
- All base brand-lock prohibitions (gold, amber, chess, crowns, gradient text, emojis)

---

## 4. Grid & Composition

**Structural grid:**

- 12-column desktop (`1200px` max content width, 24px gutters)
- 4-column mobile (375px+, 16px gutters)
- Asymmetric anchor: the reading column sits in columns 1–7 for prose chapters, leaving columns 8–12 as the editorial gutter where mono metadata, figure numbers, and chapter marks float at precise vertical positions.

**Vertical rhythm:**

- `--section-py-xl: 200px` — between chapters (Mercury-grade, the most generous in any of the three directions)
- `--section-py-lg: 120px` — inside a chapter, between its header block and its figure block
- `--section-py-md: 64px` — between figure and next body element
- `--section-py-sm: 32px` — between related paragraphs
- Scale on mobile: multiply by 0.6

**Whitespace philosophy:**

Whitespace is the first-class brand asset of this direction. It is not padding. It is the composition. A chapter begins, holds for 200px of empty dark, presents an H2, holds, presents a lede, holds, presents a figure, holds, and ends with 200px of empty dark before the next chapter begins. The whitespace is what tells the executive reader "this is not a funnel — this is an essay". Mercury's home is the reference; Pentagram's monograph pacing is the second reference.

**Chapter-to-grid mapping (5 chapters + footer):**

- Chapter 1 (Hero): single full-bleed frame, H1 anchored left in columns 1–9, mono chapter mark in column 1 above headline, no figure
- Chapter 2 (Pillars): H2 in columns 1–7, three pillar cards staggered asymmetrically across columns 1–12 (card 1: col 1–5, card 2: col 4–8, card 3: col 7–12) — Pentagram-style staggered rhythm
- Chapter 3 (Method): H2 + lede in columns 1–7, method prose in columns 1–7 (720px measure), a single publication-grade figure spans columns 2–11
- Chapter 4 (Proof): asymmetric figure grid — one hero metric figure columns 1–8, two supporting figures stacked columns 9–12
- Chapter 5 (Close): H2 centered in columns 3–10, CTA centered below, no figure, just air
- Footer: columns 1–12, decorative watermark "O Tempo é Rei" in tertiary text at bottom-right

---

## 5. Motion Language

**The ONE hero motion moment:**

A word-by-word reveal of the H1 on first load, using the `editorial/01-split-text-word-reveal.md` pattern. 40ms stagger between words, each word rising 16px from below with an overflow mask. Ease: `cubic-bezier(0.16, 1, 0.3, 1)` (the house curve, `motion/02-ease-out-expo-house-curve.md`). Total duration: ~800ms. After that, the hero is static. **That is the entire hero motion budget.**

**Chapter-level motion rules:**

- Chapter reveals on scroll-in: a single `opacity: 0 → 1, translateY: 24px → 0` on the chapter container, triggered once via IntersectionObserver at 20% visibility. Duration: 600ms. Ease: house curve. No stagger, no children animation — the whole chapter block rises as one object, like a page turning.
- Chapter-to-chapter transition: none. The scroll is native (Lenis smooth-scroll at gentle settings from `lenis-smooth-scroll/01-global-smooth-scroll.md`, `lerp: 0.1`). No hijack. No film cuts. The breath between chapters is the 200px of empty dark, not a scripted transition.

**Component-level motion:**

- Links: 150ms color transition on hover, no underline animation, no slide
- Primary CTA: 200ms background color transition on hover (`#4A90FF` → `#2D7AFF`), no scale, no glow, no magnetic cursor. The CTA in Editorial Gravity is deliberately static — it is a printed page link, not a pro-tool button.
- Figures: no hover state. They are frozen.
- Number tickers in proof chapter: once-per-page count-up on scroll-in via `proof/01-lottie-number-ticker-on-reveal.md`. Tabular-nums. 1200ms duration, ease-out-expo.

**Prohibited in Direction 1:**

- Magnetic cursor CTAs (reserved for Direction 2)
- Radial spotlight (reserved for Direction 2)
- Scripted state-machine demos (reserved for Direction 2)
- Gradient mesh backgrounds (reserved for Direction 3)
- Parallax of any kind
- Any hover-triggered media
- Any animation longer than 1200ms
- Any animation that does not respect `prefers-reduced-motion`

**Patterns to use (from `brain/design-library/patterns/`):**

- `lenis-smooth-scroll/01-global-smooth-scroll.md` — mandatory base layer
- `editorial/01-split-text-word-reveal.md` — the hero moment
- `motion/02-ease-out-expo-house-curve.md` — house curve for every transition
- `proof/01-lottie-number-ticker-on-reveal.md` — number tickers in proof chapter
- `proof/02-publication-grade-figure-frame.md` — default frame for every figure, this is THE pattern for this direction
- `layout/02-chaptered-scroll-composition.md` — the 5-chapter armature

---

## 6. Hero Treatment

The hero is a single full-bleed dark frame (`#000000`) with nothing in the background — no gradient, no spotlight, no fog, no mesh. The composition is purely typographic.

**Layout (desktop):**

```
[mono chapter mark: "CHAPTER 01 / OPENING"]         (col 1, 120px from top)

[H1 headline — 3 lines max, left-anchored cols 1-9,
 set at clamp(64px, 8.5vw, 128px), weight 600,
 tracking -0.035em, line-height 0.95]               (col 1-9, 200px from top)

[lede paragraph — one paragraph, max 3 lines,
 cols 1-6 at 720px measure, 20-26px, secondary text](col 1-6, below H1)

[primary CTA — filled #4A90FF button "Agendar diagnóstico",
 labeled echo link "Ver método →" next to it]        (col 1-3, below lede)

[mono footer: "REIS [IA] — SYSTEMS / BUILDERS / MARKETING"] (bottom-left, absolute)
```

**Headline construction:**

The H1 is a single declarative sentence with ONE operative word underlined in electric blue. Example structure: "Transforme AI em <u>receita</u>, não em despesa." The underline is a 2px solid `#4A90FF` bar, 85% width of the underlined word, positioned 8px below baseline. This is the ONLY accent color in the entire hero.

**Signature motion moment:**

Word-by-word reveal of the H1 on first load (see Section 5). The underlined word reveals with a 120ms extra delay after the rest of the line, and its blue underline draws from left to right in a 400ms scaleX animation after the word has landed. That single blue underline draw is the emotional peak of the direction.

**Background:**

`#000000` solid. Nothing else. No texture, no grain, no gradient. The restraint is the statement.

**Hero image prompts:**

This direction does NOT commission a generative hero image. The hero is purely typographic. If an image is absolutely required for an alternative variant, use this fallback:

> "A single sheet of obsidian paper held in precise studio lighting, architectural top-down framing, extreme negative space, subtle film grain, monochrome except for a thin electric blue hairline at the sheet's edge, shot on ARRI Alexa at f/2.8, 85mm, editorial publication aesthetic, Financial Times style, ultra-minimal, no text, no objects, no people." — Gemini/Flux, 3:2 ratio.

---

## 7. Chapter Breakdown

**Chapter 1 — Hero (bg-0, `#000000`):**
See Section 6. Typographic statement, one blue underline, word-by-word reveal, CTA, nothing else. 100vh on desktop, min-height 80vh on mobile.

**Chapter 2 — Pillar Reveal (bg-1, `#0A0A0A`):**
Mono chapter mark (`CHAPTER 02 / PILLARS`), H2 set as a two-line Swiss display statement ("Três pilares. Um único resultado."), lede paragraph, then three pillar cards staggered asymmetrically across the grid (Pentagram-style). Each card is a figure frame with pillar name as H3, one-line description, and a mono tag (`SYSTEMS`, `BUILDERS`, `MARKETING`). No icons. No color. No hover state. The asymmetry of the grid is the composition.

**Chapter 3 — Method Demonstration (bg-0, `#000000`):**
This chapter is pure editorial prose. Mono chapter mark, H2 ("O método Revenue-First"), lede, then a 720px-measure prose column of 3–4 paragraphs explaining the method in consulting-firm voice. A single publication-grade figure appears mid-chapter — a text-based diagram of the method phases set inside a `proof/02-publication-grade-figure-frame.md` frame with `FIG 3.1 — REVENUE-FIRST FRAMEWORK` mono label. No video. No scripted demo. No interaction. This is where Direction 1 most radically diverges from Direction 2.

**Chapter 4 — Proof (bg-1, `#0A0A0A`):**
Publication-grade figure chapter. Mono chapter mark, H2 ("Prova"), lede, then an asymmetric figure grid. One hero metric figure (columns 1–8): a single large number (e.g. `R$ 2.3M`) set at 120px tabular-nums, with mono caption `FIG 4.1 — REVENUE ATTRIBUTED TO AI / 6 MONTHS / N=12 CLIENTS` and a source line. Two supporting figures stacked columns 9–12: smaller metrics with the same frame treatment. All numbers animate once via the tabular-nums ticker. Hairline borders, no fills, no charts with colors — numbers are the chart.

**Chapter 5 — Close Editorial (bg-0, `#000000`):**
A short, centered closing statement. Mono chapter mark (`CHAPTER 05 / CLOSE`), H2 centered in columns 3–10 ("Pronto para conversar sobre receita?"), lede below, primary CTA centered ("Agendar diagnóstico →"), then 200px of empty dark before the footer. No secondary CTA. No form. No testimonial. The restraint is the invitation.

**Chapter 6 — Footer (bg-0, `#000000`):**
Minimal editorial footer. Left: REIS [IA] wordmark in white `300` weight with `[IA]` in `#4A90FF`. Center: three columns of mono links (pillars, contact, legal). Right-bottom: decorative "O Tempo é Rei" watermark in `text-quaternary` at 11px mono uppercase. This is the ONLY place the slogan appears. Copyright mono line below.

---

## 8. Implementation Brief for vfx-motion-designer

**Patterns to consult (mandatory, in order):**

1. `brain/design-library/patterns/layout/02-chaptered-scroll-composition.md` — the 5-chapter armature, literally the scaffold of this direction
2. `brain/design-library/patterns/proof/02-publication-grade-figure-frame.md` — default for every figure, used in chapters 2, 3, and 4
3. `brain/design-library/patterns/editorial/01-split-text-word-reveal.md` — the hero reveal, the only hero motion
4. `brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md` — every transition
5. `brain/design-library/patterns/proof/01-lottie-number-ticker-on-reveal.md` — proof chapter tickers
6. `brain/design-library/patterns/lenis-smooth-scroll/01-global-smooth-scroll.md` — base scroll

**References to consult for code inspiration (in order):**

1. `brain/design-library/references/mercury/observations.md` — whitespace-as-asset, narrow prose column, near-zero motion philosophy
2. `brain/design-library/references/pentagram/observations.md` — asymmetric disciplined grid, oversized Swiss display, work-as-color chapter 2 layout
3. `brain/design-library/references/linear/observations.md` — 4-step near-black ladder, vertical rhythm as argument, accent restraint
4. `brain/design-library/references/ramp/observations.md` (if present) — publication-grade proof chapter composition
5. `brain/design-library/references/stripe/observations.md` (if present) — grid-as-argument discipline

**Dependencies allowed:**

- Vanilla JS only (no framework)
- GSAP is **not required** — this direction is so motion-restrained that CSS transitions + IntersectionObserver + a 20-line vanilla word-splitter are sufficient
- Lenis is allowed (lightweight, mandatory base layer)
- No Three.js, no WebGL, no Framer Motion, no Spline
- Inter + JetBrains Mono via Google Fonts or self-hosted WOFF2 subset (Latin only, weights 300/400/500/600)

**Performance budget:**

- JS: < 30KB gzipped (Lenis ~12KB + word-splitter ~2KB + number-ticker ~2KB + IntersectionObserver bootstrap)
- CSS: < 30KB gzipped (tight because there is almost no component variety — just type, grid, hairlines)
- Fonts: < 80KB total (Inter subset 4 weights + JetBrains Mono subset 1 weight)
- First contentful paint: < 1.2s on 3G Fast
- 60fps on all scrolls (trivial — there is almost no motion)

**Accessibility (mandatory):**

- `prefers-reduced-motion: reduce` must set the word-by-word reveal to instant opacity-only, disable the number ticker (show final value), and set Lenis to native scroll
- All headings use semantic `<h1>`–`<h4>`
- Focus rings: 2px `#4A90FF` outline with 2px offset on all interactive elements, never `outline: none`
- Keyboard tab order follows visual reading order (top to bottom, left to right per chapter)
- All figures use `<figure>` + `<figcaption>`
- Color contrast: all text meets WCAG AA on the near-black ladder (white on `#000` is 21:1, secondary `rgba(255,255,255,0.72)` on `#0A0A0A` is ~13:1 — both pass)

**Minimum viable scope (what MUST ship in the standalone HTML iteration):**

1. Full Chapter 1 (hero) with word-by-word reveal and blue underline draw on the operative word
2. Chapter 2 (pillars) with the asymmetric staggered 3-card grid and real H2 + lede
3. Chapter 4 (proof) with at least ONE publication-grade figure frame and ONE animated number ticker
4. Chapter 6 (footer) with wordmark and "O Tempo é Rei" watermark
5. The near-black ladder applied as chapter backgrounds (bg-0 → bg-1 → bg-0 → bg-1 → bg-0)
6. Lenis smooth scroll
7. `prefers-reduced-motion` fallback
8. 720px prose measure on any body text that appears

Chapters 3 and 5 can be stubbed with H2 + lede + CTA for the iteration — full prose is not required to evaluate the direction. The signature moves are: the typographic hero, the staggered pillar grid, the publication-grade figure frame, the number ticker, and the restraint of the whitespace. If those five things land, the direction is faithfully represented.
