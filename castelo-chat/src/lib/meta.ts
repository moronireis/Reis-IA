// Meta Graph API wrapper — Castelo dos Lagos
// Primary account: act_1327467106018116 (Castelo dos Lagos - BM) — campanhas ativas Jun/2026
// Secondary account: act_785263856592449 (CA01) — somente para insights consolidados

const BASE = 'https://graph.facebook.com/v20.0';

export const META_ACCOUNTS = {
  primary: 'act_1327467106018116',
  secondary: 'act_785263856592449',
};

export type MetaPeriod = 'today' | 'yesterday' | 'last_7d' | 'last_30d' | 'this_month' | 'last_month';

export interface AccountBalance {
  name: string;
  spend_cap: number;       // BRL
  amount_spent: number;    // BRL
  balance: number;         // BRL (raw API field)
  available_balance: number; // BRL — from funding_source_details display_string (matches Meta UI "Saldo atual")
  pct_used: number;        // 0-100
}

export async function fetchAccountBalance(accountId: string): Promise<AccountBalance | null> {
  const token = getToken();
  if (!token) return null;
  const url = `${BASE}/${accountId}?fields=name,spend_cap,amount_spent,balance,funding_source_details&access_token=${token}`;
  try {
    const res = await fetch(url);
    const j = await res.json() as Record<string, unknown>;
    const cap   = Number(j.spend_cap)     || 0;
    const spent = Number(j.amount_spent)  || 0;
    const bal   = Number(j.balance)       || 0;

    // Parse "Saldo disponível (R$132,02 BRL)" from funding_source_details.display_string
    let available_balance = bal / 100; // fallback to raw balance
    const fsd = j.funding_source_details as Record<string, unknown> | undefined;
    if (fsd?.display_string) {
      const ds = String(fsd.display_string);
      // Matches R$132,02 or R$ 1.234,56 (Brazilian locale)
      const m = ds.match(/R\$\s*([\d.]+,\d{2})/);
      if (m) {
        const parsed = parseFloat(m[1].replace(/\./g, '').replace(',', '.'));
        if (!isNaN(parsed)) available_balance = parsed;
      }
    }

    return {
      name: String(j.name || ''),
      spend_cap:    cap   / 100,
      amount_spent: spent / 100,
      balance:      bal   / 100,
      available_balance,
      pct_used: cap > 0 ? Math.round((spent / cap) * 100) : 0,
    };
  } catch {
    return null;
  }
}

export interface MetaInsights {
  impressions: number;
  reach: number;
  clicks: number;
  ctr: number;
  cpc: number;
  spend: number;
  messaging_starts: number;
  messaging_replies: number;
  messaging_depth2: number;
  messaging_depth3: number;
  messaging_depth5: number;
  link_clicks: number;
  date_start: string;
  date_stop: string;
}

export interface MetaDailyInsight {
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  messaging_starts: number;
}

export interface MetaCampaign {
  id: string;
  name: string;
  status: string;
  daily_budget: number;      // in BRL (already divided by 100)
  budget_remaining: number;  // in BRL
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  messaging_starts: number;
  ads: MetaAd[];
}

export interface MetaAd {
  id: string;
  name: string;
  status: string;
  creative_id: string;
  thumbnail_url: string;
  object_type: string;      // VIDEO | SHARE (image/carousel)
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  messaging_starts: number;
}

function getToken(): string {
  return (
    import.meta.env.META_ACCESS_TOKEN ||
    process.env.META_ACCESS_TOKEN ||
    ''
  );
}

function actionsToMap(actions: Array<{ action_type: string; value: string }>): Record<string, number> {
  if (!Array.isArray(actions)) return {};
  return Object.fromEntries(actions.map(a => [a.action_type, Number(a.value)]));
}

// ─── Account-level insights ─────────────────────────────────────────────────

export async function fetchAccountInsights(
  accountId: string,
  period: MetaPeriod
): Promise<MetaInsights | null> {
  const token = getToken();
  if (!token) return null;

  const fields = 'impressions,reach,clicks,ctr,cpc,spend,actions';
  const url = `${BASE}/${accountId}/insights?fields=${fields}&date_preset=${period}&access_token=${token}`;

  try {
    const res = await fetch(url);
    const json = await res.json() as { data?: Array<Record<string, unknown>> };
    if (!json.data?.length) return null;

    const r = json.data[0] as Record<string, unknown>;
    const act = actionsToMap(r.actions as Array<{ action_type: string; value: string }>);

    return {
      impressions: Number(r.impressions) || 0,
      reach: Number(r.reach) || 0,
      clicks: Number(r.clicks) || 0,
      ctr: Number(r.ctr) || 0,
      cpc: Number(r.cpc) || 0,
      spend: Number(r.spend) || 0,
      messaging_starts: act['onsite_conversion.messaging_conversation_started_7d'] || 0,
      messaging_replies: act['onsite_conversion.messaging_first_reply'] || 0,
      messaging_depth2: act['onsite_conversion.messaging_user_depth_2_message_send'] || 0,
      messaging_depth3: act['onsite_conversion.messaging_user_depth_3_message_send'] || 0,
      messaging_depth5: act['onsite_conversion.messaging_user_depth_5_message_send'] || 0,
      link_clicks: act['link_click'] || 0,
      date_start: String(r.date_start || ''),
      date_stop: String(r.date_stop || ''),
    };
  } catch {
    return null;
  }
}

export async function fetchCombinedInsights(period: MetaPeriod): Promise<MetaInsights> {
  const [primary, secondary] = await Promise.all([
    fetchAccountInsights(META_ACCOUNTS.primary, period),
    fetchAccountInsights(META_ACCOUNTS.secondary, period),
  ]);

  const empty: MetaInsights = {
    impressions: 0, reach: 0, clicks: 0, ctr: 0, cpc: 0, spend: 0,
    messaging_starts: 0, messaging_replies: 0, messaging_depth2: 0,
    messaging_depth3: 0, messaging_depth5: 0, link_clicks: 0,
    date_start: '', date_stop: '',
  };

  const p = primary || empty;
  const s = secondary || empty;
  const totalSpend = p.spend + s.spend;
  const totalImpr = p.impressions + s.impressions;
  const totalClicks = p.clicks + s.clicks;

  return {
    impressions: totalImpr,
    reach: p.reach + s.reach,
    clicks: totalClicks,
    ctr: totalImpr > 0 ? (totalClicks / totalImpr) * 100 : 0,
    cpc: totalClicks > 0 ? totalSpend / totalClicks : 0,
    spend: totalSpend,
    messaging_starts: p.messaging_starts + s.messaging_starts,
    messaging_replies: p.messaging_replies + s.messaging_replies,
    messaging_depth2: p.messaging_depth2 + s.messaging_depth2,
    messaging_depth3: p.messaging_depth3 + s.messaging_depth3,
    messaging_depth5: p.messaging_depth5 + s.messaging_depth5,
    link_clicks: p.link_clicks + s.link_clicks,
    date_start: p.date_start || s.date_start,
    date_stop: p.date_stop || s.date_stop,
  };
}

export async function fetchDailyInsights(
  accountId: string,
  period: MetaPeriod
): Promise<MetaDailyInsight[]> {
  const token = getToken();
  if (!token) return [];

  const fields = 'impressions,clicks,spend,actions';
  const url = `${BASE}/${accountId}/insights?fields=${fields}&date_preset=${period}&time_increment=1&access_token=${token}`;

  try {
    const res = await fetch(url);
    const json = await res.json() as { data?: Array<Record<string, unknown>> };
    if (!json.data) return [];

    return json.data.map(r => {
      const act = actionsToMap(r.actions as Array<{ action_type: string; value: string }>);
      return {
        date: String(r.date_start || ''),
        impressions: Number(r.impressions) || 0,
        clicks: Number(r.clicks) || 0,
        spend: Number(r.spend) || 0,
        messaging_starts: act['onsite_conversion.messaging_conversation_started_7d'] || 0,
      };
    });
  } catch {
    return [];
  }
}

// ─── Campaigns with budget + ads + creatives (primary account only) ──────────

async function fetchAdInsights(adId: string, token: string, period: MetaPeriod): Promise<{
  impressions: number; clicks: number; spend: number; ctr: number; messaging_starts: number;
}> {
  const url = `${BASE}/${adId}/insights?fields=impressions,clicks,spend,ctr,actions&date_preset=${period}&access_token=${token}`;
  try {
    const res = await fetch(url);
    const json = await res.json() as { data?: Array<Record<string, unknown>> };
    if (!json.data?.length) return { impressions: 0, clicks: 0, spend: 0, ctr: 0, messaging_starts: 0 };
    const r = json.data[0] as Record<string, unknown>;
    const act = actionsToMap(r.actions as Array<{ action_type: string; value: string }>);
    return {
      impressions: Number(r.impressions) || 0,
      clicks: Number(r.clicks) || 0,
      spend: Number(r.spend) || 0,
      ctr: Number(r.ctr) || 0,
      messaging_starts: act['onsite_conversion.messaging_conversation_started_7d'] || 0,
    };
  } catch {
    return { impressions: 0, clicks: 0, spend: 0, ctr: 0, messaging_starts: 0 };
  }
}

async function fetchCreativeThumbnail(creativeId: string, token: string): Promise<{ thumbnail_url: string; object_type: string }> {
  // Request high-res thumbnail (800x450) + image_url for static/carousel ads
  const url = `${BASE}/${creativeId}?fields=thumbnail_url,object_type,image_url&thumbnail_width=800&thumbnail_height=450&access_token=${token}`;
  try {
    const res = await fetch(url);
    const json = await res.json() as Record<string, unknown>;
    const objectType = String(json.object_type || 'SHARE');
    // For static/carousel ads prefer image_url (original resolution); for video use thumbnail_url
    const imgUrl = objectType === 'VIDEO'
      ? String(json.thumbnail_url || '')
      : (String(json.image_url || '') || String(json.thumbnail_url || ''));
    return {
      thumbnail_url: imgUrl,
      object_type: objectType,
    };
  } catch {
    return { thumbnail_url: '', object_type: 'SHARE' };
  }
}

export async function fetchActiveCampaigns(period: MetaPeriod = 'last_7d'): Promise<MetaCampaign[]> {
  const token = getToken();
  if (!token) return [];
  const accountId = META_ACCOUNTS.primary;

  // 1. Fetch campaigns with budget
  const campUrl = `${BASE}/${accountId}/campaigns?fields=id,name,status,daily_budget,budget_remaining&limit=30&access_token=${token}`;
  let rawCampaigns: Array<Record<string, unknown>> = [];
  try {
    const res = await fetch(campUrl);
    const json = await res.json() as { data?: Array<Record<string, unknown>> };
    rawCampaigns = (json.data || []).filter(c => c.status === 'ACTIVE');
  } catch {
    return [];
  }

  // 2. For each active campaign, fetch ads
  const campaigns: MetaCampaign[] = await Promise.all(
    rawCampaigns.map(async (c) => {
      const campId = String(c.id);

      // Campaign-level insights
      const campInsUrl = `${BASE}/${campId}/insights?fields=impressions,clicks,spend,ctr,actions&date_preset=${period}&access_token=${token}`;
      let campIns = { impressions: 0, clicks: 0, spend: 0, ctr: 0, messaging_starts: 0 };
      try {
        const r = await fetch(campInsUrl);
        const j = await r.json() as { data?: Array<Record<string, unknown>> };
        if (j.data?.length) {
          const ins = j.data[0] as Record<string, unknown>;
          const act = actionsToMap(ins.actions as Array<{ action_type: string; value: string }>);
          campIns = {
            impressions: Number(ins.impressions) || 0,
            clicks: Number(ins.clicks) || 0,
            spend: Number(ins.spend) || 0,
            ctr: Number(ins.ctr) || 0,
            messaging_starts: act['onsite_conversion.messaging_conversation_started_7d'] || 0,
          };
        }
      } catch { /* use defaults */ }

      // Ads list
      const adsUrl = `${BASE}/${campId}/ads?fields=id,name,status,creative&limit=20&access_token=${token}`;
      let rawAds: Array<Record<string, unknown>> = [];
      try {
        const res = await fetch(adsUrl);
        const j = await res.json() as { data?: Array<Record<string, unknown>> };
        rawAds = (j.data || []).filter(a => a.status === 'ACTIVE');
      } catch { /* empty */ }

      // Per-ad insights + thumbnails (parallel)
      const ads: MetaAd[] = await Promise.all(
        rawAds.map(async (a) => {
          const adId = String(a.id);
          const creativeId = String((a.creative as Record<string, unknown>)?.id || '');

          const [ins, creative] = await Promise.all([
            fetchAdInsights(adId, token, period),
            creativeId ? fetchCreativeThumbnail(creativeId, token) : Promise.resolve({ thumbnail_url: '', object_type: 'SHARE' }),
          ]);

          return {
            id: adId,
            name: String(a.name || ''),
            status: String(a.status || ''),
            creative_id: creativeId,
            thumbnail_url: creative.thumbnail_url,
            object_type: creative.object_type,
            ...ins,
          };
        })
      );

      return {
        id: campId,
        name: String(c.name || ''),
        status: String(c.status || ''),
        daily_budget: Number(c.daily_budget || 0) / 100,
        budget_remaining: Number(c.budget_remaining || 0) / 100,
        ads,
        ...campIns,
      };
    })
  );

  return campaigns.sort((a, b) => b.spend - a.spend);
}
