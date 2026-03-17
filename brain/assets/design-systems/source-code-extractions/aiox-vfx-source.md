# AIOX VFX System -- Full Source Extraction

Last updated: 2026-03-17
Source: https://brand.aioxsquad.ai/brandbook/vfx
Additional sources: /brandbook/effects, /brandbook/semantic-tokens, /brandbook/surfaces

---

## 1. VFX Page Structure

```
Title: "VFX System -- AIOX Brandbook"
Subtitle: "Grain, Blend Modes, Blur, Glow & Overlay Effects // 2026"
Version: V1.0 // DARK COCKPIT EDITION
Metadata: Visual Effects | 5 Sections | 2026
```

---

## 2. Film Grain Texture Overlay (Section 01)

### Four Intensity Levels

```css
/* Subtle grain -- background texture, hero sections */
.grain-5 {
  position: relative;
}
.grain-5::after {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  pointer-events: none;
  z-index: 1;
}

/* Light grain */
.grain-10::after { opacity: 0.10; }

/* Medium grain */
.grain-15::after { opacity: 0.15; }

/* Heavy grain -- dramatic overlays, image treatments */
.grain-25::after { opacity: 0.25; }
```

### React Component Pattern

```tsx
interface GrainOverlayProps {
  opacity?: number; // 0.05 | 0.10 | 0.15 | 0.25
  className?: string;
}

const GrainOverlay = ({ opacity = 0.05, className }: GrainOverlayProps) => (
  <div
    className={cn("pointer-events-none absolute inset-0 z-10", className)}
    style={{
      opacity,
      backgroundImage: `url("data:image/svg+xml,...")`,
      mixBlendMode: "overlay"
    }}
  />
);
```

---

## 3. Blend Modes (Section 02)

### Six Documented Modes

```css
/* Each shown with a "SAMPLE" indicator on the demo panel */

.blend-multiply {
  mix-blend-mode: multiply;
  /* Darkens -- good for overlaying text on images */
}

.blend-screen {
  mix-blend-mode: screen;
  /* Lightens -- good for glow effects on dark bg */
}

.blend-overlay {
  mix-blend-mode: overlay;
  /* Contrast boost -- used by grain texture */
}

.blend-soft-light {
  mix-blend-mode: soft-light;
  /* Subtle contrast -- used for photographic overlays */
}

.blend-color-dodge {
  mix-blend-mode: color-dodge;
  /* Intense lightening -- used for neon/glow effects */
}

.blend-difference {
  mix-blend-mode: difference;
  /* Color inversion -- used for dramatic transitions */
}
```

### Demo Panel Structure

```html
<!-- Each blend mode demo -->
<div class="relative overflow-hidden rounded-lg border border-[var(--bb-border)]">
  <!-- Base layer (image or gradient) -->
  <div class="h-40 bg-gradient-to-br from-[#D1FF00]/20 to-[#0099FF]/20"></div>
  <!-- Blend overlay -->
  <div class="absolute inset-0" style="mix-blend-mode: multiply;">
    <div class="h-full bg-[#D1FF00]/50"></div>
  </div>
  <!-- Label -->
  <div class="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50">
    SAMPLE
  </div>
</div>
```

---

## 4. Blur Effects (Section 03)

### Four Backdrop Filter Values

```css
/* No blur -- reference panel */
.blur-0 {
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
}

/* Subtle -- tooltips, light overlays */
.blur-4 {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Medium -- navigation bars, panels */
.blur-8 {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

/* Heavy -- modals, full overlays */
.blur-16 {
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

### Glass Effect Tokens

```css
:root {
  --glass-blur:      blur(10px);   /* Standard glass -- nav, modals */
  --glass-blur-soft: blur(5px);    /* Subtle glass -- tooltips, popovers */
}

/* Glass panel implementation */
.glass-panel {
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  background: rgba(15, 15, 17, 0.92);  /* --bb-surface-overlay */
  border: 1px solid rgba(156, 156, 156, 0.15);  /* --bb-border */
}
```

---

## 5. Glow Effects (Section 04)

### Three Glow Types -- Full CSS Values

```css
/* Neon Glow -- primary brand effect */
.glow-neon {
  box-shadow:
    0 0 8px rgba(209, 255, 0, 0.4),
    0 0 24px rgba(209, 255, 0, 0.2);
}

/* Soft Glow -- subtle emphasis */
.glow-soft {
  box-shadow: 0 0 16px rgba(209, 255, 0, 0.15);
}

/* Ring Glow -- focus rings, selected states */
.glow-ring {
  box-shadow:
    0 0 0 2px rgba(209, 255, 0, 0.3),
    0 0 16px rgba(209, 255, 0, 0.15);
}
```

### Text Shadow Glow

```css
.text-glow {
  text-shadow:
    0 0 8px rgba(209, 255, 0, 0.4),
    0 0 24px rgba(209, 255, 0, 0.2);
}
```

### Animated Glow (Pulsating)

```css
@keyframes glow-pulse {
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
```

### Glow Token System

```css
:root {
  /* Raw glow colors */
  --neon:            #D1FF00;
  --neon-dim:        rgba(209, 255, 0, 0.15);
  --neon-glow:       rgba(209, 255, 0, 0.4);
  --lime-glow:       rgba(209, 255, 0, 0.25);
  --lime-glow-soft:  rgba(209, 255, 0, 0.1);

  /* Semantic glow tokens */
  --focus-brand:     #D1FF00;
  --focus-neutral:   #BDBDBD;
  --ring:            rgba(209, 255, 0, 0.4);  /* shadcn ring */
}
```

---

## 6. Overlay Composites (Section 05)

### Scanlines

```css
.overlay-scanlines {
  position: relative;
}
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
  z-index: 2;
}
```

### CRT Effect

```css
.overlay-crt {
  position: relative;
  border-radius: 8px; /* slight barrel curve */
}
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
  pointer-events: none;
}
/* Optional: subtle curvature via box-shadow inset */
.overlay-crt::before {
  content: "";
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 60px rgba(0, 0, 0, 0.3);
  border-radius: inherit;
  pointer-events: none;
}
```

### Vignette

```css
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
```

### Edge Fade

```css
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

/* Horizontal variant */
.overlay-edge-fade-h::after {
  background: linear-gradient(
    to right,
    rgba(5, 5, 5, 0.8) 0%,
    transparent 15%,
    transparent 85%,
    rgba(5, 5, 5, 0.8) 100%
  );
}
```

---

## 7. Interactive Demo Structure

### Demo Grid Layout

```html
<!-- Each VFX section -->
<section class="mb-16">
  <!-- Section header: mono number + title -->
  <div class="mb-8">
    <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D1FF00]">01</span>
    <span class="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 ml-2">
      Film Grain Texture Overlay
    </span>
  </div>

  <!-- Demo grid: 2x2 or 1x4 depending on section -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <!-- Individual demo panel -->
    <div class="relative overflow-hidden rounded-lg border border-[var(--bb-border)] bg-[var(--bb-surface)] p-6 min-h-[200px]">
      <!-- Live demo area -->
      <div class="relative h-full">
        {/* Effect applied here */}
      </div>
      <!-- Label with CSS value -->
      <div class="absolute bottom-3 left-3">
        <span class="font-mono text-[10px] text-white/40">
          opacity: 0.05
        </span>
      </div>
      <!-- Intensity label -->
      <div class="absolute top-3 left-3">
        <span class="font-mono text-[10px] uppercase tracking-[0.15em] text-[#D1FF00]">
          Subtle (5%)
        </span>
      </div>
    </div>
  </div>
</section>
```

### Sections Page Grain Overlay (Interactive)

```tsx
// From /brandbook/sections -- Film texture overlay with adjustable opacity
interface GrainSectionProps {
  opacity?: number;
}

const GrainSection = ({ opacity = 0.05 }: GrainSectionProps) => (
  <section className="relative min-h-[300px] bg-[var(--bb-dark)]">
    <div className="relative z-10 p-8">
      {/* Content */}
    </div>
    <GrainOverlay opacity={opacity} />
  </section>
);
```

---

## 8. Complete VFX Token Summary

```css
:root {
  /* Grain */
  --grain-subtle:  0.05;
  --grain-light:   0.10;
  --grain-medium:  0.15;
  --grain-heavy:   0.25;

  /* Blur */
  --blur-subtle:   4px;
  --blur-medium:   8px;
  --blur-heavy:    16px;
  --glass-blur:    10px;
  --glass-soft:    5px;

  /* Glow */
  --glow-neon:     0 0 8px rgba(209,255,0,0.4), 0 0 24px rgba(209,255,0,0.2);
  --glow-soft:     0 0 16px rgba(209,255,0,0.15);
  --glow-ring:     0 0 0 2px rgba(209,255,0,0.3), 0 0 16px rgba(209,255,0,0.15);

  /* Surface overlay */
  --surface-overlay: rgba(15, 15, 17, 0.92);
}
```

---

## 9. Reis IA Cross-Reference

### HIGH Priority Adaptations

| VFX | Reis IA Version | Implementation |
|---|---|---|
| Film grain (0.03-0.05) | Direct use | Adds premium texture to dark sections |
| Backdrop blur scale | Direct use | Nav, modals, popovers |
| Vignette overlay | Direct use | Hero sections, image treatments |
| Edge fade | Direct use | Section transitions |
| Glass panel | Adapt colors | Replace surface color with Reis IA black |

### MEDIUM Priority

| VFX | Reis IA Version | Notes |
|---|---|---|
| Soft glow | Gold version: rgba(196,164,106,0.15) | For gold accent elements |
| Ring glow | White version: rgba(255,255,255,0.2) | For focus states |
| Blend mode: overlay | For grain texture | Already standard |

### SKIP for Reis IA

| VFX | Reason |
|---|---|
| Neon glow (lime) | Too gaming/tech -- replace entirely with subtle gold |
| Scanlines | CRT aesthetic conflicts with premium |
| CRT effect | Retro-tech -- not Apple-level |
| Data rain pattern | Matrix aesthetic -- not aligned |
| Color-dodge blend | Too intense for premium feel |

### Reis IA Glow Token Adaptation

```css
/* Reis IA gold glow system (adapted from AIOX lime) */
:root {
  --glow-gold:      0 0 8px rgba(196,164,106,0.3), 0 0 24px rgba(196,164,106,0.15);
  --glow-gold-soft: 0 0 16px rgba(196,164,106,0.1);
  --glow-gold-ring: 0 0 0 2px rgba(196,164,106,0.2), 0 0 16px rgba(196,164,106,0.1);
  --glow-white:     0 0 8px rgba(255,255,255,0.15), 0 0 24px rgba(255,255,255,0.08);
}
```
