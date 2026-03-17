# Stripe Design System -- Reusable Code Snippets

Last updated: 2026-03-16

Extracted CSS/code patterns from stripe.com, adapted as reference snippets for building the Reis IA design system. These are starting points for adaptation, not copy-paste solutions.

---

## 1. Easing Curves Library

```css
:root {
  /* Stripe's easing curves */
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-sine: cubic-bezier(0.61, 1, 0.88, 1);
  --ease-standard: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  --ease-material: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bouncy: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-card: cubic-bezier(0.7, 0, 0, 1);
  --ease-entrance: cubic-bezier(0.65, 0, 0.35, 1);
}
```

### Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionTimingFunction: {
        'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)',
        'standard': 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        'material': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bouncy': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'card': 'cubic-bezier(0.7, 0, 0, 1)',
        'entrance': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
}
```

---

## 2. Shadow System

```css
:root {
  /* Stripe-style layered shadows (adapted for dark mode with warm tint) */
  --shadow-xs: 0 1px 1.5px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  --shadow-sm: 0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 30px 45px -30px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 20px 60px rgba(0, 0, 0, 0.35);
  --shadow-lg: 0 30px 60px -10px rgba(0, 0, 0, 0.45);
  --shadow-xl: 0 50px 100px -20px rgba(0, 0, 0, 0.5);

  /* Gold-tinted shadows for accent elements */
  --shadow-accent: 0 20px 60px rgba(180, 140, 50, 0.15);

  /* Focus ring */
  --shadow-focus: 0 0 0 2px rgba(180, 140, 50, 0.4);
}
```

### Tailwind Config Extension

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'card-xs': '0 1px 1.5px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
        'card-sm': '0 18px 36px -18px rgba(0,0,0,0.3), 0 30px 45px -30px rgba(0,0,0,0.4)',
        'card-md': '0 20px 60px rgba(0,0,0,0.35)',
        'card-lg': '0 30px 60px -10px rgba(0,0,0,0.45)',
        'card-xl': '0 50px 100px -20px rgba(0,0,0,0.5)',
        'accent': '0 20px 60px rgba(180,140,50,0.15)',
        'focus': '0 0 0 2px rgba(180,140,50,0.4)',
      },
    },
  },
}
```

---

## 3. Pill Button (Stripe-Style, Adapted for Reis IA)

```css
.btn-primary {
  /* Stripe's asymmetric padding for optical centering */
  padding: 4px 20px 7px;
  border-radius: 16.5px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 1.6;
  transition: opacity 150ms cubic-bezier(0.215, 0.61, 0.355, 1);

  /* Reis IA colors */
  background-color: var(--accent-gold);
  color: #000000;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  padding: 4px 20px 7px;
  border-radius: 16.5px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  line-height: 1.6;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transition: border-color 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.5);
}
```

### Tailwind Implementation

```html
<!-- Primary CTA -->
<button class="px-5 pt-1 pb-[7px] rounded-[16.5px] text-[15px] font-semibold
               tracking-[0.2px] leading-relaxed bg-amber-500 text-black
               transition-opacity duration-150 ease-out-cubic hover:opacity-85">
  Book Your Assessment
</button>

<!-- Secondary / Ghost -->
<button class="px-5 pt-1 pb-[7px] rounded-[16.5px] text-[15px] font-semibold
               tracking-[0.2px] leading-relaxed bg-transparent text-white
               border border-white/20 transition-colors duration-150
               ease-out-cubic hover:border-white/50">
  See How It Works
</button>
```

---

## 4. Card Hover Effect (Scale + Shadow Depth)

```css
.card {
  background: #141414;
  border-radius: 8px;
  border: 1px solid #262626;
  transition: transform 500ms cubic-bezier(0.7, 0, 0, 1),
              box-shadow 500ms cubic-bezier(0.7, 0, 0, 1);
  box-shadow: 0 18px 36px -18px rgba(0, 0, 0, 0.3),
              0 30px 45px -30px rgba(0, 0, 0, 0.4);
}

.card:hover {
  transform: scale(1.018);
  box-shadow: 0 100px 60px -40px rgba(0, 0, 0, 0.2),
              0 60px 100px 0 rgba(0, 0, 0, 0.3);
}
```

### Tailwind Implementation

```html
<div class="bg-[#141414] rounded-lg border border-[#262626]
            transition-all duration-500 ease-card
            shadow-card-sm hover:scale-[1.018] hover:shadow-card-xl">
  <!-- Card content -->
</div>
```

---

## 5. Section Spacing System

```css
/* Fluid section padding that scales between mobile and desktop */
.section {
  padding-top: clamp(72px, calc(72px + (128 - 72) * ((100vw - 375px) / (1112 - 375))), 128px);
  padding-bottom: clamp(72px, calc(72px + (128 - 72) * ((100vw - 375px) / (1112 - 375))), 128px);
  padding-left: var(--column-padding);
  padding-right: var(--column-padding);
}

:root {
  --column-padding: 24px;
}

@media (min-width: 900px) {
  :root {
    --column-padding: 32px;
  }
}

@media (min-width: 1112px) {
  :root {
    --column-padding: 48px;
  }
}

.section__inner {
  max-width: 1080px;
  margin: 0 auto;
}
```

### Tailwind Approach

```html
<section class="py-[72px] md:py-24 lg:py-32 px-6 md:px-8 lg:px-12">
  <div class="max-w-[1080px] mx-auto">
    <!-- Section content -->
  </div>
</section>
```

---

## 6. Entrance Animation (Scroll-Triggered)

```css
/* Base state: hidden */
.animate-entrance {
  opacity: 0;
  transform: translateY(24px);
}

/* Revealed state */
.animate-entrance.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.85s cubic-bezier(0.65, 0, 0.35, 1),
              transform 0.85s cubic-bezier(0.65, 0, 0.35, 1);
}

/* Stagger children */
.animate-entrance.is-visible:nth-child(1) { transition-delay: 0ms; }
.animate-entrance.is-visible:nth-child(2) { transition-delay: 100ms; }
.animate-entrance.is-visible:nth-child(3) { transition-delay: 200ms; }
.animate-entrance.is-visible:nth-child(4) { transition-delay: 300ms; }
```

### JavaScript (Intersection Observer)

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

document.querySelectorAll('.animate-entrance').forEach((el) => {
  observer.observe(el);
});
```

### Astro/React Component

```tsx
// useScrollReveal.ts
import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
```

---

## 7. Glassmorphism Card

```css
.glass-card {
  background: hsla(0, 0%, 100%, 0.05);    /* Dark mode: very low white opacity */
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
}

/* Lighter variant */
.glass-card--light {
  background: hsla(0, 0%, 100%, 0.08);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
```

### Tailwind

```html
<div class="bg-white/5 backdrop-blur-[7px] border border-white/[0.08] rounded-lg">
  <!-- Glass content -->
</div>
```

---

## 8. Typography Scale

```css
:root {
  --font-family: 'Inter', system-ui, -apple-system, sans-serif;

  /* Reis IA type scale (adapted from Stripe proportions) */
  --text-display: 72px;
  --text-h1: 56px;
  --text-h2: 48px;
  --text-h3: 36px;
  --text-h4: 28px;
  --text-h5: 24px;
  --text-body-lg: 18px;
  --text-body: 16px;
  --text-caption: 15px;
  --text-small: 14px;
  --text-micro: 13px;

  /* Line heights */
  --leading-display: 1.1;
  --leading-heading: 1.2;
  --leading-subheading: 1.3;
  --leading-body: 1.6;
  --leading-caption: 1.6;

  /* Letter spacing */
  --tracking-display: -0.02em;
  --tracking-heading: -0.01em;
  --tracking-body: 0;
  --tracking-caption: 0.01em;
}

/* Mobile overrides */
@media (max-width: 599px) {
  :root {
    --text-display: 48px;
    --text-h1: 40px;
    --text-h2: 34px;
    --text-h3: 28px;
    --text-h4: 24px;
  }
}
```

---

## 9. Navigation Header (Dark Mode)

```css
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 12px 24px;
  background: transparent;
  transition: background 0.25s cubic-bezier(0.61, 1, 0.88, 1),
              box-shadow 0.25s cubic-bezier(0.61, 1, 0.88, 1);
}

.site-header--scrolled {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

### Tailwind + JS

```html
<header id="site-header"
  class="fixed top-0 left-0 right-0 z-[100] px-6 py-3
         transition-all duration-[250ms] ease-out-sine
         data-[scrolled]:bg-black/85 data-[scrolled]:backdrop-blur-xl
         data-[scrolled]:shadow-[0_1px_0_rgba(255,255,255,0.06)]">
  <nav class="max-w-[1200px] mx-auto flex items-center justify-between">
    <!-- Nav content -->
  </nav>
</header>
```

```js
// Scroll detection
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.dataset.scrolled = '';
  } else {
    delete header.dataset.scrolled;
  }
}, { passive: true });
```

---

## 10. Marquee / Logo Carousel

```css
.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

.marquee__track {
  display: flex;
  gap: 48px;
  animation: marquee 30s linear infinite;
  width: max-content;
}

.marquee:hover .marquee__track {
  animation-duration: 60s;   /* Slows on hover */
}

@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

### Usage Note
Duplicate the logo set inside the track so the second copy fills in seamlessly when the first scrolls out.

```html
<div class="marquee">
  <div class="marquee__track">
    <!-- First set of logos -->
    <img src="logo1.svg" alt="..." class="h-8 opacity-40 hover:opacity-70 transition-opacity" />
    <img src="logo2.svg" alt="..." class="h-8 opacity-40 hover:opacity-70 transition-opacity" />
    <!-- Duplicate set for seamless loop -->
    <img src="logo1.svg" alt="..." class="h-8 opacity-40 hover:opacity-70 transition-opacity" />
    <img src="logo2.svg" alt="..." class="h-8 opacity-40 hover:opacity-70 transition-opacity" />
  </div>
</div>
```

---

## 11. Accented Card with Top Border

```css
.card-accented {
  position: relative;
  border-radius: 8px;
  background: #141414;
  padding: 32px 24px 20px;
  overflow: hidden;
}

.card-accented::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent-gold);
}
```

### Tailwind

```html
<div class="relative rounded-lg bg-[#141414] pt-8 pb-5 px-6 overflow-hidden">
  <div class="absolute top-0 left-0 right-0 h-[3px] bg-amber-500"></div>
  <!-- Card content -->
</div>
```

---

## 12. Link with Animated Arrow

```css
.link-arrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 15px;
  color: var(--accent-gold);
  text-decoration: none;
}

.link-arrow svg {
  width: 16px;
  height: 16px;
  transition: transform 150ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.link-arrow:hover svg {
  transform: translateX(3px);
}
```

### Tailwind

```html
<a href="#" class="inline-flex items-center gap-2 font-semibold text-[15px] text-amber-500 group">
  Learn more
  <svg class="w-4 h-4 transition-transform duration-150 ease-out-cubic group-hover:translate-x-[3px]"
       viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
</a>
```

---

## 13. Background Section Alternation (Dark Mode)

```css
/* Stripe alternates #fff / #f6f9fc in light mode.
   Reis IA equivalent in dark mode: */

.section--dark {
  background-color: #000000;
}

.section--darker {
  background-color: #0A0A0A;
}

/* Even subtler layering for cards on each background */
.section--dark .card  { background-color: #111111; }
.section--darker .card { background-color: #141414; }
```

### Tailwind

```html
<!-- Alternating sections -->
<section class="bg-black">
  <div class="bg-[#111] rounded-lg"><!-- card on black bg --></div>
</section>

<section class="bg-[#0A0A0A]">
  <div class="bg-[#141414] rounded-lg"><!-- card on near-black bg --></div>
</section>
```

---

## 14. Gradient Text Effect (Subtle Gold Shimmer)

```css
.text-gradient {
  background: linear-gradient(
    135deg,
    var(--accent-gold) 0%,
    #ffffff 40%,
    var(--accent-gold) 60%,
    #ffffff 100%
  );
  background-size: 300% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 8s linear infinite;
}

@keyframes shimmer {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
```

### Usage Note
Use sparingly -- at most ONE gradient text element per page. Best for a single accent word in a hero headline. The 8s duration keeps it subtle; Stripe uses 5s which is more noticeable.

---

## 15. Responsive Grid System

```css
.grid-layout {
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(4, 1fr);  /* Mobile: 4 columns */
}

@media (min-width: 600px) {
  .grid-layout {
    gap: 24px;
    grid-template-columns: repeat(8, 1fr);  /* Tablet: 8 columns */
  }
}

@media (min-width: 900px) {
  .grid-layout {
    grid-template-columns: repeat(12, 1fr);  /* Desktop: 12 columns */
  }
}

/* Content spanning patterns */
.col-full    { grid-column: 1 / -1; }
.col-half    { grid-column: span 6; }
.col-third   { grid-column: span 4; }
.col-quarter { grid-column: span 3; }
.col-two-thirds { grid-column: span 8; }

@media (max-width: 899px) {
  .col-half,
  .col-third,
  .col-quarter,
  .col-two-thirds {
    grid-column: 1 / -1;  /* Full width on mobile */
  }
}
```
