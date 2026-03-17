# AIOX Interactive Patterns -- Synthesis Document

Last updated: 2026-03-17
Sources: All 13 AIOX brandbook pages analyzed
Purpose: Catalog every interactive pattern found across the AIOX design system

---

## Table of Contents

1. Click-to-Replay Animation Demos
2. Hover State Showcase Panels
3. Variant Switcher Tabs
4. Code + Preview Side-by-Side Layouts
5. Scroll-Triggered Demos
6. Speed/Opacity/Value Controls
7. Copy-to-Clipboard Implementations
8. Grid Layout Patterns for Organizing Demos
9. Responsive Demo Layouts
10. Theme Switching System
11. Interactive Navigation Patterns
12. Drag-and-Drop Patterns
13. Accordion/Expand Patterns
14. Complete Section Architecture

---

## 1. Click-to-Replay Animation Demos

**Found on:** /brandbook/motion

### Pattern

Each animation cell has a "click to replay" label. Clicking the cell remounts the animation component, causing it to play from the start.

### Implementation

```tsx
import { useState } from "react";
import { motion } from "framer-motion";

const ReplayableDemo = ({ children, label }) => {
  const [key, setKey] = useState(0);

  return (
    <div
      onClick={() => setKey(prev => prev + 1)}
      className="relative cursor-pointer group"
    >
      {/* Animation wrapper -- key change forces remount */}
      <motion.div key={key}>
        {children}
      </motion.div>

      {/* Replay label */}
      <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.15em] text-white/30 group-hover:text-white/50 transition-colors">
        click to replay
      </span>
    </div>
  );
};
```

### Cell Structure

```html
<div class="relative min-h-[280px] flex items-center justify-center bg-[var(--bb-surface)] border border-[var(--bb-border)] overflow-hidden cursor-pointer">
  <!-- Metadata (top-left) -->
  <div class="absolute top-3 left-3 space-y-1">
    <span class="font-mono text-[11px] text-[#D1FF00] tracking-[0.2em]">01</span>
    <span class="block font-mono text-[10px] text-white/40 uppercase tracking-[0.15em]">
      Orchestration Pulse
    </span>
  </div>

  <!-- Type/Duration badges (top-right) -->
  <div class="absolute top-3 right-3 flex gap-2">
    <span class="font-mono text-[9px] text-white/30 uppercase">full reveal</span>
    <span class="font-mono text-[9px] text-white/30">3.5s</span>
  </div>

  <!-- Animation area (centered) -->
  <div class="flex items-center justify-center w-full h-full p-8">
    {/* Animated content */}
  </div>

  <!-- Replay label (bottom-left) -->
  <span class="absolute bottom-3 left-3 font-mono text-[10px] text-white/30 uppercase tracking-[0.15em]">
    click to replay
  </span>
</div>
```

### Grid for Animation Cells

```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
  <!-- 8 animation cells -->
  <!-- gap-px + colored parent = hairline grid lines -->
</div>
```

---

## 2. Hover State Showcase Panels

**Found on:** /brandbook/effects (Hover Effects section), /brandbook/buttons, /brandbook/cards

### Text Hover Effect Panel

```tsx
// Effects page: 4 terms with hover interaction
const hoverTerms = ["Automation", "Intelligence", "Orchestration", "Integration"];

{hoverTerms.map((term) => (
  <motion.div
    key={term}
    whileHover={{
      color: "#D1FF00",
      x: 8,
    }}
    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
    className="text-white/50 text-lg font-medium cursor-pointer py-3 border-b border-white/[0.06]"
  >
    {term}
  </motion.div>
))}
```

### Button State Showcase

```html
<!-- Buttons page: states shown side-by-side -->
<div class="flex gap-4 items-center">
  <!-- Default -->
  <button class="px-4 py-2 bg-[#D1FF00] text-[#050505] font-bold text-[11px] uppercase">
    Default
  </button>
  <!-- Loading -->
  <button class="px-4 py-2 bg-[#D1FF00] text-[#050505] font-bold text-[11px] uppercase opacity-70">
    <svg class="animate-spin w-4 h-4 inline mr-2">...</svg>
    Loading
  </button>
  <!-- Disabled -->
  <button class="px-4 py-2 bg-[#D1FF00] text-[#050505] font-bold text-[11px] uppercase opacity-40 cursor-not-allowed">
    Disabled
  </button>
</div>
```

### Card Hover Effects

```tsx
// Cards page: hover reveals action area
<motion.div
  whileHover={{ y: -2, transition: { duration: 0.2 } }}
  className="bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-lg overflow-hidden hover:border-[var(--bb-border-hover)] transition-colors"
>
  {/* Card content */}
</motion.div>
```

### Article Card Interactions (Sections page)

```css
/* Image zoom on hover */
.article-card:hover .article-image {
  transform: scale(1.05);
  transition: transform 500ms ease;
}

/* Border brightens */
.article-card:hover {
  border-color: rgba(255, 255, 255, 0.15); /* from 0.06 */
}

/* Title turns neon */
.article-card:hover .article-title {
  color: var(--bb-lime); /* from white */
}
```

---

## 3. Variant Switcher Tabs

**Found on:** /brandbook/buttons, /brandbook/cards, /brandbook/forms, /brandbook/advanced

### Pattern: Inline Variant Selector

```tsx
// Buttons page: variant tabs (Primary | Secondary | Ghost | Delete)
const VariantSwitcher = ({ variants, activeVariant, onChange }) => (
  <div className="flex gap-1 p-1 bg-[var(--bb-surface)] rounded-[var(--radius)] border border-[var(--bb-border)]">
    {variants.map((v) => (
      <button
        key={v}
        onClick={() => onChange(v)}
        className={cn(
          "px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.12em] rounded transition-colors",
          activeVariant === v
            ? "bg-[var(--bb-lime)] text-[var(--bb-dark)]"
            : "text-[var(--bb-dim)] hover:text-[var(--bb-cream)]"
        )}
      >
        {v}
      </button>
    ))}
  </div>
);
```

### Pattern: Tab Navigation (Advanced page)

```tsx
// Tabs component with smooth sliding indicator
const SmoothTabs = ({ items, active, onChange }) => (
  <div className="relative border-b border-[var(--bb-border)]">
    <div className="flex">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            "relative px-4 py-3 text-sm transition-colors",
            active === item.id ? "text-[var(--bb-cream)]" : "text-[var(--bb-dim)]"
          )}
        >
          {item.label}
          {/* Framer Motion layoutId creates smooth sliding underline */}
          {active === item.id && (
            <motion.div
              layoutId="active-tab"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--bb-lime)]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  </div>
);
```

### Pattern: SegmentedControl (Forms page)

```tsx
// Budget range selector: Under $10k | $10k-$25k | $25k+
// Same pattern as variant switcher but with border group
const SegmentedControl = ({ options, value, onChange }) => (
  <div className="inline-flex rounded-[var(--radius)] border border-[var(--bb-border)] overflow-hidden">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={cn(
          "px-4 py-2 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors border-r border-[var(--bb-border)] last:border-r-0",
          value === opt.value
            ? "bg-[var(--bb-lime)] text-[var(--bb-dark)]"
            : "bg-transparent text-[var(--bb-dim)] hover:bg-[var(--bb-accent-05)]"
        )}
      >
        {opt.label}
      </button>
    ))}
  </div>
);
```

### Pattern: Theme Toggle (Global)

```tsx
// Lime/Gold theme toggle in header
const ThemeToggle = () => {
  const [theme, setTheme] = useState<"lime" | "gold">("lime");

  return (
    <div className="flex gap-1 p-1 rounded-full border border-[var(--bb-border)]">
      <button
        onClick={() => setTheme("lime")}
        className={cn(
          "px-3 py-1 text-[9px] font-mono uppercase rounded-full transition-colors",
          theme === "lime" ? "bg-[#D1FF00] text-[#050505]" : "text-[var(--bb-dim)]"
        )}
      >
        Lime
      </button>
      <button
        onClick={() => setTheme("gold")}
        className={cn(
          "px-3 py-1 text-[9px] font-mono uppercase rounded-full transition-colors",
          theme === "gold" ? "bg-[#DDD1BB] text-[#050505]" : "text-[var(--bb-dim)]"
        )}
      >
        Gold
      </button>
    </div>
  );
};
```

---

## 4. Code + Preview Side-by-Side Layouts

**Found on:** /brandbook/vfx (CSS value labels below demos), /brandbook/patterns (class names with descriptions)

### Pattern: Demo Panel with CSS Value Label

```html
<!-- VFX page pattern: live demo with CSS value shown -->
<div class="relative min-h-[200px] bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-lg overflow-hidden p-6">
  <!-- Live effect demo area -->
  <div class="h-full" style="backdrop-filter: blur(8px);">
    <!-- Effect applied to content -->
  </div>

  <!-- CSS value label (bottom) -->
  <div class="absolute bottom-3 left-3">
    <code class="font-mono text-[10px] text-white/40">
      backdrop-filter: blur(8px)
    </code>
  </div>

  <!-- Intensity label (top) -->
  <div class="absolute top-3 left-3">
    <span class="font-mono text-[10px] uppercase tracking-[0.15em] text-[#D1FF00]">
      Medium (8px)
    </span>
  </div>
</div>
```

### Pattern: Pattern Library Card (class name + description)

```html
<!-- Patterns page: visual preview + class name + description -->
<div class="space-y-3">
  <!-- Visual preview -->
  <div class="h-32 rounded-lg border border-[var(--bb-border)] overflow-hidden">
    <div class="h-full pattern-dot-grid"></div>
  </div>

  <!-- Class name as code -->
  <code class="font-mono text-[11px] text-[#D1FF00]">.pattern-dot-grid</code>

  <!-- Description -->
  <p class="text-[12px] text-[var(--bb-dim)]">
    16px spaced lime dots on dark surface. Default density for backgrounds and empty states.
  </p>
</div>
```

---

## 5. Scroll-Triggered Demos

**Found on:** /brandbook/lp-sections (all section components), /brandbook/sections

### Standard Scroll Reveal

```tsx
// Most common pattern across all AIOX sections
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
>
  {/* Content */}
</motion.div>
```

### Staggered Grid Reveal

```tsx
// Cards, testimonials, features -- children appear with stagger
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 }
    }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1, y: 0,
          transition: { duration: 0.5, ease: [0, 0, 0.2, 1] }
        }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

### Hero Headline Reveal

```tsx
// Largest text elements get more dramatic reveal
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
  className="text-[clamp(2.2rem,7vw,6.5rem)] font-black leading-[0.92] tracking-[-0.02em]"
>
```

### Scale Reveal for Media

```tsx
// Video previews, images, device mockups
<motion.div
  initial={{ opacity: 0, scale: 0.97 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
>
  <img ... />
</motion.div>
```

### Counter Animation (Stats)

```tsx
// Numbers count up when scrolled into view
const AnimatedNumber = ({ value, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to value over ~1.5s
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplay(value);
          clearInterval(timer);
        } else {
          setDisplay(Math.floor(current));
        }
      }, duration / steps);
    }
  }, [isInView]);

  return (
    <span ref={ref}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
};
```

---

## 6. Speed/Opacity/Value Controls

**Found on:** /brandbook/sections (ROI Calculator), /brandbook/vfx (grain opacity)

### Slider Controls (ROI Calculator)

```tsx
// Uses shadcn/ui Slider component
import { Slider } from "@/components/ui/slider";

const ROICalculator = () => {
  const [employees, setEmployees] = useState(10);
  const [hours, setHours] = useState(20);
  const [cost, setCost] = useState(50);
  const [includeBenefits, setIncludeBenefits] = useState(false);

  const baseCost = employees * hours * cost * 52;
  const annual = includeBenefits ? Math.round(baseCost * 1.3) : baseCost;
  const automationRate = 0.7;
  const savings = Math.round(annual * automationRate);
  const afterCost = annual - savings;

  return (
    <div className="bg-[var(--bb-dark)] p-8 rounded-[var(--radius-xl)] max-w-3xl mx-auto">
      {/* Employees slider: 1-100, step 1 */}
      <div className="space-y-3">
        <label className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/40">
          Employees
        </label>
        <Slider
          value={[employees]}
          onValueChange={([v]) => setEmployees(v)}
          min={1} max={100} step={1}
          className="[&_[role=slider]]:bg-[#D1FF00] [&_[role=slider]]:border-[#D1FF00] [&_.range]:bg-[#D1FF00] [&_.track]:bg-white/15"
        />
        <span className="text-sm font-bold">{employees}</span>
      </div>

      {/* Hours/week: 5-40, step 5 */}
      {/* Hourly cost: R$15-200, step 5 */}

      {/* Results */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div>
          <span className="text-[10px] font-mono text-white/40 uppercase">Current Annual</span>
          <div className="text-2xl font-black">${annual.toLocaleString()}</div>
        </div>
        <div>
          <span className="text-[10px] font-mono text-white/40 uppercase">After AIOX</span>
          <div className="text-2xl font-black text-[#D1FF00]">${afterCost.toLocaleString()}</div>
        </div>
        <div>
          <span className="text-[10px] font-mono text-white/40 uppercase">Savings</span>
          <div className="text-2xl font-black text-[#D1FF00]">${savings.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
};
```

### Grain Opacity Control (Sections page)

```tsx
// Film texture overlay with adjustable opacity prop
<GrainOverlay opacity={0.05} /> // Prop controls intensity
// Possible interactive demo with opacity slider on the sections page
```

### Pricing Toggle (Monthly/Annual)

```tsx
const PricingToggle = () => {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <span className={cn("text-sm", !annual && "text-[var(--bb-cream)]", annual && "text-[var(--bb-dim)]")}>
        Mensal
      </span>
      <button
        onClick={() => setAnnual(!annual)}
        className="relative w-10 h-5 rounded-full border border-white/25"
      >
        <div className={cn(
          "w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform",
          annual ? "translate-x-5" : "translate-x-0.5"
        )} />
      </button>
      <span className={cn("text-sm", annual && "text-[var(--bb-cream)]", !annual && "text-[var(--bb-dim)]")}>
        Anual
      </span>
    </div>
  );
};
// Annual pricing: monthlyPrice * 0.8
```

---

## 7. Copy-to-Clipboard Implementations

**Found on:** Inferred from pattern/token pages showing CSS class names and values

### Pattern

```tsx
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 rounded text-[var(--bb-dim)] hover:text-[var(--bb-cream)] hover:bg-[var(--bb-accent-05)] transition-colors"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-[#22C55E]" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
    </button>
  );
};
```

### Usage Context

```html
<!-- Code value with copy button -->
<div class="flex items-center gap-2 px-3 py-2 bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded">
  <code class="font-mono text-[11px] text-[var(--bb-cream)] flex-1">
    backdrop-filter: blur(8px)
  </code>
  <CopyButton text="backdrop-filter: blur(8px)" />
</div>
```

---

## 8. Grid Layout Patterns for Organizing Demos

### Hairline Grid (gap-px)

```html
<!-- Most-used grid pattern across AIOX -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-lg overflow-hidden">
  <!-- Children have opaque backgrounds -->
  <!-- The 1px gaps reveal parent's semi-transparent bg as grid lines -->
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
  <div class="bg-[var(--bb-dark)] p-6 min-h-[200px]">...</div>
</div>
```

**Variants used:**
- `lg:grid-cols-4` -- Testimonials
- `md:grid-cols-3` -- Articles, post-launch cards, pricing
- `sm:grid-cols-2` -- Team portraits, mobile testimonials
- `md:grid-cols-4` -- Animation cells, effects demos

**Light theme version:**
```html
<div class="grid gap-px bg-black/[0.06]">
  <div class="bg-[var(--bb-off-white)] ...">...</div>
</div>
```

### Standard Gap Grid

```html
<!-- For components that need visible spacing -->
<div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
  <!-- Pattern previews, form elements, card demos -->
</div>
```

### Asymmetric Split Grid

```html
<!-- For content + media layouts -->
<div class="grid md:grid-cols-[1fr_1fr] gap-0">
  <!-- Left: content -->
  <div class="p-8 md:p-10">...</div>
  <!-- Right: full-bleed image -->
  <div class="aspect-[4/3] overflow-hidden">...</div>
</div>
```

### Table-Style Grid (Services section)

```html
<!-- Column-defined grid for tabular data -->
<div class="grid md:grid-cols-[50px_180px_1fr_1fr]">
  <!-- Header row -->
  <div class="contents font-mono text-[10px] text-white/20 uppercase">
    <span>#</span><span>Service</span><span>Description</span><span>Tags</span>
  </div>
  <!-- Data rows with dividers -->
</div>
```

---

## 9. Responsive Demo Layouts

### Breakpoint System

```css
/* AIOX uses 3 breakpoints */
sm: 640px    /* Mobile to small tablet */
md: 768px    /* Tablet to desktop -- primary breakpoint */
lg: 1024px   /* Large desktop */
```

### Common Responsive Patterns

```css
/* Column collapse */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  /* Testimonials */
grid-cols-1 md:grid-cols-3                   /* Articles, pricing */
grid-cols-1 md:grid-cols-2                   /* Contact, customer story */

/* Content reflow */
flex-col md:flex-row                         /* Hero, features */
hidden md:block                              /* Desktop-only elements */
md:py-32 (vs py-24 mobile)                   /* Section padding increase */
```

### Mobile-Specific Patterns

```tsx
// Staircase disables on mobile
style={{ marginTop: isMobile ? '24px' : `${i * 50 + 24}px` }}

// Video preview: desktop-only
<div className="hidden md:block">
  {/* Video preview with grid overlay */}
</div>

// Navbar tagline hidden on mobile
<span className="hidden md:block text-[10px] font-mono text-white/50">
  Tagline
</span>
```

---

## 10. Theme Switching System

### Architecture

```tsx
// Two themes: Lime and Gold
// Theme applied via data attribute or CSS class

// Theme toggle in global header
// Changes CSS custom properties across entire page
// Both themes share identical structure, only color values differ

// Lime: #D1FF00 accent, warm cream text, oklch-based surfaces
// Gold: #DDD1BB accent, pure white text, hex-based surfaces
```

### CSS Custom Property Override

```css
/* Default (Lime) */
:root {
  --bb-lime: oklch(0.934 0.2264 121.95);
  --bb-border: rgba(156, 156, 156, 0.15);
  /* ... */
}

/* Gold override */
[data-theme="gold"] {
  --bb-lime: #DDD1BB;
  --bb-border: rgba(255, 255, 255, 0.09);
  /* ... */
}
```

---

## 11. Interactive Navigation Patterns

### Fullscreen Menu Overlay

```tsx
// Trigger: hamburger menu button
// Effect: body scroll lock
useEffect(() => {
  document.body.style.overflow = menuOpen ? "hidden" : "";
}, [menuOpen]);

// Layout
<div className="fixed inset-0 z-[100] bg-[var(--bb-cream)]">
  <div className="grid md:grid-cols-[400px_1fr] h-full">
    {/* Left: branding/info */}
    {/* Right: navigation links */}
    {links.map((link) => (
      <a
        href={link.href}
        className="text-[clamp(2.5rem,6vw,5.5rem)] font-black uppercase tracking-tight text-[var(--bb-dark)] hover:text-[var(--bb-lime)] transition-colors"
      >
        {link.label}
      </a>
    ))}
  </div>
</div>
```

### Cmd+K Search

```tsx
// Keyboard shortcut listener
useEffect(() => {
  const handler = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, []);
```

### Sidebar Collapse Toggle

```tsx
// 240px expanded -> 60px collapsed
// Transition: width 300ms ease
// Icon-only mode when collapsed
// Tooltip on hover when collapsed (showing label)
```

---

## 12. Drag-and-Drop Patterns

**Found on:** /brandbook/charts (KPI Grid DnD)

```tsx
// Draggable KPI cards that can be reordered
// 6-card grid layout
// Uses dnd-kit or similar library
// Cards show: metric name, value, trend arrow (up/down), percentage change
```

---

## 13. Accordion/Expand Patterns

**Found on:** /brandbook/advanced (Accordion), /brandbook/sections (FAQ)

### Plus-to-X Toggle

```tsx
// Plus icon rotates 45deg to become X when section opens
<Plus className={cn(
  "w-4 h-4 transition-transform duration-200",
  isOpen && "rotate-45"
)} />
```

### Content Height Animation

```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="overflow-hidden"
    >
      {content}
    </motion.div>
  )}
</AnimatePresence>
```

### Numbered Badge Pattern

```html
<!-- FAQ items have numbered lime badges -->
<span class="h-6 w-6 rounded-full bg-[#D1FF00] text-[#050505] flex items-center justify-center text-[10px] font-bold">
  01
</span>
```

---

## 14. Complete Section Architecture

### SectionShell Pattern (Atomic Wrapper)

```tsx
// Every section on AIOX LP uses this wrapper
interface SectionShellProps {
  variant: "dark" | "light";
  fullBleed?: boolean;
  id?: string;
  children: React.ReactNode;
}

const SectionShell = ({ variant = "light", fullBleed = false, id, children }: SectionShellProps) => (
  <section
    id={id}
    className={cn(
      "py-24 md:py-32",
      variant === "dark" ? "bg-[#050505] text-[#F4F4E8]" : "bg-[#F5F4E7] text-[#050505]",
      !fullBleed && "mx-auto max-w-[1400px] px-6 md:px-10"
    )}
  >
    {children}
  </section>
);
```

### SectionHeader Pattern (Numbered Label)

```tsx
// Pattern: [01] section_name
const SectionHeader = ({ number, label }: { number: string; label: string }) => (
  <div className="mb-14 flex items-center gap-2">
    <span className="font-mono text-[11px] tracking-[0.2em] text-[#D1FF00]">
      [{number}]
    </span>
    <span className="font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">
      {label}_
    </span>
  </div>
);
```

### Dark/Light Alternation Pattern

```
Navbar       -> dark/95 (fixed, transparent)
Hero         -> dark
WhoWeAre     -> light
PainPoints   -> dark -> light (dual)
ROICalculator-> cream (standalone)
Services     -> dark
HowItWorks   -> light
CustomerStory-> dark
Testimonials -> light
TechStack    -> dark (fullBleed)
Team         -> light
Pricing      -> dark
FAQ          -> cream
Articles     -> dark
Contact      -> light
Footer       -> dark
```

---

## Summary Statistics

| Metric | Count |
|---|---|
| Pages analyzed | 13 |
| Interactive patterns cataloged | 14 categories |
| Animation types | 8 logo + 4 standard reveal patterns |
| Easing curves | 3 core (spring, smooth, decel) |
| Grid layout variants | 5 (hairline, standard gap, asymmetric, table, staircase) |
| Component categories | 6 (Action, Live, Option, Data Display, Feedback, Layout) |
| Total CSS custom properties | 80+ |
| Theme variants | 2 (Lime, Gold) |
| Responsive breakpoints | 3 (sm/md/lg) |
| Section types | 19 marketing + 6 atoms/molecules |

---

## Reis IA Priority Adoption List

### Immediate (Phase 3)

1. **SectionShell + SectionHeader** -- wrap all Reis IA sections consistently
2. **Fade-up scroll reveals** -- standard Framer Motion whileInView
3. **Hairline grid (gap-px)** -- for testimonials, features grids
4. **Easing tokens** (spring/smooth/decel) -- global motion system
5. **Accordion with AnimatePresence** -- for FAQ

### Next Sprint

6. **Theme toggle architecture** -- adapt for Reis IA brand palette
7. **Mono label system** -- for section numbers, metadata
8. **AccentButton with arrow glyph** -- adapt for Reis IA CTAs
9. **Staggered grid reveals** -- for feature cards
10. **Glass panel** (backdrop-blur + overlay) -- for nav, modals

### Reference Only (do not copy)

- Pricing toggle (no SaaS patterns)
- ROI calculator (tool-based, not premium consulting)
- Dashboard shell (product UI)
- DnD KPI grid (too interactive for marketing)
- Hazard/circuit/scanline patterns (wrong aesthetic)
