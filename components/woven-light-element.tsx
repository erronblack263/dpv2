"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const FRAME_INTERVAL_MS = 1000 / 30;

export function WovenLightElement() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !window.matchMedia("(min-width: 768px)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch (error) {
      console.warn("Unable to initialize the decorative 3D hero element.", error);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 7);

    const knotGeometry = new THREE.TorusKnotGeometry(1.45, 0.38, 180, 10, 2, 3);
    const positions = knotGeometry.getAttribute("position");
    const colors = new Float32Array(positions.count * 3);
    const cyan = new THREE.Color("#22d3ee");
    const violet = new THREE.Color("#8b5cf6");
    const color = new THREE.Color();

    for (let index = 0; index < positions.count; index += 1) {
      const blend = THREE.MathUtils.clamp(
        (positions.getX(index) + 2.2) / 4.4,
        0,
        1,
      );
      color.lerpColors(cyan, violet, blend);
      color.toArray(colors, index * 3);
    }

    knotGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const wireMaterial = new THREE.MeshBasicMaterial({
      vertexColors: true,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pointMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.022,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const knotGroup = new THREE.Group();
    knotGroup.scale.setScalar(0.82);
    knotGroup.rotation.set(0.28, 0, -0.2);
    knotGroup.add(new THREE.Mesh(knotGeometry, wireMaterial));
    knotGroup.add(new THREE.Points(knotGeometry, pointMaterial));
    scene.add(knotGroup);

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let isVisible = true;
    let frameId = 0;
    let lastFrameTime = 0;

    const render = (timestamp = performance.now()) => {
      frameId = 0;
      if (!isVisible || document.visibilityState !== "visible") return;

      if (timestamp - lastFrameTime >= FRAME_INTERVAL_MS) {
        const delta = lastFrameTime
          ? Math.min((timestamp - lastFrameTime) / 1000, 0.1)
          : 0;
        lastFrameTime = timestamp;
        knotGroup.rotation.y += delta * 0.12;
        knotGroup.rotation.x += delta * 0.025;
        renderer.render(scene, camera);
      }

      if (!motionPreference.matches) {
        frameId = window.requestAnimationFrame(render);
      }
    };

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (motionPreference.matches) render();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !frameId) {
        lastFrameTime = 0;
        frameId = window.requestAnimationFrame(render);
      } else if (!isVisible) {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    });
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isVisible && !frameId) {
        lastFrameTime = 0;
        frameId = window.requestAnimationFrame(render);
      } else if (document.visibilityState === "hidden") {
        window.cancelAnimationFrame(frameId);
        frameId = 0;
      }
    };
    const handleMotionPreferenceChange = () => {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
      lastFrameTime = 0;
      if (isVisible && document.visibilityState === "visible") {
        if (motionPreference.matches) render();
        else frameId = window.requestAnimationFrame(render);
      }
    };
    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", handleMotionPreferenceChange);
    resize();
    frameId = window.requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener(
        "change",
        handleMotionPreferenceChange,
      );
      window.cancelAnimationFrame(frameId);
      knotGeometry.dispose();
      wireMaterial.dispose();
      pointMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-0 z-0 hidden h-[35rem] w-[58%] overflow-hidden opacity-35 [mask-image:radial-gradient(ellipse_at_center,black_18%,transparent_76%)] md:block"
    />
  );
}
