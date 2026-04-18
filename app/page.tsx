"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Layers, Cpu, Database, X, FileText, Terminal, Zap, Cloud } from "lucide-react";

// --- Types ---
interface Achievement {
  title: string;
  org: string;
  date: string;
  desc: string;
  url: string;
  type: "image" | "pdf";
}

interface Project {
  title: string;
  desc: string;
  fullDesc: string;
  tags: string[];
  link: string;
  image: string;
}

// --- Custom Cursor ---
const GlassCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#D4AF37] rounded-full pointer-events-none z-[10000] mix-blend-screen shadow-[0_0_10px_#D4AF37]"
        animate={{ 
          x: mousePosition.x - 6, 
          y: mousePosition.y - 6,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      <motion.div
        className="fixed top-0 left-0 border border-[#D4AF37]/40 bg-[#D4AF37]/[0.05] backdrop-blur-[2px] rounded-full pointer-events-none z-[9999]"
        animate={{ 
          x: mousePosition.x - (isHovering ? 30 : 20), 
          y: mousePosition.y - (isHovering ? 30 : 20),
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.3 }}
      />
    </div>
  );
};

// --- Ambient Neural Background ---
const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="glow-orb bg-[#F9A826]/10 w-full lg:w-[800px] h-[800px] top-[-200px] left-[-200px]" />
      <div className="glow-orb bg-[#D4AF37]/10 w-full lg:w-[600px] h-[600px] bottom-[-100px] right-[-100px]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};

// --- Super Interactive Continuous Neural Graph Architecture ---
const InteractiveNeuralGraph = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Mathematically perfect symmetric radial coordinates based on 50% center
  const mainNodes = [
    { id: 'frontend', label: 'Client UX', x: 28, y: 28, color: '#00E5FF', icon: <Layers size={22}/>, desc: 'React, Next.js, Framer' },
    { id: 'backend', label: 'Core API', x: 72, y: 28, color: '#10B981', icon: <Database size={22}/>, desc: 'Node.js, Express, MongoDB' },
    { id: 'ml', label: 'Intelligence', x: 72, y: 72, color: '#F9A826', icon: <Cpu size={22}/>, desc: 'Python, TensorFlow, OpenCV' },
    { id: 'cloud', label: 'Cloud Ops', x: 28, y: 72, color: '#38BDF8', icon: <Cloud size={22}/>, desc: 'AWS, Docker, Linux' },
  ];

  const techNodes = [
    // Top-Left Cluster (Frontend)
    { id: 'react', parent: 'frontend', label: 'React.js', x: 28, y: 5, color: '#00E5FF', dur: 1.8 },
    { id: 'tw', parent: 'frontend', label: 'Tailwind', x: 5, y: 28, color: '#38BDF8', dur: 2.1 },
    { id: 'next', parent: 'frontend', label: 'Next.js', x: 12, y: 12, color: '#fff', dur: 1.5 },
    { id: 'shadcn', parent: 'frontend', label: 'Shadcn/UI', x: 18, y: 4, color: '#D4AF37', dur: 2.3 },
    { id: 'framer', parent: 'frontend', label: 'Framer', x: 4, y: 18, color: '#FF0055', dur: 1.9 },
    { id: 'rn', parent: 'frontend', label: 'React Native', x: 6, y: 6, color: '#61DAFB', dur: 2.6 },
    { id: 'expo', parent: 'frontend', label: 'Expo', x: 38, y: 5, color: '#fff', dur: 2.0 },
    { id: 'ts', parent: 'frontend', label: 'TypeScript', x: 5, y: 42, color: '#3178C6', dur: 1.7 },

    // Top-Right Cluster (Backend & Auth)
    { id: 'node', parent: 'backend', label: 'Node.js', x: 72, y: 5, color: '#339933', dur: 1.6 },
    { id: 'express', parent: 'backend', label: 'Express.js', x: 95, y: 28, color: '#fff', dur: 2.2 },
    { id: 'betterauth', parent: 'backend', label: 'BetterAuth', x: 88, y: 12, color: '#D4AF37', dur: 2.0 },
    { id: 'jwt', parent: 'backend', label: 'JWT/OAuth', x: 82, y: 4, color: '#F9A826', dur: 2.4 },
    { id: 'prisma', parent: 'backend', label: 'Prisma', x: 96, y: 18, color: '#2D3748', dur: 1.7 },
    { id: 'drizzle', parent: 'backend', label: 'Drizzle', x: 94, y: 42, color: '#C5F11C', dur: 1.9 },
    { id: 'mongoose', parent: 'backend', label: 'Mongoose', x: 62, y: 5, color: '#880000', dur: 2.2 },
    { id: 'postman', parent: 'backend', label: 'Postman', x: 95, y: 10, color: '#FF6C37', dur: 2.5 },

    // Bottom-Right Cluster (ML & DB)
    { id: 'py', parent: 'ml', label: 'Python', x: 72, y: 95, color: '#F9A826', dur: 1.9 },
    { id: 'cv', parent: 'ml', label: 'OpenCV', x: 95, y: 72, color: '#fff', dur: 2.1 },
    { id: 'tf', parent: 'ml', label: 'TensorFlow', x: 88, y: 88, color: '#FF6F00', dur: 1.8 },
    { id: 'mongo', parent: 'ml', label: 'MongoDB', x: 82, y: 96, color: '#47A248', dur: 2.5 },
    { id: 'pg', parent: 'ml', label: 'PostgreSQL', x: 96, y: 82, color: '#336791', dur: 1.6 },
    { id: 'convex', parent: 'ml', label: 'Convex', x: 94, y: 58, color: '#EE4C2C', dur: 2.3 },
    { id: 'supabase', parent: 'ml', label: 'Supabase', x: 62, y: 95, color: '#3ECF8E', dur: 2.0 },
    { id: 'redis', parent: 'ml', label: 'Redis', x: 95, y: 90, color: '#DC382D', dur: 1.8 },

    // Bottom-Left Cluster (Cloud & Infra)
    { id: 'aws', parent: 'cloud', label: 'AWS', x: 28, y: 95, color: '#FF9900', dur: 2.0 },
    { id: 'docker', parent: 'cloud', label: 'Docker', x: 5, y: 72, color: '#2496ED', dur: 1.7 },
    { id: 'ci', parent: 'cloud', label: 'CI/CD', x: 12, y: 88, color: '#fff', dur: 2.3 },
    { id: 'linux', parent: 'cloud', label: 'Linux', x: 18, y: 96, color: '#FCC624', dur: 1.9 },
    { id: 'nginx', parent: 'cloud', label: 'Nginx', x: 4, y: 82, color: '#009639', dur: 2.2 },
    { id: 'vercel', parent: 'cloud', label: 'Vercel', x: 6, y: 94, color: '#fff', dur: 2.5 },
    { id: 'git', parent: 'cloud', label: 'Git/GitHub', x: 38, y: 95, color: '#fff', dur: 1.8 },
    { id: 'k8s', parent: 'cloud', label: 'Kubernetes', x: 5, y: 58, color: '#326CE5', dur: 2.1 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto py-2 md:py-4 relative flex flex-col justify-center items-center px-4 overflow-hidden z-10">
       
       {/* Background structural rings for technical blueprint look */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#ffffff03_0%,_transparent_75%)] pointer-events-none" />

       {/* Strictly responsive square container so coordinates never squish on any screen */}
       <div className="relative w-full max-w-[260px] min-[400px]:max-w-[320px] sm:max-w-[450px] md:max-w-[650px] lg:max-w-[800px] aspect-square bg-transparent mt-0">
         
         <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
            {/* Elegant Blueprint Rings */}
            <circle cx="50%" cy="50%" r="31%" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.2" strokeDasharray="2 6" />
            <circle cx="50%" cy="50%" r="48%" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.05" />

            {/* Neural lines to main hubs + CONTINUOUS DATA FLOW */}
            {mainNodes.map((node, i) => {
               const isActive = activeNode === node.id;
               const opacity = activeNode === null || isActive ? 0.7 : 0.05;
               const glow = isActive ? 'drop-shadow(0 0 10px rgba(212,175,55,0.8))' : 'none';
               const offsetTime = i * 0.5;
               
               return (
                 <g key={`group-${node.id}`} style={{ transition: 'opacity 0.6s ease', opacity }}>
                   <line x1="50%" y1="50%" x2={`${node.x}%`} y2={`${node.y}%`} stroke={isActive ? node.color : 'rgba(255,255,255,0.3)'} strokeWidth={isActive ? 3 : 1.5} strokeDasharray={isActive ? "none" : "4 4"} filter={glow} className="transition-all duration-500">
                      {isActive && <animate attributeName="stroke-dasharray" values="10, 10; 50, 10" dur="2s" repeatCount="indefinite" />}
                   </line>
                   
                   {/* Continuous Synapse Data pulse dots */}
                   <circle r={isActive ? "4" : "2"} fill={node.color} filter={`drop-shadow(0 0 ${isActive ? '10px' : '4px'} ${node.color})`}>
                      <animate attributeName="cx" values={`50%;${node.x}%`} dur="2s" begin={`${offsetTime}s`} repeatCount="indefinite" />
                      <animate attributeName="cy" values={`50%;${node.y}%`} dur="2s" begin={`${offsetTime}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${offsetTime}s`} repeatCount="indefinite" />
                   </circle>
                 </g>
               )
            })}
            
            {/* Fine traces from main hubs to tech nodes + SECONDARY DATA FLOW */}
            {techNodes.map((tech, i) => {
               const parent = mainNodes.find(m => m.id === tech.parent);
               if (!parent) return null;
               
               const isActive = activeNode === parent?.id;
               const opacity = activeNode === null || isActive ? (isActive ? 0.7 : 0.2) : 0.02;
               const strokeW = isActive ? 1.5 : 0.5;
               const offsetTime = i * 0.2;
               
               return (
                 <g key={`tline-${tech.id}`} style={{ transition: 'opacity 0.6s ease', opacity }}>
                  <line 
                    x1={`${parent.x}%`} y1={`${parent.y}%`} x2={`${tech.x}%`} y2={`${tech.y}%`} 
                    stroke={tech.color} strokeWidth={strokeW} 
                    strokeDasharray={isActive ? "none" : "2 4"}
                    className="transition-all duration-500" 
                  />
                  
                  {/* Continuous data packets from Main Nodes to Tech Nodes */}
                  <circle r={isActive ? "2.5" : "1.5"} fill={tech.color} filter={isActive ? `drop-shadow(0 0 4px ${tech.color})` : 'none'}>
                      <animate attributeName="cx" values={`${parent.x}%;${tech.x}%`} dur={`${tech.dur}s`} begin={`${offsetTime}s`} repeatCount="indefinite" />
                      <animate attributeName="cy" values={`${parent.y}%;${tech.y}%`} dur={`${tech.dur}s`} begin={`${offsetTime}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0;1;0" dur={`${tech.dur}s`} begin={`${offsetTime}s`} repeatCount="indefinite" />
                  </circle>
                 </g>
               )
            })}
         </svg>

         {/* --- CENTRAL CORE ENGINE --- */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 min-[400px]:w-16 min-[400px]:h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32">
            <motion.div 
              className="w-full h-full glass-panel border border-[#D4AF37]/50 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(212,175,55,0.5)] backdrop-blur-3xl overflow-hidden group"
              animate={{ boxShadow: ["0 0 30px rgba(212,175,55,0.4)", "0 0 100px rgba(212,175,55,1)", "0 0 30px rgba(212,175,55,0.4)"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              onMouseEnter={() => setActiveNode(null)}
            >
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#D4AF3715_0%,_transparent_70%)]" />
               <div className="absolute inset-1.5 border border-dashed border-[#D4AF37]/60 rounded-full animate-[spin_12s_linear_infinite]" />
               <div className="absolute inset-2 sm:inset-3 border border-[#D4AF37]/30 rounded-full animate-[spin_8s_reverse_linear_infinite] border-t-transparent" />
               
               <Database size={16} className="text-[#D4AF37] mb-1 opacity-90 sm:w-5 sm:h-5 lg:w-8 lg:h-8" />
               <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#F9A826] text-[8px] sm:text-[9px] lg:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase block pl-1 relative z-10">CORE</span>
            </motion.div>
         </div>

         {/* --- MAIN CATEGORY HUBS --- */}
         {mainNodes.map(node => (
            <div 
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              onClick={() => setActiveNode((prev) => prev === node.id ? null : node.id)} // For mobile taps
            >
               <motion.div 
                 whileHover={{ scale: 1.15 }}
                 className={`w-10 h-10 min-[400px]:w-12 min-[400px]:h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-2xl shadow-2xl relative ${activeNode && activeNode !== node.id ? 'opacity-20 scale-90' : 'opacity-100 z-40'}`}
                 style={{ 
                   background: `radial-gradient(circle at top left, ${node.color}40, rgba(0,0,0,0.95))`,
                   border: `1px sm:2px solid ${node.color}80`, 
                   color: node.color, 
                   boxShadow: activeNode === node.id ? `0 0 40px ${node.color}60, inset 0 0 20px ${node.color}30` : `0 0 15px ${node.color}20`
                 }}
               >
                 <div className={`transition-transform duration-500 relative z-10 flex items-center justify-center ${activeNode === node.id ? 'scale-110 drop-shadow-[0_0_8px_white]' : 'scale-100'}`}>
                    {/* Scale down icon severely for tiny mobiles */}
                    <div className="scale-75 sm:scale-100 lg:scale-125">{node.icon}</div>
                 </div>
                 
                 <div className="absolute inset-[-2px] sm:inset-[-4px] border border-dashed rounded-full opacity-30 pointer-events-none animate-[spin_10s_linear_infinite]" style={{ borderColor: node.color }} />

                 <div className={`absolute top-full mt-2 sm:mt-4 whitespace-nowrap transition-all duration-300 pointer-events-none z-50 ${activeNode === node.id ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
                    <div className="glass-panel px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border border-white/10 font-mono flex flex-col items-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-black/80">
                       <span className="text-[9px] sm:text-[11px] lg:text-sm font-bold tracking-widest uppercase mb-0.5 sm:mb-1" style={{ color: node.color }}>{node.label}</span>
                       <span className="text-[7px] sm:text-[8px] lg:text-[10px] text-white/60">{node.desc}</span>
                    </div>
                 </div>
               </motion.div>
            </div>
         ))}

         {/* --- TECH SATELLITE NODES --- */}
         {techNodes.map((tech, i) => {
            const isHovered = activeNode === tech.parent || activeNode === null;
            return (
              <div 
                key={tech.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 pointer-events-none ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-50 blur-xl'}`}
                style={{ left: `${tech.x}%`, top: `${tech.y}%` }}
              >
                 <motion.div
                   animate={{ y: [0, (i % 2 === 0) ? -3 : 3, 0] }}
                   transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
                   className="px-2 py-0.5 sm:px-3 sm:py-1.5 lg:px-5 lg:py-2.5 rounded-full border bg-black/95 backdrop-blur-xl flex items-center justify-center transition-colors duration-500 overflow-hidden relative"
                   style={{ 
                     borderColor: activeNode ? `${tech.color}90` : `${tech.color}40`, 
                     color: activeNode ? '#fff' : tech.color,
                     boxShadow: activeNode ? `0 0 15px ${tech.color}40, inset 0 0 5px ${tech.color}10` : `0 2px 10px rgba(0,0,0,0.5)`
                   }}
                 >
                    <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none animate-[shimmer_3s_infinite]" style={{ animationDelay: `${i * 0.2}s` }} />
                    <span className="font-mono text-[7px] sm:text-[9px] lg:text-xs tracking-[0.1em] sm:tracking-[0.2em] font-bold whitespace-nowrap relative z-10">{tech.label}</span>
                 </motion.div>
                 <style dangerouslySetInnerHTML={{__html: `
                    @keyframes shimmer { 100% { transform: translateX(150%); } }
                 `}} />
              </div>
            )
         })}
       </div>
    </div>
  );
};

// --- Mock Data ---
const achievementsData: Achievement[] = [
  { 
    title: "INNOVGENIUS IDEATHON × TCS", 
    org: "Tata Consultancy Services", 
    date: "2025", 
    url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070", 
    type: "image", 
    desc: "Achieved recognition at the Innovgenius Ideathon, demonstrating innovative problem-solving and rapid prototyping." 
  },
  { 
    title: "INDUSTRIAL HACKATHON 2026 - WINNER", 
    org: "TATA", 
    date: "2026", 
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070", 
    type: "image", 
    desc: "First place winner medal awarded for excellence in industrial system automation and real-time monitoring solutions." 
  },
  { 
    title: "INTERNAL HACKATHON 2025 - CERTIFICATE", 
    org: "Vidyalankar Polytechnic", 
    date: "2025", 
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070", 
    type: "image", 
    desc: "Official winner's certificate for the Internal Hackathon 2025, focusing on urban infrastructure optimization." 
  },
  { 
    title: "TATA ADVANCED SYSTEMS - OFFER LETTER", 
    org: "TASL", 
    date: "2024", 
    url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070", 
    type: "image", 
    desc: "Official selection and appointment for the high-fidelity systems engineering internship program." 
  },
  { 
    title: "TATA ADVANCED SYSTEMS - INTERNSHIP CERTIFICATE", 
    org: "TASL", 
    date: "2025", 
    url: "https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2070", 
    type: "image", 
    desc: "Validated completion of a 9-month intensive internship contributing to naval combat simulation platforms." 
  },
  { 
    title: "RESEARCH PAPER PUBLICATION - JAAFR", 
    org: "JAAFR Journal", 
    date: "2025", 
    url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022", 
    type: "image", 
    desc: "Published research in the Journal of Advance and Future Research, focusing on Combat Management Systems architecture." 
  },
  { 
    title: "SPIT HACKATHON 2025", 
    org: "Sardar Patel Institute of Tech", 
    date: "2025", 
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070", 
    type: "image", 
    desc: "Recognition for high-density code contributions and system design during the national level SPIT hackathon." 
  },
  { 
    title: "VISUAL GRAPHICS IN C - CERTIFICATION", 
    org: "Great Learning Academy", 
    date: "2024", 
    url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074", 
    type: "image", 
    desc: "Certified mastery of low-level framebuffer manipulation and geometric rendering using the C programming language." 
  },
  { 
    title: "REACTJS PROJECTS - SKILLUP", 
    org: "Simplilearn", 
    date: "2024", 
    url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070", 
    type: "image", 
    desc: "Advanced certification for component-driven architecture and state management in production-grade React applications." 
  },
];

const projectsData: Project[] = [
  { 
    title: "Combat Training Systems (CTS-71)", 
    desc: "🔒 Confidential Internship: High-fidelity naval simulation platform built at Tata Advanced Systems replicating real-world Combat Management Systems.", 
    fullDesc: "During a 9-month internship at Tata Advanced Systems, I contributed to CTS-71—a high-fidelity simulation platform designed for naval trainees. As a functional replica of a real Combat Management System (CMS), it enables users to practice complex operational workflows in a controlled environment. My role involved implementing CMS-aligned features, enhancing interaction patterns for training efficiency, and validating simulation behavior against real-world operations. *Due to the nature of this project, source code and architecture are confidential.*",
    tags: ["MERN", "WebSockets", "Jest", "Jira", "Bitbucket", "Confluence"], 
    link: "#",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776530245/IAC1_Vikrant_at_Cochin_s02moz.jpg"
  },
  { 
    title: "Samadhan", 
    desc: "🏆 Winner - Internal Hackathon 2025: AI-driven civic issue reporting and resolution ecosystem with real-time tracking.", 
    fullDesc: "Samadhan was built as a hackathon-winning project focused on simplifying the process of reporting, tracking, and resolving civic issues through a structured and intuitive interface. The architecture emphasizes problem categorization, efficient workflow management, and a clean user experience to ensure quick adoption and high usability.",
    tags: ["Next.js", "TypeScript", "Convex", "Expo", "Tailwind CSS", "Hackathon"], 
    link: "https://github.com/Tanmay-Mirgal/Samadhan",
    image: "https://images.unsplash.com/photo-1555066631-4365d14bab8c?q=80&w=2070"
  },
  { 
    title: "Smart Meeter", 
    desc: "AI-powered enterprise meeting platform featuring custom WebRTC, real-time transcriptions, and intelligent Kanban-based workflow management.", 
    fullDesc: "Smart Meeter was architected as a hackathon prototype to eliminate the overhead of manual meeting orchestration. It integrates a custom WebRTC engine with an AI-driven transcription layer to track vital discussion points and transform live conversations into actionable summaries. The focus was on low-friction setup and a high-speed operator experience for rapid deployment.",
    tags: ["WebRTC", "FastAPI", "TensorFlow", "OpenCV", "Groq AI", "React"], 
    link: "https://github.com/Tanmay-Mirgal/Smart-Meeter",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776528917/WhatsApp_Image_2026-04-18_at_9.44.48_PM_yunoj2.jpg"
  },
  { 
    title: "Finch AI", 
    desc: "Intelligent Banking Recommendation Engine leveraging ML to serve personalized financial products to 500+ active users.",
    fullDesc: "Finch AI is a sophisticated banking intelligence architecture designed to automate financial decision-making. I engineered a robust hybrid system combining a high-performance Next.js frontend with a Flask-powered microservice backend. The core intelligence Layer utilizes Scikit-learn and XGBoost for precise credit-worthiness scoring and interest-rate prediction, while Groq LLM integration enables conversational financial insights. The system handles 500+ active users with real-time analytics and predictive modeling.",
    tags: ["Next.js", "Flask", "XGBoost", "Groq AI", "PostgreSQL", "MLOps"], 
    link: "https://github.com/Tanmay-Mirgal/Finch-AI-Intelligent-Banking-Recommendation-Engine",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776528194/Finch_Ai_yybtt5.png"
  },
  { 
    title: "Cognix", 
    desc: "Enterprise-grade AI Assessment & Analytics Mobile App for clinical testing and real-time cognitive evaluation.",
    fullDesc: "Cognix is an end-to-end full-stack ecosystem engineered for precision clinical assessment. Built with React Native for high-performance mobile accessibility, the platform unifies real-time speech evaluation, intelligent document scanning, and sophisticated cognitive analytics into a single interface. I implemented a complex RAG (Retrieval-Augmented Generation) pipeline for deep clinical data retrieval and optimized MLOps workflows on AWS to ensure sub-second evaluation latency.",
    tags: ["React Native", "Express.js", "MongoDB", "RAG", "AWS", "MLOps"], 
    link: "https://github.com/Tanmay-Mirgal/Cognix",
    image: "https://res.cloudinary.com/dmspullpt/image/upload/v1776528059/Screenshot_2026-04-18_213005_daxafw.png"
  }
];



export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Global neural spine progress
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { damping: 30, stiffness: 100, mass: 0.5 });
  const spineHeight = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden bg-[#030303]">
      <GlassCursor />
      
      {/* Immersive neural backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <AmbientBackground />
         <div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-[2px]" />
      </div>

      {/* --- THE NEURAL SPINE --- */}
      <div className="fixed left-4 sm:left-6 md:left-12 lg:left-24 top-0 bottom-0 w-[1px] bg-white/5 z-[50]">
          {/* Active Liquid Gold flowing down */}
          <motion.div style={{ height: spineHeight, transformOrigin: "top" }} className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-[#F9A826] to-[#D4AF37] shadow-[0_0_15px_#D4AF37]" />
          
          {/* Node trackers */}
          {["home", "capabilities", "stack", "projects", "freelance", "achievements", "contact"].map((id, i) => (
             <div 
                key={id} 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-[#D4AF37] transition-all duration-700 shadow-[0_0_15px_#D4AF37] ${activeSection === id ? 'bg-[#F9A826] scale-150' : 'bg-black scale-100'}`}
                style={{ top: `${(i + 1) * 12.5}%` }}
             >
                <div className={`absolute top-1/2 left-4 -translate-y-1/2 text-[9px] font-mono tracking-widest uppercase transition-opacity duration-500 hidden sm:block ${activeSection === id ? 'opacity-100 text-[#D4AF37]' : 'opacity-0'}`}>
                   {id}
                </div>
             </div>
          ))}
      </div>

      <div className="relative z-10 w-full flex flex-col pl-10 sm:pl-16 md:pl-32 lg:pl-48">
          
          {/* HERO SECTION */}
          <section id="home" className="relative min-h-screen w-full flex items-center pr-4 sm:pr-6 md:pr-12 lg:pr-24 overflow-hidden py-24 lg:py-0">
             <HolographicNode id="home_node">
                <div className="flex flex-col gap-12 w-full relative">
                   {/* Background Decorative Element */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/[0.02] rounded-full blur-[120px] pointer-events-none" />
                   
                   <div className="w-full space-y-10 relative z-10">
                     <div className="flex flex-wrap gap-4 items-center">
                        <motion.div 
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-[#D4AF37]/30 rounded-none text-[10px] font-mono text-[#D4AF37] uppercase tracking-[0.3em] backdrop-blur-md"
                        >
                           <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse shadow-[0_0_10px_#D4AF37]" />
                           ROLE: FULL_STACK_ENGINEER
                        </motion.div>
                        <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">LOC: MUMBAI, MH</div>
                     </div>

                     <div className="flex flex-col gap-1 sm:gap-2">
                        <div className="flex items-center gap-4 sm:gap-6">
                           {/* Avatar Inline */}
                           <motion.div 
                              initial={{ scale: 0, rotate: -20 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", damping: 15, stiffness: 100 }}
                              className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
                           >
                              <div className="absolute inset-0 bg-[#D4AF37] blur-2xl opacity-20 animate-pulse" />
                              <Image 
                                 src="https://github.com/Tanmay-Mirgal.png" 
                                 alt="Tanmay" 
                                 width={128}
                                 height={128}
                                 className="w-full h-full rounded-full border-[2px] border-[#D4AF37] object-cover relative z-10 shadow-[0_0_20px_rgba(212,175,55,0.2)]" 
                              />
                           </motion.div>

                           <h1 className="text-5xl min-[400px]:text-6xl sm:text-7xl lg:text-[8.5rem] font-display font-black leading-none tracking-tighter text-white">
                              TANMAY
                           </h1>
                        </div>

                        <h1 className="text-5xl min-[400px]:text-6xl sm:text-7xl lg:text-[8.5rem] font-display font-black leading-none tracking-tighter text-[#D4AF37]">
                           MIRGAL.
                        </h1>
                     </div>

                     <div className="max-w-2xl space-y-8">
                        <p className="text-base sm:text-lg lg:text-2xl text-white/50 font-medium leading-[1.6] tracking-tight">
                          Designing scalable digital architecture. I specialize in building high-performance systems and intuitive interfaces. Currently engineering the future of web applications with a focus on optimization and user experience.
                        </p>
                        
                        <div className="flex flex-wrap gap-6 items-center">
                           <a href="/resume.pdf" target="_blank" className="relative group px-8 py-4 bg-[#D4AF37] text-black font-display font-black uppercase tracking-widest text-[10px] overflow-hidden flex items-center gap-3">
                              <FileText size={14} /> DOWNLOAD_CV
                           </a>
                           <a href="mailto:tanmaymirgal26@gmail.com" className="px-8 py-4 border border-white/10 text-white font-display font-medium uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all flex items-center gap-3">
                              <X size={14} /> CONTACT_ME
                           </a>
                        </div>
                     </div>
                   </div>
                </div>
             </HolographicNode>
          </section>

          {/* PERSONAL IDENTITY NODE SECTION */}
          <section id="identity" className="py-24 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <HolographicNode id="identity_node">
                <div className="mb-12">
                   <h2 className="text-[10px] font-mono text-white/30 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                      <span className="text-[#D4AF37]">01.</span> PERSONAL_IDENTITY_NODE
                   </h2>
                </div>
                
                <div className="bg-[#080808]/50 border-l border-white/10 p-10 sm:p-14 space-y-12 backdrop-blur-xl">
                   <div className="space-y-6">
                      <p className="text-lg sm:text-xl lg:text-2xl text-white/70 font-medium leading-[1.8] font-sans italic">
                         &quot;The best investment is building something that creates value for others.&quot;
                      </p>
                      <p className="text-lg sm:text-xl lg:text-2xl text-white/60 font-medium leading-[1.8] font-sans">
                         I am a <span className="text-white">Full-Stack Engineer + ML/DL Developer</span> with a mission to build products from 0 to production. I specialize in delivering production-ready MERN apps, robust ML pipelines (data → model → API → dashboard), and high-performance Computer Vision systems.
                      </p>
                      <p className="text-lg sm:text-xl lg:text-2xl text-white/60 font-medium leading-[1.8] font-sans">
                         Beyond the IDE, I handle the entire product lifecycle solo—from crafting <span className="text-white">pixel-perfect React interfaces</span> to managing <span className="text-white">scalable backends with Redis & PostgreSQL</span>, and ensuring reliable cloud deployments on AWS with Docker & CI/CD.
                      </p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                      <div className="space-y-6">
                         <h3 className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase">Core Deliverables</h3>
                         <ul className="space-y-4 text-sm text-white/50 font-mono">
                            <li className="flex gap-3">
                               <span className="text-[#D4AF37] opacity-50">/</span> Production-ready MERN ecosystem
                            </li>
                            <li className="flex gap-3">
                               <span className="text-[#D4AF37] opacity-50">/</span> ML pipelines & Predictive modeling
                            </li>
                            <li className="flex gap-3">
                               <span className="text-[#D4AF37] opacity-50">/</span> Enterprise-grade Computer Vision
                            </li>
                            <li className="flex gap-3">
                               <span className="text-[#D4AF37] opacity-50">/</span> Scalable Backend Architecture
                            </li>
                         </ul>
                      </div>
                      
                      <div className="space-y-6">
                         <h3 className="text-[10px] font-mono text-[#D4AF37] tracking-[0.2em] uppercase">Status Check</h3>
                         <div className="flex flex-wrap gap-4">
                            <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono uppercase tracking-wider">Open to Work: YES</div>
                            <div className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono uppercase tracking-wider">Freelance: Available</div>
                         </div>
                         <div className="flex gap-10 pt-4">
                            <a href="https://github.com/Tanmay-Mirgal" className="text-[10px] font-mono text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-[0.2em] transition-colors">
                               <Github size={12}/> GitHub
                            </a>
                            <a href="https://linkedin.com/in/tanmay-mirgal-1402792a2" className="text-[10px] font-mono text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-[0.2em] transition-colors">
                               <Linkedin size={12}/> LinkedIn
                            </a>
                            <a href="mailto:tanmaymirgal26@gmail.com" className="text-[10px] font-mono text-white/40 hover:text-white flex items-center gap-2 uppercase tracking-[0.2em] transition-colors">
                               <Terminal size={12}/> Email
                            </a>
                         </div>
                      </div>
                   </div>
                </div>
             </HolographicNode>
          </section>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}} />


          {/* CAPABILITIES SECTION */}
          <section id="capabilities" className="py-24 md:py-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <div className="mb-12 md:mb-16">
               <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">SYSTEM_CAPABILITIES</h2>
               <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium text-white max-w-2xl leading-tight">I engineer systems that <br className="hidden sm:block"/><span className="text-white/30 italic">dominate complexity.</span></p>
             </div>
             
             <div className="flex flex-col gap-8 md:gap-12">
               {[
                 { title: "Full-Stack Ownership", desc: "Zero hand-holding required. I architect and engineer the entire MERN system—from responsive React & Next.js interfaces to secure backend Node.js APIs and complex MongoDB aggregations.", icon: <Layers className="text-[#D4AF37]" size={36}/> },
                 { title: "Machine Learning / Vision", desc: "Deep Learning models, TensorFlow, and advanced OpenCV vision layers seamlessly integrated into scalable APIs for real-time computer vision processing.", icon: <Cpu className="text-emerald-500" size={36}/> },
                 { title: "Cloud Ops. & CI/CD", desc: "Rigorous automated deployment pipelines built on AWS architecture, using Docker containers and Nginx reverse proxies for maximum uptime.", icon: <Cloud className="text-blue-500" size={36}/> },
                 { title: "Fast Production Delivery", desc: "I ship highly scalable, performance-driven web products blazingly fast without ever compromising code quality, security, or clean architecture patterns.", icon: <Zap className="text-[#F9A826]" size={36}/> },
               ].map((c, i) => (
                 <HolographicNode key={i} id={`cap_node_${i}`}>
                    <div className="bg-[#050505] p-6 sm:p-10 lg:p-14 border border-white/5 flex flex-col md:flex-row gap-6 md:gap-8 items-start group hover:border-[#D4AF37]/30 transition-all duration-700 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 sm:p-8 text-[120px] md:text-[200px] text-white/[0.02] font-black leading-none pointer-events-none font-mono -translate-y-1/4 translate-x-1/4">0{i+1}</div>
                       <div className="p-4 md:p-5 border border-white/10 bg-black shadow-[rgba(212,175,55,0.1)_0px_0px_20px] group-hover:scale-110 transition-transform hidden sm:block">
                          {c.icon}
                       </div>
                       <div className="relative z-10 max-w-xl">
                          <div className="flex items-center gap-4 mb-3 sm:mb-4">
                             <div className="sm:hidden p-3 border border-white/10 bg-black shadow-[rgba(212,175,55,0.1)_0px_0px_20px]">
                                {c.icon}
                             </div>
                             <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">{c.title}</h3>
                          </div>
                          <p className="text-white/50 text-base sm:text-lg leading-relaxed font-light">{c.desc}</p>
                       </div>
                    </div>
                 </HolographicNode>
               ))}
             </div>
          </section>

          {/* TECH ARCHITECTURE */}
          <section id="stack" className="py-32 w-full pr-6 md:pr-12 lg:pr-24 z-10 relative overflow-hidden">
             <HolographicNode id="stack_node" delay={0}>
                <div className="p-8 border border-white/10 bg-[#030303] flex flex-col items-center">
                   <div className="w-full flex justify-between items-center border-b border-white/10 pb-6 mb-12">
                      <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest"><Database size={16} className="inline mr-2"/> Neural Architecture Core</span>
                      <span className="font-mono text-[9px] text-emerald-500 animate-pulse">Running Interactive Simulation</span>
                   </div>
                   <div className="-ml-10 sm:-ml-16 md:-ml-32 lg:-ml-48 scale-[0.8] md:scale-100 flex items-center justify-center pointer-events-auto w-screen">
                      <InteractiveNeuralGraph />
                   </div>
                </div>
             </HolographicNode>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="py-24 md:py-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <div className="mb-16 md:mb-24">
               <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">DEPLOYED_MISSIONS</h2>
               <p className="text-3xl sm:text-4xl md:text-6xl font-display font-medium text-white max-w-2xl leading-tight">Featured Production Instances.</p>
             </div>
             
             <div className="flex flex-col gap-24">
                {projectsData.map((p, i) => (
                   <HolographicNode key={i} id={`proj_node_${i}`}>
                      <div onClick={() => setSelectedProject(p)} className="flex flex-col xl:flex-row gap-10 group cursor-pointer">
                         {/* Project Visual */}
                         <div className="w-full xl:w-7/12 aspect-[16/9] border border-white/10 bg-black relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#D4AF37]/10 z-10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-1000" />
                            <Image src={p.image} alt={p.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2s] sepia-[30%] group-hover:sepia-0 grayscale-[50%] group-hover:grayscale-0" />
                            
                            {/* Cyber borders */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                         </div>
                         
                         {/* Project Data */}
                         <div className="w-full xl:w-5/12 flex flex-col justify-center">
                            <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                               {p.tags.map(t => <span key={t} className="text-[9px] min-[400px]:text-[10px] font-mono border border-white/20 bg-transparent text-white/50 px-2 py-0.5 sm:px-3 sm:py-1 uppercase tracking-widest">{t}</span>)}
                            </div>
                            <h3 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 sm:mb-6 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                            <div className="w-8 h-[2px] bg-[#D4AF37] mb-4 sm:mb-6" />
                            <p className="text-sm min-[400px]:text-base sm:text-lg text-white/60 leading-relaxed font-light mb-6 sm:mb-8">{p.desc}</p>
                            
                            <div className="mt-auto">
                               <button className="flex items-center gap-4 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors">
                                  Access Protocol <span className="w-6 h-[1px] bg-[#D4AF37] group-hover:w-10 group-hover:bg-white transition-all block" />
                               </button>
                            </div>
                         </div>
                      </div>
                   </HolographicNode>
                ))}
             </div>
          </section>

          {/* FREELANCE SERVICES */}
          <section id="freelance" className="py-24 md:py-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <HolographicNode id="freelance_node">
                <div className="bg-[#050505] border border-white/10 p-6 sm:p-10 md:p-16">
                   <div className="mb-10 md:mb-16">
                     <h2 className="text-[10px] sm:text-xs font-mono text-emerald-500 tracking-[0.2em] uppercase mb-4 animate-pulse">STATUS: AVAILABLE FOR CONTRACTS</h2>
                     <p className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white max-w-2xl">Freelance Cyber Services</p>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-16">
                      {[
                        { title: "Full-Stack Web App", tech: "React, Next.js, Node, MongoDB", time: "2–4 Weeks" },
                        { title: "ML Model + API", tech: "Python, TensorFlow, FastAPI", time: "1–3 Weeks" },
                        { title: "Computer Vision", tech: "OpenCV, TensorFlow, Python", time: "2–3 Weeks" },
                        { title: "Cloud Ops. CI/CD", tech: "AWS, Docker, CI/CD", time: "3–7 Days" },
                        { title: "Robust Backend API", tech: "Node.js, PostgreSQL", time: "1–2 Weeks" },
                        { title: "System Code Review", tech: "Any Major Tech Stack", time: "1–2 Days" }
                      ].map((srv, i) => (
                         <div key={i} className="flex gap-4 sm:gap-6 border-b border-white/5 pb-6 sm:pb-8 group hover:border-[#D4AF37]/50 transition-colors">
                            <span className="text-white/20 font-mono text-lg sm:text-xl mt-1">.0{i+1}</span>
                            <div>
                               <h3 className="text-lg sm:text-xl font-display font-medium text-white mb-2 group-hover:text-[#D4AF37]">{srv.title}</h3>
                               <p className="text-white/40 font-mono text-[9px] min-[400px]:text-[10px] tracking-widest uppercase mb-3 sm:mb-4">{srv.tech}</p>
                               <span className="text-[9px] min-[400px]:text-[10px] font-mono text-black bg-[#D4AF37] px-2 py-1 font-bold">ETA: {srv.time}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </HolographicNode>
          {/* CINEMATIC ACHIEVEMENT GALLERY */}
          <section id="achievements" className="py-24 md:py-32 pr-2 sm:pr-4 md:pr-12 lg:pr-24 z-10 relative">
             <div className="mb-12 md:mb-16">
               <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">HALL_OF_FAME / CERTIFICATIONS</h2>
               <p className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white max-w-2xl leading-tight">Elite Recognition & <br/> <span className="text-white/30">System Certifications.</span></p>
             </div>
             
             <HolographicNode id="achievement_bento">
                <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[250px] min-[1400px]:auto-rows-[300px]">
                   {achievementsData.map((a, i) => {
                      // Custom span logic for bento feel
                      const isLarge = i === 1 || i === 4; // Industrial Hackathon and TASL certificate
                      const isWide = i === 5; // Research paper
                      
                      return (
                         <div 
                           key={i} 
                           onClick={() => setSelectedAchievement(a)}
                           className={`group relative overflow-hidden border border-white/10 bg-[#050505] cursor-pointer hover:border-[#D4AF37]/50 transition-all duration-700 shadow-2xl ${isLarge ? 'min-[500px]:row-span-2' : ''} ${isWide ? 'lg:col-span-2' : ''}`}
                         >
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-1000 z-10" />
                            <div className="absolute inset-0 bg-[#D4AF37]/5 mix-blend-overlay z-10 group-hover:bg-transparent transition-all" />
                            
                            {/* Scanning Line Animation */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#D4AF37]/50 -translate-y-full group-hover:animate-[scan_3s_linear_infinite] z-20" />
                            
                            <Image src={a.url} alt={a.title} fill className="object-cover grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s] sepia-[10%] group-hover:sepia-0" />
                            
                            {/* Achievement Info Label */}
                            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 z-30 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                               <div className="flex flex-col gap-1">
                                  <span className="font-mono text-[8px] sm:text-[9px] text-[#D4AF37] tracking-[0.2em] uppercase bg-black/80 w-fit px-2 py-0.5 border border-[#D4AF37]/20 backdrop-blur-md mb-2">{a.org} | {a.date}</span>
                                  <h3 className="text-xs sm:text-sm font-display font-bold text-white leading-tight uppercase tracking-wider drop-shadow-md">{a.title}</h3>
                                  <div className="w-0 group-hover:w-full h-[1px] bg-[#D4AF37] transition-all duration-700 mt-2" />
                               </div>
                            </div>
                            
                            {/* Corner Cyber Accents */}
                            <div className="absolute top-2 right-2 flex gap-1 z-30">
                               <div className="w-1 h-1 bg-[#D4AF37]/40 rounded-full" />
                               <div className="w-1 h-1 bg-white/20 rounded-full" />
                            </div>
                         </div>
                      )
                   })}
                </div>
             </HolographicNode>

             <style dangerouslySetInnerHTML={{__html: `
                @keyframes scan {
                   0% { transform: translateY(-100%); opacity: 0; }
                   10% { opacity: 1; }
                   90% { opacity: 1; }
                   100% { transform: translateY(400px); opacity: 0; }
                }
             `}} />
          </section>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-32 md:py-40 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative text-center flex justify-center">
             <HolographicNode id="contact_node">
                 <div className="border-y border-white/10 py-16 md:py-24 w-full relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-16 md:h-24 bg-gradient-to-b from-[#D4AF37] to-transparent -translate-y-full" />
                    
                    <h2 className="text-[2.8rem] min-[400px]:text-5xl sm:text-6xl md:text-[8rem] font-display font-black leading-none mb-8 md:mb-10 tracking-tighter hover:text-[#D4AF37] transition-colors cursor-default">
                       EXECUTE
                    </h2>
                    <p className="text-sm min-[400px]:text-base sm:text-lg md:text-xl text-white/50 font-light mb-10 md:mb-12 max-w-lg mx-auto px-4">
                       I am ready to architect your next high-performance enterprise system.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                       <a href="mailto:tanmaymirgal26@gmail.com" className="w-full sm:w-auto px-8 py-4 md:px-12 md:py-5 bg-[#D4AF37] text-black font-mono font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:shadow-[0_0_30px_white] transition-all">Establish Connection</a>
                       <div className="flex gap-4 w-full sm:w-auto justify-center">
                          <a href="https://github.com/Tanmay-Mirgal" target="_blank" className="p-4 border border-white/20 text-white/50 hover:bg-white hover:text-black transition-all flex items-center justify-center shrink-0"><Github size={24}/></a>
                          <a href="https://www.linkedin.com/in/tanmay-mirgal-1402792a2/" target="_blank" className="p-4 border border-white/20 text-white/50 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all flex items-center justify-center shrink-0"><Linkedin size={24}/></a>
                       </div>
                    </div>
                 </div>
             </HolographicNode>
          </section>

          <footer className="w-full text-center pb-10 pt-20 border-t border-white/5 opacity-40 text-[9px] font-mono tracking-[0.2em] uppercase">
             NEURAL NETWORK ONLINE. SERVER UPTIME: 99.99%. (C) {new Date().getFullYear()} Tanmay Mirgal
          </footer>
      </div>

      {/* --- MODALS (Preserved) --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-3xl overflow-y-auto">
            <div className="absolute inset-0 min-h-screen" onClick={() => setSelectedProject(null)} />
            <button onClick={() => setSelectedProject(null)} className="fixed top-6 right-6 text-white/50 hover:text-[#D4AF37] transition-all z-[2001] bg-white/5 border border-white/10 p-3 rounded hover:bg-white/10"><X size={24} /></button>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl border border-white/10 bg-[#0A0A0A] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.05)] flex flex-col z-10 my-auto shadow-[#D4AF37]/5">
              <div className="relative w-full h-[250px] md:h-[400px] bg-black border-b border-white/10">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-4xl md:text-6xl font-display font-medium text-white mb-6 uppercase tracking-tight">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="text-[10px] md:text-xs font-mono px-3 py-1 bg-transparent text-[#D4AF37] border border-[#D4AF37]/30 uppercase tracking-widest">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 min-[400px]:p-10 space-y-6 sm:space-y-8 relative">
                 <div className="absolute top-0 right-10 w-[1px] h-full bg-white/5 hidden sm:block" />
                 <div>
                   <h4 className="text-[10px] sm:text-xs font-mono text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#D4AF37] animate-pulse" /> Mission Brief</h4>
                   <p className="text-white/70 text-base min-[400px]:text-lg leading-relaxed font-light max-w-3xl">{selectedProject.fullDesc}</p>
                 </div>
                 <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row gap-4 border-t border-white/5">
                   <a href={selectedProject.link} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-6 py-4 md:px-8 md:py-4 bg-white/5 text-white border border-white/20 font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3">
                     <Github size={18} /> Source Access
                   </a>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-6 bg-black/98 backdrop-blur-3xl">
            <button onClick={() => setSelectedAchievement(null)} className="absolute top-6 right-6 text-white/50 hover:text-[#D4AF37] z-[2001] border border-white/10 bg-white/5 p-3 rounded hover:bg-white/10"><X size={24} /></button>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video bg-[#050505] border border-[#D4AF37]/30 flex flex-col shadow-[0_0_100px_rgba(212,175,55,0.1)] p-2">
              <div className="relative flex-1 bg-black border border-white/5 overflow-hidden">
                {selectedAchievement.type === 'pdf' ? (
                  <iframe src={selectedAchievement.url} className="w-full h-full bg-white"/>
                ) : (
                  <Image src={selectedAchievement.url} alt={selectedAchievement.title} fill className="object-contain p-2"/>
                )}
              </div>
              <div className="p-8 pb-4">
                <p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.2em] mb-2">{selectedAchievement.org} {"//"} {selectedAchievement.date}</p>
                <h3 className="text-3xl font-display font-medium text-white mb-2">{selectedAchievement.title}</h3>
                <p className="text-white/50 text-sm font-light max-w-2xl">{selectedAchievement.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .glitch-effect:hover { animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite; }
        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }
      `}} />
    </main>
  );
}

// Complex Holographic Node component connecting to the Spine
const HolographicNode = ({ children, id, delay = 0 }: { children: React.ReactNode, id: string, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div ref={ref} id={id} className="relative w-full">
      {/* Horizontal connecting line from spine */}
      <motion.div 
         initial={{ scaleX: 0, opacity: 0 }}
         animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
         transition={{ duration: 0.8, delay, ease: "easeOut" }}
         className="absolute top-12 md:top-16 -left-16 md:-left-32 lg:-left-48 w-16 md:w-32 lg:w-48 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent origin-left z-0 hidden md:block" 
      />
      
      {/* Power pulsing dot transferring from spine */}
      {isInView && (
         <motion.div 
            initial={{ left: "-48px", opacity: 1 }}
            animate={{ left: "0px", opacity: 0 }}
            transition={{ duration: 1, ease: "easeIn", delay: delay + 0.5 }}
            className="absolute top-12 md:top-16 w-2 h-1 bg-[#F9A826] shadow-[0_0_10px_#F9A826] z-10 hidden md:block -mt-[0.5px]"
         />
      )}

      {/* Main Content Hologram Reveal */}
      <motion.div
         initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
         animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
         transition={{ duration: 1, delay: delay + 0.4 }}
         className="relative z-10"
      >
         {children}
      </motion.div>
    </div>
  )
}
    
