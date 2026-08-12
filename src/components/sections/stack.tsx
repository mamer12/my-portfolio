"use client";

import { stackGroups } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const allItems = stackGroups.flatMap((group) => group.items);

/**
 * Stack as a hairline spec table.
 *
 * Two previous attempts failed for the same reason: they introduced their own
 * container language. Wrapped chips read as soup, and bordered panels in a
 * ragged grid never aligned to anything and clashed with a page whose structure
 * is otherwise made entirely of full-width hairline rules.
 *
 * This version reuses that existing vocabulary exactly — the same rule-separated
 * row layout as the Profile fact rail and the Contact coordinates list. A fixed
 * label column means every group's name and count line up down the page, which
 * is the thing the boxed versions could not do.
 */
export function Stack() {
  return (
    <section id="stack" className="relative z-10 pt-[var(--section-y)]">
      <div className="shell">
        <SectionHeader
          num="06"
          eyebrow="Stack"
          title={
            <>
              The tools, grouped by
              <span className="text-fg-faint"> what they actually do.</span>
            </>
          }
          lede="Listed by role in a system rather than as an undifferentiated cloud of logos."
          aside={
            <p className="label numeric">{allItems.length} technologies</p>
          }
        />

        <StaggerGroup className="mt-14 border-t border-line" amount={0.09}>
          {stackGroups.map((group, index) => (
            <StaggerItem key={group.id}>
              <div
                className={
                  "group grid items-baseline gap-x-8 gap-y-4 border-b border-line py-6 " +
                  "transition-colors duration-500 hover:bg-ink-raised/50 " +
                  // Fixed label column on desktop so labels, counts, and the
                  // item block all align down the whole table.
                  "lg:grid-cols-[3rem_11rem_1fr_3rem]"
                }
              >
                <p className="label numeric text-signal">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="text-[1.0625rem] font-semibold tracking-tight text-fg">
                  {group.label}
                </h3>

                <ul className="flex flex-wrap items-baseline gap-x-1 gap-y-2">
                  {group.items.map((item, itemIndex) => (
                    <li key={item} className="flex items-baseline">
                      {itemIndex > 0 ? (
                        <span
                          aria-hidden
                          className="px-2.5 font-mono text-[0.6875rem] text-signal/45"
                        >
                          /
                        </span>
                      ) : null}
                      <span className="text-[0.9375rem] leading-snug text-fg-dim transition-colors duration-300 hover:text-fg">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="label numeric hidden lg:block lg:text-right">
                  {String(group.items.length).padStart(2, "0")}
                </p>
              </div>
            </StaggerItem>
          ))}

          {/* Closing note as a final full-width row, so it belongs to the table
              instead of sitting in a leftover grid cell. */}
          <StaggerItem>
            <div className="grid gap-x-8 gap-y-3 border-b border-line py-6 lg:grid-cols-[3rem_11rem_1fr_3rem]">
              <p className="label">Note</p>
              <div className="lg:col-span-2 lg:col-start-2">
                <p className="max-w-3xl text-[0.9375rem] leading-relaxed text-fg-dim">
                  Depth over breadth.{" "}
                  <span className="text-fg">Python/FastAPI</span> and{" "}
                  <span className="text-fg">Node/TypeScript</span> are where I
                  live day to day, <span className="text-fg">PostgreSQL</span> is
                  the piece I have taken furthest, and{" "}
                  <span className="text-fg">Go</span> is what I reach for when
                  throughput is the constraint.
                </p>
              </div>
            </div>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
}
