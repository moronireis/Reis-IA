# Motion Config — asimov.academy

**Date**: 2026-04-14

## Detected motion libraries

| Library | Present? |
|---------|----------|
| GSAP | NO |
| GSAP ScrollTrigger | NO |
| GSAP SplitText | NO |
| Three.js / WebGL | NO |
| Framer Motion | NO |
| Lenis (smooth scroll) | NO |
| Motion One | NO |
| Rive | NO |
| Lottie | NO |
| Matter.js | NO |
| Custom canvas/shader | NO |
| Video background | NO |

**Only motion present**: Elementor's built-in CSS keyframe animations loaded as separate stylesheets:
- `e-animation-grow.min.css` — hover scale
- `fadeIn.min.css` — opacity 0 → 1
- `fadeInUp.min.css` — translateY + opacity
- `fadeInRight.min.css` — translateX + opacity

These are scroll-triggered via Elementor's `entrance_animation` setting (Waypoints.js or IntersectionObserver internally), with fixed durations (~1s ease-out).

Also present: **Swiper v8.4.5** for image/testimonial carousels with Elementor defaults (autoplay, standard slide transition).

## Cinematic motion grammar

None. There is no camera, no tempo, no choreography, no scroll-driven reveal, no parallax, no 3D scene, no physics, no micro-interaction language. Motion on this site is incidental — it exists because Elementor ships with it, not because a designer composed it.

## Implication for REIS [IA]

Do not borrow any motion pattern from Asimov. The entire motion direction for the REIS hero must come from the internal `brain/design-library/patterns/SEED.md` library and cinematic references like Apple product pages, Stripe, Linear, Porsche.
