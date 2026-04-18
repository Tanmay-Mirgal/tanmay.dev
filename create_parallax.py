import re

def create_parallax_page():
    with open('app/page.tsx.backup', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the start of Home
    home_match = re.search(r'export default function Home\(\) \{', content)
    if not home_match:
        print("Error: Could not find Home function in backup.")
        return

    top_parts = content[:home_match.start()]
    
    # We must ensure useScroll, useTransform, useRef are imported.
    top_parts = top_parts.replace(
        'import { motion, AnimatePresence } from "framer-motion";',
        'import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";\nimport { useRef } from "react";'
    )

    new_home = """
export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Global Parallax Control
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100, mass: 0.5 });
  
  // Parallax Values mapped from global scroll
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const heroY = useTransform(smoothProgress, [0, 0.2], ["0%", "25%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const heroTerminalY = useTransform(smoothProgress, [0, 0.3], ["0%", "-30%"]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-hidden bg-[#030303]">
      <GlassCursor />
      
      {/* Intense Ambient Parallax Background */}
      <motion.div style={{ y: bgY }} className="fixed inset-0 z-0 pointer-events-none">
         <AmbientBackground />
      </motion.div>

      {/* Floating Navigation (Original content maintained) */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}
        className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] glass-nav px-6 py-4 rounded-full flex items-center gap-4 md:gap-8 text-[9px] md:text-[10px] font-mono uppercase tracking-widest md:tracking-[0.2em] max-w-[90vw] overflow-x-auto hide-scrollbar whitespace-nowrap shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-[32px] border-white/10"
      >
        {["home", "capabilities", "stack", "projects", "freelance", "contact"].map(id => (
          <a key={id} href={`#${id}`} className={`transition-all duration-300 hover:text-[#D4AF37] shrink-0 ${activeSection === id ? "text-[#D4AF37]" : "text-white/40"}`}>
            {id}
          </a>
        ))}
      </motion.nav>

      <div className="relative z-10 w-full flex flex-col items-center">
          {/* HERO SECTION - with extreme floating parallax terminal */}
          <section id="home" className="relative min-h-screen w-full flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 overflow-hidden pt-32 lg:pt-0 gap-12 lg:gap-16">
            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center lg:text-left space-y-6 md:space-y-8 z-10 w-full lg:w-1/2 max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="inline-flex items-center gap-3 px-4 py-2 glass-panel rounded-full text-[10px] md:text-xs font-mono text-[#D4AF37] uppercase tracking-widest mb-2 shadow-[0_0_20px_rgba(212,175,55,0.15)] border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]"></span>
                System Online
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-display font-medium leading-[1.05] tracking-tighter"
              >
                Architecting <br/>
                <span className="accent-gradient font-black">Intelligence.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl md:text-2xl text-white/50 max-w-xl font-light mx-auto lg:mx-0 leading-relaxed"
              >
                I engineer high-performance systems. From pixel-perfect React interfaces to robust Node.js architectures and deep-learning pipelines, I own the entire product lifecycle from <span className="text-white font-medium">0 to production</span>.
              </motion.p>
            </motion.div>

            {/* Original Terminal UI with heavy Parallax */}
            <motion.div style={{ y: heroTerminalY }} className="hidden lg:block w-1/2 z-20">
              <div ref={useRef(null)} className="perspective-[1000px] w-full">
                 <motion.div 
                    initial={{ opacity: 0, rotateX: 20, rotateY: -10, scale: 0.9 }} 
                    animate={{ opacity: 1, rotateX: 0, rotateY: 0, scale: 1 }} 
                    transition={{ duration: 1.5, delay: 0.5, type: "spring", stiffness: 30 }}
                    className="relative glass-panel p-1 border border-[#D4AF37]/20 rounded-[2rem] overflow-hidden lg:translate-x-8 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                 >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/[0.05] to-transparent pointer-events-none" />
                    <div className="bg-[#050505]/95 backdrop-blur-3xl rounded-[1.8rem] p-8 h-full flex flex-col border border-white/5 relative z-10">
                      <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-6">
                        <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest">sys/auth/session</span>
                        <Terminal size={14} className="text-white/30" />
                      </div>
                      <div className="font-mono text-[13px] leading-snug space-y-3">
                        <div className="text-white/40"><span className="text-[#D4AF37]">tanmay@neural-core</span>:<span className="text-blue-400">~/production</span>$ cat profile.config.yml</div>
                        <div className="text-white/80 p-5 border border-white/10 rounded-xl bg-[#030303] mt-4 font-mono text-[11px] leading-relaxed shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative">
                          <div className="mb-1"><span className="text-emerald-400">user</span>:</div>
                          &nbsp;&nbsp;<span className="text-blue-400">id</span>: <span className="text-[#D4AF37]">&quot;tanmay_mirgal&quot;</span><br />
                          &nbsp;&nbsp;<span className="text-blue-400">role</span>: <span className="text-white">&quot;Full-Stack Engineer & AI Architect&quot;</span><br />
                          <div className="mt-3 mb-1"><span className="text-emerald-400">technical_arsenal</span>:</div>
                          &nbsp;&nbsp;<span className="text-blue-400">frontend</span>: <span className="text-white/60">[React, Next.js, Framer Motion, Tailwind]</span><br />
                          &nbsp;&nbsp;<span className="text-blue-400">backend</span>: <span className="text-white/60">[Node.js, Express, Microservices]</span><br />
                          &nbsp;&nbsp;<span className="text-blue-400">machine_learning</span>: <span className="text-white/60">[TensorFlow, OpenCV, Deep Learning]</span><br />
                          &nbsp;&nbsp;<span className="text-blue-400">infrastructure</span>: <span className="text-white/60">[AWS, Docker, CI/CD, Nginx]</span><br />
                        </div>
                        <div className="text-emerald-400 mt-5 flex items-center gap-2 font-mono text-xs font-bold pt-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#34d399] shrink-0"/> 
                          <span>PORT 8080 Active. Awaiting commands...</span>
                          <span className="animate-pulse w-2 h-3.5 bg-white inline-block relative top-px shrink-0"></span>
                        </div>
                      </div>
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          </section>

          {/* CAPABILITIES SECTION - With extreme Parallax Grid */}
          <SectionWithParallax id="capabilities" title="Why Hire Me?" subtitle="I build full-stack products from 0 to production and ML/DL pipelines that actually work.">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-[auto]">
                <ParallaxCard speed={0.1} delay={0.1} className="sm:col-span-2 lg:col-span-2">
                   <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-[#D4AF37]/20 transition-colors duration-700" />
                   <Layers size={32} className="text-[#D4AF37] mb-6 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
                   <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Full-Stack Ownership</h3>
                   <p className="text-white/50 text-base leading-relaxed lg:w-[80%] font-light">Zero hand-holding required. I architect and engineer the entire MERN system—from responsive React & Next.js interfaces to secure backend Node.js APIs and complex MongoDB aggregations.</p>
                </ParallaxCard>

                <ParallaxCard speed={-0.1} delay={0.2} className="border-emerald-500/20 hover:border-emerald-500/40">
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                   <Cpu size={32} className="text-emerald-400 absolute top-8 right-8 group-hover:rotate-12 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                   <div className="mt-16 lg:mt-0 relative z-10">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Machine Learning</h3>
                      <p className="text-white/50 text-sm leading-relaxed font-light">Deep Learning models, TensorFlow, and advanced OpenCV vision layers seamlessly integrated into scalable APIs.</p>
                   </div>
                </ParallaxCard>

                <ParallaxCard speed={0.15} delay={0.3} className="lg:col-span-1 lg:row-span-2 border-blue-500/20 hover:border-blue-500/40 justify-start">
                   <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                   <Cloud size={36} className="text-blue-400 mb-6 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)] group-hover:-translate-y-2 transition-transform duration-500" />
                   <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Cloud Ops & CI/CD</h3>
                   <p className="text-white/50 text-sm leading-relaxed mb-6 font-light">Rigorous automated deployment pipelines built on AWS architecture, using Docker containers and Nginx reverse proxies for maximum uptime.</p>
                   <div className="hidden sm:block mt-auto w-full rounded-xl bg-[#030303] border border-white/10 p-4 font-mono text-[10px] md:text-xs text-green-400 shadow-[inset_0_0_20px_#000] relative">
                      <div className="flex gap-1.5 mb-3"><div className="w-2 rounded-full bg-red-500"/><div className="w-2 rounded-full bg-yellow-500"/><div className="w-2 rounded-full bg-green-500"/></div>
                      <div className="opacity-80"><span className="text-blue-400 font-bold">~</span> docker build -t core .</div>
                      <div className="opacity-50 mt-1">[+] Building 14.3s (22/22) RUN IDE</div>
                      <div className="opacity-40 animate-pulse mt-2">_</div>
                   </div>
                </ParallaxCard>

                <ParallaxCard speed={-0.05} delay={0.4} className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-6 border border-[#F9A826]/10 hover:border-[#F9A826]/30">
                   <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#F9A826]/20 transition-all shadow-[0_0_30px_rgba(249,168,38,0.1)]">
                      <Zap size={28} className="text-[#F9A826] group-hover:scale-125 transition-transform drop-shadow-[0_0_10px_rgba(249,168,38,0.5)]" />
                   </div>
                   <div className="text-center sm:text-left">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Fast Production Delivery</h3>
                      <p className="text-white/50 text-sm md:text-base leading-relaxed font-light">I ship highly scalable, performance-driven web products blazingly fast without ever compromising code quality or clean architecture.</p>
                   </div>
                </ParallaxCard>

                <ParallaxCard speed={0.1} delay={0.5} className="sm:col-span-2 lg:col-span-2 flex flex-col sm:flex-row-reverse items-center justify-between gap-6 sm:gap-10 border border-[#D4AF37]/10 hover:border-[#D4AF37]/30">
                   <Github size={48} className="text-white/20 group-hover:text-[#D4AF37] transition-colors duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] shrink-0" />
                   <div className="text-center sm:text-left">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-[#D4AF37] mb-2">Open Source Contributor</h3>
                      <p className="text-white/50 text-sm leading-relaxed max-w-lg font-light">Active contributor and firm believer in building in public. Code naturally evaluated and peer-reviewed by the community to ensure absolute top-tier standard integration.</p>
                   </div>
                </ParallaxCard>
              </div>
          </SectionWithParallax>

          {/* TECH ARCHITECTURE - InteractiveNeuralGraph preserved untouched */}
          <section id="stack" className="py-24 w-full px-6 lg:px-24 z-10 relative overflow-hidden">
             <div className="text-center space-y-4 mb-4 relative z-20">
                <h2 className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#F9A826]">System Architecture</h2>
                <p className="text-white/50 text-lg">Interactive node graph of my complete technology stack.</p>
             </div>
             <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ duration: 1 }}>
                <InteractiveNeuralGraph />
             </motion.div>
          </section>

          {/* PROJECTS SECTION - With intense Parallax Scroll Cards */}
          <section id="projects" className="py-24 w-full px-6 lg:px-24 z-10 relative">
             <div className="max-w-7xl mx-auto mb-16 text-center">
                 <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mb-4">Featured <span className="accent-gradient">Projects</span></h2>
                 <p className="text-white/50 font-light">⭐ Real-world projects — not tutorials, not clones.</p>
             </div>
             
             <div className="max-w-7xl mx-auto space-y-24">
                {projectsData.map((p, i) => (
                   <ProjectParallaxCard key={i} p={p} index={i} onClick={() => setSelectedProject(p)} />
                ))}
             </div>
          </section>

          {/* FREELANCE SERVICES */}
          <SectionWithParallax id="freelance" title="Freelance Services" subtitle="Available for Hire. End-to-end solutions.">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Full-Stack Web App", tech: "React, Next.js, Node, MongoDB", time: "2–4 Weeks", icon: <Layers size={24} className="text-[#D4AF37]"/>, s: 0.05 },
                  { title: "ML Model + API", tech: "Python, TensorFlow, FastAPI", time: "1–3 Weeks", icon: <Cpu size={24} className="text-emerald-400"/>, s: -0.05 },
                  { title: "Computer Vision", tech: "OpenCV, TensorFlow, Python", time: "2–3 Weeks", icon: <Eye size={24} className="text-blue-400"/>, s: 0.08 },
                  { title: "Cloud Ops. CI/CD", tech: "AWS, Docker, CI/CD", time: "3–7 Days", icon: <Cloud size={24} className="text-[#38BDF8]"/>, s: -0.08 },
                  { title: "Robust Backend API", tech: "Node.js, PostgreSQL", time: "1–2 Weeks", icon: <Database size={24} className="text-[#F9A826]"/>, s: 0.1 },
                  { title: "System Code Review", tech: "Any Major Tech Stack", time: "1–2 Days", icon: <Code size={24} className="text-white/70"/>, s: -0.1 }
                ].map((srv, i) => (
                    <ParallaxCard key={i} speed={srv.s} className="min-h-[200px] flex flex-col justify-between border-white/[0.05] hover:border-[#D4AF37]/50">
                       <div className="flex justify-between items-start">
                          <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-[#D4AF37]/10 transition-colors border border-white/5 group-hover:border-[#D4AF37]/30">
                             {srv.icon}
                          </div>
                          <span className="text-[#D4AF37] font-mono font-bold text-xs border border-[#D4AF37]/20 bg-[#D4AF37]/10 rounded-full px-3 py-1">{srv.time}</span>
                       </div>
                       <div className="mt-8">
                          <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">{srv.title}</h3>
                          <p className="text-white/40 font-mono text-[10px] tracking-widest">{srv.tech}</p>
                       </div>
                    </ParallaxCard>
                ))}
             </div>
          </SectionWithParallax>

          {/* HALL OF FAME */}
          <SectionWithParallax id="achievements" title="Hall of Fame" subtitle="Proof of technical excellence, awards, and certifications.">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {achievementsData.map((a, i) => (
                    <ParallaxCard key={i} speed={(i % 2 === 0 ? 0.08 : -0.08)} className="p-0 border-white/10 hover:border-[#D4AF37]/40 cursor-pointer overflow-hidden block" delay={0}>
                       <div onClick={() => setSelectedAchievement(a)}>
                         <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50 border-b border-white/5">
                            {a.type === 'pdf' ? (
                               <div className="w-full h-full flex items-center justify-center">
                                  <FileText size={48} className="text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                               </div>
                            ) : (
                               <Image src={a.url} alt={a.title} fill className="object-cover opacity-50 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-110 group-hover:opacity-100 transition-all duration-[1s]" />
                            )}
                         </div>
                         <div className="p-8">
                            <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-2 py-1 rounded inline-block mb-3">{a.date}</span>
                            <h4 className="text-xl font-display font-bold text-white mb-1 group-hover:text-white transition-colors">{a.title}</h4>
                            <p className="text-[#D4AF37]/60 font-mono text-[10px] uppercase tracking-widest">{a.org}</p>
                            <p className="text-white/50 text-xs leading-relaxed font-light mt-4 line-clamp-2">{a.desc}</p>
                         </div>
                       </div>
                    </ParallaxCard>
                 ))}
              </div>
          </SectionWithParallax>

          {/* CONTACT */}
          <section id="contact" className="py-32 w-full relative z-10 px-6">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto glass-panel p-16 md:p-24 rounded-[3rem] text-center border-[#D4AF37]/20 shadow-[0_0_100px_rgba(212,175,55,0.1)] relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                 <h2 className="text-5xl md:text-[6rem] font-display font-black leading-none mb-6">Let's Connect.</h2>
                 <p className="text-xl text-white/50 font-light mb-12">I am ready to architect your next high-performance enterprise system.</p>
                 <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <a href="mailto:tanmaymirgal26@gmail.com" className="px-10 py-5 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-full hover:scale-105 hover:bg-white transition-all">Send A Message</a>
                    <a href="https://github.com/Tanmay-Mirgal" target="_blank" className="p-5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all flex items-center justify-center shrink-0"><Github size={20}/></a>
                    <a href="https://www.linkedin.com/in/tanmay-mirgal-1402792a2/" target="_blank" className="p-5 border border-white/20 rounded-full hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-all flex items-center justify-center shrink-0"><Linkedin size={20}/></a>
                 </div>
              </motion.div>
          </section>

          <footer className="w-full text-center py-10 border-t border-white/5 opacity-50 text-[10px] font-mono tracking-[0.2em] uppercase">
             (C) 2026 Tanmay Mirgal. Neural Engine Online.
          </footer>
      </div>

      {/* MODALS PRESERVED DIRECTLY FROM DATA */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto">
            <div className="absolute inset-0 min-h-screen" onClick={() => setSelectedProject(null)} />
            <button onClick={() => setSelectedProject(null)} className="fixed top-6 right-6 text-white/50 hover:text-[#D4AF37] transition-all z-[1001] bg-black/50 p-3 rounded-full hover:bg-white/10"><X size={24} /></button>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-4xl glass-panel rounded-[2rem] overflow-hidden shadow-2xl border-[#D4AF37]/20 flex flex-col z-10 my-auto">
              <div className="relative w-full h-[250px] md:h-[350px] bg-black border-b border-white/10">
                <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-60" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="text-[10px] md:text-xs font-mono px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-10 bg-[#0A0A0A] space-y-8">
                <div>
                  <h4 className="text-lg font-mono text-white/40 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">Mission Brief</h4>
                  <p className="text-white/80 text-lg leading-relaxed font-light">{selectedProject.fullDesc}</p>
                </div>
                <div className="pt-4 flex gap-4">
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" className="px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-[#F9A826] transition-colors flex items-center justify-center gap-2">
                    <Github size={16} /> Access Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedAchievement && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 bg-black/95 backdrop-blur-2xl">
            <button onClick={() => setSelectedAchievement(null)} className="absolute top-6 right-6 text-white/50 hover:text-[#D4AF37] z-[1001] bg-black/50 p-2 rounded-full"><X size={28} /></button>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video glass-panel rounded-[2rem] overflow-hidden border-[#D4AF37]/20 flex flex-col">
              <div className="relative flex-1 bg-white/5">
                {selectedAchievement.type === 'pdf' ? (
                  <iframe src={selectedAchievement.url} className="w-full h-full bg-white"/>
                ) : (
                  <Image src={selectedAchievement.url} alt={selectedAchievement.title} fill className="object-contain p-8"/>
                )}
              </div>
              <div className="p-10 bg-[#0A0A0A] border-t border-white/5">
                <h3 className="text-3xl font-display font-bold text-white mb-2">{selectedAchievement.title}</h3>
                <p className="text-[#D4AF37] font-mono text-xs uppercase tracking-widest mb-4">{selectedAchievement.org} • {selectedAchievement.date}</p>
                <p className="text-white/60 text-base font-light">{selectedAchievement.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style dangerouslySetInnerHTML={{__html: `.hide-scrollbar::-webkit-scrollbar { display: none; }`}} />
    </main>
  );
}

const SectionWithParallax = ({ id, title, subtitle, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  
  return (
    <section id={id} ref={ref} className="py-24 md:py-32 w-full px-6 lg:px-24 z-10 relative">
       <div className="max-w-7xl mx-auto space-y-16">
          <motion.div style={{ y }} className="text-center md:text-left">
             <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter mb-4">{title}</h2>
             <p className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase">{subtitle}</p>
          </motion.div>
          {children}
       </div>
    </section>
  )
}

const ParallaxCard = ({ children, speed, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 800}px`, `-${speed * 800}px`]);

  return (
    <motion.div ref={ref} style={{ y }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }} transition={{ delay, duration: 0.6 }}
       className={`glass-panel p-8 md:p-10 rounded-[2rem] relative overflow-hidden group border border-white/5 bg-[#030303]/80 backdrop-blur-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${className}`}>
      {children}
    </motion.div>
  );
}

const ProjectParallaxCard = ({ p, index, onClick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? "20px" : "-20px", index % 2 === 0 ? "-20px" : "20px"]);

  return (
    <div ref={ref} onClick={onClick} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 cursor-pointer group ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
       <div className="relative w-full lg:w-3/5 aspect-[16/9] rounded-[2rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/10 bg-black">
          <motion.div style={{ y: imageY, height: "120%" }} className="absolute inset-x-0 -top-[10%]">
             <Image src={p.image} alt={p.title} fill className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
       </div>
       <motion.div style={{ x: textX }} className="w-full lg:w-2/5 p-8 glass-panel border border-white/10 rounded-[2rem] bg-[#050505]/95 shadow-[0_0_40px_rgba(212,175,55,0.05)] group-hover:border-[#D4AF37]/40 transition-colors duration-500">
          <div className="flex gap-2 flex-wrap mb-6">
             {p.tags.map(t => <span key={t} className="text-[9px] font-mono border border-white/20 bg-white/5 px-2 py-1 rounded text-white/50">{t}</span>)}
          </div>
          <h3 className="text-4xl font-display font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
          <p className="text-white/50 leading-relaxed font-light mb-8">{p.desc}</p>
          <span className="text-[#D4AF37] font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">View Case Study <span className="text-lg group-hover:translate-x-2 transition-transform">→</span></span>
       </motion.div>
    </div>
  )
}
    """

    with open('app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(top_parts + new_home)

if __name__ == '__main__':
    create_parallax_page()
