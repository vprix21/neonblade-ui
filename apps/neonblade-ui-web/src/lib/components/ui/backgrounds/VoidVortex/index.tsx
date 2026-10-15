"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

export interface VoidVortexProps {
  /** Outer ring particle colour (hex) */
  primaryColor?: string;
  /** Inner accretion core colour (hex) */
  coreColor?: string;
  /** Renderer background colour (hex) */
  bgColor?: string;
  /** Total number of particles (clamped 500–10000) */
  particleCount?: number;
  /** Orbital rotation speed multiplier */
  rotationSpeed?: number;
  /** Inward spiral (accretion) speed multiplier */
  accretionRate?: number;
  /** Outer radius of the accretion disk in world units (default 13) */
  diskRadius?: number;
  /** Vertical thickness of the disk — 0 = perfectly flat (default 0.35) */
  diskDepth?: number;
  /** Y-axis offset of the entire disk in the scene (default 0) */
  diskY?: number;
  /** Mouse hover creates a gravitational well that pulls nearby particles */
  hoverGravity?: boolean;
  /** Strength of the hover gravity well (0 = off, 1 = default, 3 = strong) */
  hoverIntensity?: number;
  /** Show the glowing orb sprite at the singularity centre */
  showCore?: boolean;
  /** Exponential fog that fades the scene into bgColor */
  fog?: boolean;
  /** Overall opacity 0–100 */
  opacity?: number;
  className?: string;
}

export function VoidVortex({
  primaryColor = "#00ffff",
  coreColor = "#ffffff",
  bgColor = "#000000",
  particleCount = 4000,
  rotationSpeed = 1,
  accretionRate = 1,
  diskRadius = 13,
  diskDepth = 0.35,
  diskY = 0,
  hoverGravity = true,
  hoverIntensity = 1,
  showCore = true,
  fog = false,
  opacity = 100,
  className,
}: VoidVortexProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  const liveRef = useRef({
    primaryColor,
    coreColor,
    bgColor,
    rotationSpeed,
    accretionRate,
    diskDepth,
    diskY,
    hoverGravity,
    hoverIntensity,
    showCore,
    fog,
    opacity,
  });
  liveRef.current = {
    primaryColor,
    coreColor,
    bgColor,
    rotationSpeed,
    accretionRate,
    diskDepth,
    diskY,
    hoverGravity,
    hoverIntensity,
    showCore,
    fog,
    opacity,
  };

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

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
    });
    const W = mount.clientWidth || 800;
    const H = mount.clientHeight || 600;
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.pointerEvents = "none";

    // ── Scene ──────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    renderer.setClearColor(liveRef.current.bgColor, 1);

    if (fog) {
      scene.fog = new THREE.FogExp2(
        new THREE.Color(liveRef.current.bgColor),
        0.028,
      );
    }

    // ── Camera — angled above the disk (XZ plane) ─────────────────────────
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 500);
    camera.position.set(0, 8, 16);
    camera.lookAt(0, 0, 0);

    // ── Glow sprite texture ───────────────────────────────────────────────
    const texCanvas = document.createElement("canvas");
    texCanvas.width = texCanvas.height = 64;
    const tCtx = texCanvas.getContext("2d")!;
    const grd = tCtx.createRadialGradient(32, 32, 0, 32, 32, 28);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.3, "rgba(255,255,255,0.65)");
    grd.addColorStop(0.65, "rgba(255,255,255,0.15)");
    grd.addColorStop(1, "rgba(255,255,255,0)");
    tCtx.fillStyle = grd;
    tCtx.fillRect(0, 0, 64, 64);
    const particleTex = new THREE.CanvasTexture(texCanvas);

    // ── Particle data (disk in XZ plane) ─────────────────────────────────
    const N = Math.max(500, Math.min(particleCount, 10000));
    const MIN_R = 1.2;
    const MAX_R = Math.max(3, Math.min(diskRadius, 30));

    const radii = new Float32Array(N);
    const angles = new Float32Array(N);
    const yOffset = new Float32Array(N); // height above disk plane
    const phaseY = new Float32Array(N); // y-oscillation phase

    const resetParticle = (i: number, outerOnly: boolean) => {
      const minR = outerOnly ? MAX_R * 0.65 : MIN_R;
      radii[i] = minR + Math.random() * (MAX_R - minR);
      angles[i] = Math.random() * Math.PI * 2;
      // raw unit value; multiplied by live.diskDepth in tick
      yOffset[i] = (Math.random() - 0.5) * (radii[i] / MAX_R);
      phaseY[i] = Math.random() * Math.PI * 2;
    };

    for (let i = 0; i < N; i++) resetParticle(i, false);

    const curPos = new Float32Array(N * 3);
    const colArr = new Float32Array(N * 3);

    // ── Main particle geometry ────────────────────────────────────────────
    const geo = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(curPos, 3);
    const colAttr = new THREE.BufferAttribute(colArr, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    colAttr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", posAttr);
    geo.setAttribute("color", colAttr);

    const mat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.16,
      sizeAttenuation: true,
      map: particleTex,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(geo, mat));

    // ── Core glow sprite (pulses at the singularity) ──────────────────────
    const coreGeo = new THREE.BufferGeometry();
    const corePosAttr = new THREE.BufferAttribute(
      new Float32Array([0, diskY, 0]),
      3,
    );
    corePosAttr.setUsage(THREE.DynamicDrawUsage);
    coreGeo.setAttribute("position", corePosAttr);
    const coreMat = new THREE.PointsMaterial({
      color: new THREE.Color(liveRef.current.coreColor),
      size: 2.8,
      sizeAttenuation: true,
      map: particleTex,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const corePoints = new THREE.Points(coreGeo, coreMat);
    scene.add(corePoints);

    // ── Raycaster (y=0 plane — disk surface) ─────────────────────────────
    const raycaster = new THREE.Raycaster();
    const hitPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hitPoint = new THREE.Vector3(99999, diskY, 99999);
    const ndc = new THREE.Vector2();

    const workPrimary = new THREE.Color();
    const workCore = new THREE.Color();

    // ── Animation ─────────────────────────────────────────────────────────
    let animId: number;
    const t0 = performance.now();
    let lastTime = t0;

    const tick = () => {
      animId = requestAnimationFrame(tick);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const elapsed = (now - t0) / 1000;

      const live = liveRef.current;

      // Sync shared state
      workPrimary.set(live.primaryColor);
      workCore.set(live.coreColor);
      mat.opacity = live.opacity / 100;
      coreMat.color.copy(workCore);
      coreMat.opacity =
        (live.opacity / 100) * (0.7 + 0.3 * Math.sin(elapsed * 2.4));
      if (fog && scene.fog) {
        (scene.fog as THREE.FogExp2).color.set(live.bgColor);
      }
      renderer.setClearColor(live.bgColor, 1);

      // Sync diskY-dependent state each frame
      hitPlane.constant = -live.diskY;
      corePoints.visible = live.showCore;
      corePosAttr.setXYZ(0, 0, live.diskY, 0);
      corePosAttr.needsUpdate = true;

      // Mouse → disk plane
      const { nx, ny } = mouseRef.current;
      if (nx >= 0 && nx <= 1 && ny >= 0 && ny <= 1) {
        ndc.set(nx * 2 - 1, -(ny * 2 - 1));
        raycaster.setFromCamera(ndc, camera);
        raycaster.ray.intersectPlane(hitPlane, hitPoint);
      } else {
        hitPoint.set(99999, live.diskY, 99999);
      }

      const hx = hitPoint.x,
        hz = hitPoint.z;
      const rs = live.rotationSpeed;
      const ar = live.accretionRate;
      // Gravity radius scales with intensity so more particles get pulled at higher values
      const GRAVITY_R = 4 + live.hoverIntensity * 2;
      const GRAVITY_R2 = GRAVITY_R * GRAVITY_R;

      for (let i = 0; i < N; i++) {
        let r = radii[i];
        let a = angles[i];

        // Keplerian rotation: inner orbits faster (ω ∝ r^-0.75)
        const omega = (rs * 1.5) / Math.pow(r, 0.75);
        a += omega * dt;

        // Accretion: inner particles spiral in faster
        r -= ar * 0.4 * dt * (1 + MAX_R / (r * r + 1));

        // Respawn at outer edge when swallowed
        if (r < MIN_R) {
          resetParticle(i, true);
          r = radii[i];
          a = angles[i];
        }

        radii[i] = r;
        angles[i] = a;

        // World position — disk in XZ plane
        let x = r * Math.cos(a);
        let y =
          yOffset[i] * live.diskDepth +
          Math.sin(elapsed * 0.4 + phaseY[i]) * 0.06 +
          live.diskY;
        let z = r * Math.sin(a);

        // Mouse gravity well (in XZ plane)
        if (live.hoverGravity) {
          const gdx = hx - x,
            gdz = hz - z;
          const gd2 = gdx * gdx + gdz * gdz;
          if (gd2 < GRAVITY_R2 && gd2 > 0.04) {
            const gd = Math.sqrt(gd2);
            // lerp-style blend — visible at default hoverIntensity=1, dramatic at 3+
            const blend = (1 - gd / GRAVITY_R) * 0.25 * live.hoverIntensity;
            x += gdx * blend;
            z += gdz * blend;
          }
        }

        curPos[i * 3] = x;
        curPos[i * 3 + 1] = y;
        curPos[i * 3 + 2] = z;

        // Colour: outer → primaryColor, inner → coreColor
        const t = Math.max(0, Math.min(1, 1 - (r - MIN_R) / (MAX_R - MIN_R)));
        const brightness = 0.25 + t * 0.75;
        const cr = workPrimary.r + (workCore.r - workPrimary.r) * t;
        const cg = workPrimary.g + (workCore.g - workPrimary.g) * t;
        const cb = workPrimary.b + (workCore.b - workPrimary.b) * t;
        colArr[i * 3] = cr * brightness;
        colArr[i * 3 + 1] = cg * brightness;
        colArr[i * 3 + 2] = cb * brightness;
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Camera gentle x-sway + y-bob
      const camT = elapsed * 0.04;
      camera.position.x = Math.sin(camT * 0.7) * 2.5;
      camera.position.y = 8 + Math.sin(camT) * 0.6;
      camera.position.z = 16;
      camera.lookAt(0, live.diskY, 0);

      renderer.render(scene, camera);
    };

    tick();

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth,
        h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      if (mount.contains(renderer.domElement))
        mount.removeChild(renderer.domElement);
      geo.dispose();
      mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleTex.dispose();
      renderer.dispose();
    };
  }, [particleCount, diskRadius, fog]); // structural changes only

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}
