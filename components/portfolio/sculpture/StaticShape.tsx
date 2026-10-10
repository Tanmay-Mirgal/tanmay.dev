"use client";

import { useEffect, useRef } from "react";
import { getShape, type ShapeName } from "@/lib/sculpture";

interface Props {
  shape: ShapeName;
  className?: string;
}

const POINTS = 5200;

/**
 * The sculpture as a single still frame, drawn once to a 2D canvas from the same
 * generators as the animated version. It is what visitors get with reduced motion
 * or without WebGL, and what shows before the 3D scene is ready. There is no loop:
 * it redraws only when its size or shape changes.
 */
export function StaticShape({ shape, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const pts = getShape(shape, POINTS);
      const scale = Math.min(width, height) / 2.9;
      const cx = width / 2;
      const cy = height / 2;
      // Same camera as the 3D scene, so the still frame matches the live one
      const persp = 6;

      for (let i = 0; i < pts.length; i += 3) {
        const x = pts[i];
        const y = pts[i + 1];
        const z = pts[i + 2];
        const k = persp / (persp - z);
        const px = cx + x * scale * k;
        const py = cy - y * scale * k;
        const depth = Math.min(1, Math.max(0, 0.5 + z * 0.35));
        const a = 0.25 + 0.55 * depth;
        ctx.fillStyle = `rgba(236,235,230,${a.toFixed(2)})`;
        const r = 0.55 + depth * 0.55;
        ctx.fillRect(px - r, py - r, r * 2, r * 2);
      }
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [shape]);

  return <canvas ref={ref} aria-hidden="true" className={className ?? "h-full w-full"} />;
}
