'use client';

import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiDownload } from 'react-icons/hi';

const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-neutral-900/90 backdrop-blur-sm border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <button onClick={() => scrollToSection('hero')} className="text-xl font-bold text-white">
                        MA
                    </button>
                    <div className="container mx-auto flex justify-end items-center gap-4">
                        <a
                            href="https://github.com/mamer12"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaGithub className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/mustafa-amer-b2b1b7227/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaLinkedin className="w-6 h-6" />
                        </a>
                    </div>
                    {/* <div className="hidden md:flex space-x-8">
                        <button onClick={() => scrollToSection('hero')} className="text-gray-300 hover:text-white transition-colors">
                            Home
                        </button>
                        <button onClick={() => scrollToSection('about')} className="text-gray-300 hover:text-white transition-colors">
                            About
                        </button>
                        <button onClick={() => scrollToSection('projects')} className="text-gray-300 hover:text-white transition-colors">
                            Projects
                        </button>
                        <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-white transition-colors">
                            Contact
                        </button>
                    </div> */}

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
                            <button
                                onClick={() => {
                                    scrollToSection('hero');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection('about');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                                About
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection('projects');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                                Projects
                            </button>
                            <button
                                onClick={() => {
                                    scrollToSection('contact');
                                    setIsMenuOpen(false);
                                }}
                                className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                            >
                                Contact
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
