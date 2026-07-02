import type { APIRoute } from 'astro';
import { requireAuth } from '../../../../lib/api-auth';
import { createServerClient } from '../../../../lib/supabase-server';
import { resolveAudience, type SegmentFilter } from '../../../../lib/campaign-audience';

export const prerender = false;

// GET /api/campaigns/[id]/preview?offset=0&limit=100
// Lista de disparo resolvida (mesma lógica do envio real): contatos únicos
// por telefone, já com inclusões/remoções manuais aplicadas.
// Retorna { count, duplicates, contacts: [{id, name, phone, cidade, manual}] }
export const GET: APIRoute = async ({ locals, params, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { id } = params;
  if (!id) return json({ error: 'id obrigatório' }, 400);

  const offset = Math.max(0, parseInt(url.searchParams.get('offset') || '0'));
  const limit  = Math.min(200, Math.max(1, parseInt(url.searchParams.get('limit') || '100')));

  const sb = createServerClient();

  const { data: campaign, error: campErr } = await sb
    .from('az_campaigns')
    .select('segment_filter')
    .eq('id', id)
    .single();

  if (campErr || !campaign) return json({ error: 'Campanha não encontrada' }, 404);

  const filter = (campaign.segment_filter || {}) as SegmentFilter;
  const { audience, error } = await resolveAudience(sb, filter);
  if (error || !audience) return json({ error: error || 'Falha ao resolver contatos' }, 500);

  const page = audience.contacts.slice(offset, offset + limit);

  return json({
    count: audience.contacts.length,
    duplicates: audience.duplicates.length,
    offset,
    contacts: page.map(c => ({
      id: c.id,
      name: c.nome_fantasia || c.razao_social || '—',
      phone: c.phone_primary,
      cidade: c.cidade,
      manual: !!c.manual,
    })),
    // compat: amostra usada por versões antigas do wizard
    sample: page.slice(0, 5).map(c => ({
      name: c.nome_fantasia || c.razao_social || '—',
      phone: c.phone_primary,
      cidade: c.cidade,
    })),
  });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
