# Morningside AI Design System Reference

Last updated: 2026-03-17

Extracted from morningside.ai homepage and /services page. This is a **reference document** for studying how a premium AI consultancy presents itself visually -- not a template to copy. Morningside AI is the closest competitor-type reference (AI consulting/agency with a high-ticket model).

**Key takeaway:** Morningside proves that a dark-mode, single-accent-color system can feel premium and authoritative for AI consulting. Their restraint is instructive -- minimal color palette, heavy reliance on typography hierarchy, and a grain texture that adds analog warmth to a digital surface.

---

## 1. Color System

### Core Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Primary Accent (Green) | `#0CC481` | CTAs, highlights, active states, selection bg, hover borders |
| Dark Green | `#0F1C16` | Gradient endpoint, accent-adjacent dark tone |
| Background (primary) | `#050808` | Deepest page background |
| Background (secondary) | `#111413` | Section backgrounds, card backgrounds |
| Text (primary) | `#FFFFFF` | Headings, nav links, primary text |
| Text (secondary) | `#EDECE4` | Body copy, descriptions (off-white with warm tint) |
| Border (subtle) | `rgba(237, 236, 228, 0.06)` | Card borders, dividers, FAQ borders |

### Gradients

| Name | Value | Usage |
|------|-------|-------|
| Accent sweep | `linear-gradient(90deg, #0CC481 0%, #0F1C16 100%)` | Gradient borders on cards, CTA emphasis |
| Card background | `linear-gradient(135deg, #111413 0%, #050808 100%)` | Hover-state card fills, popup containers |
| Card background (alt) | `linear-gradient(-135deg, #111413 0%, #050808 100%)` | Reversed direction variant for variety |
| Accent reverse | `linear-gradient(135deg, #0F1C16 0%, #0CC481 100%)` | Alternate gradient direction for borders |

### Opacity / Transparency Values

| Purpose | Value |
|---------|-------|
| Green glow effect | `rgba(12, 196, 129, 0.15)` |
| Nav background (scrolled) | `rgba(8, 8, 8, 0.35)` |
| Subtle border | `rgba(237, 236, 228, 0.06)` |

### Selection Colors

```css
::selection { background: #0CC481; color: white; }
::-moz-selection { background: #0CC481; color: white; }
```

### Reis IA Adaptation Notes

Morningside uses green (#0CC481) as their sole accent. Reis IA uses muted gold/warm amber (#C9A84C range). The single-accent approach validates our strategy -- one strong accent color used sparingly creates more premium impact than multiple accent colors. Their green is higher saturation than our gold; we should ensure our amber carries enough contrast on dark backgrounds.

---

## 2. Typography System

### Font Family

Not explicitly declared in extracted source (Webflow-hosted, likely loaded via Webflow's font system). Visual inspection suggests a geometric sans-serif in the Inter/DM Sans family. Clean, modern, highly legible at all sizes.

```css
/* Font rendering (confirmed in source) */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-rendering: optimizeLegibility;
```

### Type Hierarchy (Estimated from Visual Inspection)

| Level | Size (est.) | Weight | Usage |
|-------|-------------|--------|-------|
| Display / Hero H1 | 52-60px | 700 (Bold) | "We don't just talk AI. We deliver it." |
| Section H2 | 36-42px | 600-700 | "From Trying AI to Trusting It" (services) |
| Card H3 / Process Title | 24-28px | 600 | "Identify", "Develop", "Adopt" |
| Body Large | 18-20px | 400 | Section descriptions, testimonial quotes |
| Body | 16px | 400 | Paragraphs, form labels |
| Small / Caption | 14px | 400-500 | Case study labels, footer text, metadata |
| Micro | 12px | 400 | Legal text, fine print |

### Key Typography Observations

- Hero headings use sentence case, not title case -- feels conversational, not corporate
- Process section uses numbered labels (1, 2, 3) as a visual hierarchy device
- Testimonials are set in body-large size, not styled with quotation marks -- modern, clean
- Overall type density is low -- generous whitespace around text blocks

### Reis IA Adaptation Notes

Their type hierarchy aligns closely with our specified scale (48-72px H1, 36-48px H2). The sentence-case convention is worth considering -- it matches our "sharp, confident" voice better than ALL CAPS. Their numbered process steps (1, 2, 3) could inform our methodology section treatment.

---

## 3. Spacing System

### Container Widths

| Class | Estimated Width | Usage |
|-------|----------------|-------|
| `.container-large` | ~1280-1400px | Full-width sections, hero |
| `.container-medium` | ~1080-1200px | Standard content sections |
| `.container-small` | ~800-900px | Narrow content, forms, FAQs |

All containers centered with `margin: 0 auto`.

### Section Padding (Estimated)

| Context | Value (est.) |
|---------|-------------|
| Desktop section vertical | 80-120px top/bottom |
| Mobile section vertical | 48-64px top/bottom |
| Card internal padding | 24-32px |
| Form field padding | 12-16px |

### Utility Classes Detected

```
.margin-0, .padding-0          — Reset utilities
.spacing-clean                  — Full padding/margin reset
.margin-top, .margin-bottom     — Directional spacing
.margin-horizontal              — Left + right
.padding-horizontal             — Left + right padding
```

### Breakpoints

| Name | Width |
|------|-------|
| Mobile (portrait) | 479px and below |
| Mobile (landscape) | 767px and below |
| Tablet | 991px and below |
| Desktop | 992px and above |

### Reis IA Adaptation Notes

Their breakpoints are standard Webflow defaults. Our system uses 375px (mobile), 768px (tablet), 1280px (desktop). The section padding range (80-120px desktop) matches our spec exactly. Their three container widths (large/medium/small) is a useful pattern we should adopt for content density variation.

---

## 4. Animation & Transitions

### Hover Transitions

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Navigation background | background-color, backdrop-filter | 0.3s | ease |
| Logo SVG paths | opacity | 0.3s | ease |
| Case study arrows | transform, opacity | ~0.3s | ease |
| Process card arrows | opacity, transform | ~0.3s | ease |
| FAQ icon rotation | transform | ~0.3s | ease |
| Service tab content | opacity | 0.25s | ease-in-out |

### Hover Effects

```css
/* Case study card arrow */
.cs-wrapper:hover .cs-arrow {
  transform: translateX(5px);
  opacity: 1;
}

/* Process card arrow */
.process_card:hover .process-card_arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* FAQ icon rotation on open */
.faq_icon {
  transform: rotate(-90deg); /* open state */
}
```

### Scroll-Triggered Behaviors

1. **Navigation**: Transparent on page load. On scroll, adds `scrolled` class:
   - Background: `rgba(8, 8, 8, 0.35)`
   - Backdrop filter: `blur(10px)`
   - Logo text paths fade to `opacity: 0`
2. **Logo carousel**: Continuous horizontal scroll (CSS animation, content repeated 3x in DOM for seamless loop)
3. **Lottie animations**: Play/pause tied to section visibility on services page

### Key Animation Principles

- Everything is subtle -- no dramatic entrances, no bounce effects
- 0.3s is the universal transition duration
- `ease` is the primary easing function (not custom cubic-bezier curves)
- Hover effects use `translateX(5px)` for directional indicators -- a small, refined movement
- No scroll-linked parallax or complex scroll animations detected

### Reis IA Adaptation Notes

Their animation approach is more conservative than Stripe's. For Reis IA, we should blend: Morningside's restraint (no dramatic animations) with slightly more sophisticated easing (cubic-bezier curves from the Stripe reference). The 0.3s standard duration is solid. The arrow `translateX(5px)` on hover is a pattern worth adopting for card interactions.

---

## 5. Effects

### Box Shadows

| Name | Value | Usage |
|------|-------|-------|
| Green glow | `0 0 50px 0 rgba(12, 196, 129, 0.15)` | Card hover states, CTA emphasis |

### Backdrop Filter

```css
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
```

Used on scrolled navigation for glassmorphic effect.

### Gradient Borders (Complex Technique)

```css
/* Gradient border using background-clip trick */
background-image: linear-gradient(white, white),
                  linear-gradient(90deg, #0CC481 0%, #0F1C16 100%);
background-origin: border-box;
background-clip: padding-box, border-box;
border: 1px solid transparent;
```

This creates a gradient border effect without using border-image (which doesn't support border-radius). The inner gradient matches the element background, the outer gradient creates the visible border.

### Grain/Noise Texture

A `grainy.png` file is applied as a background-image overlay on multiple sections. This adds analog warmth and texture to the flat dark backgrounds. Applied at presumably low opacity (the texture is subtle, not dominant).

### Border Treatments

| Context | Value |
|---------|-------|
| Card borders | `1px solid transparent` (with gradient background-clip) |
| Subtle dividers | `1px solid rgba(237, 236, 228, 0.06)` |
| Active FAQ border | `1px solid rgba(237, 236, 228, 0.06)` |

### Border Radius (Estimated)

| Element | Radius (est.) |
|---------|---------------|
| Cards | 12-16px |
| Buttons / CTAs | 24-32px (pill shape) |
| Form inputs | 8-12px |
| FAQ accordion | 12px |

### Accessibility Focus State

```css
*:focus-visible {
  outline: 0.125rem solid #4d65ff;
  outline-offset: 0.125rem;
}
```

### Reis IA Adaptation Notes

Three key patterns to adapt:
1. **Grain texture**: We should create a subtle noise overlay for our dark backgrounds. This adds dimension without visual noise.
2. **Gradient borders via background-clip**: This technique gives us gradient borders with border-radius support -- essential for our card designs with gold accent borders.
3. **Glow shadow on hover**: Their `0 0 50px rgba(accent, 0.15)` is a elegant hover effect. We adapt with `0 0 50px rgba(201, 168, 76, 0.15)` for gold glow.

---

## 6. Buttons & CTAs

### Primary CTA

- **Text**: "Get in Touch" / "get in touch" (lowercase in nav)
- **Shape**: Pill (high border-radius, ~24-32px)
- **Implementation**: Anchor link triggering modal popup
- **Placement**: Navigation (persistent), hero section, footer CTA section

### Button States

| State | Treatment |
|-------|-----------|
| Default | Likely solid accent background or gradient border |
| Hover | Gradient border intensifies, possible glow shadow |
| Loading | "Submitting..." text replacement |
| Success | Modal content swap |

### Form Submit Button

- Part of the contact modal/popup
- JavaScript-managed state transitions (idle -> loading -> success/error)
- Likely white or accent-colored background

### CTA Strategy Observations

- Minimal CTA count -- "Get in Touch" is essentially the only CTA on the entire site
- No pricing page, no self-serve -- everything funnels to a consultation form
- Form captures qualifying data: company size, revenue, budget range, services of interest
- This is pure high-ticket consultancy positioning -- no free trials, no demos

### Reis IA Adaptation Notes

Their single-CTA approach validates our high-ticket model. However, Reis IA has multiple pillars (Builder, Systems, Partners) that need distinct CTAs. Our approach of pillar-specific CTAs ("Book AI Revenue Audit" for Systems, "Apply Now" for Builder) is more segmented but equally conversion-focused.

---

## 7. Card & Component Patterns

### Case Study Cards

```
Structure:
[Image Wrapper (landscape, ~16:9 aspect ratio)]
[Title + Description]
[Arrow indicator →]

Hover behavior:
- Gradient border appears (green to dark green)
- Green glow shadow: 0 0 50px rgba(12, 196, 129, 0.15)
- Arrow slides right: translateX(5px) + opacity reveal

Layout: 3-column grid on desktop
```

### Process Cards ("Identify, Develop, Adopt")

```
Structure:
[Number label (1, 2, 3)]
[Title]
[Description]
[Arrow indicator →]
[Link to /services]

Hover behavior:
- Background gradient appears: 135deg, #111413 -> #050808
- Arrow animates: opacity + translateX(5px)

Layout: 3-column on desktop, stacked on mobile
Mobile: Gradient border always visible (not just on hover)
```

### FAQ Accordion

```
Structure:
[Question text] [Rotation icon]
[Collapsible answer body]

States:
- Closed: Clean, minimal
- Hover: Gradient background appears
- Open: Gradient background, icon rotates -90deg, icon color -> #0CC481
         Max-height animates dynamically (JS-calculated)

Border: 1px solid rgba(237, 236, 228, 0.06)
```

### Contact Popup/Modal

```
Structure:
[Form with fields: Name, Email, Company, Company Size, Revenue, Budget, Services, Message]
Background: linear-gradient(-135deg, #111413 0%, #050808 100%)
Border: Gradient border matching card treatment
Form integration: HubSpot API submission
```

### Logo Carousel

```
Structure: 6 client logos (Sydney Roosters, BarkBox, Milwaukee Bucks, Citation, DentOps, Asmuss)
Animation: Continuous horizontal scroll (CSS), content tripled in DOM for seamless loop
Filtering: Full color (not grayscale)
```

### Testimonial Section

```
Structure: Block quotes with author attribution (name + company)
Styling: Body-large text size, no quotation marks, clean presentation
Layout: 2 testimonials visible
```

### Reis IA Adaptation Notes

Their 3-column process cards ("Identify, Develop, Adopt") directly parallel our ecosystem pillar cards. Key adaptations:
- Our pillar cards need more visual differentiation (chess/hourglass motifs per card)
- The gradient-border-on-hover pattern is excellent and should be adopted with gold accent
- Their FAQ accordion is clean -- worth matching for our objection-handling sections
- The logo carousel technique (3x DOM repeat for seamless loop) is standard and reliable

---

## 8. Layout & Page Structure

### Navigation

```
Structure: [Logo] [Menu Links] [CTA Button]
Position: Fixed top
Height: ~64-80px (estimated)
Background (default): Transparent
Background (scrolled): rgba(8, 8, 8, 0.35) + backdrop-filter: blur(10px)
Logo behavior: SVG with text paths that fade to opacity:0 on scroll (leaving icon only)
Menu items: Services, Team
CTA: "get in touch" (pill button, right-aligned)
```

### Homepage Section Sequence

1. **Hero**: Full-width headline + subtitle + CTA
2. **Logo Carousel**: Client logos in continuous scroll
3. **Problem Statement**: Large typography section (editorial feel)
4. **Process**: 3-column cards (Identify, Develop, Adopt)
5. **Testimonials**: Block quotes
6. **Case Studies**: 3-column card grid with hover effects
7. **FAQ**: Full-width accordion
8. **Footer CTA**: "AI is here. Most will react. The few with a plan will lead." + CTA + decorative dashed SVG

### Services Page Structure

1. **Hero**: "From Trying AI to Trusting It"
2. **Tab Navigation**: Horizontal tabs (Identify, Develop, Adopt) with animated indicator
3. **Service Sections**: Full-width content blocks, toggled via tabs
4. **Case Studies**: 2-column linked at bottom of each service section
5. **Footer CTA**: Same as homepage

### Grid System

- Flexbox-based layout (not CSS Grid from what's visible)
- 3-column patterns for cards (desktop)
- Single-column stacking on mobile
- Tab navigation uses flex with animated indicator via `translateX()`

### Footer

- Standard footer with links and legal text
- Preceded by a large CTA section with decorative SVG element

### Reis IA Adaptation Notes

Their page structure is remarkably similar to our planned homepage flow. Key differences:
- They use a problem-statement editorial section (large text) -- we have our "enemy" section serving the same purpose
- Their 3-step process maps to our ecosystem pillars
- Their tab-based services page is interesting but we use separate sales pages per pillar, which allows deeper persuasion per segment
- The decorative SVG in the footer CTA is a nice touch -- our hourglass watermark serves a similar decorative purpose

---

## 9. Signature Elements

### 1. Grain Texture Overlay

The most distinctive visual element. A `grainy.png` texture is overlaid on dark sections, adding analog warmth and subtle visual texture. This prevents the "flat black void" problem common in dark-mode sites.

**Implementation**: Background-image on section containers, likely with low opacity or blend-mode treatment. The grain appears on multiple sections, creating visual consistency.

**Reis IA adaptation**: We should implement a similar noise texture. CSS-generated noise (using SVG filters) or a custom PNG at 3-5% opacity would add the same dimensional quality to our dark backgrounds.

### 2. Gradient Border System

Their signature card treatment uses CSS `background-clip` to create gradient borders that work with border-radius. The gradient runs from accent green to dark green, creating a premium "edge glow" effect.

**Technical approach**: `background-image` with two layers (solid inner + gradient outer), `background-clip: padding-box, border-box`, with `border: 1px solid transparent`.

**Reis IA adaptation**: Replace green gradient with gold-to-dark: `linear-gradient(90deg, #C9A84C 0%, #1A1A0A 100%)`. This gives us the same premium border effect in our brand color.

### 3. Single-Accent Discipline

The entire site uses ONE accent color (#0CC481). No secondary accents, no complementary colors. This extreme restraint creates strong brand recognition and visual clarity. Every green element immediately registers as "important."

**Reis IA adaptation**: We already follow this principle with muted gold. The Morningside reference confirms that one accent is sufficient -- even for a multi-page, multi-service site. Resist the temptation to introduce secondary accent colors.

---

## 10. Overall Assessment

### What Morningside Does Well

1. **Extreme restraint** -- minimal colors, minimal animation, minimal decoration
2. **Dark mode executed properly** -- layered backgrounds (not flat black), subtle borders, grain texture for warmth
3. **Clear conversion funnel** -- everything leads to "Get in Touch" form with qualifying questions
4. **Process clarity** -- 3-step methodology (Identify, Develop, Adopt) is immediately understandable
5. **Glassmorphic nav on scroll** -- modern, functional, subtle

### What Morningside Could Improve

1. **Typography differentiation** -- heading sizes don't vary enough between levels
2. **Visual storytelling** -- no custom illustrations, no data visualization, no before/after visuals
3. **Social proof depth** -- only 2 testimonials, limited case study detail
4. **Animation sophistication** -- basic ease transitions everywhere, no custom easing curves
5. **Brand iconography** -- no proprietary visual language beyond the logo (unlike our hourglass/chess system)

### What Reis IA Should Take From This

1. **Grain texture on dark backgrounds** -- immediate quality upgrade
2. **Gradient border technique** -- CSS background-clip approach for card borders
3. **Glow shadow on hover** -- `box-shadow: 0 0 50px rgba(accent, 0.15)`
4. **Glassmorphic nav** -- transparent -> blurred semi-transparent on scroll
5. **Single-CTA discipline** -- per-page, not per-section (adapted for our multi-pillar model)
6. **Pill-shaped CTAs** -- high border-radius buttons feel premium in dark mode

### What Reis IA Should NOT Take From This

1. **Generic font choices** -- we have Inter specified, which is stronger than their unidentified system font
2. **Lack of brand iconography** -- our hourglass/chess system is a competitive advantage they lack
3. **Conservative animations** -- we should use more sophisticated easing (from Stripe reference)
4. **Limited visual storytelling** -- we have data narratives (revenue multiples, time savings) that deserve visualization
5. **Flat section transitions** -- we can create more visual interest between sections with our alternating backgrounds and motif watermarks

---

[ADDED -- 2026-03-17]

## Source Code Extraction Findings

Extracted from morningside.ai (homepage + /services). Framework: Webflow. Source file: `source-code-extractions/morningside-source.md`.

### A. Gradient Border Glow Effect (Complete CSS with background-clip)

**Case Study Card -- Gradient Border on Hover:**
```css
/* Default state -- no visible border */
.cs-img-wrap {
  border: 1px solid transparent;
  background-image: none;
  box-shadow: none;
  transition: all 0.3s ease;
}

/* Hover state -- gradient border + glow */
.cs-wrapper:hover .cs-img-wrap {
  border: 1px solid transparent;
  background-image:
    linear-gradient(white, white),
    linear-gradient(90deg, #0CC481 0%, #0F1C16 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(12, 196, 129, 0.15);
}
```

**How the background-clip technique works:**
1. Set `border: 1px solid transparent` -- creates the border space
2. Apply two background layers:
   - Layer 1: `linear-gradient(white, white)` -- solid fill for padding area
   - Layer 2: `linear-gradient(90deg, #0CC481, #0F1C16)` -- the gradient "border"
3. `background-origin: border-box` -- both layers start from border edge
4. `background-clip: padding-box, border-box`:
   - Layer 1 clips to padding area (fills inside)
   - Layer 2 clips to border area (visible only in the 1px border gap)
5. `box-shadow: 0 0 50px` -- adds ambient glow around the card

**Process Card -- Diagonal Gradient (135deg angle):**
```css
.process_card {
  border: 1px solid transparent;
  background-image: none;
  transition: all 0.3s ease;
}

.process_card:hover {
  background-image:
    linear-gradient(135deg, #111413 0%, #050808 100%),
    linear-gradient(135deg, #0F1C16 0%, #0CC481 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(12, 196, 129, 0.15);
}
```

**Mobile Variant -- Permanent Border (no hover on touch):**
```css
@media (max-width: 479px) {
  .process_card,
  .cs-img-wrap {
    background-image:
      linear-gradient(90deg, #050808 0%, #111413 100%),
      linear-gradient(90deg, #0CC481 0%, #0F1C16 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
}
```

### B. Frosted Glass Navigation (Complete CSS + JS)

**CSS:**
```css
/* Base state -- transparent */
.nav_component {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: transparent;
  backdrop-filter: none;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

/* Scrolled state -- frosted glass */
.nav_component.scrolled {
  background-color: rgba(8, 8, 8, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Logo SVG -- hide text on scroll, show icon only */
.nav_component svg path:not(:last-child) {
  transition: opacity 0.3s ease;
  opacity: 1;
}

.nav_component.scrolled svg path:not(:last-child) {
  opacity: 0;
}
```

**JavaScript:**
```javascript
window.addEventListener('load', function() {
  var nav = document.querySelector('.nav_component');
  var navLogo = document.querySelector('.nav_logo');
  var navMenuLinks = document.querySelectorAll('.nav_menu_link');

  if (!nav) return;

  if (navLogo) navLogo.style.color = 'white';
  navMenuLinks.forEach(function(link) {
    link.style.color = 'white';
  });

  function handleScroll() {
    if (window.scrollY > 0) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();
});
```

### C. FAQ Accordion (Full HTML + CSS + JS)

**HTML Structure:**
```html
<div class="faq-section">
  <div class="faq_accordion">
    <div class="faq_header">
      <h3 class="faq_question">Question text here</h3>
      <svg class="faq_icon" viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2"
              fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="faq_body" style="max-height: 0px;">
      <p>Answer text here</p>
    </div>
  </div>
</div>
```

**CSS:**
```css
.faq_accordion {
  border: 1px solid transparent;
  cursor: pointer;
  padding: 20px 24px;
  border-radius: 12px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.faq_accordion:hover {
  background: linear-gradient(135deg, #111413 0%, #050808 100%);
  background-clip: padding-box;
  border: 1px solid rgba(237, 236, 228, 0.06);
}

.faq_accordion.is-open {
  border: 1px solid rgba(237, 236, 228, 0.06);
}

.faq_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.faq_question {
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin: 0;
}

.faq_icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: white;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.faq_accordion.is-open .faq_icon {
  transform: rotate(-90deg);
}

.faq_body {
  overflow: hidden;
  max-height: 0px;
  transition: max-height 0.3s ease;
}

.faq_body p {
  padding-top: 16px;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
}
```

**JavaScript (exclusive open -- one at a time):**
```javascript
function toggleAccordion(card) {
  var content = card.querySelector('.faq_body');
  var icon = card.querySelector('.faq_icon');

  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
    card.classList.remove('is-open');
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    icon.style.transform = 'rotate(-90deg)';
    card.classList.add('is-open');
  }
}

function closeAllAccordions() {
  var allCards = document.querySelectorAll('.faq_accordion');
  allCards.forEach(function(card) {
    var content = card.querySelector('.faq_body');
    var icon = card.querySelector('.faq_icon');
    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
    card.classList.remove('is-open');
  });
}

window.addEventListener('load', function() {
  var allContents = document.querySelectorAll('.faq_body');
  allContents.forEach(function(content) {
    content.style.maxHeight = '0px';
  });

  document.querySelectorAll('.faq_accordion').forEach(function(card) {
    card.addEventListener('click', function() {
      var content = card.querySelector('.faq_body');
      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        toggleAccordion(card);
      } else {
        closeAllAccordions();
        toggleAccordion(card);
      }
    });
  });
});
```

### D. Card Hover Effects (Arrow Slide + Gradient Border)

**Arrow slide on hover:**
```css
.cs-arrow {
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.cs-wrapper:hover .cs-arrow {
  opacity: 1;
  transform: translateX(5px);
}

/* Same pattern for process cards */
.process-card_arrow {
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.process_card:hover .process-card_arrow {
  opacity: 1;
  transform: translateX(5px);
}
```

**Complete interactive card (combined effects):**
```css
.interactive-card {
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 24px;
  background: transparent;
  cursor: pointer;
  transition:
    background-image 0.3s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.interactive-card:hover {
  background-image:
    linear-gradient(135deg, #111413 0%, #050808 100%),
    linear-gradient(135deg, #0F1C16 0%, #0CC481 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(12, 196, 129, 0.15);
}

.interactive-card .arrow-icon {
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.interactive-card:hover .arrow-icon {
  opacity: 1;
  transform: translateX(5px);
}
```

### E. Service Tab Navigation (Full Implementation)

**HTML:**
```html
<div class="services-nav-container">
  <div class="services-nav">
    <button id="nav-identify" class="service-nav-item active">Identify</button>
    <button id="nav-develop" class="service-nav-item">Develop</button>
    <button id="nav-adopt" class="service-nav-item">Adopt</button>
    <div class="service-nav-indicator"></div>
  </div>
  <div class="services-arrows">
    <button class="services-left">&larr;</button>
    <button class="services-right">&rarr;</button>
  </div>
</div>

<section id="identify" class="service-content">...</section>
<section id="develop" class="service-content" style="display: none;">...</section>
<section id="adopt" class="service-content" style="display: none;">...</section>
```

**Tab indicator CSS:**
```css
.service-nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 40px;
  background-color: #0CC481;
  transition: transform 0.3s ease;
  border-radius: 1px;
}

.service-nav-item {
  padding: 12px 24px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
}

.service-nav-item.active { color: white; }
.service-nav-item:hover { color: rgba(255, 255, 255, 0.8); }
```

**JavaScript (fade transition with indicator tracking):**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const navItems = [
    document.getElementById('nav-identify'),
    document.getElementById('nav-develop'),
    document.getElementById('nav-adopt')
  ];
  const contentSections = [
    document.getElementById('identify'),
    document.getElementById('develop'),
    document.getElementById('adopt')
  ];
  const indicator = document.querySelector('.service-nav-indicator');
  let currentIndex = 0;
  let isAnimating = false;

  function showSection(index, direction) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;
    const oldIndex = currentIndex;
    currentIndex = index;

    navItems.forEach(function(item, i) {
      item.classList.toggle('active', i === index);
    });

    const oldSection = contentSections[oldIndex];
    const newSection = contentSections[index];

    // Phase 1: fade out (250ms)
    oldSection.style.transition = 'opacity 0.25s ease-in-out';
    oldSection.style.opacity = '0';

    // Phase 2: swap and fade in (250ms)
    setTimeout(function() {
      oldSection.style.display = 'none';
      newSection.style.opacity = '0';
      newSection.style.display = 'block';
      newSection.offsetHeight; // force reflow
      newSection.style.transition = 'opacity 0.25s ease-in-out';
      newSection.style.opacity = '1';
      setTimeout(function() { isAnimating = false; }, 250);
    }, 250);

    moveIndicator(navItems[index]);
  }

  function moveIndicator(navItem) {
    var navItemRect = navItem.getBoundingClientRect();
    var containerRect = navItem.parentElement.getBoundingClientRect();
    var leftPosition = navItemRect.left - containerRect.left;
    var width = navItemRect.width;
    var centerOffset = leftPosition + (width / 2) - (indicator.offsetWidth / 2);
    indicator.style.transform = 'translateX(' + centerOffset + 'px)';
  }

  navItems.forEach(function(navItem, index) {
    navItem.addEventListener('click', function() {
      showSection(index, index > currentIndex ? 'next' : 'prev');
    });
  });

  navItems[0].classList.add('active');
  moveIndicator(navItems[0]);
});
```

### F. Popup Container Gradient Border (Permanent)

```css
.popup-container {
  border: 1px solid transparent;
  border-radius: 16px;
  background-image:
    linear-gradient(-135deg, #111413 0%, #050808 100%),
    linear-gradient(135deg, #0CC481 0%, #0F1C16 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  padding: 32px;
}
```

### G. Additional Patterns Found

**Selection styling:**
```css
::selection { background-color: #0CC481; color: white; }
::-moz-selection { background-color: #0CC481; color: white; }
```

**Focus accessibility:**
```css
*[tabindex]:focus-visible,
input[type="file"]:focus-visible {
  outline: 0.125rem solid #4d65ff;
  outline-offset: 0.125rem;
}
```

**Text truncation utilities:**
```css
.text-style-3lines {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.text-style-2lines {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

**Custom select dropdown:**
```css
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  padding-right: 35px !important;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23ffffff' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat !important;
  background-position: right 12px center !important;
}
```

**Hidden scrollbar:**
```css
.scroll-container {
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar { display: none; }
```

**Font rendering:**
```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### H. All Animation Values Summary

| Element | Duration | Easing | Property |
|---------|----------|--------|----------|
| Nav background | 0.3s | ease | background-color, backdrop-filter |
| Logo SVG paths | 0.3s | ease | opacity |
| Card gradient border | 0.3s | ease | background-image, box-shadow |
| Arrow slide | 0.3s | ease | opacity, transform |
| FAQ chevron | 0.3s | ease | transform |
| FAQ body | 0.3s | ease | max-height |
| FAQ background | 0.3s | ease | background, border-color |
| Service tab content | 0.25s | ease-in-out | opacity |
| Tab indicator | 0.3s | ease | transform |

**Universal pattern:** 0.3s ease for all interactions. Simple, consistent, professional.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-16 | Initial reference document created |
| 2026-03-17 | Appended source code extraction: gradient border glow (complete CSS with background-clip technique for 3 variants + mobile), frosted glass navigation (CSS + JS), FAQ accordion (full HTML + CSS + JS with exclusive-open behavior), card hover effects (arrow slide + combined gradient border), service tab navigation (full HTML + CSS + JS with indicator tracking), popup container gradient border, selection styling, focus states, text truncation, custom select, hidden scrollbar, font rendering, complete animation values table |
