"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { getShape, type ShapeName } from "@/lib/sculpture";
import { sculpture, type Slot } from "./store";

const FOV = 35;
const CAMERA_Z = 6;
const SHAPE_HEIGHT = 2.7;
const MORPH_SECONDS = 1.7;

const VERTEX = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute vec4 aRand;

  uniform float uMix;
  uniform float uHold;
  uniform float uScale;
  uniform float uSizeBase;
  uniform float uOpacity;
  uniform float uPointerRadius;
  uniform vec3 uPointer;

  varying float vAlpha;
  varying float vDepth;

  void main() {
    // Each point leaves a little later than its neighbours, so shapes pour into each other
    float m = clamp(uMix * 1.45 - aRand.x * 0.45, 0.0, 1.0);
    m = m * m * (3.0 - 2.0 * m);

    vec3 p = mix(aFrom, aTo, m);

    // Mid-morph the points arc outward instead of travelling in straight lines
    p += (aRand.xyz - 0.5) * 1.1 * sin(m * 3.14159265);

    // A resting sculpture is slightly loose; holding calibrates it into focus
    float loose = 1.0 - uHold;
    p += (aRand.wzy - 0.5) * 0.05 * loose;

    vec4 world = modelMatrix * vec4(p, 1.0);

    // Pointer repulsion in world space
    vec2 away = world.xy - uPointer.xy;
    float dist = length(away);
    float push = smoothstep(uPointerRadius, 0.0, dist) * (1.0 - uHold * 0.65);
    world.xy += normalize(away + vec2(0.0001)) * push * uPointerRadius * 0.55;
    world.z += push * uPointerRadius * 0.4;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    float size = (0.55 + aRand.w * 0.9) * (1.0 + push * 0.9) * (1.0 - uHold * 0.25);
    gl_PointSize = max(1.1, size * uSizeBase * uScale / -mv.z);

    vDepth = clamp(0.5 + (world.z) * 0.35, 0.0, 1.0);
    vAlpha = (0.32 + 0.68 * aRand.y) * uOpacity * (1.0 + uHold * 0.35);
  }
`;

const FRAGMENT = /* glsl */ `
  varying float vAlpha;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d) * vAlpha;
    vec3 col = mix(vec3(0.55), vec3(0.96, 0.95, 0.92), vDepth);
    gl_FragColor = vec4(col, a);
  }
`;

const ease = (x: number) => x * x * (3 - 2 * x);

function overlap(slot: Slot, vw: number, vh: number) {
  const r = slot.el.getBoundingClientRect();
  const w = Math.max(0, Math.min(r.right, vw) - Math.max(r.left, 0));
  const h = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
  const area = w * h;
  return { rect: r, ratio: r.width * r.height > 0 ? area / (r.width * r.height) : 0, area };
}

function Points({ onReady }: { onReady: () => void }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const pts = useRef<THREE.Points>(null);

  const n = sculpture.lite ? 9000 : 26000;

  const res = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const zeros = new Float32Array(n * 3);
    const rand = new Float32Array(n * 4);
    for (let i = 0; i < rand.length; i++) rand[i] = Math.random();
    const start = getShape("cloud", n);

    geometry.setAttribute("position", new THREE.BufferAttribute(zeros, 3));
    geometry.setAttribute("aFrom", new THREE.BufferAttribute(start.slice(), 3));
    geometry.setAttribute("aTo", new THREE.BufferAttribute(start.slice(), 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 4));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMix: { value: 1 },
        uHold: { value: 0 },
        uScale: { value: 1 },
        uSizeBase: { value: 1 },
        uOpacity: { value: 0 },
        uPointerRadius: { value: 0.5 },
        uPointer: { value: new THREE.Vector3(9999, 9999, 0) },
      },
    });
    return { geometry, material };
  }, [n]);

  useEffect(
    () => () => {
      res.geometry.dispose();
      res.material.dispose();
    },
    [res]
  );

  const state = useRef({
    shape: "cloud" as ShapeName,
    mix: 1,
    hold: 0,
    opacity: 0,
    ready: false,
    placed: false,
  });

  useEffect(() => {
    sculpture.wake = invalidate;
    invalidate();
    return () => {
      sculpture.wake = () => {};
    };
  }, [invalidate]);

  useFrame((frame, delta) => {
    const mesh = pts.current;
    if (!mesh) return;
    const s = state.current;
    const u = res.material.uniforms;
    const { width, height } = frame.size;
    const view = frame.viewport;
    const dt = Math.min(delta, 0.05);

    // Which slot is the sculpture living in right now?
    let target: { slot: Slot; rect: DOMRect; ratio: number; area: number } | null = null;
    for (const slot of sculpture.slots) {
      const o = overlap(slot, width, height);
      if (o.ratio > 0.1 && (!target || o.area > target.area)) target = { slot, ...o };
    }

    // Morph when the slot (or the project in it) asks for a different shape
    if (target) {
      const want: ShapeName = target.slot.kind === "projects" ? sculpture.projectShape : "pose";
      if (want !== s.shape) {
        const from = res.geometry.attributes.aFrom as THREE.BufferAttribute;
        const to = res.geometry.attributes.aTo as THREE.BufferAttribute;
        if (s.mix < 1) {
          // Interrupted mid-morph: start the next one from where the points are now
          const e = ease(s.mix);
          for (let i = 0; i < from.array.length; i++) {
            from.array[i] = from.array[i] + (to.array[i] - from.array[i]) * e;
          }
        } else {
          (from.array as Float32Array).set(to.array as Float32Array);
        }
        (to.array as Float32Array).set(getShape(want, n));
        from.needsUpdate = true;
        to.needsUpdate = true;
        s.shape = want;
        s.mix = 0;
      }
    }

    if (s.mix < 1) s.mix = Math.min(1, s.mix + dt / MORPH_SECONDS);
    u.uMix.value = s.mix;

    // Placement: follow the slot's rectangle on screen
    let posErr = 0;
    if (target) {
      const r = target.rect;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const px = Math.min(r.width * 0.95, r.height);
      const wx = ((cx / width) * 2 - 1) * (view.width / 2);
      const wy = -((cy / height) * 2 - 1) * (view.height / 2);
      const scale = ((px / height) * view.height) / SHAPE_HEIGHT;

      const k = 1 - Math.pow(0.0008, dt);
      posErr =
        Math.abs(wx - mesh.position.x) + Math.abs(wy - mesh.position.y) + Math.abs(scale - mesh.scale.x);
      if (!s.placed) {
        // First sighting: appear in place rather than flying in from the origin
        mesh.position.set(wx, wy, 0);
        mesh.scale.setScalar(scale);
        s.placed = true;
      } else {
        mesh.position.x += (wx - mesh.position.x) * k;
        mesh.position.y += (wy - mesh.position.y) * k;
        mesh.scale.setScalar(mesh.scale.x + (scale - mesh.scale.x) * k);
      }
    }

    // Fade out when no slot is on screen
    const wantOpacity = target ? 1 : 0;
    s.opacity += (wantOpacity - s.opacity) * (1 - Math.pow(0.002, dt));
    u.uOpacity.value = s.opacity;
    mesh.visible = s.opacity > 0.01;

    // Pointer parallax + repulsion
    const p = sculpture.pointer;
    const nx = (p.x / width) * 2 - 1;
    const ny = (p.y / height) * 2 - 1;
    const targetRotY = Math.max(-1, Math.min(1, nx)) * 0.38;
    const targetRotX = Math.max(-1, Math.min(1, ny)) * 0.12;
    mesh.rotation.y += (targetRotY - mesh.rotation.y) * (1 - Math.pow(0.01, dt));
    mesh.rotation.x += (targetRotX - mesh.rotation.x) * (1 - Math.pow(0.01, dt));

    u.uPointer.value.set(nx * (view.width / 2), -ny * (view.height / 2), 0);
    u.uPointerRadius.value = 0.55 * Math.max(0.6, mesh.scale.x);

    // Hold-to-calibrate
    s.hold += (sculpture.holdTarget - s.hold) * (1 - Math.pow(0.004, dt));
    u.uHold.value = s.hold;

    u.uScale.value = mesh.scale.x;
    u.uSizeBase.value = (height * gl.getPixelRatio()) / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2))) * 0.012;

    if (!s.ready && target) {
      s.ready = true;
      onReady();
    }

    const busy =
      s.mix < 1 ||
      performance.now() < sculpture.activeUntil ||
      posErr > 0.002 ||
      Math.abs(sculpture.holdTarget - s.hold) > 0.01 ||
      Math.abs(wantOpacity - s.opacity) > 0.01;
    if (busy) invalidate();
  });

  return <points ref={pts} geometry={res.geometry} material={res.material} frustumCulled={false} />;
}

export default function SculptureCanvas({ onReady, onFail }: { onReady: () => void; onFail: () => void }) {
  return (
    <Canvas
      flat
      frameloop="demand"
      dpr={[1, sculpture.lite ? 1.5 : 2]}
      camera={{ fov: FOV, position: [0, 0, CAMERA_Z], near: 0.1, far: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onFail();
        });
      }}
    >
      <Points onReady={onReady} />
    </Canvas>
  );
}
