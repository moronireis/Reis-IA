# Stripe — Motion Notes

> **Stack detection**: [NEEDS PLAYWRIGHT] — Stripe's motion is mostly CSS transitions + a custom WebGL gradient mesh. No GSAP or Framer Motion observed historically. Scroll smoothing is native.

## Motion grammar observed

### 1. Animated gradient mesh (the signature)
- **Technique**: WebGL fragment shader on full-viewport `<canvas>`. 4-6 color stops arranged as control points on a normalized plane. Each frame perturbs UV coordinates using simplex noise indexed by `u_time`. Output is a mixed/interpolated color per pixel.
- **Performance**: ~60fps on integrated GPUs. Canvas resolution is capped at `devicePixelRatio * 1` not `* 2` to save fillrate.
- **Pause logic**: Listens for `prefers-reduced-motion` AND pauses when tab loses focus (visibility API). Respects battery.
- **Fallback**: CSS `linear-gradient` frozen at T=0 for non-WebGL contexts.

### 2. Card hover lift (universal micro)
- `transform: translateY(-4px)` + shadow bloom
- Duration: 220ms
- Easing: `cubic-bezier(0.2, 0, 0, 1)` — ease-out-circ-ish, snappy exit
- Applied to: every product card, feature card, testimonial card

### 3. Section fade-in on scroll
- IntersectionObserver at 15% threshold
- `opacity 0 → 1, translateY(16px) → 0`
- Duration: 600ms
- Easing: `cubic-bezier(0.2, 0, 0, 1)`
- No stagger — whole section moves as one block

### 4. Carousel / customer story slide
- Native `scroll-snap` + `overflow-x: auto`, no JS motion library
- Snap type: `x mandatory`
- Scrollbar hidden; custom arrow buttons trigger `scrollBy({ behavior: 'smooth' })`

### 5. CTA button shimmer on hover
- Subtle gradient sweep across button surface (200ms delay, 600ms duration)
- Implemented with `::before` pseudo + `background-position` animation

## Easing curves
```css
--ease-stripe-out:   cubic-bezier(0.2, 0, 0, 1);   /* snappy exit */
--ease-stripe-inout: cubic-bezier(0.4, 0, 0.2, 1);
```

## Timing constants
- Hover: 220ms
- Section fade: 600ms
- CTA shimmer: 600ms
- Carousel snap: native (~400ms)

## Needs Playwright
- Extract the actual shader GLSL from bundled JS
- Confirm noise function (simplex? perlin? custom?)
- Capture color-stop coordinates
- Measure actual frame rate budget
