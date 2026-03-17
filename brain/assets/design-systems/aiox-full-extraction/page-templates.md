# AIOX — Templates Page
URL: https://brand.aioxsquad.ai/brandbook/templates

## Page Purpose
Page layout templates showing standard structures for pages, dashboards, and content grids.

## Content Structure
1. **Header** — "AIOX SQUAD PAGE TEMPLATES V1.0 // DARK COCKPIT EDITION"
2. **01 Page Shell** — Standard page structure
3. **02 Dashboard Grid (Bento)** — Asymmetric 4-column grid
4. **03 Content Grid** — Responsive auto-fit grid

## Template Patterns

### 01 Page Shell
Standard structure: sticky nav → page header → section dividers → footer

### 02 Dashboard Grid (Bento)
4-column asymmetric grid using `grid-column: span` for:
- Hero/KPI panels (span 3)
- Stat cards (span 2)
- Chart areas
- Sidebars
- Wide content blocks

### 03 Content Grid
```css
grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
```
Responsive cards that auto-flow based on available width

## Navigation Context
- Position: Design System > Meta > Templates

## Key Design Decisions
- 3 core templates cover most page layouts
- Bento grid with named areas for dashboard layouts
- auto-fit with minmax for flexible content grids
- Page shell establishes consistent header/footer pattern
