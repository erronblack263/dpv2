import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Images,
  Leaf,
  Play,
  Smartphone,
} from "lucide-react";

export default function GreenSpacePage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground sm:px-10">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/4 size-[34rem] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <Leaf className="size-3.5" />
              Mobile agri-tech project
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                GreenSpace
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A React Native app powered by Sage, a machine-learning system
                that classifies soil conditions and helps guide better crop
                decisions.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["React Native", "TypeScript", "Python", "Machine Learning", "Supabase"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-muted/80 px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href="/projects/greenspace/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(16,185,129,0.35)] transition-all hover:bg-emerald-500"
              >
                <Play className="size-4" />
                Video demo
              </Link>
              <Link
                href="/projects/greenspace/artifacts"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-accent"
              >
                <Images className="size-4" />
                View artifacts
              </Link>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[28px] border border-border bg-card/70 p-4 shadow-[0_25px_70px_rgba(5,150,105,0.18)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-background/80 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Smartphone className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">GreenSpace</p>
                  <p className="text-[10px] text-muted-foreground">Project overview</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
              <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <BrainCircuit className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Sage soil intelligence</p>
                  <p className="text-xs text-muted-foreground">AI-assisted classification workflow</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Classification</p>
                  <p className="mt-2 text-xl font-bold text-emerald-500">96%</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Field tests</p>
                  <p className="mt-2 text-xl font-bold text-foreground">03</p>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
                <span>Explore the project work</span>
                <ArrowRight className="size-4 text-emerald-500" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
