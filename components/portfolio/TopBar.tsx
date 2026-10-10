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
  <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
    <div className="shell flex h-16 items-center justify-between">
      <a href="#top" className="text-[15px] font-semibold tracking-tight">
        Tanmay Mirgal
      </a>

      <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
        {TOP_LINKS.map((link) => {
          const active = link.ids.includes(activeSection);
          return (
            <a
              key={link.label}
              href={link.href}
              aria-current={active ? "location" : undefined}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                active ? "bg-paper text-ink" : "text-mute hover:text-paper"
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
