export interface App {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  rating: number;
  trustpilot: string;
  minCashout: string;
  earningRange: string;
  methods: string[];
  payments: string[];
  platforms: string[];
  pros: string[];
  cons: string[];
  verdict: string;
  score: number;
  url: string;
  featured?: boolean;
}

export const APPS: App[] = [
  {
    slug: "weecove",
    name: "WeeCove",
    icon: "🦦",
    tagline: "Earn rewards from surveys and tasks, designed for Hong Kong",
    rating: 4.5,
    trustpilot: "New",
    minCashout: "HK$40",
    earningRange: "HK$50-200/mo",
    methods: ["Surveys", "Tasks", "Referrals"],
    payments: ["PayPal", "Wise", "GCash"],
    platforms: ["Web", "Mobile Web"],
    pros: [
      "Built for Hong Kong users",
      "Low minimum cashout (HK$40)",
      "Supports GCash for Philippines",
      "70/30 transparent revenue split",
      "Free to use, no fees",
    ],
    cons: [
      "New platform, still growing",
      "Fewer offers than established sites",
    ],
    verdict: "Best choice for Hong Kong-based users who want a simple, transparent earning app with fast payouts to PayPal or GCash.",
    score: 7,
    url: "https://weecove.com/signup",
  },
  {
    slug: "freecash",
    name: "Freecash",
    icon: "💰",
    tagline: "High-paying GPT site with instant cashouts",
    rating: 4.6,
    trustpilot: "4.6/5 (273K reviews)",
    minCashout: "$5",
    earningRange: "$50-300/mo",
    methods: ["Surveys", "Offers", "Games", "Videos"],
    payments: ["PayPal", "Visa", "Bitcoin", "Amazon", "Google Play"],
    platforms: ["Web", "Android", "iOS"],
    pros: [
      "273K+ Trustpilot reviews",
      "Instant cashouts from $5",
      "$50M+ total paid out",
      "Daily bonuses and leaderboards",
      "10+ cashout methods",
    ],
    cons: [
      "Some offers are hard to complete",
      "Earnings vary by country",
      "Not HK-optimised",
    ],
    verdict: "One of the most trusted GPT sites globally. Great variety of earning methods and very low cashout minimum.",
    score: 8,
    url: "https://freecash.com",
  },
  {
    slug: "swagbucks",
    name: "Swagbucks",
    icon: "🪙",
    tagline: "The OG rewards site with $900M+ paid out",
    rating: 4.0,
    trustpilot: "4.0/5 (41K reviews)",
    minCashout: "$5",
    earningRange: "$30-150/mo",
    methods: ["Surveys", "Shopping", "Games", "Videos", "Search"],
    payments: ["PayPal", "Gift Cards", "Visa"],
    platforms: ["Web", "Android", "iOS", "Browser Extension"],
    pros: [
      "$900M+ total paid since 2008",
      "20M+ users worldwide",
      "Cashback on shopping (Amazon, Nike, etc.)",
      "$10 signup bonus",
      "Multiple ways to earn",
    ],
    cons: [
      "Lower survey payouts than competitors",
      "US-centric offers",
      "Some tasks are tedious",
    ],
    verdict: "The most established rewards platform. Best for users who also want cashback on everyday shopping.",
    score: 7,
    url: "https://swagbucks.com",
  },
  {
    slug: "honeygain",
    name: "Honeygain",
    icon: "🍯",
    tagline: "Earn passively by sharing your internet bandwidth",
    rating: 4.5,
    trustpilot: "4.5/5 (22K reviews)",
    minCashout: "$20",
    earningRange: "$5-30/mo",
    methods: ["Passive (Bandwidth)", "Content Delivery"],
    payments: ["PayPal", "Bitcoin", "JumpTask"],
    platforms: ["Windows", "macOS", "Android", "Linux"],
    pros: [
      "100% passive — no tasks required",
      "Runs in background on multiple devices",
      "12M+ users",
      "Simple setup",
    ],
    cons: [
      "Low earnings ($5-30/month typical)",
      "$20 minimum cashout",
      "Earnings depend on your location",
      "Uses your internet bandwidth",
    ],
    verdict: "Best for truly passive income. Set it up and forget it. Don't expect much, but it's free money for doing nothing.",
    score: 7,
    url: "https://honeygain.com",
  },
  {
    slug: "ysense",
    name: "ySense",
    icon: "📊",
    tagline: "Global survey and task platform with 16% daily bonus",
    rating: 4.3,
    trustpilot: "4.3/5 (15K reviews)",
    minCashout: "$5",
    earningRange: "$30-150/mo",
    methods: ["Surveys", "Tasks", "Offers", "Referrals"],
    payments: ["PayPal", "Payoneer", "Gift Cards", "Skrill"],
    platforms: ["Web"],
    pros: [
      "$39M+ total paid",
      "7M+ users globally",
      "16% daily activity bonus",
      "Available worldwide including HK",
    ],
    cons: [
      "Web only, no mobile app",
      "Survey disqualification rate can be high",
      "Interface feels dated",
    ],
    verdict: "Solid global platform with good daily bonuses. Works well in Hong Kong for survey-focused earning.",
    score: 7,
    url: "https://ysense.com",
  },
  {
    slug: "mistplay",
    name: "Mistplay",
    icon: "🎮",
    tagline: "Earn rewards by playing mobile games",
    rating: 4.0,
    trustpilot: "3.8/5",
    minCashout: "$5",
    earningRange: "$10-50/mo",
    methods: ["Games"],
    payments: ["Gift Cards", "Visa"],
    platforms: ["Android"],
    pros: [
      "$150M+ paid to players",
      "10M+ users",
      "Fun way to earn (just play games)",
      "Low cashout minimum",
    ],
    cons: [
      "Android only — no iOS",
      "Earnings are low",
      "Diminishing returns per game",
      "Not available in all countries",
    ],
    verdict: "Good if you already play mobile games and want some rewards for it. Don't expect to earn much.",
    score: 6,
    url: "https://mistplay.com",
  },
];
