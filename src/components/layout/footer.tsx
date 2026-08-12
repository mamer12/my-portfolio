"use client";

import { site } from "@/lib/content";
import { useLocalTime } from "@/hooks/use-local-time";
import { scrollToSection } from "@/hooks/use-smooth-scroll";
import { VelocityMarquee } from "@/components/ui/velocity-marquee";

export function Footer() {
  const time = useLocalTime(site.timezone);
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line">
      {/* Oversized name rail — the page signs off the way it opened. */}
      <div className="overflow-hidden py-6">
        <VelocityMarquee baseVelocity={1.6} copies={3}>
          <span className="flex shrink-0 items-center gap-8 pr-8">
            <span className="text-display font-medium leading-none tracking-[-0.05em] text-fg/[0.07]">
              {site.name}
            </span>
            <span className="text-display leading-none text-signal/20">✳</span>
          </span>
        </VelocityMarquee>
      </div>

      <div className="shell grid gap-x-8 gap-y-8 border-t border-line py-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label mb-3">Based in</p>
          <p className="text-[0.875rem] text-fg">{site.location}</p>
          <p className="numeric mt-2 text-[0.75rem] text-fg-faint">
            {time ?? "--:--:--"} {site.utcOffset}
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4">
          <p className="label mb-3">Elsewhere</p>
          <ul className="space-y-1.5">
            {[
              { label: "GitHub", href: site.socials.github },
              { label: "LinkedIn", href: site.socials.linkedin },
              { label: "Email", href: `mailto:${site.email}` },
              { label: "Résumé (PDF)", href: site.resumeUrl },
            ].map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="link-sweep text-[0.875rem] text-fg-dim hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col justify-between gap-6 lg:col-span-3 lg:col-start-10 lg:items-end">
          <button
            type="button"
            onClick={() => scrollToSection("index")}
            className="label flex items-center gap-2 hover:text-signal"
          >
            <span aria-hidden>↑</span> Back to top
          </button>
          <p className="label lg:text-right">
            © {year} {site.name}
            <br />
            Built with Next.js, WebGL &amp; restraint
          </p>
        </div>
      </div>
    </footer>
  );
}
