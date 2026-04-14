# Memory Index

Created 2026-04-14 as part of Phase A foundation.

## Starting context
- Supabase self-hosted: `https://weirdpigeon-supabase.cloudfy.live`
- Primary migrations directory: `reis-ia-hub/supabase/migrations/`
- Always read `reis-ia-hub/supabase/schema.sql` before proposing changes.
- Existing tables include: `hub_knowledge`, `contacts`, `leads`, `deals`, `form_submissions`, `notifications`, journey system tables.

## Conventions (enforce on every migration)
- `uuid` PK with `gen_random_uuid()`
- `timestamptz` for all time columns (never `timestamp`)
- `created_at` + `updated_at` on every mutable table
- RLS enabled before ship — default deny, explicit policies
- Indexes on every foreign key
- Migration filenames: `YYYYMMDDHHMMSS_description.sql`
