# Horizontal Section Scroll

**Category**: gsap-scroll-trigger
**Difficulty**: intermediate
**Dependencies**: `gsap@^3.12.5`
**Use when**: Showcasing a sequence of 3-6 items (case studies, pillars, phases) as a horizontal reel driven by vertical scroll.

## What it does
Pins a section and translates a horizontal track sideways as the user scrolls. Each panel snaps gently into the viewport with an eased scrub. The user scrolls down, the story moves right.

## Why REIS [IA]
Perfect for the "Three Pillars" section (Systems, Builders, Marketing) or a case-study reel on `/trabalhos`. The horizontal move breaks the vertical monotony of a long landing page exactly once — premium sites earn it by using it once, never twice. Dark background with #4A90FF accents per panel.

## Implementation

```tsx
// HorizontalScroll.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { title: 'Systems', copy: 'AI aplicada ao core do negócio.' },
  { title: 'Builders', copy: 'Comunidade que constrói junto.' },
  { title: 'Marketing', copy: 'Demanda previsível.' },
];

export function HorizontalScroll() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      const track = root.current!.querySelector<HTMLElement>('.h-track')!;
      const total = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -total,
        ease: 'none',
        scrollTrigger: {
          trigger: '.h-section',
          start: 'top top',
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: 'power2.inOut',
          },
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <section className="h-section">
        <div className="h-track">
          {panels.map((p) => (
            <article className="h-panel" key={p.title}>
              <span className="h-index">0{panels.indexOf(p) + 1}</span>
              <h2>{p.title}</h2>
              <p>{p.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
```

```css
.h-section {
  height: 100vh;
  overflow: hidden;
  background: #000;
  color: #fff;
  font-family: 'Inter', sans-serif;
}
.h-track {
  display: flex;
  height: 100%;
  width: max-content;
  will-change: transform;
}
.h-panel {
  flex: 0 0 100vw;
  height: 100vh;
  display: flex; flex-direction: column; justify-content: center;
  padding: 0 10vw;
  border-right: 1px solid rgba(255,255,255,.06);
}
.h-panel h2 {
  font-size: clamp(3rem, 9vw, 8rem);
  font-weight: 300;
  line-height: 1;
}
.h-index {
  color: #4A90FF;
  font-weight: 300;
  letter-spacing: .3em;
  font-size: .875rem;
}
.h-panel p { font-weight: 300; opacity: .7; max-width: 40ch; }
```

## Gotchas
- `invalidateOnRefresh: true` is critical — without it, the pin length is wrong after window resize.
- `snap` makes the scroll feel intentional but can fight Lenis on trackpads — tune `duration.max` down to 0.4 if it feels sticky.
- On mobile, horizontal scroll often feels wrong. Disable (`if (window.innerWidth < 768) return;`) and fall back to native vertical stacking.
- `prefers-reduced-motion` users should see panels stacked vertically with normal scroll — never just a still frame.

## Variants
- Remove `snap` for a continuous reel (better for 6+ panels).
- Add a progress bar at the top bound to `ScrollTrigger.progress` for navigation clarity.
- Replace panels with full-bleed images for a case-study gallery variant.

## Reference
Canonical: Apple AirPods Pro page, Stripe Sessions case studies, Linear changelog.
