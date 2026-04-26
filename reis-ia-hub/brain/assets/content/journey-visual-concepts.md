# Journey Visualization — 5 Creative Concepts

Last updated: April 2026

---

## Overview

Five radically different visual concepts for the REIS IA Hub learning journey. Each concept replaces the current constellation-style vertical path with a distinctive metaphor that feels premium, memorable, and brand-aligned.

**Shared constraints across all concepts:**
- Dark mode: #000000 base, #0A0A0A surfaces, #141414 cards
- Accent: #4A90FF (primary), #22C55E (completed/success)
- Content type colors: task #4A90FF, material #22C55E, presentation #8B5CF6, checkpoint #F59E0B, quiz #EC4899
- Font: Inter, all weights
- Tech: React + inline CSS + SVG, no external libraries
- 5 phases, ~5 nodes each, 4 statuses (locked, available, in_progress, completed)
- Scrollable page, all phases visible, nodes clickable
- No emojis, no external icons

---

## Concept 1: HORIZON STRATA

### Core Metaphor
Geological cross-section. Each phase is a horizontal stratum (layer of earth/rock), and the student is drilling downward through layers of increasing depth and value. Think: a premium infographic of geological survey data meets architectural section drawing.

### Visual Description
The entire journey is a tall, narrow vertical composition (centered, max-width 800px). The viewport shows a cross-section of the earth, with the surface at the top and the deepest layer at the bottom. Each phase is a distinct horizontal band spanning the full width, separated by thin geological "fault lines" — irregular SVG paths in #1A1A1A that feel organic, not perfectly straight.

The background of each stratum subtly shifts in darkness: Phase 1 is #0A0A0A, Phase 2 is #080808, Phase 3 is #060606, Phase 4 is #040404, Phase 5 is #020202. As you go deeper, the accent blue intensifies — representing that deeper knowledge = more concentrated value.

At the very top, above Phase 1, a thin horizontal line represents the "surface" — the student's starting point. A small downward-pointing chevron (SVG, 2px stroke, #4A90FF) pulses slowly at the current depth.

### Phase Representation
Each stratum is 200-280px tall (desktop). The phase header sits at the left edge of the band:

- **Phase title**: Inter 600, 13px, letter-spacing 0.08em, uppercase, #4A90FF (active) or #404040 (locked)
- **Phase number**: Inter 700, 48px, positioned behind the title at 4% opacity as a large watermark — e.g., "01", "02"
- **Progress indicator**: A horizontal line that extends from left to right across the stratum. It starts as a dashed line (#1A1A1A) and fills solid (#4A90FF with 30% opacity glow) proportional to phase completion. When 100% complete, the entire line turns #22C55E.
- **Depth marker**: On the far right edge, a small label like "DEPTH 1 / 5" in 11px Inter 400, #404040.

Phase states:
- **Locked**: The entire stratum is overlaid with a subtle diagonal hatch pattern (SVG pattern, 1px lines at 45deg, #0F0F0F on #080808). Title is #333333. Nodes are ghosted.
- **Available/In Progress**: Full visibility. Nodes are interactive.
- **Completed**: A thin #22C55E horizontal line runs along the bottom edge of the stratum, marking it as "drilled through."

### Node Representation
Nodes are arranged horizontally within each stratum, evenly spaced in a single row (or two rows if >5 nodes). Each node is a small rectangular cell:

- **Dimensions**: 120px wide x 80px tall (desktop)
- **Shape**: Rectangle with 2px border-radius. No rounded corners — this is geological, angular.
- **Border**: 1px solid. Color depends on content_type.
- **Interior**: Content type icon (SVG, 16x16) centered at top. Title below in Inter 500, 12px, max 2 lines, centered.
- **Background**: #0A0A0A (available), #111111 with content-type-color at 5% opacity (in_progress), #0A0A0A with #22C55E border (completed), #080808 with 0.3 opacity (locked).

Node states:
- **Locked**: Entire cell at opacity 0.3. Lock icon overlaid. No hover effect.
- **Available**: Full opacity. On hover: border brightens to 100% of content_type color, background gains a 3% tint of that color.
- **In Progress**: Border pulses between 60% and 100% opacity of content_type color (2s cycle). Small animated dot on the top-left corner.
- **Completed**: Checkmark icon replaces content_type icon. Border is #22C55E at 60% opacity. Background has subtle 3% green tint.

Between nodes, thin connecting lines (1px, #1A1A1A dashed, becoming solid #262626 when both adjacent nodes are completed).

### Progress Visualization
1. **Depth gauge**: A thin vertical bar on the far-left margin of the page (8px wide, full journey height). It fills downward with #4A90FF as phases complete. Current position has a brighter 4px accent dot.
2. **Stratum fill**: Each completed phase gets its horizontal progress line filled.
3. **Surface-to-depth label**: At the very top, "SURFACE" in 11px uppercase; at the very bottom, "CORE" — creating a clear top-to-bottom narrative.

### Key Animation
**The Drill Pulse**: When a node is completed, a circular shockwave ripples outward from that node — a thin ring (1px, content_type color, starting at the node's center) that expands to 120px diameter and fades to 0 opacity over 800ms. Then the horizontal progress line within that phase ticks forward with a smooth 400ms ease-out fill.

On phase completion, the fault line between the completed phase and the next one "cracks open" — the SVG path animates from a subtle offset to its final position over 600ms with a slight bounce easing, and the next stratum's hatch overlay fades out over 500ms.

### ASCII Wireframe

```
        SURFACE
  ======================== thin line

  ┌─ PHASE 01 ─────────── depth gauge ─┐  │
  │  FUNDAMENTOS                        │  █ (blue fill)
  │                                     │  █
  │  [node] [node] [node] [node] [node] │  █
  │  ━━━━━━━━━━━━━▸ progress line       │  █
  │                                     │  │
  ├~ ~ ~ ~ ~ fault line ~ ~ ~ ~ ~ ~ ~ ~┤  │
  │  PHASE 02                           │  │
  │  IMPLEMENTACAO                      │  │ (unfilled)
  │                                     │  │
  │  [node] [node] [node] [node]        │  │
  │  ━━━━━▸                             │  │
  │                                     │  │
  ├~ ~ ~ ~ ~ fault line ~ ~ ~ ~ ~ ~ ~ ~┤  │
  │  PHASE 03                           │  │
  │  ░░░░░░░░░░░░ locked ░░░░░░░░░░░░░ │  │
  │  ░░[node]░[node]░[node]░[node]░░░░ │  │
  ├~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~┤  │
  │  PHASE 04  ░░░░░░░░ locked ░░░░░░░ │  │
  │  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  │
  ├~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~┤  │
  │  PHASE 05  ░░░░░░░░ locked ░░░░░░░ │  │
  └─────────────────────────────────────┘  │

        CORE
```

### Uniqueness Factor
No learning platform uses a geological depth metaphor. It communicates "going deeper" in a literal, visceral way. The angular, scientific aesthetic sets it apart from typical gamified or playful learning UIs. The horizontal node layout within vertical strata creates a unique grid-within-bands composition.

---

## Concept 2: COMMAND DECK

### Core Metaphor
A spacecraft bridge / mission control console. Each phase is a "mission" displayed on a tactical screen, and nodes are mission objectives arranged in a heads-up display (HUD) layout. Think: the UI from Interstellar's ship instruments meets Bloomberg Terminal's information density.

### Visual Description
The page is framed as a command interface. The background is pure #000000. A thin 1px border (#141414) frames the entire content area, creating the feeling of looking at a screen-within-a-screen. In each corner of this frame, small SVG angle brackets (like targeting reticles) in #1A1A1A reinforce the HUD feel.

Along the very top of the content area, a thin "status bar" shows: journey title (left, Inter 600, 14px, #FFFFFF), total XP (center, Inter 400, 12px, #737373), and overall completion percentage (right, Inter 500, 14px, #4A90FF). This bar has a 1px bottom border in #141414.

Below the status bar, each phase occupies a "mission panel." Phases stack vertically with 48px gaps between them.

### Phase Representation
Each phase is a rectangular panel with a distinct HUD frame:

- **Outer border**: 1px solid #1A1A1A, with small corner accents — 8px L-shaped brackets at each corner in the phase's accent color (or #262626 if locked).
- **Header row**: Phase number in a small box (24x24px, 1px border, phase color) at left. Phase title in Inter 600, 18px. Status tag at right ("ACTIVE" in 11px, uppercase, letter-spacing 0.1em, color matches phase status).
- **Dimensions**: Full content width (max 1100px), variable height based on node count.
- **Interior background**: #0A0A0A. Locked phases use #050505 with the corner brackets in #141414.
- **Phase description**: Below header, Inter 400, 14px, #737373, max 2 lines.

Phase colors (used for corner brackets and accents):
- Phase 1: #4A90FF
- Phase 2: #22C55E  
- Phase 3: #8B5CF6
- Phase 4: #F59E0B
- Phase 5: #EC4899

The active phase has its corner brackets animated — they slowly pulse in size (scale 1.0 to 1.05 and back, 3s cycle) to draw attention.

### Node Representation
Nodes are arranged in a horizontal row inside the mission panel, creating a "mission objectives" feel. Each node is:

- **Shape**: Square, 96x96px. Thin 1px border in content_type color. Interior is #0A0A0A.
- **Layout**: Icon (SVG, 20x20) centered in the top third. Title below in Inter 500, 11px, centered, max 2 lines. XP reward in bottom-right corner, 10px, #404040.
- **Connecting line**: Between each node, a thin horizontal line (1px) with a small arrowhead (>) pointing right. Line color: #1A1A1A (locked), #262626 (available), content_type color (in_progress), #22C55E (completed).

Node states:
- **Locked**: opacity 0.25. Border #1A1A1A. "LOCKED" in 9px red-tinted gray below the square.
- **Available**: Full opacity. On hover: border glows (box-shadow: 0 0 8px content_type_color at 30% opacity). Cursor pointer.
- **In Progress**: Border animates as a "scanning line" — a bright segment (8px wide, 100% opacity of content_type color) travels clockwise around the 1px border using SVG stroke-dashoffset animation (4s loop). The rest of the border is at 30% opacity.
- **Completed**: Border solid #22C55E at 40%. Interior gains a tiny checkmark badge (12x12, green circle with white check) in the top-right corner, overlapping the border.

If a phase has more than 5 nodes, they wrap to a second row with 16px vertical gap.

### Progress Visualization
1. **Mission progress bar**: Below each phase's node row, a thin (2px) horizontal bar spans the full panel width. Track is #0A0A0A (nearly invisible). Fill is phase color, width = completion %. Has a bright 1px leading edge.
2. **Global HUD readout**: The top status bar shows "MISSION [X/5] ACTIVE" with phase number, and a segmented progress bar (5 segments, each representing a phase) — filled segments use phase colors, empty ones are #141414.
3. **XP counter**: In the status bar, the XP number ticks up when nodes complete (CSS counter animation, 600ms).

### Key Animation
**The Scan Line**: The active node's border animation is the signature. A bright accent-colored segment chases around the square's perimeter continuously — like a radar sweep on a mission objective. It uses a single SVG `<rect>` with animated stroke-dashoffset.

When a node is completed, the scanning stops, the border briefly flashes white (100ms), then settles to green. The arrowhead line to the next node animates from gray to the content_type color (200ms left-to-right wipe using a gradient mask).

Phase completion triggers all corner brackets of that panel to simultaneously flash bright (200ms) before settling to green, and the next phase's panel "boots up" — its opacity goes from 0.25 to 1.0 over 800ms, and corner brackets fade in one at a time (top-left, top-right, bottom-left, bottom-right, 150ms stagger).

### ASCII Wireframe

```
┌─────────────────────────────────────────────────────────┐
│  Jornada Builder        1,240 XP        42% COMPLETE    │
│  [████████░░░░░░░░░░] MISSION 2/5 ACTIVE                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  ╎ [01] FASE 1 — FUNDAMENTOS            COMPLETED   ╎  │
│  ╎                                                   ╎  │
│  ╎  ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐    ╎  │
│  ╎  │  /\  │───>│  []  │───>│ [][] │───>│  ?   │    ╎  │
│  ╎  │ Task │    │ Mat. │    │Pres. │    │ Quiz │    ╎  │
│  ╎  │  +20 │    │  +10 │    │  +15 │    │  +30 │    ╎  │
│  ╎  └──────┘    └──────┘    └──────┘    └──────┘    ╎  │
│  ╎  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ 100%  ╎  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                                         │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  ╎ [02] FASE 2 — IMPLEMENTACAO             ACTIVE   ╎  │
│  ╎                                  [scanning node]  ╎  │
│  ╎  ┌──────┐    ┌══════┐    ┌──────┐    ┌──────┐    ╎  │
│  ╎  │  +   │───>║ scan ║───>│      │───>│      │    ╎  │
│  ╎  │ done │    ║ here ║    │ avail│    │ avail│    ╎  │
│  ╎  └──────┘    └══════┘    └──────┘    └──────┘    ╎  │
│  ╎  ━━━━━━━━━━━━━▸                            25%   ╎  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                                         │
│  ┌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┐  │
│  ╎ [03] FASE 3 ░░░░░░░░░░░░░░░░░ LOCKED ░░░░░░░░░  ╎  │
│  ╎  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ╎  │
│  └╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Uniqueness Factor
The HUD / mission control aesthetic is extremely rare in education platforms. The scanning border animation on the active node is a distinctive, memorable interaction that no other platform has. The information-dense layout feels competent and serious — it signals "this is professional training, not a kids' app." The per-phase color coding creates a strong visual rhythm down the page.

---

## Concept 3: BLUEPRINT GRID

### Core Metaphor
An architect's blueprint / technical drawing. The journey is a floor plan being constructed room by room. Each phase is a "wing" of the building, and nodes are rooms within that wing. Think: a premium architectural presentation drawing you'd see in a Tadao Ando monograph, dark-inverted.

### Visual Description
The entire background has a subtle grid pattern: thin lines (#0D0D0D) every 48px, creating the blueprint feel. This grid is a full-page SVG pattern, nearly invisible but perceptible — it gives the page a sense of precision and measurement.

The journey is presented as a single large "floor plan" that scrolls vertically. Each phase is a rectangular zone on this plan, arranged in a staggered pattern — Phase 1 aligns left, Phase 2 aligns right, Phase 3 aligns left, creating a zigzag down the page. The offset between left and right is 80px (desktop), creating visual movement without being chaotic.

Thin dimension lines (the kind architects use to mark measurements) run along the edges of each phase zone, with small labels showing phase duration or node count — e.g., "5 NODES | ~2.5H" in 10px Inter 400, #333333.

### Phase Representation
Each phase is a rectangular zone:

- **Dimensions**: 600px wide x auto height (desktop). Phases alternate alignment (left/right within the 1100px max-width).
- **Border**: 1px dashed #262626 (unlocked phases), 1px dashed #141414 (locked phases). Dashed, not solid — like a blueprint outline.
- **Interior**: No fill (transparent to the grid background). The grid lines beneath show through.
- **Phase label**: Positioned outside the rectangle, above-left (for left-aligned phases) or above-right (for right-aligned). Inter 700, 11px, uppercase, letter-spacing 0.12em. Color: #4A90FF (active), #22C55E (completed), #262626 (locked).
- **Phase title**: Below the label, Inter 600, 20px, #F5F5F5 (active), #737373 (locked).
- **Connection between phases**: A thin line (1px, #1A1A1A) connects the bottom of one phase rectangle to the top of the next, with a right-angle bend (architectural routing style, not diagonal).

Phase states:
- **Locked**: Dashed border, all interior elements at 0.2 opacity. A small "RESTRICTED" label in 9px, #333333, at the center.
- **Available/In Progress**: Dashed border becomes solid at corners only (small 12px solid segments at each corner, creating a "construction bracket" look). Interior fully visible.
- **Completed**: Border becomes fully solid 1px #22C55E at 30% opacity. A small checkmark in a circle appears next to the phase label.

### Node Representation
Nodes are arranged inside the phase rectangle as small "rooms" on the floor plan:

- **Layout**: A flexible grid, 2-3 columns depending on node count. Nodes are rectangular cells within the phase rectangle, separated by 1px lines (#1A1A1A) that look like interior walls.
- **Cell size**: ~180px wide x 72px tall.
- **Interior of each cell**:
  - Top-left: Content type icon (SVG, 14x14) + content type label in 10px Inter 500, content_type color.
  - Center: Node title in Inter 500, 13px, #E5E5E5.
  - Bottom-right: XP in 10px, #404040. Estimated time in 10px, #333333.
- **Room number**: Each cell has a tiny number in the top-right corner (like a room number on a floor plan) — "1.1", "1.2", etc. in 9px Inter 400, #262626.

Node states:
- **Locked**: Cell interior at 0.2 opacity. Diagonal line across the cell (like a "not built yet" architectural mark).
- **Available**: Full opacity. Hover: the cell's border segments brighten to content_type color. A subtle "you are here" marker appears — a small dot.
- **In Progress**: The cell's border segments are content_type color. The room number pulses. A small "BUILDING" label in 9px below the XP.
- **Completed**: Cell gets a very subtle fill (#22C55E at 3%). Border becomes solid. Checkmark replaces room number.

### Progress Visualization
1. **Construction percentage**: Outside each phase rectangle, a label: "BUILT: 60%" in 11px Inter 500, using the phase status color.
2. **Blueprint completion**: Locked phases have their dashed outlines partially drawn (the dashes are more sparse, creating a "planned but not drawn yet" effect). As phases unlock, more of the dashes fill in.
3. **Overall counter**: At the top of the page, centered: "BLUEPRINT PROGRESS" in 10px uppercase, with "3/5 WINGS BUILT" below in 14px #F5F5F5.

### Key Animation
**The Drafting Line**: When a phase unlocks, its dashed border animates as if being drawn by a pen — the SVG stroke-dashoffset starts at full length and animates to 0 over 1.2s, tracing the rectangle clockwise from the top-left corner. This looks exactly like watching a blueprint being drawn.

When a node is completed, a thin cross-hatch pattern (two diagonal lines forming an X) briefly appears over the cell at 30% opacity, then fades — an architectural "completed construction" mark. The cell's border transitions from content_type color to #22C55E over 400ms.

### ASCII Wireframe

```
        BLUEPRINT PROGRESS
         3/5 WINGS BUILT

  FASE 01 — FUNDAMENTOS  (COMPLETED)
  ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐    5 NODES
  │ 1.1 Task    │ 1.2 Material          │    ~2.5H
  │ Setup env.  │ Intro AI              │    BUILT: 100%
  │        +20  │        +10            │
  ├─────────────┼───────────────────────┤
  │ 1.3 Pres.   │ 1.4 Quiz   │ 1.5 CP │
  │ Overview    │ Fundament. │ Review  │
  │        +15  │       +30  │    +50  │
  └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
         │
         └──────────┐
                    │
            FASE 02 — IMPLEMENTACAO  (ACTIVE)
            ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
            │ 2.1 Task  +│ 2.2 Material      │
            │ done       │ [BUILDING]         │
            ├────────────┼────────────────────┤
            │ 2.3 Task   │ 2.4 Checkpoint    │
            │ available  │ available          │
            └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
                    │
         ┌──────────┘
         │
  FASE 03 ░░░░░░░░ LOCKED ░░░░░░░░
  ┌ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ┐
  │ ░░░░░ RESTRICTED ░░░░░░░░░░░░░░░░░ │
  └ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ░ ┘
```

### Uniqueness Factor
The architectural blueprint metaphor is completely absent from EdTech. The zigzag phase layout creates natural visual rhythm without being gimmicky. The dimension lines, room numbers, and dashed borders create a sophisticated visual system that feels like a real technical document — not a toy. The "drafting line" animation of borders being drawn is mesmerizing and brand-aligned with the precision aesthetic.

---

## Concept 4: SIGNAL TOWER

### Core Metaphor
A radio transmission tower / signal visualization. The journey is a vertical antenna structure, and each phase is a transmission band. Nodes are signal pulses emanating from each band. Think: the visual language of audio waveforms, radio frequency diagrams, and oscilloscope displays — but composed into a coherent journey map.

### Visual Description
A single vertical spine runs down the center of the page — a 2px line in #1A1A1A that represents the "tower." This spine has 5 junction points (one per phase), each marked by a horizontal crossbar that extends 200px to each side of the spine.

From each crossbar, signal waveforms extend outward. These waveforms are SVG paths representing nodes — each node is rendered as a signal pulse shape along the crossbar. The overall composition looks like a highly stylized antenna diagram or a seismograph readout.

The background is pure #000000 with no grid. The purity of the black makes the thin lines and signal shapes pop.

### Phase Representation
Each phase junction on the spine is marked by:

- **Junction point**: A circle, 24px diameter, centered on the spine. Fill: #0A0A0A. Border: 2px solid, phase color (active/completed) or #1A1A1A (locked).
- **Crossbar**: A horizontal line extending 240px left and 240px right from the junction. 1px, #1A1A1A (locked) or #262626 (unlocked). Total width: 480px + spine.
- **Phase label**: Positioned to the far left of the crossbar (left-aligned, 40px from page edge). Inter 600, 14px, uppercase, letter-spacing 0.06em. Phase title below in Inter 400, 12px, #737373.
- **Frequency label**: To the far right, "BAND [N]" in 10px Inter 400, #333333.
- **Vertical spacing**: 320px between junctions (desktop).

Phase states:
- **Locked**: Junction circle is hollow (#0A0A0A fill, #141414 border). Crossbar is dotted. All signal shapes are flat lines.
- **Available/In Progress**: Junction has a subtle glow (box-shadow: 0 0 12px phase_color at 15%). Crossbar is solid.
- **Completed**: Junction fill becomes phase color at 15% opacity with solid phase-color border. Crossbar becomes phase color at 40%.

### Node Representation
Each node is a "signal pulse" along the crossbar. Nodes alternate sides: odd nodes extend upward from the crossbar, even nodes extend downward. Each pulse is:

- **Shape**: An SVG path that rises from the crossbar to a peak, then returns. The shape looks like a single EKG/waveform peak. Height: 40px (completed), 30px (available), 15px (in_progress), 8px (locked).
- **Stroke**: 1.5px, content_type color (available/in_progress), #22C55E (completed), #1A1A1A (locked).
- **Fill**: None (just the stroke path). Completed nodes get a very subtle gradient fill from content_type color at 8% to transparent.
- **Node label**: Below the peak (for upward pulses) or above the peak (for downward pulses). Inter 500, 11px, #A3A3A3. Node title, max 1 line.
- **Type indicator**: A tiny dot (4px) at the peak of the pulse, colored by content_type.

The alternating up/down creates a waveform rhythm along each crossbar. Nodes are spaced 80-100px apart along the crossbar.

Node states:
- **Locked**: Pulse is a flat, barely visible bump (8px). Label at 0.2 opacity.
- **Available**: Pulse rises to 30px. Full label visibility. Hover: pulse height animates to 40px over 200ms, and the stroke brightens.
- **In Progress**: Pulse is at 30px but the stroke animates — a bright dot travels along the pulse path from base to peak and back (1.5s loop), like a signal being transmitted.
- **Completed**: Full 40px height. Stroke is #22C55E. Gradient fill visible.

### Progress Visualization
1. **Spine fill**: The central spine fills downward with #4A90FF as phases complete. Below the current active phase, the spine is filled. Above, it's the default #1A1A1A.
2. **Signal strength**: Completed phases have taller waveform peaks than available ones, visually showing "stronger signal" = more knowledge.
3. **Transmission counter**: At the top of the spine, a small readout: "SIGNAL STRENGTH: 42%" in 12px Inter 500, #4A90FF.

### Key Animation
**The Transmission Pulse**: On the active node, a bright dot (3px, content_type color, 100% opacity) travels along the SVG path of the waveform pulse — from the crossbar up to the peak and back down — in a continuous 1.5s loop. This creates the feeling of an active signal being transmitted.

When a node is completed, the traveling dot reaches the peak and "bursts" — it expands to 8px and fades out over 300ms. The pulse path transitions from content_type color to #22C55E over 400ms, and its height grows from 30px to 40px.

Phase completion: all pulses on that crossbar simultaneously flash bright (100ms), then the junction circle fills with color, and the spine segment below extends its blue fill downward to the next junction over 800ms.

### ASCII Wireframe

```
            SIGNAL STRENGTH: 42%

                     │  (spine)
                     │
    FASE 01          │
    Fundamentos      │
                     │
        ╱╲       ╱╲ ● ╱╲       ╱╲
  ─────╱──╲─────╱──╲─┼╱──╲─────╱──╲───── crossbar
        ╲╱       ╲╱ │  ╲╱       ╲╱
       node1   node2│ node3   node4
                     │
                     │ (blue fill)
                     │
    FASE 02          │
    Implementacao    │
                     │
                 ╱╲  ●      ╱╲
  ──────╱╲──────╱─╲──┼─╱╲──╱──╲────────── crossbar
         ╲╱        ╲╱│  ╲╱  ╲╱
       done   ~active│  avail avail
                     │
                     │ (gray — unfilled)
                     │
    FASE 03          │
    ░░░ Locked       │
                     │
  ──────░░░░░░░░░░░░░●░░░░░░░░░░░░─────── crossbar
                     │
                     │
                     │
```

### Uniqueness Factor
The waveform/signal metaphor is genuinely novel for learning. The alternating up/down node pulses create a unique visual rhythm that no other platform has. The traveling dot animation on active nodes is hypnotic and purposeful. The concept of "signal strength = knowledge depth" is a powerful, intuitive metaphor that sidesteps all typical gamification tropes.

---

## Concept 5: VAULT DOORS

### Core Metaphor
A bank vault / safety deposit corridor. The journey is a long corridor viewed from above (top-down perspective), with each phase being a vault chamber, and nodes being deposit boxes within each chamber. Each chamber requires completing the previous one to unseal. Think: the visual language of heist movie blueprints, combined with a top-down architectural section.

### Visual Description
The page presents a vertical sequence of rectangular chambers, connected by short corridor segments. The composition is centered, max-width 700px. Each chamber is wider than the corridor connectors, creating a visual rhythm of expansion and contraction.

The entire composition has a subtle outer glow along its edges — #4A90FF at 3% opacity, 40px blur — creating the feeling that this structure is lit from within.

Corridor connectors between chambers are narrow (120px wide, 48px tall), centered. They contain a small SVG "seal" icon when the next phase is locked — two horizontal lines (like a sealed door) — or are empty (open passage) when unlocked.

### Phase Representation
Each chamber is a rounded rectangle:

- **Dimensions**: 700px wide (desktop), 280-360px tall depending on node count.
- **Border**: 1px solid #1A1A1A. Border-radius: 8px (the only rounded element in the entire design — vault doors are rounded).
- **Interior background**: #0A0A0A.
- **Chamber header**: Spans the full width inside the chamber, 48px tall, with a 1px bottom border #141414.
  - Left: Phase icon area — a 32x32 circle with phase number (Inter 700, 14px, white) centered inside. Border: 1.5px, phase-status-color.
  - Center: Phase title in Inter 600, 16px, #F5F5F5. Description below in 13px, #737373.
  - Right: Phase progress as a compact arc (semicircle, 32px wide, SVG) — filled proportional to completion. Color matches phase status.
- **Seal indicator**: At the top-center of the chamber, protruding slightly above the border (-8px), a small tag:
  - Locked: "SEALED" in 9px Inter 600, uppercase, #333333, on a #0A0A0A background with #1A1A1A border.
  - Available: "OPEN" in 9px Inter 600, uppercase, #4A90FF.
  - Completed: "CLEARED" in 9px, #22C55E.

Phase states:
- **Locked**: Entire chamber at 0.4 opacity. The corridor connector above shows the seal icon. Interior has a subtle diagonal stripe pattern (SVG, 1px lines, #0D0D0D, 45deg) indicating restricted access.
- **Available/In Progress**: Full opacity. No stripe pattern. A thin inner border (1px, #141414, 4px inset from the outer border) creates a "double wall" feel.
- **Completed**: Outer border becomes #22C55E at 25% opacity. Inner content has a very subtle radial gradient from center — #22C55E at 2% fading to transparent at 80%.

### Node Representation
Nodes are arranged inside the chamber as "deposit boxes" — a grid of small, uniformly-sized rectangles:

- **Layout**: 2-3 columns, centered within the chamber (below the header). Horizontal gap: 12px. Vertical gap: 12px.
- **Cell size**: 200px wide x 64px tall (2 columns) or 140px wide x 64px tall (3 columns). The grid auto-adjusts.
- **Cell design**: Rectangle with 1px border, border-radius 4px.
  - Left zone (16px wide): A vertical stripe in content_type color (3px wide, centered in the 16px zone, full cell height, border-radius 2px). This color stripe is the primary visual identifier.
  - Main zone: Title in Inter 500, 13px, #E5E5E5. Content type label below in 10px, content_type color.
  - Right edge: XP in 10px, #404040. Status icon (check, lock, or spinner dot).

Node states:
- **Locked**: Entire cell at 0.25 opacity. Color stripe is #1A1A1A. Lock icon on right.
- **Available**: Full opacity. Border #1A1A1A. On hover: border brightens to content_type color, background shifts to content_type color at 3%.
- **In Progress**: Border is content_type color at 50%. The color stripe on the left pulses opacity 50% to 100% (2s cycle). A small animated dot (spinning, 8px) on the right.
- **Completed**: Color stripe turns #22C55E. Border becomes #22C55E at 20%. Check icon on right. Background has #22C55E at 2%.

### Progress Visualization
1. **Corridor seals**: The corridor connectors between chambers visually communicate progression. Sealed corridors have the horizontal line icon. Open corridors are empty passages. Cleared corridors show a thin green line down their center.
2. **Chamber arc**: The semicircle arc in each chamber header fills proportionally — a clear, compact progress indicator per phase.
3. **Overall**: At the very top of the page, before the first chamber: "VAULT ACCESS: 2/5 CHAMBERS CLEARED" in 12px Inter 500, #737373. Below it, 5 small circles (12px each) in a row — filled (#22C55E) for cleared, outlined (#4A90FF) for active, dotted (#1A1A1A) for locked.

### Key Animation
**The Unsealing**: When a phase unlocks (previous phase completed), the corridor connector between them animates. The seal icon's two horizontal lines spread apart (translateY -4px and +4px respectively) over 600ms, then fade out. The locked chamber's diagonal stripe pattern fades out over 800ms. Finally, the chamber's opacity transitions from 0.4 to 1.0 over 500ms, and the "SEALED" tag morphs to "OPEN" (text fade, color change from #333 to #4A90FF, 400ms).

When a node is completed, its color stripe transitions from content_type color to #22C55E with a bottom-to-top wipe effect (CSS clip-path animation, 500ms). The check icon fades in (200ms).

### ASCII Wireframe

```
     VAULT ACCESS: 2/5 CHAMBERS CLEARED
         (o)(o)( )( )( )

     ┌────────────────────────────────────┐
     │  (01)  FASE 1 — FUNDAMENTOS  ◠95% │  CLEARED
     │────────────────────────────────────│
     │  ┌─────────────┐ ┌─────────────┐  │
     │  │█ Task        │ │█ Material   │  │
     │  │  Setup env   │ │  Intro AI   │  │
     │  └─────────────┘ └─────────────┘  │
     │  ┌─────────────┐ ┌─────────────┐  │
     │  │█ Presentat.  │ │█ Quiz       │  │
     │  │  Overview    │ │  Fundament. │  │
     │  └─────────────┘ └─────────────┘  │
     └────────────────────────────────────┘
              │          │
              │  (open)  │   <-- corridor
              │          │
     ┌────────────────────────────────────┐
     │  (02)  FASE 2 — IMPLEMENTACAO ◠40% │  OPEN
     │────────────────────────────────────│
     │  ┌─────────────┐ ┌─────────────┐  │
     │  │█ Task  done  │ │▓ Material   │  │  ▓ = pulsing
     │  │  Config      │ │  Frameworks │  │
     │  └─────────────┘ └─────────────┘  │
     │  ┌─────────────┐ ┌─────────────┐  │
     │  │  Task        │ │  Checkpoint │  │
     │  │  available   │ │  available  │  │
     │  └─────────────┘ └─────────────┘  │
     └────────────────────────────────────┘
              │  ══════  │
              │  SEALED  │   <-- sealed corridor
              │  ══════  │
     ┌░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░┐
     │░ (03)  FASE 3 ░░░░░░░░░░ SEALED ░░│
     │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
     │░ ┌░░░░░░░░░░░┐ ┌░░░░░░░░░░░░░┐ ░│
     │░ │░ locked ░░░│ │░ locked ░░░░│ ░│
     │░ └░░░░░░░░░░░┘ └░░░░░░░░░░░░░┘ ░│
     └░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░┘
```

### Uniqueness Factor
The vault/corridor metaphor creates a powerful sense of earned access — you literally unseal chambers as you progress. The expansion-contraction rhythm of chambers and corridors creates a unique page cadence. The color stripe on each node is a simple but distinctive visual signature. The unsealing animation (seal lines spreading apart, stripe pattern fading, chamber brightening) creates a genuinely satisfying moment of progression that no other platform offers.

---

## Comparison Matrix

| Dimension           | Horizon Strata    | Command Deck      | Blueprint Grid    | Signal Tower      | Vault Doors       |
|---------------------|-------------------|-------------------|-------------------|-------------------|-------------------|
| Layout direction    | Vertical bands    | Vertical panels   | Zigzag blocks     | Center spine      | Vertical chambers |
| Node arrangement    | Horizontal row    | Horizontal row    | 2-3 col grid      | Waveform peaks    | 2-col grid        |
| Visual density      | Medium            | High              | Medium-High       | Low-Medium        | Medium            |
| Animation signature | Drill shockwave   | Scanning border   | Drafting line draw | Traveling dot     | Seal opening      |
| Metaphor family     | Earth / geology   | Sci-fi / mission  | Architecture      | Physics / signal  | Security / vault  |
| Mobile friendliness | Excellent         | Good              | Good              | Excellent         | Excellent         |
| Premium feel        | Scientific        | Tactical          | Architectural     | Minimalist        | Luxurious         |
| Implementation ease | Medium            | Medium            | Medium-Hard       | Medium            | Easy-Medium       |
| Brand alignment     | Strong            | Strong            | Very Strong       | Strong            | Very Strong       |
| Content scannability| High              | High              | Medium            | Medium            | High              |

## Mobile Adaptation Notes (all concepts)

**Shared mobile rules (375px):**
- Max content width: 100% with 16px horizontal padding
- Section vertical padding: 48px
- Font sizes: H2 reduces to 16px, body to 13px, micro to 10px
- All node grids collapse to single column
- Animations simplify: remove traveling dots, reduce transition durations by 40%
- Touch targets: minimum 44x44px on all interactive elements

**Per-concept mobile adjustments:**

1. **Horizon Strata**: Nodes stack vertically within each stratum (single column). Depth gauge moves to top of each phase as an inline bar. Fault lines become simple 1px borders.

2. **Command Deck**: Mission panels become full-width. Nodes stack in a single column (96px wide becomes full-width, 56px tall). Corner bracket accents reduce to 6px. Scanning animation on active node still works but uses a simpler pulse instead of perimeter travel.

3. **Blueprint Grid**: Zigzag alignment disappears — all phases left-aligned. Node grid becomes single column. Dimension lines are hidden. The grid background pattern spacing increases to 64px to reduce visual noise.

4. **Signal Tower**: Spine remains centered. Crossbar shortens to 140px per side. Waveform pulses all extend upward (no alternation). Pulse heights reduce: 24px (completed), 18px (available). Labels move below the crossbar.

5. **Vault Doors**: Chambers become full-width. Node grid becomes single column. Corridor connectors shorten to 32px height. Seal icons remain.

---

## Developer Implementation Notes

**SVG best practices for all concepts:**
- Use `viewBox` on all SVGs for responsive scaling
- Prefer `stroke` over `fill` for line elements (better performance, cleaner at all sizes)
- Animations: use CSS `@keyframes` + `animation` property over JS-driven animation where possible
- For traveling dot effects (Concepts 2 and 4): use SVG `<animateMotion>` along a `<path>`, or fallback to CSS `offset-path` + `offset-distance` animation
- For the drafting line effect (Concept 3): animate `stroke-dashoffset` on the phase border path

**CSS animation patterns:**
```css
/* Pulse animation (used in multiple concepts) */
@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

/* Scan line traveling around a rectangle border */
@keyframes borderScan {
  0% { stroke-dashoffset: PERIMETER; }
  100% { stroke-dashoffset: 0; }
}

/* Drill shockwave (Concept 1) */
@keyframes shockwave {
  0% { r: 4; opacity: 0.6; }
  100% { r: 60; opacity: 0; }
}

/* Seal opening (Concept 5) */
@keyframes unsealTop { 0% { transform: translateY(0); } 100% { transform: translateY(-4px); opacity: 0; } }
@keyframes unsealBottom { 0% { transform: translateY(0); } 100% { transform: translateY(4px); opacity: 0; } }
```

**State-driven rendering approach:**
All concepts share the same data model (StudentJourney > JourneyPhase > JourneyNode). The visual differences are purely in the rendering layer. A good implementation would:
1. Keep the existing data fetching and state management
2. Create a `JourneyRenderer` component that accepts a `variant` prop
3. Each concept becomes a renderer variant that maps the same data to different SVG/CSS compositions
4. Share status-color logic, icon components, and overlay mechanics across variants
