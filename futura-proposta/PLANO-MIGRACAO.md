# Futura People — Plano de Migração da Base Legada

> Last updated: 2026-07-20
> Status: ✅ **MIGRAÇÃO EXECUTADA** — 54.192 candidatos + 1.767 empresas importados para `fp_` e no ar em produção.
> Documentos-pai: `PLANO-DEV.md`, `PLANO-MVP.md` (§3 lista migração como Fase 2)
> Fonte de acesso: (1) wp-login do backlog; (2) **dump do banco no GitHub `u4digital/Futura-People` issue #16** (link da GetCommerce)
> Documento interno u4digital. Contém descrição de dados pessoais sensíveis — tratar com cuidado (LGPD).

---

## ✅ RESULTADO DA EXECUÇÃO (2026-07-20)

| Métrica | Valor |
|---------|-------|
| Candidatos importados | **54.192** (`origem=wordpress`) + 4 do MVP preservados = **54.196** |
| Empresas importadas | **1.767** (1.601 com CNPJ) |
| Cobertura | e-mail 54.144 · CPF 54.189 · nascimento 53.976 · currículo completo (JSONB) 54.192 |
| Dedup | por CPF (16 duplicatas removidas); upsert idempotente por `wp_id` |
| Tempo | candidatos 100s · empresas 2s |
| Produção | painel admin já mostra 54.196 candidatos e 1.767 empresas |
| Scripts | `futura-people/scripts/migracao/` (commit `c437fd7`) |

Currículo completo (98 campos) preservado em `fp_candidates.legado` (JSONB). Dump + PII apagados do ambiente após a carga. **Re-executável**: os scripts são idempotentes (upsert por `wp_id`).

---

## 0. TL;DR

1. **A "base" do backlog = o WordPress legado da Futura**, acessível com o wp-login do PDF do kickoff. O login funciona em `https://www.futuradobrasil.com.br/wp-admin` (o site público redireciona para futurasm.com.br, mas o admin e os dados continuam vivos).
2. O sistema é um plugin de recrutamento sob medida: **`solucoestriade-empregos`** (Soluções Tríade). Não é WP Job Manager nem base em `wp_usermeta` — os dados vivem em **tabelas próprias do plugin** com IDs sequenciais.
3. **O dump completo já foi entregue** pela GetCommerce e está no **GitHub `u4digital/Futura-People`, issue #16** (`futurasm-db-b9804f...zip`, 53 MB → 218 MB de SQL). **Baixado e validado**: bate 100% com o sistema ao vivo. As tabelas do recrutamento são prefixadas **`wp_st_`** (Soluções Tríade).
4. **Volumes reais confirmados no dump**: **54.208 candidatos** (`wp_st_candidatos`) · **1.767 empresas com CNPJ** (`wp_st_empresas`) · **6.972 vagas** (`wp_st_vagas`) · **497.836 candidaturas** (`wp_st_candidatados`) · **184.436 encaminhamentos** · 15 anos (2011→2025).
5. Cada candidato é um **currículo de 98 colunas**. ⚠️ **`wp_st_candidatos` NÃO tem coluna de e-mail** — o e-mail vem de `wp_users` (join por `wp_id`). Formação e conhecimentos (idiomas/informática) são **normalizados** em tabelas à parte (`wp_st_niveis`, `wp_st_instituicoes`, `wp_st_cursos`, `wp_st_econhecimentos`).
6. Os **114.204 registros em `wp_users`** são o login legado/paralelo; a fonte de verdade do currículo é `wp_st_candidatos` (54.208, bate com os "54.226" da proposta). **Migrar por `wp_st_candidatos`, usando `wp_id` para puxar o e-mail de `wp_users`.**

⚠️ **Nada foi migrado nem alterado.** Verificação read-only + plano. A execução é Fase 2 (agosto) e depende das decisões da §7.
🔒 **O dump tem dados sensíveis de 114 mil pessoas + hashes de senha — NUNCA commitar no repositório.** Manter em storage seguro (ver §6).

---

## 1. O QUE FOI VERIFICADO (18-20/07)

| Item | Resultado |
|------|-----------|
| Backlog no GitHub | Issues criadas em `u4digital/Futura-People`: **#16 Database** (link do dump), **#15 Kickoff/acessos** (logins + notas + "Vagas março 2026.pdf" + Google Form), **#14 Identidade visual** (Dropbox). Issues #1–#13 = os 13 itens do kickoff (já triados no PLANO-DEV §8) |
| Acesso admin | ✅ Login OK em `www.futuradobrasil.com.br/wp-admin` (papel **Administrador**) |
| **Dump do banco** | ✅ **Em mãos e validado** — issue #16 (`futurasm-db-b9804f...zip`). 218 MB de SQL, 40 tabelas, 17 do recrutamento (`wp_st_`) |
| Sistema | Plugin sob medida **`solucoestriade-empregos`** (Soluções Tríade) — dados em tabelas `wp_st_` |
| Charset do dump | Latin-1 → normalizar para UTF-8 na ETL |

### Volumes reais (contados no dump, batem com o sistema ao vivo)

| Tabela | Registros | O que é |
|--------|-----------|---------|
| **`wp_st_candidatos`** | **54.208** | Currículos (98 colunas). id 5→54.446 |
| **`wp_st_empresas`** | **1.767** | Empresas c/ CNPJ, e-mail, responsável. id 6→1.965 |
| **`wp_st_vagas`** | **6.972** | Vagas c/ benefícios, requisitos, status. id 4→7.280 |
| **`wp_st_candidatados`** | **497.836** | Candidaturas (idvaga × idcandidato) — histórico do pipeline |
| **`wp_st_encaminhados`** | **184.436** | Encaminhamentos candidato→empresa |
| **`wp_st_vistosrecrutamento`** | **202.423** | Visualizações de currículo por recrutador |
| **`wp_st_econhecimentos`** | ~108k | Conhecimentos do candidato (idiomas/informática), normalizado |
| `wp_st_niveis` / `instituicoes` / `cursos` | poucos | Tabelas de domínio (formação) |
| `wp_users` / `wp_usermeta` | 114.204 | Login legado + metadados (fonte do **e-mail** via `wp_id`) |

> **Achado-chave**: o e-mail do candidato **não** está em `wp_st_candidatos` — está em `wp_users` (join `wp_st_candidatos.wp_id = wp_users.ID`). A ETL precisa desse join.

**Distribuição de status dos candidatos**: 50.849 ATIVO · 2.193 CONTRATADO · 995 ENCAMINHADO · 171 INATIVO.
**Período**: cadastros de 01/01/2011 a 31/12/2025.
**Qualidade**: nomes em caixa mista (muitos ALL CAPS / minúsculas), datas `DD/MM/YYYY`, encoding Latin-1 → exige normalização.

---

## 2. ESTRUTURA COMPLETA DO CANDIDATO (97 campos)

Extraída do formulário de cadastro do plugin (`admin.php?page=cadastrar-candidatos&id=N`). Agrupada:

| Grupo | Campos |
|-------|--------|
| **Identificação** | nome, email, cpf, rg, foto, datanascimento, idade, cidadenascimento, estadocivil, sexo, filhos, altura, peso |
| **PcD** | ppd (é PcD?), deficiencia |
| **Endereço** | logradouro, numero, complemento, bairro, cidade, cep, estado |
| **Contato** | fone1, fone2, celular, nomerecado, fonerecado |
| **Família** | nomemae, profissaomae, nomepai, profissaopai |
| **Perfil/logística** | fumante, viagens, cnh, cnhcategoria, moto, carro, anocarro, modelocarro, notebook, horario[] (turnos) |
| **Formação** | nivel, instituicao, outrainstituicao, curso, outrocurso, conclusao, infoconclusao, posgraduacao, idiomas[], informatica[], outroscursos |
| **Experiência (×4)** | nomeempresaN, telefoneempresaN, inicialempresaN, finalempresaN, admissaoempresaN, demissaoempresaN, motivoempresaN, salarioempresaN, atividadesempresaN |
| **Objetivo** | observacoes, atuacaointeresse, cargopretendido1..3, salariopretendido, status, financeiro |

> É um currículo brasileiro tradicional e denso. Contém **dado pessoal sensível** (PcD/deficiência, filiação, foto, CPF/RG) — atenção redobrada à LGPD (§6).

---

## 3. ESTRATÉGIA DE EXTRAÇÃO — RESOLVIDA ✅

**A Opção A (dump MySQL) foi entregue pela GetCommerce e já está validada.** Não precisamos mais de scraping nem do CSV resumido.

- **Fonte**: issue #16 do GitHub `u4digital/Futura-People` (link para `futurasm-db-b9804f...zip`).
- **Conteúdo**: dump completo (`mysqldump`, 218 MB), todas as 40 tabelas, incluindo as 17 `wp_st_` do recrutamento + `wp_users`/`wp_usermeta`.
- **Validação feita**: contagens conferidas contra o sistema ao vivo (54.208 / 1.767 / 6.972) — batem. Schema das tabelas principais extraído (§2).
- **Formato**: `INSERT` multi-linha, encoding Latin-1, timestamps `datainsercao`.

**Fluxo de execução** (Fase 2): carregar o `.sql` num MySQL/MariaDB local (ou ler direto com script) → ETL para o Supabase (`fp_`). Sem dependência externa restante para a extração.

> Nota: o `relatorio_export.php` do plugin (CSV Latin-1, `;`) continua existindo e serve para conferência rápida, mas o dump o torna dispensável.

---

## 4. MAPEAMENTO PARA O SCHEMA DO MVP (`fp_candidates`)

O MVP tem um schema enxuto. A base legada é rica demais para jogar tudo em colunas. **Decisão de arquitetura**: mapear os campos que o MVP usa para colunas + guardar o currículo completo num campo **`legado JSONB`**, sem perder nada e sem inchar a UI.

| Campo legado | → `fp_candidates` | Transformação |
|--------------|-------------------|---------------|
| nome | nome | Title Case (corrigir ALL CAPS / minúsculas) |
| celular (fallback fone1/fone2) | whatsapp | Só dígitos, normalizar DDI/DDD |
| email | email | lower/trim; **muitos vazios** → gerar placeholder ou deixar nulo |
| cidade + estado | cidade | "Cidade/UF" |
| cargopretendido1 | area | mapear p/ a lista de áreas do MVP (heurística) |
| salariopretendido | pretensao_min/max | parsear faixa |
| (experiências 1-4) | experiencia_anos | derivar dos períodos admissão/demissão |
| — | disponibilidade | não existe no legado → nulo |
| curso + nivel + posgraduacao | resumo (parcial) | compor um resumo legível |
| — | origem | `'wordpress'` |
| Id do plugin | wp_id | chave de deduplicação/reconciliação |
| **todos os 97 campos** | **legado (JSONB)** | payload bruto normalizado, para consulta/relatórios futuros |

**Ajuste de schema necessário (migration)**: adicionar `legado jsonb` em `fp_candidates` (e opcionalmente `cpf`, `data_nascimento`). Empresas legadas → `fp_companies` (razão social, CNPJ). Vagas legadas → **não** entram no MVP (histórico; avaliar tabela `fp_jobs_legado` só se a Futura quiser relatórios históricos).

### Deduplicação
- Chave primária de dedupe: **CPF** (quando presente) → senão e-mail → senão nome+datanascimento.
- Reimportações idempotentes por `wp_id` (mesma lógica do Corp no Marpe: write→read-back por chave estável).

---

## 5. DECISÃO PENDENTE DO KICKOFF: importar tudo vs. recadastro

O kickoff deixou em aberto (KICKOFF.md §3): **importar os 54K como estão** OU **campanha de recadastro** (candidato atualiza o perfil, o que aumenta os scores e a qualidade).

Recomendação u4digital (híbrida):
1. **Importar como está** (Opção A) para não perder a base nem o argumento de tração (54K currículos + 1.767 CNPJs para o pitch do Rio Innovation Week).
2. Marcar todos com `origem='wordpress'` e completude calculada a partir do que veio.
3. **Campanha de recadastro gradual**: quando um candidato legado logar/for acionado, convidá-lo a confirmar/atualizar (progressive profiling do MVP já faz isso) → sobe o score naturalmente, sem big-bang.

---

## 6. LGPD — pontos de atenção (base de 15 anos, 54K pessoas)

- **Dados sensíveis presentes**: PcD/deficiência (saúde), filiação, foto, CPF/RG. Exigem base legal e cuidado extra.
- **Base legal da migração**: a Futura é controladora; a u4digital é operadora. A migração para nova infra é continuidade do tratamento legítimo (recrutamento) — documentar em contrato/aditivo.
- **Retenção**: 15 anos de base; muitos registros inativos/antigos. Avaliar política de retenção e possibilidade de anonimizar/descartar inativos muito antigos (reduz risco e custo).
- **Consentimento no recadastro**: quando o candidato legado voltar, coletar o consentimento do MVP (`fp_consents`) — atualiza a base legal.
- **Minimização**: no `fp_candidates` operacional, expor só o necessário; o currículo completo fica no `legado JSONB` com acesso restrito (admin).
- **Encaminhar à GetCommerce/Futura**: confirmar que a base pode ser extraída e migrada (a Futura só cancela a GetCommerce após validação — KICKOFF.md §3).

---

## 7. O QUE PRECISO PARA EXECUTAR (pedir no grupo)

1. ~~Dump MySQL~~ ✅ **RESOLVIDO** — dump completo em mãos (issue #16).
2. **Confirmação LGPD**: ok da Futura para migrar a base para a nova infra (Supabase u4digital) + aditivo de operador, se necessário. (dado sensível de 54K pessoas + hashes de senha)
3. **Decisão importar vs recadastro** (§5) — recomendação híbrida acima.
4. **Trocar a senha do WordPress** — a do backlog/issue #15 é fraca (`123456`) e está em texto puro no GitHub; trocar assim que confirmarmos que não quebra integrações.
5. **Escopo das vagas/candidaturas**: migrar as 6.972 vagas + 497k candidaturas históricas? (recomendo **não** no MVP; só o essencial — candidatos + empresas. Histórico só se a Futura quiser relatórios).
6. **Storage seguro do dump**: definir onde o `.sql` fica para a execução (NÃO no repo). Sugestão: bucket privado Supabase Storage ou local criptografado, apagado após a carga.

---

## 8. PLANO DE EXECUÇÃO (Fase 2 — quando destravado)

1. **Schema**: migration adicionando `legado JSONB` (+ `cpf`, `data_nascimento`) em `fp_candidates`; `cnpj`/`razao_social` em `fp_companies`.
2. **ETL** (`scripts/migracao/`): ler dump/CSV Latin-1 → normalizar (encoding UTF-8, Title Case, telefones, datas ISO, faixas salariais) → dedupe por CPF/e-mail → upsert por `wp_id`.
3. **Dry-run** em staging: importar 500 registros, validar mapeamento e completude, revisar com a Telma/Dani.
4. **Carga completa** idempotente + relatório de reconciliação (importados / duplicados / com erro).
5. **Empresas**: importar 1.767 → `fp_companies` (base do funil comercial e dos alertas NR-1).
6. **QA**: contagens batem (54.208 / 1.767), amostras conferidas, busca/match do MVP funcionando sobre a base real.
7. **Recadastro**: ativar o convite de atualização no progressive profiling para registros `origem='wordpress'`.

---

## CHANGELOG

- **2026-07-20** — **Dump completo obtido e validado** via GitHub issue #16 (GetCommerce). Baixado (53 MB zip → 218 MB SQL), contagens conferidas contra o sistema ao vivo (batem), schema das tabelas principais extraído. Descobertas: tabelas `wp_st_`; e-mail vem de `wp_users` (join `wp_id`); formação/conhecimentos normalizados; +497k candidaturas e +184k encaminhamentos no histórico. Opção A (dump) concluída — extração deixou de ser risco. Revisão do backlog do GitHub: issues #14 (identidade), #15 (kickoff/acessos + Vagas março PDF + Google Form), #16 (database). Dump mantido só em storage temporário da sessão (não commitado).
- **2026-07-18** — Documento criado após verificação read-only do WordPress legado (acesso do backlog). Sistema identificado (`solucoestriade-empregos`), volumes confirmados, 97 campos do candidato mapeados, estratégia de extração e mapeamento para `fp_candidates` definidos. Nenhum dado migrado/alterado. Amostras com PII apagadas do ambiente de trabalho após a análise.
