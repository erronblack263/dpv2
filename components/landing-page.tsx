"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Hero } from "@/components/hero";

// Canvas loaded lazily — never blocks first paint
const WavyBackground = dynamic(
  () => import("@/components/ui/wavy-background").then((mod) => ({ default: mod.WavyBackground })),
  { ssr: false }
);

const StatsBar = dynamic(
  () => import("@/components/stats-bar").then((mod) => ({ default: mod.StatsBar })),
  { ssr: false, loading: () => <div className="h-32" /> }
);

const WhatIDo = dynamic(
  () => import("@/components/what-i-do").then((mod) => ({ default: mod.WhatIDo })),
  { ssr: false, loading: () => <div className="h-40" /> }
);

const DARK_WAVE_COLORS = ["#38bdf8", "#818cf8", "#a78bfa", "#6366f1", "#22d3ee"];
const LIGHT_WAVE_COLORS = ["#6366f1", "#818cf8", "#38bdf8", "#a78bfa", "#22d3ee"];

export function LandingPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (canvasReady) return;
    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setCanvasReady(true);
    };
    window.addEventListener("scroll", activate, { once: true, passive: true });
    window.addEventListener("pointermove", activate, { once: true, passive: true });
    window.addEventListener("touchstart", activate, { once: true, passive: true });
    const timer = setTimeout(activate, 0);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", activate);
      window.removeEventListener("pointermove", activate);
      window.removeEventListener("touchstart", activate);
    };
  }, [canvasReady]);

  const isDark = !mounted || resolvedTheme === "dark";
  const bgFill = isDark ? "#000000" : "#f1f5f9";

  return (
    // Single stable outer div — never remounts, no flash
    <div
      ref={containerRef}
      className="relative w-full min-h-[calc(100vh-3rem)] flex flex-col items-stretch justify-start"
      style={{ backgroundColor: bgFill }}
    >
      {/* Canvas layer — absolutely positioned behind content, only mounts after interaction */}
      {canvasReady && (
        <WavyBackground
          containerClassName="!absolute inset-0 !h-full pointer-events-none"
          className="hidden"
          backgroundFill={bgFill}
          waveOpacity={isDark ? 0.55 : 0.4}
          blur={10}
          speed="slow"
          waveWidth={52}
          colors={isDark ? DARK_WAVE_COLORS : LIGHT_WAVE_COLORS}
        />
      )}

      {/* Content — always rendered, never remounts */}
      <div className="relative z-10 flex w-full flex-col gap-0 pb-6 sm:pb-8">
        <Hero />
        <StatsBar />
        <WhatIDo />
      </div>
    </div>
  );
}
