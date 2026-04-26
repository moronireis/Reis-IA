# Linear — CSS Snippets

> **Status**: [NEEDS PLAYWRIGHT] — Linear's CSS is split across Next.js chunks bundled per route. WebFetch can't crawl the chunk graph.

## Inferred tokens

### Color — dark discipline
```css
--bg-base:          #08090A;   /* near-black, NOT #000 */
--bg-surface:       #0F1011;   /* subtle layer */
--bg-elevated:      #16181C;   /* cards */
--border-subtle:    rgba(255,255,255,0.06);
--border-strong:    rgba(255,255,255,0.10);

--text-primary:     #F7F8F8;
--text-secondary:   #8A8F98;
--text-tertiary:    #62666D;

--accent-violet:    #5E6AD2;   /* Linear's signature indigo */
--accent-glow:      rgba(94, 106, 210, 0.25);  /* used behind cards */

/* For REIS [IA]: swap --accent-violet → #4A90FF, --accent-glow → rgba(74,144,255,0.22) */
```

### Typography
```css
/* Linear uses "Inter" (public) — perfect alignment with REIS [IA] */
--type-hero:     clamp(48px, 6vw, 84px);
--type-display:  clamp(32px, 3.6vw, 52px);
--type-title:    22px;
--type-body:     15px;   /* smaller than Stripe/Apple — enterprise density */
--type-caption:  13px;

--weight-hero:   560;    /* variable-font sweet spot */
--weight-title:  520;
--weight-body:   420;

--line-hero:     1.1;
--line-body:     1.5;
--tracking-hero: -0.022em;
```

### Ambient glow behind card
```css
.card {
  position: relative;
  background: var(--bg-elevated);
  border-radius: 12px;
  padding: 24px;
}
.card::before {
  content: '';
  position: absolute;
  inset: -40px;
  background: radial-gradient(ellipse at center, var(--accent-glow), transparent 60%);
  filter: blur(80px);
  z-index: -1;
  opacity: 0.6;
  pointer-events: none;
}
```

### Noise surface overlay
```css
.section {
  position: relative;
}
.section::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.5"/></svg>');
  opacity: 0.03;
  mix-blend-mode: overlay;
  pointer-events: none;
}
```

## To retrieve with Playwright
- Exact base color of Linear's dark surface
- Actual blur/opacity values on card glow
- Confirm Framer Motion presence (check `window.__framerMotion` or bundle grep)
- Noise texture source (SVG or PNG, and opacity)
