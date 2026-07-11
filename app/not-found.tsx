"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, Monitor, Smartphone } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-4xl rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left panel */}
          <div className="flex flex-col justify-between gap-8 p-8 border-b border-border md:border-b-0 md:border-r">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
                System Breakpoint
              </p>
              <h1 className="text-2xl font-extrabold leading-snug text-foreground">
                Lost your connection line? Keep exploring our stack.
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                While we get you back on track, check out some of the core
                technologies used to build this portfolio.
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                <Monitor className="size-4 text-primary" />
                React / Next.js
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground">
                <Smartphone className="size-4 text-primary" />
                Flutter / Dart
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex flex-col justify-between gap-8 p-8">
            <div>
              <p className="text-8xl font-black text-foreground leading-none">
                404
              </p>
              <p className="mt-2 text-xl font-bold text-foreground">
                Page Not Found
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                The path or directory you are requesting doesn&apos;t exist.
              </p>
            </div>

            {/* Redirect status */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="flex size-5 items-center justify-center rounded-full border border-border text-xs">
                    ↺
                  </span>
                  Redirect paused
                </div>
                <span className="text-muted-foreground">›</span>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-foreground text-background py-2.5 text-sm font-semibold transition-colors hover:opacity-90"
                >
                  <Home className="size-4" />
                  Return Home
                </Link>
                <button
                  onClick={() => router.back()}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-background text-foreground py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
                >
                  <ArrowLeft className="size-4" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
