# Plano de Atualizações — RHF Talentos (Backlog Checkpoint 04/07/2026)

> Fonte: `~/Downloads/Backlog — RHF Talentos (Checkpoint 04072026).pdf`
> Elaborado em: 08/07/2026 — **FASE 1 IMPLANTADA E DEPLOYADA EM 08/07/2026**
> Produção: `rhf-talentos-plataforma.vercel.app` — deploy SEMPRE via `vercel --prod` + atualização do alias

## STATUS FASE 1 (08/07/2026)

| Item | Status |
|------|--------|
| 1.1 Remover módulo Conversas (chat.html, messages.js, webhook/meta.js, navs, vercel.json) | ✅ FEITO — 12→10 funções |
| 1.2 Spike ChatGuru | ✅ FEITO — descobriu `message_file_send` (file_url + caption). `file_send`/`chat_list`/`chat_read`/`chat_info` NÃO existem na API. Coleta da Fase 2 será via webhook, não polling. Escritas existem: `chat_update_custom_fields`, `note_add`, `chat_update_context`, `chat_update_name` |
| 1.3 Upload PDF Pandapé + import com IA | ✅ CÓDIGO PRONTO — card na aba Gerador, pdf.js client-side, `action=import-pdf` (Haiku + structured outputs), grava `raw_data` no formato Pandapé (geração consome sem mudanças). **PENDENTE: `ANTHROPIC_API_KEY` com créditos no Vercel** (a chave local existe mas a conta está sem créditos) |
| 1.4 Enviar arquivo PDF no ChatGuru | ✅ FEITO — PDF client-side (html2pdf via iframe do cv-print) → bucket `rhf-cvs` (Supabase Storage, público) → `message_file_send` com caption. Testado E2E até a entrega (número fake → "Chat não existe", parâmetros aceitos). Fallback texto preservado (`sent_status='chatguru_texto'`) |
| Migration 006 (sent_status/sent_at/sent_file_url/presented_at/client_response_at/client_company/vacancy_ref/created_by_name + vacancies.updated_at) | ✅ APLICADA no banco |
| Rastreio de recrutador (created_by/created_by_name no generate) | ✅ FEITO — front envia RHF_USER |
| Deploy produção + alias | ✅ dpl_9MRtJnJe8eiTMwDndmtpTXADn6bk — smoke tests todos verdes |

**Pendências para fechar a Fase 1:**
1. `ANTHROPIC_API_KEY` com créditos → `npx vercel env add ANTHROPIC_API_KEY production` (único bloqueio do import-pdf)
2. E2E com o Rodrigo: importar 3–5 PDFs reais do Pandapé + enviar um CV em PDF para um chat real do ChatGuru
3. Confirmar com o Rodrigo que o arquivo enviado aparece no módulo Arquivos do ChatGuru para organização por tags
4. Commit do código (working tree com as mudanças, aguardando ordem)

---

## 1. Estado atual (o que o plano precisa respeitar)

**Limite de 12 funções Vercel Hobby — hoje estamos em 12/12:**

| # | Função | Situação pós-plano |
|---|--------|--------------------|
| 1 | `api/ai-log.js` | mantém |
| 2 | `api/auth.js` | mantém |
| 3 | `api/contacts.js` | mantém (usada pela aba Candidatos do mvp) |
| 4 | `api/cv.js` | mantém + ganha `action=import-pdf` |
| 5 | `api/messages.js` | **REMOVER** (morta — nenhuma página referencia; chat.html usava `/api/whatsapp?action=messages`) |
| 6 | `api/vacancies.js` | mantém |
| 7 | `api/whatsapp.js` | **REESCREVER** → hub ChatGuru (groups/tags/summary) |
| 8 | `api/webhook/chatguru.js` | mantém (coletor de dados p/ CV e métricas) |
| 9 | `api/webhook/meta.js` | **REMOVER** (fonte das "conversas via Meta direto" — item Alta 1) |
| 10 | `api/webhook/pandape.js` | mantém |
| 11 | `api/pandape/matches.js` | mantém |
| 12 | `api/pandape/sync.js` | mantém |
| +1 | `api/metrics.js` (novo, Fase 2) | agregações do dashboard |

**Saldo final: 11/12 funções (1 slot de reserva para Kanban/Pandapé futuro).**

Pontos técnicos relevantes:
- Claude Haiku já está integrado (`api/whatsapp.js` action=suggest, `ANTHROPIC_API_KEY` em produção) → reutilizar o padrão para extração de PDF e geração de resumo.
- O envio atual de CV pro ChatGuru manda TEXTO formatado (`message_send`); `file_send` para chat retornou "ação inválida" no teste de junho.
- `generated_cvs.vacancy_id` é `bigint` (ID Pandapé) e NÃO referencia a tabela interna `vacancies` (uuid). O join real hoje é por `vacancy_name` texto — corrigir na Fase 2.
- `generated_cvs` não tem `created_by` → métrica "currículos por recrutador" exige nova coluna (quanto antes ela existir, antes o histórico acumula).
- `rhf_messages` (alimentada pelo webhook ChatGuru) é insumo do gerador de CV ("dados da conversa") — o que sai é a UI de conversas, NÃO o pipeline de dados.

---

## 2. FASE 1 — 🔴 Prioridade Alta (destravar uso imediato do Rodrigo)

### 1.1 Remover módulo de Conversas
O que sai:
- `chat.html` (página inteira) + rewrite `/chat` no `vercel.json`
- Item "Conversas" da sidebar do `mvp.html` (~linha 552)
- Card "Conversas WhatsApp" do dashboard (substituir por métrica real, ex.: "CVs esta semana")
- `api/messages.js` (morta) e `api/webhook/meta.js` (Meta direto)
- Limpeza posterior de env vars Meta (`META_VERIFY_TOKEN` etc.) — devops, sem pressa

O que FICA (não confundir):
- `api/webhook/chatguru.js` + tabela `rhf_messages` — continuam alimentando o resumo de conversa usado na geração do CV e serão os coletores das métricas da Fase 2.

Ganho: libera 2 slots de função. Fazer PRIMEIRO.

### 1.2 Spike técnico — API do repositório de Arquivos do ChatGuru (bloqueia 1.4)
Pergunta a responder com a conta real (s18.chatguru.app / Ras Consultoria):
1. A API expõe upload para o módulo **Arquivos** (repositório) com tags? (a doc pública conhecida cobre `message_send`, `chat_add`, `note_add`, `dialog_execute` — repositório de arquivos não é documentado)
2. Retestar `file_send` com variações de parâmetros (o erro de junho pode ter sido formato, não ausência da ação)
3. Como as tags de arquivo aparecem/são graváveis via API

Fallbacks em ordem de preferência se a API não expuser o repositório:
- a) Enviar o PDF como documento para um chat/grupo "Repositório RHF" dedicado (arquivos enviados pela plataforma aparecem no módulo de mídias)
- b) Ticket com o suporte ChatGuru pedindo endpoint de arquivos
- c) Manter texto formatado + PDF por e-mail enquanto isso

### 1.3 Upload manual de currículo (PDF do Pandapé)
Fluxo: Rodrigo baixa o PDF pré-formatado do Pandapé → sobe na aba "Gerador de Currículo" → sistema combina dados do PDF + conversa do ChatGuru → CV padrão RHF.

Implementação:
- **Front (`mvp.html`, aba `tab-curriculo`)**: novo card `cv-source` "PDF do Pandapé (upload manual)" ao lado de "Dados do Pandapé" e "Conversa do ChatGuru". Extração de texto **client-side com pdf.js** (CDN, mesmo espírito do processamento de foto no browser — não gasta função nem payload gigante).
- **Back (`api/cv.js`)**: novo `action=import-pdf` → recebe `{ pdf_text, candidate_phone?, vacancy_name? }` → Claude Haiku estrutura o texto em campos (nome, contato, experiências, formação, competências, idiomas) → upsert em `candidates` → segue o `handleGenerate` existente mesclando `rhf_messages` do telefone.
- Validar com 3–5 PDFs reais do Rodrigo antes de considerar pronto.
- `model_used` passa a registrar `haiku-import-pdf` para rastreio.

### 1.4 Botão "Enviar no Chat" → "Enviar para arquivos do ChatGuru"
- Gerar **PDF real** do CV client-side a partir do layout do `cv-print.html` (html2pdf.js) → base64 → `api/cv.js action=upload-chatguru` (a assinatura já prevê `file_base64`/`file_name`, hoje ignorados).
- Destino conforme resultado do spike 1.2 (repositório com tags OU fallback a).
- Nomenclatura do arquivo: `CV - {candidato} - {processo}.pdf` (casa com a organização por tags do Rodrigo).
- Registrar o envio em `generated_cvs` (novas colunas `sent_status`, `sent_at` — ver migration).
- O modal de seleção de conversa pode continuar existindo como opção secundária ("enviar texto no chat") se o Rodrigo quiser manter.

**Entrega Fase 1: deploy `vercel --prod` + E2E com o Rodrigo (upload PDF real → CV → arquivo no ChatGuru).**

---

## 3. FASE 2 — 🟡 Prioridade Média (base para dashboard e métricas)

### 2.1 Migration 006 (fazer no início da fase — histórico começa a acumular)
```sql
-- generated_cvs: rastreio de recrutador e ciclo de envio/apresentação
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS created_by_id uuid;
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS created_by_name text;
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS vacancy_ref uuid REFERENCES vacancies(id);
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS client_company text;
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS sent_status text DEFAULT 'rascunho';  -- rascunho|email|chatguru_arquivo|apresentado
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS sent_at timestamptz;
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS presented_at timestamptz;              -- data de apresentação (base do SLA)
ALTER TABLE generated_cvs ADD COLUMN IF NOT EXISTS client_response_at timestamptz;        -- resposta do cliente (fecha o SLA)

-- vacancies: última atualização por processo
ALTER TABLE vacancies ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- grupos WhatsApp sincronizados do ChatGuru (número do Rodrigo, sem 1:1)
CREATE TABLE IF NOT EXISTS chatguru_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_number text UNIQUE NOT NULL,
  name text,
  processo_numero text,
  processo_nome text,
  empresa text,
  contato text,
  status text,
  tags jsonb DEFAULT '[]',
  raw jsonb,
  last_synced_at timestamptz DEFAULT now()
);
```
Aplicar via `scripts/apply-migration.js` (hook de SQL bloqueia DDL inline — lição de 01/07).

### 2.2 Sincronizar grupos do WhatsApp (sem conversas 1:1)
- Reescrever `api/whatsapp.js` como hub ChatGuru: `action=sync-groups` (chat_list → filtra grupos → upsert `chatguru_groups` com número/nome do processo, empresa, contato, status e tags), `action=list-groups`, `action=group-tags`.
- Doc do ChatGuru já foi consultada pelo time na reunião ("tranquila de integrar").
- Disparo: botão "Sincronizar" na UI + cron diário do Vercel (`vercel.json` → `crons`, Hobby permite 1 job/dia).

### 2.3 Leitura de tags (conversas + módulo arquivos)
- Tags de conversa/grupo: entram no sync 2.2 (`chat_info`/`chat_list`).
- Tags de arquivo: depende do resultado do spike 1.2 — se houver API, coletar junto; senão, o SLA se apoia nas tags de grupo + `presented_at` registrado pela plataforma.
- Convenção de tags a ALINHAR COM O RODRIGO: qual tag significa "cliente respondeu" / "aprovado" / "reprovado" — sem essa disciplina o SLA automático não fecha.

### 2.4 Botão "Gerar resumo e enviar para grupo do WhatsApp"
Substitui o fluxo manual planilha → resumo → grupo do cliente.
- Na tela do CV gerado (e na aba Candidatos): botão "Resumo p/ grupo".
- Gera resumo do candidato via Claude (mesmo padrão do `suggest`): nome, vaga/processo, empresa, pontos fortes, pretensão, disponibilidade.
- Modal com preview EDITÁVEL do resumo + seletor de grupo (de `chatguru_groups`).
- Envio via `message_send` para o `chat_number` do grupo → grava `presented_at` + `sent_status='apresentado'` + `client_company` no CV → é isso que alimenta o SLA.

### 2.5 Dashboard de acompanhamento (`api/metrics.js` + rework do dashboard)
Nova função `api/metrics.js` (`action=dashboard`) com agregações:
- **Currículos por recrutador** (`created_by_name`, período selecionável)
- **Currículos por empresa/processo** (`client_company` / `vacancy_ref`→`vacancies`)
- **Funil de envio**: gerados → enviados (arquivo/email) → apresentados → respondidos
- **SLA de resposta do cliente**: média `client_response_at - presented_at` (referência atual do Rodrigo: 13,5 dias, calculado à mão)
- **Última atualização por processo**: `vacancies.updated_at` + último CV/tag do processo → flag "atual" x "desatualizado" (> X dias)
Front: substituir os painéis estáticos do `tab-dashboard` pelos dados reais (o gráfico de 8 semanas real já existe — mantém).

**Meta da Fase 2: aposentar a planilha/pivot do Rodrigo.**

---

## 4. FASE 3 — 🔵 Futuro / dependência externa (não bloqueia nada)

1. **API Pandapé direta** — em negociação (custo x patrocínio da matriz). `lib/pandape.js` (OAuth2) está pronto desde junho; só faltam `PANDAPE_CLIENT_ID`/`SECRET`. Enquanto isso o fluxo é o upload manual de PDF (Fase 1.3) — que continua útil mesmo com a API depois.
2. **Kanban de status dos currículos enviados** — colunas a partir de `sent_status` + tags coletadas na Fase 2. Usa o slot de função reservado (ou action no `metrics.js`). Só faz sentido DEPOIS que os coletores de tags estiverem rodando.

---

## 5. Riscos e pontos de atenção

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| API do ChatGuru não expõe o repositório de Arquivos | Alta 1.4 muda de desenho | Spike ANTES de codar; fallback grupo-repositório; ticket suporte |
| Variação de layout no PDF do Pandapé | Extração falha | Extração via Claude (robusta) + validação com PDFs reais + preview editável antes de gerar |
| SLA depende de tag de "resposta do cliente" | Métrica não fecha sozinha | Alinhar convenção de tags com o Rodrigo na entrega da Fase 1 |
| Grupos sem padrão de nome (processo/empresa) | Sync com campos vazios | Parser tolerante + edição manual dos campos na UI |
| Limite 12 funções | Bloqueia endpoint novo | Remoções da Fase 1 primeiro (12→10); plano fecha em 11/12 |
| Deploy em preview perde env vars | Plataforma "quebra" | SEMPRE `vercel --prod` + alias (lição 01/07) |

## 6. Ordem de execução e estimativa

| Passo | Item | Esforço |
|-------|------|---------|
| 1 | Remover conversas (chat.html, messages.js, webhook/meta.js, nav, vercel.json) | 0,5 dia |
| 2 | Spike ChatGuru Arquivos | 0,5 dia |
| 3 | Upload PDF + import-pdf com IA | 1 dia |
| 4 | Envio p/ arquivos ChatGuru (PDF real) | 0,5–1 dia (conforme spike) |
| — | **Deploy Fase 1 + E2E com Rodrigo** | — |
| 5 | Migration 006 + created_by no generate | 0,5 dia |
| 6 | Hub ChatGuru: sync grupos + tags | 1 dia |
| 7 | Resumo → grupo (IA + modal + presented_at) | 1 dia |
| 8 | metrics.js + dashboard real | 1–1,5 dia |
| — | **Deploy Fase 2 + validação da planilha aposentada** | — |

Total: ~3 dias úteis (Fase 1) + ~4 dias úteis (Fase 2).
