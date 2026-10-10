import type { ReactNode } from "react";
import { MaskTitle } from "@/components/portfolio/MaskTitle";

interface SectionProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  /** Span the full 12-column grid instead of the offset 9-column reading column */
  wide?: boolean;
  children: ReactNode;
}

/**
 * Shared section frame: hairline rule, mono index + oversized serif title,
 * then content in an offset column. Owns the section's anchor id.
 */
export function Section({ id, index, eyebrow, title, wide = false, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="relative scroll-mt-20 pb-[clamp(5rem,11vw,10rem)]"
    >
      <div className="shell">
        <div className="grid-12 items-end border-t border-line pb-10 pt-6 md:pb-16">
          <p className="label col-span-12 mb-8 flex gap-3 md:col-span-3 md:mb-3">
            <span>({index})</span>
            <span>{eyebrow}</span>
          </p>
          <h2
            id={`${id}-title`}
            className="display col-span-12 text-[clamp(3.25rem,9vw,9rem)] md:col-span-9"
          >
            <MaskTitle>{title}</MaskTitle>
          </h2>
        </div>

        <div className="grid-12">
          <div
            className={
              wide ? "col-span-12" : "col-span-12 md:col-span-9 md:col-start-4"
            }
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
