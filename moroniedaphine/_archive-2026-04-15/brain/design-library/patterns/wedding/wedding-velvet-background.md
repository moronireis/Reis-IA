# Pattern: wedding-velvet-background
Category: wedding / surfaces
Source: synthesized from Paperless Post warm-cream palette + Withjoy hero overlay technique
Why premium: velvet texture + radial candlelight gradient instantly evokes Bridgerton drawing-room lighting. It is the single most impactful base for the whole site.

## When to use
- As the base `<body>` background for the entire Moroni & Daphine site.
- As the first layer of any hero or full-bleed section.
- Under photography to deepen shadows cinematically.

## CSS
```css
:root {
  --velvet-black: #0F0A08;
  --wine-black:   #2B0A0F;
  --burgundy:     #5C1A24;
  --rose-gold:    #C9A77A;
  --candle:       #F5E6D3;
}
body {
  background:
    /* candlelight glow hotspot */
    radial-gradient(ellipse 60vw 40vh at 50% 20%, rgba(201,167,122,0.12) 0%, transparent 60%),
    /* burgundy wash */
    radial-gradient(ellipse at 30% 80%, rgba(92,26,36,0.35) 0%, transparent 55%),
    /* velvet base */
    linear-gradient(180deg, #0F0A08 0%, #1A0A0C 50%, #0F0A08 100%);
  background-attachment: fixed;
  position: relative;
}
/* velvet fiber texture via SVG noise */
body::before {
  content: "";
  position: fixed; inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.08  0 0 0 0 0.04  0 0 0 0 0.02  0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.35;
  mix-blend-mode: overlay;
  z-index: 1;
}
```

## Why it feels premium
Three stacked radial gradients create the illusion of a single candle lighting a velvet drape from above. The SVG-noise overlay simulates fabric fiber — it's the detail that stops your eye from reading it as "flat dark mode".
