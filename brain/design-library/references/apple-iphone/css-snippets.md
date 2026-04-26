# Apple iPhone — CSS Snippets

> **Status**: [NEEDS PLAYWRIGHT] — WebFetch cannot retrieve Apple's external stylesheets. Apple ships CSS through obfuscated bundle URLs (ac.cdn-apple.com) that require full-browser rendering to enumerate.

## What we know from observation

### Typography scale (inferred, needs confirmation)
```css
/* Apple uses SF Pro Display / SF Pro Text — for REIS [IA] substitute Inter */
--type-hero:      clamp(48px, 7vw, 96px);  /* chapter opening */
--type-display:   clamp(40px, 5vw, 64px);  /* feature headline */
--type-section:   clamp(28px, 3vw, 40px);  /* section title */
--type-body-lg:   21px;                    /* lede paragraph */
--type-body:      17px;                    /* default copy */
--type-caption:   12px;                    /* legal/fine print */

--weight-hero:    600;  /* semibold, not black — Apple avoids 700+ at hero size */
--weight-body:    400;
--tracking-hero:  -0.015em;  /* tight, never loose */
```

### Color surface (observed)
```css
--surface-black:     #000000;
--surface-near-black:#1d1d1f;  /* Apple's signature off-black */
--ink-primary:       #f5f5f7;  /* Apple's signature off-white */
--ink-secondary:     #86868b;  /* muted gray for meta copy */
--accent-blue:       #0071e3;  /* Apple CTA blue */
```

### Spacing rhythm (inferred from section pacing)
```css
--section-y:    clamp(80px, 12vh, 160px);  /* generous vertical */
--content-max:  980px;                      /* narrower than you'd expect */
--gutter:       22px;
```

## To retrieve with Playwright
- `<link rel="stylesheet">` URLs and their actual contents
- Computed styles on `.headline`, `.hero`, `.chapter` elements
- `@keyframes` definitions
- CSS custom properties declared on `:root` or `html`
- Media query breakpoints (Apple uses 734px, 1068px, 1441px historically)
