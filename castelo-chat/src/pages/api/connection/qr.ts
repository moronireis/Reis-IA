import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { getInstanceQR } from '../../../lib/uazapi';

export const GET: APIRoute = async ({ request, url }) => {
  if (!isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const instanceId = url.searchParams.get('instance') || 'castelo1';
  const result = await getInstanceQR(instanceId);

  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json' },
  });
};
