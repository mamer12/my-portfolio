"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Nav } from "./nav";
import { Cursor } from "./cursor";
import { Preloader } from "./preloader";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { ease } from "@/lib/motion";

/**
 * Client shell.
 *
 * Owns the boot gate: the page content is rendered from the first paint (so it
 * is in the DOM for crawlers and so images start fetching), but is held at
 * opacity 0 until the preloader finishes. Smooth scrolling only engages after
 * boot, otherwise Lenis initialises against a locked body.
 */
export function ClientLayout({ children }: { children: ReactNode }) {
  const [booted, setBooted] = useState(false);
  useSmoothScroll(booted);

  const handleDone = useCallback(() => setBooted(true), []);

  return (
    <>
      <Preloader onDone={handleDone} />
      <Cursor />
      <Nav />

      <motion.main
        id="main"
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.6, ease: ease.outExpo, delay: booted ? 0.15 : 0 }}
      >
        {children}
      </motion.main>
    </>
  );
}
