# Aspecto Belo — Design System

> Last updated: 2026-04-21
> Version: 1.0
> Category: Construction & Renovation Services

---

## 1. Brand Overview

**Company**: Aspecto Belo — Soluções & Reformas
**Sector**: Construction, renovation, home improvement
**Positioning**: Professional, reliable, quality-focused residential and commercial renovation services
**Tone**: Trustworthy, competent, approachable yet professional

---

## 2. Logo System

### 2.1 Primary Logo (Full Lockup)
- House icon above wordmark
- "ASPECTO" in red (#E53935), "BELO" in dark (#2D2D2D)
- "Soluções & Reformas" tagline centered below
- Minimum size: 120px wide (digital), 30mm wide (print)

### 2.2 Icon Mark (Standalone)
- House icon only, used for favicons, profile pictures, watermarks
- Minimum size: 32px (digital), 10mm (print)

### 2.3 Wordmark Only
- "ASPECTOBELO" text without icon, for horizontal-constrained spaces
- Same color split: red ASPECTO + dark BELO

### 2.4 Logo Clear Space
- Minimum clear space around logo: 1x height of the "A" in ASPECTO on all sides
- No other elements may intrude into the clear space zone

### 2.5 Logo Don'ts
- Do not rotate or skew the logo
- Do not change the color relationship (ASPECTO must always be red, BELO must always be dark)
- Do not separate the icon from the wordmark in the primary lockup
- Do not add effects (shadows, gradients, outlines, glows)
- Do not stretch or compress disproportionately
- Do not place on busy photographic backgrounds without a solid backing

---

## 3. Color Palette

### 3.1 Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Aspecto Red | #E53935 | 229, 57, 53 | Primary brand color, icon, "ASPECTO" text, CTAs, accents |
| Dark Charcoal | #2D2D2D | 45, 45, 45 | "BELO" text, body copy, headings |
| White | #FFFFFF | 255, 255, 255 | Backgrounds, reversed text |

### 3.2 Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Light Red | #EF5350 | 239, 83, 80 | Hover states, lighter accents |
| Dark Red | #C62828 | 198, 40, 40 | Active states, pressed buttons |
| Medium Gray | #666666 | 102, 102, 102 | Tagline, secondary text, captions |
| Light Gray | #F5F5F5 | 245, 245, 245 | Section backgrounds, cards |
| Border Gray | #E0E0E0 | 224, 224, 224 | Dividers, borders, rules |

### 3.3 Functional Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success Green | #43A047 | Confirmations, completed status |
| Warning Amber | #FB8C00 | Alerts, important notices |
| Error Red | #E53935 | Uses brand red for errors (consistency) |
| Info Blue | #1E88E5 | Informational messages |

### 3.4 Color Usage Rules
- Aspecto Red is the dominant brand accent -- use it for primary CTAs, icons, and highlights
- Dark Charcoal is the default text color (never pure black #000 for body text)
- White backgrounds are default; Light Gray (#F5F5F5) for alternating sections
- Maximum 60% white, 30% red, 10% dark ratio on any given layout
- Red text on white background only at 18px+ (accessibility)

---

## 4. Typography

### 4.1 Font Stack

| Role | Font | Weight | Fallback |
|------|------|--------|----------|
| Logo / Wordmark | Arial Black | 900 | Impact, sans-serif |
| Headings | Montserrat | 700 (Bold) | Arial, sans-serif |
| Subheadings | Montserrat | 600 (SemiBold) | Arial, sans-serif |
| Body | Open Sans | 400 (Regular) | Arial, sans-serif |
| Body Emphasis | Open Sans | 600 (SemiBold) | Arial, sans-serif |
| Captions / Small | Open Sans | 400 (Regular) | Arial, sans-serif |
| Tagline | Open Sans | 300 (Light) | Arial, sans-serif |

### 4.2 Type Scale

| Level | Size (Desktop) | Size (Mobile) | Line Height | Weight |
|-------|---------------|---------------|-------------|--------|
| H1 | 48px | 32px | 1.2 | 700 |
| H2 | 36px | 26px | 1.25 | 700 |
| H3 | 28px | 22px | 1.3 | 600 |
| H4 | 22px | 18px | 1.35 | 600 |
| Body Large | 18px | 16px | 1.6 | 400 |
| Body | 16px | 15px | 1.6 | 400 |
| Caption | 14px | 13px | 1.5 | 400 |
| Small | 12px | 12px | 1.4 | 400 |

### 4.3 Typography Rules
- Headings: Montserrat Bold, Dark Charcoal (#2D2D2D)
- Body: Open Sans Regular, Dark Charcoal (#2D2D2D)
- Links: Aspecto Red (#E53935), underline on hover
- Never use more than 2 font families on a single page
- Maximum line width: 75 characters for body text

---

## 5. Spacing System

### 5.1 Base Unit
Base unit: **8px**

| Token | Value | Usage |
|-------|-------|-------|
| space-xs | 4px | Tight gaps, icon-to-label |
| space-sm | 8px | Inline elements, small padding |
| space-md | 16px | Component internal padding |
| space-lg | 24px | Between related components |
| space-xl | 32px | Section sub-spacing |
| space-2xl | 48px | Between sections |
| space-3xl | 64px | Major section breaks |
| space-4xl | 96px | Page-level breathing room |

### 5.2 Layout Grid
- Desktop: 12-column grid, 1200px max-width, 24px gutters
- Tablet: 8-column grid, 16px gutters
- Mobile: 4-column grid, 16px gutters, 16px side margins

---

## 6. Component Styles

### 6.1 Buttons

**Primary Button**
- Background: #E53935
- Text: White, Montserrat SemiBold, 16px
- Padding: 12px 32px
- Border-radius: 6px
- Hover: #C62828
- Active: #B71C1C
- Shadow: 0 2px 8px rgba(229, 57, 53, 0.25)

**Secondary Button**
- Background: White
- Border: 2px solid #E53935
- Text: #E53935, Montserrat SemiBold, 16px
- Padding: 10px 30px
- Border-radius: 6px
- Hover: Background #FFF5F5

**Ghost Button**
- Background: transparent
- Text: #E53935
- Hover: underline

### 6.2 Cards

- Background: White
- Border: 1px solid #E0E0E0
- Border-radius: 8px
- Padding: 24px
- Shadow: 0 2px 12px rgba(0, 0, 0, 0.06)
- Hover shadow: 0 4px 20px rgba(0, 0, 0, 0.10)

### 6.3 Forms

- Input height: 48px
- Border: 1px solid #E0E0E0
- Border-radius: 6px
- Focus border: 2px solid #E53935
- Placeholder: #999999
- Label: Open Sans SemiBold, 14px, #2D2D2D

### 6.4 Navigation

- Background: White
- Height: 72px
- Shadow: 0 1px 4px rgba(0, 0, 0, 0.08)
- Logo left-aligned
- Links: Open Sans SemiBold, 15px, #2D2D2D
- Active link: #E53935
- Mobile: hamburger menu, slide-in from right

---

## 7. Iconography

- Style: Line icons, 2px stroke, rounded caps
- Color: Aspecto Red (#E53935) or Dark Charcoal (#2D2D2D)
- Sizes: 20px (inline), 24px (standard), 32px (featured), 48px (hero)
- Source recommendation: Lucide Icons or Phosphor Icons (rounded style)
- Custom icons should match the house icon's line weight and style

---

## 8. Photography & Imagery

### 8.1 Style Direction
- Clean, well-lit interior and exterior renovation shots
- Before/after pairs when showing project results
- Warm, natural lighting preferred
- People wearing professional attire or clean work uniforms
- No stock photo cliches (handshake, pointing at screen)

### 8.2 Image Treatment
- Border-radius: 8px on all images
- Optional red accent overlay at 10% opacity for hero images
- Aspect ratios: 16:9 (hero), 4:3 (cards), 1:1 (profiles/thumbnails)

---

## 9. Social Media Specifications

### 9.1 Profile Picture
- Use icon-only mark (house) on white background
- Size: 400x400px minimum
- Padding: 15% on all sides

### 9.2 Cover / Banner Sizes

| Platform | Size |
|----------|------|
| Instagram | 1080x1080 (feed), 1080x1920 (stories) |
| Facebook Cover | 820x312 |
| WhatsApp Business | 640x640 (profile) |
| LinkedIn Company | 1128x191 (banner) |

### 9.3 Post Templates
- Background: White or Light Gray (#F5F5F5)
- Red accent bar: 8px on top or left edge
- Logo watermark: bottom-right, 15% opacity
- Text: Montserrat for headlines, Open Sans for body

---

## 10. Print Specifications

### 10.1 Business Card
- Size: 90mm x 50mm (Brazilian standard)
- Front: White background, full logo centered, tagline below
- Back: Red (#E53935) background, white contact info
- Paper: 300gsm coated matte

### 10.2 Brand Colors (Print)
- Aspecto Red: Pantone 1795 C / CMYK 0, 87, 83, 0
- Dark Charcoal: Pantone Cool Gray 11 C / CMYK 0, 0, 0, 85
- Always request print proofs before full run

---

## 11. Digital Presence Guidelines

### 11.1 Website
- Light theme (white background, clean and professional)
- Red as accent only -- not overwhelming
- Mobile-first responsive design
- WhatsApp floating button: green (#25D366) with white icon, bottom-right

### 11.2 Email Signature
- Logo (120px wide) left-aligned
- Name: Montserrat Bold, #2D2D2D
- Role/Contact: Open Sans Regular, #666666
- Red divider line (2px) between logo and text

### 11.3 Proposals / Documents
- Logo top-left on cover page
- Red accent on header bar
- Montserrat headings, Open Sans body
- Page numbers: bottom-center, Open Sans, #999

---

## CHANGELOG
- [2026-04-21] — Initial design system created from logo analysis
