"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { projects, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Chip } from "@/components/ui/action";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectSchematic } from "./project-schematic";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

export function Work() {
  return (
    <section id="work" className="relative z-10 pt-[var(--section-y)]">
      <div className="shell">
        <SectionHeader
          num="05"
          eyebrow="Work"
          title={
            <>
              Things I built because
              <span className="text-fg-faint"> they needed to exist.</span>
            </>
          }
          lede="Personal systems, shipped end to end. Each card shows the architecture rather than a screenshot — that is the part worth looking at."
          aside={
            <p className="label numeric">
              {String(projects.length).padStart(2, "0")} projects
            </p>
          }
        />
      </div>

      {/* Sticky stack: each card pins, the next slides over it. The list is a
          real <ol> so the reading order and semantics survive the effect. */}
      <ol className="mt-16 list-none">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </ol>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Outgoing cards shrink and dim slightly as the next one covers them, which
  // reads as depth without needing a blur filter (expensive on mobile GPUs).
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <li
      ref={ref}
      className={cn(
        "sticky",
        // Each card parks a little lower than the last so the stacked edges
        // stay visible — you can see how many are behind you.
        "top-[calc(3.5rem+var(--offset))] md:top-[calc(4rem+var(--offset))]",
      )}
      style={{ ["--offset" as string]: `${index * 1.25}rem` }}
    >
      <motion.article
        style={reducedMotion ? undefined : { scale, opacity }}
        className="shell origin-top pb-6"
      >
        <div className="panel solid ticked overflow-hidden">
          <div className="grid lg:grid-cols-12">
            {/* --- copy ------------------------------------------------- */}
            <div className="flex flex-col justify-between gap-8 border-b border-line p-6 sm:p-8 lg:col-span-7 lg:border-b-0 lg:border-r lg:p-10">
              <div>
                <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
                  <p className="label flex items-center gap-3">
                    <span className="text-signal">{project.index}</span>
                    <span aria-hidden className="h-px w-5 bg-line-strong" />
                    {project.kind}
                  </p>
                  <p className="label numeric">
                    {project.year} · {project.index}/
                    {String(total).padStart(2, "0")}
                  </p>
                </div>

                <h3 className="mt-6 text-h2 font-medium leading-[0.95] tracking-tight text-fg">
                  {project.title}
                </h3>

                <p className="mt-5 max-w-prose text-lead leading-snug text-fg-dim">
                  {project.summary}
                </p>

                <ul className="mt-8 space-y-3 border-t border-line pt-6">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden
                        className="mt-[0.6em] h-px w-3 shrink-0 bg-signal/70"
                      />
                      <span className="text-[0.875rem] leading-relaxed text-fg-dim">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </div>
            </div>

            {/* --- schematic -------------------------------------------- */}
            {/* Below `lg` the schematic panel spans the full card width, so the
                drawing gets a larger cap there — at 420px it was marooned in
                the middle of a wide box on tablet. */}
            <div className="relative flex min-h-[300px] items-center justify-center bg-ink/60 p-6 sm:min-h-[380px] lg:col-span-5 lg:min-h-[520px]">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.55]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgb(var(--line)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                  maskImage:
                    "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 78%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 70% 70% at 50% 50%, #000 20%, transparent 78%)",
                }}
              />
              <ProjectSchematic
                id={project.id}
                className="relative w-full max-w-[560px] lg:max-w-[440px]"
              />
              <p className="label absolute bottom-4 left-6">Architecture</p>
            </div>
          </div>
        </div>
      </motion.article>
    </li>
  );
}
