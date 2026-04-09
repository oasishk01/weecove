import { type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { auth_id, email, name, ref_code } = body;

  if (!auth_id || !email) {
    return Response.json({ error: "Missing auth_id or email" }, { status: 400 });
  }

  const supabase = createServerClient();

  // Check if this auth user already has a profile
  const { data: existingUser } = await supabase
    .from("users")
    .select("id, referral_code")
    .eq("auth_id", auth_id)
    .single();

  if (existingUser) {
    return Response.json(existingUser);
  }

  // Check by email (legacy users created before OAuth)
  const { data: legacyUser } = await supabase
    .from("users")
    .select("id, referral_code")
    .eq("email", email.toLowerCase())
    .single();

  if (legacyUser) {
    await supabase
      .from("users")
      .update({ auth_id })
      .eq("id", legacyUser.id);
    return Response.json(legacyUser);
  }

  // New user — create profile
  const referralCode = name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.random().toString(36).substring(2, 6);

  let referredBy: string | null = null;
  if (ref_code) {
    const { data: referrer } = await supabase
      .from("users")
      .select("id")
      .eq("referral_code", ref_code)
      .single();
    if (referrer) referredBy = referrer.id;
  }

  const { data: newUser, error: createError } = await supabase
    .from("users")
    .insert({
      auth_id,
      name,
      email: email.toLowerCase(),
      country: "OTHER",
      referral_code: referralCode,
      referred_by: referredBy,
    })
    .select("id, referral_code")
    .single();

  if (createError || !newUser) {
    return Response.json({ error: "Failed to create account" }, { status: 500 });
  }

  // Create initial balance
  await supabase.from("balances").insert({
    user_id: newUser.id,
    available: 0,
    pending: 0,
    withdrawn: 0,
  });

  // Handle referral bonus
  if (referredBy) {
    const bonusAmount = 5;
    await supabase.from("referrals").insert({
      referrer_id: referredBy,
      referred_id: newUser.id,
      bonus_paid: true,
    });
    await supabase.rpc("add_balance", { p_user_id: referredBy, p_amount: bonusAmount });
    await supabase.from("transactions").insert({
      user_id: referredBy,
      type: "referral_bonus",
      amount: bonusAmount,
      currency: "HKD",
      status: "completed",
      description: `Referral bonus: ${name} signed up`,
    });
    await supabase.rpc("add_balance", { p_user_id: newUser.id, p_amount: bonusAmount });
    await supabase.from("transactions").insert({
      user_id: newUser.id,
      type: "referral_bonus",
      amount: bonusAmount,
      currency: "HKD",
      status: "completed",
      description: "Welcome bonus: signed up with referral link",
    });
  }

  return Response.json(newUser);
}
