
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import {
  FaAws,
  FaDocker,
  FaGithub,
  FaLinkedin,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import { IconType } from "react-icons";
import {
  SiFastapi,
  SiFlutter,
  SiGraphql,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiTypescript,
} from "react-icons/si";

type Tech = { name: string; icon: IconType };

const techStack: Tech[] = [
  { name: "Node.js", icon: FaNodeJs },
  { name: "FastAPI", icon: SiFastapi },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: FaReact },
  { name: "Python", icon: FaPython },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: FaDocker },
  { name: "AWS", icon: FaAws },
  { name: "GraphQL", icon: SiGraphql },
  { name: "Flutter", icon: SiFlutter },
];

const BentoCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5",
      "backdrop-blur-2xl shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-all duration-300",
      "hover:-translate-y-1 hover:border-white/20",
      "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-white/5",
      "before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
      className
    )}
  >
    <div className="relative h-full w-full">{children}</div>
  </div>
);

const IconPill = ({ icon: Icon, label }: { icon: IconType; label: string }) => (
  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 shadow-sm">
    <Icon className="h-5 w-5" />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(118,92,255,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(255,90,110,0.14),transparent_32%),radial-gradient(circle_at_40%_80%,rgba(58,196,125,0.12),transparent_25%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#0a0a0a]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center">
        <div className="grid w-full auto-rows-[180px] grid-cols-1 gap-4 sm:auto-rows-[200px] sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4 lg:gap-6">
            <BentoCard className="col-span-1 row-span-2 sm:col-span-2 lg:col-span-2 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.08em] text-white/60">
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                  Backend · Microservices · FastAPI
                </span>
                <span className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(74,222,128,0.12)] animate-pulse" />
                  Shipping resilient systems
                </span>
              </div>

              <BlurFade delay={0.1} inView>
                <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
                  Mustafa Al-Mosuli — Backend Engineer.
                </h1>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <p className="mt-4 max-w-2xl text-lg text-white/70 sm:text-xl">
                  5+ years architecting microservices, FastAPI platforms, and ERP integrations that
                  survive migrations (3M+ users) and drive 50% performance gains in high-transaction
                  fintech/telecom.
                </p>
              </BlurFade>
              <BlurFade delay={0.3} inView>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
                  >
                    View selected work
                  </a>
                  <a
                    href="/assets/files/CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-95"
                  >
                    Download résumé
                  </a>
                </div>
              </BlurFade>
            </BentoCard>

            <BentoCard className="col-span-1 row-span-2 p-0">
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute inset-0 scale-105 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center"
                  style={{ filter: "grayscale(0.9)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
              </div>
              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="text-sm uppercase tracking-[0.12em] text-white/60">
                  Crafting systems
                </p>
                <p className="mt-2 text-2xl font-semibold leading-tight">
                  Clean services, observability-first, with room for play.
                </p>
                <p className="mt-3 text-sm text-white/60">Black & white, because focus matters.</p>
              </div>
            </BentoCard>

            <BentoCard className="col-span-1 row-span-1 p-5 sm:p-6">
              <div className="flex h-full flex-col justify-between gap-3">
                <div className="text-sm uppercase tracking-[0.1em] text-white/60">Status</div>
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(74,222,128,0.12)]" />
                  <p className="text-lg font-semibold">Senior Software Engineer @ Zain Iraq</p>
                </div>
                <p className="text-sm text-white/60">
                  Backend/platform engineering · High-transaction, high-uptime systems.
                </p>
              </div>
            </BentoCard>

            <BentoCard className="col-span-1 row-span-1 p-5 sm:p-6">
              <div className="flex h-full flex-col justify-between gap-3">
                <div className="text-sm uppercase tracking-[0.1em] text-white/60">Location</div>
                <p className="text-2xl font-semibold">Baghdad · UTC+3</p>
                <p className="text-sm text-white/60">
                  Works async-first with distributed teams.
                </p>
              </div>
            </BentoCard>

            <BentoCard className="col-span-1 row-span-1 sm:col-span-2 lg:col-span-2 p-0">
              <div className="flex items-center justify-between px-5 pt-5">
                <p className="text-sm uppercase tracking-[0.1em] text-white/60">Tech stack</p>
                <p className="text-xs text-white/50">Scroll to peek</p>
              </div>
              <div className="relative mt-3 overflow-hidden">
                <Marquee pauseOnHover className="[--duration:26s] py-4">
                  {techStack.map((tech) => (
                    <IconPill key={tech.name} icon={tech.icon} label={tech.name} />
                  ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
              </div>
            </BentoCard>

            <BentoCard className="col-span-1 row-span-1 p-5 sm:p-6">
              <div className="flex h-full items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.1em] text-white/60">Social</p>
                  <p className="text-lg font-semibold">Let&apos;s build something</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/mamer12"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
                  >
                    <FaGithub className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mustafa-amer-b0b1b1b1/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </BentoCard>
        </div>
      </div>
    </section>
  );
}
