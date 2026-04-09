"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      localStorage.setItem("weecove_user_id", data.id);
      localStorage.setItem("weecove_referral_code", data.referral_code);
      router.push("/earn");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-full bg-white">
      <div className="px-6 pt-12 pb-8 max-w-md mx-auto w-full flex-1">
        <Link href="/" className="text-emerald-600 font-bold text-xl">
          WeeCove
        </Link>

        <h1 className="text-3xl font-bold mt-8">Welcome back</h1>
        <p className="text-zinc-500 mt-2">Enter your email to log in.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="maria@email.com"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 text-white font-semibold text-lg py-3.5 hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-400 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-emerald-600 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
