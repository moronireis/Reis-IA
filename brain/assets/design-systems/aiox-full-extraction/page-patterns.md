# AIOX — Pattern Library Page
URL: https://brand.aioxsquad.ai/brandbook/patterns

## Page Purpose
Comprehensive pattern library with 6 categories: grid patterns, HUD frames, hazard/warning, circuit traces, textures, and dividers.

## Content Structure
1. **Header** — "AIOX SQUAD | PATTERN LIBRARY | V1.0 // DARK COCKPIT EDITION"
2. **Title** — "Pattern Library" (Library in lime) — "Grids · Frames · Hazard · Circuit · Textures"
3. **01 Grid Patterns** — 8 background texture patterns
4. **02 HUD Frames** — 8 containment frame patterns
5. **03 Hazard/Warning** — 4 alert patterns
6. **04 Circuit Traces** — 2 PCB decorative patterns
7. **05 Textures** — 5 surface treatment patterns
8. **06 Dividers** — 4 section separator patterns

## Complete Pattern Reference

### 01 Grid Patterns (Background Textures)
| Class | Description |
|-------|-------------|
| `.pattern-dot-grid` | 16px spaced lime dots. Default density for backgrounds/empty states |
| `.pattern-dot-grid--dense` | 8px spaced dots. Tighter weave for small panels |
| `.pattern-dot-grid--sparse` | 32px spacing with larger dots. Subtle backdrop for heroes |
| `.pattern-crosshair-grid` | 80px grid lines with centered crosshair dots. Blueprint feel |
| `.pattern-crosshair-grid--tight` | 40px tight grid variant. Higher density for overlays |
| `.pattern-wireframe-perspective` | 60px wireframe grid with radial glow center. 3D depth |
| `.pattern-symbol-grid` | 32px SVG X-marks repeating tile. Branded texture |
| `.pattern-plus-grid` | 32px SVG plus-sign repeating tile. Minimal technical grid |

### 02 HUD Frames (Containment Elements)
| Class | Description |
|-------|-------------|
| `.frame-bracket` | Top-left and bottom-right corner brackets in lime |
| `.frame-bracket--full` | All four corner brackets via ::before/::after |
| `.frame-bracket__inner` | Inner content wrapper |
| `.frame-tech` | Clipped polygon border with 12px corner cuts |
| `.frame-tech--sm` | 8px corner cuts for smaller elements |
| `.frame-tech--lg` | 20px corner cuts for hero panels |
| `.frame-notch-tr` | Top-right 16px notch clip-path |
| `.frame-notch-bl` | Bottom-left 16px notch clip-path |
| `.frame-notch-both` | Top-right and bottom-left 16px notches |

### 03 Hazard/Warning (Alert Patterns)
| Class | Description |
|-------|-------------|
| `.pattern-hazard` | Bold 10px repeating diagonal stripes in lime and black |
| `.pattern-hazard--thin` | 5px thin stripe variant |
| `.pattern-hazard--subtle` | 15% opacity translucent stripes |
| `.bar-warning` | Solid lime bar with black text and diagonal stripe accent |

### 04 Circuit Traces (PCB Decoratives)
| Class | Description |
|-------|-------------|
| `.pattern-circuit-h` | SVG horizontal circuit path, repeats on x-axis at 20px height |
| `.pattern-circuit-board` | 80px tiling SVG with vertical/horizontal PCB traces |

### 05 Textures (Surface Treatments)
| Class | Description |
|-------|-------------|
| `.pattern-scanlines` | 2px repeating horizontal scanlines at 15% opacity |
| `.pattern-scanlines--heavy` | 1px tight scanlines at 25% opacity |
| `.pattern-noise` | SVG fractal noise via ::after at 4% opacity with overlay blend |
| `.pattern-data-rain` | Vertical 40px column lines with neon gradient wash |
| `.pattern-industrial` | Multi-stop dark gradient with inset highlight/shadow |

### 06 Dividers & Separators
| Class | Description |
|-------|-------------|
| `.divider-tech` | Centered gradient line fading from transparent to lime |
| `.divider-arrow` | Left-extending line with right-facing arrow triangle |
| `.divider-dashed` | Repeating 8px lime dashes at 50% opacity |
| `.divider-double` | Two parallel gradient lines 5px apart |

## Navigation Context
- Position: Design System > Visual > Patterns
- One of the 4 pillars from the home page

## Key Design Decisions
- 31 total patterns organized into 6 categories
- CSS-only implementation (no JS required for patterns)
- All patterns use lime accent for brand consistency
- Patterns range from subtle (noise at 4%) to bold (hazard stripes)
- Frame system uses clip-path for sci-fi panel effects
- Circuit traces add PCB/tech-board decorative language
- BEM-like naming: base class + modifier (--dense, --tight, --sm)
