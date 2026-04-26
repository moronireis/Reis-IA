import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  const headers = new Headers();

  headers.append(
    'Set-Cookie',
    'ht-session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0'
  );
  headers.append('Location', '/login');

  return new Response(null, { status: 302, headers });
};
