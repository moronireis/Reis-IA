import { useState, useEffect, useRef, useCallback } from 'react';

// ── Types (mirror /api/metrics) ───────────────────────────────────────────────
type Rates = { deliveryRate: number; readRate: number; replyRate: number; failRate: number };
type Agg = { sent: number; delivered: number; read: number; replied: number; failed: number } & Rates;
type SeriesPoint = { day: string; sent: number; delivered: number; read: number; replied: number; failed: number };
type Breakdown = { name: string } & Agg;
type CampaignRow = { id: string; name: string; instance: string; vendedor: string; template: string; hasMedia: boolean } & Agg;
type MetricsData = {
  range: { from: string; to: string; label: string };
  totals: Agg;
  delta: { sent: number | null; delivered: number | null; replied: number | null; failed: number | null };
  series: SeriesPoint[];
  byCampaign: CampaignRow[];
  byInstance: Breakdown[];
  byVendedor: Breakdown[];
  byTemplate: Breakdown[];
};

const RANGES = [
  { id: 'today', label: 'Hoje' },
  { id: '7d', label: '7 dias' },
  { id: '30d', label: '30 dias' },
] as const;

const C = { green: 'var(--accent)', greenLight: 'var(--accent-light)', blue: '#4A90FF', red: 'var(--red)', ink: 'var(--text-primary)', sub: 'var(--text-secondary)', mut: 'var(--text-muted)' };

const fmt = (n: number) => n.toLocaleString('pt-BR');
const pct = (r: number) => `${(r * 100).toFixed(r >= 0.1 ? 0 : 1)}%`;

export default function MetricsView() {
  const [range, setRange] = useState<string>('7d');
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<'campanha' | 'numero' | 'vendedor' | 'template'>('campanha');
  const [refreshedAt, setRefreshedAt] = useState<Date | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const r = await fetch(`/api/metrics?range=${range}`);
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Falha ao carregar métricas');
      setData(d); setError(null); setRefreshedAt(new Date());
    } catch (e: any) {
      setError(e.message || 'Erro');
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => { load(); }, [load]);
  // Auto-refresh silencioso a cada 30s (polling — sem webhook, é o "tempo real" possível)
  useEffect(() => {
    const t = setInterval(() => load(true), 30_000);
    return () => clearInterval(t);
  }, [load]);

  const exportCsv = () => {
    if (!data) return;
    const rows = data.byCampaign;
    const header = ['Campanha', 'Numero', 'Vendedor', 'Template', 'Enviadas', 'Entregues', 'Lidas', 'Respostas', 'Falhas', 'Taxa entrega', 'Taxa resposta'];
    const body = rows.map(r => [r.name, r.instance, r.vendedor, r.template, r.sent, r.delivered, r.read, r.replied, r.failed, pct(r.deliveryRate), pct(r.replyRate)]);
    const csv = [header, ...body].map(line => line.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url; a.download = `metricas-azeredo-${range}-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const t = data?.totals;
  const breakdown: Breakdown[] | CampaignRow[] =
    tab === 'campanha' ? (data?.byCampaign || [])
    : tab === 'numero' ? (data?.byInstance || [])
    : tab === 'vendedor' ? (data?.byVendedor || [])
    : (data?.byTemplate || []);

  return (
    <div style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden', width: '100%' }}>
    <div style={{ padding: '22px clamp(16px, 3vw, 34px) 60px', maxWidth: 1240, margin: '0 auto', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: C.ink }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: C.sub, marginTop: 2 }}>
            Disparos, entregas e respostas · {data?.range.label || '—'}
            {refreshedAt && <span style={{ color: C.mut }}> · atualizado {refreshedAt.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div className="glass-soft" style={{ display: 'flex', padding: 3, borderRadius: 10, gap: 2 }}>
            {RANGES.map(r => (
              <button key={r.id} onClick={() => setRange(r.id)} style={segBtn(range === r.id)}>{r.label}</button>
            ))}
          </div>
          <button onClick={exportCsv} disabled={!data} style={ghostBtn}>Exportar CSV</button>
        </div>
      </div>

      {error && <div className="glass" style={{ padding: 16, color: C.red, fontSize: 13, marginBottom: 18 }}>Erro: {error}</div>}
      {loading && !data && <SkeletonGrid />}

      {data && (
        <>
          {/* KPI row */}
          <div className="metrics-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
            <Kpi label="Enviadas"  value={t!.sent}      delta={data.delta.sent}      color={C.green} />
            <Kpi label="Entregues" value={t!.delivered} rate={t!.deliveryRate} rateLabel="entrega" delta={data.delta.delivered} color={C.greenLight} />
            <Kpi label="Lidas"     value={t!.read}      rate={t!.readRate}     rateLabel="leitura" color={C.blue} />
            <Kpi label="Respostas" value={t!.replied}   rate={t!.replyRate}    rateLabel="resposta" delta={data.delta.replied} color={C.blue} />
            <Kpi label="Falhas"    value={t!.failed}    rate={t!.failRate}     rateLabel="falha" delta={data.delta.failed} color={C.red} invertDelta />
          </div>

          {/* Chart + Funnel */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1fr)', gap: 12, marginBottom: 16 }} className="metrics-split">
            <div className="glass" style={{ padding: '18px 20px 12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <h2 style={panelTitle}>Envios × Respostas por dia</h2>
                <Legend />
              </div>
              <TimeSeriesChart series={data.series} />
            </div>
            <div className="glass" style={{ padding: '18px 20px' }}>
              <h2 style={{ ...panelTitle, marginBottom: 14 }}>Funil</h2>
              <Funnel totals={t!} />
            </div>
          </div>

          {/* Breakdowns */}
          <div className="glass" style={{ padding: '16px 20px 8px' }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12, flexWrap: 'wrap' }}>
              {([['campanha', 'Por campanha'], ['numero', 'Por número'], ['vendedor', 'Por vendedor'], ['template', 'Por template']] as const).map(([id, lbl]) => (
                <button key={id} onClick={() => setTab(id)} style={tabBtn(tab === id)}>{lbl}</button>
              ))}
            </div>
            <BreakdownTable rows={breakdown} kind={tab} />
          </div>
        </>
      )}
    </div>
    </div>
  );
}

// ── KPI tile ───────────────────────────────────────────────────────────────────
function Kpi({ label, value, rate, rateLabel, delta, color, invertDelta }: {
  label: string; value: number; rate?: number; rateLabel?: string; delta?: number | null; color: string; invertDelta?: boolean;
}) {
  return (
    <div className="glass glass-hover" style={{ padding: '15px 16px', borderRadius: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
        <span style={{ width: 7, height: 7, borderRadius: 2, background: color, boxShadow: `0 0 10px ${color}66` }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', color: C.sub }}>{label}</span>
      </div>
      <div style={{ fontSize: 27, fontWeight: 700, color: C.ink, lineHeight: 1, letterSpacing: '-0.02em' }}>{fmt(value)}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 7, minHeight: 16 }}>
        {rate !== undefined && <span style={{ fontSize: 12, color: C.sub }}>{pct(rate)} <span style={{ color: C.mut }}>{rateLabel}</span></span>}
        {delta !== undefined && <DeltaBadge delta={delta} invert={invertDelta} />}
      </div>
    </div>
  );
}

function DeltaBadge({ delta, invert }: { delta: number | null | undefined; invert?: boolean }) {
  if (delta === undefined) return null;
  if (delta === null) return <span style={{ fontSize: 11, color: C.mut, marginLeft: 'auto' }}>novo</span>;
  const up = delta > 0;
  const good = invert ? !up : up;
  if (delta === 0) return <span style={{ fontSize: 11, color: C.mut, marginLeft: 'auto' }}>0%</span>;
  const col = good ? C.green : C.red;
  return (
    <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: col, display: 'flex', alignItems: 'center', gap: 2 }}>
      <span aria-hidden>{up ? '▲' : '▼'}</span>{Math.abs(delta * 100).toFixed(0)}%
    </span>
  );
}

// ── Legend (2 series → always present) ──────────────────────────────────────────
function Legend() {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      {[['Enviadas', C.green], ['Respostas', C.blue]].map(([l, c]) => (
        <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.sub }}>
          <span style={{ width: 12, height: 3, borderRadius: 2, background: c as string }} />{l}
        </span>
      ))}
    </div>
  );
}

// ── Time-series (area for sent + line for replied, one axis, hover crosshair) ────
function TimeSeriesChart({ series }: { series: SeriesPoint[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(720);
  const [hover, setHover] = useState<number | null>(null);
  const H = 210, padL = 34, padR = 12, padT = 12, padB = 26;

  useEffect(() => {
    if (!wrapRef.current) return;
    const ro = new ResizeObserver(entries => setW(entries[0].contentRect.width));
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  if (!series.length) return <div style={emptyBox}>Sem disparos no período.</div>;

  const plotW = Math.max(w - padL - padR, 10), plotH = H - padT - padB;
  const maxV = Math.max(1, ...series.map(s => s.sent));
  const niceMax = niceCeil(maxV);
  const n = series.length;
  const xOf = (i: number) => padL + (n === 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const yOf = (v: number) => padT + plotH - (v / niceMax) * plotH;

  const areaPts = series.map((s, i) => `${xOf(i)},${yOf(s.sent)}`);
  const areaPath = `M${padL},${padT + plotH} L${areaPts.join(' L')} L${xOf(n - 1)},${padT + plotH} Z`;
  const sentLine = `M${series.map((s, i) => `${xOf(i)},${yOf(s.sent)}`).join(' L')}`;
  const replyLine = `M${series.map((s, i) => `${xOf(i)},${yOf(s.replied)}`).join(' L')}`;
  const ticks = [0, niceMax / 2, niceMax];
  const xLabelEvery = Math.ceil(n / 6);

  const onMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (w / rect.width);
    const i = Math.round(((x - padL) / plotW) * (n - 1));
    setHover(Math.max(0, Math.min(n - 1, i)));
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: '100%' }}>
      <svg width="100%" viewBox={`0 0 ${w} ${H}`} style={{ display: 'block' }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        <defs>
          <linearGradient id="sentFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.green} stopOpacity="0.30" />
            <stop offset="100%" stopColor={C.green} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {ticks.map((tk, i) => (
          <g key={i}>
            <line x1={padL} y1={yOf(tk)} x2={w - padR} y2={yOf(tk)} stroke="var(--hairline)" strokeWidth="1" />
            <text x={padL - 7} y={yOf(tk) + 3} textAnchor="end" fontSize="10" fill={C.mut}>{fmt(Math.round(tk))}</text>
          </g>
        ))}
        {series.map((s, i) => (i % xLabelEvery === 0 || i === n - 1) && (
          <text key={i} x={xOf(i)} y={H - 8} textAnchor="middle" fontSize="10" fill={C.mut}>{fmtDay(s.day)}</text>
        ))}
        <path d={areaPath} fill="url(#sentFill)" />
        <path d={sentLine} fill="none" stroke={C.green} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <path d={replyLine} fill="none" stroke={C.blue} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {hover !== null && (
          <g>
            <line x1={xOf(hover)} y1={padT} x2={xOf(hover)} y2={padT + plotH} stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
            <circle cx={xOf(hover)} cy={yOf(series[hover].sent)} r="4" fill={C.green} stroke="var(--bg-secondary)" strokeWidth="2" />
            <circle cx={xOf(hover)} cy={yOf(series[hover].replied)} r="4" fill={C.blue} stroke="var(--bg-secondary)" strokeWidth="2" />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div className="glass-strong" style={{
          position: 'absolute', top: 6, pointerEvents: 'none', padding: '8px 11px', borderRadius: 10, fontSize: 12,
          left: `clamp(8px, ${(xOf(hover) / w) * 100}%, calc(100% - 130px))`, minWidth: 118,
        }}>
          <div style={{ color: C.sub, fontSize: 11, marginBottom: 4 }}>{fmtDayFull(series[hover].day)}</div>
          <Row c={C.green} k="Enviadas" v={series[hover].sent} />
          <Row c={C.greenLight} k="Entregues" v={series[hover].delivered} />
          <Row c={C.blue} k="Respostas" v={series[hover].replied} />
          {series[hover].failed > 0 && <Row c={C.red} k="Falhas" v={series[hover].failed} />}
        </div>
      )}
    </div>
  );
}
function Row({ c, k, v }: { c: string; k: string; v: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, lineHeight: 1.7 }}>
      <span style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
      <span style={{ color: C.sub, flex: 1 }}>{k}</span>
      <span style={{ color: C.ink, fontWeight: 600 }}>{fmt(v)}</span>
    </div>
  );
}

// ── Funnel (magnitude, single hue, direct labels) ───────────────────────────────
function Funnel({ totals }: { totals: Agg }) {
  const stages = [
    { label: 'Enviadas', value: totals.sent, color: C.green },
    { label: 'Entregues', value: totals.delivered, color: '#2fbf6e' },
    { label: 'Lidas', value: totals.read, color: '#2aa0c9' },
    { label: 'Respondidas', value: totals.replied, color: C.blue },
  ];
  const base = Math.max(1, totals.sent);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {stages.map((s, i) => {
        const w = Math.max((s.value / base) * 100, s.value > 0 ? 4 : 0.6);
        const rel = i === 0 ? 1 : s.value / Math.max(1, stages[i - 1].value);
        return (
          <div key={s.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
              <span style={{ color: C.sub }}>{s.label}</span>
              <span style={{ color: C.ink, fontWeight: 600 }}>{fmt(s.value)} {i > 0 && <span style={{ color: C.mut, fontWeight: 400 }}>· {pct(rel)}</span>}</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.05)', overflow: 'hidden' }}>
              <div style={{ width: `${w}%`, height: '100%', borderRadius: 5, background: s.color, boxShadow: `0 0 12px ${s.color}44`, transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Breakdown table ─────────────────────────────────────────────────────────────
function BreakdownTable({ rows, kind }: { rows: (Breakdown | CampaignRow)[]; kind: string }) {
  if (!rows.length) return <div style={emptyBox}>Sem dados no período.</div>;
  const showFail = kind === 'numero';
  const max = Math.max(1, ...rows.map(r => r.sent));
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
        <thead>
          <tr style={{ textAlign: 'left', fontSize: 11, color: C.mut, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <th style={th}>{kind === 'campanha' ? 'Campanha' : kind === 'numero' ? 'Número' : kind === 'vendedor' ? 'Vendedor' : 'Template'}</th>
            <th style={thR}>Enviadas</th>
            <th style={thR}>Entregues</th>
            <th style={thR}>Respostas</th>
            <th style={{ ...thR, width: 120 }}>{showFail ? 'Taxa falha' : 'Taxa resposta'}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const rate = showFail ? r.failRate : r.replyRate;
            const rateCol = showFail ? (r.failRate > 0.08 ? C.red : C.sub) : C.blue;
            return (
              <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ ...td, color: C.ink, fontWeight: 500 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240 }}>{r.name}</span>
                    {'hasMedia' in r && (r as CampaignRow).hasMedia && <span style={mediaTag}>mídia</span>}
                  </div>
                  {'instance' in r && <div style={{ fontSize: 11, color: C.mut, marginTop: 1 }}>{(r as CampaignRow).instance} · {(r as CampaignRow).vendedor}</div>}
                </td>
                <td style={tdR}>{fmt(r.sent)}</td>
                <td style={tdR}>{fmt(r.delivered)}</td>
                <td style={tdR}>{fmt(r.replied)}</td>
                <td style={tdR}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                    <div style={{ width: 46, height: 5, borderRadius: 3, background: 'var(--hairline)', overflow: 'hidden' }}>
                      <div style={{ width: `${Math.min(rate * 100 * (showFail ? 4 : 2.2), 100)}%`, height: '100%', background: rateCol }} />
                    </div>
                    <span style={{ color: rateCol, fontWeight: 600, minWidth: 34, textAlign: 'right' }}>{pct(rate)}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── skeleton ────────────────────────────────────────────────────────────────────
function SkeletonGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
      {[0, 1, 2, 3, 4].map(i => <div key={i} className="glass" style={{ height: 96, opacity: 0.5, animation: 'pulse 1.4s ease-in-out infinite' }} />)}
    </div>
  );
}

// ── date helpers ─────────────────────────────────────────────────────────────────
function fmtDay(day: string) { const [, m, d] = day.split('-'); return `${d}/${m}`; }
function fmtDayFull(day: string) {
  const dt = new Date(day + 'T12:00:00');
  return dt.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}
function niceCeil(v: number) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10) * p;
}

// ── inline style tokens ──────────────────────────────────────────────────────────
const segBtn = (active: boolean): React.CSSProperties => ({
  padding: '6px 13px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, fontFamily: 'inherit',
  background: active ? 'linear-gradient(180deg, rgba(37,211,102,0.24), rgba(37,211,102,0.10))' : 'transparent',
  color: active ? C.greenLight : C.sub,
  boxShadow: active ? 'inset 0 1px 0 rgba(255,255,255,0.12)' : 'none', transition: 'all 0.15s',
});
const ghostBtn: React.CSSProperties = {
  padding: '7px 14px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.10)', cursor: 'pointer', fontSize: 12.5, fontWeight: 500,
  background: 'rgba(255,255,255,0.03)', color: C.sub, fontFamily: 'inherit',
};
const tabBtn = (active: boolean): React.CSSProperties => ({
  padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12.5, fontWeight: 600, fontFamily: 'inherit',
  background: active ? 'rgba(37,211,102,0.14)' : 'transparent', color: active ? C.greenLight : C.sub, transition: 'all 0.15s',
});
const panelTitle: React.CSSProperties = { fontSize: 13.5, fontWeight: 600, color: C.ink };
const emptyBox: React.CSSProperties = { padding: '30px 0', textAlign: 'center', fontSize: 13, color: C.mut };
const th: React.CSSProperties = { padding: '6px 10px', fontWeight: 600 };
const thR: React.CSSProperties = { ...th, textAlign: 'right' };
const td: React.CSSProperties = { padding: '11px 10px', fontSize: 13, color: C.sub, verticalAlign: 'top' };
const tdR: React.CSSProperties = { ...td, textAlign: 'right', whiteSpace: 'nowrap' };
const mediaTag: React.CSSProperties = { fontSize: 9.5, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: C.blue, background: 'rgba(74,144,255,0.12)', padding: '1px 5px', borderRadius: 4 };
