import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

// F7 (Checkpoint 10/07 atualizado): Módulo Leads.
// GET  /api/leads → { stages, leads } (funil completo numa chamada)
// POST /api/leads { nome*, contato, telefone, cnpj, cidade, segmentos[], stage_id?, notas }
export const GET: APIRoute = async ({ locals }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const sb = createServerClient();
  const [{ data: stages, error: e1 }, { data: leads, error: e2 }] = await Promise.all([
    sb.from('az_lead_stages').select('*').order('position', { ascending: true }),
    sb.from('az_leads').select('*').order('position', { ascending: true }).order('created_at', { ascending: true }),
  ]);
  if (e1 || e2) return json({ error: e1?.message || e2?.message }, 500);
  return json({ stages: stages || [], leads: leads || [] });
};

export const POST: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'JSON inválido' }, 400); }

  const nome = String(body.nome || '').trim();
  if (!nome) return json({ error: 'Nome é obrigatório' }, 400);

  const sb = createServerClient();

  // Estágio: o informado ou o primeiro do funil
  let stageId: string | null = body.stage_id || null;
  if (!stageId) {
    const { data: first } = await sb.from('az_lead_stages')
      .select('id').order('position', { ascending: true }).limit(1).maybeSingle();
    stageId = first?.id || null;
  }

  // Entra no fim da coluna
  const { data: last } = await sb.from('az_leads')
    .select('position').eq('stage_id', stageId)
    .order('position', { ascending: false }).limit(1).maybeSingle();

  const { data, error } = await sb.from('az_leads').insert({
    nome,
    contato: body.contato?.trim() || null,
    telefone: body.telefone?.trim() || null,
    cnpj: body.cnpj?.trim() || null,
    cidade: body.cidade?.trim() || null,
    estado: body.estado?.trim() || null,
    endereco: body.endereco?.trim() || null,
    situacao_receita: body.situacao_receita?.trim() || null,
    segmentos: Array.isArray(body.segmentos) ? body.segmentos.filter((s: any) => typeof s === 'string' && s.trim()).slice(0, 10) : [],
    notas: body.notas?.trim() || null,
    stage_id: stageId,
    position: (last?.position ?? -1) + 1,
    created_by: (profile as any).id || null,
  }).select().single();

  if (error) return json({ error: error.message }, 500);
  return json({ lead: data }, 201);
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
