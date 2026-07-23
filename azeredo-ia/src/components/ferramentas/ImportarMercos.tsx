import { useState, useRef, useCallback } from 'react';

/**
 * Importar Mercos (F8, Checkpoint 10/07 atualizado 14/07).
 * A API do Mercos foi descartada por ora — a Tati exporta a "Carteira
 * detalhada de clientes" (1 .xls por representada) e importa aqui:
 * upload → simulação (dry-run com relatório) → aplicar. Atualiza situação,
 * última compra, vendedor e vínculos por marca — mesmo motor do import
 * validado em produção em 09/07 (99,7% de match).
 */

interface ParsedFile {
  nome: string;
  representada: string;
  rows: any[][];
  erro?: string;
}
interface Report {
  arquivos: number; linhas: number; casadas: number; vinculos: number;
  contatos_atualizados: number; status_aplicados: Record<string, number>;
  marcas_sem_match: string[];
  nao_casadas: { arquivo: string; razao: string; cnpj: string | null; fone: string | null; situacao: string | null }[];
  dry_run: boolean;
}

const ink = 'var(--text-primary)', sub = 'var(--text-secondary)', mut = 'var(--text-muted)';
const STATUS_LABEL: Record<string, string> = { ativo: 'Ativos', inativo_recente: 'Inativos recentes', inativo_antigo: 'Inativos antigos' };

export default function ImportarMercos() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<ParsedFile[]>([]);
  const [parsing, setParsing] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [running, setRunning] = useState<'dry' | 'apply' | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const parseFiles = useCallback(async (list: FileList | File[]) => {
    setParsing(true);
    setReport(null);
    setError('');
    try {
      const XLSX = await import('xlsx');
      const parsed: ParsedFile[] = [];
      for (const f of Array.from(list)) {
        if (!/\.xlsx?$/i.test(f.name)) continue;
        try {
          const buf = await f.arrayBuffer();
          const wb = XLSX.read(buf, { type: 'array' });
          const data: any[][] = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1, defval: null });
          const rep = String(data[3]?.[0] || '').replace(/^Representada:/i, '').trim();
          const header = data[8] || [];
          if (String(header[0]).trim() !== 'Razão Social') {
            parsed.push({ nome: f.name, representada: rep, rows: [], erro: 'Formato inesperado — o relatório do Mercos tem o cabeçalho na linha 9' });
            continue;
          }
          const rows = data.slice(9).filter(r => r?.[0]).map(r => r.slice(0, 11));
          parsed.push({ nome: f.name, representada: rep, rows });
        } catch {
          parsed.push({ nome: f.name, representada: '', rows: [], erro: 'Não foi possível ler o arquivo' });
        }
      }
      setFiles(prev => {
        const seen = new Set(prev.map(p => p.nome));
        return [...prev, ...parsed.filter(p => !seen.has(p.nome))];
      });
    } finally {
      setParsing(false);
    }
  }, []);

  const valid = files.filter(f => !f.erro && f.rows.length > 0);
  const totalRows = valid.reduce((a, f) => a + f.rows.length, 0);

  const run = async (mode: 'dry' | 'apply') => {
    if (valid.length === 0) return;
    setRunning(mode);
    setError('');
    try {
      const r = await fetch('/api/ferramentas/import-mercos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dry_run: mode === 'dry',
          files: valid.map(f => ({ nome: f.nome, representada: f.representada, rows: f.rows })),
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Falha na importação');
      setReport(d);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setRunning(null);
    }
  };

  const downloadUnmatched = () => {
    if (!report || report.nao_casadas.length === 0) return;
    const header = ['Arquivo', 'Razão Social', 'CNPJ', 'Telefone', 'Situação'];
    const body = report.nao_casadas.map(u => [u.arquivo, u.razao, u.cnpj || '', u.fone || '', u.situacao || '']);
    const csv = [header, ...body].map(l => l.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `mercos-nao-casados-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '28px 32px', maxWidth: 960, margin: '0 auto' }}>
      <div style={{ marginBottom: 4, fontSize: 13, color: sub }}>
        Importe a "Carteira detalhada de clientes" do Mercos (1 arquivo por representada). Atualiza situação (ativo/inativo), última compra, vendedor e vínculos por marca.
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-faint)', marginBottom: 24 }}>
        No Mercos: Relatórios → Carteira detalhada de clientes → exportar por representada. Simule antes de aplicar — a simulação mostra o que muda e quem não casou, sem gravar nada.
      </div>

      {/* 1. Upload */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: mut, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, display: 'block' }}>1. Arquivos da carteira (.xls)</label>
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); if (e.dataTransfer.files.length) parseFiles(e.dataTransfer.files); }}
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? 'var(--accent-light)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: 12, padding: '32px 24px', textAlign: 'center', cursor: 'pointer',
            background: dragging ? 'color-mix(in srgb, var(--accent) 4%, transparent)' : 'rgba(255,255,255,0.02)', transition: 'all 0.15s',
          }}
        >
          <div style={{ fontSize: 14, color: mut, marginBottom: 4 }}>
            {parsing ? 'Lendo arquivos…' : 'Arraste os .xls aqui (vários de uma vez)'}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-faint)' }}>ou clique para selecionar</div>
        </div>
        <input
          ref={fileRef} type="file" accept=".xls,.xlsx" multiple style={{ display: 'none' }}
          onChange={e => { if (e.target.files?.length) parseFiles(e.target.files); e.target.value = ''; }}
        />
      </div>

      {/* 2. Arquivos lidos */}
      {files.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: mut, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8, display: 'block' }}>
            2. {files.length} arquivo{files.length !== 1 ? 's' : ''} · {totalRows.toLocaleString('pt-BR')} linhas
          </label>
          <div className="glass-panel" style={{ borderRadius: 12, overflow: 'hidden' }}>
            {files.map((f, i) => (
              <div key={f.nome} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 12 }}>
                <span style={{ flex: 1, color: ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.nome}</span>
                {f.erro ? (
                  <span style={{ color: 'var(--red)', fontSize: 11 }}>{f.erro}</span>
                ) : (
                  <>
                    <span style={{ color: 'var(--accent-light)', fontSize: 11 }}>{f.representada || '—'}</span>
                    <span style={{ color: mut, fontSize: 11, flexShrink: 0 }}>{f.rows.length} linhas</span>
                  </>
                )}
                <button
                  onClick={() => { setFiles(prev => prev.filter(x => x.nome !== f.nome)); setReport(null); }}
                  style={{ background: 'none', border: 'none', color: mut, cursor: 'pointer', padding: 2, display: 'flex' }}
                  title="Remover"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
            <button className="btn" disabled={valid.length === 0 || running !== null} onClick={() => run('dry')}>
              {running === 'dry' ? 'Simulando…' : 'Simular (não grava nada)'}
            </button>
            <button
              className="btn-primary btn"
              style={{ border: 'none', opacity: !report || report.dry_run === false ? undefined : 1 }}
              disabled={valid.length === 0 || running !== null || !report}
              title={!report ? 'Simule primeiro para conferir o resultado' : ''}
              onClick={() => run('apply')}
            >
              {running === 'apply' ? 'Importando…' : 'Aplicar importação'}
            </button>
            <button className="btn" onClick={() => { setFiles([]); setReport(null); }}>Limpar</button>
          </div>
        </div>
      )}

      {error && (
        <div style={{ fontSize: 12, color: 'var(--red)', border: '1px solid color-mix(in srgb, var(--red) 25%, transparent)', background: 'color-mix(in srgb, var(--red) 5%, transparent)', borderRadius: 10, padding: '10px 14px', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {/* 3. Relatório */}
      {report && (
        <div className="glass-panel anim" style={{ borderRadius: 14, padding: '18px 20px' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: report.dry_run ? 'var(--amber)' : 'var(--accent-light)', marginBottom: 12 }}>
            {report.dry_run ? 'Simulação — nada foi gravado' : 'Importação aplicada'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 10, marginBottom: 14 }}>
            {[
              ['Linhas lidas', report.linhas],
              ['Casadas com a base', report.casadas],
              ['Contatos atualizados', report.contatos_atualizados],
              ['Não casadas', report.nao_casadas.length],
            ].map(([l, v]) => (
              <div key={l as string} className="card-surface" style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: ink }}>{(v as number).toLocaleString('pt-BR')}</div>
                <div style={{ fontSize: 10.5, color: mut, marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: sub, marginBottom: 10 }}>
            Status {report.dry_run ? 'que serão aplicados' : 'aplicados'}:{' '}
            {Object.entries(report.status_aplicados).map(([k, v]) => `${STATUS_LABEL[k] || k}: ${v}`).join(' · ') || '—'}
          </div>
          {report.marcas_sem_match.length > 0 && (
            <div style={{ fontSize: 12, color: 'var(--amber)', marginBottom: 10 }}>
              Marcas sem correspondência (arquivos pulados): {report.marcas_sem_match.join('; ')}
            </div>
          )}
          {report.nao_casadas.length > 0 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: ink }}>Não casadas (validar com a Tati)</span>
                <button className="btn" style={{ padding: '4px 10px', fontSize: 11 }} onClick={downloadUnmatched}>Baixar .csv</button>
              </div>
              <div style={{ maxHeight: 220, overflowY: 'auto', border: '1px solid var(--hairline)', borderRadius: 10 }}>
                {report.nao_casadas.slice(0, 80).map((u, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: '6px 12px', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 11.5 }}>
                    <span style={{ flex: 1, color: ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.razao}</span>
                    <span style={{ color: mut }}>{u.cnpj || 'sem CNPJ'}</span>
                    <span style={{ color: mut }}>{u.fone || 'sem fone'}</span>
                  </div>
                ))}
                {report.nao_casadas.length > 80 && (
                  <div style={{ padding: '6px 12px', fontSize: 11, color: mut }}>… e mais {report.nao_casadas.length - 80} no .csv</div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
