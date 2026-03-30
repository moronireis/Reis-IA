---
name: reis-ia-hub project structure
description: Key patterns and structure for the reis-ia-hub Astro app (admin portal)
type: project
---

Hub is a server-rendered Astro app (output: server, adapter: @astrojs/node). React islands via @astrojs/react. Tailwind v4 via @tailwindcss/vite.

Key paths:
- Layout: src/layouts/AppLayout.astro — sidebar nav with main + admin sections
- Design tokens: src/styles/design-system.css (CSS variables only, no Tailwind config)
- Global styles: src/styles/global.css
- Components: src/components/ (React .tsx files)
- Pages: src/pages/ and src/pages/admin/ for admin panel

**Why:** Server output means all pages use SSR. prerender = false needed on dynamic routes.

**How to apply:** New admin pages go in src/pages/admin/. New React islands go in src/components/ as .tsx files and are imported with client:load in .astro pages.
