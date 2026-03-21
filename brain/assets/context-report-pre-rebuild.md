# Context Report — Pre-Rebuild Inventory

Last updated: 2026-03-17

> **Purpose**: Inventory of all new agents, copy files, rules, and deliverables produced during the parallel copy refinement process, for informing the full site rebuild plan.

---

## 1. New Agents Created

| Agent | Model | File | Purpose |
|-------|-------|------|---------|
| **humanizer** | sonnet | `.claude/agents/humanizer.md` | Copy Squad member. Eliminates AI patterns, injects natural PT-BR executive voice. Runs after copywriter, before reviewer. |
| **reviewer** | sonnet | `.claude/agents/reviewer.md` | Copy Squad member. Final quality gate: scores copy against brand voice, Hormozi framework, and humanization standards. |

**Updated agents:**
- `cmo-strategist.md` — Now described as "Copy Squad director"
- `direct-response-copywriter.md` — Now described as "Hormozi framework"

**Agents with files but NOT in CLAUDE.md** (specialty agents from design work):
- `brand-site-builder` (opus)
- `design-system-extractor` (opus)
- `logo-brand-mark-designer` (opus)

---

## 2. Copy Squad Pipeline

A 5-agent pipeline was established and documented in CLAUDE.md:

```
CMO Strategist (brief + Hormozi 4-angle material)
  -> Direct-Response Copywriter (raw persuasive copy)
    -> Humanizer (AI pattern elimination + PT-BR voice)
      -> Reviewer (quality gate: APPROVE / REVISE)
        -> CMO Strategist (final sign-off)
```

**Mandatory rule sets** (in `.claude/rules/`):
1. `brand-voice.md` — Consultivo premium tone, C-level language, prohibited jargon/AI hype
2. `hormozi-framework.md` — Value equation, 4 persuasion angles, Grand Slam Offer adaptation
3. `humanization-rules.md` — Prohibited AI words/structures, required human writing signals (rhythm variation, fragments, asides, strategic imperfections)

---

## 3. Campaign Files Produced

### 4 Complete Campaign Pipelines

Each campaign has 5 files: 01-briefing, 02-raw, 03-humanized, 04-review, FINAL.

| Campaign | ICP Target | Score | Status | FINAL File |
|----------|-----------|-------|--------|------------|
| **Homepage** | Mixed (all ICPs) | **8.7/10** | APPROVED v1.0 | `brain/assets/campaigns/homepage/FINAL-homepage-copy.md` (28KB) |
| **Builder Landing (CEO)** | CEOs/Founders R$5-50M | **8.6/10** | APPROVED v1.0 | `brain/assets/campaigns/builder-landing/FINAL-builder-landing-copy.md` (14KB) |
| **Builder Agencies** | Agency owners R$1-15M | **8.5/10** | APPROVED v1.0 | `brain/assets/campaigns/builder-agencies/FINAL-builder-agencies-copy.md` (41KB) |
| **Systems** | CEOs/COOs R$5-100M | **8.7/10** | APPROVED v1.0 | `brain/assets/campaigns/systems/FINAL-systems-copy.md` (39KB) |

**Average score: 8.6/10** — All approved.

### Supporting Campaign Files

| File | Path | Purpose |
|------|------|---------|
| **RELATORIO-FINAL-SITE.md** | `brain/assets/campaigns/RELATORIO-FINAL-SITE.md` | Master report — all 4 campaigns, scores, file paths, pending items, next steps |
| **site-copy-audit.md** | `brain/assets/campaigns/site-copy-audit.md` | Audit of existing pages vs. Copy Squad output — route mapping, gap identification |
| builder-landing-ceo-backup/ | `brain/assets/campaigns/builder-landing-ceo-backup/` | Backup of original builder CEO copy (5 files) |

---

## 4. Pre-Copy-Squad Audit Files

Created Mar 16 as preliminary work before the pipeline ran:

| File | Path | Purpose |
|------|------|---------|
| `copy-audit-report.md` | `brain/assets/copy/copy-audit-report.md` | Language audit — 13 English words needing PT-BR translation, "Revenue-First" analysis |
| `copy-refinements-proposed.md` | `brain/assets/copy/copy-refinements-proposed.md` | 49 specific refinements across all pages (language, density, flow) |

---

## 5. Copy Source Mapping for Rebuild

| Site Page | Copy Source (FINAL) | Notes |
|-----------|-------------------|-------|
| `/` (Home) | `campaigns/homepage/FINAL-homepage-copy.md` | 28KB, mixed ICP, score 8.7 |
| `/builder` | `campaigns/builder-landing/FINAL-builder-landing-copy.md` | 14KB, CEO ICP, score 8.6. Also: `campaigns/builder-agencies/FINAL-builder-agencies-copy.md` (41KB, agency ICP) — **decision needed: which ICP for the main builder page** |
| `/systems` | `campaigns/systems/FINAL-systems-copy.md` | 39KB, CEO/COO delegation ICP, score 8.7 |
| `/agendar` | No new copy produced | Use existing or create new |
| `/aplicar` | No new copy produced | Use existing or create new |

**Key decision needed**: The Builder page has TWO copy versions — one for CEOs (14KB) and one for Agencies (41KB). The rebuild plan needs to determine which is the primary page and whether the other becomes a separate route.

---

## 6. What Carries Over vs. What's New

### New (from copy refinement):
- 2 new agents (humanizer, reviewer)
- 3 rule sets (.claude/rules/)
- 4 complete copy pipelines with FINAL approved copy
- Copy Squad process documented in CLAUDE.md
- Master report (RELATORIO-FINAL-SITE.md)

### Carries over (from design system work):
- Enriched design system (142 tokens, 8 new techniques)
- All reference extractions (9 sites)
- Refined brand marks (H1-B optimized variants)
- Brand applications guide (12 contexts)
- Complete brand site (22 pages, 35+ components)
- Design system preview (ultimate interactive showcase)

### Pre-existing (unchanged):
- Brain knowledge base (strategy, messaging, research)
- Original copy files in `brain/assets/copy/`
- Original page design specs in `brain/assets/designs/`

---

## 7. Orphaned/Cleanup Items

- `reis-ia-designer/` and `reis-ia-dev/` in `.claude/agent-memory/` — empty orphaned directories
- `execution/` and `executor-agent/` agent-memory directories — empty
- `brand-site-builder`, `design-system-extractor`, `logo-brand-mark-designer` not in CLAUDE.md agent table

---

## Changelog

- 2026-03-17: Initial context report created (pre-rebuild inventory)
