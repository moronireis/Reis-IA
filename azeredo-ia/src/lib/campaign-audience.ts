/**
 * Resolução da audiência de uma campanha de disparo.
 * Fonte única usada pelo preview (lista no wizard) e pelo send (fila real) —
 * o que a Tati vê na lista é exatamente o que o worker dispara.
 *
 * segment_filter suportado:
 *   brand_ids[]  — vínculo via az_contact_brands
 *   cidade / estado / segmento (ilike; '__sem__' = segmento nulo) / tags[]
 *   status (legado, single) / status_in[] (multi — tem precedência)
 *   vendedor / vendedor_in[] — corta por vendedor_efetivo: o vendedor da
 *     carteira da(s) representada(s) selecionada(s), com fallback para
 *     vendedor_principal (14% dos clientes têm vendedor diferente por marca)
 *   include_ids[] — contatos adicionados manualmente (fora do filtro)
 *   exclude_ids[] — contatos removidos manualmente da lista
 *   manual_only   — lista montada do zero: ignora filtros, só include_ids
 */
import { createServerClient } from './supabase-server';
import { normalizePhone } from './whatsapp/send';

type SB = ReturnType<typeof createServerClient>;

export interface SegmentFilter {
  brand_ids?: string[];
  cidade?: string;
  estado?: string;
  segmento?: string;
  status?: string;      // legado: campanhas antigas salvaram single-select
  status_in?: string[];
  vendedor?: string;        // legado: single-select (Fase 1 do M3)
  vendedor_in?: string[];   // multi-select (F1 checkpoint 10/07 — tem precedência)
  split_por_vendedor?: boolean; // dispara pela instância do vendedor de cada contato
  split_child?: boolean;        // campanha-filha gerada pelo split (lista manual)
  tags?: string[];
  include_ids?: string[];
  exclude_ids?: string[];
  manual_only?: boolean;
}

export interface AudienceContact {
  id: string;
  nome_fantasia: string | null;
  razao_social: string | null;
  phone_primary: string;
  cidade: string | null;
  estado: string | null;
  contato: string | null;
  segmento: string | null;
  vendedor_principal: string | null;
  vendedor_efetivo: string | null; // vendedor da carteira da(s) marca(s) selecionada(s) ?? vendedor_principal
  manual?: boolean; // veio de include_ids (adicionado à mão)
}

export interface Audience {
  contacts: AudienceContact[];                                  // únicos por telefone, ordem estável
  duplicates: { contact: AudienceContact; dupOf: string }[];    // mesmo telefone de outro contato
  // Partição por vendedor_efetivo ANTES do corte vendedor_in — alimenta o
  // seletor de números do wizard (desmarcar um vendedor não some a linha).
  porVendedor: { vendedor: string | null; count: number }[];
}

const PAGE = 1000;      // Supabase trunca queries em 1000 linhas
const ID_CHUNK = 200;   // .in() com milhares de UUIDs estoura o limite de URL

const SELECT = 'id, nome_fantasia, razao_social, phone_primary, cidade, estado, contato, segmento, vendedor_principal';

export async function resolveAudience(
  sb: SB,
  filter: SegmentFilter
): Promise<{ audience: Audience | null; error: string | null }> {
  const { brand_ids, cidade, estado, segmento, status, status_in, vendedor, vendedor_in, tags, include_ids, exclude_ids, manual_only } = filter;

  const statusIn = (status_in && status_in.length > 0) ? status_in : (status ? [status] : null);
  // multi-select tem precedência; `vendedor` single é legado (rascunhos antigos)
  const vendedorIn = (vendedor_in && vendedor_in.length > 0) ? vendedor_in : (vendedor ? [vendedor] : null);

  const applyFilters = (query: any) => {
    // vendedor NÃO entra no SQL: o corte é em memória sobre vendedor_efetivo,
    // que depende da carteira da(s) marca(s) selecionada(s)
    if (cidade)                  query = query.ilike('cidade', `%${cidade}%`);
    if (estado)                  query = query.ilike('estado', `%${estado}%`);
    if (segmento === '__sem__')  query = query.is('segmento', null);
    else if (segmento)           query = query.ilike('segmento', `%${segmento}%`);
    if (statusIn)                query = query.in('status', statusIn);
    if (tags && tags.length > 0) query = query.contains('tags', tags);
    return query;
  };

  try {
    // 1. Filtro de marcas → conjunto de contact_ids + vendedor da carteira
    //    por contato (entre 2+ marcas selecionadas vence a compra mais
    //    recente; empate de data → ordem alfabética, para ser determinístico)
    let contactIds: string[] | null = null;
    const carteira = new Map<string, { vendedor: string; date: string }>();
    if (!manual_only && brand_ids && brand_ids.length > 0) {
      const idSet = new Set<string>();
      for (let from = 0; ; from += PAGE) {
        const { data: cb, error: cbErr } = await sb
          .from('az_contact_brands')
          .select('contact_id, vendedor, ultima_compra_at')
          .in('brand_id', brand_ids)
          .range(from, from + PAGE - 1);
        if (cbErr) return { audience: null, error: cbErr.message };
        for (const r of (cb || []) as any[]) {
          idSet.add(r.contact_id as string);
          if (r.vendedor) {
            const cur = carteira.get(r.contact_id);
            const date = r.ultima_compra_at || '';
            if (!cur || date > cur.date || (date === cur.date && r.vendedor < cur.vendedor)) {
              carteira.set(r.contact_id, { vendedor: r.vendedor, date });
            }
          }
        }
        if (!cb || cb.length < PAGE) break;
      }
      contactIds = [...idSet];
    }

    const withVendedor = (c: any): AudienceContact => ({
      ...c,
      vendedor_efetivo: carteira.get(c.id)?.vendedor ?? c.vendedor_principal ?? null,
    });

    // 2. Contatos do filtro (paginado)
    const filtered: AudienceContact[] = [];
    if (manual_only) {
      // lista manual: nada vem do filtro — só os include_ids (passo 4)
    } else if (contactIds && contactIds.length === 0) {
      // marca selecionada sem nenhum vínculo — segue só com os manuais
    } else if (contactIds) {
      for (let i = 0; i < contactIds.length; i += ID_CHUNK) {
        const { data, error } = await applyFilters(
          sb.from('az_contacts')
            .select(SELECT)
            .not('phone_primary', 'is', null)
            .in('id', contactIds.slice(i, i + ID_CHUNK))
        );
        if (error) return { audience: null, error: error.message };
        filtered.push(...(data || []));
      }
    } else {
      for (let from = 0; ; from += PAGE) {
        const { data, error } = await applyFilters(
          sb.from('az_contacts')
            .select(SELECT)
            .not('phone_primary', 'is', null)
            .order('id', { ascending: true })
            .range(from, from + PAGE - 1)
        );
        if (error) return { audience: null, error: error.message };
        filtered.push(...(data || []));
        if (!data || data.length < PAGE) break;
      }
    }

    // 3. Remoções manuais + vendedor_efetivo
    const excludeSet = new Set(exclude_ids || []);
    let pool = (excludeSet.size > 0
      ? filtered.filter(c => !excludeSet.has(c.id))
      : filtered
    ).map(c => withVendedor(c));

    // 4. Adições manuais (fora do filtro; nunca sobrepostas pelo exclude)
    if (include_ids && include_ids.length > 0) {
      const already = new Set(pool.map(c => c.id));
      const missing = include_ids.filter(id => !already.has(id) && !excludeSet.has(id));
      for (let i = 0; i < missing.length; i += ID_CHUNK) {
        const { data, error } = await sb
          .from('az_contacts')
          .select(SELECT)
          .not('phone_primary', 'is', null)
          .in('id', missing.slice(i, i + ID_CHUNK));
        if (error) return { audience: null, error: error.message };
        (data || []).forEach((c: any) => pool.push({ ...withVendedor(c), manual: true }));
      }
      const includeSet = new Set(include_ids);
      pool = pool.map(c => includeSet.has(c.id) ? { ...c, manual: true } : c);
    }

    // 5. Ordem estável (nome) — partição e dedup compartilham a mesma ordem,
    //    para a lista do wizard bater com a fila
    pool.sort((a, b) =>
      (a.nome_fantasia || a.razao_social || '').localeCompare(b.nome_fantasia || b.razao_social || '', 'pt-BR')
    );

    // 6. Partição por vendedor_efetivo ANTES do corte vendedor_in — o
    //    seletor de números do wizard mostra todos os grupos, marcados ou não
    const porVendedor = partitionByVendedor(dedupByPhone(pool).contacts);

    // 7. Corte por vendedor (em memória; manuais continuam fora do filtro)
    const cut = vendedorIn
      ? pool.filter(c => c.manual || (c.vendedor_efetivo && vendedorIn.includes(c.vendedor_efetivo)))
      : pool;

    // 8. Dedup por telefone normalizado — cada número recebe uma única vez
    const { contacts, duplicates } = dedupByPhone(cut);

    return { audience: { contacts, duplicates, porVendedor }, error: null };
  } catch (e: any) {
    return { audience: null, error: e.message };
  }
}

function dedupByPhone(pool: AudienceContact[]): { contacts: AudienceContact[]; duplicates: Audience['duplicates'] } {
  const seen = new Map<string, string>();
  const contacts: AudienceContact[] = [];
  const duplicates: Audience['duplicates'] = [];
  for (const c of pool) {
    const phone = normalizePhone(c.phone_primary);
    const firstOwner = seen.get(phone);
    if (firstOwner) {
      duplicates.push({ contact: c, dupOf: firstOwner });
    } else {
      seen.set(phone, c.nome_fantasia || c.razao_social || phone);
      contacts.push(c);
    }
  }
  return { contacts, duplicates };
}

function partitionByVendedor(contacts: AudienceContact[]): Audience['porVendedor'] {
  const counts = new Map<string | null, number>();
  for (const c of contacts) {
    const v = c.vendedor_efetivo || null;
    counts.set(v, (counts.get(v) || 0) + 1);
  }
  return [...counts.entries()]
    .map(([vendedor, count]) => ({ vendedor, count }))
    .sort((a, b) => b.count - a.count);
}
