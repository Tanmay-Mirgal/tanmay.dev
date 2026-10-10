"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section crosses the middle of the viewport.
 * IntersectionObserver keeps working when Convex content changes page height,
 * unlike offset math in a scroll handler.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  const key = ids.join("|");

  useEffect(() => {
    const elements = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -54% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
