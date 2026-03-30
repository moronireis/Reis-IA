# Project Configuration

## Project Identity

**REIS [IA]** — an ecosystem that helps entrepreneurs and business owners profit from AI — increasing revenue, reducing costs, and structuring growth. Led by Moroni Reis. The agent system supports market research, strategy, messaging, copy production, design, and web development to help scale the REIS [IA] ecosystem (Systems, Builders, Marketing).

Full business context: `brain/context/business-profile.md`

## Agent System

### Available Agents

| Agent | Role | Model |
|-------|------|-------|
| orchestrator | Coordination, planning, delegation. Never implements directly. | opus |
| market-research-analyst | Market analysis, competitor research, ICP discovery, positioning gaps. | sonnet |
| cmo-strategist | Marketing strategy, positioning, offers, funnels, go-to-market planning. Copy Squad director. | opus |
| direct-response-copywriter | Persuasive copy execution: sales pages, VSL scripts, emails, ads. Hormozi framework. | sonnet |
| humanizer | Eliminates AI patterns, injects natural PT-BR executive voice. Post-copywriter. | sonnet |
| reviewer | Final quality gate: scores copy against brand voice, Hormozi, humanization. | sonnet |
| execution | File operations, folder organization, asset generation. | sonnet |
| dev-agent | Web development: Astro pages, React components, Tailwind styling, project setup. | sonnet |
| designer-agent | UI/UX design specs, brand identity, page layouts, wireframes-as-text. | opus |
| analysis-agent | Context summaries, tool evaluation, integration research, file audits. | sonnet |
| executor-agent | Platform configuration: email setup, CRM, booking tools, deployment. | sonnet |
| education-director | Curriculum mapping, lesson briefings, educational pipeline management, quality review. | opus |
| roteirista-aulas | Video lesson scriptwriting from briefings, script enhancement/reformulation. | sonnet |
| educational-designer | Visual elements for lessons: slides, mind maps, diagrams, transition screens. | sonnet |

### Workflow Chain

```
orchestrator
    +---> market-research-analyst  (produces research)
    +---> cmo-strategist           (consumes research, produces strategy, directs Copy Squad)
    |        +---> COPY SQUAD PIPELINE:
    |        |     cmo-strategist (brief + angles)
    |        |       → direct-response-copywriter (raw copy + Hormozi)
    |        |         → humanizer (PT-BR voice + AI pattern removal)
    |        |           → reviewer (quality gate: APPROVE / REVISE)
    |        |             → cmo-strategist (final sign-off)
    +---> designer-agent           (consumes copy + strategy, produces design specs)
    +---> dev-agent                (consumes design specs + copy, produces code)
    +---> executor-agent           (configures external platforms and tools)
    +---> analysis-agent           (produces context summaries for any agent)
    +---> execution                (file operations when needed)
    +---> education-director       (curriculum mapping, briefings, quality review)
    |        +---> EDUCATIONAL PIPELINE:
    |        |     education-director (briefing)
    |        |       → roteirista-aulas (script from briefing)
    |        |         → educational-designer (visuals from approved script)
    |        |           → education-director (final review)
```

### Copy Squad

The Copy Squad is a 5-agent pipeline managed by the CMO Strategist for all copy production:

1. **CMO Strategist** — creates strategic brief with Hormozi 4-angle material
2. **Direct-Response Copywriter** — writes raw persuasive copy applying `.claude/rules/hormozi-framework.md`
3. **Humanizer** — eliminates AI patterns per `.claude/rules/humanization-rules.md`, injects natural PT-BR voice
4. **Reviewer** — final quality gate scoring against all 3 rule sets in `.claude/rules/`
5. **CMO Strategist** — final strategic sign-off

**Rule sets** (mandatory for all Copy Squad agents):
- `.claude/rules/brand-voice.md` — Brand voice and tone
- `.claude/rules/hormozi-framework.md` — Persuasion framework (value equation, 4 angles, Grand Slam Offer)
- `.claude/rules/humanization-rules.md` — AI pattern elimination and human voice injection

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

- **Brand name**: REIS [IA] — "REIS" in white, "[IA]" in accent blue. Font-weight 300 (light).
- **Philosophy**: "O Tempo é Rei" — decorative slogan, used sparingly in footer/watermarks. Never as headline.
- **Primary colors**: Black (#000000), White (#FFFFFF)
- **Accent color**: Primary Blue (#4A90FF). Layered by pillar:
  - **Builders**: Electric Blue (#2D7AFF) + Cyan (#00B4FF)
  - **Systems**: Black/White dominant + #4A90FF minimal
  - **Marketing**: Same as master (#4A90FF)
  - **Moroni Reis**: Soft Blue (#6AADFF)
- **Mode**: Dark mode default
- **Aesthetic**: Minimal geometric, architectural, Apple-level premium
- **Font**: Inter (all weights)
- **Three Pillars**: Systems (AI implementation), Builders (community/mentorship), Marketing (marketing/demand)
- **Hourglass**: Optional decorative element only. NOT a required brand symbol. May appear as low-opacity watermark.
- **PROHIBITED**: Gold, amber, terracotta, chess pieces, crowns, Z7 symbol, gradient text, azure whisper effects, emojis in UI, SaaS pricing patterns.

## Folder Structure

```
/
    .claude/
        agents/             # Agent definition files (11 agents)
        agent-memory/       # Agent-private persistent memory (per-agent)
        rules/              # Shared rule sets for Copy Squad (brand-voice, hormozi-framework, humanization-rules)
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
