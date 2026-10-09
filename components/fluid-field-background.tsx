"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;

vec3 mod289(vec3 value) { return value - floor(value * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 value) { return value - floor(value * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 value) { return mod289(((value * 34.0) + 1.0) * value); }

float snoise(vec2 value) {
  const vec4 constants = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 cell = floor(value + dot(value, constants.yy));
  vec2 offset = value - cell + dot(cell, constants.xx);
  vec2 corner = offset.x > offset.y ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 offsets = offset.xyxy + constants.xxzz;
  offsets.xy -= corner;
  cell = mod289(cell);
  vec3 permutation = permute(permute(cell.y + vec3(0.0, corner.y, 1.0)) + cell.x + vec3(0.0, corner.x, 1.0));
  vec3 attenuation = max(0.5 - vec3(dot(offset, offset), dot(offsets.xy, offsets.xy), dot(offsets.zw, offsets.zw)), 0.0);
  attenuation *= attenuation;
  attenuation *= attenuation;
  vec3 gradientX = 2.0 * fract(permutation * constants.www) - 1.0;
  vec3 gradientH = abs(gradientX) - 0.5;
  vec3 gradientOffset = floor(gradientX + 0.5);
  vec3 gradientA = gradientX - gradientOffset;
  attenuation *= 1.79284291400159 - 0.85373472095314 * (gradientA * gradientA + gradientH * gradientH);
  vec3 gradient;
  gradient.x = gradientA.x * offset.x + gradientH.x * offset.y;
  gradient.yz = gradientA.yz * offsets.xz + gradientH.yz * offsets.yw;
  return 130.0 * dot(attenuation, gradient);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  uv.x *= u_resolution.x / u_resolution.y;
  vec2 flow = uv * 0.7;
  flow += vec2(snoise(flow + u_time * 0.05), snoise(flow - u_time * 0.05)) * 0.3;
  float field = snoise(vec2(flow.x + flow.y * 1.5 - u_time * 0.15, u_time * 0.02));
  float beam = smoothstep(0.1, 0.8, field);
  float edgeFade = smoothstep(0.0, 0.22, uv.y) * (1.0 - smoothstep(0.82, 1.0, uv.y));
  vec3 glow = mix(vec3(0.08, 0.72, 0.9), vec3(0.46, 0.22, 0.95), snoise(uv * 1.5 + u_time * 0.1) * 0.5 + 0.5);
  float opacity = beam * edgeFade * 0.72;
  gl_FragColor = vec4(glow * opacity, opacity);
}
`;

export function FluidFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2(canvas.width, canvas.height) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    const startTime = performance.now();
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const render = () => {
      frameId = 0;
      uniforms.u_time.value = motionPreference.matches
        ? 0
        : (performance.now() - startTime) * 0.001;
      renderer.render(scene, camera);
      if (!motionPreference.matches && document.visibilityState === "visible") {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(canvas.width, canvas.height);
      if (!frameId) render();
    };

    const updateVisibility = () => {
      if (document.visibilityState === "hidden") {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      } else if (!frameId) {
        render();
      }
    };

    const updateMotionPreference = () => {
      if (motionPreference.matches) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
        render();
      } else if (!frameId && document.visibilityState === "visible") {
        render();
      }
    };

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", updateVisibility);
    motionPreference.addEventListener("change", updateMotionPreference);
    render();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", updateVisibility);
      motionPreference.removeEventListener("change", updateMotionPreference);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 78% 34%, rgba(88,62,164,0.14), transparent 46%), radial-gradient(ellipse at 28% 76%, rgba(18,133,157,0.08), transparent 48%)",
      }}
    >
      <canvas ref={canvasRef} className="size-full" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)",
        }}
      />
    </div>
  );
}