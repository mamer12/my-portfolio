"use client";

import { useEffect, useState } from "react";

/**
 * Live clock for a fixed IANA timezone.
 *
 * Returns `null` until mounted so the server and first client render agree —
 * a time string differs on every render and would otherwise hydrate-mismatch.
 */
export function useLocalTime(timeZone: string): string | null {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(format.format(new Date()));
    tick();

    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return time;
}
