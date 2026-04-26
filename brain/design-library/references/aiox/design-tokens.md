# AIOX Squad -- Design Tokens
## Source: https://brand.aioxsquad.ai/
## Extracted: 2026-04-22
## CSS Framework: Tailwind CSS v4.2.1 with custom `--bb-*` brand token layer

---

## 1. Color System

### Brand Core (oklch values from CSS fallbacks)

| Token | oklch Value | Approx Hex | Role |
|-------|-------------|------------|------|
| `--bb-lime` | `oklch(93.4% .2264 121.95)` | #D1FF00 | Primary accent -- "Kinetic Limon" |
| `--bb-dark` | `oklch(11.49% 0 0)` | #050505 | Base dark / background |
| `--bb-surface` | `oklch(16.93% .0041 285.95)` | #0F0F11 | Surface / card background |
| `--bb-surface-deep` | `oklch(14.57% .0043 285.86)` | ~#0A0A0C | Deep surface |
| `--bb-surface-panel` | `oklch(17.85% .0041 285.98)` | ~#121214 | Panel background |
| `--bb-surface-overlay` | `oklch(21.86% .0039 286.08)` | ~#1A1A1E | Overlay background |
| `--bb-surface-alt` | `oklch(23.1% .0099 124.97)` | ~#1E1E1A | Alternative surface (warm) |
| `--bb-surface-console` | `oklch(18.4% .0081 118.61)` | ~#141412 | Console/terminal bg |
| `--bb-cream` | `oklch(96.39% .0158 106.69)` | ~#F4F4E8 | Warm white / text |
| `--bb-cream-ui` | `oklch(96.8% .0106 106.6)` | ~#F6F6F0 | UI cream variant |
| `--bb-ink` | `oklch(23.5% .0116 122.3)` | ~#1C1C16 | Dark ink / text on light |
| `--bb-muted` | `oklch(79.52% 0 0)` | ~#9C9C9C | Muted text |
| `--bb-flare` | `oklch(63.1% .2116 36.21)` | ~#E84A1A | Flare / warning-hot accent |
| `--bb-error` | (red-500 range) | -- | Error / destructive |
| `--bb-warning` | `oklch(76.86% .1647 70.08)` | -- | Warning / amber |
| `--bb-blue` | (blue-500 range) | -- | Info accent |

### Brand Accent Opacity Scale (on lime)

Used extensively via Tailwind `color-mix()`:
- `--bb-lime` at 3%, 4%, 5%, 10%, 15%, 20%, 30%, 40%, 50%
- `--bb-dark` at 10%, 30%, 50%, 85%
- `--bb-cream` at 20%
- `--bb-ink` at 6%, 10%

### Border Tokens

| Token | Fallback | Description |
|-------|----------|-------------|
| `--bb-border` | `#9c9c9c26` | Default border (15% opacity gray) |
| `--bb-border-input` | `#9c9c9c33` | Input border (20% opacity) |
| `--bb-border-soft` | `#9c9c9c1a` | Soft border (10% opacity) |
| `--bb-border-strong` | `#9c9c9c40` | Strong border (25% opacity) |

Border opacity variants: `/20`, `/30`, `/40`, `/50`

### Chart Tokens

| Token | Description |
|-------|-------------|
| `--bb-chart-tooltip-bg` | Tooltip background |
| `--bb-chart-tooltip-border` | Tooltip border |
| `--bb-map-water` | Map water fill (falls back to `--bb-dark`) |

### Accent Scale Tokens

| Token | Description |
|-------|-------------|
| `--bb-accent-02` | 2% accent |
| `--bb-accent-08` | 8% accent |
| `--bb-accent-15` | 15% accent |

### Selection Colors

```css
--selection-bg: oklch(11.49% 0 0);  /* same as --bb-dark */
--selection-fg: var(--bb-lime);
```

### Tailwind Color Scale (oklch)

| Token | oklch | Usage |
|-------|-------|-------|
| `--color-red-300` | `oklch(80.8% .114 19.571)` | Light error |
| `--color-red-400` | `oklch(70.4% .191 22.216)` | Error hover |
| `--color-red-500` | `oklch(63.7% .237 25.331)` | Error |
| `--color-amber-400` | `oklch(82.8% .189 84.429)` | Warning light |
| `--color-amber-500` | `oklch(76.9% .188 70.08)` | Warning |
| `--color-yellow-500` | `oklch(79.5% .184 86.047)` | Alert |
| `--color-green-300` | `oklch(87.1% .15 154.449)` | Success light |
| `--color-green-400` | `oklch(79.2% .209 151.711)` | Success hover |
| `--color-green-500` | `oklch(72.3% .219 149.579)` | Success |
| `--color-green-600` | `oklch(62.7% .194 149.214)` | Success dark |
| `--color-emerald-500` | `oklch(69.6% .17 162.48)` | Emerald |
| `--color-sky-500` | `oklch(68.5% .169 237.323)` | Sky |
| `--color-blue-400` | `oklch(70.7% .165 254.624)` | Blue light |
| `--color-blue-500` | `oklch(62.3% .214 259.815)` | Blue |
| `--color-violet-500` | `oklch(60.6% .25 292.717)` | Violet |
| `--color-purple-400` | `oklch(71.4% .203 305.504)` | Purple |
| `--color-zinc-500` | `oklch(55.2% .016 285.938)` | Zinc |
| `--color-neutral-400` | `oklch(70.8% 0 0)` | Neutral |
| `--color-neutral-500` | `oklch(55.6% 0 0)` | Neutral mid |
| `--color-neutral-800` | `oklch(26.9% 0 0)` | Neutral dark |
| `--color-neutral-900` | `oklch(20.5% 0 0)` | Neutral deeper |
| `--color-neutral-950` | `oklch(14.5% 0 0)` | Neutral deepest |
| `--color-black` | `#000` | Black |
| `--color-white` | `#fff` | White |

### Color Distribution Rule

From editorial page: **60% dark backgrounds, 25% lime interactive, 10% cream text, 5% semantic colors**

---

## 2. Typography System

### Font Stacks

```css
--font-sans: var(--font-geist-sans), "Geist", "Inter", system-ui, sans-serif;
--font-mono: var(--font-geist-mono), "Geist Mono", "Roboto Mono", "JetBrains Mono", monospace;
```

### Font Families

| Role | Family | Weight | Usage |
|------|--------|--------|-------|
| Primary / Body | **Geist** | 300 (Thin), 400 (Regular), 700 (Bold), 900 (Black) | Workhorse for all UI |
| Display | **TASA Orbiter** | 800 | Headlines, hero text |
| Mono | **Roboto Mono** | 500 | Code, labels, technical text |

### Type Scale (Tailwind v4)

| Token | Size | Line Height |
|-------|------|-------------|
| `--text-xs` | 0.75rem (12px) | calc(1 / .75) = 1.333 |
| `--text-sm` | 0.875rem (14px) | calc(1.25 / .875) = 1.429 |
| `--text-base` | 1rem (16px) | calc(1.5 / 1) = 1.5 |
| `--text-lg` | 1.125rem (18px) | calc(1.75 / 1.125) = 1.556 |
| `--text-xl` | 1.25rem (20px) | calc(1.75 / 1.25) = 1.4 |
| `--text-2xl` | 1.5rem (24px) | calc(2 / 1.5) = 1.333 |
| `--text-3xl` | 1.875rem (30px) | calc(2.25 / 1.875) = 1.2 |
| `--text-4xl` | 2.25rem (36px) | calc(2.5 / 2.25) = 1.111 |
| `--text-5xl` | 3rem (48px) | 1 |
| `--text-6xl` | 3.75rem (60px) | 1 |
| `--text-7xl` | 4.5rem (72px) | 1 |

### Font Weights

| Token | Value |
|-------|-------|
| `--font-weight-thin` | 100 |
| `--font-weight-normal` | 400 |

---

## 3. Spacing System

### Base Unit

```css
--spacing: .25rem;  /* 4px base unit */
```

All spacing derived from multiples: `calc(var(--spacing) * N)`

### Container Scale

| Token | Value |
|-------|-------|
| `--container-xs` | 20rem (320px) |
| `--container-sm` | 24rem (384px) |
| `--container-md` | 28rem (448px) |
| `--container-lg` | 32rem (512px) |
| `--container-xl` | 36rem (576px) |
| `--container-2xl` | 42rem (672px) |
| `--container-3xl` | 48rem (768px) |
| `--container-4xl` | 56rem (896px) |
| `--container-5xl` | 64rem (1024px) |
| `--container-6xl` | 72rem (1152px) |
| `--container-7xl` | 80rem (1280px) |

### Grid System

- **12-column grid** with 24px gutters
- `grid-template-columns: repeat(4, 1fr)` for bento layouts
- `repeat(auto-fit, minmax(340px, 1fr))` for auto-fit content grids
- `auto-rows-[minmax(240px,auto)]` for auto row heights
- 1px gaps for technical/HUD aesthetic

---

## 4. Border System

### Border Radius Scale

| Token | Value |
|-------|-------|
| `--radius-xs` | 0.125rem (2px) |
| `--radius-sm` | var(--radius-sm) |
| `--radius-md` | var(--radius-md) |
| `--radius-lg` | var(--radius-lg) |
| `--radius-xl` | var(--radius-xl) |
| `--radius-2xl` | var(--radius-2xl) |
| `--radius-full` | var(--radius-full) |

---

## 5. Shadow & Glow System

### Glow Effects (from VFX page)

| Name | Description |
|------|-------------|
| Neon Glow | Nested box-shadow values (lime accent) |
| Soft Glow | Reduced opacity variant |
| Ring Glow | Ring + shadow composite |

---

## 6. Blur Scale

| Token | Value |
|-------|-------|
| `--blur-sm` | 8px |
| `--blur-md` | 12px |
| `--blur-xl` | 24px |
| `--blur-3xl` | 64px |

VFX blur scale: 0px (none), 4px (subtle), 8px (medium), 16px (heavy)

---

## 7. Film Grain Opacity Scale

| Level | Opacity |
|-------|---------|
| Subtle | 0.05 |
| Light | 0.10 |
| Medium | 0.15 |
| Heavy | 0.25 |

---

## 8. Icon System

### Sizes
- 16px: Inline, tight spaces
- 24px: Default/canonical base
- 32px: Cards, emphasis
- 48px: Hero, feature

### Properties
- Stroke-only (no fills), 2px stroke-width at all sizes
- `stroke-linecap: round; stroke-linejoin: round`
- `currentColor` inheritance
- Minimum touch target: 44x44px

### Icon Color Variants

| Name | Token |
|------|-------|
| Default/Cream | `--cream` |
| Brand/Lime | `--lime` |
| Muted/Dim | `--dim` |
| Error/Destructive | `--error` |
| Info/Blue | `--blue` |
| Warning/Flare | `--flare` |

Icons: Check, Close, Plus, Minus, Chevron R/L/D, Arrow R, Search, Sun, Grid, Moon (Lucide-based)

---

## 9. Blend Modes

CSS mix-blend properties used: multiply, screen, overlay, soft-light, color-dodge, difference

---

## 10. Overlay Composites

- Scanlines overlay
- CRT effect
- Vignette
- Edge fade

---

## Cross-Reference: REIS [IA] Compatibility

| AIOX Token | REIS [IA] Equivalent | Notes |
|------------|---------------------|-------|
| `--bb-dark` (#050505) | Black (#000000) | Very close -- AIOX uses slightly lighter ultra-dark |
| `--bb-cream` (~#F4F4E8) | White (#FFFFFF) | AIOX uses warm cream instead of pure white |
| `--bb-lime` (#D1FF00) | Blue (#4A90FF) | Different accent hue entirely -- lime vs blue |
| Geist font | Inter font | Both are geometric sans-serifs, similar spirit |
| Tailwind v4 | Tailwind v3/4 | Compatible methodology |
| 4px base spacing | 4px base spacing | Identical approach |
| oklch color space | hex/rgb | AIOX uses modern oklch -- worth adopting |
| 12-col grid + 24px gutter | 12-col grid | Same grid system |
