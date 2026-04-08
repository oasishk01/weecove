import { redirect } from "next/navigation";

// Referral redirect: /r/maria → /signup?ref=maria
export default async function ReferralRedirect({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  redirect(`/signup?ref=${encodeURIComponent(code)}`);
}
