# Split Text Word Reveal

**Category**: editorial
**Difficulty**: basic
**Dependencies**: `gsap@^3.12.5` (OSS fallback shown — no paid SplitText plugin required)

**Use when**: The one headline per page that must land. Typography-as-hero. Maximum once per page, twice per site.

## What it does
Splits a headline into words, wraps each in a span, and animates them in with a staggered fade + rise. No paid GSAP SplitText plugin needed — pure DOM split for words (safer anyway for accessibility than char-by-char).

## Why REIS [IA]
Used for the single signature statement on the home hero ("AI que vira receita.") or a pillar intro ("Sistemas que pagam a própria conta."). Inter 300, white on black, #4A90FF terminal period. 40ms stagger is the sweet spot — faster feels nervous, slower feels slow.

## Implementation

```tsx
// SplitReveal.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Props = { text: string; as?: 'h1' | 'h2'; className?: string };

export function SplitReveal({ text, as: Tag = 'h1', className = '' }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.style.opacity = '1';
      return;
    }

    const words = el.querySelectorAll<HTMLSpanElement>('.sr-word');
    gsap.set(el, { opacity: 1 });
    gsap.from(words, {
      yPercent: 120,
      opacity: 0,
      duration: 0.9,
      stagger: 0.04,
      ease: 'power3.out',
      delay: 0.2,
    });
  }, [text]);

  const parts = text.split(' ');

  return (
    <Tag ref={ref} className={`sr-root ${className}`} style={{ opacity: 0 }}>
      {parts.map((w, i) => (
        <span key={i} className="sr-word-wrap">
          <span className="sr-word">{w}</span>
          {i < parts.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
```

```css
.sr-root {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: clamp(2.5rem, 7vw, 6rem);
  line-height: 1.05;
  color: #ffffff;
  letter-spacing: -0.02em;
}
.sr-word-wrap {
  display: inline-block;
  overflow: hidden;
  /* the mask that lets words "rise" from below */
}
.sr-word {
  display: inline-block;
  will-change: transform, opacity;
}
/* optional: terminal period in accent blue */
.sr-root::after {
  content: '.';
  color: #4A90FF;
}
```

Usage:

```tsx
<SplitReveal text="AI que vira receita" />
```

## Gotchas
- Words, not characters. Char-by-char breaks screen readers and inflates DOM size 5x. Words read naturally.
- `overflow: hidden` on `.sr-word-wrap` is what creates the "rise from nothing" feel. Without it the words just fade.
- `prefers-reduced-motion`: set opacity to 1 and skip the animation. The headline still renders — never leave a reader staring at `opacity: 0`.
- Start the container at `opacity: 0` via inline style so there's no flash of unstyled text before the effect mounts.
- Never animate more than one split headline per section — the effect depends on being the only motion in the frame.

## Variants
- Add `rotateX: -45` to the word entrance for a more physical flip (heavier, use sparingly).
- Trigger on scroll using ScrollTrigger instead of on mount for below-fold headlines.
- Swap `stagger: 0.04` for `stagger: { each: 0.04, from: 'random' }` for a typewriter-scramble variant on manifesto pages.

## Reference
SEED.md pattern #4. Canonical: Apple product landing pages, Linear hero, Vercel homepage.
