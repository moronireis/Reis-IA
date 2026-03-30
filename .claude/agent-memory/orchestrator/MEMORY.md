# Orchestrator Memory

Last updated: 2026-03-30

## Agent System (25 Agents)

| Agent | Model | Role |
|-------|-------|------|
| orchestrator | opus | Coordination, planning, delegation only |
| market-research-analyst | sonnet | Research, ICP discovery, competitive analysis |
| cmo-strategist | opus | Strategy, positioning, funnels, Copy Squad director |
| direct-response-copywriter | sonnet | Persuasive copy (Hormozi framework) |
| humanizer | sonnet | AI pattern elimination, PT-BR voice injection |
| reviewer | sonnet | Quality gate: brand voice + Hormozi + humanization |
| execution | sonnet | File operations, structural changes |
| dev-agent | sonnet | Web dev: Astro/React/Tailwind, all sub-projects |
| designer-agent | opus | UI/UX, brand identity, wireframes, visual specs |
| analysis-agent | sonnet | Context summaries, tool evaluation |
| executor-agent | sonnet | Platform config, email, CRM, deployment |
| education-director | opus | Curriculum mapping, briefings, quality review |
| roteirista-aulas | sonnet | Lesson scriptwriting from briefings |
| educational-designer | sonnet | Lesson visuals: slides, diagrams, mind maps |
| design-system-extractor | opus | Reference site analysis, design token extraction |
| logo-brand-mark-designer | opus | Logo/symbol SVG creation |
| chief-strategy-advisor | -- | High-level strategic advisory |
| social-media-team | -- | Social media content |
| creative-director | -- | Creative direction |
| brand-site-builder | -- | Brand site development |
| company-brand-strategist | -- | Company brand strategy |
| personal-brand-strategist | -- | Personal brand strategy |
| product-brand-strategist | -- | Product brand strategy |
| movement-brand-strategist | -- | Movement brand strategy |
| vfx-motion-designer | -- | VFX and motion design |

## Copy Squad Pipeline

CMO brief (4 Hormozi angles) -> Copywriter (raw copy) -> Humanizer (PT-BR voice) -> Reviewer (quality gate) -> CMO sign-off

Rule sets in `.claude/rules/`: brand-voice.md, hormozi-framework.md, humanization-rules.md

## Tech Stack (Confirmed)

- **Framework**: Astro (static-first, React islands)
- **Styling**: Tailwind CSS
- **Typography**: Inter (all weights)
- **Database**: Supabase (hub + marketing)
- **Email**: Resend (transactional)
- **Hosting**: Vercel (hub + marketing live), localhost (website + brand)
- **Booking**: Cal.com (placeholder ready)
- **Email automation**: TBD
- **CRM**: Custom in reis-ia-hub

## Brand Identity (LOCKED)

- **Name**: REIS [IA] — "REIS" white, "[IA]" accent blue, font-weight 300
- **Primary**: Black #000000, White #FFFFFF
- **Accent**: #4A90FF (hover #6AADFF, muted #3570CC, bright #8DC4FF)
- **Surfaces**: L0 #000000, L1 #0A0A0A, L2 #111113, L3 #1A1A1A, L4 #242427
- **Mode**: Dark default
- **Brand mark**: H1-B Hourglass ONLY
- **PROHIBITED**: Gold, amber, chess pieces, crowns, Z7, gradient text, azure whisper, emojis, SaaS pricing

## Active Sub-Projects

| Project | Dir | Status |
|---------|-----|--------|
| Main Website | reis-ia-website/ | 5 pages, Phase 6 rebuild pending |
| Brandbook | reis-ia-brand/ | 24 pages, complete |
| Marketing | reis-ia-marketing/ | Live on Vercel |
| HUB Platform | reis-ia-hub/ | Auth + portal + CRM built |
| Funnels | reis-ia-funnels/ | Initialized |

## Copy Source Files (brain/assets/copy/)

website-main.md, sales-page-builder.md, sales-page-systems.md, bio-moroni-reis.md, instagram-highlights.md, email-welcome-sequence.md, linkedin-templates.md, lead-magnet-landing.md

## Design System Files

- Design system: brain/assets/design-systems/reis-ia-design-system.md
- Implementation guide: brain/assets/design-systems/reis-ia-implementation-guide.md
- Application plan: brain/assets/design-systems/application-plan.md
- Reference extractions: brain/assets/design-systems/reference-*.md
- Previews: reis-ia-website/design-previews/

## Current Phase: Phase 6 Ready

All prerequisites complete: brand ecosystem, design systems, copy, brandbook, VFX.
Next: Final website rebuild with full design system application.

## File Management Rules

1. NEVER overwrite originals in brain/assets/copy/
2. Append only with [ADDED -- YYYY-MM-DD] tags
3. Changelog at bottom of modified files
4. Portuguese in separate -pt suffix files
5. Update dates when modifying
6. Backup before modify

## Workflow

research -> strategy -> messaging -> copy -> design -> dev -> deploy
