import { useState, useRef, useCallback, useMemo } from 'react';

// Mercos 42-column spec — only the ones we surface in the mapper
const MERCOS_COLS = [
  { idx: 0,  label: 'Código do produto',    required: true,  recommended: false },
  { idx: 1,  label: 'Nome do produto',       required: true,  recommended: false },
  { idx: 2,  label: 'Preço de Tabela',       required: true,  recommended: false },
  { idx: 3,  label: 'Preço Mínimo',          required: false, recommended: false },
  { idx: 4,  label: 'IPI (%)',               required: false, recommended: false },
  { idx: 5,  label: 'Substituição Trib. (%)',required: false, recommended: false },
  { idx: 6,  label: 'Comissão (%)',          required: false, recommended: false },
  { idx: 7,  label: 'Informações adicionais',required: false, recommended: false },
  { idx: 8,  label: 'Unidade',               required: false, recommended: false },
  { idx: 9,  label: 'Quantidade em estoque', required: false, recommended: false },
  { idx: 10, label: 'Múltiplo',              required: false, recommended: false },
  { idx: 11, label: 'Peso bruto (Kg)',        required: false, recommended: false },
  { idx: 16, label: 'Categoria principal',   required: false, recommended: false },
  { idx: 17, label: 'Subcategoria nível 2',  required: false, recommended: false },
  { idx: 19, label: 'Ativo/Inativo (da planilha)',        required: false, recommended: false },
  { idx: 20, label: 'Exibição e-commerce (da planilha)',  required: false, recommended: false },
  { idx: 23, label: 'Preço de Tabela #1',    required: false, recommended: false },
  { idx: 24, label: 'Preço de Tabela #2',    required: false, recommended: false },
  { idx: 25, label: 'Preço de Tabela #3',    required: false, recommended: false },
  { idx: 26, label: 'Preço de Tabela #4',    required: false, recommended: false },
];

const S = {
  wrap: { padding: '28px 32px', maxWidth: 960, margin: '0 auto' },
  section: { marginBottom: 28 },
  label: { fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 8, display: 'block' },
  dropzone: (drag: boolean) => ({
    border: `2px dashed ${drag ? 'var(--accent-light)' : 'var(--border)'}`,
    borderRadius: 10, padding: '36px 24px', textAlign: 'center' as const,
    cursor: 'pointer', background: drag ? 'rgba(37,211,102,0.04)' : 'var(--bg-secondary)',
    transition: 'all 0.15s',
  }),
  dropText: { fontSize: 14, color: 'var(--text-muted)', marginBottom: 6 },
  dropSub: { fontSize: 12, color: 'var(--text-faint)' },
  fileName: { fontSize: 13, color: 'var(--accent-light)', fontWeight: 600, marginTop: 8 },
  tableWrap: { overflowX: 'auto' as const, borderRadius: 8, border: '1px solid var(--hairline)' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 12 },
  th: { padding: '8px 12px', textAlign: 'left' as const, background: 'var(--bg-card-translucent)', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--hairline)', whiteSpace: 'nowrap' as const },
  td: { padding: '7px 12px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', maxWidth: 200, overflow: 'hidden' as const, textOverflow: 'ellipsis' as const, whiteSpace: 'nowrap' as const },
  headerRow: { padding: '7px 12px', color: 'var(--text-primary)', fontWeight: 600, borderBottom: '1px solid var(--border)', maxWidth: 200, overflow: 'hidden' as const, textOverflow: 'ellipsis' as const, whiteSpace: 'nowrap' as const },
  mapRow: { display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' },
  mapLabel: (req: boolean, rec: boolean) => ({ fontSize: 13, color: req ? 'var(--red)' : rec ? 'var(--amber)' : 'var(--text-secondary)', fontWeight: req || rec ? 600 : 400 }),
  mapBadge: (req: boolean, rec: boolean) => ({
    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 3, marginLeft: 6,
    background: req ? 'rgba(248,113,113,0.15)' : 'rgba(252,211,77,0.12)',
    color: req ? 'var(--red)' : 'var(--amber)',
  }),
  aiBadge: {
    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 3, marginLeft: 6,
    background: 'rgba(77,224,140,0.12)', color: 'var(--accent-light)',
  },
  select: {
    background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 6,
    color: 'var(--text-primary)', fontSize: 12, padding: '6px 10px', outline: 'none', width: '100%',
    fontFamily: 'inherit', cursor: 'pointer',
  },
  selectSm: {
    background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 6,
    color: 'var(--text-primary)', fontSize: 11, padding: '4px 8px', outline: 'none',
    fontFamily: 'inherit', cursor: 'pointer',
  },
  input: {
    background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 6,
    color: 'var(--text-primary)', fontSize: 12, padding: '6px 10px', outline: 'none',
    fontFamily: 'inherit', width: 60,
  },
  btn: (disabled: boolean) => ({
    padding: '10px 24px', borderRadius: 8, border: 'none', fontFamily: 'inherit',
    fontSize: 13, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    background: disabled ? 'var(--border)' : 'var(--accent)', color: disabled ? 'var(--text-muted)' : '#fff',
    transition: 'all 0.15s',
  }),
  btnGhost: (disabled: boolean) => ({
    padding: '7px 14px', borderRadius: 7, fontFamily: 'inherit',
    fontSize: 12, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    background: 'none', border: '1px solid var(--hairline)',
    color: disabled ? 'var(--text-faint)' : 'var(--accent-light)',
    transition: 'all 0.15s',
  }),
  info: { fontSize: 12, color: 'var(--text-muted)', marginTop: 8 },
  aiNotice: (kind: 'ok' | 'warn' | 'err') => ({
    fontSize: 12, borderRadius: 8, padding: '10px 14px', marginBottom: 14,
    border: `1px solid ${kind === 'ok' ? 'rgba(77,224,140,0.25)' : kind === 'warn' ? 'rgba(252,211,77,0.25)' : 'rgba(248,113,113,0.25)'}`,
    background: kind === 'ok' ? 'rgba(37,211,102,0.05)' : kind === 'warn' ? 'rgba(252,211,77,0.05)' : 'rgba(248,113,113,0.05)',
    color: kind === 'ok' ? 'var(--accent-light)' : kind === 'warn' ? 'var(--amber)' : 'var(--red)',
  }),
};

type SheetRow = (string | number | null)[];
type Flag01 = '' | '0' | '1';

const CONF_LABEL: Record<string, string> = { alta: 'alta', media: 'média', baixa: 'baixa' };

export default function ConversorMercos() {
  const [dragging, setDragging]     = useState(false);
  const [fileName, setFileName]     = useState('');
  const [rows, setRows]             = useState<SheetRow[]>([]);
  const [headerRow, setHeaderRow]   = useState(0);
  // mapping: mercos_col_idx -> factory_col_idx (-1 = none)
  const [mapping, setMapping]       = useState<Record<number, number>>({});
  const [generating, setGenerating] = useState(false);
  const [skippedNoCode, setSkippedNoCode] = useState<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // IA: mapeamento automático (a Tati só revisa) — a planilha inteira nunca
  // sai do navegador, só cabeçalhos + amostra de linhas.
  const [aiState, setAiState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [aiMeta, setAiMeta]   = useState<{ confidence: string; notes: string; fields: number } | null>(null);
  const [aiFilled, setAiFilled] = useState<Set<number>>(new Set());
  const aiSeqRef = useRef(0);

  // Colunas 19 (Ativo/Inativo) e 20 (Exibir no e-commerce): padrão global + override por linha
  const [ativoDefault, setAtivoDefault] = useState<Flag01>('');
  const [ecomDefault, setEcomDefault]   = useState<Flag01>('');
  const [rowOverrides, setRowOverrides] = useState<Record<number, { ativo?: Flag01; ecom?: Flag01 }>>({});
  const [showOverrides, setShowOverrides] = useState(false);
  const [ovrPage, setOvrPage] = useState(0);
  const OVR_PAGE_SIZE = 50;

  // #10 (backlog 22/07, caso Toyng): 2ª planilha de preço — o preço dela entra
  // como Preço de Tabela #1 (col 23), casado pelo código do produto. Fluxo
  // real do Tiago: Toyng BRASIL = Preço de Tabela; Toyng E-COMMERCE = #1.
  const [file2Name, setFile2Name] = useState('');
  const [file2State, setFile2State] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [extraLookup, setExtraLookup] = useState<Record<string, string | number> | null>(null);
  const [file2Note, setFile2Note] = useState('');
  const file2Ref = useRef<HTMLInputElement>(null);
  const [mergeStats, setMergeStats] = useState<{ matched: number; missed: number } | null>(null);

  const canonCode = (v: unknown) => String(v ?? '').trim().replace(/\.0+$/, '');

  const readFile2 = useCallback(async (file: File) => {
    setFile2State('running');
    setFile2Name(file.name);
    setExtraLookup(null);
    setMergeStats(null);
    try {
      const { read, utils } = await import('xlsx');
      const buf = await file.arrayBuffer();
      const wb = read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data: SheetRow[] = utils.sheet_to_json(ws, { header: 1, defval: null });
      if (data.length === 0) throw new Error('vazia');

      // IA acha o cabeçalho + colunas de código e preço da 2ª planilha
      const sample = data.slice(0, 25).map(row =>
        row.slice(0, 30).map(v => (v === null || v === undefined ? '' : String(v).slice(0, 48)))
      );
      let hRow = 0, codeCol = -1, priceCol = -1;
      try {
        const res = await fetch('/api/ferramentas/ai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'map-mercos', sample }),
        });
        if (res.ok) {
          const out = await res.json();
          hRow = out.header_row ?? 0;
          codeCol = out.mapping?.['0'] ?? -1;
          priceCol = out.mapping?.['2'] ?? -1;
        }
      } catch { /* cai no fallback abaixo */ }
      // Fallback: layout idêntico ao da 1ª planilha (caso Toyng)
      if (codeCol < 0 || priceCol < 0) {
        hRow = headerRow;
        codeCol = mapping[0] ?? -1;
        priceCol = mapping[2] ?? -1;
      }
      if (codeCol < 0 || priceCol < 0) throw new Error('não achei as colunas de código e preço');

      const lookup: Record<string, string | number> = {};
      for (const row of data.slice(hRow + 1)) {
        const code = canonCode(row?.[codeCol]);
        const price = row?.[priceCol];
        if (code && price !== null && price !== undefined && String(price).trim() !== '') {
          lookup[code] = price as string | number;
        }
      }
      if (Object.keys(lookup).length === 0) throw new Error('nenhum produto com código + preço');
      setExtraLookup(lookup);
      setFile2Note(`${Object.keys(lookup).length} preços lidos — entram como Preço de Tabela #1, casados pelo código.`);
      setFile2State('done');
    } catch (e: any) {
      setFile2Note(`Não consegui ler a 2ª planilha (${e?.message || 'erro'}). O arquivo principal segue funcionando sem ela.`);
      setFile2State('error');
    }
  }, [headerRow, mapping]);

  const runAiMapping = useCallback(async (data: SheetRow[]) => {
    if (data.length === 0) return;
    const seq = ++aiSeqRef.current;
    setAiState('running');
    setAiMeta(null);
    try {
      const sample = data.slice(0, 25).map(row =>
        row.slice(0, 30).map(v => (v === null || v === undefined ? '' : String(v).slice(0, 48)))
      );
      const res = await fetch('/api/ferramentas/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'map-mercos', sample }),
      });
      if (seq !== aiSeqRef.current) return; // outro arquivo carregado no meio
      if (!res.ok) throw new Error();
      const out = await res.json();
      if (seq !== aiSeqRef.current) return;

      const newMapping: Record<number, number> = {};
      const filled = new Set<number>();
      for (const [k, v] of Object.entries(out.mapping || {})) {
        if (v !== null && v !== undefined && Number.isInteger(v as number)) {
          newMapping[Number(k)] = v as number;
          filled.add(Number(k));
        }
      }
      setHeaderRow(out.header_row ?? 0);
      setMapping(newMapping);
      setAiFilled(filled);
      setAiMeta({ confidence: out.confidence || 'baixa', notes: out.notes || '', fields: filled.size });
      setAiState('done');
    } catch {
      if (seq === aiSeqRef.current) setAiState('error');
    }
  }, []);

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
    setAiFilled(new Set());
    setRowOverrides({});
    setOvrPage(0);
    setFile2Name('');
    setFile2State('idle');
    setExtraLookup(null);
    setMergeStats(null);
    runAiMapping(data);
  }, [runAiMapping]);

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

  // Linhas de dados (mesma ordem usada na geração — overrides indexam esta lista)
  const dataRows = useMemo(
    () => rows.slice(headerRow + 1).filter(row => row.some(v => v !== null && v !== '')),
    [rows, headerRow]
  );

  const canGenerate = MERCOS_COLS.filter(c => c.required).every(c => mapping[c.idx] !== undefined && mapping[c.idx] >= 0);

  const setOverride = (rowIdx: number, field: 'ativo' | 'ecom', value: string) => {
    setRowOverrides(prev => {
      const cur = { ...(prev[rowIdx] || {}) };
      if (value === 'default') delete cur[field];
      else cur[field] = value as Flag01;
      const next = { ...prev };
      if (Object.keys(cur).length === 0) delete next[rowIdx];
      else next[rowIdx] = cur;
      return next;
    });
  };

  const overrideCount = Object.keys(rowOverrides).length;

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

      // Regra padrão (todas as fábricas, Checkpoint 10/07): só importa linha
      // com CÓDIGO preenchido — sem código o Mercos não casa o produto.
      const codCol = mapping[0];
      let skipped = 0;

      // #10: colunas percentuais que vierem como FRAÇÃO (0.065) viram % (6.5)
      // — padrão das planilhas Toyng. Detecta por coluna: todos os valores ≤ 1.
      const fracCols = new Set<number>();
      for (const idx of [4, 5, 6]) {
        const fc = mapping[idx];
        if (fc === undefined || fc < 0) continue;
        const vals = dataRows
          .map(r => Number(String(r[fc] ?? '').replace(',', '.')))
          .filter(v => Number.isFinite(v) && v > 0);
        if (vals.length >= 3 && vals.every(v => v <= 1)) fracCols.add(idx);
      }

      let matched = 0, missed = 0;
      const outputRows: SheetRow[] = [];
      dataRows.forEach((row, ri) => {
        const cod = codCol !== undefined && codCol >= 0 ? row[codCol] : null;
        if (cod === null || cod === undefined || String(cod).trim() === '') { skipped++; return; }
        const out: SheetRow = new Array(42).fill(null);
        for (const mc of MERCOS_COLS) {
          const fc = mapping[mc.idx];
          if (fc !== undefined && fc >= 0) {
            out[mc.idx] = row[fc] ?? null;
          }
        }
        // Fração → percentual (IPI/ST/Comissão)
        for (const idx of fracCols) {
          const v = Number(String(out[idx] ?? '').replace(',', '.'));
          if (Number.isFinite(v) && v > 0 && v <= 1) out[idx] = Math.round(v * 100 * 10000) / 10000;
        }
        // #10: preço da 2ª planilha entra como Preço de Tabela #1 (col 23)
        if (extraLookup) {
          const hit = extraLookup[canonCode(cod)];
          if (hit !== undefined) { out[23] = hit; matched++; } else { missed++; }
        }
        // Colunas 19/20: célula da planilha (quando mapeada E preenchida)
        // > override por linha > padrão global > vazio
        const ovr = rowOverrides[ri] || {};
        const fromSheet = (idx: number) => {
          const fc = mapping[idx];
          if (fc === undefined || fc < 0) return null;
          const v = row[fc];
          if (v === null || v === undefined || String(v).trim() === '') return null;
          const n = Number(String(v).trim());
          return (n === 0 || n === 1) ? n : null; // Mercos só aceita 0/1
        };
        const ativoSheet = fromSheet(19);
        const ecomSheet  = fromSheet(20);
        const ativo = ovr.ativo !== undefined ? ovr.ativo : ativoDefault;
        const ecom  = ovr.ecom  !== undefined ? ovr.ecom  : ecomDefault;
        out[19] = ativoSheet !== null ? ativoSheet : (ativo === '' ? null : Number(ativo));
        out[20] = ecomSheet  !== null ? ecomSheet  : (ecom  === '' ? null : Number(ecom));
        outputRows.push(out);
      });
      setSkippedNoCode(skipped);
      setMergeStats(extraLookup ? { matched, missed } : null);

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

  const ovrPages = Math.max(1, Math.ceil(dataRows.length / OVR_PAGE_SIZE));
  const ovrSlice = dataRows.slice(ovrPage * OVR_PAGE_SIZE, (ovrPage + 1) * OVR_PAGE_SIZE);

  return (
    <div style={S.wrap}>
      <div style={{ marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)' }}>
        Converta a planilha da fábrica para o formato de importação do Mercos. Faça o upload — a IA detecta o cabeçalho e propõe o mapeamento; revise e confirme.
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 24 }}>
        Colunas obrigatórias: <span style={{ color: 'var(--red)' }}>Código</span>, <span style={{ color: 'var(--red)' }}>Nome do produto</span> e <span style={{ color: 'var(--red)' }}>Preço de Tabela</span> — linhas sem código são ignoradas (regra padrão). A planilha não sai do seu navegador — a IA recebe só uma amostra para mapear.
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
          {/* IA status */}
          {aiState === 'running' && (
            <div style={S.aiNotice('warn')}>IA analisando a planilha e propondo o mapeamento…</div>
          )}
          {aiState === 'done' && aiMeta && (
            <div style={S.aiNotice(aiMeta.confidence === 'alta' ? 'ok' : 'warn')}>
              IA preencheu {aiMeta.fields} campo{aiMeta.fields === 1 ? '' : 's'} (confiança {CONF_LABEL[aiMeta.confidence] || aiMeta.confidence}).
              {aiMeta.notes ? ` ${aiMeta.notes}` : ''} Revise o mapeamento antes de gerar.
            </div>
          )}
          {aiState === 'error' && (
            <div style={S.aiNotice('err')}>
              A IA não conseguiu mapear automaticamente — use o mapeamento manual abaixo (funciona normalmente).
            </div>
          )}

          {/* Preview + header row selector */}
          <div style={S.section}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
              <label style={{ ...S.label, marginBottom: 0 }}>2. Prévia da planilha</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Linha do cabeçalho (0 = primeira):</span>
                <input
                  type="number" min={0} max={Math.min(20, rows.length - 1)}
                  value={headerRow}
                  onChange={e => { setHeaderRow(parseInt(e.target.value) || 0); setMapping({}); setAiFilled(new Set()); setRowOverrides({}); setOvrPage(0); }}
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
                      <td style={{ ...S.td, color: ri === headerRow ? 'var(--amber)' : 'var(--text-faint)', fontWeight: ri === headerRow ? 700 : 400 }}>
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ ...S.label, marginBottom: 0 }}>3. Mapeamento de colunas</label>
              <button
                style={S.btnGhost(aiState === 'running')}
                disabled={aiState === 'running'}
                onClick={() => runAiMapping(rows)}
              >
                {aiState === 'running' ? 'Mapeando…' : 'Mapear com IA novamente'}
              </button>
            </div>
            <div style={{ border: '1px solid var(--hairline)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '8px 16px', background: 'var(--bg-card-translucent)', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 12, borderBottom: '1px solid var(--hairline)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Coluna Mercos</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Coluna da fábrica</span>
              </div>
              {MERCOS_COLS.map(mc => (
                <div key={mc.idx} style={{ padding: '0 16px' }}>
                  <div style={S.mapRow}>
                    <div>
                      <span style={S.mapLabel(mc.required, mc.recommended)}>{mc.label}</span>
                      {mc.required    && <span style={S.mapBadge(true, false)}>obrigatório</span>}
                      {mc.recommended && <span style={S.mapBadge(false, true)}>recomendado</span>}
                      {aiFilled.has(mc.idx) && <span style={S.aiBadge}>IA</span>}
                    </div>
                    <select
                      style={S.select}
                      value={mapping[mc.idx] ?? -1}
                      onChange={e => {
                        setMapping(m => ({ ...m, [mc.idx]: parseInt(e.target.value) }));
                        setAiFilled(prev => { const n = new Set(prev); n.delete(mc.idx); return n; });
                      }}
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

          {/* #10: 2ª planilha de preço → Preço de Tabela #1 (caso Toyng) */}
          <div style={S.section}>
            <label style={S.label}>3b. Tabela de preço adicional (opcional)</label>
            <div style={{ border: '1px solid var(--hairline)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, lineHeight: 1.5 }}>
                Recebe duas tabelas da fábrica (ex.: Toyng BRASIL + Toyng E-COMMERCE)? Envie a segunda aqui —
                o preço dela entra na coluna <strong>Preço de Tabela #1</strong>, casado pelo código do produto.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <button style={S.btnGhost(file2State === 'running')} disabled={file2State === 'running'} onClick={() => file2Ref.current?.click()}>
                  {file2State === 'running' ? 'Lendo…' : file2Name ? 'Trocar planilha' : '+ Enviar 2ª planilha'}
                </button>
                {file2Name && <span style={{ fontSize: 12, color: file2State === 'error' ? 'var(--red)' : 'var(--accent-light)' }}>{file2Name}</span>}
                {extraLookup && (
                  <button style={S.btnGhost(false)} onClick={() => { setExtraLookup(null); setFile2Name(''); setFile2State('idle'); setMergeStats(null); }}>
                    Remover
                  </button>
                )}
              </div>
              {file2Note && (
                <div style={{ fontSize: 12, color: file2State === 'error' ? 'var(--red)' : 'var(--text-muted)', marginTop: 8 }}>{file2Note}</div>
              )}
              <input ref={file2Ref} type="file" accept=".xls,.xlsx" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) readFile2(f); e.target.value = ''; }} />
            </div>
          </div>

          {/* Ativo / e-commerce (Mercos cols 19 e 20) */}
          <div style={S.section}>
            <label style={S.label}>4. Ativo e exibição no e-commerce</label>
            <div style={{ border: '1px solid var(--hairline)', borderRadius: 8, padding: '14px 16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Ativo / Inativo (todos os produtos)</div>
                  <select style={S.select} value={ativoDefault} onChange={e => setAtivoDefault(e.target.value as Flag01)}>
                    <option value="">Deixar vazio — novo produto fica ativo</option>
                    <option value="0">0 — Ativo</option>
                    <option value="1">1 — Inativo</option>
                  </select>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 6 }}>Exibição no e-commerce (todos os produtos)</div>
                  <select style={S.select} value={ecomDefault} onChange={e => setEcomDefault(e.target.value as Flag01)}>
                    <option value="">Deixar vazio — novo produto é exibido</option>
                    <option value="0">0 — Exibir no e-commerce</option>
                    <option value="1">1 — Ocultar do e-commerce</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 12 }}>
                <button style={S.btnGhost(dataRows.length === 0)} disabled={dataRows.length === 0} onClick={() => setShowOverrides(v => !v)}>
                  {showOverrides ? 'Ocultar ajustes por produto' : 'Ajustar produto a produto'}
                </button>
                {overrideCount > 0 && (
                  <span style={{ fontSize: 12, color: 'var(--amber)' }}>{overrideCount} produto{overrideCount === 1 ? '' : 's'} com ajuste individual</span>
                )}
              </div>

              {showOverrides && (
                <div style={{ marginTop: 12 }}>
                  <div style={S.tableWrap}>
                    <table style={S.table}>
                      <thead>
                        <tr>
                          <th style={S.th}>#</th>
                          <th style={S.th}>Código</th>
                          <th style={S.th}>Nome do produto</th>
                          <th style={S.th}>Ativo / Inativo</th>
                          <th style={S.th}>E-commerce</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ovrSlice.map((row, i) => {
                          const ri = ovrPage * OVR_PAGE_SIZE + i;
                          const codigo = mapping[0] !== undefined && mapping[0] >= 0 ? row[mapping[0]] : null;
                          const nome   = mapping[1] !== undefined && mapping[1] >= 0 ? row[mapping[1]] : null;
                          const ovr = rowOverrides[ri] || {};
                          return (
                            <tr key={ri}>
                              <td style={{ ...S.td, color: 'var(--text-faint)' }}>{ri + 1}</td>
                              <td style={S.td}>{codigo !== null && codigo !== undefined ? String(codigo).slice(0, 20) : '—'}</td>
                              <td style={S.td}>{nome !== null && nome !== undefined ? String(nome).slice(0, 40) : '—'}</td>
                              <td style={{ ...S.td, overflow: 'visible' }}>
                                <select style={S.selectSm} value={ovr.ativo !== undefined ? ovr.ativo : 'default'} onChange={e => setOverride(ri, 'ativo', e.target.value)}>
                                  <option value="default">Padrão</option>
                                  <option value="">Vazio (ativo)</option>
                                  <option value="0">0 — Ativo</option>
                                  <option value="1">1 — Inativo</option>
                                </select>
                              </td>
                              <td style={{ ...S.td, overflow: 'visible' }}>
                                <select style={S.selectSm} value={ovr.ecom !== undefined ? ovr.ecom : 'default'} onChange={e => setOverride(ri, 'ecom', e.target.value)}>
                                  <option value="default">Padrão</option>
                                  <option value="">Vazio (exibido)</option>
                                  <option value="0">0 — Exibir</option>
                                  <option value="1">1 — Ocultar</option>
                                </select>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {ovrPages > 1 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
                      <button style={S.btnGhost(ovrPage === 0)} disabled={ovrPage === 0} onClick={() => setOvrPage(p => p - 1)}>← Anterior</button>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Página {ovrPage + 1} de {ovrPages} · {dataRows.length} produtos</span>
                      <button style={S.btnGhost(ovrPage >= ovrPages - 1)} disabled={ovrPage >= ovrPages - 1} onClick={() => setOvrPage(p => p + 1)}>Próxima →</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preview of mapped output */}
          {previewRows.length > 0 && MERCOS_COLS.filter(c => c.required).some(c => mapping[c.idx] !== undefined && mapping[c.idx] >= 0) && (
            <div style={S.section}>
              <label style={S.label}>5. Prévia do arquivo gerado</label>
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
            {skippedNoCode !== null && skippedNoCode > 0 && (
              <div style={{ fontSize: 12, color: 'var(--amber)', marginTop: 8 }}>
                {skippedNoCode} linha{skippedNoCode !== 1 ? 's' : ''} ignorada{skippedNoCode !== 1 ? 's' : ''} por estar{skippedNoCode !== 1 ? 'em' : ''} sem código (regra padrão de todas as fábricas).
              </div>
            )}
            {mergeStats && (
              <div style={{ fontSize: 12, color: mergeStats.missed > 0 ? 'var(--amber)' : 'var(--accent-light)', marginTop: 8 }}>
                Preço de Tabela #1: {mergeStats.matched} produto{mergeStats.matched !== 1 ? 's' : ''} casado{mergeStats.matched !== 1 ? 's' : ''} com a 2ª planilha{mergeStats.missed > 0 ? ` · ${mergeStats.missed} sem correspondência (ficaram sem #1)` : ''}.
              </div>
            )}
            {!canGenerate && (
              <span style={{ fontSize: 12, color: 'var(--red)' }}>
                Mapeie obrigatoriamente: Nome do produto e Preço de Tabela
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
