# AIOX — Surfaces & Borders Page
URL: https://brand.aioxsquad.ai/brandbook/surfaces

## Page Purpose
Surface elevation system, border tokens, radius scale, and glass effects documentation.

## Content Structure
1. **Header** — "AIOX SQUAD | SURFACES & BORDERS | V2.0 // DARK COCKPIT EDITION"
2. **Surface Tokens** — 8 surface elevation levels
3. **Border Tokens** — 5 border variants
4. **Border Radius Scale** — 7 radius values
5. **Glass Effects** — 2 blur values

## Complete Token Reference

### Surface Elevation Stack
```css
--bb-dark: #050505;                        /* Page base, canvas */
--bb-surface: #0F0F11;                     /* Elevated cards, panels */
--bb-surface-alt: #1C1E19;                 /* Secondary elevation */
--bb-surface-deep: oklch(0.13 0 0);        /* Code blocks */
--bb-surface-overlay: rgba(15,15,17,0.92); /* Modal overlays */
--bb-surface-panel: oklch(0.15 0.005 280); /* Sidebars */
--bb-surface-console: oklch(0.11 0.005 280); /* Terminal backgrounds */
--bb-surface-hover-strong: oklch(0.22 0.06 283); /* Interactive states */
```

### Border Tokens
```css
--bb-border: rgba(156,156,156,0.15);       /* Default subtle */
--bb-border-soft: rgba(156,156,156,0.15);  /* Semantic alias */
--bb-border-strong: #3D3D3D;               /* High-contrast */
--bb-border-hover: rgba(156,156,156,0.24); /* Interactive */
--bb-border-input: rgba(156,156,156,0.2);  /* Form inputs */
```

### Border Radius Scale
```css
--radius: 0.5rem;      /* 8px — default */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

### Glass Effects
```css
--glass-blur: blur(10px);      /* Standard */
--glass-blur-soft: blur(5px);  /* Subtle */
```

## Visual Patterns
- Auto-fit grid with 80px color preview blocks
- Token name in lime, value in cream, description in dim
- 1px gap separators (border-color background technique)

## Navigation Context
- Position: Design System > Tokens > Surfaces & Borders

## Key Design Decisions
- 8 distinct surface levels for complex UI elevation
- Semantic border aliases (soft = default for interchangeability)
- Glass blur for overlay/modal backdrops
- OKLCH for precise surface colors, rgba for borders (consistency)
