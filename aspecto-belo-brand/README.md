# Aspecto Belo — Brand Design System Package

> Created: 2026-04-21
> Version: 1.0

---

## Delivery Contents

### /logo/ — SVG Logo Files
| File | Description |
|------|-------------|
| `aspecto-belo-logo.svg` | Primary lockup (icon + wordmark + tagline), transparent background |
| `aspecto-belo-logo-white-bg.svg` | Primary lockup on white background |
| `aspecto-belo-icon-only.svg` | House icon mark only (for profile pics, favicons, watermarks) |
| `aspecto-belo-wordmark.svg` | Text-only wordmark (for horizontal-constrained spaces) |
| `aspecto-belo-favicon.svg` | Favicon-optimized icon (64x64, rounded corners) |

### /design-system/ — Brand Guidelines
| File | Description |
|------|-------------|
| `aspecto-belo-design-system.md` | Complete design system: colors, typography, spacing, components, print specs, social media specs |

### /preview.html — Visual Preview
Open in any browser to see all brand elements rendered together:
- Logo variations (light and dark backgrounds)
- Color palette swatches
- Typography scale
- Button styles (primary, secondary, ghost)
- Service cards
- Form elements
- Business card mockup (front + back)
- Social media templates (feed post + story)

---

## Brand Summary

| Element | Value |
|---------|-------|
| **Primary Red** | #E53935 |
| **Dark Charcoal** | #2D2D2D |
| **Heading Font** | Montserrat (Bold 700, SemiBold 600) |
| **Body Font** | Open Sans (Regular 400, SemiBold 600) |
| **Logo Font** | Arial Black (900) |
| **Print Red** | Pantone 1795 C / CMYK 0, 87, 83, 0 |

---

## How to Use

1. **Open `preview.html`** in a browser to see everything visually
2. **Read `design-system/aspecto-belo-design-system.md`** for detailed specifications
3. **Use SVGs from `/logo/`** — they scale to any size without quality loss
4. **Share with designers/developers** as the single source of truth for brand consistency

---

## Quick Start for Developers

```css
/* Brand Colors */
--aspecto-red: #E53935;
--aspecto-red-light: #EF5350;
--aspecto-red-dark: #C62828;
--aspecto-dark: #2D2D2D;
--aspecto-gray: #666666;
--aspecto-gray-light: #F5F5F5;
--aspecto-border: #E0E0E0;

/* Fonts */
font-family: 'Open Sans', Arial, sans-serif;        /* body */
font-family: 'Montserrat', Arial, sans-serif;       /* headings */
```

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@300;400;600&display=swap" rel="stylesheet">
```
