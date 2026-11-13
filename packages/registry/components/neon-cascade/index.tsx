"use client";

import { useCallback, useEffect, useRef } from "react";
import * as THREE from "three";

export interface NeonCascadeProps {
  /** Primary line color (hex/rgb/hsl). */
  color?: string;
  /** Color the lines blend into near the bend. Defaults to `color`. */
  tipColor?: string;
  /** Scene background color. */
  bgColor?: string;
  /** Number of vertical lines (1–220). */
  lineCount?: number;
  /** Width of each line in world units. */
  lineWidth?: number;
  /** Horizontal spread of the lines in world units. */
  span?: number;
  /** Vertical length of the straight fall in world units. */
  lineHeight?: number;
  /** Fraction of the fall (0–1) where the forward bend starts. */
  curveHeight?: number;
  /** Bend radius / forward depth in world units — how far the tips reach the camera. */
  curveAmount?: number;
  /** Bend easing. 1 = circular quarter-arc, higher = sharper late bend. */
  curvePower?: number;
  /** Lateral sine sway amplitude in world units. */
  sway?: number;
  /** Number of sway cycles along each line. */
  swayFrequency?: number;
  /** Sway animation speed. */
  swaySpeed?: number;
  /** Animate bright pulses travelling down the lines. */
  flow?: boolean;
  /** Pulse travel speed. */
  flowSpeed?: number;
  /** Pulse length as a fraction of one cycle (0–1). */
  flowLength?: number;
  /** Number of pulses per line. */
  flowDensity?: number;
  /** Halo / glow intensity around each line. */
  glow?: number;
  /** Overall opacity (0–100). */
  opacity?: number;
  /** Camera distance from the scene. */
  cameraDistance?: number;
  /** Camera field of view in degrees. */
  cameraFov?: number;
  /** Subtle pointer-driven camera parallax. */
  parallax?: boolean;
  /** Parallax strength in world units. */
  parallaxStrength?: number;
  className?: string;
}

const MAX_LINES = 220;
const SEGMENTS = 48;

export function NeonCascade({
  color = "#00f3ff",
  tipColor,
  bgColor = "#050505",
  lineCount = 64,
  lineWidth = 0.09,
  span = 30,
  lineHeight = 20,
  curveHeight = 0.5,
  curveAmount = 5,
  curvePower = 1,
  sway = 0.25,
  swayFrequency = 0.6,
  swaySpeed = 0.35,
  flow = true,
  flowSpeed = 0.4,
  flowLength = 0.35,
  flowDensity = 1.2,
  glow = 1.6,
  opacity = 100,
  cameraDistance = 16,
  cameraFov = 50,
  parallax = true,
  parallaxStrength = 1,
  className,
}: NeonCascadeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  // Values read every frame in the render loop — changing these never rebuilds the scene.
  const liveRef = useRef({
    color,
    tipColor,
    bgColor,
    lineCount,
    lineWidth,
    span,
    lineHeight,
    curveHeight,
    curveAmount,
    curvePower,
    sway,
    swayFrequency,
    swaySpeed,
    flow,
    flowSpeed,
    flowLength,
    flowDensity,
    glow,
    opacity,
    cameraDistance,
    cameraFov,
    parallax,
    parallaxStrength,
  });

  useEffect(() => {
    liveRef.current = {
      color,
      tipColor,
      bgColor,
      lineCount,
      lineWidth,
      span,
      lineHeight,
      curveHeight,
      curveAmount,
      curvePower,
      sway,
      swayFrequency,
      swaySpeed,
      flow,
      flowSpeed,
      flowLength,
      flowDensity,
      glow,
      opacity,
      cameraDistance,
      cameraFov,
      parallax,
      parallaxStrength,
    };
  }, [
    color,
    tipColor,
    bgColor,
    lineCount,
    lineWidth,
    span,
    lineHeight,
    curveHeight,
    curveAmount,
    curvePower,
    sway,
    swayFrequency,
    swaySpeed,
    flow,
    flowSpeed,
    flowLength,
    flowDensity,
    glow,
    opacity,
    cameraDistance,
    cameraFov,
    parallax,
    parallaxStrength,
  ]);

  // Normalised cursor position (-1…1); used only for camera parallax.
  const cursorRef = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorRef.current = {
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    };
  }, []);

  const onMouseLeave = useCallback(() => {
    cursorRef.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    const W = mount.clientWidth || 800;
    const H = mount.clientHeight || 600;
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.pointerEvents = "none";
    mount.appendChild(renderer.domElement);

    const clearColor = new THREE.Color(liveRef.current.bgColor);
    renderer.setClearColor(clearColor, 1);

    // ── Scene / camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      liveRef.current.cameraFov,
      W / H,
      0.1,
      400,
    );
    camera.position.set(0, 0, liveRef.current.cameraDistance);

    // ── Geometry ──────────────────────────────────────────────────────────
    // Every line is a ribbon of SEGMENTS quads. All motion, bending and
    // perspective happen in the vertex shader, so the geometry never changes.
    const vertsPerLine = (SEGMENTS + 1) * 2;
    const totalVerts = MAX_LINES * vertsPerLine;
    const totalIndices = MAX_LINES * SEGMENTS * 6;

    const positions = new Float32Array(totalVerts * 3);
    const aIndex = new Float32Array(totalVerts);
    const aProgress = new Float32Array(totalVerts);
    const aSide = new Float32Array(totalVerts);
    const aPhase = new Float32Array(totalVerts);
    const indices = new Uint32Array(totalIndices);

    let v = 0;
    let ii = 0;
    for (let line = 0; line < MAX_LINES; line++) {
      const phase = Math.random();
      const lineStart = line * vertsPerLine;

      for (let j = 0; j <= SEGMENTS; j++) {
        const t = j / SEGMENTS;
        for (let s = 0; s < 2; s++) {
          aIndex[v] = line;
          aProgress[v] = t;
          aSide[v] = s === 0 ? -1 : 1;
          aPhase[v] = phase;
          v++;
        }
      }

      for (let j = 0; j < SEGMENTS; j++) {
        const a = lineStart + j * 2;
        const b = a + 1;
        const c = a + 2;
        const d = a + 3;
        indices[ii++] = a;
        indices[ii++] = b;
        indices[ii++] = c;
        indices[ii++] = b;
        indices[ii++] = d;
        indices[ii++] = c;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aIndex", new THREE.BufferAttribute(aIndex, 1));
    geo.setAttribute("aProgress", new THREE.BufferAttribute(aProgress, 1));
    geo.setAttribute("aSide", new THREE.BufferAttribute(aSide, 1));
    geo.setAttribute("aPhase", new THREE.BufferAttribute(aPhase, 1));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.setDrawRange(0, liveRef.current.lineCount * SEGMENTS * 6);

    // ── Shaders ───────────────────────────────────────────────────────────
    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform float uLineCount;
      uniform float uSpan;
      uniform float uLineHeight;
      uniform float uCurveHeight;
      uniform float uCurveAmount;
      uniform float uCurvePower;
      uniform float uLineWidth;
      uniform float uSway;
      uniform float uSwayFrequency;
      uniform float uSwaySpeed;

      attribute float aIndex;
      attribute float aProgress;
      attribute float aSide;
      attribute float aPhase;

      varying float vProgress;
      varying float vPhase;
      varying float vSide;

      void main() {
        float t = aProgress;
        float denom = max(uLineCount - 1.0, 1.0);

        // Horizontal placement, distributed across the span.
        float x = (aIndex / denom - 0.5) * uSpan;

        // Straight vertical fall, then a quarter-arc that turns the line
        // toward the camera. The arc keeps a vertical tangent where it starts
        // and ends pointing straight at the viewer.
        float c = clamp(uCurveHeight, 0.01, 0.99);
        float bendT = clamp((t - c) / max(1.0 - c, 0.0001), 0.0, 1.0);
        float angle = pow(bendT, max(uCurvePower, 0.05)) * 1.5707963;

        float y = (0.5 - min(t, c)) * uLineHeight - uCurveAmount * sin(angle);
        float z = uCurveAmount * (1.0 - cos(angle));

        // Lateral sway, pinned at the top of each line.
        x += sin(t * uSwayFrequency * 6.28318 + aPhase * 6.28318 + uTime * uSwaySpeed)
             * uSway * smoothstep(0.0, 0.35, t);

        x += aSide * uLineWidth * 0.5;

        vProgress = t;
        vPhase = aPhase;
        vSide = aSide;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
      }
    `;

    const fragmentShader = /* glsl */ `
      uniform vec3 uColor;
      uniform vec3 uTipColor;
      uniform float uGlow;
      uniform float uOpacity;
      uniform float uFlow;
      uniform float uTime;
      uniform float uFlowSpeed;
      uniform float uFlowLength;
      uniform float uFlowDensity;
      uniform float uCurveHeight;

      varying float vProgress;
      varying float vPhase;
      varying float vSide;

      void main() {
        float edge = abs(vSide);

        // Soft halo + tight core across the ribbon.
        float halo = pow(max(0.0, 1.0 - edge), 2.5);
        float core = pow(max(0.0, 1.0 - edge), 9.0);

        // Optional travelling pulses.
        float pulse = 1.0;
        if (uFlow > 0.5) {
          float p = fract(vProgress * uFlowDensity - uTime * uFlowSpeed + vPhase);
          pulse = 0.35 + 0.8 * smoothstep(1.0 - uFlowLength, 1.0, p);
        }

        // Soften the very tip of the bend so lines don't end on a hard edge.
        float tipFade = 1.0 - smoothstep(0.94, 1.0, vProgress);

        float intensity =
          (core * 1.35 + halo * uGlow * 0.55) * pulse * tipFade * uOpacity;

        vec3 col = mix(
          uColor,
          uTipColor,
          smoothstep(uCurveHeight * 0.7, 1.0, vProgress)
        );

        gl_FragColor = vec4(col * intensity, 1.0);
      }
    `;

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uLineCount: { value: Math.min(liveRef.current.lineCount, MAX_LINES) },
        uSpan: { value: liveRef.current.span },
        uLineHeight: { value: liveRef.current.lineHeight },
        uCurveHeight: { value: liveRef.current.curveHeight },
        uCurveAmount: { value: liveRef.current.curveAmount },
        uCurvePower: { value: liveRef.current.curvePower },
        uLineWidth: { value: liveRef.current.lineWidth },
        uSway: { value: liveRef.current.sway },
        uSwayFrequency: { value: liveRef.current.swayFrequency },
        uSwaySpeed: { value: liveRef.current.swaySpeed },
        uColor: { value: new THREE.Color() },
        uTipColor: { value: new THREE.Color() },
        uGlow: { value: liveRef.current.glow },
        uOpacity: { value: liveRef.current.opacity / 100 },
        uFlow: { value: liveRef.current.flow ? 1 : 0 },
        uFlowSpeed: { value: liveRef.current.flowSpeed },
        uFlowLength: { value: liveRef.current.flowLength },
        uFlowDensity: { value: liveRef.current.flowDensity },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    scene.add(mesh);

    // ── Color helpers ─────────────────────────────────────────────────────
    // Keep the given hex values as-is instead of converting them to linear
    // space, so the neon colors read exactly as authored.
    const setColor = (target: THREE.Color, value: string) => {
      target.setStyle(value, THREE.LinearSRGBColorSpace);
    };

    // ── Animation loop ────────────────────────────────────────────────────
    let animId = 0;
    let elapsed = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      animId = requestAnimationFrame(tick);

      const live = liveRef.current;
      elapsed += clock.getDelta();

      const activeLines = Math.max(
        1,
        Math.min(Math.round(live.lineCount), MAX_LINES),
      );

      geo.setDrawRange(0, activeLines * SEGMENTS * 6);

      mat.uniforms.uTime.value = elapsed;
      mat.uniforms.uLineCount.value = activeLines;
      mat.uniforms.uSpan.value = live.span;
      mat.uniforms.uLineHeight.value = live.lineHeight;
      mat.uniforms.uCurveHeight.value = live.curveHeight;
      mat.uniforms.uCurveAmount.value = live.curveAmount;
      mat.uniforms.uCurvePower.value = live.curvePower;
      mat.uniforms.uLineWidth.value = live.lineWidth;
      mat.uniforms.uSway.value = live.sway;
      mat.uniforms.uSwayFrequency.value = live.swayFrequency;
      mat.uniforms.uSwaySpeed.value = live.swaySpeed;
      mat.uniforms.uGlow.value = live.glow;
      mat.uniforms.uOpacity.value = live.opacity / 100;
      mat.uniforms.uFlow.value = live.flow ? 1 : 0;
      mat.uniforms.uFlowSpeed.value = live.flowSpeed;
      mat.uniforms.uFlowLength.value = live.flowLength;
      mat.uniforms.uFlowDensity.value = live.flowDensity;

      setColor(mat.uniforms.uColor.value, live.color);
      setColor(mat.uniforms.uTipColor.value, live.tipColor || live.color);

      clearColor.set(live.bgColor);
      renderer.setClearColor(clearColor, 1);

      camera.fov = Math.max(20, Math.min(110, live.cameraFov));
      camera.position.z = Math.max(2, live.cameraDistance);
      camera.updateProjectionMatrix();

      const targetX = live.parallax
        ? cursorRef.current.x * live.parallaxStrength
        : 0;
      const targetY = live.parallax
        ? -cursorRef.current.y * live.parallaxStrength
        : 0;
      camera.position.x += (targetX - camera.position.x) * 0.06;
      camera.position.y += (targetY - camera.position.y) * 0.06;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    tick();

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(mount);
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geo.dispose();
      mat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 overflow-hidden${className ? ` ${className}` : ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
}
