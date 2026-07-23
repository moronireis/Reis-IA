import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

// PATCH /api/leads/[id] — campos, mover de estágio (stage_id/position) ou
//   { convert: true } → cria az_contacts a partir do lead (vira cliente).
// DELETE /api/leads/[id]
export const PATCH: APIRoute = async ({ locals, params, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { id } = params;
  if (!id) return json({ error: 'id obrigatório' }, 400);

  let body: any;
  try { body = await request.json(); } catch { return json({ error: 'JSON inválido' }, 400); }

  const sb = createServerClient();

  // Conversão lead → cliente (estágio ganho)
  if (body.convert === true) {
    const { data: lead } = await sb.from('az_leads').select('*').eq('id', id).maybeSingle();
    if (!lead) return json({ error: 'Lead não encontrado' }, 404);
    if (lead.contact_id) return json({ error: 'Este lead já virou cliente' }, 409);

    const { data: contact, error: cErr } = await sb.from('az_contacts').insert({
      razao_social: lead.nome,
      nome_fantasia: lead.nome,
      contato: lead.contato,
      phone_primary: lead.telefone,
      cnpj: lead.cnpj || null,
      cidade: lead.cidade,
      estado: lead.estado || 'RS',
      endereco: lead.endereco || null,
      segmento: (lead.segmentos || [])[0] || null,
      status: 'ativo',
      source: 'lead',
    }).select('id').single();
    if (cErr) {
      // CNPJ duplicado é o caso comum — mensagem amigável
      const msg = cErr.message.includes('duplicate') ? 'Já existe um contato com este CNPJ' : cErr.message;
      return json({ error: msg }, 409);
    }

    const { data: updated, error: uErr } = await sb.from('az_leads')
      .update({ contact_id: contact.id, updated_at: new Date().toISOString() })
      .eq('id', id).select().single();
    if (uErr) return json({ error: uErr.message }, 500);
    return json({ lead: updated, contact_id: contact.id });
  }

  const updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (body.nome !== undefined)      updates.nome = String(body.nome).trim();
  if (body.contato !== undefined)   updates.contato = body.contato?.trim() || null;
  if (body.telefone !== undefined)  updates.telefone = body.telefone?.trim() || null;
  if (body.cnpj !== undefined)      updates.cnpj = body.cnpj?.trim() || null;
  if (body.cidade !== undefined)    updates.cidade = body.cidade?.trim() || null;
  if (body.estado !== undefined)    updates.estado = body.estado?.trim() || null;
  if (body.endereco !== undefined)  updates.endereco = body.endereco?.trim() || null;
  if (body.situacao_receita !== undefined) updates.situacao_receita = body.situacao_receita?.trim() || null;
  if (body.notas !== undefined)     updates.notas = body.notas?.trim() || null;
  if (body.segmentos !== undefined) updates.segmentos = Array.isArray(body.segmentos) ? body.segmentos.filter((s: any) => typeof s === 'string' && s.trim()).slice(0, 10) : [];
  if (body.stage_id !== undefined)  updates.stage_id = body.stage_id || null;
  if (body.position !== undefined)  updates.position = Number(body.position) || 0;

  const { data, error } = await sb.from('az_leads').update(updates).eq('id', id).select().single();
  if (error) return json({ error: error.message }, 500);
  return json({ lead: data });
};

export const DELETE: APIRoute = async ({ locals, params }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const { id } = params;
  if (!id) return json({ error: 'id obrigatório' }, 400);

  const sb = createServerClient();
  const { error } = await sb.from('az_leads').delete().eq('id', id);
  if (error) return json({ error: error.message }, 500);
  return json({ ok: true });
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
