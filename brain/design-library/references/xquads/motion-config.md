# Xquads — Motion Configuration
## Source: https://raxo.com.br/xquads
## Extracted: 2026-04-22

---

## Stack: ZERO external motion libraries

This page uses **no GSAP, no Framer Motion, no Lenis, no Three.js, no Spline**. All animation is achieved through:
1. CSS `@keyframes` animations
2. CSS `transition` properties
3. Vanilla JS `IntersectionObserver` for scroll-reveal
4. Vanilla JS `requestAnimationFrame` for Canvas 2D grid animation
5. Vanilla JS `setTimeout` chain for typewriter effect

---

## CSS Keyframe Animations

### 1. `fade-up` — Entry animation (hero elements)
```css
@keyframes fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- Duration: `0.6s`
- Easing: `ease`
- Stagger: `0.1s` increments via `animation-delay` (0s, 0.1s, 0.2s, 0.3s)
- Fill: `both`

### 2. `pulse-glow` — Hero background glow
```css
@keyframes pulse-glow {
  from { opacity: 0.7; }
  to { opacity: 1; }
}
```
- Duration: `8s` (glow-1), `10s` (glow-2)
- Easing: `ease-in-out`
- Direction: `infinite alternate` / `infinite alternate-reverse`

### 3. `blink` — Badge status indicator
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
```
- Duration: `2s`
- Easing: `ease`
- Direction: `infinite`

### 4. `marquee` — Social proof ticker
```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```
- Duration: `28s`
- Easing: `linear`
- Direction: `infinite`
- Implementation: Content is duplicated for seamless loop

### 5. `hf-float` — Hero floating elements (variant A)
```css
@keyframes hf-float {
  0%   { transform: translateY(0px) rotate(0deg); }
  33%  { transform: translateY(-18px) rotate(4deg); }
  66%  { transform: translateY(10px) rotate(-3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}
```
- Duration: `18s`, `22s`
- Easing: `ease-in-out`
- Direction: `infinite` / `infinite reverse`

### 6. `hf-drift` — Hero floating elements (variant B)
```css
@keyframes hf-drift {
  0%   { transform: translateY(0px) translateX(0px); }
  25%  { transform: translateY(-12px) translateX(6px); }
  50%  { transform: translateY(-6px) translateX(-8px); }
  75%  { transform: translateY(10px) translateX(4px); }
  100% { transform: translateY(0px) translateX(0px); }
}
```
- Duration: `13s` to `21s` (varies per element)
- Stagger: `0.5s` to `4s` delay increments
- Hidden on mobile (`display: none` at max-width: 768px)

### 7. `pulse-unmute` — Video overlay button
```css
@keyframes pulse-unmute {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.85; transform: scale(1.05); }
}
```
- Duration: `2s`
- Easing: `ease`
- Direction: `infinite`

### 8. `blink-cursor` — (defined but usage unclear)
```css
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

---

## CSS Transitions

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Nav CTA | `all` | `0.2s` | — |
| Primary button | `all` | `0.25s` | — |
| Button shimmer pseudo | `left` | `0.5s` | `ease` |
| Rotating word | `opacity, transform` | `0.22s` | `ease` |
| Cards (dor, module, entrega) | `background` | `0.2s` | — |
| Video play button | `all` | `0.25s` | — |
| FAQ arrow | `transform` | `0.3s` | — |
| FAQ answer (max-height) | `max-height` | `0.4s` | `ease` |
| FAQ answer (padding) | `padding` | `0.3s` | — |
| Scroll-reveal | `opacity, transform` | `0.7s` | `ease` |

---

## Scroll-Reveal System (IntersectionObserver)

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08 });
```

- Threshold: `0.08` (triggers when 8% visible)
- One-way reveal (no `unobserve`, no removal — but only adds class, never removes)
- CSS for reveal elements:
  ```css
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }
  ```
- Stagger achieved via `transitionDelay` set in JS:
  - `.dor-card`: `i * 0.08s`
  - `.module-card`: `i * 0.07s`
  - `.entrega-item`: `i * 0.07s`

---

## Canvas 2D Grid Animation

```javascript
const CELL = 64; // grid cell size in px
// Each cell has: { v: random(0,1), s: 0.001 + random * 0.002 }
// Per frame: cell.v += cell.s; if (v > 1 || v < 0) s *= -1;
// Stroke: rgba(209,255,2, cell.v * 0.04)
// Line width: 0.5
// Canvas opacity: 0.25 (CSS)
```
- Position: `fixed`, full viewport
- z-index: 0 (behind all content)
- Purpose: Subtle animated grid background with random pulsing cells
- Performance note: runs at requestAnimationFrame rate, iterates cols*rows per frame

---

## Typewriter Effect

```javascript
const words = ['marketing', 'copy', 'tráfego', 'branding', 'vendas', 'estratégia', 'storytelling'];
// Desktop: erase 45ms/char, type 60ms/char, pause 1800ms
// Mobile:  erase 25ms/char, type 35ms/char, pause 1000ms
```
- Cycles through 7 words in the hero title
- Erase → 100ms gap → Type → Pause → Repeat
- Initial delay: 1800ms (desktop) / 1000ms (mobile) before first cycle

---

## Button Shimmer Effect

```css
.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 40%; height: 200%;
  background: rgba(255,255,255,0.12);
  transform: skewX(-20deg);
  transition: left 0.5s ease;
}
.btn-primary:hover::after { left: 120%; }
```
- Skewed white overlay slides across button on hover
- Duration: 0.5s ease

---

## Hover Transforms

| Element | Transform |
|---------|-----------|
| Nav CTA | `translateY(-1px)` |
| Primary button | `translateY(-2px)` + box-shadow |
| Video play button | `scale(1.08)` |
