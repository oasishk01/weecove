import { type NextRequest } from "next/server";
import { createServerClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return Response.json({ error: "Email is required" }, { status: 400 });
  }

  const supabase = createServerClient();

  const { data: user } = await supabase
    .from("users")
    .select("id, name, referral_code, country")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (!user) {
    return Response.json({ error: "No account found with this email" }, { status: 404 });
  }

  return Response.json(user);
}
