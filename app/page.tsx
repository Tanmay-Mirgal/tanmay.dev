"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Brain,

  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Download,

  Zap,

  Star,
  Menu,
  X,
  ArrowRight,

  Terminal,
  Layers,
  Globe,

  Briefcase,
  GraduationCap,

  Sun,
  Moon,

  Code,
  Server,
  Smartphone,
  Package
} from "lucide-react";

const DeepCraftPortfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
 

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll position
      const sections = ["hero", "about", "timeline", "skills", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const downloadResume = () => {
    const resumeUrl = "https://drive.google.com/uc?export=download&id=1A7_MM3kgxpShtynapa9oGHoN14lpo1hV";
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Tanmay_Mirgal_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const theme = {
    bg: isDarkMode ? "bg-slate-900" : "bg-white",
    bgSecondary: isDarkMode ? "bg-slate-800" : "bg-gray-50",
    bgTertiary: isDarkMode ? "bg-slate-700" : "bg-gray-100",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-slate-300" : "text-gray-600",
    textMuted: isDarkMode ? "text-slate-400" : "text-gray-500",
    border: isDarkMode ? "border-slate-700" : "border-gray-200",
    borderSecondary: isDarkMode ? "border-slate-600" : "border-gray-300",
    card: isDarkMode ? "bg-slate-900/50 border-slate-700" : "bg-white border-gray-200",
    cardHover: isDarkMode ? "hover:bg-slate-800/50" : "hover:bg-gray-50",
    input: isDarkMode ? "bg-slate-700/50 border-slate-600 text-white placeholder-slate-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
    nav: isDarkMode ? "bg-slate-900/90" : "bg-white/90",
    terminal: isDarkMode ? "bg-gray-900" : "bg-gray-800"
  };

  // Terminal Component
  const TerminalComponent = () => {
    const [lines, setLines] = useState([
      "tanmaymirgal@dev-machine:~/portfolio$ pwd",
      "/home/tanmaymirgal/portfolio",
      "tanmaymirgal@dev-machine:~/portfolio$ cat stats.txt",
      "",
      "═══ DEVELOPER METRICS ═══",
      "",
      "Years of Experience: 2+",
      "Projects Completed: 5+",
      "Hackathons Won: 2+",
      "",
      "═══ CODING PROFILE ═══",
      "",
      "🟣 LeetCode: 10+ problems solved",
      "",
      "═══ TOP ACHIEVEMENTS ═══",
      "",
      // "🏆 Smart India Hackathon 2022: Winner (National)",
      // "🏆 PICT Techfiesta 2024: Winner (International)",
      "",
      "tanmaymirgal@dev-machine:~/portfolio$ _"
    ]);

    return (
      <div className={`${theme.terminal} rounded-lg p-6 font-mono text-sm border border-gray-700 shadow-2xl`}>
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="text-gray-400 text-xs ml-4">tanmaymirgal@dev-machine: ~/portfolio</div>
        </div>
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div key={index} className={`${line.includes("$") ? "text-green-400" :
                line.includes("═══") ? "text-cyan-400" :
                  line.includes("🏆") ? "text-yellow-400" :
                    line.includes("🟣") ? "text-purple-400" :
                      line.includes(":") && !line.includes("$") ? "text-yellow-300" :
                        "text-gray-300"
              }`}>
              {line}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 3D Tech Stack Component
  const TechStack3D = () => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setRotation(prev => prev + 1);
      }, 50);
      return () => clearInterval(interval);
    }, []);

    const techItems = [
      { name: "React", color: "from-blue-400 to-blue-600", angle: 0 },
      { name: "Node.js", color: "from-green-400 to-green-600", angle: 60 },
      { name: "MongoDB", color: "from-green-500 to-green-700", angle: 120 },
      { name: "Express", color: "from-gray-400 to-gray-600", angle: 180 },
      { name: "TensorFlow", color: "from-orange-400 to-orange-600", angle: 240 },
      { name: "Python", color: "from-yellow-400 to-blue-600", angle: 300 }
    ];

    const radius = 120;
    const centerX = 150;
    const centerY = 150;

    return (
      <div className="relative w-80 h-80 mx-auto">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-slate-800/20 to-slate-900/20' : 'bg-gradient-to-br from-gray-200/50 to-gray-300/50'} rounded-full backdrop-blur-sm ${theme.border}`}></div>
        {techItems.map((tech) => {
          const angle = (tech.angle + rotation) * (Math.PI / 180);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const scale = 0.8 + 0.2 * Math.sin((rotation + tech.angle) * (Math.PI / 180));

          return (
            <div
              key={tech.name}
              className={`absolute w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-xl border border-white/10 transform-gpu transition-transform duration-75`}
              style={{
                left: `${x - 32}px`,
                top: `${y - 32}px`,
                transform: `scale(${scale}) perspective(100px) rotateX(${Math.sin(angle) * 10}deg)`,
                zIndex: Math.floor(scale * 10)
              }}
            >
              {tech.name.slice(0, 2).toUpperCase()}
            </div>
          );
        })}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center border border-white/20">
          <Code2 className="w-8 h-8 text-white" />
        </div>
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 ${theme.nav} backdrop-blur-xl ${theme.border} shadow-xl`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Terminal className="w-6 h-6 text-white" />
               
              </div>
              <span className={`text-xl font-bold ${theme.text}`}>DeepMind</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Timeline", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === "Home" ? "hero" : item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${activeSection === (item === "Home" ? "hero" : item.toLowerCase())
                      ? "text-blue-400 font-semibold"
                      : `${theme.textSecondary} hover:${theme.text.replace('text-', 'text-')}`
                    }`}
                >
                  {item}
                </button>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${theme.bgTertiary} ${theme.text} hover:scale-105 transition-all duration-300`}
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Let&apos;s Talk
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 ${theme.textSecondary} hover:${theme.text.replace('text-', 'text-')} hover:${theme.bgTertiary} rounded-lg transition-colors`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden ${theme.nav} backdrop-blur-xl border-t ${theme.border}`}>
            <div className="px-6 py-4 space-y-4">
              {["Home", "About", "Timeline", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === "Home" ? "hero" : item.toLowerCase())}
                  className={`block w-full text-left ${theme.textSecondary} hover:text-blue-400 font-medium py-2`}
                >
                  {item}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className={`flex items-center space-x-2 ${theme.textSecondary} hover:text-blue-400 font-medium py-2`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );

  // Hero Section
  const HeroSection = () => {
    const [textIndex, setTextIndex] = useState(0);
    const roles = ["Full Stack Developer", "AI/ML Engineer", "Data Scientist", "Software Architect"];

    useEffect(() => {
      const interval = setInterval(() => {
        setTextIndex((prev) => (prev + 1) % roles.length);
      }, 3000);
      return () => clearInterval(interval);
    }, [roles.length]);

    return (
      <section id="hero" className={`pt-16 min-h-screen flex items-center ${theme.bg} relative overflow-hidden`}>
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-white via-gray-50 to-white'}`}></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4 mr-2" />
                Available for new opportunities
              </div>

              <h1 className={`text-5xl lg:text-6xl font-bold ${theme.text} leading-tight`}>
                Hi, I&apos;m <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">Tanmay Mirgal</span>
              </h1>

              <div className="h-20">
                <p className={`text-2xl lg:text-3xl ${theme.textSecondary}`}>
                  I&apos;m a <span className="text-blue-400 font-bold">{roles[textIndex]}</span>
                </p>
              </div>

              <p className={`text-lg ${theme.textMuted} leading-relaxed max-w-2xl`}>
                Passionate about creating innovative solutions with cutting-edge technologies.
                Specialized in MERN stack, AI/ML, Deep Learning with TensorFlow, Flask, and building scalable applications that make a difference.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={downloadResume}
                className={`border-2 ${theme.borderSecondary} ${theme.textSecondary} px-8 py-4 rounded-xl font-medium hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center group`}
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download CV
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <a href="https://github.com/Tanmay-Mirgal" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform`}>
                <Github className="w-7 h-7" />
              </a>
              <a href="https://www.linkedin.com/in/tanmay-mirgal-1402792a2/" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform`}>
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="mailto:tanmaymirgal26@gmail.com" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform`}>
                <Mail className="w-7 h-7" />
              </a>
            </div>
          </div>

          <div className="relative">
            <TerminalComponent />
            
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-20 animate-pulse"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
           {/* <TechStack3D /> */}
        </div>
      </section>
    );
  };

  // About Section
  const AboutSection = () => (
    <section id="about" className={`py-24 ${theme.bg} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl font-bold ${theme.text} mb-6`}>About Me</h2>
          <p className={`text-xl ${theme.textMuted} max-w-3xl mx-auto`}>
            A passionate software engineer with expertise in modern web technologies, artificial intelligence, and data science
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className={`text-lg ${theme.textSecondary} leading-relaxed`}>
              I&apos;m a dedicated software engineer with a passion for creating innovative solutions that bridge
              the gap between cutting-edge technology and real-world applications. My journey in tech spans
              across full-stack development, artificial intelligence, machine learning, and data science.
            </p>

            <p className={`text-lg ${theme.textSecondary} leading-relaxed`}>
              With expertise in the MERN stack, Python frameworks like Flask and Django, machine learning
              libraries including TensorFlow and PyTorch, I focus on building scalable, secure, and
              user-friendly applications that deliver exceptional experiences.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className={`text-center p-8 ${theme.card} rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-4xl font-bold text-blue-400 mb-3">10+</div>
                <div className={`${theme.textMuted} font-medium`}>Projects Completed</div>
              </div>
              <div className={`text-center p-8 ${theme.card} rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-4xl font-bold text-purple-400 mb-3">2+</div>
                <div className={`${theme.textMuted} font-medium`}>Years Experience</div>
              </div>
            </div>
          </div>

          <div className={`${theme.card} rounded-3xl p-10 shadow-xl`}>
            <h3 className={`text-3xl font-bold ${theme.text} mb-8`}>What I Do</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme.text} mb-2`}>Full Stack Development</h4>
                  <p className={theme.textMuted}>Building end-to-end web applications with MERN stack and modern technologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme.text} mb-2`}>AI & Machine Learning</h4>
                  <p className={theme.textMuted}>Developing intelligent systems with TensorFlow, PyTorch, and deep learning</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className={`text-lg font-semibold ${theme.text} mb-2`}>Data Science & Analytics</h4>
                  <p className={theme.textMuted}>Extracting insights from data using Python, Flask, and advanced analytics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Timeline Section
  const TimelineSection = () => {
    const timelineEvents = [
      {
        year: "2024",
        title: "Senior AI Engineer",
        company: "TechCorp Innovations",
        type: "work",
        description: "Leading AI development team, implementing cutting-edge neural networks and generative AI solutions using TensorFlow and PyTorch.",
        skills: ["TensorFlow", "PyTorch", "LangChain", "Python", "React"]
      },
      {
        year: "2023",
        title: "Full Stack Developer",
        company: "StartupX",
        type: "work",
        description: "Developed scalable web applications using MERN stack, Flask APIs, and integrated modern authentication systems.",
        skills: ["MERN Stack", "Flask", "MongoDB", "JWT", "TypeScript"]
      },
      {
        year: "2023",
        title: "AI Certification",
        company: "Coursera - Stanford",
        type: "education",
        description: "Completed advanced machine learning specialization focusing on deep learning and neural networks.",
        skills: ["Deep Learning", "Neural Networks", "Computer Vision"]
      },
      {
        year: "2022",
        title: "Software Developer",
        company: "Digital Solutions Inc",
        type: "work",
        description: "Built responsive web applications and collaborated with cross-functional teams on product development using Flask and React.",
        skills: ["Flask", "React", "PostgreSQL", "AWS", "Docker"]
      }
    ];

    return (
      <section id="timeline" className={`py-24 ${theme.bgSecondary}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className={`text-5xl font-bold ${theme.text} mb-6`}>My Journey</h2>
            <p className={`text-xl ${theme.textMuted}`}>Professional milestones and educational achievements</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full"></div>

            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}>
                  <div className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 ${theme.bg} shadow-lg z-10`}></div>

                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className={`${theme.card} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${event.type === 'work'
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                            : 'bg-gradient-to-br from-green-500 to-green-600'
                          }`}>
                          {event.type === 'work' ? <Briefcase className="w-6 h-6 text-white" /> : <GraduationCap className="w-6 h-6 text-white" />}
                        </div>
                        <div className="text-2xl font-bold text-blue-400">{event.year}</div>
                      </div>

                      <h3 className={`text-2xl font-bold ${theme.text} mb-2`}>{event.title}</h3>
                      <p className="text-lg text-blue-400 font-semibold mb-4">{event.company}</p>
                      <p className={`${theme.textSecondary} mb-6 leading-relaxed`}>{event.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className={`px-3 py-1 ${theme.bgTertiary} ${theme.textSecondary} rounded-full text-sm font-medium ${theme.borderSecondary}`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Enhanced Skills Section with Icons
  const SkillsSection = () => {
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Programming Languages", "Web & Mobile Development", "Databases & ORMs", "Cloud & DevOps", "Developer Tools"];

    const skillCategories = [
      {
        title: "Core Technologies",
        category: "Programming Languages",
        skills: [
          { name: "Java", icon: "☕", level: 95, description: "Object-oriented programming" },
          { name: "JavaScript", icon: "🟨", level: 90, description: "Modern ES6+ features" },
          { name: "TypeScript", icon: "🔷", level: 88, description: "Type-safe development" },
          { name: "Dart", icon: "🎯", level: 85, description: "Flutter development" },
          { name: "Python", icon: "🐍", level: 80, description: "AI/ML and backend" }
        ]
      },
      {
        title: "Programming Languages",
        category: "Programming Languages",
        skills: [
          { name: "Java", icon: "☕", level: 95, description: "Enterprise applications" },
          { name: "JavaScript", icon: "🟨", level: 90, description: "Frontend & Backend" },
          { name: "TypeScript", icon: "🔷", level: 88, description: "Type safety" },
          { name: "Python", icon: "🐍", level: 85, description: "Data Science & AI" },
          { name: "Dart", icon: "🎯", level: 80, description: "Mobile development" }
        ]
      },
      {
        title: "Web & Mobile Development",
        category: "Web & Mobile Development",
        skills: [
          { name: "Node.js", icon: "🟢", level: 95, description: "Server-side JavaScript" },
          { name: "Express.js", icon: "🚂", level: 92, description: "Backend framework" },
          { name: "React", icon: "⚛️", level: 90, description: "Frontend library" },
          { name: "Next.js", icon: "▲", level: 88, description: "React framework" },
          { name: "Flask", icon: "🌶️", level: 85, description: "Python web framework" },
          { name: "Nest.js", icon: "🔴", level: 80, description: "Node.js framework" }
        ]
      },
      {
        title: "Databases & ORMs",
        category: "Databases & ORMs",
        skills: [
          { name: "MongoDB", icon: "🍃", level: 90, description: "NoSQL database" },
          { name: "PostgreSQL", icon: "🐘", level: 85, description: "Relational database" },
          { name: "MySQL", icon: "🐬", level: 82, description: "SQL database" },
          { name: "Redis", icon: "🔴", level: 78, description: "In-memory cache" }
        ]
      },
      {
        title: "Cloud & DevOps",
        category: "Cloud & DevOps",
        skills: [
          { name: "AWS", icon: "☁️", level: 85, description: "Cloud services" },
          { name: "Docker", icon: "🐳", level: 88, description: "Containerization" },
          { name: "Firebase", icon: "🔥", level: 90, description: "Backend as service" },
          { name: "Kafka", icon: "⚡", level: 75, description: "Event streaming" }
        ]
      },
      {
        title: "Development Tools",
        category: "Developer Tools",
        skills: [
          { name: "Git", icon: "📂", level: 95, description: "Version control" },
          { name: "GitHub", icon: "🐙", level: 95, description: "Code collaboration" },
          { name: "Postman", icon: "📮", level: 90, description: "API testing" },
          { name: "VS Code", icon: "💻", level: 98, description: "Code editor" }
        ]
      }
    ];

    const filteredCategories = activeFilter === "All"
      ? skillCategories
      : skillCategories.filter(cat => cat.category === activeFilter);

    return (
      <section id="skills" className={`py-24 ${theme.bg}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-medium">Technical Skills</span>
            </div>
            <h2 className={`text-5xl font-bold ${theme.text} mb-6`}>Skills & Expertise</h2>
            <p className={`text-xl ${theme.textMuted} mb-8`}>Technologies I use to build exceptional digital experiences</p>

            {/* Skill Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter
                      ? "bg-blue-500 text-white shadow-lg"
                      : `${theme.bgTertiary} ${theme.textSecondary} hover:bg-blue-500/10 hover:text-blue-400`
                    }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCategories.map((category, idx) => (
              <div
                key={idx}
                className={`${theme.card} rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <h3 className={`text-2xl font-bold ${theme.text} mb-6`}>{category.title}</h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center space-x-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className={`${theme.text} font-medium`}>{skill.name}</span>
                        </span>
                        <span className="text-sm text-blue-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-300/20 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <p className={`text-xs ${theme.textMuted} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Projects Section
  const ProjectsSection = () => {
    const [activeProjectFilter, setActiveProjectFilter] = useState("All");

    const projectFilters = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "Package"];

    const projects = [
      // {
      //   id: 1,
      //   title: "AdTech Platform - Programmatic Advertising",
      //   category: "Backend",
      //   type: "Full Stack",
      //   description: "A comprehensive advertising platform with real-time bidding, analytics dashboard, and campaign management system.",
      //   image: "/api/placeholder/400/250",
      //   technologies: ["Node.js", "Express", "MongoDB", "Redis", "React"],
      //   features: ["Real-time bidding", "Analytics dashboard", "Campaign management", "Performance tracking"],
      //   githubUrl: "#",
      //   liveUrl: "#",
      //   status: "Backend | Full Stack"
      // },
      // {
      //   id: 2,
      //   title: "KVP College System",
      //   category: "App",
      //   type: "Backend",
      //   description: "Complete college management system with student portal, faculty dashboard, and administrative tools.",
      //   image: "/api/placeholder/400/250",
      //   technologies: ["React Native", "Node.js", "PostgreSQL", "Express"],
      //   features: ["Student portal", "Faculty dashboard", "Course management", "Grade tracking"],
      //   githubUrl: "#",
      //   liveUrl: "#",
      //   status: "App | Backend"
      // },
      // {
      //   id: 3,
      //   title: "TNSP - The New Security Project Platform",
      //   category: "Full Stack",
      //   type: "Full Stack",
      //   description: "Security-focused platform with vulnerability assessment, threat detection, and incident response capabilities.",
      //   image: "/api/placeholder/400/250",
      //   technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
      //   features: ["Threat detection", "Incident response", "Security analytics", "Real-time monitoring"],
      //   githubUrl: "#",
      //   liveUrl: "#",
      //   status: "Full Stack"
      // },
      {
        id: 1,
        title: "E-Commerce Mobile App",
        category: "Mobile",
        type: "Mobile",
        description: "Cross-platform mobile application with payment integration, product catalog, and user management.",
        image: "/api/placeholder/400/250",
        technologies: ["Flutter", "Dart", "Firebase", "Stripe API"],
        features: ["Payment integration", "Product catalog", "User profiles", "Order tracking"],
        githubUrl: "#",
        liveUrl: "#",
        status: "Mobile"
      },
      {
        id: 2,
        title: "AI-Powered Analytics Dashboard",
        category: "Frontend",
        type: "Frontend",
        description: "Modern analytics dashboard with machine learning insights, data visualization, and predictive analytics.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "TypeScript", "Chart.js", "TensorFlow.js"],
        features: ["ML insights", "Data visualization", "Predictive analytics", "Interactive charts"],
        githubUrl: "#",
        liveUrl: "#",
        status: "Frontend"
      },
      {
        id: 3,
        title: "React Component Library",
        category: "Package",
        type: "Package",
        description: "Reusable UI component library with TypeScript support, customizable themes, and comprehensive documentation.",
        image: "/api/placeholder/400/250",
        technologies: ["React", "TypeScript", "Storybook", "Rollup"],
        features: ["TypeScript support", "Custom themes", "Documentation", "Tree shaking"],
        githubUrl: "#",
        liveUrl: "#",
        status: "Package"
      }
    ];

    const filteredProjects = activeProjectFilter === "All"
      ? projects
      : projects.filter(project => project.category === activeProjectFilter);

    return (
      <section id="projects" className={`py-24 ${theme.bgSecondary}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="w-6 h-6 text-blue-400" />
              <span className="text-blue-400 font-medium">Featured Work</span>
            </div>
            <h2 className={`text-5xl font-bold ${theme.text} mb-6`}>Projects & Solutions</h2>
            <p className={`text-xl ${theme.textMuted} mb-8`}>Innovative solutions built with modern technologies and best practices</p>

            {/* Project Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {projectFilters.map((filter, index) => (
                <button
                  key={filter}
                  onClick={() => setActiveProjectFilter(filter)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${activeProjectFilter === filter
                      ? "bg-blue-500 text-white shadow-lg"
                      : `${theme.bgTertiary} ${theme.textSecondary} hover:bg-blue-500/10 hover:text-blue-400`
                    }`}
                >
                  <span>{filter}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${activeProjectFilter === filter ? "bg-white/20" : "bg-blue-500/10"
                    }`}>
                    {filter === "All" ? projects.length : filteredProjects.length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`${theme.card} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-6xl opacity-20">
                    {project.category === "Frontend" && <Code />}
                    {project.category === "Backend" && <Server />}
                    {project.category === "Full Stack" && <Layers />}
                    {project.category === "Mobile" && <Smartphone />}
                    {project.category === "App" && <Smartphone />}
                    {project.category === "Package" && <Package />}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-xl font-bold ${theme.text} mb-3 group-hover:text-blue-400 transition-colors`}>
                    {project.title}
                  </h3>
                  <p className={`${theme.textSecondary} text-sm mb-4 leading-relaxed`}>
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <h4 className={`text-sm font-semibold ${theme.text} mb-2`}>Key Features:</h4>
                    <ul className={`text-xs ${theme.textMuted} space-y-1`}>
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 ${theme.bgTertiary} ${theme.textSecondary} rounded-md text-xs font-medium`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300`}
                        title="View Code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.liveUrl}
                        className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300`}
                        title="Live Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center space-x-1 group">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Contact Section
  const ContactSection = () => (
    <section id="contact" className={`py-24 ${theme.bg}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-5xl font-bold ${theme.text} mb-6`}>Get In Touch</h2>
        <p className={`text-xl ${theme.textMuted} mb-12`}>
          Have a project in mind, want to collaborate, or just say hi?
          Feel free to drop a message!
        </p>
        <form className="grid gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className={`p-4 rounded-xl ${theme.input}`}
          />
          <input
            type="email"
            placeholder="Your Email"
            className={`p-4 rounded-xl ${theme.input}`}
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            className={`p-4 rounded-xl ${theme.input}`}
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );

  // Footer Section
  const Footer = () => (
    <footer className={`py-8 ${theme.bgSecondary} border-t ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className={`${theme.textMuted} text-sm`}>
          © {new Date().getFullYear()} Tanmay Mirgal . All Rights Reserved.
        </p>
        <div className="flex items-center space-x-6">
          <a href="#" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300`}>
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300`}>
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300`}>
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );

  return (
    <div className={`${theme.bg} font-sans`}>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default DeepCraftPortfolio;