import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Cpu,
  Images,
  Monitor,
  Play,
  Terminal,
} from "lucide-react";

const TECHNOLOGIES = ["C", "Assembly", "x86", "Kernel", "Systems Programming"];

export default function SageOSPage() {
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
              <Cpu className="size-3.5" />
              Systems programming project
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                SageOS
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A custom operating system built from the ground up, exploring
                kernel development, memory management, process scheduling, and
                desktop system interfaces.
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
                href="/projects/sageOS/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,58,237,0.35)] transition-all hover:bg-violet-500"
              >
                <Play className="size-4" />
                Video demo
              </Link>
              <Link
                href="/projects/sageOS/artifacts"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-accent"
              >
                <Images className="size-4" />
                View artifacts
              </Link>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[28px] border border-border bg-card/70 p-4 shadow-[0_25px_70px_rgba(124,58,237,0.18)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-background/80 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  <Monitor className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">SageOS</p>
                  <p className="text-[10px] text-muted-foreground">Kernel workspace</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500" />
                Experimental
              </span>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-[#080b12] p-4 font-mono text-xs text-slate-300 shadow-inner">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-400" />
                  sageos-kernel
                </span>
                <span>tty0</span>
              </div>
              <p className="text-violet-400">SageOS boot sequence</p>
              <p className="text-slate-500">[ OK ] Initialising GDT</p>
              <p className="text-slate-500">[ OK ] Enabling paging</p>
              <p className="text-emerald-400">[ OK ] Starting kernel</p>
              <p className="pt-2 text-cyan-300">sage@kernel:~$ explore</p>
              <div className="grid grid-cols-2 gap-3 pt-2 font-sans">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Code2 className="size-4 text-violet-400" />
                  <p className="mt-2 text-[10px] text-slate-500">Core language</p>
                  <p className="mt-1 text-sm font-bold text-white">C / x86</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <Terminal className="size-4 text-cyan-400" />
                  <p className="mt-2 text-[10px] text-slate-500">System tools</p>
                  <p className="mt-1 text-sm font-bold text-white">7 modules</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 font-sans text-xs text-slate-400">
                <span>Explore the system build</span>
                <ArrowRight className="size-4 text-violet-400" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
