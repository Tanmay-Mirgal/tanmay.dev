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

  // 20 High-density tech nodes mapping an intense web architecture
  const techNodes = [
    // Top-Left Cluster (Frontend)
    { id: 'react', parent: 'frontend', label: 'React', x: 28, y: 5, color: '#00E5FF', dur: 1.8 },
    { id: 'tw', parent: 'frontend', label: 'Tailwind', x: 5, y: 28, color: '#38BDF8', dur: 2.1 },
    { id: 'next', parent: 'frontend', label: 'Next.js', x: 12, y: 12, color: '#fff', dur: 1.5 },
    { id: 'redux', parent: 'frontend', label: 'Redux', x: 18, y: 4, color: '#764ABC', dur: 2.3 },
    { id: 'framer', parent: 'frontend', label: 'Framer', x: 4, y: 18, color: '#FF0055', dur: 1.9 },

    // Top-Right Cluster (Backend)
    { id: 'node', parent: 'backend', label: 'Node.js', x: 72, y: 5, color: '#339933', dur: 1.6 },
    { id: 'express', parent: 'backend', label: 'Express', x: 95, y: 28, color: '#fff', dur: 2.2 },
    { id: 'mongo', parent: 'backend', label: 'MongoDB', x: 88, y: 12, color: '#47A248', dur: 2.0 },
    { id: 'pg', parent: 'backend', label: 'PostgreSQL', x: 82, y: 4, color: '#336791', dur: 2.4 },
    { id: 'redis', parent: 'backend', label: 'Redis', x: 96, y: 18, color: '#DC382D', dur: 1.7 },

    // Bottom-Right Cluster (ML)
    { id: 'py', parent: 'ml', label: 'Python', x: 72, y: 95, color: '#F9A826', dur: 1.9 },
    { id: 'cv', parent: 'ml', label: 'OpenCV', x: 95, y: 72, color: '#fff', dur: 2.1 },
    { id: 'tf', parent: 'ml', label: 'TensorFlow', x: 88, y: 88, color: '#FF6F00', dur: 1.8 },
    { id: 'pytorch', parent: 'ml', label: 'PyTorch', x: 82, y: 96, color: '#EE4C2C', dur: 2.5 },
    { id: 'scikit', parent: 'ml', label: 'Scikit', x: 96, y: 82, color: '#F37626', dur: 1.6 },

    // Bottom-Left Cluster (Cloud/DevOps)
    { id: 'aws', parent: 'cloud', label: 'AWS', x: 28, y: 95, color: '#FF9900', dur: 2.0 },
    { id: 'docker', parent: 'cloud', label: 'Docker', x: 5, y: 72, color: '#2496ED', dur: 1.7 },
    { id: 'ci', parent: 'cloud', label: 'CI/CD', x: 12, y: 88, color: '#fff', dur: 2.3 },
    { id: 'linux', parent: 'cloud', label: 'Linux', x: 18, y: 96, color: '#FCC624', dur: 1.9 },
    { id: 'nginx', parent: 'cloud', label: 'Nginx', x: 4, y: 82, color: '#009639', dur: 2.2 },
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
  { title: "Hackathon Winner", org: "AI Global", date: "2024", url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070", type: "image", desc: "Won 1st among 200+ teams for real-time semantic search." },
  { title: "ML Architect", org: "TF Academy", date: "2023", url: "/achievements/cert.pdf", type: "pdf", desc: "Certified for deploying production models at enterprise scale." },
  { title: "Top Contributor", org: "OSS Summit", date: "2023", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070", type: "image", desc: "Recognized for high-impact contributions to LLM libraries." }
];

const projectsData: Project[] = [
  { 
    title: "Samadhan", 
    desc: "High-performance platform handling 10k+ concurrent requests. Optimized infrastructure for extreme load.", 
    fullDesc: "Samadhan is a robust full-stack system heavily utilizing Node.js streams and Redis caching to handle massive concurrent traffic securely. It establishes a highly optimized infrastructure designed specifically for scalable enterprise architectures. The backend ensures sub-100ms response times globally.",
    tags: ["React", "Node.js", "MongoDB", "Redis", "AWS"], 
    link: "https://github.com/Tanmay-Mirgal/Samadhan",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070"
  },
  { 
    title: "Smart Meeter", 
    desc: "ML-powered system achieving 94.7% accuracy on custom datasets using heavy computer vision layers.", 
    fullDesc: "Smart Meeter leverages cutting-edge deep learning layers utilizing custom Python and TensorFlow pipelines. With real-time OpenCV tracking, it delivers a high-accuracy, production-ready computer vision API via FastAPI, seamlessly handling real-time video streams.",
    tags: ["Python", "TensorFlow", "OpenCV", "FastAPI"], 
    link: "https://github.com/Tanmay-Mirgal/Smart-Meeter",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070"
  },
  { 
    title: "Finch AI", 
    desc: "Intelligent Banking Recommendation Engine serving 500+ active users with real-time analytics.",
    fullDesc: "Finch AI establishes a secure, robust Banking Recommendation engine. Integrating real-time financial tracking and intelligent analytics through a deeply integrated MERN stack with PostgreSQL relations, caching, and strict Dockerized CI/CD pipelines.",
    tags: ["MERN", "PostgreSQL", "Docker", "CI/CD"], 
    link: "https://github.com/Tanmay-Mirgal/Finch-AI-Intelligent-Banking-Recommendation-Engine",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974"
  },
  { 
    title: "Cognix", 
    desc: "Full-stack AI SaaS with real-time computer vision capabilities and seamless cloud integration.",
    fullDesc: "Cognix is an end-to-end AI software-as-a-service application. It offers real-time scalable vision capabilities deployed across AWS infrastructure, effectively combining heavy ML processing servers with a beautiful, responsive React User Interface.",
    tags: ["MERN", "AWS", "OpenCV"], 
    link: "https://github.com/Tanmay-Mirgal/Cognix",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070"
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
          <section id="home" className="relative min-h-screen w-full flex items-center pr-4 sm:pr-6 md:pr-12 lg:pr-24 overflow-hidden py-24 sm:py-32 lg:py-0">
             <HolographicNode id="home_node">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
                   <div className="w-full lg:w-[60%] space-y-6 md:space-y-8">
                     <div className="inline-flex items-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-black border border-[#D4AF37]/30 rounded-none text-[10px] sm:text-xs font-mono text-[#D4AF37] uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                       <span className="w-1.5 h-1.5 bg-[#D4AF37] animate-pulse"></span> SYSTEM INITIATED
                     </div>
                     <h1 className="text-[2.6rem] min-[400px]:text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-display font-medium leading-[1] tracking-tighter">
                       <span className="inline-flex items-center gap-3 sm:gap-5 md:gap-6 relative -top-1 sm:-top-3 md:-top-4">
                         {/* eslint-disable-next-line @next/next/no-img-element */}
                         <img src="https://github.com/Tanmay-Mirgal.png" alt="Tanmay Mirgal" className="w-10 h-10 min-[400px]:w-14 min-[400px]:h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-[2px] sm:border-[3px] md:border-[4px] border-[#D4AF37]/80 shadow-[0_0_30px_rgba(212,175,55,0.4)] object-cover bg-black" />
                         Tanmay
                       </span><br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9A826] font-bold glitch-effect" data-text="Intelligence.">Mirgal.</span>
                     </h1>
                     <p className="text-sm min-[400px]:text-base sm:text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-xl border-l-[1px] sm:border-l-2 border-white/10 pl-4 sm:pl-6 border-l-[#D4AF37]/30">
                       I engineer high-performance systems. From pixel-perfect React interfaces to robust Node.js architectures and deep-learning pipelines, I own the entire product lifecycle from <span className="text-white">0 to production</span>.
                     </p>
                     
                     <div className="flex gap-4 sm:gap-6 pt-2 sm:pt-4">
                       <a href="#projects" className="relative group px-6 py-4 sm:px-10 sm:py-5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:text-black font-display font-bold uppercase tracking-widest text-[10px] md:text-xs text-center overflow-hidden">
                          <div className="absolute inset-0 bg-[#D4AF37] w-0 group-hover:w-full transition-all duration-500 ease-out z-[-1]" />
                          Explore Core Data
                       </a>
                     </div>
                   </div>

                   {/* Holographic Neural Terminal */}
                   <div className="w-full lg:w-[40%] hidden lg:block">
                     <div className="bg-black/90 border border-white/5 p-6 shadow-[0_0_50px_rgba(212,175,55,0.05)] relative overflow-hidden ring-1 ring-white/10">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#F9A826] to-transparent opacity-50" />
                        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#F9A826] to-transparent opacity-50" />
                        
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10 border-dashed">
                           <Terminal size={14} className="text-[#D4AF37]" />
                           <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">sys/auth/session</span>
                        </div>
                        
                        <div className="font-mono text-[11px] leading-relaxed text-emerald-500 space-y-4">
                           <div><span className="text-white/40">tanmay@neural</span><span className="text-blue-500">:</span><span className="text-blue-400">~/prod</span>$ cat matrix_config.yml</div>
                           <div className="pl-4 border-l border-emerald-500/20 py-2">
                             <div className="mb-1"><span className="text-purple-400">user:</span></div>
                             &nbsp;&nbsp;<span className="text-blue-300">id:</span> <span className="text-[#D4AF37]">&quot;tanmay_mirgal&quot;</span><br />
                             &nbsp;&nbsp;<span className="text-blue-300">role:</span> <span className="text-white">&quot;Full-Stack Engineer &amp; AI Architect&quot;</span><br />
                             <div className="mt-2 mb-1"><span className="text-purple-400">arsenal:</span></div>
                             &nbsp;&nbsp;<span className="text-blue-300">frontend:</span> <span className="text-[#F9A826]">[React, Next.js, WebGL]</span><br />
                             &nbsp;&nbsp;<span className="text-blue-300">backend:</span> <span className="text-[#F9A826]">[Node.js, Express, Microservices]</span><br />
                             &nbsp;&nbsp;<span className="text-blue-300">ml_core:</span> <span className="text-[#F9A826]">[TensorFlow, OpenCV]</span><br />
                             &nbsp;&nbsp;<span className="text-blue-300">cloud:</span> <span className="text-[#F9A826]">[AWS, Docker, CI/CD]</span><br />
                           </div>
                           <div className="flex items-center gap-2">
                             <span className="animate-pulse w-2 h-3 bg-[#D4AF37] block" />
                           </div>
                        </div>
                     </div>
                   </div>
                </div>
             </HolographicNode>
          </section>

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
          </section>

          {/* HALL OF FAME */}
          <section id="achievements" className="py-24 md:py-32 pr-4 sm:pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <div className="mb-12 md:mb-16">
               <h2 className="text-[10px] md:text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">HALL_OF_FAME</h2>
               <p className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white max-w-2xl">Excellence certified by reality.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {achievementsData.map((a, i) => (
                   <HolographicNode key={i} id={`achv_node_${i}`}>
                      <div onClick={() => setSelectedAchievement(a)} className="group cursor-pointer block border border-white/10 bg-[#050505] p-2 hover:border-[#D4AF37]/50 transition-colors h-full flex flex-col">
                         <div className="relative aspect-[4/3] w-full overflow-hidden bg-black mb-6">
                            {a.type === 'pdf' ? (
                               <div className="w-full h-full flex items-center justify-center bg-white/5">
                                  <FileText size={48} className="text-[#D4AF37]/50 group-hover:text-[#D4AF37] transition-colors" />
                               </div>
                            ) : (
                               <Image src={a.url} alt={a.title} fill className="object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1s]" />
                            )}
                         </div>
                         <div className="p-4 sm:p-6 flex-1 flex flex-col">
                            <span className="font-mono text-[9px] min-[400px]:text-[10px] text-white/40 uppercase tracking-widest">{a.date} {"//"} {a.org}</span>
                            <h4 className="text-lg sm:text-xl font-display font-bold text-white mt-2 mb-3 group-hover:text-[#D4AF37] transition-colors">{a.title}</h4>
                            <p className="text-white/50 text-[11px] min-[400px]:text-xs sm:text-sm leading-relaxed font-light mt-auto">{a.desc}</p>
                         </div>
                      </div>
                   </HolographicNode>
                ))}
             </div>
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
    