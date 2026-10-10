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
  <ul className="border-t-[3px] border-paper">
    {items.map((item) => (
      <Reveal as="li" key={item._id} className="border-b-2 border-paper">
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="group grid w-full grid-cols-[1fr_3.75rem] items-center gap-x-5 gap-y-2 px-2 py-4 text-left transition-colors hover:bg-yellow focus-visible:bg-yellow md:grid-cols-[7.5rem_1fr_3.75rem]"
        >
          <span className="order-2 col-span-2 justify-self-start md:order-none md:col-span-1">
            <span className="pill bg-ink !text-[11px]">{item.date}</span>
          </span>

          <span className="order-1 md:order-none">
            <span className="block text-[15px] font-bold uppercase leading-snug tracking-tight md:text-base">
              {item.title}
            </span>
            <span className="mt-1 block text-sm text-mute group-hover:text-paper">{item.org}</span>
          </span>

          <span className="relative order-1 h-12 w-[3.75rem] overflow-hidden border-2 border-paper bg-surface md:order-none">
            {item.type === "pdf" ? (
              <span className="label absolute inset-0 grid place-items-center !text-paper">PDF</span>
            ) : (
              <Image src={item.url} alt="" fill sizes="64px" className="object-cover" />
            )}
          </span>
        </button>
      </Reveal>
    ))}
  </ul>
);
