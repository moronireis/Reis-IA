# REIS [IA] Home MVP — Art Direction Iterations

Last updated: 2026-04-15
Art Director: art-director (REIS [IA])
Status: 3 directions briefed, ready for vfx-motion-designer to implement as standalone HTML iterations
Source mood report: `brain/design-library/mood-reports/reis-ia-home-mvp.md`
Source patterns index: `brain/design-library/patterns/INDEX.md`

---

## Purpose

This workspace holds the three distinct art directions for the REIS [IA] home page MVP. Each direction is a **complete creative thesis**, not a variation of the same idea. The three are meant to be genuinely different so that choosing one is a real aesthetic decision — not a micro-tweak.

The vfx-motion-designer implements each direction as a standalone HTML iteration (`direction-1.html`, `direction-2.html`, `direction-3.html`). Moroni and the brand team then pick the direction that will become the production home. The losing directions are preserved here as part of the design library — their signature moves can be harvested for future surfaces.

---

## The 3 Directions — Side by Side

| Dimension | Direction 1 — Editorial Gravity | Direction 2 — Architectural Precision | Direction 3 — Cinematic Gravity |
|---|---|---|---|
| **Concept** | REIS home as a financial-essay FT editorial in dark mode | REIS home as a pro tool that happens to be a marketing page | REIS home as a film — scroll-as-narrative |
| **Lineage** | Mercury + Pentagram + Stripe + Bureau Borsche + Ramp | Linear + Vercel + Raycast + Cursor + Framer | Arc Browser + Apple iPhone Pro + Porsche + Polestar + Bloomberg Graphics |
| **Typographic register** | Inter, oversized magazine display (up to 128px), tight tracking, narrow 720px prose | Inter, precise pro-tool display (up to 96px), 640px prose, mono as co-protagonist | Inter, cinematic display (up to 112px) at *lighter* weight 500, chapter-variable H2 scale, 680px prose |
| **Color rules** | Accent `#4A90FF` max 2x per chapter, only on CTA + 1 hero underline word + proof figure numbers. Blue is ink. | Accent `#4A90FF` max 5x per viewport. CTA + radial spotlight + demo active state + figure chips + focus rings + link hovers. Blue is punctuation. | Accent `#4A90FF` is the hero atmosphere (gradient mesh), then restrained like Direction 1 in chapters 2–5. Includes sub-brand `#2D7AFF` + `#00B4FF` in mesh only. Blue is **light**. |
| **Near-black ladder use** | Chapter breath (each chapter sits on a tonal step for whitespace rhythm) | Component layering + chapter shifts (cards on bg-2, nested on bg-3) | Film color grading (each chapter is a reel with its own grade, transitions animate between steps) |
| **Hero treatment** | Pure typographic statement on absolute black. Word-by-word H1 reveal with a single blue underline draw on the operative word. Nothing else. | `#000000` base with **pointer-tracked radial spotlight** tinted `#4A90FF`. H1 block-fade, magnetic CTA, keyboard hint. Pro-tool stage-lit frame. | `#0A0A0A` base with **WebGL shader gradient mesh** drifting electric blue. Cinematic H1 block-fade at lighter weight 500, centered composition, mono reel apparatus at corners. |
| **Signature moment** | Single blue underline drawing left-to-right under one word of the H1 after the word-by-word reveal lands | Radial spotlight following the pointer + scripted state-machine method demo cycling through phases with accent-blue active state | WebGL gradient mesh + scripted film-cut chapter transitions (300ms background grade + atmospheric wash + content fade-in) |
| **Method chapter approach** | Editorial prose at 720px measure + one publication-grade text-figure frame. No interaction. | **Scripted state-machine demo widget** cycling through phases on a 12.5s loop, pause on hover, reset on scroll-out. | **Pinned typographic reveal** — chapter pins for 3x viewport while method phases reveal in right column with horizontal clip-path wipes. |
| **Proof chapter approach** | Asymmetric figure grid (one hero metric col 1-8, two supporting col 9-12). Publication-grade frames. Mono figure numbers in blue. | Symmetric 4-up metric dashboard grid. Figure-number chips in `#4A90FF` mono. Reads as a pro dashboard. | Bloomberg-feature pinned cycling — lead figures hold while captions reveal line by line, 500ms crossfade between figures, luminous `#4A90FF` inner border on frames. |
| **Motion budget** | Minimum — word reveal + chapter fades + number tickers + link hovers. Nothing continuous. | Medium — radial spotlight (continuous rAF), magnetic CTA, scripted state-machine demo loop, chapter fades. Most motion *components* but all scripted. | Maximum — WebGL mesh drifting, film-cut chapter transitions, scroll-pinned chapters for method and proof, residual mesh in close. Highest JS budget. |
| **Dependencies** | Vanilla JS + Lenis. No GSAP, no Three.js, no Framer. ~30KB JS. | Vanilla JS + Lenis (+ optional GSAP core). No Three.js. ~60KB JS. | Lenis + GSAP + ScrollTrigger + Three.js (or custom WebGL shader). ~200-250KB JS. |
| **Performance target** | FCP < 1.2s / 3G Fast. Trivial 60fps. | FCP < 1.4s / 3G Fast. 60fps pointer tracking + state-machine timing. | FCP < 1.8s / 3G Fast. 60fps WebGL mesh + scroll-pinned sync (hardest target). |
| **Chapter count** | 5 content + footer | 6 content + footer | 6 content + footer |
| **Grid** | Asymmetric editorial (prose in cols 1-7, gutter for mono metadata in 8-12) | Symmetric 12-col, card layouts aligned to the grid | Symmetric with pinned asymmetric composition in method and proof |
| **Whitespace philosophy** | Lavish. 200px between chapters. Whitespace is the composition. | Engineered. 160px between chapters. Breath is calibrated, not generous. | Cinematic. 180px between chapters, but filled by the scripted atmospheric wash during transitions. Whitespace is active. |
| **Mono usage** | Editorial apparatus only (chapter marks, figure numbers, source lines) | Co-protagonist (chapter marks + figure chips + state labels + keyboard hints + system strips + source lines) | Film apparatus (reel numbers, timecodes, chapter marks, source lines) positioned as absolute-corner strips |
| **Soul** | *"Reads like an FT editorial printed on obsidian."* | *"Feels like opening a Raycast prompt in a room that was waiting for you."* | *"Scrolls like a Koyaanisqatsi cut. Holds like a Bloomberg feature."* |

---

## Typographic Note (Serif Question Deferred)

All three directions use **Inter only** for the MVP iteration. The open question of adding a display serif (raised by the Mercury observation at `references/mercury/observations.md` line 15) is **deferred** until after the three iterations are reviewed. The serif decision is a brand-lock amendment and must be escalated to `designer-agent` / `company-brand-strategist` before any iteration adopts it.

If after seeing the three directions Moroni wants to test the serif hypothesis, Direction 1 (Editorial Gravity) is the natural candidate to re-iterate with a display serif on H1/H2 while keeping Inter for body and mono — this would push it closer to the Mercury / Pentagram register it already emulates. Directions 2 and 3 are Inter-native by construction and should not be retrofit with serif.

**For MVP: Inter only. All three directions. No exceptions.**

---

## What the Iterations Will Look Like (Implementation Order)

Recommended implementation order for the vfx-motion-designer, ordered by increasing motion complexity and dependency weight:

1. **Direction 1 — Editorial Gravity** (first). Cheapest and fastest to iterate. Vanilla JS + Lenis only. Tests the typographic and whitespace thesis without motion-engineering risk.
2. **Direction 2 — Architectural Precision** (second). Medium complexity. Adds the radial spotlight and the scripted state-machine demo — both are contained components that can be tested in isolation.
3. **Direction 3 — Cinematic Gravity** (third). Highest complexity. Requires Lenis+ScrollTrigger sync, WebGL shader, and scripted chapter cuts. Expect the longest implementation cycle. Build last so the team has maximum runway.

Each iteration ships as a standalone HTML file in this directory: `direction-1.html`, `direction-2.html`, `direction-3.html`. They should share a common `tokens.css` file for the near-black ladder, accent, text hierarchy, hairlines, and font stack — but every other CSS and JS file lives inside the direction it belongs to.

---

## Decision Criteria (for the reviewer)

When Moroni and the brand team pick the winning direction, evaluate against these criteria in order:

1. **Brand identity test** — "If I cover the REIS [IA] wordmark, do I still know this is REIS?" The direction that passes this test most confidently wins.
2. **Executive-register test** — Would a C-level CFO who opens this page in the first 3 seconds feel they are in the right room? Which direction lands the fastest emotional match?
3. **Restraint test** — Does the direction earn its motion, or does it spend it? The premium refs all showed restraint. The winning direction should be the one whose motion feels *necessary*, not decorative.
4. **Scalability test** — Can the rest of the site (methodology deep-dives, case studies, about) be built from this direction's tokens and patterns without importing a new design vocabulary? Direction 1 scales most easily; Direction 3 scales with the most effort.
5. **Implementation risk test** — Can the direction be built on the current stack (Astro + Tailwind + React islands) without a new framework introduction? All three can, but Direction 3's WebGL mesh is the only one requiring a new runtime dependency (Three.js or custom shader).

---

## Files in This Workspace

- `README.md` — this file
- `direction-1.md` — Editorial Gravity brief (full 8-section art direction)
- `direction-2.md` — Architectural Precision brief (full 8-section art direction)
- `direction-3.md` — Cinematic Gravity brief (full 8-section art direction)
- `direction-1.html` — *(to be created by vfx-motion-designer)*
- `direction-2.html` — *(to be created by vfx-motion-designer)*
- `direction-3.html` — *(to be created by vfx-motion-designer)*
- `tokens.css` — *(shared tokens, to be extracted after Direction 1 lands)*

---

## Changelog

- 2026-04-15 — Initial briefing: 3 art directions written by art-director agent. Inter-only for MVP. Serif question deferred. Ready for vfx-motion-designer implementation.
