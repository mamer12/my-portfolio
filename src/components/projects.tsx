"use client";

import { useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";

import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  previewVideo?: string;
  previewImage?: string;
}

const projects: Project[] = [
  {
    title: "Telecom Data Migration Platform",
    description:
      "Zero-downtime migration for 3M+ users from NoSQL to PostgreSQL with dual-write and shadow reads, hardened for high-transaction telecom workloads.",
    technologies: ["PostgreSQL", "Redis", "FastAPI", "Microservices", "Observability"],
    githubUrl: "https://github.com/mamer12",
    previewImage: "https://web-api.iq.zain.com/storage/app/uploads/public/690/71e/89b/69071e89b0e2d310233685.jpg",
  },
  {
    title: "Loan Lifecycle Platform (FFC)",
    description:
      "FastAPI microservices orchestrating digital lending: dynamic approvals, automated credit scoring, and ERP/core banking integrations with secure middleware.",
    technologies: ["FastAPI", "Docker", "PostgreSQL", "GitHub Actions", "API Gateway"],
    githubUrl: "https://github.com/mamer12",
    previewImage: "https://media.licdn.com/dms/image/v2/C4D0BAQEWFDMcddLRZA/company-logo_200_200/company-logo_200_200/0/1662909965193?e=2147483647&v=beta&t=vE76bTvyt5g9L5pYxp52IdETEwfY0xz1zk6j_Ogw8LA",
  },
  {
    title: "ERP Integration & Middleware",
    description:
      "Unified middleware bridging legacy ERP, mobile apps, and banking services with real-time sync, auth (JWT/OAuth), and resilience patterns.",
    technologies: ["Node.js", "GraphQL/REST", "Redis", "CI/CD", "Security"],
    githubUrl: "https://github.com/mamer12",
    previewImage: "https://media.licdn.com/dms/image/v2/C4D0BAQEWFDMcddLRZA/company-logo_200_200/company-logo_200_200/0/1662909965193?e=2147483647&v=beta&t=vE76bTvyt5g9L5pYxp52IdETEwfY0xz1zk6j_Ogw8LA",
  },
  {
    title: "Workflow Automation & DevOps",
    description:
      "BPMN-driven automations that cut manual ops by 30% plus CI/CD pipelines, test automation, and infra as code to ship safely at pace.",
    technologies: ["BPMN", "CI/CD", "Test Automation", "Redis", "Next.js"],
    githubUrl: "https://github.com/mamer12",
    previewImage: "https://media.shafaq.com/media/arcella/1740851506557.jpg",
  },
];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  return (
    <section
      id="projects"
      className="relative flex w-full min-h-screen flex-col items-center justify-center overflow-hidden py-16"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-center mb-8">
          <div className="inline-block mx-auto rounded-2xl bg-black/40 backdrop-blur-xl px-8 py-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.12em] text-white/60">Selected work</p>
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl drop-shadow-2xl">
              Big, bold projects that move fast.
            </h2>
            <p className="text-lg text-white/80 mt-2">
              Hover a title to preview the build. Clean code, instant feedback, ship-ready.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid w-full max-w-6xl mx-auto gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start mt-8">
          <div className="space-y-4">
            {projects.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <BlurFade key={project.title} delay={0.15 + index * 0.05} inView>
                  <div
                    onMouseEnter={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    tabIndex={0}
                    className={`group rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 sm:p-6 ${isActive ? "border-white/25 bg-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.35)]" : ""
                      }`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-3xl font-semibold leading-tight sm:text-4xl"
                      >
                        {project.title}
                      </a>
                      <div className="flex items-center gap-3">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
                            aria-label={`${project.title} GitHub`}
                          >
                            <FaGithub className="h-5 w-5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
                            aria-label={`${project.title} live demo`}
                          >
                            <FaExternalLinkAlt className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="mt-3 text-base text-white/70 sm:text-lg">{project.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </BlurFade>
              );
            })}
          </div>

          <div className="sticky top-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              {activeProject?.previewImage ? (
                <img
                  key={activeProject.previewImage}
                  src={activeProject.previewImage}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
              ) : activeProject?.previewVideo ? (
                <video
                  key={activeProject.previewVideo}
                  className="h-full w-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={activeProject.previewVideo} type="video/mp4" />
                </video>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/5 via-white/0 to-white/10 text-white/70">
                  Preview coming soon
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold leading-tight">{activeProject?.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}