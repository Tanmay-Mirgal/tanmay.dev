"use client";

import React, { useEffect, useState } from "react";

const formatIST = () =>
  new Date().toLocaleTimeString("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const TopBar = () => {
  // Empty on the server and first client render, so hydration always matches.
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatIST());
    tick();
    const interval = setInterval(tick, 15_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 text-white mix-blend-difference">
      <div className="shell flex items-center justify-between py-5">
        <a
          href="#top"
          className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.08em]"
        >
          Tanmay Mirgal
        </a>
        <p className="label hidden !text-white lg:block" aria-label="Local time in India">
          IST <span className="tabular-nums">{time || "--:--"}</span>
        </p>
      </div>
    </header>
  );
};
