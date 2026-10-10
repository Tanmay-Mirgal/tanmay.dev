/**
 * Procedural point-cloud shapes for the particle sculpture.
 *
 * Every shape is a Float32Array of `n` xyz triples in a ~[-1.3, 1.3] box, built
 * deterministically (seeded RNG) so the sculpture is identical on every load and
 * nothing is downloaded. The hero shape is a standing figure assembled from the
 * 33 MediaPipe pose landmarks and their 35 connections: the same skeleton that
 * powers Swasthya.
 */

export type Vec3 = [number, number, number];

export const SHAPES = [
  "cloud",
  "pose",
  "orb",
  "bars",
  "plane",
  "wave",
  "radar",
  "city",
  "mesh",
  "net",
] as const;
export type ShapeName = (typeof SHAPES)[number];

/** MediaPipe Pose landmark order (index = landmark id). x: subject's left is +x, y up, z toward camera. */
export const POSE_LANDMARKS: Vec3[] = [
  [0, 1.02, 0.08], // 0 nose
  [0.03, 1.06, 0.06], // 1 left eye (inner)
  [0.06, 1.07, 0.05], // 2 left eye
  [0.09, 1.06, 0.03], // 3 left eye (outer)
  [-0.03, 1.06, 0.06], // 4 right eye (inner)
  [-0.06, 1.07, 0.05], // 5 right eye
  [-0.09, 1.06, 0.03], // 6 right eye (outer)
  [0.14, 1.03, -0.02], // 7 left ear
  [-0.14, 1.03, -0.02], // 8 right ear
  [0.04, 0.96, 0.07], // 9 mouth (left)
  [-0.04, 0.96, 0.07], // 10 mouth (right)
  [0.36, 0.75, 0], // 11 left shoulder
  [-0.36, 0.75, 0], // 12 right shoulder
  [0.55, 0.38, 0.02], // 13 left elbow
  [-0.55, 0.38, 0.02], // 14 right elbow
  [0.68, 0.02, 0.05], // 15 left wrist
  [-0.68, 0.02, 0.05], // 16 right wrist
  [0.74, -0.08, 0.05], // 17 left pinky
  [-0.74, -0.08, 0.05], // 18 right pinky
  [0.72, -0.12, 0.08], // 19 left index
  [-0.72, -0.12, 0.08], // 20 right index
  [0.66, -0.06, 0.09], // 21 left thumb
  [-0.66, -0.06, 0.09], // 22 right thumb
  [0.2, 0, 0], // 23 left hip
  [-0.2, 0, 0], // 24 right hip
  [0.24, -0.62, 0.03], // 25 left knee
  [-0.24, -0.62, 0.03], // 26 right knee
  [0.26, -1.2, 0], // 27 left ankle
  [-0.26, -1.2, 0], // 28 right ankle
  [0.28, -1.26, -0.05], // 29 left heel
  [-0.28, -1.26, -0.05], // 30 right heel
  [0.3, -1.3, 0.18], // 31 left foot index
  [-0.3, -1.3, 0.18], // 32 right foot index
];

/** MediaPipe's POSE_CONNECTIONS. */
export const POSE_CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 7], [0, 4], [4, 5], [5, 6], [6, 8], [9, 10],
  [11, 12], [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19],
  [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20],
  [11, 23], [12, 24], [23, 24],
  [23, 25], [25, 27], [27, 29], [29, 31], [27, 31],
  [24, 26], [26, 28], [28, 30], [30, 32], [28, 32],
];

type Rng = () => number;
const TAU = Math.PI * 2;

function mulberry32(seed: number): Rng {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const unit = (rng: Rng): Vec3 => {
  const z = rng() * 2 - 1;
  const a = rng() * TAU;
  const r = Math.sqrt(1 - z * z);
  return [r * Math.cos(a), z, r * Math.sin(a)];
};

const gauss = (rng: Rng) => (rng() + rng() + rng() - 1.5) * 0.8;

const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

/** Rotate about X then Y. */
const rot = (p: Vec3, ax: number, ay: number): Vec3 => {
  const [x, y, z] = p;
  const y1 = y * Math.cos(ax) - z * Math.sin(ax);
  const z1 = y * Math.sin(ax) + z * Math.cos(ax);
  return [x * Math.cos(ay) + z1 * Math.sin(ay), y1, -x * Math.sin(ay) + z1 * Math.cos(ay)];
};

/** Pick an index from cumulative weights. */
const pick = (cum: number[], rng: Rng) => {
  const v = rng() * cum[cum.length - 1];
  let lo = 0;
  let hi = cum.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (cum[mid] < v) lo = mid + 1;
    else hi = mid;
  }
  return lo;
};

const cumulative = (weights: number[]) => {
  let sum = 0;
  return weights.map((w) => (sum += w));
};

type Gen = (rng: Rng) => Vec3;

/** Fill a buffer by drawing from weighted generators. */
function compose(n: number, seed: number, parts: [number, Gen][]): Float32Array {
  const rng = mulberry32(seed);
  const cum = cumulative(parts.map(([w]) => w));
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const [x, y, z] = parts[pick(cum, rng)][1](rng);
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = z;
  }
  return out;
}

/** Points scattered along a set of segments, with a little jitter. */
function segments(pairs: [Vec3, Vec3][], jitter: number): Gen {
  const lengths = pairs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) + 0.001);
  const cum = cumulative(lengths);
  return (rng) => {
    const [a, b] = pairs[pick(cum, rng)];
    const p = lerp3(a, b, rng());
    return [p[0] + gauss(rng) * jitter, p[1] + gauss(rng) * jitter, p[2] + gauss(rng) * jitter];
  };
}

/** Small gaussian blobs around fixed centres. */
function blobs(centres: Vec3[], radius: number): Gen {
  return (rng) => {
    const c = centres[Math.floor(rng() * centres.length)];
    return [c[0] + gauss(rng) * radius, c[1] + gauss(rng) * radius, c[2] + gauss(rng) * radius];
  };
}

const ambient =
  (radius: number): Gen =>
  (rng) => {
    const u = unit(rng);
    const r = radius * (0.7 + rng() * 0.5);
    return [u[0] * r, u[1] * r * 0.8, u[2] * r];
  };

// ───────────────────────────── shapes ─────────────────────────────

function cloud(n: number): Float32Array {
  return compose(n, 11, [
    [
      1,
      (rng) => {
        const u = unit(rng);
        const r = 0.35 + Math.sqrt(rng()) * 1.05;
        return [u[0] * r, u[1] * r * 0.75, u[2] * r];
      },
    ],
  ]);
}

function pose(n: number): Float32Array {
  const L = POSE_LANDMARKS;
  // Face landmarks (0-10) are left out of the particle figure: eyes and mouth read as a smiley.
  // The head is a shell on a neck instead; the full 33 still drive the static SVG version.
  const bones: [Vec3, Vec3][] = POSE_CONNECTIONS.filter(([a, b]) => a > 10 || b > 10).map(([a, b]) => [L[a], L[b]]);
  const neck: [Vec3, Vec3] = [[0, 0.91, 0], lerp3(L[11], L[12], 0.5)];
  bones.push(neck);
  const joints = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28].map((i) => L[i]);

  // Horizontal scan lines across the torso, plus a spine, instead of a solid slab
  const scan = 9;
  const scanLines: [Vec3, Vec3][] = Array.from({ length: scan }, (_, k) => {
    const v = k / (scan - 1);
    return [lerp3(L[12], L[24], v), lerp3(L[11], L[23], v)] as [Vec3, Vec3];
  });
  scanLines.push([lerp3(L[11], L[12], 0.5), lerp3(L[23], L[24], 0.5)]);

  return compose(n, 21, [
    [44, segments(bones, 0.011)],
    [10, blobs(joints, 0.03)],
    [20, segments(scanLines, 0.008)],
    // sparse inner fill so the torso still has some depth
    [
      5,
      (rng) => {
        const p = lerp3(lerp3(L[12], L[11], rng()), lerp3(L[24], L[23], rng()), rng());
        return [p[0], p[1], p[2] + gauss(rng) * 0.05];
      },
    ],
    // head: a thin shell
    [
      16,
      (rng) => {
        const u = unit(rng);
        const r = 0.125 + gauss(rng) * 0.005;
        return [u[0] * r, 1.03 + u[1] * r * 1.12, u[2] * r];
      },
    ],
    [5, ambient(1.45)],
  ]);
}

function orb(n: number): Float32Array {
  const ring = (radius: number, ax: number, ay: number): Gen => (rng) => {
    const a = rng() * TAU;
    return rot([Math.cos(a) * radius + gauss(rng) * 0.012, gauss(rng) * 0.012, Math.sin(a) * radius], ax, ay);
  };
  return compose(n, 31, [
    [
      52,
      (rng) => {
        const u = unit(rng);
        const r = 0.9 + gauss(rng) * 0.01;
        return [u[0] * r, u[1] * r, u[2] * r];
      },
    ],
    [16, ring(1.25, 0.9, 0)],
    [16, ring(1.1, -0.5, 0.8)],
    [12, ring(1.4, 0.2, -0.9)],
    [4, ambient(1.5)],
  ]);
}

function bars(n: number): Float32Array {
  const heights = [1.55, 1.3, 1.1, 0.92, 0.78, 0.64, 0.52, 0.42, 0.32, 0.24];
  const count = heights.length;
  const cum = cumulative(heights);
  return compose(n, 41, [
    [
      92,
      (rng) => {
        const i = pick(cum, rng);
        const x = -1.2 + (i / (count - 1)) * 2.4;
        return rot([x + (rng() - 0.5) * 0.17, -0.9 + rng() * heights[i], (rng() - 0.5) * 0.17], -0.2, 0.5);
      },
    ],
    [8, (rng) => rot([(rng() * 2 - 1) * 1.35, -0.9, (rng() - 0.5) * 0.4], -0.2, 0.5)],
  ]);
}

function plane(n: number): Float32Array {
  const frames: [number, number, number, number][] = [
    [-0.9, 0.25, 0.7, 0.5],
    [0.05, 0.45, 0.8, 0.55],
    [-0.35, -0.5, 0.9, 0.4],
  ];
  const edge = (): Gen => (rng) => {
    const [x, y, w, h] = frames[Math.floor(rng() * frames.length)];
    const t = rng() * 2 * (w + h);
    let px = x;
    let py = y;
    if (t < w) px += t;
    else if (t < w + h) { px += w; py += t - w; }
    else if (t < 2 * w + h) { px += w - (t - w - h); py += h; }
    else py += h - (t - 2 * w - h);
    return rot([px, py, gauss(rng) * 0.012], -0.5, 0.45);
  };
  return compose(n, 51, [
    [
      50,
      (rng) => {
        const line = Math.floor(rng() * 14);
        const t = rng();
        const vertical = rng() < 0.5;
        const a = -1.2 + (line / 13) * 2.4;
        return rot(vertical ? [a, -0.95 + t * 1.9, 0] : [-1.2 + t * 2.4, -0.95 + (line / 13) * 1.9, 0], -0.5, 0.45);
      },
    ],
    [34, edge()],
    [16, (rng) => rot([(rng() * 2 - 1) * 1.2, (rng() * 2 - 1) * 0.95, gauss(rng) * 0.02], -0.5, 0.45)],
  ]);
}

function wave(n: number): Float32Array {
  const barAngles = Array.from({ length: 28 }, (_, i) => (i / 28) * TAU);
  return compose(n, 61, [
    [
      70,
      (rng) => {
        const r = 1.3 * Math.sqrt(rng());
        const a = rng() * TAU;
        const y = 0.3 * Math.cos(r * 5.4) * Math.exp(-r * 0.55);
        return rot([Math.cos(a) * r, y, Math.sin(a) * r], 0.55, 0);
      },
    ],
    [
      30,
      (rng) => {
        const k = Math.floor(rng() * barAngles.length);
        const a = barAngles[k];
        const top = 0.15 + 0.55 * Math.abs(Math.sin(k * 1.7)) + 0.2 * Math.abs(Math.sin(k * 0.6));
        return rot([Math.cos(a) * 0.95, -0.35 + rng() * top, Math.sin(a) * 0.95], 0.55, 0);
      },
    ],
  ]);
}

function radar(n: number): Float32Array {
  const radii = [0.35, 0.7, 1.05, 1.4];
  const blips: Vec3[] = [[0.7, 0, 0.3], [-0.5, 0, 0.9], [0.2, 0, -1.0], [-1.0, 0, -0.3], [0.9, 0, -0.7]];
  const tilt = (p: Vec3) => rot(p, -0.9, 0.3);
  return compose(n, 71, [
    [
      34,
      (rng) => {
        const r = radii[Math.floor(rng() * radii.length)];
        const a = rng() * TAU;
        return tilt([Math.cos(a) * r, gauss(rng) * 0.01, Math.sin(a) * r]);
      },
    ],
    [
      12,
      (rng) => {
        const a = (Math.floor(rng() * 8) / 8) * TAU;
        const r = rng() * 1.4;
        return tilt([Math.cos(a) * r, 0, Math.sin(a) * r]);
      },
    ],
    [
      38,
      (rng) => {
        const a = rng() * 0.95;
        const r = 1.4 * Math.sqrt(rng());
        return tilt([Math.cos(a) * r, 0, Math.sin(a) * r]);
      },
    ],
    [16, (rng) => tilt(blobs(blips, 0.045)(rng))],
  ]);
}

function city(n: number): Float32Array {
  const grid = 6;
  const half = 0.115;
  const heights = Array.from({ length: grid * grid }, (_, i) => 0.2 + Math.abs(Math.sin(i * 12.9898) * 1.15));
  const cells = heights.map((height, cell) => ({
    cx: ((cell % grid) - (grid - 1) / 2) * 0.4,
    cz: (Math.floor(cell / grid) - (grid - 1) / 2) * 0.4,
    height,
  }));
  const tall = cumulative(heights);
  const view = (p: Vec3) => rot(p, -0.45, 0.6);
  const top = (c: (typeof cells)[number]) => -0.7 + c.height;

  return compose(n, 81, [
    // vertical edges of every block
    [
      46,
      (rng) => {
        const c = cells[pick(tall, rng)];
        const sx = rng() < 0.5 ? -half : half;
        const sz = rng() < 0.5 ? -half : half;
        return view([c.cx + sx, -0.7 + rng() * c.height, c.cz + sz]);
      },
    ],
    // rooftop outlines
    [
      26,
      (rng) => {
        const c = cells[pick(tall, rng)];
        const t = rng() * 4;
        const side = Math.floor(t);
        const k = (t - side) * 2 * half - half;
        const [x, z] = [[k, -half], [half, k], [-k, half], [-half, -k]][side];
        return view([c.cx + x, top(c), c.cz + z]);
      },
    ],
    // a little roof fill so towers feel solid
    [
      10,
      (rng) => {
        const c = cells[pick(tall, rng)];
        return view([c.cx + (rng() * 2 - 1) * half, top(c), c.cz + (rng() * 2 - 1) * half]);
      },
    ],
    // street grid
    [
      18,
      (rng) => {
        const line = Math.floor(rng() * 7);
        const t = rng();
        const a = -1.0 + (line / 6) * 2.0;
        return view(rng() < 0.5 ? [a, -0.7, -1.2 + t * 2.4] : [-1.2 + t * 2.4, -0.7, a]);
      },
    ],
  ]);
}

function mesh(n: number): Float32Array {
  const count = 11;
  const nodes: Vec3[] = Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = i * 2.399963;
    return [Math.cos(a) * r * 0.95, y * 0.95, Math.sin(a) * r * 0.95];
  });
  const edges: [Vec3, Vec3][] = [];
  nodes.forEach((a, i) => {
    nodes
      .map((b, j) => ({ b, j, d: Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) }))
      .filter((o) => o.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 3)
      .forEach((o) => edges.push([a, o.b]));
  });
  return compose(n, 91, [
    [48, segments(edges, 0.008)],
    [36, blobs(nodes, 0.06)],
    [16, ambient(1.3)],
  ]);
}

function net(n: number): Float32Array {
  const layers = [5, 7, 7, 4];
  const xs = [-1.05, -0.35, 0.35, 1.05];
  const nodes: Vec3[][] = layers.map((count, li) =>
    Array.from({ length: count }, (_, k) => [xs[li], (k - (count - 1) / 2) * 0.32, Math.sin(li * 3 + k * 2) * 0.12] as Vec3)
  );
  const edges: [Vec3, Vec3][] = [];
  for (let li = 0; li < nodes.length - 1; li++) {
    nodes[li].forEach((a) => nodes[li + 1].forEach((b) => edges.push([a, b])));
  }
  return compose(n, 101, [
    [50, segments(edges, 0.006)],
    [36, blobs(nodes.flat(), 0.05)],
    [14, ambient(1.3)],
  ]);
}

const builders: Record<ShapeName, (n: number) => Float32Array> = {
  cloud,
  pose,
  orb,
  bars,
  plane,
  wave,
  radar,
  city,
  mesh,
  net,
};

const cache = new Map<string, Float32Array>();

export function getShape(name: ShapeName, n: number): Float32Array {
  const key = `${name}:${n}`;
  let shape = cache.get(key);
  if (!shape) {
    shape = builders[name](n);
    cache.set(key, shape);
  }
  return shape;
}

/** Every project gets a symbolic form; titles that aren't recognised fall back deterministically. */
export function shapeForTitle(title: string): ShapeName {
  const t = title.toLowerCase();
  if (t.includes("swasthya")) return "pose";
  if (t.includes("orb")) return "orb";
  if (t.includes("finch")) return "bars";
  if (t.includes("slate")) return "plane";
  if (t.includes("raga")) return "wave";
  if (t.includes("cts") || t.includes("combat")) return "radar";
  if (t.includes("samadhan")) return "city";
  if (t.includes("meet")) return "mesh";
  if (t.includes("cognix")) return "net";

  const pool: ShapeName[] = ["mesh", "wave", "plane", "net", "city", "radar", "bars", "orb"];
  let h = 0;
  for (const ch of t) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return pool[h % pool.length];
}
