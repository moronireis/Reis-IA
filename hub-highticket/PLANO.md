# HUB HIGH TICKET — Plano de Construção

Last updated: 2026-04-06

## Visão Geral

Plataforma de gestão para mentorias high ticket com **duas visões** (Expert e Aluno), dashboard de métricas comerciais, jornada gamificada e integrações com APIs externas.

**Stack**: Astro 6 + React 19 + Tailwind CSS 4 + Supabase
**Identidade Visual**: Dark mode + tons de verde (conceito Formula High Ticket)

---

## FASE 1 — Design System ✅ PRÓXIMA

### 1.1 Tokens & Fundação
- **Cores Dark Mode**:
  - `surface-0`: #0A0A0A (background)
  - `surface-1`: #111111 (cards)
  - `surface-2`: #1A1A1A (elevated)
  - `surface-3`: #222222 (hover states)
  - `border`: #2A2A2A
  - `text-primary`: #F5F5F5
  - `text-secondary`: #999999
  - `accent-green`: #22C55E (primary action)
  - `accent-green-light`: #4ADE80 (hover)
  - `accent-green-dark`: #16A34A (pressed)
  - `accent-green-glow`: rgba(34, 197, 94, 0.15) (glow effects)
  - `success`: #22C55E
  - `warning`: #F59E0B
  - `danger`: #EF4444
  - `info`: #3B82F6
- **Tipografia**: Inter (300, 400, 500, 600, 700)
- **Spacing**: 4px base grid (4, 8, 12, 16, 24, 32, 48, 64)
- **Radius**: sm(6px), md(8px), lg(12px), xl(16px)
- **Shadows**: green glow subtle para elementos de destaque

### 1.2 Componentes Base
- Button (primary/secondary/ghost/danger)
- Input, Select, Textarea
- Card (surface-1 com border sutil)
- Badge (status colors)
- Avatar + AvatarGroup
- Table (striped dark)
- Modal / Dialog
- Sidebar navigation (collapsible)
- TopBar com breadcrumb
- Tabs
- Progress bar (green gradient)
- Tooltip
- Dropdown menu
- Stat card (métricas do dashboard)
- Ranking list item
- Checklist item
- Timeline/Journey step

### 1.3 Entregáveis
- `design-system.css` com custom properties
- Componentes React documentados
- Preview page com todos os componentes

---

## FASE 2 — Arquitetura & Scaffold

### 2.1 Estrutura do Projeto
```
hub-highticket/
├── src/
│   ├── components/
│   │   ├── ui/              # Design system components
│   │   ├── dashboard/       # Stat cards, charts, KPIs
│   │   ├── commercial/      # Ranking, closer metrics, calls
│   │   ├── journey/         # Journey steps, checklist
│   │   ├── student/         # Student-facing components
│   │   └── layout/          # Sidebar, TopBar, Shell
│   ├── layouts/
│   │   ├── AdminLayout.astro
│   │   └── StudentLayout.astro
│   ├── pages/
│   │   ├── admin/
│   │   ├── aluno/
│   │   ├── api/
│   │   └── login.astro
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   └── styles/
│       ├── design-system.css
│       └── global.css
├── supabase/
│   └── migrations/
```

### 2.2 Database Schema (Supabase)
- `users` (id, name, email, role[expert|closer|student], avatar)
- `students` (id, user_id, level, points, revenue, joined_at)
- `closers` (id, user_id, name, active)
- `sales` (id, closer_id, student_id, amount, status, date)
- `calls` (id, closer_id, date, result[sold|lost|no_show], notes)
- `closer_reviews` (id, closer_id, hits, misses, blind_spots, improvements)
- `journey_steps` (id, title, description, order, type[expert|student])
- `journey_progress` (id, user_id, step_id, completed, completed_at)
- `checklist_items` (id, student_id, title, completed, category)
- `actions` (id, title, description, how, due_date, status, assigned_to)
- `metrics_cache` (id, type, data, period, updated_at)

### 2.3 Auth & Middleware
- Login com email/senha (Supabase Auth)
- Middleware de role check (expert vs aluno)
- Redirect automático por role após login

---

## FASE 3 — Expert View

### 3.1 Dashboard Principal (`/admin`)
- Row 1: Stat cards — Valor Investido, Faturamento Total, Qtd Alunos, Ticket Médio
- Row 2: Stat cards — Valores a Receber (30d), Total a Receber, Inadimplência (%)
- Row 3: Gráfico de faturamento mensal
- Filtro de período (7d, 30d, 90d, all)

### 3.2 Time Comercial (`/admin/comercial`)
- Ranking de Vendedores com avatar, nome, faturamento, conversão
- Métricas por Closer: Calls, Vendas, Taxa de conversão
- Gap Analysis: diferença entre melhor e pior closer
- Review de Performance: acertos, erros, pontos cegos, melhorias
- Gamificação: badges, posição no ranking

### 3.3 Jornada Hub High Ticket (`/admin/jornada`)
- Timeline vertical com steps
- Status por step (pendente/em andamento/concluído)
- Roadmap visual do que será construído

### 3.4 Ações (`/admin/acoes`)
- Lista de ações: título, descrição, como fazer, data limite, status
- Kanban (A Fazer / Em Andamento / Concluído)
- Filtro por status e data

---

## FASE 4 — Student View

### 4.1 Dashboard Aluno (`/aluno`)
- Ranking entre alunos (faturamento ou nível)
- Barra de progresso da jornada
- Badge visual do nível atual

### 4.2 Checklist de Implementação (`/aluno/checklist`)
- Checklist por categoria
- Progress bar por categoria e geral

### 4.3 Jornada do Aluno (`/aluno/jornada`)
- Steps da jornada dentro da mentoria
- Status de cada step
- Visual gamificado (levels, badges)

### 4.4 Acesso Rápido
- Link Hotmart (configurável)
- Cardápio de Aulas
- Solicitar Sessão Individual (link Cal.com)

---

## FASE 5 — Métricas Avançadas & APIs

### 5.1 Métricas de Venda Individual
- Dashboard detalhado por closer
- Ranking gamificado com bônus
- Gráficos de evolução temporal

### 5.2 Métricas SHT & IMA
- Seções separadas, IMA split Online vs Presencial
- Cards de resumo + tabela detalhada

### 5.3 Integrações API (estrutura preparada)
- Meta Ads: impressões, cliques, CPL, investimento
- Google Ads: mesmas métricas
- Hotmart: vendas, refunds, status pagamento

---

## FASE 6 — Preview & Polish

### 6.1 Preview
- Todas as páginas navegáveis com dados mock
- Transições e micro-interações
- Responsivo (desktop-first)

### 6.2 Polish
- Loading states (skeletons)
- Empty states, Error states
- Toast notifications
- Animações sutis

### 6.3 Deploy
- Vercel
- Domínio a definir

---

## Status

| Fase | Status | Início | Conclusão |
|------|--------|--------|-----------|
| 1 - Design System | ✅ Concluída | 2026-04-06 | 2026-04-06 |
| 2 - Scaffold | ✅ Concluída | 2026-04-06 | 2026-04-06 |
| 3 - Expert View | ✅ Concluída | 2026-04-06 | 2026-04-06 |
| 4 - Student View | ✅ Concluída | 2026-04-06 | 2026-04-06 |
| 5 - Métricas & APIs | ✅ Concluída | 2026-04-06 | 2026-04-06 |
| 6 - Preview & Polish | ✅ Concluída | 2026-04-06 | 2026-04-06 |
