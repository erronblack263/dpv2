import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { WhatIDo } from "@/components/what-i-do";
import { LandingCta } from "@/components/landing-cta";

export default function Page() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <StatsBar />
      <WhatIDo />
      <LandingCta />
    </div>
  );
}
