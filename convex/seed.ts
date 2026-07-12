import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seed = mutation({
  handler: async (ctx) => {
    // Clear existing data to prevent duplicates
    const existingProjects = await ctx.db.query("projects").collect();
    for (const doc of existingProjects) await ctx.db.delete(doc._id);

    const existingAchievements = await ctx.db.query("achievements").collect();
    for (const doc of existingAchievements) await ctx.db.delete(doc._id);

    const existingSkills = await ctx.db.query("skills").collect();
    for (const doc of existingSkills) await ctx.db.delete(doc._id);

    // Achievements
    const achievements = [
      { 
        title: "INNOVGENIUS IDEATHON × TCS", 
        org: "Tata Consultancy Services", 
        date: "2025", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776839721/Innovgenius_s92ikc.jpg", 
        type: "image" as const, 
        desc: "Achieved recognition at the Innovgenius Ideathon, demonstrating innovative problem-solving and rapid prototyping." 
      },
      { 
        title: "INDUSTRIAL HACKATHON 2026 - WINNER", 
        org: "TATA", 
        date: "2026", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776589868/certificate_and_medal_ovuu7u.jpg", 
        type: "image" as const, 
        desc: "First place winner medal awarded for excellence in industrial system automation and real-time monitoring solutions." 
      },
      { 
        title: "INTERNAL HACKATHON 2025 - CERTIFICATE", 
        org: "Vidyalankar Polytechnic", 
        date: "2025", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776590198/Internal_Hackathon_yfinr5.png", 
        type: "image" as const, 
        desc: "Official winner's certificate for the Internal Hackathon 2025, focusing on urban infrastructure optimization." 
      },
      { 
        title: "TATA ADVANCED SYSTEMS - OFFER LETTER", 
        org: "TASL", 
        date: "2024", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776839721/TATA_offer_letter_pdxlje.jpg", 
        type: "image" as const, 
        desc: "Official selection and appointment for the high-fidelity systems engineering internship program." 
      },
      { 
        title: "TATA ADVANCED SYSTEMS - INTERNSHIP CERTIFICATE", 
        org: "TASL", 
        date: "2025", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776590547/TATA_Internshio_Completion_acbdaj.png", 
        type: "image" as const, 
        desc: "Validated completion of a 9-month intensive internship contributing to naval combat simulation platforms." 
      },
      { 
        title: "RESEARCH PAPER PUBLICATION - JAAFR", 
        org: "JAAFR Journal", 
        date: "2025", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776590743/Certificate_of_published_Paper_rlvpbz.png", 
        type: "image" as const, 
        desc: "Published research in the Journal of Advance and Future Research, focusing on Combat Management Systems architecture." 
      },
      { 
        title: "SPIT HACKATHON 2025", 
        org: "Sardar Patel Institute of Tech", 
        date: "2025", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776840406/SPIT_2025_ftrwsy.jpg",
        type: "image" as const, 
        desc: "Recognition for high-density code contributions and system design during the national level SPIT hackathon." 
      },
      { 
        title: "TENSORFLOW FOR DEEP LEARNING", 
        org: "Udemy", 
        date: "Aug 2025", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591174/Tensorflow_certification_ruumd3.png", 
        type: "image" as const, 
        desc: "Comprehensive mastery of neural network architectures, specialized in computer vision and time-series forecasting using TensorFlow." 
      },
      { 
        title: "AI & ML, DATA SCIENCE BOOTCAMP", 
        org: "Udemy", 
        date: "Aug 2025", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591173/Udemy_AIML_certificate_ahem8e.png", 
        type: "image" as const, 
        desc: "Full-spectrum data science training covering feature engineering, statistical modeling, and deep learning implementations." 
      },
      { 
        title: "CONTRIBUTOR IN GSSOC OPEN SOURCE", 
        org: "GirlScript Summer of Code", 
        date: "Aug 2024", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591174/GSSOC_certificate_b51zzz.png", 
        type: "image" as const, 
        desc: "Active contribution to large-scale open-source projects during the GSSOC program." 
      },
      { 
        title: "COMPLETE PYTHON BOOTCAMP", 
        org: "Udemy", 
        date: "Nov 2023", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591173/Udemy_Python_fyrwj4.png", 
        type: "image" as const, 
        desc: "Intensive training in professional Python development, covering automation and web integration." 
      },
      { 
        title: "POSTMAN API FUNDAMENTALS", 
        org: "Postman Academy", 
        date: "2024", 
        url: "https://res.cloudinary.com/dmspullpt/image/upload/v1776591173/Postman_Certification_zyqlzx.png", 
        type: "image" as const, 
        desc: "Certified Student Expert in API testing, documentation, and lifecycle management using Postman." 
      },
    ];

    for (const achievement of achievements) {
      await ctx.db.insert("achievements", achievement);
    }

    // Projects
    const projects = [
      { 
        title: "Slate", 
        desc: "Slate is a premium, enterprise-grade SaaS application designed to eliminate the friction between thinking, drawing, and documenting.", 
        fullDesc: "Slate is a premium, enterprise-grade SaaS application designed to eliminate the friction between thinking, drawing, and documenting.",
        tags: ["Next.js", "SaaS", "TypeScript", "React"], 
        link: "https://github.com/Tanmay-Mirgal/Slate",
        liveLink: "https://slate.tanmaymirgal.dev/",
        image: "https://res.cloudinary.com/dmspullpt/image/upload/v1783872649/Slate_madwet.png"
      },
      { 
        title: "Raga Music Player", 
        desc: "A premium, next-generation music player ecosystem featuring a Next.js 16 Web App, Expo Mobile App, and Express API, with AI recommendations and account-wide library sync.", 
        fullDesc: "Raga is a premium, next-generation music player ecosystem featuring a Next.js 16 Web App and an Expo React Native Mobile App, backed by a scalable Node.js Express API Server. Raga personalizes your listening experience with AI-powered recommendations, account-wide library sync, synced lyrics, and responsive interactive player layouts.",
        tags: ["Next.js 16", "Expo", "React Native", "Express.js", "Node.js", "AI-Powered"], 
        link: "https://github.com/Tanmay-Mirgal/Raga-Music-Player-",
        liveLink: "https://raga.tanmaymirgal.dev/",
        image: "https://res.cloudinary.com/dmspullpt/image/upload/f_auto,q_auto/v1783232396/Raga_music_Player_web_app_tddxnk.png"
      },
      { 
        title: "Combat Training Systems (CTS-71)", 
        desc: "🔒 Confidential Internship: High-fidelity naval simulation platform built at Tata Advanced Systems replicating real-world Combat Management Systems.", 
        fullDesc: "During a 9-month internship at Tata Advanced Systems, I contributed to CTS-71—a high-fidelity simulation platform designed for naval trainees. As a functional replica of a real Combat Management System (CMS), it enables users to practice complex operational workflows in a controlled environment. My role involved implementing CMS-aligned features, enhancing interaction patterns for training efficiency, and validating simulation behavior against real-world operations. *Due to the nature of this project, source code and architecture are confidential.*",
        tags: ["MERN", "WebSockets", "Jest", "Jira", "Bitbucket", "Confluence"], 
        link: "#",
        image: "https://res.cloudinary.com/dmspullpt/image/upload/f_auto,q_auto/v1776530245/IAC1_Vikrant_at_Cochin_s02moz.jpg"
      },
      { 
        title: "Samadhan", 
        desc: "🏆 Winner - Internal Hackathon 2025: AI-driven civic issue reporting and resolution ecosystem with real-time tracking.", 
        fullDesc: "Samadhan was built as a hackathon-winning project focused on simplifying the process of reporting, tracking, and resolving civic issues through a structured and intuitive interface. The architecture emphasizes problem categorization, efficient workflow management, and a clean user experience to ensure quick adoption and high usability.",
        tags: ["Next.js", "TypeScript", "Convex", "Expo", "Tailwind CSS", "Hackathon"], 
        link: "https://github.com/Tanmay-Mirgal/Samadhan",
        image: "https://res.cloudinary.com/dmspullpt/image/upload/f_auto,q_auto/v1776586114/Samadhan_egvvvn.png"
      },
      { 
        title: "Smart Meet", 
        desc: "AI-powered enterprise meeting platform featuring custom WebRTC, real-time transcriptions, and intelligent Kanban-based workflow management.", 
        fullDesc: "Smart Meet was architected as a hackathon prototype to eliminate the overhead of manual meeting orchestration. It integrates a custom WebRTC engine with an AI-driven transcription layer to track vital discussion points and transform live conversations into actionable summaries. The focus was on low-friction setup and a high-speed operator experience for rapid deployment.",
        tags: ["WebRTC", "FastAPI", "TensorFlow", "OpenCV", "Groq AI", "React"], 
        link: "https://github.com/Tanmay-Mirgal/Smart-Meeter",
        liveLink: "https://smart-meet.tanmaymirgal.dev/",
        image: "https://res.cloudinary.com/dmspullpt/image/upload/f_auto,q_auto/v1776528917/WhatsApp_Image_2026-04-18_at_9.44.48_PM_yunoj2.jpg"
      },
      { 
        title: "Finch AI", 
        desc: "Intelligent Banking Recommendation Engine leveraging ML to serve personalized financial products to 500+ active users.",
        fullDesc: "Finch AI is a sophisticated banking intelligence architecture designed to automate financial decision-making. I engineered a robust hybrid system combining a high-performance Next.js frontend with a Flask-powered microservice backend. The core intelligence Layer utilizes Scikit-learn and XGBoost for precise credit-worthiness scoring and interest-rate prediction, while Groq LLM integration enables conversational financial insights. The system handles 500+ active users with real-time analytics and predictive modeling.",
        tags: ["Next.js", "Flask", "XGBoost", "Groq AI", "PostgreSQL", "MLOps"], 
        link: "https://github.com/Tanmay-Mirgal/Finch-AI-Intelligent-Banking-Recommendation-Engine",
        image: "https://res.cloudinary.com/dmspullpt/image/upload/f_auto,q_auto/v1776528194/Finch_Ai_yybtt5.png"
      },
      { 
        title: "Cognix", 
        desc: "Enterprise-grade AI Assessment & Analytics Mobile App for clinical testing and real-time cognitive evaluation.",
        fullDesc: "Cognix is an end-to-end full-stack ecosystem engineered for precision clinical assessment. Built with React Native for high-performance mobile accessibility, the platform unifies real-time speech evaluation, intelligent document scanning, and sophisticated cognitive analytics into a single interface. I implemented a complex RAG (Retrieval-Augmented Generation) pipeline for deep clinical data retrieval and optimized MLOps workflows on AWS to ensure sub-second evaluation latency.",
        tags: ["React Native", "Express.js", "MongoDB", "RAG", "AWS", "MLOps"], 
        link: "https://github.com/Tanmay-Mirgal/Cognix",
        image: "https://res.cloudinary.com/dmspullpt/image/upload/f_auto,q_auto/v1776528059/Screenshot_2026-04-18_213005_daxafw.png"
      }
    ];

    for (const project of projects) {
      await ctx.db.insert("projects", project);
    }

    // Skills
    const skills = [
      { title: "Full-Stack Ownership", desc: "Zero hand-holding required. I architect and engineer the entire MERN system.", icon: "Layers", category: "Frontend/Backend" },
      { title: "Machine Learning / Vision", desc: "Deep Learning models, TensorFlow, and advanced OpenCV vision layers.", icon: "Cpu", category: "AI/ML" },
      { title: "Cloud Ops. & CI/CD", desc: "Rigorous automated deployment pipelines built on AWS architecture.", icon: "Cloud", category: "DevOps" },
      { title: "Fast Production Delivery", desc: "I ship highly scalable, performance-driven web products blazingly fast.", icon: "Zap", category: "Workflow" },
    ];

    for (const skill of skills) {
      await ctx.db.insert("skills", skill);
    }

    return "Seeding completed successfully!";
  },
});
