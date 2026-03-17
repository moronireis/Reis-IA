---
name: Brand site scaffold details
description: Tech stack, file paths, and conventions established in Batch 2 scaffold
type: project
---

Brand site at `/Users/moronireis/Projetos vscode/reis-ia-brand/`.

**Why:** Single source of truth for Reis IA brand identity, separate from the marketing site at reis-ia-website/.

**How to apply:**
- Astro 5.x + React 19 + Tailwind CSS v4 (via @tailwindcss/vite, NOT @astrojs/tailwind which is v3 only)
- Tailwind v4 uses `@import "tailwindcss"` in CSS, no tailwind.config file needed for basic usage
- Design tokens in `src/styles/design-system.css` as CSS custom properties
- Animation classes in `src/styles/animations.css`
- Global styles/imports in `src/styles/global.css`
- Navigation data centralized in `src/data/navigation.ts`
- Two layouts: BaseLayout (general), BrandbookLayout (adds PageHeader bar)
- Reusable components: Logo, Header, Footer, PageHeader, SectionLabel
- All brandbook pages live at `src/pages/brandbook/[slug].astro`
- Inter Variable font loaded via @fontsource-variable/inter
- Dark mode only, no theme toggle
- Container utilities defined as plain CSS classes (container-standard, container-wide, etc.)

**Batch 3 additions (2026-03-17):**
- Shared components: CopyButton.tsx (React island), ColorSwatch, TokenTable, TypeSpecimen, SpacingBar, DosDonts
- Brand pages: guidelines, foundations, logo, icons, moodboard, strategy
- CopyButton uses client:visible for lazy hydration
- Page pattern: BrandbookLayout > sections alternating surface-0/surface-1 > SectionLabel > content
- gradient-divider used between all sections
- All token values from design-system.css, no hardcoded colors
