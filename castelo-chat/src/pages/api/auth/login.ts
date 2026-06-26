import type { APIRoute } from 'astro';
import { validatePassword, getAuthCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json() as { password?: string };
  if (validatePassword(body.password || '')) {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': getAuthCookie(),
      },
    });
  }
  return new Response(JSON.stringify({ error: 'Invalid password' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
};
