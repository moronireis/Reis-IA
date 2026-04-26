-- ==========================================================================
-- SDR Conversations Table — Tracks all WhatsApp SDR interactions
-- Run in Supabase SQL Editor
-- ==========================================================================

-- ============================================================
-- SDR_CONVERSATIONS (WhatsApp SDR message log)
-- ============================================================
create table if not exists public.sdr_conversations (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references public.contacts(id) on delete set null,
  contact_phone text not null,
  direction text not null check (direction in ('outbound', 'inbound')),
  message_text text not null,
  category text not null check (category in ('marketing', 'systems', 'mentoria')),
  conversation_state text not null default 'first_message_sent' check (
    conversation_state in (
      'not_contacted', 'first_message_sent', 'replied',
      'follow_up_1', 'follow_up_2', 'follow_up_3',
      'qualified', 'meeting_booked', 'disqualified'
    )
  ),
  metadata jsonb,
  created_at timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists idx_sdr_conv_contact on public.sdr_conversations(contact_id);
create index if not exists idx_sdr_conv_phone on public.sdr_conversations(contact_phone);
create index if not exists idx_sdr_conv_direction on public.sdr_conversations(direction);
create index if not exists idx_sdr_conv_category on public.sdr_conversations(category);
create index if not exists idx_sdr_conv_state on public.sdr_conversations(conversation_state);
create index if not exists idx_sdr_conv_created on public.sdr_conversations(created_at desc);

-- RLS: admin only (same as contacts/deals)
alter table public.sdr_conversations enable row level security;
create policy "Admins can manage sdr_conversations" on public.sdr_conversations for all using (is_admin());

-- Service role bypass (for Python scripts using service_role key)
-- Service role already bypasses RLS by default in Supabase
