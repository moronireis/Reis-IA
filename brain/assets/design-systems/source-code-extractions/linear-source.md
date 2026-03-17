# Linear Source Code Extraction
## Last updated: 2026-03-17
## Source: https://linear.app (Homepage, /features, /method, /customers, /changelog, /integrations)
## Pages analyzed: 6
## Extraction focus: Animations, scroll interactions, dark-mode patterns, entrance animations

---

## 1. Design Tokens / CSS Custom Properties

### Typography Scale
```css
:root {
  /* Title scale (8 levels, responsive) */
  --title-8-size: /* largest heading */;
  --title-8-line-height: /* ... */;
  --title-8-letter-spacing: /* ... */;
  --title-7-size: /* ... */;
  --title-6-size: /* ... */;
  --title-5-size: /* ... */;
  --title-4-size: /* ... */;
  --title-3-size: /* ... */;
  --title-2-size: /* ... */;
  --title-1-size: /* smallest heading */;

  /* Body text scale */
  --text-large-size: /* ... */;
  --text-large-line-height: /* ... */;
  --text-large-letter-spacing: /* ... */;
  --text-regular-size: /* ... */;
  --text-regular-line-height: /* ... */;
  --text-regular-letter-spacing: /* ... */;
  --text-small-size: /* ... */;
  --text-small-line-height: /* ... */;
  --text-small-letter-spacing: /* ... */;
  --text-mini-size: /* ... */;
  --text-mini-line-height: /* ... */;
  --text-mini-letter-spacing: /* ... */;
  --text-micro-size: /* ... */;
  --text-micro-line-height: /* ... */;
  --text-micro-letter-spacing: /* ... */;
  --text-tiny-size: /* ... */;

  /* Font weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Font families */
  --font-monospace: /* monospace stack */;
  --font-serif-display: "EB Garamond", serif; /* Used on /method page */
  --font-settings: /* OpenType feature settings */;
}
```

### Font Stack
```css
/* Primary: Inter Variable */
font-family: "InterVariable", -apple-system, BlinkMacSystemFont, sans-serif;

/* Preloaded fonts */
/* InterVariable.woff2?v=4.1 */
/* Tiempos Headline Regular (serif display) */

/* OpenType features */
font-feature-settings: var(--font-settings), "ss01"; /* Stylistic set 01 */
font-variant-numeric: tabular-nums; /* Monospaced numbers */
```

### Color System
```css
:root {
  /* Text hierarchy */
  --color-text-primary: /* white-ish in dark mode */;
  --color-text-secondary: /* ... */;
  --color-text-tertiary: /* ... */;
  --color-text-quaternary: /* used for subtle decorations */;

  /* Backgrounds */
  --color-bg-primary: /* main background */;

  /* Semantic */
  --color-red: /* error/destructive */;
  --color-green: /* success */;
  --color-link-primary: /* link color */;

  /* Customer brand colors (from /customers page) */
  --color-openai: #ffffff;
  --color-ramp: #e4f222;
  --color-brex: #ff5900;
  --color-scale: #8cc3f2;
  --color-mercury: #dee2ff;
  --color-cashapp: #01c646;
  --color-pleo: #ffc8d0;
  --color-coinbase: #24a3e3;

  /* Extracted opacity value for quaternary text */
  color: rgba(255, 255, 255, 0.48); /* --color-text-quaternary in dark mode */
}
```

### Method Page Gradient Colors
```css
:root {
  /* Grid theme colors */
  --grid-color-purple: #746cf3;
  --grid-color-lavender: #a9a1ff;
  --grid-color-green: #46e3b7;
  --grid-color-gold: #f3bd6c;

  /* Gradient opacities */
  --gradient-opacity-low: 0.3;
  --gradient-opacity-high: 0.6;

  /* Named gradients */
  --gradient-purple-pink: linear-gradient(120deg, #db91cb 0%, #9a5eff 50%, #db91cb 100%);
  --gradient-blue-purple: linear-gradient(92.88deg, #455eb5 9.16%, #5643cc 43.89%, #673fd7 64.72%);
  --gradient-teal-blue: linear-gradient(124.31deg, #46e3b7 0.18%, #2f7ad0 89.82%);
  --gradient-pink-gold: linear-gradient(285.49deg, #f537f9 -14.61%, #f7c12b 106.06%);

  /* Glitch effect colors */
  --a-pink: #db91cb;
  --a-gray: #999;
  --a-blush: #ffb1bf;
  --b-purple: #9a5eff;
  --b-gray: #555;
}
```

---

## 2. Easing Functions & Timing Constants

```css
:root {
  --ease-out-quad: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Duration patterns found across the site */
160ms   /* hamburger menu icon transition */
200ms   /* general UI transitions */
700ms   /* scale pulse animation */
800ms   /* entry animations (--entry-duration) */
1000ms  /* rotation animations */
1200ms  /* blink/pulse animations */
2000ms  /* slow fade/blink cycles */
2800ms  /* grid dot up/down animations */
3000ms  /* shimmer/loading animations */
3200ms  /* grid dot agent animations */
4000ms  /* hero entrance orchestration */
8000ms  /* stroke draw + clip-path reveals */

/* Stagger timing system (/method page) */
--entry-duration: 800ms;
--entry-stagger: 200ms;
--entry-delay: 400ms;
--entry-offset: 30px;
--computer-delay: calc(7 * var(--entry-stagger) + var(--entry-delay));
/* = 7 * 200ms + 400ms = 1800ms total delay for last element */
```

---

## 3. Keyframe Animations

### Entrance Animations (Method Page - Orchestrated Sequence)
```css
/* Left-side element entrance: slide from left + up, then settle */
@keyframes entrance-left {
  from {
    opacity: 0;
    transform: translateX(-64px) translateY(var(--entry-offset)); /* 30px */
  }
  50% {
    transform: translateX(-64px) translateY(0);
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* Duration: 4s, Delay: var(--entry-delay) = 400ms */

/* Simple vertical entrance */
@keyframes entrance-up {
  from {
    opacity: 0;
    transform: translateY(var(--entry-offset)); /* 30px */
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Right-side entrance: slides from center-right + up */
@keyframes entrance-right {
  from {
    opacity: 0;
    transform: translateX(calc((var(--page-max-width) / 2) - 50% - 64px))
               translateY(calc(-1 * var(--entry-offset)));
  }
  50% {
    transform: translateX(calc((var(--page-max-width) / 2) - 50% - 64px));
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* Duration: 4s */

/* Top entrance (reverse of up) */
@keyframes entrance-down {
  from {
    opacity: 0;
    transform: translateY(calc(-1 * var(--entry-offset)));
  }
  to {
    opacity: 1;
    transform: none;
  }
}
/* Duration: 2s */

/* Simple fade */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### SVG Stroke Draw Animation
```css
@keyframes stroke-draw {
  from {
    stroke-dashoffset: 506;
  }
  30%, 100% {
    stroke-dashoffset: 0;
  }
}
/* Duration: 8s */
/* Technique: SVG path with stroke-dasharray matching path length */
/* will-change: stroke-dashoffset */
```

### Clip-Path Reveal (Stepped)
```css
@keyframes clip-reveal {
  from {
    clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
  }
  50%, 100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
/* Duration: 8s, Steps: 8 */
/* will-change: clip-path */
```

### Grid Dot Animations (Homepage - Agent Pattern)
```css
/* 5x5 grid of dots, each with unique keyframes */
/* Pattern: dots animate opacity in a sequenced pattern */
/* Total grid: 25 dots (grid-dot-0-0 through grid-dot-4-4) */
/* Each has two animation variants: */

/* Agent variant: 3200ms duration, stepped timing */
@keyframes grid-dot-0-0-agent {
  0% { opacity: 0.3; }
  /* ... stepped opacity changes ... */
  100% { opacity: 0.3; }
}

/* Up/Down variant: 2800ms duration, stepped timing */
@keyframes grid-dot-0-0-upDown {
  0% { opacity: 0.3; }
  /* ... different stepped opacity pattern ... */
  100% { opacity: 0.3; }
}

/* The grid creates a "wave" or "pulse" visual effect */
/* by staggering the opacity peaks across the 5x5 grid */
```

### Blink Animation
```css
@keyframes blink {
  50% {
    opacity: 0;
  }
}
/* Duration: 1.2s or 2s depending on context */
```

### Scale Pulse
```css
@keyframes scale-pulse {
  0% { transform: scale(0); }
  50% { transform: scale(1); }
  100% { transform: scale(0); }
}
/* Duration: 700ms */
```

### Rotation
```css
@keyframes rotate-180 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(180deg); }
}
/* Duration: 1000ms */
```

### Shimmer / Loading
```css
@keyframes shimmer {
  to {
    background-position: -200%;
  }
}
/* Duration: 3s */
/* Used with background-size: 200% auto */
/* Creates moving highlight effect */
```

### Glitch Text Effect
```css
@keyframes glitch {
  2%, 60%, 63%, 78%, 81% {
    transform: none;
    opacity: 1;
  }
  62% {
    transform: translate(-2px, 0) skew(21deg);
  }
  80% {
    opacity: 0.4;
    transform: translate(2px, 0) skew(-15deg);
  }
}
/* Duration: 1s */
/* Creates digital glitch / distortion effect */
```

---

## 4. Transition Patterns

### Hamburger Menu
```css
/* Menu icon bars */
svg rect:nth-child(1) {
  transform-origin: center;
  transition: 160ms var(--ease-out-quad);
  transform: translateY(-3.5px);
}

svg rect:nth-child(2) {
  transform-origin: center;
  transition: 160ms var(--ease-out-quad);
  transform: translateY(3.5px);
}

/* Open state: bars rotate to form X */
/* rect:nth-child(1) -> translateY(0) rotate(45deg) */
/* rect:nth-child(2) -> translateY(0) rotate(-45deg) */
```

### Text Shadow Hover
```css
.text-hover {
  transition-property: text-shadow;
  transition-duration: 200ms;
}
```

### Card Arrow Hover
```css
.page_arrow__8wXi6 {
  color: var(--color-text-primary);
  width: 16px;
  height: 16px;
}

.page_card:hover .show-hover {
  display: inline; /* Show on hover */
}
```

---

## 5. Typography Patterns

### Responsive Type Scale
```css
/* Title-8 (largest) responsive scaling */
.heading-xl {
  font-size: var(--title-8-size);
  line-height: var(--title-8-line-height);
  letter-spacing: var(--title-8-letter-spacing);
  text-wrap: balance;
  font-weight: var(--font-weight-medium);
}

@media (max-width: 768px) {
  .heading-xl {
    font-size: var(--title-6-size);
    line-height: var(--title-6-line-height);
    letter-spacing: var(--title-6-letter-spacing);
  }
}

@media (max-width: 640px) {
  .heading-xl {
    font-size: var(--title-5-size);
    line-height: var(--title-5-line-height);
    letter-spacing: var(--title-5-letter-spacing);
  }
}
```

### Underline Decoration System
```css
u {
  text-decoration: underline;
  text-decoration-style: solid;
  text-decoration-thickness: 1.5px;
  text-decoration-color: var(--color-text-quaternary);
  text-underline-offset: 2.5px;
}
```

### Superscript
```css
sup {
  position: relative;
  vertical-align: initial;
  top: -0.5em;
  font-size: 0.6em;
}
```

### Inline Code
```css
code {
  font-family: var(--font-monospace);
  font-size: 0.9em;
  background: none;
  padding: 0;
}
```

### Display Serif (Method Page)
```css
.display-heading {
  color: var(--color-text-primary);
  font-family: var(--font-serif-display); /* "EB Garamond", serif */
  font-feature-settings: normal;
  font-variation-settings: normal;
  font-weight: var(--font-weight-normal);
}

/* Method page explicit sizes */
font-size: 4.5em;  /* Hero heading */
font-size: 4em;    /* Large section heading */
font-size: 2.25em; /* Section heading */
font-size: clamp(16px, 1vw, 22px); /* Responsive body */
```

---

## 6. Layout System

### Responsive Breakpoints
```css
@media (max-width: 1280px) { /* Desktop large */ }
@media (max-width: 1024px) { /* Desktop small / tablet landscape */ }
@media (max-width: 768px)  { /* Tablet */ }
@media (max-width: 640px)  { /* Mobile */ }
```

### Responsive Utility Classes
```css
.hide-mobile { display: block; }
.show-mobile { display: none; }

@media (max-width: 640px) {
  .hide-mobile { display: none; }
  .show-mobile { display: block; }
}

.hide-tablet { display: block; }
.show-tablet { display: none; }

@media (max-width: 768px) {
  .hide-tablet { display: none; }
  .show-tablet { display: block; }
}
```

### Spacer Component
```css
.Spacer_root {
  --height: 64px;   /* default */
  --width: auto;
  height: var(--height);
  width: var(--width);
}

/* Responsive spacer variants */
.Spacer_root.hide-mobile { --height: 128px; }
.Spacer_root.show-mobile { --height: 24px; }
```

### Grid System (Features Page)
```css
.page_grid {
  display: grid;
  grid-template-areas: var(--grid-areas-default);
  /* Responsive overrides */
}

@media (max-width: 768px) {
  .page_grid {
    grid-template-areas: var(--grid-areas-tablet);
  }
}

@media (max-width: 640px) {
  .page_grid {
    grid-template-areas: var(--grid-areas-mobile);
  }
}
```

### Z-Index Layer System (Method Page)
```css
--layer-grid-bg: 0;
--layer-radial-bg: 2;
--layer-image: 2;
--layer-screen: 3;
--layer-text: 2;
```

---

## 7. Method Page - Special Visual Techniques

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(120deg, #db91cb 0%, #9a5eff 50%, #db91cb 100%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Radial Background Fade
```css
.radial-fade {
  background: radial-gradient(var(--transparent) 0%, var(--color-bg-primary) 60%);
}
```

### Directional Fade Overlays
```css
/* Top fade */
.fade-top {
  background: linear-gradient(180deg, var(--color-bg-primary) 0%, transparent 100%);
}

/* Bottom fade */
.fade-bottom {
  background: linear-gradient(0deg, var(--color-bg-primary) 0%, transparent 100%);
}
```

### Grid Background
```css
.grid-bg {
  --grid-size: 24px;
  --grid-size-half: 12px;
  /* Grid lines created with repeating-linear-gradient or SVG pattern */
}
```

### Blur Filter
```css
.blur-bg {
  filter: blur(50px);
}
```

### Sticky Scroll Section
```css
.sticky-section {
  position: sticky;
  top: calc(50vh - 128px - 24px - var(--header-height));
}
```

### Orchestrated Entrance Timing
```css
/* Stagger pattern: each element delays by --entry-stagger (200ms) */
/* Element 1: delay = --entry-delay (400ms) */
/* Element 2: delay = --entry-delay + --entry-stagger (600ms) */
/* Element 3: delay = --entry-delay + 2 * --entry-stagger (800ms) */
/* ... */
/* Element 7: delay = --entry-delay + 6 * --entry-stagger (1600ms) */
/* Computer element: --computer-delay = 7 * 200 + 400 = 1800ms */

/* CSS custom properties for stagger calculation */
--entry-duration: 800ms;
--entry-stagger: 200ms;
--entry-delay: 400ms;
--entry-offset: 30px;
--computer-delay: calc(7 * var(--entry-stagger) + var(--entry-delay));

/* Method page uses larger container sizes for visual elements */
--computer-width: 350px;
--size-large: 1100px;
--size-medium: 800px;
--size-small: 600px;
--shadow-size-large: 128px;
--shadow-size-small: 64px;
--overflow-space: 200px;
--click-padding: -10px;
```

---

## 8. Theme System

### JavaScript Theme Management
```javascript
// Theme initialization with dark default
((attr, storageKey, defaultTheme, initialTheme, themes, mapping, system, persist) => {
  let root = document.documentElement;
  let themeOptions = ["light", "dark"];

  function applyTheme(theme) {
    let classArray = Array.isArray(attr) ? attr : [attr];
    classArray.forEach(a => {
      let isClass = a === "class";
      let classNames = isClass && mapping ? themes.map(t => mapping[t] || t) : themes;
      if (isClass) {
        root.classList.remove(...classNames);
        root.classList.add(mapping && mapping[theme] ? mapping[theme] : theme);
      } else {
        root.setAttribute(a, theme);
      }
    });

    if (persist && themeOptions.includes(theme)) {
      root.style.colorScheme = theme;
    }
  }

  if (initialTheme) {
    applyTheme(initialTheme);
  } else {
    try {
      let stored = localStorage.getItem(storageKey) || defaultTheme;
      let resolved = system && stored === "system"
        ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
        : stored;
      applyTheme(resolved);
    } catch (e) {}
  }
})("data-theme", "website-theme", "dark", "dark", ["dark", "light", "glass"], null, true, true);
```

### Hardware-Adaptive Rendering
```javascript
// Linear checks hardware capabilities to enable/disable animations
(() => {
  let documentElement = document.documentElement;
  let navigator = window.navigator;

  try {
    let cores = 8;
    if (navigator && "hardwareConcurrency" in navigator) {
      cores = navigator.hardwareConcurrency;
    }
    // Only enable enhanced animations on machines with >4 cores
    documentElement.classList.toggle("enhanced", cores > 4);
  } catch (e) {}

  try {
    if (document.cookie && document.cookie.indexOf("loggedIn=1") > -1) {
      documentElement.classList.add("logged-in");
    }
  } catch (e) {}

  documentElement.classList.add("js");
})();
```

### Auth-Aware CTA Display
```html
<!-- Buttons conditionally shown/hidden based on login state -->
<button data-hide="logged-in">Sign up</button>
<button data-show="logged-in">Open Linear</button>
```

---

## 9. Component Patterns

### Feature Card (Features Page)
```html
<div class="page_grid">
  <a class="card" href="/ai">
    <div class="card-content">
      <h3>Artificial intelligence</h3>
      <p class="text-tertiary">Description text</p>
    </div>
    <div class="card-image">
      <img src="CDN_URL" width="496" height="400"
           loading="lazy" decoding="async" />
      <div class="page_rightBottomFade">
        <!-- Gradient fade overlay on bottom-right of image -->
      </div>
    </div>
  </a>
</div>
```

### Image CDN Pattern
```
https://linear.app/cdn-cgi/imagedelivery/[ID]/[UUID]/f=auto,dpr=2,q=95,fit=scale-down,metadata=none
```

### Stats Grid (Customers Page)
```css
.StatsGrid {
  display: flex;
  gap: 48px;
}

.StatsGrid__title {
  font-size: /* large */;
  font-weight: bold;
  color: var(--color-text-primary);
}
```

---

## 10. Reis IA Cross-Reference

### Highly Compatible Patterns
- **Dark mode default** with "glass" variant -- directly aligns with Reis IA dark aesthetic
- **Inter font** as primary -- exact match with Reis IA typography
- **Orchestrated entrance animations** with stagger system (200ms intervals) -- premium feel
- **Hardware-adaptive animation** (disable on low-end devices) -- performance-conscious
- **text-wrap: balance** on headings -- modern typographic refinement
- **Gradient text** technique -- adaptable to gold gradient for Reis IA
- **Glitch text effect** -- could accent "AI" or "Systems" branding moments
- **SVG stroke draw** animation -- premium reveal for hourglass/chess motifs
- **Clip-path polygon reveals** -- stepped reveal creates cinematic effect

### Patterns to Adapt
- **Stagger timing system** (--entry-duration, --entry-stagger, --entry-delay) -- use as foundation for Reis IA section entrances
- **5x5 dot grid animation** -- adapt as background pattern with gold dots
- **Sticky scroll sections** with calc-based positioning
- **Auth-aware UI** via data attributes -- useful for member/non-member states
- **Shimmer loading animation** -- use for skeleton states
- **Grid background** with 24px grid size -- subtle background texture
- **Display serif for emphasis** -- consider selective use for premium headlines

### Color Adaptations
- Linear's purple (#9a5eff, #746cf3) should map to Reis IA gold
- Linear's green (#46e3b7) and pink (#db91cb) could serve as accent variations
- rgba(255, 255, 255, 0.48) for quaternary text works directly on dark backgrounds
- Grid colors (#746cf3, #a9a1ff) should adapt to gold/amber spectrum

### Key Takeaway
Linear's animation architecture is the most directly applicable to Reis IA because:
1. Dark mode native
2. Inter font native
3. Performance-conscious (hardware detection)
4. Stagger-based entrance system is modular and reusable
5. Minimal, premium aesthetic with zero "SaaS" patterns
