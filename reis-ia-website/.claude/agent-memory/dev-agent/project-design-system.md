---
name: Design system — Phase 1 rebuild tokens and patterns
description: CSS custom properties, surface stack, text opacity, animation classes, signature elements after full rebuild to blue accent system
type: project
---

## Surface Stack (design-system.css)
- `--surface-0: #000000` — page background (Void)
- `--surface-1: #0A0A0A` — alternating section backgrounds (Base)
- `--surface-2: #111111` — card backgrounds (Raised)
- `--surface-3: #161616` — card hover, inputs (Elevated)
- `--surface-4: #1A1A1A` — dropdowns, tooltips (Float)

Section alternation rule: Surface-0 and Surface-1 alternate. Hero always starts on Surface-0.

## Accent Color System
- `--accent-blue: #4A90FF` — primary CTA, brand icons
- `--accent-blue-hover: #6AADFF` — hover state
- `--accent-blue-muted: #3570CC` — active/pressed
- Blue opacity ladder: `--blue-02` through `--blue-80` for fine-grained control
- NO gold/amber anywhere. Period.

## Text Opacity System (design-system.css)
- `--text-primary: #FFFFFF` (100%) — headlines, strong emphasis
- `--text-secondary: rgba(255,255,255,0.70)` — body copy, descriptions
- `--text-tertiary: rgba(255,255,255,0.50)` — captions, metadata
- `--text-quaternary: rgba(255,255,255,0.35)` — decorative, disabled
- `--text-muted: rgba(255,255,255,0.20)` — watermark text, ghost

## Typography Scale (fluid clamp)
- `--text-display`: 40px to 72px, weight 700, tracking -0.03em
- `--text-h1`: 36px to 56px, weight 700, tracking -0.025em
- `--text-h2`: 30px to 48px, weight 600, tracking -0.02em
- `--text-h3`: 26px to 36px, weight 600
- `--text-h4`: 22px to 28px, weight 600
- `--text-h5`: 20px to 24px, weight 600
- `--text-body-lg`: 18px to 20px, weight 400
- `--text-body`: 16px, weight 400
- `--text-label`: 12px, weight 600, uppercase, tracking 0.05em

## Animation Classes (animations.css)
- `.animate-on-scroll` -> `.is-visible` (fade-up 24px, 800ms ease-out)
- `.animate-stagger > .animate-on-scroll` (150ms increments)
- `.animate-fade-in` -> `.is-visible` (opacity only)
- `.animate-scale-reveal` -> `.is-visible` (scale 0.96 to 1)
- `.animate-perspective-up` -> `.is-visible` (3D rotateX 8deg, hero only)
- `.grid-stagger` -> `.in-view` (100ms per child)
- `.text-reveal` -> `.in-view` (gradient position shift)
- `.hero-animate` + `.hero-animate-1` through `.hero-animate-5`

## Signature Effects (animations.css)
- `.sapphire-scanner` / `.card-rotating-border` — blue conic-gradient border, 8s rotation
- `.aurora-bg` — 3 radial gradients, 20s animation
- `.mesh-gradient` — 4 overlapping radial gradients on surface-0
- `.grain::after` — fixed SVG noise overlay at 3% opacity
- `.light-pool-bl`, `.light-pool-tr`, `.light-pool-blue-bl`, `.light-pool-blue-center` — ambient corner pools

## Button Variants (Button.astro)
- `primary` — blue bg (#4A90FF), white text, 200px min-width, hover lift
- `hero` — larger primary (text-lg, px-10, rounded-lg)
- `secondary` — transparent, border-visible, hover border-strong
- `ghost` — text-secondary, arrow icon, hover text-primary
- All support `size="sm"` override

## Key Global CSS Classes
- `.container-standard/narrow/text/wide` — max-width + auto margin + fluid padding
- `.badge-accent/success/warning/error/neutral` — color-coded badges
- `.input` — form field with focus ring and states
- `.card-interactive` — hover border + bg shift
- `.card-featured:hover` — blue glow shadow
- `.gradient-divider` — 1px fade-to-transparent divider
- `.gradient-divider-blue` — blue-tinted stronger divider (footer)
- `.skip-to-content` — accessibility skip link
- `.placeholder-content` — blue-tinted dashed border for placeholder data

**Why:** Phase 1 rebuild established new design system foundation with blue accent, corrected surface values, and all signature elements from the design system specification.
