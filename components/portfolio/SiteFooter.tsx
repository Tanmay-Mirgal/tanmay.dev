import React from "react";
import { NAV_ITEMS } from "@/components/portfolio/SidebarNav";

/** Black closing bar: every section is reachable from here, including the ones not in the top nav. */
export const SiteFooter = () => (
  <footer className="bg-[#0f0f0f] text-[#f3efe4]">
    <div className="shell py-10">
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="font-mono text-xs font-bold uppercase tracking-[0.04em] hover:text-[#ffd84a]"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-3 border-t-2 border-[#f3efe4]/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.04em] text-[#f3efe4]/70">
          &copy; 2026 Tanmay Mirgal &#10022; Built with Next.js, Convex &amp; GSAP
        </p>
        <a
          href="#top"
          className="font-mono text-xs font-bold uppercase tracking-[0.04em] hover:text-[#ffd84a]"
        >
          Back to top &uarr;
        </a>
      </div>
    </div>
  </footer>
);
