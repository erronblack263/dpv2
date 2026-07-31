import { Hero } from "@/components/hero";
import { StatsBar } from "@/components/stats-bar";
import { WhatIDo } from "@/components/what-i-do";

export default function Page() {
  return (
    <div className="flex flex-col gap-0 pb-4">
      <Hero />
      <StatsBar />
      <WhatIDo />
    </div>
  );
}
