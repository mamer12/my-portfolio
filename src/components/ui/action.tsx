"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type ActionVariant = "signal" | "outline" | "ghost";

const base =
  "group/action relative inline-flex items-center justify-center gap-3 overflow-hidden " +
  "px-6 py-3.5 text-[0.8125rem] font-medium tracking-tight transition-all duration-300 " +
  "ease-out-expo rounded-full whitespace-nowrap";

const variants: Record<ActionVariant, string> = {
  signal:
    "bg-signal text-ink shadow-[0_0_28px_-8px_rgb(var(--signal)/0.55)] " +
    "hover:bg-white hover:shadow-[0_0_36px_-8px_rgb(255_255_255/0.45)]",
  outline:
    "glass-pill text-fg hover:border-signal/50 hover:text-signal " +
    "hover:shadow-[0_0_28px_-10px_rgb(var(--signal)/0.45)]",
  ghost: "text-fg-dim hover:text-fg",
};

interface ActionProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ActionVariant;
  className?: string;
  external?: boolean;
  download?: boolean;
  magnetic?: boolean;
  ariaLabel?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

/**
 * The single button/link primitive for the site.
 *
 * Renders an `<a>` when given `href` and a `<button>` otherwise, so semantics
 * always match behaviour. Every variant carries the same hover mechanic: an
 * arrow that steps forward and a label that shifts with it.
 */
export function Action({
  children,
  href,
  onClick,
  variant = "outline",
  className,
  external = false,
  download = false,
  magnetic = true,
  ariaLabel,
  type = "button",
  disabled = false,
}: ActionProps) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 transition-transform duration-300 ease-out-expo group-hover/action:translate-x-1"
      >
        {download ? "↓" : "→"}
      </span>
    </>
  );

  const classes = cn(base, variants[variant], disabled && "pointer-events-none opacity-40", className);

  const element = href ? (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...(download ? { download: "" } : {})}
    >
      {content}
    </a>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {content}
    </button>
  );

  return magnetic ? <Magnetic strength={8}>{element}</Magnetic> : element;
}

/** Small mono chip used for tech tags throughout the page. */
export function Chip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-white/[0.03] px-3 py-1",
        "font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-fg-dim",
        "transition-colors duration-300 hover:border-signal/40 hover:text-signal",
        className,
      )}
    >
      {children}
    </span>
  );
}
