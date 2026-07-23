/**
 * Importação da "Carteira detalhada de clientes" do Mercos (F8, Checkpoint
 * 10/07 atualizado). Port do núcleo de scripts/import-relacao-clientes.mjs —
 * validado em produção em 09/07 (2.731 linhas, 99,7% de match).
 *
 * O cliente (browser) parseia os .xls e envia { representada, rows } por
 * arquivo; TODOS os arquivos vêm numa chamada porque o agregado por contato
 * (melhor situação ENTRE marcas + vendedor do pedido mais recente) atravessa
 * arquivos. dry_run = simula e reporta sem gravar nada.
 */
import { createServerClient } from './supabase-server';

type SB = ReturnType<typeof createServerClient>;

export interface MercosFileInput {
  nome: string;          // nome do arquivo (para o relatório)
  representada: string;  // linha 4 do relatório ("Representada: X")
  rows: any[][];         // linhas de dados (a partir da linha 10), células 0..10
}

export interface ImportReport {
  arquivos: number;
  linhas: number;
  casadas: number;
  vinculos: number;
  contatos_atualizados: number;
  status_aplicados: Record<string, number>;
  marcas_sem_match: string[];
  nao_casadas: { arquivo: string; razao: string; cnpj: string | null; fone: string | null; situacao: string | null }[];
  dry_run: boolean;
}

const digits = (v: any) => String(v ?? '').replace(/\D/g, '');

const SITUACAO: Record<string, string> = {
  'ativo': 'ativo',
  'inativo recente': 'inativo_recente',
  'inativo antigo': 'inativo_antigo',
};
const RANK: Record<string, number> = { ativo: 3, inativo_recente: 2, inativo_antigo: 1 };

function parseDate(v: any): string | null {
  if (v === null || v === undefined || v === '') return null;
  if (typeof v === 'number') { // serial Excel
    const d = new Date(Math.round((v - 25569) * 86400 * 1000));
    return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
  }
  const m = String(v).trim().match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : null;
}

// telefone BR → candidatos p/ casar com o banco (com/sem 55, com/sem o 9)
function phoneCandidates(raw: any): string[] {
  let d = digits(raw).replace(/^0+/, '');
  if (!d) return [];
  if (d.length === 10 || d.length === 11) d = '55' + d;
  const out = new Set([d]);
  if (d.startsWith('55')) {
    if (d.length === 13 && d[4] === '9') out.add(d.slice(0, 4) + d.slice(5));
    if (d.length === 12) out.add(d.slice(0, 4) + '9' + d.slice(4));
  }
  return [...out];
}

async function loadAll(sb: SB, table: string, select: string): Promise<any[]> {
  const rows: any[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await sb.from(table).select(select).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    rows.push(...(data || []));
    if (!data || data.length < 1000) break;
  }
  return rows;
}

export async function importCarteira(
  sb: SB,
  files: MercosFileInput[],
  dryRun: boolean
): Promise<ImportReport> {
  const contacts = await loadAll(sb, 'az_contacts', 'id, cnpj, phone_primary, phones');
  const brands = await loadAll(sb, 'az_brands', 'id, name');

  const byCnpj = new Map<string, string>();
  const byPhone = new Map<string, string>();
  for (const c of contacts) {
    const d = digits(c.cnpj);
    if (d) byCnpj.set(d, c.id);
    for (const p of [c.phone_primary, ...((c.phones as string[]) || [])]) {
      for (const v of phoneCandidates(p)) if (!byPhone.has(v)) byPhone.set(v, c.id);
    }
  }

  const matchBrand = (rep: string) => {
    const r = rep.toLowerCase().replace(/\s+/g, ' ').trim();
    let b = brands.find((x: any) => x.name.toLowerCase() === r);
    if (!b) b = brands.find((x: any) => r.startsWith(x.name.toLowerCase()) || x.name.toLowerCase().startsWith(r));
    return b || null;
  };

  const links: any[] = [];
  const perContact = new Map<string, { best: string | null; lastDate: string | null; vendedor: string | null }>();
  const unmatched: ImportReport['nao_casadas'] = [];
  const brandMiss: string[] = [];
  let totalRows = 0;

  for (const f of files) {
    const brand = matchBrand(f.representada || '');
    if (!brand) { brandMiss.push(`${f.nome} → "${f.representada}"`); continue; }

    for (const r of f.rows || []) {
      if (!r?.[0]) continue;
      totalRows++;
      const cnpjD = digits(r[2]);
      let contactId = cnpjD ? byCnpj.get(cnpjD) : undefined;
      if (!contactId) {
        for (const v of phoneCandidates(r[3])) {
          const hit = byPhone.get(v);
          if (hit) { contactId = hit; break; }
        }
      }
      if (!contactId) {
        unmatched.push({ arquivo: f.nome, razao: String(r[0]), cnpj: r[2] ? String(r[2]) : null, fone: r[3] ? String(r[3]) : null, situacao: r[10] ? String(r[10]) : null });
        continue;
      }

      const situacao = SITUACAO[String(r[10] || '').toLowerCase().trim()] || null;
      const dataPedido = parseDate(r[5]);
      const vendedor = r[6] ? String(r[6]).trim() : null;

      links.push({
        contact_id: contactId,
        brand_id: brand.id,
        situacao,
        ultima_compra_at: dataPedido,
        vendedor,
        dias_sem_comprar: Number.isFinite(Number(r[8])) ? Math.round(Number(r[8])) : null,
        ciclo_medio_dias: Number.isFinite(Number(r[9])) ? Number(r[9]) : null,
        valor_ultimo_pedido: Number.isFinite(Number(r[7])) ? Number(r[7]) : null,
        ultimo_pedido_numero: r[4] ? String(r[4]) : null,
      });

      const agg = perContact.get(contactId) || { best: null, lastDate: null, vendedor: null };
      if (situacao && (!agg.best || RANK[situacao] > RANK[agg.best])) agg.best = situacao;
      if (dataPedido && (!agg.lastDate || dataPedido > agg.lastDate)) {
        agg.lastDate = dataPedido;
        if (vendedor) agg.vendedor = vendedor;
      } else if (!agg.vendedor && vendedor) {
        agg.vendedor = vendedor;
      }
      perContact.set(contactId, agg);
    }
  }

  // Dedupe contato×marca — fica a linha de pedido mais recente; empate → melhor situação
  const byPair = new Map<string, any>();
  for (const l of links) {
    const key = `${l.contact_id}|${l.brand_id}`;
    const cur = byPair.get(key);
    if (!cur) { byPair.set(key, l); continue; }
    const newer = (l.ultima_compra_at || '') > (cur.ultima_compra_at || '') ||
      ((l.ultima_compra_at || '') === (cur.ultima_compra_at || '') && (RANK[l.situacao] || 0) > (RANK[cur.situacao] || 0));
    if (newer) byPair.set(key, l);
  }
  const dedupedLinks = [...byPair.values()];

  const statusDist: Record<string, number> = {};
  for (const [, a] of perContact) {
    const st = a.best || 'inativo_antigo';
    statusDist[st] = (statusDist[st] || 0) + 1;
  }

  const report: ImportReport = {
    arquivos: files.length,
    linhas: totalRows,
    casadas: dedupedLinks.length,
    vinculos: dedupedLinks.length,
    contatos_atualizados: perContact.size,
    status_aplicados: statusDist,
    marcas_sem_match: brandMiss,
    nao_casadas: unmatched.slice(0, 500), // teto do relatório
    dry_run: dryRun,
  };

  if (dryRun) return report;

  // Grava az_contact_brands (upsert na unique contact_id+brand_id)
  for (let i = 0; i < dedupedLinks.length; i += 400) {
    const { error } = await sb.from('az_contact_brands')
      .upsert(dedupedLinks.slice(i, i + 400), { onConflict: 'contact_id,brand_id' });
    if (error) throw new Error(`Falha ao gravar vínculos: ${error.message}`);
  }

  // Agrega em az_contacts (status = melhor situação entre marcas)
  const updates = [...perContact.entries()];
  for (let i = 0; i < updates.length; i += 25) {
    await Promise.all(updates.slice(i, i + 25).map(([id, a]) =>
      sb.from('az_contacts')
        .update({
          status: a.best || 'inativo_antigo',
          ultima_compra_at: a.lastDate,
          vendedor_principal: a.vendedor,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
    ));
  }

  return report;
}
