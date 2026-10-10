"use client";

import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/portfolio/Section";
import { Reveal } from "@/components/portfolio/Reveal";
import { EMAIL, LINKS } from "@/lib/links";

// Inside the blue panel the colour tokens are flipped, so these use explicit colours.
const fieldClass =
  "mt-2 w-full border-[3px] border-[#0f0f0f] bg-[#f3efe4] px-4 py-3.5 text-[15px] text-[#0f0f0f] outline-none transition-shadow placeholder:text-[#0f0f0f]/50 focus:shadow-[5px_5px_0_#0f0f0f]";

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
    <Section id="contact" index="08" eyebrow="Contact" title="Contact" tone="loud" theme="blue" wide>
      <Reveal className="mb-14 md:mb-20">
        <p className="label mb-4 !text-paper">Have a project, role, or proposal?</p>
        <a
          href={`mailto:${EMAIL}`}
          className="display u-link block break-words pb-2 text-[clamp(1.25rem,5vw,4.5rem)] !leading-[1.05]"
        >
          {EMAIL}
        </a>
      </Reveal>

      <div className="grid-12 gap-y-14">
        <Reveal className="col-span-12 md:col-span-7">
          {status === "idle" ? (
            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label htmlFor="fromEmail" className="label !text-paper">
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
                <label htmlFor="subject" className="label !text-paper">
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
                <label htmlFor="payload" className="label !text-paper">
                  Message
                </label>
                <textarea
                  id="payload"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A few lines about what you have in mind"
                  className={`${fieldClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 border-[3px] border-[#0f0f0f] bg-[#ffd84a] px-7 py-4 font-mono text-sm font-bold uppercase text-[#0f0f0f] shadow-[6px_6px_0_#0f0f0f] transition-[transform,box-shadow] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#0f0f0f]"
              >
                Compose email <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </form>
          ) : (
            <div
              role="status"
              className="space-y-5 border-[3px] border-[#0f0f0f] bg-[#f3efe4] p-7 text-[#0f0f0f] shadow-[8px_8px_0_#0f0f0f]"
            >
              <p className="display text-[clamp(1.25rem,2.4vw,2rem)] !leading-[1.1]">
                Your email app should be open with the message drafted.
              </p>
              <p className="text-sm leading-relaxed">
                Nothing is sent from this page. If no mail window appeared, write to{" "}
                <a href={`mailto:${EMAIL}`} className="font-bold underline">
                  {EMAIL}
                </a>{" "}
                directly.
              </p>
              <button type="button" onClick={reset} className="font-mono text-xs font-bold uppercase underline">
                Write another
              </button>
            </div>
          )}
        </Reveal>

        <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={0.1}>
          <p className="label mb-4 !text-paper">Elsewhere</p>
          <ul className="border-t-[3px] border-[#f3efe4]">
            {(
              [
                ["GitHub", LINKS.github],
                ["LinkedIn", LINKS.linkedin],
                ["LeetCode", LINKS.leetcode],
                ["Resume", LINKS.resume],
                ["CV", LINKS.cv],
              ] as const
            ).map(([name, href]) => (
              <li key={name} className="border-b-[3px] border-[#f3efe4]">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-1 py-4 font-mono text-sm font-bold uppercase transition-colors hover:bg-[#ffd84a] hover:text-[#0f0f0f]"
                >
                  {name}
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
