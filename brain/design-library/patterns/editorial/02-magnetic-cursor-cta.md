# Magnetic Cursor CTA

**Category**: editorial
**Difficulty**: basic
**Dependencies**: none (vanilla) — optional `gsap@^3.12.5` for smoother tweening

**Use when**: Premium primary CTA buttons (`/agendar`, `/aplicar`). Signals the page is paying attention to the user. Maximum 1-2 magnetic elements per page.

## What it does
The button translates toward the mouse cursor as it approaches, as if magnetically attracted. On mouse leave, it snaps back with an eased transition. Adds a luxury "the page is alive" signal without any visible chrome.

## Why REIS [IA]
Used on the single primary CTA per page — "Agendar Diagnóstico" or "Aplicar para Builders." Confidence signal: the button reaches toward you. Must remain disabled on touch devices (no cursor) and under reduced-motion. Pairs with brand #4A90FF outline or fill.

## Implementation

```tsx
// MagneticCTA.tsx
import { useEffect, useRef } from 'react';

type Props = {
  href: string;
  children: React.ReactNode;
  strength?: number; // 0.2 – 0.5 recommended
};

export function MagneticCTA({ href, children, strength = 0.35 }: Props) {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = matchMedia('(hover: none)').matches;
    if (reduce || isTouch) return;

    let raf = 0;
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      tx = (e.clientX - rect.left - rect.width / 2) * strength;
      ty = (e.clientY - rect.top - rect.height / 2) * strength;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      btn.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };

    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
      btn.style.transform = '';
    };
  }, [strength]);

  return (
    <a ref={btnRef} href={href} className="magnetic-cta">
      <span className="magnetic-cta__label">{children}</span>
    </a>
  );
}
```

```css
.magnetic-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2.25rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  color: #ffffff;
  background: #4A90FF;
  border: 1px solid #4A90FF;
  border-radius: 999px;
  text-decoration: none;
  will-change: transform;
  transition: background 300ms ease, box-shadow 300ms ease;
}
.magnetic-cta:hover {
  background: transparent;
  box-shadow: 0 0 0 1px #4A90FF, 0 10px 40px -10px rgba(74, 144, 255, 0.5);
}
.magnetic-cta__label {
  display: inline-block;
  /* label can translate independently for a second-order magnetic feel */
}
```

Usage:

```tsx
<MagneticCTA href="/agendar">Agendar Diagnóstico</MagneticCTA>
```

## Gotchas
- `prefers-reduced-motion` AND `(hover: none)` — both MUST disable the effect. Touch users have no cursor, reduced-motion users do not want this.
- The rAF interpolation (`+= (target - current) * 0.18`) is what makes it feel like physics instead of 1:1 cursor tracking. Raw transforms feel creepy.
- Keep `strength` under 0.5 — anything higher and the button "runs away" from the user, breaking click intent.
- Never apply the magnetic effect to a parent wrapper — must go on the interactive element itself so hit-testing stays aligned.
- Always clear `transform` on cleanup. React HMR will leak a stuck button otherwise.

## Variants
- Add a second-order effect: translate the inner `.magnetic-cta__label` at half the parent's offset for a subtle "label leading" feel.
- Replace translate with `scale(1.05)` for a gentler "breathe" variant on secondary CTAs.
- Combine with a blue radial glow under the cursor using a pseudo-element + CSS custom property updated in the same rAF tick.

## Reference
SEED.md pattern #5. Canonical: Awwwards SOTD winners, darkroom.engineering, linear.app CTAs.
