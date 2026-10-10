import type { ReactNode } from "react";
import { MaskTitle } from "@/components/portfolio/MaskTitle";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  /** Span the full 12-column grid instead of the offset 9-column reading column */
  wide?: boolean;
  /** "loud" sections get large titles; the rest stay quiet and readable */
  tone?: "quiet" | "loud";
  children: ReactNode;
}

const TITLE_SIZE = {
  quiet: "text-[clamp(2rem,3.6vw,3.25rem)]",
  loud: "text-[clamp(3rem,9vw,8.5rem)]",
} as const;

/**
 * Shared section frame: hairline rule, mono index + grotesk title, then content
 * in an offset column. Owns the section's anchor id.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  wide = false,
  tone = "quiet",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-20 pb-[clamp(4.5rem,9vw,8rem)]"
    >
      <div className="shell">
        <div className="grid-12 items-end border-t border-line pb-8 pt-6 md:pb-12">
          <p className="label col-span-12 mb-6 flex gap-3 md:col-span-3 md:mb-1">
            <span>({index})</span>
            <span>{eyebrow}</span>
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
