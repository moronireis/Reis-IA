# AIOX Squad -- Reusable Code Snippets

Last updated: 2026-03-16
Source: https://brand.aioxsquad.ai/
Extracted from: CSS stylesheets and page source

---

## 1. DESIGN TOKENS (CSS Custom Properties)

### 1A. Complete Root Variables (Brandbook Bridge Layer)

```css
.brandbook-root {
  /* === COLORS: SURFACES === */
  --lime: var(--bb-lime, #D1FF00);
  --dark: var(--bb-dark, #050505);
  --void: var(--bg-void, #000000);
  --surface: var(--bb-surface, #0F0F11);
  --surface-alt: var(--bb-surface-alt, #1C1E19);

  /* === COLORS: TEXT === */
  --cream: var(--bb-cream, rgb(244, 244, 232));
  --cream-alt: var(--bb-cream-alt, rgb(245, 244, 231));
  --warm-white: var(--bb-warm-white, #FFFFED);
  --dim: var(--bb-dim, rgba(245, 244, 231, 0.4));

  /* === COLORS: GRAYS === */
  --gray-charcoal: var(--bb-gray-charcoal, #3D3D3D);
  --gray-dim: var(--bb-gray-dim, #696969);
  --gray-muted: var(--bb-gray-muted, #999999);
  --gray-silver: var(--bb-gray-silver, #BDBDBD);
  --gray-light: var(--bb-gray-light, #C2C2C2);

  /* === COLORS: ACCENTS === */
  --blue: var(--bb-blue, #0099FF);
  --flare: var(--bb-flare, #ED4609);
  --error: var(--bb-error, #EF4444);
  --warning: var(--bb-warning, #f59e0b);

  /* === TYPOGRAPHY === */
  --font-sans: var(--font-bb-sans, "Geist", system-ui, sans-serif);
  --font-display: var(--font-bb-display, "TASAOrbiterDisplay", system-ui, sans-serif);
  --font-mono: var(--font-bb-mono, "Roboto Mono", monospace);
  --font-weight-thin: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  /* === MOTION: EASING === */
  --ease-spring: var(--bb-ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
  --ease-smooth: var(--bb-ease-smooth, cubic-bezier(0.25, 0.1, 0.25, 1));
  --ease-decel: var(--bb-ease-decel, cubic-bezier(0, 0, 0.2, 1));
  --ease-accel: cubic-bezier(0.4, 0, 1, 1);
  --motion-duration-slow: var(--bb-dur-slow, 0.7s);
  --motion-duration-medium: var(--bb-dur-medium, 0.4s);
  --motion-duration-fast: var(--bb-dur-fast, 0.2s);
  --motion-easing-spring: cubic-bezier(0.16, 1, 0.3, 1);

  /* === LAYOUT === */
  --bp-desktop: 1200px;
  --bp-tablet: 768px;
  --bp-mobile: 767px;
  --layer-nav: 100;
  --layer-dropdown: 200;
  --layer-overlay: 300;
  --layer-modal: 400;
  --layer-toast: 500;
  --border-width-base: 2px;
  --border-radius-none: 0px;

  /* === SEMANTIC BACKGROUNDS === */
  --color-bg-void: var(--void);
  --color-bg-base: var(--dark);
  --color-bg-elevated: var(--surface-alt);
  --color-bg-surface: var(--surface);
  --color-bg-surface-alt: var(--surface-alt);
  --color-bg-overlay: rgba(61, 61, 61, 0.5);

  /* === SEMANTIC TEXT === */
  --color-text-base: var(--cream);
  --color-text-secondary: rgba(244, 244, 232, 0.7);
  --color-text-tertiary: rgba(244, 244, 232, 0.55);
  --color-text-muted: var(--dim);
  --cream-dim: var(--dim);

  /* === NEON/GLOW === */
  --color-brand: var(--lime);
  --neon: var(--lime);
  --neon-dim: var(--bb-accent-15);
  --neon-glow: var(--bb-accent-40);
  --lime-glow: var(--bb-accent-25);
  --lime-glow-soft: var(--bb-accent-10);

  /* === BORDERS === */
  --border: var(--bb-border, rgba(156, 156, 156, 0.15));
  --border-hover: var(--bb-border-hover, rgba(156, 156, 156, 0.24));
  --border-soft: var(--border);
  --border-strong: var(--gray-charcoal);
  --border-focus: var(--gray-silver);

  /* === INTERACTIVE STATE === */
  --shadow: rgba(0, 0, 0, 0.2);
  --overlay: rgba(61, 61, 61, 0.5);
  --selection-bg: var(--dark);
  --selection-fg: var(--lime);
  --warning-bg: rgba(245, 158, 11, 0.05);
  --warning-border: rgba(245, 158, 11, 0.2);
  --focus-brand: var(--lime);
  --focus-neutral: var(--gray-silver);

  /* === CHART COLORS === */
  --bb-chart-1: var(--bb-lime, #D1FF00);
  --bb-chart-2: var(--bb-blue, #0099FF);
  --bb-chart-3: var(--bb-error, #EF4444);
  --bb-chart-4: var(--bb-warning, #f59e0b);
  --bb-chart-5: #8B5CF6;
  --bb-chart-6: #06B6D4;
  --bb-chart-tooltip-bg: var(--bb-surface, #0F0F11);
  --bb-chart-tooltip-border: var(--bb-border, rgba(156, 156, 156, 0.15));
  --bb-chart-tooltip-text: var(--bb-cream, rgb(244, 244, 232));
  --bb-chart-grid: rgba(244, 244, 232, 0.06);
  --bb-chart-axis: rgba(244, 244, 232, 0.3);
  --bb-chart-ring-bg: rgba(244, 244, 232, 0.08);

  /* === LETTER SPACING === */
  --letter-spacing-tight: -0.05em;
  --letter-spacing-base: normal;
}
```

### 1B. Lime Theme Tokens (OKLCH)

```css
:root {
  --bb-lime: oklch(0.934 0.2264 121.95);
  --bb-blue: oklch(0.669 0.1837 248.81);
  --bb-flare: oklch(0.631 0.2116 36.21);
  --bb-error: oklch(0.6368 0.2078 25.33);

  --bb-dark: oklch(0.1149 0 0);
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

  --bb-gray-charcoal: oklch(0.36 0 0);
  --bb-gray-dim: oklch(0.5208 0 0);
  --bb-gray-muted: oklch(0.683 0 0);
  --bb-gray-silver: oklch(0.7984 0 0);

  --bb-border: rgba(156, 156, 156, 0.15);
  --bb-border-soft: rgba(156, 156, 156, 0.10);
  --bb-border-strong: rgba(156, 156, 156, 0.25);
  --bb-border-hover: rgba(156, 156, 156, 0.24);
  --bb-border-input: rgba(156, 156, 156, 0.2);
}
```

### 1C. Gold Theme Tokens (Hex)

```css
[data-theme="gold"] {
  --bb-lime: #DDD1BB;
  --bb-flare: #C4B7A2;

  --bb-canvas: #09090A;
  --bb-dark: #121213;
  --bb-surface: #151517;
  --bb-surface-alt: #1D1D20;
  --bb-surface-panel: #18181B;
  --bb-surface-console: #222225;
  --bb-surface-hover-strong: #28282C;

  --bb-cream: #F4F4F4;
  --bb-cream-alt: #E8E8E8;
  --bb-warm-white: #FFFFFF;
  --bb-dim: rgba(244, 244, 244, 0.52);
  --bb-muted: #DDDDDD;
  --bb-meta: #AFAFAF;

  --bb-gray-charcoal: #313131;
  --bb-gray-dim: #484848;
  --bb-gray-muted: #6E6E6E;
  --bb-gray-silver: #919191;

  --bb-border: rgba(255, 255, 255, 0.09);
  --bb-border-soft: rgba(255, 255, 255, 0.05);
  --bb-border-strong: rgba(255, 255, 255, 0.15);
  --bb-border-hover: rgba(255, 255, 255, 0.18);
  --bb-border-input: rgba(255, 255, 255, 0.12);
}
```

### 1D. Spacing Tokens

```css
:root {
  /* Named scale */
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 2rem;     /* 32px */
  --spacing-lg: 3rem;     /* 48px */
  --spacing-xl: 4rem;     /* 64px */

  /* Numeric 14-step scale */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 15px;
  --space-5: 20px;
  --space-6: 30px;
  --space-7: 40px;
  --space-8: 60px;
  --space-9: 80px;
  --space-10: 90px;
  --space-11: 120px;
  --space-12: 150px;
  --space-13: 180px;
}
```

### 1E. Border Radius Tokens

```css
:root {
  --radius: 0.5rem;     /* 8px */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;
}
```

### 1F. Motion Tokens

```css
:root {
  --bb-ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --bb-ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --bb-ease-decel: cubic-bezier(0, 0, 0.2, 1);
  --bb-ease-accel: cubic-bezier(0.4, 0, 1, 1);
  --bb-dur-fast: 0.2s;
  --bb-dur-medium: 0.4s;
  --bb-dur-slow: 0.7s;
}
```

### 1G. Glass/Blur Tokens

```css
:root {
  --glass-blur: blur(10px);
  --glass-blur-soft: blur(5px);
}
```

### 1H. shadcn/ui Mapping

```css
:root {
  --background: #050505;
  --foreground: rgb(244, 244, 232);
  --card: #0F0F11;
  --primary: #D1FF00;
  --accent: #D1FF00;
  --muted: #3D3D3D;
  --destructive: #EF4444;
  --ring: #D1FF00;
  --radius: 0.5rem;
}
```

---

## 2. ANIMATION KEYFRAMES

```css
@keyframes bb-spin {
  to { transform: rotate(1turn); }
}

@keyframes bb-shimmer {
  0% { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

@keyframes bb-pulse {
  0%, to { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes bb-ticker-scroll {
  0% { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes bb-barGrow {
  0% { width: 0; }
}

@keyframes bb-drawLine {
  0% { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

@keyframes bb-drawLineV {
  0% { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@keyframes bb-content-in {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bb-blinds-open {
  to { --blinds-width: 0px; }
}

@keyframes bb-letter-in {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bb-x-tick {
  0%, 10% { transform: rotate(0deg); }
  25%, 35% { transform: rotate(90deg); }
  50%, 60% { transform: rotate(180deg); }
  75%, 85% { transform: rotate(270deg); }
  to { transform: rotate(1turn); }
}

@keyframes bb-progress-fill {
  0% { width: 0; }
  30% { width: 40%; }
  60% { width: 70%; }
  85% { width: 90%; }
  to { width: 100%; }
}

@keyframes bb-easing-run {
  0% { left: 0; }
  to { left: calc(100% - 12px); }
}

@keyframes bb-duration-fill {
  0% { width: 0; }
  to { width: 100%; }
}

@keyframes bb-pulse-glow {
  0%, to { opacity: 0.3; }
  50% { opacity: 0.8; }
}

@keyframes bb-scanline-sweep {
  0% { transform: translateY(-100%); }
  to { transform: translateY(100vh); }
}
```

---

## 3. SCROLL ANIMATION SYSTEM

```css
/* Base scroll reveal - fade up */
.anim {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Fade from left */
.anim-left {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-left.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Fade from right */
.anim-right {
  opacity: 0;
  transform: translateX(30px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-right.visible {
  opacity: 1;
  transform: translateX(0);
}

/* Scale in */
.anim-scale {
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.anim-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* Stagger delays */
.delay-1 { transition-delay: 0.1s; }
.delay-2 { transition-delay: 0.2s; }
.delay-3 { transition-delay: 0.3s; }
.delay-4 { transition-delay: 0.4s; }
.delay-5 { transition-delay: 0.5s; }
```

**JavaScript (IntersectionObserver):**

```javascript
// Generic scroll animation observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.anim, .anim-left, .anim-right, .anim-scale').forEach((el) => {
  observer.observe(el);
});
```

---

## 4. COMPONENT CSS

### 4A. Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--lime);
  color: var(--dark);
}
.btn-primary:hover {
  box-shadow: 0 0 20px var(--lime-glow);
}

.btn-secondary {
  background: transparent;
  color: var(--cream);
  border: 1px solid var(--border);
}
.btn-secondary:hover {
  border-color: var(--lime);
  color: var(--lime);
}

.btn-ghost {
  background: transparent;
  color: var(--dim);
}
.btn-ghost:hover {
  color: var(--cream);
}

.btn-destructive {
  background: var(--error);
  color: white;
}
.btn-destructive:hover {
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
}

/* Sizes */
.btn-sm { padding: 0.4rem 1rem; font-size: 0.55rem; }
.btn-lg { padding: 0.85rem 2rem; font-size: 0.7rem; }

/* States */
.btn--disabled, .btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  pointer-events: none;
}

.btn--loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}
.btn--loading:after {
  content: "";
  position: absolute;
  width: 14px;
  height: 14px;
  border: 2px solid;
  border-right: 2px solid transparent;
  border-radius: 50%;
  animation: bb-spin 0.6s linear infinite;
}
.btn-primary.btn--loading:after {
  border-color: var(--dark);
  border-right-color: transparent;
}
```

### 4B. Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  transition: box-shadow 0.3s ease;
}
.card:hover {
  box-shadow: inset 0 0 0 1px var(--bb-accent-15);
}

.card-body { padding: 1.5rem; }

.card-title {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
}

.card-text {
  font-size: 0.72rem;
  color: var(--dim);
  line-height: 1.5;
}

.card-footer {
  padding: 0.75rem 1.5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Superellipse progressive enhancement */
@supports (corner-shape: superellipse) {
  .btn, .card {
    corner-shape: superellipse;
  }
}
```

### 4C. Form Inputs

```css
.input {
  width: 100%;
  padding: 0.65rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--cream);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  outline: none;
  transition: border-color 0.2s ease;
}
.input:focus {
  border-color: var(--focus-brand);
  box-shadow: 0 0 0 1px var(--focus-brand);
}
.input::placeholder { color: var(--dim); }
.input--error { border-color: var(--error); }
.input--error:focus {
  border-color: var(--error);
  box-shadow: 0 0 0 1px var(--error);
}
.input--disabled { opacity: 0.4; cursor: not-allowed; }

.textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--cream);
  font-family: var(--font-mono);
  font-size: 0.7rem;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border-color 0.2s ease;
}
.textarea:focus {
  border-color: var(--focus-brand);
  box-shadow: 0 0 0 1px var(--focus-brand);
}

.input-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--cream);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.4rem;
  display: block;
}

.input-hint {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--dim);
  margin-top: 0.3rem;
}

.input-error-msg {
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--error);
  margin-top: 0.3rem;
}
```

### 4D. Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.5rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.badge-lime {
  background: var(--bb-accent-10);
  color: var(--lime);
  border: 1px solid var(--bb-accent-20);
}
.badge-surface {
  background: var(--surface);
  color: var(--dim);
  border: 1px solid var(--border);
}
.badge-error {
  background: rgba(239, 68, 68, 0.1);
  color: var(--error);
  border: 1px solid rgba(239, 68, 68, 0.2);
}
.badge-blue {
  background: rgba(0, 153, 255, 0.1);
  color: var(--blue);
  border: 1px solid rgba(0, 153, 255, 0.2);
}
.badge-solid {
  background: var(--lime);
  color: var(--dark);
  border: none;
}
```

### 4E. Alerts

```css
.alert {
  padding: 1rem 1.25rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.65rem;
}

.alert-default {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--cream);
}
.alert-success {
  background: var(--bb-accent-05);
  border: 1px solid var(--bb-accent-20);
  color: var(--lime);
}
.alert-error {
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: var(--error);
}
.alert-info {
  background: rgba(0, 153, 255, 0.05);
  border: 1px solid rgba(0, 153, 255, 0.2);
  color: var(--blue);
}
.alert-warning {
  background: var(--warning-bg);
  border: 1px solid var(--warning-border);
  color: var(--warning);
}
```

### 4F. Tables

```css
.tbl-wrap { overflow-x: auto; background: var(--dark); }

.tbl {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 0.65rem;
}

.tbl th {
  text-align: left;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.55rem;
  color: var(--dim);
  background: var(--surface);
}

.tbl td, .tbl th {
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

.tbl td { color: var(--cream); }
.tbl tr:hover td { background: var(--bb-accent-02); }
.tbl-num { text-align: right; font-variant-numeric: tabular-nums; }
.tbl-lime { color: var(--lime); }
.tbl-error { color: var(--error); }
.tbl-dim { color: var(--dim); }
```

### 4G. KPI Cards

```css
.kpi-card {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 1.25rem;
}

.kpi-label {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  color: var(--dim);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.kpi-value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--cream);
  letter-spacing: -0.02em;
}

.kpi-trend {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.55rem;
  margin-top: 0.4rem;
}
.kpi-trend--up { color: var(--lime); }
.kpi-trend--down { color: var(--error); }
```

### 4H. Progress & Spinners

```css
.progress {
  width: 100%;
  height: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: var(--lime);
  transition: width 0.5s ease;
}
.progress-bar--error { background: var(--error); }
.progress-bar--blue { background: var(--blue); }

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--border);
  border-top-color: var(--lime);
  border-radius: 50%;
  animation: bb-spin 0.7s linear infinite;
}
.spinner--sm { width: 16px; height: 16px; }
.spinner--lg { width: 36px; height: 36px; }
```

---

## 5. NAVIGATION

```css
.bb-site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--bb-gutter, 1.5rem);
  min-height: 48px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.6rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  position: sticky;
  top: 0;
  z-index: var(--layer-nav);
}

.bb-nav-logo {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.25rem 0;
  color: var(--cream);
  text-decoration: none;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
}
.bb-nav-logo span { color: var(--lime); }

.bb-nav-top-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: var(--dim);
  text-decoration: none;
  padding: 0.75rem 0.8rem;
  border-left: 1px solid var(--border);
  transition: color 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}
.bb-nav-top-link:hover {
  color: var(--cream);
  background: rgba(245, 244, 231, 0.03);
}
.bb-nav-top-link.active { color: var(--lime); }
```

---

## 6. PATTERN LIBRARY CSS

### 6A. Grid Patterns

```css
.pattern-dot-grid {
  background-image: radial-gradient(circle, var(--bb-lime, #D1FF00) 1px, transparent 1px);
  background-size: 16px 16px;
  background-color: var(--bb-surface, #0F0F11);
}

.pattern-dot-grid--dense {
  background-image: radial-gradient(circle, var(--bb-lime, #D1FF00) 0.8px, transparent 0.8px);
  background-size: 8px 8px;
  background-color: var(--bb-surface, #0F0F11);
}

.pattern-dot-grid--sparse {
  background-image: radial-gradient(circle, var(--bb-lime, #D1FF00) 1.2px, transparent 1.2px);
  background-size: 32px 32px;
  background-color: var(--bb-surface, #0F0F11);
}

.pattern-crosshair-grid {
  background-image:
    linear-gradient(to right, var(--bb-accent-08) 1px, transparent 1px),
    linear-gradient(to bottom, var(--bb-accent-08) 1px, transparent 1px),
    radial-gradient(circle, var(--bb-accent-25) 1px, transparent 1px);
  background-size: 80px 80px, 80px 80px, 80px 80px;
  background-position: 0 0, 0 0, 40px 40px;
  background-color: var(--bb-dark, #050505);
}

.pattern-wireframe-perspective {
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 59px, var(--bb-accent-12) 59px, var(--bb-accent-12) 60px),
    repeating-linear-gradient(90deg, transparent, transparent 59px, var(--bb-accent-12) 59px, var(--bb-accent-12) 60px),
    radial-gradient(ellipse at center, var(--bb-accent-06) 0, transparent 70%);
  background-color: var(--bb-dark, #050505);
}

.pattern-symbol-grid {
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8l8 8M20 8l-8 8' stroke='%23D1FF00' stroke-width='1.2' opacity='0.3' fill='none'/%3E%3C/svg%3E");
  background-size: 32px 32px;
  background-color: var(--bb-dark, #050505);
}

.pattern-plus-grid {
  background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 10v12M10 16h12' stroke='%23D1FF00' stroke-width='1' opacity='0.2' fill='none'/%3E%3C/svg%3E");
  background-size: 32px 32px;
  background-color: var(--bb-dark, #050505);
}
```

### 6B. HUD Frames

```css
.frame-bracket {
  position: relative;
}
.frame-bracket:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--bb-lime, #D1FF00);
  border-style: solid;
  pointer-events: none;
  top: 0;
  left: 0;
  border-width: 2px 0 0 2px;
}
.frame-bracket:after {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--bb-lime, #D1FF00);
  border-style: solid;
  pointer-events: none;
  bottom: 0;
  right: 0;
  border-width: 0 2px 2px 0;
}

.frame-tech {
  position: relative;
  border: 1px solid var(--bb-lime, #d1ff00);
  clip-path: polygon(
    0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px,
    100% calc(100% - 12px), calc(100% - 12px) 100%,
    12px 100%, 0 calc(100% - 12px)
  );
}
.frame-tech--sm {
  clip-path: polygon(
    0 8px, 8px 0, calc(100% - 8px) 0, 100% 8px,
    100% calc(100% - 8px), calc(100% - 8px) 100%,
    8px 100%, 0 calc(100% - 8px)
  );
}
.frame-tech--lg {
  clip-path: polygon(
    0 20px, 20px 0, calc(100% - 20px) 0, 100% 20px,
    100% calc(100% - 20px), calc(100% - 20px) 100%,
    20px 100%, 0 calc(100% - 20px)
  );
}

.frame-notch-tr {
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);
}
.frame-notch-bl {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0 calc(100% - 16px));
}
.frame-notch-both {
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
}
```

### 6C. Textures & Overlays

```css
.pattern-scanlines {
  background-image: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0, 0, 0, 0.15) 0, rgba(0, 0, 0, 0.15) 4px
  );
  pointer-events: none;
}

.pattern-noise {
  position: relative;
}
.pattern-noise:after {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
  pointer-events: none;
  mix-blend-mode: overlay;
}

.pattern-data-rain {
  background-image:
    repeating-linear-gradient(90deg, transparent, transparent 39px,
      var(--bb-accent-04) 39px, var(--bb-accent-04) 40px),
    linear-gradient(180deg, var(--bb-accent-02) 0, transparent 50%, var(--bb-accent-02) 100%);
  background-color: var(--bb-dark, #050505);
}

.pattern-hazard {
  background-image: repeating-linear-gradient(
    -45deg,
    var(--bb-lime, #D1FF00), var(--bb-lime, #D1FF00) 10px,
    var(--bb-dark, #050505) 10px, var(--bb-dark, #050505) 20px
  );
}

.pattern-industrial {
  background: linear-gradient(145deg, #1a1a1a, #222222 30%, #1e1e1e 50%, #252525 70%, #1a1a1a);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3);
}
```

### 6D. Dividers

```css
.divider-tech {
  display: flex;
  align-items: center;
  gap: 0;
  height: 1px;
  width: 100%;
}
.divider-tech:before {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--bb-lime, #D1FF00));
}
.divider-tech:after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(to left, transparent, var(--bb-lime, #D1FF00));
}

.divider-dashed {
  height: 1px;
  background-image: repeating-linear-gradient(
    to right,
    var(--bb-lime, #D1FF00), var(--bb-lime, #D1FF00) 8px,
    transparent 8px, transparent 16px
  );
  opacity: 0.5;
}

.divider-arrow {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--bb-lime, #D1FF00);
}
.divider-arrow:before {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--bb-lime, #D1FF00);
  opacity: 0.4;
}
.divider-arrow:after {
  content: "";
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 8px solid var(--bb-lime, #d1ff00);
}
```

### 6E. Circuit Traces (SVG Patterns)

```css
.pattern-circuit-h {
  background-image: url("data:image/svg+xml,%3Csvg width='200' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10h60l5-5h30l5 5h100' stroke='%23D1FF00' stroke-width='1.5' fill='none' opacity='0.6'/%3E%3Ccircle cx='60' cy='10' r='2' fill='%23D1FF00' opacity='0.6'/%3E%3Ccircle cx='100' cy='10' r='2' fill='%23D1FF00' opacity='0.6'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  background-position: 50%;
  height: 20px;
}

.pattern-circuit-board {
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40h20l5-5h10l5 5h40' stroke='%23D1FF00' stroke-width='1' fill='none' opacity='0.15'/%3E%3Cpath d='M40 0v20l-5 5v10l5 5v40' stroke='%23D1FF00' stroke-width='1' fill='none' opacity='0.15'/%3E%3Ccircle cx='40' cy='40' r='2' fill='%23D1FF00' opacity='0.2'/%3E%3Ccircle cx='20' cy='40' r='1.5' fill='none' stroke='%23D1FF00' stroke-width='0.8' opacity='0.15'/%3E%3C/svg%3E");
  background-size: 80px 80px;
  background-color: var(--bb-dark, #050505);
}
```

---

## 7. GRID LAYOUT TECHNIQUES

### 7A. Specimen Grid (1px-gap border technique)

```css
.bb-specimen-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 1px;
  background: var(--border); /* The gap color becomes the border */
}

.cell {
  background: var(--dark); /* Cell bg covers the gap border */
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.3s ease;
}
.cell:hover {
  box-shadow: inset 0 0 0 1px var(--bb-accent-20);
}

@media (max-width: 767px) {
  .bb-specimen-grid {
    grid-template-columns: 1fr;
  }
}
```

### 7B. Component Grid

```css
.comp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1px;
  background: var(--border);
}

.comp-cell {
  background: var(--dark);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comp-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  color: var(--neon);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

@media (max-width: 767px) {
  .comp-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## 8. FONT FACE DECLARATIONS

```css
@font-face {
  font-family: GeistSans;
  src: url(/_next/static/media/27834908180db20f-s.p.woff2) format("woff2");
  font-display: swap;
  font-weight: 100 900;
}

@font-face {
  font-family: GeistSans Fallback;
  src: local("Arial");
  ascent-override: 94.56%;
  descent-override: 27.76%;
  line-gap-override: 0.00%;
  size-adjust: 106.28%;
}

@font-face {
  font-family: GeistMono;
  src: url(/_next/static/media/78fec81b34c4a365.p.woff2) format("woff2");
  font-display: swap;
  font-weight: 100 900;
}
```

---

## 9. RESPONSIVE BREAKPOINTS

```css
/* Desktop reduction */
@media (max-width: 1180px) {
  .bb-site-nav { padding: 0 1rem; }
  .bb-nav-dropdown-trigger,
  .bb-nav-top-link {
    padding-inline: 0.65rem;
    font-size: 0.56rem;
    letter-spacing: 0.06em;
  }
}

/* Tablet squeeze */
@media (max-width: 1080px) {
  .bb-site-nav { gap: 0.75rem; }
  .bb-nav-logo { min-width: 72px; }
  .bb-nav-dropdown-trigger,
  .bb-nav-top-link {
    padding-inline: 0.55rem;
    font-size: 0.53rem;
    letter-spacing: 0.05em;
  }
}

/* Mobile */
@media (max-width: 767px) {
  .bb-site-nav { padding: 0 1rem; }
  .bb-nav-hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bb-nav-links, .bb-nav-sep, .bb-sidebar {
    display: none;
  }
  .bb-specimen-grid { grid-template-columns: 1fr; }
  .comp-grid { grid-template-columns: 1fr; }
}
```
