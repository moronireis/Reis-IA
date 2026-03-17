# Academia Lendaria -- Reusable CSS/Code Snippets

Last updated: 2026-03-16

Extracted from academialendaria.ai. These snippets are **references for adaptation**, not copy-paste templates. All values should be adjusted to Reis IA brand tokens before use.

---

## 1. CSS Custom Properties (Dark Theme Foundation)

```css
:root {
  /* Backgrounds -- layered dark system */
  --background: #000;
  --surface-1: #0a0a0a;
  --surface-2: #111111;
  --surface-3: #141414;
  --surface-4: #161616;
  --surface-5: #1a1a1a;

  /* Foreground */
  --foreground: #fff;
  --text-primary: #fff;
  --text-secondary: rgba(255, 255, 255, 0.7);   /* #ffffffb3 */
  --text-muted: rgba(255, 255, 255, 0.5);        /* #ffffff80 */
  --text-faint: rgba(255, 255, 255, 0.24);        /* #ffffff3d */

  /* Borders */
  --border-primary: #242424;
  --border-subtle: rgba(255, 255, 255, 0.1);     /* #ffffff1a */
  --border-faint: rgba(255, 255, 255, 0.08);     /* #ffffff14 */
  --border-ghost: rgba(255, 255, 255, 0.05);     /* #ffffff0d */

  /* Glass */
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: blur(12px);

  /* Accent -- ADAPT TO REIS IA: replace #ffd44a with #C9A84C */
  --accent-gold: #ffd44a;
  --accent-gold-text: #504015;

  /* Layout */
  --container-max-width: 1280px;
  --section-padding: 100px 0;
}
```

### Reis IA Adapted Version

```css
:root {
  --background: #000;
  --surface-1: #0a0a0a;
  --surface-2: #111111;
  --surface-3: #141414;
  --surface-4: #1a1a1a;

  --text-primary: #fff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-muted: rgba(255, 255, 255, 0.5);
  --text-faint: rgba(255, 255, 255, 0.24);

  --border-primary: #242424;
  --border-subtle: rgba(255, 255, 255, 0.1);
  --border-faint: rgba(255, 255, 255, 0.08);

  --glass-bg: rgba(255, 255, 255, 0.06);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: blur(12px);

  --accent-gold: #C9A84C;
  --accent-gold-light: #D4B65E;
  --accent-gold-dark: #A8893D;

  --container-max-width: 1200px;  /* Reis IA: slightly narrower */
  --section-padding: 96px 0;
}
```

---

## 2. Rotating Conic Gradient Border (Signature Effect)

```css
/* Required: CSS @property for animation */
@property --border-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

/* The card */
.animated-border-card {
  background:
    linear-gradient(45deg, #161616, #1a1a1a 50%, #161616) padding-box,
    conic-gradient(
      from var(--border-angle),
      #242424 80%,
      #646464 86%,
      #646464 90%,
      #646464 94%,
      #242424
    ) border-box;
  border: 1px solid transparent;
  border-radius: 16px;
  padding: 48px;
}

/* Activate animation (trigger via JS/IntersectionObserver) */
.animated-border-card.animating {
  animation: rotateBorder 6.4s linear infinite;
}

@keyframes rotateBorder {
  to {
    --border-angle: 360deg;
  }
}
```

### Reis IA Adapted Version (Gold Accent)

```css
@property --border-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

.reis-animated-card {
  background:
    linear-gradient(45deg, #111, #141414 50%, #111) padding-box,
    conic-gradient(
      from var(--border-angle),
      #242424 75%,
      #C9A84C 82%,
      #D4B65E 88%,
      #C9A84C 94%,
      #242424
    ) border-box;
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 48px;
}

.reis-animated-card.active {
  animation: rotateBorder 8s linear infinite;  /* slower for sophistication */
}
```

---

## 3. Text Shimmer Effect

```css
.shimmer-text {
  background: linear-gradient(
    110deg,
    #fff 0% 40%,
    #b8b8b8 50%,
    #fff 60% 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 13s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    background-position: 200% 0;
  }
  30% {
    background-position: -200% 0;
  }
}
```

### Reis IA Adapted Version (Gold Shimmer)

```css
.reis-shimmer-text {
  background: linear-gradient(
    110deg,
    #fff 0% 35%,
    #C9A84C 48%,
    #D4B65E 52%,
    #fff 65% 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: goldShimmer 15s ease-in-out infinite;  /* slower */
}

@keyframes goldShimmer {
  0%, 100% {
    background-position: 200% 0;
  }
  25% {
    background-position: -200% 0;
  }
}
```

---

## 4. 3D Perspective Scroll Entrance

```css
/* Parent container */
.perspective-container {
  perspective: 1200px;
  overflow: visible;
}

/* Child element -- initial state */
.entrance-3d {
  opacity: 0;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transform: translateY(150px) rotateX(15deg);
  transition:
    opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Visible state (toggle via IntersectionObserver) */
.entrance-3d.visible {
  opacity: 1;
  transform: translateY(0) rotateX(0);
}
```

### JavaScript Trigger

```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.entrance-3d')?.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.perspective-container').forEach((el) => {
  observer.observe(el);
});
```

---

## 5. Glass Card Component

```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-radius: 20px;
  padding: 32px;
}
```

### Glass Stats Overlay

```css
.glass-stats {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid #242424;
  border-radius: 8px;
  padding: 32px;
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
}
```

---

## 6. Logo Marquee (Infinite Scroll)

```css
.marquee-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

/* Edge fades */
.marquee-container::before,
.marquee-container::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  pointer-events: none;
}

.marquee-container::before {
  left: 0;
  background: linear-gradient(90deg, #000 0%, transparent 100%);
}

.marquee-container::after {
  right: 0;
  background: linear-gradient(270deg, #000 0%, transparent 100%);
}

/* Track */
.marquee-track {
  display: flex;
  align-items: center;
  gap: 80px;
  width: max-content;
  animation: marquee 40s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

/* Logo items */
.marquee-logo {
  flex-shrink: 0;
  opacity: 0.5;
  filter: grayscale(100%) brightness(0) invert(1);
  transition: opacity 0.3s ease;
}

.marquee-logo:hover {
  opacity: 1;
}

/* Label */
.marquee-label {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.24);
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  margin-top: 40px;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 7. Primary CTA Button (Gold Pill)

```css
.cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffd44a;  /* Reis IA: use #C9A84C */
  color: #504015;       /* Reis IA: use #1a1a0a */
  border: none;
  border-radius: 100px;
  padding: 24px 48px;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-primary:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255, 212, 74, 0.2);
  /* Reis IA: rgba(201, 168, 76, 0.2) */
}

.cta-primary:active {
  transform: translateY(0);
  opacity: 0.9;
}
```

---

## 8. Custom Scrollbar

```css
* {
  scrollbar-width: thin;
  scrollbar-color: #242424 #000;
}

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: #000;
}

::-webkit-scrollbar-thumb {
  background-color: #242424;
  border: 4px solid #000;
  border-radius: 20px;
}
```

---

## 9. Responsive Typography with clamp()

```css
/* Hero headline */
.hero-title {
  font-size: clamp(40px, 5vw, 64px);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

/* Section title */
.section-title {
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 600;
  line-height: 1.2;
}

/* Body large */
.body-large {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  font-weight: 500;
  line-height: 1.6;
}

/* Body large > strong emphasis */
.body-large strong {
  color: #fff;
  font-weight: 600;
}
```

---

## 10. Tailwind CSS Equivalents

For projects using Tailwind (like Reis IA's Astro site), here are the closest utility mappings:

```
Background layers:
  bg-black          = #000
  bg-neutral-950    = #0a0a0a
  bg-neutral-900    = #111 (approximate)
  bg-[#141414]      = custom surface
  bg-[#1a1a1a]      = custom surface

Text opacity:
  text-white                    = #fff
  text-white/70                 = #ffffffb3
  text-white/50                 = #ffffff80
  text-white/[0.24]             = #ffffff3d

Borders:
  border-[#242424]              = primary border
  border-white/10               = subtle border
  border-white/[0.08]           = glass border

Border radius:
  rounded-3xl                   = 24px (cards)
  rounded-2xl                   = 16px (standard)
  rounded-xl                    = 12px (inputs)
  rounded-lg                    = 8px (stats)
  rounded-full                  = pill buttons

Backdrop:
  backdrop-blur-sm              = blur(4px)
  backdrop-blur                 = blur(8px)
  backdrop-blur-md              = blur(12px)
  backdrop-blur-lg              = blur(16px)
  backdrop-saturate-[180%]      = saturate(180%)

Container:
  max-w-7xl                     = 1280px
  mx-auto px-6                  = centered with 24px padding

Section padding:
  py-24 (96px) or py-[100px]    = section spacing
  py-16 (64px)                  = secondary sections
  py-12 (48px)                  = compact sections

Typography:
  text-7xl (72px) font-extrabold tracking-tighter leading-none
  text-6xl (60px) font-semibold tracking-tight leading-tight
  text-5xl (48px) font-semibold leading-snug
  text-lg (18px) font-medium leading-relaxed
```

---

## 11. IntersectionObserver Pattern (Scroll Animations)

```javascript
// Generic scroll-triggered animation system
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: start border animation
          entry.target.querySelectorAll('.animated-border-card').forEach((card) => {
            card.classList.add('animating');
          });
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);
```

---

## 12. Full Reset + Dark Theme Base

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: #000;
  color: #fff;
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

img {
  max-width: 100%;
  display: block;
}
```
