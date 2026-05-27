"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export interface HolographicTerrainProps {
  /** Wireframe line color */
  lineColor?: string;
  /** Background and fog color */
  bgColor?: string;
  /** Peak height of animated sine waves (world units) */
  waveAmplitude?: number;
  /** Spatial frequency of waves */
  waveFrequency?: number;
  /** Animation speed multiplier */
  waveSpeed?: number;
  /** Cursor interaction radius in world units */
  bumpRadius?: number;
  /** Max height of the cursor bump */
  bumpStrength?: number;
  /** Terrain width along the X axis in world units */
  planeWidth?: number;
  /** Terrain depth/length along the Z axis in world units */
  planeDepth?: number;
  /** Camera height above the terrain origin */
  cameraHeight?: number;
  /** Plane subdivision count on each axis */
  gridSegments?: number;
  /** Exponential fog that fades edges to bgColor */
  fog?: boolean;
  /** Overall opacity (0–100) */
  opacity?: number;
  className?: string;
}

export function HolographicTerrain({
  lineColor = "#00ffff",
  bgColor = "#020a0a",
  waveAmplitude = 0.8,
  waveFrequency = 1.5,
  waveSpeed = 1,
  bumpRadius = 3.5,
  bumpStrength = 2.5,
  planeWidth = 24,
  planeDepth = 24,
  cameraHeight = 10,
  gridSegments = 60,
  fog = true,
  opacity = 100,
  className,
}: HolographicTerrainProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Refs for values that change often — no remount, just read in render loop
  const liveRef = useRef({
    lineColor,
    bgColor,
    waveAmplitude,
    waveFrequency,
    waveSpeed,
    bumpRadius,
    bumpStrength,
    opacity,
  });

  useEffect(() => {
    liveRef.current = {
      lineColor,
      bgColor,
      waveAmplitude,
      waveFrequency,
      waveSpeed,
      bumpRadius,
      bumpStrength,
      opacity,
    };
  }, [
    lineColor,
    bgColor,
    waveAmplitude,
    waveFrequency,
    waveSpeed,
    bumpRadius,
    bumpStrength,
    opacity,
  ]);

  // Normalised mouse position (0–1 range; -2 = off-screen)
  const mouseRef = useRef({ nx: -2, ny: -2 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      nx: (e.clientX - rect.left) / rect.width,
      ny: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    mouseRef.current = { nx: -2, ny: -2 };
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
      scene.fog = new THREE.FogExp2(cachedBgColor.clone(), 0.045);
    }

    // ── Camera ────────────────────────────────────────────────────────────
    // cameraZ is derived from height to maintain a consistent ~35° tilt
    const cameraZ = cameraHeight * 1.4;
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, cameraHeight, cameraZ);
    camera.lookAt(0, 0, 0);

    // ── Terrain geometry ──────────────────────────────────────────────────
    const segs = Math.max(8, Math.min(gridSegments, 200));
    const geo = new THREE.PlaneGeometry(planeWidth, planeDepth, segs, segs);
    // Bake the XZ-flat orientation into vertex positions so the vertex shader
    // can read position.x / position.z directly as world XZ coordinates.
    geo.rotateX(-Math.PI / 2);

    // ── Shader material — all vertex deformation runs on the GPU ──────────
    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform float uAmplitude;
      uniform float uFrequency;
      uniform float uBumpStrength;
      uniform float uBumpRadius;
      uniform vec2  uCursorWorld;
      uniform float uCursorActive;

      #include <fog_pars_vertex>

      void main() {
        vec3 pos = position;
        float x   = pos.x;
        float z   = pos.z;

        // Four overlapping sine waves — same coefficients as the old CPU loop
        float wave =
            uAmplitude        * sin(uFrequency * x * 0.35  + uTime)
          + uAmplitude * 0.60 * sin(uFrequency * z * 0.35  + uTime * 0.73)
          + uAmplitude * 0.35 * sin(uFrequency * (x + z) * 0.20 + uTime * 1.31)
          + uAmplitude * 0.20 * sin(uFrequency * (x - z) * 0.18 + uTime * 0.97);

        // Gaussian cursor bump — branch skipped entirely when cursor is off-screen
        if (uCursorActive > 0.5) {
          vec2  d    = vec2(x, z) - uCursorWorld;
          float br2  = uBumpRadius * uBumpRadius;
          wave += uBumpStrength * exp(-dot(d, d) / br2);
        }

        pos.y = wave;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        #include <fog_vertex>
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform vec3  uColor;
      uniform float uOpacity;

      #include <fog_pars_fragment>

      void main() {
        gl_FragColor = vec4(uColor, uOpacity);
        #include <fog_fragment>
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        // Three.js populates fogColor / fogDensity from scene.fog each frame
        ...THREE.UniformsLib.fog,
        uTime: { value: 0 },
        uAmplitude: { value: liveRef.current.waveAmplitude },
        uFrequency: { value: liveRef.current.waveFrequency },
        uBumpStrength: { value: liveRef.current.bumpStrength },
        uBumpRadius: { value: liveRef.current.bumpRadius },
        uCursorWorld: { value: new THREE.Vector2(0, 0) },
        uCursorActive: { value: 0.0 },
        uColor: { value: new THREE.Color(liveRef.current.lineColor) },
        uOpacity: { value: liveRef.current.opacity / 100 },
      },
      vertexShader,
      fragmentShader,
      wireframe: true,
      transparent: true,
      fog: true,
    });

    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // ── Raycasting helpers ─────────────────────────────────────────────────
    // Only one ray–plane intersection per frame — negligible CPU cost
    const raycaster = new THREE.Raycaster();
    const horizontalPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3();
    const ndc = new THREE.Vector2();

    // ── Animation loop ─────────────────────────────────────────────────────
    let animId: number;
    const t0 = performance.now();

    const tick = () => {
      animId = requestAnimationFrame(tick);

      const live = liveRef.current;
      const elapsed = ((performance.now() - t0) / 1000) * live.waveSpeed;

      // Push updated values to GPU uniforms — zero CPU vertex work
      mat.uniforms.uTime.value = elapsed;
      mat.uniforms.uAmplitude.value = live.waveAmplitude;
      mat.uniforms.uFrequency.value = live.waveFrequency;
      mat.uniforms.uBumpStrength.value = live.bumpStrength;
      mat.uniforms.uBumpRadius.value = live.bumpRadius;
      mat.uniforms.uColor.value.set(live.lineColor);
      mat.uniforms.uOpacity.value = live.opacity / 100;

      // Reuse cached Color — no GC allocation per frame
      cachedBgColor.set(live.bgColor);
      renderer.setClearColor(cachedBgColor, 1);
      if (fog && scene.fog) {
        (scene.fog as THREE.FogExp2).color.set(live.bgColor);
      }

      // Cursor world position — single ray–plane intersection
      const { nx, ny } = mouseRef.current;
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        ndc.set(nx * 2 - 1, -(ny * 2 - 1));
        raycaster.setFromCamera(ndc, camera);
        if (raycaster.ray.intersectPlane(horizontalPlane, hitPoint)) {
          mat.uniforms.uCursorWorld.value.set(hitPoint.x, hitPoint.z);
          mat.uniforms.uCursorActive.value = 1.0;
        }
      } else {
        mat.uniforms.uCursorActive.value = 0.0;
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
  }, [gridSegments, fog, planeWidth, planeDepth, cameraHeight]); // only structural changes rebuild the scene

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}
