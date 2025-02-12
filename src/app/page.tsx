"use client"

import { DotPattern } from "@/components/magicui/dot-pattern";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { cn } from "@/lib/utils";
import { BlurFade } from "@/components/magicui/blur-fade";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import { Marquee } from "@/components/magicui/marquee";
import { FaReact, FaNodeJs, FaDocker, FaGithub, FaPython, FaAws } from "react-icons/fa";
import {
  SiTypescript, SiJavascript, SiNextdotjs, SiRubyonrails, SiFlutter,
  SiGraphql, SiMysql, SiPostgresql, SiMongodb, SiFirebase,
  SiGit
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { BsDatabaseCheck } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Loader } from "lucide-react";

const skillCategories = {
  development: [
    { name: "JavaScript", icon: SiJavascript },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Python", icon: FaPython },
    { name: "Ruby on Rails", icon: SiRubyonrails },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Flutter", icon: SiFlutter },
    { name: "React", icon: FaReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "GraphQL", icon: SiGraphql },
    { name: "REST API", icon: TbApi },
  ],
  database: [
    { name: "MySQL", icon: SiMysql },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Firebase", icon: SiFirebase },
    { name: "Database", icon: BsDatabaseCheck },
  ],
  devops: [
    { name: "Docker", icon: FaDocker },
    { name: "AWS", icon: FaAws },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: FaGithub },
  ],
};

const IconCard = ({ icon: Icon, name }: { icon: React.ElementType; name: string }) => {
  return (
    <div
      className={cn(
        "relative h-20 w-20 cursor-pointer overflow-hidden rounded-xl border p-3 mx-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <Icon className="w-full h-full" />
    </div>
  );
};

export default function NeonGradientCardDemo() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-background py-10">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-4">
          Hello There 👋
        </h2>
      </BlurFade>
      <BlurFade delay={0.5} inView>
        <span className="text-pretty text-xl tracking-tighter sm:text-3xl xl:text-4xl/none mb-8">
          It's Mustafa !
        </span>
      </BlurFade>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />

      <div className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden">
        <BlurFade delay={0.75} inView>
          <h3 className="text-2xl font-semibold mb-4">Tech Stack</h3>
        </BlurFade>

        <Marquee pauseOnHover className="[--duration:40s]">
          {skillCategories.development.map((item) => (
            <IconCard key={item.name} {...item} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {[...skillCategories.database, ...skillCategories.devops].map((item) => (
            <IconCard key={item.name} {...item} />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}
