import type { APIRoute } from 'astro';
import { isAuthenticated } from '../../../lib/auth';
import { getInstanceStatus } from '../../../lib/uazapi';

const INSTANCES = [
  { id: 'castelo1', label: '(11) 9.5590-6035' },
  { id: 'castelo2', label: '(11) 9.5590-1227' },
];

export const GET: APIRoute = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const statuses = await Promise.all(
    INSTANCES.map(async (inst) => {
      const s = await getInstanceStatus(inst.id);
      return { ...inst, ...s };
    })
  );

  return new Response(JSON.stringify({ instances: statuses }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
