# Apple Design System -- Reusable CSS/Code Snippets

Last updated: 2026-03-16

Code snippets extracted from Apple's design patterns, adapted for implementation. These are building blocks for the Reis IA design system -- use Inter instead of SF Pro, warm gold instead of Apple blue, dark mode instead of light mode.

---

## 1. Glassmorphism Navigation Bar

```css
/* Apple's signature frosted glass navigation */
.nav-glass {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 9997;
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);

  /* Light mode */
  background-color: rgba(255, 255, 255, 0.72);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);

  /* Dark mode (Reis IA default) */
  background-color: rgba(22, 22, 23, 0.72);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
}

/* Tailwind equivalent */
/* fixed top-0 inset-x-0 h-12 z-[9997] backdrop-blur-xl backdrop-saturate-[180%]
   bg-[rgba(22,22,23,0.72)] border-b border-white/[0.08] */
```

---

## 2. Scroll-Triggered Fade-Up Animation

```css
/* Initial state -- element is invisible and shifted down */
.fade-up {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1),
              transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Triggered state -- add via IntersectionObserver */
.fade-up.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children */
.fade-up-stagger > *:nth-child(1) { transition-delay: 0s; }
.fade-up-stagger > *:nth-child(2) { transition-delay: 0.1s; }
.fade-up-stagger > *:nth-child(3) { transition-delay: 0.2s; }
.fade-up-stagger > *:nth-child(4) { transition-delay: 0.3s; }
.fade-up-stagger > *:nth-child(5) { transition-delay: 0.4s; }
.fade-up-stagger > *:nth-child(6) { transition-delay: 0.5s; }
```

```javascript
/* IntersectionObserver for scroll-triggered animations */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  },
  {
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: '0px 0px -60px 0px', // Trigger slightly before fully in view
  }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
```

---

## 3. Scale Reveal Animation (Product Images)

```css
.scale-reveal {
  opacity: 0;
  transform: scale(0.94);
  transition: opacity 1s cubic-bezier(0.42, 0, 0.58, 1),
              transform 1s cubic-bezier(0.42, 0, 0.58, 1);
}

.scale-reveal.is-visible {
  opacity: 1;
  transform: scale(1);
}
```

---

## 4. Apple-Style Section Padding

```css
/* Desktop-first responsive section padding */
.section-apple {
  padding-top: 120px;
  padding-bottom: 120px;
}

@media only screen and (max-width: 1068px) {
  .section-apple {
    padding-top: 100px;
    padding-bottom: 100px;
  }
}

@media only screen and (max-width: 734px) {
  .section-apple {
    padding-top: 64px;
    padding-bottom: 64px;
  }
}

/* Hero section -- extra generous */
.section-hero {
  padding-top: 180px;
  padding-bottom: 100px;
}

@media only screen and (max-width: 1068px) {
  .section-hero {
    padding-top: 140px;
    padding-bottom: 80px;
  }
}

@media only screen and (max-width: 734px) {
  .section-hero {
    padding-top: 100px;
    padding-bottom: 64px;
  }
}
```

```css
/* Tailwind (mobile-first, Reis IA adaptation) */
/* py-16 md:py-24 lg:py-[120px] */
/* Hero: pt-24 pb-16 md:pt-36 md:pb-20 lg:pt-[180px] lg:pb-[100px] */
```

---

## 5. Container Width System

```css
.container-apple {
  max-width: 980px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 22px;
  padding-right: 22px;
}

@media only screen and (min-width: 735px) {
  .container-apple {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Narrow container for body copy */
.container-narrow {
  max-width: 680px;
  margin-left: auto;
  margin-right: auto;
}

/* Wide container for headlines */
.container-headline {
  max-width: 780px;
  margin-left: auto;
  margin-right: auto;
}
```

```css
/* Tailwind equivalents */
/* max-w-[980px] mx-auto px-5 md:px-0 */
/* max-w-[680px] mx-auto */
/* max-w-[780px] mx-auto */
```

---

## 6. Apple Typography Scale (Adapted for Inter)

```css
:root {
  --font-display: 'Inter', system-ui, -apple-system, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Display / Hero headline */
.type-display {
  font-family: var(--font-display);
  font-size: 96px;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.015em;
}

@media (max-width: 1068px) { .type-display { font-size: 80px; } }
@media (max-width: 734px) { .type-display { font-size: 48px; } }

/* Headline 1 */
.type-h1 {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 700;
  line-height: 1.0625;
  letter-spacing: -0.009em;
}

@media (max-width: 1068px) { .type-h1 { font-size: 48px; } }
@media (max-width: 734px) { .type-h1 { font-size: 32px; } }

/* Headline 2 */
.type-h2 {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 600;
  line-height: 1.0833;
  letter-spacing: -0.003em;
}

@media (max-width: 1068px) { .type-h2 { font-size: 40px; } }
@media (max-width: 734px) { .type-h2 { font-size: 28px; } }

/* Headline 3 */
.type-h3 {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0;
}

@media (max-width: 1068px) { .type-h3 { font-size: 32px; } }
@media (max-width: 734px) { .type-h3 { font-size: 24px; } }

/* Body large */
.type-body-lg {
  font-family: var(--font-body);
  font-size: 21px;
  font-weight: 400;
  line-height: 1.381;
  letter-spacing: 0.011em;
}

@media (max-width: 734px) { .type-body-lg { font-size: 19px; } }

/* Body */
.type-body {
  font-family: var(--font-body);
  font-size: 17px;
  font-weight: 400;
  line-height: 1.4706;
  letter-spacing: -0.022em;
}

/* Caption */
.type-caption {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 400;
  line-height: 1.3333;
  letter-spacing: -0.01em;
}
```

---

## 7. Apple Pill Button

```css
.btn-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 22px;
  border-radius: 980px;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.17648;
  letter-spacing: -0.022em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  min-width: 28px;
}

/* Apple blue variant */
.btn-pill--blue {
  background-color: #0071e3;
  color: #ffffff;
}
.btn-pill--blue:hover {
  background-color: #0077ed;
}

/* Reis IA gold variant */
.btn-pill--gold {
  background-color: #C9A84C;
  color: #000000;
}
.btn-pill--gold:hover {
  background-color: #D4B65E;
}

/* Outline variant (dark bg) */
.btn-pill--outline {
  background-color: transparent;
  color: #f5f5f7;
  border: 1px solid rgba(255, 255, 255, 0.25);
}
.btn-pill--outline:hover {
  border-color: rgba(255, 255, 255, 0.5);
}
```

```css
/* Tailwind */
/* inline-flex items-center justify-center px-6 py-2 rounded-full text-[17px]
   font-normal tracking-[-0.022em] whitespace-nowrap transition-colors duration-300
   bg-[#C9A84C] text-black hover:bg-[#D4B65E] */
```

---

## 8. "Learn More" Arrow Link

```css
.link-arrow {
  color: #0071e3;
  font-size: 21px;
  font-weight: 400;
  line-height: 1.381;
  letter-spacing: 0.011em;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.3s ease;
}

.link-arrow::after {
  content: '\203A'; /* Right-pointing single quotation mark -- Apple's arrow */
  font-size: 1.2em;
  display: inline-block;
  transition: transform 0.3s ease;
}

.link-arrow:hover {
  text-decoration: underline;
}

.link-arrow:hover::after {
  transform: translateX(4px);
}

/* Reis IA gold variant */
.link-arrow--gold {
  color: #C9A84C;
}
.link-arrow--gold:hover {
  color: #D4B65E;
}
```

---

## 9. Two-Up Card Grid

```css
.grid-two-up {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  max-width: 980px;
  margin: 0 auto;
}

@media (max-width: 734px) {
  .grid-two-up {
    grid-template-columns: 1fr;
  }
}

.card-two-up {
  border-radius: 28px;
  overflow: hidden;
  min-height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 32px 0;
  position: relative;
  text-align: center;
}

@media (max-width: 1068px) {
  .card-two-up {
    min-height: 500px;
    border-radius: 18px;
  }
}

@media (max-width: 734px) {
  .card-two-up {
    min-height: 420px;
    padding: 36px 24px 0;
  }
}

/* Dark card */
.card-two-up--dark {
  background-color: #1c1c1e;
  color: #f5f5f7;
}

/* Light card */
.card-two-up--light {
  background-color: #f5f5f7;
  color: #1d1d1f;
}
```

---

## 10. Hairline Separators

```css
/* Apple's signature 0.5px hairline */
.hairline {
  height: 0.5px;
  background-color: rgba(0, 0, 0, 0.1); /* Light bg */
}

.hairline--dark {
  background-color: rgba(255, 255, 255, 0.08); /* Dark bg */
}

/* Using border instead */
.hairline-border {
  border-top: 0.5px solid #d2d2d7; /* Light bg */
}

.hairline-border--dark {
  border-top: 0.5px solid #424245; /* Dark bg */
}

/* Reis IA dark mode default */
.separator {
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.08) 20%,
    rgba(255, 255, 255, 0.08) 80%,
    transparent
  );
}
```

---

## 11. Background Color Sectioning

```css
/* Apple alternates between these (light mode) */
.section--white { background-color: #ffffff; }
.section--gray { background-color: #f5f5f7; }
.section--dark { background-color: #000000; color: #f5f5f7; }

/* Reis IA dark mode alternation */
.section--primary { background-color: #000000; }
.section--elevated { background-color: #0A0A0A; }
.section--surface { background-color: #141414; }

/* Gradient transition between sections */
.section-fade {
  position: relative;
}
.section-fade::after {
  content: '';
  position: absolute;
  bottom: -60px;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(to bottom, currentBackgroundColor, nextBackgroundColor);
  pointer-events: none;
}
```

---

## 12. Focus Ring (Accessibility)

```css
/* Apple's focus style */
:focus-visible {
  outline: 4px solid rgba(0, 125, 250, 0.6);
  outline-offset: 1px;
  border-radius: inherit;
}

/* Reis IA gold focus ring */
:focus-visible {
  outline: 2px solid rgba(201, 168, 76, 0.6);
  outline-offset: 2px;
  border-radius: inherit;
}
```

---

## 13. Gallery / Horizontal Scroll

```css
.gallery-scroll {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-padding: 20px;
  -webkit-overflow-scrolling: touch;
  padding: 0 20px;

  /* Hide scrollbar */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.gallery-scroll::-webkit-scrollbar {
  display: none;
}

.gallery-item {
  flex: 0 0 auto;
  width: 280px;
  scroll-snap-align: start;
  border-radius: 18px;
  overflow: hidden;
}

@media (min-width: 735px) {
  .gallery-item {
    width: 360px;
  }
}

@media (min-width: 1069px) {
  .gallery-item {
    width: 400px;
  }
}

/* Pagination dots */
.gallery-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.gallery-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery-dot.active {
  width: 8px;
  height: 8px;
  background: #ffffff;
}
```

---

## 14. Hero Section Template

```css
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 180px 22px 100px;
  position: relative;
  overflow: hidden;
}

@media (max-width: 1068px) {
  .hero { padding: 140px 22px 80px; }
}

@media (max-width: 734px) {
  .hero { padding: 100px 22px 64px; }
}

.hero__eyebrow {
  font-size: 24px;
  font-weight: 600;
  line-height: 1.1667;
  margin-bottom: 8px;
  /* Apple uses product color here */
  /* Reis IA: use gold #C9A84C */
}

.hero__headline {
  font-size: 96px;
  font-weight: 700;
  line-height: 1.0;
  letter-spacing: -0.015em;
  margin-bottom: 16px;
  max-width: 780px;
}

@media (max-width: 1068px) { .hero__headline { font-size: 80px; } }
@media (max-width: 734px) { .hero__headline { font-size: 48px; } }

.hero__subtitle {
  font-size: 21px;
  font-weight: 400;
  line-height: 1.381;
  letter-spacing: 0.011em;
  color: #86868b;
  max-width: 600px;
  margin-bottom: 24px;
}

@media (max-width: 734px) { .hero__subtitle { font-size: 19px; } }

.hero__ctas {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.hero__image {
  margin-top: 40px;
  max-width: 100%;
}
```

---

## 15. Easing Functions Collection

```css
:root {
  /* Apple standard easings */
  --ease-default: ease;
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-apple: cubic-bezier(0.42, 0, 0.58, 1);
  --ease-dramatic: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

  /* Duration scale */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-moderate: 500ms;
  --duration-slow: 800ms;
  --duration-dramatic: 1200ms;
  --duration-cinematic: 1800ms;
}
```

---

## 16. CSS Custom Properties Template (Dark Mode Reis IA)

```css
:root {
  /* Surfaces */
  --surface-primary: #000000;
  --surface-elevated: #0A0A0A;
  --surface-secondary: #141414;
  --surface-tertiary: #1A1A1A;
  --surface-card: #1c1c1e;

  /* Text */
  --text-primary: #f5f5f7;
  --text-secondary: #a1a1a6;
  --text-tertiary: #6e6e73;
  --text-muted: #48484a;

  /* Accent (Reis IA gold) */
  --accent: #C9A84C;
  --accent-hover: #D4B65E;
  --accent-muted: rgba(201, 168, 76, 0.15);

  /* Borders */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.15);
  --border-accent: rgba(201, 168, 76, 0.25);

  /* Spacing (Apple-inspired scale) */
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-20: 20px;
  --space-24: 24px;
  --space-32: 32px;
  --space-40: 40px;
  --space-48: 48px;
  --space-64: 64px;
  --space-80: 80px;
  --space-100: 100px;
  --space-120: 120px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 18px;
  --radius-2xl: 28px;
  --radius-pill: 980px;
  --radius-circle: 50%;

  /* Shadows */
  --shadow-card: 0 4px 16px rgba(0, 0, 0, 0.3);
  --shadow-elevated: 0 8px 36px rgba(0, 0, 0, 0.4);
  --shadow-overlay: 0 12px 48px rgba(0, 0, 0, 0.5);

  /* Glass */
  --glass-bg: rgba(22, 22, 23, 0.72);
  --glass-blur: blur(20px);
  --glass-saturate: saturate(180%);

  /* Animations */
  --ease-default: ease;
  --ease-apple: cubic-bezier(0.42, 0, 0.58, 1);
  --ease-dramatic: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 800ms;
}
```
