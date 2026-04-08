# StackCash — Build Spec

## 一句話
免費 app 幫香港海外打工仔用碎片時間賺外快。Offerwall 廣告商出錢，用戶賺錢，Danny 抽 30%。

## Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (mobile-first)
- Supabase (Auth + PostgreSQL)
- PWA (installable, no app store needed)
- Vercel (hosting)
- Offerwall: ayeT-Studios API + Torox API (waiting for account approval)
- PayPal Payouts API (cashout)

## Pages

### 1. Landing (`/`)
- "Earn money. Send more home."
- Sign up button
- How it works (3 steps)
- Real cashout log (live)

### 2. Sign Up (`/signup`)
- Email or phone
- Name + country (dropdown: Philippines, Indonesia, Pakistan, Nepal, India, Other)
- 10 seconds. No verification. No documents.

### 3. Home (`/dashboard`)
```
Hey Maria 👋
HK$ 47.50 ≈ ₱ 344

[  Earn 💰  ]    [  Cash Out 📤  ]

── TODAY'S TASKS ──
🎮 Play this game to Lv 5 → HK$ 32
📝 Quick survey (2 min) → HK$ 6
📱 Try this app → HK$ 12

── INVITE FRIENDS ──
👥 Share your link → you both get HK$ 5
Your link: stackcash.app/r/maria

── RECENT CASHOUTS ──
✅ Ate Grace → HK$ 142 via PayPal
✅ Ahmed R. → HK$ 87 via PayPal
```

### 4. Earn (`/earn`)
- Task list from offerwall API
- Each task: name, icon, payout (HKD + home currency), estimated time, tracking link
- Split: Quick tasks (surveys, app trials) / Big tasks (games)

### 5. Cash Out (`/cashout`)
- Show balance (HKD + home currency)
- Minimum: HK$40 (~$5 USD)
- Methods: PayPal, GCash (Philippines), Wise (referral link)
- Request → pending → approved → paid (24-48hr)

### 6. Referral (`/referral`)
- Unique referral link per user
- Both get HK$5 on signup
- 10% of referral's task earnings (forever)
- Counter: how many friends, how much earned from them

### 7. How It Works (`/how-it-works`)
- "Companies pay us to find users. We share the money with you. You never pay anything."
- Danny's photo + company info
- Real cashout log

## Database Schema (Supabase)

### users
- id, email, name, country, referral_code, referred_by
- created_at

### balances
- user_id, available, pending, withdrawn

### transactions
- id, user_id, type (earn/referral_bonus/cashout/referral_commission)
- amount, currency, status, description
- offer_id, created_at

### cashout_requests
- id, user_id, amount, method (paypal/gcash/wise)
- paypal_email / gcash_number
- status (pending/approved/paid/rejected)
- created_at, processed_at

### referrals
- referrer_id, referred_id, bonus_paid, created_at

## Offerwall Integration

### ayeT-Studios (primary — waiting for account)
```
GET https://www.ayetstudios.com/offers/offerwall_api/{adslot}
?external_identifier={user_id}
&ip={user_ip}
&country=HK
```

### Torox (backup — waiting for account)
Similar API pattern. TBD when account approved.

### Postback Webhook
```
GET /api/postback/ayet
?user_id={external_identifier}
&payout={payout}
&offer_id={offer_id}
&click_id={click_id}
```
→ Verify → Update user balance → Create transaction record

## Currency Conversion
Show balance in HKD + user's home currency:
- PHP (Philippines): 1 HKD ≈ 7.24 PHP
- IDR (Indonesia): 1 HKD ≈ 2,050 IDR
- PKR (Pakistan): 1 HKD ≈ 35.8 PKR
- NPR (Nepal): 1 HKD ≈ 17.2 NPR
- INR (India): 1 HKD ≈ 10.8 INR
(Use live rates API, fallback to hardcoded)

## Referral Logic
- User A invites User B via link
- User B signs up → both get HK$5 (from Danny's margin)
- User B earns HK$100 from tasks → User A gets HK$10 (10%)
- Referral commission comes from Danny's 30% cut

## Cashout Flow
1. User requests cashout (min HK$40)
2. Goes to admin queue (Danny reviews)
3. Danny approves → PayPal Payouts API sends money
4. Transaction marked as "paid"
5. Appears in public cashout log (social proof)

## What NOT to build (V1)
- ❌ AI chatbot
- ❌ Token/crypto
- ❌ Remittance service
- ❌ Community/social feed
- ❌ Multi-language (English only)
- ❌ Native app (PWA only)
- ❌ Local data collection tasks
- ❌ Any feature that costs Danny money

## Launch Plan
1. Beta: Danny's Pakistani friends (10-20 people)
2. Sunday: Filipino ambassadors at Admiralty + Central
3. Viral: 30-second video + referral system
4. Scale: Facebook groups + word of mouth
5. CCMF: Apply August 3 with traction data
