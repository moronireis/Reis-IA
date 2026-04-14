# Patterns SEED — REIS [IA] Design Library

Last updated: 2026-04-14
Curated by: orchestrator (initial seed)

This is the opinionated starter catalog. Each pattern is a reusable premium technique, documented with (a) when to use, (b) stack, (c) essential snippet, (d) reference. Agents should read this FIRST before inventing motion from scratch.

As references are extracted into `references/`, new patterns should be split into their own files under `patterns/{category}/{name}.md` and cross-linked from here.

---

## 1. GSAP ScrollTrigger — Parallax Grid (scrubbed)

**Category**: `gsap-scroll-trigger/parallax-grid.md`
**When to use**: Background grid that moves against scroll, creating depth without stealing attention. Foundation of the Tadewald/Asimov aesthetic.
**Stack**: GSAP 3 + ScrollTrigger
**Reference**: Asimov Academy LP (Tadewald), Apple product pages

```js
// Requires gsap and ScrollTrigger registered
gsap.registerPlugin(ScrollTrigger);

gsap.to(".bg-grid", {
  backgroundPosition: "0px 100px",      // grid drifts down as we scroll
  ease: "none",                          // linear, no easing on scrub
  scrollTrigger: {
    trigger: "#hero-trigger",
    start: "top top",                    // fires when section hits top of viewport
    end: "bottom bottom",                // ends when section bottom hits bottom
    scrub: true,                         // ties progress directly to scroll position
  }
});
```

**Why it feels premium**: The grid never animates by itself. It is 1:1 with the user's scroll, which the brain reads as "the world has depth." No timing to get wrong.

---

## 2. GSAP ScrollTrigger — Pinned Section with Scrub Reveal

**Category**: `gsap-scroll-trigger/pinned-reveal.md`
**When to use**: A single hero statement or product demo that must command attention for a full scroll before releasing. Apple iPhone pages, Stripe homepage illustrations.
**Stack**: GSAP 3 + ScrollTrigger

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#pinned-section",
    start: "top top",
    end: "+=2000",                       // pin for 2000px of scroll
    pin: true,                           // section stays fixed
    scrub: 1,                            // 1s catch-up lag (buttery)
    anticipatePin: 1,
  }
});

tl.from(".headline", { opacity: 0, y: 60, duration: 1 })
  .from(".product", { scale: 0.8, opacity: 0, duration: 1 }, 0.3)
  .to(".product", { rotateY: 360, duration: 2 }, 0.5);
```

**Why it feels premium**: The reader cannot scroll past the moment until the storyteller releases them. Used sparingly — one pinned section per page maximum.

---

## 3. Three.js / R3F — 3D Product Spin with Mouse Drag

**Category**: `three-js/product-spin.md`
**When to use**: Hero product demo where the user can inspect from any angle. The Apple "drag to rotate" pattern.
**Stack**: Three.js + React Three Fiber + Drei (@react-three/drei)

```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PresentationControls } from '@react-three/drei';

export function ProductSpin({ modelUrl }) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} intensity={1.2} castShadow />
      <Environment preset="studio" />
      <PresentationControls
        global
        polar={[-Math.PI / 4, Math.PI / 4]}
        azimuth={[-Math.PI / 2, Math.PI / 2]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 300 }}
      >
        {/* <YourModel url={modelUrl} /> */}
      </PresentationControls>
    </Canvas>
  );
}
```

**Why it feels premium**: Studio lighting + spring-physics drag + snap-back creates tactile trust. Feels like the product is real.

---

## 4. Editorial Type Reveal — SplitText Letter-by-Letter

**Category**: `editorial/type-reveal.md`
**When to use**: The one headline that must land. Signature reveal for hero or section intro. Max once per page.
**Stack**: GSAP 3 + SplitText plugin (paid) OR CSS `@property` + custom split fallback

```js
// GSAP SplitText version (cleanest)
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText);

const split = new SplitText(".headline", { type: "chars,words" });
gsap.from(split.chars, {
  opacity: 0,
  y: 40,
  rotateX: -60,
  stagger: 0.025,
  duration: 0.8,
  ease: "power3.out",
});
```

**OSS fallback** (no paid plugin): wrap each character in a `<span>` server-side, apply stagger via CSS `animation-delay: calc(var(--i) * 25ms)`.

**Why it feels premium**: 25ms stagger is the magic number. Faster feels nervous, slower feels slow. Rotation adds physicality.

---

## 5. Magnetic Cursor — Attracts to CTAs

**Category**: `editorial/magnetic-cursor.md`
**When to use**: Premium CTA buttons. Signals that the page is paying attention to the user. Luxury sites and Awwwards winners.
**Stack**: Vanilla JS + CSS transforms

```js
const btn = document.querySelector('.magnetic-cta');
const strength = 0.4;

btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
});

btn.addEventListener('mouseleave', () => {
  btn.style.transform = 'translate(0, 0)';
});
```

```css
.magnetic-cta {
  transition: transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

**Why it feels premium**: The button reaches toward the mouse instead of waiting for the click. Subconscious confidence signal.

---

## 6. Noise Grain Overlay — Film Grain Premium

**Category**: `editorial/noise-grain.md`
**When to use**: Every page. This is the single cheapest upgrade from "web design" to "editorial." The AIOX trick.
**Stack**: Pure CSS + SVG filter

```html
<svg class="grain" width="0" height="0">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0"/>
  </filter>
</svg>

<div class="noise-overlay"></div>
```

```css
.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  filter: url(#noiseFilter);
  mix-blend-mode: overlay;
  opacity: 0.6;
}
```

**Why it feels premium**: Digital surfaces without grain look plastic. 0.08 alpha is invisible individually but makes the whole page feel printed.

---

## 7. Cinematic Gradient Mesh Background

**Category**: `editorial/cinematic-gradient-mesh.md`
**When to use**: Hero background that is not flat black and not a cliché gradient. The "what IS that?" effect behind premium headlines.
**Stack**: CSS radial gradients + optional slow rotate

```css
.mesh-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(at 20% 30%, rgba(74, 144, 255, 0.25) 0px, transparent 50%),
    radial-gradient(at 80% 20%, rgba(45, 122, 255, 0.18) 0px, transparent 50%),
    radial-gradient(at 60% 80%, rgba(0, 180, 255, 0.12) 0px, transparent 50%),
    #000000;
  filter: blur(60px);
  animation: mesh-drift 30s ease-in-out infinite alternate;
}

@keyframes mesh-drift {
  to { transform: translate(-20px, 20px) rotate(2deg); }
}
```

**Why it feels premium**: Three off-center radial blooms in brand blue, blurred heavily, slowly drifting. Never a single color block, never a linear gradient.

---

## 8. Backdrop-Blur Stacked Cards (iOS glass)

**Category**: `editorial/backdrop-blur-cards.md`
**When to use**: Feature cards, testimonials, floating nav. The iOS / visionOS glass pane look.
**Stack**: Pure CSS

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.06) inset,
    0 20px 60px -20px rgba(0, 0, 0, 0.6);
}
```

**Why it feels premium**: The inset top highlight + deep drop shadow + saturation boost together make it feel like physical glass. Do not forget the inset — it is the tell.

---

## 9. Lenis Smooth Scroll Setup (foundation)

**Category**: `lenis-smooth-scroll/smooth-scroll-setup.md`
**When to use**: ALWAYS. This is the base layer under every other motion pattern. Without it, scrubbed animations feel twitchy.
**Stack**: Lenis (OSS, ~4KB)

```js
import Lenis from '@studio-freight/lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,     // mobile keeps native momentum
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

**Why it feels premium**: Native scroll is jumpy on wheel events. Lenis interpolates between deltas so every scrub animation gets a silky input signal. This one line separates "nice site" from "premium site."

---

## 10. Image Reveal on Scroll — clip-path driven

**Category**: `editorial/image-reveal-clip-path.md`
**When to use**: Section transitions where an image should "unveil" as it enters the viewport. More sophisticated than fade-in.
**Stack**: CSS + IntersectionObserver

```css
.reveal-image {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
}
.reveal-image.in-view {
  clip-path: inset(0 0 0 0);
}
```

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => e.isIntersecting && e.target.classList.add('in-view'));
}, { threshold: 0.3 });

document.querySelectorAll('.reveal-image').forEach(el => io.observe(el));
```

**Why it feels premium**: The image is drawn open like a curtain. The `cubic-bezier(0.77, 0, 0.175, 1)` is the premium "swift-out" curve — heavy ease-in-out that front-loads the motion.

---

## 11. IntersectionObserver Fade-In (lightweight fallback)

**Category**: `editorial/intersection-fade.md`
**When to use**: Low-tier hardware, pages that cannot afford GSAP, or as the `reduced` tier fallback for heavier patterns.
**Stack**: Vanilla JS + CSS

```css
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 800ms ease-out, transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```js
const io = new IntersectionObserver(
  (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
  { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
);
document.querySelectorAll('.fade-in').forEach(el => io.observe(el));
```

**Why it matters**: Accessibility AND performance fallback. Every page must have this as the baseline even if GSAP is available.

---

## How to add a new pattern

1. Create the full pattern file at `brain/design-library/patterns/{category}/{name}.md`
2. Use the structure: **When to use**, **Stack**, **Reference**, **Code snippet**, **Why it feels premium**, **Common mistakes**
3. Add a one-line entry to this SEED.md index
4. If the pattern came from a reference extraction, link back to that `references/{site-name}/` folder

## Changelog

- 2026-04-14 — Initial seed with 11 curated patterns (GSAP scroll, pinned reveal, Three.js product spin, SplitText reveal, magnetic cursor, noise grain, cinematic gradient mesh, backdrop-blur cards, Lenis setup, clip-path reveal, IO fade fallback).
