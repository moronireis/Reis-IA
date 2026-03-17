# AIOX — Semantic Tokens Page
URL: https://brand.aioxsquad.ai/brandbook/semantic-tokens

## Page Purpose
Semantic token aliases, glow/neon tokens, interactive states, font weights, and shadcn/ui compatibility mapping.

## Content Structure
1. **Header** — "AIOX SQUAD | SEMANTIC TOKENS | V2.0 // DARK COCKPIT EDITION"
2. **Semantic Backgrounds** — 5 background tokens
3. **Semantic Text** — 4 text color tokens
4. **Glow & Neon** — 5 glow/neon tokens
5. **Interactive States** — 6 state tokens
6. **Font Weights** — 7 weight tokens
7. **shadcn/ui Mapping** — Complete bridge mapping

## Complete Token Reference

### Semantic Backgrounds
```css
--color-bg-void: #000000;               /* Absolute black, overlays */
--color-bg-base: #050505;               /* Page background canvas */
--color-bg-surface: #0F0F11;            /* Elevated surfaces */
--color-bg-surface-alt: #1C1E19;        /* Nested cards */
--color-bg-overlay: rgba(61,61,61,0.5); /* Modal backdrop */
```

### Semantic Text
```css
--color-text-base: rgb(244,244,232);          /* Primary reading text */
--color-text-secondary: rgba(244,244,232,0.7); /* Descriptions */
--color-text-tertiary: rgba(244,244,232,0.55); /* Metadata */
--color-text-muted: rgba(245,244,231,0.4);     /* Dim labels */
```

### Glow & Neon
```css
--neon: #D1FF00;                         /* Brand neon */
--neon-dim: rgba(209,255,0,0.15);        /* Subtle tint */
--neon-glow: rgba(209,255,0,0.4);        /* Strong glow */
--lime-glow: rgba(209,255,0,0.25);       /* Box-shadow glow */
--lime-glow-soft: rgba(209,255,0,0.1);   /* Hover state glow */
```

### Interactive States
```css
--focus-brand: #D1FF00;                     /* Focus ring on brand elements */
--focus-neutral: #BDBDBD;                   /* Focus ring on neutral elements */
--selection-bg: #050505;                    /* Text selection background */
--selection-fg: #D1FF00;                    /* Text selection foreground */
--warning-bg: rgba(245,158,11,0.05);        /* Warning background */
--warning-border: rgba(245,158,11,0.2);     /* Warning border */
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

### shadcn/ui Mapping
```css
--background: #050505;           /* → --bb-dark */
--foreground: rgb(244,244,232);  /* → --bb-cream */
--card: #0F0F11;                 /* → --bb-surface */
--popover: #0F0F11;              /* → --bb-surface */
--primary: #D1FF00;              /* → --bb-lime */
--primary-foreground: #050505;   /* → --bb-dark */
--accent: #D1FF00;               /* → --bb-lime */
--accent-foreground: #050505;    /* → --bb-dark */
--muted: var(--bb-gray-charcoal);
--muted-foreground: var(--bb-gray-dim);
--destructive: #EF4444;          /* → --bb-error */
--ring: #D1FF00;                 /* → --bb-lime */
--radius: 0.5rem;
```

## Navigation Context
- Position: Design System > Tokens > Semantic Tokens

## Key Design Decisions
- 4-tier text opacity hierarchy (100% → 70% → 55% → 40%)
- Glow tokens enable neon effect system without magic numbers
- shadcn/ui bridge enables drop-in component compatibility
- Warning states use amber/yellow (not lime) for differentiation
- Selection colors invert (dark bg + lime fg) for high contrast
