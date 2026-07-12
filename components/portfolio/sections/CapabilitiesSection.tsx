"use client";

import React from "react";
import { HolographicNode } from "../HolographicNode";
import * as LucideIcons from "lucide-react";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

interface Skill {
  title: string;
  desc: string;
  icon?: string;
  iconName?: string;
  colorClass?: string;
}

export const CapabilitiesSection = () => {
  const convexSkills = useQuery(api.portfolio.getSkills);

  const staticCapabilities: Skill[] = [
    { title: "Full-Stack Ownership", desc: "Zero hand-holding required. I architect and engineer the entire MERN system—from responsive interfaces to secure backend APIs.", iconName: "Layers", colorClass: "text-[#D4AF37]" },
    { title: "Machine Learning / Vision", desc: "Deep Learning models, TensorFlow, and advanced OpenCV vision layers seamlessly integrated into scalable APIs.", iconName: "Cpu", colorClass: "text-emerald-500" },
    { title: "Cloud Ops. & CI/CD", desc: "Rigorous automated deployment pipelines built on AWS architecture, using Docker and Nginx proxies.", iconName: "Cloud", colorClass: "text-blue-500" },
    { title: "Fast Production Delivery", desc: "I ship highly scalable, performance-driven web products blazingly fast without compromising quality.", iconName: "Zap", colorClass: "text-[#F9A826]" },
  ];

  const displayCapabilities = convexSkills !== undefined && convexSkills.length > 0 ? convexSkills : staticCapabilities;

  const renderIcon = (iconName: string, index: number) => {
    // @ts-expect-error - Dynamic icon rendering
    const IconComponent = LucideIcons[iconName] || LucideIcons.Code;
    const colors = ["text-[#D4AF37]", "text-emerald-500", "text-blue-500", "text-[#F9A826]"];
    const colorClass = colors[index % colors.length];
    
    return <IconComponent className={colorClass} size={36} />;
  };

  return (
    <section id="capabilities" className="py-24 md:py-32 pr-2 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
      <div className="mb-12 md:mb-16">
        <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">SYSTEM_CAPABILITIES</h2>
        <p className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-6xl font-display font-medium text-white max-w-2xl leading-tight">I engineer systems that <br className="hidden sm:block"/><span className="text-white/30 italic">dominate complexity.</span></p>
      </div>
      <div className="flex flex-col gap-6 md:gap-12">
        {displayCapabilities.map((c, i) => (
          <HolographicNode key={i} id={`cap_node_${i}`}>
            <div className="bg-[#050505] p-6 sm:p-10 lg:p-14 border border-white/5 flex flex-col md:flex-row gap-4 md:gap-8 items-start group hover:border-[#D4AF37]/30 transition-all duration-700 relative overflow-hidden">
              <div className="absolute top-1/2 right-4 sm:right-8 text-[80px] md:text-[160px] text-white/20 font-black leading-none pointer-events-none font-mono -translate-y-1/2">0{i+1}</div>
              <div className="p-4 md:p-5 border border-white/10 bg-black shadow-[rgba(212,175,55,0.1)_0px_0px_20px] group-hover:scale-110 transition-transform hidden sm:block">
                {renderIcon(c.icon || (c as Skill).iconName || "Code", i)}
              </div>
              <div className="relative z-10 max-w-xl">
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <div className="sm:hidden p-3 border border-white/10 bg-black">
                    {renderIcon(c.icon || (c as Skill).iconName || "Code", i)}
                  </div>
                  <h3 className="text-xl sm:text-3xl font-display font-bold text-white uppercase tracking-tight">{c.title}</h3>
                </div>
                <p className="text-white/50 text-sm sm:text-lg leading-relaxed font-light">{c.desc}</p>
              </div>
            </div>
          </HolographicNode>
        ))}
      </div>
    </section>
  );
};
