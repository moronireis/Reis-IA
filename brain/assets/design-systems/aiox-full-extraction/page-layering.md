# AIOX — Layering & Breakpoints Page
URL: https://brand.aioxsquad.ai/brandbook/layering

## Page Purpose
Z-index stack and responsive breakpoint token documentation.

## Content Structure
1. **Header** — "AIOX SQUAD | LAYERING & BREAKPOINTS | V2.0 // DARK COCKPIT EDITION"
2. **Z-Index Stack** — 5 layers with visual bars
3. **Breakpoints** — 3 responsive breakpoint tokens

## Complete Token Reference

### Z-Index Layering Stack
```css
--layer-nav: 100;       /* Fixed navigation bars */
--layer-dropdown: 200;  /* Dropdowns, tooltips, popovers */
--layer-overlay: 300;   /* Backdrop overlays, dimming layers */
--layer-modal: 400;     /* Modals, dialogs, drawers */
--layer-toast: 500;     /* Toast notifications, snackbars */
```

### Responsive Breakpoints
```css
--bp-mobile: 767px;    /* Mobile max-width */
--bp-tablet: 768px;    /* Tablet min-width */
--bp-desktop: 1200px;  /* Desktop min-width */
```

## Visual Patterns
- Horizontal bars with increasing opacity (15%, 20%, 25%, 30%, 35%) for layer hierarchy
- 3-column grid for breakpoint cards

## Navigation Context
- Position: Design System > Tokens > Layering

## Key Design Decisions
- Clean 100-increment z-index system (easy mental math)
- Only 3 breakpoints (mobile/tablet/desktop) — simple but effective
- Mobile breakpoint is max-width (767px), tablet/desktop are min-width (mobile-first)
