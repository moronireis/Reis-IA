/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_ROLE_KEY: string;
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
  }
}
