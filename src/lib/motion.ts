import type { Transition, Variants } from "motion/react";

/** Shared easing curves. Mirrors the CSS custom properties in globals.css. */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
  outQuint: [0.22, 1, 0.36, 1],
} as const;

export const spring = {
  /** Snappy — pointer-following elements. */
  pointer: { stiffness: 350, damping: 30, mass: 0.4 },
  /** Soft — scroll-linked transforms, avoids visible stepping. */
  scroll: { stiffness: 120, damping: 26, mass: 0.6 },
} as const;

export const transition = {
  fast: { duration: 0.28, ease: ease.outExpo },
  mid: { duration: 0.55, ease: ease.outExpo },
  slow: { duration: 0.95, ease: ease.outExpo },
} satisfies Record<string, Transition>;

/** Fade + rise. The default entrance for body content. */
export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: transition.mid },
};

/** Clip-path wipe from the bottom. Used for headlines and images. */
export const wipeUp: Variants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: "18%" },
  show: {
    clipPath: "inset(0% 0 0 0)",
    y: "0%",
    transition: { duration: 0.9, ease: ease.outExpo },
  },
};

/** Stagger parent. Pair with `rise` or `wipeUp` children. */
export const stagger = (amount = 0.06, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: amount, delayChildren: delay },
  },
});

/** Viewport config used across every in-view reveal, so timing feels uniform. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
