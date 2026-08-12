"use client";

import { aiCapabilities, aiTickerItems, type AiCapability } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { VelocityMarquee } from "@/components/ui/velocity-marquee";

/**
 * AI practice as a glass bento: one flagship cell for the agentic workflow
 * (the differentiator), three supporting cells for shipped LLM systems and
 * multi-model discipline, then a kinetic tooling strip.
 *
 * The flagship spans two rows on desktop so the section has a focal point —
 * four equal tiles would read as a feature checklist, and every portfolio
 * has one of those.
 */
export function AiPractice() {
  const flagship = aiCapabilities.find((c) => c.size === "xl");
  const rest = aiCapabilities.filter((c) => c.size !== "xl");

  return (
    <section
      id="ai"
      className="relative z-10 overflow-x-clip pt-[var(--section-y)]"
    >
      <div className="shell">
        <SectionHeader
          num="02"
          eyebrow="AI Practice"
          title={
            <>
              I don&rsquo;t just use AI.
              <span className="text-aurora"> I engineer with it.</span>
            </>
          }
          lede="Claude Code, Gemini, and Codex are part of the daily toolchain — from agentic development loops to LLM pipelines running in production."
          aside={
            <p className="label numeric">
              {String(aiCapabilities.length).padStart(2, "0")} disciplines
            </p>
          }
        />

        <StaggerGroup
          className="mt-16 grid grid-cols-1 gap-4 lg:auto-rows-[minmax(200px,auto)] lg:grid-cols-6"
          amount={0.08}
        >
          {flagship ? (
            <StaggerItem className="lg:col-span-3 lg:row-span-3 h-full">
              <FlagshipCard capability={flagship} />
            </StaggerItem>
          ) : null}

          {rest.map((capability) => (
            <StaggerItem
              key={capability.id}
              className="lg:col-span-3 h-full"
            >
              <CapabilityCard capability={capability} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      {/* Kinetic tooling strip — the section's closing beat. */}
      <div className="fade-x mt-12 border-y border-line py-5">
        <VelocityMarquee baseVelocity={3} itemClassName="flex items-center">
          {aiTickerItems.map((item) => (
            <span key={item} className="flex items-center">
              <span className="label whitespace-nowrap text-fg-dim">
                {item}
              </span>
              <span aria-hidden className="mx-6 h-1 w-1 rounded-full bg-signal/60" />
            </span>
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}

/** Small mono chip listing the tools a capability leans on. */
function ToolChips({ tools }: { tools: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tools.map((tool) => (
        <li
          key={tool}
          className="glass-pill rounded-full px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-fg-dim transition-colors duration-300 hover:text-signal"
        >
          {tool}
        </li>
      ))}
    </ul>
  );
}

function FlagshipCard({ capability }: { capability: AiCapability }) {
  return (
    <article className="bento group flex h-full flex-col gap-8 p-7 md:p-9">
      {/* In-card aurora — the flagship gets its own light source. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--signal)/0.14),transparent_65%)] blur-2xl transition-opacity duration-700 group-hover:opacity-100 opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--violet)/0.12),transparent_65%)] blur-2xl"
      />

      <div className="relative flex items-start justify-between gap-4">
        <p className="label transition-colors duration-300 group-hover:text-signal">
          Flagship discipline
        </p>
        <p className="label numeric text-fg-faint/70">{capability.index}</p>
      </div>

      <div className="relative">
        <h3 className="text-h3 font-semibold text-fg">{capability.title}</h3>
        <p className="measure mt-4 leading-relaxed text-fg-dim">
          {capability.summary}
        </p>
      </div>

      {/* Agent-loop terminal — fills the flagship's tall cell with the story
          the copy tells, in the medium it actually happens in. Decorative:
          the aria-hidden keeps it out of the reading order. */}
      <div
        aria-hidden
        className="relative overflow-hidden rounded-xl border border-line bg-ink/80 font-mono text-[0.78rem] leading-relaxed"
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/50" />
          <span className="label ml-3">agent loop — live</span>
        </div>
        <div className="space-y-2.5 px-4 py-5 md:px-5">
          <p className="text-fg-dim">
            <span className="text-signal">$</span> claude --plan &quot;migrate
            10M records, zero loss&quot;
          </p>
          <p className="text-fg-faint">
            ↳ plan drafted · risks flagged · tasks fanned out
          </p>
          <p className="text-fg-dim">
            <span className="text-signal">$</span> agents run --parallel
            worktrees=4
          </p>
          <p className="text-fg-faint">
            ↳ schema maps · reconciliation checks · cutover gates
          </p>
          <p className="text-fg-dim">
            <span className="text-signal">$</span> review --adversarial
            model=cross
          </p>
          <p className="text-fg-dim">
            <span className="text-violet">✓</span> verified — parity 100.000% ·
            downtime 0s
          </p>
        </div>
      </div>

      {/* Mono readout — the agent loop, stated as a checklist. */}
      <ul className="relative mt-auto space-y-3 border-t border-line pt-6">
        {capability.points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-3 font-mono text-[0.8125rem] leading-relaxed text-fg-dim"
          >
            <span aria-hidden className="mt-[3px] text-signal">
              ▸
            </span>
            {point}
          </li>
        ))}
      </ul>

      <div className="relative">
        <ToolChips tools={capability.tools} />
      </div>
    </article>
  );
}

function CapabilityCard({ capability }: { capability: AiCapability }) {
  return (
    <article className="bento group flex h-full flex-col gap-5 p-6 md:p-7">
      <div className="flex items-start justify-between gap-4">
        <p className="label transition-colors duration-300 group-hover:text-signal">
          Discipline
        </p>
        <p className="label numeric text-fg-faint/70">{capability.index}</p>
      </div>

      <div>
        <h3
          className={cn(
            "text-[1.25rem] font-semibold tracking-tight text-fg md:text-[1.4rem]",
          )}
        >
          {capability.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-fg-dim">
          {capability.summary}
        </p>
      </div>

      <div className="mt-auto">
        <ToolChips tools={capability.tools} />
      </div>
    </article>
  );
}
