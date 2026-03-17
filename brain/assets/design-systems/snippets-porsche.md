# Porsche Design System -- Reusable Code Snippets

Last updated: 2026-03-16

**Purpose**: Extracted CSS patterns from Porsche's web design system, adapted as reusable snippets for Reis IA implementation. Each snippet includes the original Porsche value and the Reis IA adaptation.

---

## 1. Fluid Spacing System (CSS Custom Properties)

### Original Porsche Tokens

```css
:root {
  /* Porsche spacing scale -- fluid via clamp() */
  --spacing-xs:  clamp(4px, 0.25vw + 3px, 8px);
  --spacing-sm:  clamp(8px, 0.5vw + 6px, 16px);
  --spacing-md:  clamp(16px, 1.25vw + 12px, 36px);
  --spacing-lg:  clamp(32px, 2.75vw + 23px, 76px);
  --spacing-xl:  clamp(48px, 3vw + 38px, 96px);
  --spacing-2xl: clamp(80px, 7.5vw + 56px, 200px);
}
```

### Reis IA Adaptation (Tailwind Config)

```js
// tailwind.config.js -- extend spacing with fluid tokens
module.exports = {
  theme: {
    extend: {
      spacing: {
        'fluid-xs':  'clamp(4px, 0.25vw + 3px, 8px)',
        'fluid-sm':  'clamp(8px, 0.5vw + 6px, 16px)',
        'fluid-md':  'clamp(16px, 1.25vw + 12px, 36px)',
        'fluid-lg':  'clamp(32px, 2.75vw + 23px, 76px)',
        'fluid-xl':  'clamp(48px, 3vw + 38px, 96px)',
        'fluid-2xl': 'clamp(80px, 7.5vw + 56px, 200px)',
      }
    }
  }
}
```

### Usage

```html
<!-- Section with fluid vertical padding -->
<section class="py-fluid-xl px-fluid-md">
  <!-- Component with fluid gap -->
  <div class="grid grid-cols-12 gap-fluid-md">
    <div class="col-span-6">...</div>
    <div class="col-span-6">...</div>
  </div>
</section>

<!-- Hero with dramatic fluid spacing -->
<section class="py-fluid-2xl">
  <h1 class="mb-fluid-lg">...</h1>
</section>
```

---

## 2. Fluid Typography System

### Original Porsche Scale

```css
:root {
  --text-xxs:  0.75rem;                                      /* 12px */
  --text-xs:   clamp(0.81rem, 0.23vw + 0.77rem, 0.88rem);   /* 13-14px */
  --text-sm:   1rem;                                          /* 16px */
  --text-md:   clamp(1.13rem, 0.21vw + 1.08rem, 1.33rem);   /* 18-21px */
  --text-lg:   clamp(1.27rem, 0.51vw + 1.16rem, 1.78rem);   /* 20-28px */
  --text-xl:   clamp(1.42rem, 0.94vw + 1.23rem, 2.37rem);   /* 23-38px */
  --text-2xl:  clamp(1.6rem, 1.56vw + 1.29rem, 3.16rem);    /* 26-51px */
}
```

### Reis IA Adaptation

```js
// tailwind.config.js -- fluid font sizes
module.exports = {
  theme: {
    extend: {
      fontSize: {
        'fluid-xs':   ['clamp(0.75rem, 0.15vw + 0.72rem, 0.875rem)', { lineHeight: 'calc(6px + 2.125ex)' }],
        'fluid-sm':   ['1rem', { lineHeight: 'calc(6px + 2.125ex)' }],
        'fluid-md':   ['clamp(1.125rem, 0.21vw + 1.08rem, 1.33rem)', { lineHeight: 'calc(6px + 2.125ex)' }],
        'fluid-lg':   ['clamp(1.25rem, 0.5vw + 1.15rem, 1.75rem)', { lineHeight: 'calc(6px + 2.125ex)' }],
        'fluid-xl':   ['clamp(1.5rem, 1vw + 1.2rem, 2.5rem)', { lineHeight: 'calc(6px + 2.0ex)' }],
        'fluid-2xl':  ['clamp(1.75rem, 1.5vw + 1.3rem, 3rem)', { lineHeight: 'calc(6px + 2.0ex)' }],
        'fluid-3xl':  ['clamp(2rem, 2.5vw + 1.2rem, 4.5rem)', { lineHeight: '1.1' }],
      }
    }
  }
}
```

### Universal Line-Height Formula

```css
/* Porsche's line-height formula -- scales proportionally to font size */
.body-text {
  line-height: calc(6px + 2.125ex);
}

/* For display/headline text, reduce the ex multiplier */
.headline {
  line-height: calc(6px + 2.0ex);
}

/* Or use a simple tight line-height for very large text */
.display {
  line-height: 1.1;
}
```

---

## 3. Motion & Animation System

### Duration Tokens

```css
:root {
  --duration-short:     0.25s;  /* Hover states, toggles, focus rings */
  --duration-moderate:  0.4s;   /* Panels, accordions, standard UI */
  --duration-long:      0.6s;   /* Modals, reveals, section transitions */
  --duration-very-long: 1.2s;   /* Hero entrances, page-level reveals */
}
```

### Easing Curves

```css
:root {
  --ease-base: cubic-bezier(0.25, 0.1, 0.25, 1);  /* Default: subtle refinement of ease */
  --ease-in:   cubic-bezier(0, 0, 0.2, 1);         /* Elements entering */
  --ease-out:  cubic-bezier(0.4, 0, 0.5, 1);       /* Elements exiting */
}
```

### Common Transition Patterns

```css
/* Button hover */
.btn {
  transition: background-color var(--duration-short) var(--ease-base),
              box-shadow var(--duration-short) var(--ease-base);
}
.btn:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

/* Image card hover */
.card-image {
  transition: transform var(--duration-moderate) var(--ease-base);
}
.card-image:hover {
  transform: scale3d(1.05, 1.05, 1.05);
}

/* Panel/sidebar reveal */
.panel {
  transition: opacity var(--duration-moderate) ease;
}

/* Section entrance (scroll-triggered) */
.section-enter {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--duration-long) var(--ease-in),
              transform var(--duration-long) var(--ease-in);
}
.section-enter.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hero entrance */
.hero-enter {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity var(--duration-very-long) var(--ease-in),
              transform var(--duration-very-long) var(--ease-in);
}
```

### Tailwind Adaptation

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      transitionDuration: {
        'short': '250ms',
        'moderate': '400ms',
        'long': '600ms',
        'very-long': '1200ms',
      },
      transitionTimingFunction: {
        'porsche-base': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        'porsche-in': 'cubic-bezier(0, 0, 0.2, 1)',
        'porsche-out': 'cubic-bezier(0.4, 0, 0.5, 1)',
      }
    }
  }
}
```

---

## 4. Glassmorphism / Frosted Effect

```css
/* Porsche frosted background -- used for overlays, mobile nav */
.frosted {
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  background-color: rgba(14, 14, 18, 0.85); /* #0e0e12 at 85% opacity */
}

/* Reis IA adaptation -- warmer tint */
.reis-frosted {
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  background-color: rgba(10, 10, 10, 0.88); /* #0A0A0A at 88% opacity */
}

/* Lighter frosted variant for card overlays */
.reis-frosted-light {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background-color: rgba(20, 20, 20, 0.75); /* #141414 at 75% opacity */
}
```

---

## 5. Grid System

### Porsche Original

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);  /* mobile */
  gap: clamp(16px, 1.25vw + 12px, 36px);
  max-width: 2560px;
  min-width: 320px;
  margin: 0 auto;
  padding-left: max(22px, 10.625vw - 12px);
  padding-right: max(22px, 10.625vw - 12px);
}

@media (min-width: 760px) {
  .grid-container {
    grid-template-columns: repeat(12, 1fr);
  }
}

@media (min-width: 1920px) {
  .grid-container {
    padding-left: min(50vw - 880px, 400px);
    padding-right: min(50vw - 880px, 400px);
  }
}
```

### Reis IA Adaptation

```css
/* Simplified for 1200px max-width content */
.content-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);  /* mobile */
  gap: clamp(16px, 1.25vw + 12px, 32px);
  max-width: 1200px;
  margin: 0 auto;
  padding-left: clamp(16px, 5vw, 48px);
  padding-right: clamp(16px, 5vw, 48px);
}

@media (min-width: 768px) {
  .content-grid {
    grid-template-columns: repeat(12, 1fr);
  }
}
```

---

## 6. Button Component

### Dark Theme Buttons (Porsche Style)

```css
/* Primary button -- outline style */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 28px;
  border-radius: 4px;
  border: 1px solid #ffffff;
  background-color: transparent;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  line-height: calc(6px + 2.125ex);
  letter-spacing: normal;
  cursor: pointer;
  transition: background-color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.btn-primary:hover {
  background-color: #1a1a24;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

.btn-primary:focus-visible {
  outline: 2px solid #1a44ea;
  outline-offset: 2px;
}

/* Reis IA primary button -- gold accent fill */
.btn-reis-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 28px;
  border-radius: 4px;
  border: 1px solid #C9A84C;
  background-color: #C9A84C;
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              border-color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.btn-reis-primary:hover {
  background-color: #B8973F;
  border-color: #B8973F;
  box-shadow: 0 4px 16px rgba(201, 168, 76, 0.2);
}

/* Reis IA secondary button -- white outline (Porsche-derived) */
.btn-reis-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 28px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background-color: transparent;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              border-color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.btn-reis-secondary:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

/* Compact button variant */
.btn-compact {
  padding: 6px 10px;
  font-size: 0.875rem;
}
```

---

## 7. Card Component

```css
/* Dark theme card -- Porsche-derived */
.card {
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
              box-shadow 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.16);
}

/* Card image with hover zoom */
.card-image-wrapper {
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: auto;
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.card:hover .card-image {
  transform: scale3d(1.05, 1.05, 1.05);
}

/* Card content area */
.card-body {
  padding: clamp(16px, 1.25vw + 12px, 36px);
}

.card-title {
  font-size: clamp(1.125rem, 0.21vw + 1.08rem, 1.33rem);
  font-weight: 600;
  color: #ffffff;
  margin-bottom: clamp(8px, 0.5vw + 6px, 16px);
}

.card-description {
  font-size: 1rem;
  color: #88898c;
  line-height: calc(6px + 2.125ex);
}
```

---

## 8. Custom Scrollbar

```css
/* Porsche-style scrollbar -- adapted for Reis IA */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}

*::-webkit-scrollbar {
  width: 6px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.35);
}
```

---

## 9. Font Rendering

```css
/* Premium font rendering -- applied globally */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  text-rendering: optimizeLegibility;
}
```

---

## 10. Responsive Header

```css
/* Variable height header -- Porsche pattern */
:root {
  --header-height: 4.125rem;  /* 66px mobile */
}

@media (min-width: 480px) {
  :root { --header-height: 5rem; }       /* 80px */
}

@media (min-width: 768px) {
  :root { --header-height: 4.5rem; }     /* 72px */
}

@media (min-width: 1024px) {
  :root { --header-height: 4.75rem; }    /* 76px */
}

@media (min-width: 1280px) {
  :root { --header-height: 5.125rem; }   /* 82px */
}

.header {
  height: var(--header-height);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 9;
}
```

---

## 11. Section Scroll-Reveal Animation

```css
/* IntersectionObserver-based reveal -- Porsche timing */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0, 0, 0.2, 1);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children reveal */
.reveal-children > * {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.4s cubic-bezier(0, 0, 0.2, 1),
              transform 0.4s cubic-bezier(0, 0, 0.2, 1);
}

.reveal-children.visible > *:nth-child(1) { transition-delay: 0s; }
.reveal-children.visible > *:nth-child(2) { transition-delay: 0.1s; }
.reveal-children.visible > *:nth-child(3) { transition-delay: 0.2s; }
.reveal-children.visible > *:nth-child(4) { transition-delay: 0.3s; }
.reveal-children.visible > *:nth-child(5) { transition-delay: 0.4s; }

.reveal-children.visible > * {
  opacity: 1;
  transform: translateY(0);
}
```

### JavaScript for Scroll Reveal

```js
// IntersectionObserver for scroll-triggered reveals
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once only
      }
    });
  },
  {
    threshold: 0.15,  // trigger when 15% visible
    rootMargin: '0px 0px -50px 0px',  // slight offset from bottom
  }
);

document.querySelectorAll('.reveal, .reveal-children').forEach((el) => {
  observer.observe(el);
});
```

---

## 12. Complete CSS Variables Bundle (Reis IA Ready)

```css
/*
 * Reis IA Design Tokens
 * Derived from Porsche Design System analysis
 * Adapted for dark-mode consultancy brand
 */
:root {
  /* Colors -- Dark Theme */
  --color-bg-base:       #0A0A0A;
  --color-bg-surface:    #141414;
  --color-bg-elevated:   #1A1A1A;
  --color-bg-hover:      #1F1F1F;
  --color-text-primary:  #F5F5F5;
  --color-text-secondary: #A3A3A3;
  --color-text-tertiary: #737373;
  --color-accent:        #C9A84C;
  --color-accent-hover:  #B8973F;
  --color-border:        rgba(255, 255, 255, 0.08);
  --color-border-hover:  rgba(255, 255, 255, 0.15);
  --color-border-strong: rgba(255, 255, 255, 0.6);
  --color-focus:         #C9A84C;

  /* Spacing -- Fluid */
  --space-xs:  clamp(4px, 0.25vw + 3px, 8px);
  --space-sm:  clamp(8px, 0.5vw + 6px, 16px);
  --space-md:  clamp(16px, 1.25vw + 12px, 36px);
  --space-lg:  clamp(32px, 2.75vw + 23px, 76px);
  --space-xl:  clamp(48px, 3vw + 38px, 96px);
  --space-2xl: clamp(80px, 7.5vw + 56px, 200px);

  /* Typography */
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-weight-regular: 400;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --line-height-body: calc(6px + 2.125ex);
  --line-height-heading: calc(6px + 2.0ex);
  --line-height-display: 1.1;
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: normal;
  --letter-spacing-wide: 0.05em;

  /* Motion */
  --duration-short:     0.25s;
  --duration-moderate:  0.4s;
  --duration-long:      0.6s;
  --duration-very-long: 1.2s;
  --ease-base: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in:   cubic-bezier(0, 0, 0.2, 1);
  --ease-out:  cubic-bezier(0.4, 0, 0.5, 1);

  /* Effects */
  --shadow-sm:   0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md:   0 4px 16px rgba(0, 0, 0, 0.16);
  --shadow-lg:   0 8px 32px rgba(0, 0, 0, 0.24);
  --shadow-gold: 0 4px 16px rgba(201, 168, 76, 0.2);
  --blur-frost:  32px;
  --blur-soft:   16px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;

  /* Layout */
  --content-max-width: 1200px;
  --grid-gap: clamp(16px, 1.25vw + 12px, 32px);
  --safe-zone: clamp(16px, 5vw, 48px);
  --header-height: 4.125rem;
}

@media (min-width: 480px) {
  :root { --header-height: 5rem; }
}
@media (min-width: 768px) {
  :root { --header-height: 4.5rem; }
}
@media (min-width: 1024px) {
  :root { --header-height: 4.75rem; }
}
@media (min-width: 1280px) {
  :root { --header-height: 5.125rem; }
}
```
