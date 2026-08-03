"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function HeroLandingPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const mockupSrc =
    mounted && resolvedTheme === "light" ? "/landing-light.png" : "/landing.png";

  return (
    <div className="min-h-screen bg-background overflow-hidden">

      {/* ── Purple diagonal light beam ──────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div style={{
          position: "absolute", top: "-10%", right: "12%",
          width: "2px", height: "120%",
          background: "linear-gradient(180deg, transparent 0%, #c084fc 25%, #ffffff 50%, #c084fc 75%, transparent 100%)",
          transform: "rotate(-38deg)", transformOrigin: "top center",
          filter: "blur(0.5px)", opacity: 0.95,
        }} />
        <div style={{
          position: "absolute", top: "-10%", right: "6%",
          width: "260px", height: "110%",
          background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.08) 15%, rgba(168,85,247,0.38) 40%, rgba(168,85,247,0.08) 70%, transparent 100%)",
          transform: "rotate(-38deg)", transformOrigin: "top center",
          filter: "blur(55px)",
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0, width: "58%", height: "60%",
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.2) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 80% at 75% 35%, black 0%, transparent 65%)",
        }} />
      </div>

      {/* ── Main content ─────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">

        {/* ── Spacer to push heading ~25% down (like Linear) ───── */}
        <div className="pt-6 sm:pt-8 lg:pt-10" />

        {/* ── Large heading ─────────────────────────────────────── */}
        <div className="pb-5 max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-foreground leading-[1.06] tracking-tight">
            Build scalable digital<br />
            solutions with{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg,#a855f7,#7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              little hassle!
            </span>
          </h1>
        </div>

        {/* ── Subtitle + CTAs ───────────────────────────────────── */}
        <div className="flex flex-col gap-5 pb-10">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
            Fullstack engineer specialising in mobile, web and backend systems.
            I turn complex problems into elegant, high-performance solutions — fast.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(124,58,237,0.7)]"
            >
              Take me home
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-accent"
            >
              View my work
            </Link>
          </div>
        </div>

        {/* ── Full-width mockup image ───────────────────────────── */}
        <div className="relative w-full">
          <div
            className="relative rounded-2xl p-[1px]"
            style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.8), rgba(124,58,237,0.4), rgba(168,85,247,0.8))",
              boxShadow: "0 0 60px rgba(168,85,247,0.45), 0 0 120px rgba(124,58,237,0.2)",
            }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* Bottom fade into background */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/4 z-10 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent, var(--background))" }}
              />
              {mounted ? (
                <Image
                  src={mockupSrc}
                  alt="Portfolio preview"
                  width={1600}
                  height={1000}
                  quality={100}
                  priority
                  className="w-full object-cover object-top select-none"
                />
              ) : (
                <div className="w-full aspect-video bg-muted animate-pulse rounded-2xl" />
              )}
            </div>
          </div>

          {/* Outer ambient glow */}
          <div
            className="absolute -inset-6 rounded-3xl pointer-events-none -z-10"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.12) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />
        </div>

      </div>
    </div>
  );
}
