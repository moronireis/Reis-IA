import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';
import { requireAdmin } from '../../../lib/api-auth';
import { notifyAdmins } from '../../../lib/notifications';

export const GET: APIRoute = async ({ locals }) => {
  const profile = requireAdmin(locals);
  if (profile instanceof Response) return profile;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const body = await request.json();
  const { data, error } = await supabase
    .from('deals')
    .insert({ ...body, last_activity: new Date().toISOString().split('T')[0] })
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  notifyAdmins({
    type: 'system',
    title: 'Novo deal',
    body: `${data.title} — R$${data.value?.toLocaleString('pt-BR') || '0'}`,
    link: '/admin/crm',
  });

  return new Response(JSON.stringify(data), { status: 201 });
};
