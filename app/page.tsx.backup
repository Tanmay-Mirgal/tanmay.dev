"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Code, Layers, Cpu, Database, Eye, X, FileText, Trophy, Terminal, Zap, GitBranch, Cloud } from "lucide-react";

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
       <div className="relative w-[320px] h-[320px] sm:w-[450px] sm:h-[450px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] bg-transparent mt-0">
         
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
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32">
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
                 className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-2xl shadow-2xl relative ${activeNode && activeNode !== node.id ? 'opacity-20 scale-90' : 'opacity-100 z-40'}`}
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

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll("section").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black">
      <GlassCursor />
      <AmbientBackground />

      {/* Achievement Modal Viewer */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl"
          >
            <button 
              onClick={() => setSelectedAchievement(null)} 
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-[#D4AF37] transition-all z-[1001] bg-black/50 p-2 rounded-full backdrop-blur-md"
            >
              <X size={28} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} 
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video glass-panel rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] border-[#D4AF37]/20 flex flex-col"
            >
              <div className="relative flex-1 overflow-hidden bg-white/5">
                {selectedAchievement.type === 'pdf' ? (
                  <iframe src={selectedAchievement.url} className="w-full h-full border-none bg-white" title={selectedAchievement.title} />
                ) : (
                  <Image src={selectedAchievement.url} alt={selectedAchievement.title} fill className="object-contain p-4 md:p-8" />
                )}
              </div>
              <div className="p-6 md:p-10 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80 border-t border-white/5">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{selectedAchievement.title}</h3>
                <p className="text-[#D4AF37] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-4">{selectedAchievement.org} • {selectedAchievement.date}</p>
                <p className="text-white/60 text-sm md:text-base font-light">{selectedAchievement.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Modal Viewer */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="absolute inset-0 min-h-screen" onClick={() => setSelectedProject(null)} />
            <button 
              onClick={() => setSelectedProject(null)} 
              className="fixed top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-[#D4AF37] transition-all z-[1001] bg-black/50 p-2 rounded-full backdrop-blur-md"
            >
              <X size={28} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} 
              className="relative w-full max-w-4xl glass-panel rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] border-[#D4AF37]/20 flex flex-col z-10 my-auto"
            >
              <div className="relative w-full h-[200px] md:h-[350px] bg-black border-b border-white/10">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 font-display">
                  <h3 className="text-3xl md:text-5xl font-bold text-white mb-4">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="text-[10px] md:text-xs font-mono px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-10 bg-[#0A0A0A] space-y-8">
                <div>
                  <h4 className="text-lg font-mono text-white/40 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Mission Brief</h4>
                  <p className="text-white/80 text-base md:text-lg leading-relaxed font-light">{selectedProject.fullDesc}</p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#F9A826] transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    <Github size={16} /> Access Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation (Responsive) */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}
        className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] glass-nav px-6 py-4 rounded-full flex items-center gap-4 md:gap-8 text-[9px] md:text-[10px] font-mono uppercase tracking-widest md:tracking-[0.2em] max-w-[90vw] overflow-x-auto hide-scrollbar whitespace-nowrap"
      >
        {["home", "capabilities", "stack", "projects", "freelance", "contact"].map(id => (
          <a 
            key={id} 
            href={`#${id}`} 
            className={`transition-all duration-300 hover:text-[#D4AF37] shrink-0 ${activeSection === id ? "text-[#D4AF37]" : "text-white/40"}`}
          >
            {id}
          </a>
        ))}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 overflow-hidden z-10 pt-32 lg:pt-0 gap-12 lg:gap-16">
        <div className="text-center lg:text-left space-y-6 md:space-y-8 z-10 w-full lg:w-1/2 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full text-[10px] md:text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2 md:mb-4">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]"></span>
            System Online
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-display font-bold leading-[1.05] tracking-tighter"
          >
            Architecting <br/>
            <span className="accent-gradient">Intelligence.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-xl font-light mx-auto lg:mx-0 leading-relaxed"
          >
            I engineer high-performance systems. From pixel-perfect React interfaces to robust Node.js architectures and deep-learning pipelines, I own the entire product lifecycle from <span className="text-white font-medium">0 to production</span>.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 pt-4 md:pt-8"
          >
            <a href="#projects" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-[#D4AF37] to-[#F9A826] text-[#050505] font-display font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)] text-center">
              Explore Core
            </a>
            <a href="#contact" className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 glass-panel text-white font-display font-medium uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:bg-white/10 transition-colors text-center">
              Initialize Contact
            </a>
          </motion.div>
        </div>

        {/* Global Terminal UI */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }} className="hidden lg:block w-1/2 z-10">
          <div className="relative glass-panel p-1 border border-[#D4AF37]/20 rounded-[2rem] overflow-hidden lg:translate-x-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.02] to-transparent pointer-events-none" />
            <div className="bg-[#0A0A0A]/80 backdrop-blur-3xl rounded-[1.8rem] p-8 h-full flex flex-col border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">sys/auth/session</span>
                <Terminal size={14} className="text-white/30" />
              </div>
              <div className="font-mono text-xs md:text-[13px] leading-snug space-y-3">
                <div className="text-white/40"><span className="text-[#D4AF37]">tanmay@neural-core</span>:<span className="text-blue-400">~/production</span>$ cat profile.config.yml</div>

                {/* Detailed YAML Profile Dump */}
                <div className="text-white/80 p-5 border border-white/10 rounded-xl bg-[#050505]/95 mt-4 font-mono text-[10px] xl:text-[11px] leading-relaxed overflow-x-auto shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative group">
                   <div className="absolute top-3 right-4 text-white/20 select-none text-[9px] tracking-widest font-bold">YAML</div>
                   <div className="mb-1"><span className="text-emerald-400">user</span>:</div>
                   &nbsp;&nbsp;<span className="text-blue-400">id</span>: <span className="text-[#D4AF37]">&quot;tanmay_mirgal&quot;</span><br />
                   &nbsp;&nbsp;<span className="text-blue-400">role</span>: <span className="text-white">&quot;Full-Stack Engineer & AI Architect&quot;</span><br />
                   &nbsp;&nbsp;<span className="text-blue-400">mission</span>: <span className="text-white">&quot;Shipping robust software blazingly fast.&quot;</span><br />

                   <div className="mt-3 mb-1"><span className="text-emerald-400">technical_arsenal</span>:</div>
                   &nbsp;&nbsp;<span className="text-blue-400">frontend</span>: <span className="text-white/60">[React, Next.js, Framer Motion, Tailwind]</span><br />
                   &nbsp;&nbsp;<span className="text-blue-400">backend</span>: <span className="text-white/60">[Node.js, Express, Microservices, REST]</span><br />
                   &nbsp;&nbsp;<span className="text-blue-400">database</span>: <span className="text-white/60">[MongoDB, PostgreSQL, Redis, VectorDB]</span><br />
                   &nbsp;&nbsp;<span className="text-blue-400">machine_learning</span>: <span className="text-white/60">[TensorFlow, OpenCV, Deep Learning]</span><br />
                   &nbsp;&nbsp;<span className="text-blue-400">infrastructure</span>: <span className="text-white/60">[AWS, Docker, CI/CD, Nginx]</span><br />

                   <div className="mt-3 mb-1"><span className="text-emerald-400">system_status</span>:</div>
                   &nbsp;&nbsp;<span className="text-blue-400">status</span>: <span className="text-emerald-400">&quot;ONLINE&quot;</span><br />
                   &nbsp;&nbsp;<span className="text-blue-400">available_for_hire</span>: <span className="text-red-400">true</span><br />
                </div>

                <div className="text-emerald-400 mt-5 flex items-center gap-2 font-mono text-[10px] md:text-xs font-bold pt-2">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399] shrink-0"/> 
                   <span>PORT 8080 Active. Awaiting commands...</span>
                   <span className="animate-pulse w-2 h-3.5 bg-white inline-block relative top-px shrink-0"></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Capabilities Section */}
      <section id="capabilities" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 z-10 relative">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-4 md:mb-6">Why Hire Me?</h2>
            <p className="text-white/50 text-base md:text-lg">I build full-stack products from 0 to production and ML/DL pipelines that actually work.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[auto] lg:auto-rows-[280px]">
            {/* Box 1 (Full Stack) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: 0.1, duration: 0.5 }}
               className="glass-panel p-8 md:p-10 rounded-[2rem] sm:col-span-2 lg:col-span-2 relative overflow-hidden group border border-white/5 hover:border-[#D4AF37]/30 flex flex-col justify-center"
            >
               <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-[#D4AF37]/20 transition-colors duration-700" />
               <Layers size={32} className="text-[#D4AF37] mb-4 md:mb-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
               <div className="z-10">
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 md:mb-4">Full-Stack Ownership</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed lg:w-[80%] font-light">Zero hand-holding required. I architect and engineer the entire MERN system—from responsive React & Next.js interfaces to secure backend Node.js APIs and complex MongoDB aggregations.</p>
               </div>
            </motion.div>

            {/* Box 2 (AI/ML) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: 0.2, duration: 0.5 }}
               className="glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group border border-white/5 hover:border-emerald-500/30 flex flex-col justify-end"
            >
               <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
               <Cpu size={32} className="text-emerald-400 absolute top-8 right-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
               <div className="z-10 mt-16 lg:mt-0">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Machine Learning</h3>
                  <p className="text-white/50 text-sm leading-relaxed font-light">Deep Learning models, TensorFlow, and advanced OpenCV vision layers seamlessly integrated into scalable APIs.</p>
               </div>
            </motion.div>

            {/* Box 3 (Cloud DevOps) - Row Span 2 on LG */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: 0.3, duration: 0.5 }}
               className="glass-panel p-8 md:p-10 rounded-[2rem] lg:row-span-2 relative overflow-hidden group border border-white/5 hover:border-blue-500/30 flex flex-col"
            >
               <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
               <Cloud size={36} className="text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] group-hover:-translate-y-2 transition-transform duration-500" />
               <div className="z-10">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Cloud Ops & CI/CD</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">Rigorous automated deployment pipelines built on AWS architecture, using Docker containers and Nginx reverse proxies for maximum uptime.</p>
               </div>
               
               <div className="hidden sm:block mt-auto w-full rounded-xl bg-[#030303] border border-white/10 p-4 font-mono text-[10px] md:text-xs text-green-400 shadow-inner overflow-hidden relative group-hover:border-blue-500/30 transition-colors duration-500">
                  <div className="flex gap-1.5 mb-3"><div className="w-2.5 h-2.5 rounded-full bg-red-500/80"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/80"/></div>
                  <div className="opacity-80"><span className="text-blue-400 font-bold">~</span> <span className="text-white">docker</span> build -t core-api .</div>
                  <div className="opacity-50 mt-1">[+] Building 14.3s (22/22) RUN IDE</div>
                  <div className="opacity-80 mt-2 hover:bg-white/5 p-1 -ml-1 rounded transition-colors cursor-text"><span className="text-blue-400 font-bold">~</span> <span className="text-white">docker</span> run -d -p 80:80 core-api</div>
                  <div className="opacity-40 animate-pulse mt-2">_</div>
               </div>
            </motion.div>

            {/* Box 4 (Fast Delivery) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: 0.4, duration: 0.5 }}
               className="glass-panel p-8 md:p-10 rounded-[2rem] sm:col-span-2 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 group border border-white/5 hover:border-[#F9A826]/30 overflow-hidden relative"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-[#F9A826]/5 to-transparent pointer-events-none" />
               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#F9A826]/20 group-hover:border-[#F9A826]/50 transition-all duration-500 shadow-[0_0_30px_rgba(249,168,38,0.1)]">
                  <Zap size={28} className="text-[#F9A826] group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(249,168,38,0.5)]" />
               </div>
               <div className="z-10 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Fast Production Delivery</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">I ship highly scalable, performance-driven web products blazingly fast without ever compromising code quality, security, or clean architecture patterns.</p>
               </div>
            </motion.div>

            {/* Box 5 (Open Source) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: 0.5, duration: 0.5 }}
               className="glass-panel p-8 md:p-10 rounded-[2rem] sm:col-span-2 lg:col-span-2 flex flex-col sm:flex-row-reverse items-center justify-between gap-6 sm:gap-10 group border border-white/5 hover:border-[#D4AF37]/30 overflow-hidden relative"
            >
               <div className="absolute top-0 right-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
               <Github size={48} className="text-white/20 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0" />
               <div className="z-10 text-center sm:text-left">
                  <h3 className="text-xl md:text-2xl font-display font-bold text-[#D4AF37] mb-2">Open Source Contributor</h3>
                  <p className="text-white/50 text-sm md:text-base leading-relaxed max-w-lg font-light">Active contributor and firm believer in building in public. Code naturally evaluated and peer-reviewed by the community to ensure absolute top-tier standard integration.</p>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Tech Architecture Graph */}
      <section id="stack" className="py-12 md:py-16 px-6 md:px-12 lg:px-24 z-10 relative overflow-hidden">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6 }} className="max-w-7xl mx-auto space-y-6 md:space-y-8 text-center">
          <div className="space-y-4 relative z-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient">System Architecture</h2>
            <p className="text-white/50 text-base md:text-lg">Interactive node graph of my complete technology stack.</p>
          </div>
          
          <InteractiveNeuralGraph />
        </motion.div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 z-10 relative">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto space-y-12 md:space-y-16">
          <div className="text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-4">Featured Projects</h2>
            <p className="text-white/50">⭐ Real-world projects — not tutorials, not clones.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projectsData.map((p, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.6, delay: i * 0.1 }}
                key={i} 
                onClick={() => setSelectedProject(p)}
                className="group glass-panel p-8 md:p-10 rounded-[2rem] flex flex-col justify-between hover:-translate-y-2 transition-transform duration-500 cursor-pointer border border-white/5 hover:border-[#D4AF37]/30"
              >
                <div className="space-y-6 md:space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="p-3 md:p-4 rounded-2xl bg-[#D4AF37]/10 text-[#D4AF37]"><GitBranch size={24} className="md:w-8 md:h-8" /></div>
                    <div className="flex flex-wrap justify-end gap-2 max-w-[70%]">
                      {p.tags.slice(0, 3).map(t => <span key={t} className="text-[9px] md:text-[10px] font-mono text-[#D4AF37] bg-white/5 px-2 py-1 md:px-3 md:py-1 rounded-full border border-[#D4AF37]/20 whitespace-nowrap">{t}</span>)}
                      {p.tags.length > 3 && <span className="text-[9px] md:text-[10px] font-mono text-white/40 bg-white/5 px-2 py-1 rounded-full border border-white/10">+{p.tags.length - 3}</span>}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 md:mb-4">{p.title}</h4>
                    <p className="text-white/50 leading-relaxed font-light text-sm md:text-base">{p.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 md:pt-8 mt-4 border-t border-white/5">
                  <span className="flex items-center gap-2 text-xs md:text-sm font-display font-medium text-white/40 group-hover:text-[#D4AF37] transition-colors">
                    <Eye size={16} /> View Documentation
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Tanmay Mirgal",
            "url": "https://tanmay-dev-81mf.vercel.app/",
            "jobTitle": "AI & Full-Stack Architect",
            "sameAs": [
              "https://github.com/Tanmay-Mirgal",
              "https://www.linkedin.com/in/tanmay-mirgal-1402792a2/"
            ],
            "description": "Tanmay Mirgal is an AI & Full-Stack Architect specializing in high-performance systems, deep learning pipelines, and React/Next.js interfaces."
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Tanmay Mirgal Portfolio",
            "url": "https://tanmay-dev-81mf.vercel.app/",
            "description": "Architecting Intelligence - High-performance systems and AI solutions by Tanmay Mirgal."
          })
        }}
      />

      <section id="freelance" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 z-10 relative">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto space-y-12 mb-10 md:mb-16">
          <div className="text-center space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient">Freelance Services</h2>
            <p className="text-[#D4AF37] font-mono text-[10px] md:text-sm tracking-widest uppercase flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span> Available for Hire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: "Full-Stack Web App", tech: "React, Next.js, Node, MongoDB", time: "2–4 Weeks", icon: <Layers size={24} className="text-[#D4AF37]"/> },
              { title: "ML Model + API", tech: "Python, TensorFlow, FastAPI", time: "1–3 Weeks", icon: <Cpu size={24} className="text-emerald-400"/> },
              { title: "Computer Vision", tech: "OpenCV, TensorFlow, Python", time: "2–3 Weeks", icon: <Eye size={24} className="text-blue-400"/> },
              { title: "Cloud Ops. CI/CD", tech: "AWS, Docker, Nginx, CI/CD", time: "3–7 Days", icon: <Cloud size={24} className="text-[#38BDF8]"/> },
              { title: "Robust Backend API", tech: "Node.js, Express, PostgreSQL", time: "1–2 Weeks", icon: <Database size={24} className="text-[#F9A826]"/> },
              { title: "System Code Review", tech: "Any Major Tech Stack", time: "1–2 Days", icon: <Code size={24} className="text-white/70"/> }
            ].map((srv, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative glass-panel p-5 md:p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300 border border-white/5 hover:border-[#D4AF37]/50 overflow-hidden cursor-pointer backdrop-blur-2xl bg-[#0A0A0A]/40 flex flex-col justify-between min-h-[160px]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/0 via-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                
                {/* Top: Icon + Timeline */}
                <div className="flex items-start justify-between relative z-10 mb-4">
                   <div className="p-3 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/20 transition-all">
                      {srv.icon}
                   </div>
                   <div className="flex flex-col items-end">
                      <span className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-[0.2em] mb-1">Timeline</span>
                      <span className="text-[#D4AF37] font-mono font-bold text-xs md:text-sm group-hover:text-white transition-colors border border-[#D4AF37]/20 bg-[#D4AF37]/5 pt-[2px] pb-[1px] md:pt-[3px] rounded-full px-3">{srv.time}</span>
                   </div>
                </div>
                
                {/* Bottom: Texts */}
                <div className="relative z-10">
                   <h3 className="text-lg md:text-xl font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-2">{srv.title}</h3>
                   <p className="text-white/40 font-mono text-[9px] md:text-[10px] tracking-widest line-clamp-2 md:leading-relaxed">{srv.tech}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-white/40 text-xs md:text-sm pt-8">💬 Need a custom enterprise architecture? Let&apos;s talk.</p>
        </motion.div>
      </section>

      {/* Hall of Fame (Gallery) */}
      <section id="achievements" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 z-10 relative">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.8 }} className="max-w-7xl mx-auto space-y-12 md:space-y-16 text-center">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient">Hall of Fame</h2>
            <p className="text-white/50 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed">Proof of technical excellence, awards, and industry-standard certifications.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-left">
            {achievementsData.map((a, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i} 
                onClick={() => setSelectedAchievement(a)}
                className="group glass-panel rounded-[1.5rem] md:rounded-[2rem] flex flex-col overflow-hidden border border-white/5 hover:border-[#D4AF37]/30 transition-colors duration-500 cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.02] border-b border-white/5">
                  {a.type === 'pdf' ? (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative z-10">
                      <FileText size={40} className="text-white/20 group-hover:text-[#D4AF37] transition-colors duration-500 md:w-12 md:h-12" />
                      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-white/30 px-4 text-center">Tap to View Certificate</span>
                    </div>
                  ) : (
                    <Image src={a.url} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-50 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal" />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] z-20">
                    <button className="p-3 md:p-4 rounded-2xl bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-90 group-hover:scale-100 transition-all backdrop-blur-md">
                      <Eye size={20} className="md:w-6 md:h-6" />
                    </button>
                  </div>
                </div>
                <div className="p-6 md:p-8 space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center text-white/30 border-b border-white/10 pb-4">
                    <Trophy size={16} className="group-hover:text-[#D4AF37] transition-colors duration-500 md:w-[18px] md:h-[18px]" />
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest px-2 py-1 md:px-3 md:py-1 bg-white/5 rounded-full">{a.date}</span>
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-display font-bold text-white mb-2">{a.title}</h4>
                    <p className="text-[#D4AF37] font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em]">{a.org}</p>
                  </div>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light line-clamp-2 md:line-clamp-none">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 z-10 relative">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 md:p-24 rounded-[2rem] md:rounded-[3rem] text-center relative overflow-hidden group border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-colors duration-500">
          <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/5 to-transparent pointer-events-none" />
          <div className="space-y-8 md:space-y-12 relative z-10">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold">Initialize <br className="sm:hidden" /><span className="accent-gradient">Handshake.</span></h2>
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/50 font-light leading-relaxed">
              Ready to engineer the next generation of scalable architectures. My inbox is open for strategic collaborations and engineering roles.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 pt-4 md:pt-8 w-full">
              <a href="mailto:tanmaymirgal26@gmail.com" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-[#D4AF37] to-[#F9A826] text-[#0A0A0A] font-display font-bold uppercase tracking-widest text-[10px] md:text-xs rounded-full hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3">
                <Mail size={18} /> Execute Email Routine
              </a>
            </div>
            
            <div className="flex justify-center gap-6 pt-4 border-t border-white/5 w-max mx-auto">
              <a href="https://github.com/Tanmay-Mirgal" target="_blank" rel="noreferrer" className="text-white/40 hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/tanmay-mirgal-1402792a2/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#0A66C2] transition-colors"><Linkedin size={24} /></a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-8 md:py-12 text-center border-t border-white/5 px-6">
        <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/30">
          &copy; {new Date().getFullYear()} Tanmay Mirgal. Designed in the Matrix.
        </p>
      </footer>

      {/* Global CSS for hiding scrollbars on specific elements */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
