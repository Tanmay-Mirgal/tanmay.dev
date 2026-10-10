"use client";

/**
 * Adapted from React Bits "DecryptedText" (https://reactbits.dev, MIT + Commons Clause).
 * Trimmed to the hover/view reveal this site uses, and changed to:
 *  - expose the real text to assistive tech (the original hid it and read scrambled glyphs)
 *  - also run on keyboard focus
 *  - skip the effect entirely under prefers-reduced-motion
 * Use it on monospaced text so the scramble does not shift layout.
 */

import { useCallback, useEffect, useRef, useState } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  steps?: number;
  characters?: string;
  animateOn?: "hover" | "view";
  className?: string;
}

export default function DecryptedText({
  text,
  speed = 38,
  steps = 9,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  animateOn = "hover",
  className,
}: DecryptedTextProps) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const rootRef = useRef<HTMLSpanElement>(null);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setDisplay(text);
  }, [text]);

  const run = useCallback(() => {
    if (timer.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pool = characters.split("");
    let step = 0;
    timer.current = setInterval(() => {
      step += 1;
      const revealed = Math.floor((step / steps) * text.length);
      setDisplay(
        text
          .split("")
          .map((char, i) =>
            char === " " || i < revealed ? char : pool[Math.floor(Math.random() * pool.length)]
          )
          .join("")
      );
      if (step >= steps) stop();
    }, speed);
  }, [characters, speed, steps, stop, text]);

  useEffect(() => {
    if (animateOn !== "view" || !rootRef.current) return;
    const el = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateOn, run]);

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    []
  );

  const handlers =
    animateOn === "hover"
      ? { onMouseEnter: run, onMouseLeave: stop, onFocus: run, onBlur: stop }
      : {};

  return (
    <span ref={rootRef} className={className} {...handlers}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  );
}
