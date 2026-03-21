-- ============================================================
-- Reis Marketing IA — Supabase Table Setup
-- Execute this in Supabase SQL Editor (supabase.com → project → SQL Editor)
-- ============================================================

-- Create the form submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_type TEXT NOT NULL CHECK (form_type IN ('personal-branding', 'movimento', 'empresa', 'produto')),
  name TEXT,
  email TEXT,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries by form type
CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions (form_type);

-- Create index for date-based queries
CREATE INDEX IF NOT EXISTS idx_form_submissions_date ON form_submissions (created_at DESC);

-- Enable Row Level Security
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (forms are public)
CREATE POLICY "Allow anonymous inserts"
  ON form_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can read (you, the admin)
CREATE POLICY "Only authenticated can read"
  ON form_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Optional: Add a comment to the table
COMMENT ON TABLE form_submissions IS 'Reis Marketing IA — Form submissions from intake forms (personal branding, movimento, empresa, produto)';
