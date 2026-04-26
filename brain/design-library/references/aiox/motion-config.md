# AIOX Squad -- Motion Configuration
## Source: https://brand.aioxsquad.ai/
## Extracted: 2026-04-22

---

## Detected Motion Library: Framer Motion (GPU-Accelerated)

Evidence from source:
- `Framer` string found in html-motion.html (1 occurrence)
- `motion` references in html-motion.html (14 occurrences) and CSS (6 occurrences)
- `Motion` capitalized references (5 occurrences) -- component names
- Motion page explicitly states: "Library: Framer Motion (GPU-Accelerated)"
- No GSAP, Three.js, Lenis, or Spline detected in any harvested page

---

## Animation Catalog (8 Named Animations)

### 1. Orchestration Pulse
- **Duration:** 3.5s
- **Use case:** Hero/splash reveal
- **Technique:** Seed dot + stagger per letter + speed lines neon + glow ring pulsante
- **Complexity:** High -- multi-stage choreography

### 2. Speed Lines
- **Duration:** 2s
- **Use case:** Emphasis animation
- **Technique:** Logo cream slides while speed lines neon draw with stagger
- **Complexity:** Medium

### 3. Particle Orbit
- **Duration:** Loop (infinite)
- **Use case:** Agent animation
- **Technique:** X central with spring physics + 4 orbital particles
- **Physics:** Spring-based (Framer Motion spring)
- **Complexity:** Medium-high

### 4. Logo Dissolve
- **Duration:** 3s
- **Use case:** Transition/exit
- **Technique:** AIOX text flicker and dissolve to nothing
- **Complexity:** Medium

### 5. Morphing Square
- **Duration:** 3.5s
- **Use case:** Continuous loop
- **Technique:** Square to rounded to circle and back (border-radius morph)
- **Complexity:** Low-medium

### 6. Glitch Reveal
- **Duration:** 2s
- **Use case:** Dramatic tech effect
- **Technique:** Scanlines + noise + skew + hue-rotate with soft settle
- **CSS filters:** hue-rotate, brightness
- **Complexity:** High

### 7. Stagger Letters
- **Duration:** 1.5s
- **Use case:** Navbar/footer animation
- **Technique:** Each letter rises with spring + rotateX 3D
- **Physics:** Spring (mass, stiffness, damping from Framer Motion)
- **Complexity:** Medium

### 8. Brand Reveal
- **Duration:** 3s
- **Use case:** Premium landing page hero
- **Technique:** Black blinds sliding open + scale + glow + decorative lines
- **Complexity:** High

---

## CSS Animations (from stylesheet)

### Keyframes Detected

| Name | Description | Duration |
|------|-------------|----------|
| `bb-ticker` | Brand ticker strip horizontal scroll | 30s / 35s / 40s linear infinite |
| `spin` | Standard rotation | 1s linear infinite |
| `ping` | Scale up + fade out | 1s cubic-bezier(0,0,.2,1) infinite |
| `pulse` | Opacity pulse | 2s cubic-bezier(.4,0,.6,1) infinite |
| `enter` | Enter animation (translate3d + scale3d + rotate + blur) | 0.15s ease |
| `exit` | Exit animation (mirror of enter) | 0.15s ease |
| `accordion-down` | Accordion expand | 0.2s ease-out |
| `accordion-up` | Accordion collapse | 0.2s ease-out |
| `fadeInSubtle` | Subtle fade-in | 0.4s forwards |

### CSS Transitions

```css
/* Card hover -- signature easing */
transition: transform .3s cubic-bezier(.22, 1, .36, 1),
            box-shadow .3s cubic-bezier(.22, 1, .36, 1);

/* Card background transition */
transition: all .3s cubic-bezier(.22, 1, .36, 1);
```

### Signature Easing Curve

**`cubic-bezier(.22, 1, .36, 1)`** -- used consistently across card hovers and interactive elements. This is a deceleration curve (ease-out variant) with a sharp initial movement that settles smoothly. Very similar to Apple's spring-like CSS easing.

### Tailwind Built-in Easings

| Token | Value |
|-------|-------|
| `--ease-out` | `cubic-bezier(0, 0, .2, 1)` |
| `--ease-in-out` | `cubic-bezier(.4, 0, .2, 1)` |

---

## VFX Effects System

### Film Grain
- CSS overlay technique with noise texture
- Opacity levels: 0.05 (subtle), 0.10 (light), 0.15 (medium), 0.25 (heavy)

### Blend Modes Used
- multiply, screen, overlay, soft-light, color-dodge, difference

### Backdrop Blur Scale
- 0px (none), 4px (subtle), 8px (medium), 16px (heavy)

### Glow Effects
- **Neon Glow:** Nested box-shadow (multiple layers, lime color)
- **Soft Glow:** Reduced opacity variant
- **Ring Glow:** Ring + shadow composite layers

### Overlay Composites
- Scanlines overlay
- CRT effect (retro display simulation)
- Vignette (edge darkening)
- Edge fade

---

## Effects Page Animations

### Glow and Pulse
- Neon Glow (persistent glow)
- Spin animation
- Pulse animation

### Hover Effects (4 interactive states)
- Automation, Intelligence, Orchestration, Integration
- Likely using Framer Motion `whileHover` + `whileTap`

---

## Ticker Strip Animation

```css
animation: bb-ticker 30s linear infinite;  /* default speed */
animation: bb-ticker 35s linear infinite;  /* slower variant */
animation: bb-ticker 40s linear infinite;  /* slowest variant */
```

Technologies in ticker: Python, ChatGPT, AWS, Zapier, Docker, Claude, NodeJS, Vercel, Stripe

---

## Cross-Reference: REIS [IA] Applicability

| AIOX Motion Pattern | REIS [IA] Adaptation |
|---------------------|---------------------|
| Orchestration Pulse (3.5s hero reveal) | Adapt for AGENTES [IA] hero -- agent orchestration splash |
| Stagger Letters (spring + rotateX 3D) | High value -- adapt for headline reveals |
| `cubic-bezier(.22, 1, .36, 1)` easing | Worth adopting as standard card/hover easing |
| Film grain overlay system | Already in our pattern library -- validate opacity scale |
| Glitch Reveal (scanlines + noise + skew) | Useful for dramatic section transitions |
| bb-ticker (30s linear infinite) | Adapt for tech/partner logo ticker strip |
| Framer Motion spring physics | Consider for particle/orbit animations if we adopt FM |
