import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ locals, params }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { id } = params;
  if (!id) return json({ error: 'id required' }, 400);

  const sb = createServerClient();

  const { data: contact, error } = await sb
    .from('az_contacts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !contact) return json({ error: 'Contact not found' }, 404);

  // Fetch brands
  const { data: cb } = await sb
    .from('az_contact_brands')
    .select('contact_id, vendedores, az_brands(id, name, slug)')
    .eq('contact_id', id);

  const brands = (cb || []).map((row: any) => ({
    ...row.az_brands,
    vendedores: row.vendedores,
  }));

  return json({ contact: { ...contact, brands } });
};

// PATCH /api/contacts/[id] — interim do A1a: edição manual de status enquanto
// a planilha de última compra da Tati não chega (destrava campanhas de
// reativação pontuais). Quando o dado real for importado, a derivação
// automática por ultima_compra_at substitui/atualiza este valor.
const VALID_STATUS = ['ativo', 'inativo_recente', 'inativo_antigo'];

export const PATCH: APIRoute = async ({ locals, params, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { id } = params;
  if (!id) return json({ error: 'id required' }, 400);

  let body: any;
  try { body = await request.json(); } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (body.status !== undefined) {
    if (!VALID_STATUS.includes(body.status)) {
      return json({ error: `status inválido — use: ${VALID_STATUS.join(', ')}` }, 400);
    }
    updates.status = body.status;
  }
  if (Object.keys(updates).length === 1) return json({ error: 'Nada para atualizar' }, 400);

  const sb = createServerClient();
  const { data, error } = await sb
    .from('az_contacts')
    .update(updates)
    .eq('id', id)
    .select('id, status')
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ contact: data });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
