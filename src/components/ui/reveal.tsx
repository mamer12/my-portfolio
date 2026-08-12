"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ease, viewportOnce } from "@/lib/motion";

type RevealMode = "rise" | "wipe" | "fade" | "scale-x";

/**
 * IMPORTANT — why `wipe` and `scale-x` animate a child rather than themselves.
 *
 * `whileInView` is driven by IntersectionObserver, and Chrome computes the
 * intersection rect *after* applying the element's own `clip-path` and
 * transforms. An element whose hidden state is `clip-path: inset(105%)` or
 * `scaleX(0)` therefore has zero visible area, reports `intersectionRatio: 0`
 * forever, and can never satisfy the threshold that would reveal it — it
 * deadlocks itself permanently invisible.
 *
 * The fix is to keep the observed element at full size and move the collapse
 * onto an inner element. `rise` and `fade` are unaffected: opacity and
 * translation do not shrink the intersection rect to nothing.
 */

const riseVariants = (distance: number): Variants => ({
  hidden: { opacity: 0, y: distance },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.outExpo },
  },
});

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: ease.outExpo } },
};

/** Inner slide for `wipe`; the parent supplies the mask via overflow-hidden. */
const wipeInner: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: ease.outExpo } },
};

/** Inner scale for `scale-x`, used by the section hairlines. */
const scaleInner: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: ease.outExpo } },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  mode?: RevealMode;
  delay?: number;
  distance?: number;
  as?: "div" | "span" | "li" | "section" | "p";
}

export function Reveal({
  children,
  className,
  mode = "rise",
  delay = 0,
  distance = 26,
  as = "div",
}: RevealProps) {
  const orchestration = {
    initial: "hidden" as const,
    whileInView: "show" as const,
    viewport: viewportOnce,
  };

  if (mode === "wipe") {
    return (
      <motion.div
        className={cn("overflow-hidden", className)}
        {...orchestration}
        variants={{ hidden: {}, show: { transition: { delayChildren: delay } } }}
      >
        <motion.div
          variants={wipeInner}
          className="will-change-transform"
          // Descenders (g, y, p) would otherwise be shaved off by the mask.
          style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }

  if (mode === "scale-x") {
    return (
      <motion.div
        className={className}
        {...orchestration}
        variants={{ hidden: {}, show: { transition: { delayChildren: delay } } }}
      >
        <motion.div variants={scaleInner} className="origin-left">
          {children}
        </motion.div>
      </motion.div>
    );
  }

  const Component = motion[as];

  return (
    <Component
      className={className}
      variants={mode === "fade" ? fadeVariants : riseVariants(distance)}
      {...orchestration}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  amount?: number;
  delay?: number;
}

/** Parent that staggers any `StaggerItem` children beneath it. */
export function StaggerGroup({
  children,
  className,
  amount = 0.07,
  delay = 0,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: amount, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Child for `StaggerGroup` — inherits the parent's orchestration. */
export function StaggerItem({
  children,
  className,
  distance = 22,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  return (
    <motion.div className={className} variants={riseVariants(distance)}>
      {children}
    </motion.div>
  );
}
