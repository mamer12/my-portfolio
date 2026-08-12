"use client";

import type { ReactNode } from "react";
import {
  conceptGroups,
  education,
  spokenLanguages,
  summary,
} from "@/lib/content";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

/**
 * Profile as a skills surface, not an essay.
 *
 * The previous version pinned a 60-word paragraph and lit it word-by-word on
 * scroll — the reveal misfired beyond the first lines, and the paragraph
 * buried the actual skills in prose. This version says it in two sentences
 * and then shows the practice: three concept clusters, scannable in seconds,
 * with the facts rail alongside.
 */
export function Profile() {
  return (
    <section id="profile" className="relative z-10 pt-[var(--section-y)]">
      <div className="shell">
        <SectionHeader
          num="01"
          eyebrow="Profile"
          title={
            <>
              I build the systems that stay up
              <span className="text-fg-faint"> when everything else moves.</span>
            </>
          }
          lede={summary}
        />

        <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-12">
          {/* Concept clusters — the actual skills, grouped by discipline. */}
          <StaggerGroup
            className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3"
            amount={0.1}
          >
            {conceptGroups.map((group, index) => (
              <StaggerItem key={group.id} className="h-full">
                <article className="bento group flex h-full flex-col gap-5 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[1.0625rem] font-semibold tracking-tight text-fg">
                      {group.label}
                    </h3>
                    <p className="label numeric text-fg-faint/70">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-fg-dim transition-colors duration-300 hover:text-fg"
                      >
                        <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-signal/70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </StaggerGroup>

          {/* Facts rail. Contact lives in one place — section 07 — so this
              rail stays to the biography facts. */}
          <div className="lg:col-span-4">
            <Panel label="Education" delay={0.08}>
              <p className="text-[0.9375rem] font-semibold text-fg">
                {education.degree}
              </p>
              <p className="mt-1 text-[0.875rem] text-fg-dim">{education.school}</p>
              <p className="numeric mt-2 text-[0.8125rem] text-fg-faint">
                {education.year} · {education.location}
              </p>
            </Panel>

            <Panel label="Languages" className="mt-8" delay={0.14}>
              <ul className="space-y-3">
                {spokenLanguages.map((language) => (
                  <li key={language.name}>
                    <p className="text-[0.9375rem] text-fg">{language.name}</p>
                    <p className="text-[0.8125rem] text-fg-faint">
                      {language.level}
                    </p>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({
  label,
  children,
  className,
  delay = 0,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <div className="border-t border-line pt-5">
        <p className="label mb-4">{label}</p>
        {children}
      </div>
    </Reveal>
  );
}
