"use client";

import { useState, useEffect } from "react";

export function useLiveRates() {
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    fetch("/api/rates")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) {
          setRates(data.rates);
          setLastUpdated(data.date || "");
        }
      })
      .catch(() => {
        // Fallback: use hardcoded rates silently
      });
  }, []);

  return { rates, lastUpdated };
}
