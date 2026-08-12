"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { usePrefersReducedMotion } from "./use-media-query";

/**
 * Module-level handle to the active Lenis instance.
 *
 * Anchor navigation needs to drive the same scroller that Lenis controls —
 * calling `scrollIntoView` while Lenis is running fights it and stutters. Any
 * component can call `scrollToSection` without threading a ref through props.
 */
let activeLenis: Lenis | null = null;

/** Scrolls to a section by id, routing through Lenis when it is running. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id);
  if (!target) return;

  if (activeLenis) {
    activeLenis.scrollTo(target, { offset: 0, duration: 1.1 });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Drives Lenis smooth scrolling for the whole document.
 *
 * Lenis animates the real scroll position, so `useScroll` from motion and
 * IntersectionObserver both keep working unchanged. Disabled entirely when the
 * user prefers reduced motion or is on a touch device, where native momentum
 * scrolling beats anything we can emulate.
 */
export function useSmoothScroll(enabled: boolean): void {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!enabled || reducedMotion) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      lerp: 0.11,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    activeLenis = lenis;

    let frame = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      activeLenis = null;
    };
  }, [enabled, reducedMotion]);
}
