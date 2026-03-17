# AIOX Squad -- Component Catalog

Last updated: 2026-03-16
Source: https://brand.aioxsquad.ai/
Edition: V1.0 // Dark Cockpit Edition
Framework: Next.js + React Server Components + Tailwind CSS v4.2.1

---

## TABLE OF CONTENTS

1. [Action Components](#1-action-components)
2. [Live Components](#2-live-components)
3. [Option Components](#3-option-components)
4. [Data & Visualization](#4-data--visualization)
5. [Feedback Components](#5-feedback-components)
6. [Layout Components](#6-layout-components)
7. [Navigation Components](#7-navigation-components)
8. [Advanced Components](#8-advanced-components)
9. [Pattern Components](#9-pattern-components)
10. [Section Components](#10-section-components)

---

## 1. ACTION COMPONENTS

### 1A. Buttons (4 variants)

**Base styling (all buttons):**
- Font: `var(--font-mono)` (monospace)
- Text: uppercase, `letter-spacing: 0.08em`, `font-weight: 500`
- Layout: `display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem`
- Transition: `all 0.2s ease`
- Border: none (default)
- Cursor: pointer

#### Primary Button
- **Background**: `var(--lime)` (#D1FF00)
- **Text color**: `var(--dark)` (#050505)
- **Hover**: `box-shadow: 0 0 20px var(--lime-glow)` (neon glow effect)
- **Use case**: Main CTAs, primary actions

#### Secondary Button
- **Background**: transparent
- **Text color**: `var(--cream)` (warm white)
- **Border**: `1px solid var(--border)` (15% gray)
- **Hover**: `border-color: var(--lime); color: var(--lime)`
- **Use case**: Alternative actions, cancel

#### Ghost Button
- **Background**: transparent
- **Text color**: `var(--dim)` (40% opacity cream)
- **Border**: none
- **Hover**: `color: var(--cream)` (full cream)
- **Use case**: Tertiary actions, navigation links

#### Destructive Button
- **Background**: `var(--error)` (#EF4444)
- **Text color**: white
- **Hover**: `box-shadow: 0 0 20px rgba(239, 68, 68, 0.3)` (red glow)
- **Use case**: Delete, remove, dangerous actions

#### Button Sizes

| Size | Class | Padding | Font Size |
|------|-------|---------|-----------|
| Small | `.btn-sm` | `0.4rem 1rem` | `0.55rem` |
| Medium (default) | `.btn` | `0.65rem 1.5rem` | `0.65rem` |
| Large | `.btn-lg` | `0.85rem 2rem` | `0.7rem` |

#### Button States

| State | Class | Behavior |
|-------|-------|----------|
| Disabled | `.btn--disabled` / `:disabled` | `opacity: 0.4; cursor: not-allowed; pointer-events: none` |
| Loading | `.btn--loading` | Text becomes transparent, spinning pseudo-element appears (14px circle, 2px border, 0.6s rotation) |

#### Additional Button Types
- **SiteCta**: Site-level call-to-action button
- **PrimaryLink**: Inline editorial action link
- **CtaButton**: Legacy marketing CTA primitive

### 1B. Inputs (3 variants)

#### Text Input
- **Padding**: `0.65rem 1rem`
- **Background**: `var(--surface)` (#0F0F11)
- **Border**: `1px solid var(--border)` (15% gray)
- **Text**: `var(--cream)`, monospace, `0.7rem`
- **Focus**: `border-color: var(--focus-brand)` (#D1FF00) + `box-shadow: 0 0 0 1px var(--focus-brand)`
- **Placeholder**: `color: var(--dim)` (40% cream)
- **Error state**: `border-color: var(--error)` + red box-shadow
- **Disabled**: `opacity: 0.4; cursor: not-allowed`

#### Textarea
- Same styling as text input
- `resize: vertical; min-height: 80px`
- Max character count shown (e.g., "max 500 characters")

#### Select
- Role dropdown selector
- Dark surface background with border
- Dropdown arrow indicator

#### Form Labels
- `font-family: var(--font-mono)`
- `font-size: 0.6rem`
- `text-transform: uppercase; letter-spacing: 0.08em`
- `margin-bottom: 0.4rem`

#### Form Hints & Errors
- Hint: `font-size: 0.5rem; color: var(--dim)`
- Error: `font-size: 0.5rem; color: var(--error)`

---

## 2. LIVE COMPONENTS

### 2A. Badges (5 variants)

**Base styling:**
- `padding: 0.25rem 0.75rem`
- `font-family: var(--font-mono); font-size: 0.5rem; font-weight: 500`
- `text-transform: uppercase; letter-spacing: 0.08em`
- `display: inline-flex; align-items: center`

| Variant | Class | Background | Text | Border |
|---------|-------|------------|------|--------|
| Lime | `.badge-lime` | `var(--bb-accent-10)` | `var(--lime)` | `1px solid var(--bb-accent-20)` |
| Surface | `.badge-surface` | `var(--surface)` | `var(--dim)` | `1px solid var(--border)` |
| Error | `.badge-error` | `rgba(239, 68, 68, 0.1)` | `var(--error)` | `1px solid rgba(239, 68, 68, 0.2)` |
| Blue | `.badge-blue` | `rgba(0, 153, 255, 0.1)` | `var(--blue)` | `1px solid rgba(0, 153, 255, 0.2)` |
| Solid | `.badge-solid` | `var(--lime)` | `var(--dark)` | none |

### 2B. Switches (1 variant)
- Toggle component with on/off states
- Used for: Accept terms, Subscribe, Option selections
- Disabled state available

---

## 3. OPTION COMPONENTS

### 3A. Checkboxes (1 variant)
- Custom styled checkbox for form selections

### 3B. Sliders (1 variant)
- Range input for value selection

### 3C. Spinners (3 sizes)
- **Small (16px)**: `.spinner--sm` -- inline indicators
- **Medium (24px)**: `.spinner` -- default loading
- **Large (36px)**: `.spinner--lg` -- section loading

**Styling:**
- `border: 2px solid var(--border)`
- `border-top-color: var(--lime)` (accent top border creates spinning effect)
- `border-radius: 50%`
- `animation: bb-spin 0.7s linear infinite`

### 3D. Progress Bars (3 variants)

**Base**: `height: 6px; background: var(--surface); border: 1px solid var(--border); overflow: hidden`

| Variant | Class | Fill Color |
|---------|-------|------------|
| Default | `.progress-bar` | `var(--lime)` |
| Error | `.progress-bar--error` | `var(--error)` |
| Blue | `.progress-bar--blue` | `var(--blue)` |

Four completion stages demonstrated: 25%, 50%, 75%, 100%
Fill transition: `width 0.5s ease`

---

## 4. DATA & VISUALIZATION

### 4A. Cards (3 variants)

#### Default Card
- **Background**: `var(--surface)` (#0F0F11)
- **Border**: `1px solid var(--border)` (15% gray)
- **Hover**: `box-shadow: inset 0 0 0 1px var(--bb-accent-15)` (inner glow)
- **Transition**: `box-shadow 0.3s ease`

#### Elevated Card
- Same as default + additional shadow for emphasis
- Used for featured/highlighted content

#### Outlined Card
- **Background**: transparent
- **Border**: `1px solid var(--border)`
- Used for secondary/alternative card layouts

**Card Structure:**
```
.card
  .card-body (padding: 1.5rem)
    .card-title (display font, 0.85rem, 800 weight, uppercase)
    .card-text (0.72rem, dim color, 1.5 line-height)
  .card-footer (0.75rem 1.5rem padding, top border, flex space-between)
    [action buttons]
```

**Card with Actions examples:**
- Status indicators (Active, Draft, etc.)
- Category labels (AI Automation, Financial)
- Action buttons (Edit, Delete, Open, Archive)

### 4B. KPI Cards
- **Container**: `background: var(--surface); border: 1px solid var(--border); padding: 1.25rem`
- **Label**: monospace, 0.55rem, dim color, uppercase, tracked
- **Value**: display font, 1.5rem, 800 weight, -0.02em tracking
- **Trend indicator**: monospace, 0.55rem, lime (up) or error (down)
- Examples: "50+ Deployments", "83% Time Saved", "245K Hours Automated"

### 4C. Tables (2 variants)

#### Standard Table
- Columns: ID, Name, Role, Status, Score
- **Header**: monospace, 0.55rem, dim color, uppercase, surface background
- **Cell**: 0.75rem 1.25rem padding, bottom border, cream text
- **Row hover**: `background: var(--bb-accent-02)` (subtle lime tint)
- **Numeric**: right-aligned, tabular-nums

#### Compact Metrics Table
- Columns: Metric, Value, Change
- Denser layout for dashboard data
- Color-coded values (lime for positive, error for negative)

### 4D. Charts (9 types)

All charts follow the Dark Cockpit theme with these chart-specific tokens:
- Grid: `rgba(244, 244, 232, 0.06)`
- Axis: `rgba(244, 244, 232, 0.3)`
- Ring background: `rgba(244, 244, 232, 0.08)`

#### Bar Chart (SVG)
- Monthly (Jan-Aug) and quarterly (Q1-Q4) views
- Colored bars using chart palette

#### Donut Chart (SVG)
- Categories: Automation, Support, Analytics, Other
- Default and custom color variants

#### Line Chart
- Single-line and multi-line configurations
- Optional grid display

#### Area Chart
- Monotone default, multi-area with legend, linear curve variants

#### Pie Chart
- Standard, donut (with innerRadius), labeled

#### Radar Chart
- Single-series and multi-series

#### Rings Chart
- Circular progress indicators
- Examples: Automacao 85%, Integracao 62%, Adocao 45%

#### Animated Number
- Formats: integer, percentage, currency (R$), compact (K)

#### Chart Tooltip
- Multi-item display with formatters
- `background: var(--bb-chart-tooltip-bg)`
- `border: var(--bb-chart-tooltip-border)`

---

## 5. FEEDBACK COMPONENTS

### 5A. Alerts (4 semantic variants)

**Base styling:**
- `padding: 1rem 1.25rem`
- `display: flex; align-items: flex-start; gap: 0.75rem`
- `font-family: var(--font-mono); font-size: 0.65rem`
- Icon: `16px, flex-shrink: 0`

| Variant | Class | Background | Border | Text |
|---------|-------|------------|--------|------|
| Info/Default | `.alert-default` | `var(--surface)` | `var(--border)` | `var(--cream)` |
| Success | `.alert-success` | `var(--bb-accent-05)` | `var(--bb-accent-20)` | `var(--lime)` |
| Error | `.alert-error` | `rgba(239,68,68,0.05)` | `rgba(239,68,68,0.2)` | `var(--error)` |
| Warning | `.alert-warning` | `var(--warning-bg)` | `var(--warning-border)` | `var(--warning)` |

### 5B. Toasts (4 types)
- Dismissible floating notifications
- Variants: Success ("Changes saved"), Error ("Connection failed"), Warning ("Storage 92% full"), Info ("Update available")
- Positioned via z-index `var(--layer-toast)` (500)

### 5C. Modal
- Dialog overlay component
- Overlay: `var(--color-bg-overlay)` (rgba(61, 61, 61, 0.5))
- Z-index: `var(--layer-modal)` (400)
- Open/close states

### 5D. Notification Center
- Bell icon trigger
- Unread count badge
- Dropdown panel with notification items

### 5E. Empty States (4 scenarios)
1. **Default**: No items -- generic empty state
2. **Search**: No results found
3. **Error**: Something went wrong
4. **Permissions**: Access restricted

### 5F. Loading Overlay
- Spinner with size variants (SM, MD, LG)
- Timing control
- Overlay background

### 5G. Confirm Sheet (3 action types)
1. **Default**: Standard confirmation
2. **Destructive**: Danger confirmation (red accent)
3. **Loading**: Processing state

---

## 6. LAYOUT COMPONENTS

### 6A. Specimen Grid
- `display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))`
- `gap: 1px; background: var(--border)` (1px gap creates border effect)
- Each cell: `background: var(--dark)` covers the gap
- Mobile: single column

### 6B. Component Grid
- `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
- Same 1px-gap border technique
- Cell padding: `2rem`

### 6C. Dashboard Grid (Bento 4-Col)
- `grid-template-columns: repeat(4, 1fr)`
- Asymmetric with span-2 and span-3 cells
- Hero/KPI section spans 3 columns, sidebar spans 2 rows

### 6D. Content Grid (Auto-fit)
- `grid-template-columns: repeat(auto-fit, minmax(340px, 1fr))`
- Adapts from 1 to N columns automatically

---

## 7. NAVIGATION COMPONENTS

### 7A. Site Navigation
- **Type**: Sticky top bar
- **Height**: min 48px
- **Background**: `var(--surface)` with bottom border
- **Font**: monospace, 0.6rem, uppercase, 0.08em tracking, weight 500
- **Z-index**: `var(--layer-nav)` (100)

**Structure:**
- Logo (left): display font, 0.75rem, weight 800, accent-colored span
- Links (center): inline-flex, 44px min-height, border-left separators
- Active state: `color: var(--lime)`
- Hover: `color: var(--cream); background: rgba(245, 244, 231, 0.03)`

### 7B. Dropdown Menu
- Triggered by hover on parent
- `position: absolute; top: 100%`
- `background: var(--surface); border: 1px solid var(--border)`
- `z-index: var(--layer-dropdown)` (200)
- Items: same nav styling, border-bottom separators
- Active item: lime color + 5% accent background
- Multi-column variant: `.bb-nav-dropdown-columns` (min-width: 340px, flex row)

### 7C. Mobile Navigation
- Hamburger button (hidden above 767px)
- `border: 1px solid var(--border); width: 44px; height: 44px`
- Links and sidebar hidden on mobile
- Monospace font matches desktop nav

### 7D. Responsive Breakdowns
- 1180px: Tighter padding (0.65rem inline), smaller font (0.56rem)
- 1080px: Even tighter (0.55rem inline, 0.53rem font)
- 767px: Hamburger replaces nav links

---

## 8. ADVANCED COMPONENTS

### 8A. Tabs
- Project overview with key metrics and status dashboard
- Real-time data display from connected systems
- Tab panels with distinct content views

### 8B. Accordion
- Expandable FAQ-style sections
- Questions: "What is AIOX?", "How long does implementation take?"
- Expand/collapse animation

### 8C. Stepper (Horizontal)
- Workflow stages display
- Steps: Discovery > Architecture > Implementation > QA Review > Deploy
- Visual connection between steps

### 8D. Stepper (Vertical)
- Process steps in vertical layout
- Steps: Onboarding > Data Integration > Training > Go Live
- Timeline-style presentation

---

## 9. PATTERN COMPONENTS

### 9A. Background Patterns

| Component | Class | Visual |
|-----------|-------|--------|
| Dot Grid | `.pattern-dot-grid` | 16px spaced lime dots on dark surface |
| Dense Dot Grid | `.pattern-dot-grid--dense` | 8px tight dots |
| Sparse Dot Grid | `.pattern-dot-grid--sparse` | 32px loose dots |
| Crosshair Grid | `.pattern-crosshair-grid` | 80px technical grid |
| Wireframe Perspective | `.pattern-wireframe-perspective` | 60px grid with depth illusion |
| Symbol Grid | `.pattern-symbol-grid` | 32px X-mark pattern |
| Plus Grid | `.pattern-plus-grid` | 32px plus-sign pattern |

### 9B. Frame Components

| Component | Class | Visual |
|-----------|-------|--------|
| Bracket Frame | `.frame-bracket` | TL + BR corner brackets (24px) |
| Full Bracket | `.frame-bracket--full` | All 4 corner brackets |
| Tech Frame | `.frame-tech` | Clipped corners (12px) with lime border |
| Tech Frame Small | `.frame-tech--sm` | 8px corner clips |
| Tech Frame Large | `.frame-tech--lg` | 20px corner clips |
| Notch (TR) | `.frame-notch-tr` | Top-right 16px notch |
| Notch (BL) | `.frame-notch-bl` | Bottom-left 16px notch |
| Notch (Both) | `.frame-notch-both` | Diagonal dual notches |

### 9C. Hazard/Warning Components

| Component | Class | Visual |
|-----------|-------|--------|
| Hazard Stripes | `.pattern-hazard` | 10px diagonal lime/dark stripes |
| Thin Hazard | `.pattern-hazard--thin` | 5px thin bands |
| Subtle Hazard | `.pattern-hazard--subtle` | 15% opacity ghost stripes |
| Warning Bar | `.bar-warning` | Solid lime bar with mono text + stripe |

### 9D. Texture Overlays

| Component | Class | Visual |
|-----------|-------|--------|
| Scanlines | `.pattern-scanlines` | 2px CRT lines at 15% |
| Heavy Scanlines | `.pattern-scanlines--heavy` | 1px lines at 25% |
| Noise | `.pattern-noise` | SVG fractal noise at 4%, overlay blend |
| Data Rain | `.pattern-data-rain` | Matrix-style vertical columns |
| Industrial | `.pattern-industrial` | Brushed metal gradient |

### 9E. Divider Components

| Component | Class | Visual |
|-----------|-------|--------|
| Tech Divider | `.divider-tech` | Centered gradient (transparent > lime > transparent) |
| Arrow Divider | `.divider-arrow` | Line with right-facing triangle |
| Dashed Divider | `.divider-dashed` | 8px lime dashes at 50% opacity |
| Double Divider | `.divider-double` | Two parallel gradient lines |

### 9F. Circuit Components

| Component | Class | Visual |
|-----------|-------|--------|
| Circuit Trace H | `.pattern-circuit-h` | SVG horizontal circuit with solder points |
| Circuit Board | `.pattern-circuit-board` | 80px tiling PCB pattern |

### 9G. Decorative Components

| Component | Class | Visual |
|-----------|-------|--------|
| Glow Center | `.pattern-glow-center` | Radial gradient center glow |
| HUD Corner | `.hud-corner` | 12px corner marks (TL + BR) |
| Pulse Dot | `.pattern-pulse-dot` | 6px animated glowing dot |

---

## 10. SECTION COMPONENTS

### 10A. Hero Section
- Headline + subheading + CTA button
- Dashboard image mockup with play overlay
- Logo ticker (12 partner logos)
- Full-width, dark background

### 10B. Stats Section
- Leadership quote block
- 4 KPI metric cards in grid
- Stats: deployments, time reduction, hours automated, cost savings

### 10C. Problem/Solution Gallery
- 8-item numbered grid (01-08)
- Problem statements format
- Grid layout

### 10D. Services Section
- 6-column breakdown
- Each service: header + description + sub-services + testimonial quote
- Categories: Document Processing, Customer Support, Data Processing, Workflow Automation, Content & Communication, Custom Solutions

### 10E. How It Works
- 6-phase timeline (Week 1-6)
- 3 ongoing support phases
- Text-based process flow

### 10F. Featured Case Study
- Company name + date + category
- 3 key metrics in grid
- Descriptive paragraph

### 10G. Testimonials
- 3-card grid
- Star ratings, name, title, company
- Quote text

### 10H. FAQ Section
- 6 expandable accordion blocks
- Standard FAQ format

### 10I. Book Call / Contact Forms
- Lead generation: Name, Email, Company, Phone, Monthly spend, Automation goals
- Contact: Name, Email, Company, Budget (dropdown), Message
- Founder quote integration

### 10J. ROI Calculator
- Interactive: Hours/week, hourly rate, process count inputs
- Real-time annual savings output
- 70% automation rate assumption

### 10K. Newsletter Signup
- Email input + subscribe button
- Value proposition text

### 10L. Device Mockups
- Tabbed: Phone, Laptop, Tablet
- Frame-style display

### 10M. Grain Overlay
- Film texture section
- Opacity control (5%, 10%, 15%, 25%)

### 10N. Footer
- Newsletter signup module
- Company info block
- Navigation link groups
- Social media links (Twitter, TikTok, Instagram, YouTube, LinkedIn, GitHub)
- Legal links (Acceptable Use, Privacy, Terms, Cookies)
- Copyright + build attribution

---

## COMPONENT INVENTORY SUMMARY

| Category | Count |
|----------|-------|
| Buttons | 4 variants + 3 sizes + 2 states |
| Inputs | 3 types (text, textarea, select) |
| Badges | 5 variants |
| Switches | 1 |
| Checkboxes | 1 |
| Sliders | 1 |
| Spinners | 3 sizes |
| Progress Bars | 3 color variants |
| Cards | 3 variants + KPI card |
| Tables | 2 variants |
| Charts | 9 types |
| Alerts | 4 semantic variants |
| Toasts | 4 types |
| Modal | 1 |
| Empty States | 4 scenarios |
| Loading | 1 with sizes |
| Confirm Sheet | 3 action types |
| Tabs | 1 |
| Accordion | 1 |
| Steppers | 2 (horizontal + vertical) |
| Grid Patterns | 7 |
| HUD Frames | 8 |
| Hazard Patterns | 4 |
| Textures | 5 |
| Dividers | 4 |
| Circuit Patterns | 2 |
| Decorative | 3 |
| Marketing Sections | 14 |
| **TOTAL** | **~90 components/variants** |
