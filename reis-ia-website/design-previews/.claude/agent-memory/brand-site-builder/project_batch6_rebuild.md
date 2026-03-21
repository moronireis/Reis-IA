---
name: Batch 6 Rebuild Patterns
description: Patterns and decisions from the Batch 6 component pages rebuild with AIOX-level interactive demos
type: project
---

Batch 6 component pages (components, buttons, cards, forms, sections, advanced) were rebuilt on 2026-03-17 with AIOX-level interactive demos.

**Why:** The original pages had basic demos but lacked hairline grids, animated counters, marquee demos, and the visual density of AIOX's brand site.

**How to apply:**
- New components created: StatCounter.tsx (scroll-triggered counter with IntersectionObserver + rAF), MarqueeDemo.tsx (continuous scroll with hover pause + edge fade)
- ButtonShowcase.tsx rebuilt with hairline grids for state display instead of flex rows
- All pages now use hairline grid pattern consistently for state comparisons and spec tables
- Spec tables converted from `<table>` to hairline grids with `grid-template-columns: 200px 1fr` for consistency
- Forms page uses hairline grid for input state comparison (6 states in 3x2 grid)
- Cards page has a 3x2 hairline grid overview showing all 6 card variants
- Badge system shown in 5-column hairline grid
- Nav patterns shown in 2x2 hairline grid
- Build: 20 pages, 1.25s, zero errors
- Backups at `reis-ia-brand/backups/batch-6-rebuild/`
