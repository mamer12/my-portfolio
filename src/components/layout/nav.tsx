"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { navSections, site } from "@/lib/content";
import { ease } from "@/lib/motion";
import { scrollToSection } from "@/hooks/use-smooth-scroll";
import { useLocalTime } from "@/hooks/use-local-time";

export function Nav() {
  const [active, setActive] = useState<string>(navSections[0].id);
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useLocalTime(site.timezone);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.001,
  });

  // Active section: the last one whose top has crossed the 45% viewport line.
  // A rootMargin band beats `amount` thresholds here because sections differ
  // wildly in height — a full-height hero and a short stack list would
  // otherwise never trigger at the same scroll offset.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    navSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    // Let the sheet begin closing before the scroll starts, otherwise the
    // overlay's scroll lock swallows the first frames of the animation.
    window.setTimeout(() => scrollToSection(id), menuOpen ? 320 : 0);
  };

  return (
    <>
      {/* Scroll progress — a single hairline across the very top of the page. */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[120] h-px origin-left bg-signal"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <header className="fixed inset-x-0 top-0 z-[110] pt-3 md:pt-4">
        {/* Floating glass pill. Content sliding underneath is the point of
            glass — the blur + saturation keep the bar itself legible. */}
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex h-14 w-[calc(100%-2*var(--gutter))] max-w-7xl items-center justify-between gap-6 rounded-2xl px-4 transition-all duration-500 ease-out-expo md:px-5",
            condensed
              ? "glass-pill"
              : "border border-transparent",
          )}
        >
          {/* Brand */}
          <button
            type="button"
            onClick={() => go("index")}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — back to top`}
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-line-strong font-mono text-[0.625rem] font-medium tracking-tight text-signal transition-all duration-300 group-hover:border-signal group-hover:shadow-[0_0_16px_-4px_rgb(var(--signal)/0.5)]">
              MA
            </span>
            <span className="hidden text-[0.8125rem] font-medium tracking-tight sm:block">
              {site.name}
            </span>
          </button>

          {/* Desktop index */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navSections.map(({ id, label, num }) => {
              const isActive = active === id;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => go(id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex items-baseline gap-1.5 rounded-full px-3 py-2 transition-colors duration-300",
                      isActive ? "text-fg" : "text-fg-faint hover:text-fg-dim",
                    )}
                  >
                    <span className="relative z-10 font-mono text-[0.625rem] tracking-[0.12em] text-signal/70">
                      {num}
                    </span>
                    <span className="relative z-10 text-[0.8125rem] tracking-tight">
                      {label}
                    </span>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full border border-line bg-white/[0.06]"
                        transition={{ duration: 0.4, ease: ease.outExpo }}
                      />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Status + CTA */}
          <div className="flex shrink-0 items-center gap-4">
            <p className="label hidden items-center gap-2 xl:flex">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" />
              <span className="numeric text-fg-dim">{time ?? "--:--:--"}</span>
              <span>{site.utcOffset}</span>
            </p>

            <a
              href={`mailto:${site.email}`}
              className="hidden rounded-full border border-line-strong px-4 py-2 text-[0.75rem] tracking-tight text-fg transition-all duration-300 hover:border-signal hover:text-signal hover:shadow-[0_0_20px_-6px_rgb(var(--signal)/0.5)] md:block"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg border border-line-strong transition-colors duration-300 hover:border-signal lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={cn(
                  "block h-px w-4 bg-fg transition-transform duration-300 ease-out-expo",
                  menuOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-fg transition-transform duration-300 ease-out-expo",
                  menuOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        active={active}
        onSelect={go}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

function MobileMenu({
  open,
  active,
  onSelect,
  onClose,
}: {
  open: boolean;
  active: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[105] flex flex-col bg-ink/97 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: ease.outExpo }}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          <div className="h-14 shrink-0 md:h-16" />

          <ul className="shell flex flex-1 flex-col justify-center gap-1 pb-16">
            {navSections.map(({ id, label, num }, index) => (
              <motion.li
                key={id}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.05 + index * 0.045,
                  ease: ease.outExpo,
                }}
                className="border-b border-line"
              >
                <button
                  type="button"
                  onClick={() => onSelect(id)}
                  className="flex w-full items-baseline gap-4 py-4 text-left"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-signal">
                    {num}
                  </span>
                  <span
                    className={cn(
                      "text-h3 font-medium transition-colors",
                      active === id ? "text-fg" : "text-fg-dim",
                    )}
                  >
                    {label}
                  </span>
                  {active === id ? (
                    <span className="ml-auto self-center text-signal" aria-hidden>
                      ●
                    </span>
                  ) : null}
                </button>
              </motion.li>
            ))}
          </ul>

          <div className="shell flex items-center justify-between border-t border-line py-5">
            <a
              href={`mailto:${site.email}`}
              onClick={onClose}
              className="text-[0.8125rem] text-fg-dim"
            >
              {site.email}
            </a>
            <div className="flex gap-4">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="label hover:text-signal"
              >
                GH
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label hover:text-signal"
              >
                LI
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
