# Direction 3 — Cinematic Gravity

Last updated: 2026-04-15
Art Director: art-director (REIS [IA])
Status: Brief — ready for vfx-motion-designer
Lineage: Arc Browser + Apple iPhone Pro + Porsche Taycan + Polestar + Vercel + Bloomberg Graphics

---

## 1. Concept & Soul

Cinematic Gravity is the REIS [IA] home composed as a film — not a marketing page dressed up with motion, but a scroll-as-narrative essay where each chapter is a reel with its own tonal register, its own lighting state, and its own breath. The hero is a living WebGL gradient-mesh backdrop that behaves like a slow ocean of dark blue gravity behind an editorial headline. The transitions between chapters are film cuts — a 300ms tonal shift plus a brief mask fade — that make the scroll feel composed rather than continuous. The proof chapter reads like a Bloomberg Graphics feature: pinned figures that hold while captions reveal around them. The method chapter is neither prose (Direction 1) nor a state-machine widget (Direction 2) — it is a pinned typographic reveal, where each phase of the method occupies its own chapter-inside-a-chapter, displacing the last one with a cinematic wipe. The accent blue shows up as light — as the center of a gradient mesh, as the color temperature of a scroll-linked atmospheric shift, as the luminous edge of a figure frame in proof. This is the most ambitious direction of the three in motion terms and the most emotional. The soul is the Koyaanisqatsi cut translated to executive copy: scroll is pace, each chapter is a reel, each reel earns its hold. An executive reading this page should feel they are not on a website — they are inside an argument being staged for them.

> Pull quote: "Scrolls like a Koyaanisqatsi cut. Holds like a Bloomberg feature."

---

## 2. Editorial Typography System

Inter across the board, set with cinematic scale — bigger than Direction 2, slightly smaller than Direction 1, but deployed in a way that each chapter has its own typographic pressure. The defining move is that H2 size varies subtly by chapter (within a 10% range) so that the opening chapters feel heavier and the closing chapters feel lighter, like a film rack focus.

**Display scale (cinematic, chapter-variable):**

- **H1 — Hero Prime**: `clamp(60px, 7.5vw, 112px)`, weight 500 (slightly lighter than the other directions — cinematic type is confident without being bold), letter-spacing `-0.03em`, line-height `1.0`. The lighter weight is the signature.
- **H2 — Chapter Mark (variable by chapter)**:
  - Chapter 2 (pillars): `clamp(48px, 5.2vw, 76px)` weight 500 — heaviest
  - Chapter 3 (method): `clamp(44px, 4.8vw, 72px)` weight 500
  - Chapter 4 (proof): `clamp(40px, 4.4vw, 64px)` weight 500 — lightest, because the figures carry the weight
  - Chapter 5 (close): `clamp(44px, 4.8vw, 72px)` weight 500
- **H3 — Phase / Figure title**: `clamp(26px, 2.4vw, 36px)`, weight 500, letter-spacing `-0.02em`, line-height `1.2`
- **H4 — Card sub**: `clamp(18px, 1.5vw, 22px)`, weight 500, letter-spacing `-0.01em`, line-height `1.3`

**Body scale:**

- **Body Prime**: `17px/1.65` desktop, `16px/1.6` mobile. Inter 400. Slightly more generous leading than Direction 2, closer to Direction 1.
- **Body Secondary**: `15px/1.6`, Inter 400, tertiary color.
- **Lede**: `clamp(19px, 1.7vw, 24px)`, Inter 400, line-height `1.5`.
- **Cinematic caption**: `clamp(14px, 1.1vw, 15px)`, Inter 400, letter-spacing `0.01em`, tertiary color, max 2 lines — for pinned figure captions in the proof chapter.

**Metadata / micro (mono):**

- **Mono Family**: JetBrains Mono (or Space Mono as the cinematic alternative validated by `references/arc-browser/observations.md` line 15). JetBrains is the default.
- **Mono base**: `12px/1.5`, letter-spacing `0.06em`, uppercase — chapter marks, reel numbers (`REEL 01 / OPENING`), timecodes
- **Mono timecode**: `11px/1.3`, tabular-nums — used in the hero bottom strip and in proof figure source lines
- **Mono editorial**: `13px/1.45`, mixed case — figure captions' apparatus layer, source attributions

**Pairing philosophy:**

Inter carries the emotional weight of each chapter at a scale calibrated to that chapter's register. Mono behaves as the **film apparatus layer** — reel numbers, timecodes, chapter marks, source lines, figure numbers. Mono is less present than in Direction 2 but more cinematic in its framing: it appears in absolutely-positioned strips at the edges of chapter frames, the way a film credit sits in the corner of an establishing shot. Every chapter opens with a mono `REEL 0X` strip at the top-left corner of its frame.

**OpenType features (mandatory):**

- `font-feature-settings: "tnum" 1, "ss01" 1, "cv11" 1;`
- `font-variant-numeric: tabular-nums;` on proof numbers and all timecodes
- `text-rendering: optimizeLegibility;`
- Smart quotes throughout
- On H1 and chapter H2s: `font-feature-settings: "ss01" 1;` for the alternate single-story `a` if available in the subset — cinematic display feel

**Max measure:**

Prose columns cap at `680px` — between Direction 1 (720) and Direction 2 (640). Cinematic caption columns under pinned figures cap at `520px` to force the caption to feel like a pull quote rather than body copy.

---

## 3. Color System (near-black ladder + accents)

**Near-black ladder (4 steps used as chapter atmospheres, not as layering):**

- `--bg-0: #000000` — absolute black, used for the hardest chapter boundary moments (the instant of a chapter cut) and the footer
- `--bg-1: #0A0A0A` — hero base tone under the gradient mesh
- `--bg-2: #141414` — method chapter, pillars chapter — a warmer dark for reading-heavy reels
- `--bg-3: #1A1A1A` — proof chapter, where publication-grade figures sit — the "brightest dark" of the ladder, the way a Bloomberg feature uses a slightly lifted background to make data readable

Where Direction 1 uses the ladder as editorial breath and Direction 2 uses it as component depth, **Direction 3 uses it as film color grading**. Each chapter is a reel with its own tonal grade. The transition between reels is a scripted shift — the background color animates across the ladder value over 500ms using the house curve, synchronized with the scroll position where the chapter boundary lives.

**Accent discipline (the most dynamic of the three directions — accent is light, not ink):**

- `--accent: #4A90FF` — the primary blue, used as cinematic light
- `--accent-deep: #2D7AFF` — deeper blue, used in the hero gradient mesh's color pool (the Builders sub-brand color — cinematic direction allows the sub-brand palette to appear in the gradient mesh only)
- `--accent-cyan: #00B4FF` — cyan highlight, allowed only as a bleed in the gradient mesh
- `--accent-soft: rgba(74, 144, 255, 0.14)` — atmospheric haze, used in chapter transitions

Allowed surfaces for `#4A90FF`:
- Hero gradient mesh (dominant presence — this is the one place where blue is the atmosphere, not a punctuation)
- Primary CTA (filled button, 1 per page)
- Proof figure frame luminous edges (a 1px `#4A90FF` inner border at 40% opacity, present only in the proof chapter — cinematic lit edge)
- Chapter transition atmospheric flashes (a `accent-soft` wash fades in and out over 500ms during chapter cuts)
- Focus rings (2px outline, 2px offset)
- Link hover underlines

The rule: in chapters 2, 3, 4, and 5 the accent behaves exactly like Direction 1 — maximum two appearances per viewport, earned. In the hero chapter (1), the accent is the atmosphere via the gradient mesh. In the chapter transitions, the accent is the cinematic flash. This makes the accent feel like **light** that turns on and off as chapters pass, rather than like ink on a page.

**Text hierarchy (on dark):**

- `--text-primary: #FFFFFF`
- `--text-secondary: rgba(255, 255, 255, 0.74)`
- `--text-tertiary: rgba(255, 255, 255, 0.54)`
- `--text-quaternary: rgba(255, 255, 255, 0.34)`

(Slightly higher opacities than Direction 2 — cinematic chapters benefit from more luminous secondary type since the background grades shift.)

**Hairlines:**

- `--hairline: rgba(255, 255, 255, 0.09)`
- `--hairline-strong: rgba(255, 255, 255, 0.16)`
- `--hairline-accent: rgba(74, 144, 255, 0.4)` — proof figure luminous edge only

**Forbidden in Direction 3 specifically:**

- Pointer-tracked radial spotlight (reserved for Direction 2 — would compete with the gradient mesh)
- Scripted state-machine demo widget (reserved for Direction 2 — would break the cinematic register)
- Aggressive mono apparatus on every section (Direction 2's density move — would clutter the cinematic frame)
- Oversized magazine headlines at Bureau Borsche scale >112px (reserved for Direction 1)
- Use of `#4A90FF` as mono accent color on figure-number chips (would compete with the lit edges)
- More than one WebGL surface on the page (the hero mesh is the only WebGL)
- All base brand-lock prohibitions (gold, amber, chess, crowns, gradient *text*, emojis, azure whisper)

**Important distinction**: gradient text is forbidden. Gradient mesh *background* is allowed — in fact, required — in the hero only. The two are not the same. Text remains flat white, always.

---

## 4. Grid & Composition

**Structural grid:**

- 12-column desktop, `1280px` max content width, 24px gutters (widest content width of the three — cinematic framing benefits from larger frames)
- 4-column mobile (375px+, 16px gutters)
- The grid is symmetric in most chapters, but the proof and method chapters use **pinned asymmetric composition** where a figure or a phase block sits anchored to one side of the frame while text reveals on the other, in the Bloomberg-feature / NYT-interactive tradition.

**Vertical rhythm:**

- `--section-py-xl: 180px` — between chapters (generous, cinematic)
- `--section-py-lg: 112px` — inside a chapter
- `--section-py-md: 56px` — between sibling blocks
- `--section-py-sm: 28px` — between tight related elements
- Each chapter has a minimum height of `100vh` in this direction (cinematic chapters are full-frame) — the scroll is composed as "each chapter holds one frame" rather than "each chapter flows into the next". This is the Arc lesson from `references/arc-browser/observations.md` line 15.

**Whitespace philosophy:**

Whitespace is cinematic negative space. Each chapter is composed as a frame that could be paused and printed. The entrance of each chapter gives the reader a moment to register the reel-mark mono label in the top corner before the headline lands. Between chapters, the 180px section padding is filled by the scripted atmospheric wash of the transition — so the whitespace is active, not inert.

**Chapter-to-grid mapping (6 chapters + footer):**

- Chapter 1 (Hero, `bg-1` with gradient mesh overlay): 100vh, H1 centered columns 2–10 (slightly more centered than Direction 2's centered-left), mono reel mark top-left absolute, mono timecode bottom-right absolute
- Chapter 2 (Pillars, `bg-2`): min-100vh, H2 columns 1–7, three pillar reels displayed as a **vertically chaptered sequence** — one pillar per sub-frame, scroll-pinned, each pillar occupying a 60vh sub-frame with its own reel number. This is different from Directions 1 and 2 which show pillars as a single grid.
- Chapter 3 (Method, `bg-2`): min-100vh, pinned typographic reveal — H2 anchored left, method phases reveal right-column as the reader scrolls through the pinned frame. This is the signature of the direction.
- Chapter 4 (Proof, `bg-3`): min-100vh, pinned asymmetric figure composition — figures hold while captions reveal, Bloomberg-style
- Chapter 5 (Close, `bg-1`): 100vh, H2 centered columns 3–10, CTA centered, atmospheric gradient mesh returns as a subtle residual behind the composition (half opacity of the hero mesh)
- Chapter 6 (Footer, `bg-0`): standard footer, absolute black — the final fade-out

---

## 5. Motion Language

This is the direction with the highest motion budget — but every motion is **cinematic and composed**, never ambient. Motion is the edit, not the animation.

**The ONE hero motion moment:**

A **WebGL fullscreen shader gradient mesh** in the hero, implemented per `three-js/02-shader-gradient-mesh.md`. The mesh is a slow-moving field of dark blues (`#000000` to `#4A90FF` to `#2D7AFF` to `#00B4FF`) simmering at ~0.05 speed, with noise and a soft vignette at the edges. The mesh is the atmosphere of the hero — it is not decorative, it is the set. It lives for the full duration of the hero chapter and fades out when the reader scrolls past, with its residual (half opacity, frozen) returning only in the close chapter.

The hero H1 reveals as a block-level fade (opacity 0 → 1, translateY 24 → 0) with a 700ms duration, not a word-by-word stagger. This is a deliberate distinction from Direction 1's word-by-word reveal — cinematic type lands as a whole, like a film title card.

**Chapter-level motion rules (the film-cut system):**

This is the defining motion of the direction. Between any two chapters, a **scripted chapter cut** fires when the chapter boundary crosses the viewport midline:

1. The outgoing chapter's background color eases to its final value (300ms, house curve)
2. A thin atmospheric `accent-soft` wash fades in across the full viewport (200ms), holds for 150ms, fades out (200ms) — total 550ms atmospheric flash
3. The incoming chapter's background color eases to its target tonal grade (300ms, house curve, overlapping)
4. The incoming chapter's content fades in from `opacity: 0, translateY: 32px` over 700ms, 100ms stagger between direct children

Total chapter-cut duration: ~950ms. Respects `prefers-reduced-motion` by collapsing to an instant background swap and a plain opacity fade-in.

This is the cinematic-cut technique — no film-strip reference has this exact implementation in the library, so this direction will **propose a new pattern** at `layout/03-scripted-chapter-film-cut.md` after the iteration.

**Scroll-pinned reveals (method and proof chapters):**

- Method chapter: the chapter pins for ~3x its own viewport height while 4 method phases reveal in sequence in the right column, using a horizontal wipe (clip-path, 400ms per phase) as each phase displaces the last. The left column (H2 + mono phase counter) remains fixed. Uses `gsap-scroll-trigger/01-pinned-hero-reveal.md` as the pinning primitive.
- Proof chapter: same pinning pattern — the lead figure pins while its caption reveals line by line, then the figure swaps to the next metric with a 500ms crossfade. `gsap-scroll-trigger/01-pinned-hero-reveal.md` + `proof/01-lottie-number-ticker-on-reveal.md`.

**Component-level motion:**

- **Primary CTA**: simple hover — 200ms color transition `#4A90FF → #2D7AFF`, no magnetic cursor (reserved for Direction 2). Cinematic CTAs land, they don't pull.
- **Links**: 150ms color transition on hover + 200ms underline draw
- **Cards**: no hover motion in the pillar chapter — the chaptered vertical sequence is the motion, individual cards hold still
- **Focus rings**: 2px `#4A90FF`, 2px offset, 120ms reveal
- **Number tickers**: proof chapter, tabular-nums, 1400ms count-up (slightly longer than Directions 1 and 2 — cinematic hold)

**Prohibited in Direction 3:**

- Pointer-tracked spotlight (reserved for Direction 2)
- Magnetic cursor CTA (reserved for Direction 2)
- Word-by-word text reveal (reserved for Direction 1)
- Scripted widget state-machine demo (reserved for Direction 2)
- Parallax on any element
- More than one WebGL context (the hero mesh is the only one, residualized in close)
- Any non-respected `prefers-reduced-motion` path

**Patterns to use (from `brain/design-library/patterns/`):**

- `lenis-smooth-scroll/01-global-smooth-scroll.md` — mandatory base, set to `lerp: 0.09` (slowest of the three — cinematic)
- `lenis-smooth-scroll/02-lenis-scrolltrigger-sync.md` — mandatory because pinning + Lenis requires the sync trap
- `three-js/02-shader-gradient-mesh.md` — the hero mesh (signature)
- `gsap-scroll-trigger/01-pinned-hero-reveal.md` — method chapter pinning and proof chapter pinning
- `motion/02-ease-out-expo-house-curve.md` — every transition
- `proof/01-lottie-number-ticker-on-reveal.md` — proof chapter
- `proof/02-publication-grade-figure-frame.md` — proof frames (with the luminous `accent` edge specific to this direction)
- `layout/02-chaptered-scroll-composition.md` — the 6-chapter armature

---

## 6. Hero Treatment

The hero is a `bg-1` (`#0A0A0A`) frame with a living WebGL shader gradient mesh overlay. The mesh drifts slowly, dark blues pooling and unpooling like a photographed ocean shot from altitude. The composition is centered-ish with mono reel apparatus at the corners.

**Layout (desktop):**

```
[mono reel mark top-left absolute: "REEL 01 / OPENING"]        (col 1, 64px from top)

[mono timecode top-right absolute: "00:00 — 00:12"]            (col 12, 64px from top)

[H1 headline — 2 lines,
 clamp(60px, 7.5vw, 112px), weight 500,
 letter-spacing -0.03em, line-height 1.0,
 centered columns 2-11]                                         (col 2-11, 45% from top)

[lede — 1-2 lines centered, 19-24px,
 cols 3-10 at 680px measure,
 secondary text]                                                (col 3-10, below H1)

[primary CTA centered, filled #4A90FF "Agendar diagnóstico →"] (col 5-8, below lede)

[mono bottom-left absolute: "REIS [IA] — 2026"]                 (col 1, bottom 64px)

[mono bottom-right absolute: "SCROLL TO CONTINUE ↓"]            (col 12, bottom 64px)
```

**Headline construction:**

A two-line declarative statement that feels like a film title card. Example: "O tempo é receita. / A AI é como você o gasta." No underlines, no blue words — the blue is the ocean behind the type, not the type itself.

**Signature motion moment:**

The WebGL gradient mesh is the signature. It fades in from `opacity: 0` over 1000ms on first load, then drifts indefinitely at a 0.05 speed coefficient. The H1 lands as a single-block fade-in at 400ms delay into the mesh fade-in (so the mesh establishes first, then the type lands into it). The lede and CTA follow with 150ms stepped delays. The entire hero entrance is ~1800ms — longer than the other directions, because cinematic openings earn the hold.

**Background:**

`bg-1` base with the WebGL gradient mesh overlay. Dark film grain at `opacity: 0.04` layered on top to unify the WebGL surface with the DOM. Nothing else.

**Hero image prompts (fallback if WebGL cannot ship in the iteration):**

If a static image hero is needed as fallback, commission one of the following via Gemini / Flux / Midjourney:

> "A photographed field of slow dark ocean water shot from altitude at twilight, deep blacks with electric blue light pooling beneath the surface, cinematic wide aspect, architectural negative space, subtle film grain, studio-level atmospheric haze, no horizon line, no objects, no people, no text, aerial abstract, electric blue bioluminescence, muted and glacial, shot on ARRI Alexa 65, 50mm, f/2.0, editorial publication aesthetic, Koyaanisqatsi meets Bloomberg feature." — 21:9 ratio, 4K.

> "An architectural matte-black volume of space lit from within by a single electric blue gradient field, slow-moving light pooling like a liquid, negative space dominant, studio lighting, film grain, no horizon, no objects, no people, no text, abstract atmospheric composition, cinematographic, editorial tech, Porsche Taycan meets Arc browser." — 16:9 ratio, 4K.

The static fallback goes in the `<img>` tag with the WebGL mounting on top once JS initializes (progressive enhancement).

---

## 7. Chapter Breakdown

**Chapter 1 — Hero (bg-1, `#0A0A0A` + gradient mesh):**
See Section 6. WebGL gradient mesh, centered editorial headline, mono reel apparatus at corners. 100vh with sticky-hold on scroll start (user must scroll intentionally to leave the hero — slight scroll resistance of 300ms held by Lenis lerp).

**Chapter 2 — Pillar Reveal (bg-2, `#141414`):**
This chapter diverges from Directions 1 and 2 fundamentally. Instead of showing the three pillars as a grid, it chapters them as a **vertical reel sequence** — the chapter holds the reader for ~3x viewport height, and each pillar occupies a 60vh sub-frame with its own mono reel label (`REEL 02.01 / SYSTEMS`, `REEL 02.02 / BUILDERS`, `REEL 02.03 / MARKETING`). Each pillar sub-frame has its H3 title, a single 2-line description, and one publication-grade figure or quote. As the reader scrolls, each sub-frame pins briefly and then releases. This is the Arc Browser chaptering taken literally. No grid, no cards, no hover states — just reels.

**Chapter 3 — Method Demonstration (bg-2, `#141414`):**
Pinned typographic reveal chapter. The chapter pins for ~3x viewport height while 4 method phases reveal in the right column of the frame, each phase displacing the previous with a horizontal clip-path wipe (400ms, house curve). The left column holds the chapter H2 ("O método Revenue-First") and a mono phase counter (`PHASE 01 / 04 — DIAGNOSE`, updating as the reader scrolls). Each phase reveal shows a phase title (H3), a 2-sentence body, and a small figure or callout. This is the cinematic answer to Direction 2's state-machine widget — same content, but the reader controls the cycle via scroll, and the motion is a cut rather than a cross-fade.

**Chapter 4 — Proof (bg-3, `#1A1A1A`):**
Bloomberg-feature-style pinned figure chapter. The chapter pins while lead figures cycle — one hero metric figure holds, its caption reveals line by line, then the figure transitions to the next via 500ms crossfade with a brief `accent-soft` atmospheric wash between. 3–4 lead figures total, each with a publication-grade frame (hairline border + the direction-specific luminous `hairline-accent` inner edge), figure number in mono, tabular-nums metric, mono caption line, source line in quaternary. The luminous accent edge on the figure frames is a move unique to this direction — the figures look lit from within.

**Chapter 5 — Close Editorial (bg-1, `#0A0A0A` + residual mesh):**
Return to the hero's base tone. The WebGL gradient mesh **returns at 40% opacity and frozen** (no drift) as a residual atmospheric layer. H2 centered columns 3–10 ("Pronto para a próxima reel?"), lede, primary CTA centered, mono reel counter at top-left (`REEL 05 / CLOSE — FINAL`). The return of the mesh rhymes with the opening — the page fades from mesh, through a sequence of cuts, and back into mesh at the end.

**Chapter 6 — Footer (bg-0, `#000000`):**
Absolute black — the final fade-out after the residual mesh closes. Left: REIS [IA] wordmark, weight 300, `[IA]` in `#4A90FF`. Center: three columns of mono links. Right-bottom: "O Tempo é Rei" watermark in mono quaternary. Copyright below. A final mono strip at the very bottom reads `END OF REEL` in uppercase quaternary — the cinematic signature.

---

## 8. Implementation Brief for vfx-motion-designer

**Patterns to consult (mandatory, in order):**

1. `brain/design-library/patterns/layout/02-chaptered-scroll-composition.md` — the 6-chapter armature
2. `brain/design-library/patterns/three-js/02-shader-gradient-mesh.md` — the hero mesh (signature)
3. `brain/design-library/patterns/gsap-scroll-trigger/01-pinned-hero-reveal.md` — method and proof pinning
4. `brain/design-library/patterns/lenis-smooth-scroll/02-lenis-scrolltrigger-sync.md` — MANDATORY because pinning + Lenis requires the sync trap — failure to consult this will produce visual drift between the scroll and the pin
5. `brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md` — every transition
6. `brain/design-library/patterns/proof/02-publication-grade-figure-frame.md` — proof frames (customized with `hairline-accent` inner edge)
7. `brain/design-library/patterns/proof/01-lottie-number-ticker-on-reveal.md` — proof tickers
8. `brain/design-library/patterns/lenis-smooth-scroll/01-global-smooth-scroll.md` — base scroll

**References to consult for code inspiration (in order):**

1. `brain/design-library/references/arc-browser/observations.md` — chaptered scroll composition (line 15), scroll-linked background tonal shifts, `--fonts-*` named role tokens
2. `brain/design-library/references/vercel/observations.md` (if present) — tonal shift background choreography
3. `brain/design-library/references/linear/observations.md` — 4-step ladder, accent restraint inside chapters (the non-hero chapters in this direction inherit Linear's discipline)
4. Apple iPhone Pro / Porsche Taycan / Polestar / Rivian — **mood only**, do NOT harvest. These inform the cinematic register but are flagged as anti-bot in `reis-ia-home-mvp.md` lines 186-187. Use them as inspiration for the gradient mesh color temperament and the pacing of the pinned chapters.
5. `brain/design-library/references/cursor/observations.md` (if present) — poetic-to-technical pivot, used here for the mesh-to-pinned-method flow

**Dependencies allowed:**

- **Lenis** (~12KB) — mandatory base smooth scroll
- **GSAP 3 + ScrollTrigger** (~65KB gzip) — mandatory for the pinning and the scripted chapter cuts
- **Three.js** (~150KB gzip) — mandatory for the hero gradient mesh. A lightweight custom WebGL shader (without Three.js, ~15KB) is acceptable if the vfx-motion-designer can implement the mesh in raw WebGL. Preference: custom shader if feasible, Three.js as fallback.
- NO React Three Fiber in the iteration (the iteration is a standalone HTML file, not a React app — save R3F for integration into the Astro site)
- Inter + JetBrains Mono via Google Fonts or self-hosted, wider subset than the other directions (weights 300/400/500/600 for Inter to support the lighter cinematic headline weight)

**Performance budget:**

- JS: < 250KB gzipped — THIS DIRECTION HAS THE LARGEST JS BUDGET of the three by design. Three.js + GSAP + Lenis + direction logic. The vfx-motion-designer should target < 200KB if a custom WebGL shader replaces Three.js.
- CSS: < 50KB gzipped
- Fonts: < 100KB total
- First contentful paint: < 1.8s on 3G Fast (larger JS bundle pushes this slightly)
- 60fps on the hero gradient mesh — this is the hardest performance target in the direction. The shader must be profiled on mid-tier hardware. Fallback: static gradient image if shader fails to maintain 60fps on a reference device (profile against a 2020 MacBook Air M1 as the floor).
- 60fps on the scroll-pinned method and proof chapters — requires the Lenis+ScrollTrigger sync trap to be correctly wired, or the pin will desync from the scroll.

**Accessibility (mandatory):**

- `prefers-reduced-motion: reduce` must:
  - Freeze the hero gradient mesh at a single frame (no drift) — or replace with the static hero image fallback
  - Collapse all chapter cuts to instant background swaps with plain opacity fade-ins
  - Unpin the method and proof chapters — show all phases / figures stacked vertically, visible without scroll-pin
  - Set Lenis to native scroll
  - Instant number values in proof
  - Disable the residual mesh in the close chapter
- Focus rings: 2px `#4A90FF`, 2px offset, always visible on `:focus-visible`
- All figures use `<figure>` + `<figcaption>`
- Chapters use semantic `<section>` with `aria-label` including the reel number and chapter name
- Color contrast: all text meets WCAG AA on every tonal grade step
- The pinned method chapter must be navigable without scrolling (keyboard users should be able to tab through the phase content naturally — each phase must have a semantic anchor)

**Minimum viable scope (what MUST ship in the standalone HTML iteration):**

1. Full Chapter 1 (hero) with **working WebGL gradient mesh** (or custom shader) and the cinematic H1 block-fade reveal — this is non-negotiable, the mesh IS the direction
2. At least ONE working chapter-to-chapter film cut (hero → pillars) — the scripted background shift + atmospheric wash + content fade-in — this is the second non-negotiable signature
3. Chapter 3 (method) with the **pinned typographic reveal** — at least 3 phases revealing on scroll in the right column while the left column holds
4. Chapter 4 (proof) with at least 2 publication-grade figure frames with **luminous accent inner edges**, animated number tickers
5. Chapter 5 (close) with the **residual frozen mesh** at 40% opacity
6. Chapter 6 (footer) with `END OF REEL` mono strip and "O Tempo é Rei" watermark
7. Lenis + ScrollTrigger sync correctly wired
8. `prefers-reduced-motion` fallback on all motion layers — especially the mesh freeze and the chapter unpinning
9. Mono reel marks in every chapter corner

Chapters 2 (vertically chaptered pillars) can be partially stubbed if time is constrained — a single pillar reel demonstrates the pattern. But cut nothing from chapters 1, 3, and 4 — those are the triad that defines the direction. The signature moves are: the WebGL hero mesh, the film-cut chapter transitions, the pinned typographic method chapter, the Bloomberg-style pinned proof chapter, and the residual frozen mesh in the close. If those five things land, the direction is faithfully represented. If the mesh cannot ship as WebGL in the iteration, ship the static hero image fallback and flag the mesh as a Phase 2 integration — but the direction is meaningfully diminished without the mesh, and the vfx-motion-designer should exhaust every option to deliver it.
