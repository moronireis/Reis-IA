---
name: Reis IA Design System Token Reference
description: Accent colors, file paths, key conventions for the design system preview HTML
type: project
---

Accent palette was migrated from gold (#C9A84C) to blue (#4A90FF) as of March 2026.

**Why:** Designer agent decision to switch brand accent from warm amber/gold to Azure Blue for a more premium, tech-forward feel.

**How to apply:** All new components, pages, and effects must use --accent-blue (#4A90FF), --accent-hover (#6AADFF), --accent-muted (#3570CC), --accent-bright (#8DC4FF). Never use gold hex values.

**Key file:** `/Users/moronireis/Projetos vscode/reis-ia-website/design-previews/reis-ia-design-system-preview.html`
- Self-contained HTML (no external deps except Google Fonts)
- 12 sections with fixed sidebar nav + IntersectionObserver active state
- Uses @property --border-angle for rotating conic-gradient card borders
- Counter and stagger animations auto-trigger via IntersectionObserver
- Hourglass and Chess King SVG paths are canonical — use these paths in all pages

**Hourglass SVG path (viewBox 0 0 64 64):**
line(16,8→48,8), line(16,8→32,32), line(48,8→32,32), line(32,32→16,56), line(32,32→48,56), line(16,56→48,56)

**Chess King SVG path (viewBox 0 0 64 64):**
line(32,4→32,14), line(27,9→37,9), path arc crown, lines for body, base at y=54/58
