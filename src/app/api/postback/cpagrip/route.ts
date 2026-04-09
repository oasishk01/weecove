import { type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";

// CPAGrip postback webhook
// URL in CPAGrip: https://weecove.com/api/postback/cpagrip?user_id={tracking_id}&payout={payout}&offer_id={offer_id}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const userId = params.get("user_id");
  const payout = parseFloat(params.get("payout") || "0");
  const offerId = params.get("offer_id");

  if (!userId || !payout || !offerId) {
    return new Response("Missing required parameters", { status: 400 });
  }

  const supabase = createServerClient();

  // Dedup by offer_id + user_id
  const dedupKey = `cpagrip_${offerId}_${userId}`;
  const { data: existing } = await supabase
    .from("transactions")
    .select("id")
    .eq("offer_id", dedupKey)
    .single();

  if (existing) {
    return new Response("Duplicate postback", { status: 200 });
  }

  // 70% to user, 30% to WeeCove
  const userPayout = Math.round(payout * 0.7 * 100) / 100;

  const { error: balanceError } = await supabase.rpc("add_balance", {
    p_user_id: userId,
    p_amount: userPayout,
  });

  if (balanceError) {
    return new Response("Failed to credit balance", { status: 500 });
  }

  await supabase.from("transactions").insert({
    user_id: userId,
    type: "earn",
    amount: userPayout,
    currency: "HKD",
    status: "completed",
    description: `Completed CPAGrip offer #${offerId}`,
    offer_id: dedupKey,
  });

  // Referral commission (10%)
  const { data: user } = await supabase
    .from("users")
    .select("referred_by")
    .eq("id", userId)
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
        offer_id: `ref_${dedupKey}`,
      });
    }
  }

  return new Response("OK", { status: 200 });
}
