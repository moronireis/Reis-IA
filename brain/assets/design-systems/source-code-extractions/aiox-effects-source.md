# AIOX Effects System -- Full Source Extraction

Last updated: 2026-03-17
Source: https://brand.aioxsquad.ai/brandbook/effects
Additional sources: /brandbook/vfx, /brandbook/patterns, /brandbook/semantic-tokens

---

## 1. Effects Page Structure

```
Title: "Visual Effects"
Subtitle: "Visual effects and animations -- Dark Cockpit Edition"
Version: AIOX SQUAD EFFECTS LIBRARY V1.0 // DARK COCKPIT EDITION
Metadata: Effects System | 5 Sections | 2026
```

### Section Layout

4 main effect categories:
1. Ticker Strip (technology logos marquee)
2. Badge Variants (colored status badges)
3. Glow & Pulse (neon glow, spin, pulse animations)
4. Hover Effects (text hover transitions)

---

## 2. Ticker Strip Implementation

### Technology Logos

```
Items: Python, ChatGPT, AWS, Zapier, Docker, Claude, NodeJS, Vercel, Stripe
```

### CSS Animation

```css
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.ticker-strip {
  animation: ticker 30s linear infinite;
  display: flex;
  gap: 2rem;
  white-space: nowrap;
}
```

### HTML Structure Pattern

```html
<div class="overflow-hidden border-y border-white/[0.06] bg-aiox-cream">
  <div class="animate-ticker flex gap-8 py-4">
    <!-- 3x duplication for seamless loop -->
    {[...logos, ...logos, ...logos].map((logo, i) => (
      <span key={i} class="text-sm font-medium text-aiox-dark/60 whitespace-nowrap">
        {logo}
      </span>
    ))}
  </div>
</div>
```

---

## 3. Badge Variants

### Color Variants

```tsx
// Badge variant styles (reconstructed from page content)
const badgeVariants = {
  lime: {
    bg: "bg-[rgba(209,255,0,0.1)]",
    text: "text-[#D1FF00]",
    border: "border border-[rgba(209,255,0,0.2)]"
  },
  blue: {
    bg: "bg-[rgba(0,153,255,0.1)]",
    text: "text-[#0099FF]",
    border: "border border-[rgba(0,153,255,0.2)]"
  },
  error: {
    bg: "bg-[rgba(239,68,68,0.1)]",
    text: "text-[#EF4444]",
    border: "border border-[rgba(239,68,68,0.2)]"
  },
  surface: {
    bg: "bg-[var(--bb-surface)]",
    text: "text-[var(--bb-dim)]",
    border: "border border-[var(--bb-border)]"
  },
  solid: {
    bg: "bg-[#D1FF00]",
    text: "text-[#050505]",
    border: "border-transparent"
  }
};
```

### Badge Base Styles

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  font-family: "Roboto Mono", monospace;
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  border-radius: 9999px;  /* --radius-full */
  white-space: nowrap;
}
```

---

## 4. Glow & Pulse Effects

### Neon Glow

```css
.neon-glow {
  box-shadow:
    0 0 8px rgba(209, 255, 0, 0.4),
    0 0 24px rgba(209, 255, 0, 0.2);
}

/* Pulsating variant */
@keyframes neon-pulse {
  0%, 100% {
    box-shadow:
      0 0 8px rgba(209, 255, 0, 0.4),
      0 0 24px rgba(209, 255, 0, 0.2);
  }
  50% {
    box-shadow:
      0 0 16px rgba(209, 255, 0, 0.6),
      0 0 48px rgba(209, 255, 0, 0.3);
  }
}

.neon-glow-pulse {
  animation: neon-pulse 2s ease-in-out infinite;
}
```

### Spin Animation

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin {
  animation: spin 2s linear infinite;
}
```

### Pulse Animation

```css
@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.pulse {
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 5. Hover Effects

### Terms Listed

```
Automation, Intelligence, Orchestration, Integration
```

### Hover Implementation Pattern

```tsx
// Likely Framer Motion whileHover
<motion.div
  whileHover={{
    color: "#D1FF00",         // text turns neon
    x: 8,                     // slight rightward shift
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
  }}
  className="text-white/50 text-lg font-medium cursor-pointer"
>
  Automation
</motion.div>
```

---

## 6. VFX System (from /brandbook/vfx)

### Film Grain Texture Overlay

```css
/* Four intensity levels */
.grain-subtle   { opacity: 0.05; }
.grain-light    { opacity: 0.10; }
.grain-medium   { opacity: 0.15; }
.grain-heavy    { opacity: 0.25; }

/* Grain implementation via SVG noise filter */
.grain::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}
```

### Blend Modes

```css
/* Six documented blend modes */
.blend-multiply    { mix-blend-mode: multiply; }
.blend-screen      { mix-blend-mode: screen; }
.blend-overlay     { mix-blend-mode: overlay; }
.blend-soft-light  { mix-blend-mode: soft-light; }
.blend-color-dodge { mix-blend-mode: color-dodge; }
.blend-difference  { mix-blend-mode: difference; }
```

### Blur Effects (Backdrop Filter)

```css
.blur-none   { backdrop-filter: blur(0px); }
.blur-subtle { backdrop-filter: blur(4px); }
.blur-medium { backdrop-filter: blur(8px); }
.blur-heavy  { backdrop-filter: blur(16px); }

/* Standard glass effect token */
--glass-blur:      blur(10px);  /* nav, modals */
--glass-blur-soft: blur(5px);   /* tooltips, popovers */
```

### Glow Effects (Box Shadow & Text Shadow)

```css
/* Neon Glow -- full value */
.glow-neon {
  box-shadow:
    0 0 8px rgba(209, 255, 0, 0.4),
    0 0 24px rgba(209, 255, 0, 0.2);
}

/* Soft Glow */
.glow-soft {
  box-shadow: 0 0 16px rgba(209, 255, 0, 0.15);
}

/* Ring Glow */
.glow-ring {
  box-shadow:
    0 0 0 2px rgba(209, 255, 0, 0.3),
    0 0 16px rgba(209, 255, 0, 0.15);
}
```

### Glow Semantic Tokens

```css
--neon:           #D1FF00;
--neon-dim:       rgba(209, 255, 0, 0.15);
--neon-glow:      rgba(209, 255, 0, 0.4);
--lime-glow:      rgba(209, 255, 0, 0.25);
--lime-glow-soft: rgba(209, 255, 0, 0.1);
```

### Overlay Composites

```css
/* Scanlines */
.overlay-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  pointer-events: none;
}

/* Scanlines Heavy */
.overlay-scanlines-heavy::after {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(0, 0, 0, 0.25) 1px,
    rgba(0, 0, 0, 0.25) 2px
  );
}

/* CRT Effect */
.overlay-crt::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.1) 2px,
    rgba(0, 0, 0, 0.1) 4px
  );
  border-radius: inherit;
  /* Plus slight barrel distortion via border-radius or filter */
  pointer-events: none;
}

/* Vignette */
.overlay-vignette::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
  pointer-events: none;
}

/* Edge Fade */
.overlay-edge-fade::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(5, 5, 5, 0.8) 0%,
    transparent 15%,
    transparent 85%,
    rgba(5, 5, 5, 0.8) 100%
  );
  pointer-events: none;
}
```

---

## 7. Pattern Library (from /brandbook/patterns)

### Grid Patterns

```css
/* Dot Grid -- 16px spacing */
.pattern-dot-grid {
  background-image: radial-gradient(circle, rgba(209,255,0,0.3) 1px, transparent 1px);
  background-size: 16px 16px;
}

/* Dot Grid Dense -- 8px spacing */
.pattern-dot-grid--dense {
  background-image: radial-gradient(circle, rgba(209,255,0,0.3) 1px, transparent 1px);
  background-size: 8px 8px;
}

/* Dot Grid Sparse -- 32px spacing */
.pattern-dot-grid--sparse {
  background-image: radial-gradient(circle, rgba(209,255,0,0.4) 1.5px, transparent 1.5px);
  background-size: 32px 32px;
}

/* Crosshair Grid -- 80px */
.pattern-crosshair-grid {
  background-image:
    linear-gradient(rgba(209,255,0,0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(209,255,0,0.1) 1px, transparent 1px),
    radial-gradient(circle, rgba(209,255,0,0.3) 2px, transparent 2px);
  background-size: 80px 80px, 80px 80px, 80px 80px;
  background-position: center center;
}

/* Crosshair Grid Tight -- 40px */
.pattern-crosshair-grid--tight {
  background-size: 40px 40px, 40px 40px, 40px 40px;
}

/* Wireframe Perspective -- 60px with radial glow */
.pattern-wireframe-perspective {
  background-image:
    linear-gradient(rgba(209,255,0,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(209,255,0,0.08) 1px, transparent 1px),
    radial-gradient(ellipse at center, rgba(209,255,0,0.15) 0%, transparent 60%);
  background-size: 60px 60px, 60px 60px, 100% 100%;
}

/* Symbol Grid -- 32px SVG X-marks */
.pattern-symbol-grid {
  background-image: url("data:image/svg+xml,..."); /* SVG with X mark */
  background-size: 32px 32px;
}

/* Plus Grid -- 32px SVG plus signs */
.pattern-plus-grid {
  background-image: url("data:image/svg+xml,..."); /* SVG with + mark */
  background-size: 32px 32px;
}
```

### HUD Frames

```css
/* Frame Bracket -- corner brackets */
.frame-bracket {
  position: relative;
}
.frame-bracket::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border-top: 1px solid #D1FF00;
  border-left: 1px solid #D1FF00;
}
.frame-bracket::after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-bottom: 1px solid #D1FF00;
  border-right: 1px solid #D1FF00;
}

/* Frame Bracket Full -- all four corners */
.frame-bracket--full {
  position: relative;
}
.frame-bracket--full::before,
.frame-bracket--full::after {
  /* top-left and top-right */
}
.frame-bracket--full .frame-bracket__inner::before,
.frame-bracket--full .frame-bracket__inner::after {
  /* bottom-left and bottom-right */
}

/* Frame Tech -- clip-path polygon */
.frame-tech {
  clip-path: polygon(
    12px 0%, calc(100% - 12px) 0%,
    100% 12px, 100% calc(100% - 12px),
    calc(100% - 12px) 100%, 12px 100%,
    0% calc(100% - 12px), 0% 12px
  );
  border: 1px solid #D1FF00;
}

/* Frame Tech Small -- 8px corners */
.frame-tech--sm {
  clip-path: polygon(
    8px 0%, calc(100% - 8px) 0%,
    100% 8px, 100% calc(100% - 8px),
    calc(100% - 8px) 100%, 8px 100%,
    0% calc(100% - 8px), 0% 8px
  );
}

/* Frame Tech Large -- 20px corners */
.frame-tech--lg {
  clip-path: polygon(
    20px 0%, calc(100% - 20px) 0%,
    100% 20px, 100% calc(100% - 20px),
    calc(100% - 20px) 100%, 20px 100%,
    0% calc(100% - 20px), 0% 20px
  );
}

/* Frame Notch TR -- top-right notch */
.frame-notch-tr {
  clip-path: polygon(
    0% 0%, calc(100% - 16px) 0%,
    100% 16px, 100% 100%,
    0% 100%
  );
}

/* Frame Notch BL -- bottom-left notch */
.frame-notch-bl {
  clip-path: polygon(
    0% 0%, 100% 0%,
    100% 100%, 16px 100%,
    0% calc(100% - 16px)
  );
}

/* Frame Notch Both -- TR + BL */
.frame-notch-both {
  clip-path: polygon(
    0% 0%, calc(100% - 16px) 0%,
    100% 16px, 100% 100%,
    16px 100%, 0% calc(100% - 16px)
  );
}
```

### Hazard / Warning Patterns

```css
/* Hazard Stripes -- bold 10px diagonal */
.pattern-hazard {
  background: repeating-linear-gradient(
    -45deg,
    #D1FF00,
    #D1FF00 10px,
    #000000 10px,
    #000000 20px
  );
}

/* Hazard Thin -- 5px stripes */
.pattern-hazard--thin {
  background: repeating-linear-gradient(
    -45deg,
    #D1FF00,
    #D1FF00 5px,
    #000000 5px,
    #000000 10px
  );
}

/* Hazard Subtle -- 15% opacity */
.pattern-hazard--subtle {
  background: repeating-linear-gradient(
    -45deg,
    rgba(209,255,0,0.15),
    rgba(209,255,0,0.15) 10px,
    transparent 10px,
    transparent 20px
  );
}

/* Warning Bar */
.bar-warning {
  background: #D1FF00;
  color: #000000;
  /* Diagonal stripe accent on right edge */
  border-right: 4px solid;
  border-image: repeating-linear-gradient(
    -45deg, #000 0px, #000 5px, #D1FF00 5px, #D1FF00 10px
  ) 4;
}
```

### Circuit Traces

```css
/* Circuit Horizontal -- SVG path */
.pattern-circuit-h {
  background-image: url("data:image/svg+xml,..."); /* horizontal trace with solder points */
  background-repeat: repeat-x;
  background-size: auto 20px;
}

/* Circuit Board -- 80px tiling SVG */
.pattern-circuit-board {
  background-image: url("data:image/svg+xml,..."); /* PCB traces + junction nodes */
  background-size: 80px 80px;
}
```

### Textures

```css
/* Scanlines -- 2px repeating */
.pattern-scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(209,255,0,0.15) 2px,
    rgba(209,255,0,0.15) 4px
  );
}

/* Scanlines Heavy */
.pattern-scanlines--heavy {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 1px,
    rgba(209,255,0,0.25) 1px,
    rgba(209,255,0,0.25) 2px
  );
}

/* Noise Texture -- SVG fractal noise */
.pattern-noise::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.04;
  mix-blend-mode: overlay;
  pointer-events: none;
}

/* Data Rain -- vertical gradient columns */
.pattern-data-rain {
  background-image:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 39px,
      rgba(209,255,0,0.08) 39px,
      rgba(209,255,0,0.08) 40px
    ),
    linear-gradient(
      to bottom,
      rgba(209,255,0,0.15),
      transparent 50%,
      rgba(209,255,0,0.1)
    );
  background-size: 40px 100%, 100% 100%;
}

/* Industrial Surface */
.pattern-industrial {
  background: linear-gradient(
    180deg,
    rgba(255,255,255,0.03) 0%,
    rgba(0,0,0,0.1) 20%,
    rgba(0,0,0,0.2) 50%,
    rgba(255,255,255,0.02) 80%,
    rgba(0,0,0,0.15) 100%
  );
}
```

### Dividers & Separators

```css
/* Tech Divider -- centered gradient line */
.divider-tech {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(209,255,0,0.5),
    transparent
  );
}

/* Arrow Divider */
.divider-arrow {
  display: flex;
  align-items: center;
}
.divider-arrow::before {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #D1FF00);
}
.divider-arrow::after {
  content: "";
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid #D1FF00;
}

/* Dashed Divider */
.divider-dashed {
  height: 1px;
  background: repeating-linear-gradient(
    90deg,
    rgba(209,255,0,0.5),
    rgba(209,255,0,0.5) 8px,
    transparent 8px,
    transparent 16px
  );
}

/* Double Divider */
.divider-double {
  height: 7px; /* 1px + 5px gap + 1px */
  background:
    linear-gradient(90deg, transparent, rgba(209,255,0,0.5), transparent) top / 100% 1px no-repeat,
    linear-gradient(90deg, transparent, rgba(209,255,0,0.5), transparent) bottom / 100% 1px no-repeat;
}
```

---

## 8. Reis IA Cross-Reference

### Directly Reusable for Reis IA

| Effect | Adaptation | Notes |
|---|---|---|
| Backdrop blur scale | Use as-is | blur(4/8/16px) universal |
| Vignette overlay | Use with black bg | Matches dark mode aesthetic |
| Grain texture (SVG noise) | Use at 0.03-0.05 opacity | Adds premium texture |
| Tech divider | Replace lime with gold | Section separator |
| Frame bracket corners | Replace lime with white/gold | Premium containment for hero |
| Edge fade overlay | Direct use | Content edge treatment |

### Replace Color Before Using

All effects use `rgba(209,255,0,...)` (lime neon). For Reis IA:
- Replace with `rgba(196,164,106,...)` (muted gold) or `rgba(255,255,255,...)` (white)
- Reduce glow intensities by ~30% for more premium, less "tech/gaming" feel

### Skip for Reis IA

| Pattern | Reason |
|---|---|
| Hazard stripes | Too industrial, conflicts with premium aesthetic |
| Circuit traces | Too literal tech, Reis IA uses chess/hourglass metaphors |
| Data rain | Matrix aesthetic -- not aligned |
| CRT effect | Retro-tech, doesn't match Apple-level premium |
