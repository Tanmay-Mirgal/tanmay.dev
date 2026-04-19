"use client";

import React from "react";

export const AmbientBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="glow-orb bg-[#F9A826]/10 w-full lg:w-[800px] h-[800px] top-[-200px] left-[-200px]" />
      <div className="glow-orb bg-[#D4AF37]/10 w-full lg:w-[600px] h-[600px] bottom-[-100px] right-[-100px]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
    </div>
  );
};
