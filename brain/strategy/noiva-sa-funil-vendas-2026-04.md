# Noiva S.A. — New Funnel & Sales Structure

**Last updated:** 2026-04-10
**Status:** Approved in meeting — Ready for implementation
**Owner:** Moroni Reis (strategy) + Giovana Paola (execution)

---

## 1. Funnel Architecture

```
┌─────────────────────────────────────────────────────┐
│                    TOPO (Engajamento)                │
│                                                     │
│  Instagram · TikTok · Reels · Stories · Lives       │
│  Collabs com fornecedores · Conteúdo viral          │
│                                                     │
│  Pilares: 30% Método | 25% Bastidor | 25% Educação │
│           20% Prova Social                          │
└───────────────────────┬─────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                  MEIO (Consideração)                 │
│                                                     │
│  Quiz: "Quanto custa casar?" (visual)               │
│  Quiz: "Qual assessoria combina com você?"          │
│  PDF: "50 coisas que toda noiva esquece"            │
│  Mini curso: 3 vídeos (R$17 ou gratuito)            │
│  Live mensal: Noivo S.A. Vivo (fornecedores)        │
│                                                     │
│  → Coleta de dados: budget, timeline, preferências  │
└───────────────────────┬─────────────────────────────┘
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
┌──────────────────┐  ┌──────────────────────────────┐
│  LEAD FRIO       │  │  LEAD QUALIFICADO            │
│                  │  │                              │
│  Sequência de    │  │  Bot WhatsApp (3 perguntas)  │
│  nutrição:       │  │  Agendamento automático      │
│  - Boas-vindas   │  │  Reunião vendedora (45 min)  │
│  - Valor         │  │  Proposta personalizada      │
│  - Prova social  │  │  Follow-up estruturado       │
│  - Convite       │  │                              │
│                  │  │  Script:                     │
│  "Siga nosso     │  │  Conexão → Diagnóstico →     │
│   perfil"        │  │  Método → Pacotes            │
└──────────────────┘  └──────────────────────────────┘
                                  │
                                  ▼
                      ┌──────────────────────┐
                      │  PÓS-VENDA           │
                      │                      │
                      │  Grupo VIP           │
                      │  Programa indicação  │
                      │  Coleta depoimentos  │
                      │  Clube (futuro)      │
                      └──────────────────────┘
```

---

## 2. WhatsApp Bot — 3 Qualification Questions

### Question 1: Timeline
> "Oi! Que bom ter você aqui 🤍 Antes de tudo: quando é o grande dia?"
- Opções:
  - Menos de 6 meses
  - 6-12 meses
  - Mais de 1 ano
  - Ainda não tem data

**Scoring:** <6 meses = urgente (hot), 6-12 = ideal, >1 ano = nutrição, sem data = nutrição

### Question 2: Stage
> "Você já começou a contratar fornecedores?"
- Opções:
  - Sim, já tenho quase tudo
  - Tenho alguns, faltam vários
  - Ainda não comecei
  - Nem sei por onde começar

**Scoring:** Quase tudo = Início, Alguns = Completa, Não comecei/Nem sei = Completa/Exclusiva

### Question 3: Budget
> "Quanto você imagina investir em assessoria de casamento?"
- Opções:
  - Até R$2.000
  - R$2.000 - R$5.000
  - R$5.000 - R$10.000
  - Acima de R$10.000
  - Ainda não pensei nisso

**Scoring:**
- Até R$2K = nutrição (abaixo do mínimo)
- R$2K-5K = qualificado (Início ou Completa)
- R$5K-10K = qualificado (Completa ou Exclusiva)
- R$10K+ = VIP (Exclusiva ou Giovana Direct)
- Não pensou = nutrição com educação sobre valor

### Routing Logic:
```
IF budget >= R$2K AND timeline <= 12 meses:
  → QUALIFICADO → Convite para reunião
  → "Perfeito! Vou te conectar com nossa equipe para uma conversa 
     personalizada. Escolhe o melhor horário aqui: [link Cal.com]"

IF budget < R$2K OR timeline > 1 ano OR sem data:
  → NUTRIÇÃO → Sequência automática
  → "Entendi! Vou te mandar uns conteúdos que vão te ajudar muito 
     nessa fase. Enquanto isso, segue a gente no @noivasa 🤍"
```

---

## 3. Nurture Sequence (Lead Frio)

### Day 0 — Welcome
> Bem-vinda à Noiva S.A.! Sou a [Nome], e a gente tá aqui pra te ajudar a planejar o casamento dos sonhos — sem estresse, sem surpresa. Nos próximos dias vou te mandar alguns conteúdos que as noivas mais amam. Fique de olho!

### Day 1 — Value (Education)
> [Conteúdo educativo] "5 erros que 90% das noivas cometem no orçamento do casamento" — PDF ou carrossel

### Day 3 — Social Proof
> [Depoimento em vídeo] "A [Noiva X] casou com a gente em [mês]. Olha o que ela falou sobre a experiência..."

### Day 5 — Method
> [Vídeo curto] "Como funciona o método Noiva S.A. — em 60 segundos"

### Day 7 — Invitation
> "Quer descobrir como seria ter uma equipe inteira cuidando do seu casamento? A gente preparou uma conversa de 45 minutos, sem compromisso, pra entender o que você precisa. Quer agendar? [link]"

### Day 14 — Re-engagement (if no response)
> "Oi [Nome]! Vi que você se interessou pela assessoria. Muitas noivas ficam na dúvida se precisam — normal! Separei um conteúdo especial sobre quando vale a pena contratar: [link]"

---

## 4. Sales Script Framework

### PRE-MEETING (Vendedora prepara):
- Review quiz data (budget, preferences, timeline)
- Check which package fits
- Prepare personalized proposal

### MEETING STRUCTURE (45 min):

#### Fase 1 — Conexão (5 min)
- Apresentação pessoal (vendedora)
- "Me conta um pouco sobre vocês e sobre o casamento"
- Escuta ativa, criar rapport

#### Fase 2 — Diagnóstico (15 min)
- "Quando é o casamento?"
- "Já contrataram algum fornecedor?"
- "Qual a maior preocupação de vocês hoje?"
- "O que vocês mais querem pro dia?"
- "Já pesquisaram sobre assessoria? O que acharam?"
- "Quem tá ajudando vocês na organização?"
- **KEY:** Identificar a DOR principal (tempo, medo de errar, sobrecarga, orçamento)

#### Fase 3 — Método (10 min)
- "Deixa eu te mostrar como a Noiva S.A. funciona"
- Apresentar o método (com slides/proposta visual)
- Mostrar before/after de casamentos anteriores
- Prova social específica (caso similar ao deles)
- **KEY:** Mostrar que existe MÉTODO, não improviso

#### Fase 4 — Pacote (10 min)
- "Com base no que vocês me contaram, o pacote que mais faz sentido é o [X]"
- Apresentar proposta personalizada (visual, premium)
- Detalhar o que está incluído
- Mostrar o valor vs. o investimento no casamento total
- "Vocês vão investir R$[total casamento]. A assessoria é [X]% desse valor pra garantir que 100% funcione."

#### Fase 5 — Fechamento (5 min)
- "Vocês têm alguma dúvida?"
- Quebrar objeções (ver mapa abaixo)
- "Essa proposta tem validade de [X] dias"
- "Querem garantir a vaga? O pagamento pode ser [opções]"

### OBJECTION MAP:

| Objection | Response Strategy |
|-----------|-------------------|
| "É caro" | "Vocês vão investir R$[X] no casamento. A assessoria é menos de [Y]% pra garantir que tudo funcione. É o seguro mais barato que existe." |
| "A assessoria do buffet já faz" | "O buffet cuida do buffet. Quem cuida dos seus 15 fornecedores? Quem revisa contratos? Quem garante que tudo chegue na hora? São funções completamente diferentes." |
| "Preciso pensar" | "Claro! Mas me diz — o que exatamente você precisa pensar? Às vezes eu consigo esclarecer agora e economizar seu tempo." |
| "Noivo acha caro" | "Entendo. Muitos noivos pensam assim no início. O que muda é quando eles entendem que SEM assessoria, ELES que vão ter que resolver tudo no dia. Quer que eu mande um material específico pra ele?" |
| "Vou pesquisar outras" | "Faz muito bem! Quando pesquisar, compara: quantas pessoas no dia, método de trabalho, acesso a fornecedores, experiência. A gente se destaca em todos." |

---

## 5. Follow-Up Structure

### After Meeting — Closing Sequence:

#### Day 0 (same day):
> "Oi [Nome]! Foi muito bom conversar com vocês. Vou deixar aqui a proposta que a gente conversou. Qualquer dúvida, é só me chamar! A proposta tem validade até [data]."

#### Day 2:
> "Oi [Nome]! Tudo bem? Vi que vocês ainda não confirmaram. Só queria lembrar que a vaga pra [mês do casamento] é limitada — a gente só atende [X] casamentos por mês pra garantir qualidade. Quer que eu tire alguma dúvida?"

#### Day 5:
> "[Nome], última mensagem sobre a proposta! Depois de [data], o valor pode mudar. Se precisar de alguma adaptação, me avisa que a gente vê juntos."

#### Day 10 (if no close):
> Move to nurture list. Tag as "considerou mas não fechou". Continue receiving content.

---

## 6. Proposal Presentation Template (Visual)

The proposal should be a premium visual PDF/presentation (not a spreadsheet) with:

1. **Cover:** Noiva S.A. logo + couple's names + wedding date
2. **Sobre nós:** Brief about Noiva S.A. + method + numbers
3. **Seu casamento:** Summary of what they told us (from quiz + meeting)
4. **O que inclui:** Detailed package breakdown
5. **Investimento:** Price + payment options
6. **Próximos passos:** What happens after signing
7. **Depoimentos:** 2-3 relevant testimonials
8. **Contato:** WhatsApp + Instagram

---

## 7. Fathom Implementation

- All sales calls recorded via Fathom
- Transcriptions sent to Moroni for analysis
- Over time: extract patterns, refine script, identify new objections
- Goal: build a replicable sales process any trained person can follow
