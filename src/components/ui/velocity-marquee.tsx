"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface VelocityMarqueeProps {
  children: ReactNode;
  /** Base drift in percent of one copy's width per second. Sign sets direction. */
  baseVelocity?: number;
  /** Number of duplicated copies. Needs enough to cover the widest viewport. */
  copies?: number;
  className?: string;
  itemClassName?: string;
}

/**
 * Horizontal marquee whose speed and direction are modulated by scroll velocity.
 *
 * Scrolling down pushes the strip along; scrolling up drags it back. It idles at
 * `baseVelocity` when the page is still. This is the site's recurring kinetic
 * motif — the same component drives the hero ticker and the stack rails.
 */
export function VelocityMarquee({
  children,
  baseVelocity = 4,
  copies = 4,
  className,
  itemClassName,
}: VelocityMarqueeProps) {
  const baseX = useMotionValue(0);
  const directionRef = useRef<1 | -1>(1);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // Map raw px/s scroll velocity onto a bounded multiplier so a fast flick
  // accelerates the strip noticeably without it tearing across the screen.
  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [-4, 0, 4],
    { clamp: true },
  );

  useMotionValueEvent(scrollVelocity, "change", (latest) => {
    if (latest < -1) directionRef.current = -1;
    else if (latest > 1) directionRef.current = 1;
  });

  useAnimationFrame((_, delta) => {
    if (reducedMotion) return;

    // Percent of a single copy's width. `wrap` below keeps it in [-100, 0).
    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    moveBy += moveBy * Math.abs(velocityFactor.get());

    const next = baseX.get() + moveBy;
    // Modulo into a single copy width so the loop is seamless in both directions.
    baseX.set(((next % 100) - 100) % 100);
  });

  const x = useTransform(baseX, (value) => `${value}%`);

  return (
    <div
      className={cn("relative flex w-full overflow-hidden", className)}
      role="marquee"
      aria-hidden="true"
    >
      <motion.div className="flex flex-nowrap will-change-transform" style={{ x }}>
        {Array.from({ length: copies }).map((_, index) => (
          <div
            key={index}
            className={cn("flex shrink-0 items-center", itemClassName)}
          >
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * CSS-only marquee for cases that do not need scroll coupling. Cheaper, and it
 * keeps running while the main thread is busy because it never touches JS.
 */
export function CssMarquee({
  children,
  duration = "42s",
  reverse = false,
  gap = "0rem",
  className,
  pauseOnHover = false,
}: {
  children: ReactNode;
  duration?: string;
  reverse?: boolean;
  gap?: string;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={cn("group flex w-full overflow-hidden", className)}
      style={{ ["--duration" as string]: duration, ["--gap" as string]: gap }}
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            "flex shrink-0 animate-marquee items-center will-change-transform",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
