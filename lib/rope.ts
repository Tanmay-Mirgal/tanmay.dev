/**
 * Verlet rope used by the hero. Pure maths, no React or three.js, so the same
 * simulation drives the WebGL scene and the static SVG fallback.
 *
 * Coordinates are CSS pixels in the hero stage: x right, y DOWN.
 * Points 0..pinned-1 are an immovable guide that leaves the stage straight
 * downward (it hands over to the page-long thread); the last point is the head.
 */

export interface Vec2 {
  x: number;
  y: number;
}

export interface Rope {
  n: number;
  pinned: number;
  seg: number;
  x: Float32Array;
  y: Float32Array;
  ox: Float32Array;
  oy: Float32Array;
}

export interface StepInput {
  /** Where the head should be (stage px), or null to let it hang from its own slack */
  head: Vec2 | null;
  gravity: number;
  /** Position kick along the rope's normal, 0..1 */
  pluck: number;
  /** Vertical scroll velocity in px per frame */
  scrollVel: number;
}

const DAMPING = 0.985;
const ITERATIONS = 14;

export function createRope(n: number, anchor: Vec2, rest: Vec2, slack = 1.07, pinned = 4): Rope {
  const reach = Math.hypot(rest.x - anchor.x, rest.y - anchor.y);
  const free = n - pinned;
  const seg = (reach * slack) / free;

  const rope: Rope = {
    n,
    pinned,
    seg,
    x: new Float32Array(n),
    y: new Float32Array(n),
    ox: new Float32Array(n),
    oy: new Float32Array(n),
  };

  for (let i = 0; i < n; i++) {
    if (i < pinned) {
      // Guide below the anchor, running straight down
      rope.x[i] = anchor.x;
      rope.y[i] = anchor.y + (pinned - 1 - i) * seg;
    } else {
      const t = (i - pinned + 1) / free;
      rope.x[i] = anchor.x + (rest.x - anchor.x) * t;
      rope.y[i] = anchor.y + (rest.y - anchor.y) * t;
    }
    rope.ox[i] = rope.x[i];
    rope.oy[i] = rope.y[i];
  }
  return rope;
}

export function maxReach(rope: Rope): number {
  return rope.seg * (rope.n - rope.pinned);
}

/** Advance one fixed 1/60s step. Returns kinetic "energy" so callers can sleep when settled. */
export function stepRope(rope: Rope, input: StepInput): number {
  const { n, pinned, x, y, ox, oy } = rope;
  const anchorX = x[pinned - 1];
  const anchorY = y[pinned - 1];

  // Verlet integration of the free points
  for (let i = pinned; i < n; i++) {
    const vx = (x[i] - ox[i]) * DAMPING;
    const vy = (y[i] - oy[i]) * DAMPING;
    ox[i] = x[i];
    oy[i] = y[i];
    x[i] += vx;
    y[i] += vy + input.gravity + input.scrollVel * 0.08;
  }

  // Pluck: kick every free point along the local normal, strongest mid-rope
  if (input.pluck > 0.001) {
    for (let i = pinned; i < n - 1; i++) {
      const dx = x[i + 1] - x[i - 1];
      const dy = y[i + 1] - y[i - 1];
      const len = Math.hypot(dx, dy) || 1;
      const t = (i - pinned) / (n - 1 - pinned);
      const amp = Math.sin(Math.PI * t) * input.pluck * 26;
      x[i] += (-dy / len) * amp;
      y[i] += (dx / len) * amp;
    }
  }

  // Clamp the head target to what the rope can physically reach
  let target = input.head;
  if (target) {
    const reach = maxReach(rope) * 0.995;
    const dx = target.x - anchorX;
    const dy = target.y - anchorY;
    const dist = Math.hypot(dx, dy);
    if (dist > reach) target = { x: anchorX + (dx / dist) * reach, y: anchorY + (dy / dist) * reach };
  }

  for (let k = 0; k < ITERATIONS; k++) {
    for (let i = 1; i < n; i++) {
      const a = i - 1;
      const b = i;
      const dx = x[b] - x[a];
      const dy = y[b] - y[a];
      const dist = Math.hypot(dx, dy) || 1e-6;
      const diff = (dist - rope.seg) / dist;

      const aFixed = a < pinned;
      const bFixed = b < pinned;
      if (aFixed && bFixed) continue;

      if (aFixed) {
        x[b] -= dx * diff;
        y[b] -= dy * diff;
      } else {
        x[a] += dx * diff * 0.5;
        y[a] += dy * diff * 0.5;
        x[b] -= dx * diff * 0.5;
        y[b] -= dy * diff * 0.5;
      }
    }

    // The head follows the pointer firmly but not rigidly
    if (target) {
      x[n - 1] += (target.x - x[n - 1]) * 0.5;
      y[n - 1] += (target.y - y[n - 1]) * 0.5;
    }
  }

  // Bending stiffness near the anchor: the rope rises straight out of the margin
  // (continuing the page thread), then bends toward the head.
  const stiff = Math.min(14, n - pinned - 2);
  for (let j = 0; j < stiff; j++) {
    const i = pinned + j;
    const w = 0.4 * (1 - j / stiff) ** 2;
    x[i] += (anchorX - x[i]) * w;
    y[i] += (anchorY - (j + 1) * rope.seg - y[i]) * w;
  }

  let energy = 0;
  for (let i = pinned; i < n; i++) energy += Math.abs(x[i] - ox[i]) + Math.abs(y[i] - oy[i]);
  return energy;
}

/** Run the simulation until it rests, for a first frame and for static fallbacks. */
export function settleRope(rope: Rope, gravity: number, head: Vec2 | null, steps = 220): Rope {
  for (let i = 0; i < steps; i++) {
    stepRope(rope, { head, gravity, pluck: 0, scrollVel: 0 });
  }
  return rope;
}

/** Smooth SVG path through the rope's points (quadratic midpoints). */
export function ropeToPath(rope: Rope, from = 0): string {
  const { x, y, n } = rope;
  let d = `M${x[from].toFixed(1)} ${y[from].toFixed(1)}`;
  for (let i = from + 1; i < n - 1; i++) {
    const mx = (x[i] + x[i + 1]) / 2;
    const my = (y[i] + y[i + 1]) / 2;
    d += ` Q${x[i].toFixed(1)} ${y[i].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  d += ` L${x[n - 1].toFixed(1)} ${y[n - 1].toFixed(1)}`;
  return d;
}
