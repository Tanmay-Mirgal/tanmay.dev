"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
          aria-label={`View certificate for ${item.title}`}
          className="group grid w-full cursor-pointer grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-y border-line/40 bg-surface/30 px-3 py-3.5 text-left transition-colors hover:bg-yellow focus-visible:bg-yellow md:grid-cols-[7.5rem_1fr_auto_3.75rem]"
        >
          <span className="order-2 col-span-2 justify-self-start md:order-none md:col-span-1">
            <span className="pill bg-ink">{item.date}</span>
          </span>

          <span className="order-1 md:order-none">
            <span className="block text-base font-bold leading-snug tracking-tight">
              {item.title}
            </span>
            <span className="mt-1 block text-sm text-mute group-hover:text-paper">{item.org}</span>
          </span>

          <span className="hidden items-center gap-1 font-mono text-xs font-bold uppercase text-mute group-hover:text-paper md:inline-flex">
            View <ArrowUpRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>

          <span className="relative order-1 h-12 w-[3.75rem] overflow-hidden border-2 border-paper bg-surface shadow-[2px_2px_0_#0f0f0f] md:order-none">
            {item.type === "pdf" ? (
              <span className="label absolute inset-0 grid place-items-center !text-paper font-bold">PDF</span>
            ) : (
              <Image src={item.url} alt="" fill sizes="64px" className="object-cover" />
            )}
          </span>
        </button>
      </Reveal>
    ))}
  </ul>
);
