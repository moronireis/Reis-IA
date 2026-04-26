# Direction 2 — Architectural Precision

Last updated: 2026-04-15
Art Director: art-director (REIS [IA])
Status: Brief — ready for vfx-motion-designer
Lineage: Linear + Vercel + Raycast + Cursor + Framer

---

## 1. Concept & Soul

Architectural Precision is the REIS [IA] home composed as a pro tool that happens to be a marketing page. It is what Linear and Raycast have been teaching the industry for three years: density can feel premium if the breath is engineered, monospace can be editorial if it behaves like a label in a field manual, and a dark surface can feel inhabited if a single radial spotlight tracks the pointer as if the page itself were listening. This direction trusts that the executive on the other side of the screen is the kind of operator who opens Raycast forty times a day and who reads product releases on linear.app because they are better-written than most business journalism. The soul is engineered calm. The page is dense in its middle — the method chapter is a scripted state-machine demo, not a prose essay — but the density is held in check by a near-black tonal ladder that shifts chapter by chapter, by mono labels that function as editorial apparatus, and by a hero radial spotlight that gives the dark the quality of an empty stage lit for one performer. The accent blue is rationed but present: it underlines the active state in the demo, it tints focus rings, it fills the primary CTA, it shows up as a figure-number chip in the proof chapter. Motion is scripted and precise, never flowing — it clicks into place, it doesn't glide. Every transition has the feel of a keyboard command being executed, not of an animator easing something into view.

> Pull quote: "Feels like opening a Raycast prompt in a room that was waiting for you."

---

## 2. Editorial Typography System

Inter across the board, set with pro-tool discipline. Slightly tighter display scale than Direction 1 because this direction trades typographic grandeur for informational density. The mono companion is a co-protagonist, not a label — it runs as editorial punctuation throughout.

**Display scale (precise, confident, not oversized):**

- **H1 — Hero Prime**: `clamp(56px, 6.8vw, 96px)`, weight 600, letter-spacing `-0.03em`, line-height `1.02`. This is Linear / Cursor territory — confident but not magazine-oversized. The headline is precise, not monumental.
- **H2 — Chapter Mark**: `clamp(40px, 4.4vw, 64px)`, weight 600, letter-spacing `-0.02em`, line-height `1.08`.
- **H3 — Section / Card title**: `clamp(22px, 2vw, 28px)`, weight 600, letter-spacing `-0.01em`, line-height `1.25`.
- **H4 — Card sub / feature**: `clamp(16px, 1.3vw, 18px)`, weight 600, letter-spacing `0`, line-height `1.35`.

**Body scale:**

- **Body Prime**: `16px/1.6` desktop, `15px/1.55` mobile. Inter 400. Neutral tracking. This is denser than Direction 1 on purpose — pro-tool pages read at 16px, not 18px.
- **Body Secondary**: `14px/1.55`, Inter 400, tertiary color. For helper text inside cards and demo panels.
- **Lede**: `clamp(18px, 1.4vw, 20px)`, Inter 400, line-height `1.5`, max 3 lines under any H2.

**Metadata / micro (mono — co-protagonist):**

- **Mono Family**: JetBrains Mono, weight 400–500. The mono is used more aggressively than in Direction 1 — it is not only for figure numbers, it also labels every demo state, every chapter mark, every keyboard shortcut hint, every hover-revealed metadata strip.
- **Mono base**: `12px/1.4`, letter-spacing `0.04em`, uppercase — chapter marks, state labels, keyboard hints
- **Mono medium**: `14px/1.5`, mixed case — code-like content inside the demo panel
- **Mono micro**: `11px/1.3`, uppercase — source lines, footnotes, system strip

**Keyboard key caps:**

Mono inside a `<kbd>` element with a hairline border, `8px` radius, `2px 6px` padding, tertiary text color. Used in the hero ("Press ⌘K to start") and in the method demo to label interactions. This is a direct steal from Raycast and Linear.

**Pairing philosophy:**

In this direction, Inter and JetBrains Mono behave as **co-editors** rather than as a master-servant pair. Display Inter announces chapters. Body Inter carries prose. Mono runs underneath everything as an apparatus layer — labels, states, keyboard hints, system strips, figure numbers, timestamps. The mono layer is what tells the executive reader "this is a tool, not a brochure". The mono is never decorative; every mono string is either a label, a state, or a number.

**OpenType features (mandatory):**

- `font-feature-settings: "tnum" 1, "zero" 1, "ss01" 1, "cv11" 1;` on mono globally
- `font-variant-numeric: tabular-nums;` on all numeric content
- `text-rendering: optimizeLegibility;`
- `-webkit-font-smoothing: antialiased;` on dark backgrounds
- Smart quotes throughout

**Max measure:**

Prose columns cap at `640px` (denser than Direction 1's 720px — matches the pro-tool register). Method-demo panel cards have their own internal measure of `480px`.

---

## 3. Color System (near-black ladder + accents)

**Near-black ladder (4 steps used aggressively as chapter + component tonal shifts):**

- `--bg-0: #000000` — absolute black, reserved for the hero only
- `--bg-1: #0A0A0A` — default page surface (most of the page)
- `--bg-2: #141414` — card surfaces, demo panel, figure frames
- `--bg-3: #1A1A1A` — inner card surfaces, nested panels, keyboard key caps, code blocks

The ladder is used as **component layering** AS WELL as chapter shifts. Cards on `bg-1` have `bg-2` fills; nested elements inside those cards have `bg-3` fills. The tonal ladder is legible as depth — the more "inward" a surface is, the closer to `bg-3` it sits. This is the Linear lesson applied at component scale.

**Accent discipline (more permissive than Direction 1, still rationed):**

- `--accent: #4A90FF` — electric blue, primary accent
- `--accent-bright: #6AADFF` — 20% lighter, for hover states on blue surfaces
- `--accent-dim: rgba(74, 144, 255, 0.16)` — for blue-tinted backgrounds (active demo state highlights)

Allowed surfaces for `#4A90FF`:
- Primary CTA (filled button, 1 location per page)
- Hero radial spotlight tint (blue center bleeding into black — the signature hero effect)
- Active state indicator in the method demo state-machine (the currently-playing phase gets a 2px `#4A90FF` left border and a `#4A90FF` mono label)
- Figure-number chips in the proof chapter (small `bg-2` rounded chips with `#4A90FF` mono text)
- Focus rings on all interactive elements (2px outline, 2px offset)
- Link hover underlines (150ms color transition)

**Rule**: accent may appear up to **5 times per viewport** in this direction (vs 2 per chapter in Direction 1). More than 5 per viewport triggers a design review — density is the goal, not saturation.

**Text hierarchy (on dark):**

- `--text-primary: #FFFFFF` — headlines, CTAs, primary body, active states
- `--text-secondary: rgba(255, 255, 255, 0.70)` — default body, card descriptions
- `--text-tertiary: rgba(255, 255, 255, 0.50)` — captions, mono labels, metadata
- `--text-quaternary: rgba(255, 255, 255, 0.32)` — source lines, system strips, placeholders

**Hairlines:**

- `--hairline: rgba(255, 255, 255, 0.08)` — card borders, panel outlines, separators
- `--hairline-strong: rgba(255, 255, 255, 0.14)` — active-state card borders, focused panels
- `--hairline-blue: rgba(74, 144, 255, 0.28)` — active demo state left border, focus rings

Glass morphism is **not** used. Hairlines are flat. The depth is tonal, not blurred.

**Forbidden in Direction 2 specifically:**

- Oversized magazine-scale display type (reserved for Direction 1)
- Gradient mesh backgrounds (reserved for Direction 3)
- Full-bleed chapter transitions with tonal fades (reserved for Direction 3)
- Parallax of any kind
- Any use of `#4A90FF` outside the 6 allowed surfaces above
- Any glow effect on text (glow is reserved for the radial spotlight only)
- All base brand-lock prohibitions (gold, amber, chess, crowns, gradient text, emojis)

---

## 4. Grid & Composition

**Structural grid:**

- 12-column desktop, `1240px` max content width, 32px gutters (slightly wider gutters than Direction 1 because the denser content benefits from more breathing room)
- 4-column mobile (375px+, 20px gutters)
- Symmetric grid — this direction does NOT use the asymmetric editorial offset of Direction 1. Precision means alignment.

**Vertical rhythm:**

- `--section-py-xl: 160px` — between chapters
- `--section-py-lg: 96px` — inside a chapter between header and body
- `--section-py-md: 48px` — between sibling blocks
- `--section-py-sm: 24px` — between tight related elements
- Scale on mobile: multiply by 0.6

**Whitespace philosophy:**

Engineered breath. Whitespace is calibrated, not lavish. Each chapter is given enough air to feel composed but not empty — the method-demo chapter in particular earns its density by being bracketed with 160px of air above and below. This is the Linear lesson: premium density means the content is dense but the frame is generous.

**Chapter-to-grid mapping (6 chapters + footer):**

- Chapter 1 (Hero): full-bleed 100vh on `bg-0`, H1 centered-left in columns 2–9, mono chapter mark above, keyboard hint below CTA
- Chapter 2 (Pillars): `bg-1`, H2 in columns 1–7, three pillar cards as a symmetric 3-up grid (columns 1–4, 5–8, 9–12), each card on `bg-2` with hairline border
- Chapter 3 (Method Demo): `bg-1`, H2 in columns 1–7, then a single full-width scripted demo panel spanning columns 1–12, `bg-2` surface with nested `bg-3` state panels — this is the signature moment of this direction
- Chapter 4 (Proof): `bg-1`, H2 in columns 1–7, then a symmetric 4-up metric grid (columns 1–3, 4–6, 7–9, 10–12) with `proof/02-publication-grade-figure-frame.md` frames
- Chapter 5 (Close): `bg-0`, H2 centered columns 3–10, CTA centered below, keyboard hint mono line below CTA
- Footer: `bg-1`, columns 1–12

---

## 5. Motion Language

This direction has the largest motion budget of the three — but every motion is **scripted and precise**, never flowing. Motion clicks into place.

**The ONE hero motion moment:**

A **radial spotlight that follows the pointer**, implemented via a CSS custom property updated on `pointermove` at rAF cadence. The spotlight is a `radial-gradient(600px circle at var(--x) var(--y), rgba(74, 144, 255, 0.18), transparent 70%)` layered over the hero `bg-0`. The center tints electric blue, bleeding into black at the edges. On first load, the spotlight eases in from `0` opacity to full over 800ms using the house curve, centered at the H1 baseline. After that, it follows the pointer with a 120ms lerp. On touch devices, the spotlight settles at a fixed position (35% from left, 55% from top) and slowly breathes (10s cycle, `opacity: 0.7 → 1 → 0.7`).

This is a direct adaptation of the Linear radial-spotlight technique noted in `references/linear/observations.md` line 19.

**Chapter-level motion rules:**

- Chapter reveals: `opacity: 0 → 1, translateY: 32px → 0` on the chapter container, IntersectionObserver at 15% visibility, 700ms duration, house curve, staggered children (H2 → lede → body block) with 80ms intra-chapter stagger
- Chapter-to-chapter: no film cut, no hijack — native Lenis smooth scroll (`lerp: 0.12`, slightly more responsive than Direction 1's 0.1). The tonal shift between chapters (bg-0 → bg-1 → bg-1 → bg-1 → bg-0) does the breath.

**Component-level motion (this is where the direction breathes):**

- **Primary CTA**: magnetic cursor from `editorial/02-magnetic-cursor-cta.md` — the button translates ±6px toward the pointer within a 80px radius, rAF-lerp at 0.18. On click, 80ms scale-to-0.97 and back. This is the pro-tool signature.
- **Cards (pillars)**: hover state is a 200ms transition that raises the `--hairline` from 0.08 to 0.14 and shifts the card background from `bg-2` to a subtle `#161616`. No lift, no shadow, no scale. Precise, not showy.
- **Links**: 150ms color transition from secondary to primary on hover, plus a 2px `#4A90FF` underline that slides in from left-0 to full-width in 200ms using the house curve.
- **Focus rings**: 2px `#4A90FF` outline with 2px offset, appearing in 120ms on `:focus-visible`.
- **Method demo state-machine**: the signature component. See below.
- **Number tickers**: `proof/01-lottie-number-ticker-on-reveal.md` on scroll-in, tabular-nums, 1200ms, house curve.

**Method demo state-machine (the signature):**

Uses `hero-effects/03-scripted-state-machine-demo.md`. A scripted "product demo without video" — a panel that cycles through 4–5 phases of the Revenue-First method on a timed loop (2.5s per phase), with each phase having:
- A mono label in the left strip (`PHASE 01 / DIAGNOSE`, `PHASE 02 / MAP`, etc.)
- A dim `bg-3` background for inactive phases
- A `#4A90FF` left border (2px) and `bg-3` with `accent-dim` tint for the active phase
- A small content card that fades in with 300ms when the phase becomes active
- A thin progress bar at the bottom of the panel that scrubs across all phases (0 → 100% across the full cycle)

Pause on hover. Reset on scroll-out (so the reader always sees the demo from phase 01 when they scroll in). This is the one place in the direction where motion is continuous — and it is deliberately the center of gravity.

**Prohibited in Direction 2:**

- Word-by-word headline reveal (reserved for Direction 1)
- Gradient mesh backgrounds or WebGL shaders (reserved for Direction 3)
- Parallax or scroll-linked transforms beyond the spotlight
- Film-cut chapter transitions (reserved for Direction 3)
- Any animation longer than 1200ms (except the looping demo, which is a state machine, not an animation)
- Any animation that does not respect `prefers-reduced-motion`

**Patterns to use (from `brain/design-library/patterns/`):**

- `lenis-smooth-scroll/01-global-smooth-scroll.md` — mandatory base
- `motion/02-ease-out-expo-house-curve.md` — every transition
- `hero-effects/03-scripted-state-machine-demo.md` — THE method demo (signature)
- `editorial/02-magnetic-cursor-cta.md` — primary CTA
- `proof/01-lottie-number-ticker-on-reveal.md` — proof chapter
- `proof/02-publication-grade-figure-frame.md` — proof chapter frames
- `layout/02-chaptered-scroll-composition.md` — the 6-chapter armature
- *(The radial spotlight itself is not yet a distilled pattern in the library — this direction's implementation should be suggested as a new pattern at `hero-effects/04-radial-pointer-spotlight.md` after the iteration.)*

---

## 6. Hero Treatment

The hero is `bg-0` (`#000000`) with a pointer-tracked radial spotlight tinting toward `#4A90FF` at the center. The composition is type-centered with a pro-tool metadata strip and a keyboard hint.

**Layout (desktop):**

```
[mono top strip: "REIS [IA] — SYSTEMS / BUILDERS / MARKETING"] (top absolute, col 1-12)

[mono chapter mark: "CH.01 / OPENING"]         (col 2, 180px from top)

[H1 headline — 2 lines,
 clamp(56px, 6.8vw, 96px), weight 600,
 letter-spacing -0.03em, line-height 1.02,
 left-anchored cols 2-9]                        (col 2-9, 220px from top)

[lede paragraph — max 3 lines,
 cols 2-7 at 640px measure,
 18-20px, secondary]                            (col 2-7, below H1)

[primary CTA "Agendar diagnóstico →" (magnetic)
 + keyboard hint kbd: "⌘ K"
 + echo link "Ver método →"]                    (col 2-5, below lede)

[mono bottom strip: system status-line,
 "V1.0 / DARK / 2026" left
 and "SCROLL TO EXPLORE ↓" right]               (bottom absolute, col 1-12)
```

**Headline construction:**

Two-line declarative statement. No underlines, no blue words in the hero type — the accent is carried by the spotlight tint behind the type, not by the type itself. Example: "AI vira receita quando / o método é arquitetura."

**Signature motion moment:**

The radial spotlight (see Section 5). On first load, spotlight eases in from 0 opacity over 800ms. Then it follows the pointer with a 120ms lerp. The hero H1 and lede fade in over 500ms using the house curve — no word splitting, just a clean block fade. The CTA and kbd hint fade in 200ms after the lede with a slight upward translate. The total hero entrance is ~1s and then the only continuous motion is the spotlight tracking.

**Background:**

`#000000` base with the radial spotlight as an overlay layer. Nothing else — no mesh, no grain, no noise. The spotlight is the atmosphere.

**Hero image prompts:**

This direction does NOT commission a generative hero image. The hero is purely typographic with a generated radial effect. If an alternate visual hero is needed for A/B:

> "An empty matte-black stage lit by a single overhead architectural spotlight tinted electric blue at the center, bleeding into pure black at the edges, shot at f/1.8, 50mm, studio environment, architectural negative space, subtle atmospheric haze, film grain, no performers, no objects, no text, editorial tech aesthetic, Linear.app meets stage photography." — Gemini/Flux, 16:9.

---

## 7. Chapter Breakdown

**Chapter 1 — Hero (bg-0, `#000000`):**
See Section 6. Radial spotlight, centered-left typography, magnetic CTA, keyboard hint, mono system strips top and bottom. 100vh.

**Chapter 2 — Pillar Reveal (bg-1, `#0A0A0A`):**
Mono chapter mark (`CH.02 / PILLARS`), H2 in columns 1–7 ("Três sistemas. Uma única tese de receita."), lede, then a **symmetric** 3-up pillar card grid. Each card is `bg-2` with hairline border, card H3, one-paragraph body, and a mono tag footer. Hover state: hairline from 0.08 to 0.14 and background shift to `#161616`. No icons, no color. The symmetry (4 + 4 + 4 cols) is the difference from Direction 1's asymmetric stagger.

**Chapter 3 — Method Demonstration (bg-1, `#0A0A0A`):**
Mono chapter mark (`CH.03 / METHOD`), H2 ("O método como state machine"), lede, then the **scripted state-machine demo panel** spanning columns 1–12. This is the defining chapter of this direction and the most aggressive departure from Direction 1. The panel is a `bg-2` card with 5 phases listed vertically on the left (mono labels, `bg-3` inactive, `#4A90FF` border + `accent-dim` bg when active) and a content area on the right showing the content of the active phase. A progress bar scrubs across the bottom. Cycle runs on a 12.5s loop. Pauses on hover. Resets on scroll-out. A `<kbd>SPACE</kbd>` hint below the panel reads "Pressione espaço para pausar" (actual pause binding optional but aesthetically important).

**Chapter 4 — Proof (bg-1, `#0A0A0A`):**
Mono chapter mark (`CH.04 / PROOF`), H2 ("Números"), lede, then a **symmetric** 4-up metric grid. Each metric is a `proof/02-publication-grade-figure-frame.md` frame with a figure-number chip in `#4A90FF` mono, a large tabular-nums metric (72–96px), a mono caption line, and a source line in `text-quaternary`. Numbers animate once via `proof/01-lottie-number-ticker-on-reveal.md`. The symmetric grid is different from Direction 1's asymmetric stagger — this direction's proof chapter reads as a dashboard, not as a magazine spread.

**Chapter 5 — Close Editorial (bg-0, `#000000`):**
Return to absolute black. Mono chapter mark (`CH.05 / CLOSE`), centered H2 in columns 3–10 ("Quando você estiver pronto para ver o sistema por dentro."), centered magnetic CTA, centered keyboard hint (`<kbd>⌘</kbd> + <kbd>K</kbd>` mono label). The return to `bg-0` rhymes with the hero — the page opens and closes on pure black.

**Chapter 6 — Footer (bg-1, `#0A0A0A`):**
Mono-heavy system strip footer. Left: REIS [IA] wordmark, weight 300, `[IA]` in `#4A90FF`. Center: three columns of mono nav links (lowercase, `text-tertiary`). Right: system strip mono block listing `VERSION / 1.0`, `BUILT / 2026`, `STATUS / LIVE` in 3 lines. Bottom right: "O Tempo é Rei" watermark in `text-quaternary` mono, 11px uppercase. Copyright mono below.

---

## 8. Implementation Brief for vfx-motion-designer

**Patterns to consult (mandatory, in order):**

1. `brain/design-library/patterns/layout/02-chaptered-scroll-composition.md` — the 6-chapter armature
2. `brain/design-library/patterns/hero-effects/03-scripted-state-machine-demo.md` — THE method demo, the single most important pattern for this direction
3. `brain/design-library/patterns/editorial/02-magnetic-cursor-cta.md` — primary CTA behavior
4. `brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md` — every transition
5. `brain/design-library/patterns/proof/01-lottie-number-ticker-on-reveal.md` — proof tickers
6. `brain/design-library/patterns/proof/02-publication-grade-figure-frame.md` — proof frames
7. `brain/design-library/patterns/lenis-smooth-scroll/01-global-smooth-scroll.md` — base scroll

**References to consult for code inspiration (in order):**

1. `brain/design-library/references/linear/observations.md` — radial spotlight technique (line 19), 4-tone ladder as component layering, accent restraint
2. `brain/design-library/references/raycast/observations.md` (if present) — mathematical stacking, monospace punctuation, density with dignity
3. `brain/design-library/references/cursor/observations.md` (if present) — poetic-to-technical pivot (hero-to-method flow, exactly what this direction does)
4. `brain/design-library/references/vercel/observations.md` (if present) — tonal shifts between chapters
5. `brain/design-library/references/framer/observations.md` (if present) — component-gallery discipline for pillar cards

**Dependencies allowed:**

- Vanilla JS preferred, but small focused libraries are permitted:
  - **Lenis** (~12KB) — mandatory base smooth scroll
  - **Optionally GSAP core** (~30KB gzip) — only if the magnetic cursor and state-machine demo cannot be cleanly implemented in vanilla rAF. Default preference: vanilla rAF.
- No Three.js, no WebGL, no Framer Motion, no Spline
- Inter + JetBrains Mono via Google Fonts or self-hosted (Latin subset, Inter 400/500/600, Mono 400/500)

**Performance budget:**

- JS: < 60KB gzipped (Lenis + state-machine + magnetic + ticker + spotlight + rAF orchestration). If GSAP is pulled in, the budget still holds.
- CSS: < 40KB gzipped
- Fonts: < 90KB total
- First contentful paint: < 1.4s on 3G Fast
- 60fps pointer tracking on the hero spotlight (rAF-batched `pointermove`, never per-event DOM mutation)
- 60fps state-machine demo (CSS transitions on opacity/border, never layout thrash)

**Accessibility (mandatory):**

- `prefers-reduced-motion: reduce` must:
  - Freeze the radial spotlight at center position (no pointer tracking, no breathing)
  - Disable the magnetic cursor (static button)
  - Stop the state-machine demo auto-cycle; show all phases statically stacked, or show only the first phase with arrow keys for manual navigation
  - Set Lenis to native scroll
  - Instant number values in proof (no count-up)
- `<kbd>` elements semantically tagged; keyboard shortcuts announced via `aria-keyshortcuts` where applicable
- Focus rings: 2px `#4A90FF` outline, 2px offset, always visible on `:focus-visible`, never `outline: none`
- The state-machine demo must be keyboard-navigable (tab → space to pause → arrow keys to step)
- All figures use `<figure>` + `<figcaption>`
- Color contrast: all combinations meet WCAG AA on the tonal ladder

**Minimum viable scope (what MUST ship in the standalone HTML iteration):**

1. Full Chapter 1 (hero) with working pointer-tracked radial spotlight and magnetic CTA
2. Chapter 2 (pillars) with the symmetric 3-up card grid and hover state
3. **Chapter 3 (method demo) fully working** — scripted state-machine cycling through at least 4 phases with active-state styling, progress bar, pause on hover. This is non-negotiable: this chapter IS the direction.
4. Chapter 4 (proof) with at least 2 publication-grade figure frames, figure-number chips in `#4A90FF` mono, and animated number tickers
5. Chapter 5 (close) with centered H2, magnetic CTA, keyboard hint
6. Chapter 6 (footer) with mono system strip and "O Tempo é Rei" watermark
7. Near-black ladder applied (bg-0 for hero and close, bg-1 everywhere else)
8. Lenis smooth scroll
9. `prefers-reduced-motion` fallback on all motion layers

The signature moves are: the radial spotlight, the magnetic CTA, the scripted state-machine demo, the mono apparatus layer, and the symmetric density of the proof grid. If those five things land with the tonal ladder applied, the direction is faithfully represented. Chapters 3 and 4 carry the identity of the direction — do not cut corners there. Hero is important but secondary; the state-machine demo is what will make the executive viewer say "this is a tool, not a brochure".
