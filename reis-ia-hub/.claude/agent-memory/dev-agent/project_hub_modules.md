---
name: Hub Modules — Academy, Community, Vault
description: Full implementation of Academy (Netflix-style), Community (Circle-style), Vault (resource library) modules
type: project
---

## Module structure

### Academy
- API: `src/pages/api/courses/index.ts`, `[id].ts`, `src/pages/api/lessons/index.ts`, `[id].ts`, `src/pages/api/progress/index.ts`
- Components: `AcademyCatalog.tsx` (catalog with horizontal scroll rows), `CourseDetail.tsx` (lesson list + progress), `AcademyAdmin.tsx` (2-column course+lesson management)
- Pages: `src/pages/academy/index.astro`, `src/pages/academy/[id].astro`, `src/pages/admin/academy.astro`

### Community
- API: `src/pages/api/posts/index.ts`, `[id].ts`, `api/posts/[id]/comments.ts`, `api/posts/[id]/like.ts`
- Components: `CommunityFeed.tsx` (spaces sidebar + post feed with inline comments)
- Pages: `src/pages/community/index.astro`

### Vault
- API: `src/pages/api/vault/categories.ts`, `api/vault/resources/index.ts`, `[id].ts`
- Components: `VaultLibrary.tsx` (search + category filter + resource grid), `VaultAdmin.tsx` (table + create form)
- Pages: `src/pages/vault/index.astro`, `src/pages/admin/vault.astro`

## Middleware note
Regular users need access to: `/api/progress`, `/api/posts`, `/api/vault/resources`, `/api/vault/categories`, `/api/courses`, `/api/lessons`.
These are added to `userAccessibleApiPrefixes` in `src/middleware.ts`.

**Why:** Original middleware blocked ALL non-auth API routes for non-admin users. Community/Academy/Vault need to be accessible to all authenticated members.

**How to apply:** When adding new user-facing API routes, add the prefix to that array in middleware.
