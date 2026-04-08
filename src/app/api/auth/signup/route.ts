import { type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";

function generateReferralCode(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${base}${suffix}`;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, country, ref } = body;

  if (!name || !email || !country) {
    return Response.json({ error: "Name, email, and country are required" }, { status: 400 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  const supabase = createServerClient();
  const referralCode = generateReferralCode(name);

  // Check if email already exists
  const { data: existing } = await supabase
    .from("users")
    .select("id")
    .eq("email", normalizedEmail)
    .single();

  if (existing) {
    return Response.json({ error: "Email already registered. Please log in instead." }, { status: 409 });
  }

  // Look up referrer if ref code provided
  let referredBy: string | null = null;
  if (ref) {
    const { data: referrer } = await supabase
      .from("users")
      .select("id")
      .eq("referral_code", ref)
      .single();
    if (referrer) referredBy = referrer.id;
  }

  // Create user
  const { data: user, error: userError } = await supabase
    .from("users")
    .insert({
      name,
      email: normalizedEmail,
      country,
      referral_code: referralCode,
      referred_by: referredBy,
    })
    .select("id, referral_code")
    .single();

  if (userError) {
    return Response.json({ error: "Failed to create account" }, { status: 500 });
  }

  // Create initial balance
  await supabase.from("balances").insert({
    user_id: user.id,
    available: 0,
    pending: 0,
    withdrawn: 0,
  });

  // Handle referral bonus (HK$5 each)
  if (referredBy) {
    await supabase.from("referrals").insert({
      referrer_id: referredBy,
      referred_id: user.id,
      bonus_paid: true,
    });

    // Credit both users HK$5
    const bonusAmount = 5;

    // Referrer gets bonus
    await supabase.rpc("add_balance", { p_user_id: referredBy, p_amount: bonusAmount });
    await supabase.from("transactions").insert({
      user_id: referredBy,
      type: "referral_bonus",
      amount: bonusAmount,
      currency: "HKD",
      status: "completed",
      description: `Referral bonus: ${name} signed up`,
    });

    // New user gets bonus
    await supabase.rpc("add_balance", { p_user_id: user.id, p_amount: bonusAmount });
    await supabase.from("transactions").insert({
      user_id: user.id,
      type: "referral_bonus",
      amount: bonusAmount,
      currency: "HKD",
      status: "completed",
      description: "Welcome bonus: signed up with referral link",
    });
  }

  return Response.json({ id: user.id, referral_code: user.referral_code });
}
