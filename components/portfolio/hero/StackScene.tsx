"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Shared, mutable controls. React never re-renders for these: GSAP writes
 * `progress`, the pointer listener writes `px/py`, the label list writes
 * `active`, and the render loop reads them every frame.
 */
export interface SceneControls {
  progress: number;
  px: number;
  py: number;
  active: number;
  reduced: boolean;
  invalidate?: () => void;
}

interface StackSceneProps {
  controls: RefObject<SceneControls>;
  frameloop: "always" | "demand" | "never";
  lite: boolean;
  onReady: () => void;
  onFail: () => void;
}

const LAYERS = 4;
const SIZE = 4.4;
const PAPER = new THREE.Color("#ecebe6");

// Deterministic pseudo-random so the composition is identical on every load
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGrid(div: number) {
  const h = SIZE / 2;
  const pts: number[] = [];
  for (let i = 0; i <= div; i++) {
    const t = -h + (i / div) * SIZE;
    pts.push(-h, 0, t, h, 0, t, t, 0, -h, t, 0, h);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function buildNodes(div: number) {
  const h = SIZE / 2;
  const pts: number[] = [];
  for (let i = 0; i <= div; i++) {
    for (let j = 0; j <= div; j++) {
      pts.push(-h + (i / div) * SIZE, 0, -h + (j / div) * SIZE);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function buildFrame() {
  const h = SIZE / 2;
  const g = new THREE.BufferGeometry();
  g.setAttribute(
    "position",
    new THREE.Float32BufferAttribute([-h, 0, -h, h, 0, -h, h, 0, h, -h, 0, h], 3)
  );
  return g;
}

function dotTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "#fff");
  grad.addColorStop(0.5, "#fff");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function Stack({ controls, lite }: Pick<StackSceneProps, "controls" | "lite">) {
  const div = lite ? 8 : 10;
  const columns = lite ? 8 : 14;

  const group = useRef<THREE.Group>(null);
  const layerRefs = useRef<(THREE.Group | null)[]>([]);
  const smooth = useRef({ px: 0, py: 0, progress: 0, spacing: 1.3 });

  const resources = useMemo(() => {
    const dot = dotTexture();
    const mk = (opacity: number) =>
      new THREE.LineBasicMaterial({ color: PAPER, transparent: true, opacity, depthWrite: false });

    const nodeMat = () =>
      new THREE.PointsMaterial({
        color: PAPER,
        map: dot,
        size: 0.075,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.6,
        depthWrite: false,
      });

    // Data columns: fixed grid positions that packets travel along
    const rand = mulberry32(7);
    const spots = Array.from({ length: columns }, () => ({
      x: (Math.floor(rand() * (div + 1)) / div - 0.5) * SIZE,
      z: (Math.floor(rand() * (div + 1)) / div - 0.5) * SIZE,
      phase: rand(),
      speed: 0.07 + rand() * 0.06,
    }));

    const columnGeo = new THREE.BufferGeometry();
    columnGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(columns * 6), 3)
    );
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(columns * 3), 3)
    );

    return {
      dot,
      spots,
      columnGeo,
      packetGeo,
      grid: buildGrid(div),
      nodes: buildNodes(div),
      frame: buildFrame(),
      lineMats: Array.from({ length: LAYERS }, () => mk(0.17)),
      frameMats: Array.from({ length: LAYERS }, () => mk(0.5)),
      nodeMats: Array.from({ length: LAYERS }, nodeMat),
      columnMat: mk(0.22),
      packetMat: new THREE.PointsMaterial({
        color: PAPER,
        map: dot,
        size: 0.16,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      }),
    };
  }, [div, columns]);

  useEffect(() => {
    const r = resources;
    return () => {
      r.dot.dispose();
      r.columnGeo.dispose();
      r.packetGeo.dispose();
      r.grid.dispose();
      r.nodes.dispose();
      r.frame.dispose();
      [...r.lineMats, ...r.frameMats, ...r.nodeMats, r.columnMat, r.packetMat].forEach((m) =>
        m.dispose()
      );
    };
  }, [resources]);

  useFrame((state, delta) => {
    const c = controls.current;
    const s = smooth.current;
    const g = group.current;
    if (!g) return;

    const t = c.reduced ? 0 : state.clock.elapsedTime;
    const d = c.reduced ? 1 : delta;
    const ease = (from: number, to: number, lambda: number) =>
      c.reduced ? to : THREE.MathUtils.damp(from, to, lambda, d);

    s.px = ease(s.px, c.px, 3);
    s.py = ease(s.py, c.py, 3);
    s.progress = ease(s.progress, c.progress, 5);

    const anyActive = c.active >= 0;
    const explode = 0.55 + s.progress * 1.1 + (anyActive ? 0.12 : 0);
    s.spacing = ease(s.spacing, 0.85 + explode * 0.85, 4);

    // Fit the stack to whatever size the canvas has been given
    const fit = Math.min(state.viewport.width / 7.2, state.viewport.height / 5.4);
    g.scale.setScalar(fit);
    g.position.y = s.progress * 0.9;
    g.rotation.y = 0.55 + t * 0.06 + s.px * 0.28 + s.progress * 1.2;
    g.rotation.x = 0.58 - s.py * 0.12 - s.progress * 0.22;

    const bottom = -1.5 * s.spacing;
    const top = 1.5 * s.spacing;

    for (let i = 0; i < LAYERS; i++) {
      const layer = layerRefs.current[i];
      if (layer) layer.position.y = (i - 1.5) * s.spacing;

      const on = c.active === i;
      resources.lineMats[i].opacity = ease(resources.lineMats[i].opacity, on ? 0.6 : anyActive ? 0.07 : 0.17, 8);
      resources.frameMats[i].opacity = ease(resources.frameMats[i].opacity, on ? 1 : anyActive ? 0.2 : 0.5, 8);
      resources.nodeMats[i].opacity = ease(resources.nodeMats[i].opacity, on ? 1 : anyActive ? 0.25 : 0.6, 8);
    }

    const columnPos = resources.columnGeo.attributes.position as THREE.BufferAttribute;
    const packetPos = resources.packetGeo.attributes.position as THREE.BufferAttribute;
    resources.spots.forEach((spot, k) => {
      const travel = (t * spot.speed + spot.phase) % 1;
      columnPos.setXYZ(k * 2, spot.x, bottom, spot.z);
      columnPos.setXYZ(k * 2 + 1, spot.x, top, spot.z);
      packetPos.setXYZ(k, spot.x, bottom + travel * (top - bottom), spot.z);
    });
    columnPos.needsUpdate = true;
    packetPos.needsUpdate = true;
  });

  return (
    <group ref={group}>
      {Array.from({ length: LAYERS }, (_, i) => (
        <group
          key={i}
          ref={(el) => {
            layerRefs.current[i] = el;
          }}
        >
          <lineSegments geometry={resources.grid} material={resources.lineMats[i]} />
          <lineLoop geometry={resources.frame} material={resources.frameMats[i]} />
          <points geometry={resources.nodes} material={resources.nodeMats[i]} />
        </group>
      ))}
      <lineSegments geometry={resources.columnGeo} material={resources.columnMat} frustumCulled={false} />
      <points geometry={resources.packetGeo} material={resources.packetMat} frustumCulled={false} />
    </group>
  );
}

function Bridge({ controls, onReady }: Pick<StackSceneProps, "controls" | "onReady">) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    controls.current.invalidate = invalidate;
    invalidate();
    onReady();
  }, [controls, invalidate, onReady]);
  return null;
}

export default function StackScene({ controls, frameloop, lite, onReady, onFail }: StackSceneProps) {
  return (
    <Canvas
      flat
      frameloop={frameloop}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0.4, 9.2], fov: 30 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onFail();
        });
      }}
    >
      <Bridge controls={controls} onReady={onReady} />
      <Stack controls={controls} lite={lite} />
    </Canvas>
  );
}
