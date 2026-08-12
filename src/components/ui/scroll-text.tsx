"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollTextProps {
  children: string;
  className?: string;
  /** Words matching these get the signal colour instead of the default. */
  emphasise?: readonly string[];
  /**
   * External 0..1 progress driving the reveal. Supply this when the paragraph
   * lives inside a pinned section, so the caller controls the pace and can
   * guarantee the last word is lit before the pin releases. Omit it and the
   * paragraph measures its own passage through the viewport instead.
   */
  progress?: MotionValue<number>;
  /** Renders every word fully lit. Used under reduced-motion. */
  static?: boolean;
}

export function ScrollText({
  children,
  className,
  emphasise = [],
  progress,
  static: isStatic = false,
}: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const self = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = children.split(" ");
  const emphasisSet = new Set(emphasise.map((word) => word.toLowerCase()));
  const driver = progress ?? self.scrollYProgress;

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, index) => {
        const stripped = word.replace(/[^a-z0-9+%/-]/gi, "").toLowerCase();
        const highlight = emphasisSet.has(stripped);

        if (isStatic) {
          return (
            <span
              key={`${word}-${index}`}
              className={cn(
                "mr-[0.28em] inline-block",
                highlight ? "text-signal" : "text-fg",
              )}
            >
              {word}
            </span>
          );
        }

        // Each word owns a slice of the driver's range. The last word finishes
        // exactly at 1, which is what lets the caller hold the pin until then.
        const start = index / words.length;
        const end = (index + 1) / words.length;

        return (
          <Word
            key={`${word}-${index}`}
            progress={driver}
            range={[start, end]}
            highlight={highlight}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  highlight,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  // Floor of 0.22, not 0.14: below that the unread text stops registering as
  // text at all on this background, and the paragraph looks half-empty rather
  // than un-illuminated.
  const opacity = useTransform(progress, range, [0.22, 1]);

  return (
    <span className="relative mr-[0.28em] inline-block">
      <motion.span
        style={{ opacity }}
        className={cn(highlight ? "text-signal" : "text-fg")}
      >
        {children}
      </motion.span>
    </span>
  );
}
