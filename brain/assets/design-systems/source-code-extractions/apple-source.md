# Apple Source Code Extraction — Animation & Interactive Patterns

Last updated: 2026-03-17
Source: https://www.apple.com, https://www.apple.com/macbook-pro/, https://www.apple.com/iphone/, https://www.apple.com/apple-vision-pro/
Pages analyzed: 4 (homepage, MacBook Pro, iPhone, Vision Pro)
Extraction method: WebFetch + CSS-Tricks reference implementation analysis
Limitation: Apple externalizes all CSS/JS in versioned CDN bundles that are not directly fetchable. This extraction combines what was available from page source with documented Apple animation techniques from reference implementations.

---

## TABLE OF CONTENTS

1. [Typography System](#1-typography-system)
2. [Scroll-Linked Image Sequence Animation (Apple's Signature)](#2-scroll-linked-image-sequence-animation)
3. [Sticky Section Scroll Pattern](#3-sticky-section-scroll-pattern)
4. [Parallax Scroll Techniques](#4-parallax-scroll-techniques)
5. [Typography Reveal on Scroll](#5-typography-reveal-on-scroll)
6. [Section Transition Patterns](#6-section-transition-patterns)
7. [Video Scroll Playback](#7-video-scroll-playback)
8. [IntersectionObserver Animation Triggers](#8-intersectionobserver-animation-triggers)
9. [Global Navigation Pattern](#9-global-navigation-pattern)
10. [Layout System](#10-layout-system)
11. [Color System](#11-color-system)
12. [Hero Section Patterns](#12-hero-section-patterns)
13. [Performance Optimization Patterns](#13-performance-optimization-patterns)
14. [Reis IA Cross-Reference](#14-reis-ia-cross-reference)

---

## 1. TYPOGRAPHY SYSTEM

### Font Stack

```css
font-family: "SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### Responsive Typography Scale (from Apple HIG)

```css
/* Display Headline — Desktop */
.headline-display {
  font-size: 48px;
  font-weight: 600;
  letter-spacing: -0.003em;
  line-height: 1.08365;
}

/* Display Headline — Tablet (max-width: 1068px) */
@media only screen and (max-width: 1068px) {
  .headline-display {
    font-size: 40px;
    letter-spacing: 0;
    line-height: 1.1;
  }
}

/* Display Headline — Mobile (max-width: 735px) */
@media only screen and (max-width: 735px) {
  .headline-display {
    font-size: 32px;
    letter-spacing: 0.004em;
    line-height: 1.125;
  }
}
```

### Apple Product Page Typography Pattern

Apple uses a very specific pattern on product pages: massive hero headlines that decrease in size as sections become more detailed.

```css
/* Hero headline — the largest on the page */
.hero-headline {
  font-size: 96px;        /* Desktop */
  font-weight: 700;
  letter-spacing: -0.015em;
  line-height: 1.0;
  text-align: center;
}

/* Section headline — major feature sections */
.section-headline {
  font-size: 80px;        /* Desktop */
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.05;
}

/* Feature headline — sub-sections */
.feature-headline {
  font-size: 48px;        /* Desktop */
  font-weight: 600;
  letter-spacing: -0.003em;
  line-height: 1.08;
}

/* Body copy */
.body-copy {
  font-size: 21px;
  font-weight: 400;
  letter-spacing: 0.011em;
  line-height: 1.381;
  color: #86868b;  /* Apple's signature gray for body text */
}

/* Eyebrow text above headlines */
.eyebrow {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.003em;
  line-height: 1.17;
  color: #f5f5f7;  /* Apple's signature light gray */
}
```

### Responsive Breakpoints (Apple)

```css
/* Apple's 3-tier responsive system */
@media only screen and (max-width: 1068px) { /* Tablet */ }
@media only screen and (max-width: 735px)  { /* Mobile */ }
@media only screen and (min-width: 1441px) { /* Large desktop */ }
```

### Spacing Pattern (from Apple HIG)

```css
/* Desktop content width */
.content-container {
  max-width: 980px;
  margin: 0 auto;
}

/* Section vertical spacing */
.section {
  padding: 100px 0;  /* Desktop */
  margin: 92px auto 140px auto;
}

/* Tablet */
@media only screen and (max-width: 1068px) {
  .section {
    padding: 80px 0;
    margin: 90px auto 120px auto;
  }
  .content-container {
    max-width: 692px;
  }
}

/* Mobile */
@media only screen and (max-width: 735px) {
  .section {
    padding: 50px 0;
    margin: 45px auto 60px auto;
  }
  .content-container {
    width: 87.5%;
  }
}
```

---

## 2. SCROLL-LINKED IMAGE SEQUENCE ANIMATION

This is Apple's signature technique. A canvas element renders an image sequence frame-by-frame as the user scrolls. Used on AirPods Pro, MacBook Pro, iPhone product pages.

### Complete Implementation

```html
<!-- HTML Structure -->
<section class="scroll-sequence-section">
  <div class="scroll-sequence-sticky">
    <canvas id="hero-sequence"></canvas>
  </div>
</section>
```

```css
/* CSS — The section must be tall enough to provide scroll room */
.scroll-sequence-section {
  height: 500vh;  /* 5x viewport = long scroll range */
  position: relative;
}

.scroll-sequence-sticky {
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

#hero-sequence {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100vh;
  max-width: 100vw;
  /* GPU acceleration */
  will-change: contents;
}
```

```javascript
// JavaScript — Complete scroll-linked image sequence
const canvas = document.getElementById('hero-sequence');
const context = canvas.getContext('2d');
const frameCount = 148; // Total frames in sequence

// Set canvas resolution to match image dimensions
canvas.width = 1920;
canvas.height = 1080;

// Frame path generator — Apple uses zero-padded numbered files
const currentFrame = (index) => {
  return `/media/sequence/large/${index.toString().padStart(4, '0')}.jpg`;
};

// Preload ALL frames for smooth scrubbing
const images = [];
const preloadImages = () => {
  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i + 1);
    images.push(img);
  }
};

// Draw frame to canvas
const updateImage = (index) => {
  if (images[index] && images[index].complete) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[index], 0, 0);
  }
};

// Scroll handler — maps scroll position to frame index
const handleScroll = () => {
  const html = document.documentElement;
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex));
};

// Initialize
preloadImages();
window.addEventListener('scroll', handleScroll, { passive: true });

// Draw first frame immediately
images[0].onload = () => {
  context.drawImage(images[0], 0, 0);
};
```

### Advanced Version — Section-Scoped (Not Full Page)

```javascript
// This version ties the animation to a specific section's scroll range
class ScrollSequenceAnimation {
  constructor(canvas, section, frameCount, framePath) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.section = section;
    this.frameCount = frameCount;
    this.framePath = framePath;
    this.images = [];
    this.currentFrame = 0;
    this.isReady = false;

    this.init();
  }

  init() {
    // Set canvas size
    this.canvas.width = 1920;
    this.canvas.height = 1080;

    // Preload all frames
    let loaded = 0;
    for (let i = 0; i < this.frameCount; i++) {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === this.frameCount) {
          this.isReady = true;
          this.render(0);
        }
      };
      img.src = this.framePath(i);
      this.images.push(img);
    }

    // Bind scroll listener
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    if (!this.isReady) return;

    const rect = this.section.getBoundingClientRect();
    const sectionTop = rect.top;
    const sectionHeight = rect.height - window.innerHeight;

    // Calculate progress within this section (0 to 1)
    const progress = Math.max(0, Math.min(1, -sectionTop / sectionHeight));
    const frameIndex = Math.round(progress * (this.frameCount - 1));

    if (frameIndex !== this.currentFrame) {
      this.currentFrame = frameIndex;
      requestAnimationFrame(() => this.render(frameIndex));
    }
  }

  render(frameIndex) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.images[frameIndex], 0, 0);
  }
}

// Usage
const section = document.querySelector('.scroll-sequence-section');
const canvas = document.querySelector('#hero-sequence');
new ScrollSequenceAnimation(
  canvas,
  section,
  148,
  (i) => `/media/sequence/${(i + 1).toString().padStart(4, '0')}.jpg`
);
```

---

## 3. STICKY SECTION SCROLL PATTERN

Apple uses sticky positioning to keep content pinned while scroll progress drives transformations.

### CSS Implementation

```css
/* The outer container provides the scroll height */
.sticky-section {
  height: 300vh;  /* Tall enough for meaningful scroll range */
  position: relative;
}

/* The inner element sticks to the viewport */
.sticky-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Content inside the sticky frame animates based on scroll */
.sticky-content .text-block {
  opacity: 0;
  transform: translateY(40px);
  transition: none; /* Controlled by JS, not CSS transitions */
  will-change: opacity, transform;
}

.sticky-content .text-block.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Image inside sticky frame — scales on scroll */
.sticky-content .hero-image {
  transform: scale(1.2);
  will-change: transform;
  transition: none; /* JS-driven */
}
```

### JavaScript — Scroll Progress Within Sticky Section

```javascript
class StickyScrollSection {
  constructor(element) {
    this.element = element;
    this.content = element.querySelector('.sticky-content');
    this.textBlocks = element.querySelectorAll('.text-block');
    this.heroImage = element.querySelector('.hero-image');

    this.bindScroll();
  }

  getScrollProgress() {
    const rect = this.element.getBoundingClientRect();
    const sectionTop = rect.top;
    const scrollableHeight = rect.height - window.innerHeight;

    // Returns 0 at section start, 1 at section end
    return Math.max(0, Math.min(1, -sectionTop / scrollableHeight));
  }

  update() {
    const progress = this.getScrollProgress();

    // Text blocks fade in at specific progress points
    this.textBlocks.forEach((block, index) => {
      const blockStart = index * 0.25;  // Each block starts 25% apart
      const blockEnd = blockStart + 0.2;  // Each takes 20% of scroll to animate
      const blockProgress = Math.max(0, Math.min(1,
        (progress - blockStart) / (blockEnd - blockStart)
      ));

      block.style.opacity = blockProgress;
      block.style.transform = `translateY(${40 * (1 - blockProgress)}px)`;
    });

    // Image scales down as user scrolls
    if (this.heroImage) {
      const scale = 1.2 - (0.2 * progress);  // 1.2 → 1.0
      this.heroImage.style.transform = `scale(${scale})`;
    }
  }

  bindScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.update();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}

// Initialize all sticky sections
document.querySelectorAll('.sticky-section').forEach(section => {
  new StickyScrollSection(section);
});
```

---

## 4. PARALLAX SCROLL TECHNIQUES

### CSS-Only Parallax (Simple)

```css
.parallax-container {
  perspective: 1px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.parallax-layer-back {
  transform: translateZ(-1px) scale(2);
}

.parallax-layer-front {
  transform: translateZ(0);
}
```

### JavaScript Parallax (Apple-Style)

```javascript
class ParallaxElement {
  constructor(element, speed = 0.5) {
    this.element = element;
    this.speed = speed;  // 0 = static, 1 = moves with scroll, 0.5 = half speed
    this.offset = 0;

    this.element.style.willChange = 'transform';
    this.bindScroll();
  }

  update() {
    const rect = this.element.parentElement.getBoundingClientRect();
    const windowCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const distanceFromCenter = elementCenter - windowCenter;

    this.offset = distanceFromCenter * this.speed * -1;
    this.element.style.transform = `translate3d(0, ${this.offset}px, 0)`;
  }

  bindScroll() {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.update();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    this.update(); // Initial position
  }
}

// Usage — different speeds for depth layers
new ParallaxElement(document.querySelector('.bg-image'), 0.3);
new ParallaxElement(document.querySelector('.mid-image'), 0.5);
new ParallaxElement(document.querySelector('.fg-text'), 0.8);
```

---

## 5. TYPOGRAPHY REVEAL ON SCROLL

Apple's signature text reveal: words or lines fade in and slide up as user scrolls to them.

### CSS

```css
.scroll-reveal-text {
  opacity: 0;
  transform: translateY(20px);
  will-change: opacity, transform;
}

.scroll-reveal-text.is-revealed {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Staggered reveal for multiple lines */
.scroll-reveal-text:nth-child(1) { transition-delay: 0ms; }
.scroll-reveal-text:nth-child(2) { transition-delay: 100ms; }
.scroll-reveal-text:nth-child(3) { transition-delay: 200ms; }
.scroll-reveal-text:nth-child(4) { transition-delay: 300ms; }
```

### JavaScript — IntersectionObserver

```javascript
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  },
  {
    threshold: 0.15,      // Trigger when 15% visible
    rootMargin: '0px 0px -50px 0px'  // Trigger slightly before fully in view
  }
);

document.querySelectorAll('.scroll-reveal-text').forEach(el => {
  revealObserver.observe(el);
});
```

### Word-by-Word Scroll Reveal (Advanced Apple Pattern)

```javascript
class WordByWordReveal {
  constructor(element) {
    this.element = element;
    this.originalText = element.textContent;
    this.words = this.originalText.split(' ');

    // Wrap each word in a span
    element.innerHTML = this.words.map((word, i) =>
      `<span class="reveal-word" style="
        opacity: 0.15;
        transition: opacity 0.4s ease ${i * 0.05}s;
      ">${word}</span>`
    ).join(' ');

    this.spans = element.querySelectorAll('.reveal-word');
    this.setupObserver();
  }

  setupObserver() {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.reveal();
          observer.unobserve(this.element);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(this.element);
  }

  reveal() {
    this.spans.forEach(span => {
      span.style.opacity = '1';
    });
  }
}

// Progressive opacity on scroll (Apple's "read along" effect)
class ScrollProgressReveal {
  constructor(element) {
    this.element = element;
    this.words = element.textContent.split(' ');

    element.innerHTML = this.words.map(word =>
      `<span class="progress-word" style="opacity: 0.15;">${word}</span>`
    ).join(' ');

    this.spans = [...element.querySelectorAll('.progress-word')];

    window.addEventListener('scroll', () => this.update(), { passive: true });
  }

  update() {
    const rect = this.element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Progress from 0 (just entering bottom) to 1 (at center of viewport)
    const progress = 1 - (rect.top / (viewportHeight * 0.8));
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Number of words that should be fully visible
    const visibleCount = Math.floor(clampedProgress * this.spans.length);

    this.spans.forEach((span, i) => {
      if (i < visibleCount) {
        span.style.opacity = '1';
      } else if (i === visibleCount) {
        // Partial opacity for the transitioning word
        const wordProgress = (clampedProgress * this.spans.length) % 1;
        span.style.opacity = `${0.15 + (wordProgress * 0.85)}`;
      } else {
        span.style.opacity = '0.15';
      }
    });
  }
}
```

---

## 6. SECTION TRANSITION PATTERNS

### Fade-Between Sections (Sticky Crossfade)

```css
.crossfade-section {
  height: 200vh;
  position: relative;
}

.crossfade-panel {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: opacity;
}

.crossfade-panel:nth-child(1) {
  z-index: 1;
}

.crossfade-panel:nth-child(2) {
  z-index: 2;
  opacity: 0;
}
```

```javascript
// Crossfade between two panels based on scroll
class CrossfadeSection {
  constructor(container) {
    this.container = container;
    this.panels = container.querySelectorAll('.crossfade-panel');

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => this.update());
    }, { passive: true });
  }

  update() {
    const rect = this.container.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      -rect.top / (rect.height - window.innerHeight)
    ));

    // First panel fades out, second fades in
    if (this.panels[0]) this.panels[0].style.opacity = 1 - progress;
    if (this.panels[1]) this.panels[1].style.opacity = progress;
  }
}
```

### Scale Zoom Transition

```css
/* Section zooms from small to full size as user scrolls */
.zoom-section {
  height: 300vh;
  position: relative;
}

.zoom-content {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.zoom-element {
  transform: scale(0.8);
  opacity: 0;
  border-radius: 24px;
  overflow: hidden;
  will-change: transform, opacity, border-radius;
}
```

```javascript
class ZoomScrollSection {
  constructor(container) {
    this.container = container;
    this.element = container.querySelector('.zoom-element');

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => this.update());
    }, { passive: true });
  }

  update() {
    const rect = this.container.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1,
      -rect.top / (rect.height - window.innerHeight)
    ));

    // Scale from 0.8 to 1.0
    const scale = 0.8 + (0.2 * this.easeOutCubic(progress));
    // Opacity from 0 to 1
    const opacity = this.easeOutCubic(progress);
    // Border radius from 24px to 0px
    const borderRadius = 24 * (1 - progress);

    this.element.style.transform = `scale(${scale})`;
    this.element.style.opacity = opacity;
    this.element.style.borderRadius = `${borderRadius}px`;
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
}
```

---

## 7. VIDEO SCROLL PLAYBACK

Apple ties video playback position to scroll position.

```javascript
class ScrollVideo {
  constructor(video, section) {
    this.video = video;
    this.section = section;

    // Ensure video is ready
    this.video.pause();
    this.video.preload = 'auto';

    // Wait for metadata
    this.video.addEventListener('loadedmetadata', () => {
      this.duration = this.video.duration;
      this.isReady = true;
    });

    window.addEventListener('scroll', () => {
      if (this.isReady) {
        requestAnimationFrame(() => this.update());
      }
    }, { passive: true });
  }

  update() {
    const rect = this.section.getBoundingClientRect();
    const sectionHeight = rect.height - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

    // Map scroll progress to video time
    const targetTime = progress * this.duration;

    // Only update if significantly different (avoid micro-updates)
    if (Math.abs(this.video.currentTime - targetTime) > 0.05) {
      this.video.currentTime = targetTime;
    }
  }
}

// Usage
const video = document.querySelector('#scroll-video');
const section = document.querySelector('.video-scroll-section');
new ScrollVideo(video, section);
```

```html
<!-- HTML -->
<section class="video-scroll-section" style="height: 400vh;">
  <div style="position: sticky; top: 0; height: 100vh;">
    <video id="scroll-video" muted playsinline preload="auto"
      style="width: 100%; height: 100%; object-fit: cover;">
      <source src="/video/product-reveal.mp4" type="video/mp4">
    </video>
  </div>
</section>
```

---

## 8. INTERSECTIONOBSERVER ANIMATION TRIGGERS

### Standard Apple Pattern

```javascript
// Apple's typical IO configuration for content reveals
const createRevealObserver = (options = {}) => {
  const defaults = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px',
    once: true,
  };
  const config = { ...defaults, ...options };

  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Stagger children animations
          const children = entry.target.querySelectorAll('[data-reveal-child]');
          children.forEach((child, index) => {
            child.style.transitionDelay = `${index * 100}ms`;
            child.classList.add('is-visible');
          });

          if (config.once) {
            observer.unobserve(entry.target);
          }
        } else if (!config.once) {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      threshold: config.threshold,
      rootMargin: config.rootMargin,
    }
  );
};

// Initialize
const observer = createRevealObserver();
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

### Corresponding CSS

```css
/* Base state — hidden */
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* Children inherit stagger delay from JS */
[data-reveal-child] {
  opacity: 0;
  transform: translateY(20px);
}

[data-reveal-child].is-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

---

## 9. GLOBAL NAVIGATION PATTERN

### HTML Structure (from page source)

```html
<nav class="globalnav" aria-label="Global" data-analytics-region="global nav">
  <div class="globalnav-content">
    <div class="globalnav-list">
      <!-- Apple logo -->
      <a href="/" class="globalnav-link-apple" aria-label="Apple">
        <svg class="globalnav-icon-apple"><!-- Apple logo SVG --></svg>
      </a>

      <!-- Navigation links -->
      <div class="globalnav-links">
        <a href="/store/">Store</a>
        <a href="/mac/">Mac</a>
        <a href="/ipad/">iPad</a>
        <a href="/iphone/">iPhone</a>
        <a href="/watch/">Watch</a>
        <a href="/vision/">Vision</a>
        <a href="/airpods/">AirPods</a>
        <a href="/tv-home/">TV & Home</a>
        <a href="/entertainment/">Entertainment</a>
        <a href="/accessories/">Accessories</a>
        <a href="/support/">Support</a>
      </div>

      <!-- Search and Bag -->
      <div class="globalnav-actions">
        <button class="globalnav-link-search" aria-label="Search">
          <svg><!-- Search icon --></svg>
        </button>
        <a class="globalnav-link-bag" href="/us/shop/go/bag" aria-label="Shopping Bag">
          <svg><!-- Bag icon --></svg>
        </a>
      </div>
    </div>
  </div>
</nav>
```

### Navigation CSS Pattern

```css
.globalnav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  height: 44px;
  background-color: rgba(22, 22, 23, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
}

.globalnav-content {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 22px;
}

.globalnav-link {
  font-size: 12px;
  letter-spacing: -0.01em;
  line-height: 44px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.globalnav-link:hover {
  color: #ffffff;
}
```

---

## 10. LAYOUT SYSTEM

### Apple's Container Pattern

```css
/* Primary content container */
.section-content {
  width: 980px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 22px;
}

/* Wide container for hero sections */
.section-content-wide {
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
}

/* Full-bleed sections */
.section-full {
  width: 100%;
  overflow: hidden;
}

@media only screen and (max-width: 1068px) {
  .section-content {
    width: 692px;
  }
}

@media only screen and (max-width: 735px) {
  .section-content {
    width: 87.5%;
    padding: 0;
  }
}
```

### Grid Patterns

```css
/* Product comparison grid (e.g., iPhone lineup) */
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 980px;
  margin: 0 auto;
}

@media only screen and (max-width: 735px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

/* Feature grid (e.g., Mac features) */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media only screen and (max-width: 735px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 11. COLOR SYSTEM

```css
/* Apple's Dark Mode Colors (Product Pages) */
:root {
  /* Backgrounds */
  --apple-bg-primary: #000000;
  --apple-bg-secondary: #1d1d1f;
  --apple-bg-tertiary: #2d2d2f;

  /* Text */
  --apple-text-primary: #f5f5f7;
  --apple-text-secondary: #86868b;
  --apple-text-tertiary: #6e6e73;

  /* Links */
  --apple-link-blue: #2997ff;
  --apple-link-blue-hover: #42a5f5;

  /* Surfaces */
  --apple-surface-card: rgba(255, 255, 255, 0.04);
  --apple-surface-card-hover: rgba(255, 255, 255, 0.08);

  /* Borders */
  --apple-border-subtle: rgba(255, 255, 255, 0.08);
}
```

---

## 12. HERO SECTION PATTERNS

### MacBook Pro Hero (from page source)

```html
<section class="hero-section">
  <div class="hero-content">
    <h1 class="hero-headline">MacBook Pro</h1>
    <p class="hero-subheadline">Fast runs in the family.</p>
    <p class="hero-description">Now with M5, M5 Pro, and M5 Max.</p>
    <div class="hero-cta">
      <a href="/shop/buy-mac/macbook-pro" class="hero-cta-primary">Buy</a>
      <a href="/macbook-pro/" class="hero-cta-secondary">Learn more ></a>
    </div>
  </div>

  <!-- Product image/video below -->
  <div class="hero-media">
    <!-- Canvas for scroll animation or static image -->
  </div>
</section>
```

### iPhone Hero Pattern

```html
<section class="hero-section">
  <h1>iPhone</h1>
  <p>Meet the latest iPhone lineup.</p>
  <div class="hero-actions">
    <a href="/iphone/" class="cta-primary">Learn more</a>
    <a href="/us/shop/goto/buy_iphone" class="cta-secondary">Shop iPhone</a>
  </div>
</section>
```

### CTA Styling

```css
/* Apple's dual CTA pattern */
.cta-primary {
  display: inline-block;
  padding: 12px 24px;
  background-color: #2997ff;
  color: #ffffff;
  font-size: 17px;
  font-weight: 400;
  border-radius: 980px;  /* Pill shape */
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-primary:hover {
  background-color: #42a5f5;
}

.cta-secondary {
  display: inline-block;
  font-size: 21px;
  color: #2997ff;
  text-decoration: none;
}

.cta-secondary:hover {
  text-decoration: underline;
}

.cta-secondary::after {
  content: ' >';
}
```

---

## 13. PERFORMANCE OPTIMIZATION PATTERNS

```css
/* GPU acceleration for animated elements */
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0);  /* Force GPU layer */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* Contain paint for complex sections */
.paint-contained {
  contain: paint;
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```javascript
// Passive scroll listeners (Apple always uses passive: true)
window.addEventListener('scroll', handler, { passive: true });

// requestAnimationFrame throttle pattern
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Do work here
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
```

---

## 14. REIS IA CROSS-REFERENCE

### Patterns to Adopt

| Apple Pattern | Reis IA Adaptation | Priority |
|---|---|---|
| Scroll-linked image sequence | Use for portfolio/case study reveals with canvas animation | HIGH |
| Sticky section + scroll progress | Perfect for "methodology" section on homepage | HIGH |
| Typography reveal on scroll | Apply to hero headlines and section intros with Inter font | HIGH |
| Word-by-word opacity reveal | Use for key value propositions and testimonial quotes | MEDIUM |
| Dual CTA pattern (primary + secondary) | Already similar — refine with Apple's pill radius and transition timing | MEDIUM |
| Section crossfade | Use for "before/after" AI transformation narratives | MEDIUM |
| Video scroll playback | Consider for process demonstration videos | LOW |
| 96px hero headline at 1.0 line-height | Already using similar scale — validate with Inter metrics | LOW |

### Timing Values to Incorporate

| Apple Value | Current Reis IA Value | Recommendation |
|---|---|---|
| `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for reveals | Various | Adopt as `--ease-reveal` for scroll-triggered content |
| 0.6s-0.8s for major transitions | 0.3s-0.6s | Slightly slower for premium feel on major reveals |
| 100ms stagger between children | Not defined | Add to stagger system |
| `rootMargin: '0px 0px -100px 0px'` | Not standardized | Adopt as standard IO trigger point |

### Conflicts to Avoid

- Apple's SF Pro font stack — Reis IA uses Inter exclusively
- Apple's `#2997ff` blue — Reis IA uses `#4A90FF` (close but distinct)
- Apple's full-page scroll sequences (500vh sections) — may be too aggressive for a consultancy site; use 200-300vh max
- Apple's gray body text `#86868b` — Reis IA has its own opacity-based text hierarchy
