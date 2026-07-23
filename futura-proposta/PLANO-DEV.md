# Futura People (ex-Conecta Futura) — Plano de Desenvolvimento do MVP

> Last updated: 2026-07-16
> Status: kickoff realizado (13/07) → backlog recebido (PDF do Tiago, 16/07) → **desenvolvimento inicia 17/07**
> Deadline dura: **31/07/2026 (sexta)** — MVP no ar antes do Rio Innovation Week (4-7/08)
> Documentos-pai: `PLANO.md` (proposta), `PLANO-MVP.md` (escopo MVP), `KICKOFF.md` (agenda/checklist)
> Fonte do backlog: `~/Downloads/Futura_People_Backlog_Kickoff.pdf` (Tiago Donicht, reunião de 13/07)
> Documento interno u4digital. Não compartilhar com cliente.

---

## 0. TL;DR

1. **O produto passa a se chamar Futura People** (item #13 do backlog do kickoff — era "Conecta Futura"). O guia de marca sintético no Dropbox (14/07) já é "FUTURA-PEOPLE".
2. Front-end **Liquid Glass v2 portado do Marpe CRM** (mesmo design system, mesma stack), retokenizado com a paleta oficial da Futura (4 azuis Pantone + fonte Silka).
3. Escopo do MVP inalterado (PLANO-MVP.md §2). Os 13 itens novos do backlog foram triados: 2 entram no MVP de graça, 8 vão para Fase 2/3, 3 não são dev.
4. Cronograma comprimido: 3 sprints entre **17/07 e 31/07** (perdemos 3 dias do plano original; o reuso do design system do Marpe compensa).
5. **futurapeople.com.br está LIVRE** (verificado via RDAP registro.br em 16/07) — registrar imediatamente.

---

## 1. VERIFICAÇÃO DO ESTADO DO PROJETO (16/07)

| Item | Estado |
|------|--------|
| Contrato | Fechado 08/07 — R$5.850 em 4× |
| Kickoff | Realizado 13/07 (deck v2 com 15 seções no ar em futura-kickoff.vercel.app) |
| Backlog do kickoff | Recebido 16/07 — PDF do Tiago com 13 itens; campos Prioridade/Status em aberto para o time preencher (**preenchidos na §8 deste doc**) |
| Brand kit | Completo no Dropbox: logos em todas as variações (RGB/CMYK, PNG/PDF/JPEG, fundo azul/branco/mono) + Guia de Uso de Marca + **Guia sintético FUTURA-PEOPLE (14/07)** |
| Acesso WordPress | Credenciais fornecidas no PDF do kickoff (wp-login do futuradobrasil.com.br). **Trocar a senha no primeiro acesso** — é fraca e circulou em PDF |
| Repositório de dev | **Não existe ainda** — nenhuma linha de código escrita; este plano destrava o início |
| Fathom | Kickoff não foi gravado (busca em 13-15/07 sem resultado) — o PDF do Tiago é o registro oficial |
| Domínios | `futurapeople.com.br` livre; `conectafutura.com.br` livre (RDAP 404 em 16/07) |

---

## 2. BRANDING — CONECTA FUTURA → FUTURA PEOPLE (item #13)

⚠️ **Atenção Moroni**: o pedido de hoje dizia "se chamará Conecta Futura", mas o item #13 do backlog do kickoff determina o contrário: *"Renomear 'Conecta Futura' → 'Futura People' em todos os locais do sistema/site"*. O próprio PDF se intitula "projeto Futura People" e o guia de marca de 14/07 é "FUTURA-PEOPLE". **Este plano segue a decisão do kickoff.** Se a Telma reverter, o rename é trivial (nome centralizado em constante/env).

### Identidade oficial (extraída do guia sintético + amostragem de pixels da logo)

| Papel | Pantone | HEX | Uso na plataforma |
|-------|---------|-----|-------------------|
| Navy (primária institucional) | 288 C | `#1D3176` | Wordmark, texto principal no tema claro, superfícies do tema escuro |
| Azul vivo (accent) | 279 C | `#0492FA` | CTAs, links, estados ativos, glow |
| Ciano | 2985 C | `#40C8F2` | Accent secundário, gradientes, orbs |
| Azul claro | 2975 C | `#9FDDFF` | Fundos suaves, badges, orbs do tema claro |

- **Tipografia**: **Silka** (atipo foundry — fonte paga; pesos Light→Black). ⚠️ Confirmar se a Telma/estúdio tem licença web. **Fallback definido: Manrope** (Google Fonts, geométrica próxima) — troca de uma linha no layout.
- **Logo**: os arquivos do Dropbox são todos "Futura do Brasil" (institucional). **Não existe logo "Futura People" ainda** → pedir ao estúdio da Telma OU compor lockup provisório (símbolo "B" + "Futura People" na tipografia da marca), validando com ela no grupo.
- **Favicon**: símbolo "B" geométrico da marca (recortar da versão PNG).

### Tema

- **Tema claro como default** — a marca da Futura é azul sobre branco, o público é candidato/RH usando celular, e transmite confiança. Base: tokens light do Liquid Glass v2 do Marpe, retokenizados.
- **Tema escuro mantido no toggle** (já vem pronto do design system; painel admin fica excelente em dark).

---

## 3. STACK E ARQUITETURA (herança direta do Marpe CRM)

| Componente | Escolha | Nota |
|-----------|---------|------|
| Framework | Astro 6 SSR + React 19 islands | Mesmo padrão do Marpe (`client:load` por view) |
| Estilo | Liquid Glass v2 — tokens CSS + classes de material em `global.css`, layout inline styles | Port direto de `marpe-crm-seguros/src/styles/global.css` com retokenização Futura |
| Banco | Supabase (PostgreSQL) — tabelas prefixadas `fp_` | RLS por papel; mesmo padrão `marpe_` |
| Auth | Supabase Auth (e-mail/senha, cookie sessions) | Papéis: admin / candidato (empresa = Fase 2, sem login no MVP) |
| E-mail | Resend | Alertas NR-1 + confirmações (free tier cobre o MVP) |
| Kanban | @dnd-kit | Reuso do padrão do `CrmBoard.tsx` do Marpe |
| Deploy | Vercel (SSR + cron) | Projeto próprio + domínio futurapeople.com.br |
| Cron | Vercel Cron diário 08:00 BRT | Gera ciclos NR-1 vencidos + dispara e-mails |
| WhatsApp | **Fora do MVP** (link copiável no painel) | Automação UazapiGO/Evolution = Fase 2 |

**Estrutura do projeto**: novo diretório `futura-people/` no monorepo, espelhando a organização do Marpe (`src/components/{modulo}/`, `src/pages/api/`, `src/lib/`, `supabase/schema.sql`).

**O que o reuso do Marpe economiza** (~2-3 dias de UI): `global.css` completo (tokens dark+light, materiais glass, animações, skeleton), `AppLayout.astro` (sidebar + orbs + grain + ClientRouter + mobile), padrão de API com `api-auth.ts`, padrão kanban com dnd-kit, padrão de modais/painéis.

---

## 4. DESIGN SYSTEM — "LIQUID GLASS FUTURA" (mapa de retokenização)

Regra de ouro preservada: **backdrop-filter só em contêineres** (nav, painéis, modais); cards usam `.card-surface` sem blur. `prefers-reduced-motion` e `prefers-reduced-transparency` mantidos.

### Tema claro (default)

| Token | Marpe (light) | Futura People |
|-------|---------------|---------------|
| `--bg-primary` | `#e8ecf4` | `#EAF2FB` (azul-gelo) |
| `--text-primary` | `#121a33` | `#1D3176` (navy da marca) |
| `--text-secondary` | `#56607e` | `#4A5A8C` |
| `--accent` | `#2563EB` | `#0271C8` (azul vivo escurecido p/ contraste AA em fundo claro) |
| `--accent-light` | `#3B82F6` | `#0492FA` |
| `--orb-a/b/c` | azuis genéricos | `rgba(4,146,250,.16)` / `rgba(64,200,242,.14)` / `rgba(159,221,255,.30)` |

### Tema escuro (toggle)

| Token | Marpe (dark) | Futura People |
|-------|--------------|---------------|
| `--bg-primary` | `#06070c` | `#050814` (preto-navy) |
| `--bg-card` | `#10121d` | `#0D1428` |
| `--accent` | `#3B82F6` | `#0492FA` |
| `--accent-light` | `#60A5FA` | `#40C8F2` |
| `--orb-a/b/c` | azul/ciano/índigo | `rgba(4,146,250,.15)` / `rgba(64,200,242,.10)` / `rgba(29,49,118,.30)` |

Semânticos (verde/vermelho/âmbar para flags NR-1 e pipeline) permanecem os do Marpe — já calibrados nos dois temas.

Fonte no layout: `Silka, Manrope, -apple-system, sans-serif` (Silka self-hosted se a licença existir; senão Manrope via Google Fonts).

---

## 5. MAPA DO PRODUTO (rotas do MVP)

### Público (sem login)
| Rota | O quê |
|------|-------|
| `/` | Landing institucional 1 seção — Futura People, proposta de valor, CTA cadastro (mostrável no evento) |
| `/cadastro` | Passo 1 com **4 campos** (nome, WhatsApp, e-mail, área) + consentimento LGPD → cria conta |
| `/login` | E-mail/senha |
| `/q/[token]` | **Questionário NR-1 público por token** (sem login — colaborador responde em 2 min no celular) + consentimento específico de dado de saúde |

### Candidato (logado)
| Rota | O quê |
|------|-------|
| `/perfil` | Progressive profiling com barra de completude (experiência, cidade, pretensão, disponibilidade, CV) |
| `/candidaturas` | "Minhas Candidaturas" — status de cada processo (**cobre a parte candidato do item #3 do backlog**) |

### Admin — Telma/Dani (logado, role admin)
| Rota | O quê |
|------|-------|
| `/admin` | Dashboard: vagas abertas/fechadas, candidatos por etapa do funil, alertas NR-1 ativos |
| `/admin/candidatos` | Lista + busca + **match por filtros com ranking** (área, cidade, experiência, pretensão) |
| `/admin/vagas` | CRUD de vagas com requisitos estruturados |
| `/admin/vagas/[id]` | **Pipeline kanban**: aberta → triagem → enviados → fechada; drag-and-drop; ao marcar "contratado" → cria recolocação e liga o ciclo NR-1; recusa exige `motivo_recusa` (**alimenta o item #5 desde o dia 1**) |
| `/admin/empresas` | Cadastro de empresas clientes + e-mail do RH (destino dos alertas NR-1) |
| `/admin/nr1` | Colaboradores monitorados, flags 🟢🟡🔴, histórico mensal, reenviar link, **copiar link p/ WhatsApp manual** |

### API (padrão Marpe, ~16 endpoints)
`/api/auth/*`, `/api/candidates`, `/api/candidates/[id]`, `/api/jobs`, `/api/jobs/[id]`, `/api/applications` (+ move de etapa), `/api/companies`, `/api/match?job=`, `/api/nr1/cycles`, `/api/nr1/respond` (público por token), `/api/nr1/alerts`, `/api/dashboard`, `/api/cron/nr1` (Vercel Cron).

### Match básico (sem IA no MVP — IA na Fase 2)
Score 0-10 explicável: área (peso 3) + cidade (2) + pretensão dentro da faixa (2) + experiência mínima (2) + disponibilidade (1). Transparente para demo no evento.

---

## 6. BANCO DE DADOS (Supabase, prefixo `fp_`)

| Tabela | Campos-chave | Nota |
|--------|--------------|------|
| `fp_profiles` | user_id, role (admin/candidato), full_name | Espelho do auth |
| `fp_candidates` | nome, whatsapp, email, área, cidade, experiência_anos, pretensão, disponibilidade, cv_url, completude %, origem | Progressive profiling |
| `fp_companies` | razão social, cidade, contato RH (nome/e-mail/fone) | Sem login no MVP |
| `fp_jobs` | título, área, cidade, faixa salarial, requisitos JSONB, status | CRUD admin |
| `fp_applications` | candidate×job, etapa, **motivo_recusa**, timestamps | Pipeline; recusa alimenta item #5 |
| `fp_placements` | candidate×company×job, data_contratação, ativo | Criado ao marcar "contratado"; **dispara NR-1** e é a base da retenção (item #6, Fase 2) |
| `fp_nr1_cycles` | placement_id, mês_ref, token único, status (pendente/enviado/respondido/vencido) | Cron mensal |
| `fp_nr1_responses` | cycle_id, respostas JSONB, score, flag (verde/amarelo/vermelho) | Dado sensível — ver RLS |
| `fp_nr1_alerts` | response_id, destinatário RH, status envio, enviado_em | Log auditável |
| `fp_consents` | user/candidate, tipo (cadastro / **nr1_saude**), texto versão, timestamp, IP | LGPD: consentimento de saúde separado |
| `fp_activities` | entidade, ação, autor, payload | Timeline/auditoria |
| `fp_settings` | chave/valor | Config (textos de alerta, instrumento NR-1) |

**RLS**: candidato lê/escreve apenas o próprio registro; admin total; `fp_nr1_responses` restrita a admin + escrita pública somente via token válido do ciclo (endpoint server-side com service role e validação de token — nunca acesso direto do cliente). Migração dos 54K (Fase 2) já contemplada: `fp_candidates.origem = 'wordpress'` + campo `wp_id`.

---

## 7. MÓDULO NR-1 v1 (o diferencial)

Fluxo conforme PLANO-MVP §5, com estas definições de implementação:

1. Marcar candidato como **contratado** no pipeline → cria `fp_placement` → agenda ciclo mensal.
2. Cron diário identifica ciclos vencendo → gera token → **e-mail automático via Resend** ao colaborador + link copiável no painel para envio manual por WhatsApp.
3. Colaborador responde em `/q/[token]` (mobile-first, sem login, consentimento específico de saúde na primeira resposta).
4. Score → flag 🟢/🟡/🔴. Flags 🟡/🔴 → **e-mail automático ao RH da empresa** (texto configurável em `fp_settings` — tom e privacidade a validar com a Telma) + destaque em `/admin/nr1` e no dashboard.
5. Histórico mensal por colaborador → base do relatório consolidado (Fase 2).

**Instrumento**: a Telma não indicou o questionário ainda → u4digital propõe default baseado nas diretrizes de fatores de risco psicossocial da NR-1 (10-12 perguntas, escala Likert 1-5) e valida no grupo. Conteúdo clínico = Telma; implementação = u4digital.

**LGPD**: dado de saúde mental é sensível (art. 5º, II / art. 11) — consentimento específico e destacado no fluxo NR-1, separado do consentimento de cadastro; alerta ao RH expõe a flag, não as respostas individuais (default conservador — validar texto com a Telma).

**Periodicidade**: mensal (decisão da reunião de 08/07). O item #4 do backlog fala em "3 meses" para o *questionário de feedback* — tratado como ciclo separado (ver §8, item 4 ⚠).

---

## 8. TRIAGEM DO BACKLOG DO KICKOFF (13 itens — Prioridade/Status preenchidos)

O PDF pede que o time preencha Prioridade e Status. Preenchido:

| # | Item | Prioridade | Status | Decisão |
|---|------|-----------|--------|---------|
| 1 | DISC com reavaliação anual | P1 — Fase 2 | Planejado | DISC já era Fase 2; reavaliação = cron anual sobre o mesmo módulo |
| 2 | Gamificação | P2 — Fase 3 | ⚠ Aguarda Telma | Sem mecânicas definidas — não estimável. MVP já entrega barra de completude do perfil (semente de gamificação) |
| 3 | Feedback/monitoramento da vaga | **P0 — MVP (parte candidato)** | Em desenvolvimento | "Minhas Candidaturas" já mostra status ao candidato. Visão da empresa contratante = Fase 2 |
| 4 | Frequência do questionário (3 meses) | P1 — Fase 2 | ⚠ Aguarda Telma | Confirmar: é o feedback pós-contratação (≠ NR-1 mensal) ou vinculado ao DISC? NR-1 segue mensal como decidido em 08/07 |
| 5 | Diagnóstico de vaga para empresa | P1 — Fase 2 | ⚠ Aguarda Telma (terminologia) | **MVP já captura `motivo_recusa` no pipeline** — o relatório da Fase 2 nasce com dados históricos |
| 6 | Retenção do colaborador | P1 — Fase 2 | Planejado | Deriva de `fp_placements` + ciclos NR-1 (estrutura já criada no MVP) |
| 7 | Triagem no WhatsApp | P1 — Fase 2 | Planejado | Automação WhatsApp já era Fase 2 (UazapiGO/Evolution) |
| 8 | Migração de candidatos de outros locais | P1 — Fase 2 | Estudo | 54K do WordPress já contratado; "outros locais" = avaliar por fonte (formato de export define viabilidade) |
| 9 | Divulgação de vagas (LinkedIn/Facebook/WhatsApp/site) | P1 — Fase 2 | Planejado | Auto-publicar no site dela = bônus já combinado. MVP ganha de graça: **botão "compartilhar vaga"** com deep links. APIs LinkedIn/Meta = estudo |
| 10 | Mentoria | P2 — Fase 3 | ⚠ Aguarda Telma | Escopo indefinido (entre candidatos? empresa-candidato?) |
| 11 | Título do tópico 4 | — (não é dev) | Aguarda Telma/Débora | Conteúdo do pitch deck |
| 12 | Antecipar Fase 3 do slide 7 | Atendido no replanejamento | Feito | "Fase 3" da proposta = gestão de vagas + match + relatório + WhatsApp. Vagas e match por filtros **já estão no MVP**; match IA + relatório PDF + WhatsApp viram **os primeiros itens da Fase 2** |
| 13 | Renomear Conecta Futura → Futura People | **P0 — MVP** | Em desenvolvimento | Plataforma nasce com o nome novo; deck do kickoff e landing atualizados no Sprint 3; docs internos sincronizados |

**Proteção de escopo**: nada dos itens P1/P2 entra antes de 31/07 ("tudo que não está na lista do MVP entra na Fase 2 — sem exceções", KICKOFF.md §6).

---

## 9. CRONOGRAMA REVISADO (16/07 → 31/07)

Perdemos 3 dias úteis do plano original (Sprint 1 começaria 13/07). Compressão viável pelo reuso do design system do Marpe.

```
JUL 16 ──── 17 ─────────── 20 ─────────────── 26 ─────────────── 31 ── 01-03/08 ── 04-07/08
     │       │              │                  │                  │        │           │
  plano    início      fim Sprint 1       fim Sprint 2       ENTREGA    buffer    Rio Innovation
  aprovado  dev       (cadastro no ar,   (operação + NR-1     MVP      hotfixes    Week (Ela Hub)
                       testadores 🚀)     demonstráveis)
```

### Sprint 1 — Fundação (qui 17 → dom 20/07)
- Registro do domínio + repo `futura-people/` + Supabase + Vercel
- Port do Liquid Glass retokenizado (global.css + AppLayout + tema claro default)
- Schema completo + RLS + auth + consentimento LGPD
- `/cadastro` (4 campos) + `/perfil` (progressive profiling) + `/candidaturas` + landing 1 seção
- Lockup provisório Futura People (validar no grupo)

**Entregável 20/07: candidato se cadastra em produção** → recrutamento dos 15-20 testadores começa (alinhado à meta de testadores até 20/07).

### Sprint 2 — Operação + NR-1 (seg 21 → sáb 26/07)
- Vagas CRUD + pipeline kanban (dnd-kit) + `motivo_recusa`
- Match por filtros com ranking + lista de candidatos admin
- Empresas + painel admin + **módulo NR-1 completo** (ciclos, token público, score/flags, e-mail Resend ao RH, cron)
- Testes internos com Telma + Dani a partir de 24/07

**Entregável 26/07: fluxo vaga → candidatos → pipeline → contratado → NR-1 rodando ponta a ponta.**

### Sprint 3 — Validação + Evento (dom 27 → sex 31/07)
- Dashboard + ajustes do feedback dos testadores
- Pitch deck (10-12 slides, HTML no padrão do deck do kickoff, marca Futura People)
- Rename sweep (deck kickoff, landing, docs) + polish visual + QA golden path
- **Entrega oficial 31/07 + walkthrough com Telma/Dani**

### Buffer (01-03/08)
Somente hotfixes. Nada novo entra.

---

## 10. RISCOS (atualizados em 16/07)

| Risco | Prob. | Impacto | Mitigação |
|-------|-------|---------|-----------|
| Início 3 dias atrasado vs. plano original | — (fato) | Alto | Reuso Marpe (~2-3 dias de UI); Sprint 1 enxuto e focado no cadastro |
| Backlog de 13 itens pressionando o MVP | Alta | Alto | Triagem da §8 é o contrato; P1/P2 só após 31/07 |
| Logo "Futura People" não existe (só "Futura do Brasil") | Média | Baixo | Lockup provisório com símbolo B + tipografia da marca; validar no grupo |
| Licença web da Silka indisponível | Média | Baixo | Fallback Manrope definido (troca de 1 linha) |
| Menos de 15 testadores até o evento | Média | Médio | Cadastro no ar já em 20/07; Telma tem ~200 contatos/semana — cobrar recrutamento no grupo sexta 18/07 |
| Instrumento NR-1 não indicado pela Telma | Média | Médio | Default u4digital (diretrizes NR-1, Likert 1-5) proposto no grupo até 18/07 |
| Dado de saúde sem base legal adequada | Baixa | Alto | Consentimento específico separado + alerta expõe flag, não respostas |
| Senha fraca do WP circulando em PDF | — (fato) | Médio | Trocar no primeiro acesso (o próprio PDF recomenda) |

---

## 11. PENDÊNCIAS PARA O GRUPO (Telma/Tiago) — enviar até sexta 18/07

1. **Nome**: confirmar por escrito "Futura People" (item #13) — e se o estúdio entrega a variação da logo com esse nome.
2. **Domínio**: `futurapeople.com.br` está livre — autorizar registro (idealmente na conta/CNPJ da Telma; u4digital executa).
3. **Fonte Silka**: existe licença web? Senão seguimos com Manrope.
4. **Instrumento NR-1**: aprovar o default proposto ou indicar o instrumento dela.
5. **Itens ⚠ do backlog**: #2 gamificação (mecânicas?), #4 frequência 3 meses (qual questionário?), #5 terminologia do diagnóstico ("agradeceu a vaga"), #10 mentoria (escopo?).
6. **Testadores**: iniciar recrutamento agora — cadastro no ar em 20/07.
7. **Título do tópico 4** (#11): Telma + Débora.

---

## 12. PRÓXIMAS AÇÕES IMEDIATAS (u4digital, 17/07)

1. Registrar `futurapeople.com.br` (após ok da Telma no grupo).
2. Criar `futura-people/` + projeto Supabase + projeto Vercel.
3. Copiar brand kit do Dropbox para `futura-people/public/brand/` (PNGs RGB + guia sintético).
4. Trocar a senha do WordPress no primeiro acesso.
5. Enviar a lista da §11 no grupo de WhatsApp.
6. Sprint 1 conforme §9.

---

## CHANGELOG

- **2026-07-22** — **NR-1 v2 (issue #18) + preparação do Checkpoint 1 (24/07)**. Tiago abriu #17 (número p/ disparos, API Oficial + UAZAPI → triado **Fase 2**, junto do WhatsApp do item 12) e #18 (questionários oficiais → **implementado**: entrada 6 itens na contratação + acompanhamento 8 itens a cada 3 meses, escala 0-10 maior=melhor, bandas média arredondada 0-4 🔴/5-7 🟡/8-10 🟢, comparação Entrada vs. 3M — queda sono/energia ≥2 pts e liderança/equipe ≤4 geram alerta ao RH com categoria do motivo, nunca as respostas; migration `migration-nr1-v2.sql` com `tipo` no ciclo e unique por placement+tipo+mês; ciclo de entrada criado no ato da contratação; cron passa a 90 dias). Também: **busca server-side de candidatos** (a base migrada de 54K não cabia no limit 2000 do front), página pública `/roteiro-testes` (roteiro guiado do checkpoint, 3 trilhas, progresso salvo no aparelho), bateria interna em `TESTES-CHECKPOINT1.md`, seed de teste (empresa RH Teste Futura + 2 vagas TESTE), logins admin individuais p/ Telma e Dani + rotação da senha do admin compartilhado (credenciais via WhatsApp, fora do repo). **Causa raiz dos deploys BLOCKED descoberta**: não era anti-abuse — a Vercel Hobby bloqueia deploy de CLI quando o **e-mail do autor do commit** (moroni@reisia.com.br) não é membro da conta (moronif.reis@gmail.com); corrigido com `git config user.email` local no repo (e-mail de aviso da Vercel de 16 e 22/07 confirma). Commit `bc184e2`.
- **2026-07-16 (noite, 2ª parte)** — **Sprint 2 CONFIRMADO EM PRODUÇÃO** após saga com a Vercel: conta hobby bloqueia builds remotos e deploys com crons (anti-abuse/verificação). Projeto Vercel original deletado (flagged); recriado e renomeado mantendo **futura-people.vercel.app**. Fluxo de deploy definitivo: build local + `--prebuilt --archive=tgz` (`npm run deploy`). Cron NR-1 migrado para GitHub Actions (workflow pronto; push pende do escopo `workflow` no gh). Verificado em prod: landing, cadastro, login admin, /admin, /admin/vagas, /admin/nr1, /q/ e endpoint do cron — tudo 200. Deployments públicos (SSO off).
- **2026-07-16 (noite)** — **Sprint 2 COMPLETO (5 dias antes do previsto)**: painel admin (dashboard KPIs, candidatos c/ busca+filtros+painel de detalhe, vagas CRUD + kanban dnd-kit 6 etapas, empresas c/ e-mail de RH), match v1 por filtros (score 0-10 explicável), **módulo NR-1 ponta a ponta** (contratado→recolocação→ciclo mensal→questionário público `/q/[token]` c/ consentimento LGPD de saúde→flag→alerta e-mail ao RH via Resend→cron Vercel diário 08h BRT). Testado localmente fluxo inteiro: match score 10, recusa exige motivo, contratação criou placement, resposta de risco alto gerou flag vermelha (score 4.2) e **alerta real entregue** no e-mail do RH de teste. E-mail ao colaborador usa `onboarding@resend.dev` até verificar domínio próprio no Resend (fallback: link copiável p/ WhatsApp — funcionando). Admin criado: `admin@futurapeople.dev`. **Já há 3 cadastros reais na base** (Moroni ×2 + Danielle de David Fontana). Commit `e19b7af`.
- **2026-07-16 (tarde)** — **Sprint 1 iniciado e fundação NO AR**: repo `u4digital/Futura-People` (main, commit raiz), projeto local `futura-people/`. Entregue: design system Liquid Glass Futura (tema claro default + dark), landing, cadastro 4 campos + LGPD, login (com guarda de instância compartilhada), perfil progressivo com completude, candidaturas, schema completo (12 tabelas `fp_` + RLS) aplicado no Supabase compartilhado, deploy produção **https://futura-people.vercel.app** com golden path testado em prod (cadastro→perfil→PATCH). Pendências: envs de *preview* na Vercel (deploys são via CLI→prod), conta Vercel sem Login Connection GitHub p/ org u4digital (deploy automático por push desativado — usar `npm run deploy`).
- **2026-07-16** — Documento criado a partir do backlog do kickoff (PDF do Tiago, 13 itens), do brand kit do Dropbox (paleta Pantone + Silka extraídas e validadas por amostragem da logo) e do design system Liquid Glass v2 do Marpe. Rename Conecta Futura → Futura People incorporado (item #13). Cronograma recomprimido para início em 17/07.
