# Morningside AI Design System -- Reusable Code Snippets

Last updated: 2026-03-16

Extracted CSS/code patterns from morningside.ai, adapted as reference snippets for building the Reis IA design system. These are starting points for adaptation, not copy-paste solutions. All snippets include the original Morningside pattern and a Reis IA adapted version.

---

## 1. Gradient Border System (Background-Clip Technique)

The most valuable pattern from Morningside. Creates gradient borders that work with border-radius.

```css
/* === MORNINGSIDE ORIGINAL === */
.card-gradient-border {
  border: 1px solid transparent;
  background-image: linear-gradient(#111413, #111413),
                    linear-gradient(90deg, #0CC481 0%, #0F1C16 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 12px;
}

/* === REIS IA ADAPTATION === */
.card-gradient-border {
  border: 1px solid transparent;
  background-image: linear-gradient(#141414, #141414),
                    linear-gradient(90deg, #C9A84C 0%, #1A1A0A 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  border-radius: 12px;
}

/* With hover reveal (border only appears on hover) */
.card-gradient-border-hover {
  border: 1px solid rgba(255, 255, 255, 0.06);
  background-clip: padding-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.card-gradient-border-hover:hover {
  border: 1px solid transparent;
  background-image: linear-gradient(#141414, #141414),
                    linear-gradient(90deg, #C9A84C 0%, #1A1A0A 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
```

### Tailwind Config Extension

```js
// tailwind.config.js -- Note: gradient borders require custom CSS,
// not achievable with Tailwind utilities alone.
// Use @apply in component classes or inline styles.
```

---

## 2. Glow Shadow System

```css
/* === MORNINGSIDE ORIGINAL === */
.card:hover {
  box-shadow: 0 0 50px 0 rgba(12, 196, 129, 0.15);
}

/* === REIS IA ADAPTATION === */
:root {
  --glow-gold-sm: 0 0 30px 0 rgba(201, 168, 76, 0.10);
  --glow-gold-md: 0 0 50px 0 rgba(201, 168, 76, 0.15);
  --glow-gold-lg: 0 0 80px 0 rgba(201, 168, 76, 0.12);
  --glow-gold-xl: 0 0 120px 0 rgba(201, 168, 76, 0.08);
}

.card:hover {
  box-shadow: var(--glow-gold-md);
}

/* Combined with gradient border for full effect */
.card-premium:hover {
  border: 1px solid transparent;
  background-image: linear-gradient(#141414, #141414),
                    linear-gradient(90deg, #C9A84C 0%, #1A1A0A 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: var(--glow-gold-md);
}
```

### Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'glow-sm': '0 0 30px 0 rgba(201, 168, 76, 0.10)',
        'glow-md': '0 0 50px 0 rgba(201, 168, 76, 0.15)',
        'glow-lg': '0 0 80px 0 rgba(201, 168, 76, 0.12)',
        'glow-xl': '0 0 120px 0 rgba(201, 168, 76, 0.08)',
      },
    },
  },
}
```

---

## 3. Glassmorphic Navigation

```css
/* === MORNINGSIDE ORIGINAL === */
.nav_component {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

.nav_component.scrolled {
  background: rgba(8, 8, 8, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* === REIS IA ADAPTATION === */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background-color 0.3s ease,
              backdrop-filter 0.3s ease,
              border-color 0.3s ease;
}

.nav.scrolled {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
```

### JavaScript (Scroll Detection)

```js
// Minimal scroll detection for nav state
const nav = document.querySelector('.nav');
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
      ticking = false;
    });
    ticking = true;
  }
});
```

---

## 4. Grain/Noise Texture Overlay

```css
/* === MORNINGSIDE APPROACH === */
/* Uses a grainy.png image file as background overlay */

/* === REIS IA ADAPTATION (CSS-only, no external image) === */

/* Method 1: SVG filter noise (best quality, no extra requests) */
.grain-overlay {
  position: relative;
}

.grain-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.035;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  z-index: 1;
}

/* Ensure content sits above the grain */
.grain-overlay > * {
  position: relative;
  z-index: 2;
}

/* Method 2: Simpler approach with CSS gradient noise */
.grain-simple::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='.4'/%3E%3C/svg%3E");
  background-size: 180px;
}
```

### Tailwind Plugin

```js
// tailwind.config.js plugin for grain overlay
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.grain': {
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '0',
            opacity: '0.035',
            pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            zIndex: '1',
          },
          '& > *': {
            position: 'relative',
            zIndex: '2',
          },
        },
      });
    }),
  ],
}
```

---

## 5. Card Hover Arrow Animation

```css
/* === MORNINGSIDE ORIGINAL === */
.cs-arrow {
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cs-wrapper:hover .cs-arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* === REIS IA ADAPTATION === */
.card-arrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #A3A3A3;
  transition: color 0.3s ease, gap 0.3s ease;
}

.card-arrow svg {
  transition: transform 0.3s ease;
}

.card:hover .card-arrow {
  color: #C9A84C;
}

.card:hover .card-arrow svg {
  transform: translateX(5px);
}
```

---

## 6. FAQ Accordion

```css
/* === MORNINGSIDE PATTERN === */
.faq-accordion {
  border: 1px solid rgba(237, 236, 228, 0.06);
  border-radius: 12px;
  overflow: hidden;
  transition: background 0.3s ease;
}

.faq-accordion:hover,
.faq-accordion.open {
  background: linear-gradient(135deg, #111413 0%, #050808 100%);
}

/* === REIS IA ADAPTATION === */
.faq-item {
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.faq-item:hover {
  border-color: rgba(201, 168, 76, 0.15);
}

.faq-item.open {
  background: linear-gradient(135deg, #141414 0%, #0A0A0A 100%);
  border-color: rgba(201, 168, 76, 0.2);
}

.faq-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: #F5F5F5;
}

.faq-icon {
  transition: transform 0.3s ease, color 0.3s ease;
  color: #737373;
}

.faq-item.open .faq-icon {
  transform: rotate(45deg);
  color: #C9A84C;
}

.faq-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
  padding: 0 24px;
}

.faq-item.open .faq-body {
  padding-bottom: 20px;
}
```

### JavaScript (Accordion Logic)

```js
document.querySelectorAll('.faq-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.faq-item');
    const body = item.querySelector('.faq-body');
    const isOpen = item.classList.contains('open');

    // Close all others (optional: remove for multi-open)
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-body').style.maxHeight = '0';
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      body.style.maxHeight = '0';
    } else {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
});
```

---

## 7. Infinite Logo Carousel

```css
/* === MORNINGSIDE APPROACH === */
/* Content repeated 3x in DOM for seamless loop */

/* === REIS IA ADAPTATION === */
.logo-carousel {
  overflow: hidden;
  position: relative;
  padding: 24px 0;
}

.logo-carousel::before,
.logo-carousel::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}

.logo-carousel::before {
  left: 0;
  background: linear-gradient(90deg, #000000 0%, transparent 100%);
}

.logo-carousel::after {
  right: 0;
  background: linear-gradient(270deg, #000000 0%, transparent 100%);
}

.logo-track {
  display: flex;
  gap: 48px;
  align-items: center;
  animation: scroll 30s linear infinite;
  width: max-content;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-33.333%); }
  /* -33.333% because content is tripled */
}

.logo-item {
  flex-shrink: 0;
  opacity: 0.4;
  filter: grayscale(100%) brightness(2);
  transition: opacity 0.3s ease, filter 0.3s ease;
  height: 24px;
  width: auto;
}

.logo-item:hover {
  opacity: 0.7;
  filter: grayscale(0%) brightness(1);
}
```

---

## 8. Text Selection Styling

```css
/* === MORNINGSIDE ORIGINAL === */
::selection { background: #0CC481; color: white; }

/* === REIS IA ADAPTATION === */
::selection {
  background: #C9A84C;
  color: #000000;
}

::-moz-selection {
  background: #C9A84C;
  color: #000000;
}
```

---

## 9. Card Background Gradient (Hover State)

```css
/* === MORNINGSIDE ORIGINAL === */
.process_card:hover {
  background: linear-gradient(135deg, #111413 0%, #050808 100%);
}

/* === REIS IA ADAPTATION === */
.pillar-card {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 32px;
  transition: background 0.3s ease,
              border-color 0.3s ease,
              box-shadow 0.3s ease;
}

.pillar-card:hover {
  background: linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%);
  border-color: rgba(201, 168, 76, 0.2);
  box-shadow: 0 0 50px 0 rgba(201, 168, 76, 0.08);
}
```

---

## 10. Font Rendering Best Practices

```css
/* === FROM MORNINGSIDE (confirmed in source) === */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* === REIS IA FULL IMPLEMENTATION === */
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

/* For Inter font specifically -- enable OpenType features */
body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  font-feature-settings: 'liga' 1, 'calt' 1, 'cv01' 1;
}

/* Tabular numbers for data/metrics */
.stat-number {
  font-variant-numeric: tabular-nums;
}
```

---

## 11. Container Width System

```css
/* === INSPIRED BY MORNINGSIDE'S THREE-TIER CONTAINERS === */
:root {
  --container-sm: 800px;   /* Forms, FAQs, narrow content */
  --container-md: 1080px;  /* Standard content sections */
  --container-lg: 1200px;  /* Full-width sections, hero */
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 24px;
}

.container-sm { max-width: var(--container-sm); }
.container-md { max-width: var(--container-md); }
.container-lg { max-width: var(--container-lg); }

@media (min-width: 768px) {
  .container { padding: 0 32px; }
}
```

### Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      maxWidth: {
        'container-sm': '800px',
        'container-md': '1080px',
        'container-lg': '1200px',
      },
    },
  },
}
```

---

## 12. Combined Card Component (Full Pattern)

Combining gradient border + glow shadow + hover arrow + grain texture into one production-ready card pattern.

```css
/* === REIS IA PRODUCTION CARD === */
.card {
  position: relative;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  padding: 32px;
  transition: border-color 0.3s ease,
              box-shadow 0.3s ease,
              background 0.3s ease;
  overflow: hidden;
}

/* Grain texture layer */
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 256px;
  border-radius: 12px;
  z-index: 0;
}

.card > * {
  position: relative;
  z-index: 1;
}

/* Hover: gradient border + glow */
.card:hover {
  border-color: transparent;
  background-image: linear-gradient(#141414, #141414),
                    linear-gradient(90deg, #C9A84C 0%, #1A1A0A 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(201, 168, 76, 0.10);
}

/* Arrow indicator */
.card .card-arrow-icon {
  transition: transform 0.3s ease, color 0.3s ease;
  color: #737373;
}

.card:hover .card-arrow-icon {
  transform: translateX(5px);
  color: #C9A84C;
}
```

---

## Usage Notes

- All Reis IA adaptations use the project's established color tokens (#C9A84C for gold accent, #141414 for card backgrounds, #0A0A0A for page backgrounds).
- Gradient border technique requires `border: 1px solid transparent` -- the transparency is load-bearing; removing it breaks the effect.
- Grain texture uses inline SVG data URI to avoid external file dependencies. The opacity should stay in the 0.03-0.05 range; higher values become distracting.
- The glow shadow sizes (sm/md/lg/xl) use decreasing opacity at larger blur radii to prevent the glow from looking like a colored fog.
