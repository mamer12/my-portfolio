"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

const BOOT_LINES = [
  "init runtime",
  "mount lattice",
  "resolve assets",
  "ready",
] as const;

interface PreloaderProps {
  onDone: () => void;
}

/**
 * Boot sequence overlay.
 *
 * Framed as a system coming online rather than a generic spinner — a counter,
 * a progress rule, and a short log. It always resolves: the timer is
 * unconditional, so a stalled asset can never trap the visitor behind it.
 */
export function Preloader({ onDone }: PreloaderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion) {
      setProgress(100);
      setVisible(false);
      onDone();
      return;
    }

    const duration = 1500;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease-out so the count decelerates into 100 instead of stopping dead.
      setProgress(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Hold at 100 briefly so the reader registers it before the wipe.
        window.setTimeout(() => {
          setVisible(false);
          onDone();
        }, 260);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onDone, reducedMotion]);

  const activeLine = Math.min(
    Math.floor((progress / 100) * BOOT_LINES.length),
    BOOT_LINES.length - 1,
  );

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-[var(--gutter)] py-8"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: ease.inOutQuart }}
        >
          <div className="flex items-start justify-between">
            <p className="label">{site.name}</p>
            <p className="label">{site.location}</p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between gap-6">
              <p className="numeric text-mega leading-[0.8] text-fg">
                {String(progress).padStart(3, "0")}
                <span className="text-signal">%</span>
              </p>
              <ul className="hidden shrink-0 gap-1 pb-3 sm:flex sm:flex-col">
                {BOOT_LINES.map((line, index) => (
                  <li
                    key={line}
                    className="label transition-colors duration-300"
                    style={{
                      color:
                        index <= activeLine
                          ? "rgb(var(--signal))"
                          : "rgb(var(--fg-faint) / 0.4)",
                    }}
                  >
                    {index <= activeLine ? "▸ " : "· "}
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div className="h-px w-full bg-line">
              <motion.div
                className="h-full bg-signal"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <p className="label max-w-md">{site.role}</p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
