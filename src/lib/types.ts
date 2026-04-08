export type Country = 'PH' | 'ID' | 'PK' | 'NP' | 'IN' | 'OTHER'

export interface User {
  id: string
  email: string
  name: string
  country: Country
  referral_code: string
  referred_by: string | null
  created_at: string
}

export interface Balance {
  user_id: string
  available: number
  pending: number
  withdrawn: number
}

export type TransactionType = 'earn' | 'referral_bonus' | 'cashout' | 'referral_commission'

export interface Transaction {
  id: string
  user_id: string
  type: TransactionType
  amount: number
  currency: string
  status: 'completed' | 'pending' | 'failed'
  description: string
  offer_id: string | null
  created_at: string
}

export type CashoutMethod = 'paypal' | 'gcash' | 'wise'
export type CashoutStatus = 'pending' | 'approved' | 'paid' | 'rejected'

export interface CashoutRequest {
  id: string
  user_id: string
  amount: number
  method: CashoutMethod
  paypal_email: string | null
  gcash_number: string | null
  status: CashoutStatus
  created_at: string
  processed_at: string | null
}

export interface Referral {
  referrer_id: string
  referred_id: string
  bonus_paid: boolean
  created_at: string
}

export interface Offer {
  id: string
  name: string
  description: string
  payout: number
  category: 'quick' | 'big'
  icon: string
  estimated_time: string
  tracking_url: string
}
