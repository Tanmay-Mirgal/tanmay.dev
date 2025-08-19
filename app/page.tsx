"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Spline from '@splinetool/react-spline';
import { 
  Code2, 
  Brain, 
  Database, 
  Cpu, 
  Globe, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink,
  Download,
  ChevronDown,
  Sparkles,
  Zap,
  Layers,
  Terminal,
  Rocket,
  Shield,
  Eye,
  MousePointer
} from 'lucide-react';

const FuturisticPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

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

    // Loading simulation
    setTimeout(() => setIsLoading(false), 3000);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const skills = [
    { 
      name: 'MERN Stack', 
      icon: <Code2 className="w-8 h-8" />, 
      level: 95, 
      color: 'from-cyan-400 via-blue-500 to-purple-600',
      description: 'Full-stack mastery with MongoDB, Express, React, Node.js'
    },
    { 
      name: 'AI & Machine Learning', 
      icon: <Brain className="w-8 h-8" />, 
      level: 92, 
      color: 'from-purple-400 via-pink-500 to-red-500',
      description: 'Advanced ML algorithms, neural networks, and AI solutions'
    },
    { 
      name: 'TensorFlow & Deep Learning', 
      icon: <Cpu className="w-8 h-8" />, 
      level: 90, 
      color: 'from-green-400 via-emerald-500 to-teal-600',
      description: 'Deep neural networks, computer vision, NLP'
    },
    { 
      name: 'Convex Database', 
      icon: <Database className="w-8 h-8" />, 
      level: 88, 
      color: 'from-orange-400 via-red-500 to-pink-600',
      description: 'Real-time database with reactive queries'
    },
    { 
      name: 'Clerk Authentication', 
      icon: <Shield className="w-8 h-8" />, 
      level: 94, 
      color: 'from-yellow-400 via-orange-500 to-red-600',
      description: 'Secure authentication and user management'
    },
    { 
      name: 'LangChain GenAI', 
      icon: <Sparkles className="w-8 h-8" />, 
      level: 89, 
      color: 'from-indigo-400 via-purple-500 to-pink-600',
      description: 'Generative AI applications and LLM integration'
    },
  ];

  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of deep learning models with real-time training data and performance metrics.",
      tech: ["React", "Three.js", "TensorFlow.js", "WebGL", "D3.js"],
      gradient: "from-cyan-500 via-blue-600 to-purple-700",
      splineUrl: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
    },
    {
      title: "AI-Powered Code Assistant",
      description: "Advanced code completion and generation tool using transformer models and natural language processing.",
      tech: ["Next.js", "LangChain", "OpenAI", "Convex", "TypeScript"],
      gradient: "from-purple-500 via-pink-600 to-red-700",
      splineUrl: "https://prod.spline.design/pwdgVjjyBjyYGcQs/scene.splinecode"
    },
    {
      title: "Real-time Collaboration Platform",
      description: "Multi-user collaborative workspace with live editing, video calls, and AI-powered suggestions.",
      tech: ["React", "WebRTC", "Socket.io", "Clerk", "MongoDB"],
      gradient: "from-green-500 via-emerald-600 to-teal-700",
      splineUrl: "https://prod.spline.design/lVQWzjWA6up8BNjl/scene.splinecode"
    }
  ];

  // Loading Screen Component
  const LoadingScreen = () => (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-8"
            />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
            >
              Initializing Neural Networks...
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="w-64 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full mt-4 mx-auto"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Floating Navigation Component
  const FloatingNav = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    
    return (
      <motion.nav
        ref={ref}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 3.5 }}
        className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40"
      >
        <div className="bg-black/20 backdrop-blur-xl rounded-full px-8 py-4 border border-cyan-400/30 shadow-2xl shadow-cyan-500/20">
          <div className="flex space-x-8">
            {['Hero', 'About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
              <motion.button
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.toLowerCase()
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item}
                {activeSection === item.toLowerCase() && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-600/20"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.nav>
    );
  };

  // Hero Section with Spline Integration
  const HeroSection = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
      <section id="hero" className="min-h-screen relative overflow-hidden" ref={ref}>
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <Spline 
            scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 h-screen flex items-center">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 3.8 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 border border-cyan-400/30 rounded-full text-cyan-400 text-sm font-medium mb-4">
                <Zap className="w-4 h-4 inline mr-2" />
                Software Engineer & AI Specialist
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 4 }}
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-cyan-400 to-purple-600 bg-clip-text text-transparent">
                Neural
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Architect
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 4.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              Crafting intelligent systems with cutting-edge AI, building scalable applications with MERN stack, and pushing the boundaries of what's possible with technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 4.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {['MERN', 'AI/ML', 'TensorFlow', 'LangChain', 'Convex', 'Clerk'].map((tech, index) => (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400/10 to-purple-600/10 border border-cyan-400/30 rounded-lg backdrop-blur-sm"
                >
                  <span className="text-cyan-400 font-medium">{tech}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 4.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold text-lg flex items-center justify-center group"
              >
                <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Download Neural Resume
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-transparent border-2 border-purple-500 rounded-full font-semibold text-lg flex items-center justify-center hover:bg-purple-500/10 transition-all duration-300"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Launch Collaboration
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-cyan-400"
          >
            <MousePointer className="w-6 h-6 mb-2" />
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </section>
    );
  };

  // Skills Section with 3D Cards
  const SkillsSection = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
      <section id="skills" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Background Spline */}
        <div className="absolute inset-0 opacity-20">
          <Spline scene="https://prod.spline.design/pwdgVjjyBjyYGcQs/scene.splinecode" />
        </div>

        <div className="container mx-auto px-6 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Neural Capabilities
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Advanced technological expertise spanning full-stack development, artificial intelligence, and cutting-edge machine learning frameworks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5, 
                  z: 50,
                  boxShadow: "0 25px 50px rgba(6, 182, 212, 0.2)"
                }}
                className="group relative"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8 h-full transform-gpu transition-all duration-500 hover:border-cyan-400/50">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.8 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${skill.color} mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/25`}
                  >
                    {skill.icon}
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Proficiency</span>
                      <span className="text-sm font-bold text-cyan-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.1 + 0.5 }}
                        className={`h-2 bg-gradient-to-r ${skill.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Holographic Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Projects Section with Spline Integration
  const ProjectsSection = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
      <section id="projects" className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Neural Projects
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Cutting-edge applications that push the boundaries of AI, machine learning, and full-stack development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50, rotateX: -15 }}
                animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 2,
                  boxShadow: "0 30px 60px rgba(139, 92, 246, 0.3)"
                }}
                className="group relative h-[600px]"
              >
                <div className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl overflow-hidden h-full transform-gpu transition-all duration-700 hover:border-purple-500/50">
                  
                  {/* Spline 3D Model */}
                  <div className="h-64 relative overflow-hidden rounded-t-3xl">
                    <Spline 
                      scene={project.splineUrl}
                      style={{ width: '100%', height: '100%', transform: 'scale(1.1)' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 rounded-full text-sm font-medium text-purple-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </motion.button>
                    </div>
                  </div>

                  {/* Holographic Border Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Contact Section
  const ContactSection = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });

    return (
      <section id="contact" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        {/* Background Spline */}
        <div className="absolute inset-0 opacity-10">
          <Spline scene="https://prod.spline.design/lVQWzjWA6up8BNjl/scene.splinecode" />
        </div>

        <div className="container mx-auto px-6 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Neural Connection
            </h2>
            <p className="text-xl text-gray-300 mb-16">
              Ready to build the future together? Let's create something extraordinary.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-cyan-400/20 rounded-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Direct Neural Link</h3>
                      <p className="text-gray-300">your.email@neural.dev</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      href="#"
                      className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-400/30 rounded-xl text-purple-400 hover:text-white transition-colors duration-300"
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1, rotateY: 10 }}
                      href="#"
                      className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl text-cyan-400 hover:text-white transition-colors duration-300"
                    >
                      <Linkedin className="w-6 h-6" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                    type="text"
                    placeholder="Neural Name"
                    className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
                    required
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                    type="email"
                    placeholder="Neural Email"
                    className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
                <motion.input
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                  type="text"
                  placeholder="Neural Subject"
                  className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none transition-all duration-300"
                  required
                />
                <motion.textarea
                  whileFocus={{ scale: 1.02, boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" }}
                  placeholder="Neural Message"
                  rows={6}
                  className="w-full px-6 py-4 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400/50 focus:outline-none resize-none transition-all duration-300"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-xl font-semibold text-lg text-white hover:shadow-2xl transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Initiate Neural Connection
                  </span>
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-x-hidden">
      <LoadingScreen />
      <FloatingNav />
      
      {/* Cursor Follower */}
      <motion.div
        className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x * window.innerWidth,
          y: mousePosition.y * window.innerHeight,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <HeroSection />
      
      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Neural Biography
            </h2>
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-12">
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                I'm a visionary software engineer specializing in the convergence of artificial intelligence and full-stack development. My expertise spans the entire MERN ecosystem, advanced machine learning with TensorFlow, and cutting-edge generative AI implementations using LangChain.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                From architecting scalable real-time applications with Convex to implementing secure authentication systems with Clerk, I transform complex challenges into elegant, intelligent solutions that push the boundaries of what's possible in modern software development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <SkillsSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            © 2025 Neural Architect. Engineered with quantum precision and infinite creativity.
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default FuturisticPortfolio;