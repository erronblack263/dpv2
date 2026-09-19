import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  Images,
  Monitor,
  Play,
  Users,
} from "lucide-react";

const TECHNOLOGIES = ["React", "TypeScript", "Spring Boot", "SQLite", "Redux"];

export default function SmartHRPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground sm:px-10">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/4 size-[34rem] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 size-80 rounded-full bg-cyan-500/10 blur-[110px]" />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-600 dark:text-violet-400">
              <BriefcaseBusiness className="size-3.5" />
              HR operations platform
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                SmartHR
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A workforce and recruitment platform that brings hiring
                workflows, candidate assessment, employee management, and HR
                reporting into one focused workspace.
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
                href="/projects/smarthr/artifacts"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.35)] transition-all hover:bg-violet-500"
              >
                <Images className="size-4" />
                View artifacts
              </Link>
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-muted/60 px-6 py-3 text-sm font-semibold text-muted-foreground">
                <Play className="size-4" />
                Demo in progress
              </span>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[28px] border border-border bg-card/70 p-4 shadow-[0_25px_70px_rgba(124,58,237,0.18)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-background/80 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  <Monitor className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">SmartHR</p>
                  <p className="text-[10px] text-muted-foreground">HR command centre</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500" />
                Operational
              </span>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <Users className="size-4 text-violet-500" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Candidates</p>
                  <p className="mt-1 text-xl font-bold text-foreground">248</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <BarChart3 className="size-4 text-cyan-500" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Hiring flow</p>
                  <p className="mt-1 text-xl font-bold text-cyan-500">84%</p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Recruitment pipeline</span>
                  <span className="text-muted-foreground">This month</span>
                </div>
                <div className="mt-4 flex items-end gap-2">
                  {[42, 62, 48, 78, 68, 90, 74].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t-md bg-violet-500/70" style={{ height: `${height}px` }} />
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
                <span>Explore HR workflows and screens</span>
                <ArrowRight className="size-4 text-violet-500" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
