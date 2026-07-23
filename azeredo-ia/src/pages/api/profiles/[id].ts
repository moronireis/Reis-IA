/**
 * PATCH /api/profiles/[id] — #18: administração de perfis de acesso.
 * Body: { role?: 'admin'|'operacional'|'vendedor'|'gerencia', is_active?: boolean }
 * Admin only. Protege contra remover o último admin ativo.
 */
import type { APIRoute } from 'astro';
import { requireAdmin } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

const ROLES = ['admin', 'operacional', 'vendedor', 'gerencia'];

export const PATCH: APIRoute = async ({ locals, params, request }) => {
  const profile = requireAdmin(locals as any);
  if (profile instanceof Response) return profile;

  const id = params.id;
  if (!id) return json({ error: 'id required' }, 400);

  let body: any;
  try { body = await request.json(); } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (body.role !== undefined) {
    if (!ROLES.includes(body.role)) return json({ error: `Papel inválido — use ${ROLES.join(', ')}` }, 400);
    updates.role = body.role;
  }
  if (body.is_active !== undefined) updates.is_active = !!body.is_active;
  if (Object.keys(updates).length === 1) return json({ error: 'Nada para atualizar' }, 400);

  const sb = createServerClient();

  // Nunca deixar a plataforma sem admin ativo
  const demoting = updates.role !== undefined && updates.role !== 'admin';
  const deactivating = updates.is_active === false;
  if (demoting || deactivating) {
    const { data: target } = await sb.from('az_profiles').select('id, role, is_active').eq('id', id).maybeSingle();
    if (target?.role === 'admin' && target?.is_active !== false) {
      const { count } = await sb
        .from('az_profiles')
        .select('id', { count: 'exact', head: true })
        .eq('role', 'admin')
        .eq('is_active', true);
      if ((count || 0) <= 1) return json({ error: 'Este é o último admin ativo — promova outro admin antes.' }, 400);
    }
  }

  const { data, error } = await sb
    .from('az_profiles')
    .update(updates)
    .eq('id', id)
    .select('id, email, full_name, role, is_active')
    .single();
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, profile: data });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
