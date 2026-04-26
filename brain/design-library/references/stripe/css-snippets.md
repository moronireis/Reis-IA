# Stripe — CSS Snippets

> **Status**: [NEEDS PLAYWRIGHT] — Stripe ships fragment shaders as inline string literals inside bundled JS. WebFetch cannot retrieve them.

## Inferred tokens

### Color (Stripe public palette)
```css
--stripe-purple:     #635BFF;  /* signature CTA */
--stripe-navy:       #0A2540;  /* dark surface */
--stripe-slate:      #425466;  /* body text on light */
--stripe-mist:       #ADBDCC;  /* borders */
--stripe-cream:      #F6F9FC;  /* alt surface */
--stripe-success:    #00D924;
/* For REIS [IA] adaptation: swap #635BFF → #4A90FF, keep the surface logic */
```

### Typography
```css
/* Stripe uses "sohne-var" (custom) — for REIS [IA] Inter is equivalent */
--type-hero:     clamp(56px, 6.4vw, 94px);
--type-display:  clamp(36px, 4vw, 56px);
--type-title:    24px;
--type-body:     17px;
--type-meta:     14px;

--weight-display: 500;   /* NOT 700 — Stripe avoids heavy weights */
--weight-body:    400;
--weight-meta:    420;   /* variable font sweet spot */

--line-hero:     1.08;
--line-body:     1.55;
```

### Space
```css
--section-y:   clamp(96px, 12vh, 160px);
--card-p:      32px;
--gutter:      24px;
--content-max: 1080px;
```

### Shadow system
```css
--shadow-card-rest:  0 2px 5px rgba(50,50,93,0.08), 0 1px 2px rgba(0,0,0,0.05);
--shadow-card-hover: 0 13px 27px rgba(50,50,93,0.18), 0 8px 16px rgba(0,0,0,0.08);
/* Two-layer shadow is the Stripe signature — ambient + direct */
```

### Card hover lift
```css
.card {
  transition: transform 220ms cubic-bezier(0.2, 0, 0, 1),
              box-shadow 220ms cubic-bezier(0.2, 0, 0, 1);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card-hover);
}
```

## To retrieve with Playwright
- The WebGL shader source (search bundle for `gl_FragColor`, `uniform float u_time`)
- The mesh gradient color stops and noise parameters
- Actual custom property names (Stripe prefixes with `--sds-` internally)
