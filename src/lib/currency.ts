import type { Country } from './types'

// Fallback rates: 1 HKD = X units of foreign currency
const FALLBACK_RATES: Record<string, number> = {
  PHP: 7.24,
  IDR: 2050,
  PKR: 35.8,
  NPR: 17.2,
  INR: 10.8,
}

const COUNTRY_CURRENCY: Record<Country, string> = {
  PH: 'PHP',
  ID: 'IDR',
  PK: 'PKR',
  NP: 'NPR',
  IN: 'INR',
  OTHER: 'USD',
}

const CURRENCY_SYMBOL: Record<string, string> = {
  PHP: '₱',
  IDR: 'Rp',
  PKR: 'Rs',
  NPR: 'Rs',
  INR: '₹',
  USD: '$',
  HKD: 'HK$',
}

let cachedRates: Record<string, number> | null = null
let cacheTime = 0
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

async function fetchLiveRates(): Promise<Record<string, number> | null> {
  if (cachedRates && Date.now() - cacheTime < CACHE_TTL) return cachedRates
  try {
    // Free API, no key needed. HKD base.
    const res = await fetch(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/hkd.json',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const hkdRates = data.hkd
    cachedRates = {
      PHP: hkdRates.php,
      IDR: hkdRates.idr,
      PKR: hkdRates.pkr,
      NPR: hkdRates.npr,
      INR: hkdRates.inr,
      USD: hkdRates.usd,
    }
    cacheTime = Date.now()
    return cachedRates
  } catch {
    return null
  }
}

export function getCurrencyForCountry(country: Country): string {
  return COUNTRY_CURRENCY[country]
}

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOL[currency] || currency
}

export async function convertHKD(amountHKD: number, country: Country): Promise<{ amount: number; currency: string; symbol: string }> {
  const currency = COUNTRY_CURRENCY[country]
  if (currency === 'HKD') return { amount: amountHKD, currency: 'HKD', symbol: 'HK$' }

  const rates = await fetchLiveRates()
  const rate = rates?.[currency] ?? FALLBACK_RATES[currency] ?? 1
  return {
    amount: Math.round(amountHKD * rate * 100) / 100,
    currency,
    symbol: CURRENCY_SYMBOL[currency] || currency,
  }
}

export function convertHKDSync(amountHKD: number, country: Country): { amount: number; currency: string; symbol: string } {
  const currency = COUNTRY_CURRENCY[country]
  if (currency === 'HKD') return { amount: amountHKD, currency: 'HKD', symbol: 'HK$' }

  const rate = cachedRates?.[currency] ?? FALLBACK_RATES[currency] ?? 1
  return {
    amount: Math.round(amountHKD * rate * 100) / 100,
    currency,
    symbol: CURRENCY_SYMBOL[currency] || currency,
  }
}

export function formatHKD(amount: number): string {
  return `HK$ ${amount.toFixed(2)}`
}

export function formatForeign(amount: number, symbol: string): string {
  return `${symbol} ${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}
