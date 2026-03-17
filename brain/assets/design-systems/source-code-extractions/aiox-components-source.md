# AIOX Components -- Full Source Extraction

Last updated: 2026-03-17
Sources: /brandbook/buttons, /brandbook/cards, /brandbook/forms, /brandbook/components, /brandbook/advanced, /brandbook/feedback, /brandbook/states, /brandbook/tables, /brandbook/lists, /brandbook/navigation, /brandbook/charts

---

## 1. Design System Foundation Tokens

### Color System (from /brandbook/color-tokens & /brandbook/token-export)

```css
/* === LIME THEME (Primary) === */
:root {
  /* Accent */
  --bb-lime: oklch(0.934 0.2264 121.95);  /* #D1FF00 equivalent */
  --bb-blue: oklch(0.669 0.1837 248.81);  /* #0099FF */
  --bb-flare: oklch(0.631 0.2116 36.21);  /* #ED4609 */
  --bb-error: oklch(0.6368 0.2078 25.33); /* #EF4444 */

  /* Surfaces */
  --bb-canvas: var(--bb-dark);
  --bb-dark: oklch(0.1149 0 0);                     /* #050505 */
  --bb-surface: oklch(0.1693 0.0041 285.95);         /* #0F0F11 */
  --bb-surface-alt: oklch(0.231 0.0099 124.97);      /* #1C1E19 */
  --bb-surface-panel: oklch(0.1785 0.0041 285.98);
  --bb-surface-console: oklch(0.184 0.0081 118.61);
  --bb-surface-hover-strong: oklch(0.1971 0.006 285.84);

  /* Text */
  --bb-cream: oklch(0.9639 0.0158 106.69);           /* #F4F4E8 */
  --bb-cream-alt: oklch(0.9644 0.0172 103.15);
  --bb-warm-white: oklch(0.9952 0.0235 106.82);
  --bb-dim: rgba(245, 244, 231, 0.4);
  --bb-muted: oklch(0.7952 0 0);
  --bb-meta: oklch(0.6927 0 0);

  /* Neutrals */
  --bb-gray-charcoal: oklch(0.36 0 0);
  --bb-gray-dim: oklch(0.5208 0 0);
  --bb-gray-muted: oklch(0.683 0 0);
  --bb-gray-silver: oklch(0.7984 0 0);

  /* Borders */
  --bb-border: rgba(156, 156, 156, 0.15);
  --bb-border-soft: rgba(156, 156, 156, 0.10);
  --bb-border-strong: rgba(156, 156, 156, 0.25);
  --bb-border-hover: rgba(156, 156, 156, 0.24);
  --bb-border-input: rgba(156, 156, 156, 0.2);

  /* Accent Opacity Ladder */
  --bb-accent-02: rgba(209, 255, 0, 0.02);
  --bb-accent-04: rgba(209, 255, 0, 0.04);
  --bb-accent-05: rgba(209, 255, 0, 0.05);
  --bb-accent-06: rgba(209, 255, 0, 0.06);
  --bb-accent-08: rgba(209, 255, 0, 0.08);
  --bb-accent-10: rgba(209, 255, 0, 0.10);
  --bb-accent-12: rgba(209, 255, 0, 0.12);
  --bb-accent-15: rgba(209, 255, 0, 0.15);
  --bb-accent-20: rgba(209, 255, 0, 0.20);
  --bb-accent-25: rgba(209, 255, 0, 0.25);
  --bb-accent-40: rgba(209, 255, 0, 0.40);
  --bb-accent-50: rgba(209, 255, 0, 0.50);
  --bb-accent-75: rgba(209, 255, 0, 0.75);
  --bb-accent-90: rgba(209, 255, 0, 0.90);
}

/* === GOLD THEME === */
[data-theme="gold"] {
  --bb-lime: #DDD1BB;
  --bb-flare: #C4B7A2;

  --bb-canvas: #09090A;
  --bb-dark: #121213;
  --bb-surface: #151517;
  --bb-surface-alt: #1D1D20;
  --bb-surface-panel: #18181B;
  --bb-surface-console: #222225;
  --bb-surface-hover-strong: #28282C;

  --bb-cream: #F4F4F4;
  --bb-cream-alt: #E8E8E8;
  --bb-warm-white: #FFFFFF;
  --bb-dim: rgba(244, 244, 244, 0.52);
  --bb-muted: #DDDDDD;
  --bb-meta: #AFAFAF;

  --bb-gray-charcoal: #313131;
  --bb-gray-dim: #484848;
  --bb-gray-muted: #6E6E6E;
  --bb-gray-silver: #919191;

  --bb-border: rgba(255, 255, 255, 0.09);
  --bb-border-soft: rgba(255, 255, 255, 0.05);
  --bb-border-strong: rgba(255, 255, 255, 0.15);
  --bb-border-hover: rgba(255, 255, 255, 0.18);
  --bb-border-input: rgba(255, 255, 255, 0.12);

  /* Gold opacity ladder */
  --bb-accent-02: rgba(221, 209, 187, 0.02);
  --bb-accent-04: rgba(221, 209, 187, 0.04);
  --bb-accent-05: rgba(221, 209, 187, 0.05);
  --bb-accent-06: rgba(221, 209, 187, 0.06);
  --bb-accent-08: rgba(221, 209, 187, 0.08);
  --bb-accent-10: rgba(221, 209, 187, 0.10);
  --bb-accent-12: rgba(221, 209, 187, 0.12);
  --bb-accent-15: rgba(221, 209, 187, 0.15);
  --bb-accent-20: rgba(221, 209, 187, 0.20);
  --bb-accent-25: rgba(221, 209, 187, 0.25);
  --bb-accent-40: rgba(221, 209, 187, 0.40);
  --bb-accent-50: rgba(221, 209, 187, 0.50);
  --bb-accent-75: rgba(221, 209, 187, 0.75);
  --bb-accent-90: rgba(221, 209, 187, 0.90);
}

/* === shadcn/ui Mapping === */
:root {
  --background: var(--bb-canvas);          /* #050505 */
  --foreground: var(--bb-cream);           /* #F4F4E8 */
  --primary: var(--bb-lime);               /* #D1FF00 */
  --primary-foreground: var(--bb-dark);    /* #050505 */
  --secondary: var(--bb-surface-alt);      /* #1C1E19 */
  --muted: var(--bb-surface-panel);
  --muted-foreground: var(--bb-dim);
  --accent: var(--bb-accent-10);
  --accent-foreground: var(--bb-lime);
  --destructive: var(--bb-error);          /* #EF4444 */
  --border: var(--bb-border);
  --input: var(--bb-border-input);
  --ring: var(--bb-accent-40);
  --card: var(--bb-surface);               /* #0F0F11 */
  --card-foreground: var(--bb-cream);
  --popover: var(--bb-surface);
  --popover-foreground: var(--bb-cream);
  --radius: 0.5rem;
}

/* === Semantic Tokens === */
:root {
  --color-bg-void: #000000;
  --color-bg-base: #050505;
  --color-bg-surface: #0F0F11;
  --color-bg-surface-alt: #1C1E19;
  --color-bg-elevated: #1C1E19;
  --color-bg-overlay: rgba(61, 61, 61, 0.5);

  --color-text-base: rgb(244, 244, 232);
  --color-text-secondary: rgba(244, 244, 232, 0.7);
  --color-text-tertiary: rgba(244, 244, 232, 0.55);
  --color-text-muted: rgba(245, 244, 231, 0.4);

  --neon: #D1FF00;
  --neon-dim: rgba(209, 255, 0, 0.15);
  --neon-glow: rgba(209, 255, 0, 0.4);
  --lime-glow: rgba(209, 255, 0, 0.25);
  --lime-glow-soft: rgba(209, 255, 0, 0.1);

  --focus-brand: #D1FF00;
  --focus-neutral: #BDBDBD;
  --selection-bg: #050505;
  --selection-fg: #D1FF00;
  --warning-bg: rgba(245, 158, 11, 0.05);
  --warning-border: rgba(245, 158, 11, 0.2);
}
```

### Typography (from /brandbook/typography)

```css
:root {
  /* Font families */
  --font-bb-display: "TASA Orbiter", system-ui, sans-serif;  /* weight: 800 */
  --font-bb-sans: "Geist", "Inter", system-ui, sans-serif;   /* weight: 400-700 */
  --font-bb-mono: "Roboto Mono", monospace;                   /* weight: 400-500 */

  /* Alias from token-export */
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-mono: "Geist Mono", "Roboto Mono", monospace;

  /* Font weights */
  --font-weight-thin: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
}
```

**Type Scale:**

| Token | Size | Context |
|---|---|---|
| Display | 4rem (64px) | Hero text |
| H1 | 2.5rem (40px) | Page titles |
| H2 | 1.5rem (24px) | Section headings |
| Body | 1rem (16px) | Body copy |
| Small | 0.8rem (12.8px) | Descriptions |
| Label | 0.65rem (10.4px) | Navigation, status |
| Micro | 0.6rem (9.6px) | Footer metadata, class names |

**Line Heights:** 1.0 (compressed display), 1.2 (headlines)

**Letter Spacing:**
- `-0.03em` -- display headlines
- `0.04em` -- technical labels
- `0.08em` -- UI elements
- `0.10em` -- uppercase labels
- `0.12em` -- mono metadata
- `0.15em` -- button text, CTAs
- `0.20em` -- section numbers

**Fluid Typography:**
- `clamp(1.5rem, 4vw, 3rem)` -- responsive headers
- `clamp(2.2rem, 5.5vw, 5rem)` -- section headlines
- `clamp(2.2rem, 7vw, 6.5rem)` -- hero headlines
- `clamp(2.5rem, 6vw, 5.5rem)` -- overlay menu links
- `clamp(4rem, 10vw, 8rem)` -- error states

### Spacing (from /brandbook/spacing-layout)

```css
:root {
  /* Named tokens */
  --spacing-xs: 0.5rem;   /* 8px */
  --spacing-sm: 1rem;     /* 16px */
  --spacing-md: 2rem;     /* 32px */
  --spacing-lg: 3rem;     /* 48px */
  --spacing-xl: 4rem;     /* 64px */

  /* 14-step numeric scale */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 15px;
  --space-5: 20px;
  --space-6: 30px;
  --space-7: 40px;
  --space-8: 60px;
  --space-9: 80px;
  --space-10: 90px;
  --space-11: 120px;
  --space-12: 150px;
  --space-13: 180px;

  /* Z-Index layers */
  --layer-nav: 100;
  --layer-dropdown: 200;
  --layer-overlay: 300;
  --layer-modal: 400;
  --layer-toast: 500;

  /* Breakpoints */
  --bp-mobile: 767px;
  --bp-tablet: 768px;
  --bp-desktop: 1200px;

  /* Layout */
  --bb-gutter: 2rem;
}
```

### Surfaces & Borders (from /brandbook/surfaces)

```css
:root {
  /* Border Radius Scale */
  --radius-sm: 4px;
  --radius: 0.5rem;       /* 8px */
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  /* Glass effects */
  --glass-blur: blur(10px);
  --glass-blur-soft: blur(5px);
}
```

### Motion (from /brandbook/token-export)

```css
:root {
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-decel: cubic-bezier(0, 0, 0.2, 1);
}
```

---

## 2. Buttons (from /brandbook/buttons)

### Production Roles

| Component | Purpose | Context |
|---|---|---|
| SiteCta | Primary page/form actions | Marketing surfaces |
| Button | Generic product/app-shell action | Product UI |
| PrimaryLink | Inline editorial/navigation | Low visual weight |
| CtaButton | Legacy marketing primitive | Deprecated |

### Variant Styles

```tsx
// Four variants documented
const buttonVariants = {
  primary: {
    // Solid lime background
    className: "bg-[var(--bb-lime)] text-[var(--bb-dark)] hover:bg-[var(--bb-accent-90)] active:bg-[var(--bb-accent-75)] font-bold",
    // Transitions
    transition: "all 150ms var(--ease-smooth)"
  },
  secondary: {
    // Surface background with border
    className: "bg-[var(--bb-surface)] text-[var(--bb-cream)] border border-[var(--bb-border)] hover:border-[var(--bb-border-hover)] hover:bg-[var(--bb-surface-hover-strong)]"
  },
  ghost: {
    // Transparent with hover fill
    className: "bg-transparent text-[var(--bb-cream)] hover:bg-[var(--bb-accent-05)]"
  },
  destructive: {
    // Error/delete variant
    className: "bg-[var(--bb-error)] text-white hover:bg-[var(--bb-error)]/90"
  }
};
```

### Size Definitions

```tsx
const buttonSizes = {
  sm: {
    className: "px-3 py-1.5 text-[11px]",
    // ~28px height
  },
  md: {
    className: "px-4 py-2 text-[13px]",
    // ~36px height
  },
  lg: {
    className: "px-6 py-3 text-[14px]",
    // ~44px height
  }
};
```

### States

```tsx
// Loading state
const loadingState = {
  className: "opacity-70 pointer-events-none",
  // Spinner: inline SVG or lucide Loader2 icon with animate-spin
};

// Disabled state
const disabledState = {
  className: "opacity-40 pointer-events-none cursor-not-allowed"
};
```

### AccentButton (from LP Sections)

```tsx
// CTA button with arrow glyph -- used across landing pages
const AccentButton = ({ variant = "lime", arrow = true, href, children }) => (
  <a
    href={href}
    className={cn(
      "inline-flex items-center gap-2",
      "px-5 py-3.5 min-w-[200px]",
      "text-[11px] font-bold uppercase tracking-[0.15em]",
      "transition-all duration-200",
      variant === "lime" && "bg-[#D1FF00] text-[#050505] hover:bg-[#D1FF00]/90",
      variant === "dark" && "bg-[#050505] text-[#F4F4E8] border border-white/15 hover:bg-white/5",
      variant === "ghost" && "bg-transparent text-[#F4F4E8] hover:bg-white/5"
    )}
  >
    {children}
    {arrow && <span>&#8599;</span>} {/* Arrow glyph: ↗ */}
  </a>
);
```

---

## 3. Cards (from /brandbook/cards)

### Card Variants

```tsx
// Default Card
const defaultCard = {
  className: cn(
    "rounded-[var(--radius-lg)] p-6",
    "bg-[var(--bb-surface)]",
    "border border-[var(--bb-border)]"
  )
};

// Elevated Card
const elevatedCard = {
  className: cn(
    "rounded-[var(--radius-lg)] p-6",
    "bg-[var(--bb-surface)]",
    "border border-[var(--bb-border)]",
    "shadow-[0_4px_24px_rgba(0,0,0,0.3)]"  // Inferred elevation shadow
  )
};

// Outlined Card
const outlinedCard = {
  className: cn(
    "rounded-[var(--radius-lg)] p-6",
    "bg-transparent",
    "border border-[var(--bb-border)]"
  )
};
```

### Card with Actions (Project Cards)

```html
<div class="rounded-lg border border-[var(--bb-border)] bg-[var(--bb-surface)] overflow-hidden">
  <!-- Header -->
  <div class="p-4 flex items-center justify-between">
    <div>
      <span class="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--bb-dim)]">
        AI Automation
      </span>
      <h3 class="text-sm font-semibold text-[var(--bb-cream)]">Project Alpha</h3>
    </div>
    <span class="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-[var(--bb-accent-10)] text-[var(--bb-lime)]">
      Active
    </span>
  </div>
  <!-- Body -->
  <div class="px-4 pb-4">
    <p class="text-[13px] text-[var(--bb-dim)]">
      Workflow automation project with 12 active squads...
    </p>
  </div>
  <!-- Actions -->
  <div class="border-t border-[var(--bb-border)] p-4 flex gap-2">
    <button class="px-4 py-2 bg-[var(--bb-lime)] text-[var(--bb-dark)] text-[11px] font-bold uppercase tracking-[0.12em] rounded">
      Open
    </button>
    <button class="px-4 py-2 text-[var(--bb-dim)] text-[11px] font-mono uppercase tracking-[0.12em] hover:text-[var(--bb-cream)]">
      Archive
    </button>
  </div>
</div>
```

---

## 4. Forms (from /brandbook/forms)

### Text Input

```html
<div class="space-y-1.5">
  <label class="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[var(--bb-dim)]">
    Full Name
  </label>
  <input
    type="text"
    class="w-full px-3 py-2 bg-transparent border border-[var(--bb-border-input)] rounded-[var(--radius)] text-sm text-[var(--bb-cream)] placeholder:text-[var(--bb-dim)] focus:border-[var(--bb-lime)] focus:outline-none focus:ring-1 focus:ring-[var(--bb-accent-40)] transition-colors"
    placeholder="Enter your name"
  />
  <p class="text-[11px] text-[var(--bb-meta)]">As it appears on your ID</p>
</div>
```

### Select

```html
<select class="w-full px-3 py-2 bg-transparent border border-[var(--bb-border-input)] rounded-[var(--radius)] text-sm text-[var(--bb-cream)] focus:border-[var(--bb-lime)] focus:ring-1 focus:ring-[var(--bb-accent-40)]">
  <option>Select a role...</option>
  <option>Admin</option>
  <option>Editor</option>
  <option>Viewer</option>
</select>
```

### Toggle / Switch

```tsx
// Toggle implementation
<button
  role="switch"
  aria-checked={checked}
  onClick={() => setChecked(!checked)}
  className={cn(
    "relative inline-flex h-5 w-10 items-center rounded-full transition-colors",
    "border",
    checked
      ? "bg-[var(--bb-lime)] border-[var(--bb-lime)]"
      : "bg-transparent border-[var(--bb-border)]"
  )}
>
  <span
    className={cn(
      "inline-block h-4 w-4 rounded-full bg-white transition-transform",
      checked ? "translate-x-5" : "translate-x-0.5"
    )}
  />
</button>
```

### SegmentedControl

```tsx
// Single-choice compact selector
const SegmentedControl = ({ options, value, onChange }) => (
  <div className="inline-flex rounded-[var(--radius)] border border-[var(--bb-border)] overflow-hidden">
    {options.map((option) => (
      <button
        key={option.value}
        onClick={() => onChange(option.value)}
        className={cn(
          "px-4 py-2 text-[11px] font-mono uppercase tracking-[0.1em] transition-colors",
          value === option.value
            ? "bg-[var(--bb-lime)] text-[var(--bb-dark)]"
            : "bg-transparent text-[var(--bb-dim)] hover:bg-[var(--bb-accent-05)]"
        )}
      >
        {option.label}
      </button>
    ))}
  </div>
);
```

### Advanced Form Components

```
- BbDateRangePicker: Date range with country selector
- BbPhoneInput: Phone with country code
- BbFileInput: Drag & drop -- "Drag & drop or click to browse. Accepted: image/*"
- BbInlineEdit: "Click to edit me" pattern
- BbMultiLanguageInput: PT/EN language tabs with "1/2" counter
- BbArrayInput: "2/5 items" with Add button
- Rich Text Editor: Minimal toolbar, Full toolbar, Read-only variants
```

### Composed Form Example

```html
<form class="space-y-6 p-6 bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-[var(--radius-lg)]">
  <!-- Required field with asterisk -->
  <div class="space-y-1.5">
    <label class="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[var(--bb-dim)]">
      Project Name <span class="text-[var(--bb-error)]">*</span>
    </label>
    <input type="text" class="w-full px-3 py-2 bg-transparent border border-[var(--bb-border-input)] rounded-[var(--radius)] text-sm" />
  </div>

  <!-- SegmentedControl for Priority -->
  <div class="space-y-1.5">
    <label class="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[var(--bb-dim)]">Priority</label>
    <!-- Low | Medium | High -->
  </div>

  <!-- Checkbox -->
  <label class="flex items-center gap-2 text-sm text-[var(--bb-cream)]">
    <input type="checkbox" class="accent-[var(--bb-lime)]" />
    Mark as urgent
  </label>

  <!-- Action buttons -->
  <div class="flex gap-3">
    <button class="px-6 py-2 bg-[var(--bb-lime)] text-[var(--bb-dark)] font-bold text-[11px] uppercase tracking-[0.12em] rounded">
      Create Project
    </button>
    <button class="px-6 py-2 text-[var(--bb-dim)] text-[11px] font-mono uppercase tracking-[0.12em]">
      Cancel
    </button>
  </div>
</form>
```

---

## 5. Component Catalog (from /brandbook/components)

### Component Index

| Category | Components | Variants |
|---|---|---|
| Action | Buttons, Inputs | 4, 3 |
| Live | Badges, Switches | 5, 1 |
| Option | Checkboxes, Sliders, Spinners, Progress | 1, 1, 3, 3 |
| Data Display | Cards, Data Grid, Tables, Charts | 3, 1, 1, 2 (bar+donut) |
| Feedback | Alert, Toast, Modal | 3 |

### Spinner Variants

```css
/* Small spinner */
.spinner-sm {
  width: 16px;
  height: 16px;
  border: 2px solid var(--bb-border);
  border-top-color: var(--bb-lime);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Medium */
.spinner-md { width: 24px; height: 24px; }

/* Large */
.spinner-lg { width: 32px; height: 32px; }
```

### Progress Bar Variants

```html
<!-- Default progress bar -->
<div class="h-2 w-full bg-[var(--bb-surface-alt)] rounded-full overflow-hidden">
  <div
    class="h-full bg-[var(--bb-lime)] rounded-full transition-all duration-500"
    style="width: 65%"
  />
</div>
```

---

## 6. Advanced Components (from /brandbook/advanced)

### Tabs

```tsx
// Two variants: default and smooth
const Tabs = ({ variant = "default", items, activeTab, onChange }) => (
  <div>
    {/* Tab headers */}
    <div className="flex border-b border-[var(--bb-border)]">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            "px-4 py-3 text-sm font-medium transition-colors relative",
            activeTab === item.id
              ? "text-[var(--bb-cream)]"
              : "text-[var(--bb-dim)] hover:text-[var(--bb-cream)]"
          )}
        >
          {item.label}
          {/* Active indicator -- underline */}
          {activeTab === item.id && (
            <motion.div
              layoutId={variant === "smooth" ? "tab-indicator" : undefined}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--bb-lime)]"
            />
          )}
        </button>
      ))}
    </div>
    {/* Tab content */}
    <div className="p-4">
      {items.find(i => i.id === activeTab)?.content}
    </div>
  </div>
);
// "smooth" variant uses Framer Motion layoutId for sliding underline
```

### Accordion

```tsx
const Accordion = ({ items, defaultOpen = "01" }) => {
  const [openId, setOpenId] = useState(defaultOpen);

  return (
    <div className="divide-y divide-[var(--bb-border)]">
      {items.map((item) => (
        <div key={item.id} className={cn(
          "transition-colors",
          openId === item.id && "bg-[var(--bb-accent-04)]"
        )}>
          <button
            onClick={() => setOpenId(openId === item.id ? null : item.id)}
            className="w-full flex items-center justify-between p-4"
          >
            <div className="flex items-center gap-3">
              {/* Number badge */}
              <span className="h-6 w-6 rounded-full bg-[var(--bb-lime)] text-[var(--bb-dark)] flex items-center justify-center text-[10px] font-bold">
                {item.id}
              </span>
              <span className="text-sm font-medium text-[var(--bb-cream)]">{item.title}</span>
            </div>
            {/* Toggle icon -- Plus rotates 45deg to become X */}
            <Plus className={cn(
              "w-4 h-4 text-[var(--bb-dim)] transition-transform duration-200",
              openId === item.id && "rotate-45"
            )} />
          </button>
          {/* Content with collapse animation */}
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 text-sm text-[var(--bb-dim)]">
                  {item.content}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
```

### Stepper (Horizontal)

```tsx
// 5 steps: Discovery, Architecture, Implementation, QA Review, Deploy
const HorizontalStepper = ({ steps, currentStep }) => (
  <div className="flex items-center">
    {steps.map((step, i) => (
      <Fragment key={i}>
        {/* Step circle */}
        <div className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-bold",
          i < currentStep && "bg-[var(--bb-lime)] text-[var(--bb-dark)]",     // completed
          i === currentStep && "border-2 border-[var(--bb-lime)] text-[var(--bb-lime)]", // active
          i > currentStep && "border border-[var(--bb-border)] text-[var(--bb-dim)]"    // future
        )}>
          {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
        </div>
        {/* Connector line */}
        {i < steps.length - 1 && (
          <div className={cn(
            "flex-1 h-[1px] mx-2",
            i < currentStep ? "bg-[var(--bb-lime)]" : "bg-[var(--bb-border)]"
          )} />
        )}
      </Fragment>
    ))}
  </div>
);
```

### Stepper (Vertical)

```tsx
// Same logic, vertical layout
// 4 steps: Onboarding, Data Integration, Training, Go Live
const VerticalStepper = ({ steps, currentStep }) => (
  <div className="space-y-0">
    {steps.map((step, i) => (
      <div key={i} className="flex gap-4">
        {/* Step indicator + vertical line */}
        <div className="flex flex-col items-center">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold",
            /* same color logic as horizontal */
          )}>
            {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "w-[1px] flex-1 min-h-[40px]",
              i < currentStep ? "bg-[var(--bb-lime)]" : "bg-[var(--bb-border)]"
            )} />
          )}
        </div>
        {/* Step content */}
        <div className="pb-8">
          <h4 className="text-sm font-medium">{step.title}</h4>
          <p className="text-[13px] text-[var(--bb-dim)]">{step.description}</p>
        </div>
      </div>
    ))}
  </div>
);
```

---

## 7. Feedback Components (from /brandbook/feedback)

### Alert Variants

```tsx
const alertVariants = {
  info: {
    border: "border-[var(--bb-blue)]",
    bg: "bg-[rgba(0,153,255,0.05)]",
    icon: "text-[var(--bb-blue)]",
    // Info icon from lucide
  },
  success: {
    border: "border-[#22C55E]",
    bg: "bg-[rgba(34,197,94,0.05)]",
    icon: "text-[#22C55E]",
  },
  warning: {
    border: "border-[#F59E0B]",
    bg: "bg-[rgba(245,158,11,0.05)]",
    icon: "text-[#F59E0B]",
  },
  error: {
    border: "border-[var(--bb-error)]",
    bg: "bg-[rgba(239,68,68,0.05)]",
    icon: "text-[var(--bb-error)]",
  }
};
```

### Toast Notifications

```tsx
// Positioned notifications with dismiss
const Toast = ({ type, message, onDismiss }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
    className="flex items-center gap-3 px-4 py-3 bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-[var(--radius-lg)] shadow-lg"
  >
    <span className="text-sm">{message}</span>
    <button onClick={onDismiss} className="text-[var(--bb-dim)] hover:text-[var(--bb-cream)]">
      &#10005;
    </button>
  </motion.div>
);
```

### Empty States

```
Variants: Default, Search, Error, Permissions
Each with icon + headline + description + optional CTA
```

### Loading Overlay

```tsx
// SM, MD, LG size options
const LoadingOverlay = ({ size = "md" }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-[var(--bb-dark)]/80 backdrop-blur-sm">
    <div className={cn(
      "border-2 border-[var(--bb-border)] border-t-[var(--bb-lime)] rounded-full animate-spin",
      size === "sm" && "w-4 h-4",
      size === "md" && "w-8 h-8",
      size === "lg" && "w-12 h-12"
    )} />
  </div>
);
```

### Confirm Sheet

```tsx
// Default, Destructive, Loading states
const ConfirmSheet = ({ variant = "default", title, description, onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-[var(--layer-modal)] flex items-end sm:items-center justify-center">
    {/* Backdrop */}
    <div className="absolute inset-0 bg-[var(--color-bg-overlay)] backdrop-blur-sm" />
    {/* Sheet */}
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative w-full max-w-md p-6 bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-t-[var(--radius-xl)] sm:rounded-[var(--radius-xl)]"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-[var(--bb-dim)]">{description}</p>
      <div className="mt-6 flex gap-3 justify-end">
        <button onClick={onCancel} className="px-4 py-2 text-sm text-[var(--bb-dim)]">Cancel</button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className={cn(
            "px-4 py-2 text-sm font-bold rounded",
            variant === "destructive"
              ? "bg-[var(--bb-error)] text-white"
              : "bg-[var(--bb-lime)] text-[var(--bb-dark)]"
          )}
        >
          {loading ? "Processing..." : "Confirm"}
        </button>
      </div>
    </motion.div>
  </div>
);
```

---

## 8. Navigation Components (from /brandbook/navigation)

### Search Modal (Cmd+K)

```tsx
const BbSearchModal = ({ open, onOpenChange, items, placeholder = "Search...", emptyMessage }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[var(--layer-overlay)]"
          onClick={() => onOpenChange(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
          className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-[var(--radius-xl)] z-[var(--layer-modal)] overflow-hidden"
        >
          <input
            type="text"
            placeholder={placeholder}
            className="w-full px-4 py-3 bg-transparent border-b border-[var(--bb-border)] text-sm focus:outline-none"
            autoFocus
          />
          {/* Results list */}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
```

### Sidebar

```tsx
// Expanded: 240px | Collapsed: 60px (icon-only)
const Sidebar = ({ expanded, items }) => (
  <aside className={cn(
    "h-screen bg-[var(--bb-surface)] border-r border-[var(--bb-border)] transition-all duration-300",
    expanded ? "w-[240px]" : "w-[60px]"
  )}>
    {/* AIOX Squad header */}
    <div className="p-4 border-b border-[var(--bb-border)]">
      <Logo />
      {expanded && <span className="text-[10px] font-mono text-[var(--bb-dim)]">AIOX Squad</span>}
    </div>
    {/* Navigation items */}
    <nav className="p-2">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius)] text-[var(--bb-dim)] hover:bg-[var(--bb-accent-05)] hover:text-[var(--bb-cream)] transition-colors"
        >
          <item.icon className="w-4 h-4 flex-shrink-0" />
          {expanded && <span className="text-sm">{item.label}</span>}
        </a>
      ))}
    </nav>
  </aside>
);
// Items: Dashboard, Library, Products, Leads, Students, Repository, Mentors, Reports
```

### Tabs (Navigation Variant)

```tsx
// Two variants: "default" and "smooth" (animated sliding underline)
// Example tabs: Overview, Tokens, Usage, Metrics, Config, Logs
```

### Bottom Bar (Mobile)

```tsx
// 5 items: Home, Likes, Menu, Saved, Config
const BottomBar = ({ items, active }) => (
  <nav className="fixed bottom-0 left-0 right-0 z-[var(--layer-nav)] bg-[var(--bb-surface)] border-t border-[var(--bb-border)]">
    <div className="flex justify-around py-2">
      {items.map((item) => (
        <button
          key={item.id}
          className={cn(
            "flex flex-col items-center gap-1 p-2 text-[10px] font-mono uppercase",
            active === item.id ? "text-[var(--bb-lime)]" : "text-[var(--bb-dim)]"
          )}
        >
          <item.icon className="w-5 h-5" />
          {item.label}
        </button>
      ))}
    </div>
  </nav>
);
```

---

## 9. Tables (from /brandbook/tables)

### 7 Table Variants

```
1. Standard: ID, Name, Role, Status, Score
2. With Export: Metrics view + export button
3. With Filters: Search-enabled
4. With Pagination: ‹ 1 2 3 ›
5. Empty State: "No data" message
6. Compact Metrics: Condensed layout
7. Dashboard Shell: User dropdown + language + export
```

### Table Styling Pattern

```html
<table class="w-full text-sm">
  <thead>
    <tr class="border-b border-[var(--bb-border)]">
      <th class="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-[0.12em] text-[var(--bb-dim)]">
        Name
      </th>
    </tr>
  </thead>
  <tbody class="divide-y divide-[var(--bb-border-soft)]">
    <tr class="hover:bg-[var(--bb-accent-02)] transition-colors">
      <td class="px-4 py-3 text-[var(--bb-cream)]">Value</td>
    </tr>
  </tbody>
</table>
```

---

## 10. Charts (from /brandbook/charts)

### 12 Chart Types

```
01. Bar Chart (SVG) -- monthly + quarterly
02. Donut Chart (SVG) -- category distribution
03. Line Chart -- single + multi-line + gridless
04. Area Chart -- monotone + multi-area + linear
05. Pie Chart -- pie + donut + labeled
06. Radar Chart -- single + multi-series
07. Rings Chart -- multi-ring progress (85%, 62%, 45%)
08. Animated Number -- integer, %, R$, K suffix
09. Radial Bar Chart -- browser comparison + gauge
10. Composed Chart -- bar + line + area combos
11. World Map -- markers + zoomable EqualEarth projection
12. KPI Grid (DnD) -- draggable metric cards with trends
```

### Chart Color Tokens

```css
:root {
  --bb-chart-1: var(--bb-lime);    /* Primary data series */
  --bb-chart-2: var(--bb-blue);    /* Secondary */
  --bb-chart-3: var(--bb-flare);   /* Tertiary */
  --bb-chart-4: var(--bb-muted);   /* Quaternary */
}
```

### KPI Grid Cards

```html
<div class="p-4 bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-[var(--radius-lg)]">
  <span class="text-[10px] font-mono uppercase tracking-[0.15em] text-[var(--bb-dim)]">Revenue</span>
  <div class="mt-1 text-2xl font-black text-[var(--bb-cream)]">R$ 1.2M</div>
  <div class="mt-1 flex items-center gap-1 text-[11px]">
    <span class="text-[#22C55E]">↑</span>
    <span class="text-[#22C55E]">+12.5%</span>
  </div>
</div>
```

---

## 11. States & Loading (from /brandbook/states)

### Skeleton Variants

```css
/* Text lines skeleton */
.skeleton-text {
  height: 12px;
  border-radius: var(--radius);
  background: linear-gradient(
    90deg,
    var(--bb-surface-alt) 25%,
    var(--bb-surface-hover-strong) 50%,
    var(--bb-surface-alt) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Card skeleton */
.skeleton-card {
  border-radius: var(--radius-lg);
  /* Same shimmer animation */
}

/* Image placeholder */
.skeleton-image {
  aspect-ratio: 16/9;
  /* Same shimmer */
}
```

### Progress Bars

```
States: 25%, 50%, 75%, 100%
Implementation: see Section 5 above
```

---

## 12. Lists (from /brandbook/lists)

### List Items with Status

```html
<div class="divide-y divide-[var(--bb-border-soft)]">
  <div class="flex items-center justify-between p-4 hover:bg-[var(--bb-accent-02)] transition-colors">
    <div>
      <h4 class="text-sm font-medium text-[var(--bb-cream)]">Workflow Automation</h4>
      <p class="text-[12px] text-[var(--bb-dim)]">Connect your tools and eliminate manual handoffs</p>
    </div>
    <!-- Status badges -->
    <!-- Active: bg-[rgba(34,197,94,0.1)] text-[#22C55E] -->
    <!-- In Progress: bg-[var(--bb-accent-10)] text-[var(--bb-lime)] -->
    <!-- Planned: bg-[var(--bb-surface-alt)] text-[var(--bb-dim)] -->
    <!-- Blocked: bg-[rgba(239,68,68,0.1)] text-[var(--bb-error)] -->
    <span class="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.1em]">
      Active
    </span>
  </div>
</div>
```

---

## 13. Reis IA Cross-Reference

### Token System Comparison

| AIOX Token | Reis IA Equivalent | Action |
|---|---|---|
| --bb-dark: #050505 | --bg-primary: #000000 | Use Reis IA's pure black |
| --bb-lime: #D1FF00 | --accent: muted gold/amber | Complete replacement |
| --bb-cream: #F4F4E8 | --text-primary: #FFFFFF | Use pure white |
| --font-bb-sans: Geist | --font-sans: Inter | Keep Inter |
| --font-bb-mono: Roboto Mono | N/A | Consider adding mono |
| --radius: 0.5rem | TBD | Good baseline to adopt |

### Architecture Patterns to Adopt

1. **Accent opacity ladder** (14 steps from 0.02 to 0.90) -- excellent for consistent transparency
2. **shadcn/ui token mapping** -- direct compatibility with component library
3. **Semantic token layering** (raw > surface > semantic) -- clean architecture
4. **Gap-px hairline grid** -- elegant visual technique
5. **Mono label system** (10-11px, uppercase, 0.15-0.2em tracking) -- clean tech labels
6. **Section shell pattern** (dark/light variant, fullBleed prop) -- flexible sections

### Component Patterns to Adapt

1. **AccentButton** with arrow glyph -- adapt for Reis IA CTAs
2. **Toggle/Switch** implementation -- clean, minimal
3. **Accordion with numbered badges** -- for FAQ sections
4. **Staircase layout** -- for methodology/process visualization
5. **KPI cards with trend indicators** -- for case study results

### Skip for Reis IA

| Pattern | Reason |
|---|---|
| Pricing table/tiers | No SaaS patterns -- all CTAs go to /agendar or /aplicar |
| ROI Calculator | Tool-based, conflicts with premium consulting positioning |
| Dashboard shell | Product UI pattern, not applicable |
| Notification center | Product UI pattern |
| DnD KPI grid | Too interactive for marketing site |
