# Vercel Source Code Extraction
## Last updated: 2026-03-17
## Source: https://vercel.com (Homepage, /geist, /geist/colors, /design, /frameworks, /enterprise, /docs)
## Pages analyzed: 7
## Extraction focus: Design tokens, Geist system, animations, feature patterns

---

## 1. Design Tokens / CSS Custom Properties

### Geist Color Token Names (Dark/Light)
```css
/* Background tokens */
--ds-background-100: /* primary bg */;
--ds-background-200: /* secondary bg */;

/* Gray scale (10 steps) */
--ds-gray-100: /* lightest */;
--ds-gray-200: /* ... */;
--ds-gray-300: /* ... */;
--ds-gray-400: /* ... */;
--ds-gray-500: /* ... */;
--ds-gray-600: /* ... */;
--ds-gray-700: /* ... */;
--ds-gray-800: /* ... */;
--ds-gray-900: /* ... */;
--ds-gray-1000: /* darkest */;

/* Gray alpha (transparency variants) */
--ds-gray-alpha-100: /* ... */;
--ds-gray-alpha-400: /* ... */;

/* Semantic colors */
--ds-blue-700: /* ... */;
--ds-blue-800: /* ... */;
--ds-blue-900: /* ... */;
--ds-red-800: /* ... */;
--ds-green-700: /* ... */;
--ds-amber-100: /* ... */;
--ds-amber-400: /* ... */;
--ds-amber-700: /* ... */;
--ds-amber-900: /* ... */;
--ds-teal-*: /* teal scale */;
--ds-purple-*: /* purple scale */;
--ds-pink-*: /* pink scale */;
```

### Theme Colors (Confirmed Values)
```css
/* Dark mode */
:root[data-theme="dark"] {
  color-scheme: dark;
  /* Meta theme-color: #0a0a0a */
}

/* Light mode */
:root[data-theme="light"] {
  color-scheme: light;
  /* Meta theme-color: #ffffff */
}

/* Core background colors */
--dark-bg: #0a0a0a;
--light-bg: #ffffff;
```

### Layout Tokens
```css
:root {
  --raw-sidebar-width: 256px; /* Range: 240px - 400px */
  --raw-omniagent-panel-width: 420px;
}
```

### Geist Font System
```css
/* Two typefaces */
font-family: "Geist Sans", -apple-system, BlinkMacSystemFont, sans-serif;
font-family: "Geist Mono", monospace;

/* Referenced as CSS module classes */
.geist_sans_*-module { /* Sans variant */ }
.geist_mono_*-module { /* Mono variant */ }
```

---

## 2. Geist Design System Components

### Component Library (60+ components documented)
```
Avatar        Badge         Button        Calendar
Checkbox      Collapse      Combobox      Context Menu
Description   Details       Drawer        Error
Fade In       Feedback      File Tree     Footer
Gauge         Grid          Header        Hero
Icon Button   Input         Kbd           Link
Menu          Modal         Note          Pagination
Popover       Progress      Radio         Scroll Area
Search        Select        Separator     Skeleton
Slider        Snippet       Spinner       Stack
Status Dot    Switch        Table         Tabs
Text          Textarea      Theme Switch  Toast
Toggle        Toggle Group  Tooltip       Window
```

### Stripe-Compatible Spacing Tokens (from Stripe Apps Style Guide)
```javascript
/* Vercel/Stripe shared spacing scale pattern */
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

/* Fractional sizing */
const fractions = {
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '5/6': '83.333333%',
  'fill': '100%',
};
```

---

## 3. JavaScript Patterns

### Theme System
```javascript
// Vercel uses 'zeit-theme' localStorage key
const theme = localStorage.getItem('zeit-theme');
// Toggles: "light", "dark", "system"

// Dynamic meta theme-color update
function updateThemeColor(theme) {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (theme === 'dark') {
    metaThemeColor.content = '#0a0a0a';
  } else {
    metaThemeColor.content = '#ffffff';
  }
}
```

### Performance Navigation Tracking
```javascript
// Vercel tracks skeleton visibility for performance metrics
performance.measure("skeleton visible", {
  detail: {
    vercelNavigation: {
      isHardNavigation: true,
      phase: "skeleton",
      state: "visible"
    }
  }
});

// Navigation context states tracked:
// - router_transition
// - non_router_transition
// - initial_load
```

### Code Block Protection (Geist)
```javascript
// MutationObserver preserves code block formatting
// Prevents React hydration from breaking syntax highlighting
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

---

## 4. Vercel Design Patterns (Inferred from Structure)

### Feature Grid Layout
```html
<!-- Vercel uses a bento-style grid for feature showcase -->
<div class="feature-grid">
  <!-- Large hero card spanning 2 columns -->
  <div class="feature-card feature-card--large">
    <div class="feature-card__content">
      <h3>Feature Title</h3>
      <p>Description</p>
    </div>
    <div class="feature-card__visual">
      <!-- Interactive demo or animation -->
    </div>
  </div>

  <!-- Standard cards -->
  <div class="feature-card">
    <!-- Single column card -->
  </div>
</div>
```

### Deploy Animation Pattern
```css
/* Vercel's deploy visualization uses these techniques: */

/* 1. Terminal/console styling */
.deploy-terminal {
  background: var(--ds-background-200);
  border: 1px solid var(--ds-gray-alpha-400);
  border-radius: 8px;
  font-family: "Geist Mono", monospace;
}

/* 2. Progressive text reveal */
.deploy-log-line {
  opacity: 0;
  animation: fade-in 0.3s ease forwards;
  animation-delay: var(--line-delay);
}

/* 3. Status indicator pulse */
.deploy-status {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 4. Progress bar fill */
.deploy-progress {
  width: 0%;
  transition: width 0.5s ease;
}
```

### Framework Logo Grid
```css
/* Vercel showcases framework logos in a responsive grid */
.framework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
}

.framework-item {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.framework-item:hover {
  background: var(--ds-gray-alpha-100);
}
```

### Geist Typography Variants (from Component Library)
```
Geist Sans: Specifically designed for legibility at small sizes
- Supports variable font weight (100-900)
- Optimized for screen rendering
- Includes tabular figures

Geist Mono: Developer-focused monospace
- Distinguishable characters (0/O, 1/l/I)
- Aligned with Geist Sans metrics for mixed usage
- Perfect for code blocks and terminal output
```

---

## 5. Vercel Enterprise Page Patterns

### Hero Section
```css
/* Enterprise uses a dark, premium aesthetic */
.enterprise-hero {
  background: linear-gradient(to bottom, #0a0a0a, #111);
  min-height: 80vh;
}

/* Gradient text for "AI Cloud" branding */
.enterprise-hero__title {
  background: linear-gradient(to right, #fff, #999);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### Customer Logo Ticker
```css
/* Infinite scrolling logo carousel */
.logo-ticker {
  display: flex;
  animation: scroll-left 30s linear infinite;
  gap: 48px;
}

@keyframes scroll-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Hover pauses animation */
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

---

## 6. Docs Page Patterns

### Sidebar Navigation
```css
/* Collapsible sidebar with CSS variable width */
.sidebar {
  width: var(--raw-sidebar-width); /* 256px default */
  min-width: 240px;
  max-width: 400px;
  transition: width 0.2s ease;
}

/* Collapsed state */
.sidebar-collapsed .sidebar {
  width: 0;
  overflow: hidden;
}
```

### Code Block System (Geist)
```html
<!-- Code blocks use data attributes for preservation -->
<code data-geist-code-block>
  <!-- Syntax-highlighted content -->
  <!-- Protected from React hydration via MutationObserver -->
</code>
```

---

## 7. Animation Patterns (Reconstructed)

### Fade In (Common across Vercel pages)
```css
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fade-in 0.5s ease forwards;
}
```

### Skeleton Loading
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

### Border Glow Effect
```css
/* Vercel-style glowing border on cards */
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

### Grid Line Animation
```css
/* Vercel uses animated grid patterns as backgrounds */
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

### Beam Effect
```css
/* Vercel's signature "beam" effect */
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

### Dot Pattern
```css
/* Vercel dot grid background */
.dot-pattern {
  background-image: radial-gradient(
    circle at 1px 1px,
    var(--ds-gray-alpha-400) 1px,
    transparent 0
  );
  background-size: 24px 24px;
}
```

---

## 8. Vercel Design Principles (from /design page)

```
Foundations:
- Colors: High contrast, accessible color system
- Typography: Geist Sans + Geist Mono, designed for developers
- Grid: Responsive grid system
- Icons: Icon set tailored for developer tools

Design Philosophy:
- Minimal, functional interface
- Dark mode as first-class citizen
- Performance-conscious (skeleton states, progressive loading)
- Developer-centric information hierarchy
- Consistent spacing and type scale
```

---

## 9. Reis IA Cross-Reference

### Highly Compatible Patterns
- **Dark mode native** (#0a0a0a background) -- very close to Reis IA #000000
- **Geist font philosophy** -- same goals as Inter (legibility, developer focus)
- **Design token naming** (--ds-[color]-[shade]) -- clean, scalable naming convention
- **Skeleton loading animation** -- premium loading state
- **Border glow effect** (conic-gradient mask) -- adapt with gold for Reis IA
- **Beam effect** -- vertical light beam, could accent hourglass motif
- **Dot pattern background** -- subtle texture for dark backgrounds
- **Grid line background** -- minimal geometric pattern
- **Code block protection** via MutationObserver -- useful for Reis IA docs

### Patterns to Adapt for Reis IA
- **Logo ticker** with edge fade masks -- for partner/client showcase
- **Conic gradient border glow** -- replace blue/purple with gold
- **Grid sweep animation** -- replace blue with gold accent
- **Skeleton pulse** -- use gold-tinted highlight
- **Sidebar width variable** (240-400px range) -- flexible layout pattern
- **Performance measurement** (skeleton visible tracking) -- good practice
- **Theme system** (zeit-theme localStorage) -- reference for Reis IA dark/light toggle

### Conflicts with Reis IA
- Vercel's gray scale is very neutral (no warmth) -- Reis IA may need warm gray
- Vercel uses blue (#ds-blue-*) as primary accent -- Reis IA uses gold
- Vercel's #0a0a0a is slightly lighter than Reis IA #000000
- Geist Sans vs Inter -- different typefaces, similar philosophy

### Token Naming Recommendation
Adopt Vercel's naming pattern for Reis IA:
```css
/* Instead of ad-hoc names, use structured tokens: */
--reis-background-100: #000000;
--reis-background-200: #0a0a0a;
--reis-gray-100: /* lightest gray */;
--reis-gray-1000: /* darkest gray */;
--reis-gold-100: /* lightest gold */;
--reis-gold-900: /* darkest gold */;
--reis-text-primary: /* primary text */;
--reis-text-secondary: /* secondary text */;
--reis-text-tertiary: /* tertiary text */;
```

### Key Takeaway
Vercel provides the strongest design token architecture and naming convention model. Their component library (60+ components) is comprehensive but their marketing pages are heavily compiled, making source extraction difficult. The Geist design system's philosophy of "high contrast, accessible, developer-focused" aligns perfectly with Reis IA's premium dark aesthetic. The beam effect, dot patterns, and border glow techniques are the most visually distinctive elements worth adapting with a gold color shift.
