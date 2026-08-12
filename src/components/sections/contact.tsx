"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Action } from "@/components/ui/action";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { SplitText } from "@/components/ui/split-text";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

/** Without all three values the SDK cannot send; fall back to a mailto link. */
const formEnabled = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard is blocked (insecure context or denied permission). The
      // address is visible on screen, so there is nothing to recover from.
      setCopied(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = formRef.current;
    if (!form || status === "sending") return;

    // Honeypot: a hidden field only an automated filler would populate.
    const honeypot = form.elements.namedItem("company_website");
    if (honeypot instanceof HTMLInputElement && honeypot.value) {
      setStatus("sent");
      form.reset();
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      setStatus("sent");
      form.reset();
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 6000);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 pb-[var(--section-y)] pt-[var(--section-y)]"
    >
      <div className="shell">
        <SectionHeader
          num="07"
          eyebrow="Contact"
          title={
            <>
              Have a system that needs
              <span className="text-fg-faint"> to hold up?</span>
            </>
          }
          lede="On-site in Baghdad or fully remote. I reply within a day."
        />

        {/* --- the email, as the section's centrepiece --------------------- */}
        {/* `fade`, not `wipe`: SplitText already masks per character, and
            nesting it inside a second mask delays it behind the outer reveal. */}
        <Reveal mode="fade" className="mt-16">
          <button
            type="button"
            onClick={handleCopy}
            className="group block w-full text-left"
            aria-label={`Copy email address ${site.email}`}
          >
            <span className="block break-all text-h1 font-medium leading-[0.95] tracking-[-0.04em] text-fg transition-colors duration-500 group-hover:text-signal">
              <SplitText stagger={0.014}>{site.email}</SplitText>
            </span>
            <span
              className={cn(
                "label mt-4 inline-flex items-center gap-2 transition-colors duration-300",
                copied ? "text-signal" : "group-hover:text-fg-dim",
              )}
            >
              <span aria-hidden>{copied ? "✓" : "⧉"}</span>
              {copied ? "Copied to clipboard" : "Click to copy"}
            </span>
          </button>
        </Reveal>

        <div className="mt-20 grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* --- form ---------------------------------------------------- */}
          <div className="lg:col-span-7">
            <p className="label mb-6 border-b border-line pb-4">
              {formEnabled ? "Send a message" : "Direct email"}
            </p>

            {formEnabled ? (
              <form ref={formRef} onSubmit={handleSubmit} noValidate={false}>
                <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
                  <Field
                    label="Name"
                    name="from_name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    disabled={status === "sending"}
                  />
                  <Field
                    label="Email"
                    name="reply_to"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    disabled={status === "sending"}
                  />
                </div>

                <div className="mt-3 border border-line">
                  <Field
                    label="Message"
                    name="message"
                    multiline
                    placeholder="What are you building, and where is it hurting?"
                    disabled={status === "sending"}
                  />
                </div>

                {/* Honeypot — off-screen rather than display:none so naive
                    bots still see it, and hidden from assistive tech. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden"
                >
                  <label htmlFor="company_website">
                    Leave this field empty
                  </label>
                  <input
                    id="company_website"
                    name="company_website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <Action
                    type="submit"
                    variant="signal"
                    magnetic={false}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Sending" : "Send message"}
                  </Action>

                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      "label transition-opacity duration-300",
                      status === "sent" && "text-signal",
                      status === "error" && "text-red-400",
                      (status === "idle" || status === "sending") &&
                        "opacity-0",
                    )}
                  >
                    {status === "sent"
                      ? "✓ Message sent — I'll reply within a day"
                      : status === "error"
                        ? `✗ Could not send. Email me directly at ${site.email}`
                        : "placeholder"}
                  </p>
                </div>
              </form>
            ) : (
              <div className="panel ticked p-6">
                <p className="text-fg-dim">
                  The message form is not configured on this deployment. Email
                  me directly and I will pick it up the same way.
                </p>
                <Action
                  href={`mailto:${site.email}`}
                  variant="signal"
                  className="mt-6"
                >
                  Open mail client
                </Action>
              </div>
            )}
          </div>

          {/* --- coordinates ---------------------------------------------- */}
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="label mb-6 border-b border-line pb-4">Coordinates</p>

            <dl className="divide-y divide-line border-b border-line">
              <Row label="Email">
                <a href={`mailto:${site.email}`} className="link-sweep">
                  {site.email}
                </a>
              </Row>
              <Row label="Phone">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="link-sweep numeric"
                >
                  {site.phone}
                </a>
              </Row>
              <Row label="Based">
                {site.location} · {site.utcOffset}
              </Row>
              <Row label="GitHub">
                <a
                  href={site.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep"
                >
                  @mamer12
                </a>
              </Row>
              <Row label="LinkedIn">
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep"
                >
                  in/mamerma1234
                </a>
              </Row>
            </dl>

            <Reveal delay={0.15} className="mt-8">
              <Action
                href={site.resumeUrl}
                variant="outline"
                external
                download
                className="w-full"
                ariaLabel="Download résumé as PDF"
              >
                Download résumé
              </Action>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    // Left-aligned value in a fixed second column. Right-aligning pushed long
    // values (the email, the LinkedIn handle) hard against the page edge.
    <div className="grid grid-cols-[4.5rem_1fr] items-baseline gap-x-4 py-3.5">
      <dt className="label">{label}</dt>
      <dd className="break-words text-[0.875rem] text-fg-dim">{children}</dd>
    </div>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  multiline?: boolean;
  disabled?: boolean;
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  multiline = false,
  disabled = false,
}: FieldProps) {
  const shared = {
    id: name,
    name,
    required: true,
    disabled,
    placeholder,
    autoComplete,
    className: cn(
      "w-full bg-transparent px-4 pb-4 text-[0.9375rem] text-fg outline-none",
      // Placeholders need real contrast too — at fg-faint/70 they were invisible.
      "placeholder:text-fg-faint disabled:opacity-50",
      "focus-visible:outline-none",
    ),
  };

  return (
    // `ink-panel`, a clear step up from the page: at `ink-raised` (#0E1011 vs
    // #08090A) the fields were still indistinguishable from empty space.
    <div className="group relative bg-ink-panel pt-4 transition-colors duration-300 focus-within:bg-[rgb(28_31_34)]">
      <label htmlFor={name} className="label block px-4 pb-2">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} className={cn(shared.className, "resize-y")} />
      ) : (
        <input {...shared} type={type} />
      )}
      {/* Focus rule — replaces the default ring so the field reads as a
          measuring input rather than a browser default. */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out-expo group-focus-within:scale-x-100"
      />
    </div>
  );
}
