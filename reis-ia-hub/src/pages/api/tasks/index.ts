import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';
import { requireAdmin } from '../../../lib/api-auth';
import { notify } from '../../../lib/notifications';

export const GET: APIRoute = async ({ url, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();

  const category = url.searchParams.get('category');
  const priority = url.searchParams.get('priority');
  const tag = url.searchParams.get('tag');
  const search = url.searchParams.get('search');

  let query = supabase.from('tasks').select('*').order('created_at', { ascending: false });

  if (category) query = query.eq('category', category);
  if (priority) query = query.eq('priority', priority);
  if (tag) query = query.contains('tags', [tag]);
  if (search) query = query.ilike('title', `%${search}%`);

  const { data, error } = await query;

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(JSON.stringify(data), { status: 200 });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const body = await request.json();

  // Base insert (columns that always exist)
  const insert: Record<string, unknown> = {
    title: body.title,
    description: body.description ?? null,
    status: body.status ?? 'todo',
    priority: body.priority ?? 'medium',
    assignee_id: body.assignee_id ?? null,
    assignee_name: body.assignee_name ?? null,
    project_id: body.project_id ?? null,
    project_name: body.project_name ?? null,
    due_date: body.due_date ?? null,
  };

  // Extended columns (added via migration — may not exist yet)
  if (body.category) insert.category = body.category;
  if (body.tags && body.tags.length > 0) insert.tags = body.tags;
  if (body.notes) insert.notes = body.notes;
  if (body.due_time) insert.due_time = body.due_time;
  if (body.status === 'done') insert.completed_at = new Date().toISOString();

  let { data, error } = await supabase.from('tasks').insert(insert).select().single();

  // If fails (possibly missing columns), retry with base only
  if (error) {
    const baseInsert: Record<string, unknown> = {
      title: body.title,
      description: body.description ?? null,
      status: body.status ?? 'todo',
      priority: body.priority ?? 'medium',
      assignee_id: body.assignee_id ?? null,
      assignee_name: body.assignee_name ?? null,
      project_id: body.project_id ?? null,
      project_name: body.project_name ?? null,
      due_date: body.due_date ?? null,
    };
    const retry = await supabase.from('tasks').insert(baseInsert).select().single();
    if (retry.error) return new Response(JSON.stringify({ error: retry.error.message }), { status: 500 });
    data = retry.data;
  }

  if (!data) return new Response(JSON.stringify({ error: 'Failed to create task' }), { status: 500 });

  // Notify assignee if task is assigned to someone
  if (data.assignee_id) {
    notify({
      userId: data.assignee_id,
      type: 'task',
      title: 'Nova task atribuida',
      body: data.title,
      link: '/admin/tasks',
    });
  }

  return new Response(JSON.stringify(data), { status: 201 });
};
