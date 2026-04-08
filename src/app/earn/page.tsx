"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNav from "@/app/components/BottomNav";

interface Offer {
  id: string;
  name: string;
  description: string;
  payout: number;
  category: "quick" | "big";
  tag: string;
  tagColor: string;
  estimated_time: string;
}

const OFFERS: Offer[] = [
  { id: "1", name: "Watch a short video", description: "Watch a 30-second ad and earn", payout: 0.15, category: "quick", tag: "Ad", tagColor: "bg-pink-50 text-pink-600", estimated_time: "30 sec" },
  { id: "2", name: "Quick Survey — Daily Habits", description: "Answer 5 questions about your daily routine", payout: 0.5, category: "quick", tag: "Survey", tagColor: "bg-blue-50 text-blue-600", estimated_time: "2 min" },
  { id: "3", name: "Try Shopping App", description: "Download and browse for 3 minutes", payout: 2, category: "quick", tag: "App", tagColor: "bg-amber-50 text-amber-600", estimated_time: "5 min" },
  { id: "4", name: "Food Delivery Sign Up", description: "Create a free account on food delivery app", payout: 3.5, category: "quick", tag: "Sign Up", tagColor: "bg-orange-50 text-orange-600", estimated_time: "5 min" },
  { id: "5", name: "Play Puzzle Game to Level 10", description: "Fun puzzle game. Reach level 10 to earn.", payout: 8, category: "big", tag: "Game", tagColor: "bg-purple-50 text-purple-600", estimated_time: "2-3 days" },
  { id: "6", name: "City Builder — Town Hall Lv 5", description: "Build and upgrade your city", payout: 12, category: "big", tag: "Game", tagColor: "bg-purple-50 text-purple-600", estimated_time: "4-5 days" },
  { id: "7", name: "RPG Adventure — Chapter 3", description: "Play through the story campaign", payout: 15, category: "big", tag: "Game", tagColor: "bg-purple-50 text-purple-600", estimated_time: "5-7 days" },
  { id: "8", name: "Casino Game — VIP Level 3", description: "Play slots and table games (no real money)", payout: 10, category: "big", tag: "Game", tagColor: "bg-purple-50 text-purple-600", estimated_time: "3-4 days" },
];

export default function EarnPage() {
  const [tab, setTab] = useState<"quick" | "big">("quick");
  const filtered = OFFERS.filter((o) => o.category === tab);

  return (
    <div className="flex flex-col min-h-full bg-zinc-50">
      <header className="bg-white px-6 pt-12 pb-4 border-b border-zinc-100">
        <h1 className="text-2xl font-bold">Earn</h1>
        <p className="text-zinc-500 text-sm mt-1">Complete tasks to earn HK$</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setTab("quick")}
            className={"flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors " +
              (tab === "quick" ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600")}
          >
            Quick Tasks
          </button>
          <button
            onClick={() => setTab("big")}
            className={"flex-1 py-2.5 rounded-lg font-medium text-sm transition-colors " +
              (tab === "big" ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600")}
          >
            Big Rewards
          </button>
        </div>
      </header>

      <main className="flex-1 px-6 py-4 pb-20 max-w-lg mx-auto w-full">
        {filtered.map((offer) => (
          <div
            key={offer.id}
            className="flex items-center justify-between py-4 border-b border-zinc-100 last:border-0"
          >
            <div className="flex-1 min-w-0 pr-4">
              <div className="flex items-center gap-2">
                <span className={"text-[11px] font-semibold px-2 py-0.5 rounded-full " + offer.tagColor}>{offer.tag}</span>
                <span className="text-zinc-400 text-xs">{offer.estimated_time}</span>
              </div>
              <h3 className="font-medium text-zinc-900 mt-1.5">{offer.name}</h3>
              <p className="text-zinc-500 text-sm mt-0.5">{offer.description}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-emerald-700 font-bold text-lg tabular-nums">
                {"HK$ " + offer.payout}
              </p>
              <button className="mt-1 bg-emerald-600 text-white text-xs font-semibold rounded-lg px-4 py-1.5 hover:bg-emerald-700 transition-colors">
                Start
              </button>
            </div>
          </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
