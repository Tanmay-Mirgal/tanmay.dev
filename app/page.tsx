"use client";

import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  FileImage,
  FileText,
  Github,
  Linkedin,
  Link2,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type PageId = "home" | "projects" | "achievements" | "tech" | "timeline" | "contact";

const navItems: Array<{ id: PageId; label: string }> = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "achievements", label: "Achievements" },
  { id: "tech", label: "Tech Stack" },
  { id: "timeline", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

const projects = [
  {
    icon: "🛒",
    category: "Featured · Full-Stack",
    title: "E-Commerce Platform",
    description:
      "Production-ready e-commerce app with product catalog, cart, Stripe checkout, admin dashboard & real-time inventory tracking. Handles 10k+ concurrent users via Redis caching. Full auth with JWT + Cloudinary for media.",
    stack: ["React", "Redux", "Node.js", "PostgreSQL", "Redis", "Cloudinary", "Docker", "AWS"],
    featured: true,
    bg: "linear-gradient(135deg,rgba(232,52,28,.15),rgba(245,158,11,.1))",
    liveLabel: "Live Demo",
  },
  {
    icon: "🤖",
    category: "ML / DL · Computer Vision",
    title: "Face Recognition Attendance",
    description:
      "Real-time face detection & recognition using OpenCV + TensorFlow. 98.5% accuracy. Auto-marks attendance with a React dashboard for reports & analytics.",
    stack: ["Python", "TensorFlow", "OpenCV", "React", "MongoDB"],
    featured: false,
    bg: "linear-gradient(135deg,rgba(99,102,241,.15),rgba(139,92,246,.1))",
    liveLabel: "Demo",
  },
  {
    icon: "💬",
    category: "Full-Stack · Real-Time",
    title: "DevChat — Realtime Messaging",
    description:
      "Slack-like messaging with rooms, DMs, file uploads via Cloudinary, presence indicators, and read receipts. WebSockets + JWT auth.",
    stack: ["React", "Zustand", "Socket.io", "Node.js", "MongoDB", "Cloudinary"],
    featured: false,
    bg: "linear-gradient(135deg,rgba(20,184,166,.15),rgba(6,182,212,.1))",
    liveLabel: "Live",
  },
  {
    icon: "📊",
    category: "Data Science · ML",
    title: "Stock Price Predictor",
    description:
      "LSTM neural network trained on 5 years of NIFTY 50 data. 87% directional accuracy. Interactive charts with Seaborn + full Pandas preprocessing pipeline.",
    stack: ["Python", "TensorFlow", "Pandas", "Seaborn", "Scikit-Learn"],
    featured: false,
    bg: "linear-gradient(135deg,rgba(245,158,11,.15),rgba(239,68,68,.1))",
    liveLabel: "Notebook",
  },
  {
    icon: "⚙️",
    category: "DevOps · Open Source",
    title: "AutoDeploy CLI",
    description:
      "CLI tool that scaffolds Docker + GitHub Actions CI/CD pipelines for Node.js and Python apps in <60 seconds. 400+ GitHub stars, 5k+ npm installs.",
    stack: ["Node.js", "Docker", "AWS", "GitHub Actions", "Bash"],
    featured: false,
    bg: "linear-gradient(135deg,rgba(16,185,129,.15),rgba(6,182,212,.1))",
    liveLabel: "npm",
  },
  {
    icon: "📝",
    category: "Full-Stack · SaaS",
    title: "NoteAI — Smart Note Taking",
    description:
      "AI-powered notes that auto-summarize, tag, and interlink with NLP. Built with Zustand state machine, markdown editor, and PostgreSQL full-text search.",
    stack: ["React", "Zustand", "Express", "PostgreSQL", "Python NLP"],
    featured: false,
    bg: "linear-gradient(135deg,rgba(232,52,28,.12),rgba(255,115,36,.08))",
    liveLabel: "Live",
  },
];

const achievements = [
  {
    year: "2024 · Featured",
    icon: "🏆",
    title: "Product Hunt — #1 Product of the Day",
    description:
      "Led full-stack engineering for an AI-powered productivity SaaS that launched to 900+ upvotes, onboarded 2,500 users in 48 hours, and trended globally for 3 days straight.",
    tag: "SaaS · AI · Launch",
    wide: true,
  },
  {
    year: "2024",
    icon: "⭐",
    title: "Open Source — 1.8k GitHub Stars",
    description:
      "Published a React component library with 45k monthly npm downloads and 50+ external contributors worldwide.",
    tag: "Open Source · npm",
  },
  {
    year: "2023",
    icon: "⚡",
    title: "Hackathon Winner — HackIndia",
    description:
      "First place among 600 teams. Built an ML-based crop disease detector using OpenCV + React Native in 36 hours.",
    tag: "ML · Hackathon",
  },
  {
    year: "2023",
    icon: "✍️",
    title: "Tech Blog — 200k+ Reads",
    description:
      'Authored a 12-part "Full-Stack ML Deployment" series that trended on Dev.to and was featured in JavaScript & Python Weekly.',
    tag: "Writing · Content",
  },
  {
    year: "2023",
    icon: "🎤",
    title: "Speaker — PyCon India 2023",
    description:
      'Delivered a talk on "Deploying TensorFlow Models at Scale with Docker & AWS" to 2,000+ developers.',
    tag: "Conference · Python",
  },
  {
    year: "2022",
    icon: "🌍",
    title: "GSSoC Top 10 Contributor",
    description:
      "Ranked Top 10 in GirlScript Summer of Code 2022, contributing to 8+ open-source repositories across the ecosystem.",
    tag: "Open Source · GSSoC",
  },
  {
    year: "2022",
    icon: "💼",
    title: "Freelance Milestone — $30k Earned",
    description:
      "Crossed $30,000 in freelance revenue working with international clients on full-stack apps and ML integrations.",
    tag: "Freelance · Business",
  },
  {
    year: "2021",
    icon: "🎓",
    title: "University Gold Medalist",
    description:
      "Graduated top of batch in B.E. Computer Engineering with 9.7 CGPA and two IEEE research publications on deep learning.",
    tag: "Academic · IEEE",
  },
  {
    year: "2021",
    icon: "🚀",
    title: "AWS Solutions Architect Associate — Score 920/1000",
    description:
      "Earned the AWS SAA certification with 920/1000. Also completed Docker & Kubernetes certifications from Linux Foundation — a DevOps trifecta that now powers every deployment I ship.",
    tag: "AWS · DevOps · Certified",
    wide: true,
  },
];

type AchievementMediaType = "image" | "pdf";

type AchievementMedia = {
  title: string;
  year: string;
  type: AchievementMediaType;
  file: string;
  thumbnail?: string;
  alt?: string;
  source: string;
};

const achievementMedia: AchievementMedia[] = [
  {
    title: "Product Hunt #1 - Launch Snapshot",
    year: "2024",
    type: "image",
    file: "/achievements/product-hunt-1.png",
    thumbnail: "/achievements/product-hunt-1.png",
    alt: "Product Hunt ranking screenshot",
    source: "Product Hunt",
  },
  {
    title: "AWS Solutions Architect Certificate",
    year: "2021",
    type: "pdf",
    file: "/achievements/aws-saa-certificate.pdf",
    source: "Amazon Web Services",
  },
  {
    title: "Hackathon Winner Announcement",
    year: "2023",
    type: "image",
    file: "/achievements/hackathon-win-photo.jpg",
    thumbnail: "/achievements/hackathon-win-photo.jpg",
    alt: "Hackathon winner ceremony photo",
    source: "HackIndia",
  },
  {
    title: "PyCon India Speaker Proof",
    year: "2023",
    type: "pdf",
    file: "/achievements/pycon-speaker-proof.pdf",
    source: "PyCon India",
  },
  {
    title: "Open Source Milestone Graphic",
    year: "2024",
    type: "image",
    file: "/achievements/open-source-milestone.png",
    thumbnail: "/achievements/open-source-milestone.png",
    alt: "GitHub stars milestone graphic",
    source: "GitHub",
  },
  {
    title: "University Gold Medal Certificate",
    year: "2021",
    type: "pdf",
    file: "/achievements/gold-medal-certificate.pdf",
    source: "University",
  },
];

const backlinkTargets = [
  {
    label: "GitHub Profile",
    href: "https://github.com/yourname",
    note: "Open-source projects and code references.",
  },
  {
    label: "LinkedIn Profile",
    href: "https://linkedin.com/in/yourname",
    note: "Professional profile and experience proof.",
  },
  {
    label: "Dev.to Articles",
    href: "https://dev.to/yourname",
    note: "Technical articles for content authority.",
  },
];

const techSections = [
  {
    heading: "Frontend",
    subheading: "UI & Interaction Layer",
    pills: [
      { name: "HTML5", color: "#e34c26" },
      { name: "CSS3", color: "#264de4" },
      { name: "JavaScript", color: "#f7df1e" },
      { name: "React", color: "#61dafb" },
      { name: "Redux", color: "#764abc" },
      { name: "Zustand", color: "#ff7324" },
      { name: "TailwindCSS", color: "#38bdf8" },
    ],
  },
  {
    heading: "Backend",
    subheading: "APIs & Databases",
    pills: [
      { name: "Node.js", color: "#68a063" },
      { name: "Express.js", color: "#aaa" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "MongoDB", color: "#4db33d" },
      { name: "Redis", color: "#dc382d" },
      { name: "Cloudinary", color: "#3448c5" },
    ],
  },
  {
    heading: "ML / DL & Data Science",
    subheading: "Intelligence Layer",
    pills: [
      { name: "Python", color: "#e8c84a" },
      { name: "TensorFlow", color: "#ff6f00" },
      { name: "Scikit-Learn", color: "#f89939" },
      { name: "Pandas", color: "#a78bfa" },
      { name: "OpenCV", color: "#5c8dbc" },
      { name: "Seaborn", color: "#3c78aa" },
    ],
  },
  {
    heading: "DevOps & Tools",
    subheading: "Infra & Workflow",
    pills: [
      { name: "Git & GitHub", color: "#f05032" },
      { name: "Postman", color: "#ef5b25" },
      { name: "Figma", color: "#a259ff" },
      { name: "AWS", color: "#ff9900" },
      { name: "Docker", color: "#2496ed" },
      { name: "GitHub Actions", color: "#2088ff" },
    ],
  },
];

const proficiencies = [
  { name: "React + Zustand / Redux", value: 94 },
  { name: "Node.js + Express.js", value: 92 },
  { name: "Python · ML / DL / DS", value: 88 },
  { name: "PostgreSQL + MongoDB", value: 87 },
  { name: "TensorFlow + OpenCV", value: 83 },
  { name: "Docker + AWS + CI/CD", value: 80 },
  { name: "TailwindCSS + Figma", value: 90 },
  { name: "Redis + Caching", value: 78 },
];

const timeline = [
  {
    year: "2024",
    period: "Present",
    type: "// Current",
    title: "Freelance Full-Stack & ML Engineer",
    company: "Independent · Remote · Worldwide",
    description:
      "Building end-to-end web applications and ML-powered products for international clients. From SaaS MVPs to full ML pipelines. Maintaining a 5-star rating across freelance platforms.",
    tags: ["React", "Node.js", "Python", "TensorFlow", "AWS"],
  },
  {
    year: "2023",
    period: "2024",
    type: "// Full Time",
    title: "Software Engineer — Full Stack",
    company: "Tech Startup · Mumbai, India",
    description:
      "Built a B2B SaaS analytics dashboard — React frontend, Express REST APIs, PostgreSQL backend. Integrated Scikit-Learn churn prediction model. Reduced page load time by 55% with Redis caching.",
    tags: ["React", "Redux", "PostgreSQL", "Redis", "Scikit-Learn"],
  },
  {
    year: "2022",
    period: "2023",
    type: "// Open Source",
    title: "Open Source Contributor + GSSoC Top 10",
    company: "GitHub · Various Projects",
    description:
      "Deep-dived into open source — contributed to 8+ repos, finished Top 10 in GSSoC. Released a React UI library that crossed 1k GitHub stars and 45k monthly npm downloads.",
    tags: ["React", "TailwindCSS", "GSSoC", "Open Source"],
  },
  {
    year: "2021",
    period: "2022",
    type: "// Internship",
    title: "ML Engineering Intern",
    company: "AI Research Lab · Bangalore, India",
    description:
      "Trained and deployed computer vision models with TensorFlow + OpenCV for a healthcare startup. Built Pandas preprocessing pipelines, created Seaborn reports, deployed on AWS EC2.",
    tags: ["TensorFlow", "OpenCV", "Pandas", "AWS"],
  },
  {
    year: "2020",
    period: "2021",
    type: "// Internship",
    title: "Web Development Intern",
    company: "Digital Agency · Remote",
    description:
      "Built client websites with React + TailwindCSS. Learned Node/Express, set up MongoDB databases, deployed on AWS. Received a pre-placement offer upon completion.",
    tags: ["React", "Node.js", "MongoDB", "TailwindCSS"],
  },
  {
    year: "2017",
    period: "2021",
    type: "// Education",
    title: "B.E. Computer Engineering — Gold Medalist",
    company: "University · India",
    description:
      "Graduated with 9.7 CGPA. Published 2 IEEE papers on deep learning. Founded the university coding club with 300+ members and organized 5 hackathons across 4 years.",
    tags: ["Gold Medal", "IEEE", "9.7 CGPA", "Club Founder"],
  },
];

export default function Home() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const curRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const personJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Your Name",
      url: "https://tanmay.dev",
      jobTitle: "Full-Stack and ML Engineer",
      sameAs: backlinkTargets.map((item) => item.href),
      knowsAbout: [
        "Full Stack Development",
        "Machine Learning",
        "Deep Learning",
        "DevOps",
        "React",
        "Node.js",
        "TensorFlow",
      ],
    }),
    []
  );
  const websiteJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Portfolio - Full Stack and ML Engineer",
      url: "https://tanmay.dev",
      description:
        "Portfolio featuring full-stack projects, achievements, technical timeline, and machine learning work.",
    }),
    []
  );

  const go = (id: PageId) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const cur = curRef.current;
    const ring = ringRef.current;
    if (!cur || !ring) return;
    const canUseCustomCursor = window.matchMedia("(pointer: fine)").matches;
    if (!canUseCustomCursor) {
      cur.style.display = "none";
      ring.style.display = "none";
      return;
    }

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const onMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
      cur.style.left = `${mx}px`;
      cur.style.top = `${my}px`;
    };

    const animate = () => {
      rx += (mx - rx) * 0.11;
      ry += (my - ry) * 0.11;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      rafId = requestAnimationFrame(animate);
    };

    const hoverTargets = document.querySelectorAll("a,button,.mc,.ac,.amc,.tp,.pj,.tl-c,.ct-it,.rp,.seo-link");
    const addHover = () => document.body.classList.add("cg");
    const removeHover = () => document.body.classList.remove("cg");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  const onAchievementMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--ax", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--ay", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const SectionFooter = ({ pageName }: { pageName: string }) => (
    <footer>
      <div className="fc">© 2026 Your Name · <span style={{ color: "var(--orange)" }}>{pageName}</span></div>
      <div className="fl">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            go("home");
          }}
        >
          ← Home
        </a>
      </div>
    </footer>
  );

  return (
    <>
      <Script id="person-jsonld" type="application/ld+json">
        {JSON.stringify(personJsonLd)}
      </Script>
      <Script id="website-jsonld" type="application/ld+json">
        {JSON.stringify(websiteJsonLd)}
      </Script>
      <div id="cur" ref={curRef} />
      <div id="cur-r" ref={ringRef} />

      <div className="aurora">
        <div className="ab" />
        <div className="ab" />
        <div className="ab" />
      </div>

      <nav>
        <div className="nav-logo" onClick={() => go("home")}>
          DEV<span style={{ opacity: 0.4 }}>.</span>FOLIO
        </div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                id={`n-${item.id}`}
                className={activePage === item.id ? "active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="home" className={`page ${activePage === "home" ? "active" : ""}`}>
        <div className="hero">
          <div className="hero-chip fu d1">
            <div className="cdot" />
            Available for Freelance & Full-Time Roles
          </div>
          <h1 className="hero-name fu d2">
            <span className="ln1">Full-Stack</span>
            <span className="ln2">Engineer.</span>
          </h1>
          <p className="hero-tag fu d3">
            Building <strong>scalable web apps</strong>, training <strong>ML/DL models</strong>,
            <br />
            shipping open source & automating with <strong>DevOps</strong>.
          </p>
          <div className="hero-roles fu d4">
            <span className="rp">🌐 Full-Stack Dev</span>
            <span className="rp">🤖 ML & DL Engineer</span>
            <span className="rp">🌍 Open Source Contributor</span>
            <span className="rp">💼 Freelancer</span>
            <span className="rp">⚙️ DevOps</span>
          </div>
          <div className="hero-cta fu d5">
            <Button className="btn-g" onClick={() => go("projects")}>
              View Projects <ExternalLink size={14} />
            </Button>
            <Button className="btn-gl" onClick={() => go("contact")}>
              Contact Me
            </Button>
          </div>

          <div className="hero-card glass2 fu d6">
            <div className="hca">YN</div>
            <div className="hcn">Your Name</div>
            <div className="hct">
              Full-Stack · ML/DL · DevOps
              <br />
              Based in India 🇮🇳
            </div>
            <div className="hcs-g">
              <div className="hcs">
                <div className="hcs-n">
                  3<span>+</span>
                </div>
                <div className="hcs-l">Years</div>
              </div>
              <div className="hcs">
                <div className="hcs-n">
                  25<span>+</span>
                </div>
                <div className="hcs-l">Projects</div>
              </div>
              <div className="hcs">
                <div className="hcs-n">
                  10<span>+</span>
                </div>
                <div className="hcs-l">Clients</div>
              </div>
            </div>
          </div>

          <div className="hero-scroll fu d6">
            <div className="sbar" />
            Scroll down
          </div>
        </div>

        <div className="about-wrap">
          <div className="about-in">
            <div>
              <div className="s-lbl">About Me</div>
              <h2 className="about-h2">
                Code, models &
                <br />
                <em className="gt">open source.</em>
              </h2>
              <p className="abt-p">
                I&apos;m a <strong>Full-Stack Developer</strong> who lives at the intersection of beautiful UIs, robust
                APIs, and intelligent systems. I build end-to-end products — from pixel-perfect React frontends to
                ML-powered backends.
              </p>
              <p className="abt-p">
                Passionate about <strong>open source</strong> — regularly contributing to projects and publishing my own
                tools on GitHub. I take on freelance work to help startups ship fast without sacrificing quality.
              </p>
              <p className="abt-p">
                On infrastructure, I automate deployments with <strong>Docker, AWS & CI/CD pipelines</strong> — because
                great software deserves a great delivery system.
              </p>
            </div>
            <div className="cards2x2">
              <div className="mc">
                <div className="mc-i">⚡</div>
                <div className="mc-t">Full-Stack</div>
                <div className="mc-d">React + Redux/Zustand, Node/Express, PostgreSQL & MongoDB.</div>
              </div>
              <div className="mc">
                <div className="mc-i">🤖</div>
                <div className="mc-t">ML / DL</div>
                <div className="mc-d">TensorFlow, Scikit-Learn, OpenCV — from training to deployment.</div>
              </div>
              <div className="mc">
                <div className="mc-i">🌍</div>
                <div className="mc-t">Open Source</div>
                <div className="mc-d">Active GitHub contributor. I believe in building in public.</div>
              </div>
              <div className="mc">
                <div className="mc-i">⚙️</div>
                <div className="mc-t">DevOps</div>
                <div className="mc-d">Docker, AWS, CI/CD — ship with confidence, scale without fear.</div>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div className="fc">© 2026 Your Name · Built with passion & ☕</div>
          <div className="fl">
            <a href="#">
              <Github size={14} />
              GitHub
            </a>
            <a href="#">
              <Linkedin size={14} />
              LinkedIn
            </a>
            <a href="#">Twitter</a>
          </div>
        </footer>
      </section>

      <section id="projects" className={`page ${activePage === "projects" ? "active" : ""}`}>
        <div className="ph">
          <div className="s-lbl">What I&apos;ve Built</div>
          <h1>
            Pro<span className="gt">jects.</span>
          </h1>
          <p>Full-stack apps, ML systems, DevOps tools & open-source contributions.</p>
        </div>
        <div className="proj-g">
          {projects.map((project) => (
            <div key={project.title} className={`pj ${project.featured ? "pj-feat" : ""}`}>
              <div className="pj-bn" style={{ background: project.bg }}>
                {project.icon}
              </div>
              <div className="pj-b">
                <div className="pj-cat">{project.category}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="pj-stk">
                  {project.stack.map((item) => (
                    <span key={item} className="pt">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="pj-lnks">
                  <Button asChild className="pl s">
                    <a href="#">
                      {project.liveLabel} <ExternalLink size={12} />
                    </a>
                  </Button>
                  <Button asChild className="pl">
                    <a href="#">
                      GitHub <ArrowRight size={12} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SectionFooter pageName="Projects" />
      </section>

      <section id="achievements" className={`page ${activePage === "achievements" ? "active" : ""}`}>
        <div className="ph">
          <div className="s-lbl">Milestones</div>
          <h1>
            Achieve<span className="gt">ments.</span>
          </h1>
          <p>Recognition, awards & milestones marking my journey as an engineer and creator.</p>
        </div>
        <div className="ag">
          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              className={`ac ${achievement.wide ? "ac-wide" : ""}`}
              onMouseMove={onAchievementMove}
            >
              <div className="ac-yr">{achievement.year}</div>
              <span className="ac-ic">{achievement.icon}</span>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              <span className="ac-tag">{achievement.tag}</span>
            </div>
          ))}
        </div>
        <div className="am-wrap">
          <div className="s-lbl">Proof Vault</div>
          <h2 className="am-h2">Achievement Photos, Screenshots, and Certificates</h2>
          <p className="am-p">
            Add your real images and PDF proof files inside the <code>public/achievements</code> folder, then update the
            <code> achievementMedia </code> list in <code>app/page.tsx</code>. These assets strengthen trust, content
            quality, and search visibility.
          </p>
          <div className="am-g">
            {achievementMedia.map((item) => (
              <article key={item.title} className="amc">
                <div className="am-thumb">
                  {item.type === "image" && item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.alt ?? item.title}
                      fill
                      className="am-image"
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  ) : item.type === "image" ? (
                    <div className="am-placeholder">
                      <FileImage size={20} />
                      <span>Image Preview</span>
                    </div>
                  ) : (
                    <div className="am-placeholder">
                      <FileText size={20} />
                      <span>PDF Preview</span>
                    </div>
                  )}
                </div>
                <div className="am-body">
                  <p className="am-year">{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.source}</p>
                  <a href={item.file} target="_blank" rel="noopener noreferrer">
                    Open File <ExternalLink size={12} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="seo-wrap">
          <div className="s-lbl">SEO Growth</div>
          <h2 className="seo-h2">Content Quality, Backlinks, Speed, and Search Competition</h2>
          <p className="seo-p">
            This portfolio now includes structured metadata and evidence-rich achievement content. To rank better over
            time, keep publishing fresh proof, detailed case studies, and authority links from trusted platforms.
          </p>
          <div className="seo-grid">
            <div className="seo-card">
              <h3>Content Quality</h3>
              <p>Add detailed project outcomes, metrics, and media proof every month.</p>
            </div>
            <div className="seo-card">
              <h3>Page Speed</h3>
              <p>Use compressed images, WebP formats, and keep JavaScript light on mobile.</p>
            </div>
            <div className="seo-card seo-card-wide">
              <h3>Backlinks and Competition Strategy</h3>
              <p>Publish consistently on trusted platforms and connect those profiles to this portfolio.</p>
              <div className="seo-links">
                {backlinkTargets.map((item) => (
                  <a key={item.label} className="seo-link" href={item.href} target="_blank" rel="noopener noreferrer">
                    <span>
                      {item.label}
                      <small>{item.note}</small>
                    </span>
                    <Link2 size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <SectionFooter pageName="Achievements" />
      </section>

      <section id="tech" className={`page ${activePage === "tech" ? "active" : ""}`}>
        <div className="ph">
          <div className="s-lbl">Arsenal</div>
          <h1>
            Tech
            <br />
            <span className="gt">Stack.</span>
          </h1>
          <p>Every tool, framework & platform I wield to build, train, deploy and scale.</p>
        </div>
        <div className="tech-w">
          {techSections.map((section) => (
            <div key={section.heading} className="tc">
              <div className="tc-h">
                <span className="tc-b">{section.heading}</span>
                {section.subheading}
              </div>
              <div className="tps">
                {section.pills.map((pill) => (
                  <div key={pill.name} className="tp">
                    <div
                      className="tpd"
                      style={
                        {
                          background: pill.color,
                          "--dc": pill.color,
                        } as CSSProperties
                      }
                    />
                    {pill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0 52px 28px" }}>
          <div className="s-lbl">Proficiency</div>
        </div>
        <div className="prof-g">
          {proficiencies.map((prof) => (
            <div key={prof.name} className="pf">
              <div className="pf-hd">
                <span className="pf-n">{prof.name}</span>
                <span className="pf-p">{prof.value}%</span>
              </div>
              <div className="pf-bar">
                <div className="pf-fill" style={{ width: `${prof.value}%` }} />
              </div>
            </div>
          ))}
        </div>
        <SectionFooter pageName="Tech Stack" />
      </section>

      <section id="timeline" className={`page ${activePage === "timeline" ? "active" : ""}`}>
        <div className="ph">
          <div className="s-lbl">Journey</div>
          <h1>
            Time<span className="gt">line.</span>
          </h1>
          <p>From &quot;Hello World&quot; to production systems — here&apos;s the full story.</p>
        </div>
        <div className="tl-w">
          <div className="tl-sp" />
          {timeline.map((item, index) => (
            <div key={item.title} className="tl-it" style={{ animationDelay: `${0.05 + index * 0.1}s` }}>
              <div className="tl-dt">
                <div className="tl-yr">{item.year}</div>
                <div className="tl-per">{item.period}</div>
              </div>
              <div className="tl-nd" />
              <div className="tl-c">
                <div className="tl-tp">{item.type}</div>
                <div className="tl-ti">{item.title}</div>
                <div className="tl-co">{item.company}</div>
                <div className="tl-de">{item.description}</div>
                <div className="tl-tags">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tlt">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <SectionFooter pageName="Timeline" />
      </section>

      <section id="contact" className={`page ${activePage === "contact" ? "active" : ""}`}>
        <div className="ph">
          <div className="s-lbl">Reach Out</div>
          <h1>
            Let&apos;s
            <br />
            <span className="gt">Talk.</span>
          </h1>
          <p>Got a project idea, a job opportunity, or just want to say hi? I&apos;m all ears.</p>
        </div>
        <div className="ct-w">
          <div>
            <h2 className="ct-h2">
              Build something
              <br />
              <em>remarkable</em> together?
            </h2>
            <p className="ct-p">
              I&apos;m open to freelance projects, full-time roles, and open-source collaboration. Whether you need a
              full-stack app, an ML model, or a DevOps pipeline — let&apos;s ship it.
            </p>
            <ul className="ct-list">
              <li className="ct-it">
                <div className="ct-ico">
                  <Mail size={16} />
                </div>
                <div>
                  <div className="ct-il">Email</div>
                  hello@yourname.dev
                </div>
              </li>
              <li className="ct-it">
                <div className="ct-ico">
                  <MapPin size={16} />
                </div>
                <div>
                  <div className="ct-il">Location</div>
                  India 🇮🇳 · Available Remotely Worldwide
                </div>
              </li>
              <li className="ct-it">
                <div className="ct-ico">
                  <Clock3 size={16} />
                </div>
                <div>
                  <div className="ct-il">Timezone</div>
                  IST (UTC+5:30) · Flexible for async work
                </div>
              </li>
              <li className="ct-it">
                <div className="ct-ico">
                  <Github size={16} />
                </div>
                <div>
                  <div className="ct-il">GitHub</div>
                  github.com/yourname
                </div>
              </li>
              <li className="ct-it">
                <div className="ct-ico">
                  <Linkedin size={16} />
                </div>
                <div>
                  <div className="ct-il">LinkedIn</div>
                  linkedin.com/in/yourname
                </div>
              </li>
            </ul>
          </div>
          <div className="ct-form">
            <div className="fg-row">
              <div className="fg">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="fg">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
            </div>
            <div className="fg">
              <label>Subject</label>
              <input type="text" placeholder="What's this about?" />
            </div>
            <div className="fg">
              <label>Type of Work</label>
              <select>
                <option value="">Select type...</option>
                <option value="fs">Full-Stack Web App</option>
                <option value="ml">ML / DL Project</option>
                <option value="do">DevOps / Infra Setup</option>
                <option value="os">Open Source Collab</option>
                <option value="ft">Full-Time Role</option>
                <option value="ot">Other</option>
              </select>
            </div>
            <div className="fg">
              <label>Budget / Timeline</label>
              <input type="text" placeholder="e.g. $2k-$8k · 4 weeks  or  Full-time" />
            </div>
            <div className="fg">
              <label>Message</label>
              <textarea placeholder="Tell me about your project, idea, or opportunity…" />
            </div>
            <Button className="btn-send">
              Send Message <ArrowRight size={14} />
            </Button>
          </div>
        </div>
        <SectionFooter pageName="Contact" />
      </section>
    </>
  );
}
