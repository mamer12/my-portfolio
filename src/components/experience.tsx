"use client"

import { BlurFade } from "@/components/magicui/blur-fade";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    title: "Full Stack Developer",
    company: "FFC",
    period: "2023 - Present",
    description: [
      "Developed and maintained web applications using React and Node.js",
      "Implemented responsive UI designs and optimized frontend performance",
      "Collaborated with team members to deliver high-quality solutions"
    ],
    technologies: ["React", "Node.js", "TypeScript", "MongoDB"]
  },
  {
    title: "Software Engineer",
    company: "Earthlink",
    period: "2022 - 2023",
    description: [
      "Built and maintained telecommunications management systems",
      "Developed APIs and backend services using Node.js",
      "Implemented database solutions and optimized query performance"
    ],
    technologies: ["Node.js", "Express", "PostgreSQL", "Redis"]
  },
  {
    title: "Full Stack Developer",
    company: "Creative Advanced Technology",
    period: "2021 - 2022",
    description: [
      "Developed web applications using modern JavaScript frameworks",
      "Created RESTful APIs and integrated third-party services",
      "Implemented responsive designs and improved user experience"
    ],
    technologies: ["JavaScript", "Vue.js", "PHP", "MySQL"]
  },
  {
    title: "Software Developer",
    company: "Pure Platform",
    period: "2020 - 2021",
    description: [
      "Developed and maintained enterprise software solutions",
      "Implemented multi-database integration systems",
      "Collaborated on system architecture and database design"
    ],
    technologies: ["Node.js", "PostgreSQL", "MongoDB", "System Integration"]
  }
];

export default function Experience() {
  return (
    <section className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-background py-10">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8">
          Experience
        </h2>
      </BlurFade>

      <div className="container mx-auto px-4">
        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <BlurFade key={`${exp.company}-${exp.title}`} delay={0.25 + index * 0.25} inView>
              <NeonGradientCard>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold">{exp.title}</h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{exp.company}</p>
                    </div>
                    <span className="text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 w-fit">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-2 text-sm sm:text-base">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-pretty">{item}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full bg-gray-100 dark:bg-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </NeonGradientCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}