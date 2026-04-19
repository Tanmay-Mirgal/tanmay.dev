"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const HolographicNode = ({ 
  children, 
  id, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  id: string; 
  delay?: number 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });

  return (
    <div ref={ref} id={id} className="relative w-full">
      {/* Horizontal connecting line from spine */}
      <motion.div 
         initial={{ scaleX: 0, opacity: 0 }}
         animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
         transition={{ duration: 0.8, delay, ease: "easeOut" }}
         className="absolute top-12 md:top-16 -left-16 md:-left-32 lg:-left-48 w-16 md:w-32 lg:w-48 h-[1px] bg-gradient-to-r from-[#D4AF37] to-transparent origin-left z-0 hidden md:block" 
      />
      
      {/* Power pulsing dot transferring from spine */}
      {isInView && (
         <motion.div 
            initial={{ left: "-48px", opacity: 1 }}
            animate={{ left: "0px", opacity: 0 }}
            transition={{ duration: 1, ease: "easeIn", delay: delay + 0.5 }}
            className="absolute top-12 md:top-16 w-2 h-1 bg-[#F9A826] shadow-[0_0_10px_#F9A826] z-10 hidden md:block -mt-[0.5px]"
         />
      )}

      {/* Main Content Hologram Reveal */}
      <motion.div
         initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
         animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
         transition={{ duration: 1, delay: delay + 0.4 }}
         className="relative z-10"
      >
         {children}
      </motion.div>
    </div>
  );
};
