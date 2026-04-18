import re

def create_neural_spine_page():
    with open('app/page.tsx.backup', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start of Home
    home_match = re.search(r'export default function Home\(\) \{', content)
    if not home_match:
        print("Error: Could not find Home function in backup.")
        return

    top_parts = content[:home_match.start()]
    
    # We must ensure useScroll, useTransform, useInView from framer-motion are imported.
    top_parts = top_parts.replace(
        'import { motion, AnimatePresence } from "framer-motion";',
        'import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";\nimport { useRef } from "react";'
    )

    new_home = """
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
      <div className="fixed left-6 md:left-12 lg:left-24 top-0 bottom-0 w-[1px] bg-white/5 z-[50]">
          {/* Active Liquid Gold flowing down */}
          <motion.div style={{ height: spineHeight, transformOrigin: "top" }} className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-[#F9A826] to-[#D4AF37] shadow-[0_0_15px_#D4AF37]" />
          
          {/* Node trackers */}
          {["home", "capabilities", "stack", "projects", "freelance", "achievements", "contact"].map((id, i) => (
             <div 
                key={id} 
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-[#D4AF37] transition-all duration-700 shadow-[0_0_15px_#D4AF37] ${activeSection === id ? 'bg-[#F9A826] scale-150' : 'bg-black scale-100'}`}
                style={{ top: `${(i + 1) * 12.5}%` }}
             >
                <div className={`absolute top-1/2 left-4 -translate-y-1/2 text-[9px] font-mono tracking-widest uppercase transition-opacity duration-500 ${activeSection === id ? 'opacity-100 text-[#D4AF37]' : 'opacity-0'}`}>
                   {id}
                </div>
             </div>
          ))}
      </div>

      <div className="relative z-10 w-full flex flex-col pl-16 md:pl-32 lg:pl-48">
          
          {/* HERO SECTION */}
          <section id="home" className="relative min-h-screen w-full flex items-center pr-6 md:pr-12 lg:pr-24 overflow-hidden py-32 lg:py-0">
             <HolographicNode id="home_node">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 w-full">
                   <div className="w-full lg:w-[60%] space-y-8">
                     <div className="inline-flex items-center gap-3 px-4 py-2 bg-black border border-[#D4AF37]/30 rounded-none text-xs font-mono text-[#D4AF37] uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                       <span className="w-1.5 h-1.5 bg-[#D4AF37] animate-pulse"></span> SYSTEM INITIATED
                     </div>
                     <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-display font-medium leading-[1] tracking-tighter">
                       Architecting <br/>
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F9A826] font-bold glitch-effect" data-text="Intelligence.">Intelligence.</span>
                     </h1>
                     <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-xl border-l-2 border-white/10 pl-6 border-l-[#D4AF37]/30">
                       I engineer high-performance systems. From pixel-perfect React interfaces to robust Node.js architectures and deep-learning pipelines, I own the entire product lifecycle from <span className="text-white">0 to production</span>.
                     </p>
                     
                     <div className="flex gap-6 pt-4">
                       <a href="#projects" className="relative group px-10 py-5 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:text-black font-display font-bold uppercase tracking-widest text-[10px] md:text-xs text-center overflow-hidden">
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
                             &nbsp;&nbsp;<span className="text-blue-300">id:</span> <span className="text-[#D4AF37]">"tanmay_mirgal"</span><br />
                             &nbsp;&nbsp;<span className="text-blue-300">role:</span> <span className="text-white">"Full-Stack Engineer & AI Architect"</span><br />
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
          <section id="capabilities" className="py-32 pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <div className="mb-16">
               <h2 className="text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">SYSTEM_CAPABILITIES</h2>
               <p className="text-4xl md:text-6xl font-display font-medium text-white max-w-2xl leading-tight">I engineer systems that <br/><span className="text-white/30 italic">dominate complexity.</span></p>
             </div>
             
             <div className="flex flex-col gap-12">
               {[
                 { title: "Full-Stack Ownership", desc: "Zero hand-holding required. I architect and engineer the entire MERN system—from responsive React & Next.js interfaces to secure backend Node.js APIs and complex MongoDB aggregations.", icon: <Layers className="text-[#D4AF37]" size={36}/> },
                 { title: "Machine Learning / Vision", desc: "Deep Learning models, TensorFlow, and advanced OpenCV vision layers seamlessly integrated into scalable APIs for real-time computer vision processing.", icon: <Cpu className="text-emerald-500" size={36}/> },
                 { title: "Cloud Ops. & CI/CD", desc: "Rigorous automated deployment pipelines built on AWS architecture, using Docker containers and Nginx reverse proxies for maximum uptime.", icon: <Cloud className="text-blue-500" size={36}/> },
                 { title: "Fast Production Delivery", desc: "I ship highly scalable, performance-driven web products blazingly fast without ever compromising code quality, security, or clean architecture patterns.", icon: <Zap className="text-[#F9A826]" size={36}/> },
               ].map((c, i) => (
                 <HolographicNode key={i} id={`cap_node_${i}`}>
                    <div className="bg-[#050505] p-10 lg:p-14 border border-white/5 flex flex-col md:flex-row gap-8 items-start group hover:border-[#D4AF37]/30 transition-all duration-700 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-8 text-[200px] text-white/[0.02] font-black leading-none pointer-events-none font-mono -translate-y-1/4 translate-x-1/4">0{i+1}</div>
                       <div className="p-5 border border-white/10 bg-black shadow-[rgba(212,175,55,0.1)_0px_0px_20px] group-hover:scale-110 transition-transform">
                          {c.icon}
                       </div>
                       <div className="relative z-10 max-w-xl">
                          <h3 className="text-3xl font-display font-bold text-white mb-4">{c.title}</h3>
                          <p className="text-white/50 text-lg leading-relaxed font-light">{c.desc}</p>
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
                   <div className="-ml-16 md:-ml-32 lg:-ml-48 scale-[0.8] md:scale-100 flex items-center justify-center pointer-events-auto w-screen">
                      <InteractiveNeuralGraph />
                   </div>
                </div>
             </HolographicNode>
          </section>

          {/* PROJECTS SECTION */}
          <section id="projects" className="py-32 pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <div className="mb-24">
               <h2 className="text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">DEPLOYED_MISSIONS</h2>
               <p className="text-4xl md:text-6xl font-display font-medium text-white max-w-2xl leading-tight">Featured Production Instances.</p>
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
                            <div className="flex flex-wrap gap-2 mb-6">
                               {p.tags.map(t => <span key={t} className="text-[10px] font-mono border border-white/20 bg-transparent text-white/50 px-3 py-1 uppercase tracking-widest">{t}</span>)}
                            </div>
                            <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                            <div className="w-8 h-[2px] bg-[#D4AF37] mb-6" />
                            <p className="text-white/60 text-lg leading-relaxed font-light mb-8">{p.desc}</p>
                            
                            <div className="mt-auto">
                               <button className="flex items-center gap-4 text-xs font-mono uppercase tracking-[0.2em] text-[#D4AF37] hover:text-white transition-colors">
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
          <section id="freelance" className="py-32 pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <HolographicNode id="freelance_node">
                <div className="bg-[#050505] border border-white/10 p-10 md:p-16">
                   <div className="mb-16">
                     <h2 className="text-xs font-mono text-emerald-500 tracking-[0.2em] uppercase mb-4 animate-pulse">STATUS: AVAILABLE FOR CONTRACTS</h2>
                     <p className="text-4xl md:text-5xl font-display font-medium text-white max-w-2xl">Freelance Cyber Services</p>
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
                         <div key={i} className="flex gap-6 border-b border-white/5 pb-8 group hover:border-[#D4AF37]/50 transition-colors">
                            <span className="text-white/20 font-mono text-xl mt-1">.0{i+1}</span>
                            <div>
                               <h3 className="text-xl font-display font-medium text-white mb-2 group-hover:text-[#D4AF37]">{srv.title}</h3>
                               <p className="text-white/40 font-mono text-[10px] tracking-widest uppercase mb-4">{srv.tech}</p>
                               <span className="text-[10px] font-mono text-black bg-[#D4AF37] px-2 py-1 font-bold">ETA: {srv.time}</span>
                            </div>
                         </div>
                      ))}
                   </div>
                </div>
             </HolographicNode>
          </section>

          {/* HALL OF FAME */}
          <section id="achievements" className="py-32 pr-6 md:pr-12 lg:pr-24 z-10 relative">
             <div className="mb-16">
               <h2 className="text-sm font-mono text-[#D4AF37] tracking-[0.3em] uppercase mb-4">HALL_OF_FAME</h2>
               <p className="text-4xl md:text-5xl font-display font-medium text-white max-w-2xl">Excellence certified by reality.</p>
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
                         <div className="p-4 flex-1 flex flex-col">
                            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{a.date} // {a.org}</span>
                            <h4 className="text-xl font-display font-bold text-white mt-2 mb-4 group-hover:text-[#D4AF37] transition-colors">{a.title}</h4>
                            <p className="text-white/50 text-sm leading-relaxed font-light mt-auto">{a.desc}</p>
                         </div>
                      </div>
                   </HolographicNode>
                ))}
             </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-40 pr-6 md:pr-12 lg:pr-24 z-10 relative text-center flex justify-center">
             <HolographicNode id="contact_node">
                 <div className="border-y border-white/10 py-24 w-full relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#D4AF37] to-transparent -translate-y-full" />
                    
                    <h2 className="text-6xl md:text-[8rem] font-display font-black leading-none mb-10 tracking-tighter hover:text-[#D4AF37] transition-colors cursor-default">
                       EXECUTE
                    </h2>
                    <p className="text-xl text-white/50 font-light mb-12 max-w-lg mx-auto">
                       I am ready to architect your next high-performance enterprise system.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                       <a href="mailto:tanmaymirgal26@gmail.com" className="px-12 py-5 bg-[#D4AF37] text-black font-mono font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:shadow-[0_0_30px_white] transition-all">Establish Connection</a>
                       <div className="flex gap-4">
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
              <div className="p-10 space-y-8 relative">
                <div className="absolute top-0 right-10 w-[1px] h-full bg-white/5" />
                <div>
                  <h4 className="text-xs font-mono text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#D4AF37] animate-pulse" /> Mission Brief</h4>
                  <p className="text-white/70 text-lg leading-relaxed font-light max-w-3xl">{selectedProject.fullDesc}</p>
                </div>
                <div className="pt-8 flex gap-4 border-t border-white/5">
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" className="px-8 py-4 bg-white/5 text-white border border-white/20 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-3">
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
                <p className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-[0.2em] mb-2">{selectedAchievement.org} // {selectedAchievement.date}</p>
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
const HolographicNode = ({ children, id, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div ref={ref} className="relative w-full">
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
    """

    with open('app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(top_parts + new_home)

if __name__ == '__main__':
    create_neural_spine_page()
