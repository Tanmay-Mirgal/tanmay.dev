"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { SceneControls } from "./StackScene";

// three + react-three-fiber only load here, after hydration, never in the main bundle.
const StackScene = dynamic(() => import("./StackScene"), { ssr: false, loading: () => null });

/** Top-to-bottom, as drawn. `layer` is the index of the slab in the 3D scene (0 = bottom). */
const LAYERS = [
  { layer: 3, name: "Interface", note: "What people touch" },
  { layer: 2, name: "Services", note: "Logic and APIs" },
  { layer: 1, name: "Data", note: "State and storage" },
  { layer: 0, name: "Intelligence", note: "Models and pipelines" },
] as const;

/** Static isometric stack: placeholder while 3D loads, and the no-WebGL fallback. */
function StackFallback() {
  const ys = [250, 190, 130, 70];
  return (
    <svg viewBox="0 0 400 320" className="h-full w-full" fill="none" aria-hidden="true">
      {ys.map((y, i) => (
        <g key={y}>
          <polygon
            points={`200,${y - 52} 340,${y} 200,${y + 52} 60,${y}`}
            fill="#0a0a0a"
            stroke="#ecebe6"
            strokeOpacity={0.45}
          />
          <polygon
            points={`200,${y - 26} 270,${y} 200,${y + 26} 130,${y}`}
            stroke="#ecebe6"
            strokeOpacity={0.18}
            strokeDasharray="2 4"
          />
          <circle cx={200 + (i % 2 ? 24 : -24)} cy={y} r={2.2} fill="#ecebe6" />
        </g>
      ))}
    </svg>
  );
}

class StageBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
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

interface HeroStageProps {
  controls: RefObject<SceneControls>;
}

export function HeroStage({ controls }: HeroStageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"pending" | "webgl" | "static">("pending");
  const [reduced, setReduced] = useState(false);
  const [lite, setLite] = useState(false);
  const [inView, setInView] = useState(true);
  const [sceneReady, setSceneReady] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const [pinned, setPinned] = useState(-1);

  // Capability checks. Anything that fails keeps the static SVG, which is fully usable.
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)").matches;
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4;

    setReduced(motionQuery.matches);
    setLite(small || weak);
    controls.current.reduced = motionQuery.matches;

    if (!hasWebGL()) {
      setMode("static");
      return;
    }
    // Wait until the browser is idle so the 3D chunk never competes with first paint.
    const start = () => setMode("webgl");
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 400);
    const onMotionChange = (e: MediaQueryListEvent) => {
      setReduced(e.matches);
      controls.current.reduced = e.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);
    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, [controls]);

  // Render only while the hero is on screen
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "100px",
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pointer parallax: fine pointers only
  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const c = controls.current;
    const onMove = (e: PointerEvent) => {
      c.px = (e.clientX / window.innerWidth) * 2 - 1;
      c.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [controls, reduced]);

  // Label hover/pin -> highlighted slab
  const active = hovered >= 0 ? hovered : pinned;
  useEffect(() => {
    controls.current.active = active;
    controls.current.invalidate?.();
  }, [active, controls]);

  const onReady = useCallback(() => setSceneReady(true), []);
  const onFail = useCallback(() => setMode("static"), []);

  const frameloop = reduced ? "demand" : inView ? "always" : "never";
  const showScene = mode === "webgl";

  return (
    <div ref={rootRef} className="absolute inset-0">
      <div aria-hidden="true" className="absolute inset-0">
        <div
          className={`absolute inset-0 flex items-center justify-center p-[8%] transition-opacity duration-700 ${
            sceneReady && showScene ? "opacity-0" : "opacity-100"
          }`}
        >
          <StackFallback />
        </div>
        {showScene && (
          <StageBoundary fallback={null}>
            <StackScene
              controls={controls}
              frameloop={frameloop}
              lite={lite}
              onReady={onReady}
              onFail={onFail}
            />
          </StageBoundary>
        )}
      </div>

      <ol
        aria-label="System layers"
        className="absolute bottom-[26%] right-0 hidden flex-col gap-1 lg:flex xl:bottom-[30%]"
      >
        {LAYERS.map(({ layer, name, note }, i) => {
          const isOn = active === layer;
          return (
            <li key={name}>
              <button
                type="button"
                aria-pressed={pinned === layer}
                onPointerEnter={() => setHovered(layer)}
                onPointerLeave={() => setHovered(-1)}
                onFocus={() => setHovered(layer)}
                onBlur={() => setHovered(-1)}
                onClick={() => setPinned((p) => (p === layer ? -1 : layer))}
                className="group flex items-baseline gap-3 py-1 text-left font-mono text-[11px] uppercase tracking-[0.08em]"
              >
                <span className="text-faint tabular-nums">0{i + 1}</span>
                <span className={`transition-colors duration-300 ${isOn ? "text-paper" : "text-mute"}`}>
                  {name}
                </span>
                <span
                  className={`hidden text-faint normal-case tracking-normal transition-opacity duration-300 xl:inline ${
                    isOn ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {note}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
