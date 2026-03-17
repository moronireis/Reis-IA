# AIOX — Layout Patterns
Last updated: 2026-03-16
Source: https://brand.aioxsquad.ai/

## 1. Page Layout Templates

### Template A: Full-Screen Hero (Home Page)
```
[Fixed Header]
[Full-Screen Hero Section (min-h-screen)]
  ├── Watermark layer (absolute, z-0, opacity-20)
  ├── Grid overlay (absolute, z-elevated, 4 columns)
  └── Content (relative, z-10, max-w-[1200px])
[Sections...]
[Footer]
```

### Template B: Design System Page (Token/Component Pages)
```
[Fixed Header]
[Page Header Bar (3-column metadata)]
[Title Area]
[Section 01]
  ├── Section label (numbered: "01 // Title")
  └── Content grid
[Section 02]
[...]
[Footer Bar (logo + confidential notice)]
```

### Template C: Strategic Brandbook (Movimento)
```
[Fixed Header]
[Sidebar Navigation (13 sections)]
[Main Content (scrollable)]
  ├── Section 01 (full-height sections)
  ├── Section 02
  └── ... Section 13
```

### Template D: Gallery Showcase
```
[Fixed Header]
[Gallery Header (title, stats, collection info)]
[Filter Tags Bar]
[Image Grid (3 columns)]
[Footer]
```

### Template E: Dashboard/Tool (Workspace, Calc Squad)
```
[Fixed Header]
[Container (max-w-7xl, px-6, py-12)]
  ├── Title + subtitle
  └── Interactive content area
```

## 2. Grid Systems

### 12-Column Bento Grid (Home Page Stats)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(240px, auto); /* sm: minmax(300px, auto) */
  gap: 1px; /* Hairline dividers via bg-bb-border */
}
/* Children span: col-span-12 md:col-span-6 lg:col-span-4 */
```

### Auto-Fit Content Grid (Token Pages)
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1px;
}
```

### Auto-Fit Card Grid (Templates)
```css
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
```

### Fixed Column Grids (Token Tables)
```css
grid-template-columns: 160px 60px minmax(0, 1fr);         /* 3-col token display */
grid-template-columns: 200px 200px minmax(0, 1fr);         /* 3-col wider */
grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);  /* Asymmetric 2-col */
grid-template-columns: 50px 180px 1fr 1fr;                  /* LP sections table */
```

### 4-Column Pillar Grid (Home Page)
```css
grid-cols-2 sm:grid-cols-2 md:grid-cols-4
/* Each card: h-[90px] sm:h-[110px] md:h-[140px] */
```

### 3-Column Showcase Grid
```css
grid-template-columns: repeat(3, 1fr);
/* Aspect ratios: 3:4 (outfits), 4:3 (sneakers) */
```

## 3. Container Patterns

### Max Width Constraints
```
max-w-[1200px]  — Primary content container (brandbook pages)
max-w-[1440px]  — Full-width layouts (pitch)
max-w-7xl       — Dashboard/tool pages (1280px)
max-w-6xl       — Wide content
max-w-3xl       — Narrow content
max-w-[1000px]  — Headline constraint
max-w-[800px]   — Section description
max-w-[600px]   — Body text
max-w-[400px]   — Compact text blocks
max-w-sm        — Small containers
```

### Padding Patterns
```css
/* Responsive horizontal padding */
px-4 sm:px-6 md:px-8 lg:px-16        /* Wide progression */
px-4 sm:px-6 md:px-8                  /* Standard */
px-6 md:px-10                         /* Navbar */
--bb-gutter: clamp(1rem, 3vw, 2rem)   /* Fluid gutter */

/* Vertical section padding */
py-8 sm:py-12 md:py-16               /* Standard section */
py-10 md:py-16                        /* Compact section */
py-24 md:py-32                        /* LP section (generous) */
pt-24 pb-16                           /* Pitch page */
py-12                                 /* Dashboard */
```

## 4. Responsive Breakpoints

### Tailwind Breakpoints Used
| Prefix | Width | Usage |
|--------|-------|-------|
| (base) | < 640px | Mobile-first base styles |
| `sm:` | >= 640px | Small tablets |
| `md:` | >= 768px | Tablets/landscape |
| `lg:` | >= 1024px | Desktops |
| `xl:` | >= 1200px | Wide desktops |

### Custom CSS Breakpoints
```css
--bp-mobile: 767px;    /* max-width for mobile */
--bp-tablet: 768px;    /* min-width for tablet */
--bp-desktop: 1200px;  /* min-width for desktop */
```

### Responsive Behavior Patterns

#### Grid Collapse
```
lg:col-span-4 → md:col-span-6 → col-span-12
md:grid-cols-4 → sm:grid-cols-2 → grid-cols-2
lg:grid-cols-5 → md:grid-cols-3 → grid-cols-2
```

#### Typography Scale
```css
/* Hero headline */
text-[clamp(2rem, 8vw, 6.5rem)]

/* Section headline */
text-[clamp(2.5rem, 5vw, 4rem)]

/* LP sections */
text-[clamp(2.2rem, 7vw, 6.5rem)]
```

#### Visibility
```css
hidden sm:block     /* Show only on sm+ */
hidden sm:grid      /* Grid only on sm+ */
hidden md:block     /* Show only on md+ */
```

## 5. Section Layout Patterns

### Hairline Grid (1px Gap Technique)
```html
<div class="grid gap-[1px] bg-bb-border border border-bb-border">
  <div class="bg-bb-surface p-8">Cell 1</div>
  <div class="bg-bb-surface p-8">Cell 2</div>
  <!-- Parent bg-bb-border shows through 1px gaps as dividers -->
</div>
```
Used on: Home page stats, token pages, LP sections

### Section with Numbered Label
```html
<div class="font-mono text-[10px] font-bold uppercase tracking-[-0.05em]">
  <span class="text-bb-cream">[02]</span>
  <span class="text-bb-lime">Section Title</span>
</div>
```

### Dark/Light Section Alternation (LP)
```
variant="dark"  → bg: --bb-dark, text: --bb-cream
variant="light" → bg: --bb-cream, text: --bb-dark
```

### Staircase Layout
Items offset by `i * 50px` vertically or `i * 6%` horizontally. Used in "How It Works" sections.

### Split Screen (Editorial)
50/50 dark/cream backgrounds with 1px border divider. Corner ornament (20px crosshair) in lime.

## 6. Header/Footer Layout

### Header
```css
position: fixed;
width: 100%;
z-index: var(--layer-nav); /* 100 */
border-bottom: 1px solid var(--bb-border);
background: var(--bb-surface); /* with possible backdrop-filter */
```

### Footer
```css
border-top: 1px solid var(--bb-border);
background: var(--bb-surface);
/* Multi-column grid */
```

### Page Header Bar (Design System Pages)
```css
border-bottom: 1px solid var(--bb-border);
background: var(--bb-surface);
/* 3-column layout: brand | page name | version */
display: flex;
justify-content: space-between;
```

## 7. Content Width Constraints

### Hierarchy of Widths
```
1440px — Maximum outer width (rare)
1280px — Dashboard/tool pages (max-w-7xl)
1200px — Standard content (max-w-[1200px])
1000px — Headline containment
800px  — Section descriptions
600px  — Body text / paragraphs
400px  — Compact blocks
340px  — Minimum card width (auto-fit)
200px  — Minimum token cell (auto-fit)
```

## Reis IA Cross-Reference

### Directly Adoptable Patterns
- Hairline grid (1px gap) technique — excellent for dark mode
- 12-column bento grid for dashboard-style pages
- Auto-fit with minmax() for responsive grids
- Clamp() fluid typography approach
- Responsive padding progression (px-4 → sm:px-6 → md:px-8 → lg:px-16)
- Section numbered label pattern (monospace, uppercase, bracketed numbers)
- Max-width hierarchy (1200px content, 600px body text, etc.)

### Needs Adaptation
- AIOX uses max-w-[1200px] as primary; Reis IA may want different max-width
- Staircase layout is AIOX-specific; evaluate for Reis IA process sections
- LP section padding (py-24 md:py-32) is generous; may need adjustment for Reis IA aesthetic
- Split screen editorial is magazine-style; Reis IA may prefer different editorial approach

### Not Applicable
- Gallery showcase grid (3-col product galleries) — not needed for Reis IA brand site
- Squad Calculator layout — AIOX-specific interactive tool
