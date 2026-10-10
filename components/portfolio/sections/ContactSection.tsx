"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import DecryptedText from "@/components/ui/DecryptedText";
import { EMAIL, LINKS } from "@/lib/links";

const fieldClass =
  "w-full border-0 border-b border-line bg-transparent py-3 text-[15px] text-paper outline-none transition-colors placeholder:text-faint focus:border-paper";

export const ContactSection = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    // No backend: this drafts the message in the visitor's mail app.
    // The reply-to address goes in the body so it isn't lost.
    const body = `${message}\n\n—\nReply to: ${email}`;
    const mailtoUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject || "Portfolio Contact Connection"
    )}&body=${encodeURIComponent(body)}`;

    setStatus("opened");
    window.location.href = mailtoUrl;
  };

  const reset = () => {
    setStatus("idle");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <Section id="contact" index="08" eyebrow="Contact" title="Contact" wide>
      <Reveal className="mb-14 md:mb-20">
        <p className="label mb-4">Have a project, role, or proposal?</p>
        <a
          href={`mailto:${EMAIL}`}
          className="display u-link block break-words pb-2 text-[clamp(1.7rem,5.6vw,5.5rem)] !leading-[1.05]"
        >
          {EMAIL}
        </a>
      </Reveal>

      <div className="grid-12 gap-y-14">
        <Reveal className="col-span-12 md:col-span-7">
          {status === "idle" ? (
            <form onSubmit={handleSend} className="space-y-8">
              <div>
                <label htmlFor="fromEmail" className="label">
                  Your email
                </label>
                <input
                  id="fromEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="subject" className="label">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Project proposal / Role"
                  autoComplete="off"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="payload" className="label">
                  Message
                </label>
                <textarea
                  id="payload"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A few lines about what you have in mind"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-paper px-6 py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-white"
              >
                Compose email <ArrowUpRight size={13} aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div role="status" className="space-y-5 border-t border-line pt-6">
              <p className="display text-[clamp(1.75rem,3vw,2.75rem)] !leading-[1.1]">
                Your email app should be open with the message drafted.
              </p>
              <p className="text-sm leading-relaxed text-mute">
                Nothing is sent from this page. If no mail window appeared, write to{" "}
                <a href={`mailto:${EMAIL}`} className="u-link text-paper">
                  {EMAIL}
                </a>{" "}
                directly.
              </p>
              <button type="button" onClick={reset} className="label u-link pb-1 !text-paper">
                Write another
              </button>
            </div>
          )}
        </Reveal>

        <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={0.1}>
          <p className="label mb-4">Elsewhere</p>
          <ul className="border-t border-line">
            {(
              [
                ["GitHub", LINKS.github],
                ["LinkedIn", LINKS.linkedin],
                ["LeetCode", LINKS.leetcode],
                ["Resume", LINKS.resume],
                ["CV", LINKS.cv],
              ] as const
            ).map(([name, href]) => (
              <li key={name} className="border-b border-line">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-4 font-mono text-[11px] uppercase tracking-[0.08em] text-paper"
                >
                  <DecryptedText text={name} />
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
};
