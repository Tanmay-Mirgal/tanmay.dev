"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import DecryptedText from "@/components/ui/DecryptedText";
import { useDialog } from "@/hooks/useDialog";
import { EMAIL, LINKS } from "@/lib/links";

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

interface SidebarNavProps {
  activeSection: string;
}

const pad = (n: number) => String(n + 1).padStart(2, "0");

export const SidebarNav = ({ activeSection }: SidebarNavProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = () => setMenuOpen(false);

  useDialog(menuOpen, close, menuRef);

  return (
    <>
      {/* Desktop: section rail */}
      <nav
        aria-label="Sections"
        className="fixed right-[var(--gutter)] top-1/2 z-40 hidden -translate-y-1/2 text-white mix-blend-difference lg:block"
      >
        <ul className="flex flex-col items-end gap-3">
          {NAV_ITEMS.map((item, i) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em]"
                >
                  <span
                    className={`transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100 group-focus-visible:opacity-100"
                    }`}
                  >
                    <span className="mr-2 tabular-nums opacity-60">{pad(i)}</span>
                    <DecryptedText text={item.label} />
                  </span>
                  <span
                    aria-hidden="true"
                    className={`h-px bg-white transition-all duration-500 ${
                      isActive ? "w-8" : "w-3 opacity-50 group-hover:w-5 group-hover:opacity-100"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile / tablet: full-screen menu */}
      {menuOpen ? (
        <div
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          className="animate-fade-in fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink px-[var(--gutter)] pb-8 pt-5 lg:hidden"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em]">Tanmay Mirgal</span>
            <button
              type="button"
              onClick={close}
              aria-expanded="true"
              className="font-mono text-[11px] uppercase tracking-[0.08em]"
            >
              Close
            </button>
          </div>

          <ul className="mt-10 flex flex-1 flex-col justify-center gap-1">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={close}
                  aria-current={activeSection === item.id ? "location" : undefined}
                  className={`display flex items-baseline gap-4 py-1 text-[clamp(2.4rem,11vw,4rem)] ${
                    activeSection === item.id ? "text-paper" : "text-paper/60"
                  }`}
                >
                  <span className="label !text-faint">{pad(i)}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="label mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6">
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
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-expanded="false"
          aria-haspopup="dialog"
          className="fixed right-[var(--gutter)] top-5 z-40 font-mono text-[11px] uppercase tracking-[0.08em] text-white mix-blend-difference lg:hidden"
        >
          Menu
        </button>
      )}
    </>
  );
};
