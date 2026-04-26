# Mercury — Motion Config

Source: https://mercury.com
Harvested: 2026-04-15

## Libraries Detected

No GSAP, Lenis, Three.js, Framer Motion, Spline, or Lottie strings found in the static HTML payload.

## Signature Motion

Mercury's motion budget is **almost zero**. The page moves barely at all. The only motion that is not free-browser-scroll is:
- Fade-in + translateY reveals on IntersectionObserver (standard)
- Soft hover state transitions on links/buttons (150–200ms)
- Possibly an animated product dashboard screenshot in the hero (static-looking but may loop subtly)

## Easing & Duration

- Likely `cubic-bezier(0.4, 0, 0.2, 1)` or similar Material-adjacent curves
- Durations 150–200ms micro / 400ms reveal

## Scroll Behavior

- Native scroll
- No smooth-scroll library
- No parallax

## Transferable for REIS [IA]

The Mercury lesson is the most radical one: **motion can be almost entirely absent and the page will still feel alive** if the typography, spacing, and tonal discipline carry the weight. This is permission to ship a REIS home with zero fancy motion and trust the composition. Powerful permission.
