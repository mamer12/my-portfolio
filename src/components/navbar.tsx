"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Briefcase, FolderGit2, Home, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const navLinks = [
  { id: "home", label: "Intro", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "contact", label: "Contact", icon: Mail },
];

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const Navbar = () => {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="pointer-events-none fixed bottom-8 left-0 right-0 z-[9999] flex justify-center px-4">
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-2xl shadow-[0_12px_50px_rgba(0,0,0,0.35)]">
        <div className="mr-2 hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 sm:flex">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black">MA</span>
          <span className="uppercase tracking-[0.12em]">Portfolio</span>
        </div>
        {navLinks.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={cn(
                "group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-all duration-200 active:scale-95",
                isActive
                  ? "bg-white text-black shadow-lg"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              )}
            >
              <Icon className={cn("h-4 w-4 transition-colors", isActive ? "text-black" : "text-white/70")} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          );
        })}
        <div className="ml-2 flex items-center gap-2">
          <a
            href="https://github.com/mamer12"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/mamerma1234/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
