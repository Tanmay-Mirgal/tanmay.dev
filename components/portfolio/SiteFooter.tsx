import React from "react";

export const SiteFooter = () => (
  <footer className="border-t border-line">
    <div className="shell flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="label">&copy; 2026 Tanmay Mirgal</p>
      <p className="label hidden !text-faint md:block">Next.js / Convex / GSAP / three.js</p>
      <a href="#top" className="label u-link self-start pb-1 !text-paper sm:self-auto">
        Back to top &uarr;
      </a>
    </div>
  </footer>
);
