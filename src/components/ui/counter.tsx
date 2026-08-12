"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface CounterProps {
  /** Final rendered string, e.g. "10M", "10,000" or "0". */
  display: string;
  suffix?: string;
  className?: string;
  durationMs?: number;
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * Counts the numeric portion of `display` up from zero when scrolled into view.
 *
 * Only the first run of digits animates; any unit letters ("M") and the suffix
 * are held constant. Intermediate values are re-formatted with `toLocaleString`
 * rather than zero-padded — padding produced strings like "09,884" on the way
 * to "10,000", which reads as a rendering bug.
 *
 * An invisible copy of the final string reserves the layout box, so the growing
 * number never reflows the label beneath it.
 */
export function Counter({
  display,
  suffix,
  className,
  durationMs = 1500,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = usePrefersReducedMotion();
  const [rendered, setRendered] = useState(display);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const match = display.match(/[\d,]+/);
    const raw = match?.[0];
    const target = raw ? Number(raw.replace(/,/g, "")) : NaN;

    // Nothing meaningful to count: a pure "0", or no digits at all.
    if (reducedMotion || !raw || !Number.isFinite(target) || target === 0) {
      setRendered(display);
      setStarted(true);
      return;
    }

    const grouped = raw.includes(",");
    const format = (value: number) =>
      grouped ? value.toLocaleString("en-US") : String(value);

    setStarted(true);
    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const current = Math.round(easeOutExpo(progress) * target);
      setRendered(display.replace(raw, format(current)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, display, durationMs, reducedMotion]);

  return (
    <span
      ref={ref}
      className={cn("numeric relative inline-block tabular-nums", className)}
    >
      {/* Sizer: reserves the final width so the count never shifts layout. */}
      <span aria-hidden className="invisible">
        {display}
        {suffix}
      </span>
      <span className="absolute inset-0 whitespace-nowrap">
        {started ? rendered : display.replace(/\d/g, "0")}
        {suffix ? <span className="text-signal">{suffix}</span> : null}
      </span>
    </span>
  );
}
