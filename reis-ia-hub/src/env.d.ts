/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
  readonly RESEND_API_KEY?: string;
  readonly TICTO_WEBHOOK_TOKEN?: string;
  readonly TICTO_WEBHOOK_SECRET?: string;
  readonly TICTO_PRODUCT_MAP?: string;
  readonly AGENTES_IA_AREA_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace App {
  interface Locals {
    user?: import('@supabase/supabase-js').User;
    profile?: {
      id: string;
      full_name: string;
      email: string;
      avatar_url: string | null;
      role: string;
      company: string | null;
      phone: string | null;
    };
    impersonating?: boolean;
    realAdminId?: string;
    /** Branding shell selector — set in middleware from request hostname. */
    brandContext?: 'hub' | 'agentes-ia';
  }
}
