"use client";

import React, { useState } from "react";
import { Send, Check, Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

export const ContactSection = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !message) return;

    setStatus("sending");

    setTimeout(() => {
      setStatus("success");
      
      const mailtoUrl = `mailto:tanmaymirgal26@gmail.com?subject=${encodeURIComponent(
        subject || "Portfolio Contact Connection"
      )}&body=${encodeURIComponent(message)}`;
      window.location.href = mailtoUrl;
    }, 1800);
  };

  return (
    <section id="contact" className="py-16 border-t border-white/[0.06] relative select-none">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 z-10 relative">
        
        {/* Left Side Info */}
        <div className="lg:col-span-1 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Uplink
              </h4>
              <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
                Contact
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-sans font-light">
              Have a project, role, or proposal? Drop a line directly and let&apos;s explore collaborating.
            </p>
          </div>

          {/* Social connections */}
          <div className="space-y-3 pt-4 font-mono text-[10px] uppercase tracking-wider">
            <a
              href="mailto:tanmaymirgal26@gmail.com"
              className="flex items-center justify-between p-3.5 border border-white/[0.06] bg-[#151518] rounded-xl hover:border-white/[0.15] hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-sky-500" />
                <span className="text-white/60 group-hover:text-white transition-colors">Email</span>
              </div>
              <ArrowUpRight size={12} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </a>

            <a
              href="https://github.com/Tanmay-Mirgal"
              target="_blank"
              className="flex items-center justify-between p-3.5 border border-white/[0.06] bg-[#151518] rounded-xl hover:border-white/[0.15] hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Github size={14} className="text-white/70" />
                <span className="text-white/60 group-hover:text-white transition-colors">GitHub</span>
              </div>
              <ArrowUpRight size={12} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </a>

            <a
              href="https://www.linkedin.com/in/tanmay-mirgal/"
              target="_blank"
              className="flex items-center justify-between p-3.5 border border-white/[0.06] bg-[#151518] rounded-xl hover:border-white/[0.15] hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <Linkedin size={14} className="text-[#0A66C2]" />
                <span className="text-white/60 group-hover:text-white transition-colors">LinkedIn</span>
              </div>
              <ArrowUpRight size={12} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </a>
          </div>
        </div>

        {/* Right Side Form Card */}
        <div className="lg:col-span-2">
          <div className="p-6 sm:p-8 bg-[#151518] border border-white/[0.06] rounded-2xl space-y-6 overflow-hidden relative">
            
            {status === "idle" || status === "sending" ? (
              <form onSubmit={handleSend} className="space-y-4">
                
                {/* From Field */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-white/[0.06] pb-2">
                  <label htmlFor="fromEmail" className="font-mono text-white/30 w-16 uppercase text-[9px] tracking-wider select-none">From:</label>
                  <input
                    id="fromEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@domain.com"
                    className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-white/25 select-text"
                    autoComplete="off"
                  />
                </div>

                {/* Subject Field */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-white/[0.06] pb-2">
                  <label htmlFor="subject" className="font-mono text-white/30 w-16 uppercase text-[9px] tracking-wider select-none">Subject:</label>
                  <input
                    id="subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Project proposal / Connection details"
                    className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder:text-white/25 select-text"
                    autoComplete="off"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2 pt-1">
                  <label htmlFor="payload" className="block font-mono text-white/30 uppercase text-[9px] tracking-wider select-none">Message:</label>
                  <textarea
                    id="payload"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Draft your message here..."
                    className="w-full bg-white/[0.02] border border-white/[0.06] p-3.5 rounded-xl font-sans text-xs text-white outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all resize-none select-text"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 bg-white text-[#0B0B0C] hover:bg-zinc-200 font-mono font-bold uppercase tracking-widest text-[9px] sm:text-[10px] rounded-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"} <Send size={11} />
                  </button>
                </div>

              </form>
            ) : (
              <div className="py-8 flex flex-col justify-center items-center text-center space-y-5">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  <Check size={20} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Message Sent</h3>
                  <p className="text-white/40 text-[11px] max-w-xs mx-auto leading-relaxed">
                    Message dispatched successfully. Opening mail client redirect.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setStatus("idle");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                  }}
                  className="px-5 py-2 border border-white/10 bg-white/[0.05] rounded-xl font-mono text-[9px] uppercase tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  Send Another
                </button>
              </div>
            )}

          </div>
        </div>

      </div>

    </section>
  );
};
