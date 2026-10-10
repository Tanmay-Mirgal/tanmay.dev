"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createRope, settleRope, stepRope, type Rope, type Vec2 } from "@/lib/rope";

/**
 * Mutable controls shared with the DOM. Nothing here triggers a React render:
 * the HeroStage writes pointer/scroll input, this scene reads it every frame.
 */
export interface RopeControls {
  /** Stage size in CSS px */
  w: number;
  h: number;
  anchor: Vec2;
  rest: Vec2;
  /** Pointer in stage space, or null when it is outside the hero / on touch */
  head: Vec2 | null;
  /** Normalised pointer, -1..1 */
  px: number;
  py: number;
  pluck: number;
  scrollVel: number;
  /** Hero scroll progress 0..1 */
  progress: number;
  visible: boolean;
  lite: boolean;
  /** Set by the scene: restarts the render loop after it went to sleep */
  wake?: () => void;
}

interface ThreadSceneProps {
  controls: RefObject<RopeControls>;
  onReady: () => void;
  onFail: () => void;
}

const RADIAL = 8;
const FOV = 30;
const GRAVITY = 0.55;
const SLEEP_ENERGY = 0.05;
const STEP = 1 / 60;

const cssColor = (name: string, fallback: string) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
};

function buildIndex(n: number) {
  const index: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < RADIAL; j++) {
      const a = i * RADIAL + j;
      const b = i * RADIAL + ((j + 1) % RADIAL);
      const c = (i + 1) * RADIAL + j;
      const d = (i + 1) * RADIAL + ((j + 1) % RADIAL);
      index.push(a, c, b, b, c, d);
    }
  }
  return index;
}

/** Depth wobble gives the strand real z-travel so pointer parallax shows its volume. */
const depth = (i: number, w: number) => Math.sin(i * 0.31) * Math.min(48, w * 0.04);

function writeTube(rope: Rope, geo: THREE.BufferGeometry, w: number, h: number, radius: number) {
  const pos = geo.attributes.position.array as Float32Array;
  const nor = geo.attributes.normal.array as Float32Array;
  const { n, x, y } = rope;

  for (let i = 0; i < n; i++) {
    const prev = Math.max(i - 1, 0);
    const next = Math.min(i + 1, n - 1);

    const cx = x[i] - w / 2;
    const cy = -(y[i] - h / 2);
    const cz = depth(i, w);

    let tx = x[next] - x[prev];
    let ty = -(y[next] - y[prev]);
    let tz = depth(next, w) - depth(prev, w);
    const tl = Math.hypot(tx, ty, tz) || 1;
    tx /= tl;
    ty /= tl;
    tz /= tl;

    // Frame: N1 lies in the screen plane, N2 completes the ring
    let n1x = ty;
    let n1y = -tx;
    const n1l = Math.hypot(n1x, n1y) || 1;
    n1x /= n1l;
    n1y /= n1l;
    const n2x = -tz * n1y;
    const n2y = tz * n1x;
    const n2z = tx * n1y - ty * n1x;

    // Slight taper toward the head
    const r = radius * (0.78 + 0.22 * Math.min(1, (n - 1 - i) / 6));

    for (let j = 0; j < RADIAL; j++) {
      const a = (j / RADIAL) * Math.PI * 2;
      const c = Math.cos(a);
      const s = Math.sin(a);
      const dx = c * n1x + s * n2x;
      const dy = c * n1y + s * n2y;
      const dz = s * n2z;
      const k = (i * RADIAL + j) * 3;
      pos[k] = cx + dx * r;
      pos[k + 1] = cy + dy * r;
      pos[k + 2] = cz + dz * r;
      nor[k] = dx;
      nor[k + 1] = dy;
      nor[k + 2] = dz;
    }
  }
  geo.attributes.position.needsUpdate = true;
  geo.attributes.normal.needsUpdate = true;
}

function Strand({ controls }: { controls: RefObject<RopeControls> }) {
  const invalidate = useThree((s) => s.invalidate);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  const group = useRef<THREE.Group>(null);
  const plug = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const rope = useRef<Rope | null>(null);
  const acc = useRef(0);
  // The head glides toward the pointer, or back to its resting spot when there is none
  const smoothHead = useRef<Vec2>({ ...controls.current.rest });

  const n = controls.current.lite ? 32 : 46;

  const res = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * RADIAL * 3), 3));
    geometry.setAttribute("normal", new THREE.BufferAttribute(new Float32Array(n * RADIAL * 3), 3));
    geometry.setIndex(buildIndex(n));

    const thread = new THREE.Color(cssColor("--color-thread", "#ff4a1c"));
    const paper = new THREE.Color(cssColor("--color-paper", "#ecebe6"));

    return {
      geometry,
      strand: new THREE.MeshStandardMaterial({
        color: thread,
        emissive: thread,
        emissiveIntensity: 0.55,
        roughness: 0.42,
        metalness: 0.05,
        side: THREE.DoubleSide,
      }),
      plug: new THREE.MeshStandardMaterial({ color: paper, roughness: 0.28, metalness: 0.1 }),
      ring: new THREE.MeshBasicMaterial({ color: paper, transparent: true, opacity: 0.35 }),
      plugGeo: new THREE.SphereGeometry(1, 20, 14),
      ringGeo: new THREE.TorusGeometry(1, 0.045, 8, 48),
    };
  }, [n]);

  useEffect(
    () => () => {
      res.geometry.dispose();
      res.strand.dispose();
      res.plug.dispose();
      res.ring.dispose();
      res.plugGeo.dispose();
      res.ringGeo.dispose();
    },
    [res]
  );

  // (Re)build the rope whenever the stage changes size
  useEffect(() => {
    const c = controls.current;
    smoothHead.current = { ...c.rest };
    rope.current = settleRope(createRope(n, c.anchor, c.rest), GRAVITY, c.rest);
    c.wake = invalidate;
    invalidate();
  }, [width, height, n, controls, invalidate]);

  // Keep 1 world unit == 1 CSS pixel at the z=0 plane
  useEffect(() => {
    const z = height / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    camera.position.set(0, 0, z);
    camera.near = z * 0.2;
    camera.far = z * 3;
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, height, invalidate]);

  useFrame((_, delta) => {
    const c = controls.current;
    const r = rope.current;
    if (!r) return;

    const desired = c.head ?? c.rest;
    const head = smoothHead.current;

    acc.current += Math.min(delta, 0.05);
    let energy = 0;
    let steps = 0;
    while (acc.current >= STEP && steps < 4) {
      head.x += (desired.x - head.x) * 0.16;
      head.y += (desired.y - head.y) * 0.16;
      // Retractable cord: length follows the head so it always reaches the anchor
      const ax = r.x[r.pinned - 1];
      const ay = r.y[r.pinned - 1];
      const slack = 1.14 - 0.1 * c.progress;
      r.seg = Math.max(5, (Math.hypot(head.x - ax, head.y - ay) * slack) / (r.n - r.pinned));
      energy = stepRope(r, {
        head,
        gravity: GRAVITY,
        pluck: c.pluck,
        scrollVel: c.scrollVel,
      });
      c.pluck = 0;
      acc.current -= STEP;
      steps++;
    }
    c.scrollVel *= 0.88;

    const radius = c.lite ? 3.6 : 4.4;
    writeTube(r, res.geometry, c.w, c.h, radius);

    const hx = r.x[n - 1] - c.w / 2;
    const hy = -(r.y[n - 1] - c.h / 2);
    const hz = depth(n - 1, c.w);
    if (plug.current) {
      plug.current.position.set(hx, hy, hz);
      plug.current.scale.setScalar(radius * 2.1);
    }
    if (ring.current) {
      ring.current.position.set(hx, hy, hz);
      const target = c.head ? 15 : 11;
      ring.current.scale.setScalar(THREE.MathUtils.lerp(ring.current.scale.x || target, target, 0.15));
    }
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, c.px * 0.12, 0.08);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -c.py * 0.07, 0.08);
    }

    const headTravelling = Math.abs(desired.x - head.x) + Math.abs(desired.y - head.y) > 0.4;

    // Sleep when nothing is moving; any input calls controls.wake()
    if (c.visible && (energy > SLEEP_ENERGY || headTravelling || Math.abs(c.scrollVel) > 0.02)) {
      invalidate();
    }
  });

  return (
    <group ref={group}>
      <mesh geometry={res.geometry} material={res.strand} frustumCulled={false} />
      <mesh ref={plug} geometry={res.plugGeo} material={res.plug} frustumCulled={false} />
      <mesh ref={ring} geometry={res.ringGeo} material={res.ring} frustumCulled={false} />
    </group>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady();
  }, [onReady]);
  return null;
}

export default function ThreadScene({ controls, onReady, onFail }: ThreadSceneProps) {
  return (
    <Canvas
      flat
      frameloop="demand"
      dpr={[1, controls.current.lite ? 1.5 : 2]}
      camera={{ fov: FOV, position: [0, 0, 1200] }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          onFail();
        });
      }}
    >
      <ambientLight intensity={1.1} />
      <directionalLight position={[-420, 520, 760]} intensity={2.4} />
      <directionalLight position={[520, -240, 380]} intensity={0.7} />
      <Strand controls={controls} />
      <Ready onReady={onReady} />
    </Canvas>
  );
}
