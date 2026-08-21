"use client";

import Link from "next/link";
import { ArrowLeft, Code2, Clock, Sparkles, Bell } from "lucide-react";
import { useState } from "react";
import { openContactDrawer } from "@/components/contact-drawer";

export default function PortfolioCMSComingSoon() {
  const [notified, setNotified] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/8 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-xl text-center flex flex-col items-center gap-6">

        {/* Back */}
        <Link href="/projects" className="self-start inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
          <ArrowLeft className="size-3.5" />
          Back to Projects
        </Link>

        {/* Icon */}
        <div className="flex size-20 items-center justify-center rounded-2xl bg-violet-600/10 border border-violet-500/20 text-violet-500">
          <Code2 className="size-10" />
        </div>

        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-xs font-bold text-amber-600 dark:text-amber-400">
          <Clock className="size-3.5" />
          Coming Soon
        </span>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Portfolio CMS
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            A headless CMS for managing portfolio content with a drag-and-drop page builder and live preview. Built with Next.js, Spring Boot, PostgreSQL and TypeScript.
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Development progress</span>
            <span className="font-semibold text-violet-500">35%</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-[45%] rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-1000" />
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap justify-center gap-2">
          {["Next.js", "Spring Boot", "PostgreSQL", "TypeScript"].map((t) => (
            <span key={t} className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
              {t}
            </span>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            onClick={() => { setNotified(true); openContactDrawer(); }}
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
              notified
                ? "bg-emerald-600 text-white"
                : "bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_24px_rgba(124,58,237,0.4)]"
            }`}
          >
            {notified ? (
              <><Sparkles className="size-4" /> You&apos;re on the list!</>
            ) : (
              <><Bell className="size-4" /> Notify me when ready</>
            )}
          </button>
          <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent transition-all">
            Explore other projects
          </Link>
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground mt-2">
          Expected release · Q4 2026
        </p>
      </div>
    </div>
  );
}
