import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

/**
 * Renomeador de fotos de produto (backlog A5).
 *
 * Cada fábrica manda fotos com nome em padrão próprio; o Mercos só casa a foto
 * com o produto quando o arquivo se chama exatamente o código do produto.
 * Fluxo: upload em lote → regra (preset da fábrica, IA ou manual) → prévia
 * antes/depois → download .zip renomeado. Tudo client-side; as fotos nunca
 * sobem para servidor — a IA recebe apenas os NOMES dos arquivos.
 */

type Rule =
  | { type: 'segment'; separator: string; index: number }
  | { type: 'regex'; pattern: string; group: number }
  | { type: 'depara'; map: Record<string, string> }; // F4: SICAD — nome do produto → código

// Regras já validadas com a Tati (podem ser sobrescritas por presets salvos)
const BUILTIN_PRESETS: Record<string, Rule> = {
  'BR':   { type: 'segment', separator: '_', index: 1 }, // 5_MO-15_01 → MO-15
  'Ingá': { type: 'segment', separator: '_', index: 0 }, // 17619_baixa → 17619
};

const S = {
  wrap: { padding: '28px 32px', maxWidth: 960, margin: '0 auto' },
  section: { marginBottom: 28 },
  label: { fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 8, display: 'block' },
  dropzone: (drag: boolean) => ({
    border: `2px dashed ${drag ? 'var(--accent-light)' : 'var(--border)'}`,
    borderRadius: 10, padding: '36px 24px', textAlign: 'center' as const,
    cursor: 'pointer', background: drag ? 'color-mix(in srgb, var(--accent) 4%, transparent)' : 'var(--bg-secondary)',
    transition: 'all 0.15s',
  }),
  dropText: { fontSize: 14, color: 'var(--text-muted)', marginBottom: 6 },
  dropSub: { fontSize: 12, color: 'var(--text-faint)' },
  fileName: { fontSize: 13, color: 'var(--accent-light)', fontWeight: 600, marginTop: 8 },
  tableWrap: { overflowX: 'auto' as const, borderRadius: 8, border: '1px solid var(--hairline)' },
  table: { width: '100%', borderCollapse: 'collapse' as const, fontSize: 12 },
  th: { padding: '8px 12px', textAlign: 'left' as const, background: 'var(--bg-card-translucent)', color: 'var(--text-muted)', fontWeight: 600, borderBottom: '1px solid var(--hairline)', whiteSpace: 'nowrap' as const },
  td: { padding: '7px 12px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)', maxWidth: 260, overflow: 'hidden' as const, textOverflow: 'ellipsis' as const, whiteSpace: 'nowrap' as const },
  select: {
    background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 6,
    color: 'var(--text-primary)', fontSize: 12, padding: '6px 10px', outline: 'none',
    fontFamily: 'inherit', cursor: 'pointer',
  },
  input: {
    background: 'var(--bg-card-translucent)', border: '1px solid var(--hairline)', borderRadius: 6,
    color: 'var(--text-primary)', fontSize: 12, padding: '6px 10px', outline: 'none',
    fontFamily: 'inherit',
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
  notice: (kind: 'ok' | 'warn' | 'err') => ({
    fontSize: 12, borderRadius: 8, padding: '10px 14px', marginBottom: 14,
    border: `1px solid ${kind === 'ok' ? 'color-mix(in srgb, var(--accent) 25%, transparent)' : kind === 'warn' ? 'color-mix(in srgb, var(--amber) 25%, transparent)' : 'color-mix(in srgb, var(--red) 25%, transparent)'}`,
    background: kind === 'ok' ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : kind === 'warn' ? 'color-mix(in srgb, var(--amber) 5%, transparent)' : 'color-mix(in srgb, var(--red) 5%, transparent)',
    color: kind === 'ok' ? 'var(--accent-light)' : kind === 'warn' ? 'var(--amber)' : 'var(--red)',
  }),
  info: { fontSize: 12, color: 'var(--text-muted)', marginTop: 8 },
  status: (s: 'ok' | 'dup' | 'fail') => ({
    fontSize: 10, fontWeight: 700, padding: '1px 7px', borderRadius: 3,
    background: s === 'ok' ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : s === 'dup' ? 'color-mix(in srgb, var(--amber) 12%, transparent)' : 'color-mix(in srgb, var(--red) 15%, transparent)',
    color: s === 'ok' ? 'var(--accent-light)' : s === 'dup' ? 'var(--amber)' : 'var(--red)',
  }),
  modeBtn: (active: boolean) => ({
    padding: '8px 16px', borderRadius: 7, fontFamily: 'inherit', fontSize: 12,
    fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
    background: active ? 'color-mix(in srgb, var(--accent) 8%, transparent)' : 'none',
    border: `1px solid ${active ? 'var(--accent-light)' : 'var(--border)'}`,
    color: active ? 'var(--accent-light)' : 'var(--text-muted)',
  }),
};

function stripExt(name: string): { base: string; ext: string } {
  const m = name.match(/^(.*?)(\.[^.]+)?$/);
  return { base: m?.[1] ?? name, ext: (m?.[2] ?? '').toLowerCase() };
}

// Normalização p/ casar nome de arquivo com a tabela De→Para (SICAD)
function normName(s: string): string {
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

function applyRule(rule: Rule, filename: string): string | null {
  const { base } = stripExt(filename);
  if (rule.type === 'depara') {
    const hit = rule.map[normName(base)];
    return hit && hit.trim() ? hit.trim() : null;
  }
  if (rule.type === 'segment') {
    const parts = base.split(rule.separator);
    const seg = parts[rule.index];
    return seg && seg.trim() ? seg.trim() : null;
  }
  try {
    const m = base.match(new RegExp(rule.pattern));
    const g = m?.[rule.group];
    return g && g.trim() ? g.trim() : null;
  } catch {
    return null;
  }
}

function describeRule(rule: Rule): string {
  if (rule.type === 'depara') {
    return `tabela De→Para com ${Object.keys(rule.map).length} itens`;
  }
  if (rule.type === 'segment') {
    return `separar por "${rule.separator}" e usar o ${rule.index + 1}º trecho`;
  }
  return `regex ${rule.pattern}`;
}

type ResultRow = { original: string; newName: string | null; status: 'ok' | 'dup' | 'fail' };

export default function RenomeadorFotos() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles]       = useState<File[]>([]);
  const [rule, setRule]         = useState<Rule | null>(null);
  const [ruleSource, setRuleSource] = useState<'preset' | 'ia' | 'manual' | 'depara' | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Regra manual
  const [manSep, setManSep] = useState('_');
  const [manIdx, setManIdx] = useState(1);

  // IA
  const [aiState, setAiState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [aiNotes, setAiNotes] = useState('');

  // F4 (SICAD): tabela De→Para + correções manuais por arquivo
  const deparaRef = useRef<HTMLInputElement>(null);
  const [deparaLoading, setDeparaLoading] = useState(false);
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [sicadAiState, setSicadAiState] = useState<'idle' | 'running' | 'error'>('idle');

  // Presets (az_settings) — builtin + salvos
  const [savedPresets, setSavedPresets] = useState<Record<string, Rule>>({});
  const [presetSel, setPresetSel]       = useState('');
  const [presetName, setPresetName]     = useState('');
  const [presetMsg, setPresetMsg]       = useState('');

  const [zipping, setZipping] = useState(false);

  useEffect(() => {
    fetch('/api/ferramentas/rename-presets')
      .then(r => (r.ok ? r.json() : { presets: {} }))
      .then(d => setSavedPresets(d.presets || {}))
      .catch(() => {});
  }, []);

  const presets: Record<string, Rule> = useMemo(
    () => ({ ...BUILTIN_PRESETS, ...savedPresets }),
    [savedPresets]
  );

  const addFiles = useCallback((list: FileList | File[]) => {
    const imgs = Array.from(list).filter(f => /\.(jpe?g|png|gif|webp|bmp|tiff?)$/i.test(f.name) || f.type.startsWith('image/'));
    setFiles(prev => {
      const seen = new Set(prev.map(f => f.name));
      return [...prev, ...imgs.filter(f => !seen.has(f.name))];
    });
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }, [addFiles]);

  const selectPreset = (name: string) => {
    setPresetSel(name);
    if (name && presets[name]) {
      setRule(presets[name]);
      setRuleSource('preset');
      const r = presets[name];
      if (r.type === 'segment') { setManSep(r.separator); setManIdx(r.index); }
    }
  };

  const applyManual = () => {
    if (!manSep) return;
    setRule({ type: 'segment', separator: manSep, index: Math.max(0, manIdx) });
    setRuleSource('manual');
    setPresetSel('');
  };

  // F4: planilha 2 colunas (De | Para) — 1ª coluna = nome como vem da fábrica,
  // 2ª = código Mercos. Linhas de cabeçalho simplesmente não casam com nada.
  const loadDeParaFile = async (file: File) => {
    setDeparaLoading(true);
    try {
      const XLSX = await import('xlsx');
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
      const map: Record<string, string> = {};
      for (const row of rows) {
        const de = row?.[0], para = row?.[1];
        if (de == null || para == null) continue;
        const k = normName(String(de));
        const v = String(para).trim();
        if (k && v) map[k] = v;
      }
      if (Object.keys(map).length === 0) { setPresetMsg('Erro ao salvar: tabela vazia — use 2 colunas (De | Para)'); return; }
      setRule({ type: 'depara', map });
      setRuleSource('depara');
      setPresetSel('');
    } finally {
      setDeparaLoading(false);
    }
  };

  // F4: IA sugere códigos no padrão SICAD (few-shot com os exemplos reais) —
  // preenche as correções por arquivo; a Tati revisa/edita antes do zip.
  const runSicadAi = async () => {
    if (files.length === 0) return;
    setSicadAiState('running');
    try {
      const res = await fetch('/api/ferramentas/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sicad-map', filenames: files.slice(0, 40).map(f => f.name) }),
      });
      if (!res.ok) throw new Error();
      const out = await res.json();
      const sug: Record<string, string> = out.map || {};
      setOverrides(prev => ({ ...sug, ...prev })); // edição manual da Tati vence a IA
      if (!rule) { setRule({ type: 'depara', map: {} }); setRuleSource('depara'); }
      setSicadAiState('idle');
    } catch {
      setSicadAiState('error');
    }
  };

  const runAi = async () => {
    if (files.length === 0) return;
    setAiState('running');
    setAiNotes('');
    try {
      const res = await fetch('/api/ferramentas/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'rename-rule', filenames: files.slice(0, 40).map(f => f.name) }),
      });
      if (!res.ok) throw new Error();
      const out = await res.json();
      setRule(out.rule);
      setRuleSource('ia');
      setPresetSel('');
      if (out.rule.type === 'segment') { setManSep(out.rule.separator); setManIdx(out.rule.index); }
      setAiNotes(`Confiança ${out.confidence}. ${out.notes || ''}`.trim());
      setAiState('done');
    } catch {
      setAiState('error');
    }
  };

  // Prévia: aplica a regra + resolve colisões (2ª foto do mesmo código vira CODIGO_2.ext)
  const results: ResultRow[] = useMemo(() => {
    if (!rule) return [];
    const counts: Record<string, number> = {};
    return files.map(f => {
      const manual = overrides[f.name]?.trim();
      const code = manual || applyRule(rule, f.name);
      if (!code) return { original: f.name, newName: null, status: 'fail' as const };
      const { ext } = stripExt(f.name);
      const n = (counts[code] = (counts[code] || 0) + 1);
      return n === 1
        ? { original: f.name, newName: `${code}${ext}`, status: 'ok' as const }
        : { original: f.name, newName: `${code}_${n}${ext}`, status: 'dup' as const };
    });
  }, [files, rule, overrides]);

  const okCount   = results.filter(r => r.status === 'ok').length;
  const dupCount  = results.filter(r => r.status === 'dup').length;
  const failCount = results.filter(r => r.status === 'fail').length;

  const savePreset = async () => {
    if (!rule || !presetName.trim()) return;
    setPresetMsg('');
    try {
      const res = await fetch('/api/ferramentas/rename-presets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: presetName.trim(), rule }),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error);
      setSavedPresets(d.presets || {});
      setPresetSel(presetName.trim());
      setPresetName('');
      setPresetMsg('Preset salvo.');
    } catch (e: any) {
      setPresetMsg(`Erro ao salvar: ${e?.message || 'falha'}`);
    }
  };

  const downloadZip = async () => {
    if (!rule || results.length === 0) return;
    setZipping(true);
    try {
      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      results.forEach((r, i) => {
        if (r.newName) zip.file(r.newName, files[i]);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `fotos_renomeadas_${presetSel || new Date().toISOString().slice(0, 10)}.zip`;
      a.click();
      URL.revokeObjectURL(a.href);
    } finally {
      setZipping(false);
    }
  };

  return (
    <div style={S.wrap}>
      <div style={{ marginBottom: 4, fontSize: 13, color: 'var(--text-secondary)' }}>
        Renomeie fotos de produto para o código Mercos — o Mercos reconhece a foto automaticamente quando o arquivo tem o nome do código.
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 24 }}>
        Exemplos: BR <span style={{ color: 'var(--text-secondary)' }}>5_MO-15_01.jpg → MO-15.jpg</span> · Ingá <span style={{ color: 'var(--text-secondary)' }}>17619_baixa.jpg → 17619.jpg</span>. As fotos não saem do seu navegador.
      </div>

      {/* 1. Upload */}
      <div style={S.section}>
        <label style={S.label}>1. Fotos da fábrica</label>
        <div
          style={S.dropzone(dragging)}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
        >
          <div style={S.dropText}>Arraste e solte as fotos aqui</div>
          <div style={S.dropSub}>ou clique para selecionar — .jpg, .png, .webp (várias de uma vez)</div>
          {files.length > 0 && <div style={S.fileName}>{files.length} foto{files.length === 1 ? '' : 's'} carregada{files.length === 1 ? '' : 's'}</div>}
        </div>
        <input
          ref={fileRef} type="file" accept="image/*,.jpg,.jpeg,.png,.gif,.webp" multiple
          style={{ display: 'none' }}
          onChange={e => { if (e.target.files?.length) addFiles(e.target.files); e.target.value = ''; }}
        />
        {files.length > 0 && (
          <div style={{ marginTop: 8 }}>
            <button style={S.btnGhost(false)} onClick={() => { setFiles([]); setAiState('idle'); }}>Limpar lista</button>
          </div>
        )}
      </div>

      {files.length > 0 && (
        <>
          {/* 2. Regra */}
          <div style={S.section}>
            <label style={S.label}>2. Regra de extração do código</label>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const, marginBottom: 14 }}>
              <button style={S.modeBtn(ruleSource === 'ia')} disabled={aiState === 'running'} onClick={runAi}>
                {aiState === 'running' ? 'IA analisando nomes…' : 'IA sugerir regra'}
              </button>
              <button style={S.modeBtn(ruleSource === 'depara')} disabled={deparaLoading} onClick={() => deparaRef.current?.click()}>
                {deparaLoading ? 'Lendo tabela…' : 'Tabela De→Para (SICAD)'}
              </button>
              <input
                ref={deparaRef} type="file" accept=".xlsx,.xls,.csv" style={{ display: 'none' }}
                onChange={e => { const f = e.target.files?.[0]; if (f) loadDeParaFile(f); e.target.value = ''; }}
              />
              <button style={S.modeBtn(false)} disabled={sicadAiState === 'running'} onClick={runSicadAi} title="A IA sugere o código Mercos de cada foto no padrão SICAD (ex.: Conjunto MSK6142 50x50 → 61425050). Revise antes de baixar.">
                {sicadAiState === 'running' ? 'IA sugerindo códigos…' : 'IA códigos (SICAD)'}
              </button>
              <select style={S.select} value={presetSel} onChange={e => selectPreset(e.target.value)}>
                <option value="">Preset da fábrica…</option>
                {Object.keys(presets).sort().map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Manual: separador</span>
                <input style={{ ...S.input, width: 44, textAlign: 'center' as const }} value={manSep} maxLength={3} onChange={e => setManSep(e.target.value)} />
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>trecho nº</span>
                <input style={{ ...S.input, width: 52 }} type="number" min={1} value={manIdx + 1} onChange={e => setManIdx(Math.max(0, (parseInt(e.target.value) || 1) - 1))} />
                <button style={S.btnGhost(!manSep)} disabled={!manSep} onClick={applyManual}>Aplicar</button>
              </div>
            </div>

            {aiState === 'error' && (
              <div style={S.notice('err')}>A IA não conseguiu deduzir a regra — use um preset ou a regra manual.</div>
            )}
            {sicadAiState === 'error' && (
              <div style={S.notice('err')}>A IA não conseguiu sugerir códigos — use a tabela De→Para ou corrija manualmente na prévia.</div>
            )}
            {rule && (
              <div style={S.notice(failCount === 0 ? 'ok' : 'warn')}>
                Regra ativa{ruleSource === 'ia' ? ' (sugerida pela IA)' : ruleSource === 'preset' ? ` (preset ${presetSel})` : ruleSource === 'depara' ? ' (tabela De→Para)' : ' (manual)'}: {describeRule(rule)}.
                {aiState === 'done' && aiNotes ? ` ${aiNotes}` : ''}
                {' '}Resultado: {okCount} ok{dupCount > 0 ? `, ${dupCount} código repetido (fica _2, _3…)` : ''}{failCount > 0 ? `, ${failCount} sem código — confira abaixo` : ''}.
              </div>
            )}

            {/* Salvar preset */}
            {rule && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                  style={{ ...S.input, width: 200 }} placeholder="Nome da fábrica (ex.: BR)"
                  value={presetName} onChange={e => setPresetName(e.target.value)}
                />
                <button style={S.btnGhost(!presetName.trim())} disabled={!presetName.trim()} onClick={savePreset}>
                  Salvar como preset
                </button>
                {presetMsg && <span style={{ fontSize: 12, color: presetMsg.startsWith('Erro') ? 'var(--red)' : 'var(--accent-light)' }}>{presetMsg}</span>}
              </div>
            )}
          </div>

          {/* 3. Prévia */}
          {rule && results.length > 0 && (
            <div style={S.section}>
              <label style={S.label}>3. Prévia antes → depois</label>
              <div style={S.tableWrap}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.th}>Arquivo original</th>
                      <th style={S.th}>Novo nome</th>
                      <th style={S.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td style={S.td}>{r.original}</td>
                        <td style={{ ...S.td, color: r.newName ? 'var(--text-primary)' : 'var(--red)', fontWeight: r.newName ? 600 : 400 }}>
                          {r.newName || (
                            <input
                              style={{ ...S.input, width: 150, borderColor: 'color-mix(in srgb, var(--red) 40%, transparent)' }}
                              placeholder="digite o código…"
                              value={overrides[r.original] || ''}
                              onChange={e => setOverrides(prev => ({ ...prev, [r.original]: e.target.value }))}
                            />
                          )}
                        </td>
                        <td style={S.td}>
                          <span style={S.status(r.status)}>
                            {r.status === 'ok' ? 'OK' : r.status === 'dup' ? 'REPETIDO' : 'FALHOU'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {dupCount > 0 && (
                <div style={S.info}>
                  Códigos repetidos ganham sufixo _2, _3… Linhas FALHOU aceitam código digitado à mão (e a sugestão da IA SICAD preenche por você).
                </div>
              )}
            </div>
          )}

          {/* 4. Download */}
          {rule && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                style={S.btn(zipping || okCount + dupCount === 0)}
                disabled={zipping || okCount + dupCount === 0}
                onClick={downloadZip}
              >
                {zipping ? 'Compactando…' : `Baixar ${okCount + dupCount} foto${okCount + dupCount === 1 ? '' : 's'} renomeada${okCount + dupCount === 1 ? '' : 's'} (.zip)`}
              </button>
              {failCount > 0 && (
                <span style={{ fontSize: 12, color: 'var(--amber)' }}>{failCount} arquivo{failCount === 1 ? '' : 's'} sem código ficará{failCount === 1 ? '' : 'ão'} de fora</span>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
