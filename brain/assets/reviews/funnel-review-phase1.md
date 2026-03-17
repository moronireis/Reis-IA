# Funnel Review — Phase 1 PT-BR Website

Last updated: March 2026

> **Owner**: cmo-strategist
> **Status**: Complete
> **Pages reviewed**: index.astro (Home), builder.astro, systems.astro, Nav.astro, Footer.astro
> **Review date**: 2026-03-12

---

## 1. Executive Summary

- **CRITICAL: All booking CTAs point to `#booking` or `#apply` anchors on the same page -- there is no actual Cal.com integration, booking embed, or external link anywhere.** Every conversion path is a dead end. Visitors who click the primary CTA scroll to a section that does not exist as a booking mechanism. This is the single highest-priority fix before any traffic is sent.

- **All social proof is placeholder.** Every testimonial, case study, metric, and client name is `[PLACEHOLDER]` or `[METRIC]`. The pages are structurally sound for proof, but launching with visible placeholder text destroys credibility instantly. Even a single real data point per page would be better than the current state.

- **Partners and Network links are dead (`href="#"`).** The nav, pillar cards, offer router, and footer all link to Partners and Network pages that do not exist. This creates dead ends for visitors who do not fit the Builder or Systems ICP -- they have nowhere to go.

- **The Home page does an excellent job routing visitors to the right pillar.** The Ecosystem Pillars section (Section 3) and the Offer Paths section (Section 7) provide clear segmentation: agencies go to Builder, companies go to Systems. The dual-CTA hero also works well. This is a strong structural foundation.

- **Pricing is displayed in USD ($) on a PT-BR site targeting Brazilian businesses.** The entire site is in Portuguese, but all prices are in dollars. For the Brazilian market, this creates cognitive friction and may signal "not for me" to SMBs. Decision needed: show BRL, show both, or keep USD with explicit framing.

---

## 2. Page-by-Page Analysis

### 2A. Home Page (index.astro)

#### Hero (Section 1)
**Strengths:**
- Headline is strong and directly states the Revenue-First thesis in PT-BR: "AI Nao E um Projeto de Tecnologia. E uma Estrategia de Revenue."
- Dual CTA structure (primary booking + secondary scroll) is correct for a hub page
- Microcopy beneath CTA ("Sem pitch. Sem enrolacao. 30 minutos...") reduces friction effectively
- Chess knight decorative element present (brand compliance)
- Badge above headline anchors ecosystem positioning

**Issues:**
- Primary CTA `href="#booking"` points to the Footer CTA section (Section 8), which also has `href="#booking"` pointing to itself. This is circular -- there is no actual booking mechanism. The visitor clicks, scrolls to the bottom, clicks again, and nothing happens.
- The word "Revenue" appears untranslated throughout the hero ("Avaliacao de Revenue com AI"). This is an intentional choice (brand term), but worth validating with Brazilian audience whether "Revenue" resonates or whether "Receita" would convert better in the CTA button specifically. The body copy already uses "receita" successfully.

#### Manifesto (Section 2)
**Strengths:**
- Excellent problem framing: "a maioria das empresas esta falhando com AI"
- Chess motif variation is well-integrated, not forced
- Strong closing line: "AI pelo AI e um experimento cientifico. AI para gerar receita e uma estrategia de negocio."
- Copy sounds natural in PT-BR, not translated

**Issues:**
- This section runs long. The chess motif addition (lines 72-76) adds ~4 paragraphs on top of an already substantial manifesto. On mobile, this section will require significant scrolling before the visitor reaches anything actionable. Consider tightening or moving the chess variation to a separate visual element.
- No CTA at the end of this section. After building conviction, the visitor has to scroll through the entire Ecosystem section before reaching another CTA. Add a subtle inline CTA or anchor link.

#### Ecosystem Pillars (Section 3)
**Strengths:**
- Four-card layout with clear differentiation between pillars
- Each card has the right motif icon (chess for Builder/Partners, hourglass for Systems, network icon for Network)
- Copy is specific and benefit-oriented, not generic
- Good proof anchors in the microcopy below each card's bullet list

**Issues:**
- Partners card links to `href="#"` -- dead end
- Network card links to `href="#"` -- dead end
- The Systems card CTA says "Agende um AI Revenue Audit" but links to `/systems`, not to a booking page. This is acceptable (it takes them to the sales page first), but the CTA text implies they will be scheduling immediately. Consider: "Saiba mais sobre Systems" or link directly to the booking section on the Systems page (`/systems#audit`).
- Builder card CTA says "Candidate-se ao Builder" linking to `/builder`. Correct.

#### Interactive Demo (Section 4)
**Strengths:**
- Smart section concept -- showing real use cases builds credibility
- Three demo cards cover the three primary Systems use cases well
- CTA below demos is well-positioned: "Quer ver isso construido para o seu negocio?"

**Issues:**
- All three demos are placeholders with play button icons over empty areas. This is the weakest section on the page visually. Three empty boxes with placeholder text in a row create a "this site is not ready" impression.
- **Recommendation**: Either (a) remove this section entirely until real demos exist, or (b) replace with static screenshots/mockups that show the interface, even if not interactive yet. Empty video placeholders are worse than no section at all.

#### Results / Social Proof (Section 5)
**Strengths:**
- Market data stats (91%, 74%, 67%, 22%) are real and compelling
- The contrast between "67% taxa de sucesso para fornecedores especializados" vs "22% para generalistas" is powerful positioning
- Hourglass motif in the section headline works well
- Case study structure is solid (metric-first layout)

**Issues:**
- All three case studies are 100% placeholder. Every `[METRIC]`, every `[DEPOIMENTO]`, every `[Nome da Agencia]` is empty. This section actively hurts credibility. Visitors will see "Placeholder -- Caso de Sucesso" labels.
- The `placeholder-content` CSS class creates visual placeholder styling, which is good for internal review but must not ship to production. Verify this class renders as expected and does not look broken to visitors.
- **Critical recommendation**: If no real case studies exist, either (a) remove this section entirely, (b) replace with market data / industry stats only (keep the stat blocks, remove the case study cards), or (c) create anonymized "composite" case studies with realistic but clearly labeled data.

#### Founder Story (Section 6)
**Strengths:**
- Bio copy is well-written and sounds natural in PT-BR
- Hourglass motif variation is strong: "Existe um recurso que nenhum sistema de AI consegue fabricar e nenhuma quantidade de dinheiro consegue comprar de volta: tempo."
- Dual CTA at the bottom (primary booking + secondary Builder link) provides good routing
- Photo placeholder is acceptable at this stage

**Issues:**
- The founder photo is a placeholder. This is a personal-brand-driven business. A real photo of Moroni is essential before launch. This section loses most of its trust-building power without it.
- Bio text is quite dense for a single read. Consider breaking into shorter paragraphs or using bold highlights for key phrases.

#### Offer Paths / CTA Router (Section 7)
**Strengths:**
- Three-card layout provides clear segmentation
- Pricing displayed upfront on each card (transparency builds trust)
- "Para Agencias" and "Para Empresas" badges immediately qualify the visitor
- Community fallback line at the bottom catches visitors not ready for a program
- Chess and hourglass icons correctly assigned per pillar

**Issues:**
- Partners card CTA links to `href="#"` -- dead end
- Network link at the bottom links to `href="#"` -- dead end
- Builder card "Candidate-se Agora" button links to `/builder`, not to the application section. Should link to `/builder#apply` to skip the full sales page for visitors already sold from the homepage.
- Systems card "Agende seu AI Revenue Audit" links to `/systems`, not to `/systems#audit`. Same issue -- visitors who are ready to book should land at the booking section.
- Both Builder and Systems paths (highlighted) have `border-bottom: 2px solid rgba(201,168,76,0.3)` accent, but Partners does not. This creates visual hierarchy, which is correct (Partners is secondary), but the dead link makes the disparity worse.

#### Footer CTA (Section 8)
**Strengths:**
- Hourglass watermark and radial glow create strong visual urgency
- Headline "O verdadeiro custo de esperar nao e dinheiro. E tempo." is excellent closing copy
- Microcopy below CTA is personal and effective: "A unica coisa que voce pode fazer hoje que o seu eu do futuro vai agradecer."

**Issues:**
- **CRITICAL**: This section has `id="booking"` -- it is the destination for every `#booking` CTA on the page. But the section itself contains another CTA button with `href="#booking"`, creating a self-referencing loop. There is no booking embed, no Cal.com widget, no form, no external link. The visitor clicks and nothing meaningful happens.
- This is the single most important fix on the entire site. Options: (a) embed Cal.com inline in this section, (b) link to an external Cal.com URL, (c) add a contact form. Without this, the site has zero conversion capability.

---

### 2B. Builder Page (builder.astro)

#### Hero (Section 1)
**Strengths:**
- Chess pre-headline and headline variation are well-chosen for the agency ICP
- "AI sem estrategia e chute" is punchy and provocative -- good for PT-BR
- Subheadline clearly states the transformation: "oferta vendavel de AI, um sistema de aquisicao de clientes e seu primeiro projeto entregue -- em 12 semanas"
- Cohort scarcity ("Vagas limitadas") creates urgency

**Issues:**
- Cohort date is `[DATA]` placeholder -- must be filled before launch
- CTA "Candidate-se para a Proxima Turma" links to `#apply` which correctly scrolls to Section 9

#### Sticky CTA Bar
**Strengths:**
- Smart UX: appears after scrolling past hero, stays fixed at bottom
- Clean design with cohort date and spot count
- Good implementation with IntersectionObserver

**Issues:**
- Cohort date is `[DATA]` placeholder in the sticky bar as well
- "Limitado a 12 clientes" -- this is good scarcity, but must be real. If the first cohort has different capacity, update.
- The sticky CTA links to `#apply` -- same anchor as pricing section. This is correct behavior.

#### Problem / Agitation (Section 2)
**Strengths:**
- Excellent agitation copy. The bullet list of past failures ("Assistiu dezenas de horas de tutoriais de AI e ainda nao sabe o que vender") is voice-of-customer accurate.
- Market data callout box with "$5.000-$20.000" project pricing anchors value
- Hourglass variation closer is well-crafted and natural

**Issues:**
- Section is quite long. Combined with the chess motif additions, this section runs 15+ paragraphs plus a bullet list plus a callout box plus an hourglass closer. On mobile, this is a wall of text before the solution is revealed. Consider trimming or splitting.

#### Solution Reveal (Section 3)
**Strengths:**
- Chess motif opening ("Um curso te da as pecas. O Builder te ensina a jogar o jogo.") is the strongest brand motif integration on the entire site
- Comparison table (Course vs. Builder) is a proven conversion element
- Chess grid texture behind the table reinforces the motif visually

**Issues:**
- No CTA in this section. After seeing the comparison table, the visitor is primed to act but must scroll through the entire program detail, qualifier, objections, and proof sections before reaching a CTA. Add a secondary CTA after the comparison table.

#### Program Detail (Section 4)
**Strengths:**
- Four-module breakdown is clear and well-structured
- Chess subtitles for each module ("O lance de abertura", "Posicione antes de avancar", "Execute com precisao", "Endgame") tie beautifully to the chess motif
- Deliverables block is comprehensive
- Two-column layout (main deliverables + bonuses) is scannable

**Issues:**
- Chess knight icon only appears on Module 01. For visual consistency and brand compliance, consider subtle chess elements on all modules (or at least modules 1 and 4, which are most strategy-heavy).
- No CTA after this comprehensive section. The visitor has seen the full program and wants to act -- give them a button.

#### Who It's For (Section 5)
**Strengths:**
- For/Not For structure is a proven qualifier that increases conversion quality
- Copy is specific and honest -- "o Builder e um acelerador, nao um kit inicial" filters well
- Green checkmarks vs red X visual hierarchy is clear

**Issues:**
- No issues. This section is well-executed.

#### Objection Handling (Section 6)
**Strengths:**
- Five objections covered are the right five for this ICP
- Hourglass integration on "E se eu nao tiver tempo" objection is natural and effective
- Chess integration on "Ja investi em programas antes" is the strongest objection handler -- it reframes the question from "will this work" to "was the previous program built for results"
- Copy is conversational and direct -- sounds like Moroni speaking

**Issues:**
- Labeled "Perguntas Frequentes" but structurally functions as objection handling. This is fine -- "FAQ" framing reduces defensiveness.
- The price objection ($4.000-$15.000) math example ("Um projeto de AI vende por $5.000-$20.000. O programa Builder se paga no seu primeiro cliente") is strong but would be even stronger with a specific example.

#### Social Proof (Section 7)
**Strengths:**
- Three testimonial blocks have well-written placeholder text that demonstrates what real testimonials should sound like
- Case study block structure is solid

**Issues:**
- All testimonials and the case study are 100% placeholder. Same issue as the Home page -- visible `[Nome do Dono da Agencia]` and `isPlaceholder={true}` markers.
- **Must-fix**: Real testimonials or removal before launch. Placeholder testimonials are worse than no testimonials.

#### Guarantee (Section 8)
**Strengths:**
- "Construa Sua Oferta ou Receba Seu Dinheiro de Volta" is a strong, clear guarantee
- Completion requirement ("Faca o trabalho") is smart -- protects both sides
- Hourglass closer ("Tem so uma coisa que a garantia nao cobre. Tempo.") is the most emotionally resonant line on the page
- Shield icon adds visual trust

**Issues:**
- No issues. This is one of the strongest sections on the site.

#### Pricing and Application (Section 9)
**Strengths:**
- Three-tier pricing is well-structured with clear differentiation
- "Recomendado" badge on Premium tier guides decisions correctly
- Application process steps (5 steps) reduce anxiety about what happens after clicking
- "Analisamos cada candidatura pessoalmente" reinforces exclusivity

**Issues:**
- `#apply` anchor is on this section, and all "Candidate-se Agora" buttons within this section also point to `#apply`. This is another self-referencing loop. There is no application form, no Typeform embed, no external link. Same critical issue as the Home page booking CTA.
- Cohort date `[DATA]` placeholder appears twice more here
- Pricing is in USD. For a PT-BR page targeting Brazilian agency owners, this needs explicit framing (e.g., "Valores em USD. Consulte condições em BRL na call.") or conversion to BRL.

#### Final CTA (Section 10)
**Strengths:**
- Chess/hourglass combined closing is effective
- "Daqui a 12 semanas, voce poderia ter uma oferta de AI vendida e um cliente em entrega. Ou poderia ainda estar observando." is strong urgency copy

**Issues:**
- Application deadline `[DATA]` placeholder
- CTA says "Candidate-se para a Turma [X]" -- the `[X]` is visible to the visitor as a placeholder

#### P.S. (Section 11)
**Strengths:**
- P.S. section is a proven direct-response element
- "Devia ter feito isso seis meses atras" is voice-of-customer language

**Issues:**
- CTA uses `variant="ghost"` which is the lowest-visibility variant. For a P.S. close, consider upgrading to `variant="primary"` to catch scrollers who read all the way through.

---

### 2C. Systems Page (systems.astro)

#### Hero (Section 1)
**Strengths:**
- Enemy-angle headline ("Seu projeto de AI nao falhou porque a tecnologia nao funciona. Falhou porque ninguem fez a pergunta certa primeiro.") directly addresses the Prototype Graveyard positioning
- Pre-headline targets the exact ICP transition moment
- Hourglass decorative element (desktop) at correct positioning
- CTA clearly states "Gratuita" -- removes price friction

**Issues:**
- CTA links to `#audit` which points to the Pricing section (Section 9). This is better than the Home page (at least the Pricing section has booking CTAs), but those CTAs also point to `#audit` -- another self-referencing loop. No actual booking mechanism exists.

#### Problem (Section 2)
**Strengths:**
- 42% abandonment stat is powerful and specific
- Symptom list is voice-of-customer accurate for B2B decision-makers who have been burned
- "Prototype Graveyard" enemy is named and framed effectively

**Issues:**
- No issues. Strong problem section.

#### Agitation (Section 3)
**Strengths:**
- Klarna example is an excellent real-world proof point
- Hourglass variation closer is natural and compelling
- "AI nao so economiza tempo. Ela transforma tempo em distancia competitiva." is a standout line

**Issues:**
- Minor: The Klarna example is about a massive enterprise. The ICP for Systems is R$1M-R$100M companies. The example works for credibility but could create an "that's for big companies" objection. Consider adding a smaller-scale example alongside it.

#### Solution (Section 4)
**Strengths:**
- Chess motif opening ("Um enxadrista habilidoso nao move pecas aleatoriamente") is well-integrated
- Three framework questions in cards are a strong structural element
- "Nao escrevemos uma linha de codigo ate que esse mapa exista" is a powerful differentiator statement

**Issues:**
- Chess grid texture is used as a section background. Works well visually.

#### Service Offerings (Section 5)
**Strengths:**
- Six service cards cover the full range of Systems implementations
- Each card includes an hourglass icon, creating strong visual brand consistency
- The "time frame" italic text beneath each card ties every service back to time/cost savings

**Issues:**
- Every metric is `[METRIC]` placeholder across all six cards. This is less damaging than placeholder testimonials (visitors may not notice small italic text), but it still weakens the section.
- All six cards use the hourglass icon. While this is thematically correct (Systems = time), visual variety would improve scanability. Consider alternating with a simple gear or circuit icon for operational services.

#### Process (Section 6)
**Strengths:**
- Seven-step process is detailed and transparent
- Step 01 (AI Revenue Audit) includes hourglass icon and the strongest copy block
- Timeline labels (SEMANA 1, SEMANAS 1-2, etc.) set realistic expectations

**Issues:**
- Step 01 body text is extremely long compared to steps 02-07. This creates visual imbalance and suggests the Audit is disproportionately complex. Consider shortening to match the density of other steps.

#### Results / Proof (Section 7)
**Strengths:**
- Case study structure is well-designed (metric-first, scenario-solution-result format)
- Market validation stats at the bottom (91%, 67%, 74%) reinforce the specialist positioning

**Issues:**
- Both case studies are 100% placeholder. Same critical issue as other pages.
- The `placeholder-content` CSS class makes the placeholder nature very visible.

#### Qualifier (Section 8)
**Strengths:**
- "Sua empresa fatura entre R$1M e R$100M ao ano" is specific qualification that saves sales time
- "Nao e o fit certo se: Voce esta em escala enterprise ($100M+)" clearly defines the ceiling

**Issues:**
- Revenue qualifier uses R$ but pricing sections use $. This inconsistency may confuse visitors about whether prices are in BRL or USD.

#### Pricing (Section 9)
**Strengths:**
- Three-tier structure (Starter, Full Implementation, Retainer) provides clear ascension path
- "Recomendado" badge on Full Implementation guides correctly
- "Preco Fixo -- Nao Por Hora" positioning is a strong differentiator
- Guarantees section (Section 10) immediately follows pricing -- correct placement

**Issues:**
- `id="audit"` anchor is on this section, but there is no audit booking mechanism. All CTAs on this page point here, and all CTAs within this section also point to `#audit`.
- Retainer card CTA "Discutir Apos a Implementacao" links to `#audit` -- misleading, as a retainer discussion should happen post-project, not via the same audit booking flow.

#### FAQ (Section 11)
**Strengths:**
- Seven FAQs are comprehensive and address the right objections for this ICP
- FaqAccordion component (React interactive) is a good UX choice
- The "Quanto tempo ate vermos resultados?" answer is the longest and most detailed -- appropriate for an analytical ICP

**Issues:**
- The FAQ about results timeline is extremely long (one massive paragraph). This will render poorly in an accordion. Consider breaking into shorter paragraphs within the answer.
- No hourglass or chess motif integration in any FAQ answer. The time-related questions are natural territory for hourglass references.

#### Final CTA (Section 12)
**Strengths:**
- Combined chess/hourglass closing is effective
- "Comece Com o Lance que Muda Tudo" is a strong headline
- "60 minutos. Um relatorio escrito. Um primeiro movimento claro." is excellent microcopy
- Secondary CTA for visitors ready to skip the audit and go straight to implementation discussion

**Issues:**
- Both primary and secondary CTAs point to `#audit` -- same dead end
- The hourglass watermark and chess grid texture create a visually rich closing section

---

### 2D. Navigation (Nav.astro)

**Strengths:**
- Fixed nav with blur backdrop is on-brand
- Active page indicator (accent border-bottom) provides clear wayfinding
- Mobile menu is well-implemented with full-screen overlay
- Accessibility attributes (aria-label, aria-expanded, aria-controls) are correct

**Issues:**
- Partners, Network, and About links all point to `href="#"` -- dead ends
- **CRITICAL**: Mobile menu CTA button says **"Book a Call"** in English. This is the only English text on the entire PT-BR site. Must be changed to "Agende uma Conversa" (which is correctly used in the desktop nav CTA).
- Desktop nav CTA "Agende uma Conversa" links to `#booking` -- same dead-end issue
- The nav has 5 links (Builder, Systems, Partners, Network, About) but only 2 actually go somewhere. This creates a broken navigation experience.

---

### 2E. Footer (Footer.astro)

**Strengths:**
- Four-column layout (Brand, Ecosystem, Resources, Social) is clean and comprehensive
- "O Ecossistema de Revenue com AI" tagline under logo reinforces positioning
- PT-BR legal links (Politica de Privacidade, Termos de Uso) are present

**Issues:**
- Partners link: `href="#"` -- dead end
- Network link: `href="#"` -- dead end
- About link: `href="#"` -- dead end
- Casos de Sucesso link: `href="#"` -- dead end
- Blog link: `href="#"` -- dead end
- Contato link: `href="#"` -- dead end
- All four social links (LinkedIn, YouTube, Instagram, Twitter/X): `href="#"` -- dead ends
- **10 out of 12 footer links are dead ends.** Only Builder and Systems work. The footer currently creates more confusion than value. Either add real URLs or remove links that go nowhere.

---

## 3. Critical Issues (Must-Fix Before Launch)

Prioritized by conversion impact:

### P0 -- Conversion Blockers (Site cannot convert without these)

1. **No booking/application mechanism exists anywhere on the site.** Every CTA on every page points to an anchor (`#booking`, `#apply`, `#audit`) that scrolls to a section containing another CTA pointing to the same anchor. No Cal.com embed, no external booking URL, no Typeform, no contact form.
   - **Fix**: Embed Cal.com booking widget inline on both the Home page (Section 8) and Systems page (Section 9 or 12). Add an application form (Typeform or similar) on the Builder page (Section 9). All CTAs should either scroll to these embeds or link directly to external booking/application URLs.
   - **Scope**: 2-4 hours of dev work per page.

2. **Mobile nav CTA says "Book a Call" in English.** This is a visible localization miss that breaks the PT-BR experience.
   - **Fix**: Change line 105 of Nav.astro from "Book a Call" to "Agende uma Conversa".
   - **Scope**: 2 minutes.

### P1 -- Credibility Blockers (Site will not convert well without these)

3. **All social proof is placeholder.** Visible `[PLACEHOLDER]`, `[METRIC]`, `[Nome da Agencia]` text on 3 pages, totaling 8+ placeholder blocks.
   - **Fix (minimum)**: Remove or hide all case study blocks and testimonial blocks until real content exists. Keep market data stats (they are real data). Alternatively, create 1-2 "composite" case studies based on Moroni's actual experience, clearly labeled as representative scenarios.
   - **Scope**: 1-2 hours to remove/hide, or 4-6 hours to create composite content.

4. **Demo section (Home page Section 4) has three empty video placeholder boxes.** Three dark rectangles with play buttons and placeholder text in a row.
   - **Fix**: Remove section entirely until real demos exist, OR replace with static screenshots/mockups of the AI systems being described.
   - **Scope**: 30 minutes to remove, 2-3 hours to replace with mockups.

5. **Founder photo is placeholder.** The Founder Story section is a trust-building element that requires a real photo of Moroni.
   - **Fix**: Add a professional photo. Dark, dramatic lighting per design specs.
   - **Scope**: Depends on photo availability.

### P2 -- Navigation/UX Blockers

6. **10 out of 12 footer links are dead ends.** Partners, Network, About, Casos de Sucesso, Blog, Contato, and all 4 social links go nowhere.
   - **Fix (minimum)**: Remove all dead-end links. Show only Builder, Systems, and real social links. Add remaining links as they become real pages.
   - **Fix (better)**: Add real social media URLs (LinkedIn, YouTube, Instagram). Create a simple About page. Set Partners/Network/Blog/Contato links to a "coming soon" state or remove entirely.
   - **Scope**: 30 minutes for removal, 2-4 hours for partial implementation.

7. **Nav links for Partners, Network, and About are dead ends.** Three out of five nav links go nowhere.
   - **Fix**: Remove from nav until pages exist, or link to relevant sections on the Home page (e.g., Partners card in the Ecosystem section).
   - **Scope**: 15 minutes.

8. **All `[DATA]` placeholders on Builder page must be filled.** Cohort start date, application deadline, and cohort number `[X]` are all placeholder text visible to visitors.
   - **Fix**: Set real dates or remove date references until dates are confirmed.
   - **Scope**: 15 minutes.

---

## 4. Recommendations (Nice-to-Have Improvements)

Prioritized by conversion impact:

### High Impact

1. **Add mid-page CTAs on long sales pages.** Both Builder and Systems pages have 3-4 section stretches without any CTA. Specifically:
   - Builder: Add CTA after Solution Reveal (Section 3) and after Program Detail (Section 4)
   - Systems: Add CTA after Solution (Section 4) and after Service Offerings (Section 5)
   - Home: Add CTA after Manifesto (Section 2)
   - **Rationale**: Not every visitor reads the full page. Conversion opportunities every 2-3 sections is standard for long-form sales pages.

2. **Resolve the USD vs BRL pricing inconsistency.** The site targets Brazilian businesses, qualifies with R$ revenue ranges, but displays all pricing in USD.
   - **Option A**: Show BRL with a note about USD equivalent
   - **Option B**: Show USD with a note "Consulte condições em BRL durante a conversa"
   - **Option C**: Keep USD (if the ICP is sophisticated enough to expect it -- agency owners likely are, but SMBs may not be)
   - **Recommendation**: Option B for now. Add a line below each pricing section.

3. **Builder page P.S. CTA should be `variant="primary"` not `variant="ghost"`.** Visitors who read all the way to the P.S. are highly engaged -- give them a prominent CTA.

4. **Add a lead magnet reference.** The funnel strategy calls for an "AI Agency Profit Calculator" as the primary lead magnet. There is zero reference to it anywhere on the site. This is a significant funnel gap -- the site has no email capture mechanism at all, meaning every visitor who is not ready to book/apply is lost forever.
   - **Recommendation**: Add a lead magnet CTA in the Home page Manifesto section or Founder Story section: "Baixe a Calculadora de Lucro com AI" with email capture.

5. **Shorten the Systems page FAQ answer about timeline.** The "Quanto tempo ate vermos resultados?" answer is a single paragraph of ~200 words. It will render as a dense wall of text in the accordion. Break into 3-4 short paragraphs.

### Medium Impact

6. **Add WhatsApp as a secondary contact method.** The Brazilian market heavily favors WhatsApp for business communication. Adding a WhatsApp button (floating or in the footer) would provide an alternative conversion path for visitors who prefer messaging over booking a call.

7. **Consider adding a "How the Audit Works" micro-section on the Home page.** The AI Revenue Audit is the primary entry point for the Systems funnel, but the Home page only mentions it in CTA text. A 2-3 sentence block explaining what happens in the audit would reduce friction.

8. **Tighten the Manifesto section.** The chess motif variation adds 4 paragraphs to an already substantial manifesto. Consider integrating the chess reference as a single powerful line rather than a multi-paragraph expansion.

9. **Add anchor links from Home page pillar cards directly to sub-page sections.** Currently, "Candidate-se ao Builder" goes to `/builder` (top of page). For visitors already sold from the Home page, linking to `/builder#apply` skips 10 sections of content they may not need.

### Lower Impact

10. **Add page-specific meta descriptions in PT-BR.** The Home page title is "O Ecossistema de Revenue com AI" which is good. Verify that `<meta description>` tags exist and are compelling for search/social sharing.

11. **Consider adding a subtle "Back to top" button on long pages.** Both sales pages are 700+ lines of content. Mobile users especially benefit from quick navigation.

12. **Network icon on the Home page pillar card is a raw SVG.** Builder, Systems, and Partners cards use dedicated icon components (`ChessKnightIcon`, `HourglassIcon`). The Network card uses an inline SVG. Consider creating a `NetworkIcon` component for consistency.

---

## 5. Funnel Gap Map

```
CURRENT STATE: Where the funnel breaks

TRAFFIC ───────────> HOME PAGE ───────> BUILDER PAGE ───────> #apply ──> DEAD END (no form)
  |                    |                    |
  |                    |                    +────────────────> Sticky CTA ──> #apply ──> DEAD END
  |                    |
  |                    +──────────────> SYSTEMS PAGE ───────> #audit ──> DEAD END (no booking)
  |                    |                    |
  |                    |                    +────────────────> FAQ section (good)
  |                    |
  |                    +──────────────> PARTNERS ──────────> href="#" ──> DEAD END
  |                    |
  |                    +──────────────> NETWORK ───────────> href="#" ──> DEAD END
  |                    |
  |                    +──────────────> ABOUT ─────────────> href="#" ──> DEAD END
  |
  |                    HOME #booking CTA ─────────────────> Self-referencing anchor ──> DEAD END
  |
  +── No lead magnet capture anywhere on site
  +── No email opt-in anywhere on site
  +── No WhatsApp link anywhere on site
  +── No social media links (all href="#")


DESIRED STATE: What should exist

TRAFFIC ───────────> HOME PAGE ───────> BUILDER PAGE ──────> Application Form (Typeform/embedded)
  |                    |                    |                       |
  |                    |                    +── Sticky CTA ────────+
  |                    |                    |
  |                    |                    +── Multiple mid-page CTAs
  |                    |
  |                    +──────────────> SYSTEMS PAGE ──────> Cal.com Booking (embedded or linked)
  |                    |                    |
  |                    |                    +── Multiple mid-page CTAs
  |                    |
  |                    +──── Lead Magnet ──> Email Capture ──> Nurture Sequence ──> Builder/Systems CTA
  |                    |
  |                    +──── WhatsApp ─────> Direct conversation ──> Qualification ──> Audit/Application
  |
  +── Footer: Real social links (LinkedIn, YouTube, Instagram)
  +── Nav: Only links to pages that exist
```

**Key gaps in the funnel:**

| Funnel Stage | Status | Gap |
|-------------|--------|-----|
| Traffic → Home | Not yet evaluated | No tracking, no UTM structure discussed |
| Home → Pillar page | WORKING | Routing logic is strong |
| Pillar page → Conversion | BROKEN | No booking/application mechanism |
| Email capture | MISSING | No lead magnet, no opt-in, no email collection |
| Nurture | NOT BUILT | Email sequences designed but no platform connected |
| WhatsApp | MISSING | Not referenced despite being critical for Brazilian market |
| Social proof | PLACEHOLDER | All testimonials and case studies are empty |
| Partners/Network | NOT BUILT | Dead-end links throughout |

---

## 6. PT-BR Quality Notes

### Overall Assessment
The PT-BR copy is **strong and natural-sounding**. It does not read like translated English. The brand voice (direct, confident, pragmatic) comes through clearly in Portuguese. The copywriter or translator did good work here.

### Specific Issues Found

1. **"Book a Call" in English** -- Nav.astro line 105, mobile menu CTA. This is the only English text on the PT-BR site. Must be fixed.

2. **"Revenue" used as a brand term throughout** -- "Avaliacao de Revenue com AI", "O Ecossistema de Revenue com AI", "Revenue-First Framework". This is an intentional bilingual branding choice. It works in context because:
   - "Revenue" is recognized by the Brazilian business audience
   - It differentiates from competitors who use "receita" generically
   - The body copy alternates between "Revenue" (brand term) and "receita" (natural language)
   - **However**: The CTA buttons use "Revenue" ("Agende sua Avaliacao de Revenue com AI"). In CTA context, clarity beats branding. Consider testing "Agende sua Avaliacao de AI para Receita" or simply "Agende sua Avaliacao Gratuita de AI" for the button text specifically.

3. **"Prototype Graveyard" with PT-BR translation in parentheses** -- The Systems page uses "Prototype Graveyard (cemiterio de prototipos)" which is good practice -- keeps the branded English term while ensuring comprehension. The Home page also does this. Consistent and well-handled.

4. **"fit" used in Portuguese context** -- Systems page Section 8 uses "O Reis IA Systems E o Fit Certo?" This anglicism is common in Brazilian business Portuguese and should be fine for the target ICP.

5. **Minor: "scope creep"** -- Systems pricing note uses "scope creep" which is a technical term. The ICP (business decision-makers) may or may not know this term. Consider "sem surpresas, sem custos extras por mudanca de escopo" instead.

6. **Section 2 of Home page: "nenhuma nota fiscal"** -- The Hourglass closer on the Builder page says "Este e o custo que nao aparece em nenhuma nota fiscal." This is a strong, culturally-specific reference (nota fiscal is a distinctly Brazilian concept). Good localization.

7. **Pricing formatting** -- Prices use "$4.000" (Brazilian convention with period as thousands separator) rather than "$4,000" (US convention). This is correct for the PT-BR audience but creates ambiguity since the currency is USD. If keeping USD, consider using the US convention ($4,000) to avoid confusion with "$4.00".

### What Works Well in PT-BR

- Moroni's signature phrases translate naturally: "Comece com a receita, trabalhe de tras para frente ate a tecnologia"
- Urgency language is culturally appropriate -- not aggressive, but firm
- "Candidatura" (application) framing is appropriate for high-ticket programs in Brazil
- Chess and hourglass metaphors work equally well in Portuguese
- The "For/Not For" qualifier sections sound natural ("Este Programa E Para Voce Se:")
- FAQ language is conversational without being informal

---

*Review produced by: cmo-strategist*
*Review date: 2026-03-12*
*Next review recommended: After P0 and P1 fixes are implemented*
