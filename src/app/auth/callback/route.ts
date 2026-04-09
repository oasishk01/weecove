import { NextResponse } from "next/server";
import createSupabaseServer from "@/lib/supabase-server";
import { createServerClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${origin}/login`);
  }

  // Exchange auth code using SSR client (has access to PKCE code_verifier in cookies)
  const supabase = await createSupabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=exchange_failed`);
  }

  // Get the authenticated user
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser) {
    return NextResponse.redirect(`${origin}/login?error=no_user`);
  }

  const email = authUser.email || "";
  const name = authUser.user_metadata?.full_name || authUser.user_metadata?.name || email.split("@")[0] || "User";

  // Use service role client for DB operations (bypasses RLS)
  const db = createServerClient();

  // Check existing user by auth_id
  const { data: existingUser } = await db
    .from("users")
    .select("id, referral_code")
    .eq("auth_id", authUser.id)
    .single();

  if (existingUser) {
    const res = NextResponse.redirect(`${origin}/earn`);
    res.cookies.set("weecove_user_id", existingUser.id, { path: "/", maxAge: 86400 * 365 });
    res.cookies.set("weecove_referral_code", existingUser.referral_code, { path: "/", maxAge: 86400 * 365 });
    return res;
  }

  // Check by email (legacy users)
  const { data: legacyUser } = await db
    .from("users")
    .select("id, referral_code")
    .eq("email", email.toLowerCase())
    .single();

  if (legacyUser) {
    await db.from("users").update({ auth_id: authUser.id }).eq("id", legacyUser.id);
    const res = NextResponse.redirect(`${origin}/earn`);
    res.cookies.set("weecove_user_id", legacyUser.id, { path: "/", maxAge: 86400 * 365 });
    res.cookies.set("weecove_referral_code", legacyUser.referral_code, { path: "/", maxAge: 86400 * 365 });
    return res;
  }

  // New user
  const referralCode = name.toLowerCase().replace(/[^a-z0-9]/g, "") + Math.random().toString(36).substring(2, 6);

  const { data: newUser, error: createError } = await db
    .from("users")
    .insert({
      auth_id: authUser.id,
      name,
      email: email.toLowerCase(),
      country: "OTHER",
      referral_code: referralCode,
    })
    .select("id, referral_code")
    .single();

  if (createError || !newUser) {
    return NextResponse.redirect(`${origin}/login?error=create_failed`);
  }

  await db.from("balances").insert({
    user_id: newUser.id,
    available: 0,
    pending: 0,
    withdrawn: 0,
  });

  const res = NextResponse.redirect(`${origin}/earn`);
  res.cookies.set("weecove_user_id", newUser.id, { path: "/", maxAge: 86400 * 365 });
  res.cookies.set("weecove_referral_code", newUser.referral_code, { path: "/", maxAge: 86400 * 365 });
  return res;
}
