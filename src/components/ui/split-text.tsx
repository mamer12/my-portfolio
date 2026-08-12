"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ease } from "@/lib/motion";

interface SplitTextProps {
  children: string;
  className?: string;
  /** Per-character delay. Lower for long strings so the reveal stays tight. */
  stagger?: number;
  delay?: number;
  /** Start the animation immediately rather than waiting for the viewport. */
  immediate?: boolean;
}

/**
 * Character-level mask reveal for display headlines.
 *
 * Each character sits in an `overflow-hidden` box and slides up from below the
 * baseline. The whole string stays in the accessibility tree as one label —
 * screen readers never hear it spelled out letter by letter.
 */
export function SplitText({
  children,
  className,
  stagger = 0.028,
  delay = 0,
  immediate = false,
}: SplitTextProps) {
  const characters = Array.from(children);
  const animateProps = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap", className)}
      initial="hidden"
      {...animateProps}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={children}
    >
      {characters.map((character, index) => (
        <span
          key={`${character}-${index}`}
          aria-hidden
          className="inline-block overflow-hidden"
          // Extra bottom padding stops descenders (g, y, p) being clipped by
          // the mask, which is otherwise the classic bug in this effect.
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%" },
              show: {
                y: "0%",
                transition: { duration: 0.85, ease: ease.outExpo },
              },
            }}
          >
            {character === " " ? " " : character}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
