# Dev Agent Memory — reis-ia-hub

## Project
- [project_supabase_integration.md](project_supabase_integration.md) — Full Supabase auth + CRUD integration. Auth via httpOnly cookies, service_role on server only, React islands get initialData as props and mutate via API routes.
- [project_hub_modules.md](project_hub_modules.md) — Academy, Community, Vault modules: API routes, React components, .astro pages. All patterns documented.
- [project_rbac_system.md](project_rbac_system.md) — 4-tier RBAC: starter/builder/mentoria/admin. hasAccess() in src/lib/access.ts. Page-level gating via UpgradeCTA component.

## Key patterns
- Middleware at `src/middleware.ts` guards `/admin/*` pages and `/api/admin/*` routes only. All other routes handle their own access at page level via hasAccess() from src/lib/access.ts.
- Nested API routes use directory format: `src/pages/api/posts/[id]/comments.ts` for `/api/posts/:id/comments`.
- All React components use inline styles (no Tailwind). .astro pages use Tailwind classes.
- `export const prerender = false` required on all .astro pages with dynamic data.
- All imports in Astro frontmatter MUST be at the very top before any logic — `import` statements placed after variable declarations cause build failures.
