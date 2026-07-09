import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

// GET /api/profiles — lista de usuários da plataforma (para o vínculo
// instância↔vendedor em Configurações). Leitura para qualquer autenticado;
// quem escreve o vínculo é o PATCH de /api/instances (admin).
export const GET: APIRoute = async ({ locals }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const sb = createServerClient();
  const { data, error } = await sb
    .from('az_profiles')
    .select('id, email, full_name, role, is_active')
    .order('full_name', { ascending: true });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ profiles: data || [] }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
