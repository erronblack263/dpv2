import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Images,
  MapPin,
  Play,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

const TECHNOLOGIES = ["Flutter", "Dart", "Firebase", "Geofencing", "Real-time"];

export default function WelfareTrackerPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground sm:px-10">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/4 size-[34rem] -translate-x-1/2 rounded-full bg-sky-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 size-80 rounded-full bg-amber-500/10 blur-[110px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Projects
        </Link>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1.5 text-xs font-bold text-sky-600 dark:text-sky-400">
              <ShieldCheck className="size-3.5" />
              Field safety platform
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                WelfareTracker
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A cross-platform welfare management system that helps field
                teams check in safely, share live location context, and respond
                quickly when an emergency occurs.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {TECHNOLOGIES.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-border bg-muted/80 px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/projects/welfaretracker/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(14,165,233,0.35)] transition-all hover:bg-sky-500"
              >
                <Play className="size-4" />
                Video demo
              </Link>
              <Link
                href="/projects/welfaretracker/artifacts"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-accent"
              >
                <Images className="size-4" />
                View artifacts
              </Link>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[28px] border border-border bg-card/70 p-4 shadow-[0_25px_70px_rgba(14,116,144,0.18)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-background/80 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                  <Smartphone className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">WelfareTracker</p>
                  <p className="text-[10px] text-muted-foreground">Safety operations overview</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500" />
                Monitoring
              </span>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Live field awareness</p>
                  <p className="text-xs text-muted-foreground">Geofences, check-ins, and response context</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Active zones</p>
                  <p className="mt-2 text-xl font-bold text-sky-500">12</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Response</p>
                  <p className="mt-2 text-xl font-bold text-amber-500">SOS</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-300">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="size-4" /> Emergency support is one tap away
                </span>
                <CheckCircle2 className="size-4" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between px-1 text-xs text-muted-foreground">
              <span>Explore the project work</span>
              <ArrowRight className="size-4 text-sky-500" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
