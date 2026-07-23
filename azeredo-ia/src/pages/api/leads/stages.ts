import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

// Estágios do funil de leads (F7): criar, renomear/recolorir, reordenar, excluir.
// POST   { name, color? }               → cria no fim
// PATCH  { id, name?, color?, is_won?, is_lost? } → edita um
// PATCH  { order: [id, id, ...] }       → reordena todos
// DELETE ?id=UUID                       → exclui (leads realocados p/ 1º estágio)
export const POST: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'JSON inválido' }, 400); }
  const name = String(body.name || '').trim();
  if (!name) return json({ error: 'Nome do estágio é obrigatório' }, 400);

  const sb = createServerClient();
  const { data: last } = await sb.from('az_lead_stages')
    .select('position').order('position', { ascending: false }).limit(1).maybeSingle();

  const { data, error } = await sb.from('az_lead_stages').insert({
    name,
    color: body.color || '#25D366',
    position: (last?.position ?? -1) + 1,
    is_won: body.is_won === true,
    is_lost: body.is_lost === true,
  }).select().single();
  if (error) return json({ error: error.message }, 500);
  return json({ stage: data }, 201);
};

export const PATCH: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'JSON inválido' }, 400); }

  const sb = createServerClient();

  // Reordenação em lote
  if (Array.isArray(body.order)) {
    for (let i = 0; i < body.order.length; i++) {
      await sb.from('az_lead_stages').update({ position: i }).eq('id', body.order[i]);
    }
    return json({ ok: true });
  }

  if (!body.id) return json({ error: 'id obrigatório' }, 400);
  const updates: Record<string, any> = {};
  if (body.name !== undefined)    updates.name = String(body.name).trim();
  if (body.color !== undefined)   updates.color = body.color;
  if (body.is_won !== undefined)  updates.is_won = body.is_won === true;
  if (body.is_lost !== undefined) updates.is_lost = body.is_lost === true;

  const { data, error } = await sb.from('az_lead_stages').update(updates).eq('id', body.id).select().single();
  if (error) return json({ error: error.message }, 500);
  return json({ stage: data });
};

export const DELETE: APIRoute = async ({ locals, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const id = url.searchParams.get('id');
  if (!id) return json({ error: 'id obrigatório' }, 400);

  const sb = createServerClient();
  const { data: stages } = await sb.from('az_lead_stages')
    .select('id').order('position', { ascending: true });
  if ((stages || []).length <= 1) return json({ error: 'O funil precisa de pelo menos 1 estágio' }, 400);

  // Realoca os leads para o primeiro estágio remanescente
  const target = (stages || []).find(s => s.id !== id);
  if (target) {
    await sb.from('az_leads').update({ stage_id: target.id }).eq('stage_id', id);
  }
  const { error } = await sb.from('az_lead_stages').delete().eq('id', id);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
