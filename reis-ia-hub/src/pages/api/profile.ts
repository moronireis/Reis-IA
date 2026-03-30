import type { APIRoute } from 'astro';
import { createServerClient } from '../../lib/supabase-server';

export const PATCH: APIRoute = async ({ request, locals }) => {
  const user = locals.user;
  if (!user) {
    return new Response(JSON.stringify({ error: 'Não autenticado' }), { status: 401 });
  }

  const supabase = createServerClient();
  const body = await request.json();

  // Only allow updating safe fields
  const allowedFields = ['full_name', 'company', 'phone'];
  const updateData: Record<string, string> = { updated_at: new Date().toISOString() };
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};
