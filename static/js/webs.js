// Web threads and corner webs with verlet physics. Vanilla, no deps.
// Ropes: anchored at two DOM points, sag under gravity, sway with pointer and scroll.
// Corner webs: radial + spiral silk; threads deflect near the cursor and settle.
export function ropeCanvas(host, ropes, opts = {}) {
  const c = document.createElement('canvas');
  c.className = 'ropes'; c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  host.appendChild(c);
  const ctx = c.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = opts.points || 22, ITER = opts.iter || 10, GRAV = opts.gravity ?? .18, DAMP = opts.damp ?? .965, PUSH_R = opts.pushRadius ?? 46, PUSH_F = opts.pushForce ?? .55, SCROLL_K = opts.scrollK ?? .02;
  let W = 0, H = 0, dpr = 1, px = -1e4, py = -1e4, lastScroll = scrollY, vScroll = 0;
  const sims = ropes.map(r => ({ ...r, pts: null, prev: null, segLen: 0 }));
  const pt = (sel, ax, ay) => { const el = host.querySelector(sel); if (!el) return null; const r = el.getBoundingClientRect(), h = host.getBoundingClientRect(); return [r.left - h.left + r.width * ax, r.top - h.top + r.height * ay]; };
  // endpoints follow their anchors every frame (parallax / pointer drift move them)
  function resize() {
    const r = host.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2);
    W = r.width; H = r.height; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    sims.forEach(s => {
      const a = pt(s.from, s.fx ?? .5, s.fy ?? .5), b = pt(s.to, s.tx ?? .5, s.ty ?? .5);
      if (!a || !b) { s.pts = null; return; }
      s.a = a; s.b = b;
      const len = Math.hypot(b[0] - a[0], b[1] - a[1]) * (s.slack ?? 1.12);
      s.segLen = len / (N - 1);
      s.pts = Array.from({ length: N }, (_, i) => [a[0] + (b[0] - a[0]) * i / (N - 1), a[1] + (b[1] - a[1]) * i / (N - 1) + Math.sin(i / (N - 1) * Math.PI) * len * .12]);
      s.prev = s.pts.map(p => [...p]);
    });
  }
  function step() {
    vScroll = (scrollY - lastScroll) * SCROLL_K; lastScroll = scrollY;
    sims.forEach(s => {
      if (!s.pts) return;
      const a = pt(s.from, s.fx ?? .5, s.fy ?? .5), b = pt(s.to, s.tx ?? .5, s.ty ?? .5);
      if (a && b) { s.a = a; s.b = b; }
      const p = s.pts, q = s.prev;
      for (let i = 1; i < N - 1; i++) {
        const [x, y] = p[i], vx = (x - q[i][0]) * DAMP, vy = (y - q[i][1]) * DAMP;
        q[i] = [x, y];
        let nx = x + vx, ny = y + vy + GRAV - vScroll;
        const dx = x - px, dy = y - py, d = Math.hypot(dx, dy);
        if (d < PUSH_R) { const f = (PUSH_R - d) / PUSH_R * PUSH_F; nx += dx / d * f; ny += dy / d * f; }
        p[i] = [nx, ny];
      }
      for (let k = 0; k < ITER; k++) {
        p[0] = [...s.a]; p[N - 1] = [...s.b];
        for (let i = 0; i < N - 1; i++) {
          const [ax, ay] = p[i], [bx, by] = p[i + 1]; const dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1e-6;
          const diff = (d - s.segLen) / d * .5, ox = dx * diff, oy = dy * diff;
          if (i > 0) { p[i][0] += ox; p[i][1] += oy; }
          if (i + 1 < N - 1) { p[i + 1][0] -= ox; p[i + 1][1] -= oy; }
        }
      }
    });
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    sims.forEach(s => {
      if (!s.pts) return;
      ctx.beginPath(); ctx.moveTo(s.pts[0][0], s.pts[0][1]);
      for (let i = 1; i < N - 1; i++) { const [x0, y0] = s.pts[i], [x1, y1] = s.pts[i + 1]; ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2); }
      ctx.lineTo(s.pts[N - 1][0], s.pts[N - 1][1]);
      ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 3.2; ctx.stroke();
      ctx.strokeStyle = s.color || '#1b1f3a'; ctx.lineWidth = 1.6; ctx.stroke();
      ctx.beginPath(); ctx.arc(s.pts[N - 1][0], s.pts[N - 1][1], 3.2, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill(); ctx.lineWidth = 1.2; ctx.strokeStyle = s.color || '#1b1f3a'; ctx.stroke();
    });
    if (!reduce) requestAnimationFrame(step); 
  }
  host.addEventListener('pointermove', e => { const r = host.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; });
  host.addEventListener('pointerleave', () => { px = py = -1e4; });
  new ResizeObserver(resize).observe(host);
  resize(); step(); if (reduce) step();
  return { resize };
}

export function cornerWeb(host, opts = {}) {
  const c = document.createElement('canvas');
  c.className = 'web'; c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none';
  host.appendChild(c);
  const ctx = c.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const corner = opts.corner || 'tr', spokes = opts.spokes || 11, rings = opts.rings || 7, R = opts.radius || 360;
  const color = opts.color || 'rgba(27,31,58,.55)';
  let W = 0, H = 0, dpr = 1, ox = 0, oy = 0, sx = 1, sy = 1, px = -1e4, py = -1e4, t0 = 0;
  // nodes: ring r, spoke i → rest position; each node has offset + velocity for the deflection
  const nodes = [];
  for (let r = 1; r <= rings; r++) for (let i = 0; i < spokes; i++) nodes.push({ r, i, dx: 0, dy: 0, vx: 0, vy: 0 });
  const rad = r => R * Math.pow(r / rings, 1.25);
  const ang = i => (Math.PI / 2) * i / (spokes - 1);
  function rest(n) { const a = ang(n.i); return [ox + Math.cos(a) * rad(n.r) * sx, oy + Math.sin(a) * rad(n.r) * sy]; }
  function resize() {
    const b = host.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2);
    W = b.width; H = b.height; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ox = corner.includes('r') ? W : 0; oy = corner.includes('b') ? H : 0;
    sx = corner.includes('r') ? -1 : 1; sy = corner.includes('b') ? -1 : 1;
  }
  function draw(t) {
    t0 = t / 1000;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = color; ctx.lineWidth = 1.1; ctx.lineCap = 'round';
    // physics: spring back + cursor push + slow breathing
    for (const n of nodes) {
      const [rx, ry] = rest(n);
      const x = rx + n.dx, y = ry + n.dy;
      const ddx = x - px, ddy = y - py, d = Math.hypot(ddx, ddy);
      if (d < 60) { const f = (60 - d) / 60 * .7; n.vx += ddx / d * f; n.vy += ddy / d * f; }
      n.vx += -n.dx * .06; n.vy += -n.dy * .06; n.vx *= .9; n.vy *= .9;
      n.dx += n.vx; n.dy += n.vy;
      const br = Math.sin(t0 * .7 + n.r * .8 + n.i * .3) * .6 * (n.r / rings);
      n.bx = br; n.by = br * .6;
    }
    const pos = n => { const [rx, ry] = rest(n); return [rx + n.dx + n.bx, ry + n.dy + n.by]; };
    const byRI = (r, i) => nodes[(r - 1) * spokes + i];
    // spokes
    for (let i = 0; i < spokes; i++) {
      ctx.beginPath(); ctx.moveTo(ox, oy);
      for (let r = 1; r <= rings; r++) { const [x, y] = pos(byRI(r, i)); ctx.lineTo(x, y); }
      ctx.stroke();
    }
    // rings, sagging between spokes
    for (let r = 1; r <= rings; r++) {
      ctx.beginPath();
      for (let i = 0; i < spokes - 1; i++) {
        const [x0, y0] = pos(byRI(r, i)), [x1, y1] = pos(byRI(r, i + 1));
        const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, sag = .1;
        const cx = ox + (mx - ox) * (1 - sag), cy = oy + (my - oy) * (1 - sag);
        if (i === 0) ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cx, cy, x1, y1);
      }
      ctx.stroke();
    }
    if (!reduce) requestAnimationFrame(draw);
  }
  host.addEventListener('pointermove', e => { const r = host.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; });
  host.addEventListener('pointerleave', () => { px = py = -1e4; });
  new ResizeObserver(resize).observe(host);
  resize(); requestAnimationFrame(draw);
}
