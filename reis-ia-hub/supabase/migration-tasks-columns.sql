-- Migration: add missing columns to tasks table
-- These columns are used by the API but were never added to schema
-- Run in Supabase SQL Editor

ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS category text NOT NULL DEFAULT 'general'
  CHECK (category IN ('systems', 'marketing', 'builders', 'general'));

ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS notes text;

ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS completed_at timestamptz;

ALTER TABLE public.tasks ADD COLUMN IF NOT EXISTS due_time text;

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_tasks_category ON public.tasks (category);
