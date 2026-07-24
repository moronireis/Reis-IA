import { useState, useCallback } from 'react';

interface Item {
  codigo: string;
  produto: string;
  unidade: string;
  qtde: string;
  preco_tabela: string;
  desc_pct: string;
}

interface Header {
  representada: string;
  representada_cnpj: string;
  cliente_nome: string;
  cliente_nome_fantasia: string;
  cliente_cnpj: string;
  cliente_ie: string;
  cliente_endereco: string;
  cliente_bairro: string;
  cliente_cep: string;
  cliente_cidade: string;
  cliente_estado: string;
  cliente_telefone: string;
  cliente_email: string;
  condicao_pagamento: string;
  data_emissao: string;
  vendedor: string;
  transportadora: string;
  observacoes: string;
}

const emptyHeader: Header = {
  representada: '', representada_cnpj: '',
  cliente_nome: '', cliente_nome_fantasia: '', cliente_cnpj: '', cliente_ie: '',
  cliente_endereco: '', cliente_bairro: '', cliente_cep: '',
  cliente_cidade: '', cliente_estado: 'RS',
  cliente_telefone: '', cliente_email: '',
  condicao_pagamento: '', data_emissao: new Date().toISOString().slice(0, 10),
  vendedor: 'AZEREDO REPRESENTAÇÕES', transportadora: '', observacoes: '',
};

const emptyItem = (): Item => ({ codigo: '', produto: '', unidade: 'Un', qtde: '1', preco_tabela: '', desc_pct: '0' });

function parseNum(v: string): number {
  return parseFloat(v.replace(',', '.')) || 0;
}

function fmtMoney(v: number): string {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calcItem(item: Item) {
  const qtde       = parseNum(item.qtde);
  const preco      = parseNum(item.preco_tabela);
  const desc       = parseNum(item.desc_pct);
  const liquido    = preco * (1 - desc / 100);
  const subtotal   = liquido * qtde;
  return { qtde, preco, desc, liquido, subtotal };
}

const S = {
  wrap: { padding: '28px 32px', maxWidth: 1040, margin: '0 auto' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 },
  grid4: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 16 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--hairline)' },
  field: { display: 'flex', flexDirection: 'column' as const, gap: 5 },
  fieldLabel: { fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.05em' },
  input: {
    background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 6,
    color: 'var(--text-primary)', fontSize: 13, padding: '8px 10px', outline: 'none',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' as const,
  },
  tableWrap: { overflowX: 'auto' as const, borderRadius: 8, border: '1px solid var(--hairline)', marginBottom: 12 },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 12 },
  th: { padding: '8px 10px', textAlign: 'left' as const, background: 'var(--bg-card-translucent)', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--hairline)', whiteSpace: 'nowrap' as const, fontSize: '11px' as const },
  td: { padding: '6px 6px', borderBottom: '1px solid var(--bg-secondary)', verticalAlign: 'middle' as const },
  tdInput: {
    background: 'transparent', border: '1px solid var(--hairline)', borderRadius: 5,
    color: 'var(--text-primary)', fontSize: 12, padding: '5px 7px', outline: 'none',
    fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' as const,
  },
  tdVal: { padding: '6px 10px', borderBottom: '1px solid var(--bg-secondary)', color: 'var(--text-secondary)', fontSize: 12, textAlign: 'right' as const, whiteSpace: 'nowrap' as const },
  addBtn: {
    padding: '7px 16px', borderRadius: 6, border: '1px solid var(--hairline)',
    background: 'var(--bg-card-translucent)', color: 'var(--accent-light)', fontSize: 12, fontWeight: 600,
    cursor: 'pointer', fontFamily: 'inherit',
  },
  removeBtn: {
    padding: '4px 8px', borderRadius: 4, border: 'none',
    background: 'color-mix(in srgb, var(--red) 12%, transparent)', color: 'var(--red)',
    cursor: 'pointer', fontSize: 11, fontFamily: 'inherit',
  },
  totalsBox: {
    background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 8,
    padding: '16px 20px', display: 'flex', flexDirection: 'column' as const, gap: 6, marginBottom: 24,
  },
  totalsRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  totalsLabel: { fontSize: 12, color: 'var(--text-muted)' },
  totalsVal: { fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'monospace' },
  totalsValBig: { fontSize: 15, color: 'var(--text-primary)', fontWeight: 700, fontFamily: 'monospace' },
  genBtn: (disabled: boolean) => ({
    padding: '11px 28px', borderRadius: 8, border: 'none', fontFamily: 'inherit',
    fontSize: 13, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? 'var(--border)' : 'var(--accent)', color: disabled ? 'var(--text-muted)' : '#fff',
  }),
};

function Field({ label, value, onChange, placeholder = '', type = 'text' }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <div style={S.field}>
      <span style={S.fieldLabel}>{label}</span>
      <input style={S.input} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)} />
    </div>
  );
}

export default function GerarPedido() {
  const [header, setHeader] = useState<Header>({ ...emptyHeader });
  const [items, setItems]   = useState<Item[]>([emptyItem()]);
  const [generating, setGenerating] = useState(false);

  const setH = useCallback((k: keyof Header) => (v: string) => setHeader(h => ({ ...h, [k]: v })), []);
  const setItem = useCallback((i: number, k: keyof Item) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setItems(it => it.map((row, idx) => idx === i ? { ...row, [k]: e.target.value } : row)), []);
  const addItem    = () => setItems(it => [...it, emptyItem()]);
  const removeItem = (i: number) => setItems(it => it.filter((_, idx) => idx !== i));

  const calcs    = items.map(calcItem);
  const qtdeTotal   = calcs.reduce((s, c) => s + c.qtde, 0);
  const totalTabela = calcs.reduce((s, c) => s + c.preco * c.qtde, 0);
  const totalDesc   = calcs.reduce((s, c) => s + (c.preco - c.liquido) * c.qtde, 0);
  const totalLiq    = calcs.reduce((s, c) => s + c.subtotal, 0);

  const canGenerate = header.representada.trim() && header.cliente_nome.trim() &&
    items.some(it => it.produto.trim() && parseNum(it.preco_tabela) > 0);

  const generate = async () => {
    if (!canGenerate) return;
    setGenerating(true);
    try {
      const { utils, writeFile } = await import('xlsx');

      const rows: any[][] = [];

      const money = (v: number) => `R$ ${fmtMoney(v)}`;
      const pct   = (v: number) => `${fmtMoney(v)}%`;

      // ── HEADER INFO ──
      rows.push(['PEDIDO DE VENDA', '', '', '', '', '', '', '', '']);
      rows.push([]);
      rows.push(['Representada:', header.representada, '', '', 'CNPJ:', header.representada_cnpj, '', '', '']);
      rows.push([]);
      rows.push(['DADOS DO CLIENTE']);
      rows.push(['Razão Social:', header.cliente_nome, '', 'Nome Fantasia:', header.cliente_nome_fantasia]);
      rows.push(['CNPJ/CPF:', header.cliente_cnpj, '', 'I.E.:', header.cliente_ie]);
      rows.push(['Endereço:', header.cliente_endereco, '', 'Bairro:', header.cliente_bairro]);
      rows.push(['CEP:', header.cliente_cep, '', 'Cidade/UF:', `${header.cliente_cidade}/${header.cliente_estado}`]);
      rows.push(['Telefone:', header.cliente_telefone, '', 'E-mail:', header.cliente_email]);
      rows.push([]);
      rows.push(['Condição de Pagamento:', header.condicao_pagamento, '', 'Data de Emissão:', header.data_emissao]);
      rows.push(['Vendedor:', header.vendedor, '', 'Transportadora:', header.transportadora]);
      if (header.observacoes) rows.push(['Observações:', header.observacoes]);
      rows.push([]);

      // ── ITEMS TABLE HEADER ──
      rows.push(['#', 'Código', 'Produto', 'Un.', 'Qtde.', 'Preço Tabela', 'Desc.%', 'Preço Líquido', 'Subtotal']);

      // ── ITEMS ──
      items.forEach((item, i) => {
        const c = calcs[i];
        if (!item.produto.trim()) return;
        rows.push([
          i + 1,
          item.codigo,
          item.produto,
          item.unidade,
          c.qtde,
          money(c.preco),
          pct(c.desc),
          money(c.liquido),
          money(c.subtotal),
        ]);
      });

      rows.push([]);

      // ── TOTALS ──
      rows.push(['', '', '', 'Qtde. Total:', qtdeTotal, 'Total (Tabela):', money(totalTabela), '', '']);
      rows.push(['', '', '', 'Total de Descontos:', '', '', money(totalDesc), '', '']);
      rows.push(['', '', '', 'Valor total em produtos:', '', '', money(totalLiq), '', '']);
      rows.push(['', '', '', 'IPI total:', '', '', money(0), '', '']);
      rows.push(['', '', '', 'VALOR TOTAL:', '', '', money(totalLiq), '', '']);

      const ws = utils.aoa_to_sheet(rows);

      // Column widths
      ws['!cols'] = [
        { wch: 5 },  // #
        { wch: 14 }, // Código
        { wch: 50 }, // Produto
        { wch: 6 },  // Un
        { wch: 7 },  // Qtde
        { wch: 16 }, // Preço Tabela
        { wch: 10 }, // Desc%
        { wch: 16 }, // Preço Líquido
        { wch: 16 }, // Subtotal
      ];

      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Pedido');

      const date = header.data_emissao.replace(/-/g, '');
      const clienteSlug = header.cliente_nome.slice(0, 20).replace(/\s+/g, '_');
      writeFile(wb, `pedido_${clienteSlug}_${date}.xlsx`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={S.wrap}>
      <div style={{ marginBottom: 24, fontSize: 13, color: 'var(--text-secondary)' }}>
        Preencha os dados do pedido e gere o arquivo no formato Mercos.
      </div>

      {/* Representada */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Representada</div>
        <div style={S.grid2}>
          <Field label="Nome da representada" value={header.representada} onChange={setH('representada')} placeholder="Ex: TOYNG" />
          <Field label="CNPJ" value={header.representada_cnpj} onChange={setH('representada_cnpj')} placeholder="00.000.000/0001-00" />
        </div>
      </div>

      {/* Cliente */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Cliente</div>
        <div style={S.grid2}>
          <Field label="Razão Social *" value={header.cliente_nome} onChange={setH('cliente_nome')} placeholder="Loja XYZ Ltda" />
          <Field label="Nome Fantasia" value={header.cliente_nome_fantasia} onChange={setH('cliente_nome_fantasia')} placeholder="Loja XYZ" />
        </div>
        <div style={S.grid3}>
          <Field label="CNPJ/CPF" value={header.cliente_cnpj} onChange={setH('cliente_cnpj')} placeholder="00.000.000/0001-00" />
          <Field label="Inscrição Estadual" value={header.cliente_ie} onChange={setH('cliente_ie')} placeholder="000/0000000" />
          <Field label="Telefone" value={header.cliente_telefone} onChange={setH('cliente_telefone')} placeholder="(51) 99999-9999" />
        </div>
        <div style={{ ...S.grid2, marginBottom: 16 }}>
          <Field label="E-mail" value={header.cliente_email} onChange={setH('cliente_email')} placeholder="contato@loja.com.br" />
          <Field label="Endereço" value={header.cliente_endereco} onChange={setH('cliente_endereco')} placeholder="Rua ..., 123" />
        </div>
        <div style={S.grid4}>
          <Field label="Bairro" value={header.cliente_bairro} onChange={setH('cliente_bairro')} />
          <Field label="CEP" value={header.cliente_cep} onChange={setH('cliente_cep')} placeholder="00000-000" />
          <Field label="Cidade" value={header.cliente_cidade} onChange={setH('cliente_cidade')} />
          <Field label="Estado" value={header.cliente_estado} onChange={setH('cliente_estado')} placeholder="RS" />
        </div>
      </div>

      {/* Pedido info */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Informações do Pedido</div>
        <div style={S.grid3}>
          <Field label="Condição de Pagamento" value={header.condicao_pagamento} onChange={setH('condicao_pagamento')} placeholder="28/35/42 DDL" />
          <Field label="Data de Emissão" value={header.data_emissao} onChange={setH('data_emissao')} type="date" />
          <Field label="Vendedor" value={header.vendedor} onChange={setH('vendedor')} />
        </div>
        <div style={S.grid2}>
          <Field label="Transportadora" value={header.transportadora} onChange={setH('transportadora')} placeholder="A combinar" />
          <Field label="Observações" value={header.observacoes} onChange={setH('observacoes')} placeholder="Informações adicionais..." />
        </div>
      </div>

      {/* Items */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Itens do Pedido</div>
        <div style={S.tableWrap}>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={{ ...S.th, width: 32 }}>#</th>
                <th style={{ ...S.th, width: 110 }}>Código</th>
                <th style={S.th}>Produto *</th>
                <th style={{ ...S.th, width: 60 }}>Unid.</th>
                <th style={{ ...S.th, width: 70 }}>Qtde.</th>
                <th style={{ ...S.th, width: 120 }}>Preço Tabela *</th>
                <th style={{ ...S.th, width: 80 }}>Desc. %</th>
                <th style={{ ...S.th, width: 120, textAlign: 'right' as const }}>Preço Líquido</th>
                <th style={{ ...S.th, width: 120, textAlign: 'right' as const }}>Subtotal</th>
                <th style={{ ...S.th, width: 40 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const c = calcs[i];
                return (
                  <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)' }}>
                    <td style={{ ...S.td, color: 'var(--text-faint)', textAlign: 'center' as const, fontSize: 11 }}>{i + 1}</td>
                    <td style={S.td}><input style={S.tdInput} value={item.codigo} onChange={setItem(i, 'codigo')} placeholder="REF" /></td>
                    <td style={S.td}><input style={{ ...S.tdInput, minWidth: 180 }} value={item.produto} onChange={setItem(i, 'produto')} placeholder="Nome do produto" /></td>
                    <td style={S.td}><input style={S.tdInput} value={item.unidade} onChange={setItem(i, 'unidade')} placeholder="Un" /></td>
                    <td style={S.td}><input style={S.tdInput} type="number" min="1" value={item.qtde} onChange={setItem(i, 'qtde')} /></td>
                    <td style={S.td}><input style={S.tdInput} value={item.preco_tabela} onChange={setItem(i, 'preco_tabela')} placeholder="0,00" /></td>
                    <td style={S.td}><input style={S.tdInput} value={item.desc_pct} onChange={setItem(i, 'desc_pct')} placeholder="0" /></td>
                    <td style={S.tdVal}>{c.preco > 0 ? fmtMoney(c.liquido) : '—'}</td>
                    <td style={{ ...S.tdVal, color: 'var(--text-primary)', fontWeight: 600 }}>{c.preco > 0 ? fmtMoney(c.subtotal) : '—'}</td>
                    <td style={{ ...S.td, textAlign: 'center' as const }}>
                      {items.length > 1 && (
                        <button style={S.removeBtn} onClick={() => removeItem(i)}>✕</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <button style={S.addBtn} onClick={addItem}>+ Adicionar item</button>
      </div>

      {/* Totals */}
      <div style={S.section}>
        <div style={S.sectionTitle}>Totais</div>
        <div style={S.totalsBox}>
          <div style={S.totalsRow}>
            <span style={S.totalsLabel}>Qtde. total de itens</span>
            <span style={S.totalsVal}>{fmtMoney(qtdeTotal)}</span>
          </div>
          <div style={S.totalsRow}>
            <span style={S.totalsLabel}>Total (Preço de Tabela)</span>
            <span style={S.totalsVal}>R$ {fmtMoney(totalTabela)}</span>
          </div>
          <div style={S.totalsRow}>
            <span style={S.totalsLabel}>Total de Descontos</span>
            <span style={{ ...S.totalsVal, color: 'var(--red)' }}>- R$ {fmtMoney(totalDesc)}</span>
          </div>
          <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
          <div style={S.totalsRow}>
            <span style={{ ...S.totalsLabel, color: 'var(--text-primary)', fontWeight: 600 }}>Valor total em produtos</span>
            <span style={S.totalsValBig}>R$ {fmtMoney(totalLiq)}</span>
          </div>
        </div>
      </div>

      <button style={S.genBtn(!canGenerate || generating)} disabled={!canGenerate || generating} onClick={generate}>
        {generating ? 'Gerando...' : 'Baixar Pedido (.xlsx)'}
      </button>
      {!canGenerate && (
        <div style={{ marginTop: 8, fontSize: 12, color: 'var(--red)' }}>
          Preencha: representada, nome do cliente e ao menos um item com produto e preço.
        </div>
      )}
    </div>
  );
}
