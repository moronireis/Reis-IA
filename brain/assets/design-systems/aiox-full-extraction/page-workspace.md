# AIOX — Workspace Page
URL: https://brand.aioxsquad.ai/workspace

## Page Purpose
Business Profile Intelligence dashboard. Shows business profiles with completeness metrics.

## Content Structure
1. **Title** — "Workspace"
2. **Subtitle** — "Business Profile Intelligence"
3. **Status** — "0 businesses · 0% completude media"
4. **BusinessGrid component** — Empty state (no businesses loaded)

## HTML Structure
```html
<main class="mx-auto max-w-7xl px-6 py-12">
  <div class="mb-8">
    <h1 class="font-display text-3xl font-extrabold uppercase tracking-tight">Workspace</h1>
    <MonoLabel index="00">Business Profile Intelligence</MonoLabel>
  </div>
  <BusinessGrid businesses={[]} grupos={[]} />
</main>
```

## CSS Patterns
- Max width: max-w-7xl (1280px)
- Padding: px-6 py-12
- Typography: font-display text-3xl font-extrabold uppercase tracking-tight

## Components Used
- MonoLabel (with index prop)
- BusinessGrid (with businesses and grupos props)

## Navigation Context
- Position: Top-level nav item (Workspace)
- Standalone tool/dashboard page

## Key Design Decisions
- Simple container layout (not bento/grid dashboard)
- Empty state shown by default
- Max-w-7xl container (wider than brandbook content at max-w-[1200px])
