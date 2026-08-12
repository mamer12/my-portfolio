"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe media query hook.
 *
 * Returns `false` on the server and on the first client render, then settles to
 * the real value in an effect. Consumers must therefore treat `false` as
 * "not yet known" for anything that would cause a hydration mismatch.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(list.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Tailwind `lg` and up — where the pointer is reliably a mouse. */
export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");

/** Coarse pointer means touch: no hover states, no custom cursor. */
export const useIsTouch = () => useMediaQuery("(pointer: coarse)");

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");
