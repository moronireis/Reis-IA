# Copy Refinements Proposed — Reis IA Website

Last updated: 2026-03-16

---

## Summary

| Page | Language Fixes | Density Reductions | Flow Improvements | Total |
|------|---------------|-------------------|-------------------|-------|
| Home | 6 | 4 | 6 | 16 |
| Builder | 5 | 5 | 5 | 15 |
| Systems | 5 | 4 | 5 | 14 |
| Agendar | 1 | 0 | 1 | 2 |
| Aplicar | 1 | 0 | 0 | 1 |
| Nav/Footer | 1 | 0 | 0 | 1 |
| **Total** | **19** | **13** | **17** | **49** |

**Pages ranked by work needed (most to least):** Home (16), Builder (15), Systems (14), Agendar (2), Aplicar (1), Nav/Footer (1)

---

## Per-Page Changes

### Page: Home
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/index.astro`

#### Change 1 — Language Fix
**Location**: Hero badge (line 44)
**Current**: `O Ecossistema de Revenue com AI`
**Proposed**: `O Ecossistema de Receita com AI`
**Reason**: "Revenue" has no natural equivalent usage in PT-BR for this context. "Receita" is the correct word and is universally understood.

#### Change 2 — Language Fix + Flow Improvement
**Location**: Hero H1 (lines 51-52)
**Current**: `AI Nao E um Projeto de Tecnologia.<br />E uma Estrategia de Revenue.`
**Proposed**: `AI Nao E um Projeto de Tecnologia.<br />E uma Estrategia de Receita.`
**Reason**: Same as above. Keeping "Revenue" in the H1 creates friction for Brazilian readers. "Receita" is direct and confident.

#### Change 3 — Language Fix
**Location**: Hero CTA button (line 64)
**Current**: `Quero meu Diagnostico de Revenue com AI`
**Proposed**: `Quero meu Diagnostico de Receita com AI`
**Reason**: Consistency with H1 translation. "Revenue" should be "Receita" in all non-framework-name contexts.

#### Change 4 — Flow Improvement
**Location**: Manifesto section, chess paragraph (line 111)
**Current**: `Um bom enxadrista nao move pecas aleatoriamente na esperanca do xeque-mate. Cada posicao e deliberada. Cada lance segue uma estrategia definida antes do jogo comecar.`
**Proposed**: `Um bom enxadrista nao move pecas aleatoriamente esperando um xeque-mate. Cada posicao e deliberada. Cada lance segue uma estrategia definida antes do jogo comecar.`
**Reason**: "na esperanca do" sounds literary. "esperando um" is more natural and direct in PT-BR.

#### Change 5 — Flow Improvement
**Location**: Ecosystem section H2 (line 138)
**Current**: `Um relacionamento. Quatro formas de vencer com AI.`
**Proposed**: `Um ecossistema. Quatro formas de vencer com AI.`
**Reason**: "Um relacionamento" is ambiguous and generic. "Um ecossistema" aligns with the section label and brand terminology.

#### Change 6 — Flow Improvement
**Location**: Systems card description (line 179)
**Current**: `Implementacao de AI feita para voce -- para empresas prontas para sair do papo de "estrategia de AI" e entrar nos resultados reais.`
**Proposed**: `Implementacao de AI feita para voce. Se voce esta pronto para sair do papo de "estrategia de AI" e entrar nos resultados reais -- este e o caminho.`
**Reason**: Eliminates the jarring "para voce -- para empresas" third-person shift. Keeps direct address throughout.

#### Change 7 — Language Fix
**Location**: Systems card CTA (line 188)
**Current**: `Agendar AI Revenue Audit`
**Proposed**: `Agendar Auditoria de Receita com AI`
**Reason**: In a CTA, the reader needs to understand what they are clicking. Untranslated English in a PT-BR CTA creates hesitation.

#### Change 8 — Language Fix
**Location**: Stats section H2 (line 267)
**Current**: `Cada mes no Prototype Graveyard e um mes que nao volta.`
**Proposed**: `Cada mes no cemiterio de prototipos e um mes que nao volta.`
**Reason**: "Prototype Graveyard" is not explained on the Home page. The Portuguese equivalent is more immediately understood and equally punchy.

#### Change 9 — Density Reduction
**Location**: Partners card description (lines 201-202)
**Current**: `O movimento mais inteligente nos negocios e construir capacidade sem carregar todo o custo. O Reis IA Partners da a sua agencia a espinha dorsal tecnica de AI -- para que voce venda projetos de alto valor com confianca enquanto a gente cuida da execucao. Voce fica com o relacionamento. A gente entrega o resultado.`
**Proposed**: `O Reis IA Partners da a sua agencia a espinha dorsal tecnica de AI -- para que voce venda projetos de alto valor com confianca enquanto a gente cuida da execucao. Voce fica com o relacionamento. A gente entrega o resultado.`
**Reason**: The opening philosophical sentence ("O movimento mais inteligente...") is abstract and doesn't add value in a card context. Start with the concrete value proposition.

#### Change 10 — Density Reduction
**Location**: Founder story hourglass paragraph (line 423)
**Current**: `Tem um recurso que nenhum sistema de AI fabrica e nenhuma quantia de dinheiro recupera: tempo. Cada semana com a abordagem errada de AI e uma semana de perda acumulada -- orcamento desperdicado, receita que nao entrou, uma distancia competitiva que cresce em silencio enquanto o prototipo acumula poeira. A Reis IA existe para fechar essa distancia. Rapido. Com proposito.`
**Proposed**: `Tem um recurso que nenhum sistema de AI fabrica e nenhuma quantia de dinheiro recupera: tempo. Cada semana com a abordagem errada e perda acumulada -- orcamento desperdicado, receita que nao entrou, distancia competitiva crescendo em silencio. A Reis IA existe para fechar essa distancia. Rapido. Com proposito.`
**Reason**: Tightens the middle sentence by removing "de AI" (redundant in context) and "enquanto o prototipo acumula poeira" (an extra metaphor that dilutes the main point).

#### Change 11 — Flow Improvement
**Location**: Founder story origin paragraph (line 417)
**Current**: `Criei a Reis IA a partir de uma percepcao que vi se repetir em empresas de todos os tamanhos:`
**Proposed**: `Criei a Reis IA porque vi o mesmo padrao se repetir em empresas de todos os tamanhos:`
**Reason**: "a partir de uma percepcao que vi se repetir" is formal and indirect. "porque vi o mesmo padrao" is direct and natural.

#### Change 12 — Flow Improvement
**Location**: Founder story framework paragraph (line 418)
**Current**: `O Revenue-First Framework inverte essa logica. Primeiro voce encontra onde AI gera o maior impacto de negocio. Depois voce constroi. Nesta ordem, nunca ao contrario.`
**Proposed**: `O Revenue-First Framework inverte essa logica. Primeiro voce encontra onde AI gera o maior impacto de negocio. Depois voce constroi.`
**Reason**: "Nesta ordem, nunca ao contrario" is filler. The two preceding sentences already established the order clearly.

#### Change 13 — Density Reduction
**Location**: Footer CTA paragraph (lines 596)
**Current**: `Seus concorrentes estao acumulando vantagem agora. Cada sistema de AI que eles colocam no ar este mes trabalha enquanto voce ainda esta decidindo. A janela esta aberta. O relogio corre independente do que voce faz.`
**Proposed**: `Seus concorrentes estao acumulando vantagem agora. Cada sistema de AI que eles colocam no ar este mes trabalha enquanto voce ainda esta decidindo. O relogio nao espera.`
**Reason**: "A janela esta aberta" is redundant with the preceding sentence. "O relogio nao espera" is punchier than "O relogio corre independente do que voce faz."

#### Change 14 — Language Fix
**Location**: Footer tagline (Footer.astro line 17)
**Current**: `O Ecossistema de Revenue com AI`
**Proposed**: `O Ecossistema de Receita com AI`
**Reason**: Consistency with the hero badge translation.

#### Change 15 — Density Reduction
**Location**: Home Offer Paths Systems description (line 495)
**Current**: `Implementacao de AI feita para voce, vinculada a resultados de receita mensuraveis. Comeca com um AI Revenue Audit -- para construirmos a coisa certa, nao qualquer coisa.`
**Proposed**: `Implementacao de AI feita para voce, vinculada a resultados de receita mensuraveis. Comeca com uma Auditoria de Receita com AI -- para construir a coisa certa, nao qualquer coisa.`
**Reason**: Translates "AI Revenue Audit" and simplifies "para construirmos" to "para construir".

#### Change 16 — Language Fix
**Location**: Home Offer Paths Systems CTA (line 497)
**Current**: `Agendar meu AI Revenue Audit`
**Proposed**: `Agendar minha Auditoria de Receita com AI`
**Reason**: CTA should be in PT-BR for maximum conversion with Brazilian audience.

---

### Page: Builder
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/builder.astro`

#### Change 1 — Density Reduction
**Location**: Hero pre-headline (line 55)
**Current**: `Para Donos de Agencia Prontos para Parar de Reagir ao AI -- e Comecar a Liderar`
**Proposed**: `Para Donos de Agencia que Querem Liderar com AI`
**Reason**: Pre-headline is too long (15 words). Should be a quick qualifier (7-10 words max).

#### Change 2 — Flow Improvement
**Location**: Hero H1 (lines 63-64)
**Current**: `AI sem estrategia e chute.<br />Em 12 semanas, voce poderia estar jogando um jogo completamente diferente.`
**Proposed**: `AI sem estrategia e chute.<br />Em 12 semanas, voce estaria em uma posicao completamente diferente.`
**Reason**: "jogando um jogo" is vague and uses double gerund. "em uma posicao" is concrete and connects to the chess/positioning metaphor used throughout.

#### Change 3 — Density Reduction
**Location**: Problem section bold statement (line 153)
**Current**: `O problema e que voce nao tem uma oferta empacotada, um processo de entrega claro nem uma conversa de vendas que fecha -- e construir tudo isso do zero e um projeto de tempo integral enquanto voce ja toca uma agencia de tempo integral.`
**Proposed**: `O problema e que voce nao tem uma oferta empacotada, um processo de entrega claro nem uma conversa de vendas que fecha. E construir tudo isso do zero e um projeto de tempo integral -- enquanto voce ja toca uma agencia de tempo integral.`
**Reason**: Breaking the dash into a period + new sentence makes it easier to read while keeping the punch.

#### Change 4 — Flow Improvement
**Location**: Problem section (line 149)
**Current**: `Uma agencia que voce conhece -- talvez menor do que a sua -- se reposicionou em torno de servicos de AI.`
**Proposed**: `Uma agencia que voce conhece -- talvez menor do que a sua -- passou a vender servicos de AI.`
**Reason**: "se reposicionou em torno de" is a calque from English. "passou a vender" is more natural and concrete.

#### Change 5 — Flow Improvement
**Location**: Problem section (line 151)
**Current**: `AI e a maior virada no mercado de agencias desde as redes sociais -- e voce sabe exatamente para onde isso vai.`
**Proposed**: `AI e a maior virada no mercado de agencias desde as redes sociais -- e voce ja enxerga isso.`
**Reason**: "para onde isso vai" is vague. "ja enxerga isso" is more direct and assumes confidence in the reader.

#### Change 6 — Density Reduction
**Location**: Problem hourglass paragraph (line 195)
**Current**: `Esse e o custo que nao aparece em nenhuma nota fiscal. A cada mes que voce espera, um concorrente fecha um cliente de AI que voce poderia ter fechado. A cada mes, a curva de aprendizado fica mais comprimida -- mas a janela de oportunidade tambem. A cada mes, as agencias que se moveram antes acumulam mais casos de sucesso, sobem precos e fidelizam clientes em retainer.`
**Proposed**: `Esse e o custo que nao aparece em nenhuma nota fiscal. A cada mes que voce espera, um concorrente fecha um cliente de AI que voce poderia ter fechado. A cada mes, as agencias que se moveram antes acumulam mais casos, sobem precos e fidelizam clientes.`
**Reason**: Three "A cada mes" is one too many. The middle one about "curva de aprendizado" adds a tangent. Two repetitions are enough for rhetorical effect.

#### Change 7 — Flow Improvement
**Location**: Solution section paragraph (line 221)
**Current**: `A cada semana, voce nao esta so aprendendo AI -- voce esta se posicionando. Estruturando sua oferta. Mapeando seu mercado. Construindo o sistema de vendas. Entregando o primeiro projeto.`
**Proposed**: `A cada semana, voce nao so aprende AI -- voce se posiciona. Estrutura sua oferta. Mapeia seu mercado. Constroi o sistema de vendas. Entrega o primeiro projeto.`
**Reason**: Eliminates 6 consecutive gerunds. Present indicative is more assertive and natural in PT-BR.

#### Change 8 — Language Fix
**Location**: Module 04 subtitle (line 388)
**Current**: `Endgame. Transforme uma vitoria em um sistema que continua vencendo.`
**Proposed**: `Fase final. Transforme uma vitoria em um sistema que continua vencendo.`
**Reason**: "Endgame" is not commonly understood by Brazilian CEO audience outside gaming/pop culture.

#### Change 9 — Density Reduction
**Location**: Objection 4 -- Time (lines 589-591)
**Current**: `Se voce consegue comprometer 5-8 horas por semana durante 12 semanas, voce consegue fazer isso. A pergunta real sobre tempo nao e "tenho 5-8 horas por semana?" -- voce tem, se olhar o que essas horas produzem hoje. A pergunta real e: como serao os proximos 12 meses se voce os gastar da mesma forma que gastou os ultimos 12? As agencias que passaram pelo Builder gastaram 5-8 horas por semana por 12 semanas. As que nao passaram gastaram esse mesmo tempo da mesma forma que fizeram nos meses anteriores -- vendo concorrentes avancar, travadas no que vender, perdendo terreno que nao volta mais. O tempo no Builder nao e custo. E o unico investimento onde o que voce constroi paga de volta o tempo que voce colocou.`
**Proposed**: `Se voce consegue comprometer 5-8 horas por semana durante 12 semanas, voce consegue fazer isso. A pergunta real nao e "tenho tempo?" A pergunta real e: como serao os proximos 12 meses se voce gastar essas horas da mesma forma que gastou os ultimos 12? O tempo no Builder nao e custo. E o unico investimento onde o que voce constroi paga de volta o tempo que voce colocou.`
**Reason**: Cuts the redundant comparison paragraph. The point lands stronger with less repetition.

#### Change 10 — Density Reduction
**Location**: Objection 5 -- Previous programs (lines 605-608)
**Current**: 8 paragraphs addressing one objection including repeated chess analogy.
**Proposed**: Cut lines 605-606 (chess analogy about torre/partida) as it repeats the comparison table concept from Section 3. Keep the remaining 6 paragraphs.
**Reason**: The chess analogy was already used in the comparison table section. Repeating it dilutes both instances.

#### Change 11 — Language Fix
**Location**: Application process step 4 (line 785)
**Current**: `Conversa -> decisao -> se der match, voce garante sua vaga`
**Proposed**: `Conversa -> decisao -> se houver alinhamento, voce garante sua vaga`
**Reason**: "match" in this context feels casual/imported. "alinhamento" is more professional and natural for a premium program.

#### Change 12 — Language Fix
**Location**: Pricing note (line 774)
**Current**: `para os tiers Em Grupo e Premium`
**Proposed**: `para os planos Em Grupo e Premium`
**Reason**: "tiers" is not natural PT-BR. "planos" is the standard term.

#### Change 13 — Language Fix
**Location**: VIP tier ideal-for (line 769)
**Current**: `agencias prontas para agir imediatamente e ir all-in nos servicos de AI`
**Proposed**: `agencias prontas para agir imediatamente e investir de cabeca nos servicos de AI`
**Reason**: "all-in" is informal slang. "investir de cabeca" conveys the same commitment in natural PT-BR.

#### Change 14 — Flow Improvement
**Location**: Objection 1 (line 551)
**Current**: `A implementacao tecnica e a camada de execucao`
**Proposed**: `A implementacao tecnica e a parte operacional`
**Reason**: "camada" (layer) is tech jargon leaking into business copy. "parte operacional" is clearer for the target audience.

#### Change 15 — Language Fix
**Location**: Aplicar "onboarding" step (line 291)
**Current**: `Confirmacao e onboarding na turma`
**Proposed**: `Confirmacao e integracao na turma`
**Reason**: While "onboarding" is used in BR tech, "integracao" is more natural for an educational/mentoring context.

---

### Page: Systems
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/systems.astro`

#### Change 1 — Density Reduction
**Location**: Hero pre-headline (line 86)
**Current**: `Para Empresas em Crescimento Prontas para Sair de "Deveriamos Implementar AI" para "Nossa AI Esta Gerando Resultados"`
**Proposed**: `Para Empresas Prontas para Resultados Reais com AI`
**Reason**: 20+ words is far too long for a pre-headline badge. Should be 8-10 words max.

#### Change 2 — Flow Improvement
**Location**: Problem section (line 136)
**Current**: `Empresas que implementam AI corretamente estao reduzindo custos de suporte em 30-40%. Estao qualificando mais leads sem contratar mais vendedores. Estao escalando operacoes sem escalar headcount.`
**Proposed**: `Empresas que implementam AI corretamente reduzem custos de suporte em 30-40%. Qualificam mais leads sem contratar mais vendedores. Escalam operacoes sem aumentar equipe.`
**Reason**: Removes progressive tense ("estao reduzindo") for more direct present tense. Replaces "headcount" with "equipe". Removes repetitive "Estao" openers.

#### Change 3 — Density Reduction
**Location**: Revenue Audit process step (line 461)
**Current**: Single paragraph of 8+ lines describing audit, deliverables, and rationale.
**Proposed**: Break into three parts:

> Antes de construir um unico sistema, fazemos algo que a maioria dos fornecedores de AI pula: descobrimos onde esta o dinheiro. Uma sessao de 60-90 minutos onde mapeamos seu negocio contra o Revenue-First Framework.
>
> Voce recebe um relatorio escrito com:
> - Top 3-5 oportunidades de receita com AI
> - Ranking por esforco vs. impacto
> - Estimativas de orcamento e prazo
> - Requisitos de integracao
>
> A coisa mais cara em qualquer projeto de AI nao e a tecnologia. E o tempo perdido construindo a coisa errada. O Audit elimina isso.

**Reason**: Wall of text in a process step kills scannability. Bullet list for deliverables makes them findable.

#### Change 4 — Density Reduction
**Location**: FAQ -- "Quanto tempo ate vermos resultados?" (line 35)
**Current**: 10+ line answer with multiple timelines and embedded CTA.
**Proposed**: Trim to: `O Pacote Starter tem escopo para 2-4 semanas de construcao. Implementacoes completas levam 4-8 semanas. Resultados mensuraveis -- onde voce traca uma linha clara do sistema ate um resultado de negocio -- sao tipicamente visiveis em 60 dias apos o lancamento. O AI Revenue Audit e um investimento de 60 minutos que diz exatamente o que construir, quanto custa e quando voce veria retorno.`
**Proposed answer**: Cut the middle section about "empresas que esperam" -- that urgency argument belongs in the main page copy, not in an FAQ answer where the reader wants a direct answer.
**Reason**: FAQ answers should be concise. The urgency argument is repeated from the main body.

#### Change 5 — Flow Improvement
**Location**: Methodology section (line 272)
**Current**: `O Revenue-First Framework nao e um checklist. E uma arquitetura estrategica.`
**Proposed**: `O Revenue-First Framework nao e um checklist. E um modelo estrategico.`
**Reason**: "arquitetura estrategica" is overly formal/academic. "modelo estrategico" is how Brazilian executives actually speak.

#### Change 6 — Language Fix
**Location**: Qualifier "Not For" list (line 682)
**Current**: `Voce esta em escala enterprise ($100M+) com processos de procurement enterprise`
**Proposed**: `Voce e uma empresa de grande porte ($100M+) com processos de compras corporativos`
**Reason**: Three stacked English terms ("escala enterprise", "procurement enterprise") is unnatural. Portuguese equivalents are standard and clear.

#### Change 7 — Flow Improvement
**Location**: Final CTA section (line 1008)
**Current**: `As empresas que implementam AI certo nao se movem mais rapido. Se movem de forma mais inteligente.`
**Proposed**: `As empresas que implementam AI certo nao sao mais rapidas. Sao mais estrategicas.`
**Reason**: Active construction is more assertive. "Mais estrategicas" is punchier than "de forma mais inteligente."

#### Change 8 — Flow Improvement
**Location**: Pricing note (line 821)
**Current**: `Precificamos por resultado, nao por tempo. Voce sabe o investimento antecipadamente. Sem surpresas, sem scope creep que infla sua conta.`
**Proposed**: `Precificamos por resultado, nao por hora. Voce sabe o investimento antes de comecar. Sem surpresas, sem aumento de escopo inflando sua conta.`
**Reason**: "antecipadamente" is formal. "scope creep" needs PT-BR equivalent.

#### Change 9 — Language Fix
**Location**: Starter pricing tier ideal-for (line 748)
**Current**: `PMEs, primeira implementacao de AI, empresas querendo prova de conceito.`
**Proposed**: `PMEs, primeira implementacao de AI, empresas que querem validar antes de escalar.`
**Reason**: "prova de conceito" is a direct translation. "validar antes de escalar" is more natural and action-oriented.

#### Change 10 — Flow Improvement
**Location**: FAQ about data security (line 39)
**Current**: `Seguimos principios de minimizacao de dados: a AI acessa apenas o que precisa para funcionar.`
**Proposed**: `Usamos o minimo de dados necessario: a AI acessa apenas o que precisa para funcionar.`
**Reason**: "principios de minimizacao de dados" is GDPR jargon translated literally. Simpler language is clearer.

#### Change 11 — Density Reduction
**Location**: Service cards italic paragraphs (lines 343, 359, 375, 391, 407, 423)
**Current**: Each service card has a main description + italic "time insight" paragraph that restates the same value proposition.
**Proposed**: Remove the italic paragraphs from all 6 service cards. The main descriptions already communicate the value.
**Reason**: The italic paragraphs add ~18 lines of text that repeat what the main descriptions say. Removing them makes the cards scannable without losing information. (If one must stay, keep only on the first card as a pattern-setter.)

#### Change 12 — Language Fix
**Location**: Qualifier heading (lines 631, 645, 675)
**Current**: `O Reis IA Systems E o Fit Certo?` / `O Reis IA Systems E o Fit Certo Se:` / `O Reis IA Systems NAO E o Fit Certo Se:`
**Proposed**: `O Reis IA Systems E a Escolha Certa?` / `O Reis IA Systems E a Escolha Certa Se:` / `O Reis IA Systems NAO E a Escolha Certa Se:`
**Reason**: "Fit" is not natural PT-BR in this context. "Escolha certa" is direct and universally understood.

#### Change 13 — Language Fix
**Location**: Systems final CTA supporting button (line 1019)
**Current**: `Agende uma Consulta Systems`
**Proposed**: `Agende uma Consulta de Implementacao`
**Reason**: "Consulta Systems" mixes languages awkwardly. "Consulta de Implementacao" is clear.

#### Change 14 — Flow Improvement
**Location**: Problem section (line 160)
**Current**: `Isso e o Prototype Graveyard (cemiterio de prototipos). E e onde a maioria do investimento em AI vai parar.`
**Proposed**: `Isso e o cemiterio de prototipos. E e onde a maioria do investimento em AI vai parar.`
**Reason**: Lead with PT-BR. The English term in parentheses adds friction. The concept is clear without the English.

---

### Page: Agendar
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/agendar.astro`

#### Change 1 — Language Fix
**Location**: Trust badge (line 203)
**Current**: `Revenue-First Framework`
**Proposed**: `Metodologia Revenue-First`
**Reason**: As a standalone badge, "Revenue-First Framework" lacks context. Adding "Metodologia" gives it PT-BR structure while keeping the branded term.

#### Change 2 — Flow Improvement
**Location**: Hero H1 (line 37)
**Current**: `Agende Sua Sessao Estrategica de Revenue com AI`
**Proposed**: `Agende Sua Sessao Estrategica de Receita com AI`
**Reason**: Consistency with Home page translation of "Revenue" to "Receita" in non-framework contexts.

---

### Page: Aplicar
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/pages/aplicar.astro`

#### Change 1 — Language Fix
**Location**: Application process step 3 (line 291)
**Current**: `Confirmacao e onboarding na turma`
**Proposed**: `Confirmacao e integracao na turma`
**Reason**: "Onboarding" is common in BR tech but "integracao" is more natural for an educational/mentoring program context.

---

### Page: Nav/Footer
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/components/Footer.astro`

#### Change 1 — Language Fix
**Location**: Brand tagline (line 17)
**Current**: `O Ecossistema de Revenue com AI`
**Proposed**: `O Ecossistema de Receita com AI`
**Reason**: Consistency with Home page hero badge translation.

---

### Page: MainLayout (meta descriptions)
**File**: `/Users/moronireis/Projetos vscode/reis-ia-website/src/layouts/MainLayout.astro`

#### Change 1 — Language Fix
**Location**: Default meta description (line 14)
**Current**: `Comece com o Revenue-First AI Framework.`
**Proposed**: `Comece com o Revenue-First Framework.`
**Reason**: "Revenue-First AI Framework" stacks too many English words. "Revenue-First Framework" is the branded name; adding "AI" is redundant since the description already mentions AI.

---

## Terms Glossary -- English Terms Kept

| English Term | Why It Stays | Context |
|-------------|-------------|---------|
| AI | Universal standard in BR tech/business | Across all pages |
| Revenue-First | Branded framework name (proper noun) | Methodology references |
| Framework | Standard in BR tech | Methodology references |
| CRM | Universal acronym | Integration references |
| ROI | Universal financial acronym | Stats sections |
| API | Universal tech acronym | Integration references |
| WhatsApp | Brand name | Integration and contact references |
| HubSpot | Brand name | Integration lists |
| Salesforce | Brand name | Integration lists |
| Pipedrive | Brand name | Integration lists |
| OpenAI | Brand name | LogoMarquee |
| n8n | Brand/tool name | LogoMarquee, Builder problem list |
| Make | Brand name | LogoMarquee, Builder problem list |
| Zapier | Brand name | LogoMarquee, Systems qualifier |
| Vercel | Brand name | LogoMarquee |
| Python | Language name | LogoMarquee |
| React | Framework name | LogoMarquee |
| Slack | Brand name | Builder deliverables |
| Builder | Reis IA pillar brand name | Throughout |
| Systems | Reis IA pillar brand name | Throughout |
| Partners | Reis IA pillar brand name | Throughout |
| Network | Reis IA pillar brand name | Throughout |
| Pipeline | Widely adopted anglicism in BR sales | Builder, Systems |
| Premium | Universal pricing term | Builder tiers |
| VIP | Universal | Builder tiers |
| Outreach | Adopted anglicism in BR marketing | Builder modules |
| No-code | Standard tech term | Systems qualifier |
| ERP | Universal acronym | Systems integrations |
| Follow-up | Widely used in BR business | Home Systems card |
| Template(s) | Widely adopted in BR | Builder deliverables |
| Newsletter | Universal | Lead capture sections |
| SOPs | Common in BR operations | Builder deliverables |
| Leads | Universal in BR marketing | Throughout |
| LinkedIn | Brand name | Builder, Aplicar |
| Instagram | Brand name | Aplicar |
| Google Meet | Brand name | Agendar |
| LGPD | Brazilian regulation acronym | Systems FAQ |
| GDPR | International regulation acronym | Systems FAQ |
| Cal.com | Brand name | Agendar |
| Formspree | Brand name | Form actions |

---

## Changelog

- 2026-03-16: Initial copy refinements document created. 49 total proposed changes across all pages.
