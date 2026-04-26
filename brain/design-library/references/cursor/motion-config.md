# Cursor — Motion Config

Source: https://cursor.com
Harvested: 2026-04-15

## Libraries Detected

No GSAP, Lenis, Three.js, Framer Motion, Lottie, or Spline strings found in the static HTML. Like most Next sites in this set, motion is likely Framer Motion in later chunks.

## Signature Motion

- **Poetic-to-technical tonal transition** — as the user scrolls from hero to method sections, the background tonal temperature shifts from warm near-black to cool near-black. This is almost certainly a `background-color` transition tied to scroll position via IntersectionObserver or a scroll-linked CSS variable.
- **Hero type reveal** — display serif headline fades in with subtle translateY
- **Code editor mockups** — in the technical section, faked "typing" animations in code panels (requestAnimationFrame character-by-character reveal)
- **Hover highlights on technical cards** — soft glow on hover

## Easing & Duration

- Likely `cubic-bezier(0.16, 1, 0.3, 1)` for hero reveals
- Tonal transitions on longer durations (800–1200ms) to feel atmospheric
- Code typing at 20–40ms per character for realistic rhythm

## Scroll Behavior

- Native scroll
- Possibly a very subtle smooth-scroll implementation

## Transferable for REIS [IA]

The critical Cursor lesson is the **scroll-linked tonal temperature shift**. As the user reads from hero to method to proof, the background subtly changes its warm/cool bias. This is more sophisticated than Linear's tonal ladder because it is continuous rather than stepped. It produces an emotional arc without requiring any explicit storytelling.
