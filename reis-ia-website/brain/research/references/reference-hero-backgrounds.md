# Hero Background Techniques — Premium Dark-Mode Websites
## Last updated: 2026-03-25
## Sources: linear.app, vercel.com, stripe.com
## Focus: Hero section background effects only
## Pages analyzed: 8 (homepages + subpages across 3 sites)

---

## 1. LINEAR.APP — Techniques Extracted

### Background Architecture
Linear uses a **dark-first design** with `data-theme="dark"` and `color-scheme: dark`. The hero backgrounds are built with:

#### Animated Grid Dot Pattern
Linear's signature is an animated dot grid that pulses with staggered opacity. The grid uses a 5x5 matrix of dots with individual keyframe animations:

```css
/* Grid dot animation pattern — 3200ms cycle with staggered opacity */
@keyframes grid-dot-agent {
  0%   { opacity: 1; }
  6.25%  { opacity: 1; }
  12.5%  { opacity: 0.3; }
  25%    { opacity: 0.3; }
  31.25% { opacity: 1; }
  100%   { opacity: 1; }
}

/* Vertical movement variant — 2800ms cycle */
@keyframes grid-dot-upDown {
  0%   { opacity: 0.3; }
  10%  { opacity: 1; }
  30%  { opacity: 1; }
  40%  { opacity: 0.3; }
  100% { opacity: 0.3; }
}
```

Each dot in the grid has its own animation with offset keyframe percentages, creating a "wave" or "pulse" effect across the grid.

#### Performance Detection
Linear checks `navigator.hardwareConcurrency` and only enables enhanced animations on devices with >4 CPU cores:
```js
if (navigator.hardwareConcurrency > 4) {
  document.documentElement.classList.add('enhanced');
}
```

#### Color System (Dark Theme)
- `--color-text-primary`: White text on dark
- `--color-text-secondary`: Muted text
- `--color-text-tertiary`: Subtle text
- `--color-text-quaternary`: Near-invisible accents
- `--color-bg-primary`: Deep black background
- Body uses `isolation: isolate` for stacking context

#### Typography
- Text-wrap: `pretty` for readability, `balance` for headings
- Responsive scale with breakpoints at 1280px, 1024px, 768px, 640px

---

## 2. VERCEL.COM — Techniques Extracted

### Hero Section Structure
```css
.heroSection {
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 140px;
  padding-bottom: 160px;
  display: flex;
}

.title {
  font-size: 70px;
  font-weight: 700;
  letter-spacing: -0.04em;
  max-width: 700px;
}
```

### Gradient System

#### Multi-stop Blur Orbs (Primary Technique)
Vercel creates depth with large blurred gradient shapes positioned behind content:

```css
/* Blue-to-purple blur orb */
background: linear-gradient(#58a5ff 0%, #a67af4 100%);
filter: blur(150px);

/* Red-to-pink blur orb */
background: linear-gradient(#ff3358 0%, #ff4fd8 100%);
filter: blur(125px);

/* Mix blending for orb interaction */
mix-blend-mode: hard-light;
```

#### Conic Gradient Shimmer (Border Effect)
```css
/* Rotating conic gradient for animated borders */
background: conic-gradient(
  from 180deg,
  #ffcade 0deg,
  #e9d3ff 88.12deg,
  #c8ddff 176.25deg,
  #e9d3ff 264.38deg,
  #ffcade 360deg
);

/* Spin animation for the conic gradient */
@keyframes spin {
  0%   { transform: translate(-50%, -50%) rotate(360deg); }
  to   { transform: translate(-50%, -50%) rotate(0); }
}
```

#### Radial Gradient Fade Overlay
```css
/* Hero fade-to-background overlay */
background: radial-gradient(
  120% 70% at 50% 104%,
  transparent 50%,
  #fffffff2 88%,
  var(--ds-background-200) 95%
);
```

#### Dark Overlay Gradient
```css
background: linear-gradient(#00000085 0%, #0003 42%, #0000009e 100%);
```

#### Grid Mask Pattern
```css
/* Repeating grid/mesh pattern via mask */
-webkit-mask-image:
  linear-gradient(to right, var(--geist-foreground) 2px, transparent 1px),
  linear-gradient(to bottom, var(--geist-foreground) 2px, transparent 1px);
-webkit-mask-size: 100px 100px;
-webkit-mask-repeat: repeat;
```

### Branded Text Gradients
```css
/* Development */
background: linear-gradient(0deg, #007cf0, #00dfd8);
-webkit-background-clip: text;
color: transparent;

/* Preview */
background: linear-gradient(0deg, #7928ca, #ff0080);

/* Ship */
background: linear-gradient(0deg, #ff4d4d, #f9cb28);

/* Multi-stop diagonal */
background: linear-gradient(219.66deg, #ff1e56 1.81%, #d270d2 59.19%, #59a5ff 115.38%);
```

### Dot Pattern Background
```css
background: radial-gradient(var(--accents-2) 1px, transparent 1px);
background-size: /* grid spacing */;
```

### Animation System
```css
/* Soft entrance */
@keyframes soft-fade-in {
  from { opacity: 0.3; }
  to   { opacity: 1; }
}
/* Duration: 0.3s */

/* Slide-up entrance */
@keyframes show {
  from { transform: translateY(-40px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

/* Infinite vertical scroll */
@keyframes go-up {
  0%  { transform: translateY(0); }
  to  { transform: translateY(100%); }
}
/* Duration: 30s linear infinite */

/* Pulse movement */
@keyframes pulse-frames {
  0%   { transform: translateY(0%); }
  50%  { transform: translateY(200%); }
  to   { transform: translateY(200%); }
}
/* Duration: 8s ease-out infinite */

/* Fade in */
@keyframes fadeIn {
  0%  { opacity: 0; }
  to  { opacity: 1; }
}
/* Duration: 0.8s ease-in forwards */
```

### Easing Curves
```css
/* Snappy interaction */
cubic-bezier(0.3, 0.57, 0.07, 0.95)   /* 0.15s */

/* Smooth overlay */
cubic-bezier(0.4, 0, 0.2, 1)           /* 0.35s */

/* Bouncy entrance */
cubic-bezier(0.175, 0.885, 0.32, 1.1)  /* 0.3s */
```

### Shadow System
```css
/* Layered depth shadows */
box-shadow: 0px 2px 2px #0000000a;                                          /* small */
box-shadow: 0px 2px 2px #0000000a, 0px 8px 8px -8px #0000000a;             /* medium */
box-shadow: 0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a;            /* large */
box-shadow: 0px 2px 2px #0000000a, 0px 8px 16px -4px #0000000a,
            0px 16px 24px -8px #0000000a;                                    /* xlarge */

/* Complex 3D book shadow */
box-shadow: 0 1.8px 3.6px #0000000d,
            0 10.8px 21.6px #00000014,
            inset 0 -0.9px #0000001a,
            inset 0 1.8px 1.8px #ffffff1a,
            inset 3.6px 0 3.6px #0000001a;
```

### Opacity Scale (Dark Mode)
```css
--opacity: 0.15;  /* light mode subtle */
--opacity: 0.35;  /* dark mode subtle */
opacity: 0.08;    /* ultra-subtle text bg */
opacity: 0.25;    /* muted overlay */
```

### Mask Compositing (Advanced Border Technique)
```css
-webkit-mask-composite: xor;
-webkit-mask-clip: content-box, border-box;
```

---

## 3. STRIPE.COM — Techniques Extracted

### Gradient Overlay System
Stripe uses translucent gradient overlays and backdrop blur for depth:

```css
/* Header overlay with blur */
background: linear-gradient(transparent, rgba(236, 239, 241, 0.8));
-webkit-backdrop-filter: blur(5px);
backdrop-filter: blur(5px);

/* Mobile menu backdrop */
-webkit-backdrop-filter: blur(3.5px);
backdrop-filter: blur(3.5px);
```

### Dashed Line Pattern (Signature)
```css
background: linear-gradient(
  90deg,
  var(--guideDashedColor),
  var(--guideDashedColor) 50%,
  transparent 0,
  transparent
);
background-size: 8px 1px;
```

### Animated Gradient Lines
```css
/* RefreshedGradientLine — animated color flow */
background: linear-gradient(
  90deg,
  var(--gradient-color),
  var(--gradient-color) 20%,
  var(--stop-color) 40%,
  var(--suite-color) 60%,
  var(--suite-color)
), #e5edf5;
/* Animated via background-position transitions */
```

### Shadow System
```css
--cardShadowXSmall: 0 0 60px rgba(50, 50, 93, 0.18);
--cardShadowSmall:  0 2px 4px rgba(50, 50, 93, 0.1);
--cardShadowMedium: 0 8px 16px rgba(50, 50, 93, 0.15);
--cardShadowLarge:  0 20px 60px rgba(50, 50, 93, 0.25);
--cardShadowXLarge: 0 30px 80px rgba(50, 50, 93, 0.3);
```

### Animation Curves
```css
/* Menu easing */
cubic-bezier(0.45, 0.05, 0.55, 0.95)   /* 250ms-500ms */
```

### Design Tokens
- Border radius: 4px, 8px, 12.5px
- Font weights: 300, 400, 600, 700
- Breakpoints: 375px, 599px, 600px, 899px, 900px, 1112px

---

## Reis IA Cross-Reference

### Compatible Techniques (Recommended for Adoption)
1. **Blur Orbs (Vercel)** — Large blurred gradient shapes. Adapt with #4A90FF as primary orb color on #000000 background. HIGH PRIORITY.
2. **Grid Mask Pattern (Vercel)** — Repeating grid lines via CSS mask. Aligns with Reis IA minimal geometric aesthetic. HIGH PRIORITY.
3. **Animated Grid Dots (Linear)** — Staggered opacity grid. Could work with hourglass/Z7 grid layouts. MEDIUM PRIORITY.
4. **Conic Gradient Border (Vercel)** — Animated rotating border glow. Adapt to blue palette. MEDIUM PRIORITY.
5. **Radial Fade Overlay (Vercel)** — Smooth content-to-background transition. MEDIUM PRIORITY.
6. **Performance Detection (Linear)** — Only show enhanced effects on capable hardware. HIGH PRIORITY for responsible animation.

### Incompatible / Requires Adaptation
1. **Stripe's light-mode gradients** — Need full dark-mode inversion
2. **Vercel's multi-color orbs** (pink/purple) — Must restrict to blue palette (#4A90FF, #2D7AFF, #00B4FF)
3. **Vercel's branded text gradients** (pink/orange) — Use only blue-to-cyan range

### Prohibited Elements (Per Brand Rules)
- No gold/amber/terracotta gradients (Vercel's Ship gradient #ff4d4d/#f9cb28 is OFF LIMITS)
- No warm-toned conic gradients (Vercel's pink conic is OFF LIMITS as-is)
