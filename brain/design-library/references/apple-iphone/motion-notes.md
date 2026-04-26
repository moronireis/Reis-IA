# Apple iPhone — Motion Notes

> **Stack detection**: [NEEDS PLAYWRIGHT] — Apple uses an internal motion framework (not GSAP/Framer). Signatures to grep in the bundled JS: `AC.Gallery`, `AC.Sequence`, `ScrollManager`, `scrubTo`, `requestAnimationFrame` loops with frame-index math.

## Motion grammar observed (from rendered behavior)

### 1. Scroll-scrubbed image sequence (Apple's signature)
- **Technique**: Pre-rendered JPG/WebP sequence (typically 100–300 frames). Current frame = `Math.floor(scrollProgress * totalFrames)`. Drawn to `<canvas>` or swapped on `<img>`.
- **Easing**: Linear 1:1 scroll-to-frame mapping. NO easing on the scrubbing itself — the physicality of scroll IS the easing.
- **Lock window**: Section has `height: 300vh` (or similar) to give scroll headroom; inner container is `position: sticky; top: 0` so the frame stays pinned while scroll consumes the virtual height.
- **Frame preload**: First 10 frames eagerly loaded, rest lazy-decoded on demand.

### 2. Type entrance — blur-to-sharp
- **Technique**: Headline enters with `filter: blur(14px); opacity: 0; transform: translateY(20px)` and animates to `filter: blur(0); opacity: 1; transform: translateY(0)`.
- **Duration**: ~800ms
- **Easing**: `cubic-bezier(0.28, 0.11, 0.32, 1)` — Apple's signature "ease-out-expo-ish" curve.
- **Trigger**: Intersection Observer at 20% viewport.

### 3. Chapter nav activation
- **Technique**: Sticky nav pill with active-indicator that morphs position via `transform: translateX()` + `width` tween when active section changes. Uses FLIP technique to avoid layout thrash.
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` — Material-ish smooth.
- **Duration**: 400ms.

### 4. Modal reveal
- **Technique**: Backdrop fades (`opacity 0→1, 300ms`), panel rises (`translateY(40px) → 0, 500ms, ease-out`), content children stagger in with 60ms delta.

### 5. Alternating section entrances
- **Technique**: Image and text enter from opposite horizontal directions with 100ms stagger. Uses `transform: translate3d()` for GPU compositing.

## Easing curves to steal
```css
--ease-apple-out:     cubic-bezier(0.28, 0.11, 0.32, 1);
--ease-apple-inout:   cubic-bezier(0.4, 0, 0.2, 1);
--ease-apple-snap:    cubic-bezier(0.5, 0, 0, 1);  /* used for chapter snap */
```

## Timing constants observed
- Hero type entrance: 800ms
- Section fade: 600ms
- Modal reveal: 500ms panel + 300ms backdrop
- Chapter nav morph: 400ms
- Micro hover: 200ms

## What needs Playwright
- Exact frame count of hero image sequence
- Exact cubic-bezier values from computed styles
- Whether scroll is native or Lenis-smoothed (likely native — Apple avoids smooth-scroll libraries for accessibility)
- Modal implementation (CSS :has? JS state? Dialog element?)
