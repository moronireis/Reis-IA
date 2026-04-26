# Noiva S/A | Gestão — Plano Estratégico da Plataforma

**Versão:** 1.0
**Data:** Abril 2026
**Status:** Planejamento

---

## 1. Visão do Produto

### Nome
**Noiva S/A | Gestão**
Tagline: *"Cada detalhe, no lugar certo."*

Alternativas de nome:
- **Cerimonial Pro** — mais genérico, fácil de escalar
- **Ateliê de Eventos** — evoca artesanato, cuidado, exclusividade
- **Recepção** — limpo, minimalista, moderno

### Proposta de Valor

A única plataforma de gestão de eventos desenhada especificamente para assessoras de casamento brasileiras. Enquanto ferramentas genéricas (Trello, Notion, planilhas) exigem adaptação manual e ferramentas de eventos como a AssessoriaVIP são funcionalmente densas mas visualmente pesadas, o Noiva S/A | Gestão entrega:

- **Simplicidade operacional** — fluxo de trabalho da assessora em uma tela
- **Beleza que representa o ofício** — interface que você mostra com orgulho pro cliente
- **Integração com a realidade brasileira** — WhatsApp nativo, Pix, fornecedores locais

### Problema que Resolve

Assessoras de casamento hoje gerenciam tudo em:
- Planilhas do Excel/Google Sheets para controle de convidados e financeiro
- WhatsApp para comunicação com noivos e fornecedores
- Google Drive para documentos e contratos
- Papel e caneta para checklists no dia
- Nenhuma visão consolidada, nenhuma automação, nenhum portal para o cliente

O resultado: retrabalho constante, erros de comunicação, atraso em confirmações, dificuldade de cobrar profissionalmente.

### Público-Alvo

**Primário:**
- Assessoras de casamento independentes (1-5 funcionários)
- Cerimonialistas com 10-50 eventos/ano
- Buffets com equipe de coordenação própria

**Secundário:**
- Agências de eventos (casamentos + festas corporativas)
- Espaços de eventos que oferecem assessoria inclusa

**Perfil da Usuária Principal:**
- Mulher, 28-45 anos
- Formada em eventos, turismo, comunicação ou autodidata
- Cobra R$3.000–R$15.000 por assessoria completa
- Tem 5-30 eventos simultâneos em diferentes fases
- Usa iPhone, é ativa no Instagram
- Orgulhosa do trabalho, exigente com apresentação

---

## 2. Arquitetura de Funcionalidades

### Fase 1 — MVP Core (4-6 semanas)

**Objetivo:** Assessora consegue gerenciar seus eventos do início ao fim sem planilha.

#### 1.1 Autenticação e Workspace
- Cadastro de assessora (nome, empresa, logo, contato)
- Login com email/senha + Google OAuth
- Perfil da empresa (personalização básica: nome, cores, logo)
- Multi-usuário: adicionar assistentes com permissões limitadas

#### 1.2 Dashboard Principal
- Visão geral: eventos desta semana, próximo evento, alertas
- Cards de métricas: eventos ativos, confirmações pendentes, tarefas em atraso
- Linha do tempo: próximos 30 dias
- Ações rápidas: criar evento, adicionar convidado, contatar fornecedor

#### 1.3 Gestão de Eventos
- Criar evento (nome, tipo, data, horário, local, número estimado de convidados)
- Perfil dos noivos (dados completos, foto, aniversário)
- Checklist de contratação (o que já foi confirmado, o que falta)
- Status do evento: Proposta → Contratado → Planejamento → Execução → Concluído
- Notas internas (visíveis só para a assessora)
- Upload de documentos do evento (contrato, briefing, inspirações)

#### 1.4 Gestão de Convidados
- Importação via planilha CSV ou Excel
- Cadastro manual (nome, telefone, email, mesa, confirmação, observações)
- Status de RSVP: Pendente / Confirmado / Recusado / Lista de espera
- Filtros por status, mesa, família do noivo/noiva
- Envio de convite via WhatsApp (integração WhatsApp API)
- Link público de confirmação (convidado confirma sem precisar de app)
- Contador de confirmados em tempo real
- Organização por mesas (drag and drop)

#### 1.5 Timeline do Evento
- Cronograma detalhado do dia (hora a hora)
- Templates de timeline reutilizáveis
- Atribuição de responsáveis por horário
- Checklist por momento (cerimônia, coquetel, recepção, etc.)
- Exportar como PDF para enviar à equipe

#### 1.6 Gestão de Fornecedores
- Diretório próprio: cadastro com categoria, contato, preço médio, avaliação interna
- Categorias: fotógrafo, buffet, floricultura, música, decoração, bolo, bem-casado, carro, segurança, limpeza, etc.
- Vinculação de fornecedor a um evento específico
- Status de confirmação por fornecedor: Orçando → Contratado → Confirmado → Pago
- Histórico: quais fornecedores usou em quais eventos

---

### Fase 2 — Gestão Financeira (3-4 semanas)

**Objetivo:** Assessora controla todo o financeiro dos eventos dentro da plataforma.

#### 2.1 Orçamento por Evento
- Criação de orçamento com itens e valores
- Budget do cliente vs. realizado
- Alertas de estouro de orçamento
- Comparativo por categoria (fotografia, decoração, buffet, etc.)

#### 2.2 Controle de Pagamentos
- Pagamentos a receber (da noiva): parcelas, datas, status
- Pagamentos a fornecedores: valor contratado, entrada, saldo, data de vencimento
- Alertas de vencimento
- Integração com Pix (gerar QR code para recebimento)

#### 2.3 Fluxo de Caixa
- Visão mensal: entradas (honorários) × saídas (comissões, ferramentas)
- Por evento: total de contratos firmados, total pago, saldo pendente
- Exportar relatório financeiro em PDF ou Excel

#### 2.4 Geração de Propostas e Orçamentos
- Templates de proposta comercial com logo da assessora
- Calculadora de honorários (por tipo de serviço, porte do evento)
- Envio da proposta por link (sem precisar de PDF)
- Registro de aceite (quando o cliente clicar em "Aceitar")

---

### Fase 3 — Experiência do Cliente (3-4 semanas)

**Objetivo:** Os noivos têm acesso a um portal elegante onde acompanham tudo.

#### 3.1 Portal do Cliente
- Acesso via link único (sem criar conta) ou com login simples
- Dashboard do casal: data do casamento, próximos passos, % de planejamento concluído
- Lista de tarefas do casal (com prazo)
- Status dos fornecedores confirmados
- Documentos compartilhados (contrato, cronograma, mapa do local)
- Mensagens com a assessora (chat interno)

#### 3.2 Checklist Compartilhado
- Checklist padrão de casamento (criado pela assessora)
- Assessora e casal marcam itens como concluídos
- Comentários por item
- Progresso visual (barra de porcentagem)

#### 3.3 Moodboard e Inspirações
- Upload de imagens de referência por categoria (flores, mesa posta, vestido, bolo, etc.)
- Link para salvar imagens do Pinterest/Instagram
- Notas e aprovações do casal por categoria
- Paleta de cores do casamento

#### 3.4 Confirmação de Convidados via Link Público
- Link único por evento (sem necessidade de app ou login)
- Formulário simples: nome, confirmação, número de acompanhantes, restrições alimentares
- Design elegante no estilo Noiva S/A
- Atualização automática na lista de convidados da assessora

---

### Fase 4 — Avançado (4-6 semanas)

**Objetivo:** Produtividade avançada e diferenciação competitiva.

#### 4.1 Check-in Digital no Evento
- QR code por convidado (gerado automaticamente)
- App web mobile para a equipe fazer check-in no dia
- Painel em tempo real: quantos chegaram, quem ainda não chegou
- Modo offline (funciona sem internet, sincroniza quando conectar)

#### 4.2 Relatórios e Estatísticas
- Por evento: confirmação de convidados, fornecedores, financeiro
- Gerais: eventos por mês, receita anual, fornecedores mais usados
- Taxa de confirmação de convidados por evento
- Exportar todos os relatórios em PDF

#### 4.3 Templates de Eventos
- Salvar qualquer evento como template (timeline, checklist, fornecedores)
- Biblioteca de templates: casamento no campo, casamento na praia, casamento civil íntimo, etc.
- Aplicar template ao criar novo evento (pré-preenche tudo)
- Compartilhar templates entre assessoras (marketplace futuro)

#### 4.4 Integração Google Calendar
- Sincronizar eventos e datas importantes com Google Calendar
- Alertas de compromissos com fornecedores
- Calendário da assessora com visão de todos os eventos

#### 4.5 Contratos Digitais
- Templates de contrato de assessoria (editáveis)
- Envio para assinatura digital (via API de assinatura — Docusign ou ClickSign)
- Armazenamento seguro dos contratos assinados
- Notificação quando o cliente assinar

---

### Fase 5 — Mobile e Integrações (em avaliação)

#### 5.1 App Mobile
- React Native (iOS + Android) compartilhando lógica com a web
- Foco: check-in no evento, lista de convidados, comunicação com fornecedores
- Notificações push para alertas importantes
- Câmera para check-in via QR code

#### 5.2 Integrações
- Sites de casamento (Zankyou, Casar, etc.) — importar lista de convidados
- Google Sheets — exportação bidirecional
- Mailchimp/SendGrid — envio de confirmações por email
- Stripe/Asaas — cobrança recorrente dos planos

#### 5.3 Automações WhatsApp Avançadas
- Lembretes automáticos para convidados (3 dias antes do evento)
- Mensagem de boas-vindas ao cadastrar nova noiva
- Status de confirmação por WhatsApp (convidado responde e o sistema atualiza)
- Notificações para fornecedores (confirmação de datas, documentos pendentes)

---

## 3. Stack Técnica Recomendada

### Frontend
**Next.js 14+ (App Router)**

Justificativa:
- Server Components para performance e SEO (landing page, portal do cliente)
- React Client Components para UI interativa (dashboard, tabelas, formulários)
- API Routes para webhooks e integrações
- Ecossistema maduro, fácil contratar devs

Alternativa: **Astro + React islands** — ideal se o projeto for majoritariamente estático. Recomendado se a assessora vender acesso ao portal do cliente como feature de marketing.

### Backend / BaaS
**Supabase**

- Auth: login email/senha, Google OAuth, magic links
- Database: PostgreSQL com Row Level Security (cada assessora vê só seus dados)
- Storage: upload de documentos, contratos, fotos
- Realtime: confirmações de convidados em tempo real no dashboard
- Edge Functions: lógica de negócio (calcular métricas, gerar PDFs)

### Styling
**Tailwind CSS + shadcn/ui**

- shadcn/ui como base de componentes (headless, totalmente customizável)
- Design tokens no `tailwind.config` para a paleta Noiva S/A
- Playfair Display via Google Fonts para títulos
- Inter para texto de interface

### Banco de Dados (Schema principal)

```sql
-- Assessoras
assessoras (id, nome, empresa, email, logo_url, plano, criado_em)

-- Eventos
eventos (id, assessora_id, nome, data, horario, local, tipo, status, noivos_id, criado_em)

-- Noivos
noivos (id, nome_noiva, nome_noivo, email, telefone, instagram, foto_url)

-- Convidados
convidados (id, evento_id, nome, telefone, email, mesa, status_rsvp, confirmados, restricoes, criado_em)

-- Fornecedores
fornecedores (id, assessora_id, nome, categoria, telefone, email, instagram, preco_medio, avaliacao, notas)

-- Fornecedores por Evento
evento_fornecedores (id, evento_id, fornecedor_id, status, valor_contratado, valor_pago, observacoes)

-- Timeline
timeline_itens (id, evento_id, horario, descricao, responsavel, concluido, ordem)

-- Financeiro
lancamentos (id, evento_id, tipo, descricao, valor, data_vencimento, data_pagamento, status)

-- Portal do Cliente
portal_tokens (id, evento_id, token, ativo, criado_em)
```

### WhatsApp
**Evolution API** (self-hosted) ou **Z-API** (SaaS brasileiro, mais fácil)

- Z-API recomendado para MVP: sem servidor para manter, R$149/mês, tem SDK
- Evolution API recomendado para escala: open source, self-hosted no Railway

### Geração de PDF
**React PDF** ou **Puppeteer** (via Supabase Edge Function)

### Deploy
- **Vercel** — frontend Next.js
- **Supabase Cloud** — backend/database
- **Cloudflare** — CDN e domínio

### Pagamentos (plataforma SaaS)
**Asaas** — recomendado para mercado brasileiro
- Pix nativo, boleto, cartão
- Cobrança recorrente (planos mensais)
- Documentação em português
- Sem burocracia para PJ brasileira

Alternativa: **Stripe** — se quiser escalar internacionalmente depois.

---

## 4. Modelo de Negócio

### SaaS por Assinatura Mensal

| Plano | Preço | Eventos Ativos | Usuários | Limites |
|-------|-------|----------------|----------|---------|
| **Starter** | R$97/mês | Até 5 eventos | 1 usuário | Sem portal do cliente |
| **Profissional** | R$197/mês | Até 20 eventos | 3 usuários | Portal do cliente incluso |
| **Studio** | R$397/mês | Ilimitado | 10 usuários | Todas as features + suporte prioritário |

**Free trial:** 14 dias no plano Profissional, sem cartão.

### Métricas-Alvo (Ano 1)
- 50 assessoras pagantes = R$10.000 MRR (mix de planos)
- 200 assessoras pagantes = R$40.000 MRR (meta de 12 meses)
- Churn target: menor que 5% ao mês
- CAC payback: menor que 3 meses

### Canais de Aquisição
1. Instagram orgânico (bastidores, dicas para assessoras)
2. Parceria com cursos de formação em eventos
3. Indicação de assessoras (programa de referral: 1 mês grátis)
4. Google Ads para buscas como "software para assessora de casamento"
5. Comunidades no WhatsApp e Telegram de assessoras

---

## 5. Design System

### Paleta de Cores

```
--color-primary:      #D4A574    /* Rose gold — CTA, destaques, links */
--color-primary-dark: #C4956A    /* Gold muted — hover states */
--color-secondary:    #F5E6D8    /* Blush — backgrounds de seção, badges */
--color-accent:       #E8C4A0    /* Peach — destaques secundários */

--color-background:   #FEFCFB    /* Off-white quente — fundo geral */
--color-surface:      #FFFFFF    /* Cards, modais, inputs */
--color-surface-alt:  #FAF5F0    /* Sidebar, header */

--color-text:         #2D2D2D    /* Texto principal */
--color-text-muted:   #8B7E74    /* Labels, placeholders, metadata */
--color-text-light:   #B8AFA8    /* Disabled, dicas */

--color-border:       #F0E6DD    /* Bordas de cards e inputs */
--color-border-focus: #D4A574    /* Bordas em foco */

--color-success:      #7CB9A0    /* Verde sage — status positivo */
--color-warning:      #E8C87A    /* Amarelo suave — alertas */
--color-error:        #E8897A    /* Coral suave — erros */
```

### Tipografia

**Títulos e Headlines:** Playfair Display
- H1: 48px / 700 weight
- H2: 36px / 600 weight
- H3: 24px / 600 weight
- H4: 18px / 500 weight

**Interface e Corpo:** Inter
- Body: 14-16px / 400 weight
- Label: 12-13px / 500 weight
- Caption: 11px / 400 weight

**Hierarquia aplicada:**
- Nome do evento → Playfair Display, H2
- Nomes de seção no dashboard → Inter 500
- Dados e métricas → Inter 400 com destaque em 700 para números

### Componentes Principais

**Botão Primário**
```
Background: #D4A574
Text: white
Border-radius: 8px
Padding: 10px 20px
Font: Inter 500, 14px
Hover: #C4956A (escurece 10%)
Shadow: 0 2px 8px rgba(212, 165, 116, 0.25)
```

**Card de Evento**
```
Background: white
Border: 1px solid #F0E6DD
Border-radius: 16px
Padding: 24px
Shadow: 0 2px 12px rgba(0,0,0,0.04)
Hover shadow: 0 4px 20px rgba(0,0,0,0.08)
```

**Badge de Status**
```
Confirmado: bg #E8F4EE, text #4A8F6F
Pendente: bg #FFF5E6, text #B8860B
Recusado: bg #FDE8E6, text #C0574A
Contratado: bg #F5E6D8, text #D4A574
```

**Input**
```
Border: 1px solid #F0E6DD
Border-radius: 8px
Focus border: #D4A574
Placeholder: #B8AFA8
```

**Sidebar**
```
Background: #FFFFFF
Border-right: 1px solid #F0E6DD
Width: 240px
Item ativo: bg #FAF5F0, text #D4A574, border-left 3px #D4A574
```

### Tom de Voz da Plataforma

A plataforma fala como uma colega experiente e organizada, não como um software genérico.

**Exemplos:**
- Onboarding: *"Vamos criar seu primeiro evento? Tudo começa com uma data."*
- Empty state: *"Nenhum evento esta semana. Que paz! Aproveite para planejar."*
- Sucesso: *"Fornecedor adicionado. A festa vai ser linda."*
- Confirmação de convidado: *"Perfeito! Sua presença foi confirmada."*
- Erro: *"Algo deu errado. Tente de novo em instantes."*

**Princípios:**
- Feminino e caloroso, nunca condescendente
- Técnico quando necessário, nunca jargão desnecessário
- Celebra as vitórias pequenas (confirmação, checklist concluído)
- Nunca usa termos genéricos ("dados salvos com sucesso")

---

## 6. Roadmap de Desenvolvimento

```
Semana 1-2:   Setup do projeto, design system, componentes base, auth
Semana 3-4:   Dashboard, CRUD de eventos, CRUD de fornecedores
Semana 5-6:   Gestão de convidados + link de RSVP público
Semana 7:     Timeline do evento, checklist
Semana 8:     QA, ajustes, beta com 3-5 assessoras
              —— MVP lançado ——
Semana 9-12:  Fase 2 (financeiro)
Semana 13-16: Fase 3 (portal do cliente)
Semana 17-22: Fase 4 (avançado)
```

---

## 7. Diferenciais Competitivos

| Feature | Noiva S/A Gestão | AssessoriaVIP | Trello/Notion |
|---------|-----------------|---------------|---------------|
| Design premium para casamento | ✓ | Funcional | Neutro |
| RSVP via link público | ✓ | ✓ | Não nativo |
| Portal do cliente elegante | ✓ | ✓ | Manual |
| WhatsApp nativo BR | ✓ | ✓ | Não |
| Pix para recebimentos | ✓ | ? | Não |
| Curva de aprendizado | Baixa | Alta | Média |
| Preço | R$97-397 | Consultar | Grátis+ |
| Visual que a assessora exibe | ✓ ✓ ✓ | ✓ | ✗ |

---

*Documento gerado em Abril de 2026 — Noiva S/A | Gestão*
