# Hero Background CSS Snippets — Adapted for Reis IA
## Last updated: 2026-03-25
## Adapted from: linear.app, vercel.com, stripe.com
## Target: Dark (#000000) background, Blue (#4A90FF) accent

All snippets below are self-contained, implementable CSS. Copy-paste ready for a dark-mode site using #000000 base and #4A90FF primary blue.

---

## 1. BLUR ORB GLOW (Vercel-style)

The most impactful technique. Large, blurred gradient shapes create ambient depth behind content.

```css
/* --- BLUR ORB BACKGROUND --- */
/* Container must be position:relative with overflow:hidden */

.hero {
  position: relative;
  overflow: hidden;
  background: #000000;
  min-height: 100vh;
}

/* Primary blue orb — top-right */
.hero::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #4A90FF 0%, transparent 70%);
  filter: blur(150px);
  opacity: 0.35;
  pointer-events: none;
  z-index: 0;
}

/* Secondary orb — bottom-left, deeper blue */
.hero::after {
  content: '';
  position: absolute;
  bottom: -15%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #2D7AFF 0%, transparent 70%);
  filter: blur(125px);
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}

/* Content must sit above orbs */
.hero-content {
  position: relative;
  z-index: 1;
}
```

### Variation: Hard-light blend (more vibrant, Vercel technique)
```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(150px);
  mix-blend-mode: hard-light;
  pointer-events: none;
}

.orb--primary {
  width: 600px;
  height: 600px;
  background: linear-gradient(#4A90FF 0%, #2D7AFF 100%);
  top: -200px;
  right: -100px;
  opacity: 0.4;
}

.orb--secondary {
  width: 400px;
  height: 400px;
  background: linear-gradient(#00B4FF 0%, #4A90FF 100%);
  bottom: -150px;
  left: -80px;
  opacity: 0.3;
}

.orb--accent {
  width: 300px;
  height: 300px;
  background: linear-gradient(#6AADFF 0%, #4A90FF 100%);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.15;
}
```

---

## 2. GRID MESH PATTERN (Vercel-style)

Subtle repeating grid lines that add architectural texture without distraction.

```css
/* --- GRID MESH OVERLAY --- */

.hero-grid {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  /* Grid lines via CSS mask on a solid background */
  background: rgba(74, 144, 255, 0.03);

  -webkit-mask-image:
    linear-gradient(to right, white 1px, transparent 1px),
    linear-gradient(to bottom, white 1px, transparent 1px);
  mask-image:
    linear-gradient(to right, white 1px, transparent 1px),
    linear-gradient(to bottom, white 1px, transparent 1px);

  -webkit-mask-size: 80px 80px;
  mask-size: 80px 80px;

  -webkit-mask-repeat: repeat;
  mask-repeat: repeat;
}

/* Fade the grid edges with a radial mask */
.hero-grid::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 50%,
    transparent 30%,
    #000000 80%
  );
  pointer-events: none;
}
```

### Variation: Dot grid (Vercel-style)
```css
.hero-dots {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(rgba(74, 144, 255, 0.15) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

---

## 3. ANIMATED GRID DOTS (Linear-style)

Staggered opacity animation across a grid of dots, creating a "breathing" effect.

```css
/* --- ANIMATED DOT GRID --- */

.dot-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0;
  pointer-events: none;
  z-index: 0;
}

.dot-grid__dot {
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: #4A90FF;
  place-self: center;
  opacity: 0.3;
  animation: dot-pulse 3.2s ease-in-out infinite;
}

/* Stagger each dot by varying animation-delay */
.dot-grid__dot:nth-child(1)  { animation-delay: 0s; }
.dot-grid__dot:nth-child(2)  { animation-delay: 0.15s; }
.dot-grid__dot:nth-child(3)  { animation-delay: 0.3s; }
.dot-grid__dot:nth-child(4)  { animation-delay: 0.45s; }
.dot-grid__dot:nth-child(5)  { animation-delay: 0.6s; }
.dot-grid__dot:nth-child(6)  { animation-delay: 0.75s; }
.dot-grid__dot:nth-child(7)  { animation-delay: 0.9s; }
.dot-grid__dot:nth-child(8)  { animation-delay: 1.05s; }
/* Continue pattern for all dots... or use CSS custom properties: */
/* .dot-grid__dot:nth-child(n) { animation-delay: calc(var(--i) * 0.15s); } */

@keyframes dot-pulse {
  0%, 100% { opacity: 0.15; }
  50%      { opacity: 0.6; }
}

/* Performance: only animate on capable hardware */
@media (prefers-reduced-motion: reduce) {
  .dot-grid__dot {
    animation: none;
    opacity: 0.2;
  }
}
```

### JS Performance Gate (Linear technique)
```js
// Only enable enhanced animations on capable hardware
if (navigator.hardwareConcurrency > 4) {
  document.documentElement.classList.add('enhanced');
}

// CSS: only animate when enhanced
// .enhanced .dot-grid__dot { animation: dot-pulse 3.2s ease-in-out infinite; }
```

---

## 4. RADIAL FADE OVERLAY (Vercel-style)

Smooth gradient that fades content edges into the background, creating a spotlight effect.

```css
/* --- RADIAL SPOTLIGHT FADE --- */

.hero-fade {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 120% 70% at 50% 40%,
    transparent 40%,
    #000000 80%
  );
}

/* Variation: Bottom fade for content transition */
.section-fade-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: linear-gradient(to bottom, transparent 0%, #000000 100%);
  pointer-events: none;
  z-index: 2;
}

/* Variation: Top vignette */
.hero-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at 50% 30%,
    transparent 20%,
    rgba(0, 0, 0, 0.4) 70%,
    rgba(0, 0, 0, 0.8) 100%
  );
}
```

---

## 5. ANIMATED GRADIENT BORDER (Vercel-style conic gradient)

Rotating gradient border for cards or hero CTAs.

```css
/* --- ROTATING GRADIENT BORDER --- */

.glow-card {
  position: relative;
  padding: 1px; /* border width */
  border-radius: 12px;
  overflow: hidden;
}

/* The rotating gradient "border" */
.glow-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 12px;
  background: conic-gradient(
    from 180deg,
    #4A90FF00 0deg,
    #4A90FF 90deg,
    #2D7AFF 180deg,
    #4A90FF 270deg,
    #4A90FF00 360deg
  );
  animation: border-spin 4s linear infinite;
  z-index: -1;
}

/* Inner content background */
.glow-card__inner {
  background: #0a0a0a;
  border-radius: 11px;
  padding: 24px;
}

@keyframes border-spin {
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Subtle static version (no animation) */
.glow-card-static::before {
  background: conic-gradient(
    from 180deg,
    transparent 0deg,
    #4A90FF40 90deg,
    #4A90FF80 180deg,
    #4A90FF40 270deg,
    transparent 360deg
  );
  animation: none;
}
```

---

## 6. NOISE TEXTURE OVERLAY

Adds film-grain texture for depth and premium feel. Not directly extracted but a common pattern across all three sites (typically loaded as a tiny repeating PNG or SVG).

```css
/* --- NOISE TEXTURE --- */

.hero-noise {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* Alternative: pure CSS noise via tiny repeating gradient */
.hero-noise-css {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.015;
  background-image:
    repeating-radial-gradient(circle at 17% 32%, white, transparent 0.02%),
    repeating-radial-gradient(circle at 62% 78%, white, transparent 0.02%);
  background-size: 200px 200px;
}
```

---

## 7. DARK OVERLAY GRADIENT (Vercel-style)

Content-over-image darkening technique.

```css
/* --- DARK CONTENT OVERLAY --- */
.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.52) 0%,
    rgba(0, 0, 0, 0.2) 42%,
    rgba(0, 0, 0, 0.62) 100%
  );
}
```

---

## 8. GLOW BOX SHADOW (Stripe-style depth)

```css
/* --- CARD GLOW SHADOWS --- */
.card-glow {
  box-shadow:
    0 0 60px rgba(74, 144, 255, 0.08),
    0 0 0 1px rgba(74, 144, 255, 0.06);
  transition: box-shadow 0.3s ease;
}

.card-glow:hover {
  box-shadow:
    0 0 80px rgba(74, 144, 255, 0.12),
    0 8px 32px rgba(74, 144, 255, 0.08),
    0 0 0 1px rgba(74, 144, 255, 0.1);
}

/* Stripe-style layered depth */
.card-depth {
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 8px 16px rgba(0, 0, 0, 0.15),
    0 20px 60px rgba(0, 0, 0, 0.25);
}
```

---

## 9. COMBINED HERO COMPOSITION

Full hero background combining multiple techniques into one implementable pattern.

```html
<section class="hero">
  <!-- Background layers (back to front) -->
  <div class="hero__orb hero__orb--primary"></div>
  <div class="hero__orb hero__orb--secondary"></div>
  <div class="hero__grid"></div>
  <div class="hero__noise"></div>
  <div class="hero__fade"></div>

  <!-- Content -->
  <div class="hero__content">
    <h1>Your headline here</h1>
    <p>Supporting text</p>
  </div>
</section>
```

```css
/* === FULL HERO COMPOSITION === */

.hero {
  position: relative;
  overflow: hidden;
  background: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- Layer 1: Blur Orbs --- */
.hero__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.hero__orb--primary {
  width: 700px;
  height: 700px;
  background: radial-gradient(circle, #4A90FF 0%, transparent 70%);
  filter: blur(150px);
  top: -25%;
  right: -15%;
  opacity: 0.3;
  animation: orb-drift 20s ease-in-out infinite alternate;
}

.hero__orb--secondary {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #2D7AFF 0%, transparent 70%);
  filter: blur(120px);
  bottom: -20%;
  left: -10%;
  opacity: 0.2;
  animation: orb-drift 25s ease-in-out infinite alternate-reverse;
}

@keyframes orb-drift {
  0%   { transform: translate(0, 0); }
  100% { transform: translate(30px, -20px); }
}

/* --- Layer 2: Grid Pattern --- */
.hero__grid {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(74, 144, 255, 0.02);
  -webkit-mask-image:
    linear-gradient(to right, white 1px, transparent 1px),
    linear-gradient(to bottom, white 1px, transparent 1px);
  mask-image:
    linear-gradient(to right, white 1px, transparent 1px),
    linear-gradient(to bottom, white 1px, transparent 1px);
  -webkit-mask-size: 80px 80px;
  mask-size: 80px 80px;
}

/* --- Layer 3: Noise Texture --- */
.hero__noise {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
}

/* --- Layer 4: Radial Fade --- */
.hero__fade {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
  background: radial-gradient(
    ellipse 100% 80% at 50% 40%,
    transparent 30%,
    rgba(0, 0, 0, 0.5) 70%,
    #000000 100%
  );
}

/* --- Content Layer --- */
.hero__content {
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  padding: 0 24px;
}

/* === RESPONSIVE === */
@media (max-width: 768px) {
  .hero__orb--primary {
    width: 400px;
    height: 400px;
    filter: blur(100px);
  }
  .hero__orb--secondary {
    width: 300px;
    height: 300px;
    filter: blur(80px);
  }
  .hero__grid {
    -webkit-mask-size: 60px 60px;
    mask-size: 60px 60px;
  }
}

/* === PERFORMANCE === */
@media (prefers-reduced-motion: reduce) {
  .hero__orb--primary,
  .hero__orb--secondary {
    animation: none;
  }
}
```

---

## 10. EASING CURVES REFERENCE

```css
:root {
  /* Snappy UI interaction (Vercel) */
  --ease-snappy: cubic-bezier(0.3, 0.57, 0.07, 0.95);

  /* Smooth overlay entrance (Vercel) */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);

  /* Bouncy micro-interaction (Vercel) */
  --ease-bouncy: cubic-bezier(0.175, 0.885, 0.32, 1.1);

  /* Menu/dropdown (Stripe) */
  --ease-menu: cubic-bezier(0.45, 0.05, 0.55, 0.95);

  /* Standard entrance (all sites) */
  --ease-entrance: cubic-bezier(0.25, 0.57, 0.45, 0.94);
}
```

---

## 11. GRADIENT TEXT (Vercel-style, adapted to blue palette)

```css
.gradient-text {
  background: linear-gradient(0deg, #4A90FF, #00B4FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Accent variant — subtle silver-to-blue */
.gradient-text--subtle {
  background: linear-gradient(180deg, #ffffff 0%, #4A90FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
