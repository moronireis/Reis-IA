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
| task-router | Smart cost optimizer: classifies tasks and routes to optimal model (ollama/haiku/sonnet/opus). | haiku |
| chief-strategy-advisor | Board Advisor / Conselheiro Estratégico. Pressure-tests macro decisions (new pillars, launches, pricing, positioning). NOT in day-to-day pipeline. | opus |
| integration-engineer | Third-party APIs, webhooks, MCP servers (FastMCP 3.0), OAuth, Supabase edge functions, automation pipelines (Whisper, ffmpeg, Playwright, wappalyzer, SearXNG). | sonnet |
| qa-agent | End-to-end functional testing (Playwright + API + DB). Deploy gate — can BLOCK devops-agent on regressions. | sonnet |
| devops-agent | Deploys, env vars (Vercel), CI/CD, monitoring. Respects qa-agent as deploy gate. Strict git safety. | sonnet |
| data-engineer | Supabase schemas, migrations, RLS policies, indexes, triggers. Single source of truth for data model. | sonnet |
| offer-architect | Grand Slam Offer design (Hormozi): dream outcome, value stack, guarantee, scarcity, pricing, naming. | opus |
| funnel-architect | End-to-end funnels (Brunson + DigitalMarketer + Hormozi): value ladder, sequences, upsells, bridges, automations. | opus |
| social-media-director | Content director (formerly social-media-team). Orchestrates the 4 content specialists (Phase B pending). File still lives at `social-media-team.md`. | opus |

### Phase A — Agency Technical Foundation (2026-04-14)

Phase A of the agency expansion added 6 new agents, refactored `social-media-team` into `social-media-director`, and formally activated `chief-strategy-advisor` as Board Advisor (Option A — pressure-tester at macro decision points, NOT in day-to-day pipeline). The new agents cover the technical execution layer (integration-engineer, qa-agent, devops-agent, data-engineer) and the offer/funnel strategic layer (offer-architect, funnel-architect).

Phase A is foundation-only: no integrations were actually built, no MCP servers were installed. The first real task for `integration-engineer` will come in Phase B, gated on Meta App approval.

Transversal support agents (used by most pipelines):
- `integration-engineer`, `qa-agent`, `devops-agent`, `data-engineer` support all code-producing pipelines
- `offer-architect` and `funnel-architect` feed the Copy Squad upstream of `direct-response-copywriter`
- `chief-strategy-advisor` reviews `cmo-strategist` output at macro decision points only (new pillar launches, new major offers, positioning shifts, budget calls above threshold)

### Token Optimization

The `task-router` agent runs on haiku (cheapest) and classifies tasks into 4 tiers:

| Tier | Model | Cost | When |
|------|-------|------|------|
| 0 | Ollama local (llama3, qwen2.5-coder, reis-ops, reis-strategy) | FREE | Exploration, reading, formatting, explanations |
| 1 | Haiku | $0.25/M in | Simple edits, single-file, clear instructions |
| 2 | Sonnet | $3/M in | Multi-file implementation, bug fixes, copy writing |
| 3 | Opus | $15/M in | Architecture, strategy, orchestration, ambiguous problems |

Ollama queries use: `.claude/scripts/ollama-query.sh <model> <prompt> [context_file]`

### Workflow Chain

```
orchestrator
    +---> market-research-analyst  (produces research)
    +---> cmo-strategist           (consumes research, produces strategy, directs Copy Squad)
    |        +---> [OPTIONAL] chief-strategy-advisor (pressure-test at macro decision points only)
    |        +---> offer-architect  (Grand Slam Offers from strategic angle)
    |        +---> funnel-architect (value ladder + sequences from objective)
    |        +---> COPY SQUAD PIPELINE:
    |        |     cmo-strategist (brief + angles)
    |        |       ← offer-architect + funnel-architect (structured inputs)
    |        |       → direct-response-copywriter (raw copy + Hormozi)
    |        |         → humanizer (PT-BR voice + AI pattern removal)
    |        |           → reviewer (quality gate: APPROVE / REVISE)
    |        |             → cmo-strategist (final sign-off)
    +---> TRANSVERSAL TECHNICAL SUPPORT (used by any code-producing pipeline):
    |        integration-engineer  (APIs, webhooks, MCP servers, automation pipelines)
    |        data-engineer         (Supabase schemas, migrations, RLS)
    |        qa-agent              (end-to-end tests, deploy gate)
    |        devops-agent          (deploys, env vars, monitoring — respects qa-agent BLOCK)
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
    +---> BRANDING PIPELINE (Protocolo Branding):
    |        brand strategists (concept + voice profile)
    |          → designer-agent (design system tokens)
    |            → creative-director (motion/visual briefs)
    |              → vfx-motion-designer (implementation)
    |                → brand-site-builder (brandbook documentation)
    |                  → designer-agent + reviewer (brand audit)
```

### Branding Pipeline (Protocolo Branding)

A 10-phase pipeline activated by "Protocolo Branding". Coordinates 10 agents from strategy through visual implementation:

**Strategy Phases (1-5):**
1. `company-brand-strategist` → brand architecture, positioning, values
2. `personal-brand-strategist` → persona, archetypes, narrative
3. `movement-brand-strategist` → cause, tribe, rituals, vocabulary
4. `product-brand-strategist` → naming, positioning, delivery experience
5. Voice DNA generation → each strategist produces `.claude/voice-profiles/` as mandatory deliverable

**Design Phases (6-8):**
6. `designer-agent` → design system tokens, typography, color, spacing, components
7. `creative-director` → motion concepts, interaction patterns, visual direction
8. `vfx-motion-designer` + `logo-brand-mark-designer` → production code + SVG assets

**Documentation & Audit (9-10):**
9. `brand-site-builder` → interactive brandbook at reis-ia-brand/
10. `designer-agent` + `reviewer` → brand audit against `.claude/rules/brand-audit-checklist.md`

**Brandbook structure**: `.claude/templates/brandbook-structure.md` (30-section, 7-part template)
**Audit checklist**: `.claude/rules/brand-audit-checklist.md` (6-section PASS/BLOCK scoring)

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

### Quality Gate Rules

The reviewer agent operates as a formal quality gate with three verdict levels:
- **PASS** — Copy proceeds to CMO for final sign-off
- **BLOCK** — Copy returns to the identified rollback agent for specific fixes, then re-enters review. Max 2 revision loops.
- **EXIT** — Critical failure; pipeline restarts from CMO strategic brief

7 veto conditions (V1-V7) trigger automatic BLOCK regardless of score. See `reviewer.md` for the full veto table and rollback assignments.

### Voice Profile System

Voice profiles are operational extracts of brand concepts that Copy Squad agents load before writing. They live in `.claude/voice-profiles/` and are **produced by brand strategist agents** as part of the branding process.

**Branding Pipeline → Voice Profile:**
```
personal-brand-strategist  → brain/assets/branding/personal-moroni-reis-concept.md  → .claude/voice-profiles/moroni-personal.md
company-brand-strategist   → brain/assets/branding/company-reis-ia-concept.md       → .claude/voice-profiles/reis-ia-company.md
movement-brand-strategist  → brain/assets/branding/movement-builder-concept.md      → .claude/voice-profiles/builders-community.md
product-brand-strategist   → brain/assets/branding/product-concepts.md              → .claude/voice-profiles/{product-name}.md (when distinct)
```

**Rule**: When a brand concept is created or updated, the voice profile MUST be updated in the same session. The concept is the source of truth; the profile is the operational derivative.

**Loading**: Copy Squad agents determine which profile to load based on task context (IF/THEN rules in each agent's Expertise DNA). Default: `reis-ia-company.md`.

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
