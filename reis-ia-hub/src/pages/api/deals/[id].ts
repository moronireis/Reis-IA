import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';
import { requireAdmin } from '../../../lib/api-auth';
import { notifyAdmins } from '../../../lib/notifications';

export const PATCH: APIRoute = async ({ params, request, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();

  // Get current deal state before update (for stage change detection)
  const { data: current } = await supabase.from('deals').select('stage, title, value, type, contact_name').eq('id', params.id).single();

  const body = await request.json();
  const { data, error } = await supabase
    .from('deals')
    .update({ ...body, updated_at: new Date().toISOString(), last_activity: new Date().toISOString().split('T')[0] })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });

  // Notify on stage change
  if (body.stage && current && body.stage !== current.stage) {
    const stageLabels: Record<string, string> = {
      lead: 'Lead', qualified: 'Qualificado', proposal: 'Proposta',
      negotiation: 'Negociacao', won: 'Ganho', lost: 'Perdido',
    };
    notifyAdmins({
      type: 'system',
      title: body.stage === 'won' ? 'Deal ganho!' : 'Deal movido',
      body: `${data.title} → ${stageLabels[body.stage] || body.stage}${body.stage === 'won' ? ` — R$${data.value?.toLocaleString('pt-BR') || '0'}` : ''}`,
      link: '/admin/crm',
    });

    // Auto-create project when deal is won
    if (body.stage === 'won' && current.stage !== 'won') {
      const { data: project } = await supabase.from('projects').insert({
        name: data.title || 'Novo Projeto',
        type: data.type || 'systems',
        status: 'em_andamento',
        value: data.value || 0,
        progress: 0,
        description: `Projeto criado automaticamente a partir do deal "${data.title}" — ${data.contact_name || 'sem contato'}`,
      }).select('id').single();

      if (project) {
        notifyAdmins({
          type: 'project_update',
          title: 'Projeto criado',
          body: `Projeto "${data.title}" criado automaticamente do deal ganho`,
          link: `/projects/${project.id}`,
        });
      }
    }
  }

  return new Response(JSON.stringify(data), { status: 200 });
};

export const DELETE: APIRoute = async ({ params, locals }) => {
  const auth = requireAdmin(locals);
  if (auth instanceof Response) return auth;

  const supabase = createServerClient();
  const { error } = await supabase.from('deals').delete().eq('id', params.id);

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  return new Response(null, { status: 204 });
};
