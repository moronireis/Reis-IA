# AIOX — Complete Component Catalog
Last updated: 2026-03-16
Source: https://brand.aioxsquad.ai/
Total components: 60+

## 1. Action Components

### Buttons (page: /brandbook/buttons)

#### Production Roles
| Component | Purpose |
|-----------|---------|
| `SiteCta` | Primary marketing surface action |
| `Button` | Generic product/app-shell primitive |
| `PrimaryLink` | Inline editorial/navigation (low visual weight) |
| `CtaButton` | Legacy marketing primitive |

#### Variants
| Variant | Background | Text | Border |
|---------|-----------|------|--------|
| Primary | --bb-lime (#D1FF00) | --bb-dark | none |
| Secondary | --bb-surface | --bb-cream | --bb-border |
| Ghost | transparent | --bb-cream | none |
| Delete | destructive red | white | none |

#### Sizes
- **Small**: Compact inline, smaller padding
- **Medium**: Default, standard padding
- **Large**: Hero/CTA, larger padding (px-8 py-5)

#### States
- **Default**: Normal interactive
- **Loading**: Spinner indicator replacing text
- **Disabled**: Reduced opacity, cursor-not-allowed

#### CTA Button Pattern (from home page)
```html
<a class="inline-flex items-center bg-bb-ink border border-bb-border-strong
   px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-5 text-bb-cream font-mono
   text-sm md:text-base font-medium relative overflow-hidden
   hover:bg-bb-cream hover:text-bb-surface hover:border-bb-cream
   transition-all duration-300 w-fit cursor-pointer group">
  Button Text
  <!-- Optional dot-grid icon -->
</a>
```

### AccentButton (from LP Sections)
Atomic CTA button used across landing page sections.

---

## 2. Cards (page: /brandbook/cards)

#### Base Variants
| Variant | Style |
|---------|-------|
| Default | bg: --bb-surface, border: --bb-border |
| Elevated | bg: --bb-surface, box-shadow present |
| Outlined | bg: transparent, border: --bb-border-strong |

#### Action Cards
Cards with status badges, title, category label. Used in dashboards.

#### Stat Cards (from LP Sections)
- 3 sizes (sm, md, lg)
- 3 color variants
- Numeric display with label

---

## 3. Form Components (page: /brandbook/forms)

#### Wrapper Components
| Component | Purpose |
|-----------|---------|
| `Field` | Canonical wrapper for form fields |
| `FieldLabel` | Label companion |
| `SegmentedControl` | Pill selector |
| `BbFormField` | Legacy abstraction |

#### Input Types
- **Text Input**: Label + helper text + input field
- **Textarea**: Multi-line with character count (max 500)
- **Select**: Dropdown with options
- **Toggle/Switch**: On/off boolean
- **Checkbox**: Multi-select options
- **Segmented Control**: Pill-style single select (Budget: Under $10k / $10k-$25k / $25k+)

#### Input States
- Default, Focus (--focus-brand: #D1FF00), Disabled, Error, Filled

#### Composed Form Example
Project Name* + Description + Priority selector + Mark as urgent toggle + Create/Cancel buttons

---

## 4. Feedback Components (page: /brandbook/feedback)

#### Alerts (4 variants)
| Type | Color | Usage |
|------|-------|-------|
| Information | --bb-blue | Informational messages |
| Success | --bb-lime | Confirmation |
| Warning | --warning (#F59E0B) | Caution |
| Error | --bb-error (#EF4444) | Errors |

#### Toasts (4 variants)
Floating notifications: Success ("Changes saved"), Error, Warning, Info

#### Modal
Dialog overlay with backdrop (--bb-surface-overlay)

#### Notification Center
Badge with unread count, expandable notification list

#### Empty States (4 variants)
- "No items" — neutral empty state
- "No results" — search empty state
- "Error" — error state with retry
- "Access denied" — permission state

#### Loading Overlay
Spinner with sizes: SM, MD, LG

#### Confirm Sheet (3 states)
- Default — standard confirmation
- Destructive — red/danger confirmation
- Loading — processing state

---

## 5. State Components (page: /brandbook/states)

#### Spinners
3 sizes: Small, Medium, Large

#### Progress Bars
4 levels: 25%, 50%, 75%, 100%

#### Skeleton Screens
- Text Lines — paragraph placeholder
- Card Skeleton — card component placeholder
- Image Placeholder — image loading state

---

## 6. Data Components

### Tables (page: /brandbook/tables)

#### Standard Table
Full data table with columns: ID, Name, Role, Status, Score

#### Compact Metrics Table
KPI-style: Metric, Value, Change (with +/- indicators)

### Lists (page: /brandbook/lists)

#### Status List
Items with status badges: Active, In Progress, Planned, Blocked

#### KPI Cards
Numerical data display: Deployments 50+, Time Saved 83%, etc.

### Charts (page: /brandbook/charts)

| Chart Type | Variants |
|------------|----------|
| Bar Chart | Monthly, quarterly |
| Donut Chart | Categorized segments |
| Line Chart | Single, multi-line |
| Area Chart | Monotone, multi-area |
| Pie Chart | With/without labels |
| Radar Chart | Single, multi-series |
| Rings Chart | Percentage metrics |
| Animated Number | Integer, %, currency, compact |
| Chart Tooltip | Multi-item with formatters |

---

## 7. Navigation Components

### BrandbookSiteNav
- Fixed header with logo, primary links, dropdown menus
- Theme toggle (Lime/Gold)
- Responsive: collapses to mobile menu

### Sidebar Navigation (used on Movimento page)
- Section-based jump links
- Grouped by category (Fundamentos, Estrategia, etc.)
- Scroll-aware active state

### Footer
- Multi-column sitemap layout
- Section headers: [brandbook], [design system], [showcase], [socials]
- Numbered links (0.0, 1.0, 2.0, etc.)

---

## 8. Layout Components

### SectionShell (atom)
Base wrapper for all landing page sections. Supports `variant="dark"` or `variant="light"`.

### SectionHeader (atom)
Standardized section heading with mono label, section number, and title.

### MonoLabel
Technical label component: 10-11px Roboto Mono, uppercase, tracking 0.15em-0.2em. Takes `index` prop.

---

## 9. Pattern Components (page: /brandbook/patterns)

### Grid Patterns (8)
`.pattern-dot-grid`, `.pattern-dot-grid--dense`, `.pattern-dot-grid--sparse`, `.pattern-crosshair-grid`, `.pattern-crosshair-grid--tight`, `.pattern-wireframe-perspective`, `.pattern-symbol-grid`, `.pattern-plus-grid`

### HUD Frames (8)
`.frame-bracket`, `.frame-bracket--full`, `.frame-tech`, `.frame-tech--sm`, `.frame-tech--lg`, `.frame-notch-tr`, `.frame-notch-bl`, `.frame-notch-both`

### Hazard Patterns (4)
`.pattern-hazard`, `.pattern-hazard--thin`, `.pattern-hazard--subtle`, `.bar-warning`

### Textures (5)
`.pattern-scanlines`, `.pattern-scanlines--heavy`, `.pattern-noise`, `.pattern-data-rain`, `.pattern-industrial`

### Dividers (4)
`.divider-tech`, `.divider-arrow`, `.divider-dashed`, `.divider-double`

### Circuit Traces (2)
`.pattern-circuit-h`, `.pattern-circuit-board`

---

## 10. Section Components (pages: /brandbook/sections, /brandbook/lp-sections)

| Section | Purpose | Complexity |
|---------|---------|-----------|
| Hero | Main value prop | High (video, ticker, watermark) |
| Logo Ticker | Trust signal | Medium (infinite scroll) |
| Stats Grid | Key metrics | Low |
| Problem Gallery | Pain points | Medium |
| Services Cards | Offerings | Medium (6-card grid) |
| How It Works | Process | High (staircase layout) |
| Case Study | Success story | Medium |
| Testimonials | Social proof | Medium (highlight grid) |
| Pricing | Tiers (NOTE: not for Reis IA) | High |
| FAQ | Questions | Medium (accordion) |
| CTA Forms | Conversion | High (multiple variants) |
| Job Listings | Careers | Low |
| ROI Calculator | Interactive tool | High |
| Contact | Details | Low |
| Newsletter | Email capture | Low |
| Footer | Sitemap | Medium |

---

## 11. Advanced Components (page: /brandbook/advanced)

### Tabs
Multi-view content with tab headers. Views: overview, metrics, configuration, logging.

### Accordion
Collapsible content sections with expand/collapse arrow. Used for FAQ.

### Steppers
- **Horizontal**: Discovery → Architecture → Implementation → QA → Deploy
- **Vertical**: Onboarding → Data Integration → Training → Go Live
- States: completed (checkmark), active (highlighted), upcoming (dimmed)

---

## 12. Effect Components (page: /brandbook/effects)

### Ticker Strip
Infinite scrolling technology tags. CSS animation: `ticker 30s linear infinite`.

### Badge Variants
5 colors: Lime, Blue, Error, Surface, Solid

### Glow & Pulse
Neon Glow, Spin animation, Pulse animation

---

## 13. Showcase Components

### ShowcaseGalleryPage
Reusable gallery component with:
- Tag-based filtering
- Grid layout (3 columns configurable)
- Aspect ratio support (3:4, 4:3)
- Image + metadata display
- Category badges

### SquadCalculator (interactive tool)
- Squad selector with checkboxes
- Category filtering
- CLT tax toggle
- Quick scenario presets
- Dynamic cost calculation
- Results display with economy percentage

---

## Reis IA Compatibility Notes

### Directly Adoptable
- Button variant system (Primary/Secondary/Ghost/Destructive)
- Card variants (Default/Elevated/Outlined)
- Form component architecture (Field + FieldLabel wrappers)
- Feedback system (Alerts, Toasts, Modal, Empty States)
- State components (Spinners, Progress, Skeletons)
- Table patterns (Standard + Compact Metrics)
- Accordion, Tabs, Steppers
- MonoLabel pattern
- SectionShell + SectionHeader atoms

### Requires Color Adaptation
- All components use lime (#D1FF00) → replace with gold/amber
- Dark surface (#0F0F11) → may need adjustment to pure black (#000000)

### Not Applicable to Reis IA
- Pricing tables/tier cards (per project rules)
- Squad Calculator (AIOX-specific tool)
- Apparel/sneaker/jacket showcase galleries
- Pitch Deck / Investor Data Room
