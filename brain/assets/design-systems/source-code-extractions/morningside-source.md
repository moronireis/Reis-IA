# Morningside AI Source Code Extraction — Interactive Patterns & Visual Effects

Last updated: 2026-03-17
Source: https://morningside.ai (homepage), https://morningside.ai/services
Pages analyzed: 2 (homepage, services)
Extraction method: WebFetch of live pages
Framework: Webflow (w-form classes, Webflow CDN references)
Note: Morningside AI is the closest reference to Reis IA's market positioning (AI consultancy with premium dark mode aesthetic). The interactive patterns here are directly applicable.

---

## TABLE OF CONTENTS

1. [CSS Custom Properties](#1-css-custom-properties)
2. [Color System](#2-color-system)
3. [Gradient Border Glow Effect (Signature)](#3-gradient-border-glow-effect)
4. [Frosted Glass Navigation](#4-frosted-glass-navigation)
5. [FAQ Accordion Component](#5-faq-accordion-component)
6. [Card Hover Effects](#6-card-hover-effects)
7. [Service Tab Navigation](#7-service-tab-navigation)
8. [Typography & Text Rendering](#8-typography-text-rendering)
9. [Form & Popup Styling](#9-form-popup-styling)
10. [Utility Classes](#10-utility-classes)
11. [Responsive Breakpoints](#11-responsive-breakpoints)
12. [Scroll Behavior Patterns](#12-scroll-behavior-patterns)
13. [Selection Styling](#13-selection-styling)
14. [Focus & Accessibility](#14-focus-accessibility)
15. [HTML Section Structures](#15-html-section-structures)
16. [HubSpot Form Integration](#16-hubspot-form-integration)
17. [Reis IA Cross-Reference](#17-reis-ia-cross-reference)

---

## 1. CSS CUSTOM PROPERTIES

```css
:root {
  --highlight-color: #0CC481;
  --highlight-text-color: white;
}
```

Morningside uses very few CSS custom properties. Most values are defined inline within component classes. This is typical of Webflow-generated sites.

---

## 2. COLOR SYSTEM

### Complete Palette (Extracted from All Occurrences)

```css
/* Primary Accent */
--morningside-accent: #0CC481;              /* Bright green — CTAs, highlights, borders */
--morningside-accent-glow: rgba(12, 196, 129, 0.15); /* Green glow effect */

/* Backgrounds */
--morningside-bg-primary: #050808;          /* Deepest dark — card backgrounds, gradients */
--morningside-bg-secondary: #111413;        /* Slightly lighter — card surfaces, hover states */
--morningside-bg-gradient-dark: #0F1C16;    /* Dark green tint — gradient endpoints */

/* Navigation */
--morningside-nav-bg: rgba(8, 8, 8, 0.35); /* Scrolled nav background */

/* Text */
--morningside-text-primary: white;
--morningside-text-subtle: rgba(237, 236, 228, 0.06); /* Very subtle text/borders */

/* Focus */
--morningside-focus: #4d65ff;               /* Blue focus ring */

/* Selection */
--morningside-selection-bg: #0CC481;
--morningside-selection-text: white;
```

---

## 3. GRADIENT BORDER GLOW EFFECT

This is Morningside's signature visual technique. Uses CSS `background-clip` to create a gradient border with a glow emanating from the card.

### Case Study Card — Gradient Border on Hover

```css
/* Default state — no visible border */
.cs-img-wrap {
  border: 1px solid transparent;
  background-image: none;
  box-shadow: none;
  transition: all 0.3s ease;  /* Implied from behavior */
}

/* Hover state — gradient border + glow */
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

### How This Technique Works

```
1. Set `border: 1px solid transparent` — creates the border space
2. Apply two background layers:
   - Layer 1: `linear-gradient(white, white)` — solid fill for padding area
   - Layer 2: `linear-gradient(90deg, #0CC481, #0F1C16)` — the gradient "border"
3. `background-origin: border-box` — both layers start from border edge
4. `background-clip: padding-box, border-box`:
   - Layer 1 clips to padding area (fills inside)
   - Layer 2 clips to border area (visible only in the 1px border gap)
5. `box-shadow: 0 0 50px` — adds ambient glow around the card

Result: A gradient-colored border that glows on hover.
```

### Process Card — Gradient Border on Hover (135deg angle)

```css
/* Default state */
.process_card {
  border: 1px solid transparent;
  background-image: none;
  transition: all 0.3s ease;
}

/* Hover state — diagonal gradient border + glow */
.process_card:hover {
  background-image:
    linear-gradient(135deg, #111413 0%, #050808 100%),
    linear-gradient(135deg, #0F1C16 0%, #0CC481 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(12, 196, 129, 0.15);
}
```

### Popup Container — Permanent Gradient Border

```css
.popup-container {
  border: 1px solid transparent;
  background-image:
    linear-gradient(-135deg, #111413 0%, #050808 100%),
    linear-gradient(135deg, #0CC481 0%, #0F1C16 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
}
```

### Mobile Variant — Horizontal Gradient

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

### Reis IA Adaptation — Gold Gradient Border

```css
/* ADAPTATION: Replace green with Reis IA's blue accent */
.reis-card:hover {
  border: 1px solid transparent;
  background-image:
    linear-gradient(135deg, #0a0a0a 0%, #000000 100%),
    linear-gradient(135deg, #1a3366 0%, #4A90FF 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 50px 0 rgba(74, 144, 255, 0.12);
}
```

---

## 4. FROSTED GLASS NAVIGATION

### CSS — Complete Implementation

```css
/* Base state — transparent */
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

/* Scrolled state — frosted glass */
.nav_component.scrolled {
  background-color: rgba(8, 8, 8, 0.35);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

/* Logo SVG — hide text on scroll */
.nav_component svg path:not(:last-child) {
  transition: opacity 0.3s ease;
  opacity: 1;
}

.nav_component.scrolled svg path:not(:last-child) {
  opacity: 0;
}

/* Nav links — white text */
.nav_logo {
  color: white;
}

.nav_menu_link {
  color: white;
}
```

### JavaScript — Scroll Handler

```javascript
window.addEventListener('load', function() {
  var nav = document.querySelector('.nav_component');
  var navLogo = document.querySelector('.nav_logo');
  var navMenuLinks = document.querySelectorAll('.nav_menu_link');

  if (!nav) return;

  // Set initial colors
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
  handleScroll(); // Check initial state
});
```

---

## 5. FAQ ACCORDION COMPONENT

### HTML Structure

```html
<div class="faq-section">
  <div class="faq_accordion">
    <div class="faq_header">
      <h3 class="faq_question">How is Morningside AI different from every other AI company out there?</h3>
      <svg class="faq_icon" viewBox="0 0 24 24">
        <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2"
              fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="faq_body" style="max-height: 0px;">
      <p>We're workflow specialists first, AI specialists second.
         We build the processes, guardrails and feedback loops that
         make AI actually work inside your operations.</p>
    </div>
  </div>

  <div class="faq_accordion">
    <div class="faq_header">
      <h3 class="faq_question">How do I know if we're ready for AI?</h3>
      <svg class="faq_icon"><!-- chevron SVG --></svg>
    </div>
    <div class="faq_body" style="max-height: 0px;">
      <p>You're ready if you have clear pain points in your
         workflows that involve repetitive tasks, data processing,
         or decision-making at scale.</p>
    </div>
  </div>
</div>
```

### CSS — Complete Accordion Styling

```css
/* Accordion container */
.faq_accordion {
  border: 1px solid transparent;
  cursor: pointer;
  padding: 20px 24px;
  border-radius: 12px;
  transition: background 0.3s ease, border-color 0.3s ease;
}

/* Hover state — subtle border + dark gradient background */
.faq_accordion:hover {
  background: linear-gradient(135deg, #111413 0%, #050808 100%);
  background-clip: padding-box;
  border: 1px solid rgba(237, 236, 228, 0.06);
}

/* Open state — same border as hover */
.faq_accordion.is-open {
  border: 1px solid rgba(237, 236, 228, 0.06);
}

/* Header layout */
.faq_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

/* Question text */
.faq_question {
  font-size: 18px;
  font-weight: 500;
  color: white;
  margin: 0;
}

/* Chevron icon — rotates when open */
.faq_icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: white;
  transform: rotate(0deg);  /* Default: pointing right */
  transition: transform 0.3s ease;
}

.faq_accordion.is-open .faq_icon {
  transform: rotate(-90deg);  /* Open: pointing down (rotated -90) */
}

/* Body — hidden by default via max-height */
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

### JavaScript — Complete Accordion Logic

```javascript
function toggleAccordion(card) {
  var content = card.querySelector('.faq_body');
  var icon = card.querySelector('.faq_icon');

  if (content.style.maxHeight && content.style.maxHeight !== '0px') {
    // Close this accordion
    content.style.maxHeight = '0px';
    icon.style.transform = 'rotate(0deg)';
    card.classList.remove('is-open');
  } else {
    // Open this accordion
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

// Initialize on page load
window.addEventListener('load', function() {
  // Set all to closed initially
  var allContents = document.querySelectorAll('.faq_body');
  allContents.forEach(function(content) {
    content.style.maxHeight = '0px';
  });

  // Click handler — exclusive open (one at a time)
  document.querySelectorAll('.faq_accordion').forEach(function(card) {
    card.addEventListener('click', function() {
      var content = card.querySelector('.faq_body');

      if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        // If clicking the open one, just close it
        toggleAccordion(card);
      } else {
        // Close all, then open the clicked one
        closeAllAccordions();
        toggleAccordion(card);
      }
    });
  });
});
```

---

## 6. CARD HOVER EFFECTS

### Case Study Card — Arrow Slide + Gradient Border

```css
/* Arrow initially hidden */
.cs-arrow {
  opacity: 0;
  transform: translateX(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* On card hover: arrow slides right and appears */
.cs-wrapper:hover .cs-arrow {
  opacity: 1;
  transform: translateX(5px);
}
```

### Process Card — Arrow Slide

```css
/* Same pattern as case study */
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

### Combined Card Effect (Complete)

```css
/* A complete Morningside-style card with all hover effects */
.interactive-card {
  /* Base state */
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
  /* Gradient border glow */
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

---

## 7. SERVICE TAB NAVIGATION

### HTML Structure

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

<section id="identify" class="service-content">
  <h2>Identify</h2>
  <p>Decide what's actually worth building...</p>
  <ul class="service-features">
    <li>Executive Alignment Workshops</li>
    <li>Employee & Stakeholder Interviews</li>
    <li>ROI Modeling & Business Case Design</li>
    <li>Prioritization Mapping</li>
    <li>AI Readiness & Diagnostics Report</li>
  </ul>
</section>

<section id="develop" class="service-content" style="display: none;">
  <h2>Develop</h2>
  <p>Build it right so it works from day one...</p>
  <ul>
    <li>Scoping & Technical Architecture</li>
    <li>Data & Systems Integration</li>
    <li>Proof of Concept to Production Build</li>
    <li>Security, Governance & Reliability Design</li>
    <li>Performance Tuning & Optimization</li>
  </ul>
</section>

<section id="adopt" class="service-content" style="display: none;">
  <h2>Adopt</h2>
  <p>Make AI part of how work actually gets done...</p>
  <ul>
    <li>Pilot Launch & Controlled Rollout</li>
    <li>AI Enablement Sessions</li>
    <li>Workflow Integration Support</li>
    <li>Performance Tracking & Ongoing Optimization</li>
  </ul>
</section>
```

### JavaScript — Complete Tab Switching Logic

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
  const prevBtn = document.querySelector('.services-left');
  const nextBtn = document.querySelector('.services-right');

  let currentIndex = 0;
  let isAnimating = false;

  function showSection(index, direction) {
    if (isAnimating || index === currentIndex) return;
    isAnimating = true;

    const oldIndex = currentIndex;
    currentIndex = index;

    // Scroll to services section
    const servicesSection = document.querySelector('.section_services');
    if (servicesSection) {
      const top = servicesSection.getBoundingClientRect().top +
                  window.scrollY - 100;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }

    // Update active nav item
    navItems.forEach(function(item, i) {
      item.classList.toggle('active', i === index);
    });

    const oldSection = contentSections[oldIndex];
    const newSection = contentSections[index];

    // PHASE 1: Fade out current section (250ms)
    oldSection.style.transition = 'opacity 0.25s ease-in-out';
    oldSection.style.opacity = '0';

    // PHASE 2: After fade out, swap sections and fade in (250ms)
    setTimeout(function() {
      oldSection.style.display = 'none';

      newSection.style.opacity = '0';
      newSection.style.display = 'block';

      // Force reflow
      newSection.offsetHeight;

      newSection.style.transition = 'opacity 0.25s ease-in-out';
      newSection.style.opacity = '1';

      setTimeout(function() {
        isAnimating = false;
      }, 250);
    }, 250);

    // Move the indicator
    moveIndicator(navItems[index]);
  }

  function moveIndicator(navItem) {
    var navItemRect = navItem.getBoundingClientRect();
    var containerRect = navItem.parentElement.getBoundingClientRect();
    var leftPosition = navItemRect.left - containerRect.left;
    var width = navItemRect.width;
    var centerOffset = leftPosition + (width / 2) -
                       (indicator.offsetWidth / 2);
    indicator.style.transform = 'translateX(' + centerOffset + 'px)';
  }

  // Click handlers for nav items
  navItems.forEach(function(navItem, index) {
    navItem.addEventListener('click', function() {
      var direction = index > currentIndex ? 'next' : 'prev';
      showSection(index, direction);
    });
  });

  // Arrow button handlers
  prevBtn.addEventListener('click', function() {
    var newIndex = currentIndex > 0 ? currentIndex - 1 : navItems.length - 1;
    showSection(newIndex, 'prev');
  });

  nextBtn.addEventListener('click', function() {
    var newIndex = currentIndex < navItems.length - 1 ? currentIndex + 1 : 0;
    showSection(newIndex, 'next');
  });

  // Initialize first tab
  navItems[0].classList.add('active');
  moveIndicator(navItems[0]);
});
```

### Tab Indicator CSS

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

.service-nav-item.active {
  color: white;
}

.service-nav-item:hover {
  color: rgba(255, 255, 255, 0.8);
}
```

---

## 8. TYPOGRAPHY & TEXT RENDERING

### Font Rendering

```css
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
```

### Text Truncation Utilities

```css
/* 3-line clamp */
.text-style-3lines {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

/* 2-line clamp */
.text-style-2lines {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

---

## 9. FORM & POPUP STYLING

### Popup Container with Gradient Border

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

### Custom Select Dropdown

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

### Hidden Scrollbar

```css
.scroll-container {
  overflow-y: scroll;
  scrollbar-width: none;       /* Firefox */
  -ms-overflow-style: none;    /* IE/Edge */
}

.scroll-container::-webkit-scrollbar {
  display: none;               /* Chrome/Safari */
}
```

---

## 10. UTILITY CLASSES

### Spacing Utilities

```css
.margin-0 { margin: 0rem !important; }
.padding-0 { padding: 0rem !important; }
.spacing-clean { padding: 0rem !important; margin: 0rem !important; }
.margin-horizontal { margin-top: 0rem !important; margin-bottom: 0rem !important; }
.padding-vertical { padding-right: 0rem !important; padding-left: 0rem !important; }
```

### Visibility Utilities

```css
.hide { display: none !important; }

@media screen and (max-width: 991px) {
  .hide,
  .hide-tablet { display: none !important; }
}

@media screen and (max-width: 767px) {
  .hide-mobile-landscape { display: none !important; }
}

@media screen and (max-width: 479px) {
  .hide-mobile { display: none !important; }
}
```

---

## 11. RESPONSIVE BREAKPOINTS

```css
/* Morningside's Webflow-based breakpoint system */

/* Desktop: 992px+ (base styles) */

/* Tablet: 768px - 991px */
@media screen and (max-width: 991px) {
  /* Tablet styles */
}

/* Mobile Landscape: 480px - 767px */
@media screen and (max-width: 767px) {
  /* Mobile landscape styles */
}

/* Mobile Portrait: 0 - 479px */
@media screen and (max-width: 479px) {
  /* Mobile portrait styles */
  /* Cards get permanent gradient borders (not just on hover) */
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

---

## 12. SCROLL BEHAVIOR PATTERNS

### Navigation Scroll Toggle

```javascript
// Threshold: scrollY > 0 (any scroll at all triggers frosted glass)
function handleScroll() {
  if (window.scrollY > 0) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
```

### Smooth Scroll to Section (from Tab Switching)

```javascript
// Used when switching service tabs
const servicesSection = document.querySelector('.section_services');
if (servicesSection) {
  const top = servicesSection.getBoundingClientRect().top +
              window.scrollY - 100;  // 100px offset for nav height
  window.scrollTo({ top: top, behavior: 'smooth' });
}
```

---

## 13. SELECTION STYLING

```css
::selection {
  background-color: #0CC481;
  color: white;
}

::-moz-selection {
  background-color: #0CC481;
  color: white;
}
```

### Reis IA Adaptation

```css
/* Reis IA version — blue accent */
::selection {
  background-color: #4A90FF;
  color: white;
}

::-moz-selection {
  background-color: #4A90FF;
  color: white;
}
```

---

## 14. FOCUS & ACCESSIBILITY

```css
*[tabindex]:focus-visible,
input[type="file"]:focus-visible {
  outline: 0.125rem solid #4d65ff;  /* 2px solid blue */
  outline-offset: 0.125rem;         /* 2px offset */
}
```

---

## 15. HTML SECTION STRUCTURES

### Homepage Hero

```html
<section class="section_hero">
  <div class="container">
    <h1 class="hero_heading">We don't just talk AI.<br>We deliver it.</h1>
    <p class="hero_subtext">Enterprise AI solutions that actually work
       in your operations.</p>
    <a href="/contact" class="hero_cta">Book a Discovery Call</a>
  </div>
</section>
```

### Case Studies Section

```html
<section class="section_case-studies">
  <div class="container">
    <h2>Case Studies</h2>

    <div class="cs-wrapper">
      <div class="cs-img-wrap">
        <img src="/case-study-1.webp" alt="Case study" loading="lazy">
      </div>
      <div class="cs-content">
        <h3 class="cs-title">Company Name</h3>
        <p class="cs-description text-style-3lines">
          Description of the project and results achieved...
        </p>
        <div class="cs-footer">
          <span class="cs-tag">AI Automation</span>
          <svg class="cs-arrow"><!-- right arrow --></svg>
        </div>
      </div>
    </div>

    <!-- Repeat for each case study -->
  </div>
</section>
```

### Process Section

```html
<section class="section_process">
  <div class="container">
    <h2>Our Process</h2>

    <div class="process-grid">
      <div class="process_card">
        <div class="process-card_number">01</div>
        <h3 class="process-card_title">Discovery</h3>
        <p class="process-card_description">
          We start by understanding your business...
        </p>
        <svg class="process-card_arrow"><!-- arrow icon --></svg>
      </div>

      <div class="process_card">
        <div class="process-card_number">02</div>
        <h3 class="process-card_title">Strategy</h3>
        <p>We map out the AI opportunities...</p>
        <svg class="process-card_arrow"><!-- arrow icon --></svg>
      </div>

      <div class="process_card">
        <div class="process-card_number">03</div>
        <h3 class="process-card_title">Build</h3>
        <p>We develop and integrate the solution...</p>
        <svg class="process-card_arrow"><!-- arrow icon --></svg>
      </div>

      <div class="process_card">
        <div class="process-card_number">04</div>
        <h3 class="process-card_title">Launch</h3>
        <p>We deploy, train your team, and optimize...</p>
        <svg class="process-card_arrow"><!-- arrow icon --></svg>
      </div>
    </div>
  </div>
</section>
```

### FAQ Section

```html
<section class="section_faq">
  <div class="container">
    <h2>Frequently Asked Questions</h2>

    <div class="faq-list">
      <div class="faq_accordion">
        <div class="faq_header">
          <h3>How is Morningside AI different?</h3>
          <svg class="faq_icon">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2"
                  fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="faq_body">
          <p>We're workflow specialists first...</p>
        </div>
      </div>

      <div class="faq_accordion">
        <div class="faq_header">
          <h3>How do I know if we're ready for AI?</h3>
          <svg class="faq_icon"><!-- chevron --></svg>
        </div>
        <div class="faq_body">
          <p>You're ready if you have clear pain points...</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Contact Form Section

```html
<section class="section_contact">
  <div class="container">
    <h2>Get in Touch</h2>

    <form id="email-form" class="contact-form">
      <div class="form-row">
        <input type="text" name="First-Name" placeholder="First Name" required>
        <input type="text" name="Last-Name" placeholder="Last Name" required>
      </div>

      <input type="email" name="Email" placeholder="Email" required>
      <input type="text" name="Company" placeholder="Company">
      <input type="text" name="Role" placeholder="Role">
      <input type="text" name="Company-Website" placeholder="Company Website">

      <select name="Company-Size" required>
        <option value="" disabled selected>Company Size*</option>
        <option>Less than 20</option>
        <option>20-50</option>
        <option>50-100</option>
        <option>100-500</option>
        <option>More than 500</option>
      </select>

      <select name="Company-Annual-Revenue">
        <option value="" disabled selected>Company's Annual Revenue</option>
        <option>Less than $100K</option>
        <option>$100K-$500K</option>
        <option>$500K-$1M</option>
        <option>$1M-$2M</option>
        <option>More than $2M</option>
      </select>

      <select name="Project-Budget" required>
        <option value="" disabled selected>Project Budget*</option>
        <option>Less than $10K</option>
        <option>$10K-$50K</option>
        <option>$50K-$100K</option>
        <option>More than $100K</option>
      </select>

      <div class="checkbox-group">
        <label>What services are you interested in?</label>
        <label>
          <input type="checkbox" name="Services-Interest"
                 value="Identifying AI opportunities">
          Identifying AI opportunities
        </label>
        <label>
          <input type="checkbox" name="Services-Interest"
                 value="Educating your team on AI">
          Educating your team on AI
        </label>
        <label>
          <input type="checkbox" name="Services-Interest"
                 value="Developing custom AI solutions">
          Developing custom AI solutions
        </label>
      </div>

      <textarea name="Message" placeholder="Tell us about your project..."></textarea>

      <input type="submit" value="Send" class="submit-btn">
    </form>

    <div class="w-form-done" style="display: none;">
      <p>Form submitted successfully.</p>
    </div>

    <div class="w-form-fail" style="display: none;">
      <p>Oops! Something went wrong.</p>
    </div>
  </div>
</section>
```

---

## 16. HUBSPOT FORM INTEGRATION

### Complete JavaScript

```javascript
document.addEventListener('DOMContentLoaded', function() {
  const HUBSPOT_PORTAL_ID = '146341787';
  const HUBSPOT_FORM_GUID = '3a561990-8a28-4972-8c3b-dee49c4e6ec8';

  const form = document.querySelector('#email-form');
  if (!form) return;

  const submitButton = form.querySelector('input[type="submit"]');
  const originalButtonText = submitButton.value;

  // Field name mapping: HTML name → HubSpot API name
  const fieldMapping = {
    'First-Name': 'firstname',
    'Last-Name': 'lastname',
    'Email': 'email',
    'Company': 'company',
    'Role': 'jobtitle',
    'Company-Website': 'website',
    'Company-Size': 'company_size',
    'Company-Annual-Revenue': 'annualrevenue',
    'Project-Budget': 'budget',
    'Services-Interest': 'services_needed',
    'Message': 'message'
  };

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.value = 'Submitting...';

    // Build payload
    const formData = new FormData(form);
    const fields = [];

    for (let [name, value] of formData.entries()) {
      if (value && fieldMapping[name]) {
        fields.push({
          name: fieldMapping[name],
          value: value
        });
      }
    }

    const payload = {
      fields: fields,
      context: {
        pageUri: window.location.href,
        pageName: document.title
      }
    };

    // Submit to HubSpot Forms API
    fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    )
    .then(function(response) {
      return response.json().then(function(data) {
        if (!response.ok) {
          throw new Error(data.message || 'Network response was not ok');
        }
        return data;
      });
    })
    .then(function(data) {
      // Show success message
      var successDiv = form.nextElementSibling;
      if (successDiv && successDiv.classList.contains('w-form-done')) {
        form.style.display = 'none';
        successDiv.style.display = 'block';
      }
      form.reset();
      submitButton.disabled = false;
      submitButton.value = originalButtonText;
    })
    .catch(function(error) {
      // Show error message (auto-hide after 3s)
      var errorDiv = form.nextElementSibling &&
                     form.nextElementSibling.nextElementSibling;
      if (errorDiv && errorDiv.classList.contains('w-form-fail')) {
        errorDiv.style.display = 'block';
        setTimeout(function() {
          errorDiv.style.display = 'none';
        }, 3000);
      }
      submitButton.disabled = false;
      submitButton.value = originalButtonText;
    });
  });
});
```

---

## 17. REIS IA CROSS-REFERENCE

### High-Priority Patterns to Adopt

| Morningside Pattern | Reis IA Adaptation | Notes |
|---|---|---|
| Gradient border glow on hover | Replace green `#0CC481` with blue `#4A90FF` | Highest value pattern — directly applicable to cards |
| `box-shadow: 0 0 50px 0 rgba(color, 0.15)` glow | Use `rgba(74, 144, 255, 0.12)` for blue glow | Match Reis IA's restraint principle |
| Frosted glass nav (`blur(10px)`) | Already planned — validate with Morningside's values | Morningside uses 10px; Apple uses 20px; Porsche 32px |
| FAQ accordion with max-height animation | Direct port — change colors to Reis IA palette | Clean pattern, well-tested |
| Arrow `translateX(5px)` on card hover | Apply to all interactive cards | Simple, elegant micro-interaction |
| `::selection` styling | Add `background-color: #4A90FF; color: white` | Easy win for brand consistency |
| Font rendering optimizations | Already standard — confirm in Reis IA | antialiased + optimizeLegibility |

### Medium-Priority Patterns

| Pattern | Adaptation | Notes |
|---|---|---|
| Service tab navigation with indicator | Adapt for methodology/service sections | Good for content-heavy sections |
| Mobile permanent gradient borders (no hover needed) | Apply same logic — on mobile, show border always | Touch devices can't hover |
| Custom select dropdown with SVG arrow | Port to form components | Better than default browser select |
| Text line clamping (2-line, 3-line) | Add as utility classes | Useful for card descriptions |
| Hidden scrollbar pattern | Apply to horizontal scroll sections | Clean appearance |

### Key Differences / Conflicts

| Aspect | Morningside | Reis IA | Resolution |
|---|---|---|---|
| Accent color | `#0CC481` (green) | `#4A90FF` (blue) | Use Reis IA blue everywhere |
| Dark backgrounds | `#050808`, `#111413` | `#000000`, `#0a0a0a` | Reis IA is darker — maintain |
| Gradient angles | 90deg, 135deg | TBD | Test both with blue palette |
| Border on hover | `rgba(237, 236, 228, 0.06)` | Own opacity scale | Use Reis IA surface system |
| Framework | Webflow | Astro | Implement natively in Astro components |
| Custom properties | Minimal (2 vars) | Extensive token system | Reis IA's approach is more systematic |

### Gradient Border Adaptation Formula

```css
/* TEMPLATE: Reis IA Gradient Border Card */
.reis-card {
  border: 1px solid transparent;
  border-radius: 12px;
  transition:
    background-image 0.4s var(--ease-base),
    box-shadow 0.4s var(--ease-base);
}

.reis-card:hover {
  background-image:
    linear-gradient(135deg, var(--surface-1) 0%, var(--surface-0) 100%),
    linear-gradient(135deg, rgba(74, 144, 255, 0.2) 0%, #4A90FF 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  box-shadow: 0 0 40px 0 rgba(74, 144, 255, 0.10);
}

/* Mobile — permanent border */
@media (max-width: 479px) {
  .reis-card {
    background-image:
      linear-gradient(90deg, var(--surface-0) 0%, var(--surface-1) 100%),
      linear-gradient(90deg, #4A90FF 0%, rgba(74, 144, 255, 0.1) 100%);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
}
```

---

## SCHEMA.ORG MARKUP (for reference)

```json
{
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Get in Touch",
  "mainEntity": {
    "@type": "Organization",
    "@id": "https://morningside.ai/#organization",
    "name": "Morningside AI",
    "email": "info@morningside.ai",
    "areaServed": "Worldwide",
    "slogan": "We don't just talk AI. We deliver it.",
    "knowsAbout": [
      "Artificial Intelligence",
      "AI Automation",
      "Custom AI Solutions",
      "AI Training",
      "Workflow Optimization"
    ]
  }
}
```
