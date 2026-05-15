-- Migration: hotmart_purchases table
-- Date: 2026-04-29
-- Purpose: Store Hotmart purchase events for tracking/analytics only.
-- Hotmart handles product delivery via its own members area.
-- This table is analytics-only: no account creation, no profile creation.

CREATE TABLE IF NOT EXISTS hotmart_purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  name text,
  phone text,
  product_name text,
  transaction_id text,
  paid_amount numeric,
  currency text DEFAULT 'USD',
  payment_type text,
  hotmart_event text,
  utm_data jsonb DEFAULT '{}',
  status text DEFAULT 'verified' CHECK (status IN ('verified', 'cancelled', 'refunded', 'chargeback')),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_hotmart_purchases_email ON hotmart_purchases(email);
CREATE INDEX IF NOT EXISTS idx_hotmart_purchases_status ON hotmart_purchases(status);
CREATE INDEX IF NOT EXISTS idx_hotmart_purchases_transaction ON hotmart_purchases(transaction_id);
