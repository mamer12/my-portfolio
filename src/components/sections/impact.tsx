"use client";

import { impactMetrics, type Metric } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/counter";
import { SectionHeader } from "@/components/ui/section-header";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

/**
 * Bento with a real hierarchy rather than six equal tiles.
 *
 * The flagship migration figure takes a double-height cell, two supporting
 * figures take half-width cells, and the remaining three sit in a compact row.
 * Six identically weighted cards is no focal point at all — the reader skims and
 * retains nothing. Varying the spans is what makes the top three actually land.
 *
 * Spans are indexed to `impactMetrics` order, so reordering the content reorders
 * the emphasis.
 */
const LAYOUT: readonly { span: string; size: "xl" | "lg" | "sm" }[] = [
  { span: "sm:col-span-2 lg:col-span-3 lg:row-span-2", size: "xl" },
  { span: "sm:col-span-2 lg:col-span-3", size: "lg" },
  { span: "sm:col-span-2 lg:col-span-3", size: "lg" },
  { span: "sm:col-span-2 lg:col-span-2", size: "sm" },
  { span: "sm:col-span-1 lg:col-span-2", size: "sm" },
  { span: "sm:col-span-1 lg:col-span-2", size: "sm" },
];

const VALUE_SIZE = {
  xl: "text-display",
  lg: "text-h1",
  sm: "text-h2",
} as const;

export function Impact() {
  return (
    <section
      id="impact"
      className="relative z-10 overflow-x-clip pt-[var(--section-y)]"
    >
      <div className="shell">
        <SectionHeader
          num="03"
          eyebrow="Impact"
          title={
            <>
              Numbers I can point at.
              <span className="text-fg-faint"> Every one shipped.</span>
            </>
          }
          lede="Measured outcomes from production systems, not estimates."
          aside={
            <p className="label numeric">
              {String(impactMetrics.length).padStart(2, "0")} entries
            </p>
          }
        />

        <StaggerGroup
          className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[minmax(170px,auto)] lg:grid-cols-6"
          amount={0.08}
        >
          {impactMetrics.map((metric, index) => (
            <StaggerItem
              key={metric.label}
              className={cn(LAYOUT[index]?.span, "h-full")}
            >
              <MetricCard
                metric={metric}
                index={index}
                size={LAYOUT[index]?.size ?? "sm"}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  index,
  size,
}: {
  metric: Metric;
  index: number;
  size: "xl" | "lg" | "sm";
}) {
  const isFlagship = size === "xl";
  const isSmall = size === "sm";

  return (
    <article
      className={cn(
        "bento group flex h-full flex-col gap-6 p-6 md:p-7",
        isFlagship && "justify-center gap-8",
      )}
      // Small cards are focusable so keyboard users get the same detail
      // reveal that pointer users get on hover. The aria-label carries the
      // full readout because the detail text is visual-only below.
      tabIndex={isSmall ? 0 : undefined}
      aria-label={
        isSmall
          ? `${metric.label}: ${metric.display}${metric.suffix ?? ""}. ${metric.detail}`
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-4">
        <p className="label transition-colors duration-300 group-hover:text-signal">
          {metric.label}
        </p>
        <p className="label numeric shrink-0 text-fg-faint/70">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      {/* Small cards pin the figure to the bottom edge with mt-auto, so the
          compact row reads full and deliberate at any row height instead of
          leaving dead space under a top-aligned number. */}
      <div className={cn(isSmall && "mt-auto")}>
        <p
          className={cn(
            "numeric font-medium leading-[0.85] text-fg",
            VALUE_SIZE[size],
            // Dims while the detail overlay is up so the text owns the card.
            isSmall &&
              "transition-opacity duration-500 ease-out-expo group-hover:opacity-20 group-focus-within:opacity-20",
          )}
        >
          <Counter display={metric.display} suffix={metric.suffix} />
        </p>

        {/* The large cards carry their explanation inline. The small cards
            reveal it on hover or focus as an overlay (rendered last below):
            six figures with six permanent paragraphs was the wall of text
            this section is meant to avoid, but the context is still there
            for anyone who asks. */}
        {size !== "sm" ? (
          <p
            className={cn(
              "measure mt-5 leading-relaxed text-fg-dim",
              isFlagship ? "text-[0.9375rem] md:text-base" : "text-[0.875rem]",
            )}
          >
            {metric.detail}
          </p>
        ) : null}
      </div>

      {/* Hover/focus reveal for the compact cards. Absolutely positioned, so
          it never changes layout; the gradient keeps the copy legible over
          the dimmed figure, and the card's overflow-hidden clips it to the
          radius. aria-hidden because the article's aria-label already
          announces the same text. */}
      {isSmall ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink-raised via-ink-raised/90 to-transparent px-6 pb-6 pt-12 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:px-7 md:pb-7"
        >
          <p className="line-clamp-3 text-[0.8125rem] leading-relaxed text-fg-dim">
            {metric.detail}
          </p>
        </div>
      ) : null}
    </article>
  );
}
