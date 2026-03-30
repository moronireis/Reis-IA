import type { Node, Edge } from '@xyflow/react'

export interface FunnelSegment {
  id: string
  name: string
  description: string
  ticket: string
  color: string
  nodes: Node[]
  edges: Edge[]
}

const e = { type: 'animated' as const }

export const funnels: FunnelSegment[] = [
  // ─── FUNNEL 1: MDV + AGENTE LUCRATIVO (Moroni — produto proprio) ───
  {
    id: 'agente-lucrativo',
    name: 'Agente Lucrativo',
    description: 'Produto proprio Moroni — tripwire R$10 + onboarding',
    ticket: 'R$10',
    color: '#4A90FF',
    nodes: [
      {
        id: 'al-ads',
        type: 'funnel',
        position: { x: 0, y: 0 },
        data: { label: 'Anuncios Meta/Google', description: 'CBO campaigns — feed, reels, stories', type: 'ad', metric: 'Trafego pago' },
      },
      {
        id: 'al-org',
        type: 'funnel',
        position: { x: 280, y: 0 },
        data: { label: 'Organico', description: 'Instagram + YouTube + LinkedIn', type: 'ad', metric: 'Trafego organico' },
      },
      {
        id: 'al-masterclass',
        type: 'funnel',
        position: { x: 560, y: 0 },
        data: { label: 'Masterclass ao Vivo', description: 'Evento gratuito — captura WhatsApp', type: 'page', metric: '~165 leads' },
      },
      {
        id: 'al-landing',
        type: 'funnel',
        position: { x: 140, y: 160 },
        data: { label: 'Landing Page MDV', description: 'Maquina de Vendas — oferta tripwire', type: 'page' },
      },
      {
        id: 'al-checkout',
        type: 'funnel',
        position: { x: 140, y: 320 },
        data: { label: 'Checkout MDV', description: 'Hotmart — Pix/Cartao', type: 'checkout', metric: 'R$10 · ~283 vendas' },
      },
      {
        id: 'al-form',
        type: 'funnel',
        position: { x: 420, y: 320 },
        data: { label: 'Formulario Agente Lucrativo', description: 'Nome, email, WhatsApp, cargo, faturamento, objetivo, N8N', type: 'form', metric: '~1.293 leads' },
      },
      {
        id: 'al-onboarding',
        type: 'funnel',
        position: { x: 280, y: 480 },
        data: { label: 'Onboarding', description: 'Boas-vindas + acesso area de membros', type: 'email' },
      },
      {
        id: 'al-conteudo',
        type: 'funnel',
        position: { x: 280, y: 620 },
        data: { label: 'Consumo de Conteudo', description: 'N8N, agentes, automacoes, vendas, SaaS', type: 'program' },
      },
      {
        id: 'al-nurture',
        type: 'funnel',
        position: { x: 0, y: 620 },
        data: { label: 'Email Nurture', description: 'Sequencia educacao + cases + prova social', type: 'email' },
      },
      {
        id: 'al-upsell-hunters',
        type: 'funnel',
        position: { x: 0, y: 780 },
        data: { label: 'Oferta AI Hunters', description: 'Upsell para programa vendas de IA (Davi)', type: 'checkout', metric: 'R$397' },
      },
      {
        id: 'al-upsell-formacao',
        type: 'funnel',
        position: { x: 280, y: 780 },
        data: { label: 'Oferta Formacao', description: 'Upsell para Maquina de Automacoes (Davi)', type: 'checkout', metric: 'R$997-R$1.489' },
      },
      {
        id: 'al-reis-ia',
        type: 'funnel',
        position: { x: 560, y: 780 },
        data: { label: 'Reis IA Direto', description: 'Leads qualificados → conversa high ticket', type: 'action', metric: '/agendar' },
      },
    ],
    edges: [
      { id: 'al-e1', source: 'al-ads', target: 'al-landing', ...e },
      { id: 'al-e2', source: 'al-org', target: 'al-landing', ...e },
      { id: 'al-e3', source: 'al-masterclass', target: 'al-form', label: 'WhatsApp capturado', ...e },
      { id: 'al-e4', source: 'al-landing', target: 'al-checkout', label: 'compra R$10', ...e },
      { id: 'al-e5', source: 'al-checkout', target: 'al-form', label: 'pos-compra', ...e },
      { id: 'al-e6', source: 'al-form', target: 'al-onboarding', ...e },
      { id: 'al-e7', source: 'al-onboarding', target: 'al-conteudo', ...e },
      { id: 'al-e8', source: 'al-onboarding', target: 'al-nurture', ...e },
      { id: 'al-e9', source: 'al-nurture', target: 'al-upsell-hunters', label: 'perfil vendas', ...e },
      { id: 'al-e10', source: 'al-nurture', target: 'al-upsell-formacao', label: 'perfil tecnico', ...e },
      { id: 'al-e11', source: 'al-conteudo', target: 'al-upsell-hunters', ...e },
      { id: 'al-e12', source: 'al-conteudo', target: 'al-upsell-formacao', ...e },
      { id: 'al-e13', source: 'al-conteudo', target: 'al-reis-ia', label: 'alto faturamento', ...e },
      { id: 'al-e14', source: 'al-nurture', target: 'al-reis-ia', label: 'qualificado', ...e },
    ],
  },

  // ─── FUNNEL 2: AI HUNTERS (Davi Ribeiro — parceiro) ───
  {
    id: 'ai-hunters',
    name: 'AI Hunters',
    description: 'Programa parceiro Davi Ribeiro — vendas de IA',
    ticket: 'R$397',
    color: '#FFB84D',
    nodes: [
      {
        id: 'ah-seg',
        type: 'funnel',
        position: { x: 250, y: 0 },
        data: { label: 'Segmento: AI Hunters', description: 'Compradores do programa de vendas de IA', type: 'segment', metric: '~127 onboarding · ~72 LMS' },
      },
      {
        id: 'ah-form',
        type: 'funnel',
        position: { x: 250, y: 150 },
        data: { label: 'Formulario Onboarding', description: 'Momento profissional, faturamento, experiencia IA, como conheceu Davi', type: 'form' },
      },
      {
        id: 'ah-comunidade',
        type: 'funnel',
        position: { x: 0, y: 310 },
        data: { label: 'Comunidade', description: 'Grupo de alunos ativos', type: 'action' },
      },
      {
        id: 'ah-conteudo',
        type: 'funnel',
        position: { x: 250, y: 310 },
        data: { label: 'Conteudo do Programa', description: 'Estrategias de vendas de servicos de IA', type: 'program' },
      },
      {
        id: 'ah-nurture',
        type: 'funnel',
        position: { x: 500, y: 310 },
        data: { label: 'Email Nurture', description: 'Cases + resultados reais de alunos', type: 'email' },
      },
      {
        id: 'ah-upsell',
        type: 'funnel',
        position: { x: 100, y: 480 },
        data: { label: 'Upsell Formacao', description: 'Maquina de Automacoes', type: 'checkout', metric: 'R$997-R$1.489' },
      },
      {
        id: 'ah-mentoria',
        type: 'funnel',
        position: { x: 350, y: 480 },
        data: { label: 'Aplicacao Mentoria MDA', description: 'Formulario detalhado — objetivos, impedimentos, valores', type: 'form', metric: '~87 aplicacoes' },
      },
      {
        id: 'ah-reis',
        type: 'funnel',
        position: { x: 600, y: 480 },
        data: { label: 'Reis IA', description: 'Leads com faturamento alto → conversa', type: 'action', metric: '/agendar' },
      },
    ],
    edges: [
      { id: 'ah-e1', source: 'ah-seg', target: 'ah-form', ...e },
      { id: 'ah-e2', source: 'ah-form', target: 'ah-comunidade', ...e },
      { id: 'ah-e3', source: 'ah-form', target: 'ah-conteudo', ...e },
      { id: 'ah-e4', source: 'ah-form', target: 'ah-nurture', ...e },
      { id: 'ah-e5', source: 'ah-conteudo', target: 'ah-upsell', label: 'upgrade', ...e },
      { id: 'ah-e6', source: 'ah-nurture', target: 'ah-upsell', label: 'oferta', ...e },
      { id: 'ah-e7', source: 'ah-conteudo', target: 'ah-mentoria', label: 'alto engajamento', ...e },
      { id: 'ah-e8', source: 'ah-nurture', target: 'ah-mentoria', ...e },
      { id: 'ah-e9', source: 'ah-conteudo', target: 'ah-reis', label: 'qualificado', ...e },
      { id: 'ah-e10', source: 'ah-mentoria', target: 'ah-reis', label: 'alto potencial', ...e },
    ],
  },

  // ─── FUNNEL 3: FORMACAO MAQUINA DE AUTOMACOES (Davi Ribeiro — parceiro) ───
  {
    id: 'formacao',
    name: 'Formacao Maquina',
    description: 'Programa parceiro Davi — formacao tecnica avancada',
    ticket: 'R$997-R$1.489',
    color: '#A855F7',
    nodes: [
      {
        id: 'fm-seg',
        type: 'funnel',
        position: { x: 250, y: 0 },
        data: { label: 'Segmento: Formacao', description: 'Alunos Maquina de Automacoes', type: 'segment', metric: '~147 onboarding · ~98 LMS' },
      },
      {
        id: 'fm-form',
        type: 'funnel',
        position: { x: 250, y: 150 },
        data: { label: 'Formulario Onboarding', description: 'Momento profissional, faturamento, experiencia IA', type: 'form' },
      },
      {
        id: 'fm-conteudo',
        type: 'funnel',
        position: { x: 250, y: 310 },
        data: { label: 'Formacao Completa', description: 'N8N, Make, automacoes, agentes avancados', type: 'program' },
      },
      {
        id: 'fm-comunidade',
        type: 'funnel',
        position: { x: 0, y: 310 },
        data: { label: 'Comunidade', description: 'Grupo exclusivo formacao', type: 'action' },
      },
      {
        id: 'fm-nurture',
        type: 'funnel',
        position: { x: 500, y: 310 },
        data: { label: 'Email Nurture', description: 'Cases avancados + ROI', type: 'email' },
      },
      {
        id: 'fm-mentoria',
        type: 'funnel',
        position: { x: 0, y: 480 },
        data: { label: 'Mentoria MDA', description: 'Aplicacao para mentoria intensiva', type: 'form', metric: '~35 ativos' },
      },
      {
        id: 'fm-mda-black',
        type: 'funnel',
        position: { x: 250, y: 480 },
        data: { label: 'Imersao MDA Black', description: 'Evento VIP exclusivo — ja faturam com IA', type: 'program', metric: '~23 leads VIP' },
      },
      {
        id: 'fm-presencial',
        type: 'funnel',
        position: { x: 500, y: 480 },
        data: { label: 'Mentoria Presencial SP', description: 'Aplicacao — WTP R$1k-R$5k', type: 'form', metric: '~51 aplicacoes' },
      },
      {
        id: 'fm-builder',
        type: 'funnel',
        position: { x: 100, y: 640 },
        data: { label: 'Reis IA Builder', description: 'Mentoria individual premium', type: 'checkout', metric: 'High ticket' },
      },
      {
        id: 'fm-systems',
        type: 'funnel',
        position: { x: 400, y: 640 },
        data: { label: 'Reis IA Systems', description: 'Implementacao done-for-you', type: 'checkout', metric: 'High ticket' },
      },
      {
        id: 'fm-agendar',
        type: 'funnel',
        position: { x: 250, y: 790 },
        data: { label: 'Agenda Conversa', description: 'Call estrategica com equipe Reis IA', type: 'action', metric: '/agendar' },
      },
    ],
    edges: [
      { id: 'fm-e1', source: 'fm-seg', target: 'fm-form', ...e },
      { id: 'fm-e2', source: 'fm-form', target: 'fm-conteudo', ...e },
      { id: 'fm-e3', source: 'fm-form', target: 'fm-comunidade', ...e },
      { id: 'fm-e4', source: 'fm-form', target: 'fm-nurture', ...e },
      { id: 'fm-e5', source: 'fm-conteudo', target: 'fm-mentoria', label: 'alto engajamento', ...e },
      { id: 'fm-e6', source: 'fm-conteudo', target: 'fm-mda-black', label: 'ja fatura', ...e },
      { id: 'fm-e7', source: 'fm-nurture', target: 'fm-presencial', label: 'interesse premium', ...e },
      { id: 'fm-e8', source: 'fm-mentoria', target: 'fm-builder', label: 'perfil builder', ...e },
      { id: 'fm-e9', source: 'fm-mda-black', target: 'fm-systems', label: 'precisa escala', ...e },
      { id: 'fm-e10', source: 'fm-presencial', target: 'fm-builder', ...e },
      { id: 'fm-e11', source: 'fm-presencial', target: 'fm-systems', ...e },
      { id: 'fm-e12', source: 'fm-mda-black', target: 'fm-builder', ...e },
      { id: 'fm-e13', source: 'fm-builder', target: 'fm-agendar', ...e },
      { id: 'fm-e14', source: 'fm-systems', target: 'fm-agendar', ...e },
    ],
  },

  // ─── FUNNEL 4: LEAD MAGNETS & INTAKE GERAL ───
  {
    id: 'lead-magnets',
    name: 'Lead Magnets',
    description: 'Formularios de captura e lead magnets topo de funil',
    ticket: 'Gratuito',
    color: '#50C878',
    nodes: [
      {
        id: 'lm-agente',
        type: 'funnel',
        position: { x: 250, y: 0 },
        data: { label: 'Lead Magnet: Agente IA Vendedor', description: 'Responda perguntas → ganhe um agente', type: 'page', metric: '~64 leads' },
      },
      {
        id: 'lm-conhecer',
        type: 'funnel',
        position: { x: 0, y: 0 },
        data: { label: 'Quero te Conhecer', description: 'Intake geral Davi — YouTube dominante', type: 'form', metric: '~291 leads' },
      },
      {
        id: 'lm-pedro',
        type: 'funnel',
        position: { x: 500, y: 0 },
        data: { label: 'Pedro Goiozo', description: 'Consultoria IA — audiencia ampla (19-63 anos)', type: 'form', metric: '~36 leads' },
      },
      {
        id: 'lm-qualify',
        type: 'funnel',
        position: { x: 250, y: 160 },
        data: { label: 'Qualificacao', description: 'Faturamento, experiencia, ja fatura com IA', type: 'form' },
      },
      {
        id: 'lm-seg-zero',
        type: 'funnel',
        position: { x: 0, y: 330 },
        data: { label: 'Perfil: Iniciante', description: 'R$0-R$10k, CLT, transicao de carreira', type: 'segment' },
      },
      {
        id: 'lm-seg-mid',
        type: 'funnel',
        position: { x: 250, y: 330 },
        data: { label: 'Perfil: Intermediario', description: 'R$10k-R$50k, freelancer, pequena agencia', type: 'segment' },
      },
      {
        id: 'lm-seg-high',
        type: 'funnel',
        position: { x: 500, y: 330 },
        data: { label: 'Perfil: Avancado', description: 'R$50k+, empresario, ja fatura com IA', type: 'segment' },
      },
      {
        id: 'lm-to-mdv',
        type: 'funnel',
        position: { x: 0, y: 490 },
        data: { label: 'Funil Agente Lucrativo', description: 'Oferta tripwire R$10', type: 'checkout', metric: 'R$10' },
      },
      {
        id: 'lm-to-hunters',
        type: 'funnel',
        position: { x: 250, y: 490 },
        data: { label: 'Funil AI Hunters', description: 'Programa vendas de IA', type: 'checkout', metric: 'R$397' },
      },
      {
        id: 'lm-to-reis',
        type: 'funnel',
        position: { x: 500, y: 490 },
        data: { label: 'Reis IA Direto', description: 'Conversa high ticket', type: 'action', metric: '/agendar' },
      },
    ],
    edges: [
      { id: 'lm-e1', source: 'lm-agente', target: 'lm-qualify', ...e },
      { id: 'lm-e2', source: 'lm-conhecer', target: 'lm-qualify', ...e },
      { id: 'lm-e3', source: 'lm-pedro', target: 'lm-qualify', ...e },
      { id: 'lm-e4', source: 'lm-qualify', target: 'lm-seg-zero', label: '0-10k', ...e },
      { id: 'lm-e5', source: 'lm-qualify', target: 'lm-seg-mid', label: '10k-50k', ...e },
      { id: 'lm-e6', source: 'lm-qualify', target: 'lm-seg-high', label: '50k+', ...e },
      { id: 'lm-e7', source: 'lm-seg-zero', target: 'lm-to-mdv', ...e },
      { id: 'lm-e8', source: 'lm-seg-mid', target: 'lm-to-hunters', ...e },
      { id: 'lm-e9', source: 'lm-seg-high', target: 'lm-to-reis', ...e },
      { id: 'lm-e10', source: 'lm-seg-mid', target: 'lm-to-mdv', ...e },
      { id: 'lm-e11', source: 'lm-seg-zero', target: 'lm-to-hunters', label: 'engajou', ...e },
    ],
  },
]

// ─── OVERVIEW: ECOSSISTEMA COMPLETO ───
export const overviewNodes: Node[] = [
  // TRAFEGO
  {
    id: 'ov-ads',
    type: 'funnel',
    position: { x: 0, y: 0 },
    data: { label: 'Anuncios Pagos', description: 'Meta, Google, YouTube — CBO campaigns', type: 'ad', metric: 'UTM tracked' },
  },
  {
    id: 'ov-org',
    type: 'funnel',
    position: { x: 280, y: 0 },
    data: { label: 'Organico', description: 'Instagram, YouTube, LinkedIn', type: 'ad' },
  },
  {
    id: 'ov-masterclass',
    type: 'funnel',
    position: { x: 560, y: 0 },
    data: { label: 'Masterclass ao Vivo', description: 'Evento gratuito Moroni', type: 'page', metric: '~165 leads' },
  },
  {
    id: 'ov-lead-magnets',
    type: 'funnel',
    position: { x: 840, y: 0 },
    data: { label: 'Lead Magnets', description: 'Agente IA gratis, intake forms', type: 'form', metric: '~391 leads' },
  },

  // CAPTURA
  {
    id: 'ov-mdv',
    type: 'funnel',
    position: { x: 140, y: 170 },
    data: { label: 'MDV — Maquina de Vendas', description: 'Tripwire Hotmart — produto Moroni', type: 'checkout', metric: 'R$10 · ~283 vendas' },
  },
  {
    id: 'ov-form-al',
    type: 'funnel',
    position: { x: 470, y: 170 },
    data: { label: 'Form Agente Lucrativo', description: 'Onboarding principal Moroni', type: 'form', metric: '~1.293 leads' },
  },

  // SEGMENTOS
  {
    id: 'ov-seg-al',
    type: 'funnel',
    position: { x: 0, y: 350 },
    data: { label: 'Agente Lucrativo', description: 'Base propria Moroni — produto + onboarding', type: 'segment', metric: 'R$10' },
  },
  {
    id: 'ov-seg-hunters',
    type: 'funnel',
    position: { x: 280, y: 350 },
    data: { label: 'AI Hunters', description: 'Programa Davi — vendas de IA', type: 'segment', metric: 'R$397 · ~127 leads' },
  },
  {
    id: 'ov-seg-formacao',
    type: 'funnel',
    position: { x: 560, y: 350 },
    data: { label: 'Formacao Maquina', description: 'Programa Davi — tecnico avancado', type: 'segment', metric: 'R$997+ · ~147 leads' },
  },
  {
    id: 'ov-seg-mentoria',
    type: 'funnel',
    position: { x: 840, y: 350 },
    data: { label: 'Mentoria MDA / VIP', description: 'MDA + Black + Presencial SP', type: 'segment', metric: '~161 aplicacoes' },
  },

  // NURTURE
  {
    id: 'ov-nurture',
    type: 'funnel',
    position: { x: 300, y: 520 },
    data: { label: 'Email Nurture', description: 'Sequencias segmentadas por perfil', type: 'email' },
  },
  {
    id: 'ov-qualify',
    type: 'funnel',
    position: { x: 620, y: 520 },
    data: { label: 'Qualificacao', description: 'Faturamento, experiencia, objetivo', type: 'form' },
  },

  // DESTINO FINAL
  {
    id: 'ov-builder',
    type: 'funnel',
    position: { x: 140, y: 690 },
    data: { label: 'Reis IA Builder', description: 'Mentoria individual premium', type: 'program', metric: 'High ticket' },
  },
  {
    id: 'ov-systems',
    type: 'funnel',
    position: { x: 470, y: 690 },
    data: { label: 'Reis IA Systems', description: 'Implementacao done-for-you', type: 'program', metric: 'High ticket' },
  },
  {
    id: 'ov-agendar',
    type: 'funnel',
    position: { x: 300, y: 850 },
    data: { label: 'Agenda Conversa', description: 'Call estrategica com equipe', type: 'action', metric: '/agendar' },
  },
]

export const overviewEdges: Edge[] = [
  // Trafego → Captura
  { id: 'ov-e1', source: 'ov-ads', target: 'ov-mdv', type: 'animated' },
  { id: 'ov-e2', source: 'ov-org', target: 'ov-mdv', type: 'animated' },
  { id: 'ov-e3', source: 'ov-masterclass', target: 'ov-form-al', type: 'animated', label: 'WhatsApp' },
  { id: 'ov-e4', source: 'ov-lead-magnets', target: 'ov-form-al', type: 'animated' },
  { id: 'ov-e5', source: 'ov-mdv', target: 'ov-form-al', type: 'animated', label: 'pos-compra' },

  // Captura → Segmentos
  { id: 'ov-e6', source: 'ov-form-al', target: 'ov-seg-al', type: 'animated' },
  { id: 'ov-e7', source: 'ov-form-al', target: 'ov-seg-hunters', type: 'animated', label: 'afiliado' },
  { id: 'ov-e8', source: 'ov-form-al', target: 'ov-seg-formacao', type: 'animated', label: 'afiliado' },

  // Upsell ladder
  { id: 'ov-e9', source: 'ov-seg-al', target: 'ov-seg-hunters', type: 'animated', label: 'upsell R$397' },
  { id: 'ov-e10', source: 'ov-seg-hunters', target: 'ov-seg-formacao', type: 'animated', label: 'upsell R$997+' },
  { id: 'ov-e11', source: 'ov-seg-formacao', target: 'ov-seg-mentoria', type: 'animated', label: 'aplicacao' },

  // Segmentos → Nurture/Qualify
  { id: 'ov-e12', source: 'ov-seg-al', target: 'ov-nurture', type: 'animated' },
  { id: 'ov-e13', source: 'ov-seg-hunters', target: 'ov-nurture', type: 'animated' },
  { id: 'ov-e14', source: 'ov-seg-formacao', target: 'ov-qualify', type: 'animated' },
  { id: 'ov-e15', source: 'ov-seg-mentoria', target: 'ov-qualify', type: 'animated' },

  // → Reis IA
  { id: 'ov-e16', source: 'ov-nurture', target: 'ov-builder', type: 'animated' },
  { id: 'ov-e17', source: 'ov-nurture', target: 'ov-systems', type: 'animated' },
  { id: 'ov-e18', source: 'ov-qualify', target: 'ov-builder', type: 'animated', label: 'perfil builder' },
  { id: 'ov-e19', source: 'ov-qualify', target: 'ov-systems', type: 'animated', label: 'perfil systems' },
  { id: 'ov-e20', source: 'ov-seg-mentoria', target: 'ov-builder', type: 'animated', label: 'direto' },
  { id: 'ov-e21', source: 'ov-seg-mentoria', target: 'ov-systems', type: 'animated', label: 'direto' },

  // → Agendar
  { id: 'ov-e22', source: 'ov-builder', target: 'ov-agendar', type: 'animated' },
  { id: 'ov-e23', source: 'ov-systems', target: 'ov-agendar', type: 'animated' },
]
