-- StackCash Database Schema
-- Run this in Supabase SQL editor

-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  country TEXT NOT NULL CHECK (country IN ('PH', 'ID', 'PK', 'NP', 'IN', 'OTHER')),
  referral_code TEXT UNIQUE NOT NULL,
  referred_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_referral_code ON users(referral_code);

-- Balances table
CREATE TABLE balances (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  available NUMERIC(10,2) DEFAULT 0 NOT NULL CHECK (available >= 0),
  pending NUMERIC(10,2) DEFAULT 0 NOT NULL CHECK (pending >= 0),
  withdrawn NUMERIC(10,2) DEFAULT 0 NOT NULL CHECK (withdrawn >= 0)
);

-- Transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('earn', 'referral_bonus', 'cashout', 'referral_commission')),
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT DEFAULT 'HKD' NOT NULL,
  status TEXT DEFAULT 'completed' NOT NULL CHECK (status IN ('completed', 'pending', 'failed')),
  description TEXT,
  offer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_offer ON transactions(offer_id);

-- Cashout requests table
CREATE TABLE cashout_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  amount NUMERIC(10,2) NOT NULL CHECK (amount >= 40),
  method TEXT NOT NULL CHECK (method IN ('paypal', 'gcash', 'wise')),
  paypal_email TEXT,
  gcash_number TEXT,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'paid', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX idx_cashout_user ON cashout_requests(user_id);
CREATE INDEX idx_cashout_status ON cashout_requests(status);

-- Referrals table
CREATE TABLE referrals (
  referrer_id UUID NOT NULL REFERENCES users(id),
  referred_id UUID NOT NULL REFERENCES users(id),
  bonus_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (referrer_id, referred_id)
);

-- Function: add to user's available balance
CREATE OR REPLACE FUNCTION add_balance(p_user_id UUID, p_amount NUMERIC)
RETURNS VOID AS $$
BEGIN
  UPDATE balances SET available = available + p_amount WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function: deduct from user's available balance (for cashout)
CREATE OR REPLACE FUNCTION deduct_balance(p_user_id UUID, p_amount NUMERIC)
RETURNS VOID AS $$
BEGIN
  UPDATE balances
  SET available = available - p_amount, withdrawn = withdrawn + p_amount
  WHERE user_id = p_user_id AND available >= p_amount;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient balance';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cashout_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Public read for cashout log (social proof)
CREATE POLICY "Public cashout log" ON cashout_requests
  FOR SELECT USING (status = 'paid');

-- Service role has full access (API routes use service key)
