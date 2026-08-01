"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

const DEFAULT_WAVE_COLORS = [
  "#38bdf8",
  "#818cf8",
  "#c084fc",
  "#e879f9",
  "#22d3ee",
];

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: unknown;
}) => {
  const noise = createNoise3D();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const ntRef = useRef(0);

  const backgroundFillRef = useRef(backgroundFill || "black");
  const waveOpacityRef = useRef(waveOpacity);
  const waveColorsRef = useRef(colors ?? DEFAULT_WAVE_COLORS);
  const blurRef = useRef(blur);
  const waveWidthRef = useRef(waveWidth || 50);
  const speedRef = useRef(speed);

  useEffect(() => {
    backgroundFillRef.current = backgroundFill || "black";
    waveOpacityRef.current = waveOpacity;
    waveColorsRef.current = colors ?? DEFAULT_WAVE_COLORS;
    blurRef.current = blur;
    waveWidthRef.current = waveWidth || 50;
    speedRef.current = speed;
  }, [backgroundFill, waveOpacity, colors, blur, waveWidth, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let isMobile = false;
    let prefersReducedMotion = false;
    let avatarBaseline = 0;

    const getSpeed = () => {
      if (prefersReducedMotion) return 0;
      const base = speedRef.current === "fast" ? 0.002 : 0.001;
      // Calm but clearly visible on phones/tablets
      return isMobile ? base * 0.45 : base;
    };

    const updateAvatarBaseline = () => {
      const avatar = document.querySelector(
        "[data-avatar-anchor]",
      ) as HTMLElement | null;
      if (!avatar) {
        avatarBaseline = isMobile ? Math.min(220, h * 0.28) : h * 0.5;
        return;
      }
      const containerRect = container.getBoundingClientRect();
      const avatarRect = avatar.getBoundingClientRect();
      // Center of avatar relative to the wavy container / canvas top
      const centerY =
        avatarRect.top -
        containerRect.top +
        container.scrollTop +
        avatarRect.height / 2;
      avatarBaseline = Math.max(80, centerY);
    };

    const drawWave = () => {
      const waveColors = waveColorsRef.current;
      const amplitude = isMobile ? 70 : 100;
      const step = isMobile ? 6 : 5;
      const spatial = isMobile ? 900 : 800;
      const lineWidth = isMobile
        ? Math.max(28, Math.floor(waveWidthRef.current * 0.85))
        : waveWidthRef.current;
      const waveCount = isMobile ? 4 : 5;
      // Mobile/tablet: waves sit directly behind the avatar image
      const baseline = isMobile ? avatarBaseline : h * 0.5;

      ctx.globalAlpha = isMobile
        ? Math.max(0.55, waveOpacityRef.current)
        : waveOpacityRef.current;

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += step) {
          const y = noise(x / spatial, 0.3 * i, ntRef.current) * amplitude;
          ctx.lineTo(x, y + baseline);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      ntRef.current += getSpeed();

      ctx.globalAlpha = 1;
      ctx.filter = "none";
      ctx.fillStyle = backgroundFillRef.current;
      ctx.fillRect(0, 0, w, h);

      const blurPx = isMobile
        ? Math.min(blurRef.current, 8)
        : blurRef.current;
      ctx.filter = `blur(${blurPx}px)`;
      drawWave();

      animationIdRef.current = requestAnimationFrame(render);
    };

    const updateFlags = () => {
      isMobile = window.matchMedia("(max-width: 1024px)").matches;
      prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
    };

    const resize = () => {
      updateFlags();
      const rect = container.getBoundingClientRect();
      w = Math.max(window.innerWidth, Math.floor(rect.width) || window.innerWidth);
      h = Math.max(
        window.innerHeight,
        Math.floor(rect.height) || window.innerHeight,
        container.scrollHeight || 0,
      );

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateAvatarBaseline();
    };

    updateFlags();
    resize();
    // Avatar mounts after first paint — remeasure once layout settles
    requestAnimationFrame(() => {
      updateAvatarBaseline();
      setTimeout(updateAvatarBaseline, 120);
      setTimeout(updateAvatarBaseline, 400);
    });
    render();

    const mqMobile = window.matchMedia("(max-width: 1024px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => resize();

    mqMobile.addEventListener?.("change", onChange);
    mqMotion.addEventListener?.("change", onChange);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateAvatarBaseline, { passive: true });

    const ro = new ResizeObserver(() => resize());
    ro.observe(container);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateAvatarBaseline);
      mqMobile.removeEventListener?.("change", onChange);
      mqMotion.removeEventListener?.("change", onChange);
      ro.disconnect();
      cancelAnimationFrame(animationIdRef.current);
    };
  }, []);

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome"),
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen flex flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <canvas
        className="pointer-events-none absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
