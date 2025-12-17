"use client";

import { useMemo, useState } from "react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const emailAddress = "mamer.ma1234@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const confetti = useMemo(() => Array.from({ length: 14 }), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex w-full min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
    >
      <BlurFade delay={0.1} inView>
        <div className="flex flex-col gap-3 text-center lg:text-left">
          <p className="text-sm uppercase tracking-[0.12em] text-white/60">Contact</p>
          <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Say hello, instantly.
          </h2>
          <p className="text-lg text-white/70">
            Click the email to copy. Quick replies and clear next steps.
          </p>
        </div>
      </BlurFade>

          <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/12 bg-white/5 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-8">
        {copied && (
          <div className="pointer-events-none absolute inset-0">
            {confetti.map((_, index) => (
              <span
                key={`confetti-${index}`}
                className="confetti-piece"
                style={{ left: `${Math.random() * 100}%`, animationDelay: `${index * 0.05}s` }}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-6">
          <button
            onClick={handleCopy}
            className="group relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/5 px-4 py-6 text-left transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
          >
            <p className="text-sm uppercase tracking-[0.12em] text-white/60">Email</p>
            <p className="text-2xl font-semibold leading-tight break-words text-balance sm:text-4xl lg:text-5xl">
              {emailAddress}
            </p>
            <p className="mt-2 text-sm text-white/70">
              {copied ? "Copied! 🎉" : "Click to copy · Responses within a day"}
            </p>
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              <a
                href="https://github.com/mamer12"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
              >
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/mustafa-amer-b0b1b1b1/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>

            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10 active:scale-95"
            >
              {showForm ? "Hide message form" : "Send me a message"}
            </button>
          </div>
          <div className="text-sm text-white/60">
            <p>Phone: +964 7810940050</p>
            <p>Location: Baghdad, Iraq</p>
          </div>

          {showForm && (
            <form
              className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <label className="w-full text-sm text-white/70">
                  Name
                  <input
                    type="text"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Your name"
                  />
                </label>
                <label className="w-full text-sm text-white/70">
                  Email
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="block text-sm text-white/70">
                Message
                <textarea
                  className="mt-2 h-32 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Tell me about your idea..."
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Send it over
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}