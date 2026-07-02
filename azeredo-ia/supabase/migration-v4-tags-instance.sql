-- ===========================================
-- AZEREDO IA — Migration v4
-- Campaign instance_id + Contact tags + u4digital seed
-- ===========================================

-- 1. Add instance_id to campaigns (which number sends the campaign)
alter table az_campaigns
  add column if not exists instance_id uuid references az_whatsapp_instances(id);

-- 2. Add tags array to contacts (for internal groups, e.g. "u4digital")
alter table az_contacts
  add column if not exists tags text[] default '{}';

create index if not exists idx_az_contacts_tags on az_contacts using gin(tags);

-- 3. Seed: u4digital internal test contacts
-- UPDATE the phone_primary values with real numbers before using for test campaigns
-- (guard por razao_social: cnpj é NULL nos seeds, então "on conflict (cnpj)"
--  nunca deduplica — re-rodar duplicaria os contatos)
insert into az_contacts (razao_social, nome_fantasia, phone_primary, cidade, estado, segmento, status, source, tags)
select v.razao_social, v.nome_fantasia, v.phone_primary, v.cidade, v.estado, v.segmento, v.status, v.source, v.tags
from (values
  ('u4digital Moroni',  'Moroni Reis',   null::text, 'Santa Maria', 'RS', 'Interno', 'ativo', 'seed', ARRAY['u4digital']),
  ('u4digital Tiago',   'Tiago Donicht', null::text, 'Santa Maria', 'RS', 'Interno', 'ativo', 'seed', ARRAY['u4digital']),
  ('u4digital Teste 3', 'Teste 3',       null::text, 'Santa Maria', 'RS', 'Interno', 'ativo', 'seed', ARRAY['u4digital'])
) as v(razao_social, nome_fantasia, phone_primary, cidade, estado, segmento, status, source, tags)
where not exists (
  select 1 from az_contacts c where c.razao_social = v.razao_social
);
