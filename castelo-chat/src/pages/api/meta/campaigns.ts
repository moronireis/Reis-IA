import type { APIRoute } from 'astro';
import { fetchActiveCampaigns, type MetaPeriod } from '../../../lib/meta';

export const GET: APIRoute = async ({ url }) => {
  const period = (url.searchParams.get('period') || 'last_7d') as MetaPeriod;
  const campaigns = await fetchActiveCampaigns(period);

  return new Response(JSON.stringify(campaigns), {
    headers: { 'Content-Type': 'application/json' },
  });
};
