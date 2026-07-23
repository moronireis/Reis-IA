# Bateria de Testes — Checkpoint 1 (24/07/2026)

> Última atualização: 22/07/2026
> Plataforma: https://futura-people.vercel.app · Roteiro client-facing: `/roteiro-testes`
> Participantes: Telma + Dani (admin) · testadores convidados (candidato)
> Credenciais: enviadas por WhatsApp — **nunca** neste doc nem no roteiro público.

---

## 1. O que está em teste

Escopo do MVP no ar em 22/07:

- **Candidato**: landing, cadastro (4 campos + LGPD), login, perfil progressivo (completude), acompanhamento de candidaturas.
- **Admin**: dashboard KPIs, candidatos (busca server-side na base inteira de 54K migrados + novos), empresas, vagas + kanban 6 etapas (recusa exige motivo), match v1 (score 0-10 explicável).
- **NR-1 v2 (issue #18, implementado 22/07)**: questionário de **entrada** (6 perguntas, na contratação) + **acompanhamento 3 meses** (8 perguntas), escala 0-10 (maior = melhor), bandas média arredondada 0-4 🔴 / 5-7 🟡 / 8-10 🟢, comparação Entrada vs. 3M (queda de sono/energia ≥ 2 pontos → alerta; liderança/equipe ≤ 4 → alerta), alerta ao RH por e-mail com categoria do motivo (nunca as respostas), consentimento LGPD de saúde na 1ª resposta.

## 2. Dados de teste pré-criados (22/07)

| Item | Valor |
|------|-------|
| Empresa | **RH Teste Futura** (Santa Maria) — rh_email aponta para o e-mail do Moroni (limitação Resend, ver §5) |
| Vaga 1 | Assistente Administrativo (TESTE) — Administrativo, R$1.800-2.400 |
| Vaga 2 | Vendedor Interno (TESTE) — Comercial, R$2.000-3.000 |
| Admins | telma@ · dani@ · admin@ (futurapeople.dev) — senhas via WhatsApp |

## 3. Pré-checkout (executar antes de 24/07 — Moroni)

- [x] Migration `migration-nr1-v2.sql` aplicada (coluna `tipo`, unique placement+tipo+mês)
- [x] Deploy em produção com NR-1 v2 + busca server-side + `/roteiro-testes`
- [x] Seed empresa/vagas TESTE + logins admin individuais + rotação do admin compartilhado
- [x] E2E do golden path NR-1 v2 em produção — **22/22 passos OK em 22/07** (inclui alerta real entregue por e-mail; dados E2E limpos ao final)
- [x] Cron diário no ar (GitHub Actions, 08h BRT) — pushado 22/07 e validado com run manual `success`
- [ ] Enviar credenciais + link do roteiro no grupo do WhatsApp

## 4. Bateria (espelho técnico do /roteiro-testes)

### Trilha A — Candidato (~10 min)

| # | Ação | Esperado | Verificação técnica |
|---|------|----------|--------------------|
| A1 | Abrir a landing | Marca Futura People, tema claro, sem erro no console | 200 em `/` |
| A2 | Cadastro 4 campos + LGPD | Conta criada, cai em `/perfil?novo=1` logado | `fp_profiles` role candidato + `fp_consents` tipo cadastro |
| A3 | Completar perfil | Completude sobe e persiste | `fp_candidates.completude` atualizado |
| A4 | Minhas candidaturas | Estado vazio explicativo | — |
| A5 | Logout + login | Sessão volta com dados salvos | cookies sb-* renovados |
| A6 | Recadastro mesmo e-mail | Erro amigável, sem conta duplicada | 4xx em `/api/auth/register` |
| A7 | Mobile 375px | Sem overflow/corte | — |
| A8 | Após B7: candidatura visível | Vaga + etapa atual | `fp_applications` do candidato |

### Trilha B — Admin (~20 min)

| # | Ação | Esperado | Verificação técnica |
|---|------|----------|--------------------|
| B1 | Login admin | Dashboard KPIs | `/api/admin/dashboard` 200 |
| B2 | Buscar candidato ANTIGO (base migrada) | Encontra na base inteira, painel mostra currículo legado | busca server-side `?q=` (fix 22/07 — antes só via os 2000 recentes) |
| B3 | Buscar candidato da Trilha A | Aparece com completude | — |
| B4 | Empresas: conferir RH Teste Futura + criar nova | CRUD ok, rh_email salvo | `fp_companies` |
| B5 | Criar vaga nova | Status aberta na lista | `fp_jobs` |
| B6 | Vaga TESTE → match | Ranking 0-10 com critérios (área 4 / cidade 3 / pretensão 2 / disponibilidade 1) | — |
| B7 | Adicionar candidato ao pipeline | Coluna Inscrito | `fp_applications` etapa inscrito |
| B8 | Arrastar Triagem→Enviado→Entrevista | Persiste ao recarregar | PATCH `/api/admin/applications/[id]` |
| B9 | Arrastar para Recusado | **Exige motivo** antes de concluir | `motivo_recusa` not null |
| B10 | Arrastar para Contratado | Vira recolocação ativa + ciclo de ENTRADA pendente criado na hora | `fp_placements` + `fp_nr1_cycles` tipo entrada (hook 22/07) |
| B11 | Ver como candidato | Etapa atualizada em Minhas candidaturas | — |

### Trilha C — NR-1 v2 (~10 min)

| # | Ação | Esperado | Verificação técnica |
|---|------|----------|--------------------|
| C1 | Painel NR-1 | Contratado listado, entrada pendente | `/api/admin/nr1` |
| C2 | "Enviar questionário de entrada" | Link copiado, ciclo enviado; e-mail se candidato = inbox do Moroni | `fp_nr1_cycles` status enviado |
| C3 | Responder entrada com notas 7-10 + consent LGPD | Agradecimento; painel: Entrada 🟢 com média | `fp_nr1_responses` versao nr1-v2, `fp_consents` nr1_saude |
| C4 | "Enviar acompanhamento (3 meses)" | Novo link, questionário de 8 perguntas | ciclo tipo acompanhamento no mesmo mês (unique inclui tipo) |
| C5 | Responder com Liderança ≤ 3 e Sono ≤ 3 | Detecta queda sono/energia vs. entrada + sinal liderança | `motivos` = [relacoes_lideranca, queda_sono_energia] |
| C6 | Lista "Alertas enviados ao RH" | Alerta com motivo por categoria, destino = rh_email da empresa | `fp_nr1_alerts` status enviado (RH Teste Futura → inbox Moroni) |
| C7 | Card do colaborador | "Entrada X → 3 meses Y" (Y em vermelho se caiu), escala 0-10 | — |
| C8 | Reabrir link já respondido | "Já foi respondido", sem duplicar | 409 no respond |

### Edge cases (qualquer trilha)

- E-mail duplicado no cadastro (A6) · token inexistente em `/q/xxx` → "Link inválido" · tema claro/escuro · acentos e nomes compostos ("João D'Ávila") · campos obrigatórios vazios → mensagens claras · mobile 375px em todas as telas.

## 5. Limitações conhecidas (avisar no checkout — NÃO são bugs)

1. **E-mail restrito**: até registrar `futurapeople.com.br` e verificar no Resend, e-mails (convite ao colaborador + alerta ao RH) só entregam no inbox do Moroni. Por isso a RH Teste Futura aponta para ele; o fallback oficial é o **link copiado → WhatsApp**. Decisão de registro do domínio fica para o checkout.
2. **Cron trimestral**: a simulação manual (botão) já demonstra o fluxo; o agendamento automático (90 dias) entra no ar assim que o workflow do GitHub Actions for pushado (pendência de escopo do token).
3. **Disparos WhatsApp em massa** (issue #17): Fase 2, junto do item 12 do kickoff.
4. Busca de candidatos retorna até 300 resultados por termo (base tem 54K) — refinar o termo.

## 6. Registro de bugs

Formato no grupo do WhatsApp: `[PASSO] o que esperava · o que aconteceu · print`.
Consolidação: vira lista priorizada no Sprint 3 (feedback dos testadores já estava previsto no plano).

---

## Changelog

- **22/07/2026** — Documento criado. NR-1 v2 (issue #18) implementado e coberto pela Trilha C; busca server-side (B2) e roteiro público `/roteiro-testes` incluídos.
