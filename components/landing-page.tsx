"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { WhatIDo } from "@/components/what-i-do";

const DARK_WAVE_COLORS = [
  "#38bdf8",
  "#818cf8",
  "#a78bfa",
  "#6366f1",
  "#22d3ee",
];
const LIGHT_WAVE_COLORS = [
  "#6366f1",
  "#818cf8",
  "#38bdf8",
  "#a78bfa",
  "#22d3ee",
];

export function LandingPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <WavyBackground
      containerClassName="relative w-full min-h-[calc(100vh-3rem)] !h-auto flex flex-col items-stretch justify-start"
      className="w-full"
      backgroundFill={isDark ? "#000000" : "#f1f5f9"}
      waveOpacity={isDark ? 0.55 : 0.4}
      blur={10}
      speed="slow"
      waveWidth={52}
      colors={isDark ? DARK_WAVE_COLORS : LIGHT_WAVE_COLORS}
    >
      <div className="flex w-full flex-col gap-0 pb-6 sm:pb-8">
        <Hero />
        <StatsBar />
        <WhatIDo />
      </div>
    </WavyBackground>
  );
}
