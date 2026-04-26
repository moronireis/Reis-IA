# Porsche Taycan — Motion Notes

> **Stack detection**: [NEEDS PLAYWRIGHT] — Porsche's bundle is minified. Expected libraries: Lenis (smooth scroll), GSAP + ScrollTrigger (reveal sequences), custom `<video>` scroll-scrub controller.

## Motion grammar observed

### 1. Glacial pace
Porsche's motion is SLOW relative to SaaS defaults. Hero fades run 1200ms, section reveals 900ms+, hover transitions 400ms. The slowness signals weight, engineering, gravitas. Copy this pacing for REIS [IA] hero frames — current 300ms defaults read as "cheap tech."

### 2. Scroll-scrubbed background video
Hero background is a silent auto-play video whose `currentTime` is driven by scroll progress, not natural playback. Creates the same cinematic scrub as Apple's image sequence but with a single file.
- Implementation: `video.currentTime = progress * video.duration`
- Video encoded at CBR with keyframes every 0.1s for scrub smoothness
- Lighter delivery than 200 JPG frames (~8MB vs ~12MB)

### 3. Hotspot micro-choreography
- Numbered hotspot dots pulse on idle (CSS keyframe: scale 1 → 1.2, opacity 1 → 0.4, 2s infinite alternate)
- Click: dot expands to 48px circle, detail panel slides from adjacent edge (400ms, ease-out)
- Close: reverse with 300ms ease-in

### 4. Sound-player hold interaction
- `pointerdown` → play audio + scale the button
- `pointerup` / `pointerleave` → pause + reset
- Tactile — forces deliberate interaction, no passive autoplay

### 5. Variant grid entrance stagger
- 11 variants reveal with 80ms delta between cards
- Each card: `opacity 0 → 1, translateY(30px) → 0`
- Duration 700ms, `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart)

## Easing curves to steal
```css
--ease-porsche-out:   cubic-bezier(0.22, 1, 0.36, 1);   /* ease-out-quart, glacial */
--ease-porsche-io:    cubic-bezier(0.65, 0, 0.35, 1);   /* balanced section moves */
--ease-porsche-snap:  cubic-bezier(0.83, 0, 0.17, 1);   /* ease-in-out-quart */
```

## Timing constants
- Hero fade: 1200ms
- Section reveal: 900ms
- Hover: 400ms
- Stagger delta: 80ms

## Needs Playwright
- Confirm Lenis presence (`window.__lenis`?)
- Extract hotspot component source
- Capture video keyframe interval
- Measure actual durations via `getComputedStyle().transitionDuration`
