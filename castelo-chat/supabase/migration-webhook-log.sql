-- Migration: webhook debug log table
CREATE TABLE IF NOT EXISTS castelo_webhook_log (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  instance_id text,
  raw        text,
  created_at timestamptz DEFAULT now()
);
