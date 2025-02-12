"use client";

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
}

const sections: Section[] = [
  { id: 'hero', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'projects', title: 'Projects' },
  { id: 'contact', title: 'Contact' }
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px'
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-8 top-8 z-40 hidden lg:block">
      <nav className="p-4">
        <ul className="space-y-4">
          {sections.map(({ id, title }) => (
            <li key={id} className="relative">
              <button
                onClick={() => scrollToSection(id)}
                className={`text-sm group flex items-center ${activeSection === id ? 'text-white font-medium' : 'text-gray-400 hover:text-white'} transition-colors`}
              >
                <span className={`absolute -left-2 w-0.5 h-full transition-all ${activeSection === id ? 'bg-white' : 'bg-transparent group-hover:bg-gray-400'}`} />
                {title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}