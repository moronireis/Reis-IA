/**
 * GET /api/leads/cnpj-lookup?cnpj=00000000000000
 *
 * #4 (backlog GitHub 17/07): busca automática de dados da empresa pelo CNPJ
 * ao criar lead — mesma UX da busca por CEP. Fonte: BrasilAPI (dados da
 * Receita Federal, gratuito, sem chave), com fallback minhareceita.org.
 * Server-side para evitar CORS e não expor rate limits ao navegador.
 *
 * Retorna: { razao_social, nome_fantasia, situacao, ativa, telefone,
 *            endereco, cidade, estado, cep, cnae }
 */
import type { APIRoute } from 'astro';
import { requireAuth } from '../../../lib/api-auth';

export const prerender = false;

export const GET: APIRoute = async ({ locals, url }) => {
  const profile = requireAuth(locals as any);
  if (profile instanceof Response) return profile;

  const cnpj = (url.searchParams.get('cnpj') || '').replace(/\D/g, '');
  if (cnpj.length !== 14) return json({ error: 'CNPJ inválido — informe os 14 dígitos' }, 400);

  // 1ª tentativa: BrasilAPI
  try {
    const r = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {
      signal: AbortSignal.timeout(10_000),
      headers: { 'User-Agent': 'AzeredoIA/1.0' },
    });
    if (r.ok) {
      const d = await r.json();
      return json(normalize({
        razao_social: d.razao_social,
        nome_fantasia: d.nome_fantasia,
        situacao: d.descricao_situacao_cadastral,
        telefone: d.ddd_telefone_1,
        logradouro: d.logradouro, numero: d.numero, complemento: d.complemento,
        bairro: d.bairro, cep: d.cep,
        cidade: d.municipio, estado: d.uf,
        cnae: d.cnae_fiscal_descricao,
      }));
    }
    if (r.status === 404) return json({ error: 'CNPJ não encontrado na Receita' }, 404);
  } catch { /* cai para o fallback */ }

  // Fallback: minhareceita.org
  try {
    const r = await fetch(`https://minhareceita.org/${cnpj}`, {
      signal: AbortSignal.timeout(10_000),
      headers: { 'User-Agent': 'AzeredoIA/1.0' },
    });
    if (r.ok) {
      const d = await r.json();
      return json(normalize({
        razao_social: d.razao_social,
        nome_fantasia: d.nome_fantasia,
        situacao: d.descricao_situacao_cadastral,
        telefone: d.ddd_fax || (d.telefone1 ? `${d.ddd1 || ''}${d.telefone1}` : null),
        logradouro: d.logradouro, numero: d.numero, complemento: d.complemento,
        bairro: d.bairro, cep: d.cep,
        cidade: d.municipio, estado: d.uf,
        cnae: d.cnae_fiscal_descricao,
      }));
    }
    if (r.status === 404) return json({ error: 'CNPJ não encontrado na Receita' }, 404);
  } catch { /* sem fonte disponível */ }

  return json({ error: 'Serviços de consulta de CNPJ indisponíveis no momento — tente de novo em instantes' }, 502);
};

function normalize(d: any) {
  const situacao = String(d.situacao || '').toUpperCase() || null;
  const enderecoParts = [
    [d.logradouro, d.numero].filter(Boolean).join(', '),
    d.complemento || null,
    d.bairro || null,
    d.cep ? `CEP ${String(d.cep).replace(/^(\d{5})(\d{3})$/, '$1-$2')}` : null,
  ].filter(Boolean);
  return {
    razao_social: d.razao_social || null,
    nome_fantasia: d.nome_fantasia || null,
    situacao,
    ativa: situacao === 'ATIVA',
    telefone: d.telefone ? String(d.telefone).replace(/\D/g, '') : null,
    endereco: enderecoParts.join(' — ') || null,
    cidade: d.cidade || null,
    estado: d.estado || null,
    cnae: d.cnae || null,
  };
}

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
