"use client";

import React from "react";
import { HolographicNode } from "../HolographicNode";

export const FreelanceSection = () => {
  const services = [
    { title: "Full-Stack Web App", tech: "React, Next.js, Node, MongoDB", time: "2–4 Weeks" },
    { title: "ML Model + API", tech: "Python, TensorFlow, FastAPI", time: "1–3 Weeks" },
    { title: "Computer Vision", tech: "OpenCV, TensorFlow, Python", time: "2–3 Weeks" },
    { title: "Cloud Ops. CI/CD", tech: "AWS, Docker, CI/CD", time: "3–7 Days" },
  ];

  return (
    <section id="freelance" className="py-24 md:py-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
      <HolographicNode id="freelance_node">
        <div className="bg-[#050505] border border-white/10 p-6 sm:p-10 md:p-16">
          <div className="mb-10 md:mb-16">
            <h2 className="text-[10px] font-mono text-emerald-500 tracking-[0.2em] uppercase mb-4 animate-pulse">STATUS: AVAILABLE FOR CONTRACTS</h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white max-w-2xl">Freelance Cyber Services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
            {services.map((srv, i) => (
              <div key={i} className="flex gap-4 border-b border-white/5 pb-6 group hover:border-[#D4AF37]/50 transition-colors">
                <span className="text-white/20 font-mono text-lg mt-1">.0{i+1}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-display font-medium text-white mb-2 group-hover:text-[#D4AF37]">{srv.title}</h3>
                  <p className="text-white/40 font-mono text-[9px] uppercase mb-4">{srv.tech}</p>
                  <span className="text-[9px] font-mono text-black bg-[#D4AF37] px-2 py-1 font-bold">ETA: {srv.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HolographicNode>
    </section>
  );
};
