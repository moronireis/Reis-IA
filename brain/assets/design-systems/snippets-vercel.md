# Vercel Design System -- Reusable CSS/Code Snippets

Last updated: 2026-03-16

Extracted patterns from vercel.com, adapted as reusable code snippets. These are **reference implementations** -- adapt for Reis IA brand identity (Inter instead of Geist, gold accent instead of blue, etc.).

---

## 1. Navigation Bar (Glassmorphism)

```css
/* Sticky nav with saturated backdrop blur */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid #2e2e2e;
  transition: background 200ms ease;
}

/* Nav links */
.nav-link {
  font-size: 14px;
  font-weight: 400;
  color: #a0a0a0;
  text-decoration: none;
  transition: color 200ms ease;
}

.nav-link:hover {
  color: #ededed;
}

/* Active nav link */
.nav-link--active {
  color: #ededed;
}
```

**Tailwind equivalent:**
```html
<nav class="sticky top-0 z-[100] h-16 flex items-center px-6 bg-black/80 backdrop-blur-xl backdrop-saturate-[1.8] border-b border-neutral-800">
  <a class="text-sm text-neutral-500 hover:text-neutral-200 transition-colors duration-200">Link</a>
</nav>
```

---

## 2. Button System

```css
/* Base button */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 200ms ease, color 200ms ease, border-color 200ms ease;
  white-space: nowrap;
}

/* Sizes */
.btn--sm {
  height: 32px;
  padding: 0 12px;
  font-size: 13px;
  border-radius: 6px;
}

.btn--md {
  height: 40px;
  padding: 0 16px;
  font-size: 14px;
  border-radius: 8px;
}

.btn--lg {
  height: 48px;
  padding: 0 20px;
  font-size: 16px;
  border-radius: 10px;
}

/* Primary (dark mode -- light button on dark bg) */
.btn--primary {
  background-color: #ededed;
  color: #000000;
  border: none;
}

.btn--primary:hover {
  background-color: #ffffff;
}

/* Secondary */
.btn--secondary {
  background-color: #1a1a1a;
  color: #ededed;
  border: 1px solid #2e2e2e;
}

.btn--secondary:hover {
  background-color: #222222;
  border-color: #3e3e3e;
}

/* Tertiary / Ghost */
.btn--tertiary {
  background-color: transparent;
  color: #a0a0a0;
  border: 1px solid #2e2e2e;
}

.btn--tertiary:hover {
  background-color: #1a1a1a;
  color: #ededed;
}

/* Rounded / Pill (marketing pages) */
.btn--rounded {
  border-radius: 999px;
}

/* Disabled */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Focus */
.btn:focus-visible {
  outline: 2px solid #0070f3;
  outline-offset: 2px;
}
```

**Tailwind equivalent:**
```html
<!-- Primary -->
<button class="h-10 px-4 text-sm font-medium bg-neutral-200 text-black rounded-lg hover:bg-white transition-colors duration-200">
  Start Now
</button>

<!-- Secondary -->
<button class="h-10 px-4 text-sm font-medium bg-neutral-900 text-neutral-200 border border-neutral-700 rounded-lg hover:bg-neutral-800 hover:border-neutral-600 transition-colors duration-200">
  Learn More
</button>

<!-- Tertiary/Ghost -->
<button class="h-10 px-4 text-sm font-medium text-neutral-500 border border-neutral-700 rounded-lg hover:bg-neutral-900 hover:text-neutral-200 transition-colors duration-200">
  View Details
</button>

<!-- Pill variant (marketing) -->
<button class="h-10 px-6 text-sm font-medium bg-neutral-200 text-black rounded-full hover:bg-white transition-colors duration-200">
  Get Started
</button>
```

---

## 3. Card Component

```css
/* Standard card */
.card {
  padding: 32px;
  background: #0a0a0a;
  border: 1px solid #2e2e2e;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;
  transition: border-color 200ms ease;
}

.card:hover {
  border-color: #3e3e3e;
}

/* Card title */
.card__title {
  font-size: 20px;
  font-weight: 600;
  color: #ededed;
  line-height: 1.4;
}

/* Card description */
.card__desc {
  font-size: 14px;
  font-weight: 400;
  color: #a0a0a0;
  line-height: 1.5;
}

/* Card with link behavior */
.card--link {
  text-decoration: none;
  cursor: pointer;
}

.card--link:hover .card__title {
  color: #ffffff;
}

/* Card with focus ring */
.card--link:focus-visible {
  outline: none;
  border-color: #0070f3;
  box-shadow: 0 0 0 1px #0070f3;
}
```

**Tailwind equivalent:**
```html
<div class="p-8 bg-[#0a0a0a] border border-neutral-800 rounded-xl flex flex-col gap-6 h-full hover:border-neutral-700 transition-colors duration-200">
  <h3 class="text-xl font-semibold text-neutral-200">Card Title</h3>
  <p class="text-sm text-neutral-500 leading-relaxed">Card description text goes here.</p>
</div>
```

---

## 4. Entrance Animation (Fade Up)

```css
/* Base state (hidden) */
.animate-entrance {
  opacity: 0;
  transform: translateY(20px);
}

/* Revealed state */
.animate-entrance.is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Staggered children */
.animate-entrance.is-visible:nth-child(1) { transition-delay: 0ms; }
.animate-entrance.is-visible:nth-child(2) { transition-delay: 100ms; }
.animate-entrance.is-visible:nth-child(3) { transition-delay: 200ms; }
.animate-entrance.is-visible:nth-child(4) { transition-delay: 300ms; }
```

```javascript
/* IntersectionObserver for scroll-triggered entrance */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // Only trigger once
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.animate-entrance').forEach(el => observer.observe(el));
```

**Tailwind + CSS approach:**
```html
<style>
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
  .delay-1 { animation-delay: 100ms; }
  .delay-2 { animation-delay: 200ms; }
  .delay-3 { animation-delay: 300ms; }
</style>

<div class="opacity-0 fade-up">First element</div>
<div class="opacity-0 fade-up delay-1">Second element</div>
<div class="opacity-0 fade-up delay-2">Third element</div>
```

---

## 5. Section Layout Patterns

### Hero Section
```css
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 160px 24px 120px;
  background: #000000;
  max-width: 1200px;
  margin: 0 auto;
}

.hero__heading {
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: #ededed;
  max-width: 800px;
}

.hero__subheading {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  color: #a0a0a0;
  max-width: 600px;
  margin-top: 24px;
}

.hero__cta-group {
  display: flex;
  gap: 16px;
  margin-top: 40px;
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    padding: 80px 16px 64px;
  }
  .hero__heading {
    font-size: 40px;
    letter-spacing: -0.02em;
  }
  .hero__subheading {
    font-size: 16px;
  }
  .hero__cta-group {
    flex-direction: column;
    width: 100%;
  }
}
```

### Feature Grid Section
```css
.feature-section {
  padding: 96px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-section__header {
  margin-bottom: 48px;
}

.feature-section__title {
  font-size: 40px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #ededed;
}

.feature-section__desc {
  font-size: 18px;
  color: #a0a0a0;
  line-height: 1.6;
  margin-top: 16px;
  max-width: 600px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

@media (max-width: 1024px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .feature-section {
    padding: 64px 16px;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .feature-section__title {
    font-size: 32px;
  }
}
```

### CTA / Closing Section
```css
.cta-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 128px 24px;
  max-width: 700px;
  margin: 0 auto;
}

.cta-section__heading {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: #ededed;
}

.cta-section__body {
  font-size: 18px;
  color: #a0a0a0;
  line-height: 1.6;
  margin-top: 24px;
}

.cta-section__button {
  margin-top: 40px;
}

@media (max-width: 768px) {
  .cta-section {
    padding: 80px 16px;
  }
  .cta-section__heading {
    font-size: 32px;
  }
}
```

---

## 6. Elevation System (Dark Mode)

```css
/* Flat (default content) */
.elevation-flat {
  background: #000000;
}

/* Raised (cards, panels) */
.elevation-raised {
  background: #0a0a0a;
  border: 1px solid #2e2e2e;
}

/* Floating (dropdowns, tooltips) */
.elevation-floating {
  background: #1a1a1a;
  border: 1px solid #3e3e3e;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
}

/* Modal (dialogs, overlays) */
.elevation-modal {
  background: #1a1a1a;
  border: 1px solid #2e2e2e;
  box-shadow: 0 16px 70px rgba(0, 0, 0, 0.5);
}

/* Overlay backdrop */
.elevation-overlay {
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}
```

**Tailwind equivalent:**
```html
<!-- Flat -->
<div class="bg-black"></div>

<!-- Raised -->
<div class="bg-[#0a0a0a] border border-neutral-800"></div>

<!-- Floating -->
<div class="bg-neutral-900 border border-neutral-700 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"></div>

<!-- Modal -->
<div class="bg-neutral-900 border border-neutral-800 shadow-[0_16px_70px_rgba(0,0,0,0.5)]"></div>
```

---

## 7. Background Gradient (Subtle Hero)

```css
/* Subtle radial gradient for hero depth */
.hero-gradient {
  position: relative;
  background: #000000;
}

.hero-gradient::before {
  content: '';
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 60%;
  background: radial-gradient(
    ellipse at center,
    rgba(120, 119, 198, 0.15) 0%,
    transparent 70%
  );
  pointer-events: none;
}
```

**Reis IA gold variant:**
```css
.hero-gradient::before {
  background: radial-gradient(
    ellipse at center,
    rgba(201, 168, 76, 0.08) 0%,   /* Gold accent at very low opacity */
    transparent 70%
  );
}
```

---

## 8. Edge Fade Mask (Marquee / Carousel)

```css
.edge-fade {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}
```

---

## 9. Typography Helpers

```css
/* Heading -- tight tracking at large sizes */
.text-display {
  font-size: 72px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.04em;
  color: #ededed;
}

/* Section heading */
.text-section {
  font-size: 40px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: #ededed;
}

/* Body with subtle color */
.text-body-subtle {
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;
  color: #a0a0a0;
}

/* Label (micro) */
.text-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #a0a0a0;
}

/* Strong modifier */
.text-strong {
  font-weight: 600;
  color: #ededed;
}
```

---

## 10. Responsive Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 640px) {
  .container { padding: 0 24px; }
}

@media (min-width: 1024px) {
  .container { padding: 0 32px; }
}

@media (min-width: 1280px) {
  .container { padding: 0 48px; }
}
```

**Tailwind equivalent:**
```html
<div class="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
  <!-- Content -->
</div>
```

---

## 11. Focus Ring System

```css
/* Standard focus ring */
*:focus-visible {
  outline: 2px solid #0070f3;
  outline-offset: 2px;
}

/* Card focus (border-based) */
.card:focus-visible {
  outline: none;
  border-color: #0070f3;
  box-shadow: 0 0 0 1px #0070f3;
}

/* Reis IA gold focus ring */
*:focus-visible {
  outline: 2px solid #C9A84C;
  outline-offset: 2px;
}
```

---

## 12. Color Transition Hover Pattern

```css
/* The standard Vercel hover: just change color, nothing else */
.hover-color {
  color: #a0a0a0;
  transition: color 200ms ease;
}

.hover-color:hover {
  color: #ededed;
}

/* Background variant */
.hover-bg {
  background: transparent;
  transition: background-color 200ms ease;
}

.hover-bg:hover {
  background: rgba(255, 255, 255, 0.06); /* gray-alpha-100 */
}
```

---

## 13. Mobile Menu Overlay

```css
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: #000000;
  padding: 16px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  /* Entrance animation */
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 300ms ease, transform 300ms ease;
  pointer-events: none;
}

.mobile-menu.is-open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.mobile-menu__link {
  display: block;
  padding: 16px 0;
  font-size: 16px;
  font-weight: 500;
  color: #ededed;
  border-bottom: 1px solid #2e2e2e;
  text-decoration: none;
}
```
