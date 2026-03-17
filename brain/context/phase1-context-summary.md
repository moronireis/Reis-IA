# Phase 1 Context Summary — Reis IA
# File: brain/context/phase1-context-summary.md
# Last updated: March 2026
# Produced by: analysis-agent
# Purpose: Single source of truth for Designer, Copy, CMO, and Dev agents

> This document summarizes all Phase 1 source files so downstream agents do not need to re-read them.
> Source files: 4 copy files, 3 strategy files, 1 messaging file.

---

## TABLE OF CONTENTS

1. [Copy Structure Summary](#1-copy-structure-summary)
2. [Brand Voice Rules](#2-brand-voice-rules)
3. [Positioning Summary](#3-positioning-summary)
4. [Offer Structure](#4-offer-structure)
5. [Funnel Architecture](#5-funnel-architecture)
6. [Bio Summary](#6-bio-summary)
7. [Design-Relevant Notes](#7-design-relevant-notes)
8. [Hourglass / Chess Audit](#8-hourglass--chess-audit)

---

## 1. COPY STRUCTURE SUMMARY

### 1A. website-main.md
**File path**: `brain/assets/copy/website-main.md`
**Last updated**: 2026-03-11
**Approximate word count**: ~2,100 words (original) + ~700 words (brand element additions)

**Sections / Headers:**
| Section | On-Page Label | Key Content |
|---------|--------------|-------------|
| Hero | None (headline only) | 4 headline options + primary/secondary CTA |
| Manifesto | "What We Believe" | Revenue-First belief statement |
| Ecosystem Pillars | "The Ecosystem" | 4 pillar cards: Builder, Systems, Partners, Network |
| Interactive Demo | "See It Working" | 4 demo concepts (3 recommended, 1 optional) |
| Results / Social Proof | "What Happens When AI Is Done Right" | 3 case study blocks (placeholders) + market data |
| Founder Story | "Why Reis IA Exists" | Moroni's narrative + dual signature CTA |
| Offer Paths / CTA Router | "Where Do You Want to Start?" | 3-path card layout + community entry |
| Footer CTA | None | Urgency close + booking CTA |
| Navigation / Global | Site-wide | Nav links, tagline, meta description |

**Key CTAs:**
- Primary: "Book a Free AI Revenue Assessment" (appears in Hero, Demo section, Founder Story, Footer)
- Secondary: "See How It Works →" (Hero)
- Pillar-specific: "Apply to Builder →" / "Book an AI Revenue Audit →" / "Learn About Partners →" / "Join the Network →"
- Offer Router: "Apply Now →" / "Book Your AI Revenue Audit →" / "Learn About the Partners Program →" / "Join the Network →"

**Hourglass / Chess in original copy:**
- Neither motif is present in the original sections.
- Both are introduced only in the `[ADDED — 2026-03-11]` brand element blocks.

**Brand element additions (2026-03-11):**
- Chess: Hero headline Option E; Manifesto body paragraph variation
- Hourglass: Systems Pillar proof anchor variation; Founder Story closing paragraph variation; Footer CTA headline (2 options) + subheadline + microcopy variations

---

### 1B. sales-page-builder.md
**File path**: `brain/assets/copy/sales-page-builder.md`
**Last updated**: 2026-03-11
**Awareness level**: Solution-aware (agency owners evaluating how to add AI revenue)
**Framework**: PAS → Solution Reveal → Proof → Offer → Objection Handling → CTA
**Approximate word count**: ~2,400 words (original) + ~650 words (brand element additions)

**Sections / Headers:**
| Section | Internal Label | Key Content |
|---------|---------------|-------------|
| Pre-headline | — | Targeting qualifier |
| Headline | — | "You know AI is the next revenue lever..." |
| Subheadline | — | 12-week program promise |
| Hero CTA | — | "Apply for the Next Cohort →" |
| Section 1 | [PROBLEM] | Competitor threat agitation; market urgency data |
| Section 2 | [SOLUTION] | Builder vs. course comparison table |
| Section 3 | [PROGRAM DETAIL] | 4 modules (Offer Architecture, Client Acquisition, Implementation, Scale) |
| Section 4 | [FIT QUALIFIER] | For/Not For lists |
| Section 5 | [OBJECTIONS] | 5 objection handlers (technical skills, clients, price, time, past failures) |
| Section 6 | [PROOF] | 3 testimonial blocks + case study block (all placeholders) |
| Section 7 | [RISK REVERSAL] | Full refund guarantee on completion |
| Section 8 | [OFFER] | Pricing tiers + application process steps |
| Section 9 | [CLOSE] | Final urgency + CTA |
| P.S. | — | Access and speed-to-revenue proof |

**Key CTAs:**
- Primary: "Apply for the Next Cohort →" / "Apply for Cohort [X] →" / "Apply now →"
- All CTAs point to the application form; no booking/consultation CTA on this page

**Placeholders requiring fill-in:**
- Cohort dates: `[DATE]` (appears 3 times)
- Testimonials: `[TESTIMONIAL 1–3]` with name and agency placeholders
- Case study: agency name, type, before/after metrics

**Hourglass / Chess in original copy:**
- Neither motif is present in the original sections.

**Brand element additions (2026-03-11):**
- Chess: Headline variations A + B; pre-headline variation; Solution section opening variation
- Hourglass: Problem/Agitation closing paragraph; Guarantee closing paragraph
- Combined: Final CTA closing variation; P.S. variation

---

### 1C. sales-page-systems.md
**File path**: `brain/assets/copy/sales-page-systems.md`
**Last updated**: 2026-03-11
**Awareness level**: Problem-aware to Solution-aware (B2B decision-makers evaluating AI)
**Framework**: Problem → Agitation → Solution → Proof → Offer → FAQ → CTA
**Approximate word count**: ~2,600 words (original) + ~700 words (brand element additions)

**Sections / Headers:**
| Section | Internal Label | Key Content |
|---------|---------------|-------------|
| Pre-headline | — | Targeting qualifier |
| Headline (3 options) | — | Recommended: enemy-angle / prototype graveyard |
| Hero CTA | — | "Book a Free AI Revenue Assessment →" |
| Section 1 | [PROBLEM] | Prototype Graveyard framing; 42% abandonment stat |
| Section 2 | [AGITATION] | Cost-of-wrong-implementation; Klarna example |
| Section 3 | [SOLUTION] | Revenue-First Framework; AI Revenue Audit introduction |
| Section 4 | [SERVICE OFFERINGS] | 6 service types (AI Sales Agent, Support System, Lead Qual, Ops Automation, Knowledge Base, Custom Integrations) |
| Section 5 | [PROCESS] | 7-step delivery process (Audit through 60-day performance window) |
| Section 6 | [PROOF] | 2 case study blocks (placeholders) + market validation stats |
| Section 7 | [QUALIFIER] | For/Not For lists |
| Section 8 | [PRICING] | 3 packages: Starter ($2K–5K), Full Implementation ($5K–20K), Retainer ($1K–3K/mo) |
| Section 9 | [RISK REVERSAL] | Starter "Works or We Fix It"; Full "60-Day Optimization Window" |
| Section 10 | [FAQ] | 7 FAQs (past failure, integrations, timeline, data security, post-handoff, data quality, scale) |
| Section 11 | [CLOSE] | "Start With the AI Revenue Audit" — lowest-friction CTA |

**Key CTAs:**
- Primary: "Book Your Free AI Revenue Assessment →" (hero + close)
- Secondary: "Schedule a Systems Consultation →" (close section)
- All CTAs are consultation/booking oriented — no direct purchase on page

**Placeholders requiring fill-in:**
- Case study company names, industries, metrics (both blocks)
- Testimonials (both case study blocks)
- Typical result metrics: `[METRIC]` throughout Section 4

**Hourglass / Chess in original copy:**
- Neither motif is present in the original sections.

**Brand element additions (2026-03-11):**
- Chess: Hero headline variation D; Solution framework introduction variation
- Hourglass: Agitation cost-of-waiting paragraph; Step 1 (AI Revenue Audit) description variation
- Combined: Final CTA closing variation ("Start With the Move That Changes Everything")

---

### 1D. bio-moroni-reis.md
**File path**: `brain/assets/copy/bio-moroni-reis.md`
**Last updated**: March 2026
**Approximate word count**: ~450 words across all three versions

**Sections:**
| Version | Length | Primary Use |
|---------|--------|-------------|
| Version 1 — Short | 2–3 lines | Social profiles, podcast bios, event speaker listings |
| Version 1 — Alternate Short | 2 lines (punchier) | Instagram specifically |
| Version 2 — Medium | 1 paragraph (~150 words) | Website about section, program pages, press mentions, email signatures |
| Version 3 — Full Narrative | 5 paragraphs (~350 words) | Press releases, speaking profiles, partnership decks, media kits |

**Hourglass / Chess in bio:** Neither motif appears. No brand element additions on file.

---

## 2. BRAND VOICE RULES

### Core Identity
Reis IA sounds like a sharp business strategist who happens to be deeply technical. Technology is supporting evidence — business insight leads.

### Five Voice Characteristics
1. **Direct** — No hedging, no filler. Say the thing.
2. **Confident** — Experience-backed, not theoretical. Data or examples behind every claim.
3. **Pragmatic** — What works, not what sounds impressive. Real-world over academic.
4. **Energetic** — Urgency without frantic. There is momentum.
5. **Accessible** — Complex AI made simple and actionable. Never condescending.

### Tone by Context
| Context | Tone |
|---------|------|
| LinkedIn | Confident, provocative, debate-sparking |
| YouTube | Educational, personable, "smart friend" |
| Sales pages | Urgent, transformation-focused |
| Email | Conversational, direct, trusted advisor |
| Sales calls | Consultative, assertive |
| Community | Supportive, push-to-execute |
| Proposals | Professional, data-driven |

### Vocabulary: USE These
Revenue, profit, ROI, results / Implement, deploy, build, ship / Revenue-First / System, engine, infrastructure / Scale, grow, multiply / Ecosystem, partnership, collaboration / "Here's what's working..." / "The real question is..." / "This is what most people get wrong..."

### Vocabulary: AVOID These
Revolutionary, game-changing, disruptive / Cutting-edge, state-of-the-art / "Leverage" (as a verb) / Synergy, paradigm shift, thought leader / "Just" or "simply" (minimizes complexity) / "AI will replace..." / Magic, overnight, effortless / Perhaps, maybe, we think / Unexplained technical acronyms (LLM, RAG, NLP) with business owners

### Style Rules
- Lead with the point. Never bury the lead.
- Short punchy sentences mixed with longer explanatory ones. Rhythm matters.
- 8th–10th grade reading level for all customer-facing copy.
- Specific numbers always beat vague claims ("$47,000" beats "significant revenue").
- Bullet points and headers for scanability. Bold key phrases. Short paragraphs (2–3 sentences in social content).

### Moroni's Signature Phrases (Use Consistently)
- "Start with the revenue, work backward to the tech."
- "AI is not a technology project. It's a revenue strategy."
- "Stop prototyping. Start profiting."
- "The agencies that win are the ones that move now."

### Voice Reference Models
Hormozi's directness + Chris Do's positioning intelligence + Lenny Rachitsky's accessibility — applied to AI for business.

### Bio-Specific Prohibited Words
"Passionate about," "excited to," "leveraging," "thought leader" — never in bio copy.

---

## 3. POSITIONING SUMMARY

### Positioning Statement
"We help digital agencies and growth-stage companies implement AI that generates revenue — not just cuts costs — through a structured ecosystem of mentorship, done-for-you systems, and partnership infrastructure, unlike generic AI agencies that deliver prototypes nobody uses."

### Category
**AI Revenue Ecosystem** — not an AI agency, not a SaaS tool, not a course. The category name is load-bearing: it signals revenue generation, not technology.

Why the category works:
- "AI agency" is commoditizing — bottom 60–70% face race to zero within 2–3 years
- "AI consulting" reads as expensive and slow
- "AI course" reads as theory without results
- "AI Revenue Ecosystem" reads as practical, revenue-focused, comprehensive

### The Enemy: The AI Prototype Graveyard
The named antagonist is the broken approach to AI implementation — not competitors. Specific enemies:
- "AI for the sake of AI" — no revenue thesis
- "The prototype trap" — impressive demos that die in production
- "The generalist curse" — claiming to do everything for everyone
- "Tech-first thinking" — starting with the tool instead of the problem

**Supporting data for enemy framing:**
- 42% of companies abandoned AI projects in 2025
- Only 29% of executives can measure AI ROI confidently
- AI agent buyer confidence dropped from 43% to 22% (2024–2025)
- Gartner: 40%+ agentic AI projects will be cancelled by 2027

### The Big Idea / Thesis
**"AI is not a technology project. It is a revenue strategy."**

The companies winning are not the most technical — they treat AI as a business weapon, not a science experiment. Every implementation starts with: "How does this make us more money?"

### Unique Mechanism: The Revenue-First AI Framework
Three layers:
1. **Strategy Layer** (Builder) — Map the revenue opportunity before touching technology
2. **Implementation Layer** (Systems) — Build AI that connects directly to revenue processes
3. **Scale Layer** (Partners + Network) — Infrastructure for selling/multiplying AI impact

### Key Differentiators vs. Generic AI Agencies
| Dimension | Generic AI Agency | Reis IA |
|-----------|-----------------|---------|
| Starting point | "What do you want built?" | "Where is the revenue opportunity?" |
| Deliverable | A chatbot or tool | A revenue-generating system embedded in the business |
| Relationship | Project-based vendor | Strategic ecosystem partner |
| Post-delivery | Handoff and goodbye | Ongoing ecosystem (community, partnerships, support) |
| Knowledge transfer | Creates dependency | Builder teaches clients to sell AI themselves |
| Scale path | Sell more hours | Partners model — agencies sell, Reis IA supports |

### The "Only We" Test
Only Reis IA combines AI implementation + business mentorship + partnership infrastructure in one ecosystem — so clients can implement AI, learn to sell AI, and scale through agency partnerships within a single relationship.

### Positioning Hierarchy for Communication
1. **One-liner**: "We help companies make money with AI — not just talk about it."
2. **Elevator pitch**: "Reis IA is an AI revenue ecosystem. We implement AI systems that generate revenue, train agencies to sell AI solutions, and build the partnerships that scale it all. Unlike most AI agencies, we start with the business outcome and work backward to the technology."
3. **For agencies**: "We give your agency the AI implementation backbone so you can sell high-ticket AI projects without hiring a single engineer."
4. **For businesses**: "We build AI systems that generate revenue — sales agents, lead qualification, support automation — and we don't just hand them off, we make sure they work."

### Target Audience
- Digital agencies wanting to add AI as a revenue stream
- Growth-stage B2B companies ($200K–$20M revenue) with specific operational problems
- Entrepreneurs building AI-powered business models
- AI professionals seeking community, education, and collaboration

---

## 4. OFFER STRUCTURE

### Value Ladder (Bottom to Top)
```
FREE CONTENT + COMMUNITY (Network)
    |
AI REVENUE AUDIT — $500–$1,500 (or free for qualified leads)
    |
SYSTEMS STARTER — $2,000–$5,000
    |
SYSTEMS FULL IMPLEMENTATION — $5,000–$20,000
    |
BUILDER MENTORSHIP — $4,000–$15,000 (3 tiers)
    |
PARTNERS — Revenue-share (no upfront fee)
    |
MONTHLY RETAINER (post-implementation) — $1,000–$3,000/month
```

### Offer 1: AI Revenue Audit (Entry / Lead Magnet+)
- **Price**: $500–$1,500 (or free as lead magnet for high-value prospects)
- **Format**: 60–90 min session + written PDF report
- **Deliverable**: Top 3–5 AI revenue opportunities, priority matrix, budget/timeline estimates
- **Strategic purpose**: Demonstrates methodology in action; bridges to Systems or Builder; self-liquidating at paid tier

### Offer 2: Reis IA Systems — Starter Package
- **Price**: $2,000–$5,000
- **Timeline**: 2–4 weeks
- **What it is**: Single focused AI implementation (one agent or automation)
- **Typical builds**: WhatsApp AI support agent, lead qualification bot, FAQ agent, appointment scheduling
- **Guarantee**: "Works or We Fix It" — rebuild/adjust free within 30 days; 50% credit if still not right
- **Gross margin**: 60–75%

### Offer 3: Reis IA Systems — Full Implementation
- **Price**: $5,000–$20,000 per project (average target: $10,000)
- **Timeline**: 4–8 weeks build + 4 weeks post-launch monitoring
- **What it is**: End-to-end AI deployment across multiple business processes
- **Typical builds**: AI sales agent + support system + operational automation + CRM integrations
- **Includes**: Full Revenue-First AI Audit, 2–5 agents, all integrations, team training, 60-day support, monthly performance reports
- **Guarantee**: 60-day performance window — free optimization if KPIs not trending; partial refund for underperforming components
- **Gross margin**: 65–80%
- **Upsell**: Monthly retainer ($1,000–$3,000/month)

### Offer 4: Reis IA Builder — Mentorship Program
- **Price**: $4,000–$15,000 (3 tiers)
- **Duration**: 12 weeks, 4 modules
- **What it is**: Hands-on mentorship for agencies/entrepreneurs to create, package, price, and sell AI solutions
- **Module breakdown**:
  - Module 1 (Weeks 1–2): AI Offer Architecture — package the sellable offer
  - Module 2 (Weeks 3–4): Client Acquisition — outreach, content, sales conversations
  - Module 3 (Weeks 5–8): Implementation Framework — deliver first real client project with Reis IA support
  - Module 4 (Weeks 9–12): Scale and Systemize — repeatability, pipeline, Partners pathway
- **Pricing tiers**:
  | Tier | Price | Format |
  |------|-------|--------|
  | Group | $4,000–$6,000 | Group coaching, templates, community |
  | Premium | $8,000–$12,000 | Weekly 1:1 with Moroni, priority access, project review |
  | VIP | $12,000–$15,000 | Full 1:1, done-with-you first project, immediate Partners access |
- **Guarantee**: Full refund if all modules completed and no sellable AI offer produced
- **Gross margin**: 80–90% (group), 75–85% (1:1)
- **Note**: Highest-margin offer and fastest path to $100K

### Offer 5: Reis IA Partners — Partnership Program
- **Price**: No upfront fee — revenue-share model
- **What it is**: Agency sells AI projects; Reis IA provides technical implementation backbone
- **Revenue models**:
  | Model | Agency Gets | Reis IA Gets |
  |-------|------------|-------------|
  | Rev-share | 30–40% of project | 60–70% of project |
  | White-label | Sets own price | Fixed implementation fee ($2K–$8K) |
  | Hybrid | Keeps retainer | Project fee + small rev-share |
- **Strategic value**: Scale engine — creates revenue without proportional time investment from Moroni
- **Target**: 5–10 active partner agencies within 6 months, each generating $5K–$20K/month

### Offer 6: Reis IA Network
- **Price**: Free
- **What it is**: Events, education, community, strategic collaborations
- **Role in funnel**: Awareness, trust, pipeline development; entry point for all ICPs
- **Upgrade paths**: → Builder, → Systems referral, → Partners

### Cross-Sell / Upsell Path
```
Free content → AI Revenue Audit → Systems Starter → Systems Full → Retainer
                              \
                               → Builder → Partners → Ongoing rev-share
```

---

## 5. FUNNEL ARCHITECTURE

### Two Primary Funnels (Phase 1 Priority)

#### Funnel 1: Builder / Partners — Application Funnel
- **ICP**: Digital agencies wanting to sell AI
- **Offer**: Builder ($4K–$15K) with Partners pathway
- **Type**: Application funnel (high-ticket, solution-aware)

**Traffic sources (priority order):**
1. Organic LinkedIn (daily posts — AI + business + agency community)
2. YouTube (AI implementation case studies, agency growth strategies)
3. Instagram Reels (repurposed YouTube clips)
4. Paid Meta Ads (retargeting warm first, then cold lookalike)
5. Webinars / Workshops (monthly free: "How to Add AI to Your Agency in 30 Days")
6. Referrals (Builder alumni + Partners)

**Lead magnets (choose 1 to start):**
- "AI Agency Profit Calculator" — interactive tool; email required for access (recommended for high perceived value)
- "The AI Offer Blueprint" — 5–7 page PDF; actionable, includes templates
- "5 AI Services Any Agency Can Sell This Month" — quick-win content

**Email nurture sequence (7 emails over 14 days):**
| Day | Subject | Purpose |
|-----|---------|---------|
| 0 | Welcome + lead magnet delivery | Deliver value, set expectations |
| 1 | "The AI agency opportunity nobody is talking about" | Vision, authority |
| 3 | Case study / proof of concept | Credibility |
| 5 | "The 3 mistakes agencies make trying to sell AI" | Objection handling through education |
| 7 | "How [Agency X] added $15K/month in AI revenue" | Social proof, desire |
| 10 | "Is your agency ready for AI?" (self-assessment) | Qualify and segment |
| 14 | "Applications for the next Builder cohort are open" | Direct CTA to apply |

**Conversion point**: Application form (10–15 questions) → Moroni reviews in 1–2 days → Sales call (45–60 min) → Onboarding within 48 hours

**Target benchmarks:**
| Stage | Target |
|-------|--------|
| Landing page opt-in rate | 25–40% |
| Email sequence to application | 5–10% of opt-ins |
| Application to call booked | 70–80% show rate |
| Call to close | 20–35% |
| Average deal size | $6,000–$10,000 |

**Math to $100K**: ~12–15 Builder clients at avg $7K → ~50–60 sales calls → ~70–80 applications → ~1,000–1,150 opt-ins → ~3,500–3,800 landing page visitors (achievable in 90 days with content + paid ads)

---

#### Funnel 2: Systems — Consultation Funnel
- **ICP**: Growth-stage B2B companies, SMBs
- **Offer**: AI Revenue Audit ($500–$1,500) leading to Systems ($2K–$20K)
- **Type**: Consultation funnel with paid or free diagnostic as entry

**Traffic sources (priority order):**
1. Referrals from Partner agencies (scale channel as Partners grow)
2. Organic LinkedIn (case studies, before/after results)
3. YouTube (AI implementation walkthroughs)
4. Google Ads (intent searches: "AI automation for business," "AI chatbot for [industry]")
5. Local events and networking (Brazilian SMB market)

**Lead capture options:**
- Free: "AI Revenue Assessment" quiz/short consultation → captures email + phone → leads to paid Audit
- Paid: Direct offer of AI Revenue Audit ($500–$1,500) for solution-aware buyers

**Target benchmarks:**
| Stage | Target |
|-------|--------|
| Landing to booking | 10–20% |
| Booking to show | 75–85% |
| Audit to project proposal | 60–70% |
| Proposal to close | 30–50% |
| Average project size | $8,000–$12,000 |

**Math to $100K contribution**: 5–8 Systems projects at avg $10K = $50K–$80K (ramps slower than Builder; Partner referrals accelerate in months 2–3)

---

#### Secondary Funnel: Network — Community Funnel
- **ICP**: AI professionals, entrepreneurs, broader audience
- **Offer**: Free community + events → upgrades to Builder or Systems referral
- **Priority**: Lower — long-term brand and pipeline building. No significant paid budget in first 90 days.
- **Traffic**: YouTube, Instagram, events, podcast guest appearances

---

### All CTAs and Their Destinations

| CTA Text | Source Page | Destination |
|----------|------------|-------------|
| "Book a Free AI Revenue Assessment" | Homepage (hero, demo, founder, footer), Systems page (hero, close) | Booking page (consultation call) |
| "See How It Works →" | Homepage hero (secondary) | Scrolls to Ecosystem Pillars section |
| "Apply to Builder →" | Homepage pillar card | Builder sales page or application form |
| "Book an AI Revenue Audit →" | Homepage pillar card | Booking page (AI Revenue Audit session) |
| "Learn About Partners →" | Homepage pillar card | Partners information page |
| "Join the Network →" | Homepage pillar card + offer router | Network sign-up |
| "Apply for the Next Cohort →" | Builder sales page (hero + close) | Application form |
| "Apply Now →" | Homepage offer router (Path 1) | Application form |
| "Book Your AI Revenue Audit →" | Homepage offer router (Path 2), Systems page | Booking page |
| "Learn About the Partners Program →" | Homepage offer router (Path 3) | Partners page |
| "Schedule a Systems Consultation →" | Systems page (close, secondary) | Booking page (consultation) |

---

## 6. BIO SUMMARY

### Version 1 — Short (2–3 lines)
**When to use**: Social media profiles (LinkedIn, Instagram, Twitter/X, YouTube), podcast bios, event speaker listings
**Key content**: Founder of Reis IA; AI Revenue Ecosystem; Revenue-First Framework; companies + agencies; measurable revenue not prototypes

**Alternate short (punchier, Instagram-specific)**:
"Founder of Reis IA. Digital strategist turned AI revenue architect. I help businesses and agencies stop building AI prototypes and start building AI profit centers. Revenue-First, always."

---

### Version 2 — Medium (1 paragraph, ~150 words)
**When to use**: Website about section, partner introductions, press mentions, email signatures, program pages
**Key content**: Digital marketing strategist + Reis IA founder; decade of marketing strategy / funnels / launches; Revenue-First Framework origin (tech-first failure pattern); four-pillar ecosystem (Builder, Systems, Partners, Network); Brazilian + global market intersection; practical, no-fluff perspective

---

### Version 3 — Full Narrative (5 paragraphs, ~350 words)
**When to use**: Press releases, speaking engagement profiles, partnership decks, in-depth about pages, media kits
**Paragraph breakdown**:
1. Founder + CEO + ecosystem overview; background in digital marketing strategy across Brazil and Latin America
2. Founding insight — the wrong question pattern; Revenue-First AI Framework origin
3. Four-pillar ecosystem explained with rationale for the ecosystem model (implementation + education + partnership must be connected)
4. Brazilian market lens; business strategist identity (not technologist); practical/direct communication style
5. Author of Revenue-First AI Framework; host of Reis IA Network; current focus on Brazilian/LatAm AI-enabled agencies

---

### Bio Writing Rules
- NEVER use: "passionate about," "excited to," "leveraging," "thought leader"
- ALWAYS anchor to: Revenue-First Framework, Reis IA ecosystem, specific outcomes
- Tone: confident, grounded, builder identity — not guru, not academic
- Brazilian market context: required in full bio, optional in shorter versions
- Update full bio with specific metrics as case studies are collected

---

## 7. DESIGN-RELEVANT NOTES

### From website-main.md (Copy Notes for Design Team)
- **Hero**: Designed for large type — two short lines, maximum contrast. No section label.
- **Manifesto**: Full-width, dark background, large type. Premium typographic treatment. Generous line height. Max 60 characters per line.
- **Ecosystem Pillars**: Four-column layout (desktop), stacked on mobile. Cards: dark, minimal, sharp. Each card = headline + body + 3–4 bullets + CTA. Strict word count discipline.
- **Demo Section**: Minimal copy — let the demo do the work. Motion preferred over static screenshots. Labels and short descriptions only. 90-second screen recording format preferred.
- **Proof Blocks**: Alternating case study blocks. Metrics in large type. Minimal. Lead with the metric, then the story. No hype.
- **Founder Story**: Full-width photo of Moroni + text column. Personal, not corporate.
- **Offer Paths (CTA Router)**: Clean three-path card layout. Different color accents per path. Sharp, decisive.
- **Footer CTA**: Full-width dark section. Maximum urgency without manufactured pressure.

### From sales-page-builder.md (Copy Notes)
- Above-the-fold load: Headline, subheadline, and CTA must all be visible without scrolling on desktop.
- Consider sticky "Apply Now" button following scroll on desktop.
- Pricing section: side-by-side card comparison (desktop), stacked (mobile).
- Proof section: replace all placeholders as social proof is collected — prioritize by metric specificity.
- Cohort dates and spot counts must be real-time accurate — stale urgency destroys credibility.

### From sales-page-systems.md (Copy Notes)
- Lead with the enemy angle (prototype graveyard) — this ICP has likely tried AI before; skepticism is high.
- AI Revenue Audit CTA is the primary conversion point — lower friction than "buy now."
- FAQ section is critical — this ICP is analytical; they need objections answered in writing before the sales call.
- Case studies are highest-priority copy element — this ICP buys on proof, not promises.
- Pricing: show ranges, not exact numbers — framed as a feature (scoping happens after audit).

### Component Inventory (Implied by Copy)
- **Hero block**: Large headline (2 lines), subheadline, dual CTA buttons, microcopy below CTAs
- **Manifesto/belief block**: Full-width typographic statement
- **Pillar cards**: 4 cards with icon, headline, body, bullets, CTA — desktop grid, mobile stack
- **Demo card carousel or grid**: Motion/video embeds with minimal text labels
- **Case study block**: Metric-first layout, alternating or stacked
- **Market data block**: Large percentage stats with minimal surrounding copy
- **Comparison table**: Course vs. Builder (sales-page-builder.md)
- **Pricing tiers**: Side-by-side on desktop, stacked on mobile
- **FAQ accordion**: For Systems page specifically
- **Application steps**: Linear numbered process (sales-page-builder.md Section 8)
- **Progress/process steps**: 7-step numbered list (sales-page-systems.md Section 5)
- **Sticky CTA bar**: Desktop only, on Builder sales page

### Brand Aesthetic (from CLAUDE.md)
- Primary colors: Black (#000000), White (#FFFFFF)
- Accent: Muted gold / warm amber
- Mode: Dark mode default
- Aesthetic: Minimal geometric, architectural, Apple-level premium
- Font: Inter (all weights)
- Hourglass motif: Represents TIME — minimal geometric icon — Systems pillar, efficiency content
- Chess motif: Represents STRATEGY — single piece (knight/king) — Builder/Partners, methodology content
- Both brand elements must appear on every page at least once

---

## 8. HOURGLASS / CHESS AUDIT

### Current Status Across All Copy Files

| File | Original Sections | Brand Element Additions |
|------|------------------|------------------------|
| website-main.md | Neither motif present | Chess: Hero + Manifesto / Hourglass: Systems Pillar, Founder Story, Footer CTA |
| sales-page-builder.md | Neither motif present | Chess: Headline, Pre-headline, Solution opening / Hourglass: Problem/Agitation, Guarantee / Combined: Final CTA, P.S. |
| sales-page-systems.md | Neither motif present | Chess: Hero, Solution framework / Hourglass: Agitation, Step 1 (Audit) / Combined: Final CTA |
| bio-moroni-reis.md | Neither motif present | No additions |

### Where Hourglass Appears (or Has Variations)
All in `[ADDED — 2026-03-11]` blocks:
- **Homepage**: Systems Pillar proof anchor ("AI doesn't just cut costs — it returns hours. Hours that compound into revenue.")
- **Homepage**: Founder Story closing paragraph ("There's one resource no AI system can manufacture... time.")
- **Homepage**: Footer CTA — two headline variations ("The real cost of waiting isn't money. It's time." / "Every week without the right system is a week that doesn't come back.") + subheadline + microcopy
- **Builder page**: Problem/Agitation closer ("Time doesn't just pass. It compounds — in their favor.")
- **Builder page**: Guarantee closer ("There's only one thing the guarantee doesn't cover. Time.")
- **Builder page**: Final CTA combined variation; P.S. variation
- **Systems page**: Agitation ("AI doesn't just save time. It compounds time into competitive distance.")
- **Systems page**: Step 1 audit description ("the most expensive thing in any AI project is not the technology. It's the time lost building the wrong thing.")
- **Systems page**: Final CTA combined variation ("60 minutes. A written report. A clear first move.")

### Where Chess Appears (or Has Variations)
All in `[ADDED — 2026-03-11]` blocks:
- **Homepage**: Hero headline Option E ("AI without strategy is just noise. / Revenue-First is playing chess.")
- **Homepage**: Manifesto body paragraph ("A chess player doesn't place pieces randomly and hope for checkmate... That's the Revenue-First approach.")
- **Builder page**: Headline variation B ("AI without strategy is guessing. / 12 weeks from now, you could be playing a completely different game.")
- **Builder page**: Solution section opening ("A course gives you pieces. Builder teaches you to play the game.")
- **Builder page**: Final CTA combined ("AI is not complicated. Positioning your agency ahead of the market... that's the chess move.")
- **Systems page**: Hero headline variation D ("Most companies try AI. The ones generating revenue from it play a different game.")
- **Systems page**: Solution framework intro ("A skilled chess player doesn't move pieces randomly... Every piece has a role.")
- **Systems page**: Final CTA ("Every chess game has a first move that sets the position for everything that follows. In AI implementation, that move is the Revenue Audit.")

### Sections with No Motif Coverage (Opportunities)
- **Bio (all versions)**: No motif present. Opportunity to integrate chess motif into bio V3 (strategy layer of Moroni's approach) or hourglass into short bio (time cost of wrong approach).
- **Ecosystem Pillar cards — Builder and Partners**: No motif variations. Builder = natural chess fit (strategy, positioning); Partners = either motif could apply.
- **Homepage — Social Proof / Results section**: No motif integration. Hourglass could reinforce the compounding cost of delayed implementation.
- **Homepage — Navigation / Global copy**: No motif. Tagline "The AI Revenue Ecosystem" has no chess/hourglass signal.
- **Builder page — Objection Handling (Section 5)**: No motif in any of the 5 objection handlers. Time-related objections (especially "I don't have time" handler) are natural hourglass territory.
- **Builder page — Module descriptions (Section 3)**: No motif. Chess could reinforce the "each module is a strategic move" narrative.
- **Systems page — Service Offerings (Section 4)**: No motif. Hourglass fits the "time returned" value proposition on every service type.
- **Systems page — FAQ (Section 10)**: No motif. Time-related FAQs ("How long before we see results?") are natural hourglass territory.

### Design Integration Guidance
- **Chess motif**: Deploy on pages/sections heavy with strategy framing (Builder, Partners, Solution sections). Single piece (knight or king) — minimal geometric rendering.
- **Hourglass motif**: Deploy on pages/sections emphasizing urgency, time cost, or operational efficiency (Systems, Footer CTA, Agitation sections).
- **Both on every page**: CLAUDE.md requires both motifs on every page. Current copy supports visual placement in sections listed above; additional copy hooks may need to be written for pages/sections with no existing motif integration.

---

*Analysis produced by: analysis-agent*
*Source files read: 2026-03-12*
*Next review recommended: When new copy files are added or significant revisions are made to source documents*
