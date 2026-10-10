"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import { EMAIL, LINKS } from "@/lib/links";

/** Every section on the page, in order. Anchor ids are unchanged from the original site. */
export const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "certifications", label: "Certifications" },
  { id: "publications", label: "Publications" },
  { id: "contact", label: "Contact" },
] as const;

const pad = (n: number) => String(n + 1).padStart(2, "0");

/** Full-screen menu for small screens. Lists every section and the social links. */
export const MobileMenu = ({ activeSection }: { activeSection: string }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useDialog(open, close, menuRef);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded="false"
        aria-haspopup="dialog"
        className="pill bg-ink md:hidden"
      >
        Menu
      </button>
    );
  }

  // Portaled to <body>: the header's backdrop-filter would otherwise become the
  // containing block for this fixed overlay and clip it to the header's height.
  return createPortal(
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      tabIndex={-1}
      className="animate-fade-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink px-[var(--gutter)] pb-8 pt-4 md:hidden"
    >
      <div className="flex items-center justify-between">
        <span className="label !text-paper">Tanmay Mirgal ✦ Portfolio 2026</span>
        <button
          type="button"
          onClick={close}
          aria-expanded="true"
          className="pill bg-ink"
        >
          Close
        </button>
      </div>

      <ul className="mt-10 flex flex-1 flex-col justify-center">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.id} className="border-b-[3px] border-paper">
            <a
              href={`#${item.id}`}
              onClick={close}
              aria-current={activeSection === item.id ? "location" : undefined}
              className={`display flex items-baseline gap-4 py-3 text-[clamp(1.75rem,8vw,2.75rem)] ${
                activeSection === item.id ? "text-blue" : "text-paper"
              }`}
            >
              <span className="label">{pad(i)}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <ul className="label mt-8 flex flex-wrap gap-x-6 gap-y-3">
        <li>
          <a href={`mailto:${EMAIL}`}>Email</a>
        </li>
        {(
          [
            ["GitHub", LINKS.github],
            ["LinkedIn", LINKS.linkedin],
            ["LeetCode", LINKS.leetcode],
          ] as const
        ).map(([name, href]) => (
          <li key={name}>
            <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
              {name} <ArrowUpRight size={11} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </div>,
    document.body
  );
};
