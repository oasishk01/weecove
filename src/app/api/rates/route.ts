import { NextResponse } from "next/server";

const HKD_TARGETS = ["php", "idr", "inr", "cny", "twd", "jpy", "krw", "thb", "gbp", "usd", "aud", "cad", "sgd", "eur"];

export async function GET() {
  const primary = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/hkd.json";
  const fallback = "https://latest.currency-api.pages.dev/v1/currencies/hkd.json";

  let data;
  try {
    const res = await fetch(primary, { next: { revalidate: 3600 } });
    data = await res.json();
  } catch {
    const res = await fetch(fallback, { next: { revalidate: 3600 } });
    data = await res.json();
  }

  const rates: Record<string, number> = {};
  for (const target of HKD_TARGETS) {
    if (data.hkd?.[target]) {
      rates[`HKD-${target.toUpperCase()}`] = data.hkd[target];
    }
  }

  return NextResponse.json({
    source: "fawazahmed0/exchange-api",
    date: data.date,
    rates,
  });
}
