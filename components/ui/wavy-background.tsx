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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>(0);
  const ntRef = useRef(0);

  const backgroundFillRef = useRef(backgroundFill || "black");
  const waveOpacityRef = useRef(waveOpacity);
  const waveColorsRef = useRef(colors ?? DEFAULT_WAVE_COLORS);
  const blurRef = useRef(blur);
  const waveWidthRef = useRef(waveWidth || 50);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };

  useEffect(() => {
    backgroundFillRef.current = backgroundFill || "black";
    waveOpacityRef.current = waveOpacity;
    waveColorsRef.current = colors ?? DEFAULT_WAVE_COLORS;
    blurRef.current = blur;
    waveWidthRef.current = waveWidth || 50;
  }, [backgroundFill, waveOpacity, colors, blur, waveWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const drawWave = (n: number, mobile: boolean) => {
      const waveColors = waveColorsRef.current;
      const amplitude = mobile ? 55 : 100;
      const step = mobile ? 7 : 5;
      const lineWidth = mobile
        ? Math.max(1, Math.floor(waveWidthRef.current * 0.75))
        : waveWidthRef.current;

      for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = waveColors[i % waveColors.length];
        for (let x = 0; x < w; x += step) {
          const y = noise(x / 800, 0.3 * i, ntRef.current) * amplitude;
          ctx.lineTo(x, y + h * 0.5);
        }
        ctx.stroke();
        ctx.closePath();
      }
    };

    const render = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      ntRef.current += getSpeed() * (mobile ? 0.45 : 1);

      ctx.filter = `blur(${blurRef.current}px)`;
      ctx.fillStyle = backgroundFillRef.current;
      ctx.globalAlpha = waveOpacityRef.current;
      ctx.fillRect(0, 0, w, h);
      drawWave(5, mobile);
      animationIdRef.current = requestAnimationFrame(render);
    };

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationIdRef.current);
    };
  }, [speed]);

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
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
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
