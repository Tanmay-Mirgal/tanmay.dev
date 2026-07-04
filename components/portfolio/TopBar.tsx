"use client";

import React, { useState, useEffect } from "react";

export const TopBar = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-white/30 pb-6 border-b border-white/[0.06] mb-8 select-none">
      <span>EST. 2026</span>
      <span>{time || "12:00:00 PM"}</span>
    </div>
  );
};
