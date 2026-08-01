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

  const mockupSrc = mounted && resolvedTheme === "light" ? "/landing-light.png" : "/landing.png";

  return (
    <div className="min-h-screen bg-background overflow-hidden flex flex-col">

      {/* ── Purple diagonal light beam ──────────────────────────── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        {/* Thin bright core */}
        <div style={{
          position: "absolute", top: "-10%", right: "12%",
          width: "2px", height: "120%",
          background: "linear-gradient(180deg, transparent 0%, #c084fc 25%, #ffffff 50%, #c084fc 75%, transparent 100%)",
          transform: "rotate(-38deg)", transformOrigin: "top center",
          filter: "blur(0.5px)", opacity: 0.95,
        }} />
        {/* Wide glow */}
        <div style={{
          position: "absolute", top: "-10%", right: "6%",
          width: "260px", height: "110%",
          background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.08) 15%, rgba(168,85,247,0.38) 40%, rgba(168,85,247,0.08) 70%, transparent 100%)",
          transform: "rotate(-38deg)", transformOrigin: "top center",
          filter: "blur(55px)",
        }} />
        {/* Dot grid */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "58%", height: "60%",
          backgroundImage: "radial-gradient(circle, rgba(168,85,247,0.2) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 80% 80% at 75% 35%, black 0%, transparent 65%)",
        }} />
      </div>

      {/* ── Hero text ────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col justify-center flex-none px-6 sm:px-12 lg:px-20 pt-16 pb-8 max-w-3xl">
        <p className="text-xs font-semibold text-violet-500 tracking-widest uppercase mb-5">
          Fullstack Engineer · Available for opportunities
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.08] tracking-tight">
          Build scalable digital
          <br />
          solutions with{" "}
          <span style={{ backgroundImage: "linear-gradient(135deg,#a855f7,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            little hassle!
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
          Fullstack software engineer specialising in mobile, web and backend
          systems. I turn complex problems into elegant, high-performance
          solutions — fast.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(124,58,237,0.7)]"
          >
            Get started
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-accent"
          >
            View my work
          </Link>
        </div>
      </div>

      {/* ── Mockup image ─────────────────────────────────────────── */}
      <div className="relative z-10 mx-6 sm:mx-12 lg:mx-20 flex-1">
        {/* Purple glow border */}
        <div className="relative rounded-2xl p-[1px]" style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.8), rgba(124,58,237,0.4), rgba(168,85,247,0.8))",
          boxShadow: "0 0 60px rgba(168,85,247,0.5), 0 0 120px rgba(124,58,237,0.25), inset 0 0 30px rgba(168,85,247,0.1)",
        }}>
          <div className="relative overflow-hidden rounded-2xl">
            {mounted && (
              <Image
                src={mockupSrc}
                alt="Portfolio preview"
                width={1400}
                height={900}
                quality={100}
                priority
                className="relative z-10 w-full object-cover object-top select-none"
              />
            )}
            {!mounted && (
              <div className="w-full aspect-video bg-muted animate-pulse rounded-2xl" />
            )}
          </div>
        </div>
        {/* Outer ambient glow */}
        <div className="absolute -inset-4 rounded-3xl pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,85,247,0.15) 0%, transparent 70%)",
          filter: "blur(20px)",
        }} />
      </div>

    </div>
  );
}
