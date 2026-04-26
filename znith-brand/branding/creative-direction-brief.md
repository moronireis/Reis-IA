# ZNITH — Creative Direction Brief

**Version:** 1.0
**Last updated:** April 2026
**Prepared by:** Creative Director, Reis IA Agent System
**Client:** ZNITH — Leilaine Campioto Messias, Founder & CEO
**Classification:** Premium Client Deliverable — Implementation-Ready
**Consumed by:** Designer Agent, Dev Agent, VFX/Motion Designer

---

## Table of Contents

1. [Website Creative Concept](#1-website-creative-concept)
2. [Motion Design System](#2-motion-design-system)
3. [Content Visual Language](#3-content-visual-language)
4. [Photography & Video Direction](#4-photography--video-direction)
5. [Interactive Experiences](#5-interactive-experiences)
6. [Brand Atmosphere](#6-brand-atmosphere)
7. [Grafismo System](#7-grafismo-system)

---

## CREATIVE THESIS

**"Architecture made visible."**

Everything ZNITH builds is invisible by nature — commercial structure, process architecture, governance systems. The creative direction must make the invisible discipline of commercial architecture feel tangible, weighty, and real. The visitor does not experience a website. They walk through a building under construction. They witness structure being assembled. They feel the difference between chaos and architecture.

The governing metaphor across all creative work: **ZNITH is the architecture firm for revenue.** Architecture is not decoration. It is the discipline of making the unseen structure determine the quality of the visible result. Every motion, every layout, every transition should communicate: something is being built here, with precision, with intention, with the patience of someone who has done this many times before.

---

## CREATIVE PRINCIPLES

Before any section: these seven principles govern every decision.

1. **Navy governs, gold signs, white breathes.** Navy (#091022) is 80%+ of every surface. Gold (#DF9F3E) never exceeds 15%. White creates the space where the eye rests.
2. **Premium through restraint, not excess.** Every element earns its place. If removing it changes nothing, it should not exist.
3. **Architecture metaphor throughout.** The brand IS architecture. Animations feel like construction. Layouts feel like blueprints. Progression feels like building.
4. **Motion communicates structure.** Animations feel like things being organized, aligned, assembled — never flashy or theatrical. Think: a blueprint unfolding, not fireworks.
5. **Dark mode = authority. Light mode = clarity.** Different moods, same institutional weight.
6. **The lion watches, it does not attack.** Governance energy, vigilance, presence. Never aggression.
7. **Faith is present but never performative.** Referenced through values (direction, consciousness, legacy), never as decoration or explicit religious iconography.

**Prohibited at all times:** Emojis in UI, SaaS pricing patterns, cheap gradients, stock-photo aesthetics, motivational imagery (sunrises, mountaintops), guru positioning, AI hype language.

---

## 1. WEBSITE CREATIVE CONCEPT

### 1.1 Hero Section

**Concept: "The Diagnosis Room"**

The visitor enters what feels like a quiet, authoritative room. Not a loud landing page. Not a startup hero with floating 3D objects. A room where serious things are said clearly. The hero section should produce the sensation of sitting across from someone who already knows what is wrong with your commercial operation.

**Visual Treatment:**

- Background: Pure Navy 900 (#091022), no gradient, no image. Emptiness is the statement.
- A single horizontal gold line (2px, 120px wide) draws itself from left to center over 800ms after page load — this is the first motion the visitor sees. It represents the diagnostic line being drawn.
- Above the gold line: the overline "ARQUITETURA DE CRESCIMENTO COMERCIAL COM IA" in Montserrat 12px, weight 600, uppercase, #DF9F3E, letter-spacing 0.10em. Fades in 400ms after gold line completes.
- Below the gold line: the headline in Cinzel Display, clamp(48px, 7vw, 96px), weight 400, #FFFFFF. Text: "Empresas que crescem com previsibilidade nao tiveram sorte." Second line, delayed by 200ms: "Tiveram arquitetura." — where "arquitetura" renders in #DF9F3E. Each line fades in with a 20px upward translateY, 500ms, ease-out.
- Subheadline: Montserrat 18px, #BBBBBB, max-width 640px. Fades in 300ms after headline completes. Text positions the offer without selling: "A ZNITH estrutura operacoes comerciais com IA para que seu crescimento dependa de arquitetura — nao de improviso."
- Single CTA: "Agendar Diagnostico" — Primary Button (Cinzel, gold gradient, pulsing per znith-gold-pulse keyframe). Appears 200ms after subheadline. This is the ONLY pulsing element on the entire page.
- No secondary CTA in the hero. One action. One direction.
- Lion watermark: positioned bottom-right of hero section, 300px, #DF9F3E at 3% opacity, blend-mode screen. Static. No parallax. Presence, not performance.

**Mobile Adaptation:**
- Gold line reduced to 80px, centered.
- Headline drops to clamp(36px, 8vw, 48px).
- Subheadline width 100%, padding 20px.
- CTA full-width at bottom of hero, sticky for first viewport.

**Reference:** Stripe's hero — one statement, one CTA, absolute confidence in the product. But warmer. Darker. More institutional. Less Silicon Valley, more Sao Paulo executive.

---

### 1.2 Services Section — The Four Categories

**Concept: "The Four Pillars"**

The four service categories (ARQUITETURA, ACOMPANHAMENTO, INTELIGENCIA, DESENVOLVIMENTO) are presented as four architectural pillars — not as a feature grid, not as pricing tiers. Each pillar is a vertical column of information that the visitor reads independently.

**Visual Treatment:**

- Section background: Navy 800 (#0D1828) — one step lighter than hero, creating subtle depth shift.
- Section overline: "O QUE CONSTRUIMOS" — Montserrat 12px, #DF9F3E, uppercase, centered.
- Four cards in a horizontal row (desktop), stacked (mobile).
- Each card uses the category-specific secondary accent from the design system addendum:
  - ARQUITETURA: left border 3px solid Tech Blue #2A5090
  - ACOMPANHAMENTO: left border 3px solid Warm White-adjusted #C0B8A8
  - INTELIGENCIA: left border 3px solid Electric Cyan #00B4D8
  - DESENVOLVIMENTO: left border 3px solid Navy 200 #8E9EBE
- Card structure:
  - Category pill badge (per addendum spec — pill shape, category accent color)
  - Category name in Cinzel 22px, #FFFFFF
  - 2-3 line description in Montserrat 14px, #BBBBBB
  - Products listed underneath as Montserrat 13px, #999999 with gold bullet dots
  - Ghost CTA: "Conhecer" in category accent color, no border
- Card background: #14203A, 1px border #2A3A5A, border-radius 12px.
- Hover: left border intensifies to full opacity, box-shadow appears using category accent at 0.12 opacity, card scale(1.02), 200ms ease-out.

**Scroll-reveal behavior:** Cards stagger in from bottom — 500ms duration, ease-out, 80ms stagger delay per card. Cards start at opacity 0 + translateY(24px).

**The rule:** This section is NOT a comparison grid. Visitors do not "pick" between categories. Each card points to its own page or section. Every CTA says "Conhecer" (learn), never "Comprar" (buy). All deeper engagement routes through "Agendar Diagnostico."

---

### 1.3 ZNITH.AI OS Showcase — The Five Phases

**Concept: "The Blueprint Unfolds"**

This is the centerpiece of the website — the flagship product deserves its own immersive section. The concept: the visitor watches a commercial architecture being designed, built, and handed over in five phases. Each phase is a stage in the construction of a building.

**Visual Treatment:**

- Full-width section, Navy 900 (#091022) background.
- Section opens with a bold statement: "Cinco fases. Da direcao a escala. Nada no meio e improvisado." — Cinzel Display, clamp(36px, 5vw, 60px), centered, white. Scroll-reveal, 500ms ease-out.

**Phase Timeline (Desktop):**

The horizontal phase timeline visualization (per design system addendum spec) sits at the top of this section. Five nodes connected by a line. All nodes start inactive. As the visitor scrolls through the section, nodes activate sequentially.

Implementation approach:
- The timeline is `position: sticky; top: 80px` within a tall scrollable container.
- The scroll container is approximately 5x viewport height (one viewport per phase).
- As the visitor scrolls, IntersectionObservers on five sentinel elements trigger phase activation.
- When a phase activates, its node transitions from inactive to active state (border color change, glow appears, number changes color) — 300ms ease-out.
- The connector line fills with a gradient from the previous node to the active node — CSS width transition, 400ms ease-out.
- Below the sticky timeline, the phase content panel crossfades: opacity 0 to 1, 400ms ease-out.

**Phase Content Panel:**

Each phase displays:
- Phase badge: "FASE 01" in JetBrains Mono 14px, phase primary color, 0.10em tracking.
- Phase name: Cinzel H3 (28-36px), #FFFFFF.
- Phase tagline in Montserrat 14px italic, #BBBBBB.
- Phase description: Montserrat 16px, #BBBBBB, max-width 640px.
- Deliverables list with gold check SVG icons.
- The content panel is on the left (7/12 columns). On the right (5/12 columns): a visual motif.

**Phase Visual Motifs (Right Column):**

Each phase gets a minimal, abstract geometric illustration — NOT a photo, NOT an icon. A structural diagram.

| Phase | Visual Motif | Description |
|-------|-------------|-------------|
| LEITURA | Grid with magnifying lens | A geometric grid (representing CRM data / commercial operation). A circular lens element hovers over one section, revealing hidden structure beneath. Lines from grid to annotations. Colors: Tech Blue #4A78C8 strokes, Navy background. |
| PROJETO | Blueprint/floorplan | Architectural floor plan lines drawing themselves. Clean geometric rooms appearing. A compass rose (Leilaine's personal symbol) at the center. Colors: #3A6AB0 strokes with gold accent on key structural lines. |
| OBRA | Blocks assembling | Geometric blocks rising from bottom, stacking into an organized structure. Some blocks have faint labels (CRM, PLAYBOOK, CADENCIA). Colors: #8F7030 gold-bronze strokes. |
| AJUSTE | Tuning dials / calibration | Circular dials with needles finding center position. Waveforms smoothing out. A pulse line stabilizing. Colors: Gold Deep #C07A20. |
| GOVERNO | Dashboard outline | A simplified dashboard wireframe. A crown/lion watermark at 8% opacity behind it. Data points lighting up. Colors: Gold 500 #DF9F3E. |

These illustrations should be SVG, drawn with 1.5px strokes, animated with CSS line-draw (`stroke-dasharray` / `stroke-dashoffset` transitions). Each illustration draws itself over 800ms when its phase activates.

**Mobile Adaptation:**
- Phase timeline switches to vertical (stacked nodes).
- No sticky behavior — timeline scrolls with content.
- Visual motifs hidden on mobile (they add visual interest on desktop but would compress poorly).
- Phase content takes full width.

**Gold-to-Blue Color Journey:**

The phase progression represents a visual journey from analytical blue (LEITURA) to authoritative gold (GOVERNO). As the visitor scrolls through phases, the accent color subtly warms. This is implemented through the phase-specific primary colors defined in the addendum — no additional CSS needed. The designer and dev should ensure this gradient progression is perceptible but not dramatic.

**Reference:** Linear's feature showcase (sticky sidebar, scrolling content). But slower. More weight. Less product-demo, more "watching a building go up."

---

### 1.4 Trust / Authority Section

**Concept: "The Evidence Wall"**

No testimonials carousel. No logo parade. A quiet, dense display of evidence — structured like a consultant's case summary. The section communicates: "We do not need to convince you. Here is what happened."

**Visual Treatment:**

- Background: #0D1828 (Section alt).
- Two-row layout:

**Row 1 — Stat Cards (4 columns):**
- Four Stat Cards per design system spec.
- Key metrics: revenue generated, operations restructured, average conversion improvement, years of commercial experience.
- Numbers in Cinzel 48px, #DF9F3E. Labels in Montserrat 14px, #FFFFFF.
- Numbers animate via countUp — from 0 to final value over 1200ms, ease-out, triggered by IntersectionObserver when section enters viewport. Numbers displayed with JetBrains Mono during the counting animation for the "data processing" feel, then switch to Cinzel when they land.

**Row 2 — Case Study Cards (2-3 cards):**
- Case Study Title Card format per addendum spec (before/after metric display).
- Each card shows:
  - Overline: "CASO DE ESTUDO" in #DF9F3E
  - Before metric (Cinzel 48px, #7A7A7A) > "para" > After metric (Cinzel 48px, #DF9F3E)
  - Context line (industry + timeframe)
  - Miniature phase timeline (all completed)
- Card hover: border transitions to gold, box-shadow gold-subtle appears, 200ms.
- Each card links to full case study page.
- Scroll-reveal: stagger 80ms per card.

**No testimonial quotes in this section.** Quotes appear elsewhere (about Leilaine, case study detail pages). This section is NUMBERS ONLY. The absence of emotional language is itself a trust signal — it communicates "we let the data speak."

---

### 1.5 Leilaine Section

**Concept: "The Architect"**

Leilaine's presence on the corporate site is neither a bio sidebar nor a full personal brand page. It is a moment where the visitor understands that behind the institutional weight of ZNITH, there is a person with 20+ years of scars and rebuilds. The section transitions the brand from "company" to "conviction."

**Visual Treatment:**

- Background: Navy 900 (#091022).
- Two-column layout: 5/12 image left, 7/12 text right.
- **Left column:** Professional photograph of Leilaine. NOT a headshot crop — environmental portrait showing architectural space. Navy color grading per photography spec (shadows pushed toward #091022, desaturated 20-30%). Image has a 2px gold (#DF9F3E) border on the left edge only — the "signature line."
- **Right column:**
  - Overline: "A FUNDADORA" in Montserrat 12px, #DF9F3E, uppercase.
  - Name: "Leilaine Campioto" in Cinzel H2 (clamp 28-48px), white.
  - Tagline: "Direcao. Consciencia. Legado." in Montserrat tagline spec (#DF9F3E, uppercase, 0.15em tracking).
  - 3-4 paragraphs of dense, direct bio text. Montserrat 16px, #BBBBBB. NOT a full origin story — a sharp positioning statement.
  - Key credentials: participation in R$500M+ in sales, 20+ years, teams trained, operations restructured. Presented as inline text, NOT bullet points. The credential appears naturally within the narrative.
  - Quote block: Cinzel italic 20px, white, with 3px gold left border. "Eu nao vendo modinha tecnologica. Eu estruturo crescimento."
  - No CTA in this section. The next section (Lideres Leoes or final CTA) carries the action.

**Mobile:**
- Image stacks above text, full-width.
- Gold border moves to bottom edge of image.

**Motion:**
- Image fades in from left: translateX(-24px) to 0, opacity 0 to 1, 500ms ease-out.
- Text content fades in from right: translateX(24px) to 0, opacity 0 to 1, 500ms ease-out, delayed 200ms.

---

### 1.6 Lideres Leoes Section

**Concept: "The Inner Gate"**

Within the corporate site, Lideres Leoes appears as a separate-feeling section — a darker, more intense space. The visitor senses they have crossed a threshold. This is not a product section. It is a movement invitation.

**Visual Treatment:**

- Background: #050B17 (Lideres Leoes base — deepest navy, visually distinct from the rest of the site).
- The transition into this section uses a gradient divider: from #091022 to #050B17 over 120px.
- Section is bordered top and bottom by a 1px line in gold #FFD161 at 15% opacity — a subtle "gate."

**Layout:**
- Centered text block, max-width 680px.
- Overline: "LIDERES LEOES" in Montserrat weight 700, uppercase, #FFD161, 0.08em tracking.
- Below overline: "Uma iniciativa ZNITH" in Montserrat 10px, #7A7A7A.
- Statement in Cinzel italic H2, white: "Coragem para governar. Consciencia para permanecer."
- Below statement: a short manifesto excerpt — 3-4 lines, Montserrat 16px, #BBBBBB.
- Movement lion watermark: centered behind text, 250px, #FFD161 at 5% opacity.
- CTA: Secondary button style but in movement gold: "Conhecer o Movimento" — border 1px #FFD161, text #FFD161, hover fills gold.

**This section is intentionally sparse.** It is an invitation, not a sales pitch. The movement's depth is experienced on its own page/platform.

**Motion:**
- The overline fades in first (400ms).
- The Cinzel statement fades in 200ms later.
- The manifesto excerpt 200ms after that.
- CTA appears last.
- Total sequence: 1200ms from first element visible.

---

### 1.7 CTA Strategy

**All CTAs across the entire website lead to ONE of TWO destinations:**
1. "Agendar Diagnostico" — consultation scheduling (primary, appears on every page)
2. "Conhecer o Movimento" — Lideres Leoes entry (secondary, appears only in movement contexts)

**NEVER:**
- "Comprar" / "Assinar" / "Comecar teste"
- SaaS pricing comparison pages
- Trial/demo flows
- Email capture popups

**CTA Hierarchy Per Page:**
- Hero: Primary CTA (gold, pulsing, Cinzel)
- Services section: Ghost CTAs per category ("Conhecer")
- OS showcase: No CTA mid-section (let the content breathe). CTA appears AFTER Phase 5 content: "Agendar Diagnostico para sua operacao"
- Trust section: No CTA (evidence stands alone)
- Leilaine section: No CTA
- Lideres Leoes section: Movement-specific secondary CTA
- Footer: Repeated primary CTA, smaller, non-pulsing

**Diagnostic as Gateway:** Every CTA funnels toward a diagnostic conversation. This mirrors the brand promise — ZNITH starts with diagnosis. The CTA IS the methodology.

---

### 1.8 Footer

**Concept: "The Seal"**

The footer is quiet, institutional, and complete. It carries the full brand weight.

**Visual Treatment:**

- Background: #091022 (same as page base — the footer is part of the page, not a separate block).
- Border-top: 1px #2A3A5A.
- 4-column grid per design system footer spec.
- Column 1: ZNITH wordmark (Cinzel weight 300, white) + "Direcao. Consciencia. Legado." in Montserrat tagline spec + 2-line institutional description.
- Column 2: Navigation links (services, OS, cases, about).
- Column 3: Contact information.
- Column 4: Social icons (LinkedIn, Instagram — stroke SVG, 24px, #7A7A7A, hover #DF9F3E) + "Agendar Diagnostico" Secondary Button.
- Bottom bar: copyright + legal links.
- Grafismo element: Swoosh/check grafismo mark centered between main grid and bottom bar, #DF9F3E at 30% opacity, 120px wide.
- Lion watermark: bottom-left corner, 200px, 3% opacity. This is the second and final watermark instance on the homepage (first was in hero).

---

## 2. MOTION DESIGN SYSTEM

### 2.1 Core Motion Philosophy

**"Structure being assembled."**

Every animation in the ZNITH system should feel like watching something being carefully, deliberately organized. Not fast. Not flashy. Not "delightful." Architectural. The motion personality is a master builder's hands: precise, measured, unhurried.

**Timing Personality:**
- ZNITH animations live in the 300-700ms range. Never below 200ms (feels cheap). Never above 1000ms (feels sluggish). The exception: ambient loops (gold pulse at 1500ms).
- The default easing is ease-out (`cubic-bezier(0.0, 0.0, 0.2, 1.0)`) — elements arrive with confidence and settle.
- Enter animations are longer than exit animations (500ms enter, 200ms exit). Things are built with care and disappear cleanly.

**Motion Budget Per Page:**
- Maximum 3 distinct animation types per viewport. More than that becomes noise.
- No simultaneous complex animations. If the phase timeline is animating, nothing else moves.
- All animations respect `prefers-reduced-motion: reduce` — reduce to simple opacity fades or disable entirely.

---

### 2.2 Page Transitions

**Description:** When navigating between pages, the current page fades out (200ms ease-in, opacity to 0) and the new page fades in (300ms ease-out, opacity 0 to 1, translateY(8px) to 0). This creates a brief, dignified "blink" — not a slide, not a morph, not a page-turn effect.

**Trigger:** Navigation click or route change.
**Timing:** 200ms out + 300ms in = 500ms total.
**Easing:** ease-in (exit), ease-out (enter).
**Implementation:** CSS View Transitions API (supported in Chromium) with CSS fallback (opacity transitions on a wrapper element for Safari/Firefox). Astro's built-in View Transitions can handle this.
**Mobile:** Same behavior. No reduced complexity needed.
**Priority:** Medium. Ship without it first, add as enhancement.

---

### 2.3 Scroll-Driven Animations

**A. Section Reveal (Standard)**

**Description:** All major section content fades in from below as it enters the viewport.
**Trigger:** IntersectionObserver, threshold 0.15 (element 15% visible).
**Timing:** 500ms ease-out.
**Transform:** opacity 0 + translateY(24px) to opacity 1 + translateY(0).
**Stagger:** Child elements within a section stagger at 80ms intervals (max 6 children = 400ms total stagger).
**Implementation:** `.znith-reveal` class + IntersectionObserver in vanilla JS. CSS animation applied when `.visible` class is added.
**Priority:** High. This is the foundational scroll animation.

**B. Gold Line Draw (Hero)**

**Description:** A horizontal gold line draws itself from left to right.
**Trigger:** Page load, after 300ms delay.
**Timing:** 800ms ease-out.
**Implementation:** A `<div>` with width transitioning from 0 to 120px, or an SVG `<line>` using stroke-dasharray/dashoffset animation.
**Priority:** High. It is the hero's signature moment.

**C. Phase Timeline Progression (OS Section)**

**Description:** As the visitor scrolls through the OS showcase section, phase nodes activate sequentially. The connector line fills. Phase content crossfades.
**Trigger:** Scroll position within the OS section's tall container. IntersectionObserver on five sentinel `<div>` elements spaced within the container.
**Timing:** Node activation: 300ms ease-out. Connector fill: 400ms ease-out. Content crossfade: 400ms ease-out.
**Implementation:** Sticky timeline container + scroll sentinels + CSS class toggles via vanilla JS IntersectionObserver. No scroll-linked animations API (insufficient browser support). The transitions are CSS-only, triggered by adding/removing classes.
**Priority:** High. The OS showcase is the product's visual centerpiece.

**D. Number CountUp (Trust Section)**

**Description:** Stat numbers count from 0 to their final value when the trust section enters viewport.
**Trigger:** IntersectionObserver on the stat cards container.
**Timing:** 1200ms, ease-out (starts fast, decelerates).
**Implementation:** Vanilla JS. A `requestAnimationFrame` loop that increments numbers. Display via JetBrains Mono during animation, switch to Cinzel on completion (font-family transition via class swap).
**Priority:** Medium. Ship with static numbers first if timeline is tight.

**E. SVG Line-Draw Illustrations (OS Phases)**

**Description:** Phase visual motifs (SVG illustrations) draw their strokes when the phase activates.
**Trigger:** Phase activation in the OS timeline.
**Timing:** 800ms ease-out per path.
**Implementation:** SVG `stroke-dasharray` set to total path length. `stroke-dashoffset` transitions from full length to 0. Stagger multiple paths within the illustration at 100ms intervals.
**Priority:** Medium. Beautiful but not critical. Ship phase content without illustrations first.

---

### 2.4 Micro-Interactions

**A. Button Hover — Gold Swell**

**Description:** Primary buttons on hover: gradient reverses direction (#FFD161 to #DF9F3E instead of #DF9F3E to #FFD161), scale(1.02), shadow intensifies from `0 0 21px` to `0 0 32px`. On active (press): scale(0.98), shadow reduces.
**Trigger:** Hover (mouseenter/mouseleave), press (mousedown/mouseup).
**Timing:** 200ms ease-out.
**Implementation:** CSS transitions on `background`, `transform`, `box-shadow`.
**Priority:** High.

**B. Card Hover — Border Brightens**

**Description:** Content cards on hover: border-color transitions from #2A3A5A to #DF9F3E. A subtle gold glow appears (`box-shadow: 0 0 24px rgba(223, 159, 62, 0.15)`). Scale(1.02).
**Trigger:** Hover.
**Timing:** 200ms ease-out (border, shadow), 200ms ease-out (scale).
**Implementation:** CSS transitions.
**Priority:** High.

**C. Navigation Link Hover — Gold Underline**

**Description:** Nav links: text color transitions from white to #DF9F3E. A 2px gold underline slides in from left (width 0 to 100%).
**Trigger:** Hover.
**Timing:** 200ms ease-out.
**Implementation:** CSS `::after` pseudo-element with width transition.
**Priority:** High.

**D. Form Focus — Gold Ring**

**Description:** Form inputs on focus: border transitions from #2A3A5A to #DF9F3E. A 3px gold ring appears (`box-shadow: 0 0 0 3px rgba(223, 159, 62, 0.15)`). Caret color is #DF9F3E.
**Trigger:** Focus event.
**Timing:** 200ms ease-out.
**Implementation:** CSS `:focus` styles.
**Priority:** High.

**E. Header Glass — Scroll Transition**

**Description:** Navigation header starts with solid #14203A background. After 80px of scroll, transitions to glass morphism: `rgba(20, 32, 58, 0.85)` background + `backdrop-filter: saturate(180%) blur(12px)`.
**Trigger:** Scroll position > 80px.
**Timing:** 300ms ease-out.
**Implementation:** Vanilla JS scroll listener (throttled to requestAnimationFrame) toggling a `.scrolled` class. CSS transitions handle the visual change.
**Priority:** High.

**F. Gold Pulse — CTA Breathing**

**Description:** The primary Cinzel CTA button has a continuous, subtle glow pulse. Shadow oscillates between `0 0 16px rgba(223, 159, 62, 0.40)` and `0 0 32px rgba(223, 159, 62, 0.60)`. Opacity oscillates between 0.90 and 1.00.
**Trigger:** Continuous (CSS animation, infinite).
**Timing:** 1500ms ease-in-out, infinite loop.
**Implementation:** `@keyframes znith-gold-pulse` per design system spec.
**Rules:** ONE pulsing element per viewport. No exceptions.
**Priority:** Medium. Easy to implement, high brand impact.

---

### 2.5 Data Animations

**Stat Number Reveal:**
- Numbers count up from 0 to target value.
- Duration: 1200ms, ease-out curve (fast start, slow finish).
- Number prefix (R$, %) appears immediately; number itself counts.
- Font switches from JetBrains Mono (during count) to Cinzel (when settled).
- Triggered once per page visit (no re-animation on scroll back).

**Progress Bars / Phase Connectors:**
- Width transitions from 0% to target%, left-to-right.
- Duration: 400ms ease-out per segment.
- Color follows phase gradient (blue to gold progression).

**Chart Animations (if applicable on case study pages):**
- Bars grow from bottom, 500ms ease-out, 60ms stagger.
- Lines draw from left to right, 1000ms ease-out.
- Data points pop in (scale 0 to 1) after line reaches their position.

---

### 2.6 Phase Progression Animation — LEITURA to GOVERNO

The five-phase animation is the most complex motion sequence on the site. It must feel like watching a building go up.

**Visual Journey:**

1. **LEITURA** — Cool, analytical. The illustration draws in cool blue (#4A78C8). A grid appears. A lens scans. The feeling: examination.
2. **PROJETO** — Planning. Blueprint lines appear in slightly warmer blue (#3A6AB0). The feeling: design with intention.
3. **OBRA** — Construction. Warm gold-bronze (#8F7030). Blocks stack. The feeling: physical building.
4. **AJUSTE** — Calibration. Gold Deep (#C07A20). Dials turn. Waves smooth. The feeling: refinement.
5. **GOVERNO** — Authority. Full Gold (#DF9F3E). Dashboard lights up. Crown appears at 8%. The feeling: mastery.

**The color journey IS the narrative.** Blue (technology, analysis) warms gradually into gold (governance, authority). By Phase 5, the blue is a supporting accent and gold governs. This mirrors the real engagement: ZNITH starts with analytical diagnosis and ends with the client in the governance seat.

---

### 2.7 Lion / Crown Motion Behavior

**Lion Watermark:**
- STATIC. No parallax. No breathing. No animation.
- The lion does not move because governance is stillness. The lion watches.
- The only acceptable motion: a very slow opacity fade-in when the section it belongs to enters viewport (opacity 0 to final opacity over 1000ms). This is not an animation — it is an arrival.

**Crown:**
- Static in all contexts except one: the Selo de Governo badge at Lider level, which receives the `znith-gold-pulse` at 50% intensity (opacity 0.95-1.0).
- No crown rotations. No crown appearances. No crown animations.

---

### 2.8 Gold Accent Animations

Gold appears and moves in exactly three ways:

1. **Gold Line Draw:** A horizontal line extending from left to right. Used in heroes and section headers. 800ms ease-out.
2. **Gold Glow Pulse:** The `znith-gold-pulse` keyframe on CTA buttons. 1500ms ease-in-out infinite. ONE per viewport.
3. **Gold Border Brighten:** On card/element hover, border transitions from #2A3A5A to #DF9F3E. 200ms ease-out.

Gold NEVER:
- Shimmers across a surface (no shimmer sweep)
- Pulses on decorative elements (grafismo, watermarks)
- Glitters, sparkles, or creates particle effects
- Appears as a gradient-text effect

---

### 2.9 Loading / Transition States

**Skeleton Loader:**
- Background: #14203A.
- Shimmer: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%), translating across, 1.5s ease infinite.
- Border-radius matches the content shape it replaces.
- Shimmer is subtle — barely perceptible. Not a bright sweep.

**Spinner:**
- Gold spinner per design system: 3px border #2A3A5A (track), 3px border-top #DF9F3E (active). 0.8s linear infinite rotation.
- Used for button loading states and full-page loads.
- Sizes: 20px (inline), 32px (component), 48px (page).

**Page Load Sequence:**
1. Navbar appears immediately (no animation).
2. Hero gold line draws (800ms).
3. Hero text fades in (staggered, 500ms per line).
4. Hero CTA appears.
5. Below-fold content loads via standard section reveal as visitor scrolls.

Total initial load animation: approximately 2000ms before the hero is fully composed. This is deliberate. ZNITH does not rush.

---

## 3. CONTENT VISUAL LANGUAGE

### 3.1 Social Media Visual System

**LinkedIn Post Cards:**

Two formats, per design system addendum spec:

**Format A — Single Statement Card (1200x1200px):**
- Navy #091022 background.
- 80px padding all sides.
- Gold overline (topic label — e.g., "ESTRUTURA COMERCIAL").
- Cinzel 48px white statement (max 3 lines).
- Footer bar: 60px height, #14203A background, positioned at bottom.
  - Left: "Leilaine Campioto" — Montserrat 14px, white.
  - Right: "ZNITH" wordmark — Cinzel 14px, #7A7A7A.
- No imagery. No icons. Typography is the visual.

**Format B — Data Card (1200x1200px):**
- Navy background.
- Cinzel 72px metric in #DF9F3E (e.g., "78%").
- Montserrat 18px label in white (e.g., "das empresas nao conseguem prever a receita do proximo trimestre").
- Montserrat 14px context in #BBBBBB (source or additional context).
- Same footer bar.

**Format C — Before/After Card (1200x627px landscape):**
- Navy background, split visually into two halves by a thin 1px #2A3A5A vertical line.
- Left: "ANTES" overline + metric in #7A7A7A (muted, representing dysfunction).
- Right: "DEPOIS" overline + metric in #DF9F3E (gold, representing result).
- Context line below.
- Footer bar.

**Instagram Stories (1080x1920px):**
- Background: #091022 or #050B17 (movement content).
- Safe zone respected (top 200px, bottom 280px clear).
- Quote template: Cinzel italic 28px, white, max 4 lines, centered, with 3px gold left bar at 40% width.
- Data template: Cinzel 96px metric centered, gold, with Montserrat context below.
- Lion watermark at 5% behind text when appropriate.

**Video Thumbnails (1920x1080px):**
- Navy base with directional light source (top-left warm glow, subtly illuminating a portion of the frame).
- Leilaine's face or silhouette positioned according to the rule of thirds (right side).
- Cinzel title text on the left, max 2 lines, white, with one gold accent word.
- No cluttered typography. No "WATCH NOW" badges. The frame should feel like a film still.

---

### 3.2 Presentation Template Concept

**Format:** 16:9 slides (Keynote/Google Slides) and A4 proposals (PDF).

**Slide Visual Direction:**

- Background: Navy #091022 for all content slides.
- Header bar: 72px, #14203A, 1px bottom border #2A3A5A. Logo left, page number right (JetBrains Mono 12px, #7A7A7A).
- Title slide: Client name overline in gold. Main title in Cinzel 40px, white. Lion watermark bottom-right, 300px, 4% opacity.
- Section divider slides: Cinzel 48px centered, white, with 80px gold line below. Phase number or section number in JetBrains Mono, top-right.
- Content slides: Left-heavy layout. Cinzel 28px section title with gold underline. Montserrat 16px body. Callout boxes in #14203A cards.
- Data slides: Cinzel for large numbers. JetBrains Mono for data labels. Chart colors per data visualization spec.
- Final slide: "Agendar proximo passo" — single CTA, centered, gold button visual. ZNITH wordmark below. "Direcao. Consciencia. Legado."

**Proposal Visual Direction (A4 PDF):**
- Light mode: white #FFFFFF background, navy text #091022.
- Gold accent darkened to #C07A20 for print contrast.
- Header: ZNITH logo horizontal + gold separator line.
- Section headers: Cinzel 18px, navy.
- Body: Montserrat 14px, line-height 1.7.
- Data callout boxes: #F7F8FA background, 1px #E2E5EB border.
- Phase timeline included on page 2.
- Project code in footer: JetBrains Mono 12px.

---

### 3.3 Case Study Visual Narrative — "De X para Y"

Every case study follows the same five-section structure, creating a recognizable pattern that builds credibility through repetition.

**Hero Card:** The Before/After metric display per addendum spec. This card appears at the top and IS the case study's visual identity. The metric pairing (e.g., "8% para 23%") becomes the thumbnail, the social media card, and the pull-quote.

**Five Sections:**
1. **LEITURA** — What was found. Blue badge #4A78C8. Content: bottlenecks, revenue leaks, CRM fiction.
2. **PROJETO** — What was designed. Blue badge #3A6AB0. Content: architectural decisions, structural choices.
3. **OBRA** — What was built. Bronze badge #8F7030. Content: systems implemented, processes installed.
4. **RESULTADO** — What changed. Gold badge #DF9F3E. Content: before/after metrics with timeline.
5. **DEPOIMENTO** — What the client says. Gold badge #DF9F3E. Content: direct quote from decision-maker.

Each section opens with a phase badge and title. The reader experiences the engagement as ZNITH experienced it: diagnosis first, results last. This structure IS the product.

---

### 3.4 Email Visual System

**Dark Email (Relationship, Content):**
- Background: #091022.
- ZNITH wordmark as text (Cinzel weight 300, white) — no image logo for email compatibility.
- Body: Montserrat 15px, #BBBBBB.
- CTA: Gold gradient button, centered, 200px minimum width. Fallback: solid #DF9F3E background for email clients without gradient support.
- Footer: Montserrat 11px, #7A7A7A. Tagline in #DF9F3E.
- Maximum width: 600px.

**Light Email (Transactional, Formal):**
- Background: #FFFFFF.
- ZNITH wordmark in navy #091022.
- Body: Montserrat 15px, #333333.
- CTA: Navy button #091022, white text (not gold — insufficient contrast on white).
- Footer: Montserrat 11px, #8E9EBE.

**Rule:** Dark for relationship and content emails (newsletters, value content, invitations). Light for transactional (receipts, confirmations, formal communications, proposals attached).

---

### 3.5 Event Materials

**Workshop Slides:**
- Same template as presentation, but with "ZNITH" overline replaced by event name.
- Exercise/activity slides: Lighter background (#14203A) to visually distinguish from content slides.
- Timer/countdown elements: JetBrains Mono 72px, #DF9F3E, centered.

**Name Badges:**
- 90x55mm (standard badge size).
- Background: Navy #091022.
- Name: Montserrat 18px, weight 600, white, centered.
- Company: Montserrat 12px, #BBBBBB, below name.
- ZNITH wordmark: bottom-right corner, Cinzel 10px, #7A7A7A.
- Gold accent line: 40px, 1px, positioned below name.
- For Lideres Leoes events: Background #050B17, "LIDERES LEOES" text replaces ZNITH wordmark, commitment level badge in top-left corner.

**Stage Backdrop:**
- Primarily dark: #091022 or #050B17 for movement events.
- ZNITH wordmark large, centered, Cinzel weight 300, white.
- Below: gold separator line, 200px.
- Below: event tagline or "Direcao. Consciencia. Legado."
- Lion watermark at 5% opacity, positioned to not interfere with speaker silhouette.
- NO busy backgrounds. NO repeating patterns at visible scale. The backdrop is a wall, not a wallpaper.

---

## 4. PHOTOGRAPHY & VIDEO DIRECTION

### 4.1 Leilaine Photography

**Settings:**
- Architecturally significant spaces: modern offices, conference rooms with natural light, urban structural elements (Brazilian urban environments preferred).
- Premium without ostentation. The space communicates structure, not wealth.

**Wardrobe:**
- Contemporary tailoring: structured blazers, clean-cut pieces.
- Palette: blacks, deep navies, charcoals, off-whites.
- Fabrics: premium, logo-free. Message in texture and cut.
- Signature piece: structured blazer/jacket — the recurring anchor element.
- Jewelry: minimal, architectural (not decorative), silver or champagne metal.
- **Prohibited:** bright colors, trendy patterns, excessive accessories, casual/athleisure in any professional context.

**Lighting:**
- Primary: natural light — window light, golden hour, diffused daylight.
- Artificial: warm, directional, creating depth through shadow. NOT flat corporate lighting.
- Mood: serious but not severe. Warm but not soft.
- Processing: subtle desaturation (not filtered), clean tones, slight shadow lift. Shadows pushed toward navy #091022.

**Poses / Expression:**
- Body: grounded, still. Authority from settledness.
- Gaze: direct eye contact with camera. No "candid" avoidance. Occasional profile shots for "direction" motif (compass symbolism).
- Seated: ease of authority — leader in their element.
- Standing: with architectural elements — "builder" visual association.
- **Prohibited:** stock-photo poses (hand on chin, arms crossed, pointing), excessive smiling, performative warmth, group photos where Leilaine is not the clear focal point.

**What is NEVER Shown:**
- Beach, gym, kitchen, casual settings.
- Personal life details as visual content.
- Cluttered or chaotic backgrounds.
- Harsh flash or overhead fluorescent.
- Heavy filters or manufactured processing.

---

### 4.2 Office / Workspace Imagery

If imagery of ZNITH's working environment is needed:
- Clean, minimal spaces. Structured. Organized.
- Navy-tinted color grading (push shadows toward #091022).
- Desaturated 20-30%.
- Show screens with data/dashboards (blurred for confidentiality) — never empty screens.
- Architectural details: clean lines, geometric elements, structured materials.
- Never: messy desks, casual environments, team "fun" photos.

---

### 4.3 Client Imagery

- Client environments with ZNITH dark overlay: minimum 60% navy (#091022) opacity when text is placed over.
- No generic stock. Actual client workspace if available (with permission).
- If client photography is unavailable: use architectural/structural imagery instead. A building, a blueprint, a structured space. Never a person placeholder.
- Client quotes are presented as text, not as photo+quote compositions (unless the client has approved professional photography).

---

### 4.4 Video Style

**Framing:**
- 16:9 ratio.
- Rule of thirds, with Leilaine typically positioned in the right third.
- Clean background — architectural, minimal, navy-toned.
- Shallow depth of field to separate subject from background.

**Color Grading:**
- Cool shadows pushed toward navy.
- Warm highlights on skin tones (not orange — natural warm).
- Overall desaturation 15-20%.
- Contrast slightly lifted in midtones.
- The frame should feel like it belongs on the website when screenshot-captured.

**Pacing:**
- Deliberate. Not fast-cut. Not TikTok rhythm.
- Hold shots for 3-5 seconds minimum.
- Let statements land before cutting.
- B-roll: 2-3 second clips, smooth movements.

**Intro Motion Graphics:**
- Duration: 3-4 seconds.
- Navy background.
- Gold line draws (left to right, 800ms).
- "ZNITH" wordmark fades in (Cinzel weight 300, 500ms).
- Optional: ".AI" or sub-brand suffix appears 200ms after.
- Sound: a single, low, warm tone (see Section 6.1).

**Outro Motion Graphics:**
- Duration: 4-5 seconds.
- Content fades to navy.
- "Direcao. Consciencia. Legado." types in (Montserrat tagline spec, #DF9F3E).
- ZNITH wordmark appears below, white.
- "znith.com.br" in Montserrat 13px, #7A7A7A.
- Fade to navy.

---

### 4.5 B-Roll Direction

B-roll footage supports the brand narrative of architecture and structure:

**What to capture:**
- Architectural details: building facades, structural beams, geometric patterns.
- Hands writing on clean whiteboards (process diagrams, flow charts).
- Screens showing dashboards and data (CRM pipelines, metrics — blurred for confidentiality).
- Time-lapse of construction sites (architecture metaphor).
- Close-ups of blueprints, technical drawings.
- Leilaine in consultation: listening, diagnosing, drawing on whiteboard.
- Urban Brazilian environments: Sao Paulo architectural landmarks, modern corporate spaces.

**What to NEVER capture:**
- Random office scenes with no narrative purpose.
- People typing on laptops (overused, meaningless).
- Handshakes (stock-photo aesthetic).
- Motivational imagery: sunrises, nature, roads disappearing into horizon.
- AI visualizations (neural networks, robots, circuit boards).

---

## 5. INTERACTIVE EXPERIENCES

### 5.1 Diagnostic Tool Concept — "Raio-X Comercial"

**Concept:** An interactive assessment that mirrors ZNITH's real diagnostic methodology. The visitor answers 12-15 questions about their commercial operation and receives a personalized "diagnosis" — not a score, but a structural reading.

**Visual Direction:**
- Full-page experience, navy background #091022.
- One question per screen (not a scrolling form).
- Questions appear via znith-reveal animation (fade in + translateY, 500ms).
- Progress indicator: horizontal line at top, width grows from 0% to 100%, color transitions from Tech Blue #4A78C8 (question 1) to Gold #DF9F3E (final question). This mirrors the LEITURA-to-GOVERNO color journey.
- Question text: Cinzel H3, white, centered.
- Answer options: cards (not radio buttons), #14203A background, 1px #2A3A5A border, gold border on hover/select, scale(1.02) on hover.
- Transition between questions: current question fades out left (200ms), new question fades in from right (300ms).
- Final screen: "Seu Diagnostico" title in Cinzel, followed by 3-4 structural findings presented as cards with category badges. Each finding uses the relevant category accent color.
- CTA: "Agendar Diagnostico Completo" — primary CTA button. The tool gives a taste; the real diagnostic requires engagement.

**Question Categories (mapped to brand methodology):**
1. Pipeline/CRM health
2. Follow-up cadence
3. Sales process definition
4. Team structure/roles
5. Owner dependency
6. AI readiness

**Mobile:** Same one-question-per-screen approach. Full-width cards. Swipe gestures for navigation (optional — buttons as primary).

---

### 5.2 OS Phase Navigator

**Concept:** An interactive exploration of the five ZNITH.AI OS phases — deeper than the homepage showcase, richer than a static page. The visitor controls which phase they explore.

**Visual Direction:**
- Horizontal phase timeline at the top (per design system spec), clickable.
- Clicking a phase node: node activates (gold glow, border color change), phase content slides in from the right (translateX(40px) to 0, opacity 0 to 1, 400ms ease-out).
- Phase content panel: full details, deliverables, timeline expectations, the phase's SVG illustration (line-draw animated on entry).
- A "floating" gold-bordered card on the right shows: estimated duration, key deliverables count, transformation moment.
- Navigation: click nodes OR arrow keys for keyboard accessibility.

**Transition between phases:**
- Current content fades out (200ms), new content fades in (400ms).
- Phase node activation: 300ms border/glow transition.
- Connector line: fills or empties depending on direction.

---

### 5.3 ROI Calculator — "Calculadora de Perda Comercial"

**Concept:** NOT "how much will you gain." Instead: "how much are you losing RIGHT NOW." The calculator quantifies the cost of commercial disorganization — the cost of leads that received no follow-up, proposals without scheduled next steps, CEO time spent pushing pipeline.

**Visual Direction:**
- Dark interface, navy background.
- Input fields per design system form spec (gold focus rings, #14203A backgrounds).
- Inputs: monthly leads, follow-up rate (%), average ticket, sales cycle length, CEO hours on pipeline.
- As values are entered, a "loss counter" in Cinzel 48px, #DF9F3E, updates in real-time at the top of the screen. The number grows as the visitor enters more data. The psychological effect: watching your losses accumulate.
- The final output: "Sua operacao perde aproximadamente R$XX por mes por falta de arquitetura comercial."
- Below: "Em 12 meses, isso representa R$XX."
- CTA: "Agendar Diagnostico para eliminar essa perda."

**Motion:**
- Number updates: quick countUp animation (300ms) when input changes.
- Loss counter pulses subtly (gold glow) when it crosses significant thresholds (R$50K, R$100K, R$500K).

---

### 5.4 Community Portal Concept — Lideres Leoes Entry

**Concept:** The Lideres Leoes section of the site or a standalone landing page that serves as the movement's gateway. Not a signup form. An invitation.

**Visual Direction:**
- Background: #050B17 (deepest navy — movement base).
- Opening: the call-and-response typed out.
  - "Quem governa?" — Cinzel 36px, white, appears first.
  - Pause (600ms).
  - "Quem permanece." — Cinzel 36px, #FFD161, appears below.
- Movement lion watermark: centered, 300px, #FFD161 at 5%.
- Manifesto excerpt: 4-6 lines, Cinzel italic 20px, white, centered, max-width 680px. Scroll-reveals line by line with 100ms stagger.
- Three cards representing the movement's pillars:
  - "Coragem" — what you confront
  - "Consciencia" — what you develop
  - "Governo" — what you build
  - Each card: #0A1020 background, 1px #FFD161 at 20% border, gold text for title.
- Application CTA: "Quero participar" — gold button (#FFD161 background, #050B17 text), NOT a standard ZNITH gold gradient. Movement gold is brighter, bolder.
- Application leads to a form or direct communication channel — NOT an e-commerce flow.

---

## 6. BRAND ATMOSPHERE

### 6.1 Sound Design Direction

If ZNITH had a sound (for videos, podcasts, event openings):

**The ZNITH sound is:** A low, resonant, warm bass tone — like a cathedral bell heard from a distance. Not a melody. A presence. It communicates: something substantial is here.

**Specifics:**
- Base frequency: 80-120Hz range. Deep but not ominous.
- Texture: warm, analog-feeling. Not synthetic. Think: a cello's lowest note sustained, not a synth pad.
- Duration: 2-3 seconds, with a slow natural decay (no hard cut).
- Layered: a very subtle high-frequency shimmer (gold audio equivalent) at 10% volume, like a distant chime.
- Used at: video intros, podcast intros, event openings, significant transitions.
- NOT used: as background music, as notification sounds, casually.

**Podcast/video background music:**
- Minimal piano or ambient strings. Very low volume (barely conscious).
- No percussion. No beat. No electronic elements.
- Reference: the ambient music in a premium hotel lobby — present but never demanding attention.
- Stops during key statements (let the silence carry the weight).

---

### 6.2 Environmental Design

If ZNITH had a physical office or event space:

**Materials:**
- Dark wood (walnut or similar warm tone), brushed metal (champagne/dark brass, not chrome), matte navy fabric.
- Concrete elements — raw but intentional, architectural.
- Glass: frosted or structured, never fully transparent.

**Lighting:**
- Warm, directional, creating pools of light in a generally dim space.
- Navy-tinted ambient lighting at very low intensity.
- Gold accent lighting on key architectural elements (shelving, reception desk edge).
- Natural light from large, structured windows.

**Layout:**
- Generous space between elements. Nothing crowded.
- A large, clean conference table (dark wood, no clutter).
- Walls: one accent wall with the ZNITH lion at 5% opacity, painted or etched into the surface.
- No open-plan chaos. Defined rooms with clear purposes.

**The ZNITH office feels like:** A premium architecture firm's studio. Quiet. Organized. Every object has a reason to exist.

---

### 6.3 Unboxing Experience — Digital Onboarding

When a new ZNITH.AI OS client begins their engagement, the "unboxing" is digital but ceremonial:

**Step 1 — Confirmacao de Aderencia (PDF)**
- A4, white background (light mode — institutional context).
- ZNITH logo header, gold separator line.
- Formal acceptance letter, personally signed by Leilaine.
- The experience of receiving this should feel like receiving a letter from a private bank — not a "welcome email."

**Step 2 — Welcome Video**
- 60-90 second personal video from Leilaine.
- Framing: direct-to-camera, architectural background.
- Content: acknowledges the client's decision, sets expectations, introduces the LEITURA phase.
- Tone: warm but formal. "You have been accepted" energy — not "thanks for buying."

**Step 3 — Kit de Imersao (Immersion Kit)**
- A4 PDF with ZNITH.AI OS lockup header.
- Miniature phase timeline showing Phase 1 highlighted.
- Structured intake sections with form fields.
- Gold dot dividers between sections.
- This document IS the architecture experience beginning. It is organized, structured, clean — modeling what the client's commercial operation will become.

**Step 4 — OS Dashboard Access**
- The client's first login to the tracking/governance dashboard.
- Loading state: gold spinner on navy background. "Preparando sua arquitetura comercial..." in Montserrat 14px, #BBBBBB.
- First screen: their project code (e.g., OS-26-001) in JetBrains Mono 24px, #DF9F3E, with the phase timeline below showing LEITURA as active.

---

### 6.4 Sensory Brand Map

| Sense | ZNITH Expression |
|-------|-----------------|
| **Visual** | Deep navy + gold signature. Architectural precision. Generous negative space. |
| **Auditory** | Low resonant tone (cathedral bell). Minimal ambient piano. Silence as a tool. |
| **Tactile** | (If physical) Thick, textured paper stock (280gsm+). Matte finishes. Embossed gold foil for the ZNITH wordmark on premium materials. |
| **Olfactory** | (Conceptual) Sandalwood and leather. Not sweet. Not light. Grounded, warm, substantial. |
| **Temporal** | Deliberate pacing. Nothing rushed. 500ms animations, not 150ms. The brand takes its time because it is confident. |

---

## 7. GRAFISMO SYSTEM

### 7.1 Z-Pattern

**Description:** The diagonal Z shape, derived from the ZNITH letterform. A monogram-like pattern.

**When to use:**
- Background texture at 20-40% opacity on digital surfaces.
- Packaging and gift materials at full saturation.
- Presentation folder covers.
- Merchandise (if applicable).

**When NOT to use:**
- As a standalone brand identifier (it is not a logo).
- Behind CTAs or form elements.
- On surfaces where it competes with content.

**Implementation:**
- SVG pattern tile, repeating.
- Stroke: 1.5px, #DF9F3E.
- Opacity: 20% (digital background), 40% (featured section), 100% (physical print).
- Scale: 60px tile (desktop), 40px tile (mobile).
- Angle: 45 degrees (the natural diagonal of the Z).

---

### 7.2 Crown Pattern

**Description:** The flat, geometric crown — the symbol of governance within ZNITH.

**Usage Rules:**
- Section headers where governance is the topic.
- Certificate seals and badges (Selo ZNITH, Selo de Governo).
- Decorative element in manifesto/quote sections for Lideres Leoes.
- Always paired with content about governance, achievement, or completion.

**NEVER as:**
- Generic decoration without governance context.
- Primary brand mark (the lion carries that role).
- Standalone element without accompanying content.

**Visual Spec:**
- Flat, monochrome, geometric. NOT ornate, NOT 3D.
- Color: #DF9F3E on dark backgrounds, #C07A20 for subtle contexts.
- Size: 20-32px inline, 48-80px featured/decorative.
- Stroke: 1.5-2px, consistent with icon system.
- The 3D Gold Crown (grafismo 6) requires explicit campaign approval. It is NOT for standard use.

---

### 7.3 Lion Watermark

**Opacity Levels:**
- 3-5% — standard digital use (website sections, slide backgrounds).
- 5-8% — Lideres Leoes movement contexts (slightly more visible, movement energy).
- 8-12% — print materials (compensates for print absorption).

**Positioning Rules:**
- Preferred positions: top-right corner of hero, bottom-left of CTA section, bottom-right of footer area.
- Maximum 2 watermark instances per page.
- Never behind CTAs or form elements.
- Never overlapping with text blocks.
- Always `pointer-events: none` — purely decorative.
- Blend mode: `screen` on dark backgrounds.

**Scale:**
- Desktop: 200-400px.
- Mobile: 120-200px.
- Scale relates inversely to section density — larger watermarks in sparser sections.

**Motion Behavior:**
- Fade-in only: opacity transitions from 0 to target over 1000ms when section enters viewport.
- NO parallax. NO breathing. NO rotation. Static once visible.

**Master Brand Lion vs Movement Lion:**
- Corporate contexts: white (#FFFFFF) or gold (#DF9F3E) at specified opacity.
- Movement contexts: bright gold (#FFD161) at slightly higher opacity.
- They NEVER appear on the same page.

---

### 7.4 Swoosh / Checkmark

**Description:** A dynamic, forward-motion swoosh mark. Functions as a visual "check" — completion, approval, forward progress.

**Usage:**
- Grafismo divider between major sections (centered, 120px desktop / 80px mobile, #DF9F3E at 30% or 60%).
- Slide accents (positioned at bottom of key slides).
- Pull quote decoration (replacing standard quotation marks in select contexts).
- Deliverable list check icons (smaller, 16px, #DF9F3E, inline).

**Implementation:**
- SVG, stroke-based, 1.5px.
- Two variants: the short check (for lists) and the extended swoosh (for dividers).
- Divider variant: block display, centered, margin 48px auto.
- Opacity: 30% for decorative dividers, 60% for featured contexts, 100% for functional icons.

---

### 7.5 Wave / S-Curve Pattern

**Description:** A flowing wave or S-curve pattern. Represents luxury texture and horizontal rhythm.

**Usage:**
- Background texture for sections that need subtle visual interest without competing with content.
- Section separators: a thin wave line (1px, #2A3A5A or #DF9F3E at 15%) replacing a straight horizontal divider.
- Merchandise and physical materials at full saturation.

**Rules:**
- Never on content-dense sections (the wave competes with text).
- Best on sections with large typography or minimal content.
- Digital opacity: 20-40%.
- Horizontal orientation only (never vertical).

**Implementation:**
- SVG path, repeating horizontally.
- Height: 8-12px (the wave's amplitude).
- Repeat: seamless tile.
- Color: #2A3A5A (subtle) or #DF9F3E at low opacity (featured).

---

### 7.6 Grafismo Budget Per Page

To prevent visual noise:

| Page Type | Maximum Grafismo Elements | Maximum Watermarks |
|-----------|--------------------------|-------------------|
| Homepage | 3 (1 divider + 2 decorative) | 2 |
| Product/service page | 2 | 1 |
| Case study | 1 (divider only) | 1 |
| Landing page | 2 | 1 |
| Lideres Leoes page | 3 (movement uses more gold expression) | 2 |
| Email | 0-1 (swoosh in footer) | 0 |
| Slide deck | 1 per slide maximum | 1 per 5 slides |

---

## IMPLEMENTATION NOTES

### For Designer Agent

1. All color values, typography specs, spacing, and component definitions come from the design system documents (`znith-design-system.md` and `znith-design-system-addendum.md`). This creative brief provides the CONCEPT and DIRECTION. The design system provides the exact values.
2. The five-phase SVG illustrations (Section 1.3) are the most creative-intensive assets. They should be minimal, geometric, line-art — NOT photographic, NOT 3D, NOT illustrative in a cartoon sense. Think: technical architectural drawings with a touch of abstraction.
3. Social media templates should be built as reusable systems (Figma components or equivalent), not one-offs.
4. The lion watermark needs two variants: corporate (heraldic, with crown) and movement (watchful rest). They are NOT interchangeable.

### For Dev Agent

1. All animations use CSS transitions/animations + vanilla JS IntersectionObserver. No external animation libraries (no Framer Motion, no GSAP, no anime.js).
2. The OS Phase Navigator (Section 5.2) is a React island within the Astro page. Other interactive elements (diagnostic tool, calculator) are also React islands.
3. SVG line-draw animations use `stroke-dasharray` and `stroke-dashoffset` CSS transitions — no JS required for the animation itself (JS triggers the class that initiates the transition).
4. CountUp animations: vanilla JS with `requestAnimationFrame`. No countUp.js library.
5. All animations must respect `prefers-reduced-motion: reduce`. At minimum: disable transforms and complex animations, preserve opacity fades.
6. The sticky phase timeline (Section 1.3) uses `position: sticky` with IntersectionObserver sentinels. Test thoroughly on Safari (sticky + overflow can be problematic).
7. View Transitions API for page transitions with CSS fallback for unsupported browsers.

### Accessibility Notes

1. **prefers-reduced-motion:** All animations have a reduced-motion variant. Minimum: disable all transforms, reduce all durations to 0ms, keep only opacity transitions at 200ms max.
2. **Color contrast:** Gold #DF9F3E on Navy #091022 achieves ~6.2:1 contrast ratio (exceeds AA). All text combinations verified in design system.
3. **Focus indicators:** All interactive elements have visible focus outlines (2px #FFD161, 3px offset). Never remove native focus indicators without providing equivalent.
4. **Keyboard navigation:** The OS Phase Navigator must be fully keyboard navigable (arrow keys to move between phases, Enter to activate, Tab to reach CTA).
5. **Screen readers:** Watermarks and decorative grafismo must have `aria-hidden="true"`. Phase timeline nodes need descriptive `aria-label` attributes.
6. **Gold-on-navy text:** Minimum 16px for body text. Never use gold for text smaller than 14px on navy backgrounds.

---

## FINAL TEST

Before approving any creative execution against this brief, apply these questions:

1. "Does this feel like McKinsey + Stripe had a Portuguese-speaking daughter?" If no, it is too casual, too techy, or too corporate in the wrong direction.
2. "Does the navy govern?" If gold is competing for attention with navy, the hierarchy is broken.
3. "Does this communicate architecture?" If the visual could belong to any AI startup, it lacks the architectural discipline that makes ZNITH distinct.
4. "Would Leilaine present this with confidence?" If the execution feels like it was made for a different person — too flashy, too motivational, too generic — it fails.
5. "Is it restrained enough?" If removing 20% of the visual elements would improve the composition, the execution is not premium enough.

---

*"Empresas que crescem com previsibilidade nao tiveram sorte. Tiveram arquitetura."*
