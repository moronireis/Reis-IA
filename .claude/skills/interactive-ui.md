# Skill: Interactive UI & Micro-interactions

**When to use:** Whenever advanced hover effects, scroll-triggered animations, page transitions, loading states, or any interactive UI element beyond basic CSS is requested.

**Rules:**
1. Always use `framer-motion` or `gsap` for complex interactions -- never pure CSS for anything beyond simple opacity/transform transitions.
2. Every interactive element must respect `prefers-reduced-motion`.
3. Interactions must feel premium and intentional, never gratuitous.

## Available Patterns

### 1. Hover Effects

**Magnetic Buttons:**
- Button subtly follows cursor position within a defined radius
- Use `framer-motion` `useMotionValue` + `useTransform` to track mouse position relative to button center
- Apply `x` and `y` transforms with spring physics (`stiffness: 150, damping: 15`)
- Reset smoothly on mouse leave

**Tilt Cards:**
- Cards rotate subtly based on mouse position over the card surface
- Use `framer-motion` with `rotateX` and `rotateY` transforms
- Max rotation: 5-8 degrees
- Add `perspective: 1000px` to parent container
- Optional: subtle shadow shift matching tilt direction

**Glow Cursor:**
- Radial gradient that follows the cursor over a section or card
- Use CSS custom properties updated via `mousemove` event listener
- Gradient: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(74, 144, 255, 0.06), transparent 40%)`
- Performance: use `requestAnimationFrame` for smooth updates

### 2. Scroll-Triggered Animations

**Reveal on Scroll:**
- Elements fade in + slide up as they enter the viewport
- Use `framer-motion` `useInView` hook or `whileInView` prop
- Default: `opacity: 0 -> 1`, `translateY: 30px -> 0`
- Duration: 0.6-0.8s, ease: `[0.25, 0.46, 0.45, 0.94]`
- Stagger children by 0.1-0.15s

**Parallax Sections:**
- Background elements move at different speeds than foreground
- Use `framer-motion` `useScroll` + `useTransform`
- Keep parallax factor subtle: 0.1-0.3x scroll speed difference
- Never apply parallax to text -- only decorative/background elements

**Pinned Sections:**
- Section pins in viewport while content scrolls through
- Use `gsap` `ScrollTrigger` with `pin: true`
- Ideal for: feature showcases, step-by-step reveals, comparison sections

### 3. Page Transitions

**Cross-fade:**
- Pages fade out/in during navigation
- Use `framer-motion` `AnimatePresence` wrapping page content
- Exit: `opacity: 0`, duration 0.2s
- Enter: `opacity: 0 -> 1`, duration 0.3s, delay 0.1s

**Slide transitions:**
- Content slides in direction of navigation flow
- Forward navigation: slide left
- Back navigation: slide right
- Duration: 0.3-0.4s with ease-out

### 4. Loading States

**Skeleton screens:**
- Animated placeholder blocks matching content layout
- Use CSS `background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%)`
- Animate `background-position` for shimmer effect
- Match exact dimensions of final content

**Progress indicators:**
- Thin bar at top of viewport (NProgress style)
- Color: `#4A90FF`
- Animate width from 0% to ~90% on load start, snap to 100% on complete

## Implementation Reference Components

Reference components are in `src/components/backgrounds/`:
- `ScrollReveal.tsx` -- wrap any content for scroll-triggered fade-in

## Performance Guidelines

- `will-change` only on elements actively animating -- remove after animation completes
- Debounce `mousemove` handlers to 16ms (60fps) or use `requestAnimationFrame`
- GSAP ScrollTrigger: use `scrub: true` for scroll-linked, `scrub: 0.5` for smooth follow
- Lazy load heavy interactive components (R3F canvases, complex particle systems)
- Test on mobile -- disable hover effects on touch devices, reduce particle counts

## What NOT to Do

- CSS-only hover effects for complex interactions (scale + shadow is fine, magnetic/tilt is not)
- Animations longer than 1s for UI feedback (scroll reveals can be longer)
- Motion that blocks user interaction or obscures content
- Hover effects on mobile -- use tap feedback instead
- GSAP and framer-motion on the same element -- pick one
