# Vercel Design System Reference

Last updated: 2026-03-17

Extracted from vercel.com homepage and Geist design system documentation. This is a **reference document** for studying premium web design craft -- not a template to copy. Vercel is a developer platform / SaaS product; Reis IA is a high-ticket consultancy. Adapt visual quality and craft, not product patterns.

---

## 1. Color System

### Core Philosophy

Vercel uses a **token-based** color system with CSS custom properties (`--ds-*` prefix). Colors are defined as semantic tokens rather than raw hex values, enabling seamless light/dark theme switching. The system uses `color-scheme: light` / `color-scheme: dark` at the root level.

### Dark Mode Palette (Primary Reference for Reis IA)

| Token | Hex (Dark Mode) | Usage |
|-------|-----------------|-------|
| Background 100 | `#000000` | Primary page background |
| Background 200 | `#0a0a0a` | Secondary/card backgrounds |
| Gray 100 | `#111111` | Subtle background, card default |
| Gray 200 | `#1a1a1a` | Hover background |
| Gray 300 | `#222222` | Active background |
| Gray 400 | `#2e2e2e` | Default border |
| Gray 500 | `#3e3e3e` | Hover border |
| Gray 600 | `#505050` | Active border |
| Gray 700 | `#6e6e6e` | High contrast background |
| Gray 800 | `#7e7e7e` | Hover high contrast |
| Gray 900 | `#a0a0a0` | Secondary text, icons |
| Gray 1000 | `#ededed` | Primary text, icons |

### Light Mode Palette (For Comparison)

| Token | Hex (Light Mode) | Usage |
|-------|------------------|-------|
| Background 100 | `#ffffff` | Primary page background |
| Background 200 | `#fafafa` | Secondary backgrounds |
| Gray 100 | `#f2f2f2` | Subtle background |
| Gray 200 | `#ebebeb` | Hover background |
| Gray 300 | `#e0e0e0` | Active background |
| Gray 400 | `#c9c9c9` | Default border |
| Gray 500 | `#a8a8a8` | Hover border |
| Gray 600 | `#8f8f8f` | Active border |
| Gray 700 | `#6e6e6e` | High contrast background |
| Gray 800 | `#5a5a5a` | Hover high contrast |
| Gray 900 | `#444444` | Secondary text |
| Gray 1000 | `#171717` | Primary text |

### Gray Alpha Scale (Dark Mode)

| Token | Value | Usage |
|-------|-------|-------|
| Gray Alpha 100 | `rgba(255,255,255,0.06)` | Very subtle overlay |
| Gray Alpha 200 | `rgba(255,255,255,0.09)` | Subtle hover overlay |
| Gray Alpha 300 | `rgba(255,255,255,0.13)` | Active overlay |
| Gray Alpha 400 | `rgba(255,255,255,0.17)` | Border overlay |

### Accent Colors

| Name | Token | Hex | Usage |
|------|-------|-----|-------|
| Blue (primary) | `--ds-blue-700` | `#0070f3` | Focus rings, links, primary actions |
| Blue (strong) | `--ds-blue-800` | `#0060d0` | Active state, strong accent |
| Blue (text) | `--ds-blue-900` | `#52a9ff` | Text links on dark bg |
| Red (error) | `--ds-red-800` | `#e5484d` | Error states, destructive actions |
| Amber (warning) | `--ds-amber-400` | `#ffb224` | Warning borders |
| Amber (strong) | `--ds-amber-700` | `#f5a623` | Warning icons |
| Amber (text) | `--ds-amber-900` | `#ffcb47` | Warning text on dark |
| Green (success) | `--ds-green-700` | `#45a557` | Success states |
| Teal | `--ds-teal-500` | `#12a594` | Secondary accent |
| Purple | `--ds-purple-700` | `#8e4ec6` | Highlight, badges |
| Pink | `--ds-pink-800` | `#cd2b81` | Accent, decorative |

### P3 Wide Gamut

Vercel supports P3 color space for compatible displays, providing richer, more vivid accent colors. This is implemented with `@media (color-gamut: p3)` queries.

---

## 2. Typography System

### Font Families

**Geist Sans** -- Primary typeface
```css
font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Geist Mono** -- Code and technical content
```css
font-family: 'Geist Mono', 'SFMono-Regular', 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
```

**Geist Pixel** -- Display/decorative (5 variants: Circle, Grid, Line, Square, Triangle)
Used for special visual treatments and brand identity moments.

### Design Influences
Geist Sans draws from Inter, Univers, SF Pro, Suisse International, and ABC Diatype. It follows Swiss typography principles with an emphasis on minimalism, precision, and legibility.

### Available Weights
Geist is a variable font supporting the full weight range 100-900:

| Weight | Name | Usage |
|--------|------|-------|
| 100 | Thin | Decorative display only |
| 200 | Extra Light | Large display text |
| 300 | Light | Hero subtext, large body |
| 400 | Regular | Body text, descriptions |
| 500 | Medium | Labels, emphasized body |
| 600 | Semibold | Subheadings, buttons |
| 700 | Bold | Headlines, strong emphasis |
| 800 | Extra Bold | Display headlines |
| 900 | Black | Maximum impact display |

### Type Scale

**Heading Scale**

| Token | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| heading-72 | 72px | 700-800 | 1.1 (80px) | -0.04em | Marketing heroes, display |
| heading-64 | 64px | 700 | 1.1 (70px) | -0.035em | Large hero headlines |
| heading-56 | 56px | 700 | 1.1 (62px) | -0.03em | Section heroes |
| heading-48 | 48px | 700 | 1.15 (56px) | -0.025em | Major section headings |
| heading-40 | 40px | 600-700 | 1.2 (48px) | -0.02em | Section headings |
| heading-32 | 32px | 600 | 1.25 (40px) | -0.015em | Subsection headings |
| heading-24 | 24px | 600 | 1.3 (32px) | -0.01em | Card headings, H3 |
| heading-20 | 20px | 600 | 1.4 (28px) | -0.005em | Small headings |
| heading-16 | 16px | 600 | 1.5 (24px) | 0 | Smallest heading |
| heading-14 | 14px | 600 | 1.5 (20px) | 0 | Label-size heading |

**Copy (Body) Scale**

| Token | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| copy-24 | 24px | 400 | 1.5 (36px) | -0.01em | Hero body text |
| copy-20 | 20px | 400 | 1.5 (30px) | -0.005em | Large body, intros |
| copy-18 | 18px | 400 | 1.6 (28px) | 0 | Marketing body |
| copy-16 | 16px | 400 | 1.6 (26px) | 0 | Default body |
| copy-14 | 14px | 400 | 1.5 (22px) | 0 | Secondary body |
| copy-13 | 13px | 400 | 1.5 (20px) | 0 | Tertiary, captions |

**Label Scale**

| Token | Size | Weight | Line-Height | Letter-Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| label-20 | 20px | 500 | 1.4 (28px) | -0.005em | Marketing labels |
| label-18 | 18px | 500 | 1.4 (26px) | 0 | Feature labels |
| label-16 | 16px | 500 | 1.5 (24px) | 0 | Standard labels |
| label-14 | 14px | 500 | 1.5 (20px) | 0 | Default UI label |
| label-13 | 13px | 500 | 1.5 (20px) | 0 | Small labels |
| label-12 | 12px | 500 | 1.5 (18px) | 0.02em | Micro labels, ALL CAPS |

**Button Scale**

| Token | Size | Weight | Line-Height | Letter-Spacing |
|-------|------|--------|-------------|----------------|
| button-16 | 16px | 500 | 1.5 (24px) | 0 |
| button-14 | 14px | 500 | 1.5 (20px) | 0 |
| button-12 | 12px | 500 | 1.5 (18px) | 0 |

**Mono Variants**
Each label and copy token has a `-mono` variant that uses Geist Mono instead of Geist Sans. Used for code snippets, technical values, and data displays.

### Modifiers

- **Strong**: Applied via `<strong>` tag. Increases weight by 100-200 (e.g., copy-14 goes from 400 to 600).
- **Subtle**: Applied via class. Reduces contrast -- uses `--ds-gray-900` instead of `--ds-gray-1000` for text.

### Key Typography Patterns

1. **Letter-spacing tightens as size increases**: -0.04em at 72px, 0 at 16px, +0.02em at 12px
2. **Line-height loosens as size decreases**: 1.1 at 72px, 1.5-1.6 at 14-16px
3. **Weight increases for headings**: 400 for body, 500 for labels, 600-700 for headings, 700-800 for display
4. **Responsive sizing**: Headings use `md:` and `lg:` breakpoint prefixes for size changes

---

## 3. Spacing System

### Spacing Scale (Tailwind-based)

Vercel uses Tailwind CSS utilities. The spacing scale follows Tailwind's default (4px base):

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| 0.5 | 2px | `p-0.5` | Minimal inner spacing |
| 1 | 4px | `p-1` | Tight spacing, inline |
| 1.5 | 6px | `p-1.5` | Small inner padding |
| 2 | 8px | `p-2` | Compact padding |
| 3 | 12px | `p-3` | Small card padding |
| 4 | 16px | `p-4` | Standard inner padding |
| 5 | 20px | `p-5` | Medium padding |
| 6 | 24px | `p-6` | Standard gap, card padding |
| 7 | 28px | `p-7` | Larger gap |
| 8 | 32px | `p-8` | Card padding (default) |
| 10 | 40px | `p-10` | Section inner padding |
| 12 | 48px | `p-12` | Large section padding |
| 16 | 64px | `p-16` | Section vertical padding |
| 20 | 80px | `p-20` | Large section padding |
| 24 | 96px | `p-24` | Section padding desktop |
| 32 | 128px | `p-32` | Maximum section spacing |

### Section Padding

| Context | Mobile | Desktop |
|---------|--------|---------|
| Standard section | 48-64px | 96-128px |
| Hero section | 80px top | 120-160px top |
| Card sections | 32px inner | 32px inner |
| Footer | 48px top | 64px top |

### Gap Scale (Common Usage)

| Tailwind | Value | Usage |
|----------|-------|-------|
| `gap-2` | 8px | Tight element groups |
| `gap-3` | 12px | Icon + text pairs |
| `gap-4` | 16px | Standard element spacing |
| `gap-6` | 24px | Card content spacing |
| `gap-7` | 28px | Feature grid |
| `gap-8` | 32px | Section content spacing |

---

## 4. Layout System

### Container

```css
max-width: 1200px;  /* --max-width: 1200px */
/* Alternative: 1220px for outer container with padding */
margin: 0 auto;
padding: 0 24px;    /* Mobile */
padding: 0 32px;    /* Tablet */
padding: 0 48px;    /* Desktop */
```

### Grid System

Vercel uses CSS Grid with responsive columns via custom properties:

```css
/* Grid configuration via CSS variables */
--grid-rows: var(--sm-grid-rows, auto);
--grid-columns: var(--sm-grid-columns, 1);

/* Responsive overrides */
@media (min-width: 768px) {
  --grid-columns: var(--md-grid-columns, 2);
  --grid-rows: var(--md-grid-rows, auto);
}
```

Common grid patterns:
- 1 column (mobile) → 2 columns (tablet) → 3 columns (desktop)
- 1 column (mobile) → 2 columns (desktop) for feature pairs
- 9-column grid for complex layouts

### Breakpoints

| Name | Width | Tailwind Prefix |
|------|-------|-----------------|
| xs | 0px | (default) |
| sm | 640px | `sm:` |
| smd | 720px | `smd:` |
| md | 768px | `md:` |
| lg | 1024px | `lg:` |
| xl | 1280px | `xl:` |

### Z-Index Scale

| Level | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default content |
| Raised | 10 | Overlapping elements |
| Dropdown | 50 | Dropdown menus |
| Sticky | 90 | Sticky headers |
| Navigation | 100 | Fixed navigation |
| Modal | 200 | Modal overlays |
| Toast | 300 | Toast notifications |

---

## 5. Component Specifications

### Buttons

**Size Variants**

| Size | Height | Padding (H) | Font Size | Border Radius |
|------|--------|-------------|-----------|---------------|
| Small | 32px | 12px | 13px | 6px |
| Medium (default) | 40px | 16px | 14px | 8px |
| Large | 48px | 20px | 16px | 10px |

**Type Variants (Dark Mode)**

| Type | Background | Text Color | Border |
|------|-----------|------------|--------|
| Default (Primary) | `#ededed` (gray-1000) | `#000000` | none |
| Secondary | `#1a1a1a` (gray-200) | `#ededed` (gray-1000) | 1px `#2e2e2e` (gray-400) |
| Tertiary | transparent | `#a0a0a0` (gray-900) | 1px `#2e2e2e` (gray-400) |
| Error | `#e5484d` (red-800) | `#ffffff` | none |
| Warning | `#f5a623` (amber-700) | `#000000` | none |

**Hover States (Dark Mode)**

| Type | Background Hover | Transition |
|------|-----------------|------------|
| Default | `#ffffff` | 200ms ease |
| Secondary | `#222222` (gray-300) | 200ms ease |
| Tertiary | `#1a1a1a` (gray-200) | 200ms ease |

**Rounded Variant (Marketing)**
```css
border-radius: 999px;  /* Pill shape */
/* Used on marketing pages with shape="rounded" prop */
```

**Button Transitions**
```css
transition-property: color, background-color, border-color, box-shadow;
transition-duration: 200ms;
transition-timing-function: ease;
```

**Focus State**
```css
outline: 2px solid #0070f3;  /* --ds-blue-700 */
outline-offset: 2px;
```

**Disabled State**
```css
opacity: 0.5;
cursor: not-allowed;
pointer-events: none;
```

### Cards

**Standard Card**
```css
padding: 32px;          /* p-8 */
background: #0a0a0a;    /* --ds-background-200 */
border: 1px solid #2e2e2e; /* --ds-gray-400 */
border-radius: 12px;
display: flex;
flex-direction: column;
gap: 24px;              /* gap-6 */
height: 100%;
```

**Card Hover**
```css
/* Group hover pattern */
.card:hover .card-title {
  color: #ededed;       /* gray-1000 */
  transition: color 200ms;
}
```

**Card Focus**
```css
/* Blue border overlay on focus-visible */
border: 2px solid #0070f3;  /* --ds-blue-700 */
opacity: 0 → 1;
```

**Card Link Behavior**
```css
text-decoration: none;
background-clip: padding-box;
```

### Navigation

**Header Bar**
```css
position: sticky;
top: 0;
z-index: 100;
height: 64px;
background: rgba(0, 0, 0, 0.8);   /* Dark mode */
backdrop-filter: saturate(180%) blur(20px);
-webkit-backdrop-filter: saturate(180%) blur(20px);
border-bottom: 1px solid #2e2e2e;  /* --ds-gray-400 */
```

**Nav Links**
```css
font-size: 14px;
font-weight: 400;
color: #a0a0a0;         /* gray-900 */
transition: color 200ms;
```

**Nav Link Hover**
```css
color: #ededed;          /* gray-1000 */
```

**Mobile Navigation**
```css
/* Full-screen overlay */
position: fixed;
inset: 0;
background: #000000;
z-index: 200;
padding: 16px;
```

### Footer

```css
padding: 64px 0 48px;
border-top: 1px solid #2e2e2e;
/* Multi-column grid layout */
grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
gap: 32px;
```

Footer link styling:
```css
font-size: 14px;
color: #a0a0a0;          /* gray-900 */
line-height: 1.5;
transition: color 200ms;
```

---

## 6. Animation & Motion System

### Timing Functions

| Name | Value | Usage |
|------|-------|-------|
| Default ease | `ease` | General transitions |
| Smooth decel | `cubic-bezier(0.25, 0.1, 0.25, 1)` | Standard motion |
| Quick out | `cubic-bezier(0.16, 1, 0.3, 1)` | Menu open, elements appearing |
| Subtle spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Micro-interactions with overshoot |
| Linear | `linear` | Continuous animations, progress |

### Duration Scale

| Duration | Usage |
|----------|-------|
| 100ms | Micro-interactions (opacity hints) |
| 150ms | Color transitions, icon hover |
| 200ms | Standard transitions (color, background, border) |
| 300ms | Menu transitions, card hover |
| 400ms | Section entrance animations |
| 500ms | Complex transitions, page-level |
| 800ms | Hero entrance, staggered reveals |
| 1000ms+ | Decorative/ambient animations |

### Entrance Animations

**Fade Up (Primary entrance pattern)**
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
```

**Staggered entrance** -- child elements animate sequentially:
```css
animation-delay: calc(var(--index) * 100ms);
```

### Hover Transitions

**Standard color transition**
```css
transition: color 200ms ease;
```

**Background + border transition**
```css
transition: background-color 200ms ease, border-color 200ms ease;
```

### Scroll-Triggered Patterns

Vercel uses IntersectionObserver for scroll-based reveals:
- Elements start with `opacity: 0; transform: translateY(20px)`
- On intersection: animate to `opacity: 1; transform: translateY(0)`
- Threshold: typically 0.1-0.2 (trigger when 10-20% visible)
- Once triggered, animation does not reverse

### Performance Metrics

Vercel tracks navigation performance phases internally:
- `globalThis.__VERCEL_NAVIGATION_METRICS_RECORDED_MEASURES`
- Measures "content visible" phase timing
- Uses `requestAnimationFrame` for paint-accurate timing

---

## 7. Effects & Visual Treatments

### Backdrop Blur (Glassmorphism)

**Navigation bar**
```css
backdrop-filter: saturate(180%) blur(20px);
-webkit-backdrop-filter: saturate(180%) blur(20px);
background: rgba(0, 0, 0, 0.8);
```

**Floating elements**
```css
backdrop-filter: blur(12px);
background: rgba(0, 0, 0, 0.6);
```

### Shadows (Dark Mode)

In dark mode, Vercel uses minimal shadows since dark backgrounds already provide depth. Elevation is communicated primarily through border lightness and background value shifts:

| Elevation | Treatment |
|-----------|-----------|
| Flat | `border: 1px solid #2e2e2e` |
| Raised | `background: #111111; border: 1px solid #2e2e2e` |
| Floating | `background: #1a1a1a; border: 1px solid #3e3e3e; box-shadow: 0 8px 30px rgba(0,0,0,0.4)` |
| Modal | `background: #1a1a1a; box-shadow: 0 16px 70px rgba(0,0,0,0.5)` |

### Gradients

**Subtle background gradient (hero)**
```css
background: radial-gradient(ellipse 80% 60% at 50% -20%, rgba(120, 119, 198, 0.15), transparent);
```

**Fade-to-black overlay**
```css
background: linear-gradient(transparent, #000000);
```

**Edge fade (marquee/carousel)**
```css
mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
```

### Border Treatments

**Standard border**
```css
border: 1px solid #2e2e2e;  /* --ds-gray-400 */
```

**Subtle border (hover reveal)**
```css
border: 1px solid transparent;
transition: border-color 200ms;
/* On hover: */
border-color: #3e3e3e;       /* --ds-gray-500 */
```

**Accent border (focus)**
```css
border: 2px solid #0070f3;   /* --ds-blue-700 */
```

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| None | 0 | Square elements |
| XS | 4px | Small inline elements |
| SM | 6px | Small buttons, badges |
| MD | 8px | Default buttons, inputs |
| LG | 12px | Cards, panels |
| XL | 16px | Large cards, modals |
| Full | 999px | Pills, rounded buttons |

### Noise Texture

Vercel occasionally uses a subtle noise texture overlay for depth:
```css
/* Applied as pseudo-element */
background-image: url('data:image/svg+xml,...'); /* inline SVG noise */
opacity: 0.02-0.05;
mix-blend-mode: overlay;
```

---

## 8. Section Layout Patterns

### Hero Section

```
┌─────────────────────────────────────┐
│           [Nav bar - 64px]          │
├─────────────────────────────────────┤
│                                     │
│    [Heading - heading-56 to 72]     │
│    [Subheading - copy-18 to 20]     │
│    [CTA group - 16px gap]           │
│                                     │
│    [Hero visual / product demo]     │
│                                     │
├─────────────────────────────────────┤
```

- Background: Pure black (#000000)
- Heading: centered, max-width ~800px
- Subheading: centered, gray-900, max-width ~600px
- CTA group: centered, 2 buttons (primary + secondary)
- Vertical padding: 120-160px top, 80-120px bottom

### Feature Grid Section

```
┌─────────────────────────────────────┐
│  [Section heading - heading-40]     │
│  [Section description - copy-16]    │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ Card │ │ Card │ │ Card │       │
│  │      │ │      │ │      │       │
│  └──────┘ └──────┘ └──────┘       │
│                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │ Card │ │ Card │ │ Card │       │
│  │      │ │      │ │      │       │
│  └──────┘ └──────┘ └──────┘       │
└─────────────────────────────────────┘
```

- 3 columns on desktop (1024px+), 2 on tablet, 1 on mobile
- Cards: 32px padding, 12px border-radius, 1px border
- Gap: 16-24px between cards
- Section heading: left-aligned or centered

### CTA / Closing Section

```
┌─────────────────────────────────────┐
│                                     │
│    [Heading - heading-48]           │
│    [Body - copy-18]                 │
│    [Primary CTA button]             │
│                                     │
└─────────────────────────────────────┘
```

- Background: black or very subtle gradient
- Content: centered, max-width 700px
- Generous vertical padding: 120px+
- Single CTA button, primary style

### Logo / Social Proof Strip

```
┌─────────────────────────────────────┐
│  [Label - label-12, ALL CAPS]       │
│  [Logo row - horizontal scroll]     │
└─────────────────────────────────────┘
```

- Logos in gray-700 (desaturated, muted)
- Horizontal scroll on mobile
- Edge fade mask on both sides
- Optional: continuous marquee animation

---

## 9. Unique Signature Elements

### 1. The Black Canvas

Vercel's most defining visual characteristic is its commitment to **pure black (#000000)**. Not near-black, not charcoal -- true black. This creates maximum contrast with white text and makes accent colors pop with unusual vibrancy. The entire brand identity is built on this foundation.

**What makes it work**: The gray scale creates depth through subtle value shifts (from #000000 to #0a0a0a to #111111). Borders at #2e2e2e provide structure without breaking the darkness. The result feels like content floating in space.

**Reis IA adaptation note**: Already aligned. The Reis IA brand uses the same pure black foundation. The key learning is restraint -- Vercel uses very few background values (3-4 shades of near-black) rather than a wide spectrum. Fewer values = more sophisticated.

### 2. Geist Font System

The Geist typeface family is purpose-built for Vercel's needs. Geist Sans provides a clean, neutral sans-serif with excellent legibility at all sizes. Geist Mono complements it for code. The Geist Pixel variants (Circle, Grid, Line, Square, Triangle) create distinctive brand moments.

**What makes it work**: The font has Swiss precision without being cold. Variable font weight allows smooth transitions. The pixel variants create a unique visual language that no other brand has.

**Reis IA adaptation note**: Inter (our chosen font) is a close relative of Geist Sans (both influenced by Swiss typography). The key learning is to use Inter's variable weight range more expressively -- not just 400/600/700 but also 300 for light body text and 800 for maximum impact display.

### 3. Minimal Elevation System

Instead of complex shadow hierarchies, Vercel communicates depth through **border and background value shifts**. A card is raised by having a slightly lighter background (#0a0a0a or #111111) and a visible border (#2e2e2e). Shadows are reserved only for floating elements (modals, dropdowns).

**What makes it work**: In dark mode, shadows are nearly invisible anyway. Border + background shifts are more effective and more performant. The system is simpler and more predictable.

**Reis IA adaptation note**: Adopt this approach. Use background-value shifts (#000 → #0A0A0A → #141414) for elevation. Reserve shadows for floating elements only. Add the gold accent border sparingly for premium card treatments.

### 4. Saturated Backdrop Blur

The navigation bar combines `saturate(180%)` with `blur(20px)` -- the saturation boost prevents the blur from looking washed out. This creates a rich, vibrant glassmorphism effect on dark backgrounds.

**What makes it work**: Standard backdrop-filter blur desaturates underlying content, making it look muddy. The saturate() compensates, keeping the glass effect clean and vivid.

**Reis IA adaptation note**: Apply `backdrop-filter: saturate(180%) blur(20px)` to the navigation bar. Use `rgba(0, 0, 0, 0.8)` as the semi-transparent background.

### 5. Invisible Transitions

Vercel's interaction design philosophy is **"transitions should be felt, not seen."** Standard transition duration is 200ms -- fast enough to feel instant but slow enough to avoid jarring jumps. Color changes, not scale or position changes, are the primary hover feedback.

**What makes it work**: Restraint. No bouncing, no overshooting, no complex multi-property animations on hover. Just a color shift at 200ms. This feels professional and fast.

**Reis IA adaptation note**: Default to 200ms for all hover transitions. Use color/opacity changes for hover feedback. Reserve transform animations for scroll-triggered entrances only.

---

## 10. Responsive Design Patterns

### Typography Scaling

| Level | Mobile (< 768px) | Desktop (1024px+) | Reduction |
|-------|-------------------|--------------------|-----------|
| Hero heading | 40-48px | 64-72px | ~35% smaller |
| Section heading | 32px | 40-48px | ~25% smaller |
| Subsection | 24px | 32px | ~25% smaller |
| Body | 16px | 16-18px | Minimal change |
| Caption | 13px | 13-14px | No change |

### Layout Collapse

- 3-column grids → 1 column on mobile
- 2-column grids → 1 column on mobile (stacked)
- Horizontal nav → hamburger menu below 768px
- Side-by-side CTAs → stacked on mobile
- Card padding reduces from 32px to 24px on mobile

### Mobile-Specific Treatments

- Navigation becomes full-screen overlay
- Touch targets: minimum 44x44px
- No hover effects on touch devices
- Horizontal scrolling for card carousels (with snap points)
- Reduced section padding (48-64px instead of 96-128px)

---

## Appendix: CSS Custom Properties Reference

```css
/* Layout */
--max-width: 1200px;
--grid-columns: 1;        /* mobile default */
--grid-rows: auto;
--sm-grid-columns: 2;     /* tablet */
--md-grid-columns: 3;     /* desktop */

/* Colors (Dark Mode) */
--ds-background-100: #000000;
--ds-background-200: #0a0a0a;
--ds-gray-100: #111111;
--ds-gray-200: #1a1a1a;
--ds-gray-300: #222222;
--ds-gray-400: #2e2e2e;
--ds-gray-500: #3e3e3e;
--ds-gray-600: #505050;
--ds-gray-700: #6e6e6e;
--ds-gray-800: #7e7e7e;
--ds-gray-900: #a0a0a0;
--ds-gray-1000: #ededed;
--ds-blue-700: #0070f3;
--ds-red-800: #e5484d;
--ds-amber-700: #f5a623;
--ds-green-700: #45a557;

/* Typography */
--font-sans: 'Geist', system-ui, sans-serif;
--font-mono: 'Geist Mono', monospace;

/* Transitions */
--transition-default: 200ms ease;
--transition-fast: 150ms ease;
--transition-slow: 300ms ease;

/* Shadows (Dark Mode) */
--shadow-floating: 0 8px 30px rgba(0,0,0,0.4);
--shadow-modal: 0 16px 70px rgba(0,0,0,0.5);

/* Effects */
--nav-blur: saturate(180%) blur(20px);
--nav-bg: rgba(0, 0, 0, 0.8);
```

---

[ADDED -- 2026-03-17]

## Source Code Extraction Findings

Extracted from vercel.com (7 pages analyzed: homepage, /geist, /geist/colors, /design, /frameworks, /enterprise, /docs). Source file: `source-code-extractions/vercel-source.md`.

### A. `--ds-[color]-[shade]` Token Naming Convention (Complete)

The Geist design system uses a strict `--ds-[category]-[shade]` naming pattern for all CSS custom properties:

```css
/* Token naming pattern: --ds-[color]-[shade] */

/* Background tokens */
--ds-background-100: /* primary bg */;
--ds-background-200: /* secondary bg */;

/* Gray scale (10 steps) */
--ds-gray-100: /* lightest */;
--ds-gray-200: ;
--ds-gray-300: ;
--ds-gray-400: ;
--ds-gray-500: ;
--ds-gray-600: ;
--ds-gray-700: ;
--ds-gray-800: ;
--ds-gray-900: ;
--ds-gray-1000: /* darkest */;

/* Gray alpha (transparency variants) */
--ds-gray-alpha-100: ;
--ds-gray-alpha-400: ;

/* Semantic color families */
--ds-blue-700: ;
--ds-blue-800: ;
--ds-blue-900: ;
--ds-red-800: ;
--ds-green-700: ;
--ds-amber-100: ;
--ds-amber-400: ;
--ds-amber-700: ;
--ds-amber-900: ;
--ds-teal-*: /* teal scale */;
--ds-purple-*: /* purple scale */;
--ds-pink-*: /* pink scale */;
```

**Theme switching mechanism:**
```css
:root[data-theme="dark"] {
  color-scheme: dark;
  /* Meta theme-color: #0a0a0a */
}

:root[data-theme="light"] {
  color-scheme: light;
  /* Meta theme-color: #ffffff */
}
```

**Recommended Reis IA token naming (adapted):**
```css
--reis-background-100: #000000;
--reis-background-200: #0a0a0a;
--reis-gray-100: /* lightest gray */;
--reis-gray-1000: /* darkest gray */;
--reis-gold-100: /* lightest gold */;
--reis-gold-900: /* darkest gold */;
--reis-text-primary: ;
--reis-text-secondary: ;
--reis-text-tertiary: ;
```

### B. Beam Animation (Full CSS)

```css
@keyframes beam {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translateY(100vh);
    opacity: 0;
  }
}

.beam {
  width: 1px;
  height: 200px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--ds-blue-700),
    transparent
  );
  animation: beam 4s ease-in-out infinite;
}
```

**Reis IA adaptation:** Replace `var(--ds-blue-700)` with gold accent. Could accent the hourglass motif as a vertical light beam.

### C. Dot Pattern (Full CSS)

```css
.dot-pattern {
  background-image: radial-gradient(
    circle at 1px 1px,
    var(--ds-gray-alpha-400) 1px,
    transparent 0
  );
  background-size: 24px 24px;
}
```

### D. Border Glow Effect (Conic Gradient Mask)

```css
.glow-card {
  position: relative;
  border-radius: 12px;
  background: var(--ds-background-200);
}

.glow-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: conic-gradient(
    from 180deg at 50% 50%,
    transparent 0deg,
    var(--ds-blue-700) 90deg,
    transparent 180deg,
    var(--ds-purple-700) 270deg,
    transparent 360deg
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1px;
}
```

**Reis IA adaptation:** Replace `var(--ds-blue-700)` and `var(--ds-purple-700)` with gold tones for brand-aligned border glow.

### E. Skeleton Loading Animation

```css
@keyframes skeleton-pulse {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--ds-gray-100) 0px,
    var(--ds-gray-200) 40px,
    var(--ds-gray-100) 80px
  );
  background-size: 200px 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}
```

**Performance tracking for skeleton:**
```javascript
performance.measure("skeleton visible", {
  detail: {
    vercelNavigation: {
      isHardNavigation: true,
      phase: "skeleton",
      state: "visible"
    }
  }
});
```

### F. Grid Line Animation (Background + Sweep)

```css
/* Static grid background */
.grid-bg {
  background-image:
    linear-gradient(var(--ds-gray-alpha-100) 1px, transparent 1px),
    linear-gradient(90deg, var(--ds-gray-alpha-100) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Animated highlight line sweeping across grid */
@keyframes grid-sweep {
  from { transform: translateX(-100%); }
  to { transform: translateX(100%); }
}

.grid-highlight {
  background: linear-gradient(
    90deg,
    transparent,
    var(--ds-blue-700),
    transparent
  );
  animation: grid-sweep 3s ease-in-out infinite;
  opacity: 0.3;
}
```

### G. Additional CSS Custom Properties Found

```css
/* Layout tokens */
:root {
  --raw-sidebar-width: 256px; /* Range: 240px - 400px */
  --raw-omniagent-panel-width: 420px;
}

/* Geist font system */
font-family: "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif;
font-family: "Geist Mono", monospace;
```

### H. JavaScript Patterns

**Theme system:**
```javascript
const theme = localStorage.getItem('zeit-theme');
// Toggles: "light", "dark", "system"

function updateThemeColor(theme) {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (theme === 'dark') {
    metaThemeColor.content = '#0a0a0a';
  } else {
    metaThemeColor.content = '#ffffff';
  }
}
```

**Code block protection via MutationObserver:**
```javascript
const globalObserver = new MutationObserver(mutations => {
  /* Monitors: childList, subtree, characterData */
  /* Restores: code[data-geist-code-block] elements */
});

globalObserver.observe(document.documentElement, {
  childList: true,
  subtree: true,
  characterData: true
});
```

### I. Enterprise Page Patterns

```css
/* Enterprise hero gradient text */
.enterprise-hero__title {
  background: linear-gradient(to right, #fff, #999);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Customer logo infinite ticker */
.logo-ticker {
  display: flex;
  animation: scroll-left 30s linear infinite;
  gap: 48px;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.logo-ticker:hover {
  animation-play-state: paused;
}

/* Edge fade masks */
.logo-ticker-container {
  -webkit-mask-image: linear-gradient(
    90deg,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}
```

### J. Deploy Animation Pattern

```css
.deploy-terminal {
  background: var(--ds-background-200);
  border: 1px solid var(--ds-gray-alpha-400);
  border-radius: 8px;
  font-family: "Geist Mono", monospace;
}

.deploy-log-line {
  opacity: 0;
  animation: fade-in 0.3s ease forwards;
  animation-delay: var(--line-delay);
}

.deploy-status {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### K. Stripe-Compatible Spacing Tokens

```javascript
const spacing = {
  '0': '0px',
  'xxsmall': '2px',
  'xsmall': '4px',
  'small': '8px',
  'medium': '16px',
  'large': '24px',
  'xlarge': '32px',
  'xxlarge': '48px',
};
```

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created |
| 2026-03-17 | Appended source code extraction findings: `--ds-[color]-[shade]` token naming, beam animation, dot pattern, border glow (conic gradient mask), skeleton loading, grid line animation, enterprise patterns, deploy animation, JS theme system, code block MutationObserver, Stripe spacing tokens |
