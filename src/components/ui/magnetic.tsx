"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { spring } from "@/lib/motion";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element is allowed to travel toward the pointer, in px. */
  strength?: number;
}

/**
 * Pulls its child toward the pointer while hovered.
 *
 * Disabled on touch and under reduced-motion, where it would either never fire
 * or cause unwanted movement. The transform is applied to a wrapper so the
 * child keeps its own hover transitions.
 */
export function Magnetic({ children, className, strength = 14 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const disabled = isTouch || reducedMotion;

  const springX = useSpring(x, spring.pointer);
  const springY = useSpring(y, spring.pointer);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    // Normalise by half-size so `strength` means the same thing at any scale.
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={disabled ? undefined : { x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
