"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const GlassCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // High-performance cursor values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smoothed variants
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button") || target.closest(".clickable")) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[10000]">
      {/* Dot */}
      <motion.div
        className="absolute w-2 h-2 bg-[#D4AF37] rounded-full scale-100 mix-blend-screen shadow-[0_0_10px_#D4AF37]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
      {/* Outer Ring */}
      <motion.div
        className="absolute border border-[#D4AF37]/40 bg-[#D4AF37]/[0.05] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 50 : 30,
          height: isHovering ? 50 : 30,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
};
