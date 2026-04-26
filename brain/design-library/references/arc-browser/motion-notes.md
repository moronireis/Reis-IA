# Arc — Motion Notes

> **Stack detection**: [NEEDS PLAYWRIGHT] — Historical: Arc uses Lenis (smooth scroll) + Framer Motion + likely a custom scroll choreographer. Possible GSAP ScrollTrigger for the 3D frame tilt.

## Motion grammar observed

### 1. Inter-section color morphing (signature)
- Background color transitions between sections as scroll crosses section thresholds
- Two possible implementations:
  - **A. CSS variable tween**: IntersectionObserver flips `--stage-current`, `transition` on `body::background` handles the morph (1200ms)
  - **B. Stacked absolute sections**: Each section has its own solid background; they stack with `position: sticky`, scroll "reveals" the next color
- Arc likely uses A (cleaner, no z-index wars)

### 2. 3D product frame tilt
- `perspective` on parent, `rotateX` + `rotateY` on child
- Rotation values driven by scroll progress: `--tilt-y = (scrollProgress - 0.5) * 20deg`
- At section midpoint, frame is flat; above/below midpoint it tilts in opposite directions
- Transition: `200ms linear` (raw lerp, no easing — easing is the scroll itself via Lenis)

### 3. Lenis smooth scroll
- Almost certain — Arc's scroll feel is too buttery to be native
- Default Lenis config: `{ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }`

### 4. Pull-quote entrance
- Large pull-quotes fade in from below with generous delay
- `opacity 0 → 1, translateY(40px) → 0`
- Duration: 900ms (slow, editorial)
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart)
- Delay after section entering viewport: 200ms

### 5. CTA button — soft magnetic
- Download button has a subtle magnetic-cursor effect (button shifts ~4px toward cursor within a 100px radius)
- Pure JS: `mousemove` → lerp button transform toward cursor delta
- Resets on `mouseleave`

## Easing curves
```css
--ease-arc-out:      cubic-bezier(0.22, 1, 0.36, 1);    /* editorial slow */
--ease-arc-stage:    cubic-bezier(0.4, 0, 0.2, 1);      /* stage color morph */
--ease-arc-linear:   linear;                             /* for scroll-linked props */
```

## Timing constants
- Color stage morph: 1200ms
- Pull-quote reveal: 900ms
- 3D frame tilt: 200ms (scroll-linked, not durationed)
- Magnetic cursor: 0ms (frame-linked)

## Needs Playwright
- Confirm Lenis + its config
- Extract the stage-morph implementation (CSS var vs. stacked sections)
- Measure 3D frame rotation range and scroll lock window
- Capture magnetic button math
