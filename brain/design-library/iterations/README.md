# Iterations — Exploration Workspace

Last updated: 2026-04-14

Tadewald-style exploration folder. This is where designer-agent and vfx-motion-designer spin up raw HTML files to test directions before consolidating into production code.

## Purpose

When we are still deciding what a page should feel like, we do not want to touch the real codebase. This folder lets us produce `design_system.html`, `design_system2.html`, `index.html`, `index2.html` etc. as throwaway experiments.

This is what Tadewald does in his workflow: he iterates on numbered HTML variants until one direction earns promotion to the real project.

## Rules

1. **Nothing here is production code.** Everything in `iterations/` is a sketch. Do not import from here into `reis-ia-website/`, `reis-ia-hub/`, or any sub-project.
2. **Numbered variants are welcome.** `design_system.html`, `design_system2.html`, ... `design_system11.html`. Keep iterating. Do not delete old versions — they are the thinking trail.
3. **Self-contained files only.** Each HTML file should include its own CSS/JS inline or via CDN. No shared build step, no module system.
4. **Promotion means extraction.** When an iteration earns production status, the orchestrator extracts the winning patterns into `brain/design-library/patterns/` (distilled) AND into the relevant sub-project (implemented). The raw iteration file stays here as history.
5. **One subfolder per exploration session.** `iterations/2026-04-14-website-rebuild/`, `iterations/2026-05-02-hub-redesign/`. Keep the top level clean.

## Structure

```
iterations/
  README.md
  2026-04-14-website-rebuild/
    design_system.html
    design_system2.html
    design_system3.html
    index.html
    index2.html
    notes.md                 # what we learned, which direction won
```

## When NOT to use this folder

- When the pattern is already decided → go directly to production or use a pattern from `brain/design-library/patterns/`
- When you need a real component → write it in the actual sub-project
- When you are tempted to "just quickly test something" and skip the rest of the library workflow → no, consult `patterns/` first

## Current explorations

(none yet — first will be logged when the Phase 6 website rebuild begins)
