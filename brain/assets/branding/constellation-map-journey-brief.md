# BRIEF CRIATIVO: Constellation Map Journey

Last updated: 2026-04-05

> **Owner**: creative-director
> **Status**: Ready for implementation
> **Consumed by**: dev-agent, designer-agent
> **Context**: Replaces the current vertical phase-map layout in JourneyExperience.tsx with a constellation / star-atlas spatial experience.

---

## Conceito Central

**"Your progress is written in the stars."**

The learner navigates a dark cosmos where each phase is a constellation — a cluster of stars (nodes) connected by thin luminous lines that form a recognizable shape. Completed work literally illuminates the map: dark regions ignite with light as the student advances. The feeling is not "checking off a to-do list" but "charting unknown territory and watching it come alive."

This is a cartography of mastery. The student is an explorer, not a student.

---

## 1. OVERALL ATMOSPHERE

### The World

The viewport is a window into deep space. Pure black (#000000) with three depth layers that create parallax-like richness without actual parallax scrolling:

**Layer 0 — Deep Field (furthest back)**
- Hundreds of tiny dots (1px) at extremely low opacity (0.015 - 0.03) scattered randomly across the viewport.
- These are static. They never move. They are the "fixed stars" — the universe's wallpaper.
- Implementation: A single absolutely-positioned div with a CSS radial-gradient repeated pattern, or a pre-rendered SVG with ~200 circles. No animation.

**Layer 1 — Nebula Wash (middle depth)**
- 2-3 large, soft radial gradients in blue (#4A90FF at 0.03-0.05 opacity), each 40-60vw in diameter, placed asymmetrically.
- These create "regions of light" — areas of the cosmos that feel warmer, more alive. They should loosely correspond to where constellations sit.
- One nebula wash should be positioned near the student's current active phase — as if their presence illuminates that region.
- Implementation: Absolutely-positioned divs with radial-gradient + blur(80px). On scroll, they remain fixed (position: fixed), creating a subtle depth effect against the scrolling content.

**Layer 2 — Constellation Field (foreground)**
- The actual phases, nodes, connections, and interactive elements.
- Everything in this layer scrolls naturally.

### Entering the Space

On page load:
1. The background fades in over 800ms (from pure black to black + deep field + nebula).
2. The constellations fade in with a 200ms stagger per phase, starting from the student's current position outward. Not top-to-bottom — radially outward from where the student "is."
3. A very subtle zoom effect: the constellation field starts at scale(0.97) and eases to scale(1) over 600ms. This creates a "camera settling into position" feel.

**The feeling**: Calm authority. Like opening a star chart in a spacecraft. Not gamified excitement — measured, premium discovery.

---

## 2. CONSTELLATION LAYOUT PATTERN

### Spatial Philosophy

The current layout is essentially vertical with minor left/right offsets. The new layout should feel like an actual star map — phases arranged in a 2D plane that the user explores by scrolling (vertical primary, with horizontal spread).

### Phase Arrangement

Each phase occupies a **bounding region** of approximately 400x350px (desktop) / 300x300px (mobile). Phases are arranged in a **descending zigzag with intentional asymmetry**:

```
Desktop Layout (conceptual):

         [Phase 1]
                      [Phase 2]
    [Phase 3]
                  [Phase 4]
         [Phase 5]
                         [Phase 6]
```

Exact positioning uses this formula:
- **Y position**: `phase_index * 320px` (vertical spacing between phase centers)
- **X position**: Alternating between 3 horizontal zones: left (20%), center (50%), right (75%). The pattern is NOT strictly alternating — it follows a pseudo-random but deterministic sequence based on phase index: `[center, right, left, right, center, left, ...]`. This avoids the "zigzag" predictability.
- Each phase center has a random-looking but deterministic offset of +/- 30px in both X and Y (seeded by phase ID hash) to break geometric rigidity.

**Why this matters**: Real constellations are not evenly spaced. The irregularity is what makes it feel like a star map rather than an org chart.

### Mobile Arrangement

On mobile, phases stack vertically (single column) but with alternating left/right offsets of 20-40px to maintain some spatial character. Never center-aligned — that kills the constellation feel.

### Node Arrangement Within a Phase (The Constellation Shape)

Each phase's nodes form a **constellation pattern**. The nodes are the "stars" of that constellation, and thin lines connect them to form a shape.

**Node positioning within a phase bounding box (400x350px)**:

Instead of a grid, nodes are placed in predefined constellation-like patterns. Pre-define 6-8 layout templates that accommodate 3-8 nodes each:

**Template A (3 nodes)** — Triangle:
```
    *
   / \
  *---*
```

**Template B (4 nodes)** — Diamond:
```
    *
   / \
  *   *
   \ /
    *
```

**Template C (5 nodes)** — W shape:
```
  *       *
   \   / \
    \ /   *
     *
```

**Template D (6 nodes)** — Hexagonal cluster:
```
    *---*
   / \ / \
  *   *   *
       \
        *
```

**Template E (7 nodes)** — Big Dipper inspired:
```
  *---*
       \
    *---*---*
   /
  *---*
```

**Template F (4 nodes)** — Square with extension:
```
  *---*
  |   |
  *---*
```

The template is selected based on node count. Node positions within each template are stored as normalized coordinates (0-1 range) and scaled to the bounding box.

**Connection lines within a constellation**: Thin lines (1px, rgba(255,255,255,0.12) for locked; 1px #4A90FF at 0.4 opacity for available/in-progress; 1px #22C55E at 0.5 opacity for completed) connecting adjacent nodes in the template pattern. These are the "constellation lines."

### Inter-Phase Connections

Phases connect to each other via a **trajectory line** — a longer, curved SVG path from the last node of one constellation to the first node of the next.

- **Completed trajectory**: Solid line, 1px, gradient from #22C55E to #4A90FF, with a slow-flowing dash animation (backgroundPosition shift over 4s).
- **Available trajectory**: Dashed line (4px dash, 8px gap), rgba(74,144,255,0.25), with a subtle pulse.
- **Locked trajectory**: Dotted line (2px dash, 6px gap), rgba(255,255,255,0.04). Nearly invisible.

The curve uses a quadratic bezier (SVG `Q` path) with the control point offset perpendicular to the straight line between phases, creating a gentle arc. Alternate the arc direction (left, right, left) for visual variety.

---

## 3. NODE VISUAL LANGUAGE — STARS

### Base Star Anatomy

Every node renders as a "star" — a circular element with these layers (inside out):

1. **Core**: A filled circle. Size and brightness vary by state.
2. **Corona**: A larger semi-transparent circle behind the core. Creates the "glow" effect.
3. **Label**: Node title appears below/beside the star on hover or when the phase is selected.

### Star Sizes by Content Type

Content types are distinguished by **size and subtle shape variation**, not color (color is reserved for state):

| Content Type | Core Size | Corona Size | Shape Detail |
|-------------|-----------|-------------|--------------|
| **task** | 12px | 28px | Plain circle — the "standard star" |
| **material** | 10px | 24px | Plain circle, slightly smaller — "reading star" |
| **presentation** | 14px | 32px | Circle with 4 small rays (tiny lines extending 4px from core at 45-degree angles) — "bright star" |
| **checkpoint** | 16px | 36px | Circle with a thin ring at 20px diameter — "double star" / ringed star |
| **quiz** | 12px | 28px | Circle with 3 small dots at 120-degree intervals around the corona edge — "triple star system" |

### Star States

| State | Core Color | Corona Color | Animation | Cursor |
|-------|-----------|-------------|-----------|--------|
| **locked** | rgba(255,255,255,0.08) | rgba(255,255,255,0.02) | None | default |
| **available** | rgba(255,255,255,0.50) | rgba(74,144,255,0.08) | Soft pulse: opacity oscillates 0.08-0.15 over 3s | pointer |
| **in_progress** | #4A90FF | rgba(74,144,255,0.15) | Steady pulse: corona opacity 0.10-0.25 over 2s + ring expansion animation (scale 1 to 1.6, opacity 0.3 to 0, 3s loop) | pointer |
| **completed** | #22C55E | rgba(34,197,94,0.12) | None (stable, bright, confident) | pointer |
| **skipped** | rgba(255,255,255,0.15) | none | None | default, 0.4 opacity |

**Key principle**: Locked stars are barely visible — like distant, dim stars. Available stars have a faint warmth. In-progress stars actively pulse with energy. Completed stars are bright and stable — they have arrived. This creates a natural "light spreading across the cosmos" as the student progresses.

### Star Label

- Font: Inter, 11px, weight 500
- Color: matches state (locked: rgba(255,255,255,0.20), available: rgba(255,255,255,0.50), in_progress: #4A90FF, completed: #FFFFFF)
- Position: 8px below the star center
- Visibility: Hidden by default on the overview map. Revealed on hover (individual star) or when the phase is "focused" (all stars in that phase show labels).
- Max width: 120px, text-overflow: ellipsis

---

## 4. CONNECTION LINES — CONSTELLATION WIRING

### Intra-Phase Connections (Within a Constellation)

These are the lines that define the constellation shape — connecting stars within a single phase.

- **SVG line elements** within the phase's SVG container
- **Stroke width**: 1px
- **Stroke color by state**: 
  - Both nodes locked: rgba(255,255,255,0.04)
  - At least one available: rgba(255,255,255,0.08)
  - At least one in_progress: rgba(74,144,255,0.15)
  - Both completed: rgba(34,197,94,0.20)
- **Style**: Solid line. No dashes. Clean like a star chart.
- **No animation on these lines** — they are structural, not decorative.

### Inter-Phase Connections (Between Constellations)

These are the journey's "hyperspace routes" — connecting one constellation to the next.

- **SVG path elements** in a full-width SVG that sits behind all constellation groups
- **Stroke width**: 1px
- **Stroke dasharray**: 
  - Completed: none (solid)
  - Active: "6 4" (dashed, flowing)
  - Locked: "2 6" (sparse dots)
- **Stroke color**:
  - Completed: linear gradient #22C55E to #4A90FF (use SVG linearGradient)
  - Active: #4A90FF at 0.30 opacity
  - Locked: rgba(255,255,255,0.04)
- **Flow animation** (active connections only): strokeDashoffset animates from 0 to -20 over 2s linear infinite. Creates a "energy flowing toward the next constellation" effect.
- **Path shape**: Quadratic bezier curves. Control point offset is 60-100px perpendicular to the direct line.

---

## 5. INTERACTION AND ANIMATION

### 5A. Hover on a Star (Node)

**Timing**: 150ms ease-out

**What happens**:
1. Core scales to 1.3x
2. Corona opacity increases by +0.10
3. A thin ring (1px, star's state color) appears at 1.5x core diameter, opacity 0.3
4. Label fades in below the star (opacity 0 to 1, 150ms)
5. A tooltip card appears with: node title, content type label, XP reward, estimated time. Card appears 12px above the star, centered.

**Tooltip card style**:
- Background: #111111
- Border: 1px solid rgba(255,255,255,0.08)
- Border-radius: 8px
- Padding: 10px 14px
- Font: Inter 12px, weight 500, color #FFFFFF
- Subtext (type, XP, time): Inter 10px, weight 400, color rgba(255,255,255,0.50)
- Box-shadow: 0 4px 24px rgba(0,0,0,0.60)
- Max-width: 200px

### 5B. Click on a Star (Node)

Opens the ContentOverlay (already exists). The transition:

1. The clicked star emits a brief flash: corona scales to 2x over 200ms, then back to 1x. Like a star being "activated."
2. The background dims to rgba(0,0,0,0.80) over 300ms.
3. The ContentOverlay slides in from the right (translateX(100%) to translateX(0)) over 400ms with cubic-bezier(0.16, 1, 0.3, 1).
4. Other stars reduce opacity to 0.15 over 300ms (the cosmos "fades" while you focus on one star).

**On close**:
1. ContentOverlay slides out to the right, 300ms.
2. Stars restore original opacity, 300ms.
3. If the node was just completed, the star transitions from in_progress to completed colors — a satisfying "solidification" moment (see 5E).

### 5C. Hover on a Phase Label / Constellation Name

When hovering the phase title (displayed near the constellation center):
1. All stars in that constellation slightly increase brightness (+0.05 opacity on all coronas), 200ms.
2. Intra-phase connection lines brighten to 2x their base opacity, 200ms.
3. The constellation "comes alive" as a group — you see the shape more clearly.

### 5D. Click on a Phase / Focus a Constellation

When a phase is clicked (or the first visit to that phase):

1. The viewport smoothly scrolls to center that constellation (scrollIntoView with behavior: smooth, or manual scrollTo with easing over 600ms).
2. The constellation scales up slightly — not a literal CSS scale, but the bounding box expands from 400x350 to 480x420, and node positions recalculate to spread out. This gives more room for labels and interaction. Transition: 400ms ease-out.
3. All labels in this constellation become visible.
4. Other constellations reduce opacity to 0.30, 300ms. The focused constellation is at full brightness.
5. A thin boundary line appears around the constellation — not a box, but a very faint (rgba(74,144,255,0.06)) convex hull around the outermost stars, dashed.

**Unfocus** (click outside or press Escape): Reverse all of the above, same timings.

### 5E. Node Completion Ceremony

When a node transitions from in_progress to completed:

1. **Star flash**: The core emits a radial burst — a circle that expands from core size to 3x core size over 400ms, opacity 0.5 to 0, color #22C55E. This is the "supernova" moment.
2. **Color transition**: Core color transitions from #4A90FF to #22C55E over 300ms.
3. **Corona settles**: Corona changes from pulsing blue to static green, 300ms.
4. **Connection lines update**: Any constellation lines connected to this node update their color to reflect the new state, 300ms.
5. **XP counter**: If visible, the journey's XP total ticks up with a counting animation (increment by 1 every 30ms until reaching the new total).
6. **Sound**: No sound (web platform constraint), but the visual "flash" should feel like a silent explosion.

### 5F. Phase Completion Ceremony

When all required nodes in a phase are completed:

1. **Constellation solidifies**: All connection lines in the constellation simultaneously brighten to rgba(34,197,94,0.35) over 400ms. The shape "locks in" — the constellation is now permanently visible.
2. **Phase title glows**: The phase label briefly pulses green (text-shadow: 0 0 20px rgba(34,197,94,0.40)) for 1.5s, then settles to a stable green.
3. **Next phase wakes up**: The trajectory line to the next phase animates — the locked dotted line transforms into an available dashed line with the flowing animation. This takes 800ms and is the visual "unlocking" moment.
4. **Next constellation fades in**: If the next phase was locked (barely visible), its stars fade from 0.08 opacity to their available state over 600ms, staggered by 80ms per star.

**This is the biggest reward moment in the entire experience.** It should feel like discovering a new region of the sky.

---

## 6. PROGRESS VISUALIZATION

### 6A. The Illumination Metaphor

Progress IS light. The map starts mostly dark (locked phases are near-invisible). As the student completes work, regions of the cosmos literally light up. This is not a progress bar — it is a spatial transformation of the entire interface.

**Visual math**:
- 0% progress: The map is almost entirely dark. Only Phase 1's constellation is faintly visible.
- 25% progress: Phase 1's constellation is bright green (complete), Phase 2 is actively blue, faint outlines of Phase 3 are emerging.
- 50% progress: Half the sky is illuminated. A clear frontier between "charted" (bright) and "uncharted" (dark) territory.
- 100% progress: The entire map blazes with light. Every constellation is green, every trajectory line is solid. The cosmos is fully mapped.

### 6B. Progress Header

At the top of the viewport (sticky, z-index 10), a minimal header:

- Left: Journey title (Inter 14px, weight 600, #FFFFFF)
- Center: Narrative text that changes with progress (Inter 12px, weight 400, rgba(255,255,255,0.50)). Examples:
  - 0%: "Inicio da jornada"
  - 15%: "Primeiras estrelas mapeadas"
  - 30%: "A constelacao toma forma"
  - 50%: "Metade do cosmos explorado"
  - 75%: "As ultimas fronteiras"
  - 100%: "Cosmos completamente mapeado"
- Right: XP counter (Inter 12px, weight 600, #4A90FF) + thin progress arc (ProgressRing component, 28px diameter)

**Header background**: rgba(0,0,0,0.85) with backdrop-filter: blur(12px). Border-bottom: 1px solid rgba(255,255,255,0.04).

### 6C. Minimap (Desktop Only)

Bottom-right corner, fixed position. A tiny (120x200px) thumbnail of the entire journey map showing:
- Small dots for each constellation (colored by state)
- A viewport indicator (thin white rectangle) showing where the user currently is in the scroll.
- Click on the minimap to jump to that region.

**Style**: Background rgba(0,0,0,0.60), border: 1px solid rgba(255,255,255,0.06), border-radius: 8px, padding: 8px.

**Priority**: Medium. Implement after core constellation experience is solid.

---

## 7. BRAND ELEMENTS

### Hourglass Placement

The hourglass appears as an ultra-subtle decorative element — a watermark at 0.02 opacity, positioned in the center of the deep field layer. It should be barely perceptible, discoverable only if you look for it. Size: approximately 40% of viewport height. Color: white at 0.02 opacity.

This is the "hidden constellation" — the shape the entire journey traces when you zoom out.

### Time-as-Value Narrative

The progress narrative (Section 6B) uses time-themed language that reinforces "O Tempo e Rei" without being explicit:
- Node completion messages reference time recovered: "Mais uma etapa. Mais tempo a seu favor."
- Phase completion: "Constelacao mapeada. O caminho fica mais claro."

### Brand Colors in Context

- **#4A90FF** (Accent Blue): Active/in-progress state, trajectory lines, interactive highlights. This is the "energy" color — where the action is happening now.
- **#22C55E** (Green): Completed state only. This is the "settled" color — what has been achieved.
- **#FFFFFF at low opacity**: Available state, structural elements. This is the "potential" color — what could be next.
- **rgba(255,255,255,0.04-0.08)**: Locked state. This is the "unknown" — what lies ahead.

---

## 8. IMPLEMENTABILITY NOTES

### Technical Constraints (STRICT)

- **React inline styles + CSS keyframe animations** (injected via style tag, as currently done in graphAnimations.ts)
- **SVG for all connection lines and star decorations** (corona, rings, rays)
- **No Canvas, no WebGL, no external animation libraries**
- **No Framer Motion, no GSAP, no Three.js**
- **Dark mode only** (#000 base)
- **Inter font** (already loaded)

### SVG Architecture

The entire constellation map should be structured as:

```
<div style="position: relative"> // Scroll container
  
  // Layer 0: Deep field (fixed, CSS only)
  <div style="position: fixed; ..."> // Star dust + nebula gradients </div>
  
  // Layer 1: Full journey SVG (scrolls with content)
  <svg viewBox="0 0 {width} {totalHeight}" style="position: absolute; top: 0; left: 0; width: 100%; pointer-events: none;">
    // Inter-phase trajectory paths
    // Constellation connection lines (per phase group)
  </svg>
  
  // Layer 2: Interactive nodes (React elements positioned absolutely)
  {phases.map(phase => (
    <div style="position: absolute; left: {phaseX}; top: {phaseY}; width: 400px; height: 350px;">
      // Phase label
      // Node stars (absolutely positioned within phase box)
    </div>
  ))}
  
</div>
```

### Performance Considerations

- **Limit animated elements**: Only the current phase's constellation should have active pulse animations. Other constellations render static.
- **Use CSS animations over JS animations** wherever possible. CSS animations are GPU-composited.
- **Particle count**: Maximum 30 ambient particles (current is 28 — good).
- **SVG path count**: Pre-calculate all paths. Do not recalculate on scroll.
- **requestAnimationFrame**: Only for the flowing dash animation on trajectory lines (strokeDashoffset). Everything else is CSS.

### Mobile Adaptations

- **No minimap** on mobile.
- **No ambient particles** on mobile (already the case).
- **Constellation shapes simplify**: On mobile, nodes within a phase arrange in a loose vertical cluster (not a horizontal spread). Still not a grid — stagger positions by 15-25px left/right.
- **Touch targets**: Star core tap targets must be minimum 44x44px (accessibility). The visual star can be 12px, but the tap area must be 44px.
- **Phase focus on tap**: Tapping a constellation on mobile focuses it (reveals labels, expands slightly). Tapping again on a specific star opens the ContentOverlay.
- **Reduced nebula**: Only 1 nebula gradient on mobile (not 3), at lower opacity.

### Accessibility

- **prefers-reduced-motion**: When active, disable ALL animations. Stars render in their final state colors without pulse/glow. Trajectory lines render static (no flow). Completion ceremonies skip — state changes are instant.
- **Contrast**: All interactive text must maintain 4.5:1 contrast ratio against #000000. Check: #4A90FF on #000 = 4.64:1 (passes). rgba(255,255,255,0.50) on #000 = does NOT pass — use rgba(255,255,255,0.60) minimum for any interactive label.
- **Screen reader**: Each star must have an aria-label: "[Content type]: [Node title] — [Status]". Phase groups must have role="group" with aria-label="Phase: [Phase title]".
- **Keyboard navigation**: Tab cycles through available/in_progress stars. Each star is focusable with a visible focus ring (2px solid #4A90FF, offset 2px). Enter activates. Escape closes ContentOverlay.
- **Focus management**: When ContentOverlay opens, focus moves to the overlay. When it closes, focus returns to the star that opened it.

---

## 9. VISUAL REFERENCES (Pattern Descriptions)

### What to Borrow

**From Star Atlases**: The aesthetic of thin white lines connecting points of varying brightness on a black field. The sense of vastness. The way constellation names float near their shapes in small, muted type.

**From Game Skill Trees (Path of Exile)**: The feeling of a massive web of possibilities where your progress lights up a specific path. The satisfaction of seeing your "build" take shape. The locked areas that hint at future power.

**From Space Navigation UIs (Elite Dangerous galaxy map)**: The smooth camera movement when transitioning between zoom levels. The way selecting a system highlights it and dims everything else. The trajectory lines between systems.

**From Obsidian Graph View**: The organic, non-grid arrangement of nodes. The way clusters naturally form. The zoom-to-focus interaction.

**From Duolingo**: The clear state communication (gold = done, blue = active, gray = locked). The celebration moments. The progress that feels like advancement, not just completion.

### What to Avoid

- **Gamification cliches**: No bouncing animations, no confetti explosions, no achievement badges cluttering the map.
- **Sci-fi kitsch**: No scan lines, no HUD overlays, no "targeting reticle" effects, no green matrix-style text.
- **Over-decoration**: No particle trails following the cursor, no nebula animations, no lens flare effects. The cosmos is elegant and still.
- **Colorful chaos**: The palette is strictly black/white/blue/green. No rainbow skill tree. No color-per-type rainbowing.

---

## 10. IMPLEMENTATION PRIORITY

### Phase 1 — Core Constellation (High Priority)
1. Phase layout in 2D space with zigzag positioning
2. Star nodes with state-based visual treatment (all 5 states)
3. Intra-phase constellation connection lines
4. Inter-phase trajectory curves
5. Deep field background (static star dust + nebula)
6. Click to open ContentOverlay (existing)

### Phase 2 — Interaction Polish (High Priority)
7. Hover effects on stars (scale, tooltip)
8. Phase focus/unfocus interaction
9. Smooth scroll to active phase on load
10. Progress header with narrative text

### Phase 3 — Ceremony and Delight (Medium Priority)
11. Node completion flash animation
12. Phase completion ceremony (constellation solidification + next phase wake)
13. XP counting animation
14. Label reveal animation on phase focus

### Phase 4 — Advanced (Low Priority)
15. Minimap (desktop only)
16. Constellation shape templates (vs. algorithmic placement)
17. Hourglass watermark

---

## Notas para Designer Agent

- Produce exact constellation template coordinates for 3-8 node counts. Normalize to 0-1 range within a bounding box. Include which nodes connect to which (the adjacency list that forms the constellation shape).
- Ensure the trajectory curves between phases feel organic. Use reference of actual star chart inter-constellation dotted lines.
- The phase labels should use Inter 13px weight 600, letter-spacing 0.04em, uppercase. Positioned at the geometric center of the constellation, offset upward by 20px from the topmost star.

## Notas para Dev Agent

- The existing JourneyExperience.tsx has the right data model (phases, nodes, states). The refactor replaces the layout and visual treatment, not the data flow or API integration.
- Keep ContentOverlay.tsx and graphAnimations.ts as foundations. Extend graphAnimations.ts with new keyframes for the constellation system.
- The SVG layer for connection lines should use a single SVG element sized to the full scroll height of the journey. Node interactive elements remain as React divs positioned absolutely.
- Phase positions should be computed in a useMemo based on phase count and viewport width. Store as an array of {x, y} coordinates. Node positions within phases use the constellation template coordinates scaled to the phase bounding box.
- The "flow" animation on trajectory lines (strokeDashoffset) can use a CSS animation on the SVG path element. No JS animation frame needed.
- All hover states are managed via React useState (hovered node ID, focused phase ID). No CSS :hover — inline styles change based on state.

## Notas de Acessibilidade

- prefers-reduced-motion: All animations disabled. State changes are instant. Stars show final-state colors without transition.
- Minimum contrast: Raise interactive text minimum from 0.50 opacity to 0.60 opacity white on black.
- Touch targets: 44x44px minimum on all stars, regardless of visual size.
- Focus management: Trap focus in ContentOverlay when open. Return focus on close.
- aria-labels on all interactive stars. role="group" on phase containers.
- Keyboard: Tab navigation through available stars. Enter to activate. Escape to close overlay / unfocus phase.
