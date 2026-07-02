import { useState, useEffect, useCallback } from 'react';

type Period = 'today' | 'last_7d' | 'last_30d' | 'this_month';

interface MetaSummary {
  impressions: number; reach: number; clicks: number; ctr: number;
  cpc: number; spend: number; messaging_starts: number; messaging_replies: number;
  messaging_depth2: number; messaging_depth3: number; messaging_depth5: number;
}

interface AccountBalance {
  name: string;
  spend_cap: number;
  amount_spent: number;
  balance: number;
  available_balance: number;
  pct_used: number;
}

interface DailyPoint {
  date: string; impressions: number; clicks: number; spend: number; messaging_starts: number;
}

interface CrmMetrics {
  total_conversations: number; new_last_7d: number; meetings_booked: number;
  closed: number; active_pipeline: number;
  by_stage: Record<string, number>;
  rates: { conv_to_meeting: number; conv_to_close: number; meeting_to_close: number };
}

interface MetaAd {
  id: string; name: string; status: string; thumbnail_url: string; object_type: string;
  impressions: number; clicks: number; spend: number; ctr: number; messaging_starts: number;
}

interface MetaCampaign {
  id: string; name: string; status: string;
  daily_budget: number; budget_remaining: number;
  impressions: number; clicks: number; spend: number; ctr: number; messaging_starts: number;
  ads: MetaAd[];
}

interface PipelineStage {
  count: number;
  value: number;
}

interface PipelineData {
  stage_data: Record<string, PipelineStage>;
  no_stage: number;
  needs_followup: number;
  avg_response_minutes: number | null;
  pipeline_value: number;
  closed_value: number;
  total_contacts: number;
  upcoming_events: Array<{ id: string; event_date: string; event_type: string | null; lead_stage: string | null }>;
}

const PERIODS: { value: Period; label: string }[] = [
  { value: 'today', label: 'Hoje' },
  { value: 'last_7d', label: '7 dias' },
  { value: 'last_30d', label: '30 dias' },
  { value: 'this_month', label: 'Este mês' },
];

const STAGE_LABELS: Record<string, string> = {
  novo: 'Novo', contato_feito: 'Contato feito', proposta_enviada: 'Proposta enviada',
  visita_agendada: 'Visita agendada', visita_realizada: 'Visita realizada',
  negociacao: 'Negociação', fechado: 'Fechado', perdido: 'Perdido',
};
const STAGE_COLORS: Record<string, string> = {
  novo: '#6B8F7A', contato_feito: '#7EA88E', proposta_enviada: '#C9A96E',
  visita_agendada: '#A8C5B5', visita_realizada: '#8AB4A2',
  negociacao: '#E8C87A', fechado: '#4CAF80', perdido: '#F87171',
};

function fmt(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}
function fmtBRL(n: number): string {
  return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(iso: string): string {
  const d = new Date(iso + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

// Budget bar (daily remaining)
function BudgetBar({ used, total, label }: { used: number; total: number; label: string }) {
  const pct = total > 0 ? Math.min((used / total) * 100, 100) : 0;
  const remaining = total - used;
  const color = pct > 80 ? '#F87171' : pct > 60 ? '#E8C87A' : '#4CAF80';
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(244,239,230,0.6)', marginBottom: 4 }}>
        <span>{label}</span>
        <span style={{ color: 'rgba(244,239,230,0.4)' }}>
          <span style={{ color }}>{fmtBRL(remaining)}</span> restante de {fmtBRL(total)}/dia
        </span>
      </div>
      <div style={{ height: 5, background: 'rgba(244,239,230,0.08)', borderRadius: 3 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 0.6s ease' }} />
      </div>
    </div>
  );
}

// Clean grouped bar chart — CSS flexbox, no SVG scaling issues
// Each day: thin gold bar (clicks) + thin green bar (msgs), side by side
// Both normalized independently so trends are visible regardless of scale difference
function DailyBarChart({ data }: { data: DailyPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (!data.length) return (
    <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>
      Sem dados para o período
    </div>
  );

  const BAR_H = 80; // max bar height in px
  const maxClicks = Math.max(...data.map(d => d.clicks), 1);
  const maxMsgs   = Math.max(...data.map(d => d.messaging_starts), 1);

  return (
    <div style={{ position: 'relative' }}>
      {/* Chart area */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6,
        height: BAR_H + 52, // bars + labels
        paddingTop: 16,
        borderBottom: '1px solid rgba(201,169,110,0.12)',
        position: 'relative',
      }}>
        {/* Horizontal grid lines */}
        {[25, 50, 75, 100].map(pct => (
          <div key={pct} style={{
            position: 'absolute',
            left: 0, right: 0,
            bottom: 52 + (BAR_H * pct / 100),
            borderTop: '1px dashed rgba(244,239,230,0.05)',
            pointerEvents: 'none',
          }} />
        ))}

        {data.map((d, i) => {
          const clickPct = d.clicks / maxClicks;
          const msgPct   = d.messaging_starts / maxMsgs;
          const isHov    = hovered === i;
          const ctr      = d.impressions > 0 ? ((d.clicks / d.impressions) * 100).toFixed(2) : '—';

          return (
            <div
              key={d.date}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default', position: 'relative' }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover tooltip */}
              {isHov && (
                <div style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginBottom: 8,
                  background: '#0D1910',
                  border: '1px solid rgba(201,169,110,0.35)',
                  borderRadius: 4,
                  padding: '8px 11px',
                  fontSize: 11,
                  color: '#F4EFE6',
                  whiteSpace: 'nowrap',
                  zIndex: 50,
                  boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                }}>
                  <div style={{ fontWeight: 600, color: '#C9A96E', marginBottom: 6, fontSize: 12 }}>{fmtDate(d.date)}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', columnGap: 12, rowGap: 3 }}>
                    <span style={{ color: 'rgba(244,239,230,0.45)' }}>Impressões</span>
                    <span style={{ textAlign: 'right' }}>{fmt(d.impressions)}</span>
                    <span style={{ color: '#C9A96E' }}>Cliques</span>
                    <span style={{ textAlign: 'right', color: '#C9A96E' }}>{d.clicks}</span>
                    <span style={{ color: '#4CAF80' }}>Msgs WPP</span>
                    <span style={{ textAlign: 'right', color: '#4CAF80' }}>{d.messaging_starts}</span>
                    <span style={{ color: 'rgba(244,239,230,0.45)' }}>CTR</span>
                    <span style={{ textAlign: 'right' }}>{ctr}%</span>
                    <span style={{ color: 'rgba(201,169,110,0.6)' }}>Gasto</span>
                    <span style={{ textAlign: 'right', color: 'rgba(201,169,110,0.8)' }}>{fmtBRL(d.spend)}</span>
                  </div>
                </div>
              )}

              {/* Bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: BAR_H, marginBottom: 0 }}>
                {/* Clicks bar — gold */}
                <div style={{
                  width: 10,
                  height: Math.max(clickPct * BAR_H, 3),
                  background: isHov ? '#E8D08A' : '#C9A96E',
                  borderRadius: '2px 2px 0 0',
                  transition: 'height 0.4s ease, background 0.15s',
                  flexShrink: 0,
                }} />
                {/* Msgs bar — green */}
                <div style={{
                  width: 10,
                  height: Math.max(msgPct * BAR_H, 3),
                  background: isHov
                    ? '#5DCEA0'
                    : d.messaging_starts > 0
                      ? '#4CAF80'
                      : 'rgba(76,175,128,0.18)',
                  borderRadius: '2px 2px 0 0',
                  transition: 'height 0.4s ease, background 0.15s',
                  flexShrink: 0,
                }} />
              </div>

              {/* Date */}
              <div style={{
                fontSize: 10,
                color: isHov ? 'rgba(244,239,230,0.75)' : 'rgba(244,239,230,0.35)',
                marginTop: 6,
                fontWeight: isHov ? 500 : 400,
                letterSpacing: '0.02em',
                transition: 'color 0.15s',
              }}>
                {fmtDate(d.date)}
              </div>

              {/* Spend */}
              <div style={{
                fontSize: 10,
                color: isHov ? 'rgba(201,169,110,0.75)' : 'rgba(201,169,110,0.32)',
                marginTop: 2,
                transition: 'color 0.15s',
              }}>
                R${Math.round(d.spend)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend below chart */}
      <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 11 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, background: '#C9A96E', borderRadius: 2, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ color: 'rgba(244,239,230,0.45)' }}>Cliques (escala própria)</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <span style={{ width: 10, height: 10, background: '#4CAF80', borderRadius: 2, display: 'inline-block', flexShrink: 0 }} />
          <span style={{ color: 'rgba(244,239,230,0.45)' }}>Msgs WhatsApp (escala própria)</span>
        </span>
        <span style={{ color: 'rgba(201,169,110,0.35)', marginLeft: 'auto', fontSize: 10 }}>Passe o mouse para detalhes</span>
      </div>
    </div>
  );
}

function KpiCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div style={{
      background: '#192820', border: `1px solid ${accent ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.12)'}`,
      borderRadius: 4, padding: '14px 16px',
    }}>
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(244,239,230,0.4)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 400, color: accent ? '#C9A96E' : '#F4EFE6', letterSpacing: '-0.02em', lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: 'rgba(244,239,230,0.38)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// Creative thumbnail card
function CreativeCard({ ad }: { ad: MetaAd }) {
  const isVideo = ad.object_type === 'VIDEO';
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      background: '#192820', border: '1px solid rgba(201,169,110,0.12)',
      borderRadius: 4, overflow: 'hidden',
    }}>
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0E1A13', overflow: 'hidden', borderBottom: '1px solid rgba(201,169,110,0.08)' }}>
        {ad.thumbnail_url && !imgError ? (
          <img
            src={ad.thumbnail_url}
            alt={ad.name}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="32" height="32" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1.5" viewBox="0 0 24 24">
              {isVideo
                ? <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              }
            </svg>
          </div>
        )}
        {isVideo && (
          <div style={{
            position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.6)',
            borderRadius: 2, padding: '2px 6px', fontSize: 10, fontWeight: 600,
            letterSpacing: '0.06em', color: '#F4EFE6',
          }}>VÍDEO</div>
        )}
      </div>

      {/* Ad name */}
      <div style={{ padding: '10px 12px 8px' }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: '#F4EFE6', marginBottom: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={ad.name}>
          {ad.name}
        </div>

        {/* Metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px' }}>
          {[
            { label: 'Impressões', value: fmt(ad.impressions) },
            { label: 'Cliques', value: fmt(ad.clicks) },
            { label: 'CTR', value: `${ad.ctr.toFixed(2)}%`, highlight: ad.ctr > 2 },
            { label: 'Gasto', value: fmtBRL(ad.spend) },
            { label: 'Msgs Iniciadas', value: ad.messaging_starts > 0 ? String(ad.messaging_starts) : '—', highlight: ad.messaging_starts > 0 },
            { label: 'CPC', value: ad.clicks > 0 ? fmtBRL(ad.spend / ad.clicks) : '—' },
          ].map(m => (
            <div key={m.label}>
              <div style={{ fontSize: 10, color: 'rgba(244,239,230,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 1 }}>{m.label}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: m.highlight ? '#C9A96E' : 'rgba(244,239,230,0.75)' }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DashboardView() {
  const [period, setPeriod] = useState<Period>('last_7d');
  const [meta, setMeta] = useState<{ summary: MetaSummary; daily: DailyPoint[]; balance: AccountBalance | null } | null>(null);
  const [crm, setCrm] = useState<CrmMetrics | null>(null);
  const [pipeline, setPipeline] = useState<PipelineData | null>(null);
  const [campaigns, setCampaigns] = useState<MetaCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchMeta = useCallback(async (p: Period) => {
    try {
      const res = await fetch(`/api/meta/metrics?period=${p}`);
      if (res.ok) setMeta(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchCrm = useCallback(async () => {
    try {
      const res = await fetch('/api/crm/metrics');
      if (res.ok) setCrm(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchPipeline = useCallback(async () => {
    try {
      const res = await fetch('/api/comercial/pipeline');
      if (res.ok) setPipeline(await res.json());
    } catch { /* silent */ }
  }, []);

  const fetchCampaigns = useCallback(async (p: Period) => {
    try {
      const res = await fetch(`/api/meta/campaigns?period=${p}`);
      if (res.ok) setCampaigns(await res.json());
    } catch { /* silent */ }
  }, []);

  const refresh = useCallback(async (p: Period) => {
    setLoading(true);
    await Promise.all([fetchMeta(p), fetchCrm(), fetchPipeline(), fetchCampaigns(p)]);
    setLastRefresh(new Date());
    setLoading(false);
  }, [fetchMeta, fetchCrm, fetchPipeline, fetchCampaigns]);

  useEffect(() => { refresh(period); }, [period, refresh]);

  useEffect(() => {
    const crmId = setInterval(() => { fetchCrm(); fetchPipeline(); }, 60_000);
    const metaId = setInterval(() => { fetchMeta(period); fetchCampaigns(period); }, 15 * 60_000);
    return () => { clearInterval(crmId); clearInterval(metaId); };
  }, [period, fetchCrm, fetchPipeline, fetchMeta, fetchCampaigns]);

  const m = meta?.summary;
  const daily = meta?.daily || [];
  const balance = meta?.balance ?? null;
  const stageOrder = ['novo', 'contato_feito', 'proposta_enviada', 'visita_agendada', 'visita_realizada', 'negociacao', 'fechado', 'perdido'];
  const stageMax = crm ? Math.max(...Object.values(crm.by_stage), 1) : 1;
  const ctrClickToMsg = m && m.clicks > 0 ? ((m.messaging_starts / m.clicks) * 100).toFixed(1) : '—';

  // All active ads across all campaigns
  const allAds = campaigns.flatMap(c => c.ads).sort((a, b) => b.messaging_starts - a.messaging_starts || b.spend - a.spend);

  return (
    <div style={{ height: '100vh', overflowY: 'auto', background: '#1E2E24', color: '#F4EFE6', fontFamily: '"Inter", system-ui, -apple-system, sans-serif', fontSize: 14, lineHeight: 1.5 }}>

      {/* ── Header ── */}
      <div style={{
        padding: '14px 24px', borderBottom: '1px solid rgba(201,169,110,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#192820', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 14, color: '#C9A96E', letterSpacing: '0.08em', fontWeight: 400 }}>
            Dashboard
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {PERIODS.map(p => (
              <button key={p.value} onClick={() => setPeriod(p.value)} style={{
                padding: '4px 12px', fontSize: 12, fontWeight: 500, letterSpacing: '0.04em',
                background: period === p.value ? 'rgba(201,169,110,0.18)' : 'transparent',
                border: `1px solid ${period === p.value ? 'rgba(201,169,110,0.45)' : 'rgba(201,169,110,0.15)'}`,
                color: period === p.value ? '#C9A96E' : 'rgba(244,239,230,0.45)',
                borderRadius: 2, cursor: 'pointer', transition: 'all 0.2s',
              }}>{p.label}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {loading && <div style={{ fontSize: 12, color: 'rgba(244,239,230,0.3)' }}>Carregando...</div>}
          {lastRefresh && !loading && (
            <div style={{ fontSize: 12, color: 'rgba(244,239,230,0.28)' }}>
              Atualizado às {lastRefresh.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
            </div>
          )}
          <button onClick={() => refresh(period)} style={{
            background: 'transparent', border: '1px solid rgba(201,169,110,0.18)',
            color: 'rgba(201,169,110,0.55)', borderRadius: 2, padding: '4px 10px',
            cursor: 'pointer', fontSize: 13,
          }} title="Atualizar">↻</button>
        </div>
      </div>

      <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* ── 1. Meta KPIs ── */}
        <Section title="Meta Ads — Tráfego">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
            <KpiCard label="Alcance" value={fmt(m?.reach || 0)} sub="pessoas únicas" />
            <KpiCard label="Impressões" value={fmt(m?.impressions || 0)} sub="exibições totais" />
            <KpiCard label="Cliques" value={fmt(m?.clicks || 0)} sub="no anúncio" />
            <KpiCard label="CTR" value={`${Number(m?.ctr || 0).toFixed(2)}%`} sub="clique / impressão" accent />
            <KpiCard label="CPC Médio" value={fmtBRL(m?.cpc || 0)} sub="por clique" />
            <KpiCard label="Gasto Total" value={fmtBRL(m?.spend || 0)} sub="investido" accent />
          </div>
        </Section>

        {/* ── 2. WhatsApp via Meta ── */}
        <Section title="Meta Ads — Conversas WhatsApp">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            <KpiCard label="Iniciaram Conversa" value={fmt(m?.messaging_starts || 0)} sub="via anúncio" accent />
            <KpiCard label="Responderam" value={fmt(m?.messaging_replies || 0)} sub="1ª resposta" />
            <KpiCard label="Profundidade 3+" value={fmt(m?.messaging_depth3 || 0)} sub="3 ou mais msgs" />
            <KpiCard label="Profundidade 5+" value={fmt(m?.messaging_depth5 || 0)} sub="conversa qualificada" />
            <KpiCard label="Clique → Msg" value={`${ctrClickToMsg}%`} sub="conversão topo de funil" accent />
          </div>
        </Section>

        {/* ── 3. Comercial Pipeline ── */}
        <Section title="Comercial — Pipeline de Vendas">
          {/* KPIs row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 12 }}>
            <KpiCard
              label="Pipeline ativo"
              value={pipeline ? fmtBRL(pipeline.pipeline_value) : '—'}
              sub="proposta → negociação"
              accent
            />
            <KpiCard
              label="Contratos fechados"
              value={pipeline ? fmtBRL(pipeline.closed_value) : '—'}
              sub="valor estimado"
            />
            <KpiCard
              label="Aguardando resposta"
              value={pipeline ? String(pipeline.needs_followup) : '—'}
              sub="inbound sem resposta +2h"
              accent={Boolean(pipeline && pipeline.needs_followup > 0)}
            />
            <KpiCard
              label="Tempo médio resposta"
              value={pipeline?.avg_response_minutes != null ? `${pipeline.avg_response_minutes}min` : '—'}
              sub="últimos 30 dias"
            />
          </div>

          {/* Stage funnel + upcoming events */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

            {/* Stage funnel bars with value */}
            <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.45)', marginBottom: 12 }}>
                Funil por estágio
              </div>
              {pipeline ? (() => {
                const activeStages = ['contato_feito', 'proposta_enviada', 'visita_agendada', 'visita_realizada', 'negociacao', 'fechado'];
                const maxCount = Math.max(...activeStages.map(s => pipeline.stage_data[s]?.count || 0), 1);
                return activeStages.map(stage => {
                  const d = pipeline.stage_data[stage] || { count: 0, value: 0 };
                  const pct = (d.count / maxCount) * 100;
                  const color = STAGE_COLORS[stage] || '#C9A96E';
                  return (
                    <div key={stage} style={{ marginBottom: 9 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(244,239,230,0.6)', marginBottom: 3 }}>
                        <span>{STAGE_LABELS[stage]}</span>
                        <span style={{ display: 'flex', gap: 8 }}>
                          <span style={{ color: 'rgba(244,239,230,0.4)' }}>{d.count} lead{d.count !== 1 ? 's' : ''}</span>
                          {d.value > 0 && <span style={{ color: 'rgba(201,169,110,0.6)' }}>{fmtBRL(d.value)}</span>}
                        </span>
                      </div>
                      <div style={{ height: 5, background: 'rgba(244,239,230,0.07)', borderRadius: 2 }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.5s ease' }} />
                      </div>
                    </div>
                  );
                });
              })() : (
                <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Carregando...</div>
              )}
            </div>

            {/* Upcoming events */}
            <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.45)', marginBottom: 12 }}>
                Próximos eventos (30 dias)
              </div>
              {pipeline?.upcoming_events?.length ? pipeline.upcoming_events.slice(0, 6).map((ev, i) => {
                const d = new Date(ev.event_date + 'T12:00:00');
                const daysAway = Math.ceil((d.getTime() - Date.now()) / 86400000);
                return (
                  <div key={ev.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '7px 0',
                    borderBottom: i < Math.min(pipeline.upcoming_events.length, 6) - 1 ? '1px solid rgba(201,169,110,0.07)' : 'none',
                  }}>
                    <div style={{
                      minWidth: 44, textAlign: 'center', background: 'rgba(201,169,110,0.08)',
                      border: '1px solid rgba(201,169,110,0.15)', borderRadius: 3, padding: '4px 0',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#C9A96E', lineHeight: 1 }}>
                        {d.getDate().toString().padStart(2, '0')}
                      </div>
                      <div style={{ fontSize: 10, color: 'rgba(201,169,110,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {d.toLocaleDateString('pt-BR', { month: 'short' })}
                      </div>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, color: '#F4EFE6', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {ev.event_type || 'Evento'}
                      </div>
                      <div style={{ fontSize: 11, color: 'rgba(244,239,230,0.38)' }}>
                        {STAGE_LABELS[ev.lead_stage || ''] || ev.lead_stage || '—'}
                      </div>
                    </div>
                    <div style={{
                      fontSize: 11, fontWeight: 500,
                      color: daysAway <= 7 ? '#F87171' : daysAway <= 14 ? '#E8C87A' : 'rgba(244,239,230,0.35)',
                      whiteSpace: 'nowrap',
                    }}>
                      {daysAway === 0 ? 'Hoje' : daysAway === 1 ? 'Amanhã' : `${daysAway}d`}
                    </div>
                  </div>
                );
              }) : (
                <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>
                  {pipeline ? 'Nenhum evento nos próximos 30 dias' : 'Carregando...'}
                </div>
              )}
              {pipeline && (
                <a href="/comercial" style={{
                  display: 'block', marginTop: 12, textAlign: 'center',
                  fontSize: 11, color: 'rgba(201,169,110,0.5)', textDecoration: 'none',
                  letterSpacing: '0.06em',
                }}>
                  Ver pipeline completo →
                </a>
              )}
            </div>
          </div>
        </Section>

        {/* ── 4. CRM Pipeline ── */}
        <Section title="CRM WhatsApp — Pipeline">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            <KpiCard label="Total Conversas" value={fmt(crm?.total_conversations || 0)} sub="com histórico" />
            <KpiCard label="Novos (7 dias)" value={fmt(crm?.new_last_7d || 0)} sub="últimos 7 dias" />
            <KpiCard label="Visitas Marcadas" value={fmt(crm?.meetings_booked || 0)} sub="agendadas + realizadas" accent />
            <KpiCard label="Fechamentos" value={fmt(crm?.closed || 0)} sub="contratos fechados" accent />
            <KpiCard label="Visita → Fechamento" value={`${crm?.rates.meeting_to_close || 0}%`} sub="taxa de conversão final" />
          </div>
        </Section>

        {/* ── 4. Charts + Stage distribution ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, padding: 16 }}>
            <Section title="Tendência diária">
              <DailyBarChart data={daily} />
            </Section>
          </div>

          <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, padding: 16 }}>
            <Section title="Distribuição por estágio">
              {crm ? stageOrder.map(stage => {
                const count = crm.by_stage[stage] || 0;
                const pct = stageMax > 0 ? (count / stageMax) * 100 : 0;
                const share = crm.total_conversations > 0 ? ((count / crm.total_conversations) * 100).toFixed(0) : '0';
                return (
                  <div key={stage} style={{ marginBottom: 7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(244,239,230,0.6)', marginBottom: 3 }}>
                      <span>{STAGE_LABELS[stage]}</span>
                      <span style={{ color: 'rgba(244,239,230,0.38)' }}>{count} <span style={{ opacity: 0.6 }}>({share}%)</span></span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(244,239,230,0.07)', borderRadius: 2 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: STAGE_COLORS[stage] || '#C9A96E', borderRadius: 2, transition: 'width 0.5s ease' }} />
                    </div>
                  </div>
                );
              }) : (
                <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(244,239,230,0.2)', fontSize: 13 }}>Carregando...</div>
              )}
            </Section>
          </div>
        </div>

        {/* ── 5. Account balance ── */}
        {balance && (
          <div style={{
            background: '#192820',
            border: '1px solid rgba(201,169,110,0.22)',
            borderRadius: 4,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
          }}>
            {/* Conta name */}
            <div style={{ minWidth: 160 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(201,169,110,0.45)', marginBottom: 3 }}>Conta de anúncios</div>
              <div style={{ fontSize: 12, color: 'rgba(244,239,230,0.5)', lineHeight: 1.3 }}>Castelo dos Lagos BM</div>
            </div>

            <div style={{ width: 1, height: 36, background: 'rgba(201,169,110,0.1)', margin: '0 24px' }} />

            {/* Saldo disponível — main emphasis */}
            <div style={{ minWidth: 160 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(201,169,110,0.45)', marginBottom: 3 }}>Saldo disponível</div>
              <div style={{
                fontSize: 22,
                fontWeight: 400,
                color: balance.pct_used >= 92 ? '#F87171' : balance.pct_used >= 80 ? '#E8C87A' : '#C9A96E',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>
                {fmtBRL(balance.available_balance)}
              </div>
            </div>

            <div style={{ width: 1, height: 36, background: 'rgba(201,169,110,0.1)', margin: '0 24px' }} />

            {/* Gasto */}
            <div style={{ minWidth: 130 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(201,169,110,0.45)', marginBottom: 3 }}>Gasto total</div>
              <div style={{ fontSize: 15, fontWeight: 400, color: 'rgba(244,239,230,0.7)', letterSpacing: '-0.01em' }}>{fmtBRL(balance.amount_spent)}</div>
            </div>

            <div style={{ width: 1, height: 36, background: 'rgba(201,169,110,0.1)', margin: '0 24px' }} />

            {/* Limite */}
            <div style={{ minWidth: 130 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.09em', color: 'rgba(201,169,110,0.45)', marginBottom: 3 }}>Limite da conta</div>
              <div style={{ fontSize: 15, fontWeight: 400, color: 'rgba(244,239,230,0.45)', letterSpacing: '-0.01em' }}>{fmtBRL(balance.spend_cap)}</div>
            </div>

            {/* Progress bar — takes remaining space */}
            <div style={{ flex: 1, marginLeft: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(244,239,230,0.3)', marginBottom: 6 }}>
                <span>Utilização do limite</span>
                <span style={{ color: balance.pct_used >= 92 ? '#F87171' : 'rgba(244,239,230,0.4)' }}>{balance.pct_used}%</span>
              </div>
              <div style={{ height: 6, background: 'rgba(244,239,230,0.07)', borderRadius: 3 }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min(balance.pct_used, 100)}%`,
                  background: balance.pct_used >= 92 ? '#F87171' : balance.pct_used >= 80 ? '#E8C87A' : '#4CAF80',
                  borderRadius: 3,
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          </div>
        )}

        {/* ── 6. Active campaigns — full metrics table ── */}
        <Section title="Campanhas Ativas">
          <div style={{ background: '#192820', border: '1px solid rgba(201,169,110,0.12)', borderRadius: 4, overflow: 'hidden' }}>
            {campaigns.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(244,239,230,0.25)', fontSize: 13 }}>Carregando campanhas...</div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(201,169,110,0.1)' }}>
                    {[
                      { label: 'Campanha', align: 'left' },
                      { label: 'Budget/dia', align: 'right' },
                      { label: 'Impressões', align: 'right' },
                      { label: 'Custo/Msg', align: 'right' },
                      { label: 'Cliques', align: 'right' },
                      { label: 'CTR', align: 'right' },
                      { label: 'CPC', align: 'right' },
                      { label: 'Gasto', align: 'right' },
                      { label: 'Msgs WPP', align: 'right' },
                    ].map(h => (
                      <th key={h.label} style={{
                        padding: '10px 14px',
                        textAlign: h.align as 'left' | 'right',
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(201,169,110,0.45)',
                      }}>{h.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => (
                    <tr key={c.id} style={{
                      borderBottom: '1px solid rgba(201,169,110,0.06)',
                      background: i % 2 === 1 ? 'rgba(255,255,255,0.015)' : 'transparent',
                    }}>
                      {/* Name */}
                      <td style={{ padding: '12px 14px', maxWidth: 260 }}>
                        <div style={{ fontWeight: 500, color: '#F4EFE6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={c.name}>
                          {c.name.replace(/^\[Castelo\]\s*/i, '')}
                        </div>
                      </td>
                      {/* Budget/day */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <span style={{ color: '#C9A96E', fontWeight: 500 }}>{fmtBRL(c.daily_budget)}</span>
                        <span style={{ fontSize: 10, color: 'rgba(244,239,230,0.3)', marginLeft: 3 }}>/dia</span>
                      </td>
                      {/* Impressões */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: 'rgba(244,239,230,0.6)' }}>{fmt(c.impressions)}</td>
                      {/* Custo por msg */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: 'rgba(244,239,230,0.5)' }}>
                        {c.messaging_starts > 0 ? fmtBRL(c.spend / c.messaging_starts) : '—'}
                      </td>
                      {/* Cliques */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: 'rgba(244,239,230,0.7)' }}>{fmt(c.clicks)}</td>
                      {/* CTR */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: c.ctr > 2 ? '#C9A96E' : 'rgba(244,239,230,0.6)' }}>
                        {c.ctr.toFixed(2)}%
                      </td>
                      {/* CPC */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: 'rgba(244,239,230,0.6)' }}>
                        {c.clicks > 0 ? fmtBRL(c.spend / c.clicks) : '—'}
                      </td>
                      {/* Gasto */}
                      <td style={{ padding: '12px 14px', textAlign: 'right', color: '#F4EFE6', fontWeight: 500 }}>
                        {fmtBRL(c.spend)}
                      </td>
                      {/* Msgs */}
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        <span style={{ color: c.messaging_starts > 0 ? '#4CAF80' : 'rgba(244,239,230,0.25)', fontWeight: c.messaging_starts > 0 ? 500 : 400 }}>
                          {c.messaging_starts > 0 ? c.messaging_starts : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </Section>

        {/* ── 7. Creatives grid ── */}
        <Section title={`Criativos Ativos (${allAds.length})`}>
          {allAds.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(244,239,230,0.25)', fontSize: 13 }}>Carregando criativos...</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {allAds.map(ad => <CreativeCard key={ad.id} ad={ad} />)}
            </div>
          )}
        </Section>

      </div>
    </div>
  );
}
