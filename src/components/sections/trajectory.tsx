"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { roles, type Role } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/action";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import {
  useIsDesktop,
  usePrefersReducedMotion,
} from "@/hooks/use-media-query";
import { useMounted } from "@/hooks/use-mounted";

export function Trajectory() {
  const mounted = useMounted();
  const isDesktop = useIsDesktop();
  const reducedMotion = usePrefersReducedMotion();

  // Scroll-driven horizontal pinning is a desktop affordance. On touch, a
  // native snap rail is both more predictable and more accessible; under
  // reduced motion we drop to a plain vertical stack.
  const mode = !mounted
    ? "stack"
    : reducedMotion
      ? "stack"
      : isDesktop
        ? "pinned"
        : "swipe";

  return (
    <section id="trajectory" className="relative z-10 pt-[var(--section-y)]">
      <div className="shell">
        <SectionHeader
          num="04"
          eyebrow="Trajectory"
          title={
            <>
              Six years, four teams,
              <span className="text-fg-faint"> one direction.</span>
            </>
          }
          lede="From a remote internship with a US team to owning migrations for a 10M-subscriber telecom. Read right to left."
          aside={
            <p className="label numeric">
              2020 <span className="text-signal">→</span> Present
            </p>
          }
        />
      </div>

      {mode === "pinned" ? <PinnedRail /> : null}
      {mode === "swipe" ? <SwipeRail /> : null}
      {mode === "stack" ? <StackRail /> : null}
    </section>
  );
}

/* ==========================================================================
   Desktop: vertical scroll drives horizontal travel while the section is pinned
   ========================================================================== */

function PinnedRail() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // The scrollable height of the wrapper equals one viewport (for the pin) plus
  // the horizontal overflow, so 1px of vertical scroll moves 1px horizontally.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(track.scrollWidth - window.innerWidth, 0));
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.0005,
  });

  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progressScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <div
      ref={wrapperRef}
      style={{ height: `calc(100svh + ${distance}px)` }}
      className="relative mt-16"
    >
      {/* fade-x masks the outer 8% at each viewport edge so cards dissolve
          instead of clipping hard; the travel indicator below sits inside the
          same fade, which is intentional. */}
      <div className="fade-x sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-6 px-[var(--gutter)] will-change-transform"
        >
          {roles.map((role, index) => (
            <RoleCard
              key={role.id}
              role={role}
              index={index}
              // Capped and scrollable: expanding the highlights inside a pinned
              // 100svh viewport would otherwise push content past the clip edge.
              className="no-scrollbar max-h-[calc(100svh-7rem)] w-[min(78vw,560px)] overflow-y-auto"
            />
          ))}
          <EndCap />
        </motion.div>

        {/* Travel indicator */}
        <div className="pointer-events-none absolute inset-x-[var(--gutter)] bottom-10 flex items-center gap-4">
          <span className="label numeric shrink-0">2020</span>
          <span className="relative h-px flex-1 bg-line">
            <motion.span
              className="absolute inset-y-0 left-0 w-full origin-left bg-signal"
              style={{ scaleX: progressScale }}
            />
          </span>
          <span className="label numeric shrink-0 text-signal">NOW</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   Touch: native horizontal snap rail
   ========================================================================== */

function SwipeRail() {
  return (
    <div className="mt-12">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-4">
        {roles.map((role, index) => (
          <RoleCard
            key={role.id}
            role={role}
            index={index}
            className="w-[min(86vw,480px)] shrink-0 snap-start"
          />
        ))}
        <EndCap className="w-[min(60vw,300px)] shrink-0 snap-start" />
      </div>
      <p className="shell label mt-4 flex items-center gap-2">
        <span aria-hidden className="text-signal">
          ←
        </span>
        Swipe to travel the timeline
      </p>
    </div>
  );
}

/* ==========================================================================
   Reduced motion / pre-hydration: plain vertical stack
   ========================================================================== */

function StackRail() {
  return (
    <div className="shell mt-12 space-y-4">
      {roles.map((role, index) => (
        <RoleCard key={role.id} role={role} index={index} className="w-full" />
      ))}
    </div>
  );
}

/* ========================================================================== */

/**
 * Highlights shown before the reader asks for more.
 *
 * Four roles at five or six bullets each put ~22 dense lines in front of the
 * visitor at once. Nothing is removed — the rest is one click away, and the full
 * text is still in the DOM for crawlers — but the default read is calm.
 */
const VISIBLE_HIGHLIGHTS = 2;

function RoleCard({
  role,
  index,
  className,
}: {
  role: Role;
  index: number;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const isCurrent = role.end === "Present";
  const hidden = role.highlights.length - VISIBLE_HIGHLIGHTS;

  return (
    <article
      className={cn(
        "panel solid ticked group flex flex-col p-6 transition-colors duration-500 md:p-8",
        "hover:border-line-strong",
        className,
      )}
      aria-label={`${role.title} at ${role.company}, ${role.period}`}
    >
      {/* header */}
      <header className="flex items-start justify-between gap-4 border-b border-line pb-5">
        <div className="min-w-0">
          <p className="label mb-3 flex items-center gap-2">
            <span className="text-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden className="h-px w-4 bg-line-strong" />
            {role.mode}
          </p>
          <h3 className="text-h3 font-medium leading-tight tracking-tight text-fg">
            {role.company}
          </h3>
          <p className="mt-1.5 text-[0.9375rem] text-fg-dim">{role.title}</p>
        </div>

        {isCurrent ? (
          <span className="label label-signal flex shrink-0 items-center gap-1.5 border border-signal/30 px-2 py-1">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" />
            Now
          </span>
        ) : null}
      </header>

      {/* meta */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
        <p className="numeric text-[0.8125rem] text-fg">{role.period}</p>
        <p className="text-[0.75rem] text-fg-faint">{role.location}</p>
      </div>

      <p className="mb-5 text-[0.9375rem] leading-relaxed text-fg-dim">
        {role.summary}
      </p>

      {/* highlights — first two, then on request */}
      <ul className="flex-1 space-y-3 border-t border-line pt-5">
        {(expanded
          ? role.highlights
          : role.highlights.slice(0, VISIBLE_HIGHLIGHTS)
        ).map((highlight) => (
          <li key={highlight} className="flex gap-3">
            <span
              aria-hidden
              className="mt-[0.6em] h-px w-3 shrink-0 bg-signal/70"
            />
            <span className="text-[0.875rem] leading-relaxed text-fg-dim">
              {highlight}
            </span>
          </li>
        ))}
      </ul>

      {hidden > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          className="label mt-5 flex items-center gap-2 self-start transition-colors duration-300 hover:text-signal"
        >
          <span aria-hidden className="text-signal">
            {expanded ? "−" : "+"}
          </span>
          {expanded ? "Show less" : `${hidden} more`}
        </button>
      ) : null}

      {role.note ? (
        <p className="mt-5 text-[0.75rem] italic text-fg-faint">{role.note}</p>
      ) : null}

      {/* stack */}
      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
        {role.stack.map((item) => (
          <Chip key={item}>{item}</Chip>
        ))}
      </div>
    </article>
  );
}

function EndCap({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex w-[min(50vw,340px)] flex-col justify-end p-8",
        className,
      )}
    >
      <Reveal>
        <p className="label mb-4">Next</p>
        <p className="text-h3 font-medium leading-tight tracking-tight text-fg">
          Whatever needs to survive its own growth.
        </p>
        <a
          href="#contact"
          className="link-sweep mt-6 inline-block text-[0.875rem] text-signal"
        >
          Start a conversation
        </a>
      </Reveal>
    </div>
  );
}
