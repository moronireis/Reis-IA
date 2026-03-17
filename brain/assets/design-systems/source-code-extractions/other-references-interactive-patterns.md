# Interactive Patterns — Non-AIOX Reference Sites
Last updated: 2026-03-17
Sources: Stripe, Linear, Vercel, Apple, Morningside AI, Academia Lendaria
Extraction method: WebFetch + analysis

---

## Table of Contents

1. [Scroll-Driven Animations](#1-scroll-driven-animations)
2. [Hero Section Techniques](#2-hero-section-techniques)
3. [Feature Grid Interactions](#3-feature-grid-interactions)
4. [Card Hover Effects](#4-card-hover-effects)
5. [Button Micro-Interactions](#5-button-micro-interactions)
6. [Page Transition Patterns](#6-page-transition-patterns)
7. [Loading & Entrance Animations](#7-loading--entrance-animations)
8. [Navigation Animation Patterns](#8-navigation-animation-patterns)
9. [Typography Animation](#9-typography-animation)
10. [Responsive Animation Handling](#10-responsive-animation-handling)
11. [Reis IA Adaptation Notes](#11-reis-ia-adaptation-notes)

---

## 1. Scroll-Driven Animations

### 1.1 Stripe — Sticky Section with Card Fan (Enterprise)

**What it does**: Cards fan out from a stacked deck as user scrolls through a sticky section. Cards rotate and translate with perspective transforms.

**Key CSS**:
```css
.EnterpriseHubHeroCardFan {
  will-change: transform;
  perspective: 1000px;
}

.EnterpriseHubHeroCardFan--isVisible {
  visibility: visible;
}

/* Card reveal transition */
transition: opacity, transform 0.1s linear;
```

**Technique**: Intersection Observer toggles `.--isVisible` class. Each card has a unique `transform: rotate()` and `translateY()` calculated from its index. `will-change: transform` enables GPU compositing.

**Reis IA adaptation**: Use for showcasing service pillars (Builder, Systems, Partners, Network). Each card fans out as user scrolls past the section. Replace with CSS `scroll-timeline` for no-JS approach on modern browsers.

---

### 1.2 Apple — Scroll-Linked Video Playback (iPhone/MacBook Pro)

**What it does**: Video scrubs forward/backward based on scroll position. User scrolling controls video timeline.

**Key pattern**:
```javascript
// Conceptual pattern (Apple uses proprietary implementation)
const video = document.querySelector('video');
const section = document.querySelector('.video-section');

function onScroll() {
  const rect = section.getBoundingClientRect();
  const progress = 1 - (rect.bottom / (rect.height + window.innerHeight));
  const clampedProgress = Math.max(0, Math.min(1, progress));
  video.currentTime = clampedProgress * video.duration;
}

window.addEventListener('scroll', onScroll, { passive: true });
```

**Key detail**: Apple uses HLS streams with frame-accurate seeking. For simpler implementation, use a short MP4 with `preload="auto"`.

**Reis IA adaptation**: Use for a premium "how it works" section. Record a screen capture of the AI system in action, scrub through it on scroll. Pure JS + `requestAnimationFrame` for throttling.

---

### 1.3 Apple — Image Sequence on Canvas (MacBook Pro)

**What it does**: Preloads 60-120 images, renders them to a `<canvas>` element based on scroll position. Creates film-quality scroll animation.

**Key pattern**:
```javascript
// Conceptual approach
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const frameCount = 60;
const images = [];

// Preload all frames
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `/frames/frame-${String(i).padStart(3, '0')}.jpg`;
  images.push(img);
}

function renderFrame(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

window.addEventListener('scroll', () => {
  const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
  requestAnimationFrame(() => renderFrame(frameIndex));
});
```

**Reis IA adaptation**: Heavy on bandwidth. Consider only for hero or signature section. Export WebP frames for smaller payload. Alternatively, use CSS `scroll-timeline` with a sprite sheet.

---

### 1.4 Stripe — Copy Fade-In on Scroll

**What it does**: Text blocks fade in and slide up as they enter viewport.

**CSS**:
```css
.copy-block {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.copy-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

**JavaScript**:
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // once: true
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.copy-block').forEach(el => observer.observe(el));
```

**Reis IA adaptation**: This is the bread-and-butter scroll reveal. Directly usable. Use `threshold: 0.15` for slightly earlier trigger. Stagger children with `transition-delay: calc(var(--index) * 80ms)`.

---

### 1.5 Apple — Sticky Section with Progress-Linked Content

**What it does**: Section stays pinned (`position: sticky`) while scroll progress drives content changes (text swaps, image transitions, number counters).

**CSS**:
```css
.sticky-section {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.sticky-track {
  height: 300vh; /* 3x viewport = 3 "pages" of scroll */
  position: relative;
}
```

**Reis IA adaptation**: Excellent for the "methodology" or "how we work" section. Pin the visual, scroll through 3-4 steps. Each step fades text in/out. Pure CSS sticky + JS scroll listener.

---

### 1.6 Stripe — Skew Section Transitions

**What it does**: Sections have angled edges created by CSS transforms. Creates a diagonal cut between sections.

**CSS**:
```css
.section-skewed {
  transform: skewY(var(--sectionAngle));
  padding-top: var(--sectionPaddingTop);
}

.section-skewed > * {
  transform: skewY(calc(var(--sectionAngle) * -1)); /* counter-rotate content */
}
```

**Reis IA adaptation**: Subtle version (1-2deg) adds geometric sophistication without feeling gimmicky. Aligns with "minimal geometric" brand aesthetic. Use sparingly (1-2 sections max).

---

## 2. Hero Section Techniques

### 2.1 Stripe Enterprise — Knockout Text with Animated Mask

**What it does**: Large headline text has an animated gradient mask that sweeps across, revealing a gradient fill behind the text.

**CSS**:
```css
.knockout-text {
  background: linear-gradient(145deg, #24264d, #13172b 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  mask-image: linear-gradient(45deg, transparent, #000 20%, #000 60%, transparent 80%);
  -webkit-mask-position: -20%;
  animation: knockoutReveal 1s ease-out forwards;
}

@keyframes knockoutReveal {
  from { -webkit-mask-position: -20%; }
  to { -webkit-mask-position: 50%; }
}
```

**Reis IA adaptation**: Replace gradient colors with gold/amber tones. Apply to hero headline "Reis IA" text. The mask sweep creates a premium reveal effect. Duration: 1s ease-out is ideal.

---

### 2.2 Stripe — Animated Gradient Stroke

**What it does**: A multicolor gradient animates along a decorative stroke/line element.

**CSS**:
```css
.gradient-stroke {
  background: linear-gradient(90deg, #96f, #bf70ff, #e67aff, #ff89dc, #ffa176, #ffb90f);
  background-size: 200% 100%;
  animation: gradientShift 5s linear infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```

**Reis IA adaptation**: Use a simpler two-tone gradient (dark to gold). Apply to a subtle decorative line in the hero or section dividers. `animation: gradientShift 8s linear infinite` for slower, more refined motion.

---

### 2.3 Apple — Hero with Start/End Frame Crossfade

**What it does**: Hero loads with a "start frame" static image, then crossfades to "end frame" or starts video playback.

**HTML structure**:
```html
<div class="hero-media">
  <img class="hero-startframe" src="hero_startframe.jpg" />
  <img class="hero-endframe" src="hero_endframe.jpg" />
</div>
```

**CSS**:
```css
.hero-endframe {
  opacity: 0;
  transition: opacity 0.8s ease;
  position: absolute;
  inset: 0;
}

.hero-media.loaded .hero-endframe {
  opacity: 1;
}
```

**Reis IA adaptation**: Use for above-the-fold performance. Show a lightweight start frame instantly, then crossfade to the animated/interactive version once JS loads.

---

## 3. Feature Grid Interactions

### 3.1 Stripe — Feature Grid with Skew Sections

**What it does**: Feature cards arranged in a grid, with each section having a slight skew for visual dynamism.

**CSS**:
```css
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

/* Skew-compensated wrapper */
.feature-grid__section {
  transform: skewY(var(--angleNormal));
  scroll-margin-top: var(--fixedNavScrollMargin);
}

.feature-grid__section > * {
  transform: skewY(calc(var(--angleNormal) * -1));
}
```

---

### 3.2 Linear — Animated Dot Grid Agent System

**What it does**: A 5x5 grid of dots animate in coordinated sequences, simulating an "agent" moving through the grid. Each dot has unique timing.

**CSS**:
```css
/* Each dot gets unique keyframes */
@keyframes grid-dot-0-0-agent {
  0%, 6.25% { opacity: 1; }
  6.25%, 100% { opacity: 0.3; }
}

@keyframes grid-dot-0-0-upDown {
  0%, 7.14% { opacity: 0.3; }
  28.57%, 78.57% { opacity: 1; }
}

.grid-dot {
  animation: grid-dot-0-0-agent 3200ms steps(1, end) infinite,
             grid-dot-0-0-upDown 2800ms steps(1, end) infinite;
}
```

**Key values**:
- Agent animation: 3200ms duration, `steps(1, end)` for discrete jumps
- UpDown animation: 2800ms duration, creates pulse effect
- 25 unique keyframe sets (5x5 grid)
- Opacity range: 0.3 to 1

**Reis IA adaptation**: Adapt as a subtle background animation for the "AI systems" section. Use a smaller grid (3x3 or 4x4). Replace lime dots with gold. The `steps(1, end)` timing creates a digital/technical feel that aligns with the chess motif.

---

### 3.3 Linear — Feature Grid with Named Areas

**CSS**:
```css
.feature-grid {
  display: grid;
  grid-template-areas: "a a a a b b b b"; /* 8-column grid */
}

/* Tablet: same layout */
/* Mobile: stacked */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-areas:
      "a a a a"
      "b b b b";
  }
}
```

**Bonus — Fade overlay on cards**:
```css
.card-fade-overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  background: linear-gradient(to top, var(--color-bg-primary), transparent);
  pointer-events: none;
}
```

---

## 4. Card Hover Effects

### 4.1 Stripe — Card with Shadow Elevation + Scale

**CSS**:
```css
.feature-card {
  transition: box-shadow 500ms cubic-bezier(0.7, 0, 0, 1),
              transform 500ms cubic-bezier(0.7, 0, 0, 1);
  will-change: transform;
}

.feature-card:hover {
  box-shadow: 0 41px 60px -40px rgba(0, 0, 0, 0.1),
              0 40px 100px 0 rgba(50, 50, 93, 0.15);
  transform: scale(var(--accentedCardScale, 1.018));
}
```

**Key values**:
- Duration: `500ms`
- Easing: `cubic-bezier(0.7, 0, 0, 1)` (aggressive deceleration)
- Scale: `1.018` (very subtle, 1.8% increase)
- Shadow: two-layer (close soft + far diffused)

**Reis IA adaptation**: Excellent premium feel. For dark mode, replace shadow with a gold glow:
```css
.feature-card:hover {
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.08),
              0 0 80px rgba(212, 175, 55, 0.04);
  transform: scale(1.018);
}
```

---

### 4.2 Morningside — Gradient Border Glow on Hover

**CSS**:
```css
.card {
  border: 1px solid rgba(156, 156, 156, 0.15);
  transition: all 0.3s ease;
}

.card:hover {
  border: 1px solid transparent;
  background-image:
    linear-gradient(135deg, #111413 0%, #050808 100%),
    linear-gradient(135deg, #0F1C16 0%, #0CC481 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(12, 196, 129, 0.15);
}
```

**How it works**: Double `background-image` with `background-clip` creates a gradient border effect. The inner gradient fills the card content, the outer gradient fills only the border area.

**Reis IA adaptation**: Replace green (#0CC481) with gold accent:
```css
.card:hover {
  border: 1px solid transparent;
  background-image:
    linear-gradient(135deg, #0a0a0a 0%, #000000 100%),
    linear-gradient(135deg, #1a1400 0%, #d4af37 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(212, 175, 55, 0.12);
}
```

---

### 4.3 Stripe — Arrow Reveal on Card Hover

**CSS**:
```css
.card-arrow {
  opacity: 0;
  transform: translateX(-3px);
}

.card:hover .card-arrow {
  animation: arrowIn 0.25s ease-out forwards;
}

@keyframes arrowIn {
  0% { opacity: 0; transform: translateX(-3px); }
  100% { opacity: 1; transform: translateX(0); }
}
```

**Reis IA adaptation**: Directly usable. Apply to service cards and CTA links. The 0.25s ease-out timing is snappy and professional.

---

### 4.4 Morningside — Arrow Slide on Hover

**CSS**:
```css
.card-arrow {
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.card:hover .card-arrow {
  opacity: 1;
  transform: translateX(5px);
}
```

**Key difference from Stripe**: Morningside slides the arrow 5px right (suggesting "go forward"), while Stripe animates from -3px to 0 (arrow "arriving"). Both are effective.

---

## 5. Button Micro-Interactions

### 5.1 Stripe — Button with Fill Sweep

**CSS**:
```css
.btn {
  position: relative;
  overflow: hidden;
  transition: color 0.15s ease-out;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--buttonHoverColor);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.btn:hover::after {
  transform: translateX(0);
}
```

**Key values**:
- Fill sweep duration: `0.3s`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design standard)
- Color transition: `0.15s ease-out` (text color changes faster than fill)

**Reis IA adaptation**: Premium button effect. Use gold fill sweeping in from left. Text transitions from gold to black as fill arrives.

---

### 5.2 Stripe — Hover Arrow Animation

**CSS**:
```css
.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.link-arrow svg {
  transition: transform 0.15s ease-out;
}

.link-arrow:hover svg {
  transform: translateX(3px);
}

/* Arrow line opacity */
.link-arrow .arrow-line {
  opacity: var(--arrowLineOpacity, 0);
  transition: opacity 0.15s ease-out;
}

.link-arrow:hover .arrow-line {
  --arrowLineOpacity: 1;
}
```

---

### 5.3 Stripe — Button with Icon Swap

**CSS**:
```css
.btn-icon-swap {
  overflow: hidden;
  position: relative;
}

.btn-icon-swap .icon-default {
  transition: transform 0.15s ease-out;
}

.btn-icon-swap .icon-hover {
  position: absolute;
  transform: translateY(100%);
  transition: transform 0.15s ease-out;
}

.btn-icon-swap:hover .icon-default {
  transform: translateY(-100%);
}

.btn-icon-swap:hover .icon-hover {
  transform: translateY(0);
}
```

---

## 6. Page Transition Patterns

### 6.1 Stripe — Menu Panel Slide

**CSS**:
```css
.menu-panel {
  transform: translateY(-100%);
  transition: transform 0.24s cubic-bezier(0.45, 0.05, 0.55, 0.95);
  transition-delay: 0s;
}

.menu-panel.is-open {
  transform: translateY(0);
  transition-delay: 0.24s; /* Staggered after backdrop */
}

/* Backdrop */
.menu-backdrop {
  opacity: 0;
  transition: opacity 0.24s cubic-bezier(0.45, 0.05, 0.55, 0.95);
}

.menu-backdrop.is-visible {
  opacity: 1;
}
```

**Key values**:
- Duration: `240ms` (0.24s)
- Easing: `cubic-bezier(0.45, 0.05, 0.55, 0.95)` — symmetric, smooth
- Stagger delay: `240ms` between backdrop and panel

**Reis IA adaptation**: Use for mobile navigation drawer. The 240ms timing is fast and responsive. The staggered delay between backdrop and content is a polished touch.

---

### 6.2 Stripe — Menu Section Offset Slide

**CSS**:
```css
.menu-section {
  transform: translateX(-50%) translateX(var(--siteMenuSectionOffset));
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Technique**: Menu sections slide horizontally when switching between menu categories. CSS custom property `--siteMenuSectionOffset` is set via JS.

---

## 7. Loading & Entrance Animations

### 7.1 Stripe — Ticker/Carousel (Enterprise)

**CSS**:
```css
.ticker {
  display: flex;
  animation: ticker 45000ms linear infinite;
}

.ticker:hover {
  animation-duration: 90000ms; /* Slows to half speed on hover */
}

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**Key values**:
- Normal speed: `45s` (45000ms)
- Hover speed: `90s` (90000ms) — slows down for readability
- Content duplicated 2x for seamless loop
- `translateX(-50%)` because content is duplicated

**Reis IA adaptation**: Use for partner logos or technology badges. Adjust speed: 30s for fewer items, 60s for many. The hover-slowdown is a thoughtful UX detail.

---

### 7.2 Stripe — Loading State Opacity

**CSS**:
```css
.page-root[data-loading] .content {
  opacity: 0;
}

.page-root:not([data-loading]) .content {
  opacity: 1;
  transition: opacity 0.3s ease;
}
```

**Technique**: `data-loading` attribute on root element hides all content until JS removes it. Simple, effective loading gate.

---

### 7.3 Linear — Hardware-Aware Enhanced Mode

**JavaScript**:
```javascript
if (navigator.hardwareConcurrency > 4) {
  document.documentElement.classList.add('enhanced');
}
```

**Technique**: Checks CPU core count. If > 4 cores, enables enhanced animations. Otherwise, serves simpler versions.

**Reis IA adaptation**: Smart progressive enhancement. Use this pattern:
```javascript
const isHighPerf = navigator.hardwareConcurrency > 4
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isHighPerf) {
  document.documentElement.classList.add('enhanced');
}
```

---

## 8. Navigation Animation Patterns

### 8.1 Stripe — Navigation with CSS Custom Property System

**CSS**:
```css
:root {
  --siteMenuTransition: 250ms;
  --transitionDuration: 240ms;
  --transitionEasing: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  --hoverTransition: 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --siteMenuTransition: 1ms;
  }
}

.nav-link {
  transition: color 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
```

**Key insight**: Stripe uses CSS custom properties for ALL animation timing, making it trivial to adjust globally or respect `prefers-reduced-motion`.

---

### 8.2 Morningside — Scroll-Aware Frosted Nav

**CSS**:
```css
.nav {
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

.nav.scrolled {
  background-color: rgba(8, 8, 8, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Logo parts fade out on scroll */
.nav svg path:not(:last-child) {
  transition: opacity 0.3s ease;
  opacity: 1;
}

.nav.scrolled svg path:not(:last-child) {
  opacity: 0;
}
```

**JavaScript**:
```javascript
function handleScroll() {
  if (window.scrollY > 0) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleScroll);
```

**Reis IA adaptation**: Directly usable. The frosted glass nav is a premium pattern. For Reis IA, use `rgba(0, 0, 0, 0.6)` with `blur(12px)` for a darker, more opaque feel on a black background.

---

## 9. Typography Animation

### 9.1 Linear — Responsive Typography with CSS Custom Properties

**CSS**:
```css
:root {
  --title-1-size: 3.5rem;
  --title-1-line-height: 1.1;
  --title-1-letter-spacing: -0.03em;

  --title-4-size: 2rem;
  --title-4-line-height: 1.2;
  --title-4-letter-spacing: -0.02em;

  --text-regular-size: 1rem;
  --text-large-size: 1.125rem;
  --text-small-size: 0.875rem;
  --text-mini-size: 0.75rem;
  --text-micro-size: 0.625rem;

  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
}

/* Responsive scaling */
@media (max-width: 1280px) {
  :root { --title-1-size: 3rem; }
}
@media (max-width: 1024px) {
  :root { --title-1-size: 2.5rem; }
}
@media (max-width: 768px) {
  :root { --title-1-size: 2rem; }
}
@media (max-width: 640px) {
  :root { --title-1-size: 1.75rem; }
}
```

**Also notable**: Linear uses `text-wrap: balance` on headings and `text-wrap: pretty` on body text for optimal line breaking.

---

### 9.2 Apple — Scale + Fade Typography Reveal

**Technique** (inferred from page analysis):
```css
.headline {
  opacity: 0;
  transform: scale(0.96);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.headline.in-view {
  opacity: 1;
  transform: scale(1);
}
```

Combined with letter-spacing expansion:
```css
.headline {
  letter-spacing: 0;
  transition: letter-spacing 0.8s ease;
}

.headline.in-view {
  letter-spacing: 0.05em;
}
```

---

## 10. Responsive Animation Handling

### 10.1 Stripe — `prefers-reduced-motion` Support

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --siteMenuTransition: 1ms;
  }

  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 10.2 Morningside — Mobile Hover Override

```css
/* Mobile: always show gradient borders (no hover capability) */
@media (max-width: 479px) {
  .card {
    border: 1px solid transparent;
    background-image:
      linear-gradient(90deg, #050808 0%, #111413 100%),
      linear-gradient(90deg, #0CC481 0%, #0F1C16 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
}
```

**Key insight**: On mobile where hover is impossible, Morningside makes the gradient border permanent. This ensures the visual richness isn't lost on touch devices.

### 10.3 Vercel — Container Queries for Responsive Cards

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    flex-direction: row;
  }
}
```

**Reis IA adaptation**: Container queries are better than media queries for component-level responsiveness. Astro + modern browsers support this fully.

### 10.4 Stripe Breakpoints

```css
@media (max-width: 1150px) { /* Header condensed */ }
@media (max-width: 768px)  { /* Mobile layout */ }
```

### 10.5 Linear Breakpoints

```css
@media (max-width: 1280px) { /* Large desktop adjustments */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (max-width: 768px)  { /* Mobile tablet */ }
@media (max-width: 640px)  { /* Mobile */ }
```

---

## 11. Reis IA Adaptation Notes

### Easing Curve Library (Collected from all references)

| Name | Value | Source | Usage |
|------|-------|--------|-------|
| Stripe Standard | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | Stripe | Menu transitions |
| Stripe Hover | `cubic-bezier(0.215, 0.61, 0.355, 1)` | Stripe | Hover effects |
| Stripe Decel | `cubic-bezier(0.7, 0, 0, 1)` | Stripe | Card hover (aggressive decel) |
| Stripe Nav | `cubic-bezier(0.25, 1, 0.5, 1)` | Stripe | Navigation links |
| Material Standard | `cubic-bezier(0.4, 0, 0.2, 1)` | Stripe/Vercel | General purpose |
| AIOX Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | AIOX | Bouncy overshoot |
| AIOX Smooth | `cubic-bezier(0.25, 0.1, 0.25, 1)` | AIOX | Natural default |
| AIOX Decel | `cubic-bezier(0, 0, 0.2, 1)` | AIOX | Soft landing |

### Recommended Reis IA Easing Set

```css
:root {
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);      /* General transitions */
  --ease-in-out: cubic-bezier(0.45, 0.05, 0.55, 0.95);   /* Symmetric, menus */
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);        /* Hover effects */
  --ease-out-expo: cubic-bezier(0.7, 0, 0, 1);            /* Card reveal */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);       /* Playful bounce */
}
```

### Duration Scale

```css
:root {
  --dur-instant: 100ms;  /* Tooltips, micro-feedback */
  --dur-fast: 150ms;     /* Button hover, icon swap */
  --dur-normal: 250ms;   /* Menu transitions, standard */
  --dur-slow: 500ms;     /* Card hover, section reveal */
  --dur-slower: 700ms;   /* Hero entrance, dramatic reveals */
  --dur-slowest: 1000ms; /* Knockout text, mask animations */
}
```

### Top 10 Patterns for Reis IA (Priority Order)

1. **Scroll fade-in reveal** (Stripe) — Every section needs this as baseline
2. **Frosted glass nav** (Morningside) — Premium scrolled state
3. **Gradient border glow on hover** (Morningside) — Card interactions with gold accent
4. **Card scale + shadow elevation** (Stripe) — Feature cards
5. **Knockout text reveal** (Stripe Enterprise) — Hero headline animation
6. **Ticker/marquee with hover slowdown** (Stripe) — Partner/technology showcase
7. **Arrow reveal on card hover** (Stripe) — CTAs and links
8. **Sticky section with scroll progress** (Apple) — Methodology/process section
9. **Hardware-aware animation toggle** (Linear) — Performance optimization
10. **Reduced motion support** (Stripe) — Accessibility requirement

### Patterns to Avoid for Reis IA

- Image sequence on canvas (Apple) — too bandwidth-heavy for consultancy site
- Complex dot grid animations (Linear) — too SaaS/product-focused
- Skew section transforms (Stripe) — may feel too startup/tech
- Video scroll scrubbing (Apple) — requires significant video production investment
