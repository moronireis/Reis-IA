# Raycast — Motion Config

Source: https://www.raycast.com
Harvested: 2026-04-15

## Libraries Detected

No explicit GSAP, Lenis, Three.js, Framer Motion, Lottie, or Spline strings in the static HTML payload. Raycast's motion is almost certainly Framer Motion (common for Next + Tailwind dark sites) but not confirmed in payload.

## Signature Motion

- **Keyboard-triggered demo** — the hero shows Raycast commands running in a simulated terminal-like panel. This is almost certainly a timed sequence of state changes (not a video) — likely driven by a React state machine advancing through a scripted command list.
- **Card hover lift** — extension cards lift slightly on hover with subtle shadow growth
- **Theme preview swap** — clicking a theme card updates the hero preview in place with a crossfade

## Easing & Duration

- Micro-hover 150ms
- Card reveals 300–400ms ease-out
- Hero demo advances on ~1500–2000ms intervals between command steps

## Scroll Behavior

- Native scroll
- No parallax
- Sticky nav that collapses on scroll

## Transferable for REIS [IA]

The highest-value Raycast lesson is the **scripted demo sequence**: a non-video, non-GIF, state-driven "playback" of commands in a panel. For REIS we can adapt this pattern to show a method playing out in a panel — e.g. "Diagnóstico → Roadmap → Implementação → Resultado" advancing at a premium cadence, as a React state machine. Better than a video (interactive, responsive, accessible) and better than a static screenshot (shows the method moving).
