"use client";

import { useState } from "react";
import BottomNav from "@/app/components/BottomNav";
import { useAuth } from "@/lib/useAuth";

const BITLABS_TOKEN = "7da40458-f61d-47b0-92ee-5fb2a3640966";

export default function EarnPage() {
  const auth = useAuth();
  const [tab, setTab] = useState<"surveys" | "tasks">("surveys");
  const userId = auth?.id || "";

  const offerwallUrl = userId
    ? `https://web.bitlabs.ai/?token=${BITLABS_TOKEN}&uid=${userId}`
    : "";

  return (
    <div className="flex flex-col min-h-full bg-zinc-50">
      <header className="bg-white px-6 pt-12 pb-4 border-b border-zinc-100">
        <h1 className="text-2xl font-bold">Earn</h1>
        <p className="text-zinc-500 text-sm mt-1">Complete tasks to earn HK$</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setTab("surveys")}
            className={"flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors " +
              (tab === "surveys" ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600")}
          >
            Surveys
          </button>
          <button
            onClick={() => setTab("tasks")}
            className={"flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors " +
              (tab === "tasks" ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600")}
          >
            App Tasks
          </button>
        </div>
      </header>

      <main className="flex-1 pb-20">
        {tab === "surveys" ? (
          userId ? (
            <iframe
              src={offerwallUrl}
              className="w-full border-0"
              style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}
              allow="clipboard-write"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>
              </div>
              <h2 className="text-lg font-bold text-zinc-900">Sign up to start earning</h2>
              <p className="text-zinc-500 text-sm mt-1 max-w-xs">Create a free account to access surveys and earn HK$</p>
              <a href="/signup" className="mt-4 bg-emerald-600 text-white font-semibold rounded-xl px-6 py-3 hover:bg-emerald-700 transition-colors">
                Sign Up Free
              </a>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">Coming soon</h2>
            <p className="text-zinc-500 text-sm mt-1 max-w-xs">App install tasks and game offers are being added. Check back soon!</p>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
