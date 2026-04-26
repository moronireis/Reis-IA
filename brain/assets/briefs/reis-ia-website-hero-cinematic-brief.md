# Cinematic Brief — REIS [IA] Website Hero

**Agent**: cinematic-art-director
**Date**: 2026-04-14
**Target**: `reis-ia-website` — home hero (above the fold, first 100vh)
**References consulted**:
- `brain/design-library/references/asimov-academy/` (counter-reference — IA only)
- `brain/design-library/patterns/SEED.md` (patterns 1, 2, 4, 6, 7, 9)
- `brain/design-library/hero-prompts/README.md` (Template B — Architectural Render)
- `.claude/rules/brand-voice.md`, `.claude/rules/brand-audit-checklist.md`

---

## 1. Concept Statement

**"Time, rendered as architecture."**

A single monolithic structure — an hourglass reimagined as a vertical blade of black concrete — stands in a silent, infinite chamber. Scroll is the only force in the world. As the visitor scrolls, a thin seam of electric blue light traces the blade's edge from top to bottom, as if time itself were being measured by the page. The headline is not placed on top of the image; it is embossed into the structure, discovered as the camera pans past.

The hero is a moment, not a panel. It refuses information hierarchy in exchange for weight.

---

## 2. Cinematic Reference

**Shot language**: Wide architectural, low angle (camera at ~1.4m / human eye level), extreme leading lines converging to the vanishing point, negative space dominant (structure occupies lower 45% of frame, atmosphere above).

**Lighting direction**: Single low-key rim light from behind the structure, deep shadow falloff on the near face, volumetric haze at ground level catching the rim bloom. No bounce, no fill. The structure is almost silhouette.

**Color grading**: Blade Runner 2049 cool palette — crushed blacks, desaturated cyan mids, pure black lows. Zero warm notes. No sunset, no gold hour, no daylight.

**Closest visual DNA**: Tadao Ando concrete architecture × Denis Villeneuve atmospherics × Apple product stage photography × Stripe editorial restraint. Zero Asimov Academy DNA — Asimov is a counter-reference (confirmed: WordPress/Elementor stack with no cinematic craft).

**Specifically NOT**: nothing gamified, no cyborg imagery, no "AI brain" cliches, no gears/circuits/matrix rain, no friendly team photography, no stock AI-generated people.

---

## 3. Hero Image Prompt (Gemini 2.5 / Flux / Midjourney)

```
Architectural render of a vertical monolithic blade — an hourglass form compressed into a single 12-meter-tall slab of matte black concrete — standing alone in an infinite silent chamber. The blade has a narrow vertical seam running top to bottom where the two halves of the hourglass meet; the seam glows with a single thread of electric blue light (#4A90FF).

Composition: wide architectural shot, low angle, camera at human eye level, extreme leading lines converging to a vanishing point behind the structure. The blade occupies the lower 45% of the frame, fills the center third horizontally, with infinite negative space above. Rule of thirds broken intentionally — the structure is dead center, monolithic.

Lighting: single low-key rim light from behind the structure, deep shadow falloff on the near face so the blade is almost silhouette. Volumetric haze at ground level catching the rim bloom. No bounce light, no fill. Atmospheric perspective fading to pure black at the top of the frame.

Palette: pure black background (#000000), matte cool concrete in deep charcoal (#1A1A1A to #242427), single thread of electric blue (#4A90FF) along the vertical seam — no other color anywhere in frame.

Texture: subtle film grain throughout, slight chromatic aberration on the blue light edge, shot-on-celluloid imperfection, micro-detail concrete pores on the facade, ground plane has a faint reflective wet sheen to double the blade into its own shadow.

Mood: monolithic, silent, inevitable, measured. The feeling of being alone with a monument.

Technical: 8k resolution, architectural photography, tilt-shift lens emulation, f/8 aperture, deep focus on structure, ARRI Alexa 65 color science, 85mm equivalent focal length.

Style: Tadao Ando concrete architecture meets Blade Runner 2049 color grading meets Apple product stage photography. Dark minimalist. Architectural precision. Editorial — not commercial.

Negative prompt: no people, no cars, no signage, no text overlay in image, no warm tones, no sunset colors, no gold, no amber, no orange, no chess pieces, no crowns, no clutter, no decorative elements, no rainbow, no gradient text, no cartoon, no illustration, no gamified 3D render, no cyborg imagery, no AI brain cliches, no circuit boards, no matrix rain, no happy office people, no stock photography, no lens flare abuse, no bokeh balls, no plastic CGI skin.
```

**Template used**: Template B (Architectural Render) from the hero-prompts skeleton, modulated with Template A lighting discipline.

**Regeneration notes if the first output misses**:
- If the blade reads as too generic monolith, add: "the top of the blade narrows slightly into a point while the base flares imperceptibly — echoing an hourglass silhouette without being literal."
- If the blue seam is too strong, reduce to: "a hairline of electric blue, almost subliminal, only visible where the two halves of the blade meet."
- If the generator adds warm tones, add to negative: "no bronze, no copper, no tungsten, no candlelight, no firelight, no sodium vapor."

---

## 4. Motion Direction (for vfx-motion-designer)

The hero is a **pinned scroll scene**. The visitor arrives; the world does not move until they push it.

### Pattern stack (from SEED.md)

| Layer | Pattern | SEED ref |
|-------|---------|----------|
| Base | Lenis smooth scroll | #9 Lenis foundation |
| Background | Cinematic gradient mesh (blue bloom drift) | #7 mesh |
| Grain | SVG fractal noise overlay | #6 noise grain |
| Hero scene | GSAP ScrollTrigger pinned reveal | #2 pinned |
| Headline | SplitText / CSS span letter reveal | #4 type reveal |
| Scroll depth | ScrollTrigger parallax on background grid | #1 parallax grid |

### Choreography (exact scroll beats)

**Beat 0 — T=0 (page load)**
The blade is offscreen below. Background is pure black with a slow-drifting radial mesh of #4A90FF at 0.25 alpha in the upper third. Grain overlay is already on. No headline visible.

**Beat 1 — 0ms to 600ms after load (auto)**
Camera descends: the blade rises from the bottom of the frame into the lower 45% position. Opacity 0 → 1, translateY(+120px → 0), duration 600ms, easing `cubic-bezier(0.77, 0, 0.175, 1)` (the SEED premium "swift-out" curve).

**Beat 2 — 600ms to 1400ms (auto, chained)**
The vertical seam of electric blue draws itself from top to bottom of the blade. `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)`, duration 800ms, linear. A hairline bloom (box-shadow blue) pulses once at 1400ms when the line completes.

**Beat 3 — 1400ms to 2200ms**
Headline letters reveal via SplitText (SEED #4), 25ms stagger, from `opacity: 0, y: 40, rotateX: -60` to rest. The headline is positioned center-aligned below the blade's upper third (embossed-into-the-structure effect achieved with CSS `mix-blend-mode: overlay` against the concrete texture).

**Beat 4 — scroll begins (pinned section)**
Section pins for +1800px of scroll. As the visitor scrolls:
- Background mesh drifts slowly against scroll direction (scrub 1) — SEED #1
- The blade's blue seam intensifies from 0.6 alpha → 1.0 alpha, then a second thread of blue light crosses the seam horizontally at the waist of the hourglass form (0% → 100% width) — this is the moment of "measurement"
- Sub-copy fades in below the headline at scrub progress 0.4
- CTA button fades in at scrub progress 0.7, with magnetic-cursor attraction enabled (SEED #5)

**Beat 5 — pin release**
At scrub progress 1.0, the pin releases. Next section scrolls up normally over the hero with a clip-path reveal (SEED #10).

### Easing vocabulary (locked)
- Swift-out (reveal): `cubic-bezier(0.77, 0, 0.175, 1)` — 1200ms
- Linear scrub (pinned scene): `ease: none`, `scrub: 1`
- Magnetic release: `cubic-bezier(0.2, 0.8, 0.2, 1)` — 400ms

### Accessibility
- `@media (prefers-reduced-motion: reduce)`: skip all scroll choreography, jump to Beat 5 end state with simple opacity fade-in (SEED #11 fallback).
- Lenis must be disabled under reduced motion.

### Performance budget
- Target 60fps on M1 / mid-range Android.
- Pattern tier: full (SEED patterns 1-2-4-6-7-9) on desktop ≥1280px, reduced (6-7-11) on tablet, minimal (6-7-11 opacity-only) on mobile.
- Hero image: WebP served at 2560w desktop, 1280w tablet, 800w mobile. AVIF preferred when supported.

---

## 5. Cinematic Grammar — Rules for the Rest of the Page

Once the hero establishes this language, every subsequent section must respect these rules or the spell breaks:

1. **Color grading is locked.** Pure black, deep charcoal surfaces, single #4A90FF accent. No other chromatic value anywhere, ever. No gold, no amber, no off-brand blues.
2. **Shot language is architectural.** Every section that includes imagery treats it as a stage — leading lines, low angle, negative space dominant. No "lifestyle" shots, no team candids, no stock photography.
3. **Motion is scroll-driven, never autoplay.** After the hero's Beat 1 auto-entrance, nothing moves without the visitor pushing it. No auto-rotating carousels, no bouncing arrows, no looping backgrounds beyond the slow mesh drift.
4. **Type reveals are rare.** SplitText stagger reveal is used ONCE per page (the hero). All other headlines fade-in only (SEED #11).
5. **Grain and Lenis are always on.** These are the two global conditions. Turning either off downgrades the entire page.
6. **Sections are chapters, not panels.** Every section break should feel like a camera cut, with a clip-path reveal (SEED #10) or a color bleed. Never a flat scroll.
7. **CTAs are magnetic.** Every `/agendar` and `/aplicar` button uses magnetic-cursor attraction (SEED #5). This is the only interactive flourish allowed.
8. **Negative space is sacred.** Minimum 120px vertical padding between sections on desktop. Minimum 80px on mobile. Whitespace is the most expensive material in this design.

---

## 6. Implementation Handoff — for vfx-motion-designer

**Deliverables expected from vfx-motion-designer**:

1. `reis-ia-website/src/components/HeroCinematic.astro` (or `.tsx` if interactive) — the pinned hero section with all scroll beats wired.
2. `reis-ia-website/src/lib/lenis-setup.ts` — global Lenis + ScrollTrigger sync (one time setup).
3. `reis-ia-website/src/styles/cinematic-tokens.css` — easing variables, grain filter, mesh background variables.
4. `reis-ia-website/public/hero/blade-hero.webp` (+ avif + fallback png) — placeholder image until Moroni generates the real hero from the prompt in section 3.
5. `reduced-motion.ts` fallback branch tested with DevTools emulator.
6. Lighthouse performance check: hero section must not push CLS > 0.02 or LCP > 2.5s on 4G throttled.

**Inputs provided to vfx-motion-designer**:
- This brief
- `brain/design-library/patterns/SEED.md` patterns 1, 2, 4, 6, 7, 9
- Brand tokens already present in `reis-ia-website`
- Placeholder hero image path (to be generated from prompt in section 3)

**Blocking before implementation**: Moroni must approve the concept statement and the image prompt before any code is written. The image doesn't need to exist yet — a matte black placeholder with a blue seam CSS-drawn is acceptable for the first integration pass.

---

## 7. Self-Audit (cinematic-art-director)

| Check | Status |
|-------|--------|
| Follows REIS [IA] prompt skeleton from `hero-prompts/README.md` | PASS — Template B with A lighting discipline |
| Image prompt is specific (no generic AI/stock cliche) | PASS — names materials, lights, focal length, aberration, micro-texture |
| Motion direction references existing SEED.md patterns (not invented) | PASS — cites patterns 1, 2, 4, 6, 7, 9 by number |
| Brand prohibitions respected | PASS — no gold/amber/orange in prompt, negative prompt enumerates prohibited items, no chess/crowns, no gradient text, no stock photography, no cartoon |
| Uses #4A90FF exclusively | PASS |
| CTA routes to /agendar or /aplicar only | PASS (Beat 4 references magnetic CTA to those routes) |
| Asimov's visual language NOT borrowed | PASS — Asimov used only as structural counter-reference |
| Accessibility (prefers-reduced-motion) accounted for | PASS — explicit fallback in motion section |
| Implementation handoff is actionable | PASS — names files, patterns, budgets, blocking gate |
| Nothing AI-hype ("revolutionary", "transformative") | PASS |
| No emojis in brief | PASS |
| No SaaS pricing / tier patterns implied | PASS — hero contains only one magnetic CTA |

**Verdict**: APPROVED for handoff to vfx-motion-designer, pending Moroni sign-off on the concept statement and image prompt.
