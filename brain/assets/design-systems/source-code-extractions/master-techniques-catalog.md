# Master Techniques Catalog -- All References

Last updated: 2026-03-17
Sources: AIOX, Stripe, Linear, Apple, Porsche, Academia Lendaria, Agencia Lendaria, Morningside AI
Total techniques cataloged: 87
Stack constraints: Astro + React islands + Tailwind CSS v4 + vanilla JS (NO Framer Motion, NO GSAP)

---

## Table of Contents

1. [Scroll Animations](#1-scroll-animations) -- 14 techniques
2. [Hover Interactions](#2-hover-interactions) -- 12 techniques
3. [Click Interactions](#3-click-interactions) -- 6 techniques
4. [Layout Patterns for Showcases](#4-layout-patterns-for-showcases) -- 10 techniques
5. [Token Visualization Techniques](#5-token-visualization-techniques) -- 7 techniques
6. [Component Demo Techniques](#6-component-demo-techniques) -- 5 techniques
7. [Background Effects](#7-background-effects) -- 10 techniques
8. [Text Effects](#8-text-effects) -- 6 techniques
9. [Navigation Patterns](#9-navigation-patterns) -- 7 techniques
10. [Transition Techniques](#10-transition-techniques) -- 10 techniques

---

## 1. Scroll Animations

### 1.1 Fade-Up Reveal (Baseline)

**Description**: Elements fade in and slide up as they enter viewport. The bread-and-butter scroll animation used across every premium site.

**Sources**: Stripe, AIOX, Apple, Morningside, Academia Lendaria

**Code Pattern**:

```css
/* CSS */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// Vanilla JS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

**Adaptation for Reis IA**: Direct use. Set `--ease-out: cubic-bezier(0.215, 0.61, 0.355, 1)` as global token. Use `threshold: 0.15` for slightly earlier trigger. This is the mandatory baseline for every section.

**Priority**: HIGH

---

### 1.2 Staggered Children Reveal

**Description**: Multiple child elements enter sequentially with increasing delays, creating a cascade/wave effect.

**Sources**: AIOX (staggerChildren: 0.04-0.1), Apple (nth-child delays), Stripe (calc-based delays), Linear (200ms stagger + 400ms base)

**Code Pattern**:

```css
.stagger-parent .stagger-child {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
}
.stagger-parent.is-visible .stagger-child {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger via CSS custom property */
.stagger-parent.is-visible .stagger-child:nth-child(1) { transition-delay: 0ms; }
.stagger-parent.is-visible .stagger-child:nth-child(2) { transition-delay: 80ms; }
.stagger-parent.is-visible .stagger-child:nth-child(3) { transition-delay: 160ms; }
.stagger-parent.is-visible .stagger-child:nth-child(4) { transition-delay: 240ms; }
.stagger-parent.is-visible .stagger-child:nth-child(5) { transition-delay: 320ms; }
.stagger-parent.is-visible .stagger-child:nth-child(6) { transition-delay: 400ms; }
```

```javascript
// Dynamic stagger via inline style
document.querySelectorAll('.stagger-parent').forEach(parent => {
  const children = parent.querySelectorAll('.stagger-child');
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});
```

**Adaptation for Reis IA**: Use 80ms stagger for card grids, 40ms for tight lists/tags, 100ms for larger section elements. Linear's approach of 400ms base delay + 200ms stagger is more premium (page settles before content appears).

**Priority**: HIGH

---

### 1.3 Scale Reveal for Media

**Description**: Images and video previews scale from 0.94-0.97 to 1.0 while fading in. Creates a "zooming in" effect.

**Sources**: AIOX (scale 0.97), Apple (scale 0.94), Academia Lendaria (scale 0.95)

**Code Pattern**:

```css
.scale-reveal {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
}
.scale-reveal.is-visible {
  opacity: 1;
  transform: scale(1);
}
```

**Adaptation for Reis IA**: Use for hero images, device mockups, case study visuals. Scale 0.95 is the sweet spot. Duration 0.8s with 0.3s delay after headline appears.

**Priority**: HIGH

---

### 1.4 3D Perspective Entrance

**Description**: Elements enter with a combined translateY + rotateX transform, creating a "card flipping up from a table" effect. Parent has perspective set.

**Sources**: Academia Lendaria (perspective: 1200px, rotateX: 15deg, translateY: 150px)

**Code Pattern**:

```css
.perspective-parent {
  perspective: 1200px;
}
.perspective-reveal {
  opacity: 0;
  transform: translateY(150px) rotateX(15deg);
  transform-origin: bottom;
  transform-style: preserve-3d;
  transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.perspective-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) rotateX(0);
}
```

**Adaptation for Reis IA**: Use VERY selectively -- hero section and one key content section only. Over-use feels gimmicky. The slow 1.2s timing is essential for premium feel. Reduce translateY to 80-100px for subtlety.

**Priority**: MEDIUM

---

### 1.5 Sticky Section with Progress-Linked Content

**Description**: Section stays pinned while scroll progress drives content changes (text swaps, image transitions, number counters).

**Sources**: Apple (iPhone/MacBook product pages), Stripe (enterprise hub)

**Code Pattern**:

```css
.sticky-track {
  height: 300vh; /* 3x viewport = 3 "pages" of scroll content */
  position: relative;
}
.sticky-content {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
```

```javascript
// Vanilla JS scroll progress tracker
const track = document.querySelector('.sticky-track');
const steps = document.querySelectorAll('.sticky-step');

function updateProgress() {
  const rect = track.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
  const stepIndex = Math.floor(progress * steps.length);

  steps.forEach((step, i) => {
    step.style.opacity = i === stepIndex ? '1' : '0';
    step.style.transform = i === stepIndex ? 'translateY(0)' : 'translateY(20px)';
  });
}

window.addEventListener('scroll', () => requestAnimationFrame(updateProgress), { passive: true });
```

**Adaptation for Reis IA**: Excellent for "How We Work" / methodology section. Pin the visual, scroll through 3-4 steps. Each step fades text in/out. Use chess knight icon as the progress indicator moving through steps.

**Priority**: MEDIUM

---

### 1.6 Scroll-Linked Video Playback

**Description**: Video scrubs forward/backward based on scroll position. User scrolling controls video timeline.

**Sources**: Apple (iPhone, MacBook Pro pages)

**Code Pattern**:

```javascript
const video = document.querySelector('.scroll-video');
const section = document.querySelector('.video-section');

function onScroll() {
  const rect = section.getBoundingClientRect();
  const progress = 1 - (rect.bottom / (rect.height + window.innerHeight));
  const clampedProgress = Math.max(0, Math.min(1, progress));
  video.currentTime = clampedProgress * video.duration;
}

window.addEventListener('scroll', () => requestAnimationFrame(onScroll), { passive: true });
```

**Adaptation for Reis IA**: Heavy on bandwidth. Only consider for a premium "AI in action" demo. Use short MP4 (10-15s) with `preload="auto"`. WebM format for smaller payload.

**Priority**: LOW

---

### 1.7 Card Fan from Stacked Deck

**Description**: Cards fan out from a stacked position as user scrolls through a sticky section. Each card has unique rotation and translation.

**Sources**: Stripe (Enterprise Hub hero)

**Code Pattern**:

```css
.card-fan {
  will-change: transform;
  perspective: 1000px;
}
.card-fan-item {
  transition: opacity 0.1s linear, transform 0.1s linear;
}
/* Each card gets a unique transform based on index */
.card-fan-item:nth-child(1) { transform: rotate(-8deg) translateY(-20px); }
.card-fan-item:nth-child(2) { transform: rotate(-4deg) translateY(-10px); }
.card-fan-item:nth-child(3) { transform: rotate(0deg) translateY(0); }
.card-fan-item:nth-child(4) { transform: rotate(4deg) translateY(-10px); }
.card-fan-item:nth-child(5) { transform: rotate(8deg) translateY(-20px); }
```

**Adaptation for Reis IA**: Use for showcasing the 4 ecosystem pillars (Builder, Systems, Partners, Network). Each card fans out with its pillar icon. Replace with CSS `scroll-timeline` for modern browsers.

**Priority**: LOW

---

### 1.8 Counter Animation on Scroll

**Description**: Numbers count up from 0 to target value when scrolled into view.

**Sources**: AIOX (animated numbers with R$, %, K suffixes), Academia Lendaria (stats)

**Code Pattern (React island)**:

```tsx
// CountUp.tsx (React island)
import { useState, useEffect, useRef } from 'react';

export function CountUp({ value, prefix = '', suffix = '', duration = 1500 }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplay(value);
            clearInterval(timer);
          } else {
            setDisplay(Math.floor(current));
          }
        }, duration / steps);
      }
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration, started]);

  return <span ref={ref}>{prefix}{display.toLocaleString('pt-BR')}{suffix}</span>;
}
```

**Adaptation for Reis IA**: Use for case study metrics (revenue multiples, time savings, ROI). The `toLocaleString('pt-BR')` handles Brazilian number formatting.

**Priority**: HIGH

---

### 1.9 Parallax Image (Simple)

**Description**: Image moves at a different rate than the scroll, creating depth.

**Sources**: Apple (product pages), Stripe (background elements)

**Code Pattern**:

```javascript
// Simple parallax via scroll listener
const parallaxElements = document.querySelectorAll('[data-parallax]');

function updateParallax() {
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.3;
    const rect = el.parentElement.getBoundingClientRect();
    const offset = rect.top * speed;
    el.style.transform = `translateY(${offset}px)`;
  });
}

window.addEventListener('scroll', () => requestAnimationFrame(updateParallax), { passive: true });
```

```html
<div class="relative overflow-hidden">
  <img data-parallax="0.15" src="..." class="absolute inset-0 w-full h-full object-cover" />
</div>
```

**Adaptation for Reis IA**: Use sparingly. Speed 0.1-0.15 for subtle effect. Only on hero background or one key section image. Disable on mobile (`prefers-reduced-motion`).

**Priority**: LOW

---

### 1.10 Slide-From-Side Reveal

**Description**: Elements slide in from left or right as they enter viewport.

**Sources**: AIOX (anim-left, anim-right classes), Apple (slideFromLeft)

**Code Pattern**:

```css
.reveal-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-left.is-visible {
  opacity: 1;
  transform: translateX(0);
}
.reveal-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal-right.is-visible {
  opacity: 1;
  transform: translateX(0);
}
```

**Adaptation for Reis IA**: Use for two-column layouts where text enters from left and image from right. Keep distance at 30px (not 50+) for subtlety.

**Priority**: MEDIUM

---

### 1.11 Skew Section Transitions

**Description**: Sections have angled edges created by CSS transforms. Creates diagonal cuts between sections.

**Sources**: Stripe (--sectionAngle variable)

**Code Pattern**:

```css
.section-skewed {
  transform: skewY(-2deg);
  padding-top: calc(var(--section-padding) + 40px); /* compensate for skew */
}
.section-skewed > * {
  transform: skewY(2deg); /* counter-rotate content */
}
```

**Adaptation for Reis IA**: Very subtle (1-2deg max). Aligns with "minimal geometric" brand aesthetic. Use on maximum 1-2 sections. Could feel too "startup" if overdone.

**Priority**: LOW

---

### 1.12 Scroll Progress Bar

**Description**: A thin bar at the top of the page or section that fills based on scroll progress.

**Sources**: Conceptual (combining AIOX progress bar + Apple scroll patterns)

**Code Pattern**:

```javascript
const progressBar = document.querySelector('.scroll-progress');

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', () => requestAnimationFrame(updateProgress), { passive: true });
```

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: var(--accent-gold);
  z-index: 9999;
  transition: width 0.1s linear;
}
```

**Adaptation for Reis IA**: Use gold accent color. 2px height. Only on long-form pages (sales pages, case studies).

**Priority**: LOW

---

### 1.13 Image Sequence on Canvas

**Description**: Preloads 60-120 images, renders them to canvas based on scroll position. Film-quality scroll animation.

**Sources**: Apple (MacBook Pro page)

**Code Pattern**:

```javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const frameCount = 60;
const images = [];

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = `/frames/frame-${String(i).padStart(3, '0')}.webp`;
  images.push(img);
}

function renderFrame(index) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

window.addEventListener('scroll', () => {
  const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
  requestAnimationFrame(() => renderFrame(frameIndex));
});
```

**Adaptation for Reis IA**: Very bandwidth-heavy. Only consider for a signature hero if producing professional video content. Use WebP frames.

**Priority**: LOW

---

### 1.14 Horizontal Scroll Section

**Description**: A section where content scrolls horizontally while the user scrolls vertically. Pin the container and translate content sideways.

**Sources**: Conceptual (combining Apple carousel + Stripe card fan principles)

**Code Pattern**:

```css
.horizontal-scroll-track {
  height: 300vh;
}
.horizontal-scroll-content {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.horizontal-scroll-inner {
  display: flex;
  gap: 24px;
  will-change: transform;
}
```

```javascript
const track = document.querySelector('.horizontal-scroll-track');
const inner = document.querySelector('.horizontal-scroll-inner');

function updateHorizontalScroll() {
  const rect = track.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight)));
  const maxTranslate = inner.scrollWidth - window.innerWidth;
  inner.style.transform = `translateX(-${progress * maxTranslate}px)`;
}

window.addEventListener('scroll', () => requestAnimationFrame(updateHorizontalScroll), { passive: true });
```

**Adaptation for Reis IA**: Use for case study showcase or ecosystem pillar walkthrough. Each "card" is a full viewport-width panel.

**Priority**: LOW

---

## 2. Hover Interactions

### 2.1 Card Scale + Shadow Elevation

**Description**: Cards scale up very slightly (1.018x) on hover with shadow depth increase. Feels like physical objects lifting off surface.

**Sources**: Stripe (scale 1.018, 500ms, cubic-bezier(0.7, 0, 0, 1))

**Code Pattern**:

```css
.card-hover {
  transition: box-shadow 500ms cubic-bezier(0.7, 0, 0, 1),
              transform 500ms cubic-bezier(0.7, 0, 0, 1);
  will-change: transform;
}
.card-hover:hover {
  transform: scale(1.018);
  /* Dark mode adaptation: glow instead of shadow */
  box-shadow: 0 0 40px rgba(212, 175, 55, 0.08),
              0 0 80px rgba(212, 175, 55, 0.04);
}
```

**Adaptation for Reis IA**: Use gold glow instead of traditional shadow on dark backgrounds. The 500ms duration with aggressive deceleration easing is the key to premium feel. Never use scale above 1.02.

**Priority**: HIGH

---

### 2.2 Gradient Border Glow on Hover

**Description**: Card border transitions from solid to gradient on hover using double background-image with background-clip technique.

**Sources**: Morningside (green gradient), Academia Lendaria (rotating conic)

**Code Pattern**:

```css
.gradient-border-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}
.gradient-border-card:hover {
  border: 1px solid transparent;
  background-image:
    linear-gradient(135deg, #0a0a0a 0%, #000000 100%),
    linear-gradient(135deg, #1a1400 0%, #d4af37 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(212, 175, 55, 0.12);
}

/* Mobile: always show gradient border (no hover on touch) */
@media (max-width: 479px) {
  .gradient-border-card {
    border: 1px solid transparent;
    background-image:
      linear-gradient(135deg, #0a0a0a 0%, #000000 100%),
      linear-gradient(135deg, #1a1400 0%, #d4af37 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
}
```

**Adaptation for Reis IA**: Gold gradient replaces Morningside's green. The mobile fallback (always showing gradient border) is essential since hover is impossible on touch devices.

**Priority**: HIGH

---

### 2.3 Arrow Reveal on Card Hover

**Description**: An arrow icon appears and slides right when the card is hovered.

**Sources**: Stripe (arrowIn keyframe, 0.25s), Morningside (translateX(5px), 0.3s)

**Code Pattern**:

```css
.card-arrow {
  opacity: 0;
  transform: translateX(-3px);
  transition: opacity 0.25s ease-out, transform 0.25s ease-out;
}
.card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}
```

**Adaptation for Reis IA**: Apply to service cards and CTA links. The 0.25s timing is snappy. Use the arrow glyph (unicode 8599) for consistency with AIOX AccentButton pattern.

**Priority**: HIGH

---

### 2.4 Text Color Shift on Hover

**Description**: List items or menu terms shift color and translate slightly on hover.

**Sources**: AIOX (color to #D1FF00, x: 8px)

**Code Pattern**:

```css
.hover-list-item {
  color: rgba(255, 255, 255, 0.5);
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  transition: color 0.2s ease, transform 0.2s ease;
  cursor: pointer;
}
.hover-list-item:hover {
  color: var(--accent-gold);
  transform: translateX(8px);
}
```

**Adaptation for Reis IA**: Use gold accent instead of lime. Apply to feature lists, service breakdowns, FAQ items.

**Priority**: MEDIUM

---

### 2.5 Image Zoom on Card Hover

**Description**: Image within a card scales up on hover while card border brightens and title changes color.

**Sources**: AIOX (article cards: scale 1.05, 500ms)

**Code Pattern**:

```css
.article-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: border-color 0.3s ease;
}
.article-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
}
.article-card:hover .article-image {
  transform: scale(1.05);
  transition: transform 500ms ease;
}
.article-card:hover .article-title {
  color: var(--accent-gold);
}
```

**Adaptation for Reis IA**: For case study cards and blog post previews. Keep scale at 1.05 and overflow hidden on parent.

**Priority**: MEDIUM

---

### 2.6 Button Fill Sweep

**Description**: A color fill sweeps across the button from left to right on hover, with text color transitioning.

**Sources**: Stripe (translateX(-100%) to translateX(0), 0.3s)

**Code Pattern**:

```css
.btn-sweep {
  position: relative;
  overflow: hidden;
  transition: color 0.15s ease-out;
  z-index: 1;
}
.btn-sweep::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--accent-gold);
  transform: translateX(-100%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
.btn-sweep:hover::after {
  transform: translateX(0);
}
.btn-sweep:hover {
  color: #000;
}
```

**Adaptation for Reis IA**: Gold fill sweeping in from left. Text transitions from white/gold to black as fill arrives. Premium button effect for primary CTAs.

**Priority**: MEDIUM

---

### 2.7 Button Lift on Hover

**Description**: Button translates upward slightly on hover, creating a "lifting" sensation.

**Sources**: Academia Lendaria (-4px for primary, -2px for secondary)

**Code Pattern**:

```css
.btn-lift {
  transition: transform 0.3s ease;
}
.btn-lift:hover {
  transform: translateY(-4px);
}
```

**Adaptation for Reis IA**: Use -2px for subtle lift on secondary buttons. -4px for primary CTA. Combine with gold glow shadow for premium feel.

**Priority**: MEDIUM

---

### 2.8 Card Inset Border on Hover

**Description**: Instead of changing border-color (which can cause layout shift), use inset box-shadow to create a border-like effect on hover.

**Sources**: AIOX (inset 0 0 0 1px var(--bb-accent-15))

**Code Pattern**:

```css
.card {
  border: 1px solid rgba(156, 156, 156, 0.15);
  transition: box-shadow 0.2s ease;
}
.card:hover {
  box-shadow: inset 0 0 0 1px rgba(212, 175, 55, 0.15);
}
```

**Adaptation for Reis IA**: Cleaner than changing border-color because it avoids any potential layout reflow. Use gold accent at 15-20% opacity.

**Priority**: MEDIUM

---

### 2.9 Link Hover Arrow Animation

**Description**: Arrow icon shifts right and arrow line extends on hover.

**Sources**: Stripe (translateX(3px), 0.15s), Apple (translateX(4px), 0.3s)

**Code Pattern**:

```css
.link-arrow svg {
  transition: transform 0.15s ease-out;
}
.link-arrow:hover svg {
  transform: translateX(3px);
}
```

**Adaptation for Reis IA**: Apply to all "Learn more" and "Book call" CTAs. 3px shift at 150ms is the Stripe standard.

**Priority**: HIGH

---

### 2.10 Ticker/Marquee Hover Slowdown

**Description**: Continuous horizontal scroll of items that slows or pauses on hover for readability.

**Sources**: Stripe (45s normal / 90s hover), AIOX (30s, pauses), Academia Lendaria (40s, pauses)

**Code Pattern**:

```css
.ticker-track {
  display: flex;
  animation: ticker 30s linear infinite;
}
.ticker-track:hover {
  animation-play-state: paused;
  /* OR: animation-duration: 60s; for slowdown instead of pause */
}

@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

**Adaptation for Reis IA**: Use for partner/technology logos. Content duplicated 2x for seamless loop. Add edge fade masks with gradient. Pause on hover for readability.

**Priority**: HIGH

---

### 2.11 Porsche Image Scale (GPU-Accelerated)

**Description**: Images scale up using scale3d for GPU acceleration on hover. Subtle 1.05 factor.

**Sources**: Porsche (scale3d(1.05, 1.05, 1.05))

**Code Pattern**:

```css
.image-hover img {
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  will-change: transform;
}
.image-hover:hover img {
  transform: scale3d(1.05, 1.05, 1.05);
}
```

**Adaptation for Reis IA**: Use scale3d instead of scale for GPU compositing. Apply to case study hero images.

**Priority**: MEDIUM

---

### 2.12 Link Background Tint on Hover

**Description**: Links get a subtle semi-transparent background tint on hover instead of underline.

**Sources**: Porsche (#9495992e)

**Code Pattern**:

```css
.link-tint {
  padding: 2px 4px;
  margin: -2px -4px;
  border-radius: 4px;
  transition: background-color 0.25s ease;
}
.link-tint:hover {
  background-color: rgba(212, 175, 55, 0.08);
}
```

**Adaptation for Reis IA**: More refined than underline for inline links. Use gold-tinted background.

**Priority**: LOW

---

## 3. Click Interactions

### 3.1 Click-to-Replay Animation

**Description**: Click a card to remount the animation component, causing it to play from the start. Uses React key change.

**Sources**: AIOX (motion showcase page)

**Code Pattern (React island)**:

```tsx
export function ReplayableDemo({ children, label }: { children: React.ReactNode; label: string }) {
  const [key, setKey] = useState(0);

  return (
    <div onClick={() => setKey(prev => prev + 1)} className="cursor-pointer group relative">
      <div key={key}>{children}</div>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 group-hover:text-white/50 transition-colors">
        {label}
      </span>
    </div>
  );
}
```

**Adaptation for Reis IA**: For design system preview page or interactive demos. Key change forces remount, restarting CSS animations.

**Priority**: LOW

---

### 3.2 Accordion with Plus-to-X Toggle

**Description**: FAQ accordion where Plus icon rotates 45deg to become X when section opens. Content height animates.

**Sources**: AIOX (rotate-45), Morningside (rotate -90deg)

**Code Pattern**:

```css
.accordion-icon {
  transition: transform 0.3s ease;
}
.accordion-item.is-open .accordion-icon {
  transform: rotate(45deg);
}
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}
.accordion-item.is-open .accordion-content {
  opacity: 1;
  /* max-height set via JS: content.style.maxHeight = content.scrollHeight + 'px' */
}
```

```javascript
document.querySelectorAll('.accordion-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.accordion-item');
    const content = item.querySelector('.accordion-content');
    const isOpen = item.classList.contains('is-open');

    // Close all others (single-open mode)
    document.querySelectorAll('.accordion-item.is-open').forEach(open => {
      open.classList.remove('is-open');
      open.querySelector('.accordion-content').style.maxHeight = '0';
    });

    if (!isOpen) {
      item.classList.add('is-open');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
```

**Adaptation for Reis IA**: Direct use for FAQ sections. Add Morningside-style gradient background on open state. Use gold accent for the icon color change.

**Priority**: HIGH

---

### 3.3 Copy-to-Clipboard with Feedback

**Description**: Click a code value to copy it, with visual feedback (icon swap from Copy to Check).

**Sources**: AIOX (inferred from token pages)

**Code Pattern (React island)**:

```tsx
export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="p-1.5 rounded text-white/40 hover:text-white hover:bg-white/5 transition-colors">
      {copied ? '✓' : '⎘'}
    </button>
  );
}
```

**Adaptation for Reis IA**: For code examples, email templates, or contact information. The 2s timeout for feedback is standard.

**Priority**: LOW

---

### 3.4 Tab Switching with Animated Indicator

**Description**: Tabs with a sliding underline indicator that animates between active tabs.

**Sources**: AIOX (Framer Motion layoutId), Morningside (tab navigation with translateX)

**Code Pattern**:

```css
.tab-container {
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.tab-indicator {
  position: absolute;
  bottom: 0;
  height: 2px;
  background: var(--accent-gold);
  transition: left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
              width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

```javascript
const tabs = document.querySelectorAll('.tab-btn');
const indicator = document.querySelector('.tab-indicator');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    indicator.style.left = `${tab.offsetLeft}px`;
    indicator.style.width = `${tab.offsetWidth}px`;
  });
});
```

**Adaptation for Reis IA**: The spring easing on the indicator creates a lively feel. Use for methodology steps or pillar navigation.

**Priority**: MEDIUM

---

### 3.5 Theme Toggle

**Description**: Toggle between theme variants with CSS custom property transitions.

**Sources**: AIOX (Lime/Gold data-theme attribute)

**Code Pattern**:

```css
@property --accent {
  syntax: '<color>';
  inherits: true;
  initial-value: #d4af37;
}

:root {
  --accent: #d4af37;
  --surface: #000;
  transition: --accent 0.3s ease;
}

[data-theme="gold"] { --accent: #d4af37; }
[data-theme="silver"] { --accent: #c0c0c0; }
```

**Adaptation for Reis IA**: Not immediately needed. Could be useful for a "light mode" toggle in the future. Note: `@property` registration required for custom property transitions.

**Priority**: LOW

---

### 3.6 Segmented Control (Pill Selector)

**Description**: Compact single-choice selector where active option gets filled background.

**Sources**: AIOX (SegmentedControl component)

**Code Pattern**:

```html
<div class="inline-flex rounded-lg border border-white/10 overflow-hidden">
  <button class="px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors bg-[var(--accent-gold)] text-black">
    Option A
  </button>
  <button class="px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors text-white/40 hover:bg-white/5">
    Option B
  </button>
</div>
```

**Adaptation for Reis IA**: For filtering content (e.g., case study categories) or toggling views.

**Priority**: LOW

---

## 4. Layout Patterns for Showcases

### 4.1 Hairline Grid (gap-px)

**Description**: Grid where 1px gap reveals the parent background as divider lines. Creates elegant technical grid.

**Sources**: AIOX (most-used grid pattern)

```css
.hairline-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  overflow: hidden;
}
.hairline-grid > * {
  background: #000;
  padding: 24px;
}
```

**Priority**: HIGH

---

### 4.2 Bento Grid with Spanning Items

**Description**: Magazine-style grid where some items span multiple columns/rows.

**Sources**: AIOX (12-column bento), Stripe (feature grid)

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(240px, auto);
  gap: 1px;
  background: rgba(255, 255, 255, 0.06);
}
.span-full { grid-column: span 12; }
.span-8 { grid-column: span 8; }
.span-6 { grid-column: span 6; }
.span-4 { grid-column: span 4; }

@media (max-width: 768px) {
  .span-8, .span-6, .span-4 { grid-column: span 12; }
}
```

**Priority**: MEDIUM

---

### 4.3 Staircase Layout

**Description**: Items offset progressively, creating a descending visual.

**Sources**: AIOX (How It Works section, marginTop: i * 50px)

```css
/* Via CSS custom property */
.staircase-item {
  margin-top: calc(var(--index, 0) * 50px);
}

/* Disable on mobile */
@media (max-width: 768px) {
  .staircase-item { margin-top: 24px; }
}
```

**Priority**: MEDIUM

---

### 4.4 Dark/Light Section Alternation

**Description**: Sections alternate background colors for visual rhythm.

**Sources**: AIOX (19 sections alternating dark/light), Apple (#fff / #f5f5f7 / #000), Stripe (#fff / #f6f9fc)

```css
.section[data-variant="dark"] { background: #000; color: #fff; }
.section[data-variant="darker"] { background: #0A0A0A; color: #fff; }
/* For Reis IA dark-mode: alternate #000 and #0A0A0A */
```

**Priority**: HIGH

---

### 4.5 Auto-Fit Responsive Grid

**Description**: Grid that adjusts column count based on available width without media queries.

**Sources**: AIOX, Apple

```css
.auto-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
.auto-grid-tight { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
.auto-grid-wide { grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); }
```

**Priority**: HIGH

---

### 4.6 Code + Preview Side-by-Side

**Description**: Left shows rendered component, right shows code.

**Sources**: AIOX, Stripe docs

```css
.code-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
}
@media (max-width: 768px) {
  .code-preview { grid-template-columns: 1fr; }
}
```

**Priority**: LOW

---

### 4.7 Asymmetric Split Grid

**Description**: Content + media in unequal columns (40/60 or text/full-bleed-image).

**Sources**: AIOX, Apple

```css
.split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.split-grid--weighted { grid-template-columns: 2fr 3fr; }
@media (max-width: 768px) { .split-grid { grid-template-columns: 1fr; } }
```

**Priority**: MEDIUM

---

### 4.8 Content Width Hierarchy

**Description**: Different max-widths for different content types for optimal reading.

**Sources**: AIOX, Apple (680px body copy), Stripe (1080px content)

```css
.container-page    { max-width: 1200px; margin: 0 auto; padding: 0 clamp(1rem, 3vw, 2rem); }
.container-content { max-width: 800px; }
.container-text    { max-width: 640px; }
.container-narrow  { max-width: 480px; }
```

**Priority**: HIGH

---

### 4.9 Numbered Section Labels

**Description**: Sections have monospace numbered labels creating an indexed catalog feel.

**Sources**: AIOX ([01] section_name pattern)

```html
<div class="mb-14 flex items-center gap-2">
  <span class="font-mono text-xs tracking-widest text-[var(--accent-gold)]">[01]</span>
  <span class="font-mono text-xs tracking-widest text-white/40 uppercase">section_name_</span>
</div>
```

**Priority**: MEDIUM

---

### 4.10 Feature Grid with Named Areas (Linear)

**Description**: CSS Grid with named template areas for semantic layout control.

**Sources**: Linear

```css
.feature-grid {
  display: grid;
  grid-template-areas: "a a a a b b b b";
  gap: 16px;
}
@media (max-width: 768px) {
  .feature-grid { grid-template-areas: "a a a a" "b b b b"; }
}
.feature-primary { grid-area: a; }
.feature-secondary { grid-area: b; }
```

**Priority**: LOW

---

## 5. Token Visualization Techniques

### 5.1 Color Swatch Grid with Hairline Dividers

**Sources**: AIOX
**Priority**: LOW (design system internal tooling)

### 5.2 Accent Opacity Ladder

**Sources**: AIOX (14 steps from 2% to 90%)
**Priority**: LOW

### 5.3 Typography Scale Showcase

**Sources**: AIOX, Linear
**Priority**: LOW

### 5.4 Spacing Scale Visual Ruler

**Sources**: AIOX
**Priority**: LOW

### 5.5 Shadow/Glow Comparison Cards

**Sources**: Stripe, Morningside, AIOX
**Priority**: LOW

### 5.6 Easing Curve Visualizer

**Sources**: Stripe, AIOX
**Priority**: LOW

### 5.7 Border Radius Scale Display

**Sources**: AIOX
**Priority**: LOW

---

## 6. Component Demo Techniques

### 6.1 Variant Matrix Grid

**Sources**: AIOX (buttons: variant x state grid)
**Priority**: LOW

### 6.2 Interactive State Toggler (React Island)

**Sources**: Conceptual (AIOX click-to-replay + state buttons)
**Priority**: LOW

### 6.3 Size Comparison Row

**Sources**: AIOX (button/spinner sizes side by side)
**Priority**: LOW

### 6.4 Contained Scroll Demo Area

**Sources**: Conceptual (fixed-height container with internal scroll)
**Priority**: LOW

### 6.5 Hover Effect Comparison Board

**Sources**: Stripe, Morningside, AIOX
**Priority**: LOW

---

## 7. Background Effects

### 7.1 Film Grain Texture (SVG Noise)

**Description**: SVG fractalNoise overlay at low opacity adds analog warmth to dark surfaces.

**Sources**: AIOX (4 levels: 5-25%), Morningside (grainy.png), Academia Lendaria

**Code Pattern**:

```css
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.04;
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
```

**Adaptation for Reis IA**: Use at 0.03-0.04 opacity on hero and key dark sections. Adds premium texture without visual noise.

**Priority**: HIGH

---

### 7.2 Rotating Conic Gradient Border

**Description**: Cards with animated borders using @property for angle animation and conic-gradient.

**Sources**: Academia Lendaria (6.4s, linear, infinite)

**Code Pattern**:

```css
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

.rotating-border {
  background:
    linear-gradient(135deg, #0a0a0a 0%, #000 100%) padding-box,
    conic-gradient(from var(--border-angle), #1a1400 80%, #d4af37 86%, #d4af37 90%, #d4af37 94%, #1a1400) border-box;
  border: 1px solid transparent;
  border-radius: 16px;
  animation: rotateBorder 6.4s linear infinite;
}

@keyframes rotateBorder {
  to { --border-angle: 360deg; }
}
```

**Adaptation for Reis IA**: Replace gray tones with gold (#d4af37). Use on 1-2 signature cards only (hero CTA card or methodology card).

**Priority**: MEDIUM

---

### 7.3 Vignette Overlay

**Description**: Radial gradient creating darkened edges, focusing attention on center content.

**Sources**: AIOX

```css
.vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.5) 100%);
  pointer-events: none;
}
```

**Priority**: MEDIUM

---

### 7.4 Edge Fade

**Description**: Linear gradient fading content at top and bottom edges.

**Sources**: AIOX, Linear

```css
.edge-fade::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%);
  pointer-events: none;
}
```

**Priority**: MEDIUM

---

### 7.5 Dot Grid Pattern

**Description**: Subtle dot pattern at low opacity as background texture.

**Sources**: AIOX (16px spacing)

```css
.dot-grid {
  background-image: radial-gradient(circle, rgba(212, 175, 55, 0.15) 1px, transparent 1px);
  background-size: 16px 16px;
}
```

**Priority**: MEDIUM

---

### 7.6 Glassmorphism Panel

**Description**: Frosted glass effect using backdrop-filter with semi-transparent background.

**Sources**: AIOX, Apple, Porsche, Morningside, Academia Lendaria

```css
.glass-panel {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

**Priority**: HIGH

---

### 7.7 Radial Glow Behind Content

**Description**: Large ambient glow centered behind content areas.

**Sources**: Linear, Apple

```css
.radial-glow::before {
  content: "";
  position: absolute;
  width: 800px;
  height: 800px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 70%);
  filter: blur(50px);
  pointer-events: none;
}
```

**Priority**: MEDIUM

---

### 7.8 Gradient Mesh / Wave Background

**Description**: Flowing organic gradient mesh behind hero sections.

**Sources**: Stripe (signature element)

**Adaptation for Reis IA**: Too strongly associated with Stripe. Use subtle geometric grid patterns or minimal gradient washes with gold/amber instead.

**Priority**: LOW (SKIP -- too Stripe-specific)

---

### 7.9 HUD Bracket Frame Corners

**Description**: Corner brackets using pseudo-elements, creating a "targeting" or "precision" frame.

**Sources**: AIOX (frame-bracket pattern)

```css
.frame-bracket { position: relative; }
.frame-bracket::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 20px; height: 20px;
  border-top: 1px solid var(--accent-gold);
  border-left: 1px solid var(--accent-gold);
}
.frame-bracket::after {
  content: "";
  position: absolute;
  bottom: 0; right: 0;
  width: 20px; height: 20px;
  border-bottom: 1px solid var(--accent-gold);
  border-right: 1px solid var(--accent-gold);
}
```

**Adaptation for Reis IA**: Replace lime with gold. Use on hero headline or key feature card to add geometric precision. Aligns with minimal geometric aesthetic.

**Priority**: MEDIUM

---

### 7.10 Scanlines Overlay (for specific sections)

**Description**: CRT-inspired horizontal lines overlay at very low opacity.

**Sources**: AIOX

**Adaptation for Reis IA**: SKIP -- too retro/gaming for Apple-level premium aesthetic.

**Priority**: LOW (SKIP)

---

## 8. Text Effects

### 8.1 Gradient Text Shimmer

**Description**: Text with gradient background-clip that slowly shifts position, creating an imperceptible shimmer.

**Sources**: Academia Lendaria (13s, white-to-gray), Stripe (knockout text with mask), Linear (gradient 3s)

**Code Pattern**:

```css
.shimmer-text {
  background: linear-gradient(110deg, #fff 0% 40%, rgba(212, 175, 55, 0.7) 50%, #fff 60% 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 13s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { background-position: 200% 0; }
  30% { background-position: -200% 0; }
}
```

**Adaptation for Reis IA**: Use white-to-gold shimmer on hero headline. The 13s duration creates an almost imperceptible effect that draws the eye subconsciously. Never use fast shimmer (<5s).

**Priority**: HIGH

---

### 8.2 Knockout Text Reveal (Mask Animation)

**Description**: Large headline with animated gradient mask that sweeps across, revealing gradient fill.

**Sources**: Stripe Enterprise

```css
.knockout-text {
  background: linear-gradient(145deg, #000, #1a1400 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-mask-image: linear-gradient(45deg, transparent, #000 20%, #000 60%, transparent 80%);
  -webkit-mask-position: -20%;
  animation: knockoutReveal 1s ease-out forwards;
}

@keyframes knockoutReveal {
  from { -webkit-mask-position: -20%; }
  to { -webkit-mask-position: 50%; }
}
```

**Adaptation for Reis IA**: Use gold/amber tones in the gradient. Apply only to hero headline. 1s ease-out on page load.

**Priority**: MEDIUM

---

### 8.3 Stagger Letter Reveal

**Description**: Each letter of a word animates in individually with slight delays.

**Sources**: AIOX (spring physics + rotateX 3D, 0.06 stagger per letter)

**Code Pattern (React island)**:

```tsx
export function StaggerText({ text, className }: { text: string; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 60}ms, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 60}ms`,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
```

**Adaptation for Reis IA**: Use for the brand name "Reis IA" in the hero. Spring easing creates lively feel. 60ms stagger is tight enough to feel cohesive.

**Priority**: MEDIUM

---

### 8.4 Counter Animation (Number Ticker)

**Description**: Numbers count up from 0 to target value. See Section 1.8.

**Sources**: AIOX, Academia Lendaria

**Priority**: HIGH (documented in Section 1.8)

---

### 8.5 Gradient Text (Static)

**Description**: Text with gradient fill via background-clip. No animation.

**Sources**: Linear (purple-pink shimmer), Stripe (rainbow gradient)

```css
.gradient-text {
  background: linear-gradient(135deg, #d4af37, #fff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Adaptation for Reis IA**: Use gold-to-white gradient on accent text. Apply sparingly (one word or phrase per section max).

**Priority**: MEDIUM

---

### 8.6 Animated Gradient Stroke / Divider

**Description**: A decorative line with animated gradient that shifts colors along its length.

**Sources**: Stripe

```css
.gradient-divider {
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-gold), transparent);
  background-size: 200% 100%;
  animation: gradientShift 8s linear infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```

**Adaptation for Reis IA**: Use as section divider. Gold accent, 8s duration for slow, refined motion.

**Priority**: LOW

---

## 9. Navigation Patterns

### 9.1 Frosted Glass Nav on Scroll

**Description**: Navigation starts transparent, gains frosted glass effect on scroll.

**Sources**: Morningside, Apple, Porsche, Academia Lendaria

```css
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}
.nav.scrolled {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

```javascript
function handleScroll() {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 10) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleScroll, { passive: true });
```

**Priority**: HIGH

---

### 9.2 Logo Simplification on Scroll

**Description**: Logo transitions from full text to icon-only when nav enters scrolled state.

**Sources**: Morningside (SVG path opacity 1 -> 0)

```css
.nav-logo-text {
  transition: opacity 0.3s ease;
}
.nav.scrolled .nav-logo-text {
  opacity: 0;
}
```

**Priority**: MEDIUM

---

### 9.3 Mobile Menu Panel Slide

**Description**: Full-screen mobile menu slides down with staggered content delay.

**Sources**: Stripe (240ms, cubic-bezier(0.45, 0.05, 0.55, 0.95)), AIOX (fullscreen overlay)

```css
.mobile-menu {
  transform: translateY(-100%);
  transition: transform 240ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
.mobile-menu.is-open {
  transform: translateY(0);
}
.mobile-menu-backdrop {
  opacity: 0;
  transition: opacity 240ms cubic-bezier(0.45, 0.05, 0.55, 0.95);
}
.mobile-menu-backdrop.is-visible {
  opacity: 1;
}
```

**Priority**: HIGH

---

### 9.4 Sidebar Collapse Toggle

**Description**: Sidebar transitions between expanded (240px) and collapsed (60px, icon-only) modes.

**Sources**: AIOX (240px -> 60px, 300ms)

**Priority**: LOW (not needed for marketing site)

---

### 9.5 Cmd+K Search Modal

**Description**: Quick search modal triggered by keyboard shortcut.

**Sources**: AIOX

**Priority**: LOW (not needed for marketing site)

---

### 9.6 Bottom Bar (Mobile)

**Description**: Fixed bottom navigation for mobile with icon + label.

**Sources**: AIOX

**Priority**: LOW (not needed for marketing site)

---

### 9.7 Breadcrumb Navigation

**Description**: Hierarchical path navigation for deep pages.

**Sources**: Apple, Porsche

**Priority**: LOW

---

## 10. Transition Techniques

### 10.1 CSS Custom Property Animation System

**Description**: Complete animation system using CSS custom properties for durations and easing, with prefers-reduced-motion support.

**Sources**: All references (synthesized best practices)

```css
:root {
  /* Durations */
  --dur-instant: 100ms;
  --dur-fast: 150ms;
  --dur-normal: 250ms;
  --dur-slow: 500ms;
  --dur-slower: 700ms;
  --dur-slowest: 1000ms;

  /* Easing */
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);       /* Porsche/AIOX base */
  --ease-in-out: cubic-bezier(0.45, 0.05, 0.55, 0.95);    /* Stripe symmetric */
  --ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);         /* Stripe hover */
  --ease-out-expo: cubic-bezier(0.7, 0, 0, 1);             /* Stripe card hover */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);        /* AIOX bouncy */
  --ease-dramatic: cubic-bezier(0.16, 1, 0.3, 1);          /* Apple/AIOX hero */

  /* Reveal */
  --reveal-distance: 20px;
  --reveal-duration: 0.6s;
  --stagger-delay: 80ms;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --dur-instant: 1ms;
    --dur-fast: 1ms;
    --dur-normal: 1ms;
    --dur-slow: 1ms;
    --dur-slower: 1ms;
    --dur-slowest: 1ms;
    --reveal-distance: 0px;
  }
}
```

**Priority**: HIGH (foundation for entire motion system)

---

### 10.2 Hardware-Aware Animation Toggle

**Description**: Check CPU core count to enable/disable enhanced animations.

**Sources**: Linear (navigator.hardwareConcurrency > 4)

```javascript
const isHighPerf = navigator.hardwareConcurrency > 4
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (isHighPerf) {
  document.documentElement.classList.add('enhanced');
}
```

```css
/* Only show complex animations on capable hardware */
.enhanced .perspective-reveal {
  transform: translateY(150px) rotateX(15deg);
}
/* Fallback: simple fade-up */
:not(.enhanced) .perspective-reveal {
  transform: translateY(20px);
}
```

**Priority**: HIGH (progressive enhancement)

---

### 10.3 Loading State Opacity Gate

**Description**: Hide content until JS removes loading attribute, then fade in.

**Sources**: Stripe (data-loading attribute)

```css
[data-loading] .content { opacity: 0; }
:not([data-loading]) .content {
  opacity: 1;
  transition: opacity 0.3s ease;
}
```

**Priority**: MEDIUM

---

### 10.4 Marquee / Ticker Edge Masks

**Description**: Gradient masks on marquee edges for seamless visual fading.

**Sources**: AIOX, Stripe, Academia Lendaria

```css
.marquee-container {
  -webkit-mask-image: linear-gradient(to right, transparent 2%, black 12%, black 88%, transparent 98%);
  mask-image: linear-gradient(to right, transparent 2%, black 12%, black 88%, transparent 98%);
}
```

**Priority**: HIGH (required for any ticker/marquee)

---

### 10.5 Fluid Typography via clamp()

**Description**: Typography that scales fluidly without media query jumps.

**Sources**: Porsche, Academia Lendaria, AIOX

```css
.hero-headline {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  font-weight: 700;
}
```

**Priority**: HIGH

---

### 10.6 Porsche Line-Height Formula

**Description**: Single formula that scales line-height proportionally across all text sizes.

**Sources**: Porsche

```css
/* calc(6px + 2.125ex) */
/* Results: small text ~1.65, medium ~1.45, large ~1.3 */
```

**Priority**: MEDIUM (test with Inter first)

---

### 10.7 Container Query Responsive Cards

**Description**: Cards respond to their container width, not viewport width.

**Sources**: Vercel

```css
.card-container { container-type: inline-size; }
@container (min-width: 400px) {
  .card-content { flex-direction: row; }
}
```

**Priority**: MEDIUM

---

### 10.8 Selection Styling

**Description**: Custom text selection color matching brand accent.

**Sources**: Morningside, Linear

```css
::selection { background: rgba(212, 175, 55, 0.3); color: #fff; }
::-moz-selection { background: rgba(212, 175, 55, 0.3); color: #fff; }
```

**Priority**: MEDIUM

---

### 10.9 Custom Scrollbar

**Description**: Thin scrollbar matching dark theme.

**Sources**: Porsche, Academia Lendaria

```css
html {
  scrollbar-width: thin;
  scrollbar-color: rgba(212, 175, 55, 0.3) transparent;
}
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
}
```

**Priority**: MEDIUM

---

### 10.10 Root Isolation for Stacking Context

**Description**: Prevents z-index conflicts by creating new stacking context at root.

**Sources**: Linear

```css
html { isolation: isolate; }
```

**Priority**: HIGH (prevents z-index hell)

---

## Summary: Priority Implementation Order

### Phase 1 -- Immediate (must-have baseline)

1. CSS Custom Property Animation System (10.1) -- foundation
2. Fade-Up Scroll Reveal + Staggered Children (1.1, 1.2)
3. Frosted Glass Nav on Scroll (9.1)
4. Film Grain Texture (7.1)
5. Gradient Border Glow on Hover (2.2)
6. Card Scale + Shadow Elevation (2.1)
7. Arrow Reveal on Card Hover (2.3)
8. Accordion with Plus-to-X Toggle (3.2)
9. Ticker/Marquee with Hover Pause (2.10) + Edge Masks (10.4)
10. Hardware-Aware Animation Toggle (10.2)
11. prefers-reduced-motion Support (built into 10.1)

### Phase 2 -- Enhancement

12. Gradient Text Shimmer (8.1) -- hero headline
13. Counter Animation (1.8) -- stats/metrics
14. Scale Reveal for Media (1.3)
15. Button Fill Sweep (2.6) -- primary CTA
16. Mobile Menu Panel Slide (9.3)
17. Glassmorphism Panel (7.6) -- nav, modals
18. Dark/Light Section Alternation (4.4)
19. Hairline Grid (4.1)
20. Content Width Hierarchy (4.8)
21. Fluid Typography (10.5)

### Phase 3 -- Polish

22. 3D Perspective Entrance (1.4) -- hero only
23. Rotating Conic Gradient Border (7.2) -- 1-2 signature cards
24. Sticky Section with Scroll Progress (1.5) -- methodology
25. HUD Bracket Frame Corners (7.9)
26. Tab Switching with Indicator (3.4)
27. Stagger Letter Reveal (8.3) -- brand name
28. Knockout Text Reveal (8.2)
29. Numbered Section Labels (4.9)

### Skip for Reis IA

- Scanlines/CRT effects -- too retro
- Hazard stripes / circuit traces -- too industrial
- Gradient mesh (Stripe) -- too closely associated with Stripe
- Video scroll scrubbing -- too bandwidth-heavy for consultancy
- Image sequence on canvas -- same reason
- Complex dot grid animations (Linear) -- too SaaS
- Pricing toggle / ROI calculator -- no SaaS patterns
- Dashboard shells -- product UI, not marketing

---

## Cross-Reference: Technique Source Map

| Technique Category | AIOX | Stripe | Linear | Apple | Porsche | Acad. Lend. | Ag. Lend. | Morningside |
|-------------------|------|--------|--------|-------|---------|-------------|-----------|-------------|
| Scroll reveals | Yes | Yes | Yes | Yes | -- | Yes | -- | -- |
| Hover effects | Yes | Yes | -- | Yes | Yes | Yes | -- | Yes |
| Click replay | Yes | -- | -- | -- | -- | -- | -- | -- |
| Gradient borders | -- | -- | -- | -- | -- | Yes | -- | Yes |
| Glass effects | Yes | Yes | -- | Yes | Yes | Yes | -- | Yes |
| Film grain | Yes | -- | -- | -- | -- | -- | -- | Yes |
| Text shimmer | -- | Yes | Yes | -- | -- | Yes | -- | -- |
| Ticker/marquee | Yes | Yes | -- | -- | -- | Yes | -- | Yes |
| Sticky sections | -- | Yes | -- | Yes | -- | -- | -- | -- |
| 3D perspective | -- | -- | -- | -- | -- | Yes | -- | -- |
| Nav glassmorphism | -- | -- | -- | Yes | Yes | Yes | -- | Yes |
| Custom easing | Yes | Yes | Yes | Yes | Yes | Yes | -- | -- |
| Responsive fluid | -- | -- | Yes | Yes | Yes | Yes | -- | -- |

Total unique techniques across all 8 active references: **87**
(Agencia Lendaria contributed 0 unique techniques -- standard WordPress/Elementor build)
