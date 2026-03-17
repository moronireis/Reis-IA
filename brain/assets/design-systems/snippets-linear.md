# Linear Design System -- Reusable Code Snippets

Last updated: 2026-03-16

Extracted CSS/code patterns from linear.app, adapted as reference snippets for building the Reis IA design system. These are starting points for adaptation, not copy-paste solutions.

---

## 1. Opacity-Based Text Hierarchy

```css
:root {
  /* Linear-style text hierarchy using white at varying opacities */
  --text-primary: rgba(255, 255, 255, 1);
  --text-secondary: rgba(255, 255, 255, 0.70);
  --text-tertiary: rgba(255, 255, 255, 0.50);
  --text-quaternary: rgba(255, 255, 255, 0.35);
  --text-dimmed: rgba(255, 255, 255, 0.48);

  /* Border hierarchy */
  --border-primary: rgba(255, 255, 255, 0.08);
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-emphasis: rgba(255, 255, 255, 0.12);
}
```

### Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'linear-bg': '#08090a',
        'linear-surface': '#0e0f11',
        'linear-surface-2': '#141517',
      },
      textColor: {
        'primary': 'rgba(255, 255, 255, 1)',
        'secondary': 'rgba(255, 255, 255, 0.70)',
        'tertiary': 'rgba(255, 255, 255, 0.50)',
        'quaternary': 'rgba(255, 255, 255, 0.35)',
        'dimmed': 'rgba(255, 255, 255, 0.48)',
      },
      borderColor: {
        'subtle': 'rgba(255, 255, 255, 0.05)',
        'default': 'rgba(255, 255, 255, 0.08)',
        'emphasis': 'rgba(255, 255, 255, 0.12)',
      },
    },
  },
}
```

---

## 2. Typography System

```css
:root {
  /* Linear-style type scale (adapted for Reis IA -- Inter Variable) */
  --title-display: 72px;
  --title-1: 64px;
  --title-2: 48px;
  --title-3: 40px;
  --title-4: 32px;
  --title-5: 28px;
  --title-6: 24px;
  --title-7: 20px;
  --title-8: 18px;

  --text-large: 18px;
  --text-regular: 16px;
  --text-small: 14px;
  --text-mini: 13px;
  --text-micro: 12px;
  --text-tiny: 11px;

  /* Weight tokens */
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}

/* Text wrapping best practices */
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

p, li, blockquote {
  text-wrap: pretty;
}

/* Tabular numbers for data */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* Line clamping */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
```

### Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'display': ['72px', { lineHeight: '1.0', letterSpacing: '-0.03em', fontWeight: '700' }],
        'title-1': ['64px', { lineHeight: '1.0', letterSpacing: '-0.025em', fontWeight: '700' }],
        'title-2': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title-3': ['40px', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '600' }],
        'title-4': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-5': ['28px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'title-6': ['24px', { lineHeight: '1.3', letterSpacing: '-0.005em', fontWeight: '600' }],
        'title-7': ['20px', { lineHeight: '1.35', letterSpacing: '0', fontWeight: '500' }],
        'title-8': ['18px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
      },
    },
  },
}
```

---

## 3. Spacer System

```css
:root {
  /* Linear-style spacing scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 30px;
  --space-8: 32px;
  --space-9: 48px;
  --space-10: 56px;
  --space-11: 64px;
  --space-12: 80px;
  --space-13: 96px;
  --space-14: 128px;
  --space-15: 164px;

  /* Section padding */
  --section-padding-desktop: 120px 24px;
  --section-padding-mobile: 48px 24px;
}
```

---

## 4. Grid Dot Animation

```css
/* Linear's signature 5x5 grid animation -- simplified version */
.grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.grid-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
}

/* Generate animation for each dot with unique timing */
@keyframes dot-pulse-a {
  0%, 40% { opacity: 0.3; }
  45%, 65% { opacity: 1; }
  70%, 100% { opacity: 0.3; }
}

@keyframes dot-pulse-b {
  0%, 20% { opacity: 0.3; }
  25%, 50% { opacity: 1; }
  55%, 100% { opacity: 0.3; }
}

@keyframes dot-pulse-c {
  0%, 60% { opacity: 0.3; }
  65%, 85% { opacity: 1; }
  90%, 100% { opacity: 0.3; }
}

/* Apply with staggered delays */
.grid-dot:nth-child(5n+1) { animation: dot-pulse-a 3200ms steps(1, end) infinite; }
.grid-dot:nth-child(5n+2) { animation: dot-pulse-b 3200ms steps(1, end) infinite 200ms; }
.grid-dot:nth-child(5n+3) { animation: dot-pulse-c 2800ms steps(1, end) infinite 400ms; }
.grid-dot:nth-child(5n+4) { animation: dot-pulse-a 2800ms steps(1, end) infinite 600ms; }
.grid-dot:nth-child(5n+5) { animation: dot-pulse-b 3200ms steps(1, end) infinite 100ms; }
```

### Reis IA Adaptation: Hourglass Particle Grid

```css
/* Hourglass-shaped grid that pulses with Linear's binary animation style */
.hourglass-grid {
  display: grid;
  grid-template-columns: repeat(7, 8px);
  gap: 6px;
  justify-content: center;
}

.hourglass-particle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #C9A84C;  /* Reis IA gold accent */
  opacity: 0.2;
}

.hourglass-particle.active {
  animation: particle-pulse 3200ms steps(1, end) infinite;
}

@keyframes particle-pulse {
  0%, 30% { opacity: 0.2; }
  35%, 60% { opacity: 0.8; }
  65%, 100% { opacity: 0.2; }
}
```

---

## 5. Staggered Entrance Animation

```css
/* Linear's entrance animation pattern */
.reveal-container > * {
  opacity: 0;
  transform: translateY(30px);
}

.reveal-container.visible > * {
  animation: reveal-up 800ms ease-out forwards;
}

/* Stagger each child */
.reveal-container.visible > *:nth-child(1) { animation-delay: 400ms; }
.reveal-container.visible > *:nth-child(2) { animation-delay: 600ms; }
.reveal-container.visible > *:nth-child(3) { animation-delay: 800ms; }
.reveal-container.visible > *:nth-child(4) { animation-delay: 1000ms; }
.reveal-container.visible > *:nth-child(5) { animation-delay: 1200ms; }

@keyframes reveal-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### IntersectionObserver Trigger

```js
// Trigger reveal when section enters viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal-container').forEach(el => {
  observer.observe(el);
});
```

### Tailwind + Astro Implementation

```astro
---
// RevealSection.astro
---
<div class="reveal-container" data-reveal>
  <slot />
</div>

<style>
  .reveal-container > :global(*) {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 800ms ease-out, transform 800ms ease-out;
  }

  .reveal-container.visible > :global(*:nth-child(1)) { transition-delay: 400ms; }
  .reveal-container.visible > :global(*:nth-child(2)) { transition-delay: 600ms; }
  .reveal-container.visible > :global(*:nth-child(3)) { transition-delay: 800ms; }
  .reveal-container.visible > :global(*:nth-child(4)) { transition-delay: 1000ms; }

  .reveal-container.visible > :global(*) {
    opacity: 1;
    transform: translateY(0);
  }
</style>

<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
</script>
```

---

## 6. Link Underline Treatment

```css
/* Linear's refined underline styling */
.link-refined {
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2.5px;
  text-decoration-color: rgba(255, 255, 255, 0.35);
  transition: text-decoration-color 200ms;
}

.link-refined:hover {
  text-decoration-color: rgba(255, 255, 255, 0.70);
}
```

### Reis IA Adaptation (Gold Underline)

```css
.link-gold {
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 2.5px;
  text-decoration-color: rgba(201, 168, 76, 0.35);  /* Gold at low opacity */
  transition: text-decoration-color 200ms;
}

.link-gold:hover {
  text-decoration-color: rgba(201, 168, 76, 0.80);
}
```

---

## 7. Hover State Swap Pattern

```css
/* Linear's dual-element hover swap */
.hover-swap {
  position: relative;
}

.hover-swap .default-content {
  opacity: 1;
  transition: opacity 150ms;
}

.hover-swap .hover-content {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 150ms;
}

.hover-swap:hover .default-content {
  opacity: 0;
}

.hover-swap:hover .hover-content {
  opacity: 1;
}
```

---

## 8. Background Glow Effect

```css
/* Linear-style ambient glow behind content */
.ambient-glow {
  position: relative;
}

.ambient-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1100px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}

@media (max-width: 768px) {
  .ambient-glow::before {
    width: 800px;
    height: 400px;
  }
}
```

### Reis IA Adaptation (Gold Glow)

```css
.ambient-glow-gold::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1100px;
  height: 600px;
  background: radial-gradient(ellipse, rgba(201, 168, 76, 0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: -1;
}
```

---

## 9. Grid Background Pattern

```css
/* Subtle background grid (Linear-style) */
.grid-bg {
  position: relative;
}

.grid-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
  z-index: 0;
}

/* Fade edges */
.grid-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 30%, #08090a 80%);
  pointer-events: none;
  z-index: 1;
}
```

### Reis IA Adaptation

```css
/* Chess-inspired grid for strategy sections */
.chess-grid-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(201, 168, 76, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(201, 168, 76, 0.03) 1px, transparent 1px);
  background-size: 48px 48px;  /* Larger grid = chess board feel */
  pointer-events: none;
  z-index: 0;
}
```

---

## 10. Gradient Text Effect

```css
/* Linear's gradient text fill */
.gradient-text {
  background: linear-gradient(120deg, #db91cb 0%, #9a5eff 50%, #db91cb 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}
```

### Reis IA Adaptation (Gold Shimmer)

```css
/* Subtle gold shimmer on accent text -- use sparingly */
.gold-shimmer-text {
  background: linear-gradient(
    120deg,
    #C9A84C 0%,
    #E8D5A0 25%,
    #C9A84C 50%,
    #A08030 75%,
    #C9A84C 100%
  );
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gold-shimmer 6s linear infinite;  /* Slower = more premium */
}

@keyframes gold-shimmer {
  0% { background-position: 0% center; }
  100% { background-position: 300% center; }
}
```

---

## 11. Text Shadow Glow

```css
/* Linear's warm text glow effect */
.text-glow-warm {
  text-shadow: rgba(246, 193, 43, 0.7) 0 0 20px;
}

/* Softer version for body text */
.text-glow-soft {
  text-shadow: rgba(246, 193, 43, 0.3) 0 0 15px;
}
```

### Reis IA Adaptation

```css
/* Gold glow for featured headlines */
.text-glow-gold {
  text-shadow: rgba(201, 168, 76, 0.5) 0 0 30px;
}

/* Subtle ambient glow for emphasis words */
.text-glow-subtle {
  text-shadow: rgba(201, 168, 76, 0.2) 0 0 20px;
}
```

---

## 12. Sticky Scroll Mask

```css
/* Gradient masks for scrollable content edges */
.scroll-container {
  position: relative;
  overflow-y: auto;
}

.scroll-container::before,
.scroll-container::after {
  content: '';
  position: sticky;
  left: 0;
  right: 0;
  height: 128px;
  pointer-events: none;
  z-index: 10;
}

.scroll-container::before {
  top: 0;
  background: linear-gradient(to bottom, #08090a, transparent);
}

.scroll-container::after {
  bottom: 0;
  background: linear-gradient(to top, #08090a, transparent);
}

@media (max-width: 768px) {
  .scroll-container::before,
  .scroll-container::after {
    height: 64px;
  }
}
```

---

## 13. Decorative Edge Fade

```css
/* Linear's content section edge fading */
.section-fade {
  position: relative;
}

.section-fade::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
  height: 60%;
  background: radial-gradient(
    ellipse at bottom right,
    rgba(8, 9, 10, 0.9) 0%,
    transparent 70%
  );
  pointer-events: none;
}
```

---

## 14. Button Variants

```css
/* Linear-style button system */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  border: none;
  cursor: pointer;
  transition: background 150ms, opacity 150ms;
  -webkit-user-select: none;
  user-select: none;
}

.btn-primary {
  background: rgba(255, 255, 255, 1);
  color: #08090a;
}

.btn-primary:hover {
  background: rgba(255, 255, 255, 0.9);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.85);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
}

.btn-ghost {
  background: transparent;
  color: rgba(255, 255, 255, 0.70);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.90);
}

.btn-invert {
  background: #08090a;
  color: rgba(255, 255, 255, 0.90);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.btn-glass {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Reis IA Adaptation (Gold Primary)

```css
.btn-reis-primary {
  background: #C9A84C;
  color: #0A0A0A;
  padding: 10px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: opacity 150ms;
}

.btn-reis-primary:hover {
  opacity: 0.85;
}
```

---

## 15. Variable Font Loading

```html
<!-- Optimal Inter Variable loading (Linear's approach) -->
<link rel="preload"
      href="/fonts/InterVariable.woff2"
      as="font"
      type="font/woff2"
      crossorigin />

<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/InterVariable.woff2') format('woff2');
    font-weight: 100 900;  /* Variable font: all weights in one file */
    font-display: swap;
    font-style: normal;
  }

  body {
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
```

---

## 16. Root-Level Stacking Context

```css
/* Linear's isolation pattern -- prevents z-index conflicts */
html {
  isolation: isolate;
  background: inherit;
}
```

---

## 17. Responsive Section Spacer Component

```astro
---
// Spacer.astro -- Linear-style spacer component
interface Props {
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

const sizeMap = {
  xs: { desktop: '16px', mobile: '12px' },
  sm: { desktop: '32px', mobile: '20px' },
  md: { desktop: '48px', mobile: '32px' },
  lg: { desktop: '64px', mobile: '48px' },
  xl: { desktop: '80px', mobile: '56px' },
  '2xl': { desktop: '96px', mobile: '64px' },
  '3xl': { desktop: '128px', mobile: '80px' },
};

const { size } = Astro.props;
const { desktop, mobile } = sizeMap[size];
---
<div class="spacer" style={`--desktop: ${desktop}; --mobile: ${mobile};`}></div>

<style>
  .spacer {
    height: var(--mobile);
  }
  @media (min-width: 768px) {
    .spacer {
      height: var(--desktop);
    }
  }
</style>
```
