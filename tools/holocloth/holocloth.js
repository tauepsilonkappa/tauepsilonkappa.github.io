// HoloCloth: a sheet of simulated cloth with a holographic material, any
// image draped on it, grab-to-drag interaction, and PNG export.
// Vanilla ES module, no build step. three.js via import map.
// Ported and reduced from holocloth (MIT, Dmitry Kurash):
// no decals, no depth of field, no version manager.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ClothSim } from './cloth.js';
import { createHoloMaterial } from './holoMaterial.js';
import { makeWeaveNormalMap, normalMapFromImage } from './textures.js';
import { BAKED_POSE } from './bakedPose.js';

const FINISH = {
  Glossy: { roughness: 0.1, clearcoat: 1.0, coatRoughness: 0.08 },
  Satin: { roughness: 0.3, clearcoat: 0.45, coatRoughness: 0.3 },
  Matte: { roughness: 0.62, clearcoat: 0.06, coatRoughness: 0.7 },
};

export const PRESETS = {
  Holo: {
    baseColor: '#20242d', holoIntensity: 3.78, holoScale: 400, bandFreq: 1.1,
    saturation: 1.0, hueShift: 0.37, sparkle: 0.73, specTint: 0.33, iridescence: 0.81,
    metalness: 1.0, sheen: 0, bump: 3.0, bumpTiling: 3, ...FINISH.Matte,
  },
  Chrome: {
    baseColor: '#dfe3e8', holoIntensity: 0, holoScale: 400, bandFreq: 1.1,
    saturation: 1.0, hueShift: 0, sparkle: 0.2, specTint: 0, iridescence: 0,
    metalness: 1, sheen: 0, bump: 0.05, bumpTiling: 3, ...FINISH.Glossy,
    roughness: 0.04, coatRoughness: 0.04,
  },
  'Black Cloth': {
    baseColor: '#101114', holoIntensity: 0.1, holoScale: 8, bandFreq: 0.2,
    saturation: 0, hueShift: 0, sparkle: 0, specTint: 0.82, iridescence: 0,
    metalness: 0.43, sheen: 0.08, bump: 0, bumpTiling: 3, ...FINISH.Satin,
    roughness: 0.83, clearcoat: 0.22, coatRoughness: 0.32,
  },
};

export const DEFAULTS = {
  quality: 'High', // High | Medium | Low
  physics: { viscosity: 0.6, stiffness: 1, iterations: 14, smoothing: 0.045, grabRadius: 0.27, grabStrength: 1, settle: 0 },
  material: { ...PRESETS.Holo },
  image: { opacity: 1, cornerRadius: 0 },
  render: {
    background: '#0b0c12', transparent: false, exposure: 0.5, environment: 0.73,
    bloom: 0.05, bloomThreshold: 1.41, noise: 0.345, toneMapping: 'Neutral',
    occlusion: 1, // 0 disables cavity AO
  },
};

const TONE = { AgX: THREE.AgXToneMapping, ACES: THREE.ACESFilmicToneMapping, Neutral: THREE.NeutralToneMapping };
const CLOTH_LONG_SIDE = 3;
const SURFACE_LONG_SIDE = 2048;
const WHITE = new THREE.Color(0xffffff);

const GrainShader = {
  uniforms: { tDiffuse: { value: null }, uAmount: { value: 0.08 }, uTime: { value: 0 } },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uAmount; uniform float uTime; varying vec2 vUv;
    float gHash(vec3 p3) { p3 = fract(p3 * 0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 p = mod(gl_FragCoord.xy, 1024.0);
      float n = gHash(vec3(p, mod(uTime * 120.0, 512.0))) - 0.5;
      c.rgb += n * uAmount;
      gl_FragColor = c;
    }`,
};

function merge(base, patch) {
  const out = { ...base };
  for (const k in patch) {
    if (patch[k] && typeof patch[k] === 'object' && !Array.isArray(patch[k])) out[k] = merge(base[k] || {}, patch[k]);
    else out[k] = patch[k];
  }
  return out;
}

function loadImage(src) {
  if (src instanceof HTMLImageElement) return src.complete ? Promise.resolve(src) : new Promise((res, rej) => { src.onload = () => res(src); src.onerror = rej; });
  return new Promise((res, rej) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

export class HoloCloth {
  /**
   * @param {HTMLElement} host   sized container; canvas fills it
   * @param {object} [opts]      { image, preset, orbit=true, autoPoke=0 (seconds), ...DEFAULTS overrides }
   */
  constructor(host, opts = {}) {
    this.host = host;
    const { image, preset, orbit = true, autoPoke = 0, zoom = 1, flat = false, ...paramPatch } = opts;
    this.flat = flat;
    this.params = merge(DEFAULTS, paramPatch);
    if (preset) this.params.material = { ...PRESETS[preset] };
    this.autoPoke = autoPoke;
    this.elapsed = 0;
    this.sincePoke = 0;
    this.disposed = false;
    this.grabbing = false;
    this.grabPointerId = null;
    this.hoverCursor = 'default';
    this.raycaster = new THREE.Raycaster();
    this.pointerNdc = new THREE.Vector2();
    this.dragPlane = new THREE.Plane();
    this.clock = new THREE.Clock();
    this.background = new THREE.Color(this.params.render.background);

    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', stencil: false, alpha: true });
    this.renderer.setSize(w, h);
    this.renderer.toneMapping = THREE.AgXToneMapping;
    host.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.touchAction = 'none';

    this.scene = new THREE.Scene();
    this.scene.background = this.background;
    this.camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 200);
    this.camera.position.set(...BAKED_POSE.camera);
    this.camera.zoom = zoom;
    this.camera.updateProjectionMatrix();

    const pmrem = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();

    const rimA = new THREE.DirectionalLight(0x7fd4ff, 1.1); rimA.position.set(-4, 2.5, -3);
    const rimB = new THREE.DirectionalLight(0xff9ad5, 0.9); rimB.position.set(4.5, -1.5, -2.5);
    const key = new THREE.DirectionalLight(0xffffff, 0.7); key.position.set(1.5, 3, 4);
    this.scene.add(rimA, rimB, key);

    // surface canvas: the image lives in UV space so it deforms with the cloth
    this.surfaceCanvas = document.createElement('canvas');
    this.surfaceCanvas.width = this.surfaceCanvas.height = SURFACE_LONG_SIDE;
    this.surfaceTex = new THREE.CanvasTexture(this.surfaceCanvas);
    this.surfaceTex.colorSpace = THREE.SRGBColorSpace;
    this.image = null;

    const holo = createHoloMaterial(this.surfaceTex);
    this.material = holo.material;
    this.uniforms = holo.uniforms;
    const aniso = this.renderer.capabilities.getMaxAnisotropy();
    this.material.roughnessMap.anisotropy = aniso;
    this.surfaceTex.anisotropy = aniso;
    this.material.normalMap = makeWeaveNormalMap();
    this.material.normalMap.anisotropy = aniso;

    this.mesh = new THREE.Mesh(undefined, this.material);
    this.mesh.frustumCulled = false;
    this.scene.add(this.mesh);
    this.clothAspect = 1;
    this.segments = 48;
    this.buildCloth(1);

    const canvas = this.renderer.domElement;
    canvas.addEventListener('pointerdown', this.onPointerDown);
    canvas.addEventListener('pointermove', this.onPointerMove);
    canvas.addEventListener('pointerup', this.onPointerUp);
    canvas.addEventListener('pointercancel', this.onPointerUp);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.minDistance = 1.6;
    this.controls.maxDistance = 30;
    this.controls.target.set(...BAKED_POSE.target);
    this.controls.enabled = orbit;
    this.controls.update();

    const rt = new THREE.WebGLRenderTarget(w, h, { samples: 8, type: THREE.HalfFloatType });
    this.composer = new EffectComposer(this.renderer, rt);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(w, h), 0.18, 0.85, 1.0);
    this.composer.addPass(this.bloomPass);
    this.composer.addPass(new OutputPass());
    this.grainPass = new ShaderPass(GrainShader);
    this.composer.addPass(this.grainPass);

    this.applyQuality(this.params.quality);
    this.applyParams();

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(host);
    this.renderer.setAnimationLoop(this.tick);

    if (image) this.setImage(image);
  }

  // ---- public API -------------------------------------------------------

  /** Drape an image (URL or HTMLImageElement) over the cloth. Cloth adopts its aspect. */
  async setImage(src) {
    const img = await loadImage(src);
    if (this.disposed) return;
    this.image = img;
    const aspect = Math.min(3, Math.max(1 / 3, (img.naturalWidth || 1) / (img.naturalHeight || 1)));
    this.redrawSurface(aspect);
    this.buildCloth(aspect);
  }

  clearImage() {
    this.image = null;
    this.redrawSurface(1);
    this.buildCloth(1);
  }

  /** Any grayscale image becomes the bump map; null restores the woven default. */
  async setBumpMap(src) {
    const old = this.material.normalMap;
    const tex = src ? normalMapFromImage(await loadImage(src)) : makeWeaveNormalMap();
    tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    tex.repeat.set(this.params.material.bumpTiling, this.params.material.bumpTiling);
    this.material.normalMap = tex;
    if (old) old.dispose();
  }

  setPreset(name) {
    if (!PRESETS[name]) throw new Error(`unknown preset: ${name}`);
    this.params.material = { ...PRESETS[name] };
    this.applyParams();
  }

  /** Deep-merge a partial params object (same shape as DEFAULTS) and apply. */
  set(patch) {
    const prevQ = this.params.quality;
    this.params = merge(this.params, patch);
    if (this.params.quality !== prevQ) this.applyQuality(this.params.quality);
    this.applyParams();
  }

  reset() {
    this.sim.reset();
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();
  }

  poke(strength = 1) { this.sim.poke(strength); }

  /** Render one frame at high resolution; returns a PNG data URL. */
  exportPNG({ transparent = this.params.render.transparent, maxSide = 3200 } = {}) {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    const normalPR = this.pixelRatio;
    const exportPR = Math.min(4, Math.max(2, maxSide / Math.max(w, h)));
    this.setTransparent(transparent);
    this.renderer.setPixelRatio(exportPR);
    this.composer.setPixelRatio(exportPR);
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    this.composer.render();
    const url = this.renderer.domElement.toDataURL('image/png');
    this.setTransparent(this.params.render.transparent);
    this.renderer.setPixelRatio(normalPR);
    this.composer.setPixelRatio(normalPR);
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
    return url;
  }

  dispose() {
    this.disposed = true;
    this.renderer.setAnimationLoop(null);
    this.resizeObserver.disconnect();
    const c = this.renderer.domElement;
    c.removeEventListener('pointerdown', this.onPointerDown);
    c.removeEventListener('pointermove', this.onPointerMove);
    c.removeEventListener('pointerup', this.onPointerUp);
    c.removeEventListener('pointercancel', this.onPointerUp);
    this.controls.dispose();
    this.composer.dispose();
    this.geometry.dispose();
    this.material.dispose();
    this.surfaceTex.dispose();
    this.renderer.dispose();
    c.remove();
  }

  // ---- internals --------------------------------------------------------

  redrawSurface(aspect) {
    const L = SURFACE_LONG_SIDE;
    const w = aspect >= 1 ? L : Math.round(L * aspect);
    const h = aspect >= 1 ? Math.round(L / aspect) : L;
    if (this.surfaceCanvas.width !== w || this.surfaceCanvas.height !== h) {
      this.surfaceCanvas.width = w;
      this.surfaceCanvas.height = h;
      this.surfaceTex.dispose();
      this.surfaceTex = new THREE.CanvasTexture(this.surfaceCanvas);
      this.surfaceTex.colorSpace = THREE.SRGBColorSpace;
      this.surfaceTex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      this.uniforms.uSurfaceMap.value = this.surfaceTex;
    }
    const ctx = this.surfaceCanvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    if (this.image) ctx.drawImage(this.image, 0, 0, w, h);
    this.surfaceTex.needsUpdate = true;
  }

  buildCloth(aspect) {
    this.clothAspect = aspect;
    const w = aspect >= 1 ? CLOTH_LONG_SIDE : CLOTH_LONG_SIDE * aspect;
    const h = aspect >= 1 ? CLOTH_LONG_SIDE / aspect : CLOTH_LONG_SIDE;
    const segs = this.segments;
    const segX = aspect >= 1 ? segs : Math.max(10, Math.round(segs * aspect));
    const segY = aspect >= 1 ? Math.max(10, Math.round(segs / aspect)) : segs;
    this.sim = new ClothSim(w, h, segX, segY, { flat: this.flat });
    const geo = new THREE.PlaneGeometry(w, h, segX, segY);
    const pos = new THREE.BufferAttribute(this.sim.positions, 3);
    pos.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('position', pos);
    this.cavityAttr = new THREE.BufferAttribute(new Float32Array(this.sim.count), 1);
    this.cavityAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute('aCavity', this.cavityAttr);
    geo.computeVertexNormals();
    const old = this.mesh.geometry;
    this.mesh.geometry = geo;
    this.geometry = geo;
    if (old) old.dispose();
    this.uniforms.uClothSize.value.set(w, h);
    this.endGrab();
  }

  applyQuality(q) {
    const dpr = window.devicePixelRatio || 1;
    this.pixelRatio = q === 'Low' ? 1 : q === 'Medium' ? Math.min(dpr, 1.5) : Math.min(dpr, 2);
    const samples = q === 'Low' ? 0 : q === 'Medium' ? 4 : 8;
    const segs = q === 'Low' ? 28 : q === 'Medium' ? 36 : 48;
    const w = this.host.clientWidth || 1, h = this.host.clientHeight || 1;
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setSize(w, h);
    this.composer.setPixelRatio(this.pixelRatio);
    this.composer.renderTarget1.samples = samples;
    this.composer.renderTarget2.samples = samples;
    this.composer.renderTarget1.dispose();
    this.composer.renderTarget2.dispose();
    this.composer.setSize(w, h);
    if (segs !== this.segments) { this.segments = segs; this.buildCloth(this.clothAspect); }
  }

  applyParams() {
    const p = this.params, m = this.material, u = this.uniforms;
    m.color.set(p.material.baseColor);
    m.roughness = p.material.roughness;
    m.metalness = p.material.metalness;
    m.clearcoat = p.material.clearcoat;
    m.clearcoatRoughness = p.material.coatRoughness;
    m.sheen = p.material.sheen;
    m.sheenColor.set(p.material.baseColor).lerp(WHITE, 0.5);
    m.iridescence = p.material.iridescence;
    m.normalScale.set(p.material.bump, p.material.bump);
    if (m.normalMap) m.normalMap.repeat.set(p.material.bumpTiling, p.material.bumpTiling);
    this.scene.environmentIntensity = p.render.environment;
    u.uHoloIntensity.value = p.material.holoIntensity;
    u.uHoloScale.value = p.material.holoScale;
    u.uBandFreq.value = p.material.bandFreq;
    u.uSaturation.value = p.material.saturation;
    u.uHueShift.value = p.material.hueShift;
    u.uSparkle.value = p.material.sparkle;
    u.uSpecTint.value = p.material.specTint;
    u.uSurfaceOpacity.value = p.image.opacity;
    u.uCornerRound.value = p.image.cornerRadius;
    u.uCavityAmount.value = p.render.occlusion;
    this.background.set(p.render.background);
    this.setTransparent(p.render.transparent);
    this.renderer.toneMappingExposure = p.render.exposure;
    const tm = TONE[p.render.toneMapping] ?? THREE.AgXToneMapping;
    if (this.renderer.toneMapping !== tm) this.renderer.toneMapping = tm;
    this.bloomPass.strength = p.render.bloom;
    this.bloomPass.threshold = p.render.bloomThreshold;
    this.grainPass.uniforms.uAmount.value = p.render.noise;
  }

  setTransparent(on) {
    this.scene.background = on ? null : this.background;
    this.renderer.setClearColor(0x000000, on ? 0 : 1);
  }

  updatePointer(e) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.pointerNdc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  }

  raycastCloth() {
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    this.geometry.computeBoundingSphere();
    const hits = this.raycaster.intersectObject(this.mesh, false);
    return hits.length ? hits[0] : null;
  }

  onPointerDown = (e) => {
    if (e.button !== 0 || this.grabbing) return;
    this.updatePointer(e);
    const hit = this.raycastCloth();
    if (!hit || !this.sim.startGrab(hit.point, this.params.physics.grabRadius, this.params.physics.grabStrength)) return;
    this.grabbing = true;
    this.grabPointerId = e.pointerId;
    this.orbitWasEnabled = this.controls.enabled;
    this.controls.enabled = false;
    const n = new THREE.Vector3();
    this.camera.getWorldDirection(n);
    this.dragPlane.setFromNormalAndCoplanarPoint(n, hit.point);
    this.renderer.domElement.setPointerCapture(e.pointerId);
    this.renderer.domElement.style.cursor = 'grabbing';
  };

  onPointerMove = (e) => {
    if (this.grabbing && e.pointerId !== this.grabPointerId) return;
    this.updatePointer(e);
    if (!this.grabbing) return;
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    const t = new THREE.Vector3();
    if (this.raycaster.ray.intersectPlane(this.dragPlane, t)) this.sim.moveGrab(t);
  };

  onPointerUp = (e) => {
    if (!this.grabbing || e.pointerId !== this.grabPointerId) return;
    this.endGrab();
    if (this.renderer.domElement.hasPointerCapture(e.pointerId)) this.renderer.domElement.releasePointerCapture(e.pointerId);
    this.renderer.domElement.style.cursor = this.hoverCursor;
  };

  endGrab() {
    this.grabbing = false;
    this.grabPointerId = null;
    this.sim.endGrab();
    if (this.controls && this.orbitWasEnabled !== undefined) this.controls.enabled = this.orbitWasEnabled;
  }

  onResize() {
    const w = this.host.clientWidth, h = this.host.clientHeight;
    if (!w || !h) return;
    this.camera.aspect = w / h;
    // portrait hosts: open the FOV so the whole drape stays in frame
    this.camera.fov = w < h ? Math.min(70, 38 * (h / w)) : 38;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.composer.setSize(w, h);
  }

  tick = () => {
    if (this.disposed) return;
    const dt = this.clock.getDelta();
    this.elapsed += dt;
    this.grainPass.uniforms.uTime.value = this.elapsed % 61.7;

    if (this.autoPoke > 0 && !this.grabbing) {
      this.sincePoke += dt;
      if (this.sincePoke > this.autoPoke) { this.sincePoke = 0; this.sim.poke(0.6); }
    }

    this.sim.step(dt, this.params.physics);
    this.geometry.attributes.position.needsUpdate = true;
    this.geometry.computeVertexNormals();

    if (this.params.render.occlusion > 0) {
      this.sim.computeCavity(this.geometry.attributes.normal.array, this.cavityAttr.array);
      this.cavityAttr.needsUpdate = true;
    }

    if (!this.grabbing && this.params.quality !== 'Low') {
      const cursor = this.raycastCloth() ? 'grab' : 'default';
      if (cursor !== this.hoverCursor) { this.hoverCursor = cursor; this.renderer.domElement.style.cursor = cursor; }
    }

    this.controls.update();
    this.composer.render();
  };
}
