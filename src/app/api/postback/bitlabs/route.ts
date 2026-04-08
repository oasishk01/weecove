import { NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";

// BitLabs postback webhook
// POST /api/postback/bitlabs
// Params: uid, reward, currency, transaction_id

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { uid, reward, currency, transaction_id } = body;

  if (!uid || !reward || !transaction_id) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const payout = parseFloat(reward);
  if (!payout || payout <= 0) {
    return new Response("Invalid reward", { status: 400 });
  }

  const supabase = createServerClient();

  // Check for duplicate postback
  const { data: existing } = await supabase
    .from("transactions")
    .select("id")
    .eq("offer_id", `bitlabs_${transaction_id}`)
    .single();

  if (existing) {
    return new Response("Duplicate postback", { status: 200 });
  }

  // Danny keeps 30%, user gets 70%
  const userPayout = Math.round(payout * 0.7 * 100) / 100;

  // Credit user balance
  const { error: balanceError } = await supabase.rpc("add_balance", {
    p_user_id: uid,
    p_amount: userPayout,
  });

  if (balanceError) {
    return new Response("Failed to credit balance", { status: 500 });
  }

  // Create transaction record
  await supabase.from("transactions").insert({
    user_id: uid,
    type: "earn",
    amount: userPayout,
    currency: currency || "HKD",
    status: "completed",
    description: `BitLabs survey completed`,
    offer_id: `bitlabs_${transaction_id}`,
  });

  // Handle referral commission (10% of user's earnings to referrer)
  const { data: user } = await supabase
    .from("users")
    .select("referred_by")
    .eq("id", uid)
    .single();

  if (user?.referred_by) {
    const commission = Math.round(userPayout * 0.1 * 100) / 100;
    if (commission > 0) {
      await supabase.rpc("add_balance", {
        p_user_id: user.referred_by,
        p_amount: commission,
      });
      await supabase.from("transactions").insert({
        user_id: user.referred_by,
        type: "referral_commission",
        amount: commission,
        currency: "HKD",
        status: "completed",
        description: "10% commission from referral task",
        offer_id: `ref_bitlabs_${transaction_id}`,
      });
    }
  }

  return new Response("OK", { status: 200 });
}

// Also handle GET in case BitLabs sends GET requests
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const uid = params.get("uid");
  const reward = params.get("reward");
  const transaction_id = params.get("transaction_id");
  const currency = params.get("currency");

  if (!uid || !reward || !transaction_id) {
    return new Response("Missing required parameters", { status: 400 });
  }

  // Reuse POST logic by creating a fake request body
  const body = { uid, reward, currency, transaction_id };
  const fakeRequest = new NextRequest(request.url, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return POST(fakeRequest);
}
