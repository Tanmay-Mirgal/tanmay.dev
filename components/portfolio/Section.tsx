import type { ReactNode } from "react";
import { MaskTitle } from "@/components/portfolio/MaskTitle";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  /** Span the full 12-column grid instead of the offset reading column */
  wide?: boolean;
  /** "loud" sections get very large titles; the rest stay readable */
  tone?: "quiet" | "loud";
  /** "blue" makes the whole section a full-bleed electric-blue panel */
  theme?: "cream" | "blue";
  children: ReactNode;
}

const TITLE_SIZE = {
  quiet: "text-[clamp(1.6rem,5.2vw,4.5rem)]",
  loud: "text-[clamp(2.4rem,11vw,9rem)]",
} as const;

/**
 * Shared section frame: a thick rule, a pill index, then an uppercase poster
 * title, with the content in an offset column. Owns the section's anchor id.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  wide = false,
  tone = "quiet",
  theme = "cream",
  children,
}: SectionProps) {
  const blue = theme === "blue";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-[68px] ${
        blue
          ? "theme-blue mt-[clamp(2rem,5vw,4rem)] border-y-[3px] border-[#0f0f0f] pb-[clamp(4.5rem,9vw,8rem)] pt-[clamp(3rem,6vw,5rem)]"
          : "pb-[clamp(4.5rem,9vw,8rem)]"
      }`}
    >
      <div className="shell">
        <div
          className={`grid-12 items-end pb-8 pt-6 md:pb-12 ${
            blue ? "" : "border-t-[3px] border-paper"
          }`}
        >
          <p className="col-span-12 mb-5 flex flex-wrap items-center gap-3 md:col-span-3 md:mb-2">
            <span className={`pill ${blue ? "bg-yellow text-[#0f0f0f]" : "bg-yellow"}`}>{index}</span>
            <span className="label !text-paper">{eyebrow}</span>
          </p>
          <h2 id={`${id}-title`} className={`display col-span-12 md:col-span-9 ${TITLE_SIZE[tone]}`}>
            <MaskTitle>{title}</MaskTitle>
          </h2>
        </div>

        <div className="grid-12">
          <div className={wide ? "col-span-12" : "col-span-12 md:col-span-9 md:col-start-4"}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
