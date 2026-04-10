// Remittance provider data — manually updated weekly
// Last updated: 2026-04-10
// Source: checked each provider's website for HKD corridors

export interface Corridor {
  from: string;
  to: string;
  rate: number;       // amount received per 1 unit source (e.g. 1 HKD = 7.25 PHP)
  fee: number;        // flat fee in source currency
  markup: number;     // % above mid-market rate
  speed: string;
  method: string;
  updatedAt: string;
}

export interface Provider {
  slug: string;
  name: string;
  logo: string;
  tagline: string;
  affiliateUrl: string;
  trustpilot: string;
  corridors: Corridor[];
}

// Mid-market rates (reference, for markup calculation display)
export const MID_MARKET_RATES: Record<string, number> = {
  "HKD-PHP": 7.35,
  "HKD-IDR": 2065,
  "HKD-INR": 10.85,
};

export const PROVIDERS: Provider[] = [
  {
    slug: "wise",
    name: "Wise",
    logo: "🟢",
    tagline: "Mid-market rate, low transparent fees",
    affiliateUrl: "https://wise.com/invite/u/weecove", // placeholder until affiliate approved
    trustpilot: "4.5/5 (230K+ reviews)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.35, fee: 25, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2065, fee: 25, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.85, fee: 30, markup: 0.0, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "western-union",
    name: "Western Union",
    logo: "🟡",
    tagline: "Cash pickup worldwide, higher fees",
    affiliateUrl: "https://www.westernunion.com",
    trustpilot: "1.5/5 (15K+ reviews)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.05, fee: 0, markup: 4.1, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 1980, fee: 0, markup: 4.1, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.40, fee: 0, markup: 4.2, speed: "Minutes", method: "Cash pickup", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "remitly",
    name: "Remitly",
    logo: "🔵",
    tagline: "Fast transfers to Philippines and India",
    affiliateUrl: "https://www.remitly.com",
    trustpilot: "4.3/5 (50K+ reviews)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.25, fee: 15, markup: 1.4, speed: "Minutes", method: "Mobile wallet (GCash)", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2040, fee: 20, markup: 1.2, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.70, fee: 15, markup: 1.4, speed: "Minutes", method: "Bank deposit", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "worldremit",
    name: "WorldRemit",
    logo: "🟣",
    tagline: "Mobile money and bank transfers",
    affiliateUrl: "https://www.worldremit.com",
    trustpilot: "4.1/5 (18K+ reviews)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.20, fee: 20, markup: 2.0, speed: "Minutes-1 day", method: "GCash / Bank", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2030, fee: 25, markup: 1.7, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.65, fee: 20, markup: 1.8, speed: "1 day", method: "Bank deposit", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "ofx",
    name: "OFX",
    logo: "🔷",
    tagline: "Good for large transfers, no fees",
    affiliateUrl: "https://www.ofx.com",
    trustpilot: "4.6/5 (5K+ reviews)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.28, fee: 0, markup: 1.0, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2050, fee: 0, markup: 0.7, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.78, fee: 0, markup: 0.6, speed: "1-3 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
  {
    slug: "revolut",
    name: "Revolut",
    logo: "⚫",
    tagline: "App-based, good rates on weekdays",
    affiliateUrl: "https://www.revolut.com",
    trustpilot: "4.3/5 (180K+ reviews)",
    corridors: [
      { from: "HKD", to: "PHP", rate: 7.32, fee: 5, markup: 0.4, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "IDR", rate: 2058, fee: 5, markup: 0.3, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
      { from: "HKD", to: "INR", rate: 10.82, fee: 5, markup: 0.3, speed: "1-2 days", method: "Bank transfer", updatedAt: "2026-04-10" },
    ],
  },
];

// Helper: calculate total cost and amount received for a given transfer
export function calculateTransfer(
  provider: Provider,
  fromCurrency: string,
  toCurrency: string,
  amount: number
): { received: number; totalCost: number; fee: number; rate: number } | null {
  const corridor = provider.corridors.find(
    (c) => c.from === fromCurrency && c.to === toCurrency
  );
  if (!corridor) return null;

  const received = (amount - corridor.fee) * corridor.rate;
  const midRate = MID_MARKET_RATES[`${fromCurrency}-${toCurrency}`] || corridor.rate;
  const idealReceived = amount * midRate;
  const totalCost = idealReceived - received;

  return {
    received: Math.round(received),
    totalCost: Math.round(totalCost),
    fee: corridor.fee,
    rate: corridor.rate,
  };
}

// Helper: get all providers sorted by best rate for a corridor
export function getBestProviders(
  fromCurrency: string,
  toCurrency: string,
  amount: number
) {
  return PROVIDERS.map((provider) => ({
    provider,
    result: calculateTransfer(provider, fromCurrency, toCurrency, amount),
  }))
    .filter((p) => p.result !== null)
    .sort((a, b) => b.result!.received - a.result!.received);
}
