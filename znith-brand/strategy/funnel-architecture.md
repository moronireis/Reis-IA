# ZNITH — Funnel Architecture

Last updated: 2026-04-24

> **Owner**: Funnel Architect (Reis IA Agency)
> **Client**: ZNITH / Leilaine Campioto Messias
> **Status**: v1.0 — Complete dual-funnel architecture
> **Based on**: Plano Pos-Reuniao 14/abr v3.0, Funil V2 (2026-04-13), Brandbook v1.0, Company Concept v1.0
> **Audience**: Moroni (execution), Leilaine (validation), all execution agents

---

## 0. Executive Summary

This document defines the complete architecture for ZNITH's two simultaneous funnels:

- **Funnel 1 — "Funil Mestre" (Master Funnel)**: the primary revenue engine for ZNITH Consulting Expansao. Converts cold traffic into R$35K consulting contracts through diagnostic-first qualification.
- **Funnel 2 — "Implementar IA" (AI Hype Funnel)**: captures high-volume AI interest, qualifies for commercial maturity, and routes to either ZNITH.AI (agents) or redirects to Funnel 1 (consulting first).

Both funnels share the same Value Ladder and feed each other. Funnel 2 is the volume play that feeds Funnel 1's quality pipeline.

---

## 1. Value Ladder — ZNITH Complete

```
                                    ┌──────────────────────────────┐
                                    │   ZNITH.AI OS                │
                                    │   R$50K-R$150K setup         │
                                    │   + R$5K-R$15K/month         │  BACKEND
                                    │   Full commercial            │
                                    │   architecture implantation  │
                                    └──────────────┬───────────────┘
                                                   │
                                    ┌──────────────┴───────────────┐
                                    │   ZNITH Consulting Expansao  │
                                    │   R$25K-R$65K (avg R$35K)    │  MIDDLE
                                    │   8-week diagnostic +        │
                                    │   architecture design        │
                                    └──────────────┬───────────────┘
                                                   │
                              ┌─────────────────────┼─────────────────────┐
                              │                     │                     │
               ┌──────────────┴──────┐  ┌──────────┴──────────┐  ┌──────┴──────────────┐
               │  Leitura            │  │  ZNITH.AI Agent     │  │  Formacao /         │
               │  Estrategica        │  │  R$785/month        │  │  Workshop           │  FRONTEND
               │  (Free — 45 min)    │  │  + setup fee        │  │  (variable ticket)  │
               └──────────────┬──────┘  └──────────┬──────────┘  └──────┬──────────────┘
                              │                     │                     │
               ┌──────────────┴──────────────────────┴─────────────────────┴──────────────┐
               │   Raio-X Comercial ZNITH — Free diagnostic scorecard                    │  BAIT
               │   15-20 questions → PDF report with 3 biggest gaps + profile             │
               └──────────────────────────────────────────────────────────────────────────┘
```

**Bridge mechanics between rungs:**

| From | To | Bridge Mechanism |
|------|----|-----------------|
| Raio-X (bait) | Leitura Estrategica (frontend) | Qualified leads (Movimento/Maturacao profiles) receive automated invitation |
| Raio-X (bait) | ZNITH.AI Agent (frontend) | Via Funnel 2 routing — leads with existing processes qualify directly |
| Raio-X (bait) | Formacao (frontend) | "Caos" profiles get nurtured toward workshops |
| Leitura Estrategica | Consulting Expansao (middle) | 70-80% of Leituras receive Expansao proposal |
| ZNITH.AI Agent | Consulting Expansao (middle) | Agent clients discover process gaps → referred to consulting |
| Consulting Expansao | ZNITH.AI OS (backend) | Week 8 "Caminhos de Implantacao" — 40-55% conversion target |
| Consulting Expansao | RCaaS (backend) | Alternative to OS — lighter ongoing governance |
| Any client | Referral | Programa Indicador ZNITH (private referral engine) |

---

## 2. Funnel 1 — Funil Mestre (Master Consulting Funnel)

### 2.1 Funnel Map

```
TRAFFIC SOURCES                 FUNNEL STAGES                              OUTCOME
─────────────               ──────────────                              ───────

LinkedIn (Leilaine)  ─┐
                      │     ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
Google (constru-      ├────→│ LANDING     │───→│ RAIO-X       │───→│ RESULT       │
cao civil + IA)       │     │ PAGE        │    │ COMERCIAL    │    │ PAGE         │
                      │     │             │    │ (15-20 Q's)  │    │ + PDF Report │
Referrals ───────────┤     └─────────────┘    └──────┬───────┘    └──────┬───────┘
                      │                               │                   │
Content (YouTube,     │                               │         ┌─────────┴──────────┐
Podcast, Articles) ──┘                               │         │                    │
                                                      │    QUALIFIED            NOT QUALIFIED
                                                      │    (Movimento/          (Caos/Governo)
                                                      │     Maturacao)               │
                                                      │         │                    │
                                                      │         ▼                    ▼
                                                      │    ┌──────────┐    ┌──────────────┐
                                                      │    │ EMAIL    │    │ LONG-TERM    │
                                                      │    │ SEQUENCE │    │ NURTURE      │
                                                      │    │ "Arq.   │    │ (Formacao    │
                                                      │    │ Invisiv."│    │  invite)     │
                                                      │    └────┬─────┘    └──────────────┘
                                                      │         │
                                                      │         ▼
                                                      │    ┌──────────────┐
                                                      │    │ LEITURA      │
                                                      │    │ ESTRATEGICA  │
                                                      │    │ (45 min call │
                                                      │    │  w/ Leilaine)│
                                                      │    └──────┬───────┘
                                                      │           │
                                                      │    ┌──────┴───────┐
                                                      │    │ PROPOSTA     │
                                                      │    │ CONSULTING   │
                                                      │    │ EXPANSAO     │
                                                      │    │ (~R$35K)     │
                                                      │    └──────┬───────┘
                                                      │           │
                                                      │    ┌──────┴───────┐
                                                      │    │ CONTRATO     │
                                                      │    │ EXPANSAO     │
                                                      │    │ (8 weeks)    │
                                                      │    └──────┬───────┘
                                                      │           │
                                                      │    WEEK 8: Caminhos de Implantacao
                                                      │    ┌──────┴───────────────────┐
                                                      │    │           │               │
                                                      │    ▼           ▼               ▼
                                                      │  ZNITH.AI   RCaaS        Internal
                                                      │  OS         (R$5-15K/    execution
                                                      │  (R$50-150K  month)      + "Arq.
                                                      │   setup)                  Viva"
                                                      │                           nurture
```

### 2.2 Traffic Sources

| Source | Type | Priority | Target | Expected Volume (month 1-3) |
|--------|------|----------|--------|----------------------------|
| **LinkedIn (Leilaine personal)** | Organic | PRIMARY | CEOs, directors in construcao civil | 3 posts/week → 50K-80K impressions/month |
| **Google Search** | Paid | SECONDARY (month 3+) | "consultoria comercial construcao civil", "CRM vidracaria", "processo comercial serralheria" | 500-800 clicks/month at R$4-8 CPC |
| **LinkedIn Ads** | Paid | SECONDARY (month 4+) | Decision-makers in construcao civil companies R$1M-50M | 200-400 clicks/month |
| **YouTube** | Organic | SUPPORTING | Long-form authority content | Weekly videos → referral to Raio-X |
| **Referrals** | Organic | HIGHEST QUALITY | Existing client introductions | 2-4 qualified referrals/month |
| **Podcast / Guest appearances** | Organic | SUPPORTING | B2B commercial operations audience | Monthly appearances |
| **Content syndication** | Organic | SUPPORTING | Articles on ZNITH site + cross-post | 3 articles/month |

**Traffic source strategy notes:**
- Months 1-3: LinkedIn organic is the engine. Zero paid traffic until funnel is validated with organic leads.
- Months 4-6: Layer Google Search (bottom-funnel intent) + LinkedIn Ads (awareness in niche).
- Month 7+: Scale selectively. Never scale until Leitura→Contrato conversion is proven above 30%.

### 2.3 Landing Pages Needed

#### Page 1: Raio-X Comercial Landing Page
- **URL**: /raio-x
- **Purpose**: Convert traffic into diagnostic completions
- **Headline angle**: "Quanto sua operacao comercial esta custando em receita invisivel?"
- **Content structure**: Problem agitation (3 symptoms the visitor recognizes) → introduce diagnostic → social proof (Leilaine credentials) → CTA to start quiz
- **CTA**: "Fazer o Raio-X Comercial (gratuito, 6 minutos)"
- **Captures**: email, company name, revenue range, role
- **Owning agent**: dev-agent (build), direct-response-copywriter (copy)
- **Expected conversion**: 35-45% of page visitors start the quiz

#### Page 2: Raio-X Results Page (4 variants)
- **URL**: /raio-x/resultado
- **Purpose**: Deliver diagnostic value + route to next step
- **Variant A — Caos (0-40)**: Educational content + Formacao invite. No sales pressure.
- **Variant B — Movimento (41-65)**: "Sua operacao esta em movimento sem direcao" + PDF report + invite to Leitura Estrategica
- **Variant C — Maturacao (66-85)**: "Sua operacao tem base — falta arquitetura" + PDF report + invite to Leitura Estrategica (premium positioning)
- **Variant D — Governo (86-100)**: Congratulatory + partnership/referral invitation
- **CTA (B & C)**: "Agendar Leitura Estrategica com Leilaine" → /agendar
- **Owning agent**: dev-agent (build), direct-response-copywriter (copy per variant)
- **Expected conversion to Leitura**: 25-35% of Movimento/Maturacao profiles

#### Page 3: Consulting Expansao Sales Page
- **URL**: /expansao
- **Purpose**: Main sales page for the consulting product (linked from proposals, emails, LinkedIn bio)
- **Content structure**: Problem → Why architecture not tools → What Expansao delivers → 8-week timeline → Entregaveis → Leilaine authority → Social proof → Investment + guarantee → CTA
- **CTA**: "Solicitar Leitura Estrategica" → /agendar
- **Owning agent**: dev-agent (build), direct-response-copywriter (copy)
- **Note**: This is NOT a self-serve purchase page. It educates and routes to booking.

#### Page 4: Leitura Estrategica Booking Page
- **URL**: /agendar
- **Purpose**: Calendar booking for the 45-minute diagnostic call
- **Content**: Brief explanation of what happens in the Leitura + Leilaine bio + "what to expect" section
- **Integration**: Cal.com or equivalent booking tool
- **Pre-qualification**: Only accessible after Raio-X completion OR direct referral
- **Owning agent**: dev-agent (build), integration-engineer (calendar integration)

### 2.4 Lead Magnets

**Primary: Raio-X Comercial ZNITH**
- Format: Interactive quiz (15-20 questions) → instant scoring → PDF report
- Content: Questions about CRM usage, follow-up cadence, playbook existence, key-person dependency, AI readiness, revenue predictability
- Scoring: 4 profiles (Caos / Movimento / Maturacao / Governo)
- PDF output: Personalized 3-5 page report with top 3 gaps identified, benchmark comparisons, and recommended next step
- Value delivered: The diagnostic itself creates an "aha" moment. The prospect sees their operation mapped for the first time.

**Secondary: Niche-specific content**
- "Os 5 gargalos comerciais que toda vidracaria enfrenta (e nao sabe)" — downloadable PDF targeting construcao civil
- "Quanto custa um follow-up perdido na construcao civil" — calculator/infographic
- These secondary magnets feed into the Raio-X as a CTA at the end

### 2.5 Qualification Mechanism

**Stage 1 — Raio-X scoring (automated)**

| Profile | Score | Action |
|---------|-------|--------|
| Operacao em Caos | 0-40 | Enter long-term nurture. Invite to Formacao. No Leitura. |
| Operacao em Movimento | 41-65 | Qualified. Invite to Leitura. Standard Expansao proposal (R$25-45K). |
| Operacao em Maturacao | 66-85 | Qualified. Invite to Leitura. Custom Expansao proposal (R$45-120K). |
| Operacao em Governo | 86-100 | Not a prospect. Partnership/referral channel. |

**Stage 2 — Leitura Estrategica (human qualification by Leilaine)**

During the 45-minute call, Leilaine validates:
- Revenue size (minimum R$1M/year to justify Expansao investment)
- Team size (minimum commercial team of 2-3 people)
- Executive commitment (will leadership invest 2h/week for 8 weeks?)
- Timing (ready to start within 30-60 days, not "maybe next year")
- Fit (B2B services or consultative sale, not pure retail/e-commerce)

If the prospect does not pass human qualification, they enter the "Arquitetura Viva" long-term nurture with dignity and zero pressure.

### 2.6 Nurture Sequences

#### Sequence A — "A Arquitetura Invisivel" (Primary nurture for qualified leads)

**Trigger**: Raio-X completed with Movimento or Maturacao profile
**Channel**: Email (primary) + WhatsApp (secondary, for Brazilian market)
**Length**: 7 emails over 21 days
**Goal**: Move qualified lead from "interested" to "books Leitura Estrategica"

| # | Day | Subject Line Intent | Content |
|---|-----|-------------------|---------|
| 1 | 0 | Your Raio-X results + the one gap nobody talks about | Deliver report + introduce the concept of "receita invisivel" — revenue being lost to process gaps they cannot see |
| 2 | 3 | The tool cemetery — why your CRM didnt save you | Name the enemy: tools without architecture. Reframe the problem from "we need better tools" to "we need structure first" |
| 3 | 7 | What R$500M in sales taught about commercial architecture | Leilaine authority story. Not ego — diagnosis. What she learned running commercial ops for 20+ years. |
| 4 | 10 | The one question your vidracaria cant answer (but should) | Niche-specific email for construcao civil. "How much revenue did you lose last month to proposals without follow-up?" |
| 5 | 14 | Before vs. After — what architecture looks like in practice | Anonymous case study. Before: chaos. After: governed operation. Focus on structural change, not magic numbers. |
| 6 | 17 | "Nao tenho tempo" — the objection that proves you need this | Directly addresses the #1 objection. "You dont have time BECAUSE you dont have structure. Structure returns time." |
| 7 | 21 | The Leitura Estrategica — 45 minutes that change your operation | Final CTA. Describe what happens in the Leitura. Set expectations. Book now. |

**Branching logic:**
- If opens email 1-3 but doesn't click → send WhatsApp on day 8 with shortened version of email 4
- If clicks Leitura CTA at any point → exit sequence, enter booking confirmation flow
- If doesn't open any email by day 10 → WhatsApp message: "Vi que voce fez o Raio-X. O resultado mostrou [profile]. Quer que eu mande um resumo rapido?"
- If completes sequence without booking → enter "Carta da Leilaine" monthly newsletter + quarterly re-engagement

#### Sequence B — Long-term nurture (Caos profiles + post-sequence non-converters)

**Channel**: Monthly newsletter "Carta da Leilaine" (email) + quarterly WhatsApp check-in
**Length**: Ongoing until they mature or unsubscribe
**Content**: One monthly reflection from Leilaine on commercial operations. Not selling. Positioning. Authority building. Each Carta ends with a soft invitation to retake the Raio-X.

#### Sequence C — Post-Leitura follow-up (for qualified leads who attended but didn't close)

**Trigger**: Attended Leitura but did not accept proposal within 14 days
**Length**: 4 emails over 45 days

| # | Day | Intent |
|---|-----|--------|
| 1 | 3 after Leitura | Recap the 2-3 gaps identified. "Wanted to make sure these insights were documented for you." |
| 2 | 14 | Case study relevant to their industry. "Lembrei da nossa conversa quando vi esse caso." |
| 3 | 30 | Temporal implication. "Ja se passou 1 mes. Os gargalos que identificamos custaram quanto nesse periodo?" |
| 4 | 45 | Soft close or honest release. "Se faz sentido, a proxima janela de Expansao abre em [date]. Se nao, tudo bem." |

#### WhatsApp Protocol (Brazil-specific)

WhatsApp is the primary messaging channel for Brazilian B2B. All email sequences have a WhatsApp shadow track:
- Day 0: WhatsApp welcome after Raio-X completion (automated via Evolution API)
- Day 3: Follow-up if email not opened
- Day 8: Niche-specific insight (construcao civil content)
- Day 14+: Handoff to human (Leilaine or commercial assistant) for personal follow-up
- Post-Leitura: All follow-up is human-led via WhatsApp, not automated

**Rule**: WhatsApp messages are shorter, more conversational, and always from Leilaine's number (or commercial assistant identified by name). Never from a generic number.

### 2.7 Sales Process

**Step 1 — Leitura Estrategica (45 min)**
- Leilaine conducts live diagnostic
- Structure: 10 min context / 20 min live reading / 10 min ZNITH presentation / 5 min next step
- Delivers 2-3 structural insights the prospect has never articulated
- Does NOT present price. Presents Expansao as concept.
- Output: prospect agrees to receive personalized proposal (target 70-80%)

**Step 2 — Proposal delivery (async, within 48h)**
- Personalized visual document (ZNITH design system)
- Structure: scenario reading (proves Leilaine listened) → deliverables → timeline → investment → guarantee → next step
- Sent via email + WhatsApp PDF
- Follow-up call 3-5 days later if no response

**Step 3 — Alignment meeting (optional, 30-60 min)**
- Only if prospect requests clarification or scope adjustment
- NOT a negotiation meeting. Scope adjustment only.
- Leilaine presents "Caminhos" framing: "Expansao is the first step. After 8 weeks, we'll know together whether OS, RCaaS, or internal execution makes sense."

**Step 4 — Contract signing**
- Digital contract via standard platform
- Payment: 50% upfront, 50% at week 4 (or 100% upfront with 5% discount)
- Kick-off scheduled within 2 weeks of signing

**Step 5 — Week 8: Upsell moment**
- Caderno de Arquitetura Comercial delivered
- Section "Caminhos de Implantacao" presented with three options:
  - Option A: ZNITH.AI OS (ZNITH implements) — R$50-150K setup
  - Option B: RCaaS (client implements with ZNITH governance) — R$5-15K/month
  - Option C: Internal execution solo (ZNITH releases the work)
- Target: 40-55% choose Option A, 15-20% choose Option B, 25-35% choose Option C

### 2.8 Upsell/Cross-sell Bridges

| From | To | Bridge | Timing |
|------|----|--------|--------|
| Consulting Expansao | ZNITH.AI OS | "Caminhos de Implantacao" presentation at week 8 | Immediately after Expansao |
| Consulting Expansao | RCaaS | Alternative to OS for clients with strong internal teams | Immediately after Expansao |
| Consulting Expansao (Option C) | RCaaS or OS | "Arquitetura Viva" bi-monthly newsletter from Leilaine | 6-12 months later |
| ZNITH.AI Agent | Consulting Expansao | Agent reveals process gaps during AI implementation | Ongoing |
| Formacao / Workshop | Raio-X | Every workshop ends with Raio-X CTA | End of event |
| Any client | Referral | Programa Indicador ZNITH | Ongoing |
| Lideres Leoes member | Consulting Expansao | Community exposure creates awareness | Ongoing |

### 2.9 KPIs — Funnel 1

| Stage | Metric | Target Month 1-3 | Target Month 4-6 | Target Stable (6+) |
|-------|--------|------------------|------------------|-------------------|
| TOF | Raio-X completions | 60/mo | 120/mo | 200/mo |
| TOF→MOF | Qualification rate | 25% | 30% | 30% |
| MOF | Qualified leads | 15/mo | 36/mo | 60/mo |
| MOF→BOF | Leituras booked | 6/mo | 12/mo | 18/mo |
| BOF | Show-up rate | 80% | 85% | 90% |
| BOF | Proposals sent | 4/mo | 9/mo | 14/mo |
| BOF | **Expansao contracts closed** | **2/mo** | **4/mo** | **6-8/mo** |
| BOF | Avg ticket | R$32K | R$38K | R$42K |
| POST | Expansao→OS conversion | 30% | 40% | 50% |
| POST | Expansao→RCaaS conversion | 15% | 18% | 20% |
| POST | RCaaS MRR (active) | R$10K | R$40K | R$80K |
| POST | NPS post-Expansao | >70 | >75 | >80 |
| POST | Referrals per client/year | 0.5 | 0.8 | 1.0 |

**North star metric**: Consulting Expansao contracts closed per month.

---

## 3. Funnel 2 — "Implementar IA" (AI Hype Funnel)

### 3.1 Funnel Map

```
TRAFFIC SOURCES                 FUNNEL STAGES                              OUTCOME
─────────────               ──────────────                              ───────

Meta Ads (AI hype)  ─┐
                     │     ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
Google (IA na        ├────→│ LANDING      │───→│ QUALIFICACAO │───→│ ROUTING      │
empresa, agente IA)  │     │ PAGE         │    │ RAPIDA       │    │ PAGE         │
                     │     │ "Implementar │    │ (5-7 Q's)    │    │              │
LinkedIn (IA +       │     │  IA na sua   │    │              │    │              │
comercial)  ────────┤     │  operacao    │    │              │    │              │
                     │     │  comercial"  │    │              │    │              │
YouTube / Reels     │     └──────────────┘    └──────┬───────┘    └──────┬───────┘
(IA content) ──────┘                                │                   │
                                                     │         ┌─────────┴──────────┐
                                                     │         │                    │
                                                     │    HAS PROCESS           NO PROCESS
                                                     │    (Score High)          (Score Low)
                                                     │         │                    │
                                                     │         ▼                    ▼
                                                     │    ┌──────────┐    ┌──────────────┐
                                                     │    │ ZNITH.AI │    │ EDUCATION    │
                                                     │    │ AGENT    │    │ PAGE         │
                                                     │    │ SALES    │    │ "IA sem      │
                                                     │    │ PAGE     │    │  processo so │
                                                     │    │          │    │  automatiza  │
                                                     │    │          │    │  o caos"     │
                                                     │    │          │    │              │
                                                     │    │  CTA:    │    │  CTA:        │
                                                     │    │  /agendar│    │  Raio-X      │
                                                     │    │  (AI     │    │  Comercial   │
                                                     │    │   call)  │    │  (→ Funnel 1)│
                                                     │    └──────────┘    └──────────────┘
```

### 3.2 Traffic Sources

| Source | Type | Priority | Target | Expected Volume (month 1-3) |
|--------|------|----------|--------|----------------------------|
| **Meta Ads** | Paid | PRIMARY | Business owners searching for AI solutions, construcao civil | 1,000-2,000 clicks/month at R$2-5 CPC |
| **Google Search** | Paid | PRIMARY | "agente IA para empresa", "automacao comercial IA", "IA para atendimento" | 500-1,000 clicks/month at R$3-7 CPC |
| **LinkedIn (Leilaine)** | Organic | SECONDARY | Posts about "IA honesta" — when IA makes sense and when it does not | Shared audience with Funnel 1 |
| **YouTube / Reels** | Organic | SUPPORTING | "Por que IA sem processo nao funciona" video series | 4 videos/month |

**Budget note**: Funnel 2 runs paid traffic from month 3+, after Funnel 1 mechanics are validated with organic. Initial test budget: R$3,000-5,000/month (Meta + Google combined).

### 3.3 Landing Pages Needed

#### Page 5: Implementar IA Landing Page
- **URL**: /implementar-ia
- **Purpose**: Capture AI-interested leads with a compelling but honest narrative
- **Headline angle**: "Como implementar IA na sua operacao comercial (sem automatizar o caos)"
- **Content structure**: 
  1. Hook: "Todo mundo quer IA. Poucos estao prontos."
  2. Problem: Most AI implementations fail because they automate chaos
  3. ZNITH difference: We diagnose FIRST, implement SECOND
  4. The 2 paths: If you have process → AI agents accelerate. If you dont → architecture first.
  5. CTA: Quick qualification quiz (5-7 questions)
- **Captures**: email, company name, revenue range, industry, role
- **Owning agent**: dev-agent (build), direct-response-copywriter (copy)
- **Expected conversion**: 25-35% of visitors start the qualification quiz

#### Page 6: AI Routing — Qualified (Has Process)
- **URL**: /implementar-ia/qualificado
- **Purpose**: Present ZNITH.AI agent offering to companies with existing commercial processes
- **Content**: "Sua empresa ja tem base. Agora e hora de acelerar." + ZNITH.AI agent overview + case examples + what AI agents do (qualification, scheduling, follow-up)
- **CTA**: "Agendar conversa sobre ZNITH.AI" → /agendar
- **Owning agent**: dev-agent (build), direct-response-copywriter (copy)

#### Page 7: AI Routing — Not Qualified (No Process)
- **URL**: /implementar-ia/arquitetura-primeiro
- **Purpose**: Educate and redirect to Funnel 1 without making the lead feel rejected
- **Headline**: "IA sem direcao so acelera o caos. Vamos resolver isso."
- **Content structure**:
  1. "Good news: you're asking the right question. Better news: we can help you get ready."
  2. Explain why process must come before technology (2-3 concrete examples)
  3. Introduce the Raio-X Comercial as the diagnostic starting point
  4. "Em 6-8 semanas de arquitetura, sua empresa estara pronta para IA com resultado real."
- **CTA**: "Fazer o Raio-X Comercial Gratuito" → /raio-x (enters Funnel 1)
- **Tone**: Educational, not condescending. The lead should feel guided, not filtered out.
- **Owning agent**: dev-agent (build), direct-response-copywriter (copy)

### 3.4 Qualification Mechanism

**Quick Qualification Quiz (5-7 questions, ~3 minutes)**

Questions:
1. Sua empresa tem um playbook de vendas documentado? (Sim / Parcialmente / Nao)
2. Voce usa CRM ativamente com cadencia de follow-up? (Sim, todos os dias / As vezes / Nao)
3. Seu processo comercial tem etapas definidas e claras? (Sim / Estamos estruturando / Nao)
4. Faturamento mensal aproximado? (Ate R$100K / R$100-500K / R$500K-2M / Acima R$2M)
5. Quantas pessoas no time comercial? (So eu / 2-5 / 6-15 / 15+)
6. Principal motivo para querer IA? (Atendimento 24h / Qualificacao de leads / Automacao de follow-up / Reducao de custo / Outro)
7. Nivel de urgencia? (Quero comecar esse mes / Proximo trimestre / Estou pesquisando)

**Scoring logic:**
- Questions 1-3 are the critical filters. Each "Sim" = 3 points, "Parcialmente/As vezes" = 1 point, "Nao" = 0 points.
- Score 7-9: **Qualified for ZNITH.AI** → Route to Page 6
- Score 3-6: **Needs architecture first** → Route to Page 7 (redirect to Funnel 1)
- Score 0-2: **Needs architecture first + nurture** → Route to Page 7 + enter long-term nurture
- Faturamento below R$100K: automatic disqualification regardless of score → educational content only

### 3.5 Nurture Sequences — Funnel 2

#### Sequence D — "IA Com Direcao" (For ZNITH.AI qualified leads)

**Trigger**: Qualified via Funnel 2 quiz, score 7-9
**Channel**: Email + WhatsApp
**Length**: 5 emails over 14 days
**Goal**: Book an AI implementation call

| # | Day | Intent |
|---|-----|--------|
| 1 | 0 | Quiz results + "Your operation is ready for AI. Here's what that means." |
| 2 | 2 | How ZNITH.AI agents work — qualification, scheduling, follow-up (concrete, not hype) |
| 3 | 5 | Case example: AI agent in a vidracaria — before/after metrics |
| 4 | 9 | "What your competitor is doing while you're still thinking about it" (temporal urgency, honest) |
| 5 | 14 | Direct CTA: book implementation call |

**WhatsApp shadow**: Day 1 welcome + Day 4 follow-up if no email engagement + Day 10 personal outreach.

#### Sequence E — "Processo Primeiro" (For leads redirected to Funnel 1)

**Trigger**: Not qualified via Funnel 2 quiz, score 0-6
**Channel**: Email + WhatsApp
**Length**: 5 emails over 21 days
**Goal**: Complete the Raio-X Comercial (enter Funnel 1)

| # | Day | Intent |
|---|-----|--------|
| 1 | 0 | "We analyzed your answers. Here's the honest truth about AI readiness." — educational, not selling |
| 2 | 3 | "The invisible cost of commercial chaos" — quantify what unstructured operations cost monthly |
| 3 | 7 | Leilaine story: "A vidracaria that wanted AI but needed architecture first" |
| 4 | 14 | "6 minutes that reveal your commercial architecture" — soft CTA for Raio-X |
| 5 | 21 | "When you're ready, the Raio-X is here" — final soft push, then transitions to Carta da Leilaine |

### 3.6 Cross-sell Bridges (Funnel 2 → Funnel 1)

The primary strategic value of Funnel 2 is feeding Funnel 1. The bridges:

1. **Page 7 → Raio-X**: Every "not qualified" lead gets directed to complete the Raio-X Comercial
2. **Sequence E → Raio-X**: 5-email nurture sequence builds awareness and ends with Raio-X CTA
3. **ZNITH.AI clients → Consulting**: During AI implementation, process gaps surface. Leilaine recommends Expansao when appropriate. This is organic and high-converting.
4. **Shared content**: LinkedIn posts serve both funnels. "IA honesta" content builds credibility for Funnel 2 while reinforcing Funnel 1's "structure first" message.

### 3.7 KPIs — Funnel 2

| Stage | Metric | Target Month 1-3 | Target Month 4-6 | Target Stable (6+) |
|-------|--------|------------------|------------------|-------------------|
| TOF | Leads captured (quiz started) | 100/mo | 250/mo | 500/mo |
| TOF | Quiz completion rate | 70% | 75% | 80% |
| Routing | Qualified for ZNITH.AI | 20% | 25% | 25% |
| Routing | Redirected to Funnel 1 | 50% | 45% | 45% |
| Routing | Disqualified (not ICP) | 30% | 30% | 30% |
| AI Path | ZNITH.AI calls booked | 8/mo | 25/mo | 50/mo |
| AI Path | ZNITH.AI contracts closed | 2/mo | 6/mo | 12/mo |
| AI Path | Avg ticket (setup + 3 months) | R$8K | R$10K | R$12K |
| Redirect Path | Raio-X completions from Funnel 2 | 20/mo | 50/mo | 100/mo |
| Combined | Revenue from Funnel 2 leads | R$16K/mo | R$60K/mo | R$144K/mo |

**North star metric for Funnel 2**: Leads redirected to Funnel 1 that convert to Expansao (measured as attribution, tracked separately from Funnel 1 organic).

---

## 4. Combined Funnel Economics

### Revenue Projection (Stable State, Month 6+)

```
FUNNEL 1 (Master Consulting)
  6-8 Expansao contracts × R$42K avg          = R$252K-336K/month
  50% upsell to OS × R$80K avg (lagged)       = R$160K-240K every 60 days
  RCaaS MRR                                    = R$80K/month

FUNNEL 2 (AI Hype)
  12 ZNITH.AI contracts × R$12K avg           = R$144K/month
  Redirect contribution to Funnel 1           = additional 2-3 Expansao/month

COMBINED MONTHLY REVENUE (stable state):
  Consulting projects:  R$252-336K
  OS upsells (avg):     R$80-120K/month (amortized)
  RCaaS:                R$80K
  ZNITH.AI:             R$144K
  ─────────────────────────────────────
  TOTAL:                R$556-680K/month
```

### Cost Assumptions

| Cost Item | Monthly | Notes |
|-----------|---------|-------|
| Meta Ads (Funnel 2) | R$5,000-10,000 | Starts month 3 |
| Google Ads (both funnels) | R$3,000-8,000 | Starts month 3 |
| LinkedIn Ads (Funnel 1) | R$3,000-5,000 | Starts month 4 |
| Platform tools (CRM, email, calendar, quiz) | R$1,500-3,000 | From month 1 |
| Content production (agency fee) | Included in Reis IA contract | Already contracted |
| **Total variable cost** | **R$12,500-26,000** | |

**CAC targets:**
- Funnel 1 (Expansao): R$2,500-4,000 per contract
- Funnel 2 (ZNITH.AI): R$800-1,500 per contract

---

## 5. Automation Specs (for integration-engineer)

### Email Platform Requirements
- Sequences with branching logic (5 sequences total: A, B, C, D, E)
- Tagging by source funnel (F1 vs F2), profile (Caos/Movimento/Maturacao/Governo), score
- Automated triggers on quiz completion, Leitura booking, proposal sent, contract signed
- WhatsApp integration via Evolution API
- Recommended: ActiveCampaign, RD Station, or HubSpot (free tier + sequences add-on)

### Webhook Events

| Event | Trigger | Action |
|-------|---------|--------|
| `raio_x_completed` | Lead completes Raio-X quiz | Tag by profile, enter Sequence A or B, notify Leilaine if Movimento/Maturacao |
| `funnel2_quiz_completed` | Lead completes AI quiz | Route to qualified/unqualified page, enter Sequence D or E |
| `leitura_booked` | Lead books Leitura Estrategica | Exit current sequence, enter pre-Leitura confirmation flow, add to CRM pipeline |
| `leitura_attended` | Leitura call completed | Trigger 48h proposal follow-up, move to BOF pipeline |
| `leitura_no_show` | Leitura missed | Trigger re-booking sequence (2 attempts), then back to nurture |
| `proposal_sent` | Proposal delivered | Start 14-day follow-up timer, enter Sequence C if no response |
| `contract_signed` | Expansao contract signed | Exit all sequences, enter onboarding flow, update CRM stage |
| `ai_contract_signed` | ZNITH.AI contract signed | Exit Funnel 2 sequences, enter AI onboarding flow |
| `expansao_week8` | 8-week mark reached | Trigger upsell pipeline: OS proposal prep + Leilaine notification |
| `referral_made` | Client submits referral | Tag referrer, create lead record, priority-route the referred lead |

### WhatsApp Flows (via Evolution API)

**Flow 1 — Raio-X Welcome (Automated)**
- Trigger: raio_x_completed
- Message: "Oi, [name]! Aqui e da ZNITH. Acabei de ver seu Raio-X Comercial. Seu perfil deu [profile]. O relatorio com os 3 maiores gargalos esta no seu e-mail. Se quiser conversar sobre, responde aqui."
- Handoff: If reply received, route to Leilaine or commercial assistant within 4 hours

**Flow 2 — Leitura Confirmation (Automated)**
- Trigger: leitura_booked
- Message: "Leitura Estrategica confirmada para [date] as [time] com a Leilaine. Em 45 minutos, voce vai ver sua operacao comercial de um jeito que ninguem te mostrou antes. Ate la!"
- Reminder: 24h before + 1h before

**Flow 3 — Post-Leitura (Semi-automated)**
- Trigger: leitura_attended
- Timing: Day 1 after Leitura
- Message (from Leilaine): "[Name], foi bom conversar ontem. Identifiquei [X] gargalos que vale a pena voce prestar atencao. Vou mandar a proposta detalhada ate [date]. Qualquer duvida, me chama aqui."

### CRM Pipeline Stages

```
FUNNEL 1 PIPELINE:
  Raio-X Completed → Qualified → Leitura Booked → Leitura Attended → 
  Proposal Sent → Negotiation → Won / Lost → Upsell (OS/RCaaS)

FUNNEL 2 PIPELINE:
  Quiz Completed → AI Qualified / Redirected → Call Booked → 
  Call Attended → Proposal Sent → Won / Lost

REFERRAL PIPELINE:
  Referral Received → Contacted → Raio-X / Direct Leitura → 
  [merges into Funnel 1 or 2 pipeline]
```

---

## 6. Copy Briefs (for direct-response-copywriter)

### Brief 1: Raio-X Landing Page (/raio-x)
- **Angle**: "Invisible revenue" — how much money is leaking from unstructured commercial operations
- **WHO x WHEN**: Dono/CEO of construcao civil company, TODAY — right now they are losing revenue they cannot see
- **Objections to handle**: "This is just another marketing quiz" → Position as real diagnostic, not marketing
- **Proof**: Leilaine's 20+ years, R$500M credential, "empresas como a sua que ja passaram por essa leitura"
- **Voice**: ZNITH Corp — consultive, premium, direct
- **CTA**: Start Raio-X (free, 6 minutes)

### Brief 2: Consulting Expansao Sales Page (/expansao)
- **Angle**: "Architecture before tools" — the R$35K investment that prevents R$500K in wasted tools/hires
- **WHO x WHEN**: CEO who has already recognized the problem (post Raio-X or Leitura), within 30 days
- **Objections to handle**: All 5 mapped objections (falta de tempo, ja temos CRM, nao sei se funciona, esta caro, agora nao e o momento)
- **Proof**: Value stack (R$81K perceived → R$35K investment), guarantee, case studies, Leilaine credentials
- **Voice**: ZNITH Corp — structured, premium, specific
- **CTA**: Request Leitura Estrategica → /agendar

### Brief 3: Implementar IA Landing Page (/implementar-ia)
- **Angle**: "AI honesty" — ZNITH is the company that tells you when you are NOT ready for AI
- **WHO x WHEN**: Business owner caught in AI hype, TODAY — seeing competitors talk about AI and feeling FOMO
- **Objections to handle**: "AI is too expensive" → depends on readiness. "AI will replace my team" → AI amplifies, not replaces
- **Proof**: ZNITH.AI case examples, Leilaine's "IA sem direcao" positioning
- **Voice**: ZNITH.AI — technical-strategic, honest, premium
- **CTA**: Take the quick quiz (3 minutes)

### Brief 4: Email Sequence "A Arquitetura Invisivel" (7 emails)
- **Angle**: Progressive revelation of commercial blind spots
- **WHO x WHEN**: Qualified lead (Movimento/Maturacao), over 21 days — each email addresses a different blind spot
- **Objections to handle**: Progressively across 7 emails (email 2: tool cemetery, email 6: falta de tempo)
- **Proof**: Each email carries one proof element (credential, case, number, insight)
- **Voice**: Leilaine personal — direct, experienced, caring but confrontational
- **CTA**: Each email has soft CTA to Leitura; email 7 is the hard CTA

### Brief 5: Redirect Page (/implementar-ia/arquitetura-primeiro)
- **Angle**: "Not ready YET — and that is actually the smart discovery"
- **WHO x WHEN**: Lead who wanted AI but lacks process, RIGHT NOW — they need to feel guided, not rejected
- **Objections to handle**: "So I can't have AI?" → "You can, in 6-8 weeks. First, architecture."
- **Proof**: Example of company that tried AI without process → failed → then did architecture → AI worked
- **Voice**: ZNITH Corp with Leilaine personal warmth — educational, honest
- **CTA**: Take the Raio-X Comercial → /raio-x

---

## 7. Design Specs (for designer-agent)

### Spec 1: Raio-X Landing Page
- Dark mode (navy #091022 base)
- Hero: Cinzel headline, Montserrat body, single gold CTA button
- Social proof strip below hero: Leilaine photo + credentials in one line
- 3-column symptoms section (cards with gold icon accents)
- Single-column quiz embed below
- No distractions. No navigation links beyond logo. Single conversion path.

### Spec 2: Raio-X Results Page
- Personalized result display with profile name and score visualization
- PDF download button (gold CTA)
- For qualified profiles: Leitura booking CTA prominently placed
- For non-qualified: educational content section + soft Formacao CTA
- Design must feel like a premium consulting report, not a marketing funnel page

### Spec 3: Consulting Expansao Sales Page
- Long-form page (scroll-driven)
- Sections: Hero → Problem → Reframe → Product intro → Timeline → Deliverables → Authority → Proof → Investment → Guarantee → CTA
- Timeline section: horizontal 8-week visual with phase markers
- Deliverables: feature cards with gold icons
- Investment section: value stack table → price anchor → investment
- CTA repeated: after timeline, after proof, after investment

### Spec 4: Implementar IA Landing Page
- Dark mode, slightly more tech-forward than Funnel 1 pages
- Can use ZNITH.AI accent (gold + tech blue #2A5090)
- Quiz embed more prominent — above the fold
- Shorter page than Expansao — Funnel 2 is volume, less reading
- Mobile-first priority (Meta Ads traffic = mostly mobile)

---

## 8. Data Needs (for data-engineer)

### New Tables Required

```sql
-- Lead scoring and funnel tracking
CREATE TABLE funnel_leads (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  company TEXT,
  revenue_range TEXT,
  role TEXT,
  industry TEXT,
  source_funnel TEXT CHECK (source_funnel IN ('master', 'ai_hype', 'referral', 'organic')),
  source_medium TEXT, -- linkedin, google, meta, direct, referral
  source_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Raio-X quiz results
CREATE TABLE raio_x_results (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES funnel_leads(id),
  score INTEGER,
  profile TEXT CHECK (profile IN ('caos', 'movimento', 'maturacao', 'governo')),
  answers JSONB, -- full quiz answers
  pdf_url TEXT,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel 2 AI quiz results
CREATE TABLE ai_quiz_results (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES funnel_leads(id),
  score INTEGER,
  qualified_for_ai BOOLEAN,
  answers JSONB,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- Funnel events (for attribution and conversion tracking)
CREATE TABLE funnel_events (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES funnel_leads(id),
  event_type TEXT NOT NULL, -- 'raio_x_started', 'raio_x_completed', 'leitura_booked', etc.
  funnel TEXT CHECK (funnel IN ('master', 'ai_hype')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Proposals and contracts
CREATE TABLE proposals (
  id UUID PRIMARY KEY,
  lead_id UUID REFERENCES funnel_leads(id),
  product TEXT CHECK (product IN ('expansao', 'os', 'rcaas', 'ai_agent', 'formacao', 'mentoria')),
  amount_brl DECIMAL,
  status TEXT CHECK (status IN ('draft', 'sent', 'negotiation', 'won', 'lost')),
  sent_at TIMESTAMPTZ,
  decided_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Attribution Requirements
- UTM parameter tracking on all landing pages (source, medium, campaign, content, term)
- Cross-funnel attribution: if a lead enters via Funnel 2 but converts via Funnel 1, both funnels get attribution
- Time-to-conversion tracking: days from first touch to contract signed
- Referral attribution: which client referred which lead

---

## 9. Tech Stack Requirements

| Function | Recommended Tool | Priority | Cost |
|----------|-----------------|----------|------|
| Landing pages | Astro (existing stack) or Webflow | Must-have | Low |
| Quiz/Scorecard (Raio-X) | Custom build (Astro) or Typeform/Tally | Must-have | R$0-200/mo |
| Email sequences | ActiveCampaign or RD Station | Must-have | R$300-800/mo |
| WhatsApp automation | Evolution API (already in use at Reis IA) | Must-have | R$0-200/mo |
| Calendar booking | Cal.com (already decided) | Must-have | Free tier |
| CRM | HubSpot Free or Pipedrive | Must-have | R$0-400/mo |
| Analytics | Plausible or GA4 | Must-have | R$0-50/mo |
| PDF generation (Raio-X report) | Custom (Node/Puppeteer) or DocRaptor | Must-have | Low |
| Proposal template | Custom PDF or PandaDoc | Nice-to-have | R$0-300/mo |
| **Total monthly** | | | **R$300-1,950/mo** |

---

## 10. Risks & Assumptions

### Risks

| Risk | Severity | Mitigation |
|------|----------|-----------|
| **Leilaine as bottleneck** — all Leituras depend on her | HIGH | Cap at 4 Expansao projects parallel. Hire second Arquiteto Comercial by month 6. Pre-qualify aggressively via Raio-X. |
| **Raio-X perceived as "marketing quiz"** | MEDIUM | Invest in report quality. The PDF must feel like a consulting deliverable, not a lead magnet. Real insights, not generic advice. |
| **Funnel 2 attracts low-quality leads** | MEDIUM | Faturamento filter in quiz. Aggressive targeting on ads (construcao civil, B2B services). Redirect path educates before asking for commitment. |
| **Long sales cycle for Expansao (>30 days)** | MEDIUM | Sequence "Arquitetura Invisivel" keeps leads warm. WhatsApp follow-up. Temporal implication messaging ("every month without architecture costs X"). |
| **Construcao civil niche too narrow** | LOW | Start niche, prove the funnel, then expand to adjacent verticals (other B2B services with same profile). The architecture is universal; the language is vertical. |
| **Paid traffic ROI negative in months 1-3** | LOW | Do not start paid until organic funnel is validated. First Expansao contracts from organic/referral prove the mechanics before spending on ads. |

### Assumptions

1. **Construcao civil companies respond to digital funnels** — Leilaine's experience suggests yes, but untested with paid traffic. Validate in month 3-4.
2. **Email works for this audience** — The post-reunion plan flagged this as a hypothesis to test. WhatsApp is the safety net.
3. **Raio-X completion rate will exceed 60%** — Based on similar diagnostic tools in B2B. The questions must be fast and relevant.
4. **40-55% of Expansao clients will upsell to OS** — Based on V2 analysis. Actual rate will depend on Leilaine's week-8 presentation quality.
5. **Referral rate of 1 per client/year is achievable** — Conservative. Programa Indicador ZNITH needs to be designed and activated by month 6.

---

## 11. Implementation Priority

### Phase 1 — Minimum Viable Funnel (Weeks 1-4)

| # | Asset | Funnel | Owner |
|---|-------|--------|-------|
| 1 | Raio-X Comercial (quiz + scoring + PDF) | F1 | dev-agent |
| 2 | Raio-X Landing Page (/raio-x) | F1 | dev-agent + copywriter |
| 3 | Raio-X Results Pages (4 variants) | F1 | dev-agent + copywriter |
| 4 | Leitura Estrategica booking page (/agendar) | F1 | dev-agent + integration-engineer |
| 5 | Consulting Expansao sales page (/expansao) | F1 | dev-agent + copywriter |
| 6 | Email Sequence A — "Arquitetura Invisivel" (7 emails) | F1 | copywriter + humanizer |
| 7 | WhatsApp welcome flow | F1 | integration-engineer |
| 8 | Proposal template (visual premium PDF) | F1 | designer-agent |
| 9 | Leitura Estrategica script (updated for Expansao) | F1 | cmo-strategist |

### Phase 2 — Second Funnel + Amplification (Weeks 5-8)

| # | Asset | Funnel | Owner |
|---|-------|--------|-------|
| 10 | Implementar IA landing page (/implementar-ia) | F2 | dev-agent + copywriter |
| 11 | AI qualification quiz (5-7 questions) | F2 | dev-agent |
| 12 | AI routing pages (qualified + redirect) | F2 | dev-agent + copywriter |
| 13 | Email Sequence D — "IA Com Direcao" (5 emails) | F2 | copywriter + humanizer |
| 14 | Email Sequence E — "Processo Primeiro" (5 emails) | F2 | copywriter + humanizer |
| 15 | 3 anonymous case studies | Both | copywriter |
| 16 | LinkedIn content bank (30 posts for 1 month) | Both | linkedin-strategist |
| 17 | 4 video scripts (YouTube/Reels, construcao civil focus) | Both | reels-scriptwriter |

### Phase 3 — Paid Traffic + Scale (Weeks 9-12)

| # | Asset | Funnel | Owner |
|---|-------|--------|-------|
| 18 | Meta Ads campaign (Funnel 2, construcao civil) | F2 | traffic-manager |
| 19 | Google Ads campaign (bottom-funnel intent) | Both | traffic-manager |
| 20 | LinkedIn Ads campaign (Funnel 1, decision-makers) | F1 | traffic-manager |
| 21 | Carta da Leilaine newsletter setup | F1 | copywriter + integration-engineer |
| 22 | Programa Indicador ZNITH (referral protocol) | Both | cmo-strategist |
| 23 | 30-day performance review | Both | ads-analyst + cmo-strategist |

---

## CHANGELOG

- [2026-04-24] v1.0 — Complete dual-funnel architecture. Funnel 1 (Master Consulting) and Funnel 2 (AI Hype) fully documented with flow diagrams, traffic sources, landing pages, qualification mechanisms, nurture sequences, sales process, upsell bridges, KPIs, automation specs, copy briefs, design specs, data model, tech stack, risks, and implementation phases.
