"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export type NeonTideOrigin =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface NeonTideProps {
  /** Primary wave color */
  colorA?: string;
  /** Secondary wave color. Omit for a single-color look (defaults to colorA). */
  colorB?: string;
  /** Background and fog color */
  bgColor?: string;
  /** Corner the waves flow from — they always travel toward the opposite corner */
  origin?: NeonTideOrigin;
  /** Animation speed multiplier */
  speed?: number;
  /** Wave height (world units) */
  amplitude?: number;
  /** Spatial frequency / density of the waves */
  frequency?: number;
  /** Fresnel rim-light glow intensity */
  glow?: number;
  /** Specular highlight intensity */
  gloss?: number;
  /** Surface width along the X axis in world units */
  planeWidth?: number;
  /** Surface depth along the Z axis in world units — how far the waves recede */
  planeDepth?: number;
  /** Camera height above the surface origin */
  cameraHeight?: number;
  /** Camera distance multiplier (relative to cameraHeight) — higher is flatter/more cinematic */
  cameraTilt?: number;
  /** Surface subdivision count on each axis */
  gridSegments?: number;
  /** Exponential fog that fades the surface edges into bgColor */
  fog?: boolean;
  /** Overall opacity (0–100) */
  opacity?: number;
  /** Enable cursor-reactive ripple + highlight */
  hoverEffect?: boolean;
  /** Radius of the cursor ripple in world units */
  hoverRadius?: number;
  /** Peak height added by the cursor ripple */
  hoverStrength?: number;
  className?: string;
}

/** Unit direction (x, z) pointing from `origin` toward the opposite corner */
function directionFromOrigin(origin: NeonTideOrigin): [number, number] {
  const x = origin.includes("right") ? 1 : -1;
  const z = origin.includes("bottom") ? 1 : -1;
  const inv = 1 / Math.SQRT2;
  return [-x * inv, -z * inv];
}

export function NeonTide({
  colorA = "#00f3ff",
  colorB,
  bgColor = "#020408",
  origin = "top-right",
  speed = 0.5,
  amplitude = 1.2,
  frequency = 0.55,
  glow = 0.9,
  gloss = 0.6,
  planeWidth = 34,
  planeDepth = 34,
  cameraHeight = 11,
  cameraTilt = 1.6,
  gridSegments = 120,
  fog = true,
  opacity = 100,
  hoverEffect = true,
  hoverRadius = 4,
  hoverStrength = 1.4,
  className,
}: NeonTideProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Refs for values that change often — no remount, just read in render loop
  const liveRef = useRef({
    colorA,
    colorB,
    bgColor,
    origin,
    speed,
    amplitude,
    frequency,
    glow,
    gloss,
    opacity,
    hoverEffect,
    hoverRadius,
    hoverStrength,
  });

  useEffect(() => {
    liveRef.current = {
      colorA,
      colorB,
      bgColor,
      origin,
      speed,
      amplitude,
      frequency,
      glow,
      gloss,
      opacity,
      hoverEffect,
      hoverRadius,
      hoverStrength,
    };
  }, [
    colorA,
    colorB,
    bgColor,
    origin,
    speed,
    amplitude,
    frequency,
    glow,
    gloss,
    opacity,
    hoverEffect,
    hoverRadius,
    hoverStrength,
  ]);

  // Normalised cursor position (0–1 range; -2 = off-screen / inactive)
  const cursorRef = useRef({ nx: -2, ny: -2 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorRef.current = {
      nx: (e.clientX - rect.left) / rect.width,
      ny: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    cursorRef.current = { nx: -2, ny: -2 };
  }, []);

  // Remount only when structural props change
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const W = mount.clientWidth || 800;
    const H = mount.clientHeight || 600;
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    // Canvas must not capture pointer events — the wrapper div handles them
    renderer.domElement.style.pointerEvents = "none";

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const cachedBgColor = new THREE.Color(liveRef.current.bgColor);
    renderer.setClearColor(cachedBgColor, 1);

    if (fog) {
      scene.fog = new THREE.FogExp2(cachedBgColor.clone(), 0.04);
    }

    // ── Camera ────────────────────────────────────────────────────────────
    const cameraZ = cameraHeight * cameraTilt;
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000);
    camera.position.set(0, cameraHeight, cameraZ);
    camera.lookAt(0, 0, 0);

    // ── Surface geometry ────────────────────────────────────────────────────
    const segs = Math.max(8, Math.min(gridSegments, 220));
    const geo = new THREE.PlaneGeometry(planeWidth, planeDepth, segs, segs);
    // Bake the XZ-flat orientation into vertex positions so the vertex shader
    // can read position.x / position.z directly as world XZ coordinates.
    geo.rotateX(-Math.PI / 2);

    const [dx, dz] = directionFromOrigin(liveRef.current.origin);

    // ── Shader material — all wave displacement + lighting runs on the GPU ─
    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform float uAmplitude;
      uniform float uFrequency;
      uniform vec2  uDirection;
      uniform vec2  uPerp;
      uniform float uHoverActive;
      uniform vec2  uHoverWorld;
      uniform float uHoverRadius;
      uniform float uHoverStrength;

      varying float vHeightNorm;
      varying vec3  vNormal;
      varying vec3  vViewPosition;

      #include <fog_pars_vertex>

      // Traveling waves along an arbitrary direction, plus a slower cross-swell.
      // Returns height and writes the analytic (dHeight/dx, dHeight/dz) gradient.
      float waveHeight(vec2 xz, out vec2 grad) {
        float d1 = dot(xz, uDirection);
        float d2 = dot(xz, uPerp);

        float f2 = uFrequency * 1.9;
        float f3 = uFrequency * 0.55;

        float p1 = d1 * uFrequency - uTime;
        float p2 = (d1 * 0.6 + d2 * 0.35) * f2 - uTime * 1.6;
        float p3 = d2 * f3 - uTime * 0.5;

        float c1 = uAmplitude * cos(p1) * uFrequency;
        float c2 = uAmplitude * 0.45 * cos(p2) * f2;
        float c3 = uAmplitude * 0.3 * cos(p3) * f3;

        float gd1 = c1 + c2 * 0.6;
        float gd2 = c2 * 0.35 + c3;
        grad = uDirection * gd1 + uPerp * gd2;

        return uAmplitude * sin(p1)
             + uAmplitude * 0.45 * sin(p2)
             + uAmplitude * 0.3 * sin(p3);
      }

      void main() {
        vec2 xz = position.xz;
        vec2 grad;
        float h = waveHeight(xz, grad);

        if (uHoverActive > 0.5) {
          vec2 d = xz - uHoverWorld;
          float r2 = max(uHoverRadius * uHoverRadius, 0.0001);
          float falloff = exp(-dot(d, d) / r2);
          float bump = uHoverStrength * falloff;
          h += bump;
          grad += (-2.0 / r2) * d * bump;
        }

        vec3 pos = position;
        pos.y = h;

        vNormal = normalize(vec3(-grad.x, 1.0, -grad.y));
        vHeightNorm = clamp(h / (uAmplitude * 3.5 + 0.001) * 0.5 + 0.5, 0.0, 1.0);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;

        #include <fog_vertex>
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform vec3  uColorA;
      uniform vec3  uColorB;
      uniform float uOpacity;
      uniform float uGlow;
      uniform float uGloss;

      varying float vHeightNorm;
      varying vec3  vNormal;
      varying vec3  vViewPosition;

      #include <fog_pars_fragment>

      void main() {
        vec3 N = normalize(vNormal);
        vec3 V = normalize(vViewPosition);
        vec3 L = normalize(vec3(0.35, 0.8, 0.45));

        float diff = max(dot(N, L), 0.0);
        vec3 H = normalize(L + V);
        float spec = pow(max(dot(N, H), 0.0), 48.0) * uGloss;
        float fresnel = pow(1.0 - clamp(dot(N, V), 0.0, 1.0), 2.4) * uGlow;

        vec3 base = mix(uColorA, uColorB, vHeightNorm);
        // Keep the shaded albedo below the clip ceiling so crests/fresnel/spec
        // highlights remain visible instead of blowing every channel to white.
        float shade = 0.22 + 0.55 * diff;
        vec3 color = base * shade + base * fresnel * 0.55 + vec3(spec) * 0.6;

        gl_FragColor = vec4(color, uOpacity);

        #include <fog_fragment>
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        // Three.js populates fogColor / fogDensity from scene.fog each frame
        ...THREE.UniformsLib.fog,
        uTime: { value: 0 },
        uAmplitude: { value: liveRef.current.amplitude },
        uFrequency: { value: liveRef.current.frequency },
        uDirection: { value: new THREE.Vector2(dx, dz) },
        uPerp: { value: new THREE.Vector2(-dz, dx) },
        uHoverActive: { value: 0.0 },
        uHoverWorld: { value: new THREE.Vector2(0, 0) },
        uHoverRadius: { value: liveRef.current.hoverRadius },
        uHoverStrength: { value: liveRef.current.hoverStrength },
        uColorA: { value: new THREE.Color(liveRef.current.colorA) },
        uColorB: {
          value: new THREE.Color(
            liveRef.current.colorB || liveRef.current.colorA,
          ),
        },
        uOpacity: { value: liveRef.current.opacity / 100 },
        uGlow: { value: liveRef.current.glow },
        uGloss: { value: liveRef.current.gloss },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      fog: true,
      side: THREE.FrontSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Surface is shifted toward the origin corner and tilted so that corner
    // rises toward camera while the destination corner dips into the depth.
    const originShiftX = planeWidth * 0.16;
    const originShiftZ = planeDepth * 0.16;
    const tiltAngle = THREE.MathUtils.degToRad(11);
    const perpAxis = new THREE.Vector3();

    // ── Raycasting helpers ─────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster();
    const horizontalPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();
    const ndc = new THREE.Vector2();
    const dirVec = new THREE.Vector2();
    const perpVec = new THREE.Vector2();

    // ── Animation loop ─────────────────────────────────────────────────────
    let animId: number;
    const t0 = performance.now();

    const tick = () => {
      animId = requestAnimationFrame(tick);

      const live = liveRef.current;
      const elapsed = ((performance.now() - t0) / 1000) * live.speed;

      const [ddx, ddz] = directionFromOrigin(live.origin);
      dirVec.set(ddx, ddz);
      perpVec.set(-ddz, ddx);

      // Shift the surface toward the origin corner and tilt it so that corner
      // rises toward the camera while the destination corner dips away.
      mesh.position.set(-ddx * originShiftX, 0, -ddz * originShiftZ);
      perpAxis.set(perpVec.x, 0, perpVec.y);
      mesh.setRotationFromAxisAngle(perpAxis, -tiltAngle);
      mesh.updateMatrixWorld();

      mat.uniforms.uTime.value = elapsed;
      mat.uniforms.uAmplitude.value = live.amplitude;
      mat.uniforms.uFrequency.value = live.frequency;
      mat.uniforms.uDirection.value.copy(dirVec);
      mat.uniforms.uPerp.value.copy(perpVec);
      mat.uniforms.uHoverRadius.value = live.hoverRadius;
      mat.uniforms.uHoverStrength.value = live.hoverStrength;
      mat.uniforms.uColorA.value.set(live.colorA);
      mat.uniforms.uColorB.value.set(live.colorB || live.colorA);
      mat.uniforms.uOpacity.value = live.opacity / 100;
      mat.uniforms.uGlow.value = live.glow;
      mat.uniforms.uGloss.value = live.gloss;

      cachedBgColor.set(live.bgColor);
      renderer.setClearColor(cachedBgColor, 1);
      if (fog && scene.fog) {
        (scene.fog as THREE.FogExp2).color.set(live.bgColor);
      }

      // Cursor world position — single ray–plane intersection
      const { nx, ny } = cursorRef.current;
      if (live.hoverEffect && nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        ndc.set(nx * 2 - 1, -(ny * 2 - 1));
        raycaster.setFromCamera(ndc, camera);
        if (raycaster.ray.intersectPlane(horizontalPlane, hitPoint)) {
          // Convert the world-space hit into the mesh's local space so the
          // ripple lines up with the shader's (pre-transform) vertex XZ.
          mesh.worldToLocal(hitPoint);
          mat.uniforms.uHoverWorld.value.set(hitPoint.x, hitPoint.z);
          mat.uniforms.uHoverActive.value = 1.0;
        }
      } else {
        mat.uniforms.uHoverActive.value = 0.0;
      }

      renderer.render(scene, camera);
    };

    tick();

    // ── Resize handler ─────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, [gridSegments, fog, planeWidth, planeDepth, cameraHeight, cameraTilt]); // only structural changes rebuild the scene

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}
