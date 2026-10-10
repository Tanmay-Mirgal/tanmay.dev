"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { nudge, sculpture } from "./store";

// three + react-three-fiber live in their own chunk and load only after hydration and idle.
const SculptureCanvas = dynamic(() => import("./SculptureCanvas"), { ssr: false, loading: () => null });

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

const setStatus = (value: "ready" | "static") => {
  document.documentElement.dataset.sculpture = value;
};

/**
 * One fixed, click-through canvas for the whole page. Sections that want the
 * sculpture register a "slot"; the sculpture flies to whichever slot is on screen
 * and fades out when none is. Reduced motion, missing WebGL or a lost context
 * leave the static SVG skeleton in the hero instead.
 */
export function SculptureHost() {
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;

    sculpture.lite = small || coarse || weak;

    if (motion.matches || !hasWebGL()) {
      setStatus("static");
      setMode("static");
      return;
    }
    // Wait for idle so the 3D chunk never competes with first paint.
    const start = () => setMode("webgl");
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 400);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  // Input: pointer parallax and repulsion, hold-to-calibrate, scroll/resize wake-ups
  useEffect(() => {
    if (mode !== "webgl") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const onMove = (e: PointerEvent) => {
      if (!finePointer) return;
      sculpture.pointer.x = e.clientX;
      sculpture.pointer.y = e.clientY;
      sculpture.pointer.moved = true;
      nudge(1400);
    };
    const insideSlot = (x: number, y: number) => {
      for (const slot of sculpture.slots) {
        const r = slot.el.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return true;
      }
      return false;
    };
    const onDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea, summary, [role=button]")) return;
      if (!insideSlot(e.clientX, e.clientY)) return;
      sculpture.holdTarget = 1;
      nudge(1200);
    };
    const release = () => {
      if (sculpture.holdTarget === 0) return;
      sculpture.holdTarget = 0;
      nudge(1600);
    };
    const wake = () => nudge(900);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("resize", wake);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", wake);
    };
  }, [mode]);

  const onReady = useCallback(() => setStatus("ready"), []);
  const onFail = useCallback(() => {
    setStatus("static");
    setMode("static");
  }, []);

  if (mode !== "webgl") return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]">
      <SculptureCanvas onReady={onReady} onFail={onFail} />
    </div>
  );
}
