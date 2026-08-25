"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Cpu,
  HardDrive,
  Layers3,
  Monitor,
  Terminal,
  X,
  Eye,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { animate, stagger } from "animejs";

type Artifact = {
  title: string;
  description: string;
  icon: typeof Terminal;
  images?: { src: string; title: string }[];
};

const ARTIFACTS: Artifact[] = [
  {
    title: "Home Screen",
    description:
      "The SageOS desktop home screen, designed as the starting point for exploring the operating system and its core tools.",
    icon: Terminal,
    images: [
      {
        title: "Home Screen 1",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475347/Screenshot_2026-08-17_113653_x1ot2e.png",
      },
      {
        title: "Home Screen 2",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475346/Screenshot_2026-08-17_113834_kmds6m.png",
      },
    ],
  },
  {
    title: "Memory Manager",
    description:
      "Low-level memory allocation and paging experiments designed for predictable resource management.",
    icon: HardDrive,
  },
  {
    title: "Process Scheduler",
    description:
      "Core scheduling concepts brought to life through process queues, context switching, and task states.",
    icon: Cpu,
  },
  {
    title: "Notepad",
    description:
      "A lightweight desktop notepad for creating, editing, and saving text within SageOS.",
    icon: Terminal,
    images: [
      {
        title: "Notepad",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475320/Screenshot_2026-08-17_114023_gdsu32.png",
      },
    ],
  },
  {
    title: "File Manager",
    description:
      "A desktop file manager for browsing folders, managing files, and navigating the SageOS filesystem.",
    icon: HardDrive,
    images: [
      {
        title: "File Manager",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475316/Screenshot_2026-08-17_114110_nmrwl9.png",
      },
    ],
  },
  {
    title: "Terminal",
    description:
      "A command-line interface for running system commands and interacting directly with the SageOS environment.",
    icon: Terminal,
    images: [
      {
        title: "Terminal",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475314/Screenshot_2026-08-17_114343_yhhuyz.png",
      },
    ],
  },
  {
    title: "System Monitor",
    description:
      "A system monitor for observing active processes, resource usage, and the runtime state of SageOS.",
    icon: Cpu,
    images: [
      {
        title: "System Monitor",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475313/Screenshot_2026-08-17_114627_cq7zoe.png",
      },
    ],
  },
  {
    title: "Music Player",
    description:
      "A desktop music player demonstrating media controls and application-level interaction in SageOS.",
    icon: Terminal,
    images: [
      {
        title: "Music Player",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475309/Screenshot_2026-08-17_114737_pvoxrk.png",
      },
    ],
  },
  {
    title: "TCP Stack",
    description:
      "A networking artifact exploring TCP stack behavior and the foundations of network communication in SageOS.",
    icon: Cpu,
    images: [
      {
        title: "TCP Stack",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1787475308/tcp_stack_edorl3.png",
      },
    ],
  },
];

export default function SageOSArtifactsPage() {
  const [activeArtifact, setActiveArtifact] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [galleryPage, setGalleryPage] = useState(0);
  const artifact = ARTIFACTS[activeArtifact];
  const ArtifactIcon = artifact.icon;
  const activeImage = artifact.images?.[0];
  const galleryImages = ARTIFACTS.flatMap((item) => item.images ?? []);
  const galleryPageSize = 4;
  const galleryPageCount = Math.ceil(galleryImages.length / galleryPageSize);
  const visibleGalleryImages = galleryImages.slice(
    galleryPage * galleryPageSize,
    (galleryPage + 1) * galleryPageSize,
  );

  useEffect(() => {
    const monitor = document.querySelector<HTMLElement>("[data-sage-monitor]");
    if (!monitor) return;

    const animation = animate(monitor, {
      opacity: [0.35, 1],
      translateY: [8, 0],
      scale: [0.985, 1],
      duration: 440,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, [activeArtifact]);

  useEffect(() => {
    const tabs = document.querySelectorAll<HTMLElement>("[data-sage-tab]");
    const images = document.querySelectorAll<HTMLElement>(
      "[data-sage-gallery-image]",
    );
    if (!tabs.length && !images.length) return;

    const animation = animate([...tabs, ...images], {
      opacity: [0, 1],
      translateY: [8, 0],
      delay: stagger(45),
      duration: 360,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, [activeArtifact, galleryPage]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <div className="sticky top-4 z-30 w-full border-b border-border bg-card/95 px-4 py-1 backdrop-blur-md sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {ARTIFACTS.map((item, index) => (
              <button
                key={item.title}
                data-sage-tab
                type="button"
                onClick={() => setActiveArtifact(index)}
                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                  index === activeArtifact
                    ? "border-violet-500 bg-violet-600 text-white shadow-lg shadow-violet-500/25"
                    : "border-border bg-muted/80 text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
          <span className="hidden shrink-0 text-[11px] font-medium text-violet-400 sm:inline-flex sm:items-center sm:gap-1.5">
            <span className="size-1.5 animate-ping rounded-full bg-violet-500" />
            Showing: {artifact.title}
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-8 lg:px-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to Projects
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <section>
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
                <Layers3 className="size-3.5" />
                Systems programming
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                <Calendar className="size-3.5" />
                2026
              </span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight text-violet-400 drop-shadow-[0_0_25px_rgba(124,58,237,0.25)] sm:text-6xl">
              SageOS
            </h1>
            <p className="mt-2 text-lg font-medium text-muted-foreground sm:text-xl">
              A custom operating system made from scratch
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              A ground-up exploration of operating system design, from
              bootstrapping and kernel architecture to memory management and
              process scheduling.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["C", "Assembly", "x86", "Kernel", "Systems Programming"].map(
                (technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {technology}
                  </span>
                ),
              )}
            </div>
          </section>

          <section
            data-sage-monitor
            className="relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-violet-500/[0.08] via-card to-cyan-500/[0.06] p-5 shadow-[0_0_70px_rgba(124,58,237,0.12)]"
          >
            <div className="absolute -left-20 top-12 size-56 rounded-full bg-violet-500/20 blur-[90px]" />
            <div className="absolute -right-20 bottom-4 size-56 rounded-full bg-cyan-500/15 blur-[90px]" />

            <div className="relative w-full max-w-[600px]">
              <div className="rounded-2xl border-[10px] border-zinc-900 bg-zinc-950 p-2 shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_45px_rgba(124,58,237,0.25)]">
                {activeImage ? (
                  <button
                    type="button"
                    onClick={() => setLightboxSrc(activeImage.src)}
                    className="group relative block aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/10 bg-[#080b12]"
                    aria-label="Open SageOS Home Screen image"
                  >
                    <Image
                      src={activeImage.src}
                      alt={activeImage.title}
                      fill
                      priority
                      quality={75}
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[10px] font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                      Open full image
                    </span>
                  </button>
                ) : (
                  <div className="aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-[#080b12] p-4 font-mono text-xs text-slate-300 sm:p-6 sm:text-sm">
                    <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] text-slate-500 sm:text-xs">
                      <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-400" />
                        sageos-kernel
                      </span>
                      <span>tty0</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-violet-400">SageOS boot sequence</p>
                      <p className="text-slate-500">[ OK ] Initialising GDT</p>
                      <p className="text-slate-500">[ OK ] Enabling paging</p>
                      <p className="text-emerald-400">[ OK ] Starting kernel</p>
                      <p className="pt-3 text-cyan-300">
                        sage@kernel:~${" "}
                        {artifact.title.toLowerCase().replace(" ", "-")}
                      </p>
                      <p className="max-w-lg leading-relaxed text-slate-400">
                        {artifact.description}
                      </p>
                      <p className="pt-3 text-violet-300">
                        status: experimental
                      </p>
                      <span className="inline-block h-4 w-2 animate-pulse bg-cyan-300 align-middle" />
                    </div>
                  </div>
                )}
              </div>

              <div className="mx-auto h-5 w-[72%] bg-gradient-to-b from-zinc-800 to-zinc-950 shadow-lg" />
              <div className="mx-auto h-3 w-[38%] rounded-b-xl bg-zinc-800 shadow-xl" />
            </div>
          </section>
        </div>

        <section className="mt-10 border-t border-border pt-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-violet-500" />
              <h2 className="text-lg font-extrabold tracking-wide text-foreground">
                Screens
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
                <button
                  type="button"
                  className="rounded-md bg-background p-1.5 text-violet-500 shadow-sm"
                  title="Grid view"
                  aria-label="Grid view"
                >
                  <LayoutGrid className="size-3" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setGalleryPage((page) => Math.max(0, page - 1))
                  }
                  disabled={galleryPage === 0}
                  className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                  title="Previous gallery page"
                  aria-label="Previous gallery page"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <span className="text-xs text-muted-foreground">
                  {galleryPage + 1} / {galleryPageCount}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setGalleryPage((page) =>
                      Math.min(galleryPageCount - 1, page + 1),
                    )
                  }
                  disabled={galleryPage === galleryPageCount - 1}
                  className="flex size-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                  title="Next gallery page"
                  aria-label="Next gallery page"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {visibleGalleryImages.map(({ src, title }, index) => (
              <div
                key={src}
                data-sage-gallery-image
                onClick={() => setLightboxSrc(src)}
                className="group relative flex min-w-0 flex-col rounded-xl border border-violet-500 bg-card p-2 shadow-[0_0_25px_rgba(124,58,237,0.2)] ring-1 ring-violet-500/40 sm:rounded-2xl sm:p-3"
              >
                <div className="absolute left-3 top-3 z-20 flex size-5 items-center justify-center rounded-md bg-violet-600 text-[9px] font-bold text-white sm:left-5 sm:top-5 sm:size-6 sm:rounded-lg sm:text-[11px]">
                  {(galleryPage * galleryPageSize + index + 1)
                    .toString()
                    .padStart(2, "0")}
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
                  <Image
                    src={src}
                    alt={title}
                    fill
                    quality={75}
                    sizes="320px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => setLightboxSrc(src)}
                    className="absolute bottom-2 right-2 z-20 flex size-7 items-center justify-center rounded-lg border border-white/20 bg-black/70 text-white opacity-80 backdrop-blur-md transition-all hover:bg-violet-500 hover:opacity-100"
                    title={`Expand ${title}`}
                    aria-label={`Expand ${title}`}
                  >
                    <Eye className="size-3.5" />
                  </button>
                </div>
                <div className="mt-2 flex min-w-0 flex-col gap-0.5 sm:mt-2.5">
                  <p className="truncate text-[11px] font-bold text-foreground sm:text-xs">
                    {title}
                  </p>
                  <p className="truncate font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                    SageOS desktop interface
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 flex items-center justify-between border-t border-border pt-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="size-4 text-emerald-400" />
            Building from the ground up
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-violet-400 transition-colors hover:text-violet-300"
          >
            Explore all projects
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label="SageOS Home Screen preview"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute right-5 top-5 z-[110] inline-flex h-10 items-center gap-2 rounded-full border border-red-400/50 bg-red-600 px-4 text-xs font-semibold text-white shadow-xl shadow-red-950/40 backdrop-blur-md transition-colors hover:bg-red-500"
            aria-label="Close image preview"
            title="Close image preview"
          >
            <X className="size-5" />
            <span>Close</span>
          </button>
          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="SageOS artifact preview"
              fill
              quality={100}
              sizes="95vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
