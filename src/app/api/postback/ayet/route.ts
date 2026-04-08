import { type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";

// ayeT-Studios postback webhook
// Called when a user completes an offer
// GET /api/postback/ayet?user_id={external_identifier}&payout={payout}&offer_id={offer_id}&click_id={click_id}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const userId = params.get("user_id");
  const payout = parseFloat(params.get("payout") || "0");
  const offerId = params.get("offer_id");
  const clickId = params.get("click_id");

  // Verify required params
  if (!userId || !payout || !offerId) {
    return new Response("Missing required parameters", { status: 400 });
  }

  // Optional: verify request comes from ayeT via IP whitelist or secret param
  const secret = params.get("secret");
  if (process.env.AYET_POSTBACK_SECRET && secret !== process.env.AYET_POSTBACK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabase = createServerClient();

  // Check for duplicate postback (same click_id)
  if (clickId) {
    const { data: existing } = await supabase
      .from("transactions")
      .select("id")
      .eq("offer_id", `ayet_${clickId}`)
      .single();

    if (existing) {
      return new Response("Duplicate postback", { status: 200 });
    }
  }

  // Danny keeps 30%, user gets 70%
  const userPayout = Math.round(payout * 0.7 * 100) / 100;

  // Credit user balance
  const { error: balanceError } = await supabase.rpc("add_balance", {
    p_user_id: userId,
    p_amount: userPayout,
  });

  if (balanceError) {
    return new Response("Failed to credit balance", { status: 500 });
  }

  // Create transaction record
  await supabase.from("transactions").insert({
    user_id: userId,
    type: "earn",
    amount: userPayout,
    currency: "HKD",
    status: "completed",
    description: `Completed offer #${offerId}`,
    offer_id: `ayet_${clickId || offerId}`,
  });

  // Handle referral commission (10% of user's earnings to referrer)
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
        description: `10% commission from referral task`,
        offer_id: `ref_${clickId || offerId}`,
      });
    }
  }

  return new Response("OK", { status: 200 });
}
