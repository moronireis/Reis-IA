# Global Smooth Scroll (Lenis Foundation)

**Category**: lenis-smooth-scroll
**Difficulty**: basic
**Dependencies**: `lenis@^1.0.42` (formerly `@studio-freight/lenis`)

**Use when**: ALWAYS. This is the base layer under every other motion pattern. Without it, scrubbed animations feel twitchy on wheel input.

## What it does
Installs a global smooth-scroll controller that interpolates wheel/trackpad deltas into silky scroll position. Runs on rAF, respects `prefers-reduced-motion`, and stays off on touch (native momentum is better on mobile).

## Why REIS [IA]
Premium sites feel different in the first scroll — that difference is Lenis. Every REIS [IA] surface (website, hub, brandbook) should install this at the root layout level. It is the one dependency that separates "nice site" from "inevitable site."

## Implementation

```tsx
// components/SmoothScroll.tsx (Astro React island or Next.js root)
import { useEffect } from 'react';
import Lenis from 'lenis';

export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      // note: lenis v1 removed `smoothTouch` — native momentum by default
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // expose for other modules (ScrollTrigger sync pattern)
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  return null;
}
```

```css
/* global.css — required for Lenis to take over */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
```

```astro
---
// src/layouts/AppLayout.astro
import { SmoothScroll } from '../components/SmoothScroll';
---
<html lang="pt-BR">
  <body>
    <SmoothScroll client:load />
    <slot />
  </body>
</html>
```

## Gotchas
- `prefers-reduced-motion`: short-circuit the whole installation. Never "just reduce duration" — users who set this want real scroll.
- Modals, drawers, scrollable panels inside the page: mark with `data-lenis-prevent` or Lenis will hijack their scroll.
- On Astro, mount with `client:load` at the root layout — not `client:idle`, or the first scroll before hydration feels broken.
- Lenis v1 renamed the package from `@studio-freight/lenis` to plain `lenis`. Do not mix both in the same project.
- Do NOT import the CSS from the package — the selectors above must live in your global stylesheet so they win specificity wars.

## Variants
- Per-section smooth scroll: instantiate Lenis with `wrapper` and `content` options instead of global.
- Horizontal mode: set `orientation: 'horizontal'` for one-off horizontal-only pages.
- Anchor links: call `lenis.scrollTo('#section', { offset: -80 })` from nav click handlers for eased jumps.

## Reference
SEED.md pattern #9. Canonical: every Awwwards SOTD for the last 3 years.
