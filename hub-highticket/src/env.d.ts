/// <reference path="../.astro/types.d.ts" />

import type { Database } from './lib/database.types';
import type { Session } from '@supabase/supabase-js';

declare namespace App {
  interface Locals {
    user: Database['public']['Tables']['users']['Row'] | null;
    session: Session | null;
  }
}
