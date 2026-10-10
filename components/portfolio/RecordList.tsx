"use client";

import Image from "next/image";
import type { Doc } from "@/convex/_generated/dataModel";
import { Reveal } from "@/components/portfolio/Reveal";

type RecordDoc = Doc<"achievements">;

interface RecordListProps {
  items: RecordDoc[];
  onSelect: (item: RecordDoc) => void;
}

/** Dense dated ledger used for achievements and certifications. Rows open the lightbox. */
export const RecordList = ({ items, onSelect }: RecordListProps) => (
  <ul className="border-t border-line">
    {items.map((item) => (
      <Reveal as="li" key={item._id} className="border-b border-line">
        <button
          type="button"
          onClick={() => onSelect(item)}
          aria-label={`View ${item.title}`}
          className="group grid w-full grid-cols-[1fr_4.5rem] items-start gap-x-6 gap-y-3 py-7 text-left md:grid-cols-12 md:items-center"
        >
          <span className="label order-2 col-span-2 md:order-none md:col-span-2">{item.date}</span>

          <span className="order-1 md:order-none md:col-span-5">
            <span className="block text-base font-medium leading-snug tracking-[0.01em] text-paper transition-transform duration-500 group-hover:translate-x-2 md:text-lg">
              {item.title}
            </span>
            <span className="mt-1.5 block text-sm text-mute">{item.org}</span>
          </span>

          <span className="hidden text-sm leading-relaxed text-mute md:col-span-4 md:line-clamp-3 md:block">
            {item.desc}
          </span>

          <span className="relative order-1 h-12 w-[4.5rem] overflow-hidden border border-line bg-paper/5 md:order-none md:col-span-1 md:h-14 md:w-full">
            {item.type === "pdf" ? (
              <span className="label absolute inset-0 grid place-items-center !text-faint">PDF</span>
            ) : (
              <Image
                src={item.url}
                alt=""
                fill
                sizes="120px"
                className="mono-img object-cover"
              />
            )}
          </span>
        </button>
      </Reveal>
    ))}
  </ul>
);
