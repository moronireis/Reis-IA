-- Seed Tasks: REIS IA real project tasks
-- Run in Supabase SQL Editor

INSERT INTO tasks (title, description, status, priority, category, project_name, assignee_name, due_date, tags, notes, completed_at, created_at) VALUES

-- reis-ia-hub (this platform)
('Modulo Tasks - mini dashboard + calendario urgencia', 'Adicionar mini dash de progresso e cores de urgencia no calendario', 'in_progress', 'high', 'systems', 'reis-ia-hub', 'Moroni', CURRENT_DATE + INTERVAL '1 day', ARRAY['hub', 'frontend'], NULL, NULL, NOW() - INTERVAL '2 days'),
('CRM pipeline - melhorias drag-and-drop', 'Refinar interacoes de arrastar e soltar no board CRM', 'todo', 'medium', 'systems', 'reis-ia-hub', 'Moroni', CURRENT_DATE + INTERVAL '10 days', ARRAY['hub', 'crm'], NULL, NULL, NOW() - INTERVAL '3 days'),
('Webhook integration Stripe', 'Conectar Stripe para pagamentos e assinaturas no Hub', 'todo', 'high', 'systems', 'reis-ia-hub', 'Moroni', CURRENT_DATE + INTERVAL '10 days', ARRAY['payments', 'hub'], NULL, NULL, NOW() - INTERVAL '1 day'),
('Documentacao API endpoints', 'Documentar todas as 42 API routes do Hub', 'todo', 'low', 'systems', 'reis-ia-hub', 'Moroni', CURRENT_DATE + INTERVAL '30 days', ARRAY['docs', 'hub'], NULL, NULL, NOW() - INTERVAL '5 days'),
('Setup Supabase RLS policies audit', 'Auditoria completa de Row Level Security em todas as tabelas', 'done', 'urgent', 'systems', 'reis-ia-hub', 'Moroni', CURRENT_DATE - INTERVAL '3 days', ARRAY['security', 'hub'], NULL, NOW() - INTERVAL '1 day', NOW() - INTERVAL '7 days'),
('Favicon hourglass - ajuste stroke', 'Favicon com ampulheta stroke mais fino (7 para 4.5)', 'done', 'medium', 'systems', 'reis-ia-hub', 'Moroni', CURRENT_DATE - INTERVAL '5 days', ARRAY['hub', 'brand'], NULL, NOW() - INTERVAL '5 days', NOW() - INTERVAL '6 days'),

-- reis-ia-website
('SEO meta tags e Open Graph', 'Configurar meta tags, OG images e structured data em todas as paginas', 'in_progress', 'medium', 'marketing', 'reis-ia-website', 'Moroni', CURRENT_DATE + INTERVAL '5 days', ARRAY['seo', 'website'], NULL, NULL, NOW() - INTERVAL '4 days'),
('Pagina de cases e depoimentos', 'Criar pagina com social proof - cases reais de clientes', 'todo', 'high', 'marketing', 'reis-ia-website', 'Moroni', CURRENT_DATE + INTERVAL '14 days', ARRAY['website', 'social-proof'], NULL, NULL, NOW() - INTERVAL '2 days'),
('Hero section - animacoes e copy final', 'Implementar animacoes do hero + copy aprovada pelo CMO', 'todo', 'medium', 'marketing', 'reis-ia-website', 'Moroni', CURRENT_DATE + INTERVAL '7 days', ARRAY['website', 'vfx'], NULL, NULL, NOW() - INTERVAL '3 days'),

-- reis-ia-brand
('Brandbook v2 - paleta expandida', 'Expandir sistema de cores para sub-brands (Builders, Systems)', 'todo', 'medium', 'builders', 'reis-ia-brand', 'Moroni', CURRENT_DATE + INTERVAL '21 days', ARRAY['brand', 'design'], NULL, NULL, NOW() - INTERVAL '5 days'),
('Review brandbook guidelines', 'Revisao final das guidelines de marca apos Protocolo Branding', 'done', 'low', 'builders', 'reis-ia-brand', 'Moroni', CURRENT_DATE - INTERVAL '4 days', ARRAY['brand', 'review'], NULL, NOW() - INTERVAL '4 days', NOW() - INTERVAL '10 days'),

-- reis-ia-funnels
('Landing page funil de mentoria', 'Criar LP alta conversao para captacao de mentorados', 'in_progress', 'urgent', 'marketing', 'reis-ia-funnels', 'Moroni', CURRENT_DATE + INTERVAL '2 days', ARRAY['funnels', 'conversao'], NULL, NULL, NOW() - INTERVAL '6 days'),
('A/B test headline principal', 'Testar 3 variacoes de headline na LP principal', 'todo', 'high', 'marketing', 'reis-ia-funnels', 'Moroni', CURRENT_DATE + INTERVAL '7 days', ARRAY['funnels', 'copy'], NULL, NULL, NOW() - INTERVAL '1 day'),

-- reis-ia-marketing
('Configurar analytics GA4 + GTM', 'Setup Google Analytics 4 e Tag Manager no site de marketing', 'todo', 'medium', 'systems', 'reis-ia-marketing', 'Moroni', CURRENT_DATE + INTERVAL '12 days', ARRAY['analytics', 'marketing'], NULL, NULL, NOW() - INTERVAL '3 days'),
('Email sequence pos-diagnostico', 'Criar sequencia de 5 emails apos quiz diagnostico', 'todo', 'high', 'marketing', 'reis-ia-marketing', 'Moroni', CURRENT_DATE + INTERVAL '5 days', ARRAY['email', 'automacao'], NULL, NULL, NOW() - INTERVAL '2 days'),

-- Educacional (sem projeto especifico)
('Gravar modulo 1 - Fundamentos IA para Negocios', 'Gravacao das 4 aulas do modulo 1 do curso low-ticket', 'in_progress', 'high', 'builders', NULL, 'Moroni', CURRENT_DATE + INTERVAL '8 days', ARRAY['educacional', 'video'], NULL, NULL, NOW() - INTERVAL '10 days'),
('Roteiro modulo 2 - Automacoes com IA', 'Briefing + roteiro completo das aulas do modulo 2', 'todo', 'medium', 'builders', NULL, 'Moroni', CURRENT_DATE + INTERVAL '15 days', ARRAY['educacional', 'roteiro'], NULL, NULL, NOW() - INTERVAL '3 days'),

-- Conteudo e Social Media
('Calendario editorial abril', 'Planejamento de conteudo completo para abril 2026', 'done', 'medium', 'marketing', NULL, 'Moroni', CURRENT_DATE - INTERVAL '7 days', ARRAY['conteudo', 'planning'], NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '14 days'),
('Posts LinkedIn semana 15', 'Criar e publicar 3 posts LinkedIn sobre IA para negocios', 'in_progress', 'medium', 'marketing', NULL, 'Moroni', CURRENT_DATE + INTERVAL '3 days', ARRAY['social', 'linkedin'], NULL, NULL, NOW() - INTERVAL '2 days'),
('Reels Instagram - IA no dia a dia', 'Gravar e editar 5 reels curtos sobre uso pratico de IA', 'todo', 'medium', 'marketing', NULL, 'Moroni', CURRENT_DATE + INTERVAL '6 days', ARRAY['social', 'instagram'], NULL, NULL, NOW() - INTERVAL '1 day'),
('Newsletter semanal #12', 'Escrever e enviar newsletter com insights da semana', 'todo', 'medium', 'marketing', NULL, 'Moroni', CURRENT_DATE + INTERVAL '4 days', ARRAY['email', 'newsletter'], NULL, NULL, NOW() - INTERVAL '1 day');
