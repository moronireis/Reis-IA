import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { access_token, refresh_token } = await request.json();

    if (!access_token || !refresh_token) {
      return new Response(JSON.stringify({ error: 'Tokens ausentes' }), { status: 400 });
    }

    cookies.set('sb-access-token', access_token, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hora
    });

    cookies.set('sb-refresh-token', refresh_token, {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: 'Erro ao processar tokens' }), { status: 500 });
  }
};
