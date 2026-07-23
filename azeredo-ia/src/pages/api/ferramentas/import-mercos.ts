import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';
import { createServerClient } from '../../../lib/supabase-server';
import { importCarteira, type MercosFileInput } from '../../../lib/mercos-import';

export const prerender = false;

// POST /api/ferramentas/import-mercos
// { files: [{ nome, representada, rows }], dry_run: boolean }
// Todos os arquivos numa chamada (o agregado por contato atravessa marcas).
// dry_run=true → só o relatório; false → grava vínculos + status/vendedor.
export const POST: APIRoute = async ({ locals, request }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  let body: any;
  try { body = await request.json(); } catch {
    return json({ error: 'JSON inválido' }, 400);
  }

  const files = Array.isArray(body.files) ? body.files as MercosFileInput[] : [];
  if (files.length === 0) return json({ error: 'Nenhum arquivo enviado' }, 400);
  if (files.length > 40) return json({ error: 'Máximo de 40 arquivos por importação' }, 400);

  const totalRows = files.reduce((a, f) => a + (f.rows?.length || 0), 0);
  if (totalRows > 20000) return json({ error: 'Volume acima do suportado numa importação (20 mil linhas)' }, 400);

  try {
    const sb = createServerClient();
    const report = await importCarteira(sb, files, body.dry_run !== false);
    return json(report);
  } catch (e: any) {
    return json({ error: e.message || 'Falha na importação' }, 500);
  }
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } });
}
