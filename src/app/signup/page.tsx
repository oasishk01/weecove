"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const COUNTRIES = [
  { value: "PH", label: "Philippines" },
  { value: "ID", label: "Indonesia" },
  { value: "PK", label: "Pakistan" },
  { value: "NP", label: "Nepal" },
  { value: "IN", label: "India" },
  { value: "OTHER", label: "Other" },
] as const;

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, country }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      router.push("/dashboard");
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

        <h1 className="text-3xl font-bold mt-8">Create your account</h1>
        <p className="text-zinc-500 mt-2">10 seconds. No documents. Start earning today.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Your name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Maria Santos"
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

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

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-zinc-700 mb-1.5">
              Where are you from?
            </label>
            <select
              id="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-600 text-sm bg-red-50 rounded-lg px-4 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-600 text-white font-semibold text-lg py-3.5 hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Start Earning"}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-400 text-sm">
          Already have an account?{" "}
          <Link href="/dashboard" className="text-emerald-600 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
