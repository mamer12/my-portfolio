"use client"

import { BlurFade } from "@/components/magicui/blur-fade";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    title: "My College",
    description: "A cross-platform application built with Flutter, providing comprehensive information about private universities and colleges in Iraq. Streamlines the college search process for prospective students.",
    technologies: ["Flutter", "Dart", "Mobile Development", "UI/UX Design"],
    githubUrl: "https://github.com/mamer12"
  },
  {
    title: "Shopping App",
    description: "A full-stack e-commerce application featuring a Flutter frontend and Node.js backend with MongoDB. Implements secure user authentication, product management, and shopping cart functionality.",
    technologies: ["Flutter", "Node.js", "MongoDB", "REST API", "JWT"],
    githubUrl: "https://github.com/mamer12"
  },
  {
    title: "Multi-Database Integration System",
    description: "Implemented a sophisticated multi-database connection project at Pure Platform, enabling seamless interaction across diverse relational and non-relational data sources. Enhanced data accessibility and system integration.",
    technologies: ["Node.js", "PostgreSQL", "MongoDB", "System Integration", "API Development"]
  }
];

export default function Projects() {
  return (
    <section className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-background py-10">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8">
          Projects
        </h2>
      </BlurFade>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <BlurFade key={project.title} delay={0.25 + index * 0.25} inView>
              <NeonGradientCard className="h-full">
                <div className="space-y-4">
                  {project.imageUrl && (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="text-pretty">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-4">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                      >
                        <FaGithub className="w-5 h-5" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 hover:text-blue-500 transition-colors"
                      >
                        <FaExternalLinkAlt className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
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