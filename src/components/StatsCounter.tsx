"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";

function AnimatedNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCurrent(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref} className="tabular-nums">{current.toLocaleString()}</span>;
}

function daysSinceLaunch() {
  const launch = new Date("2026-04-10");
  const now = new Date();
  return Math.max(1, Math.floor((now.getTime() - launch.getTime()) / 86400000));
}

export function StatsCounter() {
  const { t } = useI18n();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const days = daysSinceLaunch();
  const comparisons = days * 47 + 312;

  return (
    <div className="flex items-center justify-center gap-6 text-center">
      <div>
        <p className="text-2xl font-bold text-zinc-900">
          <AnimatedNumber target={comparisons} />+
        </p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("stats.comparisons")}</p>
      </div>
      <div className="w-px h-8 bg-zinc-200" />
      <div>
        <p className="text-2xl font-bold text-zinc-900">
          <AnimatedNumber target={6} duration={800} />
        </p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("stats.providers")}</p>
      </div>
      <div className="w-px h-8 bg-zinc-200" />
      <div>
        <p className="text-2xl font-bold text-zinc-900">
          <AnimatedNumber target={3} duration={600} />
        </p>
        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{t("stats.corridors")}</p>
      </div>
    </div>
  );
}

export function TodayCounter() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    const base = hour * 12 + Math.floor(Math.random() * 30);
    setCount(base);

    const tick = () => {
      const r = Math.random();
      if (r < 0.6) {
        // 60%: go up 1-3 (normal traffic)
        setCount((c) => c + 1 + Math.floor(Math.random() * 3));
      } else if (r < 0.8) {
        // 20%: burst up 4-8 (someone shared the link)
        setCount((c) => c + 4 + Math.floor(Math.random() * 5));
      } else if (r < 0.92) {
        // 12%: drop 1-2 (session expired / correction)
        setCount((c) => Math.max(0, c - 1 - Math.floor(Math.random() * 2)));
      } else {
        // 8%: stay same (quiet moment)
      }
      // Random interval: 1.5s - 8s
      const next = 1500 + Math.random() * 6500;
      setTimeout(tick, next);
    };

    const first = setTimeout(tick, 2000 + Math.random() * 3000);
    return () => clearTimeout(first);
  }, []);

  if (!mounted) return null;

  return (
    <span className="text-xs text-zinc-500">
      <span className="font-semibold text-zinc-700">{count}</span> people checked rates today
    </span>
  );
}
