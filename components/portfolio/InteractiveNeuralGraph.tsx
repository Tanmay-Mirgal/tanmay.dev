"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Cpu, Database, Cloud } from "lucide-react";

export const InteractiveNeuralGraph = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.1 });
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
    <div ref={containerRef} className="w-full max-w-6xl mx-auto py-2 md:py-4 relative flex flex-col justify-center items-center px-4 overflow-hidden z-10">
       
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
                      {isActive && isInView && <animate attributeName="stroke-dasharray" values="10, 10; 50, 10" dur="2s" repeatCount="indefinite" />}
                   </line>
                   
                   {/* Continuous Synapse Data pulse dots */}
                   {isInView && (
                      <circle r={isActive ? "4" : "2"} fill={node.color} filter={`drop-shadow(0 0 ${isActive ? '10px' : '4px'} ${node.color})`}>
                         <animate attributeName="cx" values={`50%;${node.x}%`} dur="2s" begin={`${offsetTime}s`} repeatCount="indefinite" />
                         <animate attributeName="cy" values={`50%;${node.y}%`} dur="2s" begin={`${offsetTime}s`} repeatCount="indefinite" />
                         <animate attributeName="opacity" values="0;1;0" dur="2s" begin={`${offsetTime}s`} repeatCount="indefinite" />
                      </circle>
                   )}
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
                  {isInView && (
                    <circle r={isActive ? "2.5" : "1.5"} fill={tech.color} filter={isActive ? `drop-shadow(0 0 4px ${tech.color})` : 'none'}>
                        <animate attributeName="cx" values={`${parent.x}%;${tech.x}%`} dur={`${tech.dur}s`} begin={`${offsetTime}s`} repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${parent.y}%;${tech.y}%`} dur={`${tech.dur}s`} begin={`${offsetTime}s`} repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;0" dur={`${tech.dur}s`} begin={`${offsetTime}s`} repeatCount="indefinite" />
                    </circle>
                  )}
                 </g>
               )
            })}
         </svg>

         {/* --- CENTRAL CORE ENGINE --- */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 min-[400px]:w-16 min-[400px]:h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32">
            <motion.div 
              className="w-full h-full glass-panel border border-[#D4AF37]/50 rounded-full flex flex-col items-center justify-center cursor-pointer shadow-[0_0_50px_rgba(212,175,55,0.5)] backdrop-blur-3xl overflow-hidden group"
              animate={isInView ? { boxShadow: ["0 0 30px rgba(212,175,55,0.4)", "0 0 100px rgba(212,175,55,1)", "0 0 30px rgba(212,175,55,0.4)"] } : {}}
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
                   animate={isInView ? { y: [0, (i % 2 === 0) ? -3 : 3, 0] } : {}}
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
              </div>
            )
         })}
       </div>
    </div>
  );
};
