---
name: Page Design Patterns
description: Established design patterns and layout decisions for Reis IA page specifications
type: project
---

## Background Alternation Pattern
Sections alternate between `bg-black` (#000000) and `bg-neutral-950` (#0A0A0A). Hero always starts with `bg-black`.

## Copy Variation Choices Made
- **Home Hero**: Original headline Option A. Chess variation Option E reserved for when chess knight is more prominent.
- **Builder Hero**: Chess headline variation B (ADDED 2026-03-11) -- "AI without strategy is guessing."
- **Systems Hero**: Original headline Option A (enemy angle). Hourglass as featured decorative element, not chess.
- **Manifesto**: Chess motif variation inserted after "We start differently."
- **Footer CTA (Home)**: Hourglass headline variation A ("The real cost of waiting isn't money. It's time.")

## Page-Specific CTA Strategies
- **Home**: Multiple pathways (book assessment, see how it works, pillar-specific CTAs)
- **Builder**: Single conversion goal (application form). Sticky CTA bar on desktop.
- **Systems**: Single conversion goal (AI Revenue Audit booking). Fewer CTAs, strategically placed. This ICP resists aggressive CTA frequency.

## Motif Balance Per Page
- Home: Roughly even chess/hourglass split. Chess top half, hourglass bottom half.
- Builder: 5 chess + 5 hourglass instances. Chess in strategy sections, hourglass in urgency sections.
- Systems: 7 hourglass + 3 chess instances. Intentionally hourglass-heavy (Systems = time/efficiency pillar).

**Why:** The motif ratio should match the pillar's narrative emphasis, not be forced to 50/50.
**How to apply:** When designing future pages (Partners, Network, About), determine the primary motif based on the pillar's narrative territory.

## Component Reuse Map
Shared components across pages: StatBlock, CaseStudyBlock, QualifierGrid, PricingCard, ProcessStep, Badge, Button, Card, Nav, Footer.

## Phase 2 Interactive Preview (2026-03-17)

**File**: `reis-ia-website/design-previews/reis-ia-design-system-preview.html`
**Backup**: `reis-ia-website/design-previews/backups/pre-phase2-upgrade/`

### Key interactive patterns:
- Hairline grid: `gap:1px; background:rgba(255,255,255,0.06)` with solid-bg children
- Click-to-replay: Remove animation, force reflow with `offsetHeight`, re-add animation
- Copy-to-clipboard: `navigator.clipboard.writeText()` with fixed toast
- Section shell: Alternating surface-0/surface-1, numbered `[01]` section labels
- Scroll reveal: IntersectionObserver with `.scroll-reveal` / `.is-visible`
- Easing demos: CSS transition on `left` with dynamic cubic-bezier per curve
- Duration demos: Progress bars with `width` transition at actual token duration
- Counter animation: setInterval with increment over 1.5s

### Brand rules enforced:
- Blue accent #4A90FF only (NO gold/amber)
- NO chess pieces, NO crowns, NO Azure Whisper
- Hourglass (H1-B) as ONLY brand mark
- NO pricing tables or SaaS patterns
