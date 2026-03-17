# AIOX — Foundations Page
URL: https://brand.aioxsquad.ai/brandbook/foundations

## Page Purpose
Master design token reference. Documents typography, color system (Lime + Gold themes), spacing, motion, surfaces, layering, semantic tokens, and shadcn/ui mapping.

## Content Structure
1. **Header** — "AIOX SQUAD | DESIGN FOUNDATIONS | V2.0 // LIME + GOLD EDITIONS"
2. **01 Typography** — Font families (TASA Orbiter Black 800, Geist Semibold, Roboto Mono Medium) and size scale (4rem display → 0.6rem micro)
3. **02 Color System** — Lime Theme (Dark Cockpit) + Gold Theme (Golden Guideline) with full palette
4. **03 Spacing (Named)** — xs/sm/md/lg/xl (8px → 64px)
5. **04 Spacing (Numeric)** — 14-step scale (0 → 180px)
6. **05 Motion & Easing** — 4 curves + 3 durations
7. **06 Surfaces & Borders** — Elevation stack, border tokens, radius scale
8. **07 Layering & Breakpoints** — Z-index stack (100-500) + responsive breakpoints
9. **08 Semantic Tokens** — Background, text, glow, interactive states, font weights, shadcn/ui mapping

## CSS Patterns — COMPLETE TOKEN REFERENCE

### Typography Tokens
```css
--font-bb-display: "TASAOrbiterDisplay", sans-serif; /* weight 800 (Black) */
--font-bb-sans: "Geist", sans-serif; /* weight 400-700 */
--font-bb-mono: "Roboto Mono", monospace; /* weight 400-500 */
```

Font size scale: 4rem (Display), 2.5rem (H1), 1.5rem (H2), 1rem (Body), 0.8rem (Small), 0.65rem (Label), 0.6rem (Micro)

### Color Tokens — Lime Theme
```css
--bb-lime: oklch(0.934 0.2264 121.95);
--bb-dark: oklch(0.1149 0 0);
--bb-canvas: var(--bb-dark);
--bb-surface: oklch(0.1693 0.0041 285.95);
--bb-surface-alt: oklch(0.231 0.0099 124.97);
--bb-surface-panel: oklch(0.1785 0.0041 285.98);
--bb-surface-console: oklch(0.184 0.0081 118.61);
--bb-surface-hover-strong: oklch(0.1971 0.006 285.84);
--bb-cream: oklch(0.9639 0.0158 106.69);
--bb-cream-alt: oklch(0.9644 0.0172 103.15);
--bb-warm-white: oklch(0.9952 0.0235 106.82);
--bb-dim: rgba(245, 244, 231, 0.4);
--bb-muted: oklch(0.7952 0 0);
--bb-meta: oklch(0.6927 0 0);
--bb-blue: oklch(0.669 0.1837 248.81);
--bb-flare: oklch(0.631 0.2116 36.21);
--bb-error: oklch(0.6368 0.2078 25.33);
--bb-gray-charcoal: oklch(0.36 0 0);
--bb-gray-dim: oklch(0.5208 0 0);
--bb-gray-muted: oklch(0.683 0 0);
--bb-gray-silver: oklch(0.7984 0 0);
--bb-border: rgba(156, 156, 156, 0.15);
--bb-border-soft: rgba(156, 156, 156, 0.10);
--bb-border-strong: rgba(156, 156, 156, 0.25);
--bb-border-hover: rgba(156, 156, 156, 0.24);
--bb-border-input: rgba(156, 156, 156, 0.2);
```

### Accent Opacity Ladder (Lime)
```css
--bb-accent-02 through --bb-accent-90: rgba(209, 255, 0, 0.02) to rgba(209, 255, 0, 0.9)
```

### Named Spacing
```css
--spacing-xs: 0.5rem; /* 8px */
--spacing-sm: 1rem;   /* 16px */
--spacing-md: 2rem;   /* 32px */
--spacing-lg: 3rem;   /* 48px */
--spacing-xl: 4rem;   /* 64px */
```

### Numeric Spacing Scale (14 steps)
```css
--space-0: 0px;    --space-1: 4px;    --space-2: 8px;
--space-3: 12px;   --space-4: 15px;   --space-5: 20px;
--space-6: 30px;   --space-7: 40px;   --space-8: 60px;
--space-9: 80px;   --space-10: 90px;  --space-11: 120px;
--space-12: 150px; --space-13: 180px;
```

### Motion & Easing
```css
--bb-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--bb-ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
--bb-ease-decel: cubic-bezier(0, 0, 0.2, 1);
--bb-ease-accel: cubic-bezier(0.4, 0, 1, 1);
--bb-dur-fast: 0.2s;
--bb-dur-medium: 0.4s;
--bb-dur-slow: 0.7s;
```

### Glass Effects
```css
--glass-blur: blur(10px);
--glass-blur-soft: blur(5px);
```

### Layering (Z-Index)
```css
--layer-nav: 100;
--layer-dropdown: 200;
--layer-overlay: 300;
--layer-modal: 400;
--layer-toast: 500;
```

### Breakpoints
```css
--bp-mobile: 767px;
--bp-tablet: 768px;
--bp-desktop: 1200px;
```

### Border Radius
```css
--radius: 0.5rem;     /* 8px */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
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

### shadcn/ui Token Mapping
```css
--background: var(--bb-dark);           /* #050505 */
--foreground: var(--bb-cream);          /* rgb(244,244,232) */
--card: var(--bb-surface);              /* #0F0F11 */
--popover: var(--bb-surface);           /* #0F0F11 */
--primary: var(--bb-lime);              /* #D1FF00 */
--primary-foreground: var(--bb-dark);
--accent: var(--bb-lime);
--accent-foreground: var(--bb-dark);
--muted: var(--bb-gray-charcoal);
--muted-foreground: var(--bb-gray-dim);
--destructive: var(--bb-error);         /* #EF4444 */
--ring: var(--bb-lime);
--radius: 0.5rem;
```

### Gold Theme Overrides
```css
--bb-lime: #DDD1BB;        /* champagne gold instead of lime */
--bb-flare: #C4B7A2;
/* Canvas: #09090A, Surface: #121213, etc. */
```

## JavaScript Interactions
- Theme toggle between Lime and Gold editions
- React Server Components streaming

## Components Used
- BrandbookSiteNav, BrandbookThemeRoot, header with 3-column metadata

## Navigation Context
- Position: Foundations (under Brandbook section and also first under Design System > Tokens)
- Critical reference page — most other pages build on these tokens

## Key Design Decisions
- OKLCH color space for precise color control
- Dual theme system (Lime = neon energy, Gold = premium warmth)
- Non-linear spacing scale (micro precision 4-15px, then geometric 20-180px)
- 4 easing curves covering all motion needs (spring, smooth, decel, accel)
- shadcn/ui compatibility built in from the start
- Border system uses rgba for consistent transparency across themes
