# Bureau Borsche — Suggested Patterns

Source: https://bureauborsche.com
Harvested: 2026-04-15 (thin payload)

## Pattern 1 — `patterns/typography/massive-display-hero-headline.md`

- **Category**: typography
- **Rationale**: Hero H1 set at 120–160px desktop, weight 600–700, letter-spacing -0.04em, line-height 0.9, anchored to an asymmetric grid position (not centered). The single most decisive typographic move from the Swiss-editorial cluster. For REIS this is the hero headline treatment. Probably overlaps with Pentagram's `oversized-swiss-display-type` — these two Swiss refs should be consolidated into one definitive pattern.
- **File/line hints**: Bureau Borsche's harvested HTML was too thin to extract values — pattern should reference visual signature of both Borsche and Pentagram together.

## Pattern 2 — `patterns/layout/magazine-spread-section.md`

- **Category**: layout
- **Rationale**: A section composition pattern where each major section of the page honors magazine-spread metaphor: a clear type anchor (not centered), a single visual subject, generous margin, and negative space carrying half the composition. Applied to the REIS hero, method, proof, and close sections. Not a snap-scroll pattern — the metaphor is in the composition, not in the navigation.
- **File/line hints**: N/A — philosophy pattern driven by visual signature.

## Note

Bureau Borsche's harvest is the weakest in the Top 10 in terms of extractable code. **Orchestrator recommendation**: do not distill Borsche-specific patterns in isolation. Instead, consolidate Borsche + Pentagram into a single `swiss-editorial-luxe` pattern family in `patterns/` that documents the shared discipline. The two references reinforce each other and neither alone provides enough signal to justify a standalone pattern.
