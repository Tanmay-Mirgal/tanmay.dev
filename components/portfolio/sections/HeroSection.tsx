"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { FileText, Briefcase, Github, Linkedin } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Globe } from "@/components/ui/globe"

interface DockIconProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  label: string;
  href: string;
}

const DockIcon = ({ mouseX, children, label, href }: DockIconProps) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 56, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 56, 40]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex items-center justify-center cursor-pointer"
    >
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/90 border border-white/10 rounded-md text-[9px] font-mono font-bold tracking-wider text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md z-50">
        {label}
      </span>
      <motion.div
        style={{ width, height }}
        className="rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-colors flex items-center justify-center text-white/70 hover:text-white"
      >
        {children}
      </motion.div>
    </a>
  );
};

export const HeroSection = () => {
  const mouseX = useMotionValue(Infinity);

  return (
    <section className="w-full flex flex-col items-start text-left pt-6 pb-12 select-none space-y-10">
      
      {/* 1. Profile Avatar with Pulsing Status Indicator */}
      <div className="relative w-16 h-16 rounded-xl border border-white/[0.06] bg-zinc-900 shadow-sm shrink-0">
        <Image
          src="https://github.com/Tanmay-Mirgal.png"
          alt="Tanmay Mirgal"
          fill
          priority
          sizes="64px"
          className="object-cover rounded-xl"
        />
        <span className="w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0B0B0C] absolute bottom-[-3px] right-[-3px] flex items-center justify-center shadow-sm">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>
      </div>

      {/* 2. Bold Headline */}
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-[32px] sm:text-[44px] md:text-[54px] font-display font-extrabold tracking-tight leading-[1.08] text-white">
          Hey, I&apos;m Tanmay Mirgal <br />
          Full-Stack Engineer & ML/DL <br />
          Engineer
        </h1>
        
        {/* Description Paragraph */}
        <p className="text-sm sm:text-base text-white/50 leading-relaxed font-sans font-light max-w-2xl">
          I&apos;m Tanmay, a full-stack and ML/DL engineer with a passion for AI, data science, and computer vision. I build production-ready applications and systems that make a difference.
        </p>
      </div>

      {/* 3. Magic UI Style Dock Navigation */}
      <div 
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="h-16 flex items-end gap-3 px-4 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-3xl backdrop-blur-md shadow-2xl select-none"
      >
        <DockIcon mouseX={mouseX} label="Resume" href="/resume_cv/Tanmay_Mirgal_FullStack_AI_Resume.pdf">
          <FileText size={18} className="text-cyan-400" />
        </DockIcon>
        
        <DockIcon mouseX={mouseX} label="CV" href="/resume_cv/Tanmay_Mirgal_CV.pdf">
          <Briefcase size={18} className="text-emerald-400" />
        </DockIcon>

        <DockIcon mouseX={mouseX} label="GitHub" href="https://github.com/Tanmay-Mirgal">
          <Github size={18} className="text-white/80" />
        </DockIcon>

        <DockIcon mouseX={mouseX} label="LinkedIn" href="https://www.linkedin.com/in/tanmay-mirgal/">
          <Linkedin size={18} className="text-[#0A66C2]" />
        </DockIcon>

        <DockIcon mouseX={mouseX} label="LeetCode" href="https://leetcode.com/u/Tanmay_Mirgal/">
          <svg 
            role="img" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            fill="currentColor" 
            className="text-[#FFA116]"
          >
            <path d="M16.102 17.93l-2.697 2.607c-.466.45-1.211.45-1.677 0L6.553 15.68c-.466-.45-.466-1.176 0-1.627l2.697-2.607c.466-.45 1.211-.45 1.677 0l5.175 4.958c.466.45.466 1.176 0 1.627zm-3.82-14.77a1.184 1.184 0 0 1 1.674 0l3.528 3.5a1.17 1.17 0 0 1 0 1.66l-3.528 3.5a1.184 1.184 0 0 1-1.673 0c-.462-.46-.462-1.2 0-1.66l1.69-1.677H5.666a1.178 1.178 0 0 1-1.166-1.16c0-.64.523-1.16 1.166-1.16h8.77l-1.69-1.677a1.184 1.184 0 0 1 0-1.66z"/>
          </svg>
        </DockIcon>
      </div>

      {/* 4. Hero 3D Planet Globe — Half Dome */}
      <div
        className="relative w-full overflow-hidden select-none"
        style={{ height: 320 }}
      >
        {/* Star particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: i % 5 === 0 ? 2 : 1,
              height: i % 5 === 0 ? 2 : 1,
              opacity: 0.15 + (i % 4) * 0.1,
              left: `${(i * 37 + 11) % 95}%`,
              top: `${(i * 23 + 7) % 70}%`,
            }}
          />
        ))}

        {/* Globe container — sized so the bottom half is below the clip boundary */}
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{ width: 640, height: 640, bottom: -320 }}
        >
          {/* Globe fills this square via absolute inset-0 */}
          <div className="relative w-full h-full">
            <Globe className="absolute inset-0 w-full h-full max-w-none" />
          </div>
        </div>

        {/* Bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none z-20"
          style={{ background: "linear-gradient(to top, #0B0B0C 50%, transparent 100%)" }}
        />
      </div>


    </section>
  );
};
