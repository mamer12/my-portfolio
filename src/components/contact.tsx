"use client";

import { useMemo, useState, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const emailAddress = "mamer.ma1234@gmail.com";

// EmailJS configuration from environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      if (!formRef.current) return;

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus("success");
      formRef.current.reset();
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setShowForm(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitStatus("error");
      
      // Hide error message after 3 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex w-full min-h-screen flex-col items-center justify-center overflow-hidden py-16"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 text-center mb-8">
          <div className="inline-block mx-auto rounded-2xl bg-black/40 backdrop-blur-xl px-8 py-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.12em] text-white/60">Contact</p>
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl drop-shadow-2xl">
              Say hello, instantly.
            </h2>
            <p className="text-lg text-white/80 mt-2">
              Click the email to copy. Quick replies and clear next steps.
            </p>
          </div>
        </div>

          <div className="relative z-10 w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-white/12 bg-black/40 backdrop-blur-xl p-6 shadow-[0_20px_70px_rgba(0,0,0,0.55)] sm:p-8">
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
              ref={formRef}
              className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <label className="w-full text-sm text-white/70">
                  Name
                  <input
                    type="text"
                    name="from_name"
                    required
                    disabled={isSubmitting}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                    placeholder="Your name"
                  />
                </label>
                <label className="w-full text-sm text-white/70">
                  Email
                  <input
                    type="email"
                    name="reply_to"
                    required
                    disabled={isSubmitting}
                    className="mt-2 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <label className="block text-sm text-white/70">
                Message
                <textarea
                  name="message"
                  required
                  disabled={isSubmitting}
                  className="mt-2 h-32 w-full rounded-xl border border-white/15 bg-black/30 px-3 py-3 text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                  placeholder="Tell me about your idea..."
                />
              </label>
              
              {submitStatus === "success" && (
                <div className="rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-4 py-3 text-sm text-emerald-200">
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}
              
              {submitStatus === "error" && (
                <div className="rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm text-red-200">
                  ✗ Failed to send message. Please try again or email me directly.
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-lg transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send it over"}
              </button>
            </form>
          )}
        </div>
      </div>
      </div>
    </section>
  );
}