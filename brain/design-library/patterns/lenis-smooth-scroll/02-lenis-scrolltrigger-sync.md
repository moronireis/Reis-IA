# Lenis + ScrollTrigger Sync

**Category**: lenis-smooth-scroll
**Difficulty**: intermediate
**Dependencies**: `lenis@^1.0.42`, `gsap@^3.12.5`

**Use when**: You are using Lenis AND GSAP ScrollTrigger on the same page. This is the trap most devs hit — without syncing, scrubbed animations desync from the true scroll position.

## What it does
Drives ScrollTrigger's internal update loop from Lenis's rAF instead of the browser's native scroll event. Every scrub animation now reads Lenis's smoothed scroll position, keeping motion perfectly locked to the interpolated scroll.

## Why REIS [IA]
Any REIS [IA] page using both the global smooth scroll pattern AND a pinned/scrubbed hero will exhibit subtle judder without this. It is the invisible fix that makes the difference between "why does this feel slightly off" and "this feels inevitable."

## Implementation

```tsx
// hooks/useLenisScrollTrigger.ts
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenisScrollTrigger() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 1. Each Lenis scroll event drives ScrollTrigger.update
    lenis.on('scroll', ScrollTrigger.update);

    // 2. GSAP's ticker drives Lenis's rAF (single clock, no drift)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // gsap.ticker time is in seconds
    });

    // 3. Disable GSAP's lag smoothing — it fights the interpolation
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);
}
```

```tsx
// App.tsx / root component
import { useLenisScrollTrigger } from './hooks/useLenisScrollTrigger';

export function App() {
  useLenisScrollTrigger();
  return <>{/* your pages */}</>;
}
```

## Gotchas
- **Do NOT install Lenis separately AND use this hook** — this hook owns the Lenis instance. Pick one pattern per project: either the global foundation pattern OR this synced version. The synced version replaces the foundation.
- `gsap.ticker.lagSmoothing(0)` is NOT optional. GSAP's default lag smoothing will stutter-compensate and create ghost jumps mid-scrub.
- Register `ScrollTrigger.update` BEFORE creating any ScrollTrigger instances, or the first animation of the session will be desynced.
- The cleanup function must pass the EXACT same function reference to `gsap.ticker.remove`. If you use an inline arrow function each time, it will not unregister. Store it in a variable if you need clean teardown on HMR.
- `prefers-reduced-motion`: short-circuit. If you must keep ScrollTrigger working for users who want reduced motion, initialize ScrollTrigger alone without Lenis.

## Variants
- Standalone hook vs. integrated into `SmoothScroll.tsx` component — for projects with only a few scrub animations, inline it.
- With Framer Motion: Framer Motion's `useScroll` ALSO needs to be told about Lenis. Use the same `lenis.on('scroll', ...)` handler to trigger Framer's motion values.
- With Locomotive Scroll v5: same pattern, swap `lenis.raf` for Locomotive's `update()`.

## Reference
SEED.md pattern #9 (Lenis setup). Canonical: Studio Freight examples, GSAP official Lenis demo, darkroom.engineering.
