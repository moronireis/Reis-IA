# Arc Browser — Motion Config

Source: https://arc.net
Harvested: 2026-04-15

## Libraries Detected

No explicit GSAP, Lenis, Three.js, Framer Motion, Lottie, or Spline strings in the static HTML. Arc is a Next site likely using Framer Motion in later chunks.

## Signature Motion

- **Chaptered cinematic essay scroll** — the entire page is composed as film-edit chapters, each one pacing the next. Transitions between chapters are paced like a film cut: you finish a thought before the next asks for attention.
- **Hero video loop** — Arc's hero typically features a video of the browser in use
- **Scroll-linked tonal shifts** — background color and mood shift between chapters
- **Type reveals on chapter entry** — large display type fades in as each chapter crosses the viewport

## Easing & Duration

- Chapter transitions: slow, atmospheric (800–1500ms ranges)
- Hero reveals: 600ms with ease-out-expo
- Micro-hover: 200ms

## Scroll Behavior

- Likely smooth-scroll hijack (Lenis or similar, though not confirmed in payload)
- Chapter-paced rhythm — the scroll feels slower than native would suggest

## Transferable for REIS [IA]

Arc's highest-value lesson is **chaptered scroll rhythm**. Instead of a continuous page, compose the REIS home as 4–6 "chapters": hero, pillars, method, proof, close, footer. Each chapter has its own atmospheric pressure and paces the next. This is essentially a refinement of the Vercel/Linear tonal-shift idea but with explicit "chapter marks" — a stronger narrative signal without a stronger visual commitment.
