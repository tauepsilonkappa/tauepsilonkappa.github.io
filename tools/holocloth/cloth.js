// Verlet cloth in zero gravity. No forces except the user's grab; heavy
// damping makes it settle like fabric suspended in gel.
// Ported from holocloth (MIT, Dmitry Kurash). No three.js dependency.
import { BAKED_POSE } from './bakedPose.js';

const SUBSTEP = 1 / 120;
const MAX_SUBSTEPS = 4;

export class ClothSim {
  constructor(width, height, segX, segY, { flat = false } = {}) {
    this.flat = flat;
    this.width = width;
    this.height = height;
    this.segX = segX;
    this.segY = segY;
    this.cols = segX + 1;
    this.rows = segY + 1;
    this.count = this.cols * this.rows;
    this.positions = new Float32Array(this.count * 3);
    this.prev = new Float32Array(this.count * 3);
    this.rest = new Float32Array(this.count * 3);
    this.grab = null;
    this.accumulator = 0;
    this.cavityScratch = null;

    this.initPositions();

    // constraints: structural (1.0), shear (0.85), bend (0.35)
    const a = [], b = [], mul = [];
    const idx = (x, y) => y * this.cols + x;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (x + 1 < this.cols) { a.push(idx(x, y)); b.push(idx(x + 1, y)); mul.push(1.0); }
        if (y + 1 < this.rows) { a.push(idx(x, y)); b.push(idx(x, y + 1)); mul.push(1.0); }
        if (x + 1 < this.cols && y + 1 < this.rows) {
          a.push(idx(x, y)); b.push(idx(x + 1, y + 1)); mul.push(0.85);
          a.push(idx(x + 1, y)); b.push(idx(x, y + 1)); mul.push(0.85);
        }
        if (x + 2 < this.cols) { a.push(idx(x, y)); b.push(idx(x + 2, y)); mul.push(0.35); }
        if (y + 2 < this.rows) { a.push(idx(x, y)); b.push(idx(x, y + 2)); mul.push(0.35); }
      }
    }
    this.cA = new Int32Array(a);
    this.cB = new Int32Array(b);
    this.cMul = new Float32Array(mul);
    this.cRest = new Float32Array(a.length);
    this.computeRestLengths();

    // 4-neighbourhood for laplacian smoothing, -1 padded
    this.neighbors = new Int32Array(this.count * 4).fill(-1);
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const i = idx(x, y) * 4;
        this.neighbors[i] = x > 0 ? idx(x - 1, y) : -1;
        this.neighbors[i + 1] = x + 1 < this.cols ? idx(x + 1, y) : -1;
        this.neighbors[i + 2] = y > 0 ? idx(x, y - 1) : -1;
        this.neighbors[i + 3] = y + 1 < this.rows ? idx(x, y + 1) : -1;
      }
    }
  }

  // Initial pose: the hand-arranged drape in BAKED_POSE, sampled bilinearly
  // onto this grid and scaled to this cloth's dimensions.
  initPositions() {
    if (this.flat) {
      // flat sheet facing the camera with a faint ripple, centred like the baked pose
      let k = 0;
      for (let y = 0; y < this.rows; y++) for (let x = 0; x < this.cols; x++) {
        const u = x / this.segX, v = y / this.segY;
        this.positions[k] = (u - .5) * this.width + .5;
        this.positions[k + 1] = (.5 - v) * this.height;
        this.positions[k + 2] = Math.sin(u * 9) * Math.cos(v * 7) * .03;
        k += 3;
      }
      this.prev.set(this.positions); this.rest.set(this.positions);
      return;
    }
    const bp = BAKED_POSE;
    const bc = bp.cols, br = bp.rows;
    const sx = this.width / bp.width;
    const sy = this.height / bp.height;
    const sz = (sx + sy) / 2;
    let k = 0;
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const gu = (x / this.segX) * (bc - 1);
        const gv = (y / this.segY) * (br - 1);
        const x0 = Math.min(bc - 2, Math.floor(gu));
        const y0 = Math.min(br - 2, Math.floor(gv));
        const fx = gu - x0, fy = gv - y0;
        for (let c = 0; c < 3; c++) {
          const i00 = (y0 * bc + x0) * 3 + c;
          const i10 = (y0 * bc + x0 + 1) * 3 + c;
          const i01 = ((y0 + 1) * bc + x0) * 3 + c;
          const i11 = ((y0 + 1) * bc + x0 + 1) * 3 + c;
          const v0 = bp.data[i00] * (1 - fx) + bp.data[i10] * fx;
          const v1 = bp.data[i01] * (1 - fx) + bp.data[i11] * fx;
          const s = c === 0 ? sx : c === 1 ? sy : sz;
          this.positions[k + c] = (v0 * (1 - fy) + v1 * fy) * s;
        }
        k += 3;
      }
    }
    this.prev.set(this.positions);
    this.rest.set(this.positions);
  }

  // Rest lengths come from the flat grid, so the cloth relaxes toward its
  // true rectangle rather than the drape.
  computeRestLengths() {
    const stepX = this.width / this.segX;
    const stepY = this.height / this.segY;
    for (let c = 0; c < this.cA.length; c++) {
      const ia = this.cA[c], ib = this.cB[c];
      const dx = ((ia % this.cols) - (ib % this.cols)) * stepX;
      const dy = (Math.floor(ia / this.cols) - Math.floor(ib / this.cols)) * stepY;
      this.cRest[c] = Math.hypot(dx, dy);
    }
  }

  reset() {
    this.initPositions();
    this.grab = null;
  }

  // Random gentle impulse from nowhere.
  poke(strength = 0.5) {
    const p = this.positions;
    const ci = Math.floor(Math.random() * this.count);
    const cx = p[ci * 3], cy = p[ci * 3 + 1], cz = p[ci * 3 + 2];
    let dx0 = Math.random() - 0.5, dy0 = Math.random() - 0.5, dz0 = Math.random() - 0.5;
    const len = Math.hypot(dx0, dy0, dz0) || 1;
    const k = (strength * 0.09) / len;
    dx0 *= k; dy0 *= k; dz0 *= k;
    const radius = Math.max(this.width, this.height) * 0.28;
    for (let i = 0; i < this.count; i++) {
      const dx = p[i * 3] - cx, dy = p[i * 3 + 1] - cy, dz = p[i * 3 + 2] - cz;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (d > radius) continue;
      const w = 1 - d / radius;
      const s = w * w * (3 - 2 * w);
      this.prev[i * 3] -= dx0 * s;
      this.prev[i * 3 + 1] -= dy0 * s;
      this.prev[i * 3 + 2] -= dz0 * s;
    }
  }

  // Begin a grab around a world-space point {x,y,z}. False if nothing near.
  startGrab(point, radius, strength = 1) {
    const p = this.positions;
    const indices = [], weights = [], offsets = [];
    let best = Infinity;
    for (let i = 0; i < this.count; i++) {
      const dx = p[i * 3] - point.x;
      const dy = p[i * 3 + 1] - point.y;
      const dz = p[i * 3 + 2] - point.z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
      best = Math.min(best, d);
      if (d > radius) continue;
      const t = 1 - d / radius;
      indices.push(i);
      weights.push(t * t * (3 - 2 * t) * (strength));
      offsets.push(dx, dy, dz);
    }
    if (indices.length === 0 || best > radius) return false;
    this.grab = {
      indices, weights,
      offsets: new Float32Array(offsets),
      target: { x: point.x, y: point.y, z: point.z },
    };
    return true;
  }

  moveGrab(target) {
    if (this.grab) { this.grab.target.x = target.x; this.grab.target.y = target.y; this.grab.target.z = target.z; }
  }

  endGrab() { this.grab = null; }

  get isGrabbing() { return this.grab !== null; }

  // Per-vertex cavity for ambient occlusion: discrete Laplacian projected on
  // the normal (valleys score > 0), then one smoothing pass. Writes [0,1].
  computeCavity(normals, out, gain = 6) {
    const p = this.positions, nb = this.neighbors, n = this.count;
    const invStep = 1 / Math.min(this.width / this.segX, this.height / this.segY);
    if (!this.cavityScratch || this.cavityScratch.length < n) this.cavityScratch = new Float32Array(n);
    const tmp = this.cavityScratch;
    for (let i = 0; i < n; i++) {
      let ax = 0, ay = 0, az = 0, cnt = 0;
      for (let j = 0; j < 4; j++) {
        const ni = nb[i * 4 + j];
        if (ni < 0) continue;
        ax += p[ni * 3]; ay += p[ni * 3 + 1]; az += p[ni * 3 + 2];
        cnt++;
      }
      if (cnt === 0) { tmp[i] = 0; continue; }
      const inv = 1 / cnt;
      const lx = ax * inv - p[i * 3];
      const ly = ay * inv - p[i * 3 + 1];
      const lz = az * inv - p[i * 3 + 2];
      const c = (lx * normals[i * 3] + ly * normals[i * 3 + 1] + lz * normals[i * 3 + 2]) * invStep;
      tmp[i] = Math.min(1, Math.max(0, c * gain));
    }
    for (let i = 0; i < n; i++) {
      let sum = 0, cnt = 0;
      for (let j = 0; j < 4; j++) {
        const ni = nb[i * 4 + j];
        if (ni < 0) continue;
        sum += tmp[ni];
        cnt++;
      }
      out[i] = cnt > 0 ? tmp[i] * 0.5 + (sum / cnt) * 0.5 : tmp[i];
    }
  }

  step(dt, params) {
    this.accumulator += Math.min(dt, 0.05);
    let steps = 0;
    while (this.accumulator >= SUBSTEP && steps < MAX_SUBSTEPS) {
      this.substep(params);
      this.accumulator -= SUBSTEP;
      steps++;
    }
    if (steps === MAX_SUBSTEPS) this.accumulator = 0;
  }

  substep(params) {
    const p = this.positions, prev = this.prev, n = this.count;

    // integrate; damping is expressed per 60Hz frame, converted to substep rate
    const damp = Math.pow(1 - Math.min(params.viscosity, 0.99), SUBSTEP * 60);
    for (let i = 0; i < n * 3; i++) {
      const cur = p[i];
      const vel = (cur - prev[i]) * damp;
      prev[i] = cur;
      p[i] = cur + vel;
    }

    // settle: ease back toward the rest pose so the sheet returns to readable
    if (params.settle > 0) {
      const s = params.settle, r = this.rest;
      for (let i = 0; i < n * 3; i++) p[i] += (r[i] - p[i]) * s;
    }

    // laplacian smoothing: wrinkles relax back out
    if (params.smoothing > 0) {
      const k = params.smoothing * 0.5, nb = this.neighbors;
      for (let i = 0; i < n; i++) {
        let ax = 0, ay = 0, az = 0, cnt = 0;
        for (let j = 0; j < 4; j++) {
          const ni = nb[i * 4 + j];
          if (ni < 0) continue;
          ax += p[ni * 3]; ay += p[ni * 3 + 1]; az += p[ni * 3 + 2];
          cnt++;
        }
        if (cnt === 0) continue;
        const inv = 1 / cnt;
        p[i * 3] += (ax * inv - p[i * 3]) * k;
        p[i * 3 + 1] += (ay * inv - p[i * 3 + 1]) * k;
        p[i * 3 + 2] += (az * inv - p[i * 3 + 2]) * k;
      }
    }

    // constraint relaxation
    const iters = Math.max(1, Math.round(params.iterations));
    const stiff = params.stiffness;
    const cA = this.cA, cB = this.cB, cRest = this.cRest, cMul = this.cMul, nc = cA.length;
    for (let it = 0; it < iters; it++) {
      for (let c = 0; c < nc; c++) {
        const ia = cA[c] * 3, ib = cB[c] * 3;
        const dx = p[ib] - p[ia], dy = p[ib + 1] - p[ia + 1], dz = p[ib + 2] - p[ia + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 1e-9) continue;
        const diff = ((d - cRest[c]) / d) * 0.5 * stiff * cMul[c];
        const ox = dx * diff, oy = dy * diff, oz = dz * diff;
        p[ia] += ox; p[ia + 1] += oy; p[ia + 2] += oz;
        p[ib] -= ox; p[ib + 1] -= oy; p[ib + 2] -= oz;
      }
      this.applyGrab();
    }
  }

  applyGrab() {
    const g = this.grab;
    if (!g) return;
    const p = this.positions;
    for (let k = 0; k < g.indices.length; k++) {
      const i = g.indices[k] * 3, w = g.weights[k];
      const tx = g.target.x + g.offsets[k * 3];
      const ty = g.target.y + g.offsets[k * 3 + 1];
      const tz = g.target.z + g.offsets[k * 3 + 2];
      p[i] += (tx - p[i]) * w;
      p[i + 1] += (ty - p[i + 1]) * w;
      p[i + 2] += (tz - p[i + 2]) * w;
    }
  }
}
