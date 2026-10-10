"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { createRope, ropeToPath, settleRope } from "@/lib/rope";
import type { RopeControls } from "./ThreadScene";

// three + react-three-fiber live in their own chunk and only load after hydration and idle.
const ThreadScene = dynamic(() => import("./ThreadScene"), { ssr: false, loading: () => null });

const GRAVITY = 0.55;

class StageBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** The same rope, settled and drawn as SVG: used before 3D loads, with reduced motion, or without WebGL. */
function StaticRope({ controls, w, h }: { controls: RefObject<RopeControls>; w: number; h: number }) {
  const geometry = useMemo(() => {
    if (!w || !h) return null;
    const c = controls.current;
    const rope = settleRope(createRope(c.lite ? 32 : 46, c.anchor, c.rest), GRAVITY, c.rest);
    return { d: ropeToPath(rope), headX: rope.x[rope.n - 1], headY: rope.y[rope.n - 1] };
  }, [controls, w, h]);

  if (!geometry) return null;
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="absolute inset-0 h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <path d={geometry.d} stroke="var(--color-thread)" strokeWidth={7} strokeLinecap="round" />
      <circle cx={geometry.headX} cy={geometry.headY} r={8} fill="var(--color-paper)" />
      <circle
        cx={geometry.headX}
        cy={geometry.headY}
        r={12}
        stroke="var(--color-paper)"
        strokeOpacity={0.35}
      />
    </svg>
  );
}

interface HeroStageProps {
  controls: RefObject<RopeControls>;
  /** Marks where the page-long thread begins; the rope is anchored here */
  startRef: RefObject<HTMLElement | null>;
}

export function HeroStage({ controls, startRef }: HeroStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [sceneReady, setSceneReady] = useState(false);
  const reducedRef = useRef(false);

  // Capability checks: anything that fails leaves the static SVG, which is complete on its own.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;

    reducedRef.current = motion.matches;
    controls.current.lite = small || coarse || weak;

    if (motion.matches || !hasWebGL()) {
      setMode("static");
      return;
    }
    // Wait for idle so the 3D chunk never competes with first paint.
    const start = () => setMode("webgl");
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 400);

    const onChange = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
      if (e.matches) setMode("static");
    };
    motion.addEventListener("change", onChange);
    return () => {
      motion.removeEventListener("change", onChange);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, [controls]);

  // Measure the stage and the anchor the thread starts from
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const measure = () => {
      const r = root.getBoundingClientRect();
      const c = controls.current;
      c.w = r.width;
      c.h = r.height;

      const marker = startRef.current?.getBoundingClientRect();
      c.anchor = marker
        ? { x: marker.left + marker.width / 2 - r.left, y: marker.top + marker.height / 2 - r.top }
        : { x: 12, y: r.height };
      const narrow = r.width < 768;
      c.rest = { x: r.width * (narrow ? 0.72 : 0.66), y: r.height * (narrow ? 0.3 : 0.34) };
      setBox({ w: Math.round(r.width), h: Math.round(r.height) });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [controls, startRef]);

  // Input: pointer (fine pointers only), pluck on click, scroll velocity
  useEffect(() => {
    const root = rootRef.current;
    if (!root || mode !== "webgl") return;
    const c = controls.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const rectOf = () => root.getBoundingClientRect();

    const onMove = (e: PointerEvent) => {
      if (!finePointer) return;
      const r = rectOf();
      const inside = e.clientY >= r.top && e.clientY <= r.bottom;
      c.head = inside ? { x: e.clientX - r.left, y: e.clientY - r.top } : null;
      c.px = (e.clientX / window.innerWidth) * 2 - 1;
      c.py = (e.clientY / window.innerHeight) * 2 - 1;
      c.wake?.();
    };

    const onDown = (e: PointerEvent) => {
      const r = rectOf();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      if ((e.target as HTMLElement).closest("a, button, input, textarea")) return;
      c.pluck = 1;
      c.wake?.();
    };

    let lastY = window.scrollY;
    const onScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      c.scrollVel = Math.max(-60, Math.min(60, dy));
      c.wake?.();
    };

    const onLeave = () => {
      c.head = null;
      c.px = 0;
      c.py = 0;
      c.wake?.();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    // Only render while the hero is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        c.visible = entry.isIntersecting;
        if (entry.isIntersecting) c.wake?.();
      },
      { rootMargin: "120px" }
    );
    observer.observe(root);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      observer.disconnect();
    };
  }, [controls, mode]);

  const onReady = useCallback(() => setSceneReady(true), []);
  const onFail = useCallback(() => setMode("static"), []);

  const showScene = mode === "webgl";

  return (
    <div ref={rootRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[3]">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          showScene && sceneReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <StaticRope controls={controls} w={box.w} h={box.h} />
      </div>
      {showScene && (
        <StageBoundary onError={onFail}>
          <ThreadScene controls={controls} onReady={onReady} onFail={onFail} />
        </StageBoundary>
      )}
    </div>
  );
}
