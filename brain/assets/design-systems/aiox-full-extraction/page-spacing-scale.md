# AIOX — Spacing Scale Page
URL: https://brand.aioxsquad.ai/brandbook/spacing-scale

## Page Purpose
Dedicated page for the 14-step numeric spacing scale with usage guide.

## Content Structure
1. **Header** — "AIOX SQUAD | SPACING SCALE | V2.0 // DARK COCKPIT EDITION"
2. **Title** — "Spacing Scale — 14-Step Numeric Scale // --space-0 to --space-13 // 2026"
3. **01 Numeric Scale** — 14 spacing values with visual bar representations
4. **Usage Guide** — 4-card grid: Micro UI, Components, Section/Layout, Editorial

## Complete Token Reference
```css
--space-0:  0px;
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  15px;
--space-5:  20px;
--space-6:  30px;
--space-7:  40px;
--space-8:  60px;
--space-9:  80px;
--space-10: 90px;
--space-11: 120px;
--space-12: 150px;
--space-13: 180px;
```

## Usage Categories
| Range | Category | Usage |
|-------|----------|-------|
| Space 0-3 | Micro UI | Inline gaps, icon padding, tight clusters |
| Space 4-6 | Components | Card padding, form gaps, button groups |
| Space 7-11 | Section/Layout | Section padding, grid gaps, page margins |
| Space 12-13 | Editorial | Large editorial blocks, hero spacing |

## CSS Patterns
- Grid: auto-fit with minmax(200px, 1fr) and 1px gaps
- Visual bars: lime accent at 20% opacity, proportional width
- Typography: mono 0.55-0.65rem, uppercase, tracking 0.04-0.12em
- Responsive gutter: --bb-gutter: clamp(1rem, 3vw, 2rem)

## Navigation Context
- Position: Design System > Tokens > Spacing Scale
- Complements Foundations page spacing section

## Key Design Decisions
- Non-linear progression: micro precision (4-15px) then geometric (20-180px)
- Visual bar chart representation for relative comparison
- Clear usage categories prevent misuse
