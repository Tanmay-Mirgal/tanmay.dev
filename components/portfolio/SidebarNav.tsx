"use client";

import React from "react";

interface SidebarNavProps {
  activeSection: string;
}

export const SidebarNav = ({ activeSection }: SidebarNavProps) => {
  const navItems = [
    { id: "work", label: "Work" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "certifications", label: "Certifications" },
    { id: "publications", label: "Publications" },
  ];

  const shortLabels: Record<string, string> = {
    work: "WRK",
    education: "EDU",
    skills: "SKL",
    projects: "PRJ",
    achievements: "ACH",
    certifications: "CRT",
    publications: "PUB"
  };

  return (
    <>
      <aside className="w-64 h-screen fixed left-0 top-0 bg-[#111113] border-r border-white/[0.06] flex flex-col justify-between py-16 px-6 z-50 select-none hidden md:flex">
        
        {/* Top Brand Name */}
        <div className="pl-8 pt-2">
          {/* <span className="font-display font-black text-xs uppercase tracking-widest text-white">
            Tanmay
          </span> */}
        </div>

        {/* Vertical Ruler Navigation (Matching Screenshot Ticks Exactly in Dark Mode) */}
        <div className="flex-1 flex flex-col justify-center pl-4 pr-2">
          <div className="flex flex-col">
            {navItems.map((item, idx) => {
              const isActive = activeSection === item.id;
              
              return (
                <div key={item.id} className="flex flex-col">
                  {/* Long Tick + Section Label */}
                  <div className="flex items-center gap-3 h-6 relative">
                    {/* Long Tick Line */}
                    <div
                      className={`h-[1px] transition-all duration-350 ${
                        isActive 
                          ? "w-7 bg-white" 
                          : "w-5 bg-white/20"
                      }`}
                    />
                    
                    {/* Navigation Text Anchor */}
                    <a
                      href={`#${item.id}`}
                      className={`text-[10px] uppercase tracking-widest font-sans font-bold transition-all duration-350 ${
                        isActive 
                          ? "text-white font-extrabold translate-x-1" 
                          : "text-white/40 hover:text-white/70"
                      }`}
                    >
                      {item.label}
                    </a>
                  </div>

                  {/* 7 Short Ticks between sections */}
                  {idx < navItems.length - 1 && (
                    <div className="flex flex-col gap-1.5 py-1.5 pl-[1px]">
                      <div className="w-2.5 h-[1px] bg-white/10" />
                      <div className="w-2.5 h-[1px] bg-white/10" />
                      <div className="w-2.5 h-[1px] bg-white/10" />
                      <div className="w-2.5 h-[1px] bg-white/10" />
                      <div className="w-2.5 h-[1px] bg-white/10" />
                      <div className="w-2.5 h-[1px] bg-white/10" />
                      <div className="w-2.5 h-[1px] bg-white/10" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Year and Details */}
        <div className="pl-8 pb-2 space-y-3">
          <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
            EST. 2026 / C.ENG
          </div>
          
          {/* Rounded initial circle matching user screenshot in dark mode */}
          <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-sans text-xs font-black shadow-sm select-none">
            N
          </div>
        </div>

      </aside>

      {/* Mobile Floating Bottom Dock Nav */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#121214]/80 backdrop-blur-md border border-white/[0.08] px-3.5 py-2 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.65)] flex md:hidden items-center gap-1 sm:gap-2.5 text-[9px] font-mono tracking-wider w-[90%] max-w-[400px] justify-between">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const label = shortLabels[item.id] || item.label.substring(0, 3).toUpperCase();
          
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-2.5 py-1 rounded-full transition-all duration-300 ${
                isActive 
                  ? "bg-white text-black font-bold" 
                  : "text-white/40 hover:text-white"
              }`}
            >
              {label}
            </a>
          );
        })}
      </div>
    </>
  );
};
