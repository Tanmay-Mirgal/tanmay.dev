"use client";

import Image from "next/image";
import type { Doc } from "@/convex/_generated/dataModel";
import { Reveal } from "@/components/portfolio/Reveal";

type RecordDoc = Doc<"achievements">;

interface RecordListProps {
  items: RecordDoc[];
  onSelect: (item: RecordDoc) => void;
}

/**
 * Dense dated ledger used for achievements and certifications. Each row opens the
 * lightbox, which shows the full certificate and its description.
 */
export const RecordList = ({ items, onSelect }: RecordListProps) => (
  <ul className="border-t border-line">
    {items.map((item) => (
      <Reveal as="li" key={item._id} className="border-b border-line">
        <button
          type="button"
          onClick={() => onSelect(item)}
          aria-label={`View ${item.title}`}
          className="group grid w-full grid-cols-[1fr_3.5rem] items-center gap-x-5 gap-y-1 py-4 text-left md:grid-cols-[6rem_1fr_3.5rem]"
        >
          <span className="label order-2 col-span-2 md:order-none md:col-span-1">{item.date}</span>

          <span className="order-1 md:order-none">
            <span className="block text-[15px] font-medium leading-snug text-paper transition-transform duration-500 group-hover:translate-x-1.5 md:text-base">
              {item.title}
            </span>
            <span className="mt-1 block text-sm text-mute">{item.org}</span>
          </span>

          <span className="relative order-1 h-11 w-14 overflow-hidden rounded-md border border-line bg-surface md:order-none">
            {item.type === "pdf" ? (
              <span className="label absolute inset-0 grid place-items-center !text-faint">PDF</span>
            ) : (
              <Image src={item.url} alt="" fill sizes="64px" className="object-cover" />
            )}
          </span>
        </button>
      </Reveal>
    ))}
  </ul>
);
