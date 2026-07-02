import { useState, useRef, useCallback } from 'react';

// Mercos 42-column spec — only the ones we surface in the mapper
const MERCOS_COLS = [
  { idx: 0,  label: 'Código do produto',    required: false, recommended: true },
  { idx: 1,  label: 'Nome do produto',       required: true,  recommended: false },
  { idx: 2,  label: 'Preço de Tabela',       required: true,  recommended: false },
  { idx: 3,  label: 'Preço Mínimo',          required: false, recommended: false },
  { idx: 4,  label: 'IPI (%)',               required: false, recommended: false },
  { idx: 5,  label: 'Substituição Trib. (%)',required: false, recommended: false },
  { idx: 6,  label: 'Comissão (%)',          required: false, recommended: false },
  { idx: 7,  label: 'Informações adicionais',required: false, recommended: false },
  { idx: 8,  label: 'Unidade',               required: false, recommended: false },
  { idx: 9,  label: 'Estoque',               required: false, recommended: false },
  { idx: 10, label: 'Múltiplo',              required: false, recommended: false },
  { idx: 11, label: 'Peso bruto (Kg)',        required: false, recommended: false },
  { idx: 16, label: 'Categoria principal',   required: false, recommended: false },
  { idx: 17, label: 'Subcategoria nível 2',  required: false, recommended: false },
];

const S = {
  wrap: { padding: '28px 32px', maxWidth: 960, margin: '0 auto' },
  section: { marginBottom: 28 },
  label: { fontSize: '11px', fontWeight: 600, color: '#4a6050', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 8, display: 'block' },
  dropzone: (drag: boolean) => ({
    border: `2px dashed ${drag ? '#4de08c' : '#1c2820'}`,
    borderRadius: 10, padding: '36px 24px', textAlign: 'center' as const,
    cursor: 'pointer', background: drag ? 'rgba(37,211,102,0.04)' : '#0d120e',
    transition: 'all 0.15s',
  }),
  dropText: { fontSize: 14, color: '#4a6050', marginBottom: 6 },
  dropSub: { fontSize: 12, color: '#2d3d30' },
  fileName: { fontSize: 13, color: '#4de08c', fontWeight: 600, marginTop: 8 },
  tableWrap: { overflowX: 'auto' as const, borderRadius: 8, border: '1px solid #1c2820' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 12 },
  th: { padding: '8px 12px', textAlign: 'left' as const, background: '#0d120e', color: '#4a6050', fontWeight: 600, borderBottom: '1px solid #1c2820', whiteSpace: 'nowrap' as const },
  td: { padding: '7px 12px', color: '#8aaa90', borderBottom: '1px solid #111a12', maxWidth: 200, overflow: 'hidden' as const, textOverflow: 'ellipsis' as const, whiteSpace: 'nowrap' as const },
  headerRow: { padding: '7px 12px', color: '#e8f0e8', fontWeight: 600, borderBottom: '1px solid #111a12', maxWidth: 200, overflow: 'hidden' as const, textOverflow: 'ellipsis' as const, whiteSpace: 'nowrap' as const },
  mapRow: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #111a12' },
  mapLabel: (req: boolean, rec: boolean) => ({ fontSize: 13, color: req ? '#f87171' : rec ? '#fcd34d' : '#8aaa90', fontWeight: req || rec ? 600 : 400 }),
  mapBadge: (req: boolean, rec: boolean) => ({
    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 3, marginLeft: 6,
    background: req ? 'rgba(248,113,113,0.15)' : 'rgba(252,211,77,0.12)',
    color: req ? '#f87171' : '#fcd34d',
  }),
  select: {
    background: '#0d120e', border: '1px solid #1c2820', borderRadius: 6,
    color: '#e8f0e8', fontSize: 12, padding: '6px 10px', outline: 'none', width: '100%',
    fontFamily: 'inherit', cursor: 'pointer',
  },
  input: {
    background: '#0d120e', border: '1px solid #1c2820', borderRadius: 6,
    color: '#e8f0e8', fontSize: 12, padding: '6px 10px', outline: 'none',
    fontFamily: 'inherit', width: 60,
  },
  btn: (disabled: boolean) => ({
    padding: '10px 24px', borderRadius: 8, border: 'none', fontFamily: 'inherit',
    fontSize: 13, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? '#1c2820' : '#25D366', color: disabled ? '#4a6050' : '#fff',
    transition: 'all 0.15s',
  }),
  info: { fontSize: 12, color: '#4a6050', marginTop: 8 },
};

type SheetRow = (string | number | null)[];

export default function ConversorMercos() {
  const [dragging, setDragging]     = useState(false);
  const [fileName, setFileName]     = useState('');
  const [rows, setRows]             = useState<SheetRow[]>([]);
  const [headerRow, setHeaderRow]   = useState(0);
  // mapping: mercos_col_idx -> factory_col_idx (-1 = none)
  const [mapping, setMapping]       = useState<Record<number, number>>({});
  const [generating, setGenerating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const readFile = useCallback(async (file: File) => {
    const { read, utils } = await import('xlsx');
    const buf = await file.arrayBuffer();
    const wb = read(buf, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const data: SheetRow[] = utils.sheet_to_json(ws, { header: 1, defval: null });
    setRows(data);
    setFileName(file.name);
    setHeaderRow(0);
    setMapping({});
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  }, [readFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
  }, [readFile]);

  // Derive column headers from the selected header row
  const factoryCols = rows[headerRow]
    ? rows[headerRow].map((v, i) => ({ idx: i, label: v !== null && v !== '' ? String(v) : `Coluna ${i + 1}` }))
    : [];

  const previewRows = rows.slice(headerRow + 1, headerRow + 6);

  const canGenerate = MERCOS_COLS.filter(c => c.required).every(c => mapping[c.idx] !== undefined && mapping[c.idx] >= 0);

  const generate = async () => {
    if (!canGenerate) return;
    setGenerating(true);
    try {
      const { utils, writeFile } = await import('xlsx');

      // Build the 42-column Mercos header row (row 0 of the output)
      const FULL_MERCOS_HEADERS = [
        'Código do produto\n(recomendado)',
        'Nome do produto\n(obrigatório)',
        'Preço de Tabela\n(obrigatório)',
        'Preço Mínimo\n(opcional - Não informar o símbolo %)',
        'IPI\n(opcional - Não informar o símbolo %)',
        'Substituição Tributária\n(opcional - Não informar o símbolo %)',
        'Comissão\n(opcional - Não informar o símbolo %)',
        'Informações adicionais\n(opcional - neste campo coloca-se qualquer detalhe extra do produto. Não aparece no pedido)',
        'Unidade\n(opcional – exemplo: Kg para produtos em quilo, Cx para caixas)',
        'Quantidade em estoque\n(opcional - preencha com um número maior ou igual a 0)',
        'Múltiplo\n(opcional)',
        'Peso bruto (em Kg)\n(até três casas decimais)',
        'Tipo peso e dimensões\n(opcional - preencha 1 se as colunas Largura, Altura e Comprimento à direita se referirem a caixa master)',
        'Largura da embalagem\n(em centímetros, com até 5 casas decimais - obrigatório se as colunas Altura e Comprimento também estiverem preenchidas)',
        'Altura da embalagem\n(em centímetros, com até 5 casas decimais - obrigatório se as colunas Largura e Comprimento também estiverem preenchidas)',
        'Comprimento da embalagem\n(em centímetros, com até 5 casas decimais - obrigatório se as colunas Largura e Altura também estiverem preenchidas)',
        'Categoria principal\n(opcional - Máximo 50 caracteres)',
        'Subcategoria nível 2\n(opcional - Máximo 50 caracteres)',
        'Subcategoria nível 3\n(opcional - Máximo 50 caracteres)',
        'Ativo / Inativo\n(opcional - preencha 0 para tornar o produto ativo ou 1 para tornar o produto inativo. Deixando vazio, o novo produto ficará ativo e numa alteração manterá o estado cadastrado no sistema)',
        'Exibido / Não exibido no e-commerce\n(opcional - preencha 0 para passar a exibir ou 1 para ocultar o produto do e-commerce B2B. Deixando vazio, o novo produto será exibido e numa alteração manterá o estado cadastrado no sistema)',
        '[Antigo] Tamanhos\n(opcional - tamanhos separados por ponto e vírgula)',
        '[Antigo] Cores\n(opcional - cores separadas por ponto e vírgula)',
        ...Array.from({ length: 19 }, (_, i) => `Preço de Tabela #${i + 1}\n(opcional)`),
      ];

      const dataRows = rows.slice(headerRow + 1).filter(row => row.some(v => v !== null && v !== ''));

      const outputRows: SheetRow[] = dataRows.map(row => {
        const out: SheetRow = new Array(42).fill(null);
        for (const mc of MERCOS_COLS) {
          const fc = mapping[mc.idx];
          if (fc !== undefined && fc >= 0) {
            out[mc.idx] = row[fc] ?? null;
          }
        }
        return out;
      });

      const ws = utils.aoa_to_sheet([FULL_MERCOS_HEADERS, ...outputRows]);

      // Style: yellow fill for required/recommended cols (col 0, 1, 2) — same as Mercos template
      if (!ws['!cols']) ws['!cols'] = [];
      ws['!cols'][0] = { wch: 22 };
      ws['!cols'][1] = { wch: 36 };
      ws['!cols'][2] = { wch: 18 };

      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, 'Importação');

      const baseName = fileName.replace(/\.[^.]+$/, '');
      writeFile(wb, `mercos_${baseName}.xlsx`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div style={S.wrap}>
      <div style={{ marginBottom: 4, fontSize: 13, color: '#8aaa90' }}>
        Converta a planilha da fábrica para o formato de importação do Mercos. Faça o upload, selecione a linha de cabeçalho e mapeie as colunas.
      </div>
      <div style={{ fontSize: 11, color: '#2d3d30', marginBottom: 24 }}>
        Colunas obrigatórias: <span style={{ color: '#f87171' }}>Nome do produto</span> e <span style={{ color: '#f87171' }}>Preço de Tabela</span>.
      </div>

      {/* Drop zone */}
      <div style={S.section}>
        <label style={S.label}>1. Planilha da fábrica</label>
        <div
          style={S.dropzone(dragging)}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          <div style={S.dropText}>Arraste e solte a planilha aqui</div>
          <div style={S.dropSub}>ou clique para selecionar — .xls, .xlsx</div>
          {fileName && <div style={S.fileName}>{fileName}</div>}
        </div>
        <input ref={fileRef} type="file" accept=".xls,.xlsx" style={{ display: 'none' }} onChange={onFileChange} />
      </div>

      {rows.length > 0 && (
        <>
          {/* Preview + header row selector */}
          <div style={S.section}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <label style={{ ...S.label, marginBottom: 0 }}>2. Prévia da planilha</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#4a6050' }}>Linha do cabeçalho (0 = primeira):</span>
                <input
                  type="number" min={0} max={Math.min(20, rows.length - 1)}
                  value={headerRow}
                  onChange={e => { setHeaderRow(parseInt(e.target.value) || 0); setMapping({}); }}
                  style={S.input}
                />
              </div>
            </div>
            <div style={S.tableWrap}>
              <table style={S.table}>
                <thead>
                  <tr>
                    <th style={{ ...S.th, width: 40 }}>#</th>
                    {(rows[0] || []).slice(0, 20).map((_, i) => (
                      <th key={i} style={S.th}>Col {i}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, Math.min(rows.length, headerRow + 6)).map((row, ri) => (
                    <tr key={ri} style={{ background: ri === headerRow ? 'rgba(252,211,77,0.06)' : undefined }}>
                      <td style={{ ...S.td, color: ri === headerRow ? '#fcd34d' : '#2d3d30', fontWeight: ri === headerRow ? 700 : 400 }}>
                        {ri === headerRow ? '▶' : ri}
                      </td>
                      {(rows[0] || []).slice(0, 20).map((_, ci) => (
                        <td key={ci} style={ri === headerRow ? S.headerRow : S.td}>
                          {row[ci] !== null && row[ci] !== undefined ? String(row[ci]).slice(0, 30) : ''}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={S.info}>Mostrando até 20 colunas e linha de cabeçalho + 5 linhas de dados. Arquivo completo será processado.</div>
          </div>

          {/* Column mapping */}
          <div style={S.section}>
            <label style={S.label}>3. Mapeamento de colunas</label>
            <div style={{ border: '1px solid #1c2820', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '8px 16px', background: '#0d120e', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, borderBottom: '1px solid #1c2820' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#4a6050', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Coluna Mercos</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#4a6050', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Coluna da fábrica</span>
              </div>
              {MERCOS_COLS.map(mc => (
                <div key={mc.idx} style={{ padding: '0 16px' }}>
                  <div style={S.mapRow}>
                    <div>
                      <span style={S.mapLabel(mc.required, mc.recommended)}>{mc.label}</span>
                      {mc.required    && <span style={S.mapBadge(true, false)}>obrigatório</span>}
                      {mc.recommended && <span style={S.mapBadge(false, true)}>recomendado</span>}
                    </div>
                    <select
                      style={S.select}
                      value={mapping[mc.idx] ?? -1}
                      onChange={e => setMapping(m => ({ ...m, [mc.idx]: parseInt(e.target.value) }))}
                    >
                      <option value={-1}>— não mapear —</option>
                      {factoryCols.map(fc => (
                        <option key={fc.idx} value={fc.idx}>[Col {fc.idx}] {fc.label.slice(0, 50)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview of mapped output */}
          {previewRows.length > 0 && MERCOS_COLS.filter(c => c.required).some(c => mapping[c.idx] !== undefined && mapping[c.idx] >= 0) && (
            <div style={S.section}>
              <label style={S.label}>4. Prévia do arquivo gerado</label>
              <div style={S.tableWrap}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      {MERCOS_COLS.filter(c => mapping[c.idx] !== undefined && mapping[c.idx] >= 0).map(mc => (
                        <th key={mc.idx} style={S.th}>{mc.label}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {previewRows.map((row, ri) => (
                      <tr key={ri}>
                        {MERCOS_COLS.filter(c => mapping[c.idx] !== undefined && mapping[c.idx] >= 0).map(mc => {
                          const fc = mapping[mc.idx];
                          const val = fc >= 0 ? row[fc] : null;
                          return (
                            <td key={mc.idx} style={S.td}>
                              {val !== null && val !== undefined ? String(val).slice(0, 40) : ''}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Generate button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={S.btn(!canGenerate || generating)} disabled={!canGenerate || generating} onClick={generate}>
              {generating ? 'Gerando...' : 'Baixar planilha Mercos (.xlsx)'}
            </button>
            {!canGenerate && (
              <span style={{ fontSize: 12, color: '#f87171' }}>
                Mapeie obrigatoriamente: Nome do produto e Preço de Tabela
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
