import { NextResponse } from "next/server";
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const errorParam = searchParams.get("error");

  if (errorParam) {
    return NextResponse.redirect(`${origin}/login?error=${errorParam}`);
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Exchange code using SSR client (has access to cookies where code_verifier is stored)
  const cookieStore = await cookies();
  const supabase = createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, { ...options })
            );
          } catch {
            // Ignore errors in middleware
          }
        },
      },
    }
  );

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) {
    return NextResponse.redirect(`${origin}/login?error=exchange_failed`);
  }

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.redirect(`${origin}/login?error=no_session`);
  }

  const authUser = session.user;
  const email = authUser.email || "";
  const name = authUser.user_metadata?.full_name || authUser.user_metadata?.name || email.split("@")[0] || "User";

  // Use service role client for DB operations (bypasses RLS)
  const dbClient = createServerClient();

  // Check existing user by auth_id
  const { data: existingUser } = await dbClient
    .from("users")
    .select("id, referral_code")
    .eq("auth_id", authUser.id)
    .single();

  if (existingUser) {
    return NextResponse.redirect(
      `${origin}/auth/success?uid=${existingUser.id}&rc=${existingUser.referral_code}`
    );
  }

  // Check by email (legacy users)
  const { data: legacyUser } = await dbClient
    .from("users")
    .select("id, referral_code")
    .eq("email", email.toLowerCase())
    .single();

  if (legacyUser) {
    await dbClient.from("users").update({ auth_id: authUser.id }).eq("id", legacyUser.id);
    return NextResponse.redirect(
      `${origin}/auth/success?uid=${legacyUser.id}&rc=${legacyUser.referral_code}`
    );
  }

  // New user — create profile
  const referralCode = name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.random().toString(36).substring(2, 6);

  // Check for referral (stored in cookie by signup page)
  const refCookie = cookieStore.get("weecove_ref")?.value;
  let referredBy: string | null = null;
  if (refCookie) {
    const { data: referrer } = await dbClient
      .from("users")
      .select("id")
      .eq("referral_code", refCookie)
      .single();
    if (referrer) referredBy = referrer.id;
  }

  const { data: newUser, error: createError } = await dbClient
    .from("users")
    .insert({
      auth_id: authUser.id,
      name,
      email: email.toLowerCase(),
      country: "OTHER",
      referral_code: referralCode,
      referred_by: referredBy,
    })
    .select("id, referral_code")
    .single();

  if (createError || !newUser) {
    return NextResponse.redirect(`${origin}/login?error=create_failed`);
  }

  // Create initial balance
  await dbClient.from("balances").insert({
    user_id: newUser.id,
    available: 0,
    pending: 0,
    withdrawn: 0,
  });

  // Handle referral bonus
  if (referredBy) {
    const bonusAmount = 5;
    await dbClient.from("referrals").insert({
      referrer_id: referredBy,
      referred_id: newUser.id,
      bonus_paid: true,
    });
    await dbClient.rpc("add_balance", { p_user_id: referredBy, p_amount: bonusAmount });
    await dbClient.from("transactions").insert({
      user_id: referredBy,
      type: "referral_bonus",
      amount: bonusAmount,
      currency: "HKD",
      status: "completed",
      description: `Referral bonus: ${name} signed up`,
    });
    await dbClient.rpc("add_balance", { p_user_id: newUser.id, p_amount: bonusAmount });
    await dbClient.from("transactions").insert({
      user_id: newUser.id,
      type: "referral_bonus",
      amount: bonusAmount,
      currency: "HKD",
      status: "completed",
      description: "Welcome bonus: signed up with referral link",
    });
  }

  return NextResponse.redirect(
    `${origin}/auth/success?uid=${newUser.id}&rc=${newUser.referral_code}`
  );
}
