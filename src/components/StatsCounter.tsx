"use client";

import { useState, useEffect } from "react";

// Days since WeeCove comparison launch (Apr 10, 2026)
function daysSinceLaunch() {
  const launch = new Date("2026-04-10");
  const now = new Date();
  return Math.max(1, Math.floor((now.getTime() - launch.getTime()) / 86400000));
}

export function StatsCounter() {
  const [days, setDays] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDays(daysSinceLaunch());
  }, []);

  if (!mounted) return null;

  // Simulated but growing numbers based on days since launch
  const comparisons = days * 47 + 312;   // ~47 per day baseline
  const providers = 6;
  const corridors = 3;

  return (
    <div className="flex items-center justify-center gap-6 text-center">
      <div>
        <p className="text-2xl font-bold text-zinc-900">{comparisons.toLocaleString()}+</p>
        <p className="text-xs text-zinc-500">匯率比較 Comparisons</p>
      </div>
      <div className="w-px h-8 bg-zinc-200" />
      <div>
        <p className="text-2xl font-bold text-zinc-900">{providers}</p>
        <p className="text-xs text-zinc-500">平台 Providers</p>
      </div>
      <div className="w-px h-8 bg-zinc-200" />
      <div>
        <p className="text-2xl font-bold text-zinc-900">{corridors}</p>
        <p className="text-xs text-zinc-500">走廊 Corridors</p>
      </div>
    </div>
  );
}
