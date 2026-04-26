# Cursor — Observations

Source: https://cursor.com
Harvested: 2026-04-15
Harvest status: COMPLETE (693 KB HTML)
Cluster: Architectural Precision
Priority in mood report: #7

## What makes this premium

Cursor is the single best reference in the Top 10 for the "poetic-to-technical pivot" — the ability to open with gravitational, almost cinematic hero composition and then descend into dense technical content without a wardrobe change. The move is accomplished through three layered decisions: a display serif in the hero gives way to system sans in the technical sections; warm near-blacks in the hero give way to cool near-blacks below; and motion is generous at the top (atmospheric tonal shifts, subtle reveals) but nearly absent in the technical sections (static code panels, hover states only). The result is a page that breathes into and out of registers at the rhythm of the reader's attention. For REIS [IA], where we need to open with gravity and then present method substance, this is the most useful structural reference in the set.

## What to steal (for REIS [IA])

1. **Warm-to-cool tonal temperature pivot across the page** — subtle enough to be atmospheric, strong enough to mark emotional sections. Implemented as scroll-linked background color transitions.
2. **Serif hero → sans method typographic pivot** — display serif (like Mercury) in the hero only, system sans below. Gives the hero gravity without committing the entire site to editorial classicism. Overlaps with the Mercury serif pattern — these should be consolidated.
3. **"Fake typing" code panels in the method section** — requestAnimationFrame-driven character reveal in a code-editor mock. For REIS this translates to revealing method-artifact text (e.g. a roadmap document being typed out) in a panel.
4. **Register-matched motion density** — generous motion in the hero, near-zero motion below. Motion budget itself becomes a signal of section register.

## What to leave behind

- The code-editor product worship — REIS has no editor to show
- The green/teal secondary accents — violate REIS brand lock
- The custom icon font (`CursorIcons16`) — REIS uses minimal geometric SVG icons, not icon fonts

## REIS [IA] brand lock check

- Dark mode default: aligned
- Single blue accent: aligned in the cool sections (`#3B82F6`, `#87C3FF`), misaligned in the warm hero
- Inter compatibility: compatible
- Minimal geometric architectural: aligned
- No chess/gold/amber: aligned

## Extraction limitations

The scroll-linked tonal transition logic lives in JS chunks we did not fetch. The fake-typing code panels are inferred from visual signature. The serif identification stopped at the fallback stack — the actual licensed display serif name is not in the HTML payload.
