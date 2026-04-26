/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SUPABASE_URL: string;
  readonly SUPABASE_ANON_KEY: string;
  readonly SUPABASE_SERVICE_KEY: string;
  readonly ANTHROPIC_API_KEY: string;
  readonly BRAVE_SEARCH_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
