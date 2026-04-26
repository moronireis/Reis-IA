# Vercel — Motion Config

Source: https://vercel.com
Harvested: 2026-04-15

## Libraries Detected

No explicit GSAP, Lenis, or Three.js in the static payload. Vercel's motion is primarily Framer Motion (the React motion library, owned by Framer but common in Next apps) plus hand-rolled canvas/WebGL for the hero visualization — though no `framer-motion` string was found in the initial HTML, it is typically loaded in a later chunk.

## Signature Motion

- **Tonal background gradients at section boundaries** — the entire page reads as a single continuous gradient that slowly shifts hue/tone, creating an atmospheric pressure change between sections without any dividers
- **Hero grid animation** — animated dot grid / line art that pulses subtly, likely canvas-based
- **Hover micro-interactions** — buttons and cards transition `background` and `border-color` on `cubic-bezier(0.16, 1, 0.3, 1)`

## Easing & Duration

- Geist design system curve: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo, same as Linear)
- Durations: 150ms hover, 400ms reveal, 600ms hero entrance

## Scroll Behavior

- Native scroll — no Lenis hijack detected
- Tonal-shift backgrounds give the impression of parallax without actual parallax

## Transferable for REIS [IA]

The critical lesson is the **continuous tonal gradient that spans the full page**. Instead of discrete section backgrounds, treat the body as one long vertical gradient where each section sits at a different point on the gradient. This eliminates the need for section dividers entirely.
