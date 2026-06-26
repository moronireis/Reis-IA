import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { disconnectInstance, getInstanceQR } from '../../../lib/uazapi';

export const POST: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const body = await request.json() as { instance: string; action: string };
  const { instance, action } = body;

  if (action === 'disconnect') {
    await disconnectInstance(instance);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (action === 'connect') {
    const result = await getInstanceQR(instance);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response('Unknown action', { status: 400 });
};
