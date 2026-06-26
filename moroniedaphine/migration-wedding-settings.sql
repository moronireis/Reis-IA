-- Migration: Create wedding_settings table for global mesa layout persistence
-- Run this in Supabase SQL Editor
-- Date: 2026-06-07

CREATE TABLE IF NOT EXISTS wedding_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Allow full access with service key (admin panel only)
ALTER TABLE wedding_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all with service key" ON wedding_settings
  FOR ALL USING (true) WITH CHECK (true);
