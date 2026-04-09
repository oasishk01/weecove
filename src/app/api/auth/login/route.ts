import { type NextRequest } from "next/server";

// Email-only login is disabled for security.
// Login is now handled by Supabase Auth (Google OAuth or email+password).
export async function POST(_request: NextRequest) {
  return Response.json(
    { error: "Email-only login is no longer supported. Please use Google sign-in or create an account with a password." },
    { status: 410 }
  );
}
