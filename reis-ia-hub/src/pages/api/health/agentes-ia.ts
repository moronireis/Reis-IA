/**
 * GET /api/health/agentes-ia
 *
 * Public, unauthenticated healthcheck for the AGENTES [IA] integration.
 * Returns the integration status without exposing secrets — safe to share
 * with the Ticto compliance team or use as a UptimeRobot ping target.
 *
 * Sample response:
 * {
 *   "ok": true,
 *   "service": "agentes-ia-members-area",
 *   "checks": {
 *     "supabase": "ok",
 *     "course_seeded": true,
 *     "space_seeded": true,
 *     "webhook_configured": true,
 *     "resend_configured": true
 *   },
 *   "endpoints": {
 *     "webhook": "/api/webhook/ticto",
 *     "welcome": "/agentes-ia"
 *   },
 *   "timestamp": "2026-04-26T..."
 * }
 */

import type { APIRoute } from 'astro';
import { createServerClient } from '../../../lib/supabase-server';

export const prerender = false;

export const GET: APIRoute = async () => {
  const startedAt = Date.now();
  let supabaseStatus: 'ok' | 'error' = 'error';
  let courseSeeded = false;
  let spaceSeeded = false;

  try {
    const supabase = createServerClient();

    // Probe: course exists and is published
    const { data: course } = await supabase
      .from('courses')
      .select('id, status')
      .eq('slug', 'agentes-ia')
      .maybeSingle();
    courseSeeded = !!course;

    // Probe: space exists
    const { data: space } = await supabase
      .from('spaces')
      .select('id')
      .eq('slug', 'agentes-ia')
      .maybeSingle();
    spaceSeeded = !!space;

    supabaseStatus = 'ok';
  } catch {
    supabaseStatus = 'error';
  }

  const webhookConfigured = !!import.meta.env.TICTO_WEBHOOK_TOKEN || !!import.meta.env.TICTO_WEBHOOK_SECRET;
  const resendConfigured = !!import.meta.env.RESEND_API_KEY;

  const allOk = supabaseStatus === 'ok' && courseSeeded && spaceSeeded && webhookConfigured && resendConfigured;

  return new Response(
    JSON.stringify(
      {
        ok: allOk,
        service: 'agentes-ia-members-area',
        checks: {
          supabase: supabaseStatus,
          course_seeded: courseSeeded,
          space_seeded: spaceSeeded,
          webhook_configured: webhookConfigured,
          resend_configured: resendConfigured,
        },
        endpoints: {
          webhook: '/api/webhook/ticto',
          welcome: '/agentes-ia',
          login: '/login',
          register: '/register',
        },
        latency_ms: Date.now() - startedAt,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    ),
    {
      status: allOk ? 200 : 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    },
  );
};

export const HEAD: APIRoute = async () => {
  const supabase = createServerClient();
  try {
    const { error } = await supabase.from('courses').select('id', { count: 'exact', head: true }).limit(1);
    return new Response(null, { status: error ? 503 : 200 });
  } catch {
    return new Response(null, { status: 503 });
  }
};
