"use client";

import { BlurFade } from "@/components/magicui/blur-fade";

import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-16"
    >
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8 w-full">
      
        <BlurFade delay={0.1} inView>
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/40 backdrop-blur-xl px-4 py-2 shadow-lg">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(74,222,128,0.12)] animate-pulse" />
            <span className="text-sm font-medium text-emerald-200">
              Available for new opportunities
            </span>
          </div>
        </BlurFade>

        <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl drop-shadow-2xl">
          Mustafa Al-Mosuli
        </h1>

        <BlurFade delay={0.3} inView>
          <p className="mt-6 text-xl font-medium text-white/90 sm:text-2xl lg:text-3xl drop-shadow-lg">
            Backend Engineer
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl bg-black/30 backdrop-blur-md px-6 py-4 shadow-xl">
            <p className="text-base text-white/80 sm:text-lg">
              5+ years architecting microservices, FastAPI platforms, and ERP integrations that
              survive migrations (3M+ users) and drive 50% performance gains in high-transaction
              fintech/telecom systems.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-2xl transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              View selected work
            </a>
            <a
              href="https://drive.usercontent.google.com/u/0/uc?id=12w1wduU6u9R3VZEdnYy5Mjsg6ZCEZFmM&export=download"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-black/40 backdrop-blur-xl px-8 py-3.5 text-sm font-semibold text-white shadow-xl transition-all duration-200 hover:border-white/50 hover:bg-black/50 active:scale-95"
            >
              Download résumé
            </a>
          </div>
        </BlurFade>

        <BlurFade delay={0.6} inView>
          <div className="mt-12 flex items-center justify-center gap-4">
            <a
              href="https://github.com/mamer12"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-xl transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 active:scale-95"
              aria-label="GitHub"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/mustafa-amer-b0b1b1b1/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur-xl transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:-translate-y-0.5 active:scale-95"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
