"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeaderProps {
  /** Two-digit section index, e.g. "03". */
  num: string;
  /** Mono eyebrow, e.g. "TRAJECTORY". */
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
  /** Right-hand slot for counts, controls, or a legend. */
  aside?: ReactNode;
}

/**
 * The standard section masthead: a hairline rule, an indexed mono eyebrow, an
 * oversized title, and an optional lede. Repeating this exact structure is what
 * makes the page read as one instrument rather than a stack of unrelated blocks.
 */
export function SectionHeader({
  num,
  eyebrow,
  title,
  lede,
  className,
  aside,
}: SectionHeaderProps) {
  return (
    <header className={cn("relative", className)}>
      <Reveal mode="scale-x">
        <div className="h-px w-full bg-line" />
      </Reveal>

      <div className="flex flex-wrap items-start justify-between gap-x-8 gap-y-4 pt-4">
        <Reveal delay={0.08}>
          <p className="label flex items-center gap-3">
            <span className="text-signal">{num}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <span>{eyebrow}</span>
          </p>
        </Reveal>
        {aside ? <Reveal delay={0.12}>{aside}</Reveal> : null}
      </div>

      <div className="mt-8 grid gap-x-10 gap-y-6 lg:grid-cols-12">
        <Reveal mode="wipe" className="lg:col-span-7">
          <h2 className="text-h2 font-medium">{title}</h2>
        </Reveal>

        {lede ? (
          <Reveal delay={0.18} className="lg:col-span-5 lg:pt-2">
            <p className="max-w-prose text-fg-dim">{lede}</p>
          </Reveal>
        ) : null}
      </div>
    </header>
  );
}
