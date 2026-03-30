---
name: RBAC System — 4-tier role access control
description: Role hierarchy, access matrix, and implementation patterns for the REIS IA HUB RBAC system
type: project
---

4-tier role system implemented in `src/lib/access.ts`:
- starter (1) → builder (2) → mentoria (3) → admin (4)
- Helper: `hasAccess(userRole, requiredRole)` — returns true if user level >= required level

**Why:** Product requires upsell gating — starters see limited content, builders unlock Vault, mentoria clients unlock Projects and Mentoria 1:1. Admin sees everything plus management panels.

**How to apply:**
- Import `hasAccess` and `UserRole` from `src/lib/access` in any .astro page
- Middleware (`src/middleware.ts`) only blocks `/admin/*` routes and `/api/admin/*` — all other routes gate at page level
- Locked pages render `<UpgradeCTA client:load ... />` component (`src/components/UpgradeCTA.tsx`)
- Sidebar nav (`AppLayout.astro`) shows lock icon for items user can't fully access: Vault (starter), Projects (starter + builder)
- Role badge in sidebar user section: starter=gray, builder=blue, mentoria=purple, admin=green
- AcademyCatalog: courses with `access_level` column render locked overlay if user role < required
- CommunityFeed: starter sees 3 posts max + upgrade CTA card, no post creation, counts-only on interactions

Access matrix:
- Vault: builder+ (starter sees UpgradeCTA)
- Projects: mentoria+ (starter and builder see UpgradeCTA)
- Mentoria: mentoria+ (starter and builder see UpgradeCTA)
- Community: all (starter: 3 posts read-only + CTA; builder+: full)
- Academy: all (course cards gated by course.access_level column)
