# Porsche Taycan — CSS Snippets

> **Status**: [NEEDS PLAYWRIGHT] — Porsche.com ships CSS through obfuscated Storyblok + CDN bundles. WebFetch cannot enumerate them.

## Inferred tokens (from rendered behavior)

### Color
```css
--surface-deep:      #0e0e10;   /* hero background, deeper than Apple's near-black */
--surface-mid:       #1a1a1a;
--surface-card:      #232326;
--ink-primary:       #ffffff;
--ink-secondary:     rgba(255,255,255,0.72);
--ink-tertiary:      rgba(255,255,255,0.48);
--divider:           rgba(255,255,255,0.08);
/* No brand color on chrome. Car paint IS the accent. */
```

### Typography
```css
/* Porsche uses custom "Porsche Next" — for REIS [IA] substitute Inter */
--type-metric-hero:  clamp(64px, 9vw, 128px);  /* performance numbers */
--type-display:      clamp(40px, 5vw, 72px);
--type-body:         17px;
--weight-metric:     500;   /* medium, never bold — restraint */
--tracking-metric:   -0.02em;
```

### Layout
```css
--content-max:     1440px;
--grid-gutter:     24px;
--section-y:       clamp(96px, 14vh, 192px);
--variant-aspect:  5000 / 1390;  /* enforced on every variant card */
```

### Images
- WebP/AVIF with responsive `/m/` Storyblok resize parameter
- Srcset breakpoints likely: 640 / 1024 / 1440 / 1920 / 2880
- All variant shots cropped to identical bounding box programmatically

## To retrieve with Playwright
- Porsche Next font-face declarations (if public)
- Exact scroll-smoothing implementation (Lenis? Locomotive? Native?)
- Hotspot interaction component source
- Actual computed background values on `.surface-deep`
