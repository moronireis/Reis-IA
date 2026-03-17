# Agencia Lendaria -- Reusable CSS/Code Snippets

Last updated: 2026-03-16

Extracted code patterns from agencialendaria.ai, adapted for Reis IA's Tailwind/Astro stack. Each snippet includes the original pattern and the Reis IA adaptation.

---

## 1. Ambient Light Pool Backgrounds

The signature visual technique -- radial gradients positioned at section corners to create directional ambient lighting on dark backgrounds.

### Original (Agencia Lendaria)

```css
/* Bottom-left light pool */
.section-light-bl {
  background: radial-gradient(35% 50% at 0% 100%, rgba(128,128,128,.15) 0%, rgb(8,8,8) 100%);
}

/* Bottom-right light pool */
.section-light-br {
  background: radial-gradient(35% 20% at 100% 100%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%);
}

/* Top-right light pool */
.section-light-tr {
  background: radial-gradient(35% 20% at 100% 0%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%);
}

/* Top-left light pool */
.section-light-tl {
  background: radial-gradient(50% 25% at 0% 0%, rgba(255,255,255,.1) 0%, rgb(8,8,8) 100%);
}

/* Center ambient glow */
.section-light-center {
  background: radial-gradient(50% 35% at 50% 50%, rgba(255,255,255,0.06), transparent);
}
```

### Reis IA Adaptation (Tailwind Custom Classes)

```css
/* Add to globals.css or Tailwind plugin */

/* White-tinted light pools (neutral) */
.bg-pool-bl {
  background: radial-gradient(35% 50% at 0% 100%, rgba(255,255,255,0.06) 0%, #000000 100%);
}
.bg-pool-br {
  background: radial-gradient(35% 50% at 100% 100%, rgba(255,255,255,0.06) 0%, #000000 100%);
}
.bg-pool-tr {
  background: radial-gradient(35% 50% at 100% 0%, rgba(255,255,255,0.06) 0%, #000000 100%);
}
.bg-pool-tl {
  background: radial-gradient(35% 50% at 0% 0%, rgba(255,255,255,0.06) 0%, #000000 100%);
}

/* Gold-tinted light pools (brand) */
.bg-pool-gold-bl {
  background: radial-gradient(40% 50% at 0% 100%, rgba(201,168,76,0.04) 0%, #000000 100%);
}
.bg-pool-gold-br {
  background: radial-gradient(40% 50% at 100% 100%, rgba(201,168,76,0.04) 0%, #000000 100%);
}
.bg-pool-gold-center {
  background: radial-gradient(50% 40% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 100%);
}
```

### Usage Pattern (Astro Component)

```astro
---
interface Props {
  lightPosition?: 'bl' | 'br' | 'tr' | 'tl' | 'center';
  tint?: 'neutral' | 'gold';
}
const { lightPosition = 'bl', tint = 'neutral' } = Astro.props;
const poolClass = tint === 'gold' ? `bg-pool-gold-${lightPosition}` : `bg-pool-${lightPosition}`;
---
<section class={`py-24 md:py-32 ${poolClass}`}>
  <div class="max-w-[1200px] mx-auto px-6 md:px-8">
    <slot />
  </div>
</section>
```

---

## 2. Multi-Tier Dark Background System

### Original (Agencia Lendaria)

```css
--bg-0: #080808;  /* Page background */
--bg-1: #0d0d0d;  /* First elevation */
--bg-2: #0f0f0f;  /* Second elevation */
--bg-3: #131313;  /* Third elevation */
--bg-4: #141414;  /* Cards */
--bg-5: #171717;  /* Interactive surfaces */
--bg-6: #1d1d1d;  /* Hover states */
--bg-7: #232323;  /* Active states */
```

### Reis IA Adaptation (Tailwind Config)

```js
// tailwind.config.mjs -- extend theme.colors
colors: {
  surface: {
    0: '#000000',    // Page background (Reis IA uses pure black)
    1: '#0A0A0A',    // Section alternate
    2: '#0D0D0D',    // Subtle elevation (NEW -- borrowed from Lendaria)
    3: '#111111',    // Card backgrounds (NEW)
    4: '#141414',    // Elevated cards
    5: '#1A1A1A',    // Interactive surfaces
    6: '#222222',    // Hover states
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.05)',
    default: 'rgba(255, 255, 255, 0.08)',
    emphasis: 'rgba(255, 255, 255, 0.10)',
  }
}
```

---

## 3. Warm-Tinted Dark Gradient (Button/Card Background)

### Original

```css
.warm-gradient-bg {
  background: linear-gradient(99deg, #36332f4d, #12110d99);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(8, 26, 43, 0.45);
}
```

### Reis IA Adaptation

```css
/* Ghost button with warm gold undertone */
.btn-ghost-warm {
  background: linear-gradient(99deg, rgba(201,168,76,0.06), rgba(0,0,0,0.4));
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 8px 20px 10px 16px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: border-color 0.3s ease, background 0.3s ease;
  cursor: pointer;
}

.btn-ghost-warm:hover {
  border-color: rgba(201,168,76,0.2);
  background: linear-gradient(99deg, rgba(201,168,76,0.10), rgba(0,0,0,0.5));
}

/* Card with warm undertone */
.card-warm {
  background: linear-gradient(180deg, rgba(201,168,76,0.03) 0%, rgba(0,0,0,0) 40%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
```

---

## 4. Section Transition Gradient Mask

### Original

```css
/* Fade between sections */
.section-transition {
  position: relative;
}

.section-transition::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(180deg, transparent 0%, rgb(0,0,0) 100%);
  pointer-events: none;
  z-index: 2;
}

/* Bidirectional fade */
.section-fade {
  -webkit-mask-image: linear-gradient(
    0deg,
    rgba(0,0,0,0) 4%,
    rgba(0,0,0,0.73) 24%,
    rgba(0,0,0,0.7) 72%,
    rgba(0,0,0,0.016) 100%
  );
  mask-image: linear-gradient(
    0deg,
    rgba(0,0,0,0) 4%,
    rgba(0,0,0,0.73) 24%,
    rgba(0,0,0,0.7) 72%,
    rgba(0,0,0,0.016) 100%
  );
}
```

### Reis IA Adaptation

```css
/* Softer section transition for Reis IA */
.section-fade-bottom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, transparent, var(--next-section-bg, #000000));
  pointer-events: none;
  z-index: 1;
}

/* Use with Tailwind: add to parent section with relative positioning */
/* The --next-section-bg custom property should match the following section's background */
```

---

## 5. Glassmorphism Navigation

### Original

```css
.nav-glass {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 20px 40px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(8, 8, 8, 0.7);
}
```

### Reis IA Adaptation

```css
/* Navigation with glass effect */
.nav-reis {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 16px 24px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: rgba(0, 0, 0, 0.75);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.3s ease, padding 0.3s ease;
}

/* Compact state after scroll */
.nav-reis.scrolled {
  padding: 12px 24px;
  background: rgba(0, 0, 0, 0.85);
}
```

### Tailwind Equivalent

```html
<nav class="fixed inset-x-0 top-0 z-50 px-6 py-4 backdrop-blur-md bg-black/75 border-b border-white/5 transition-all duration-300">
  <!-- nav content -->
</nav>
```

---

## 6. Card Component

### Original

```css
.card-lendaria {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 45px;
  gap: 50px;
  display: flex;
  flex-direction: column;
}
```

### Reis IA Adaptation

```css
.card-reis {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transition: border-color 0.4s ease, transform 0.5s cubic-bezier(0.7, 0, 0, 1);
}

.card-reis:hover {
  border-color: rgba(255, 255, 255, 0.08);
  transform: scale(1.015);
}
```

### Tailwind Equivalent

```html
<div class="bg-[#141414] border border-white/5 rounded-xl p-10 flex flex-col gap-6 transition-all duration-500 ease-[cubic-bezier(0.7,0,0,1)] hover:border-white/[0.08] hover:scale-[1.015]">
  <!-- card content -->
</div>
```

---

## 7. White Overlay Border System

### Pattern

```css
/* Border hierarchy -- use thinner opacity for less important boundaries */
.border-ghost    { border: 1px solid rgba(255, 255, 255, 0.04); }
.border-subtle   { border: 1px solid rgba(255, 255, 255, 0.05); }
.border-default  { border: 1px solid rgba(255, 255, 255, 0.08); }
.border-emphasis { border: 1px solid rgba(255, 255, 255, 0.10); }
.border-strong   { border: 1px solid rgba(255, 255, 255, 0.15); }

/* Tailwind mapping */
/* border-white/[0.04] | border-white/5 | border-white/[0.08] | border-white/10 | border-white/[0.15] */
```

---

## 8. Background Blur Glow Effect

### Original

```css
/* Ambient glow behind hero elements */
.glow-element {
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  filter: blur(30px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 0;
}

/* Centered gold glow */
.glow-gold {
  background: radial-gradient(50% 50% at 50% 50%, rgba(195,182,141,0.3), transparent);
}
```

### Reis IA Adaptation

```css
/* Subtle gold glow behind hero or CTA sections */
.glow-reis {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

/* Position behind hero headline */
.glow-hero {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
}
```

### Tailwind/Astro

```html
<div class="absolute inset-0 overflow-hidden pointer-events-none">
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)] blur-[40px]"></div>
</div>
```

---

## 9. Text Fill Gradient (Warm Glow Text)

### Original

```css
.text-warm-glow {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(255,255,255,.5) 0%,
    rgb(252,150,76) 50%,
    rgba(13,13,13,0) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Reis IA Adaptation (Gold Shimmer)

```css
/* Single accent word with gold shimmer */
.text-gold-shimmer {
  background: linear-gradient(
    135deg,
    #C9A84C,
    #ffffff 40%,
    #C9A84C 60%,
    #ffffff
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: goldShimmer 8s linear infinite;
}

@keyframes goldShimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
```

---

## 10. Scroll Margin and Sticky Positioning

### Pattern

```css
/* Smooth anchor scrolling with nav offset */
[id] {
  scroll-margin-top: 80px; /* Height of fixed nav + buffer */
}

/* Sticky sidebar/element */
.sticky-element {
  position: sticky;
  top: 120px; /* Fixed nav height + desired gap */
}
```

### Tailwind

```html
<section id="section-name" class="scroll-mt-20">
  <!-- Content -->
</section>

<aside class="sticky top-[120px]">
  <!-- Sticky sidebar -->
</aside>
```

---

## 11. Responsive Visibility

### Pattern (matching Agencia Lendaria breakpoints, adapted to Reis IA's breakpoints)

```css
/* Reis IA breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop) */

/* Hide on mobile only */
@media (max-width: 767px) {
  .hide-mobile { display: none; }
}

/* Hide on tablet only */
@media (min-width: 768px) and (max-width: 1279px) {
  .hide-tablet { display: none; }
}

/* Hide on desktop only */
@media (min-width: 1280px) {
  .hide-desktop { display: none; }
}
```

### Tailwind

```html
<div class="hidden md:block">Desktop/tablet only</div>
<div class="md:hidden">Mobile only</div>
<div class="hidden lg:block">Desktop only</div>
```

---

## 12. Color-Burn Inner Glow

### Original

```css
.inner-glow {
  mix-blend-mode: color-burn;
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 60%);
  pointer-events: none;
}
```

### Reis IA Adaptation

```css
/* Subtle inner glow for featured cards or hero elements */
.inner-glow-gold {
  position: relative;
}

.inner-glow-gold::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at 30% 30%, rgba(201,168,76,0.06), transparent 60%);
  mix-blend-mode: screen; /* screen works better on dark backgrounds than color-burn */
  pointer-events: none;
}
```

---

## Usage Notes for Dev Agent

1. **Light pool backgrounds** should alternate position across consecutive sections (bl -> tr -> br -> tl) to create visual rhythm
2. **Warm-tinted gradients** should only appear on interactive elements (buttons, cards) -- never on static backgrounds
3. **Glassmorphism** is reserved for navigation and floating overlays -- do not apply to cards or content sections
4. **The gold shimmer text effect** is limited to ONE instance per page (per existing design pattern rule)
5. **Border opacity** should increase on hover (0.05 -> 0.08 or 0.08 -> 0.12) -- never decrease
6. **Blur values**: navigation blur at 16px, background glows at 30-40px. Do not use blur on content elements
7. **All position:absolute glow elements** must have `pointer-events: none` and `overflow: hidden` on parent
