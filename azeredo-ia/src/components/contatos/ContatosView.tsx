import { useState, useEffect, useCallback } from 'react';
import { Toast, useToast } from '../ui/Toast';
import { isLikelyLandline } from '../../lib/phone';

interface Brand { id: string; name: string; slug: string; }
interface Contact {
  id: string;
  razao_social: string;
  nome_fantasia: string | null;
  cnpj: string | null;
  phone_primary: string | null;
  cidade: string | null;
  estado: string | null;
  segmento: string | null;
  status: string;
  contato: string | null;
  tags: string[];
  vendedor_principal: string | null; // F6: vendedor do último pedido (carteira Mercos)
  brands: Brand[];
}

const STATUS_LABELS: Record<string, string> = {
  ativo: 'Ativo',
  inativo_recente: 'Inativo recente',
  inativo_antigo: 'Inativo antigo',
};
const STATUS_COLORS: Record<string, string> = {
  ativo: 'var(--green)',
  inativo_recente: 'var(--amber)',
  inativo_antigo: 'var(--red)',
};

const S = {
  root: { flex: 1, display: 'flex', flexDirection: 'column' as const, overflow: 'hidden', background: 'transparent' },
  header: { padding: '20px 24px 0', borderBottom: '1px solid var(--hairline)', flexShrink: 0 },
  headerTop: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' },
  title: { fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' },
  count: { fontSize: '13px', color: 'var(--text-muted)' },
  filters: { display: 'flex', gap: '10px', paddingBottom: '16px', flexWrap: 'wrap' as const },
  input: {
    background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)', borderRadius: '8px',
    color: 'var(--text-primary)', fontSize: '13px', padding: '7px 12px', outline: 'none',
    fontFamily: 'inherit',
  },
  select: {
    background: 'linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot))', border: '1px solid var(--hairline)', borderRadius: '8px',
    color: 'var(--text-primary)', fontSize: '13px', padding: '7px 12px', outline: 'none',
    fontFamily: 'inherit', cursor: 'pointer',
  },
  tableWrap: { flex: 1, overflow: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: '13px' },
  th: {
    padding: '10px 16px', textAlign: 'left' as const, fontSize: '11px',
    fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const,
    letterSpacing: '0.05em', borderBottom: '1px solid var(--hairline)',
    background: 'rgba(8, 12, 9, 0.92)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', position: 'sticky' as const, top: 0, zIndex: 1,
  },
  td: { padding: '11px 16px', borderBottom: '1px solid var(--hairline)', color: 'var(--text-secondary)', verticalAlign: 'middle' as const },
  tdPrimary: { padding: '11px 16px', borderBottom: '1px solid var(--hairline)', color: 'var(--text-primary)', fontWeight: 500, verticalAlign: 'middle' as const },
  badge: (color: string) => ({
    display: 'inline-flex', alignItems: 'center', padding: '2px 8px',
    borderRadius: '4px', fontSize: '11px', fontWeight: 500,
    background: color + '18', color, border: `1px solid ${color}33`,
  }),
  brandBadge: {
    display: 'inline-flex', alignItems: 'center', padding: '2px 7px',
    borderRadius: '4px', fontSize: '11px', fontWeight: 500, marginRight: '4px', marginBottom: '2px',
    background: 'rgba(37,211,102,0.1)', color: 'var(--accent-light)', border: '1px solid rgba(37,211,102,0.2)',
  },
  footer: {
    padding: '12px 24px', borderTop: '1px solid var(--hairline)', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
  },
  pageBtn: (disabled: boolean) => ({
    padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--hairline)',
    background: disabled ? 'transparent' : 'var(--border)', color: disabled ? 'var(--border)' : 'var(--text-primary)',
    fontSize: '12px', cursor: disabled ? 'default' : 'pointer', fontFamily: 'inherit',
  }),
  empty: { padding: '60px 24px', textAlign: 'center' as const, color: 'var(--text-muted)', fontSize: '14px' },
};

export default function ContatosView() {
  const { toasts, dismiss, success, error: showError } = useToast();
  const [savingStatusId, setSavingStatusId] = useState<string | null>(null);

  // Interim do A1a: edição manual de status (até a planilha de última compra
  // da Tati permitir a derivação automática)
  async function changeStatus(contact: Contact, status: string) {
    if (status === contact.status) return;
    setSavingStatusId(contact.id);
    try {
      const res = await fetch(`/api/contacts/${contact.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Erro ao atualizar status');
      setContacts(prev => prev.map(c => c.id === contact.id ? { ...c, status } : c));
      success(`Status de ${contact.nome_fantasia || contact.razao_social} → ${STATUS_LABELS[status]}`);
    } catch (e: any) {
      showError(e.message);
    } finally {
      setSavingStatusId(null);
    }
  }

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Filters
  const [q, setQ] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [cidadeFilter, setCidadeFilter] = useState('');
  const [segmentoFilter, setSegmentoFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [vendedorFilter, setVendedorFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');
  const [vendedores, setVendedores] = useState<{ vendedor: string; count: number }[]>([]);

  const LIMIT = 50;

  // Load brands for filter dropdown
  useEffect(() => {
    fetch('/api/brands')
      .then(r => r.json())
      .then(d => setBrands(d.brands || []))
      .catch(() => {});
    // F6: vendedores com contagem (mesma fonte do wizard de disparo)
    fetch('/api/contacts/segmentos')
      .then(r => r.json())
      .then(d => setVendedores(d.vendedores || []))
      .catch(() => {});
  }, []);

  const load = useCallback(async (p = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: String(LIMIT) });
      if (q)              params.set('q', q);
      if (brandFilter)    params.set('brand_id', brandFilter);
      if (cidadeFilter)   params.set('cidade', cidadeFilter);
      if (segmentoFilter) params.set('segmento', segmentoFilter);
      if (statusFilter)   params.set('status', statusFilter);
      if (vendedorFilter) params.set('vendedor', vendedorFilter);
      if (tagFilter)      params.set('tag', tagFilter);

      const res = await fetch(`/api/contacts?${params}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao carregar contatos');
      setContacts(data.contacts || []);
      setTotal(data.total || 0);
      setPage(p);
    } catch (e: any) {
      showError(e.message);
    } finally {
      setLoading(false);
    }
  }, [q, brandFilter, cidadeFilter, segmentoFilter, statusFilter, vendedorFilter, tagFilter, showError]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => load(1), 350);
    return () => clearTimeout(t);
  }, [load]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div style={S.root}>
      <Toast toasts={toasts} onDismiss={dismiss} />

      <div style={S.header}>
        <div style={S.headerTop}>
          <span style={S.title}>Contatos</span>
          <span style={S.count}>{total.toLocaleString('pt-BR')} registros</span>
        </div>
        <div style={S.filters}>
          <input
            style={{ ...S.input, width: '220px' }}
            placeholder="Buscar nome, CNPJ, contato..."
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <select style={S.select} value={brandFilter} onChange={e => setBrandFilter(e.target.value)}>
            <option value="">Todas as marcas</option>
            {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <input
            style={{ ...S.input, width: '140px' }}
            placeholder="Cidade"
            value={cidadeFilter}
            onChange={e => setCidadeFilter(e.target.value)}
          />
          <input
            style={{ ...S.input, width: '140px' }}
            placeholder="Segmento"
            value={segmentoFilter}
            onChange={e => setSegmentoFilter(e.target.value)}
          />
          <select style={S.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">Todos os status</option>
            <option value="ativo">Ativo</option>
            <option value="inativo_recente">Inativo recente</option>
            <option value="inativo_antigo">Inativo antigo</option>
          </select>
          {vendedores.length > 0 && (
            <select style={S.select} value={vendedorFilter} onChange={e => setVendedorFilter(e.target.value)}>
              <option value="">Todos os vendedores</option>
              {vendedores.map(v => (
                <option key={v.vendedor} value={v.vendedor}>{v.vendedor} ({v.count})</option>
              ))}
            </select>
          )}
          <button
            onClick={() => setTagFilter(t => t === 'u4digital' ? '' : 'u4digital')}
            style={{
              padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
              fontFamily: 'inherit', cursor: 'pointer', border: 'none', transition: 'all 0.12s',
              background: tagFilter === 'u4digital' ? 'var(--amber)' : 'rgba(251,191,36,0.12)',
              color: tagFilter === 'u4digital' ? '#000' : 'var(--amber)',
            }}
          >
            u4digital
          </button>
        </div>
      </div>

      <div style={S.tableWrap}>
        {loading ? (
          <div style={S.empty}>Carregando...</div>
        ) : contacts.length === 0 ? (
          <div style={S.empty}>Nenhum contato encontrado.</div>
        ) : (
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Nome Fantasia / Razão Social</th>
                <th style={S.th}>CNPJ</th>
                <th style={S.th}>Telefone</th>
                <th style={S.th}>Cidade</th>
                <th style={S.th}>Segmento</th>
                <th style={S.th}>Vendedor</th>
                <th style={S.th}>Marcas</th>
                <th style={S.th}>Tags</th>
                <th style={S.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(c => (
                <tr key={c.id} style={{ transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--border)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--bg-primary)')}
                >
                  <td style={S.tdPrimary}>
                    <div>{c.nome_fantasia || c.razao_social}</div>
                    {c.nome_fantasia && (
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>{c.razao_social}</div>
                    )}
                    {c.contato && (
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '1px' }}>{c.contato}</div>
                    )}
                  </td>
                  <td style={S.td}>{c.cnpj || '—'}</td>
                  <td style={S.td}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      {c.phone_primary || '—'}
                      {/* B1: fixo como fone principal → provável falha de disparo */}
                      {isLikelyLandline(c.phone_primary) && (
                        <span title="Número com cara de telefone fixo — provavelmente sem WhatsApp. Cadastre o celular do cliente para o disparo funcionar." style={{
                          fontSize: 9, fontWeight: 700, color: 'var(--amber)',
                          background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                          borderRadius: 100, padding: '1px 6px',
                        }}>
                          FIXO
                        </span>
                      )}
                    </span>
                  </td>
                  <td style={S.td}>{c.cidade ? `${c.cidade}/${c.estado || 'RS'}` : '—'}</td>
                  <td style={S.td}>{c.segmento || '—'}</td>
                  <td style={S.td}>{c.vendedor_principal || '—'}</td>
                  <td style={S.td}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                      {c.brands.length === 0 ? '—' : c.brands.map(b => (
                        <span key={b.id} style={S.brandBadge}>{b.name}</span>
                      ))}
                    </div>
                  </td>
                  <td style={S.td}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                      {(c.tags || []).length === 0 ? '—' : (c.tags || []).map(tag => (
                        <span key={tag} style={{
                          display: 'inline-flex', alignItems: 'center', padding: '2px 7px',
                          borderRadius: '4px', fontSize: '10px', fontWeight: 600,
                          background: 'rgba(251,191,36,0.12)', color: 'var(--amber)',
                          border: '1px solid rgba(251,191,36,0.25)',
                        }}>{tag}</span>
                      ))}
                    </div>
                  </td>
                  <td style={S.td}>
                    <select
                      value={c.status}
                      disabled={savingStatusId === c.id}
                      onChange={e => changeStatus(c, e.target.value)}
                      title="Status manual — será recalculado quando o dado de última compra for importado"
                      style={{
                        background: (STATUS_COLORS[c.status] || 'var(--text-secondary)') + '18',
                        color: STATUS_COLORS[c.status] || 'var(--text-secondary)',
                        border: `1px solid ${(STATUS_COLORS[c.status] || 'var(--text-secondary)')}33`,
                        borderRadius: '4px', fontSize: '11px', fontWeight: 500,
                        padding: '2px 6px', outline: 'none', fontFamily: 'inherit',
                        cursor: savingStatusId === c.id ? 'wait' : 'pointer',
                        opacity: savingStatusId === c.id ? 0.5 : 1,
                      }}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo_recente">Inativo recente</option>
                      <option value="inativo_antigo">Inativo antigo</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div style={S.footer}>
          <button style={S.pageBtn(page <= 1)} disabled={page <= 1} onClick={() => load(page - 1)}>
            Anterior
          </button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Página {page} de {totalPages}
          </span>
          <button style={S.pageBtn(page >= totalPages)} disabled={page >= totalPages} onClick={() => load(page + 1)}>
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
