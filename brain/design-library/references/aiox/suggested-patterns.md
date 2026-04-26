# AIOX Squad -- Suggested Patterns for Distillation
## Source: https://brand.aioxsquad.ai/
## Extracted: 2026-04-22

---

These are concrete proposals for new pattern files in `brain/design-library/patterns/`. Each references specific source material from the AIOX harvest. The orchestrator should approve before any pattern is created.

---

## HIGH PRIORITY (directly applicable to AGENTES [IA] design system page)

### 1. `patterns/tokens/oklch-brand-layer.md` -- oklch Token Architecture

**Why:** AIOX uses oklch (perceptual color space) with `color-mix(in oklab, ...)` for opacity variants. This is a generation ahead of our current hex-based tokens. oklch produces more perceptually uniform color mixing and makes opacity scales trivial without defining dozens of separate color values.

**Source reference:** `css-secondary.css` lines containing `--bb-lime,oklch(93.4% .2264 121.95)` and all `color-mix(in oklab, var(--bb-lime) N%, transparent)` patterns.

**What to capture:**
- The `--bb-*` namespace pattern (all brand tokens prefixed)
- oklch value definitions with hex fallbacks
- `color-mix()` with `@supports` fallback pattern for opacity scales
- The 60/25/10/5 color distribution rule

---

### 2. `patterns/layout/numbered-section-system.md` -- Technical Section Numbering

**Why:** The `[00]` through `[16]` section numbering in navigation and content headers creates an aviation-manual aesthetic that elevates documentation to premium artifact status. Directly applicable to our design-system.html page which currently lacks this structured feel.

**Source reference:** `html.html` -- navigation structure with `[0.0Components]`, `[1.0Buttons]`, etc. Also `html-guidelines.html` section headers `[01]` through `[13]`.

**What to capture:**
- Numbering format: `[NN]` for major sections, `[N.N]` for sub-sections
- CSS styling for section counters
- How numbering integrates with sticky navigation
- The "classified document" footer pattern: `Brand Identity System // v2.0 // Confidential`

---

### 3. `patterns/effects/film-grain-token-system.md` -- Grain as Design Token

**Why:** AIOX documents film grain at 4 opacity levels (0.05/0.10/0.15/0.25) as formal design tokens, not ad-hoc effects. Our SEED.md already lists noise/grain but lacks a formalized opacity scale. This pattern upgrades grain from "texture trick" to "token-governed atmospheric effect."

**Source reference:** `html-vfx.html` Section 01 (Film Grain) -- four named levels: Subtle, Light, Medium, Heavy.

**What to capture:**
- 4-level opacity scale with semantic names
- CSS implementation (overlay technique)
- When to use each level (subtle for backgrounds, heavy for editorial emphasis)
- Blend mode pairings (multiply, screen, overlay, soft-light, color-dodge, difference)

---

### 4. `patterns/motion/signature-easing-curve.md` -- Brand Motion Identity via Single Easing

**Why:** AIOX uses `cubic-bezier(.22, 1, .36, 1)` consistently across all interactive elements. This single curve creates unconscious motion coherence -- everything in the system "feels the same." Our design system currently has 5 named easings (base, out, in, dramatic, card) but no guidance on which is the PRIMARY signature curve.

**Source reference:** `css-secondary.css` -- `transition: transform .3s cubic-bezier(.22, 1, .36, 1), box-shadow .3s cubic-bezier(.22, 1, .36, 1)` on card components.

**What to capture:**
- The curve itself and its feel (sharp start, smooth deceleration)
- How to designate ONE easing as the brand's motion signature
- Which interactions use it (hover, focus, active, open/close)
- Comparison to our existing 5-curve system

---

### 5. `patterns/components/ticker-strip.md` -- Logo/Tech Ticker with Speed Variants

**Why:** The ticker strip is a common premium pattern (seen on Stripe, Linear, AIOX) that we need for partner/technology logos on the AGENTES [IA] page. AIOX implements it with 3 speed variants (30s/35s/40s) for visual variety.

**Source reference:** `css-secondary.css` -- `@keyframes bb-ticker` animation + `.animate-[bb-ticker_30s_linear_infinite]` variants. `html-effects.html` Section 01 ticker with technology names.

**What to capture:**
- CSS-only infinite horizontal scroll keyframe
- Speed variant system (multiple rows at different speeds for depth)
- Content: technology/partner logos as the ticker items
- Pause-on-hover interaction pattern

---

## MEDIUM PRIORITY (valuable patterns, less immediate need)

### 6. `patterns/layout/bento-dashboard-grid.md` -- Asymmetric 4-Column Bento

**Why:** The bento grid with variable spans (hero span-3, sidebar span-2 height, chart span-2) is the premium dashboard layout pattern of 2025-2026. AIOX documents it with exact CSS: `grid-template-columns: repeat(4, 1fr)` with 1px gaps.

**Source reference:** `html-templates.html` Section 02 (Bento Dashboard Grid).

**What to capture:**
- 4-column grid template
- Span classes for variable cell sizes
- 1px gap aesthetic (vs traditional larger gaps)
- How to combine KPI cards, charts, and content in a single bento

---

### 7. `patterns/effects/hud-frame-kit.md` -- HUD Frames and Technical Decorations

**Why:** Bracket frames, tech frames with clipped polygons, notch frames, hazard stripes, circuit traces -- these are the visual vocabulary of a dark-mode technical brand. AIOX has 6 categories with multiple variants each. Our brand (dark, architectural, premium) could selectively adopt bracket frames and subtle grid patterns.

**Source reference:** `html-patterns.html` -- all 6 sections (83KB page). Grid patterns (dot, crosshair, wireframe), HUD frames (bracket, tech, notch), hazard stripes, circuit traces, textures (scanlines, noise, data rain), dividers.

**What to capture:**
- Bracket frame CSS (corner-only variant is most adaptable)
- Dot grid and crosshair grid backgrounds (8px to 80px spacing)
- Tech divider with gradient glow
- Hazard stripe pattern (lime + black diagonal repeating)

---

### 8. `patterns/brand/dual-voice-documentation.md` -- Two-Voice Brand Architecture

**Why:** AIOX documents two distinct brand voices (Digital: cold/minimal/institutional and Human: warm/passionate/provocative) with explicit tone descriptors and usage rules. This is sophisticated brand architecture. REIS [IA] has a similar need -- the institutional REIS [IA] voice vs Moroni's personal voice.

**Source reference:** `html-guidelines.html` Section 13 (Dual Voice). AIOX Digital Voice vs ALAN Human Voice.

**What to capture:**
- How to document two voices in a single brand system
- Tone descriptor format (3 adjectives per voice)
- Usage rules (when to use which voice)
- The archetype-to-voice mapping technique

---

### 9. `patterns/motion/framer-stagger-letters.md` -- Spring Letter Reveal

**Why:** The "Stagger Letters" animation (1.5s, each letter rises with spring + rotateX 3D) is a premium headline reveal technique. Directly applicable to hero headlines on the AGENTES [IA] page.

**Source reference:** `html-motion.html` Animation 7 -- "Stagger Letters: 1.5s navbar/footer animation with each letter rising via spring + rotateX 3D."

**What to capture:**
- Framer Motion spring config for letter stagger
- rotateX 3D parameter (perspective, rotation angle)
- Stagger delay between letters
- Use cases (navbar, footer, hero headlines)

---

### 10. `patterns/layout/auto-fit-responsive-grid.md` -- Media-Query-Free Responsive Grid

**Why:** `repeat(auto-fit, minmax(340px, 1fr))` creates a responsive card grid that adapts from 1 to N columns without any media queries. Simple, elegant, zero-maintenance responsive layout.

**Source reference:** `html-templates.html` Section 03 (Auto-fit Content Grid). 340px minimum cell width.

**What to capture:**
- The CSS one-liner
- How to choose the minmax minimum (280px for compact cards, 340px for content cards, 400px for feature cards)
- Gap recommendations per use case
- When this pattern is better than explicit breakpoint grids

---

## LOWER PRIORITY (nice to have, niche application)

### 11. `patterns/components/stepper-horizontal-vertical.md` -- Process Stepper

**Why:** AIOX documents both horizontal (Discovery > Architecture > Implementation > QA > Deploy) and vertical (Onboarding > Data Integration > Training > Go Live) stepper variants. Useful for onboarding flows in the REIS [IA] Hub.

**Source reference:** `html-advanced.html` stepper section.

---

### 12. `patterns/seo/brandbook-meta-pattern.md` -- SEO for Brand Pages

**Why:** AIOX documents exact meta tag, OG, and Twitter card configurations as part of the brand system. Title < 60 chars, description < 155 chars, 1200x630 OG image, JSON-LD Organization schema.

**Source reference:** `html-seo.html` full SEO configuration documentation.

---

## Summary: Top 5 Patterns to Distill First

1. **oklch-brand-layer** -- Upgrades our entire color system to modern CSS
2. **numbered-section-system** -- Immediately applicable to design-system.html
3. **film-grain-token-system** -- Formalizes an effect we already use
4. **signature-easing-curve** -- Creates motion identity with one line of CSS
5. **ticker-strip** -- Common premium component we need for the LP
