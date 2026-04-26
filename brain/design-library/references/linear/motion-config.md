# Linear — Motion Config

Source: https://linear.app
Harvested: 2026-04-15

## Libraries Detected

No explicit GSAP, Framer Motion, Lenis, or Three.js references found in the static HTML payload. Linear's motion is almost entirely CSS-driven plus hand-rolled IntersectionObserver reveals inside Next.js components (standard for a Next + styled-components stack).

## Observed Motion Signatures

- **Section reveals**: fade-in + translateY 12–20px on scroll (IntersectionObserver trigger at ~15% viewport)
- **Cursor-follow highlights**: the hero "spotlight" effect uses `background: radial-gradient(... at var(--mouse-x) var(--mouse-y) ...)` bound to pointermove — pure CSS custom property + JS listener
- **Accent reveals**: the electric blue appears via opacity fade (not color change), which is why each appearance feels earned

## Easing & Duration Signals

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` ("ease-out-expo") is the Linear house curve — identified via styled-components transition strings in body CSS
- Durations: 300–600ms for reveals, 150–200ms for micro-hover
- Reduced motion: respects `prefers-reduced-motion` (standard Next-era pattern, no custom overrides found)

## Scroll Behavior

- No Lenis / no smooth-scroll hijack detected — native browser scroll
- Section anchors use vertical padding as rhythm rather than pinned transforms
- No parallax. The dark layering does the work that parallax usually tries to do.

## Transferable for REIS [IA]

The key Linear lesson is **motion restraint**: the site feels alive not because things are moving, but because the type, whitespace, and tonal shifts are breathing. Copy this mindset before copying any technique.
