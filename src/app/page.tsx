"use client"


import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

export default function HomePage() {
  return (
    <div className="w-full overflow-x-hidden pb-0">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}
