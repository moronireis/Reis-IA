# Porsche Source Code Extraction — Premium Visual & Interactive Patterns

Last updated: 2026-03-17
Source: https://www.porsche.com/usa/, https://www.porsche.com/usa/models/, https://www.porsche.com/usa/models/taycan/, https://github.com/porsche-design-system/porsche-design-system
Pages analyzed: 4
Extraction method: WebFetch of live pages + Porsche Design System GitHub source code
Note: Porsche uses Astro framework with web components from their own design system CDN (cdn.ui.porsche.com). Most interactive components are encapsulated in `<astro-island>` custom elements with lazy hydration.

---

## TABLE OF CONTENTS

1. [CSS Custom Properties — Complete Token System](#1-css-custom-properties)
2. [Color System — Light and Dark Themes](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing System (Fluid)](#4-spacing-system)
5. [Motion System](#5-motion-system)
6. [Floating CTA Component](#6-floating-cta-component)
7. [Image Hover Effects](#7-image-hover-effects)
8. [Backdrop Blur / Frosted Glass](#8-backdrop-blur-frosted-glass)
9. [Grid Layout System](#9-grid-layout-system)
10. [Responsive Breakpoints](#10-responsive-breakpoints)
11. [Astro Island Hydration Pattern](#11-astro-island-hydration-pattern)
12. [Shadow & Depth System](#12-shadow-depth-system)
13. [Text Color Semantic System](#13-text-color-semantic-system)
14. [Focus & Accessibility](#14-focus-accessibility)
15. [Font Loading Strategy](#15-font-loading-strategy)
16. [Hero Section Patterns](#16-hero-section-patterns)
17. [Web Component Architecture](#17-web-component-architecture)
18. [Analytics & Data Layer](#18-analytics-data-layer)
19. [Reis IA Cross-Reference](#19-reis-ia-cross-reference)

---

## 1. CSS CUSTOM PROPERTIES

### Spacing Tokens (Fluid with clamp())

```css
:root {
  --pcom-spacing-x-small: clamp(4px, 0.25vw + 3px, 8px);
  --pcom-spacing-small: clamp(8px, 0.5vw + 6px, 16px);
  --pcom-spacing-medium: clamp(16px, 1.25vw + 12px, 36px);
  --pcom-spacing-large: clamp(32px, 2.75vw + 23px, 76px);
  --pcom-spacing-x-large: clamp(48px, 3vw + 38px, 96px);
  --pcom-spacing-xx-large: clamp(80px, 7.5vw + 56px, 200px);
}
```

### Motion Tokens

```css
:root {
  --pcom-motion-duration-short: 0.25s;
  --pcom-motion-duration-moderate: 0.4s;
  --pcom-motion-duration-long: 0.6s;
  --pcom-motion-duration-very-long: 1.2s;
  --pcom-motion-easing-base: cubic-bezier(0.25, 0.1, 0.25, 1);
  --pcom-motion-easing-in: cubic-bezier(0, 0, 0.2, 1);
  --pcom-motion-easing-out: cubic-bezier(0.4, 0, 0.5, 1);
}
```

### Image Interaction Tokens

```css
:root {
  --pcom-image-hover-scale: scale3d(1.05, 1.05, 1.05);
}
```

### Grid Tokens

```css
:root {
  --pds-internal-grid-margin: 0;
  --pds-internal-grid-outer-column: calc(var(--pds-internal-grid-safe-zone));
  --pds-internal-grid-width-max: 2560px;
  --pds-internal-grid-width-min: 320px;
}
```

### Header Height (Responsive)

```css
:root {
  --phn-header-height: calc(4.125rem);  /* 66px — mobile default */
}

@media (min-width: 480px) {
  :root { --phn-header-height: calc(5rem); }      /* 80px */
}

@media (min-width: 760px) {
  :root { --phn-header-height: calc(4.5625rem); }  /* 73px */
}

@media (min-width: 1000px) {
  :root { --phn-header-height: calc(4.75rem); }    /* 76px */
}

@media (min-width: 1300px) {
  :root { --phn-header-height: calc(5.125rem); }   /* 82px */
}
```

---

## 2. COLOR SYSTEM

### Theme Light (Complete)

```css
/* From Porsche Design System source: packages/components/src/styles/colors.ts */

/* Primary */
--pds-color-primary: #010205;
--pds-color-primary-darken: #000000;

/* Backgrounds */
--pds-color-background: #FFFFFF;
--pds-color-background-darken: #E0E0E0;
--pds-color-background-lighten: #FFFFFF;
--pds-color-background-surface: #EEEFF2;
--pds-color-background-surface-darken: #CBCED7;
--pds-color-background-surface-lighten: #FFFFFF;
--pds-color-background-shading: rgba(1, 2, 5, 0.67);
--pds-color-background-frosted: hsl(240 4% 85% / 35%);

/* Contrast Scale */
--pds-color-contrast-low: #D8D8DB;
--pds-color-contrast-medium: #6B6D70;
--pds-color-contrast-high: #535457;
--pds-color-contrast-high-darken: #353638;
--pds-color-contrast-high-lighten: #717276;

/* Interactive */
--pds-color-hover: rgba(148, 149, 152, 0.18);
--pds-color-hover-darken: #75767A;
--pds-color-active: rgba(148, 149, 152, 0.20);
--pds-color-focus: #1A44EA;
--pds-color-disabled: #949598;

/* Semantic States */
--pds-color-error: #CC1922;
--pds-color-error-darken: #951219;
--pds-color-error-soft: #FFE2E4;
--pds-color-error-soft-darken: #F4CED1;
--pds-color-success: #197E10;
--pds-color-success-darken: #0E4809;
--pds-color-success-soft: #E4FFEC;
--pds-color-success-soft-darken: #D0F4DB;
--pds-color-warning: #F3BE00;
--pds-color-warning-soft: #FFF4D2;
--pds-color-warning-soft-darken: #F1E5C1;
--pds-color-info: #2762EC;
--pds-color-info-soft: #D3E1FF;
--pds-color-info-soft-darken: #C2D1F1;
```

### Theme Dark (Complete)

```css
/* Primary */
--pds-color-primary: #FBFCFF;
--pds-color-primary-darken: #BECEFF;

/* Backgrounds */
--pds-color-background: #0E0E12;
--pds-color-background-darken: #000000;
--pds-color-background-lighten: #292934;
--pds-color-background-surface: #212225;
--pds-color-background-surface-darken: #040405;
--pds-color-background-surface-lighten: #3E4045;
--pds-color-background-shading: rgba(38, 38, 41, 0.67);
--pds-color-background-frosted: hsl(240 3% 26% / 35%);

/* Contrast Scale */
--pds-color-contrast-low: #404044;
--pds-color-contrast-medium: #88898C;
--pds-color-contrast-high: #AFB0B3;
--pds-color-contrast-high-darken: #909195;
--pds-color-contrast-high-lighten: #CECFD1;

/* Interactive */
--pds-color-hover: rgba(148, 149, 152, 0.18);
--pds-color-hover-darken: #75767A;
--pds-color-active: rgba(126, 127, 130, 0.20);
--pds-color-focus: #1A44EA;
--pds-color-disabled: #7E7F82;

/* Semantic States (Dark) */
--pds-color-error: #FC4040;
--pds-color-error-darken: #FB0404;
--pds-color-error-soft: #3A0F0F;
--pds-color-success: #09D087;
--pds-color-success-darken: #069561;
--pds-color-success-soft: #003320;
--pds-color-warning: #F7CB47;
--pds-color-warning-soft: #362B0A;
--pds-color-info: #178BFF;
--pds-color-info-soft: #04294E;
```

### High Contrast Mode

```css
/* System high contrast colors */
--pds-color-canvas: Canvas;
--pds-color-canvas-text: CanvasText;
--pds-color-highlight: Highlight;
--pds-color-link: LinkText;
--pds-color-disabled: GrayText;
--pds-color-focus: Highlight;
```

---

## 3. TYPOGRAPHY SYSTEM

### Font Family

```css
font-family: 'Porsche Next', 'Arial Narrow', Arial, 'Heiti SC', SimHei, sans-serif;
```

### Font Loading

```css
@font-face {
  font-family: 'Porsche Next';
  font-weight: 600;
  src: url('porsche-next-latin-semi-bold.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0020-007F, U+0080-00FF;
}
```

### Line Height Formula

Porsche uses a calculated line height based on the ex-height of the font, not a fixed ratio:

```css
line-height: calc(6px + 2.125ex);
```

This produces optically-correct line heights across all font sizes. For reference:
- At 16px: ~24px (1.5 ratio)
- At 24px: ~32px (1.33 ratio)
- At 48px: ~56px (1.17 ratio)
- At 80px: ~88px (1.1 ratio)

### Text Rendering

```css
body {
  text-size-adjust: none;
  -webkit-text-size-adjust: none;
  letter-spacing: normal;
}
```

### Text Utilities (CSS Module Classes)

```css
/* Primary text color with theme support */
.text__color-primary { color: #010205; }
.text__color-primary.text__theme-dark { color: #FBFCFF; }

/* Contrast hierarchy */
.text__color-contrast-low { color: #D8D8DB; }
.text__color-contrast-medium { color: #6B6D70; }
.text__color-contrast-high { color: #535457; }

/* Semantic text colors */
.text__color-notification-error { color: #CC1922; }
.text__color-notification-success { color: #197E10; }
.text__color-notification-warning { color: #F3BE00; }

/* Text overflow */
.text__ellipsis {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

---

## 4. SPACING SYSTEM

### Fluid Spacing Scale (Complete)

| Token | Min | Preferred | Max | Use Case |
|---|---|---|---|---|
| `x-small` | 4px | 0.25vw + 3px | 8px | Icon gaps, dense UI elements |
| `small` | 8px | 0.5vw + 6px | 16px | Tight component padding |
| `medium` | 16px | 1.25vw + 12px | 36px | Card padding, grid gaps |
| `large` | 32px | 2.75vw + 23px | 76px | Section padding |
| `x-large` | 48px | 3vw + 38px | 96px | Major section breaks |
| `xx-large` | 80px | 7.5vw + 56px | 200px | Hero/banner spacing |

### Implementation

```css
/* Using the tokens */
.section {
  padding-top: var(--pcom-spacing-x-large);
  padding-bottom: var(--pcom-spacing-x-large);
}

.card {
  padding: var(--pcom-spacing-medium);
  gap: var(--pcom-spacing-small);
}

.hero {
  padding-top: var(--pcom-spacing-xx-large);
  padding-bottom: var(--pcom-spacing-xx-large);
}
```

---

## 5. MOTION SYSTEM

### Duration Scale

```css
:root {
  --pcom-motion-duration-short: 0.25s;      /* Micro-interactions: hovers, toggles */
  --pcom-motion-duration-moderate: 0.4s;    /* Standard transitions: dropdowns, tooltips */
  --pcom-motion-duration-long: 0.6s;        /* Major transitions: modals, page elements */
  --pcom-motion-duration-very-long: 1.2s;   /* Dramatic entrances: hero reveals, page loads */
}
```

### Easing Curves

```css
:root {
  /* Base — all-purpose smooth curve */
  --pcom-motion-easing-base: cubic-bezier(0.25, 0.1, 0.25, 1);

  /* Ease-in — for elements leaving/collapsing */
  --pcom-motion-easing-in: cubic-bezier(0, 0, 0.2, 1);

  /* Ease-out — for elements entering/expanding */
  --pcom-motion-easing-out: cubic-bezier(0.4, 0, 0.5, 1);
}
```

### Easing Curve Visualization

```
Base:     cubic-bezier(0.25, 0.1, 0.25, 1)
          Fast start → even deceleration → smooth settle
          Similar to CSS ease but with slightly more initial velocity

In:       cubic-bezier(0, 0, 0.2, 1)
          Linear start → gradual acceleration → sharp stop
          Used for exits and disappearing elements

Out:      cubic-bezier(0.4, 0, 0.5, 1)
          Gentle start → steady acceleration → controlled arrival
          Used for entrances and appearing elements
```

### Composite Transitions

```css
/* Floating CTA — multi-property orchestrated transition */
.floating-cta-button {
  transition:
    opacity var(--pcom-motion-duration-moderate) ease-in-out 0s,
    transform var(--pcom-motion-duration-long) ease-in-out 0s,
    background-color 0.25s ease 0s,
    border-color 0.25s ease 0s,
    color 0.25s ease 0s;
}

/* Text link hover */
.text-link {
  transition: background var(--p-transition-duration, 0.25s) ease;
  border-radius: 4px;
  margin: -2px;
  padding: 2px;
}

@media (hover: hover) {
  .text-link:hover {
    background: #9495992e;  /* rgba(148, 149, 153, 0.18) */
  }
}
```

---

## 6. FLOATING CTA COMPONENT

The most animated component on the Porsche site — a sticky CTA button that appears on scroll.

### CSS — Complete Implementation

```css
/* Base state — hidden, scaled down, positioned at bottom */
.FloatingCta__button {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%) translateY(40%) scale(0.9);
  transform-origin: center bottom;
  opacity: 0;
  pointer-events: none;

  /* Typography */
  font-family: 'Porsche Next', 'Arial Narrow', Arial, sans-serif;
  font-weight: 600;
  white-space: nowrap;

  /* Appearance */
  border-radius: 980px;  /* Pill shape */
  padding: 12px 32px;
  cursor: pointer;

  /* Multi-property transition */
  transition:
    opacity var(--pcom-motion-duration-moderate) ease-in-out 0s,
    transform var(--pcom-motion-duration-long) ease-in-out 0s,
    background-color 0.25s ease 0s,
    border-color 0.25s ease 0s,
    color 0.25s ease 0s;
}

/* Active state — visible, full size */
.FloatingCta__isActive .FloatingCta__button {
  opacity: 1;
  transform: translateX(-50%) translateY(0) scale(1);
  pointer-events: auto;
}

/* Light theme */
.FloatingCta__button--light {
  background-color: #010205;
  color: #FBFCFF;
}

@media (hover: hover) {
  .FloatingCta__button--light:hover {
    background-color: #535457;
  }
}

/* Dark theme */
.FloatingCta__button--dark {
  background-color: #FBFCFF;
  color: #010205;
}

@media (hover: hover) {
  .FloatingCta__button--dark:hover {
    background-color: #AFB0B3;
  }
}

/* Stuck state — frosted glass when scrolled */
.FloatingCta__isStuck .FloatingCta__button {
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  background-color: hsl(from hsla(240, 3%, 26%, 0.35) h s l / 0.5);
  color: #FBFCFF;
}

@media (hover: hover) {
  .FloatingCta__isStuck .FloatingCta__button:hover {
    background-color: hsl(from hsla(240, 3%, 26%, 0.35) h s calc(l - 15));
  }
}

/* Shadow pseudo-element */
.FloatingCta__button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
  opacity: 0;
  transition: opacity var(--pcom-motion-duration-moderate) ease-in-out 0s;
  pointer-events: none;
}

.FloatingCta__isActive .FloatingCta__button::before {
  opacity: 1;
}

/* Focus ring */
.FloatingCta__button:focus {
  outline: 2px solid #1A44EA;
  outline-offset: 2px;
}

.FloatingCta__button:focus:not(:focus-visible) {
  outline-color: transparent;
}
```

### JavaScript — Floating CTA Controller

```javascript
class FloatingCta {
  constructor(element, options = {}) {
    this.element = element;
    this.button = element.querySelector('.FloatingCta__button');
    this.triggerTop = options.triggerTop || 300;  // px from top to show
    this.triggerBottom = options.triggerBottom || 200;  // px from bottom to hide

    this.isActive = false;
    this.isStuck = false;

    this.init();
  }

  init() {
    // IntersectionObserver for trigger section
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.show();
        } else {
          this.hide();
        }
      },
      {
        rootMargin: `-${this.triggerTop}px 0px -${this.triggerBottom}px 0px`
      }
    );

    // Observe the main content area
    const mainContent = document.querySelector('main');
    if (mainContent) {
      this.observer.observe(mainContent);
    }

    // Scroll handler for stuck state
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Switch to stuck mode when near bottom
      if (scrollY > docHeight - winHeight - 300) {
        this.setStuck(true);
      } else {
        this.setStuck(false);
      }
    }, { passive: true });
  }

  show() {
    this.isActive = true;
    this.element.classList.add('FloatingCta__isActive');
  }

  hide() {
    this.isActive = false;
    this.element.classList.remove('FloatingCta__isActive');
  }

  setStuck(stuck) {
    if (stuck !== this.isStuck) {
      this.isStuck = stuck;
      this.element.classList.toggle('FloatingCta__isStuck', stuck);
    }
  }
}
```

---

## 7. IMAGE HOVER EFFECTS

### Scale on Hover

```css
/* Porsche's signature image hover — 3D scale */
.image-container {
  overflow: hidden;
  border-radius: 0;  /* Porsche uses no border-radius on images */
}

.image-container img {
  transition: transform var(--pcom-motion-duration-long)
              var(--pcom-motion-easing-base);
  will-change: transform;
}

@media (hover: hover) {
  .image-container:hover img {
    transform: var(--pcom-image-hover-scale);
    /* Resolves to: scale3d(1.05, 1.05, 1.05) */
  }
}
```

### Link Hover with Background

```css
.text-link {
  transition: background var(--p-transition-duration, 0.25s) ease;
  border-radius: 4px;
  margin: -2px;
  padding: 2px;
  text-decoration: underline;
}

@media (hover: hover) {
  .text-link:hover {
    background: rgba(148, 149, 152, 0.18);  /* #9495982e */
  }
}
```

---

## 8. BACKDROP BLUR / FROSTED GLASS

### Standard Frosted Glass Pattern

```css
/* Porsche's frosted glass backgrounds */

/* Light theme */
.frosted-light {
  background-color: hsl(240 4% 85% / 35%);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
}

/* Dark theme */
.frosted-dark {
  background-color: hsl(240 3% 26% / 35%);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
}

/* Header navigation */
.header-frosted {
  background-color: rgba(14, 14, 18, 0.8);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
}

/* Dynamic hover adjustment using relative color syntax */
@media (hover: hover) {
  .frosted-dark:hover {
    background-color: hsl(from hsla(240, 3%, 26%, 0.35) h s calc(l - 15));
  }
}
```

---

## 9. GRID LAYOUT SYSTEM

### Core Grid Configuration

```css
/* Porsche uses a 6-column mobile / 16-column desktop grid */

.grid {
  display: grid;
  max-width: var(--pds-internal-grid-width-max);  /* 2560px */
  min-width: var(--pds-internal-grid-width-min);  /* 320px */
  margin: 0 auto;
  gap: var(--pcom-spacing-medium);  /* clamp(16px, 1.25vw + 12px, 36px) */
}

/* Mobile: 6 columns */
.grid {
  grid-template-columns: repeat(6, 1fr);
  padding: 0 var(--pcom-spacing-medium);
}

/* Desktop (760px+): 16 columns */
@media (min-width: 760px) {
  .grid {
    grid-template-columns: repeat(16, 1fr);
    padding: 0 var(--pcom-spacing-large);
  }
}

/* Safe zones for edge content */
.grid-with-safe-zone {
  grid-template-columns:
    var(--pds-internal-grid-outer-column)
    repeat(16, 1fr)
    var(--pds-internal-grid-outer-column);
}
```

---

## 10. RESPONSIVE BREAKPOINTS

```css
/* Porsche's breakpoint scale */
@media (min-width: 480px)  { /* Phablet/small tablet */ }
@media (min-width: 760px)  { /* Tablet/small desktop — grid switches to 16-col */ }
@media (min-width: 1000px) { /* Desktop */ }
@media (min-width: 1300px) { /* Large desktop */ }
@media (min-width: 1920px) { /* 2K+ displays */ }
@media (min-width: 2560px) { /* Max-width clamp */ }

/* Mobile-first approach: base styles are for 320px-479px */
```

---

## 11. ASTRO ISLAND HYDRATION PATTERN

Porsche uses Astro's island architecture for selective component hydration.

```javascript
class AstroIsland extends HTMLElement {
  connectedCallback() {
    // Wait for children if needed
    if (!this.hasAttribute('await-children') ||
        document.readyState === 'interactive' ||
        document.readyState === 'complete') {
      this.childrenConnectedCallback();
    } else {
      document.addEventListener('DOMContentLoaded',
        () => this.childrenConnectedCallback(), { once: true });
    }
  }

  async childrenConnectedCallback() {
    // Determine hydration strategy from 'client' attribute
    const client = this.getAttribute('client');

    if (client === 'visible') {
      // Lazy hydration: only hydrate when visible in viewport
      this.setupVisibleHydration();
    } else if (client === 'idle') {
      // Idle hydration: hydrate during browser idle time
      this.setupIdleHydration();
    } else if (client === 'load') {
      // Immediate hydration on page load
      this.hydrate();
    }
  }

  setupVisibleHydration() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          this.hydrate();
        }
      },
      { rootMargin: '200px' }  // Pre-hydrate 200px before visible
    );
    observer.observe(this);
  }

  setupIdleHydration() {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => this.hydrate(), { timeout: 200 });
    } else {
      setTimeout(() => this.hydrate(), 200);
    }
  }

  async hydrate() {
    // Parse component props from attribute
    const opts = JSON.parse(this.getAttribute('opts') || '{}');
    const props = this.parseProps();

    // Dynamically import component module
    const Component = await this.loadComponent();

    // Render component into island
    this.renderComponent(Component, props, opts);

    // Dispatch hydration complete event
    this.dispatchEvent(new CustomEvent('astro:hydrate'));
  }

  parseProps() {
    const raw = this.getAttribute('props');
    if (!raw) return {};

    return JSON.parse(raw, (key, value) => {
      // Handle special prop types (dates, sets, maps, etc.)
      if (Array.isArray(value) && value.length === 2) {
        const [type, val] = value;
        switch (type) {
          case 0: return val;           // Primitive
          case 1: return new Date(val); // Date
          case 2: return new Set(val);  // Set
          case 3: return new Map(val);  // Map
          default: return val;
        }
      }
      return value;
    });
  }
}

customElements.define('astro-island', AstroIsland);
```

---

## 12. SHADOW & DEPTH SYSTEM

```css
/* Porsche uses very minimal shadows */

/* Primary shadow — for floating elements */
.shadow-float {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

/* Elevated shadow — for modals, dropdowns */
.shadow-elevated {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Shadow via pseudo-element with transition */
.element::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 4px 16px #00000029;  /* rgba(0,0,0,0.16) */
  opacity: 0;
  transition: opacity var(--pcom-motion-duration-moderate) ease-in-out;
  pointer-events: none;
}

.element:hover::before,
.element.is-active::before {
  opacity: 1;
}
```

---

## 13. TEXT COLOR SEMANTIC SYSTEM

```css
/* Complete text color utilities with dark theme support */

/* Primary — main headings, body text */
.text-primary { color: #010205; }
.text-primary.theme-dark { color: #FBFCFF; }

/* Contrast hierarchy */
.text-contrast-low { color: #D8D8DB; }      /* Disabled, placeholders */
.text-contrast-medium { color: #6B6D70; }   /* Secondary info, captions */
.text-contrast-high { color: #535457; }      /* Subheadings, descriptions */

/* Notifications */
.text-error { color: #CC1922; }
.text-success { color: #197E10; }
.text-warning { color: #F3BE00; }

/* Dark theme variants */
.theme-dark .text-contrast-low { color: #404044; }
.theme-dark .text-contrast-medium { color: #88898C; }
.theme-dark .text-contrast-high { color: #AFB0B3; }
.theme-dark .text-error { color: #FC4040; }
.theme-dark .text-success { color: #09D087; }
.theme-dark .text-warning { color: #F7CB47; }
.theme-dark .text-info { color: #178BFF; }
```

---

## 14. FOCUS & ACCESSIBILITY

```css
/* Porsche's focus ring */
:focus {
  outline: 2px solid #1A44EA;
  outline-offset: 2px;
}

/* Only show focus ring for keyboard navigation */
:focus:not(:focus-visible) {
  outline-color: transparent;
}

:focus-visible {
  outline: 2px solid #1A44EA;
  outline-offset: 2px;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 100%, 0.3);
  border-radius: 4px;
}
```

---

## 15. FONT LOADING STRATEGY

```css
@font-face {
  font-family: 'Porsche Next';
  font-weight: 400;
  src: url('/fonts/porsche-next-latin-regular.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0020-007F, U+0080-00FF;
}

@font-face {
  font-family: 'Porsche Next';
  font-weight: 600;
  src: url('/fonts/porsche-next-latin-semi-bold.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0020-007F, U+0080-00FF;
}

@font-face {
  font-family: 'Porsche Next';
  font-weight: 700;
  src: url('/fonts/porsche-next-latin-bold.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0020-007F, U+0080-00FF;
}
```

---

## 16. HERO SECTION PATTERNS

### Car Showcase Hero

```html
<section class="hero" data-theme="dark">
  <div class="hero__media">
    <!-- Full-bleed car image -->
    <picture>
      <source media="(min-width: 1000px)" srcset="hero-desktop.webp">
      <source media="(min-width: 760px)" srcset="hero-tablet.webp">
      <img src="hero-mobile.webp" alt="Cayenne GTS Coupe" loading="eager">
    </picture>
  </div>

  <div class="hero__content">
    <h1 class="hero__title">Cayenne GTS Coupe</h1>
    <p class="hero__subtitle">Performance meets versatility.</p>
    <a href="/configurator/" class="hero__cta">Configure now</a>
    <a href="/models/" class="hero__link">Discover</a>
  </div>
</section>
```

### Model Card Gallery

```html
<div class="media-card-gallery">
  <div class="media-card-gallery-item" data-index="1">
    <div class="media-card">
      <div class="media-card__image">
        <img src="taycan.webp" alt="Taycan" loading="lazy">
      </div>
      <div class="media-card__content">
        <h3>Taycan</h3>
        <p>Starting at $92,000</p>
        <a href="/models/taycan/">Discover</a>
      </div>
    </div>
  </div>
  <!-- Repeat for each model -->
</div>
```

---

## 17. WEB COMPONENT ARCHITECTURE

Porsche loads components from their design system CDN:

```javascript
const porscheDesignSystem = (() => {
  const load = (options = {}) => {
    // Set CDN source
    window.PORSCHE_DESIGN_SYSTEM_CDN =
      options.cdn || window.PORSCHE_DESIGN_SYSTEM_CDN || 'auto';

    // Configure CDN URL
    document.porscheDesignSystem = {
      cdn: {
        url: 'https://cdn.ui.porsche.com',
        prefixes: []
      }
    };
  };

  return { load };
})();

porscheDesignSystem.load();
```

### Component List (from page source)

```
p-carousel      — Image/card carousel
p-modal         — Modal dialogs
p-button        — Styled buttons
p-heading       — Typography headings
p-text          — Typography body text
p-grid          — Layout grid
p-icon          — Icon system
p-link          — Styled links
p-tabs          — Tab navigation
p-accordion     — Expandable sections
```

---

## 18. ANALYTICS & DATA LAYER

```javascript
window.PCOM = {
  dataLayer: {
    defaultProperties: {
      context: {
        applicationId: 'pcom',
        country: 'US',
        language: 'en',
        currency: 'USD'
      },
      pageExperience: {
        pageName: 'models'
      }
    },
    eventNames: {
      pageLoad: 'PAGPCOM_General_Pageload',
      moduleLoad: 'PAGPCOM_GeneralModule_Load'
    }
  }
};

// GTM integration
window.oneGa = window.oneGa || [];
window.oneGa.push({ consentMode_activated: true });
window.oneGa.push({
  'gtm.start': new Date().getTime(),
  event: 'gtm.js'
});
```

---

## 19. REIS IA CROSS-REFERENCE

### Patterns to Adopt

| Porsche Pattern | Reis IA Adaptation | Priority |
|---|---|---|
| Fluid spacing with `clamp()` | Replace fixed spacing scale with fluid equivalents | HIGH |
| Motion duration scale (4 tiers) | Already similar — validate against Porsche's values | HIGH |
| `cubic-bezier(0.25, 0.1, 0.25, 1)` base easing | Consider adopting as `--ease-base` (very close to current) | HIGH |
| Floating CTA with frosted glass stuck state | Perfect for `/agendar` CTA on long pages | HIGH |
| Image hover `scale3d(1.05, 1.05, 1.05)` | Apply to case study cards and portfolio items | MEDIUM |
| `line-height: calc(6px + 2.125ex)` formula | Test with Inter font — may produce better results than fixed ratios | MEDIUM |
| Dark theme background `#0E0E12` | Compare with Reis IA `#000000` — Porsche's dark is slightly lighter | LOW |
| Astro island hydration pattern | Already relevant since Reis IA uses Astro | MEDIUM |
| `backdrop-filter: blur(32px)` for frosted elements | Already using similar — Porsche validates the approach | LOW |

### Motion Values Comparison

| Property | Porsche | Reis IA Current | Notes |
|---|---|---|---|
| Short duration | 0.25s | ~0.2-0.3s | Aligned |
| Moderate duration | 0.4s | ~0.3-0.4s | Aligned |
| Long duration | 0.6s | ~0.5-0.6s | Aligned |
| Very long duration | 1.2s | Not defined | Add for hero reveals |
| Base easing | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Various | Consider standardizing |
| Ease-in | `cubic-bezier(0, 0, 0.2, 1)` | Not standardized | Adopt for exits |
| Ease-out | `cubic-bezier(0.4, 0, 0.5, 1)` | Not standardized | Adopt for entrances |

### Conflicts to Avoid

- Porsche Next font — Reis IA uses Inter exclusively
- Porsche's 16-column grid — Reis IA's 12-column is simpler and sufficient
- Porsche's `#1A44EA` focus blue vs Reis IA `#4A90FF` accent blue — different blues for different purposes
- Porsche's max-width 2560px — Reis IA should keep tighter max-widths for consultancy content
- Porsche's web component CDN architecture — Reis IA should keep components local in Astro
