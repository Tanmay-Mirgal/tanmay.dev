import re

def update_tsx():
    with open('app/page.tsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the split point
    split_match = re.search(r'export default function Home\(\) \{', content)
    if not split_match:
        print("Could not find Home function")
        return
    
    top_part = content[:split_match.start()]

    new_home = """export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress(totalScroll / windowHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2, rootMargin: "-10% 0px -10% 0px" });
    document.querySelectorAll("section[id]").forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const heroHeadline = "Architecting Intelligence.".split("");

  return (
    <main className="relative min-h-screen font-sans selection:bg-[#D4AF37] selection:text-black bg-[#050505]">
      <GlassCursor />
      <AmbientBackground />

      {/* PDF 2.6: Scroll Progress Indicator */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F9A826] to-[#D4AF37] z-[9999]" 
        style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.1s ease-out' }} 
      />

      {/* PDF 4.4: Dot Navigation / Floating Nav Redesign */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}
        className="fixed top-6 md:top-8 left-1/2 -translate-x-1/2 z-[100] bg-white/[0.02] backdrop-blur-[32px] border border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.5)] px-6 py-4 rounded-full flex items-center gap-4 md:gap-8 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] max-w-[90vw] overflow-x-auto hide-scrollbar whitespace-nowrap"
      >
        {["home", "capabilities", "stack", "projects", "freelance", "achievements", "contact"].map(id => (
          <a 
            key={id} 
            href={`#${id}`} 
            className={`transition-all duration-300 relative px-2 py-1 flex flex-col items-center gap-1 ${activeSection === id ? "text-[#D4AF37]" : "text-white/40 hover:text-white/80"}`}
          >
            {id}
            {activeSection === id && (
              <motion.div layoutId="nav-indicator" className="absolute -bottom-2 w-1 h-1 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
            )}
          </a>
        ))}
      </motion.nav>

      {/* Modals from previous code (Kept High Quality Glassmorphism) */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
            <button onClick={() => setSelectedAchievement(null)} className="absolute top-6 right-6 text-white/50 hover:text-[#D4AF37] transition-all z-[2001] bg-white/5 p-3 rounded-full hover:bg-white/10">
              <X size={24} />
            </button>
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="relative w-full max-w-4xl glass-panel border-[#D4AF37]/30 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(212,175,55,0.15)] bg-[#050505]">
              <div className="relative aspect-video bg-black/50 overflow-hidden group">
                {selectedAchievement.type === 'pdf' ? (
                  <iframe src={selectedAchievement.url} className="w-full h-full border-none object-cover" />
                ) : (
                  <Image src={selectedAchievement.url} alt={selectedAchievement.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-1000" />
                )}
              </div>
              <div className="p-8 border-t border-white/10 flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-full text-xs font-mono uppercase border border-[#D4AF37]/20">{selectedAchievement.org}</span>
                  <span className="text-white/40 text-xs font-mono">{selectedAchievement.date}</span>
                </div>
                <h3 className="text-3xl font-display font-bold text-white tracking-tight">{selectedAchievement.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed font-light">{selectedAchievement.desc}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-3xl overflow-y-auto">
            <button onClick={() => setSelectedProject(null)} className="fixed top-6 right-6 text-white/50 hover:text-[#D4AF37] transition-all z-[2001] bg-white/5 p-3 rounded-full hover:bg-white/10">
              <X size={24} />
            </button>
            <div className="min-h-[100vh] w-full flex items-center justify-center py-20 pointer-events-none">
              <motion.div initial={{ scale: 0.95, y: 40 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", damping: 30 }} className="relative w-full max-w-5xl glass-panel border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-[#080808] pointer-events-auto">
                <div className="relative aspect-[21/9] w-full border-b border-white/10 overflow-hidden">
                  <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                </div>
                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 text-white/80 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-widest border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">{selectedProject.title}</h3>
                  <div className="w-12 h-1 bg-[#D4AF37] mb-8" />
                  <p className="text-white/70 text-lg md:text-xl leading-relaxed font-light mb-10 max-w-3xl">
                    {selectedProject.fullDesc}
                  </p>
                  <a href={selectedProject.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest rounded-full hover:bg-[#D4AF37] transition-all hover:scale-105">
                    <Github size={18} /> View Repository
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PDF 5.5: Display Typography Hero + PDF 2.5 Text Reveal */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-24 overflow-hidden z-10 pt-20">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Pure Typography */}
          <div className="w-full lg:w-[60%] flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="mb-8 inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse glow-dot" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">System Intialized</span>
            </motion.div>
            
            <h1 className="font-display font-black leading-[0.95] tracking-tighter mb-8 max-w-4xl" style={{ fontSize: "clamp(60px, 9vw, 130px)" }}>
              {heroHeadline.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.04 + 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                  className={`inline-block ${char === " " ? "mr-4" : ""} ${index >= 13 ? "text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] to-[#F9A826]" : "text-[#F1F1EE]"}`}
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
              className="text-lg md:text-2xl text-white/50 font-light max-w-2xl leading-relaxed mb-12"
            >
              I engineer high-performance systems. From beautiful fluid React interfaces to massive Node.js/Python microservices, built for absolute precision.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.7 }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <a href="#projects" className="group px-10 py-5 bg-white text-black font-mono font-bold uppercase tracking-widest text-xs rounded-full hover:bg-[#D4AF37] transition-all hover:scale-105 flex items-center justify-center gap-3">
                Execute Mission <span className="text-xl leading-none transition-transform group-hover:translate-x-1">→</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Abstract UI / Terminal */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.5 }} className="w-full lg:w-[40%] hidden lg:block relative z-10">
            <div className="relative aspect-square w-full max-w-[500px] ml-auto">
              <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse pointer-events-none" />
              <div className="glass-panel w-full h-full rounded-[2rem] border-white/10 p-6 flex flex-col bg-black/60 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
                
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase">node.js runtime execution</span>
                </div>
                
                <div className="font-mono text-[11px] xl:text-xs leading-loose text-white/70 space-y-2">
                    <p><span className="text-emerald-400">root@local</span>:<span className="text-blue-400">~</span>$ whoami</p>
                    <p className="text-[#D4AF37] font-bold">Tanmay Mirgal</p>
                    <p><span className="text-emerald-400">root@local</span>:<span className="text-blue-400">~</span>$ curl https://api.skills.local/v1</p>
                    <div className="pl-4 border-l border-white/10 py-2 space-y-1 my-2">
                        <p className="text-pink-400">"{'{'}"</p>
                        <p className="pl-4">"role": <span className="text-yellow-300">"Full Stack / AI Engineer"</span>,</p>
                        <p className="pl-4">"stacks": [<span className="text-yellow-300">"MERN"</span>, <span className="text-yellow-300">"Next.js"</span>, <span className="text-yellow-300">"Python ML"</span>],</p>
                        <p className="pl-4">"status": <span className="text-yellow-300">"Constructing Neural Paths"</span></p>
                        <p className="text-pink-400">"{'}'}"</p>
                    </div>
                    <p><span className="text-emerald-400">root@local</span>:<span className="text-blue-400">~</span>$ <span className="animate-pulse inline-block w-2 h-4 bg-white align-middle" /></p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PDF 1.5/1.6: Bento / Dark Luxury - Capabilities */}
      <section id="capabilities" className="py-24 lg:py-40 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">Engineering <br/><span className="text-[#D4AF37]">Excellence.</span></h2>
            <p className="text-white/50 text-xl font-light">Precision full-stack solutions built for extreme performance.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 auto-rows-[auto]">
            {/* Bento Grid Styling: Tight padding, pure glass-panel, minimal high-end aesthetics */}
            
            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6 }}
               className="md:col-span-2 glass-panel p-10 md:p-14 rounded-[2rem] border border-white/[0.05] relative overflow-hidden group hover:border-white/10 transition-colors"
            >
               <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
               <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full group-hover:bg-[#D4AF37]/20 transition-all duration-700 pointer-events-none" />
               <Layers size={36} className="text-white mb-6" />
               <h3 className="text-3xl font-display font-bold text-white mb-4">Zero-Compromise Full-Stack</h3>
               <p className="text-white/50 text-lg leading-relaxed max-w-xl font-light">
                 End-to-end ownership spanning high-fidelity React architectures to fortified Node.js backends. I engineer the entire lifecycle without relying on black-box boilerplates.
               </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.1 }}
               className="glass-panel p-10 md:p-14 rounded-[2rem] border border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/20 transition-colors"
            >
               <Cpu size={36} className="text-emerald-400 mb-6" />
               <h3 className="text-2xl font-display font-bold text-white mb-4">AI & Vision</h3>
               <p className="text-white/50 text-base leading-relaxed font-light">
                 Deploying bleeding-edge TensorFlow and OpenCV layers beneath robust APIs.
               </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.2 }}
               className="md:col-span-1 glass-panel p-10 rounded-[2rem] border border-white/[0.05] relative overflow-hidden group hover:border-blue-500/20 flex flex-col justify-between"
            >
               <div>
                 <Cloud size={32} className="text-blue-400 mb-6" />
                 <h3 className="text-2xl font-display font-bold text-white mb-4">Cloud Native</h3>
               </div>
               <p className="text-white/50 text-sm leading-relaxed font-light mt-auto">
                 AWS, Nginx, Docker. Battle-tested deployments that don't sleep.
               </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.6, delay: 0.3 }}
               className="md:col-span-2 glass-panel p-10 md:p-14 rounded-[2rem] border border-white/[0.05] relative overflow-hidden group hover:border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
            >
               <div className="z-10">
                 <h3 className="text-3xl font-display font-bold text-white mb-4">Blazing Iterations</h3>
                 <p className="text-white/50 text-lg leading-relaxed max-w-md font-light">
                   Shipping scalable code with ferocious speed while maintaining meticulous design and architectural integrity.
                 </p>
               </div>
               <Zap size={64} className="text-[#F9A826] md:ml-auto flex-shrink-0 drop-shadow-[0_0_20px_rgba(249,168,38,0.4)] group-hover:scale-110 transition-transform duration-500" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* System Architecture - Unchanged visually, just spacing tweaks */}
      <section id="stack" className="py-24 relative overflow-hidden min-h-screen flex flex-col justify-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} className="text-center space-y-4 relative z-20 mb-12">
            <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-[#D4AF37]">Neural Architecture</h2>
            <p className="text-5xl font-display font-bold text-white">The Engine</p>
        </motion.div>
        <InteractiveNeuralGraph />
      </section>

      {/* PDF 6.6 Card Pattern + Glassmorphism Grid */}
      <section id="projects" className="py-24 lg:py-40 px-6 lg:px-24 bg-[#030303]">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.3 }} className="space-y-4">
             <h2 className="text-xs font-mono tracking-[0.2em] uppercase text-white/40">Portfolio</h2>
             <h3 className="text-4xl md:text-6xl font-display font-bold">Featured Works.</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projectsData.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }} transition={{ duration: 0.6, delay: i * 0.1 }}
                onClick={() => setSelectedProject(p)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-6 border border-white/[0.05] bg-black">
                  <Image src={p.image} alt={p.title} fill className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10">
                    <div className="flex gap-2 isolate">
                        {p.tags.slice(0, 3).map(t => (
                            <span key={t} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-mono text-white border border-white/20 uppercase tracking-wider">{t}</span>
                        ))}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-xl">
                        <span className="font-mono text-xl">→</span>
                    </div>
                  </div>
                </div>
                <h4 className="text-3xl font-display font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{p.title}</h4>
                <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-[90%]">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelance & Abilities */}
      <section id="freelance" className="py-24 lg:py-40 px-6 lg:px-24">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5 space-y-8 sticky top-32 self-start">
               <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight">Contract <br/>Services.</h2>
               <p className="text-white/50 text-xl font-light">Custom architecture, tailored engineering, delivered on strict timelines.</p>
               <a href="mailto:tanmaymirgal26@gmail.com" className="inline-flex items-center justify-center gap-3 px-8 py-5 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all group overflow-hidden relative font-mono text-xs uppercase tracking-widest">
                  <span className="relative z-10 font-bold">Initiate Contract</span>
               </a>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
               {[
                 { title: "Full-Stack App", tech: "React / Node / Mongo", time: "2–4 Weeks" },
                 { title: "Machine Learning", tech: "TensorFlow / API", time: "1–3 Weeks" },
                 { title: "Computer Vision", tech: "OpenCV Pipelines", time: "2–3 Weeks" },
                 { title: "Cloud DevOps", tech: "AWS / Docker", time: "3–7 Days" }
               ].map((srv, i) => (
                 <motion.div 
                   key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ delay: i * 0.1, duration: 0.5 }}
                   className="p-8 border border-white/5 rounded-3xl group hover:bg-white/[0.02] hover:border-white/20 transition-all bg-[#0A0A0A]"
                 >
                    <span className="text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase mb-4 block">ETA: {srv.time}</span>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{srv.title}</h3>
                    <p className="text-white/40 font-mono text-xs">{srv.tech}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Hall of Fame - Brutalism touch mixed with Glass */}
      <section id="achievements" className="py-24 lg:py-40 px-6 lg:px-24 bg-[#000]">
        <div className="max-w-7xl mx-auto space-y-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-12">
            <div>
               <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Hall of Fame.</h2>
               <p className="text-white/40 mt-4 font-mono uppercase tracking-widest text-xs">Recognitions & Certifications</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievementsData.map((a, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelectedAchievement(a)}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full bg-white/5 overflow-hidden mb-6 filter grayscale group-hover:grayscale-0 transition-all duration-700">
                  {a.type === 'pdf' ? (
                     <div className="w-full h-full flex items-center justify-center border border-white/10 group-hover:border-[#D4AF37]/50">
                        <FileText size={48} className="text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                     </div>
                  ) : (
                    <Image src={a.url} alt={a.title} fill className="object-cover opacity-60 group-hover:opacity-100 mix-blend-screen" />
                  )}
                </div>
                <div className="space-y-2 border-l-2 border-transparent group-hover:border-[#D4AF37] pl-4 transition-all">
                  <div className="text-[10px] font-mono text-white/40 uppercase flex justify-between">
                     <span>{a.org}</span>
                     <span>{a.date}</span>
                  </div>
                  <h4 className="text-2xl font-display font-bold text-white group-hover:text-[#D4AF37] transition-colors">{a.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Dark Minimalism Contact Section */}
      <section id="contact" className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10 border-t border-white/5 mt-20">
         <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="space-y-8 relative z-20 w-full max-w-4xl py-32 rounded-[3rem] px-6">
            <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/[0.02] to-transparent pointer-events-none rounded-[3rem]" />
            <div className="w-16 h-1 bg-[#D4AF37] mx-auto mb-12" />
            <h2 className="text-6xl sm:text-8xl md:text-[8rem] font-display font-black tracking-tighter leading-none mb-8">
               HELLO.
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto mb-16 px-4">
               Let's engineer the impossible. My inbox is open for high-impact roles and contracts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <a href="mailto:tanmaymirgal26@gmail.com" className="px-12 py-6 bg-[#D4AF37] text-black font-display font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors">
                  Send Message
               </a>
               <div className="flex gap-4">
                  <a href="https://github.com/Tanmay-Mirgal" target="_blank" rel="noreferrer" className="w-16 h-16 flex items-center justify-center border border-white/10 rounded-full hover:bg-white hover:text-black transition-colors"><Github size={24} /></a>
                  <a href="https://www.linkedin.com/in/tanmay-mirgal-1402792a2/" target="_blank" rel="noreferrer" className="w-16 h-16 flex items-center justify-center border border-white/10 rounded-full hover:bg-[#0A66C2] hover:border-[#0A66C2] transition-colors"><Linkedin size={24} /></a>
               </div>
            </div>
         </motion.div>
      </section>

      {/* Clean Footer */}
      <footer className="py-12 text-center border-t border-white/[0.05] bg-black">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
          © {new Date().getFullYear()} Tanmay Mirgal. Neural systems operational.
        </p>
      </footer>

      {/* Global CSS for hiding scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}
"""

    with open('app/page.tsx', 'w', encoding='utf-8') as f:
        f.write(top_part + new_home)

if __name__ == '__main__':
    update_tsx()
