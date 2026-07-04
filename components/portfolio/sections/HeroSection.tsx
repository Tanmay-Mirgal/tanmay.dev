"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FileText, Briefcase, Github, Linkedin, Code2 } from "lucide-react";

const MILESTONES = [
  {
    title: "TATA Advanced Systems Completion",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776590547/TATA_Internshio_Completion_acbdaj.png",
    label: "01 // TATA INTERNSHIP completion"
  },
  {
    title: "Industrial Hackathon 2026 Winner",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776589868/certificate_and_medal_ovuu7u.jpg",
    label: "02 // INDUSTRIAL HACKATHON WINNER"
  },
  {
    title: "Combat Training Systems (CTS-71)",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/f_auto,q_auto/v1776530245/IAC1_Vikrant_at_Cochin_s02moz.jpg",
    label: "03 // COMBAT TRAINING SYSTEMS"
  },
  {
    title: "JAAFR Research Paper Publication",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776590743/Certificate_of_published_Paper_rlvpbz.png",
    label: "04 // RESEARCH PUBLICATION"
  },
  {
    title: "Internal Hackathon 2025 Winner",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776590198/Internal_Hackathon_yfinr5.png",
    label: "05 // INTERNAL HACKATHON WINNER"
  },
  {
    title: "Innovgenius Ideathon × TCS",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776839721/Innovgenius_s92ikc.jpg",
    label: "06 // TCS INNOVGENIUS IDEATHON"
  },
  {
    title: "SPIT Hackathon 2025 Team",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776840406/SPIT_2025_ftrwsy.jpg",
    label: "07 // SPIT HACKATHON TEAM"
  },
  {
    title: "TensorFlow Certification",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591174/Tensorflow_certification_ruumd3.png",
    label: "08 // TENSORFLOW DEEP LEARNING"
  },
  {
    title: "AI & ML Bootcamp Certificate",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591173/Udemy_AIML_certificate_ahem8e.png",
    label: "09 // AI / ML DATA SCIENCE BOOTCAMP"
  },
  {
    title: "Postman API Student Expert",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591173/Postman_Certification_zyqlzx.png",
    label: "10 // POSTMAN API STUDENT EXPERT"
  }
];

export const HeroSection = () => {
  const [deck, setDeck] = useState(MILESTONES);
  const [isSwiping, setIsSwiping] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleCardClick = () => {
    if (isSwiping) return;
    setIsSwiping(true);

    setTimeout(() => {
      setDeck((prevDeck) => {
        const nextDeck = [...prevDeck];
        const swipedCard = nextDeck.shift();
        if (swipedCard) {
          nextDeck.push(swipedCard);
        }
        return nextDeck;
      });
      setActiveCardIndex((prevIndex) => (prevIndex + 1) % MILESTONES.length);
      setIsSwiping(false);
    }, 300);
  };

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

      {/* 3. Professional Coordinates & Downloads (Ultra-Minimalist Index) */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-mono tracking-wider pt-2 select-none">
        <a 
          href="/resume_cv/Tanmay_Mirgal_FullStack_AI_Resume.pdf" 
          target="_blank" 
          className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-white/20">01 //</span>
          <FileText size={13} className="text-cyan-400" />
          <span>RESUME</span>
        </a>
        <a 
          href="/resume_cv/Tanmay_Mirgal_CV.pdf" 
          target="_blank" 
          className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-white/20">02 //</span>
          <Briefcase size={13} className="text-emerald-400" />
          <span>CV</span>
        </a>
        <a 
          href="https://github.com/Tanmay-Mirgal" 
          target="_blank" 
          className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-white/20">03 //</span>
          <Github size={13} className="text-white/70" />
          <span>GITHUB</span>
        </a>
        <a 
          href="https://www.linkedin.com/in/tanmay-mirgal/" 
          target="_blank" 
          className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-white/20">04 //</span>
          <Linkedin size={13} className="text-[#0A66C2]" />
          <span>LINKEDIN</span>
        </a>
        <a 
          href="https://leetcode.com/u/Tanmay_Mirgal/" 
          target="_blank" 
          className="text-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2 cursor-pointer"
        >
          <span className="text-white/20">05 //</span>
          <svg 
            role="img" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg" 
            width="13" 
            height="13" 
            fill="currentColor" 
            className="text-[#FFA116]"
          >
            <path d="M16.102 17.93l-2.697 2.607c-.466.45-1.211.45-1.677 0L6.553 15.68c-.466-.45-.466-1.176 0-1.627l2.697-2.607c.466-.45 1.211-.45 1.677 0l5.175 4.958c.466.45.466 1.176 0 1.627zm-3.82-14.77a1.184 1.184 0 0 1 1.674 0l3.528 3.5a1.17 1.17 0 0 1 0 1.66l-3.528 3.5a1.184 1.184 0 0 1-1.673 0c-.462-.46-.462-1.2 0-1.66l1.69-1.677H5.666a1.178 1.178 0 0 1-1.166-1.16c0-.64.523-1.16 1.166-1.16h8.77l-1.69-1.677a1.184 1.184 0 0 1 0-1.66z"/>
          </svg>
          <span>LEETCODE</span>
        </a>
      </div>

      {/* 4. Action Pill Buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href="#projects"
          className="btn-pill-light px-6 py-3 font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
        >
          View — projects
        </a>
        
        <a
          href="#contact"
          className="btn-pill-dark px-6 py-3 font-sans text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          Let&apos;s build intelligent systems together ↗
        </a>
      </div>

      {/* 4. Hero 3D Card Stack (Interactive Milestones Swiper Deck) */}
      <div className="w-full max-w-2xl mx-auto pt-6 flex flex-col items-center select-none overflow-visible">
        
        {/* Stack Container */}
        <div className="relative w-full h-[240px] sm:h-[300px] flex justify-center items-center overflow-visible">
          {deck.slice(0, 3).map((card, idx) => {
            const zIndex = 30 - idx * 10;
            const scale = 1 - idx * 0.05;
            const translateY = idx * 12;
            const rotate = idx === 1 ? 2 : idx === 2 ? -2 : 0;
            const opacity = idx === 0 ? 1 : idx === 1 ? 0.75 : 0.4;
            
            let transformStr = `translateY(${translateY}px) scale(${scale}) rotate(${rotate}deg)`;
            if (idx === 0 && isSwiping) {
              transformStr = "translateX(150%) rotate(15deg) scale(0.95)";
            }

            return (
              <div
                key={card.title}
                onClick={idx === 0 ? handleCardClick : undefined}
                className={`absolute w-[210px] sm:w-[285px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0E0E10] shadow-2xl transition-all duration-300 ease-out ${
                  idx === 0 ? "cursor-pointer active:scale-[0.98] hover:border-white/20" : "pointer-events-none"
                }`}
                style={{
                  zIndex: zIndex,
                  transform: transformStr,
                  opacity: idx === 0 && isSwiping ? 0 : opacity,
                }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 640px) 210px, 285px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="px-2 py-0.5 border border-white/10 bg-[#151518]/90 backdrop-blur-md rounded-md text-[8px] font-mono text-white/70 tracking-wider">
                    {card.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deck Status Counter */}
        <div className="w-full flex justify-center items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono tracking-widest text-white/30 pt-4">
          <span>MILESTONES DECK</span>
          <span>{"//"}</span>
          <span className="text-white/60">
            [ {String(activeCardIndex + 1).padStart(2, "0")} / {String(MILESTONES.length).padStart(2, "0")} ]
          </span>
          <span>·</span>
          <span className="text-cyan-400 animate-pulse">CLICK DECK TO SWIPE ↗</span>
        </div>

      </div>

    </section>
  );
};
