"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { animate, stagger } from "animejs";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FolderOpen,
  Layers,
  MapPin,
  Play,
  ShieldAlert,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { VideoPlayer } from "@/components/video-player";

function streamUrl(src: string) {
  return src.replace(
    "/video/upload/",
    "/video/upload/q_auto,f_auto,vc_auto,fl_progressive/",
  );
}

function cloudinaryThumb(videoUrl: string) {
  return videoUrl
    .replace("/video/upload/", "/video/upload/so_0,w_600,q_auto,f_auto/")
    .replace(/\.mp4$/, ".jpg");
}

const DEMO_FRAMES = [
  {
    title: "Safe Zone Setup",
    category: "Safety setup",
    description:
      "Set up a safe zone and configure the field check-in boundary.",
    src: "https://res.cloudinary.com/virfpzu4/image/upload/w_900,q_auto,f_auto/v1784633671/check_in_pivmdg.jpg",
    video:
      "https://res.cloudinary.com/virfpzu4/video/upload/v1787479196/parent-setting_up_sz_j9wopf.mp4",
    poster:
      "https://res.cloudinary.com/virfpzu4/video/upload/so_0,w_600,q_auto,f_auto/v1787479196/parent-setting_up_sz_j9wopf.jpg",
  },
  {
    title: "SOS Alert",
    category: "Emergency response",
    description: "Emergency response tools stay one tap away in the field.",
    src: "https://res.cloudinary.com/virfpzu4/image/upload/w_900,q_auto,f_auto/v1784633670/sos-alert_tcqzwh.jpg",
    video:
      "https://res.cloudinary.com/virfpzu4/video/upload/v1787480125/sos_alert_ui8s9q.mp4",
    poster:
      "https://res.cloudinary.com/virfpzu4/video/upload/so_0,w_600,q_auto,f_auto/v1787480125/sos_alert_ui8s9q.jpg",
  },
  {
    title: "Parent SOS Alert",
    category: "Emergency response",
    description:
      "A parent-facing SOS alert flow for raising and coordinating emergency support.",
    src: "https://res.cloudinary.com/virfpzu4/image/upload/w_900,q_auto,f_auto/v1784633670/sos-alert_tcqzwh.jpg",
    video:
      "https://res.cloudinary.com/virfpzu4/video/upload/v1787484343/parent_sos_alert_sijc1u.mp4",
    poster:
      "https://res.cloudinary.com/virfpzu4/video/upload/so_0,w_600,q_auto,f_auto/v1787484343/parent_sos_alert_sijc1u.jpg",
  },
  {
    title: "2D/3D Map View",
    category: "Location tracking",
    description:
      "Teams can review location context and coordinate support across 2D and 3D map views.",
    src: "https://res.cloudinary.com/virfpzu4/image/upload/w_900,q_auto,f_auto/v1784715547/location_details_vam4jx.jpg",
    video:
      "https://res.cloudinary.com/virfpzu4/video/upload/v1787481033/map-view_ijp0kd.mp4",
    poster:
      "https://res.cloudinary.com/virfpzu4/video/upload/so_0,w_600,q_auto,f_auto/v1787481033/map-view_ijp0kd.jpg",
  },
  {
    title: "Geofence Screen",
    category: "Location tracking",
    description:
      "Configure and monitor location boundaries for safer field operations.",
    src: "https://res.cloudinary.com/virfpzu4/image/upload/w_900,q_auto,f_auto/v1784715547/location_details_vam4jx.jpg",
    video:
      "https://res.cloudinary.com/virfpzu4/video/upload/v1787483668/geofence_a8tqxs.mp4",
    poster:
      "https://res.cloudinary.com/virfpzu4/video/upload/so_0,w_600,q_auto,f_auto/v1787483668/geofence_a8tqxs.jpg",
  },
  {
    title: "Child Check In",
    category: "Check-in flows",
    description:
      "A guided child check-in flow for safer field welfare tracking.",
    src: "https://res.cloudinary.com/virfpzu4/image/upload/w_900,q_auto,f_auto/v1784633671/check_in_pivmdg.jpg",
    video:
      "https://res.cloudinary.com/virfpzu4/video/upload/v1787481621/safety-check_in_moel4w.mp4",
    poster:
      "https://res.cloudinary.com/virfpzu4/video/upload/so_0,w_600,q_auto,f_auto/v1787481621/safety-check_in_moel4w.jpg",
  },
  {
    title: "Parent Schedule Check In",
    category: "Check-in flows",
    description:
      "A scheduled parent check-in flow for coordinated welfare monitoring.",
    src: "https://res.cloudinary.com/virfpzu4/image/upload/w_900,q_auto,f_auto/v1784633671/check_in_pivmdg.jpg",
    video:
      "https://res.cloudinary.com/virfpzu4/video/upload/v1787482194/parent-schedule-check_in_owf772.mp4",
    poster:
      "https://res.cloudinary.com/virfpzu4/video/upload/so_0,w_600,q_auto,f_auto/v1787482194/parent-schedule-check_in_owf772.jpg",
  },
];

const DEMO_CATEGORIES = [
  "All demos",
  "Safety setup",
  "Check-in flows",
  "Emergency response",
  "Location tracking",
] as const;

const WORKFLOW = [
  {
    title: "Check in",
    description: "Staff share their field status",
    icon: Smartphone,
  },
  {
    title: "Track location",
    description: "Teams see live location context",
    icon: MapPin,
  },
  {
    title: "Raise an alert",
    description: "Emergency support is one tap away",
    icon: ShieldAlert,
  },
  {
    title: "Coordinate response",
    description: "Managers act with clear context",
    icon: Users,
  },
];

export default function WelfareTrackerDemoPage() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof DEMO_CATEGORIES)[number]>("All demos");
  const [activeFrame, setActiveFrame] = useState(0);
  const [previewPage, setPreviewPage] = useState(0);
  const filteredFrames =
    activeCategory === "All demos"
      ? DEMO_FRAMES
      : DEMO_FRAMES.filter(
          (demoFrame) => demoFrame.category === activeCategory,
        );
  const frame = filteredFrames[activeFrame] ?? filteredFrames[0];
  const previewPageSize = 3;
  const previewPageCount = Math.ceil(filteredFrames.length / previewPageSize);
  const visibleFrames = filteredFrames.slice(
    previewPage * previewPageSize,
    (previewPage + 1) * previewPageSize,
  );

  useEffect(() => {
    const media = document.querySelector<HTMLElement>("[data-demo-video]");
    if (!media) return;

    const animation = animate(media, {
      opacity: [0.35, 1],
      scale: [0.985, 1],
      duration: 420,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, [activeFrame, activeCategory]);

  useEffect(() => {
    const surfaces = document.querySelectorAll<HTMLElement>(
      "[data-demo-details], [data-demo-workflow], [data-demo-preview-card]",
    );
    if (!surfaces.length) return;

    const animation = animate(surfaces, {
      opacity: [0, 1],
      translateY: [10, 0],
      delay: stagger(45),
      duration: 400,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, [activeFrame, activeCategory, previewPage]);

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
      <div className="mx-auto max-w-7xl px-5 pt-3 sm:px-8 lg:px-12">
        <div className="grid items-start gap-5 lg:grid-cols-12">
          <section className="relative lg:col-span-4">
            <div className="pointer-events-none absolute -left-10 -top-10 size-64 rounded-full bg-sky-500/15 blur-3xl" />
            <div className="relative z-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Back to Projects
              </Link>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500">
                WELFARETRACKER · DEMO
              </p>
              <h1 className="mt-2 text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl">
                Safety workflows
                <br />
                for the field.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                A welfare management system built to help field teams check in,
                share location context, and respond quickly when support is
                needed.
              </p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-1 text-[10px] font-semibold text-sky-500">
                  <MapPin className="size-3" /> Live tracking
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-2.5 py-1 text-[10px] font-semibold text-yellow-500">
                  <ShieldAlert className="size-3" /> SOS response
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-[10px] font-semibold text-indigo-400">
                  <Zap className="size-3" /> Geofencing
                </span>
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-2 lg:col-span-5">
            <div
              data-demo-video
              className="relative flex aspect-[9/16] max-h-[70vh] w-full items-center justify-center overflow-hidden rounded-xl border border-sky-500/25 bg-slate-950 shadow-[0_0_40px_rgba(14,165,233,0.18)] sm:aspect-video sm:max-h-none"
            >
              <Image
                src={"video" in frame && frame.video ? frame.poster : frame.src}
                alt={frame.title}
                fill
                priority
                quality={75}
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="object-cover opacity-80"
              />
              {"video" in frame && frame.video ? (
                <div className="absolute inset-0">
                  <VideoPlayer
                    key={frame.video}
                    src={streamUrl(frame.video)}
                    thumbnail={frame.poster ?? cloudinaryThumb(frame.video)}
                    title={frame.title}
                  />
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-slate-950/45" />
                  <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                    <span className="flex size-16 items-center justify-center rounded-full bg-sky-400 text-slate-950 shadow-[0_0_30px_rgba(56,189,248,0.55)]">
                      <Play className="ml-1 size-7 fill-current" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">
                        Preview frame
                      </p>
                      <p className="mt-1 text-xs text-slate-300">
                        {frame.title}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div
              data-demo-details
              className="flex items-center justify-between rounded-xl border border-border bg-card/80 p-3 backdrop-blur-md"
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
                  {activeFrame + 1}/{filteredFrames.length}
                </span>
                <button
                  type="button"
                  onClick={previousFrame}
                  className="rounded-md border border-sky-500/30 bg-sky-500/10 p-1 text-sky-500 hover:bg-sky-500/20"
                  aria-label="Previous preview"
                >
                  <ChevronLeft className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={nextFrame}
                  className="rounded-md border border-sky-500/30 bg-sky-500/10 p-1 text-sky-500 hover:bg-sky-500/20"
                  aria-label="Next preview"
                >
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>
          </section>

          <aside
            data-demo-details
            className="flex flex-col gap-3 lg:col-span-3"
          >
            <div className="rounded-xl border border-border bg-card p-4 shadow-xl">
              <div className="mb-3 flex items-center gap-2 border-b border-border pb-2.5">
                <Calendar className="size-3.5 text-sky-500" />
                <h2 className="text-xs font-bold tracking-wide">
                  Project Details
                </h2>
              </div>
              <div className="flex flex-col gap-3 text-[11px] text-muted-foreground">
                <div className="flex justify-between gap-3">
                  <span className="flex items-center gap-1.5">
                    <Layers className="size-3.5" /> Category
                  </span>
                  <strong className="text-foreground">Welfare</strong>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="size-3.5" /> Platform
                  </span>
                  <strong className="text-foreground">Mobile</strong>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="flex items-center gap-1.5">
                    <FolderOpen className="size-3.5" /> Framework
                  </span>
                  <strong className="text-foreground">Flutter</strong>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> Status
                  </span>
                  <strong className="text-yellow-500">In progress</strong>
                </div>
              </div>
            </div>

            <Link
              href="/projects/welfaretracker/artifacts"
              className="group rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 transition-colors hover:bg-yellow-500/15"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-yellow-500">
                  Explore screen artifacts
                </span>
                <ArrowRight className="size-4 text-yellow-500 transition-transform group-hover:translate-x-1" />
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                Browse the authentication, tracking, SOS, profile, and theme
                screens.
              </p>
            </Link>
          </aside>
        </div>

        <div className="mt-5 flex items-center gap-0 overflow-x-auto border-y border-border py-3 scrollbar-none">
          {DEMO_CATEGORIES.map((category, index) => {
            const isActive = activeCategory === category;
            const isCompleted = DEMO_CATEGORIES.indexOf(activeCategory) > index;

            return (
              <div key={category} className="flex shrink-0 items-center">
                <button
                  type="button"
                  onClick={() => changeCategory(category)}
                  className="group flex flex-col items-center gap-1.5"
                >
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${
                      isActive
                        ? "border-sky-500 bg-sky-500 text-slate-950 shadow-[0_0_12px_rgba(14,165,233,0.4)]"
                        : isCompleted
                          ? "border-sky-500/60 bg-sky-500/15 text-sky-500"
                          : "border-border bg-muted text-muted-foreground group-hover:border-sky-500/60 group-hover:text-sky-500"
                    }`}
                  >
                    {isCompleted ? "✓" : index + 1}
                  </span>
                  <span
                    className={`whitespace-nowrap text-[10px] font-semibold ${isActive ? "text-sky-500" : "text-muted-foreground group-hover:text-foreground"}`}
                  >
                    {category}
                  </span>
                </button>
                {index < DEMO_CATEGORIES.length - 1 && (
                  <span
                    className={`mx-2 mb-4 h-0.5 w-6 rounded-full sm:w-10 ${isCompleted ? "bg-sky-500/60" : "bg-border"}`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <section className="mt-5 rounded-xl border border-border bg-card/60 p-3.5 backdrop-blur-md sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.18em] text-sky-500">
              Demo preview frames
            </h2>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <span>
                {filteredFrames.length} videos in {activeCategory}
              </span>
              {previewPageCount > 1 && (
                <span className="flex items-center gap-1.5 border-l border-border pl-2">
                  <button
                    type="button"
                    onClick={() => changePreviewPage(previewPage - 1)}
                    disabled={previewPage === 0}
                    className="flex size-6 items-center justify-center rounded-md border border-sky-500/30 text-sky-500 transition-colors hover:bg-sky-500/10 disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Previous video page"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <span className="font-mono">
                    {previewPage + 1}/{previewPageCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => changePreviewPage(previewPage + 1)}
                    disabled={previewPage === previewPageCount - 1}
                    className="flex size-6 items-center justify-center rounded-md border border-sky-500/30 text-sky-500 transition-colors hover:bg-sky-500/10 disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Next video page"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {visibleFrames.map((demoFrame, index) => {
              const previewSrc =
                "video" in demoFrame && demoFrame.video
                  ? (demoFrame.poster ?? cloudinaryThumb(demoFrame.video))
                  : demoFrame.src;

              return (
                <button
                  data-demo-preview-card
                  key={demoFrame.title}
                  type="button"
                  onClick={() =>
                    setActiveFrame(previewPage * previewPageSize + index)
                  }
                  className={`group relative overflow-hidden rounded-xl border p-2 text-left transition-all ${previewPage * previewPageSize + index === activeFrame ? "border-sky-500 bg-sky-500/10 shadow-[0_0_20px_rgba(14,165,233,0.18)]" : "border-border bg-background/50 hover:border-sky-500/40"}`}
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-950">
                    <Image
                      src={previewSrc}
                      alt={demoFrame.title}
                      fill
                      quality={65}
                      sizes="(max-width: 640px) 90vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/25" />
                    <span className="absolute left-2 top-2 rounded-md bg-slate-950/75 px-1.5 py-0.5 font-mono text-[9px] text-white">
                      0{previewPage * previewPageSize + index + 1}
                    </span>
                    {"video" in demoFrame && demoFrame.video && (
                      <span className="absolute bottom-2 right-2 rounded-md bg-sky-400 px-1.5 py-0.5 text-[9px] font-bold text-slate-950">
                        VIDEO
                      </span>
                    )}
                  </div>
                  <p className="mt-2 truncate text-[11px] font-bold">
                    {demoFrame.title}
                  </p>
                  <span className="mt-1 inline-flex w-fit rounded-full border border-sky-500/25 bg-sky-500/10 px-2 py-0.5 text-[9px] font-semibold text-sky-500">
                    {demoFrame.category}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section
          data-demo-workflow
          className="mt-5 rounded-xl border border-border bg-card p-4 shadow-xl"
        >
          <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
            <ShieldAlert className="size-3.5 text-yellow-500" />
            <h2 className="text-xs font-bold tracking-wide">Safety workflow</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW.map(({ title, description, icon: Icon }, index) => (
              <div key={title} className="flex items-start gap-2.5">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-slate-950 ${index % 2 === 0 ? "bg-sky-400" : "bg-yellow-400"}`}
                >
                  <Icon className="size-3.5" />
                </span>
                <div>
                  <h3 className="text-[11px] font-bold">{title}</h3>
                  <p className="mt-0.5 text-[10px] leading-snug text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
          <CheckCircle2 className="size-4 text-sky-500" />
          Safe Zone Setup recording available; more demo videos will be added as
          they are captured.
        </div>
      </div>
    </div>
  );
}
