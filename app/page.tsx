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
  TrendingUp
} from "lucide-react";

const DeepCraftPortfolio = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-full backdrop-blur-sm"></div>
        {techItems.map((tech, index) => {
          const angle = (tech.angle + rotation) * (Math.PI / 180);
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          const scale = 0.8 + 0.2 * Math.sin((rotation + tech.angle) * (Math.PI / 180));
          
          return (
            <div
              key={tech.name}
              className={`absolute w-16 h-16 bg-gradient-to-br ${tech.color} rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg transform-gpu transition-transform duration-75`}
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <Code2 className="w-8 h-8 text-white" />
        </div>
      </div>
    );
  };

  // Navigation Component
  const Navigation = () => (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DeepCraft</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["Home", "About", "Timeline", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === "Home" ? "hero" : item.toLowerCase())}
                  className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === (item === "Home" ? "hero" : item.toLowerCase())
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                </button>
              ))}
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                Let's Talk
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
            <div className="px-6 py-4 space-y-4">
              {["Home", "About", "Timeline", "Skills", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item === "Home" ? "hero" : item.toLowerCase())}
                  className="block w-full text-left text-gray-600 hover:text-blue-600 font-medium py-2"
                >
                  {item}
                </button>
              ))}
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
      <section id="hero" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
                <Zap className="w-4 h-4 mr-2" />
                Available for new opportunities
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">DeepCraft</span>
              </h1>
              
              <div className="h-20">
                <p className="text-2xl lg:text-3xl text-gray-700">
                  I'm a <span className="text-blue-600 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{roles[textIndex]}</span>
                </p>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Passionate about creating innovative solutions with cutting-edge technologies. 
                Specialized in MERN stack, AI/ML, Deep Learning with TensorFlow, Flask, and building scalable applications that make a difference.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center group"
              >
                View My Work
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-medium hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 flex items-center group">
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download CV
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
                <Github className="w-7 h-7" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
                <Linkedin className="w-7 h-7" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors duration-300 hover:scale-110 transform">
                <Mail className="w-7 h-7" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <div className="text-center text-white">
                <div className="mb-6">
                  <TechStack3D />
                </div>
                <p className="text-xl font-semibold">Building the Future</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl opacity-80 animate-bounce delay-500"></div>
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-60 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  };

  // About Section
  const AboutSection = () => (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">About DeepCraft</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A passionate software engineer with expertise in modern web technologies, artificial intelligence, and data science
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <p className="text-lg text-gray-600 leading-relaxed">
              I'm a dedicated software engineer with a passion for creating innovative solutions that bridge 
              the gap between cutting-edge technology and real-world applications. My journey in tech spans 
              across full-stack development, artificial intelligence, machine learning, and data science.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              With expertise in the MERN stack, Python frameworks like Flask and Django, machine learning 
              libraries including TensorFlow and PyTorch, I focus on building scalable, secure, and 
              user-friendly applications that deliver exceptional experiences.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-blue-600 mb-3">50+</div>
                <div className="text-gray-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl font-bold text-purple-600 mb-3">3+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-10 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">What I Do</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Full Stack Development</h4>
                  <p className="text-gray-600">Building end-to-end web applications with MERN stack and modern technologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">AI & Machine Learning</h4>
                  <p className="text-gray-600">Developing intelligent systems with TensorFlow, PyTorch, and deep learning</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Data Science & Analytics</h4>
                  <p className="text-gray-600">Extracting insights from data using Python, Flask, and advanced analytics</p>
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
      },
      {
        year: "2021",
        title: "Computer Science Degree",
        company: "University of Technology",
        type: "education",
        description: "Bachelor's in Computer Science with focus on software engineering and artificial intelligence.",
        skills: ["Data Structures", "Algorithms", "Software Engineering"]
      }
    ];

    return (
      <section id="timeline" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">My Journey</h2>
            <p className="text-xl text-gray-600">Professional milestones and educational achievements</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-purple-500 h-full"></div>

            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} relative`}>
                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          event.type === 'work' 
                            ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                            : 'bg-gradient-to-br from-green-500 to-green-600'
                        }`}>
                          {event.type === 'work' ? <Briefcase className="w-6 h-6 text-white" /> : <GraduationCap className="w-6 h-6 text-white" />}
                        </div>
                        <div className="text-2xl font-bold text-blue-600">{event.year}</div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-lg text-blue-600 font-semibold mb-4">{event.company}</p>
                      <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {event.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
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

  // Enhanced Skills Section
  const SkillsSection = () => {
    const skillCategories = [
      {
        title: "Frontend",
        icon: <Globe className="w-7 h-7" />,
        color: "from-blue-500 to-blue-600",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"]
      },
      {
        title: "Backend",
        icon: <Database className="w-7 h-7" />,
        color: "from-green-500 to-green-600",
        skills: ["Node.js", "Express", "Flask", "Django", "REST APIs", "GraphQL", "Microservices"]
      },
      {
        title: "Database",
        icon: <Cpu className="w-7 h-7" />,
        color: "from-purple-500 to-purple-600",
        skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "DynamoDB"]
      },
      {
        title: "AI & ML",
        icon: <Brain className="w-7 h-7" />,
        color: "from-orange-500 to-red-500",
        skills: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV", "NLP", "Deep Learning"]
      },
      {
        title: "Languages",
        icon: <Code2 className="w-7 h-7" />,
        color: "from-indigo-500 to-indigo-600",
        skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "SQL", "R"]
      },
      {
        title: "Tools & Cloud",
        icon: <Layers className="w-7 h-7" />,
        color: "from-teal-500 to-teal-600",
        skills: ["AWS", "Docker", "Kubernetes", "Git", "Jenkins", "Nginx", "Linux"]
      }
    ];

    return (
      <section id="skills" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Skills & Expertise</h2>
            <p className="text-xl text-gray-600">Technologies and tools I work with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                </div>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <div className="text-gray-700 font-medium">{skill}</div>
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

  // Enhanced Projects Section
  const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState("all");
    
    const projects = [
      {
        title: "AI-Powered Code Assistant",
        description: "Advanced code completion and generation tool using transformer models, built with Flask backend and React frontend.",
        image: "bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600",
        tech: ["Flask", "TensorFlow", "React", "OpenAI", "TypeScript"],
        category: "ai",
        featured: true,
        stats: { views: "2.5k", likes: "128", users: "50+" }
      },
      {
        title: "Real-time Collaboration Platform",
        description: "Multi-user collaborative workspace with live editing, video calls, and AI-powered suggestions using MERN stack.",
        image: "bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600",
        tech: ["MERN Stack", "Socket.io", "WebRTC", "MongoDB", "Express"],
        category: "web",
        stats: { views: "1.8k", likes: "94", users: "30+" }
      },
      {
        title: "ML Model Deployment Platform",
        description: "Cloud-based platform for deploying and scaling machine learning models with monitoring capabilities.",
        image: "bg-gradient-to-br from-green-500 via-green-600 to-emerald-600",
        tech: ["Flask", "TensorFlow", "Docker", "AWS", "PostgreSQL"],
        category: "ml",
        stats: { views: "3.1k", likes: "156", users: "75+" }
      },
      {
        title: "E-commerce Analytics Dashboard",
        description: "Comprehensive analytics platform for e-commerce businesses with predictive insights and real-time metrics.",
        image: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
        tech: ["React", "Flask", "MongoDB", "Chart.js", "Python"],
        category: "web",
        stats: { views: "2.2k", likes: "87", users: "40+" }
      },
      {
        title: "Computer Vision Object Detection",
        description: "Real-time object detection system using deep learning for autonomous vehicle applications.",
        image: "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
        tech: ["PyTorch", "OpenCV", "Flask", "React", "YOLO"],
        category: "ai",
        stats: { views: "1.9k", likes: "112", users: "25+" }
      },
      {
        title: "Blockchain Voting System",
        description: "Secure and transparent voting system built on blockchain technology with React frontend.",
        image: "bg-gradient-to-br from-gray-600 via-gray-700 to-black",
        tech: ["Solidity", "Web3.js", "React", "Node.js", "Ethereum"],
        category: "web",
        stats: { views: "1.4k", likes: "73", users: "15+" }
      }
    ];

    const filters = [
      { key: "all", label: "All Projects" },
      { key: "ai", label: "AI/ML" },
      { key: "web", label: "Web Apps" },
      { key: "ml", label: "Machine Learning" }
    ];

    const filteredProjects = activeFilter === "all" 
      ? projects 
      : projects.filter(project => project.category === activeFilter);

    return (
      <section id="projects" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-600 mb-8">Some of my recent work and innovative solutions</p>
            
            {/* Project Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === filter.key
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm hover:shadow-md"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 group ${project.featured ? 'lg:col-span-2 lg:row-span-1' : ''}`}>
                <div className={`h-48 ${project.image} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <Code2 className="w-16 h-16 text-white opacity-90 group-hover:scale-110 transition-transform relative z-10" />
                  
                  {/* Project Stats */}
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                    <div className="flex items-center space-x-2 text-white text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{project.stats.views}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">{project.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 transition-all duration-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-4 h-4" />
                      <span>{project.stats.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.stats.users}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>Trending</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:scale-105 transition-all">
                      <Github className="w-5 h-5 mr-2" />
                      Code
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:scale-105 transition-all">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </button>
                    <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:scale-105 transition-all">
                      <Play className="w-5 h-5 mr-2" />
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center mx-auto group">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    );
  };

  // Enhanced Contact Section
  const ContactSection = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to work together? Let's build something amazing!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Let's Connect</h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  I'm always interested in new opportunities, innovative projects, and connecting with fellow developers. 
                  Whether you have a project in mind or just want to chat about tech, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">deepcraft.dev@example.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Github className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">GitHub</h4>
                    <p className="text-gray-600">github.com/deepcraft</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Linkedin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">LinkedIn</h4>
                    <p className="text-gray-600">linkedin.com/in/deepcraft</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Location</h4>
                    <p className="text-gray-600">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  />
                </div>
                
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                />
                
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={6}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-lg"
                />

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center text-lg group"
                >
                  Send Message
                  <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Terminal className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">DeepCraft</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Building innovative solutions with cutting-edge technologies. 
                Specialized in MERN stack, AI/ML, and scalable applications.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                {["About", "Skills", "Projects", "Contact"].map((link) => (
                  <button key={link} onClick={() => scrollToSection(link.toLowerCase())} className="block text-gray-300 hover:text-white transition-colors">
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xl font-semibold mb-6">Tech Stack</h4>
              <div className="space-y-3 text-gray-300">
                <div>MERN Stack</div>
                <div>Python/Flask</div>
                <div>TensorFlow</div>
                <div>AI/ML</div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-gray-300">
              © 2025 DeepCraft. Built with React, Tailwind CSS, and lots of ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeepCraftPortfolio;