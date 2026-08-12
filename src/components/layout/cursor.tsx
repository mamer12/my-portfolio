"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/use-media-query";

/**
 * Crosshair cursor for pointer devices.
 *
 * Two elements: a 1px dot pinned exactly to the pointer, and a lagging square
 * reticle that expands over interactive targets. Interactive detection uses
 * `closest()` on the event target so it works for nested markup without every
 * button needing to opt in.
 */
export function Cursor() {
  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 });

  useEffect(() => {
    setEnabled(!isTouch && !reducedMotion && window.innerWidth >= 1024);
  }, [isTouch, reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      setHot(
        Boolean(
          target?.closest?.(
            'a, button, [role="button"], input, textarea, select, [data-cursor="hot"]',
          ),
        ),
      );
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[190] hidden lg:block"
      aria-hidden="true"
    >
      <motion.span
        className="absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal"
        style={{ x, y, opacity: visible ? 1 : 0 }}
      />
      <motion.span
        className="absolute -translate-x-1/2 -translate-y-1/2 border border-signal/60"
        style={{
          x: ringX,
          y: ringY,
          opacity: visible ? (hot ? 1 : 0.45) : 0,
          width: hot ? 44 : 22,
          height: hot ? 44 : 22,
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
