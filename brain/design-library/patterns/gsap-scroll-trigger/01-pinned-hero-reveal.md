# Pinned Hero Reveal

**Category**: gsap-scroll-trigger
**Difficulty**: intermediate
**Dependencies**: `gsap@^3.12.5`
**Use when**: The landing hero must command a full screen of scroll before releasing, while copy and an accent-blue sweep layer in progressively.

## What it does
Pins the hero section for ~1.5 viewport heights while a scrubbed timeline fades in the headline, slides a blue accent bar across the frame, and zooms a background layer subtly. The user feels held in place while the statement lands.

## Why REIS [IA]
This is the silent, inevitable entrance. No bouncing, no parallax circus — a single pinned moment where the proposition arrives, the blue accent sweeps across (brand signature), and only then does the page move on. Fits the top hero of `/` (home), `/systems`, or any pillar landing page. Dark background, #4A90FF sweep, Inter 300 wordmark.

## Implementation

```tsx
// PinnedHero.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PinnedHero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-pin',
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.4 })
        .from('.hero-headline', { opacity: 0, y: 60, duration: 0.8 }, 0.1)
        .fromTo(
          '.hero-sweep',
          { xPercent: -110 },
          { xPercent: 110, duration: 1.2, ease: 'power2.inOut' },
          0.3
        )
        .from('.hero-sub', { opacity: 0, y: 30, duration: 0.6 }, 0.6)
        .to('.hero-bg', { scale: 1.08, duration: 1.4, ease: 'none' }, 0);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section className="hero-pin">
        <div className="hero-bg" />
        <div className="hero-sweep" />
        <div className="hero-content">
          <span className="hero-eyebrow">REIS [IA]</span>
          <h1 className="hero-headline">AI que vira receita.</h1>
          <p className="hero-sub">Sistemas, Builders, Marketing.</p>
        </div>
      </section>
    </div>
  );
}
```

```css
/* hero.css */
.hero-pin {
  position: relative;
  height: 100vh;
  overflow: hidden;
  background: #000;
  font-family: 'Inter', sans-serif;
  color: #fff;
}
.hero-bg {
  position: absolute; inset: 0;
  background:
    radial-gradient(at 30% 30%, rgba(74,144,255,.18), transparent 50%),
    #000;
  will-change: transform;
}
.hero-sweep {
  position: absolute; top: 0; bottom: 0; left: 0;
  width: 2px;
  background: linear-gradient(180deg, transparent, #4A90FF, transparent);
  box-shadow: 0 0 40px 4px rgba(74,144,255,.4);
  will-change: transform;
}
.hero-content {
  position: relative; z-index: 2;
  height: 100%;
  display: flex; flex-direction: column; justify-content: center;
  padding: 0 8vw;
}
.hero-eyebrow { font-weight: 300; letter-spacing: .3em; color: #4A90FF; }
.hero-headline { font-size: clamp(2.5rem, 7vw, 6rem); font-weight: 300; line-height: 1.05; }
.hero-sub { font-weight: 300; opacity: .7; }
```

## Gotchas
- `prefers-reduced-motion` MUST short-circuit the whole effect — the section still renders, just unpinned. Never ship a pinned hero without this check.
- `anticipatePin: 1` avoids a visible jump on first entry. Skipping it is the #1 bug report on pinned sections.
- Use `gsap.context()` + `ctx.revert()` in React to clean up on unmount, otherwise ScrollTriggers leak on route changes.
- Pin length (`end: '+=150%'`) is in pixels of scroll, not viewport — test on short and tall screens.

## Variants
- Swap `hero-sweep` for a horizontal band instead of vertical line (more editorial, less technical).
- Add a second sweep at `0.5` offset for a "crossed beams" effect on launch pages.
- Replace `hero-bg` scale with a subtle `rotate: 0.5deg` for a more organic held-breath feel.

## Reference
SEED.md pattern #2 (pinned reveal). Canonical: Apple iPhone product pages, Stripe homepage hero.
