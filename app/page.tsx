"use client"
import React, { useState, useEffect, useRef } from "react";
import {
  Code2,
  Brain,
  Database,
  Cpu,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Download,
  ChevronDown,
  Zap,
  Shield,
  Rocket,
  MapPin,
  Award,
  BookOpen,
  Star,
  Menu,
  X,
  ArrowRight,
  Play,
  Terminal,
  Layers,
  Globe,
  Calendar,
  Briefcase,
  GraduationCap,
  Trophy,
  Eye,
  Heart,
  Users,
  TrendingUp,
  Filter,
  Sun,
  Moon
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

  const scrollToSection = (sectionId:any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
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
    nav: isDarkMode ? "bg-slate-900/90" : "bg-white/90"
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
        {techItems.map((tech, index) => {
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
              <span className={`text-xl font-bold ${theme.text}`}>DeepCraft</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Timeline", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === "Home" ? "hero" : item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === (item === "Home" ? "hero" : item.toLowerCase())
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

              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                Let's Talk
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
    }, []);

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
              
              <h1 className={`text-5xl lg:text-7xl font-bold ${theme.text} leading-tight`}>
                Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">DeepCraft</span>
              </h1>
              
              <div className="h-20">
                <p className={`text-2xl lg:text-3xl ${theme.textSecondary}`}>
                  I'm a <span className="text-blue-400 font-bold">{roles[textIndex]}</span>
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
              <button className={`border-2 ${theme.borderSecondary} ${theme.textSecondary} px-8 py-4 rounded-xl font-medium hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300 flex items-center group`}>
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download CV
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform`}>
                <Github className="w-7 h-7" />
              </a>
              <a href="#" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform`}>
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="#" className={`${theme.textMuted} hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform`}>
                <Mail className="w-7 h-7" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className={`w-full h-96 ${isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-100 to-gray-200'} rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500 ${theme.border}`}>
              <div className={`text-center ${theme.text}`}>
                <div className="mb-6">
                  <TechStack3D />
                </div>
                <p className="text-xl font-semibold">Building the Future</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-20 animate-pulse"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </section>
    );
  };

  // About Section
  const AboutSection = () => (
    <section id="about" className={`py-24 ${theme.bg} relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className={`text-5xl font-bold ${theme.text} mb-6`}>About DeepCraft</h2>
          <p className={`text-xl ${theme.textMuted} max-w-3xl mx-auto`}>
            A passionate software engineer with expertise in modern web technologies, artificial intelligence, and data science
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className={`text-lg ${theme.textSecondary} leading-relaxed`}>
              I'm a dedicated software engineer with a passion for creating innovative solutions that bridge 
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
                <div className="text-4xl font-bold text-blue-400 mb-3">50+</div>
                <div className={`${theme.textMuted} font-medium`}>Projects Completed</div>
              </div>
              <div className={`text-center p-8 ${theme.card} rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}>
                <div className="text-4xl font-bold text-purple-400 mb-3">3+</div>
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
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          event.type === 'work' 
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
        title: "Programming Languages",
        category: "Programming Languages",
        skills: [
          { name: "JavaScript", icon: "🟨", level: 95 },
          { name: "Python", icon: "🐍", level: 90 },
          { name: "TypeScript", icon: "🔷", level: 88 },
          { name: "Java", icon: "☕", level: 85 },
          { name: "Dart", icon: "🎯", level: 80 }
        ]
      },
      {
        title: "Web & Mobile Development",
        category: "Web & Mobile Development",
        skills: [
          { name: "React", icon: "⚛️", level: 95 },
          { name: "Node.js", icon: "🟢", level: 90 },
          { name: "Next.js", icon: "▲", level: 88 },
          { name: "Express.js", icon: "🚂", level: 92 },
          { name: "Flask", icon: "🌶️", level: 85 },
          { name: "Nest.js", icon: "🔴", level: 80 }
        ]
      },
      {
        title: "Databases & ORMs",
        category: "Databases & ORMs",
        skills: [
          { name: "MongoDB", icon: "🍃", level: 90 },
          { name: "PostgreSQL", icon: "🐘", level: 85 },
          { name: "MySQL", icon: "🐬", level: 82 },
          { name: "Redis", icon: "🔴", level: 78 }
        ]
      },
      {
        title: "Cloud & DevOps",
        category: "Cloud & DevOps",
        skills: [
          { name: "AWS", icon: "☁️", level: 85 },
          { name: "Docker", icon: "🐳", level: 88 },
          { name: "Firebase", icon: "🔥", level: 90 },
          { name: "Kafka", icon: "⚡", level: 75 }
        ]
      },
      {
        title: "Developer Tools",
        category: "Developer Tools",
        skills: [
          { name: "Git", icon: "📂", level: 95 },
          { name: "GitHub", icon: "🐙", level: 95 },
          { name: "Postman", icon: "📮", level: 90 },
          { name: "VS Code", icon: "💻", level: 98 }
        ]
      },
      {
        title: "AI & Machine Learning",
        category: "Web & Mobile Development",
        skills: [
          { name: "TensorFlow", icon: "🧠", level: 88 },
          { name: "PyTorch", icon: "🔥", level: 85 },
          { name: "Scikit-learn", icon: "📊", level: 90 },
          { name: "OpenCV", icon: "👁️", level: 82 }
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
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === filter
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
                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skillIdx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="flex items-center space-x-2">
                          <span className="text-lg">{skill.icon}</span>
                          <span className={`${theme.text}`}>{skill.name}</span>
                        </span>
                        <span className="text-sm text-blue-400 font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-300/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
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

  // Contact Section
  const ContactSection = () => (
    <section id="contact" className={`py-24 ${theme.bgSecondary}`}>
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
    <footer className={`py-8 ${theme.bg} border-t ${theme.border}`}>
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <p className={`${theme.textMuted} text-sm`}>
          © {new Date().getFullYear()} DeepCraft. All Rights Reserved.
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
      <ContactSection />
      <Footer />
    </div>
  );
};

export default DeepCraftPortfolio;