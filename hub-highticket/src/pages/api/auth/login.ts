import type { APIRoute } from 'astro';
import { findDemoAccount } from '../../../lib/demo-accounts';
import { getRedirectByRole } from '../../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Usuário e senha são obrigatórios' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Demo account check
  const demo = findDemoAccount(email, password);
  if (demo) {
    const redirect = getRedirectByRole(demo.user.role);
    const headers = new Headers({ 'Content-Type': 'application/json' });

    headers.append(
      'Set-Cookie',
      `ht-session=${demo.user.id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`
    );

    return new Response(JSON.stringify({ redirect }), { status: 200, headers });
  }

  // TODO: Supabase auth when connected
  return new Response(JSON.stringify({ error: 'Credenciais inválidas' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
};
