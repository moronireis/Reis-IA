# AIOX — Complete CSS Token Reference
Last updated: 2026-03-16
Source: https://brand.aioxsquad.ai/
Total tokens: 120+

## 1. Color Tokens

### Lime Theme (Dark Cockpit Edition)

#### Core Surface Colors
```css
--bb-dark: oklch(0.1149 0 0);                    /* #050505 — Page base */
--bb-canvas: var(--bb-dark);                       /* Alias for page base */
--bb-surface: oklch(0.1693 0.0041 285.95);        /* #0F0F11 — Elevated cards */
--bb-surface-alt: oklch(0.231 0.0099 124.97);     /* #1C1E19 — Secondary elevation */
--bb-surface-panel: oklch(0.1785 0.0041 285.98);  /* Sidebars */
--bb-surface-console: oklch(0.184 0.0081 118.61); /* Terminal backgrounds */
--bb-surface-deep: oklch(0.13 0 0);               /* Code blocks */
--bb-surface-overlay: rgba(15,15,17,0.92);         /* Modal overlays */
--bb-surface-hover-strong: oklch(0.1971 0.006 285.84); /* Interactive states */
```
Used on: ALL pages (global theme)

#### Accent Color
```css
--bb-lime: oklch(0.934 0.2264 121.95);  /* #D1FF00 — Primary accent */
```
Used on: ALL pages (CTAs, highlights, headings, icons)

#### Text Colors
```css
--bb-cream: oklch(0.9639 0.0158 106.69);     /* #F4F4E8 — Primary text */
--bb-cream-alt: oklch(0.9644 0.0172 103.15);  /* #F5F4E7 — Warm variation */
--bb-warm-white: oklch(0.9952 0.0235 106.82); /* #FFFFED — Maximum contrast */
--bb-dim: rgba(245, 244, 231, 0.4);           /* Muted copy */
--bb-muted: oklch(0.7952 0 0);                /* Secondary text */
--bb-meta: oklch(0.6927 0 0);                 /* Metadata text */
```

#### Signal Colors
```css
--bb-blue: oklch(0.669 0.1837 248.81);   /* #0099FF — Links, info */
--bb-flare: oklch(0.631 0.2116 36.21);   /* #ED4609 — Alerts, urgency */
--bb-error: oklch(0.6368 0.2078 25.33);  /* #EF4444 — Destructive */
```

#### Neutral Scale
```css
--bb-gray-charcoal: oklch(0.36 0 0);
--bb-gray-dim: oklch(0.5208 0 0);
--bb-gray-muted: oklch(0.683 0 0);
--bb-gray-silver: oklch(0.7984 0 0);
```

#### Border Colors
```css
--bb-border: rgba(156, 156, 156, 0.15);       /* Default subtle */
--bb-border-soft: rgba(156, 156, 156, 0.10);  /* Hairline dividers */
--bb-border-strong: rgba(156, 156, 156, 0.25); /* Active sections — also #3D3D3D in hex */
--bb-border-hover: rgba(156, 156, 156, 0.24); /* Interactive */
--bb-border-input: rgba(156, 156, 156, 0.2);  /* Form inputs */
```

#### Accent Opacity Ladder (15 steps)
```css
--bb-accent-02: rgba(209, 255, 0, 0.02);
--bb-accent-05: rgba(209, 255, 0, 0.05);
--bb-accent-08: rgba(209, 255, 0, 0.08);
--bb-accent-10: rgba(209, 255, 0, 0.10);
--bb-accent-15: rgba(209, 255, 0, 0.15);
--bb-accent-20: rgba(209, 255, 0, 0.20);
--bb-accent-25: rgba(209, 255, 0, 0.25);
--bb-accent-30: rgba(209, 255, 0, 0.30);
--bb-accent-40: rgba(209, 255, 0, 0.40);
--bb-accent-50: rgba(209, 255, 0, 0.50);
--bb-accent-60: rgba(209, 255, 0, 0.60);
--bb-accent-70: rgba(209, 255, 0, 0.70);
--bb-accent-80: rgba(209, 255, 0, 0.80);
--bb-accent-90: rgba(209, 255, 0, 0.90);
```

### Gold Theme (Golden Guideline Edition)
```css
--bb-lime: #DDD1BB;           /* Champagne gold (replaces lime) */
--bb-flare: #C4B7A2;
--bb-canvas: #09090A;         /* Slightly warmer black */
--bb-surface: #151517;
--bb-foreground: #F4F4F4;     /* Neutral white (not warm cream) */
```

### Semantic Color Aliases
```css
--color-bg-void: #000000;
--color-bg-base: #050505;
--color-bg-surface: #0F0F11;
--color-bg-surface-alt: #1C1E19;
--color-bg-overlay: rgba(61,61,61,0.5);
--color-text-base: rgb(244,244,232);
--color-text-secondary: rgba(244,244,232,0.7);
--color-text-tertiary: rgba(244,244,232,0.55);
--color-text-muted: rgba(245,244,231,0.4);
```

### Glow & Neon Tokens
```css
--neon: #D1FF00;
--neon-dim: rgba(209,255,0,0.15);
--neon-glow: rgba(209,255,0,0.4);
--lime-glow: rgba(209,255,0,0.25);
--lime-glow-soft: rgba(209,255,0,0.1);
```

### Interactive State Colors
```css
--focus-brand: #D1FF00;
--focus-neutral: #BDBDBD;
--selection-bg: #050505;
--selection-fg: #D1FF00;
--warning-bg: rgba(245,158,11,0.05);
--warning-border: rgba(245,158,11,0.2);
--warning: #F59E0B;
```

## 2. Typography Tokens

### Font Families
```css
--font-bb-display: "TASAOrbiterDisplay", sans-serif;  /* Weight 800 (Black) */
--font-bb-sans: "Geist", sans-serif;                   /* Weight 400-700 */
--font-bb-mono: "Roboto Mono", monospace;              /* Weight 400-500 */
--font-sans: "Geist", "Inter", system-ui, sans-serif;  /* Export fallback stack */
--font-mono: "Geist Mono", "Roboto Mono", monospace;   /* Export fallback stack */
```

### Font Size Scale
```
4rem     — Display
2.5rem   — H1
1.5rem   — H2
1rem     — Body
0.8rem   — Small
0.65rem  — Label
0.6rem   — Micro
```

### Fluid Typography (clamp values used across site)
```css
clamp(2rem, 8vw, 6.5rem)       /* Hero headlines */
clamp(2.5rem, 5vw, 4rem)       /* Section headlines */
clamp(0.9rem, 1.5vw, 1.25rem)  /* Body/description text */
clamp(3rem, 8vw, 7rem)         /* Large stat numbers */
clamp(4rem, 10vw, 8rem)        /* Manifesto text */
clamp(2.2rem, 7vw, 6.5rem)     /* LP section headings */
clamp(2.4rem, 7vw, 6rem)       /* Pitch headings */
clamp(1.4rem, 2vw, 2rem)       /* Sub-headings */
clamp(1.5rem, 4vw, 2.5rem)     /* Medium headings */
```

### Font Weights
```css
--font-weight-thin: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
--font-weight-black: 900;
```

### Typography Utility Classes
```
font-display    → TASAOrbiter (headlines)
font-mono       → Roboto Mono (labels, technical)
font-sans       → Geist (body text)
font-bold, font-extrabold, font-medium
uppercase
tracking-[-0.05em], tracking-[-0.03em], tracking-[-0.02em], tracking-tight
tracking-[0.1em], tracking-[0.15em], tracking-[0.2em]  (mono labels)
leading-[0.68], leading-[1.05], leading-[1.1], leading-none, leading-relaxed
```

## 3. Spacing Tokens

### Named Scale
```css
--spacing-xs: 0.5rem;  /* 8px */
--spacing-sm: 1rem;    /* 16px */
--spacing-md: 2rem;    /* 32px */
--spacing-lg: 3rem;    /* 48px */
--spacing-xl: 4rem;    /* 64px */
```

### 14-Step Numeric Scale
```css
--space-0:  0px;     --space-1:  4px;     --space-2:  8px;
--space-3:  12px;    --space-4:  15px;    --space-5:  20px;
--space-6:  30px;    --space-7:  40px;    --space-8:  60px;
--space-9:  80px;    --space-10: 90px;    --space-11: 120px;
--space-12: 150px;   --space-13: 180px;
```

### Responsive Gutter
```css
--bb-gutter: clamp(1rem, 3vw, 2rem);
```

## 4. Shadow & Glow Tokens
```css
/* Neon glow box-shadows using rgba(209,255,0) */
--lime-glow: rgba(209,255,0,0.25);       /* Standard glow */
--lime-glow-soft: rgba(209,255,0,0.1);   /* Hover glow */
--neon-glow: rgba(209,255,0,0.4);        /* Strong glow */
```

## 5. Border Tokens
```css
/* Widths: 1px standard, 2px emphasis */
/* Styles: solid only */
/* Colors: see Border Colors section above */

/* Radius Scale */
--radius: 0.5rem;      /* 8px — default */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

## 6. Motion Tokens

### Easing Curves
```css
--bb-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* Bouncy overshoot */
--bb-ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);   /* Natural default */
--bb-ease-decel: cubic-bezier(0, 0, 0.2, 1);           /* Soft landing */
--bb-ease-accel: cubic-bezier(0.4, 0, 1, 1);           /* Quick start */
/* Also used: cubic-bezier(0.16, 1, 0.3, 1)            — Card reveal animations */
```

### Durations
```css
--bb-dur-fast: 0.2s;
--bb-dur-medium: 0.4s;
--bb-dur-slow: 0.7s;
/* Also used: duration-300, duration-400, duration-500 (Tailwind utilities) */
```

### Keyframe Animations
```css
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
/* animation: ticker 30s linear infinite; */

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
/* animation: marquee 20s linear infinite; */
```

### Framer Motion Presets
```javascript
// Fade-up reveal (scroll-triggered)
initial={{ opacity: 0, y: 20-40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6-0.7 }}

// Staggered children
transition={{ delay: i * 0.04-0.1 }}

// Scale reveal
initial={{ opacity: 0, scale: 0.97 }}
animate={{ opacity: 1, scale: 1 }}
```

## 7. Effects Tokens

### Glass/Blur
```css
--glass-blur: blur(10px);
--glass-blur-soft: blur(5px);
/* backdrop-filter levels: 0px, 4px, 8px, 16px */
```

### Film Grain Opacity
```
Subtle: 0.05
Light: 0.1
Medium: 0.15
Heavy: 0.25
```

### Blend Modes
multiply, screen, overlay, soft-light, color-dodge, difference

## 8. Z-Index / Layer System
```css
--layer-nav: 100;
--layer-dropdown: 200;
--layer-overlay: 300;
--layer-modal: 400;
--layer-toast: 500;
```

## 9. Breakpoints
```css
--bp-mobile: 767px;    /* Mobile max-width */
--bp-tablet: 768px;    /* Tablet min-width */
--bp-desktop: 1200px;  /* Desktop min-width */
```

Tailwind mapping: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1200px)

## 10. shadcn/ui Token Bridge (Export-Ready)
```css
:root {
  --background: #050505;
  --foreground: #F4F4E8;
  --primary: #D1FF00;
  --primary-foreground: #050505;
  --card: #0F0F11;
  --card-foreground: #F4F4E8;
  --popover: #0F0F11;
  --secondary: #1C1E19;
  --muted: #111113;
  --muted-foreground: rgba(245, 244, 231, 0.4);
  --accent: rgba(209, 255, 0, 0.1);
  --accent-foreground: #D1FF00;
  --destructive: #EF4444;
  --destructive-foreground: #FFFFFF;
  --border: rgba(156, 156, 156, 0.15);
  --input: rgba(156, 156, 156, 0.2);
  --ring: rgba(209, 255, 0, 0.4);
  --radius: 0.5rem;
  --surface: #0F0F11;
  --surface-alt: #1C1E19;
  --dim: rgba(245, 244, 231, 0.4);
  --blue: #0099FF;
  --flare: #ED4609;
  --error: #EF4444;
  --warning: #F59E0B;
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", "Roboto Mono", monospace;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-decel: cubic-bezier(0, 0, 0.2, 1);
}
```

## Reis IA Cross-Reference Notes

### Compatible Patterns
- Dark mode default (both systems use dark-first)
- Inter font is in AIOX's fallback stack (--font-sans includes "Inter")
- Single accent color approach (AIOX: lime, Reis IA: gold)
- Minimal geometric aesthetic shared
- shadcn/ui compatibility (both can use same bridge pattern)

### Requires Adaptation
- Replace #D1FF00 (lime) with gold/amber accent for Reis IA
- Replace "Geist" with "Inter" as primary font
- TASA Orbiter Display → not needed for Reis IA (Inter handles display)
- Surface colors need adjustment for Reis IA's black palette (#000000 vs #050505)
- AIOX uses oklch() — Reis IA may prefer hex/rgba for broader compatibility

### Adoptable Token Architecture
- 14-step spacing scale (excellent, directly usable)
- Accent opacity ladder (15 steps — very useful for Reis IA gold)
- Z-index layering system (100-500 increments)
- 4 easing curves + 3 durations (complete motion system)
- Border radius scale (7 values)
- Semantic text opacity tiers (100% → 70% → 55% → 40%)
