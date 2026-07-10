# Conecta Futura — Planejamento do MVP (30 dias)

> Last updated: 2026-07-09
> Status: Aguardando pagamento (link até 10/07) → kickoff → desenvolvimento
> Deadline dura: **01/08/2026** (MVP no ar antes do Rio Innovation Week, 4-7/08)
> Documento-pai: `PLANO.md` (Seção 14 — escopo fechado em 08/07/2026)
> Documento interno u4digital. Não compartilhar com cliente.

---

## 1. OBJETIVO DO MVP

Entregar a "Ferrari que já anda" em ~3 semanas de desenvolvimento:

1. **Plataforma funcionando em produção** (Conecta Futura) que a Futura já usa na operação real de recrutamento.
2. **15-20 usuários reais testando** (candidatos + Thelma/Dani) antes de 04/08, com feedback coletado de forma estruturada.
3. **Thelma apta a se apresentar como startup** no Rio Innovation Week (Ela Hub), com pitch deck em mãos.
4. **Módulo NR-1 v1 demonstrável** — o diferencial que nenhum concorrente tem.

O que o MVP NÃO é: a plataforma completa dos 12 entregáveis. O restante entra na Fase 2 (agosto), dentro do mesmo contrato.

---

## 2. ESCOPO DO MVP — O QUE ENTRA (a Ferrari que anda)

| # | Entregável | Descrição mínima viável | Origem no PLANO.md |
|---|-----------|------------------------|--------------------|
| 1 | **Portal do candidato** | Cadastro simplificado (máx. 4 campos no passo 1), progressive profiling, perfil, "Minhas Candidaturas", mobile-first | M1 |
| 2 | **Banco de dados Supabase** | Schema completo (candidatos, vagas, empresas, processos, respostas NR-1), RLS, consentimento LGPD no cadastro | M2 |
| 3 | **Gestão de vagas** | CRUD de vagas com requisitos estruturados, pipeline de status (aberta → triagem → enviados → fechada) | M8 |
| 4 | **Match básico** | Filtro/ranking por área, cidade, experiência e pretensão salarial (match IA completo fica p/ Fase 2) | M8 parcial |
| 5 | **Módulo NR-1 v1** ⭐ | Cadastro de colaborador recolocado → questionário mensal de risco psicossocial (link por e-mail/WhatsApp manual) → escala de risco → flag verde/amarelo/vermelho → alerta visível no painel + e-mail ao RH da empresa | NOVO (diferencial) |
| 6 | **Painel admin Futura** | Visão Thelma/Dani: candidatos, vagas, pipeline, alertas NR-1 | M7 parcial |
| 7 | **Dashboard básico** | Vagas abertas/fechadas, candidatos por etapa do funil, alertas NR-1 ativos | M7 parcial |
| 8 | **Identidade Conecta Futura** | Logo provisório, cores, landing page institucional de 1 seção (para mostrar no evento) | NOVO |
| 9 | **Pitch deck** | 10-12 slides: problema, solução, diferencial NR-1, mercado, tração (usuários teste + banco 54K), modelo de receita (assinatura anual ref. R$5K), roadmap, ask | NOVO (compromisso da reunião) |
| 10 | **Deploy produção** | Vercel + domínio (sugestão: conectafutura.com.br — verificar disponibilidade no kickoff) | — |

### Critérios de aceite do MVP

- [ ] Candidato consegue se cadastrar pelo celular em < 2 minutos
- [ ] Thelma/Dani conseguem abrir vaga, filtrar candidatos e mover pipeline sem ajuda
- [ ] Questionário NR-1 respondível pelo colaborador e flag aparecendo no painel
- [ ] Alerta NR-1 chegando por e-mail para um RH de teste
- [ ] 15-20 usuários reais cadastrados e com feedback registrado
- [ ] Pitch deck aprovado pela Thelma antes de 01/08

---

## 3. FORA DO MVP — FASE 2 (agosto, mesmo contrato)

| Entregável | Motivo do adiamento |
|-----------|--------------------|
| Migração dos 54.226 candidatos (WordPress → Supabase) | Depende da GetCommerce/limpeza de dados; não bloqueia validação. MVP roda com dados novos + amostra importada |
| Background check automatizado (CPF, criminal, trabalhista) | Contratação/negociação de APIs leva tempo; não é o diferencial do pitch |
| DISC completo + relatório IA | Entregável de ticket, não de validação |
| Relatório consolidado PDF para cliente | Depende de DISC + background check |
| Automação WhatsApp (lembretes, confirmações) | MVP usa e-mail + WhatsApp manual; Evolution API na Fase 2 |
| Match IA completo (score 0-100 candidato × vaga) | MVP usa match por filtros; IA na Fase 2 |
| Templates de e-mail (5) + reativação de inativos | Fase 2 |
| Treinamento formal + documentação + suporte 30 dias | Inicia na entrega da Fase 2 (walkthrough informal já acontece no MVP) |

---

## 4. CRONOGRAMA — 3 SPRINTS + BUFFER

```
JUL  9 ──── 10 ──── 13 ─────────── 19 ─────────── 26 ──────── 01/AGO ── 04-07/AGO
      │      │       │              │              │              │         │
   hoje   pagamento  KICKOFF     fim Sprint 1   fim Sprint 2  ENTREGA    Rio Innovation
          (link 4×)  + materiais                              MVP        Week (Ela Hub)
```

### Sprint 1 — Fundação (13-19/07)

- Setup: repo, Vercel, Supabase, domínio, auth
- Schema do banco + RLS + consentimento LGPD
- Portal do candidato v1 (cadastro 4 campos + perfil + progressive profiling)
- Identidade visual provisória Conecta Futura (logo + cores + landing 1 seção)

**Entregável da semana**: candidato consegue se cadastrar em produção.

### Sprint 2 — Operação + NR-1 (20-26/07)

- Gestão de vagas (CRUD + pipeline)
- Match básico (filtros + ranking)
- Painel admin Futura
- **Módulo NR-1 v1**: questionário + escala de risco + flags + alerta e-mail
- Início dos testes internos (Thelma + Dani + primeiros candidatos reais)

**Entregável da semana**: fluxo vaga → candidatos → pipeline rodando + NR-1 demonstrável.

### Sprint 3 — Validação + Evento (27/07-01/08)

- Dashboard básico
- Ajustes do feedback dos testes (meta: 15-20 usuários)
- Pitch deck (10-12 slides) + revisão com a Thelma
- Polish visual + QA (golden path completo)
- Entrega oficial + walkthrough com Thelma/Dani

**Entregável da semana**: MVP entregue, Thelma preparada para o evento.

### Buffer (02-03/08)

Fim de semana antes do evento — apenas hotfixes. Nada novo entra.

---

## 5. MÓDULO NR-1 — ESPECIFICAÇÃO v1

O coração do diferencial. Fluxo mínimo:

```
Colaborador recolocado (marcado como "contratado" numa vaga)
   │
   ├─ Plataforma agenda ciclo mensal de questionário
   │
   ├─ Mês 1, 2, 3... → envia link do questionário (e-mail automático;
   │                    WhatsApp manual via link copiável no painel)
   │
   ├─ Colaborador responde escala de risco psicossocial
   │  (instrumento baseado nas diretrizes da NR-1 — validar
   │   referência com a Thelma no kickoff)
   │
   ├─ Score calculado → flag: 🟢 verde │ 🟡 atenção │ 🔴 alerta
   │
   ├─ 🔴/🟡 → notificação automática por e-mail ao RH da empresa
   │          + destaque no painel da Futura
   │
   └─ Histórico mensal por colaborador → base do relatório
      NR-1 da empresa (relatório consolidado = Fase 2)
```

Decisões a validar no kickoff:
1. Qual instrumento/questionário a Thelma quer usar (ela é a expert de RH — u4digital implementa, não define o conteúdo clínico)
2. Periodicidade (mensal confirmado na reunião)
3. Texto dos alertas ao RH (tom, o que expor, privacidade do colaborador — atenção LGPD: dado de saúde é sensível)

---

## 6. RISCOS ESPECÍFICOS DO MVP

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|---------|-----------|
| Pagamento atrasar além de sexta 10/07 | Baixa | Alto (come o prazo) | Link enviado hoje/amanhã; kickoff só agenda após confirmação |
| Materiais da Thelma atrasarem (logo, questionário NR-1) | Média | Médio | Kickoff com checklist fechado; identidade provisória não depende dela |
| Escopo inflar durante os sprints ("já que está fazendo…") | Alta | Alto | Este documento é o contrato do MVP; tudo novo → Fase 2 |
| Menos de 15 usuários teste até 01/08 | Média | Médio | Thelma tem 200+ contatos/semana; recrutar testadores na 1ª semana |
| Questionário NR-1 sem instrumento definido | Média | Médio | Propor instrumento padrão baseado nas diretrizes NR-1 no kickoff como default |
| Dados sensíveis (saúde mental) sem base legal adequada | Baixa | Alto | Consentimento específico no fluxo NR-1, separado do consentimento de cadastro |

---

## 7. FASE 2 — ROADMAP PÓS-EVENTO (04-31/08)

Ordem sugerida (revisar com feedback do evento):

1. Migração dos 54K candidatos (destrava o argumento de tração para investidores)
2. Automação WhatsApp + templates de e-mail (reduz operação manual)
3. Background check (CPF + criminal + trabalhista)
4. DISC + match IA com score
5. Relatório consolidado PDF (destrava aumento de ticket)
6. Treinamento formal + documentação + suporte 30 dias

Fase 5-6 (futuro, fora deste contrato): verticais segmentadas — indústria alimentícia e/ou militar (Recruta Brasil, 1.200 candidatos do Exército).

---

## CHANGELOG

- **2026-07-09** — Documento criado a partir da reunião de fechamento de 08/07/2026.
