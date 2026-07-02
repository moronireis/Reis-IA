import type { APIRoute } from 'astro';
import { fetchCombinedInsights, fetchDailyInsights, fetchAccountBalance, META_ACCOUNTS, type MetaPeriod } from '../../../lib/meta';

export const GET: APIRoute = async ({ url }) => {
  const period = (url.searchParams.get('period') || 'last_7d') as MetaPeriod;
  const valid: MetaPeriod[] = ['today', 'yesterday', 'last_7d', 'last_30d', 'this_month', 'last_month'];
  if (!valid.includes(period)) {
    return new Response(JSON.stringify({ error: 'Invalid period' }), { status: 400 });
  }

  const [combined, daily, balance] = await Promise.all([
    fetchCombinedInsights(period),
    fetchDailyInsights(META_ACCOUNTS.primary, period),
    fetchAccountBalance(META_ACCOUNTS.primary),
  ]);

  return new Response(JSON.stringify({ summary: combined, daily, balance }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
