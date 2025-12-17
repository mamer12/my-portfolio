"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: "Senior Software Engineer",
    company: "Zain Iraq",
    period: "Feb 2025 – Present",
    description: [
      "Led a zero-downtime migration of 3M+ users and financial transactions from NoSQL to PostgreSQL using dual-write + shadow reads.",
      "Designed Redis caching layers that improved API latency by 50% and halved DB load.",
      "Standardized Git flow and CI/CD pipelines for 30+ engineers across hybrid teams.",
      "Delivered large-scale services in a high-transaction telecom environment with international teams.",
    ],
    technologies: ["PostgreSQL", "Redis", "FastAPI", "CI/CD"],
  },
  {
    title: "Software Engineer (Contract -> Consultant)",
    company: "First Finance Company (FFC)",
    period: "Nov 2023 – Aug 2025",
    description: [
      "Architected FastAPI microservices powering digital lending with end-to-end loan lifecycle workflows.",
      "Built internal Loan Management System with dynamic, multi-level approvals and automated credit scoring.",
      "Developed middleware integrating legacy ERP, core banking, and mobile apps with real-time sync.",
      "Containerized services on Hetzner with Docker + GitHub Actions, cutting deployment time by 40%.",
    ],
    technologies: ["FastAPI", "Docker", "PostgreSQL", "GitHub Actions"],
  },
  {
    title: "Software Engineer",
    company: "Earthlink Telecommunications",
    period: "Jul 2022 – Mar 2024",
    description: [
      "Designed and automated BPMN enterprise workflows, reducing manual processing by 30%.",
      "Built CI/CD pipelines and automated tests to accelerate delivery and stability.",
      "Integrated tooling into existing frameworks to keep deployments predictable.",
    ],
    technologies: ["BPMN", "CI/CD", "Automation", "Node.js"],
  },
  {
    title: "Software Engineer (Part-Time/Contract)",
    company: "Pure Platform",
    period: "May 2020 – Aug 2023",
    description: [
      "Built high-concurrency scraping pipelines for real-time analytics ingestion.",
      "Delivered full-stack mobile/web features with multi-database integrations.",
      "Implemented secure auth (Google OAuth, JWT) and collaborated with remote teams worldwide.",
    ],
    technologies: ["Node.js", "MongoDB", "PostgreSQL", "OAuth/JWT"],
  },
];

export default function Experience() {
  const [openCompany, setOpenCompany] = useState<string>(experiences[0]?.company ?? "");

  return (
    <section
      id="experience"
      className="relative flex w-full min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
    >
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.12em] text-white/60">Experience</p>
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Roles with impact, details on demand.
          </h2>
          <p className="text-lg text-white/70">Click to unfold the specifics. Less clutter, more signal.</p>
        </div>
      </BlurFade>

      <div className="w-full max-w-5xl space-y-4">
        {experiences.map((exp, index) => {
          const isOpen = openCompany === exp.company;
          return (
            <BlurFade key={`${exp.company}-${exp.title}`} delay={0.15 + index * 0.05} inView>
              <div className="rounded-2xl border border-white/12 bg-white/5 shadow-[0_12px_45px_rgba(0,0,0,0.35)]">
                <button
                  onClick={() => setOpenCompany(isOpen ? "" : exp.company)}
                  className={cn(
                    "flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6",
                    "transition-colors duration-200 hover:bg-white/5 active:scale-[0.99]"
                  )}
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <p className="text-sm uppercase tracking-[0.1em] text-white/60">{exp.period}</p>
                    <p className="text-xl font-semibold sm:text-2xl">
                      {exp.title} <span className="text-white/60">@ {exp.company}</span>
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-white/70 transition-transform duration-200",
                      isOpen ? "rotate-180" : ""
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="space-y-4 px-5 pb-5 sm:px-6">
                    <ul className="space-y-2 text-white/75">
                      {exp.description.map((item) => (
                        <li key={item} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </BlurFade>
          );
        })}
      </div>
    </section>
  );
}