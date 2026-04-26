# Linear — Motion Notes

> **Stack detection**: [NEEDS PLAYWRIGHT] — Historical: Linear uses Framer Motion (they're a public sponsor). Motion is deliberately subtle — if you notice it, it's too much.

## Motion grammar observed

### 1. Ambient glow breathing
- Card glow pseudo-element has a slow `opacity` keyframe: 0.5 → 0.7 → 0.5 over 8-12 seconds
- Creates a "living" feel without any user input
- Paused on `prefers-reduced-motion`

### 2. Cursor-tracking spotlight (on some sections)
- Radial gradient that follows the mouse on hover over a card group
- Implementation: listen to `mousemove`, update CSS var `--mx, --my`
- `background: radial-gradient(at var(--mx) var(--my), var(--accent-glow), transparent 40%)`
- 60fps native, no library

### 3. Section reveal — translation only
- No blur, no scale, no rotation
- Just `opacity 0 → 1` + `translateY(12px) → 0`
- Duration: 500ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo variant)
- Triggered by IntersectionObserver at 25% threshold

### 4. Feature-per-viewport pacing
- Each feature section has `min-height: 100vh` to force solo presentation
- Scroll-snap NOT used — Linear prefers natural scroll for reader control
- Content vertical-centers inside section

### 5. Micro hover on links/buttons
- Links: underline grow from left (`::after { width: 0 → 100%; }`, 300ms)
- Buttons: background-color transition only, no transform
- Everything feels "soft" because nothing moves physically

## Easing curves
```css
--ease-linear-out:     cubic-bezier(0.16, 1, 0.3, 1);    /* expo-out, soft */
--ease-linear-inout:   cubic-bezier(0.65, 0, 0.35, 1);
--ease-linear-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);  /* rare, used for success states */
```

## Timing constants
- Section reveal: 500ms
- Glow breathing cycle: 8-12s
- Link underline: 300ms
- Cursor spotlight: 0ms (follows frame rate, no easing)

## Philosophy note
Linear's motion is "motion by subtraction." When they redesign, they REMOVE animations. Adopt this principle in REIS [IA]:
- Default to NO animation
- Add only when the animation conveys information (state change, progress, focus)
- Decorative animation is a failure signal

## Needs Playwright
- Confirm Framer Motion actually loaded (bundle grep `motion/react`)
- Extract exact glow breathing keyframe
- Measure cursor-spotlight implementation
