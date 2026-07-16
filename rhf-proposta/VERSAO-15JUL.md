# RHF Talentos — Versão 15/jul/2026

> Snapshot oficial do estado do projeto em 15/07/2026, salvo em https://github.com/u4digital/RHF-Talentos (tag `versao-15jul`).
> Credenciais e acessos: ver `CREDENCIAIS.md` (confidencial). Plano detalhado do backlog: `PLANO-BACKLOG-04072026.md`.

## O projeto

Plataforma de recrutamento com IA para a **RHF Talentos** (Rodrigo Silva, franquia Vale dos Sinos — 9 anos de operação). Projeto piloto da **u4digital** (Tiago Donicht, Moroni Reis, Gustavo). Modelo: R$5K setup + R$497/mês.

**Produção:** https://rhf-talentos-plataforma.vercel.app

## O que a plataforma faz hoje (fluxo principal)

1. **Importar PDF do Pandapé** (aba Gerador) — extração client-side (pdf.js) + estruturação via OpenAI `gpt-4o-mini` (processo, etapa, vaga, cidade, pretensão em faixa, experiências/educação/skills). O PDF original (≤3MB) é arquivado no Storage.
2. **Gerar currículo padrão RHF** — template + reescrita IA (resumo e bullets por experiência, estilo calibrado em pares reais bruto→pronto do cliente; fallback template se a IA falhar). Foto opcional com compressão client-side.
3. **Entregar no ChatGuru** — botão "Preparar arquivo": gera PDF A4 (`Nome - Vaga - Cidade-UF.pdf`), sobe para o Storage (backup) e **sobe automaticamente no módulo Arquivos do ChatGuru** com a tag do nº do processo (login de sessão via `lib/chatguru-panel.js`). Se o ChatGuru falhar, a fila mostra botão Baixar para subida manual — nunca trava.
4. **Funil de Vagas** — board com 5 etapas (Triagem → CV gerado → No ChatGuru → Apresentado → Respondido) derivadas de candidates + generated_cvs, badge da etapa Pandapé, dias na etapa, filtro por vaga. Recarrega a cada visita + botão Atualizar.
5. **Apresentação e SLA** — mark-delivered / apresentado / cliente respondeu (fecha SLA); painel "Acompanhamento de apresentações" no Dashboard (funil, SLA médio vs 13,5d, por recrutador/empresa, processos desatualizados).
6. **Vagas** — cadastro manual, "Colar texto da vaga" (IA pré-preenche), descrição + roteiro de divulgação WhatsApp gerados por template.
7. **E-mail** (Resend) e **cv-print** (A4 para impressão/PDF).
8. **Configurações** (admin): perfis de acesso (restrito a usuários RHF), integrações, sincronização.

## Stack e arquitetura

| Camada | Tecnologia |
|---|---|
| Front | HTML/CSS/JS vanilla (mvp.html, configuracoes.html, admin.html, login.html, cv-print.html), visual Liquid Glass laranja #F26522 |
| Back | Vercel Serverless Functions — **11 de 12** do limite Hobby |
| Banco | Supabase self-hosted (Cloudfy) — **instância COMPARTILHADA** com outras plataformas u4digital/REIS IA |
| IA | OpenAI `gpt-4o-mini` (conta u4digital "U4D Project") — import de PDF + reescrita de CV (~R$0,002/CV) |
| WhatsApp | ChatGuru — API s18 (mensagens) + painel via cookie de sessão (módulo Arquivos) |
| E-mail | Resend (noreply@moronireis.com.br) |

**APIs (11 funções):** `auth.js` (login/verify/create/update/disable/delete — restrito a perfis RHF), `cv.js` (generate/query/update/import-pdf/prepare-file/mark-delivered/mark-response/send-email), `contacts.js`, `vacancies.js`, `whatsapp.js` (grupos + resumo), `metrics.js` (dashboard de apresentações), `ai-log.js`, `webhook/chatguru.js`, `webhook/pandape.js`, `pandape/sync.js`, `pandape/matches.js`.

**Tabelas RHF no banco:** `user_profiles`, `candidates`, `generated_cvs`, `vacancies`, `chatguru_groups`, `rhf_messages`, `ai_suggestion_log` (+ `cvs` legada, sem uso). Migrations 001–008 em `migrations/`.

**Storage:** bucket público `rhf-cvs` (CVs prontos em `prontos/`, PDFs originais em `pandape/`).

**Usuários ativos (15/07):** `admin@rhftalentos.com.br` (admin) e `valedosinos@rhf.com.br` (Daniela Pinto, recrutadora — criada pelo cliente em 15/07).

## Linha do tempo das entregas

| Data | Entrega |
|---|---|
| 29/06 | Auth + painel admin + perfis; deploy Vercel |
| 01/07 | Auditoria completa; migration generated_cvs; proteção da instância compartilhada no login; CV 100% (salvar obrigatório, edição persistida); Smart Job Opening (vagas) |
| 08/07 | Fase 1: módulo Conversas removido (10 funções); envio de arquivo real descoberto (`message_file_send`); PDF via html2pdf + Storage; import-pdf |
| 09/07 | IA trocada para OpenAI (conta U4D); inputs manuais Pandapé (planilha/PDF/texto) |
| 10/07 | Correção de rota do cliente: fluxo só-PDF, CV nunca em conversa — entrega no módulo Arquivos; reescrita IA padrão RHF; Fase 2: grupos ChatGuru via webhook, resumo→grupo, api/metrics |
| 13/07 | Checkpoint "Novos Ajustes" (11 itens): Funil de Vagas, menu enxuto (Dashboard/Gerador/Funil), dashboard sem mocks, Liquid Glass v2, limpeza de dados fake |
| 14/07 | **Entrega automática no módulo Arquivos** (engenharia reversa do painel: `/user_upload_files`, tags, delete) — "Preparar arquivo" sobe direto com tag do processo |
| 15/07 | Funil recarrega a cada visita (fix cache de aba) + botão Atualizar; painel de usuários restrito a perfis RHF + guard 403 (proteção da instância compartilhada); senha do admin resetada |

## Planejamento — próximos passos

1. **Teste conjunto Moroni + Rodrigo** do fluxo completo (import → geração → entrega → funil) — pendente.
2. **Item 8 do checkpoint:** cruzar tags dos chats/Arquivos do ChatGuru com o funil/dashboard — depende de capturar payload real do webhook ChatGuru no teste conjunto (payloads atuais no banco são da era Meta, sem tags).
3. **Fluxo "apresentar no grupo":** backend pronto (send-summary), UI removida a pedido do cliente — Rodrigo vai desenhar o fluxo desejado antes de reativar.
4. **Pandapé:** oficialmente em STANDBY (decisão do cliente 13/07). `lib/pandape.js` (OAuth2) pronto — só aguarda PANDAPE_CLIENT_ID/SECRET se voltar.
5. **Filtro LGPD:** adiado por decisão interna (01/07).
6. **Limite Vercel Hobby:** 11/12 funções — próximo endpoint novo exige merge de handlers ou plano Pro.
7. Backlog completo e critérios: `PLANO-BACKLOG-04072026.md`.

## Deploy — runbook

```bash
# 1. Deploy de produção (na pasta do projeto)
npx vercel --prod --yes

# 2. OBRIGATÓRIO: apontar o domínio principal para o novo deploy
npx vercel alias set <url-do-deploy>.vercel.app rhf-talentos-plataforma.vercel.app
```

**Gotchas conhecidos:**
- `vercel --prod` NÃO move o domínio principal sozinho — **sempre rodar o alias** (passo 2). Sem isso, produção continua servindo o código antigo.
- Deploy de preview (`vercel` sem `--prod`) NÃO tem as env vars de produção (service key, Resend, OpenAI) — login cai para recrutador e funcionalidades quebram.
- Env vars no Vercel têm `\n` literal no fim dos valores — o código já trata (`cleanEnv()` em `lib/supabase.js`); ao criar novas, atenção.
- Proxy Cloudfy (Supabase) retorna 403 para user-agent `Python-urllib` — usar curl/browser/Node fetch.
- Projeto Vercel: `rhf-talentos-plataforma` (IDs em `CREDENCIAIS.md`). Env vars definidas no ambiente Production.

## Git

- **Este repo (u4digital/RHF-Talentos):** snapshots versionados — esta é a `versao-15jul`.
- Desenvolvimento contínuo acontece no monorepo local do Moroni; novas versões serão empurradas aqui a cada checkpoint.
