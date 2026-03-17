# AIOX Motion System -- Full Source Extraction

Last updated: 2026-03-17
Source: https://brand.aioxsquad.ai/brandbook/motion
Pages analyzed: motion, lp-sections (motion patterns), token-export (easing curves)

---

## 1. Motion Tokens (from Token Export)

### Easing Curves

```css
/* Core easing tokens */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy overshoot -- buttons, modals, toasts */
--ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);     /* General purpose -- page transitions, fades */
--ease-decel:  cubic-bezier(0, 0, 0.2, 1);            /* Deceleration -- entrance reveals, scroll-triggered */
```

### Duration Tokens (reconstructed from usage across pages)

```css
/* Inferred duration scale */
--duration-fast:    150ms;   /* Hover states, toggles */
--duration-normal:  300ms;   /* Standard transitions */
--duration-slow:    500ms;   /* Section reveals, emphasis */
--duration-slower:  700ms;   /* Hero reveals, dramatic */
--duration-slowest: 1000ms;  /* Full page transitions */
```

---

## 2. Animation Showcase -- 8 Logo Animations

### Page Header Structure

```
Title: "Motion Showcase"
Subtitle: "AIOX Logo Animation Explorations -- Click Any Cell to Replay"
Metadata: Animation System | 8 Animations | 2026
Version: V1.0 // DARK COCKPIT EDITION
Tech badge: GPU-Accelerated (Framer Motion)
```

### Interactive Pattern: Click-to-Replay

Every animation cell has a "click to replay" label. The implementation pattern:

```tsx
// Inferred from behavior description
const [key, setKey] = useState(0);

const handleReplay = () => setKey(prev => prev + 1);

<div onClick={handleReplay} className="cursor-pointer">
  <motion.div key={key} /* animation resets on key change */>
    {/* Animation content */}
  </motion.div>
  <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/30">
    click to replay
  </span>
</div>
```

### Grid Layout for Animation Demos

```
- Parent grid: likely grid-cols-2 md:grid-cols-4 gap-px
- Each cell: dark surface with centered animation
- Hairline grid pattern (gap-px with bg-white/[0.06] parent)
- Cell metadata: numbered label (01-08), type badge, duration, context
- Cell min-height: ~300px estimated
```

---

## 3. Individual Animation Specifications

### 01 -- Orchestration Pulse

```
Type: full reveal
Duration: 3.5s
Context: hero / splash
Description: Seed dot + stagger per letter + speed lines neon + glow ring pulsating
```

**Inferred Framer Motion Config:**

```tsx
// Seed dot appears first
const seedDot = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } // spring
};

// Letters stagger in
const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.08, // stagger per letter
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1]
    }
  })
};

// Speed lines draw with stagger
const speedLine = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" }
};

// Glow ring pulse (continuous after reveal)
const glowRing = {
  animate: {
    boxShadow: [
      "0 0 8px rgba(209,255,0,0.4), 0 0 24px rgba(209,255,0,0.2)",
      "0 0 16px rgba(209,255,0,0.6), 0 0 48px rgba(209,255,0,0.3)",
      "0 0 8px rgba(209,255,0,0.4), 0 0 24px rgba(209,255,0,0.2)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  }
};
```

### 02 -- Speed Lines

```
Type: emphasis
Reference: pin 1 inspired
Duration: 2s
Description: Logo cream slides while speed lines neon draw with stagger
```

**Inferred Implementation:**

```tsx
// Logo slides in from left
const logoSlide = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8, ease: [0, 0, 0.2, 1] } // ease-decel
};

// Speed lines (SVG paths) draw sequentially
const speedLines = {
  initial: { pathLength: 0 },
  animate: { pathLength: 1 },
  transition: (i: number) => ({
    delay: 0.4 + i * 0.1,
    duration: 0.6,
    ease: "easeOut"
  })
};
// Neon color: #D1FF00 (--bb-lime / --neon)
```

### 03 -- Particle Orbit

```
Type: loop
Reference: pin 2 inspired
Context: agents
Description: Central X with spring + 4 orbital particles floating
```

**Inferred Implementation:**

```tsx
// Central X scales in with spring physics
const centralX = {
  initial: { scale: 0, rotate: -90 },
  animate: { scale: 1, rotate: 0 },
  transition: { type: "spring", stiffness: 200, damping: 15 }
};

// 4 particles orbit continuously
const orbitalParticle = (index: number) => ({
  animate: {
    rotate: 360,
    x: [0, Math.cos(index * 90 * Math.PI / 180) * 60],
    y: [0, Math.sin(index * 90 * Math.PI / 180) * 60],
  },
  transition: {
    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
    x: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
    y: { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
  }
});
```

### 04 -- Logo Dissolve

```
Type: transition
Duration: 3s
Context: exit / fade
Description: AIOX text starts solid, individual letters flicker and dissolve to nothing
```

**Inferred Implementation:**

```tsx
// Each letter gets independent flicker + fade
const letterDissolve = (i: number) => ({
  animate: {
    opacity: [1, 0.8, 1, 0.5, 0.9, 0.2, 0],
    filter: [
      "blur(0px)",
      "blur(0px)",
      "blur(1px)",
      "blur(2px)",
      "blur(1px)",
      "blur(3px)",
      "blur(8px)"
    ]
  },
  transition: {
    duration: 2 + Math.random() * 1, // 2-3s per letter, staggered randomly
    delay: i * 0.2 + Math.random() * 0.3,
    ease: "easeIn"
  }
});
```

### 05 -- Morphing Square

```
Type: loop
Subtype: shape shift
Duration: 3.5s cycle
Description: Square morphs through shapes: square -> rounded -> circle and back. Continuous loop.
```

**Inferred Implementation:**

```tsx
const morphingSquare = {
  animate: {
    borderRadius: ["0%", "15%", "50%", "15%", "0%"],
  },
  transition: {
    duration: 3.5,
    repeat: Infinity,
    ease: [0.25, 0.1, 0.25, 1] // ease-smooth
  }
};
// Size: likely w-24 h-24
// Fill: bg-[#D1FF00] or border-2 border-[#D1FF00]
```

### 06 -- Glitch Reveal

```
Type: dramatic
Duration: 2s
Context: tech / hacker
Description: Scanlines + noise + skew + hue-rotate with smooth settle. Terminal aesthetic.
```

**Inferred Implementation:**

```tsx
const glitchReveal = {
  animate: {
    skewX: [0, -5, 3, -2, 0],
    filter: [
      "hue-rotate(0deg) brightness(1)",
      "hue-rotate(90deg) brightness(1.5)",
      "hue-rotate(-60deg) brightness(0.8)",
      "hue-rotate(30deg) brightness(1.2)",
      "hue-rotate(0deg) brightness(1)"
    ],
    x: [0, -10, 5, -3, 0],
  },
  transition: {
    duration: 2,
    ease: [0, 0, 0.2, 1], // ease-decel for the settle
    times: [0, 0.2, 0.5, 0.7, 1]
  }
};

// Scanlines overlay via ::after pseudo-element
// background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)
// Noise: SVG fractal noise filter at 4% opacity
```

### 07 -- Stagger Letters

```
Type: elegant
Duration: 1.5s
Context: navbar / footer
Description: Each letter rises with spring + rotateX 3D. Neon underline closes. Clean and reusable.
Tagline: "a ia e a seta. o x e seu."
```

**Inferred Implementation:**

```tsx
const letterStagger = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.06,
      type: "spring",
      stiffness: 150,
      damping: 12
    }
  })
};

// Neon underline expands after letters settle
const underline = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      delay: 0.8, // after letters finish
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1] // ease-spring
    }
  }
};
// underline color: bg-[#D1FF00] h-[2px] origin-left
```

### 08 -- Brand Reveal

```
Type: premium
Duration: 3s
Context: landing page hero
Description: Black blinds slide open from center, revealing AIOX with scale + glow + decorative lines
```

**Inferred Implementation:**

```tsx
// Two blind panels slide away from center
const blindLeft = {
  initial: { x: "0%" },
  animate: { x: "-100%" },
  transition: { duration: 1.2, ease: [0, 0, 0.2, 1], delay: 0.3 }
};
const blindRight = {
  initial: { x: "0%" },
  animate: { x: "100%" },
  transition: { duration: 1.2, ease: [0, 0, 0.2, 1], delay: 0.3 }
};

// Logo reveals underneath with scale + glow
const logoReveal = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    textShadow: "0 0 40px rgba(209,255,0,0.6)"
  },
  transition: { delay: 1.0, duration: 1.0, ease: [0.34, 1.56, 0.64, 1] }
};

// Decorative lines extend from logo
const decorativeLine = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { delay: 1.5, duration: 0.8, ease: "easeOut" }
};
```

---

## 4. Framer Motion Reveal Patterns (from LP Sections)

These are the standard motion patterns used across ALL AIOX sections:

### Fade-Up (Most Common)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
>
```

Variants:
- `y: 30` for headlines (slightly more dramatic)
- `y: 40` for hero elements
- `duration: 0.7` for larger elements

### Staggered Children

```tsx
// Parent container
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
    />
  ))}
</motion.div>
```

Stagger values used:
- `0.04` for tight lists (table rows, tags)
- `0.08` for card grids
- `0.1` for larger section elements

### Scale Reveal

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.97 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
>
```

Used for: video previews, image panels, device mockups

### Headline Reveal (Hero)

```tsx
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
>
```

---

## 5. Ticker / Marquee Animations

### CSS Keyframes

```css
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

@keyframes ticker-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

### Usage Patterns

```tsx
/* Logo Ticker (Hero section) */
.animate-ticker {
  animation: ticker 30s linear infinite;
}

/* Pain Points dual ticker */
.animate-ticker { animation: ticker 30s linear infinite; }        /* top: left-to-right */
.animate-ticker-reverse { animation: ticker-reverse 35s linear infinite; } /* bottom: right-to-left */

/* Tech Stack Marquee */
.animate-marquee { animation: marquee 20s linear infinite; }
```

### Duplication Pattern (for seamless loop)

```tsx
// Duplicate array 3x for seamless scrolling
const tickerItems = [...logos, ...logos, ...logos];

// Or 2x for marquee
const marqueeItems = [...techs, ...techs];
```

---

## 6. Interactive Staircase Animation (HowItWorks)

```tsx
const [hovered, setHovered] = useState(0);

// Staircase offset pattern
{steps.map((step, i) => (
  <div
    key={i}
    style={{
      marginTop: isMobile ? '24px' : `${i * 50 + 24}px`
    }}
    onMouseEnter={() => setHovered(i)}
  >
    {/* step content */}
  </div>
))}

// Progress bar tracks hovered step
<div
  className="h-1 bg-aiox-lime transition-all duration-300"
  style={{ width: `${((hovered + 1) / steps.length) * 100}%` }}
/>

// 48-column tick marks below progress bar
{Array.from({ length: 48 }).map((_, i) => (
  <div key={i} className="flex-1 border-l border-black/15 h-3" />
))}
```

---

## 7. Scroll-Triggered Patterns

### whileInView Standard Config

```tsx
viewport={{ once: true }}  // Always once: true -- animate only on first scroll into view
// No threshold specified = default 0 (any pixel visible triggers)
```

### Pain Points Center Headline

```tsx
<motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="text-[clamp(2.2rem,5.5vw,5rem)] font-black leading-[0.92]"
>
```

---

## 8. Reis IA Cross-Reference

### Direct Applicability

| AIOX Pattern | Reis IA Adaptation | Priority |
|---|---|---|
| Fade-up reveals (whileInView) | Direct use -- matches minimal aesthetic | HIGH |
| Click-to-replay pattern | For interactive showcases on /builder page | MED |
| Stagger letters | Logo animation on hero | HIGH |
| ease-spring cubic-bezier | Global easing token | HIGH |
| Ticker/marquee keyframes | Technology partner strip | MED |
| Staircase layout | Methodology/process section | MED |

### Caution

| AIOX Pattern | Issue for Reis IA |
|---|---|
| Neon lime glow ring | Replace with muted gold/amber glow |
| Terminal/hacker aesthetic | Too aggressive -- use chess/hourglass motifs instead |
| Particle orbit (agents) | May imply multi-agent when Reis IA is single-strategist |

### Recommended Easing Tokens for Reis IA

```css
:root {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* From AIOX -- excellent for UI */
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);     /* From AIOX -- general purpose */
  --ease-decel:  cubic-bezier(0, 0, 0.2, 1);            /* From AIOX -- scroll reveals */
  --ease-premium: cubic-bezier(0.16, 1, 0.3, 1);        /* Add for Apple-level feel */
}
```
