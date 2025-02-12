"use client"

import { BlurFade } from "@/components/magicui/blur-fade";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="relative flex w-screen min-h-screen flex-col items-center justify-center gap-6 overflow-hidden bg-background py-10">
      <BlurFade delay={0.25} inView>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8">
          Get In Touch
        </h2>
      </BlurFade>

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <BlurFade delay={0.5} inView>
            <NeonGradientCard>
              <div className="space-y-6">
                <p className="text-pretty text-lg">
                  I'm always interested in hearing about new projects and opportunities.
                  Feel free to reach out if you'd like to collaborate or just want to say hello!
                </p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-neutral-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your message"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Send Message
                  </button>
                </form>

                <div className="flex justify-center gap-6 pt-4">
                  <a 
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <FaLinkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </NeonGradientCard>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}