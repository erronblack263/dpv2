import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Database,
  Images,
  Package,
  Play,
  Server,
} from "lucide-react";

const TECHNOLOGIES = ["C#", "MySQL Server", "CRUD", "Desktop Application"];

export default function InventoryManagementPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-16 text-foreground sm:px-10">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/4 size-[34rem] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />
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
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1.5 text-xs font-bold text-orange-600 dark:text-orange-400">
              <Package className="size-3.5" />
              Desktop inventory platform
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Sage Inventory
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                A C# and MySQL inventory management system for creating,
                viewing, updating, and deleting product records through a clear
                operational workflow.
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
                href="/projects/inventory-management/demo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(234,88,12,0.35)] transition-all hover:bg-orange-500"
              >
                <Play className="size-4" />
                Video demo
              </Link>
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-muted/60 px-6 py-3 text-sm font-semibold text-muted-foreground">
                <Images className="size-4" />
                Artifacts in progress
              </span>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[28px] border border-border bg-card/70 p-4 shadow-[0_25px_70px_rgba(234,88,12,0.18)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-background/80 px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                  <Boxes className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold">Sage Inventory</p>
                  <p className="text-[10px] text-muted-foreground">Operations console</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[10px] font-medium text-emerald-500">
                <span className="size-2 rounded-full bg-emerald-500" />
                Connected
              </span>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-background/70 p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-card p-3">
                  <Database className="size-4 text-orange-500" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Records</p>
                  <p className="mt-1 text-xl font-bold text-foreground">CRUD</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-3">
                  <Server className="size-4 text-amber-500" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Database</p>
                  <p className="mt-1 text-xl font-bold text-amber-500">MySQL</p>
                </div>
              </div>
              <div className="space-y-2 rounded-xl border border-border bg-card p-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Inventory workflow</span>
                  <span className="text-muted-foreground">Ready</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-4/5 rounded-full bg-orange-500" />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>Create</span>
                  <span>Update</span>
                  <span>Delete</span>
                </div>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-xs text-muted-foreground">
                <span>Explore the system demo</span>
                <ArrowRight className="size-4 text-orange-500" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
