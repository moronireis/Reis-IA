import type { APIRoute } from 'astro';
import { requireAuth } from '../../../../lib/api-auth';
import { createServerClient } from '../../../../lib/supabase-server';

export const prerender = false;

// POST /api/campaigns/[id]/cancel
// Interrompe um disparo em andamento. O lote em voo no worker (até ~12
// mensagens / ~40s) ainda termina; os demais pendentes ficam na fila e a
// campanha pode ser retomada depois via "Retomar" (POST /send).
export const POST: APIRoute = async ({ locals, params }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { id } = params;
  if (!id) return json({ error: 'id obrigatório' }, 400);

  const sb = createServerClient();

  // Write → read-back: a representação do update é filtrada pelos valores
  // NOVOS neste PostgREST, então update+select retornaria sempre vazio.
  const { error } = await sb
    .from('az_campaigns')
    .update({ status: 'cancelled', processing_until: null })
    .eq('id', id)
    .eq('status', 'sending');

  if (error) return json({ error: error.message }, 500);

  const { data: after } = await sb
    .from('az_campaigns')
    .select('status')
    .eq('id', id)
    .maybeSingle();

  if (!after) return json({ error: 'Campanha não encontrada' }, 404);
  if (after.status !== 'cancelled') {
    return json({ error: 'Campanha não está em disparo' }, 409);
  }

  return json({ ok: true });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
