"use client";

import { useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { heroMetrics, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { HeroVisual } from "@/components/three/hero-visual";
import { SplitText } from "@/components/ui/split-text";
import { Action } from "@/components/ui/action";
import { Counter } from "@/components/ui/counter";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { scrollToSection } from "@/hooks/use-smooth-scroll";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // The mesh reads scroll progress from a ref inside its own rAF loop. Passing
  // a MotionValue would re-render React 60x/second for nothing.
  const scrollProgress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    scrollProgress.current = value;
  });

  const reducedMotion = usePrefersReducedMotion();

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: ease.outExpo },
  });

  return (
    <section
      ref={sectionRef}
      id="index"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-x-clip pb-10 pt-24 md:pt-28"
    >
      {/* Full-bleed topology mesh — the field the glass sits over. */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.4, ease: ease.outExpo }}
      >
        <HeroVisual scrollRef={scrollProgress} variant="backdrop" />
      </motion.div>

      <div className="shell relative">
        {/* --- locale pill ------------------------------------------------ */}
        <motion.div
          className="flex flex-wrap items-center gap-3"
          {...fadeIn(0.3)}
        >
          <p className="glass-pill label flex items-center gap-2 rounded-full px-4 py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            {site.location} · {site.utcOffset}
          </p>
        </motion.div>

        {/* --- name --------------------------------------------------------- */}
        <h1 className="mt-8 font-display font-semibold leading-[0.94] tracking-[-0.03em] md:mt-10">
          <span className="sr-only">
            {site.name} — {site.role}
          </span>
          <span aria-hidden className="block text-display text-fg">
            <SplitText immediate delay={0.45} stagger={0.035}>
              Mustafa
            </SplitText>
          </span>
          {/* No SplitText here: background-clip:text does not survive the
              per-character transformed spans — the gradient would paint every
              glyph transparent. One animated line keeps it intact. */}
          <motion.span
            aria-hidden
            className="text-aurora block text-display"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: ease.outExpo }}
          >
            Al-Mosuli
          </motion.span>
        </h1>

        {/* --- role + lede ---------------------------------------------------- */}
        <motion.div className="mt-8 max-w-2xl md:mt-10" {...fadeIn(1)}>
          <p className="text-h3 font-semibold tracking-tight text-fg">
            {site.role}
          </p>

          <p className="measure mt-4 text-lead leading-relaxed text-fg-dim">
            I build the backend systems behind a{" "}
            <span className="text-fg">10M+ subscriber</span> telecom — and I
            build them <span className="text-fg">AI-native</span>, with Claude
            Code, Gemini, and Codex in the loop.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Action variant="signal" onClick={() => scrollToSection("contact")}>
              Get in touch
            </Action>
            <Action variant="outline" onClick={() => scrollToSection("work")}>
              Selected work
            </Action>
            <Action
              variant="ghost"
              href={site.resumeUrl}
              external
              download
              ariaLabel="Download résumé as PDF"
            >
              Résumé
            </Action>
          </div>
        </motion.div>

        {/* --- headline metrics: glass chips --------------------------------- */}
        <motion.dl
          className="mt-12 grid grid-cols-2 gap-3 md:mt-14 lg:grid-cols-4"
          {...fadeIn(1.5)}
        >
          {heroMetrics.map((metric) => (
            <div
              key={metric.label}
              className="bento group flex flex-col gap-3 px-5 py-5 md:px-6"
            >
              <dt className="label transition-colors duration-300 group-hover:text-signal">
                {metric.label}
              </dt>
              <dd className="numeric text-h2 font-medium leading-none text-fg">
                <Counter display={metric.display} suffix={metric.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* --- scroll cue (desktop only) ------------------------------------- */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-[var(--gutter)] hidden items-center gap-3 lg:flex"
        {...fadeIn(2.0)}
      >
        <p className="label">Scroll</p>
        <span className="relative block h-6 w-px overflow-hidden bg-line-strong">
          {reducedMotion ? null : (
            <motion.span
              className="absolute inset-0 bg-signal"
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </span>
      </motion.div>
    </section>
  );
}
