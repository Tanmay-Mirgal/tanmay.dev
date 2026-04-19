"use client";

import React from "react";
import { Layers, Cpu, Cloud, Zap } from "lucide-react";
import { HolographicNode } from "../HolographicNode";

export const CapabilitiesSection = () => {
  const capabilities = [
    { title: "Full-Stack Ownership", desc: "Zero hand-holding required. I architect and engineer the entire MERN system—from responsive interfaces to secure backend APIs.", icon: <Layers className="text-[#D4AF37]" size={36}/> },
    { title: "Machine Learning / Vision", desc: "Deep Learning models, TensorFlow, and advanced OpenCV vision layers seamlessly integrated into scalable APIs.", icon: <Cpu className="text-emerald-500" size={36}/> },
    { title: "Cloud Ops. & CI/CD", desc: "Rigorous automated deployment pipelines built on AWS architecture, using Docker and Nginx proxies.", icon: <Cloud className="text-blue-500" size={36}/> },
    { title: "Fast Production Delivery", desc: "I ship highly scalable, performance-driven web products blazingly fast without compromising quality.", icon: <Zap className="text-[#F9A826]" size={36}/> },
  ];

  return (
    <section id="capabilities" className="py-24 md:py-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
      <div className="mb-12 md:mb-16">
        <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">SYSTEM_CAPABILITIES</h2>
        <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium text-white max-w-2xl leading-tight">I engineer systems that <br className="hidden sm:block"/><span className="text-white/30 italic">dominate complexity.</span></p>
      </div>
      <div className="flex flex-col gap-8 md:gap-12">
        {capabilities.map((c, i) => (
          <HolographicNode key={i} id={`cap_node_${i}`}>
            <div className="bg-[#050505] p-6 sm:p-10 lg:p-14 border border-white/5 flex flex-col md:flex-row gap-6 md:gap-8 items-start group hover:border-[#D4AF37]/30 transition-all duration-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 sm:p-8 text-[120px] md:text-[200px] text-white/[0.02] font-black leading-none pointer-events-none font-mono -translate-y-1/4 translate-x-1/4">0{i+1}</div>
              <div className="p-4 md:p-5 border border-white/10 bg-black shadow-[rgba(212,175,55,0.1)_0px_0px_20px] group-hover:scale-110 transition-transform hidden sm:block">{c.icon}</div>
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="sm:hidden p-3 border border-white/10 bg-black">{c.icon}</div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">{c.title}</h3>
                </div>
                <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light">{c.desc}</p>
              </div>
            </div>
          </HolographicNode>
        ))}
      </div>
    </section>
  );
};
