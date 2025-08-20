"use client";
import React, { useState, useEffect } from "react";
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
  Zap,
  Sparkles,
  MousePointer,
  Users,
  X,
  Menu,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const roles = ["Full-Stack Developer", "ML Engineer", "Open Source Contributor"];

const skills = [
  { icon: <Code2 className="w-6 h-6" />, name: "Frontend Development" },
  { icon: <Database className="w-6 h-6" />, name: "Backend Development" },
  { icon: <Brain className="w-6 h-6" />, name: "Machine Learning" },
  { icon: <Cpu className="w-6 h-6" />, name: "System Design" },
];

const projects = [
  {
    title: "AspireLink",
    description:
      "A platform connecting students with mentors, offering personalized career guidance and resources.",
    tags: ["React", "Node.js", "MongoDB", "Tailwind"],
    link: "#",
  },
  {
    title: "AI Packaging Designer",
    description:
      "AI-powered product packaging designer using GANs and natural language editing.",
    tags: ["Python", "Flask", "GANs", "LLMs"],
    link: "#",
  },
];

const timelineEvents = [
  { year: "2023", text: "Started my journey into AI/ML & full-stack development" },
  { year: "2024", text: "Built AspireLink and several open-source projects" },
  { year: "2025", text: "Working on AI-powered design tools & cloud IDEs" },
];

export default function Portfolio() {
  const [textIndex, setTextIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <motion.h1
            className="text-xl font-bold tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            DeepCraft
          </motion.h1>

          <nav className="hidden md:flex gap-6">
            {["About", "Skills", "Projects", "Timeline", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-400 transition"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="md:hidden bg-black border-t border-white/10"
            >
              <div className="flex flex-col p-4 space-y-4">
                {["About", "Skills", "Projects", "Timeline", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="hover:text-blue-400 transition"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Hi, I&apos;m DeepCraft
          </motion.h2>
          <motion.p
            key={textIndex}
            className="text-xl md:text-2xl mt-4 text-blue-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {roles[textIndex]}
          </motion.p>
          <div className="mt-6 flex justify-center gap-4">
            <Button>
              <Download className="w-4 h-4 mr-2" /> Resume
            </Button>
            <Button variant="outline">Contact</Button>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8">Skills</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition"
            >
              <CardContent className="flex flex-col items-center p-6">
                {skill.icon}
                <p className="mt-4">{skill.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8">Projects</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition"
            >
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold">{project.title}</h4>
                <p className="text-gray-400 mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="flex items-center text-blue-400 mt-4"
                >
                  View Project <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8">Timeline</h3>
        <div className="space-y-6">
          {timelineEvents.map((event) => (
            <motion.div
              key={event.year}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-blue-400 font-bold">{event.year}</div>
              <p>{event.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-8">Contact</h3>
        <div className="flex gap-6">
          <a href="mailto:deepcraft@example.com" className="flex items-center gap-2 hover:text-blue-400">
            <Mail /> Email
          </a>
          <a href="https://github.com/deepcraft" className="flex items-center gap-2 hover:text-blue-400">
            <Github /> GitHub
          </a>
          <a href="https://linkedin.com/in/deepcraft" className="flex items-center gap-2 hover:text-blue-400">
            <Linkedin /> LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
}
