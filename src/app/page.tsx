"use client"


import Hero from "@/components/hero";
import About from "@/components/about";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

import TableOfContents from "@/components/table-of-contents";


export default function HomePage() {
  return (
    <>
      <TableOfContents />
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
