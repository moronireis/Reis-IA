# AIOX — LP Sections Page
URL: https://brand.aioxsquad.ai/brandbook/lp-sections

## Page Purpose
Complete landing page section catalog with 16 Kyma sections + atoms + molecules. Visual and technical reference for building landing pages.

## Content Structure
1. **Header** — "LP AIOX — Section Catalog V1.0 // DARK COCKPIT EDITION"
2. **16 Kyma sections + 3 Atoms + 3 Molecules**
3. **8 Main Categories**

## Atoms & Molecules

### Atoms
- **SectionShell** — Base wrapper for all sections
- **SectionHeader** — Standardized section heading
- **AccentButton** — CTA button component

### Molecules
- **StatCard** — 3 sizes x 3 colors, numeric display
- **QuoteBlock** — Testimonial quote component
- **AvatarStack** — Grouped avatar display

## Section Flow (Dark/Light Alternation)
```
Navbar → dark/95 (fixed)
Hero → dark
WhoWeAre → light
PainPoints → dark → light (dual)
Services → dark
HowItWorks → light
CustomerStory → dark
Testimonials → light
TechStack → dark
Pricing → dark
Team → light
FAQ → cream (standalone)
Articles → dark
Contact → light
Footer → dark
```

## CSS Animation Patterns

### Framer Motion Reveals
```javascript
// Fade-up reveal
initial={{ opacity: 0, y: 20-40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6-0.7 }}

// Staggered children
transition={{ delay: i * 0.04-0.1 }}

// Scale reveal
initial={{ opacity: 0, scale: 0.97 }}
animate={{ opacity: 1, scale: 1 }}
```

### CSS Keyframe Animations
```css
@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
animation: ticker 30s linear infinite;

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
animation: marquee 20s linear infinite;
```

## Design Techniques

### Hairline Grid
`gap-px` with colored background reveals 1px dividers between grid items

### Staircase Pattern
Items offset by `i * 50px` (vertical) or `i * 6%` (horizontal)

### Mono Label System
10-11px Roboto Mono, uppercase, tracking 0.15em-0.2em

### Progress Bar with Tick Marks
48-column tick mark system with hover-based progress tracking

### Typography Scale
```css
clamp(2.2rem, 7vw, 6.5rem) /* Section headings */
font-weight: 900 (font-black)
text-transform: uppercase
letter-spacing: 0.1em-0.2em
```

### Spacing
```css
py-24 md:py-32  /* Section padding */
px-6 md:px-10   /* Navbar padding */
gap-0 to gap-16  /* Grid gaps */
```

## Section Variants
Each section supports `variant="dark"` or `variant="light"` for theme alternation

## Navigation Context
- Position: Design System > Components > LP Sections (10.0)

## Key Design Decisions
- 16 complete landing page sections
- Atomic design: atoms → molecules → organisms (sections)
- Dark/light alternation creates visual rhythm
- Framer Motion for scroll-triggered animations
- Staircase layout for process/timeline sections
- Ticker/marquee for logo/tech showcases
- StatCard reused across multiple sections (3 sizes x 3 colors)
