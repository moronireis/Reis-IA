# Orchestrator Memory

Last updated: March 2026

## Agent Roster (9 Agents -- All Active)

| Agent | Model | Role | Writes To |
|-------|-------|------|-----------|
| orchestrator | opus | Coordination only, never implements | brain/context/, MEMORY.md |
| market-research-analyst | sonnet | Research, ICP discovery, competitive analysis | brain/research/ |
| cmo-strategist | opus | Strategy, positioning, offers, funnels, messaging | brain/strategy/, brain/messaging/, brain/assets/campaigns/ |
| direct-response-copywriter (Copy Agent) | sonnet | Copy execution, brand element integration | brain/assets/copy/, brain/assets/content/ |
| execution | sonnet | File operations and structural changes | Any (scoped per task) |
| dev-agent | sonnet | Web dev, Astro/React, builds pages, calculator | Project code files |
| designer-agent | opus | UI/UX, brand identity, wireframes, visual design specs | Design spec documents |
| analysis-agent | sonnet | Context summaries, tool evaluation, integration research | Task-scoped outputs |
| executor-agent | sonnet | Platform config, email setup, CRM, booking tool | External tool configs |

## Confirmed Tech Stack

- **Framework**: Astro (static-first, React islands for interactive components)
- **Styling**: Tailwind CSS
- **Typography**: Inter (free, all weights)
- **Hosting**: Localhost dev first. Vercel deployment after full review.
- **Booking**: Cal.com (open source, free tier)
- **Email platform**: TBD (Phase 2)
- **CRM**: TBD (Phase 2)

## Confirmed Brand Identity

- **Primary palette**: Black (#000000) and white (#FFFFFF)
- **Accent color**: Muted gold / warm amber
- **Font**: Inter (all weights)
- **Dark mode**: Default
- **Aesthetic**: Minimal geometric, architectural, Apple-level premium
- **Hourglass** = Time. Minimal geometric icon. Systems pillar, efficiency content.
- **Chess** = Strategy. Single piece (knight/king). Builder/Partners, methodology.
- Both elements appear on every page at least once.

## Copy Source Files (brain/assets/copy/)

| File | Purpose |
|------|---------|
| website-main.md | Home page (8 sections) |
| sales-page-builder.md | Builder mentorship sales page |
| sales-page-systems.md | Systems implementation service page |
| bio-moroni-reis.md | Founder bio (3 versions) |
| instagram-highlights.md | IG highlights for 2 profiles |
| email-welcome-sequence.md | 5-email welcome sequence |
| linkedin-templates.md | 6 post types with templates |
| lead-magnet-landing.md | Calculator landing + results page |

## File Management Rules (ALL agents must follow)

1. NEVER overwrite originals in brain/assets/copy/
2. Append only with `[ADDED -- YYYY-MM-DD]` and `[VARIATION -- YYYY-MM-DD]` tags
3. Changelog at bottom of every modified file
4. Portuguese content in separate -pt suffix files
5. Update "Last updated" date when modifying files

## 4-Phase Execution Roadmap

### PHASE 1 - FOUNDATION (Week 1-2)
- Brand identity sheet (colors, typography, hourglass/chess icons, grid system)
- Brand element integration into 4 copy files (append only, [ADDED] tags)
- Page design: Home, Builder sales page, Systems service page
- Page build: 3 pages from copy + design, all CTAs functional
- Funnel review by CMO agent

### PHASE 2 - LEAD CAPTURE (Week 2-3)
- AI Agency Profit Calculator (landing + interactive tool)
- Email welcome sequence setup (5-email automation)
- CRM/email platform integration

### PHASE 3 - DISTRIBUTION (Week 3-4)
- LinkedIn content launch (templates from linkedin-templates.md)
- Instagram highlights setup (both profiles)
- Content creation (story frames, highlight covers)

### PHASE 4 - OPTIMIZATION (Week 5+)
- Replace placeholders with real case studies/metrics
- A/B testing on landing pages
- Copy adjustments from sales call feedback

## Workflow Chain

research -> strategy -> messaging -> copy -> design -> dev -> deploy

## Project Structure

```
/Users/moronireis/Projetos vscode/
    CLAUDE.md                       # Root project config
    .claude/agents/                 # 9 agent definitions
    .claude/agent-memory/           # Per-agent private memory
    brain/research/                 # Market analyses, competitors, audience
    brain/strategy/                 # Positioning, offers, funnel, GTM, ICP
    brain/messaging/                # Brand voice
    brain/assets/copy/              # 8 copy deliverables
    brain/assets/campaigns/         # Campaign briefs
    brain/assets/content/           # Content pieces
    brain/context/                  # Business profile, project status
```

## Current State (March 2026)

- All strategy + messaging + copy: COMPLETE
- All 9 agent definitions: COMPLETE
- Tech stack + brand identity: CONFIRMED
- NO code exists yet
- NO design assets exist yet
- Next step: Designer Agent creates brand identity sheet
