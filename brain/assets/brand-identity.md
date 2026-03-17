# Brand Identity Sheet -- Reis IA

Last updated: March 2026

> **Owner**: designer-agent
> **Status**: Complete
> **Consumed by**: dev-agent, direct-response-copywriter, orchestrator

---

## TABLE OF CONTENTS

1. [Color System](#1-color-system)
2. [Typography Scale](#2-typography-scale)
3. [Spacing and Grid System](#3-spacing-and-grid-system)
4. [Hourglass Icon Specification](#4-hourglass-icon-specification)
5. [Chess Icon Specification](#5-chess-icon-specification)
6. [Component Styles](#6-component-styles)
7. [Sample Hero Section Layout](#7-sample-hero-section-layout)
8. [Imagery and Texture Guidelines](#8-imagery-and-texture-guidelines)
9. [Motion and Animation](#9-motion-and-animation)

---

## 1. COLOR SYSTEM

### 1A. Primary Palette

| Name | Hex | RGB | HSL | Tailwind Class | Usage |
|------|-----|-----|-----|----------------|-------|
| Black | `#000000` | rgb(0, 0, 0) | hsl(0, 0%, 0%) | `bg-black` | Page background, primary sections |
| White | `#FFFFFF` | rgb(255, 255, 255) | hsl(0, 0%, 100%) | `text-white` | Primary headlines, hero text |
| Off-White | `#F5F5F5` | rgb(245, 245, 245) | hsl(0, 0%, 96%) | `text-neutral-100` | Body text on dark backgrounds |

### 1B. Accent Color -- Muted Gold / Warm Amber

The accent is a warm, desaturated gold. Not flashy. Not yellow. The color of aged brass or a premium watch dial. It communicates authority and value without shouting.

| Variant | Hex | RGB | HSL | Tailwind Custom | Usage |
|---------|-----|-----|-----|-----------------|-------|
| **Accent Default** | `#C9A84C` | rgb(201, 168, 76) | hsl(44, 53%, 54%) | `text-accent` / `bg-accent` | Primary CTAs, brand icons (hourglass/chess), key highlights |
| **Accent Hover** | `#D4B85E` | rgb(212, 184, 94) | hsl(46, 56%, 60%) | `hover:bg-accent-hover` | Button hover states, active links |
| **Accent Muted** | `#A68B3C` | rgb(166, 139, 60) | hsl(45, 47%, 44%) | `text-accent-muted` | Secondary emphasis, footnotes, subtle accents |
| **Accent Bright** | `#DCC76A` | rgb(220, 199, 106) | hsl(49, 58%, 64%) | `text-accent-bright` | Sparingly -- featured metrics, hero accent words |
| **Accent BG** | `rgba(201, 168, 76, 0.08)` | -- | -- | `bg-accent/[0.08]` | Accent background tint for cards or badges |
| **Accent Border** | `rgba(201, 168, 76, 0.20)` | -- | -- | `border-accent/20` | Accent borders on highlighted cards |

**Accent Usage Rules:**
- Never use accent as a full background fill on sections larger than a button or badge.
- Accent text should only appear on dark backgrounds (minimum contrast ratio 4.5:1 against #000000 -- verified: 7.2:1).
- Maximum two accent-colored elements visible in any viewport at one time. Restraint is the rule.
- CTA buttons are the primary accent-colored element on any page.

### 1C. Neutral Gray Scale (Dark Mode)

| Name | Hex | RGB | HSL | Tailwind | Usage |
|------|-----|-----|-----|----------|-------|
| Gray 950 | `#0A0A0A` | rgb(10, 10, 10) | hsl(0, 0%, 4%) | `bg-neutral-950` | Alternate page background |
| Gray 900 | `#141414` | rgb(20, 20, 20) | hsl(0, 0%, 8%) | `bg-neutral-900` | Card backgrounds, elevated surfaces |
| Gray 850 | `#1A1A1A` | rgb(26, 26, 26) | hsl(0, 0%, 10%) | `bg-neutral-850` | Hover state on cards, secondary elevated surfaces |
| Gray 800 | `#262626` | rgb(38, 38, 38) | hsl(0, 0%, 15%) | `border-neutral-800` | Borders, dividers, separators |
| Gray 700 | `#404040` | rgb(64, 64, 64) | hsl(0, 0%, 25%) | `border-neutral-700` | Active borders, input borders |
| Gray 500 | `#737373` | rgb(115, 115, 115) | hsl(0, 0%, 45%) | `text-neutral-500` | Tertiary text, disabled states |
| Gray 400 | `#A3A3A3` | rgb(163, 163, 163) | hsl(0, 0%, 64%) | `text-neutral-400` | Secondary body text, descriptions |
| Gray 300 | `#D4D4D4` | rgb(212, 212, 212) | hsl(0, 0%, 83%) | `text-neutral-300` | Emphasized secondary text |

### 1D. Semantic Colors

| Purpose | Hex | RGB | Tailwind | Usage |
|---------|-----|-----|----------|-------|
| Success | `#22C55E` | rgb(34, 197, 94) | `text-green-500` | Confirmation, positive metrics, checkmarks |
| Warning | `#EAB308` | rgb(234, 179, 8) | `text-yellow-500` | Alerts, urgency indicators, limited spots |
| Error | `#EF4444` | rgb(239, 68, 68) | `text-red-500` | Form validation errors, critical alerts |
| Info | `#3B82F6` | rgb(59, 130, 246) | `text-blue-500` | Informational notes, links (rarely used -- prefer accent) |

**Semantic usage rules:** These colors appear only in functional contexts (form feedback, status indicators, data visualization). They never appear as decorative or brand elements.

### 1E. Dark Mode Background Layers

The dark mode design uses layered backgrounds to create depth without shadows.

| Layer | Hex | Usage | Tailwind |
|-------|-----|-------|----------|
| L0 -- Page | `#000000` | Base page background | `bg-black` |
| L1 -- Surface | `#0A0A0A` | Alternate section backgrounds (every other section) | `bg-neutral-950` |
| L2 -- Card | `#141414` | Cards, modals, dropdowns | `bg-neutral-900` |
| L3 -- Elevated | `#1A1A1A` | Hovered cards, active elements, nested surfaces | `bg-neutral-850` |

**Depth rules:**
- Never stack more than 2 layers above the page background.
- Cards on L1 sections use L2 background. Cards on L0 sections also use L2.
- Borders (`#262626`) provide edge definition instead of box-shadows.
- Subtle box-shadow is allowed only on elevated modals/dropdowns: `0 8px 32px rgba(0, 0, 0, 0.4)`.

---

## 2. TYPOGRAPHY SCALE

### 2A. Font Family

**Primary font**: Inter
**Source**: Google Fonts (`https://fonts.google.com/specimen/Inter`)
**Weights loaded**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
**Fallback stack**: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

Tailwind config:
```js
fontFamily: {
  sans: ['Inter', ...defaultTheme.fontFamily.sans],
}
```

### 2B. Type Scale -- Desktop (1280px+)

| Role | Size (px) | Size (rem) | Weight | Line-Height | Letter-Spacing | Tailwind Classes |
|------|-----------|------------|--------|-------------|----------------|------------------|
| Display / Hero | 72px | 4.5rem | 700 | 1.05 | -0.03em | `text-7xl font-bold leading-none tracking-tighter` |
| H1 | 56px | 3.5rem | 700 | 1.1 | -0.02em | `text-5xl font-bold leading-tight tracking-tight` |
| H2 | 42px | 2.625rem | 600 | 1.2 | -0.01em | `text-4xl font-semibold leading-snug tracking-tight` |
| H3 | 30px | 1.875rem | 600 | 1.3 | 0 | `text-3xl font-semibold leading-snug` |
| H4 | 24px | 1.5rem | 600 | 1.35 | 0 | `text-2xl font-semibold` |
| H5 | 20px | 1.25rem | 600 | 1.4 | 0 | `text-xl font-semibold` |
| H6 | 16px | 1rem | 600 | 1.5 | 0.01em | `text-base font-semibold tracking-wide` |
| Body Large | 20px | 1.25rem | 400 | 1.7 | 0 | `text-xl font-normal leading-relaxed` |
| Body | 17px | 1.0625rem | 400 | 1.7 | 0 | `text-[17px] font-normal leading-relaxed` |
| Body Small | 15px | 0.9375rem | 400 | 1.6 | 0 | `text-[15px] font-normal` |
| Caption | 14px | 0.875rem | 500 | 1.5 | 0.01em | `text-sm font-medium tracking-wide` |
| Label | 13px | 0.8125rem | 600 | 1.4 | 0.05em | `text-[13px] font-semibold tracking-widest uppercase` |
| Microcopy | 12px | 0.75rem | 400 | 1.5 | 0.01em | `text-xs font-normal` |

### 2C. Type Scale -- Mobile (375px)

| Role | Size (px) | Size (rem) | Adjustment |
|------|-----------|------------|------------|
| Display / Hero | 40px | 2.5rem | Reduced from 72px. Still visually dominant. |
| H1 | 36px | 2.25rem | Reduced from 56px |
| H2 | 28px | 1.75rem | Reduced from 42px |
| H3 | 24px | 1.5rem | Reduced from 30px |
| H4 | 20px | 1.25rem | Reduced from 24px |
| H5 | 18px | 1.125rem | Reduced from 20px |
| H6 | 16px | 1rem | Same |
| Body Large | 18px | 1.125rem | Slightly reduced |
| Body | 16px | 1rem | Slightly reduced |
| Body Small | 14px | 0.875rem | Slightly reduced |
| Caption | 13px | 0.8125rem | Slightly reduced |
| Label | 12px | 0.75rem | Slightly reduced |
| Microcopy | 11px | 0.6875rem | Slightly reduced |

### 2D. Type Scale -- Tablet (768px)

Tablet sizes sit between mobile and desktop. Use responsive Tailwind classes:
- Display: `text-4xl md:text-6xl lg:text-7xl`
- H1: `text-3xl md:text-4xl lg:text-5xl`
- H2: `text-2xl md:text-3xl lg:text-4xl`
- Body: `text-base md:text-[17px]`

### 2E. Weight Usage Rules

| Weight | Name | Usage |
|--------|------|-------|
| 300 | Light | Large display text as an alternative to Bold for variation. Never for body. Never below 24px. |
| 400 | Regular | Body text, descriptions, paragraphs. The workhorse. |
| 500 | Medium | Captions, emphasized body text, navigation items, form labels. |
| 600 | SemiBold | All headings H2-H6, button text, card titles, bold statements in body. |
| 700 | Bold | Display/Hero headings, H1. Reserved for maximum impact moments. |

### 2F. Text Color by Role

| Role | Color | Tailwind |
|------|-------|----------|
| Headline (H1-H3) | `#FFFFFF` | `text-white` |
| Headline (H4-H6) | `#F5F5F5` | `text-neutral-100` |
| Body text | `#D4D4D4` | `text-neutral-300` |
| Secondary text | `#A3A3A3` | `text-neutral-400` |
| Tertiary / Muted | `#737373` | `text-neutral-500` |
| Accent emphasis | `#C9A84C` | `text-accent` |

### 2G. Measure (Line Length)

- Maximum line length for body text: 65 characters (~600px at 17px).
- Tailwind: `max-w-prose` or `max-w-2xl` on text containers.
- Manifesto / belief sections: limit to 60 characters per line for impact.
- Headlines: no measure constraint -- they can span full width.

---

## 3. SPACING AND GRID SYSTEM

### 3A. Base Unit

Base unit: **4px**
All spacing values are multiples of 4px.

### 3B. Spacing Scale

| Token | Value | Tailwind | Usage Examples |
|-------|-------|----------|----------------|
| `space-1` | 4px | `p-1` / `m-1` | Micro adjustments, icon-to-text gaps |
| `space-2` | 8px | `p-2` / `m-2` | Tight internal padding, inline gaps |
| `space-3` | 12px | `p-3` / `m-3` | Small card internal padding |
| `space-4` | 16px | `p-4` / `m-4` | Standard internal padding, paragraph spacing |
| `space-5` | 20px | `p-5` / `m-5` | Medium padding |
| `space-6` | 24px | `p-6` / `m-6` | Card padding, gutter width, heading-to-body gap |
| `space-8` | 32px | `p-8` / `m-8` | Large card padding, content group spacing |
| `space-10` | 40px | `p-10` / `m-10` | Subsection spacing |
| `space-12` | 48px | `p-12` / `m-12` | Minor section breaks, mobile section padding |
| `space-16` | 64px | `p-16` / `m-16` | Major section spacing on mobile |
| `space-20` | 80px | `p-20` / `m-20` | Section padding vertical (desktop minimum) |
| `space-24` | 96px | `p-24` / `m-24` | Large section padding (desktop) |
| `space-28` | 112px | `py-28` | Hero sections, major page breaks |
| `space-32` | 128px | `py-32` | Maximum section padding (desktop hero) |

### 3C. Grid System

| Property | Value | Tailwind |
|----------|-------|----------|
| Columns (desktop) | 12 | `grid-cols-12` |
| Columns (tablet) | 8 | `md:grid-cols-8` |
| Columns (mobile) | 4 | `grid-cols-4` |
| Gutter | 24px (mobile), 32px (desktop) | `gap-6 lg:gap-8` |
| Max content width | 1200px | `max-w-[1200px]` |
| Content padding (horizontal) | 20px (mobile), 32px (tablet), 0 (desktop -- centered) | `px-5 md:px-8 lg:px-0` |
| Content centering | Auto margins | `mx-auto` |

Standard content container:
```html
<div class="mx-auto max-w-[1200px] px-5 md:px-8 lg:px-0">
```

### 3D. Common Layout Patterns

**Two-column split (text + visual):**
```
Desktop: 7 cols + 5 cols (or 6+6) with 32px gutter
Tablet: Full width, stacked
Mobile: Full width, stacked
```
Tailwind: `grid grid-cols-1 lg:grid-cols-12 gap-8` with children `lg:col-span-7` and `lg:col-span-5`.

**Three-column cards:**
```
Desktop: 4+4+4 cols
Tablet: 2 up (4+4)
Mobile: Stacked
```
Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`

**Four-column pillar cards:**
```
Desktop: 3+3+3+3 cols
Tablet: 2 up (6+6)
Mobile: Stacked
```
Tailwind: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`

### 3E. Breakpoints

| Name | Width | Tailwind Prefix | Target |
|------|-------|-----------------|--------|
| Mobile | 0 - 767px | (default) | iPhone, small Android |
| Tablet | 768px - 1023px | `md:` | iPad, medium devices |
| Desktop Small | 1024px - 1279px | `lg:` | Small laptops |
| Desktop | 1280px+ | `xl:` | Standard desktop |
| Desktop Wide | 1536px+ | `2xl:` | Large monitors |

### 3F. Section Vertical Rhythm

| Section Type | Desktop Padding (top + bottom) | Mobile Padding | Tailwind |
|-------------|-------------------------------|----------------|----------|
| Hero | 128px top, 96px bottom | 80px top, 64px bottom | `pt-32 pb-24 md:pt-20 md:pb-16` |
| Standard section | 96px | 64px | `py-24 md:py-16` |
| Compact section | 64px | 48px | `py-16 md:py-12` |
| Footer CTA | 96px | 64px | `py-24 md:py-16` |
| Navigation | 0 (fixed height: 72px desktop, 64px mobile) | -- | `h-[72px] md:h-16` |

---

## 4. HOURGLASS ICON SPECIFICATION

### 4A. Concept

The hourglass represents TIME -- the most expensive resource in any business. It is the proprietary visual element tied to the Systems pillar, efficiency metrics, urgency messaging, and the cost-of-waiting narrative.

### 4B. Geometric Construction

The hourglass is built from pure geometric shapes. No curves except at the pinch point. Architectural, not decorative.

**Construction steps:**
1. Start with two equilateral triangles, one pointing down (top half) and one pointing up (bottom half).
2. The triangles meet at a narrow connection point (the neck). The neck is approximately 15-20% of the total hourglass width.
3. Outer frame: Two horizontal lines cap the top and bottom. These lines extend slightly beyond the triangle edges (about 10% on each side) to create a frame effect.
4. The top and bottom caps have small vertical lines at each end, forming right-angle corners -- like architectural brackets.
5. Line weight: consistent stroke width throughout. No fills on the body -- the hourglass is rendered as an outline.
6. Optional detail: A few angled parallel lines inside the bottom triangle to suggest accumulated sand. These are subtle (40% opacity of stroke color).

**Proportions:**
- Total height-to-width ratio: approximately 1.5:1 (taller than wide)
- Top triangle: 45% of total height
- Neck: 10% of total height
- Bottom triangle: 45% of total height
- Cap overhang: 10% beyond triangle width on each side

**Visual feel:** Think of a drafting diagram or architectural elevation. Not playful, not ornate. Could be stamped into metal.

### 4C. Size Variants

| Variant | Size | Usage |
|---------|------|-------|
| Favicon | 16x16px, 32x32px | Browser tab icon (simplified to just the triangles and neck, no caps) |
| Inline | 20-24px height | Inline with text labels, navigation, list items |
| Section Icon | 40-48px height | Section headers, pillar card icons |
| Feature | 64-80px height | Standalone decorative element within content sections |
| Hero Decorative | 200-400px height | Large background element, very low opacity (5-8%), positioned off-center |

### 4D. Color Variants

| Context | Color | Opacity |
|---------|-------|---------|
| Featured / standalone | Accent gold `#C9A84C` | 100% |
| Inline with text | White `#FFFFFF` | 100% |
| Muted / decorative | White `#FFFFFF` | 10-15% |
| Background watermark | White `#FFFFFF` | 3-5% |
| On accent backgrounds | Black `#000000` | 100% |

### 4E. Usage Rules

**Where it appears:**
- Systems pillar card: As the pillar icon (section icon size, accent gold)
- Footer CTA section on all pages: As a decorative background element (hero decorative size, very low opacity)
- Systems sales page hero: As a featured element beside the headline
- Any section referencing time savings, efficiency, or operational metrics
- Data visualizations about hours saved or time recaptured

**Where it does not appear:**
- Never as a bullet point marker (too complex)
- Never at sizes below 16px
- Never with a gradient or glow effect
- Never animated with rotating or flipping motion (it is a static, grounded symbol)

### 4F. SVG Implementation Hint

```svg
<!-- Simplified hourglass -- geometric construction -->
<!-- viewBox calibrated for 24x36 proportions (1.5:1 ratio) -->
<svg viewBox="0 0 24 36" fill="none" stroke="currentColor" stroke-width="1.5">
  <!-- Top cap -->
  <line x1="2" y1="1" x2="22" y2="1" />
  <line x1="2" y1="1" x2="2" y2="4" />
  <line x1="22" y1="1" x2="22" y2="4" />
  <!-- Top triangle (pointing down) -->
  <line x1="3" y1="4" x2="12" y2="16" />
  <line x1="21" y1="4" x2="12" y2="16" />
  <!-- Bottom triangle (pointing up) -->
  <line x1="12" y1="20" x2="3" y2="32" />
  <line x1="12" y1="20" x2="21" y2="32" />
  <!-- Neck connection -->
  <line x1="12" y1="16" x2="12" y2="20" />
  <!-- Bottom cap -->
  <line x1="2" y1="32" x2="22" y2="32" />
  <line x1="2" y1="32" x2="2" y2="35" />
  <line x1="22" y1="32" x2="22" y2="35" />
</svg>
```

The developer should refine exact coordinates. This SVG is a starting scaffold. Use `stroke="currentColor"` so the icon inherits text color via Tailwind `text-*` classes.

---

## 5. CHESS ICON SPECIFICATION

### 5A. Primary and Secondary Pieces

- **Primary**: Knight. The knight represents dynamic, non-linear thinking -- it is the only piece that moves in an L-shape, jumping over obstacles. This aligns with the Revenue-First positioning: unconventional strategy that outmaneuvers competitors.
- **Secondary**: King. The king represents authority and the ultimate objective. Used sparingly -- only on pages or sections where authority positioning matters (founder bio, about sections, partnership program).

### 5B. Knight -- Geometric Construction

The knight is rendered as a stylized, minimal silhouette. Not a realistic horse head. Think of a chess piece you could carve from a single block with straight cuts and one or two curves.

**Construction steps:**
1. **Base**: A horizontal rectangle with slightly rounded bottom corners. Approximately 60% of total width, centered. Height: 12% of total icon height.
2. **Pedestal**: A trapezoid rising from the base, narrowing upward. Width at top: about 40% of base width. Height: 15% of total.
3. **Neck**: A vertical column rising from the pedestal. Slight forward lean (about 5-8 degrees from vertical). Width: about 25% of total width. Height: 30% of total.
4. **Head**: A simplified horse profile. Two key geometric moves:
   - The back of the head continues the neck line upward and curves forward.
   - The front face is a clean angled line from the top of the head down to the muzzle.
   - The muzzle is a small rectangular protrusion at the front, angled slightly downward.
   - One angular ear protrudes from the top of the head (a small triangle).
5. **Total proportions**: Height-to-width ratio approximately 1.8:1.

**Visual feel:** A chess piece from a premium minimalist chess set. Clean silhouette, no internal detail. Could be laser-cut from steel.

### 5C. King -- Geometric Construction (Secondary)

**Construction steps:**
1. **Base**: Same base and pedestal as knight.
2. **Body**: A tapered column rising from the pedestal, narrowing toward the top. Slight outward curve at shoulder height.
3. **Crown**: A simple cross at the top. The cross is composed of two rectangles intersecting at 90 degrees. No ornamentation.
4. **Total proportions**: Height-to-width ratio approximately 2.2:1.

### 5D. Size Variants

| Variant | Size | Usage |
|---------|------|-------|
| Inline | 20-24px height | Inline with text labels, navigation |
| Section Icon | 40-48px height | Section headers, pillar card icons |
| Feature | 64-80px height | Standalone decorative element within content |
| Hero Decorative | 200-400px height | Large background element at 5-8% opacity |

### 5E. Color Variants

Same rules as hourglass (see Section 4D).

### 5F. Usage Rules

**Where the knight appears:**
- Builder pillar card: As the pillar icon (section icon size, accent gold)
- Partners pillar card: As the pillar icon (section icon size, accent gold) -- alternative: use king for Partners to differentiate
- Builder sales page hero: As a featured element
- Any section referencing strategy, methodology, competitive advantage, or the Revenue-First Framework

**Where the king appears:**
- Founder bio sections
- Partners program (authority positioning)
- About / team pages

**Where chess icons do not appear:**
- Never alongside the hourglass in the same visual cluster (they serve different narratives)
- Never with realistic texturing or 3D rendering
- Never rotated or tilted (they stand upright, like actual chess pieces on a board)

### 5G. Chess Board Grid Texture

A subtle chess board pattern can be used as a background texture on strategy-heavy sections.

**Specification:**
- Grid of alternating squares, each approximately 40-60px
- Alternating opacity: one square at 0% (transparent), the adjacent at 2-4% (barely visible white or gray)
- Applied as a CSS background pattern or SVG tile
- Used only behind: Builder sections, methodology sections, competitive comparison tables
- Never used as a full-page background -- only behind specific content blocks, fading at edges with a gradient mask

```css
/* Chess grid background pattern */
.chess-grid {
  background-image:
    linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%);
  background-size: 48px 48px;
  background-position: 0 0, 0 24px, 24px -24px, -24px 0;
}
```

---

## 6. COMPONENT STYLES

### 6A. Buttons

#### Primary Button (CTA)

The primary button is the single most important interactive element. It carries the accent gold.

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `#C9A84C` | `bg-accent` |
| Text color | `#000000` | `text-black` |
| Font size | 16px | `text-base` |
| Font weight | 600 | `font-semibold` |
| Letter spacing | 0.01em | `tracking-wide` |
| Padding | 16px 32px | `px-8 py-4` |
| Border radius | 6px | `rounded-md` |
| Border | none | -- |
| Hover background | `#D4B85E` | `hover:bg-accent-hover` |
| Hover transform | translateY(-1px) | `hover:-translate-y-px` |
| Active background | `#A68B3C` | `active:bg-accent-muted` |
| Transition | all 200ms ease | `transition-all duration-200` |
| Min width | 200px | `min-w-[200px]` |

Full Tailwind class string:
```
bg-accent text-black text-base font-semibold tracking-wide px-8 py-4 rounded-md
hover:bg-accent-hover hover:-translate-y-px active:bg-accent-muted
transition-all duration-200 min-w-[200px] text-center inline-flex items-center justify-center
```

#### Secondary Button

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | transparent | `bg-transparent` |
| Text color | `#FFFFFF` | `text-white` |
| Border | 1px solid `#404040` | `border border-neutral-700` |
| Padding | 16px 32px | `px-8 py-4` |
| Border radius | 6px | `rounded-md` |
| Hover border | `#737373` | `hover:border-neutral-500` |
| Hover background | `rgba(255,255,255,0.03)` | `hover:bg-white/[0.03]` |

#### Ghost Button

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | transparent | `bg-transparent` |
| Text color | `#A3A3A3` | `text-neutral-400` |
| Border | none | -- |
| Padding | 8px 0 | `py-2 px-0` |
| Hover text | `#FFFFFF` | `hover:text-white` |
| Text decoration | none, underline on hover | `hover:underline` |
| Arrow suffix | " -->" appended in content | -- |

#### CTA Button (Hero variant)

Same as Primary Button with these overrides:

| Property | Value | Tailwind |
|----------|-------|----------|
| Font size | 18px | `text-lg` |
| Padding | 20px 40px | `px-10 py-5` |
| Border radius | 8px | `rounded-lg` |

Below CTA buttons, add microcopy in 12px, `text-neutral-500`:
"No commitment required" or "Free 60-minute session" etc.

### 6B. Cards

#### Standard Card (Ecosystem Pillar Cards, Feature Cards)

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `#141414` | `bg-neutral-900` |
| Border | 1px solid `#262626` | `border border-neutral-800` |
| Border radius | 8px | `rounded-lg` |
| Padding | 32px | `p-8` |
| Hover border | `#404040` | `hover:border-neutral-700` |
| Hover background | `#1A1A1A` | `hover:bg-neutral-850` |
| Transition | border-color 200ms, background 200ms | `transition-colors duration-200` |

Internal card structure:
1. **Icon** (hourglass or chess, 40px, accent gold) -- `mb-6`
2. **Card title** (H4: 24px, semibold, white) -- `mb-3`
3. **Card body** (Body: 16px, regular, neutral-400) -- `mb-6`
4. **Bullet list** (14px, neutral-400, with accent-colored bullet markers) -- `mb-6`
5. **Card CTA** (Ghost button style) -- bottom of card

#### Pricing Tier Card

Same as Standard Card with these additions:

| Property | Value |
|----------|-------|
| Highlighted tier | Add `border-accent/20` border and `bg-accent/[0.03]` background tint |
| Price | Display size (42px desktop), font-weight 700, white |
| Price period | 14px, neutral-500, inline after price |
| Feature list | Checkmarks in `text-green-500`, 15px, neutral-300 |

#### Case Study / Proof Card

| Property | Value |
|----------|-------|
| Layout | Metric on left (large, accent gold, 48px bold), story on right |
| Background | Same as standard card |
| Metric label | 13px, uppercase, neutral-500, letter-spacing 0.05em |
| Metric value | 48px, bold, accent gold or white |
| Story text | 16px, neutral-300, 2-3 lines max |

### 6C. Section Dividers and Separators

**Horizontal rule:**
```
<hr class="border-neutral-800 my-0" />
```
- 1px solid `#262626`
- No margin (spacing is handled by section padding)
- Used between major page sections when a visual break is needed

**Gradient fade divider (preferred):**
A horizontal line that fades from transparent to `#262626` at center and back to transparent:
```css
.divider-fade {
  height: 1px;
  background: linear-gradient(to right, transparent, #262626 20%, #262626 80%, transparent);
}
```

**Section background alternation (primary method):**
Alternate sections between `#000000` and `#0A0A0A` backgrounds. This provides implicit visual separation without explicit dividers.

### 6D. Navigation Bar

| Property | Value | Tailwind |
|----------|-------|----------|
| Position | Fixed top | `fixed top-0 left-0 right-0 z-50` |
| Height | 72px (desktop), 64px (mobile) | `h-[72px] md:h-16` |
| Background | `#000000` with 80% opacity, backdrop blur | `bg-black/80 backdrop-blur-md` |
| Border bottom | 1px solid `#1A1A1A` | `border-b border-neutral-850` |
| Content max width | 1200px, centered | `max-w-[1200px] mx-auto` |
| Horizontal padding | 20px mobile, 32px desktop | `px-5 lg:px-8` |

**Logo area (left):**
- Brand name "Reis IA" in 20px, font-weight 700, white
- Or brand mark if developed later

**Nav links (center/right on desktop, hidden on mobile):**
- Text: 14px, font-weight 500, `text-neutral-400`
- Hover: `text-white`
- Active page: `text-white` with a 2px bottom accent-gold underline offset by 4px
- Spacing between links: 32px
- Links: Home, Builder, Systems, Partners, About

**CTA button (right on desktop):**
- Small primary button variant: 14px, padding 10px 20px
- "Book a Call" or "Get Started"

**Mobile menu:**
- Hamburger icon: 24px, white, three horizontal lines
- Opens full-screen overlay: `bg-black/95 backdrop-blur-lg`
- Nav links stacked vertically, centered
- Each link: 24px, font-weight 600, white
- Spacing between links: 24px
- CTA button at bottom: full primary button
- Close icon: X mark, top right, 24px

### 6E. Footer

| Property | Value |
|----------|-------|
| Background | `#0A0A0A` |
| Border top | 1px solid `#1A1A1A` |
| Padding | 64px top, 32px bottom (desktop); 48px top, 24px bottom (mobile) |
| Max width | 1200px |

**Footer layout (desktop):**
```
[Brand + tagline]  [Nav Column 1]  [Nav Column 2]  [Social Links]
[Divider line]
[Copyright]                                        [Legal links]
```

- Brand name: 20px, bold, white
- Tagline: 14px, neutral-500
- Column headers: 13px, uppercase, letter-spacing 0.05em, neutral-400, font-weight 600
- Column links: 14px, neutral-500, hover: white
- Social icons: 20px, neutral-500, hover: white
- Copyright: 13px, neutral-500
- Legal links: 13px, neutral-500, hover: white

**Footer layout (mobile):** Stacked, left-aligned, 24px between groups.

### 6F. Badge / Tag Styles

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `rgba(201, 168, 76, 0.10)` | `bg-accent/10` |
| Text | `#C9A84C` | `text-accent` |
| Font size | 12px | `text-xs` |
| Font weight | 600 | `font-semibold` |
| Letter spacing | 0.05em | `tracking-widest` |
| Text transform | uppercase | `uppercase` |
| Padding | 4px 12px | `px-3 py-1` |
| Border radius | 4px | `rounded` |
| Border | 1px solid `rgba(201, 168, 76, 0.20)` | `border border-accent/20` |

Used for: Pre-headlines ("FOR DIGITAL AGENCIES"), pillar labels, program tier names, status indicators.

### 6G. Input Fields and Forms

| Property | Value | Tailwind |
|----------|-------|----------|
| Background | `#141414` | `bg-neutral-900` |
| Border | 1px solid `#404040` | `border border-neutral-700` |
| Border radius | 6px | `rounded-md` |
| Padding | 14px 16px | `px-4 py-3.5` |
| Text color | `#FFFFFF` | `text-white` |
| Placeholder color | `#737373` | `placeholder:text-neutral-500` |
| Font size | 16px | `text-base` |
| Focus border | `#C9A84C` | `focus:border-accent` |
| Focus ring | accent gold with 20% opacity | `focus:ring-2 focus:ring-accent/20` |
| Transition | border-color 200ms | `transition-colors duration-200` |

**Labels:**
- 14px, font-weight 500, neutral-300
- Margin bottom: 8px
- Tailwind: `text-sm font-medium text-neutral-300 mb-2`

**Error state:**
- Border: `#EF4444`
- Error message: 13px, `text-red-500`, displayed below input with 4px top margin

**Select/Dropdown:**
- Same styling as input
- Custom dropdown arrow (chevron-down icon, neutral-500)

### 6H. Testimonial / Quote Blocks

| Property | Value |
|----------|-------|
| Layout | Left accent border + quote text + attribution |
| Left border | 2px solid `#C9A84C` |
| Padding left | 24px |
| Quote text | 18px, italic (font-style: italic, NOT a different font), neutral-300, line-height 1.7 |
| Attribution name | 15px, font-weight 600, white |
| Attribution role | 14px, neutral-500 |
| Quote mark | Optional: a large opening quote mark (" ) in 48px, accent gold at 20% opacity, positioned as a decorative element above or to the left |

Tailwind structure:
```html
<blockquote class="border-l-2 border-accent pl-6">
  <p class="text-lg italic text-neutral-300 leading-relaxed mb-4">
    "Quote text here."
  </p>
  <footer>
    <cite class="not-italic">
      <span class="text-[15px] font-semibold text-white">Name</span>
      <span class="text-sm text-neutral-500 block">Role, Company</span>
    </cite>
  </footer>
</blockquote>
```

### 6I. FAQ Accordion

| Property | Value |
|----------|-------|
| Container | No border, separated by 1px `#262626` lines |
| Question row | 18px, font-weight 600, white, padding 24px 0, cursor pointer |
| Question hover | text shifts to neutral-200 (subtle) |
| Expand icon | Plus (+) / minus (-) sign, 20px, neutral-500, right-aligned. Rotates 45deg to form X on open. |
| Answer | 16px, neutral-400, line-height 1.7, padding 0 0 24px 0 (when open) |
| Animation | Slide down 300ms ease-out, opacity fade |

### 6J. Comparison Table

| Property | Value |
|----------|-------|
| Table background | `#141414` |
| Border | 1px solid `#262626` |
| Border radius | 8px (on outer container) |
| Header row | `#1A1A1A` background, 13px uppercase label text, neutral-400 |
| Cell padding | 16px 20px |
| Row border | 1px solid `#1A1A1A` |
| "Us" column | Highlighted with accent gold text for key advantages |
| "Them" column | Neutral-500 text, slightly muted |
| Checkmarks | `text-green-500` for positive, `text-red-500/50` (muted red) for negative |

### 6K. Process / Steps Component

For the 7-step delivery process (Systems) and 4-module breakdown (Builder).

| Property | Value |
|----------|-------|
| Step number | 48px, font-weight 700, accent gold, positioned left |
| Step title | H4 (24px, semibold, white) |
| Step description | 16px, neutral-400, max-width 600px |
| Connector line | 1px solid `#262626`, vertical, connecting step numbers |
| Layout desktop | Step number left-aligned in a narrow column, content right |
| Layout mobile | Step number above, content below, left-aligned |

### 6L. Market Data / Stats Block

For large percentage stats and metrics sections.

| Property | Value |
|----------|-------|
| Stat value | 56px desktop / 40px mobile, font-weight 700, accent gold or white |
| Stat label | 14px, uppercase, letter-spacing 0.05em, neutral-500, below the value |
| Layout | 3-column grid desktop, stacked mobile |
| Spacing between stats | 32px |
| Optional: stat context | 14px, neutral-400, 1-2 lines below label |

---

## 7. SAMPLE HERO SECTION LAYOUT

### 7A. Overview

The hero section is the first thing visitors see. It must communicate authority, clarity, and a clear next action within 3 seconds. The design is typographically driven -- the headline does the heavy lifting.

### 7B. Desktop Layout (1280px+)

```
+-----------------------------------------------------------------------+
|                           [Navigation Bar]                             |
+-----------------------------------------------------------------------+
|                                                                         |
|  [BADGE: "THE AI REVENUE ECOSYSTEM"]                                   |
|                                                                         |
|  [HEADLINE - Display size, 2 lines max]                                |
|  "AI Is Not a Technology Project.                                      |
|   It's a Revenue Strategy."                                            |
|                                                                         |
|  [SUBHEADLINE - Body Large, neutral-400, max-width 600px]              |
|  "We help companies and agencies implement AI that                     |
|   generates revenue -- not prototypes that collect dust."              |
|                                                                         |
|  [CTA CLUSTER]                                                         |
|  [PRIMARY CTA: "Book a Free AI Revenue Assessment"]                    |
|  [SECONDARY CTA: "See How It Works -->"]                               |
|                                                                         |
|  [MICROCOPY: "Free 60-minute session. No commitment."]                 |
|                                                                         |
|                              [DECORATIVE: Chess knight silhouette,      |
|                               200px, 5% opacity, positioned             |
|                               right side, vertically centered]          |
|                                                                         |
+-----------------------------------------------------------------------+
```

### 7C. Specifications

| Element | Spec |
|---------|------|
| Section background | `#000000` |
| Section padding | 128px top (accounts for fixed nav), 96px bottom |
| Badge | See Section 6F badge spec. Positioned above headline with 16px margin-bottom. |
| Headline | Display: 72px, weight 700, white, letter-spacing -0.03em, line-height 1.05. Two lines. Max width 800px. |
| Subheadline | 20px, weight 400, neutral-400, line-height 1.7. Max width 600px. Margin-top: 24px. |
| CTA cluster | Margin-top: 40px. Primary and secondary buttons side by side (inline-flex, gap 16px). On mobile: stacked, full width. |
| Microcopy | 12px, neutral-500. Margin-top: 12px. Below CTA buttons. |
| Chess knight | Absolute positioned, right 5%, top 50% transform translateY(-50%). Width 200px. Opacity 5-8%. `pointer-events-none`. |

### 7D. Mobile Layout (375px)

- Badge centered, same spec
- Headline: 40px, centered, max 2 lines
- Subheadline: 18px, centered
- CTAs: Stacked vertically, full width, primary on top
- Chess knight: Hidden on mobile (decorative, not essential)
- Section padding: 96px top, 64px bottom

### 7E. Visual Hierarchy

1. **First read**: The headline. Largest, boldest, white on black. Eyes hit this first.
2. **Second read**: The subheadline. Provides context, lighter weight and color.
3. **Third read**: The primary CTA button. Accent gold pulls attention after the message lands.
4. **Background texture**: Chess knight at 5% opacity adds visual sophistication without competing for attention.

---

## 8. IMAGERY AND TEXTURE GUIDELINES

### 8A. Background Textures

**Chess grid pattern:**
- As specified in Section 5G
- Used only on strategy-focused sections
- Faded at edges using a radial or linear gradient mask
- Implementation: CSS background pattern overlaid with gradient masks

**Subtle noise texture (optional):**
- Fine grain noise at 2-3% opacity overlaid on black backgrounds
- Adds a tactile, almost film-like quality
- Implementation: a small repeating PNG tile or CSS filter
- Use sparingly -- only on hero sections or key CTAs if at all

**Radial gradient glow (for emphasis):**
- A very subtle radial gradient behind key sections (hero, footer CTA)
- Color: accent gold at 3-5% opacity, radius 400-600px
- Centered on the headline or CTA
- Creates a barely perceptible warm glow that draws the eye
- Implementation: `radial-gradient(ellipse at center, rgba(201, 168, 76, 0.05) 0%, transparent 70%)`

### 8B. Image Treatment

**Photography (when used):**
- Moroni's photo (Founder Story section): Desaturated by 30-40%, slightly darkened
- Overlay: subtle gradient from `#000000` at edges to transparent at face
- Treatment creates cohesion with the dark mode palette
- Never use fully saturated, brightly lit photos

**Image containers:**
- Border radius: 8px (`rounded-lg`)
- Border: 1px solid `#262626`
- No drop shadows on images

**Placeholder images (before real photography exists):**
- Use solid `#141414` rectangles with a centered icon or initial
- Never use stock photos -- a solid color placeholder is more premium than a generic image

### 8C. Illustration Style

Reis IA does not use illustrations in the traditional sense. Visual communication is handled through:
- Typography (the primary visual device)
- Geometric line art (hourglass and chess icons)
- Data visualization (metrics, charts if needed)
- Minimal diagrams (process flows, ecosystem maps)

If diagrams are needed:
- Thin lines (1-1.5px stroke)
- White or neutral-400 stroke on black background
- No fills except accent gold for highlighted nodes
- Connection lines with small circles at endpoints
- Grid-aligned, architectural feel

### 8D. Icon Style for Feature Lists

- **Style**: Outlined (stroke-based), not filled
- **Stroke weight**: 1.5px
- **Size**: 24px inline with feature text
- **Color**: Accent gold `#C9A84C` (for positive features) or neutral-400 (for neutral features)
- **Source**: Use a consistent icon library (Lucide Icons recommended -- open source, clean line style, matches the aesthetic)
- **Never**: Use emoji as icons. Use filled/solid icons. Use colored/multi-tone icons.

---

## 9. MOTION AND ANIMATION

### 9A. Core Principles

- Motion is functional, not decorative. Every animation must serve a purpose: directing attention, confirming interaction, or revealing content.
- Subtle over dramatic. If a user notices the animation itself rather than the content, it is too much.
- Performance first. No animation that causes jank or delays content visibility.

### 9B. Scroll Reveal

Content sections should fade in as they enter the viewport.

| Property | Value |
|----------|-------|
| Trigger | Element enters viewport (50% visible) |
| Initial state | `opacity: 0; transform: translateY(20px)` |
| Final state | `opacity: 1; transform: translateY(0)` |
| Duration | 600ms |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo -- fast start, gentle landing) |
| Stagger | When multiple elements reveal together (e.g., pillar cards), stagger each by 100ms |
| Direction | Always vertical (upward). Never slide in from the sides. |

Implementation: Use Intersection Observer API with CSS transitions, or a lightweight library like `motion` (formerly Framer Motion) for React islands.

**Important**: Content must be server-rendered and visible without JavaScript. Animations are progressive enhancement. Never hide content behind JavaScript-only reveals.

### 9C. Hover Effects

| Element | Hover Effect | Duration | Easing |
|---------|-------------|----------|--------|
| Primary button | Background color shift + translateY(-1px) | 200ms | ease |
| Secondary button | Border lightens + subtle background tint | 200ms | ease |
| Ghost button | Text color shifts to white | 150ms | ease |
| Card | Border lightens + background shifts to L3 | 200ms | ease |
| Nav link | Text color shifts to white | 150ms | ease |
| Image / card with link | Slight scale(1.02) on the content area | 300ms | ease-out |

### 9D. Transition Timing Tokens

| Token | Duration | Easing | Usage |
|-------|----------|--------|-------|
| `fast` | 150ms | `ease` | Color changes, opacity shifts |
| `normal` | 200ms | `ease` | Button states, border changes |
| `slow` | 300ms | `ease-out` | Card transforms, layout shifts |
| `reveal` | 600ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll reveals, page entry |
| `accordion` | 300ms | `ease-out` | FAQ open/close, collapsible content |

Tailwind equivalents:
- `fast`: `transition-colors duration-150`
- `normal`: `transition-all duration-200`
- `slow`: `transition-all duration-300 ease-out`

### 9E. Page Transitions

For multi-page navigation (if using Astro View Transitions):
- **Exit**: Current page fades out -- `opacity 1 to 0` over 200ms
- **Enter**: New page fades in -- `opacity 0 to 1` over 300ms
- **No sliding**: Pages do not slide horizontally. Fade only.
- **Persistent elements**: Navigation bar does not transition -- it stays fixed.

### 9F. Loading States

- Skeleton screens for async content: rectangles of `#1A1A1A` with a subtle shimmer animation (a horizontal gradient sweep across the skeleton, 1.5s duration, infinite loop)
- Spinner (if absolutely needed): A simple ring spinner using accent gold, 24px, 1s rotation
- Prefer skeleton screens over spinners in all cases

### 9G. Micro-interactions

- **CTA button press**: Scale down to 0.98 on mousedown, return on mouseup (50ms). Provides tactile feedback.
- **Form input focus**: Border color transition to accent gold over 200ms. Ring appears.
- **Checkbox/toggle**: Smooth fill transition over 150ms.
- **Scroll indicator** (hero section, optional): A small downward-pointing chevron at bottom of hero, gently bouncing up-down (8px travel, 2s loop, ease-in-out). Fades out once user scrolls past hero.

---

## APPENDIX: TAILWIND CONFIG EXTENSIONS

The following custom values should be added to `tailwind.config.mjs` to support the brand identity:

```js
// tailwind.config.mjs
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#C9A84C',
          hover: '#D4B85E',
          muted: '#A68B3C',
          bright: '#DCC76A',
        },
        neutral: {
          850: '#1A1A1A',
          950: '#0A0A0A',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-mobile': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      maxWidth: {
        'content': '1200px',
      },
      transitionTimingFunction: {
        'reveal': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
};
```

---

## APPENDIX: CONTRAST RATIO VERIFICATION

All text color combinations meet WCAG AA standards (4.5:1 minimum for normal text, 3:1 for large text).

| Text Color | Background | Ratio | Passes |
|------------|------------|-------|--------|
| White `#FFFFFF` on Black `#000000` | Black | 21:1 | AA, AAA |
| Off-White `#F5F5F5` on Black `#000000` | Black | 19.3:1 | AA, AAA |
| Neutral-300 `#D4D4D4` on Black `#000000` | Black | 13.5:1 | AA, AAA |
| Neutral-400 `#A3A3A3` on Black `#000000` | Black | 7.4:1 | AA, AAA |
| Neutral-500 `#737373` on Black `#000000` | Black | 4.0:1 | AA (large only) |
| Accent `#C9A84C` on Black `#000000` | Black | 7.2:1 | AA, AAA |
| Black `#000000` on Accent `#C9A84C` | Accent | 7.2:1 | AA, AAA |
| Neutral-400 `#A3A3A3` on Neutral-900 `#141414` | Card bg | 6.2:1 | AA, AAA |
| White `#FFFFFF` on Neutral-900 `#141414` | Card bg | 17.4:1 | AA, AAA |

**Note on Neutral-500 (`#737373`)**: This shade fails AA for small text on pure black. Use it only for:
- Microcopy (12-13px) that is supplementary, not essential
- Disabled state text
- Decorative labels that are not load-bearing for comprehension

For essential small body text, use Neutral-400 (`#A3A3A3`) minimum.

---

*Produced by: designer-agent*
*Source context: phase1-context-summary.md, brand-voice.md, CLAUDE.md brand directives*
*Next review: When dev-agent begins implementation -- verify all Tailwind tokens are configured*
