import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const profile = locals.profile;
  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const supabase = createServerClient();
  const isAdmin = profile.role === 'admin';

  let query = supabase
    .from('mentorships')
    .select(`
      *,
      mentor:profiles!mentorships_mentor_id_fkey(id, full_name, avatar_url, role),
      mentee:profiles!mentorships_mentee_id_fkey(id, full_name, avatar_url, role, company)
    `)
    .order('created_at', { ascending: false });

  if (!isAdmin) {
    query = query.or(`mentor_id.eq.${profile.id},mentee_id.eq.${profile.id}`);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};
