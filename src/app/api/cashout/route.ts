import { type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { getAuthUser } from "@/lib/auth";

const MIN_CASHOUT = 40;

export async function POST(request: NextRequest) {
  // Authenticate via Supabase session
  const authUser = await getAuthUser(request);
  const body = await request.json();
  const { amount, method, paypal_email, gcash_number } = body;

  // Get user_id from auth session, fallback to body for legacy users
  let userId: string | null = null;

  if (authUser) {
    const supabase = createServerClient();
    const { data: appUser } = await supabase
      .from("users")
      .select("id")
      .eq("auth_id", authUser.authId)
      .single();
    if (appUser) userId = appUser.id;
  }

  // Fallback for legacy users (will be removed later)
  if (!userId) userId = body.user_id;

  if (!userId) {
    return Response.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!amount || amount < MIN_CASHOUT) {
    return Response.json({ error: `Minimum cashout is HK$ ${MIN_CASHOUT}` }, { status: 400 });
  }

  if (!method || !["paypal", "gcash", "wise"].includes(method)) {
    return Response.json({ error: "Invalid cashout method" }, { status: 400 });
  }

  if (method === "paypal" && !paypal_email) {
    return Response.json({ error: "PayPal email is required" }, { status: 400 });
  }

  if (method === "gcash" && !gcash_number) {
    return Response.json({ error: "GCash number is required" }, { status: 400 });
  }

  const supabase = createServerClient();

  // Check balance
  const { data: balance } = await supabase
    .from("balances")
    .select("available")
    .eq("user_id", userId)
    .single();

  if (!balance || balance.available < amount) {
    return Response.json({ error: "Insufficient balance" }, { status: 400 });
  }

  // Deduct from available balance
  const { error: deductError } = await supabase.rpc("deduct_balance", {
    p_user_id: userId,
    p_amount: amount,
  });

  if (deductError) {
    return Response.json({ error: "Failed to process cashout" }, { status: 500 });
  }

  // Create cashout request
  const { data: cashoutReq, error: cashoutError } = await supabase
    .from("cashout_requests")
    .insert({
      user_id: userId,
      amount,
      method,
      paypal_email: method === "paypal" ? paypal_email : null,
      gcash_number: method === "gcash" ? gcash_number : null,
      status: "pending",
    })
    .select("id")
    .single();

  if (cashoutError) {
    return Response.json({ error: "Failed to create cashout request" }, { status: 500 });
  }

  // Create transaction record
  await supabase.from("transactions").insert({
    user_id: userId,
    type: "cashout",
    amount: -amount,
    currency: "HKD",
    status: "pending",
    description: `Cashout via ${method}`,
  });

  return Response.json({ id: cashoutReq.id, status: "pending" });
}
