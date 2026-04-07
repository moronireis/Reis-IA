import type { APIRoute } from 'astro';
import { createServerClient } from '../../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async ({ locals, url }) => {
  const profile = locals.profile;
  if (!profile?.id) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const supabase = createServerClient();
  const isAdmin = profile.role === 'admin';

  // Admin: ?all=true to list all journeys, ?student_id= for specific student
  const showAll = isAdmin && url.searchParams.get('all') === 'true';
  const studentId = isAdmin ? url.searchParams.get('student_id') : profile.id;

  let query = supabase
    .from('student_journeys')
    .select(`
      *,
      student:profiles!student_journeys_student_id_fkey(id, full_name, avatar_url, email),
      phases:student_journey_phases(
        id, title, sort_order, status
      )
    `)
    .order('created_at', { ascending: false });

  if (!showAll) {
    query = query.eq('student_id', studentId || profile.id);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify(data), { status: 200 });
};
