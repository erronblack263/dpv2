"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  HardDrive,
  Layers3,
  Monitor,
  Play,
  Terminal,
} from "lucide-react";
import { useState } from "react";

const DEMO_FRAMES = [
  {
    title: "SageOS desktop overview",
    category: "Overview",
    description: "A guided walkthrough of the SageOS desktop environment.",
    icon: Monitor,
  },
  {
    title: "System tools",
    category: "System tools",
    description: "A closer look at the terminal, file manager, and notepad tools.",
    icon: Terminal,
  },
  {
    title: "Runtime and processes",
    category: "Kernel",
    description: "An overview of process scheduling and system monitoring concepts.",
    icon: Cpu,
  },
  {
    title: "Desktop applications",
    category: "Desktop",
    description: "A preview of the applications and interaction model planned for SageOS.",
    icon: Monitor,
  },
] as const;

const DEMO_CATEGORIES = [
  "All demos",
  "Overview",
  "System tools",
  "Kernel",
  "Desktop",
] as const;

const WORKFLOW = [
  {
    title: "Kernel foundation",
    description: "Memory management and process control form the systems layer.",
    icon: HardDrive,
  },
  {
    title: "System utilities",
    description: "Terminal, file management, and core tools expose the runtime.",
    icon: Terminal,
  },
  {
    title: "Desktop shell",
    description: "A focused desktop environment brings the operating system to life.",
    icon: Monitor,
  },
  {
    title: "Application layer",
    description: "Small native applications demonstrate the platform in use.",
    icon: Cpu,
  },
] as const;

const DETAILS = [
  { label: "Category", value: "Operating System", icon: Layers3 },
  { label: "Platform", value: "SageOS", icon: Monitor },
  { label: "Language", value: "C / Assembly", icon: Terminal },
  { label: "Scope", value: "Kernel and desktop", icon: HardDrive },
] as const;

export default function SageOSDemoPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof DEMO_CATEGORIES)[number]>("All demos");
  const [activeFrame, setActiveFrame] = useState(0);
  const [previewPage, setPreviewPage] = useState(0);
  const filteredFrames =
    activeCategory === "All demos"
      ? DEMO_FRAMES
      : DEMO_FRAMES.filter((demoFrame) => demoFrame.category === activeCategory);
  const frame = filteredFrames[activeFrame] ?? filteredFrames[0];
  const previewPageSize = 3;
  const previewPageCount = Math.ceil(filteredFrames.length / previewPageSize);
  const visibleFrames = filteredFrames.slice(
    previewPage * previewPageSize,
    (previewPage + 1) * previewPageSize,
  );

  function changeCategory(category: (typeof DEMO_CATEGORIES)[number]) {
    setActiveCategory(category);
    setActiveFrame(0);
    setPreviewPage(0);
  }

  function changePreviewPage(page: number) {
    const nextPage = Math.max(0, Math.min(previewPageCount - 1, page));
    setPreviewPage(nextPage);
    setActiveFrame(nextPage * previewPageSize);
  }

  function nextFrame() {
    setActiveFrame((index) => (index + 1) % filteredFrames.length);
  }

  function previousFrame() {
    setActiveFrame(
      (index) => (index - 1 + filteredFrames.length) % filteredFrames.length,
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10 font-sans text-foreground transition-colors duration-300">
      <Link
        href="/projects/sageOS/artifacts"
        className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-[0_6px_18px_rgba(124,58,237,0.3)] transition-all hover:-translate-y-0.5 hover:bg-violet-500 sm:bottom-6 sm:right-6"
      >
        Browse artifacts
        <ArrowRight className="size-3.5" aria-hidden="true" />
      </Link>

      <div className="mx-auto max-w-7xl px-5 pt-3 sm:px-8 lg:px-12">
        <div className="grid items-start gap-5 lg:grid-cols-12">
          <section className="relative lg:col-span-4">
            <div className="pointer-events-none absolute -left-10 -top-10 size-64 rounded-full bg-violet-500/15 blur-3xl" />
            <div className="relative z-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Back to Projects
              </Link>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">
                SAGEOS · VIDEO DEMO
              </p>
              <h1 className="mt-2 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
                A closer look
                <br />
                at SageOS.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                A visual walkthrough of the custom operating system, from its
                desktop shell to the low-level systems work underneath.
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold text-violet-500">
                  <Cpu className="size-3" /> Kernel work
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold text-indigo-500">
                  <Monitor className="size-3" /> Desktop UX
                </span>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-2 lg:col-span-5">
            <div
              data-demo-video
              className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl border border-violet-500/25 bg-zinc-950 shadow-[0_0_40px_rgba(124,58,237,0.18)]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:28px_28px]" />
              <div className="relative flex flex-col items-center gap-3 text-center">
                <div className="flex size-14 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/15 text-violet-300">
                  <Play className="ml-1 size-6 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Video demo placeholder</p>
                  <p className="mt-1 text-xs text-zinc-400">Recording will be added soon</p>
                </div>
              </div>
            </div>

            <div
              data-demo-details
              className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card/80 p-3 backdrop-blur-md"
            >
              <div className="min-w-0">
                <h2 className="truncate text-xs font-bold text-foreground">
                  {frame.title}
                </h2>
                <p className="mt-0.5 line-clamp-1 text-[10px] text-muted-foreground">
                  {frame.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="font-mono text-[11px] font-bold">
                  {activeFrame + 1}/{DEMO_FRAMES.length}
                </span>
                <button
                  type="button"
                  onClick={previousFrame}
                  className="rounded-md border border-violet-500/30 bg-violet-500/10 p-1 text-violet-500 hover:bg-violet-500/20"
                  aria-label="Previous demo section"
                >
                  <ChevronLeft className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextFrame}
                  className="rounded-md border border-violet-500/30 bg-violet-500/10 p-1 text-violet-500 hover:bg-violet-500/20"
                  aria-label="Next demo section"
                >
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>
          </section>

          <section className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-4 shadow-xl">
              <div className="mb-3 flex items-center gap-2 border-b border-border pb-2.5">
                <Calendar className="size-3.5 text-violet-500" />
                <h2 className="text-xs font-bold tracking-wide">Project Details</h2>
              </div>
              <div className="flex flex-col gap-2.5 text-[11px] text-muted-foreground">
                {DETAILS.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-1.5">
                      <Icon className="size-3 shrink-0" />
                      {label}
                    </span>
                    <span className="text-right font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-5 flex items-center gap-0 overflow-x-auto border-y border-border py-3 scrollbar-none">
          {DEMO_CATEGORIES.map((category, index) => {
            const isActive = activeCategory === category;
            const isCompleted = DEMO_CATEGORIES.indexOf(activeCategory) > index;
            let stepClassName =
              "border-border bg-muted text-muted-foreground group-hover:border-violet-500/60 group-hover:text-violet-500";
            if (isActive) {
              stepClassName =
                "border-violet-500 bg-violet-500 text-white shadow-[0_0_12px_rgba(124,58,237,0.4)]";
            } else if (isCompleted) {
              stepClassName =
                "border-violet-500/60 bg-violet-500/15 text-violet-500";
            }
            return (
              <div key={category} className="flex shrink-0 items-center">
                <button
                  type="button"
                  onClick={() => changeCategory(category)}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${stepClassName}`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <span className={`whitespace-nowrap text-[10px] font-semibold ${isActive ? "text-violet-500" : "text-muted-foreground group-hover:text-foreground"}`}>
                    {category}
                  </span>
                </button>
                {index < DEMO_CATEGORIES.length - 1 && (
                  <span className={`mx-2 mb-4 h-0.5 w-6 rounded-full sm:w-10 ${isCompleted ? "bg-violet-500/60" : "bg-border"}`} />
                )}
              </div>
            );
          })}
        </div>

        <section className="mt-5 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-md sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-500">Demo preview frames</h2>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>{filteredFrames.length} sections in {activeCategory}</span>
              {previewPageCount > 1 && (
                <span className="flex items-center gap-1.5 border-l border-border pl-2">
                  <button type="button" onClick={() => changePreviewPage(previewPage - 1)} disabled={previewPage === 0} className="flex size-6 items-center justify-center rounded-md border border-violet-500/30 text-violet-500 hover:bg-violet-500/10 disabled:pointer-events-none disabled:opacity-30" aria-label="Previous demo page">
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <span className="font-mono">{previewPage + 1}/{previewPageCount}</span>
                  <button type="button" onClick={() => changePreviewPage(previewPage + 1)} disabled={previewPage === previewPageCount - 1} className="flex size-6 items-center justify-center rounded-md border border-violet-500/30 text-violet-500 hover:bg-violet-500/10 disabled:pointer-events-none disabled:opacity-30" aria-label="Next demo page">
                    <ChevronRight className="size-3.5" />
                  </button>
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {visibleFrames.map((demoFrame, index) => {
              const absoluteIndex = previewPage * previewPageSize + index;
              const Icon = demoFrame.icon;
              const active = absoluteIndex === activeFrame;
              return (
                <button
                  key={demoFrame.title}
                  type="button"
                  onClick={() => setActiveFrame(absoluteIndex)}
                  className={`group relative overflow-hidden rounded-xl border p-2 text-left transition-all ${active ? "border-violet-500 bg-violet-500/10 shadow-[0_0_20px_rgba(124,58,237,0.18)]" : "border-border bg-background/50 hover:border-violet-500/40"}`}
                >
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-zinc-950">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:18px_18px]" />
                    <span className="relative flex size-9 items-center justify-center rounded-full bg-violet-500 text-white shadow-lg transition-transform group-hover:scale-110"><Play className="ml-0.5 size-4 fill-white" /></span>
                    <span className="absolute left-2 top-2 rounded-md bg-black/75 px-1.5 py-0.5 font-mono text-[9px] text-white">0{absoluteIndex + 1}</span>
                    <span className="absolute bottom-2 right-2 rounded-md bg-violet-400 px-1.5 py-0.5 text-[9px] font-bold text-white">PLACEHOLDER</span>
                  </div>
                  <p className="mt-2 truncate text-[11px] font-bold">{demoFrame.title}</p>
                  <span className="mt-1 inline-flex w-fit rounded-full border border-violet-500/25 bg-violet-500/10 px-2 py-0.5 text-[9px] font-semibold text-violet-500"><Icon className="mr-1 size-3" />{demoFrame.category}</span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-border bg-card p-4 shadow-xl">
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <Layers3 className="size-3.5 text-violet-500" />
            <h2 className="text-xs font-bold tracking-wide">SageOS build workflow</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map(({ title, description, icon: Icon }, index) => (
              <div key={title} className="flex items-start gap-2.5">
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-full text-white ${index % 2 === 0 ? "bg-violet-500" : "bg-indigo-500"}`}><Icon className="size-3.5" /></span>
                <div><h3 className="text-[11px] font-bold">{title}</h3><p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">{description}</p></div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
          <CheckCircle2 className="size-4 text-violet-500" />
          SageOS demo recordings will be added as each system area is captured.
        </div>
      </div>
    </div>
  );
}
