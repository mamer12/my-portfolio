'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b border-gray-950/[.1] dark:border-gray-50/[.1]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold">
            MA
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/projects" className="hover:text-gray-600 transition-colors">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600 transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.05] transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-md hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.05] transition-colors"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="block px-3 py-2 rounded-md hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.05] transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-md hover:bg-gray-950/[.05] dark:hover:bg-gray-50/[.05] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
