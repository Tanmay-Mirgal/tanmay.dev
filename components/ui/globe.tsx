"use client"

import { useEffect, useRef } from "react"
import createGlobe, { type COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

// City coordinates
const CITIES = {
  mumbai:    [19.076,   72.8777]  as [number, number],
  nyc:       [40.7128, -74.006]   as [number, number],
  london:    [51.5074,  -0.1278]  as [number, number],
  tokyo:     [35.6762, 139.6503]  as [number, number],
  sydney:    [-33.8688, 151.2093] as [number, number],
  sf:        [37.7749, -122.4194] as [number, number],
  singapore: [1.3521,  103.8198]  as [number, number],
  dubai:     [25.2048,  55.2708]  as [number, number],
  saopaulo:  [-23.5505,-46.6333]  as [number, number],
  berlin:    [52.52,    13.405]   as [number, number],
}

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 1.4,
  mapSamples: 20000,
  mapBrightness: 8,
  baseColor: [0.05, 0.07, 0.14],          // deep space blue
  markerColor: [1.0, 0.55, 0.1],           // vivid orange
  glowColor: [0.15, 0.22, 0.5],            // blue atmosphere glow
  markers: Object.values(CITIES).map(loc => ({ location: loc, size: 0.06 })),
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.003
        state.phi = phiRef.current + rs.get()
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-square w-full max-w-150",
        className
      )}
    >
      {/* Atmosphere glow ring */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(50,80,200,0.13) 0%, rgba(20,35,100,0.08) 45%, transparent 70%)",
          filter: "blur(28px)",
          transform: "scale(1.18)",
          zIndex: 0,
        }}
      />
      <canvas
        className={cn(
          "relative z-10 size-full opacity-0 transition-opacity duration-700"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
