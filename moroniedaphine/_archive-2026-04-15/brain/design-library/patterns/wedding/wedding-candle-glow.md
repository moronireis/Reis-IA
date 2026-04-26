# Pattern: wedding-candle-glow
Category: wedding / lighting / motion
Source: synthesized — not directly in any reference; a ScrollTrigger upgrade on Withjoy's static overlay
Why premium: a slowly breathing warm-amber glow behind key copy creates subliminal candlelight flicker. It's the difference between "dark mode" and "room lit by candles".

## When to use
- Behind the couple-name lockup in hero.
- Behind section headings (Our Story, RSVP, Gallery).
- As a cursor-follow light when hovering photo cards.

## CSS + JS
```css
.candle-glow {
  position: absolute;
  width: 800px; height: 800px;
  left: 50%; top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(255, 200, 140, 0.28) 0%,
    rgba(201, 167, 122, 0.14) 25%,
    rgba(92, 26, 36, 0.08) 55%,
    transparent 75%
  );
  filter: blur(40px);
  mix-blend-mode: screen;
  will-change: transform, opacity;
}
```

```js
// GSAP flicker loop — irregular, not a clean sine
gsap.to('.candle-glow', {
  opacity: () => 0.82 + Math.random() * 0.18,
  scale:   () => 0.96 + Math.random() * 0.08,
  duration: () => 0.6 + Math.random() * 0.8,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// Breathing drift across the page
gsap.to('.candle-glow', {
  x: '+=30', y: '-=20',
  duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut'
});
```

## Why it feels premium
- **Screen blend mode** on warm amber over velvet black = physically-accurate candlelight. This is how color grading works in film.
- **Randomized flicker** (not clean sine) mimics real candle behavior — brains detect periodic motion as mechanical; irregular motion reads as organic.
- **40px blur** is large enough that the glow is felt, not seen — that's the photographic trick (bokeh highlight).
