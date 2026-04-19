"use client";

import React from "react";
import { Database } from "lucide-react";
import { HolographicNode } from "../HolographicNode";
import dynamic from "next/dynamic";
const InteractiveNeuralGraph = dynamic(() => import("../InteractiveNeuralGraph").then(mod => mod.InteractiveNeuralGraph), {
  ssr: false,
  loading: () => <div className="w-full aspect-square flex items-center justify-center font-mono text-xs text-white/20">Initializing Neural Engine...</div>
});

export const StackSection = () => {
  return (
    <section id="stack" className="py-32 w-full pr-6 md:pr-12 lg:pr-24 z-10 relative overflow-hidden">
      <HolographicNode id="stack_node">
        <div className="p-8 border border-white/10 bg-[#030303] flex flex-col items-center">
          <div className="w-full flex justify-between items-center border-b border-white/10 pb-6 mb-12">
            <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest"><Database size={16} className="inline mr-2"/> Neural Architecture Core</span>
            <span className="font-mono text-[9px] text-emerald-500 animate-pulse">Running Interactive Simulation</span>
          </div>
          <div className="-ml-6 sm:-ml-16 md:-ml-32 lg:-ml-48 scale-[0.8] sm:scale-[0.9] md:scale-100 flex items-center justify-center pointer-events-auto w-[100vw] sm:w-[calc(100vw-4rem)] md:w-[calc(100vw-8rem)] lg:w-[calc(100vw-12rem)]">
            <InteractiveNeuralGraph />
          </div>
        </div>
      </HolographicNode>
    </section>
  );
};
