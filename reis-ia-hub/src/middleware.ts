import { defineMiddleware } from 'astro:middleware';
import { createClient } from '@supabase/supabase-js';

const publicPaths = ['/login', '/register', '/'];

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return next();
  }

  // Allow API auth routes (they manage cookies themselves)
  if (pathname.startsWith('/api/auth')) {
    return next();
  }

  // Allow webhook routes (they use their own auth via x-webhook-key header)
  if (pathname.startsWith('/api/webhook') || pathname.startsWith('/api/leads/webhook')) {
    return next();
  }

  // Get access token from cookie
  const accessToken = context.cookies.get('sb-access-token')?.value;
  const refreshToken = context.cookies.get('sb-refresh-token')?.value;

  if (!accessToken) {
    return context.redirect('/login');
  }

  // Verify session using anon client
  const supabase = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: { user }, error } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    // Try refresh
    if (refreshToken) {
      const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({
        refresh_token: refreshToken,
      });

      if (refreshError || !refreshData.session) {
        context.cookies.delete('sb-access-token', { path: '/' });
        context.cookies.delete('sb-refresh-token', { path: '/' });
        return context.redirect('/login');
      }

      // Set new tokens
      context.cookies.set('sb-access-token', refreshData.session.access_token, {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60,
      });
      context.cookies.set('sb-refresh-token', refreshData.session.refresh_token, {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      });

      context.locals.user = refreshData.session.user;
    } else {
      context.cookies.delete('sb-access-token', { path: '/' });
      return context.redirect('/login');
    }
  } else {
    context.locals.user = user;
  }

  // Fetch profile with role using service role key
  const serverClient = createClient(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { data: profile } = await serverClient
    .from('profiles')
    .select('*')
    .eq('id', context.locals.user!.id)
    .single();

  if (profile) {
    context.locals.profile = profile;
  }

  // Block admin routes for non-admins
  if (pathname.startsWith('/admin') && profile?.role !== 'admin') {
    return context.redirect('/dashboard');
  }

  // Admin-only API routes — all other API routes handle their own auth checks
  const adminOnlyApiPrefixes = [
    '/api/admin',
  ];

  const isAdminOnlyApi = adminOnlyApiPrefixes.some(prefix => pathname.startsWith(prefix));

  if (isAdminOnlyApi && profile?.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }

  return next();
});
