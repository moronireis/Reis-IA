# Scripted State Machine Demo

**Category**: hero-effects
**Difficulty**: intermediate
**Dependencies**: React only. No video file, no Lottie, no GSAP. Optional: XState if the sequence grows beyond ~6 steps.

**Use when**: The hero (or any signature section) needs to *show the method in motion* without shipping a video. For REIS [IA]: "Diagnóstico → Roadmap → Implementação → Resultado" playing out in a framed panel, advancing itself, looping clean.

## What it is

A React component that drives a hero "product demo" via an explicit, scripted state machine. Instead of playing back an MP4 or a GIF, it advances through a list of phases on a timer, updating the panel's contents (label, caption, visual state) at each step. Pauses on hover, resets when scrolled out of view, respects reduced motion by jumping to the final frame and staying there.

This is the Raycast hero move: the panel in the fold shows commands running, but there's no video element anywhere in the DOM — it's a state machine rendering React.

## Why REIS-grade

- **Editorial, not cinematic** — a scripted sequence reads as *documentation of a method*, not entertainment. Fits the consultivo premium tone.
- **Zero video weight** — no MP4 to encode, no CDN bandwidth, no autoplay policy headaches, no mobile data tax.
- **Accessible by construction** — real DOM, real text. Screen readers get the phase labels as they change. `aria-live="polite"` on the caption.
- **Responsive for free** — the panel is just CSS. No aspect-ratio drift, no letterboxing.
- **Dark-mode native** — lives inside `#0A0A0A` with `#4A90FF` accent, same as the rest of the site.

## Dependencies

- React 18+ (hooks only — `useState`, `useEffect`, `useRef`)
- No libraries. No Framer, no GSAP, no XState. Native `setTimeout` + cleanup.
- If the script grows past ~6 steps or acquires branches, graduate to XState 5. Not before.

## Code recipe

```tsx
// MethodDemo.tsx
// Pattern: brain/design-library/patterns/hero-effects/03-scripted-state-machine-demo.md
// Source ref: brain/design-library/references/raycast/ (hero scripted demo)

import { useEffect, useRef, useState } from 'react';

type Phase = {
  id: string;
  label: string;   // mono metadata: "01 · DIAGNÓSTICO"
  title: string;   // display line inside the panel
  caption: string; // one-line explanation under the title
  holdMs: number;  // how long this phase stays on screen
};

const PHASES: Phase[] = [
  {
    id: 'diagnostico',
    label: '01 · DIAGNÓSTICO',
    title: 'Mapeamos onde a receita está parada.',
    caption: 'Auditoria dos processos que custam mais do que entregam.',
    holdMs: 2200,
  },
  {
    id: 'roadmap',
    label: '02 · ROADMAP',
    title: 'Priorizamos o que paga a própria conta primeiro.',
    caption: 'Sequência de implementações ordenadas por retorno.',
    holdMs: 2200,
  },
  {
    id: 'implementacao',
    label: '03 · IMPLEMENTAÇÃO',
    title: 'Construímos com sua equipe, não para ela.',
    caption: 'Sistemas que ficam rodando depois que a gente sai.',
    holdMs: 2200,
  },
  {
    id: 'resultado',
    label: '04 · RESULTADO',
    title: 'Receita atribuída, custo recuperado, equipe livre.',
    caption: 'Números que o board aceita sem pedir nota de rodapé.',
    holdMs: 2600,
  },
];

export function MethodDemo() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceRef = useRef(false);

  // reduced motion: freeze on last frame
  useEffect(() => {
    reduceRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceRef.current) setIndex(PHASES.length - 1);
  }, []);

  // only advance while in view
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (!entry.isIntersecting && !reduceRef.current) setIndex(0); // reset on scroll-out
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // state machine tick
  useEffect(() => {
    if (reduceRef.current || paused || !inView) return;
    const phase = PHASES[index];
    const t = window.setTimeout(() => {
      setIndex((i) => (i + 1) % PHASES.length);
    }, phase.holdMs);
    return () => window.clearTimeout(t);
  }, [index, paused, inView]);

  const current = PHASES[index];

  return (
    <div
      ref={rootRef}
      className="md-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="group"
      aria-label="Demonstração do método REIS [IA]"
    >
      <div className="md-panel">
        <div className="md-label" aria-hidden="true">{current.label}</div>
        <div className="md-title" aria-live="polite">{current.title}</div>
        <div className="md-caption">{current.caption}</div>

        <div className="md-progress" aria-hidden="true">
          {PHASES.map((p, i) => (
            <span
              key={p.id}
              className={`md-dot ${i === index ? 'is-active' : ''} ${i < index ? 'is-done' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

```css
/* MethodDemo.css — REIS [IA] tokens only */

.md-root {
  font-family: 'Inter', sans-serif;
  background: #000000;
  padding: clamp(48px, 8vw, 120px) clamp(16px, 4vw, 64px);
  display: flex;
  justify-content: center;
}

.md-panel {
  width: min(720px, 100%);
  background: #0A0A0A;
  border: 1px solid #171717;
  border-radius: 12px;
  padding: clamp(32px, 5vw, 56px);
  position: relative;
  /* subtle ambient glow — does not animate */
  box-shadow: 0 0 0 1px rgba(74, 144, 255, 0.04),
              0 40px 80px -20px rgba(74, 144, 255, 0.08);
}

.md-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.12em;
  color: #4A90FF;
  margin-bottom: 24px;
  /* label crossfade — the only per-phase motion */
  animation: md-label-in 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.md-title {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  margin-bottom: 16px;
  /* re-trigger on content change via key-based remount or CSS animation */
  animation: md-title-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.md-caption {
  font-size: 15px;
  line-height: 1.6;
  color: #A3A3A3;
  max-width: 52ch;
  animation: md-caption-in 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.md-progress {
  display: flex;
  gap: 8px;
  margin-top: 40px;
}

.md-dot {
  width: 32px;
  height: 2px;
  background: #171717;
  transition: background 400ms cubic-bezier(0.16, 1, 0.3, 1);
}
.md-dot.is-active { background: #4A90FF; }
.md-dot.is-done   { background: #FFFFFF; }

@keyframes md-label-in {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes md-title-in {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes md-caption-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .md-label, .md-title, .md-caption, .md-dot {
    animation: none !important;
    transition: none !important;
  }
}
```

**Trigger animations on phase change**: the simplest way is to key the inner children on `current.id` so React remounts them, which re-fires the CSS `animation`. Example:

```tsx
<div className="md-label" key={`l-${current.id}`}>{current.label}</div>
<div className="md-title" key={`t-${current.id}`} aria-live="polite">{current.title}</div>
<div className="md-caption" key={`c-${current.id}`}>{current.caption}</div>
```

## Variables to tune

- `holdMs` per phase — 2000–2800ms is the premium band. Faster feels frantic, slower feels broken.
- Number of phases — 3 minimum, 6 maximum. 4 is the sweet spot (the REIS method).
- `.md-dot` width/gap — shrink for mobile if the progress row wraps.
- Panel `box-shadow` — pull the ambient glow up or down to taste; never exceed `rgba(74,144,255,0.12)` alpha or it reads as SaaS.
- Easing — locked to `cubic-bezier(0.16, 1, 0.3, 1)` (see `patterns/motion/02-ease-out-expo-house-curve.md`).

## Accessibility

- `role="group"` + `aria-label` on the root so assistive tech knows what the panel is.
- `aria-live="polite"` on the title so screen readers announce phase changes without interrupting.
- `aria-hidden` on the mono label and progress dots — they're decoration; the title carries the meaning.
- Hover AND focus pause the timer. Keyboard users must be able to stop the sequence.
- `prefers-reduced-motion`: jumps to final phase and freezes. The method still reads; the motion just doesn't.
- All phase text is real DOM, real content. No image-of-text, no canvas.

## Performance

- Zero DOM thrash: one `setTimeout` at a time, cleaned up on every state change.
- No video, no canvas, no WebGL. Lighthouse untouched.
- `IntersectionObserver` stops the state machine when the panel leaves the viewport — no phantom timers, no background CPU.
- Works on the `minimal` hardware tier without degradation. This is one of the few hero patterns that doesn't need a reduced variant for low-end devices.

## Known variants

- **Branching state machine** — if phases need to fork based on input (interactive demo), graduate to XState 5. Not needed for the linear REIS method.
- **Manual advance** — add prev/next buttons and drop the auto-advance. Use for "explore at your own pace" method deep-dives, not the hero.
- **Paired visual** — left side keeps the text, right side renders a phase-specific diagram/SVG. Doubles the weight; use only if the visual is load-bearing.
- Pairs with `patterns/motion/02-ease-out-expo-house-curve.md` (easing) and `patterns/layout/02-chaptered-scroll-composition.md` (where the demo sits in the page).

## Source references

- `brain/design-library/references/raycast/motion-config.md` — confirmed scripted-demo hypothesis and timing band (1500–2000ms per step; we extended to 2200–2600ms for REIS consultivo cadence).
- `brain/design-library/references/raycast/suggested-patterns.md` — Pattern 1, the distillation prompt for this file.
- `brain/design-library/references/raycast/html.html` — DOM structure of the Raycast hero panel.
