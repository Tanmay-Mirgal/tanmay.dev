"use client";

import React, { useCallback, useEffect, useRef } from "react";

const GLOBE_CONFIG = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 2.0,
  mapSamples: 20000,
  mapBrightness: 12,         // High so continent dots are clearly visible
  baseColor: [0.08, 0.10, 0.18] as [number, number, number],  // deep space blue
  markerColor: [1.0, 0.55, 0.1] as [number, number, number],  // vivid orange
  glowColor: [0.18, 0.28, 0.55] as [number, number, number],  // blue atmosphere
  markers: [
    { location: [19.076, 72.8777] as [number, number], size: 0.12 },  // Mumbai ★
    { location: [40.7128, -74.006] as [number, number], size: 0.08 }, // NYC
    { location: [51.5074, -0.1278] as [number, number], size: 0.07 }, // London
    { location: [35.6762, 139.6503] as [number, number], size: 0.06 },// Tokyo
    { location: [48.8566, 2.3522] as [number, number], size: 0.05 },  // Paris
    { location: [1.3521, 103.8198] as [number, number], size: 0.05 }, // Singapore
    { location: [37.7749, -122.4194] as [number, number], size: 0.07 },// SF
    { location: [-33.8688, 151.2093] as [number, number], size: 0.05 },// Sydney
  ],
};

export function Globe() {
  const phi = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerDelta = useRef(0);
  const rOffset = useRef(0);

  const onRender = useCallback((state: Record<string, number>) => {
    if (!pointerInteracting.current) phi.current += 0.004;
    state.phi = phi.current + rOffset.current;
  }, []);

  useEffect(() => {
    let globe: { destroy: () => void } | null = null;

    const init = async () => {
      const createGlobe = (await import("cobe")).default;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const size = canvas.offsetWidth;
      globe = createGlobe(canvas, {
        ...GLOBE_CONFIG,
        width: size * 2,
        height: size * 2,
        onRender,
      } as Parameters<typeof createGlobe>[1]);

      setTimeout(() => {
        if (canvas) canvas.style.opacity = "1";
      }, 150);
    };

    init();
    return () => globe?.destroy();
  }, [onRender]);

  return (
    <div className="relative w-full h-full">
      {/* Atmospheric planet glow — layers of blue/indigo radial light */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(60,80,180,0.18) 0%, rgba(30,40,100,0.10) 40%, transparent 70%)",
          filter: "blur(20px)",
          transform: "scale(1.15)",
        }}
      />
      {/* Secondary halo — wider, softer */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(80,100,220,0.08) 70%, transparent 85%)",
          filter: "blur(12px)",
          transform: "scale(1.25)",
        }}
      />

      {/* The cobe canvas */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 0.8s ease",
          cursor: "grab",
        }}
        className="relative z-10 [contain:layout_paint_size]"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerDelta.current;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerDelta.current = delta;
            rOffset.current = delta / 200;
          }
        }}
      />
    </div>
  );
}
