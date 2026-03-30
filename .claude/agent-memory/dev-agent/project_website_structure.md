---
name: reis-ia-website structure and component APIs
description: Confirmed Astro project structure, component prop APIs, available icons, and page conventions for reis-ia-website
type: project
---

## Project root
`/Users/moronireis/Projetos vscode/reis-ia-website/`

## Key paths
- Pages: `src/pages/`
- Components: `src/components/`
- Icons: `src/components/icons/` (all IconXxx.astro)
- Layouts: `src/layouts/MainLayout.astro`
- Global styles: `src/styles/global.css`

## MainLayout
- Props: `title`, `description`, `ogImage`, `activePage`
- `activePage` union: `'home' | 'builder' | 'systems' | 'marketing' | 'about' | 'none'`
- Nav already has Marketing link pointing to `/marketing`

## Component APIs (confirmed)
- `Badge` — variant: accent/success/warning/error/neutral (default: accent)
- `Button` — variant: primary/secondary/ghost/hero; href; size: md/lg/hero
- `SectionLabel` — number prop, slot for label text. Renders [01] LABEL in accent blue
- `HourglassIcon` — size, strokeWidth (default 5), class, ariaHidden
- `HourglassWatermark` — size, opacity, position (top-right/bottom-left/etc)
- `AmbientPool` — size, opacity, position, color (blue/neutral)
- `Z7Icon` — size, variant (stroke/fill/glow), class
- `FaqAccordion` — items: {question, answer}[]; use `client:visible`
- `MockupFunnel` — no props, renders animated conversion funnel bars
- `MockupPipeline` — no props, renders 6-step pipeline nodes

## Available icons (src/components/icons/)
IconArrowRight, IconAward, IconBarChart, IconBot, IconBrain, IconCalendar,
IconCheckCircle, IconChevronDown, IconClock, IconCpu, IconDatabase, IconDollarSign,
IconExternalLink, IconFilter, IconGraduationCap, IconHeadphones, IconLayers,
IconMail, IconMenu, IconMessageCircle, IconPlug, IconPuzzle, IconRocket,
IconShield, IconStar, IconTarget, IconTrendingUp, IconUsers, IconWorkflow,
IconX, IconZap

## CSS utility classes (confirmed in use)
- `hero-animate hero-animate-1/2/3/4/5` — staggered entrance for hero elements
- `animate-on-scroll` — scroll reveal observer (triggers in-view animation)
- `grid-stagger` — stagger children on scroll reveal
- `text-reveal` — animated text reveal on scroll
- `card-item` — standard card with hover state
- `card-interactive` — card with pointer cursor + hover lift
- `icon-muted` — muted color for decorative icons
- `hourglass-hover-glow` — glow effect on HourglassIcon hover
- `container-standard` — standard section container
- `container-text` — narrow text container
- `container-headline` — wide headline container

## Page structure convention
Each page: frontmatter (---) with imports + data arrays, then MainLayout wrapper,
then sections alternating surface-0 / surface-1 backgrounds.
Each section: relative overflow-hidden, aria-labelledby, AmbientPool or HourglassWatermark for depth.
SectionLabel "[01] Title" at top of each section.
All CTAs → /agendar only.

## Design tokens (CSS vars)
- `--surface-0` / `--surface-1` / `--surface-3` — background layers
- `--accent-blue` = #4A90FF
- `--text-primary/secondary/tertiary/quaternary` — text hierarchy
- `--border-default` / `--border-subtle`
- `--space-2xl/3xl/4xl` — section padding
- `--text-display/h3/h4/h5/body-lg/body-sm/label/micro` — type scale
- `--radius/radius-md/radius-xl` — border radii
- `--container-text` — max-width for body text

**Why:** Confirmed by reading systems.astro, index.astro, and all referenced components.
**How to apply:** Reference these before building new pages — no need to re-read every component file each session.
