# Project Configuration

## Project Identity

**Reis IA** — an ecosystem focused on implementing and monetizing Artificial Intelligence for businesses, led by Moroni Reis. The agent system supports market research, strategy, messaging, copy production, design, and web development to help scale the Reis IA ecosystem (Builder, Systems, Partners, Network).

Full business context: `brain/context/business-profile.md`

## Agent System

### Available Agents

| Agent | Role | Model |
|-------|------|-------|
| orchestrator | Coordination, planning, delegation. Never implements directly. | opus |
| market-research-analyst | Market analysis, competitor research, ICP discovery, positioning gaps. | sonnet |
| cmo-strategist | Marketing strategy, positioning, offers, funnels, go-to-market planning. | opus |
| direct-response-copywriter | Persuasive copy execution: sales pages, VSL scripts, emails, ads. | sonnet |
| execution | File operations, folder organization, asset generation. | sonnet |
| dev-agent | Web development: Astro pages, React components, Tailwind styling, project setup. | sonnet |
| designer-agent | UI/UX design specs, brand identity, page layouts, wireframes-as-text. | opus |
| analysis-agent | Context summaries, tool evaluation, integration research, file audits. | sonnet |
| executor-agent | Platform configuration: email setup, CRM, booking tools, deployment. | sonnet |

### Workflow Chain

```
orchestrator
    +---> market-research-analyst  (produces research)
    +---> cmo-strategist           (consumes research, produces strategy)
    +---> direct-response-copywriter (consumes strategy, produces copy)
    +---> designer-agent           (consumes copy + strategy, produces design specs)
    +---> dev-agent                (consumes design specs + copy, produces code)
    +---> executor-agent           (configures external platforms and tools)
    +---> analysis-agent           (produces context summaries for any agent)
    +---> execution                (file operations when needed)
```

### ICP Ownership Split

- **market-research-analyst** discovers and maps raw ICP data (demographics, firmographics, pain points, desires, objections, voice-of-customer).
- **cmo-strategist** refines, prioritizes, and makes strategic ICP decisions (targeting priorities, segment selection, positioning per segment).

## Tech Stack

| Component | Choice | Notes |
|-----------|--------|-------|
| Framework | Astro | Static-first, React islands for interactive components |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Typography | Inter | Free, all weights, via Google Fonts or self-hosted |
| Development | Localhost | Local dev server first |
| Deployment | Vercel | After review and placeholder replacement |
| Booking | Cal.com | Open source, free tier, no branding |
| Email platform | TBD | Phase 2 decision |
| CRM | TBD | Phase 2 decision |

## Brand Identity

- **Primary colors**: Black (#000000), White (#FFFFFF)
- **Accent color**: Muted gold / warm amber
- **Mode**: Dark mode default
- **Aesthetic**: Minimal geometric, architectural, Apple-level premium
- **Font**: Inter (all weights)
- **Hourglass motif**: Represents TIME. Minimal geometric icon. Used in Systems pillar, efficiency content.
- **Chess motif**: Represents STRATEGY. Single piece (knight/king). Used in Builder/Partners, methodology.
- Both brand elements appear on every page at least once.

## Folder Structure

```
/
    .claude/
        agents/             # Agent definition files (9 agents)
        agent-memory/       # Agent-private persistent memory (per-agent)
    brain/                  # Shared project knowledge base
        research/           # Raw research and data
            market/         # Market analyses
            competitors/    # Competitor deep-dives
            audience/       # Voice-of-customer, surveys, interview notes
        strategy/           # Strategic decisions and frameworks
        messaging/          # Approved messaging and angles
        assets/             # Generated deliverables
            copy/           # Sales pages, emails, VSL scripts, ads
            campaigns/      # Campaign briefs and execution plans
            content/        # Blog posts, social content, lead magnets
        context/            # Project identity and shared context
    CLAUDE.md               # This file
```

## Conventions

### Knowledge Base Rules

1. **brain/ is shared knowledge.** Any agent can read from brain/. Only the designated owner agent writes to a given section.
2. **agent-memory/ is private.** Each agent's memory directory is for that agent's internal learning only.
3. **Research flows into strategy, strategy flows into messaging, messaging flows into assets.** Respect this pipeline.
4. **Always use absolute file paths** in agent instructions and references.
5. **Never duplicate knowledge** between agent-memory/ and brain/. Agent memory stores patterns and lessons learned. Brain stores deliverables and decisions.

### File Ownership

| brain/ directory | Owner (creates/updates) | Consumers (read-only) |
|-----------------|------------------------|----------------------|
| research/ | market-research-analyst | cmo-strategist, orchestrator |
| strategy/ | cmo-strategist | direct-response-copywriter, designer-agent, orchestrator |
| messaging/ | cmo-strategist | direct-response-copywriter, designer-agent |
| assets/copy/ | direct-response-copywriter | dev-agent, designer-agent, orchestrator |
| assets/campaigns/ | cmo-strategist | orchestrator |
| context/ | orchestrator (+ user) | ALL agents |

### File Management Rules (ALL agents must follow)

1. **NEVER overwrite originals** in `brain/assets/copy/`. Keep existing content exactly as it is.
2. **Append only** — add new content below originals with `[ADDED -- YYYY-MM-DD]` tags.
3. **Variations** — mark alternative versions with `[VARIATION -- YYYY-MM-DD]` tags.
4. **Changelog** — add a changelog section at the bottom of any modified file.
5. **Portuguese content** — create separate files with `-pt` suffix (e.g., `linkedin-templates-pt.md`). Never mix languages within a single file.
6. **Update dates** — change the "Last updated" date at the top of any modified file.

### Writing Standards

- Use Markdown for all knowledge files.
- Include a date header (e.g., "Last updated: March 2026") in every knowledge file.
- Structure files with clear headers and sections.
- When updating a file, update the date header.
- All agent communications, task contracts, file contents, and documentation must be written in English. Portuguese is only used when explicitly requested for market-specific content variations.
