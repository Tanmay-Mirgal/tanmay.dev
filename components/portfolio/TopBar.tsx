"use client";

import React from "react";
import { MobileMenu } from "@/components/portfolio/SidebarNav";

const TOP_LINKS = [
  { label: "Work", href: "#work", ids: ["work"] },
  { label: "Projects", href: "#projects", ids: ["projects"] },
  { label: "Skills", href: "#skills", ids: ["skills"] },
  { label: "Awards", href: "#achievements", ids: ["achievements", "certifications", "publications"] },
  { label: "Contact", href: "#contact", ids: ["contact"] },
];

export const TopBar = ({ activeSection }: { activeSection: string }) => (
  <header className="fixed inset-x-0 top-0 z-40 border-b-[3px] border-paper bg-ink">
    <div className="shell flex h-[68px] items-center justify-between">
      <a href="#top" className="label !text-paper">
        Tanmay Mirgal <span aria-hidden="true">&#10022;</span> Portfolio 2026
      </a>

      <nav aria-label="Primary" className="hidden items-center gap-2.5 md:flex">
        {TOP_LINKS.map((link) => {
          const active = link.ids.includes(activeSection);
          return (
            <a
              key={link.label}
              href={link.href}
              aria-current={active ? "location" : undefined}
              className={`pill transition-colors ${
                active ? "bg-paper text-ink" : "bg-ink hover:bg-yellow"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      <MobileMenu activeSection={activeSection} />
    </div>
  </header>
);
