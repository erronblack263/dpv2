"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Video,
  Cpu,
  Layers,
  FileText,
  Bookmark,
  Sparkles,
  Clock,
  Monitor,
  Calendar,
  Leaf,
  Target,
  Zap,
  TrendingUp,
  Smartphone,
  FolderOpen,
  CheckCircle2,
  Brain,
} from "lucide-react";
import { VideoPlayer } from "@/components/video-player";
import { GitHubIcon } from "@/components/social-icons";

/* --- Cloudinary URL Helper Functions ----------------------------- */

function streamUrl(src: string) {
  return src.replace(
    "/video/upload/",
    "/video/upload/q_auto,f_auto,vc_auto,fl_progressive/",
  );
}

function cloudinaryThumb(videoUrl: string) {
  return videoUrl
    .replace("/video/upload/", "/video/upload/so_0,w_600/")
    .replace(/\.mp4$/, ".jpg");
}

/* ─── Video Data Array ───────────────────────────────────────────── */

interface VideoItem {
  id: string;
  src: string;
  title: string;
  description: string;
  duration: string;
  confidence: string;
  location: string;
  date: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "barren",
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198863/barren_ejlj1f.mp4",
    title: "Barren Soil Classification",
    description:
      "Real field recording demonstrating AI detection of barren soil conditions.",
    duration: "02:14",
    confidence: "98%",
    location: "Field Test 01",
    date: "May 12, 2024",
  },
  {
    id: "semi_vegetative",
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198836/semi_vegetative_qcxbcl.mp4",
    title: "Semi-vegetative Classification",
    description:
      "Recorded classification pass for semi-vegetative ground terrain.",
    duration: "01:48",
    confidence: "95%",
    location: "Field Test 02",
    date: "May 18, 2024",
  },
  {
    id: "suspected_fertile",
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198836/suspected_fert_evxewb.mp4",
    title: "Suspected Fertile Soil Classification",
    description:
      "Real-time classification of suspected fertile soil with confidence scoring.",
    duration: "02:01",
    confidence: "96%",
    location: "Field Test 03",
    date: "May 25, 2024",
  },
];

const WORKFLOW_STEPS = [
  {
    title: "Field Capture",
    description: "Recorded using mobile app",
    icon: Smartphone,
    color: "bg-emerald-500 text-black ring-emerald-500/25",
  },
  {
    title: "AI Processing",
    description: "TensorFlow Lite inference",
    icon: Brain,
    color: "bg-violet-500 text-white ring-violet-500/25",
  },
  {
    title: "Classification",
    description: "Model predicts soil type",
    icon: FolderOpen,
    color: "bg-sky-500 text-white ring-sky-500/25",
  },
  {
    title: "Prediction Output",
    description: "Displayed in mobile app",
    icon: CheckCircle2,
    color: "bg-emerald-400 text-black ring-emerald-400/25",
  },
] as const;

const DETAIL_ROWS = [
  { label: "Category", value: "Computer Vision", icon: Layers },
  { label: "Videos", value: "3", icon: Video },
  { label: "Platform", value: "Flutter", icon: Monitor },
  { label: "Model", value: "TensorFlow Lite", icon: Cpu },
  { label: "Purpose", value: "Soil Classification", icon: Target },
  { label: "Dataset", value: "Field Captures", icon: FileText },
] as const;

/* ─── Component ─────────────────────────────────────────────────── */

export default function GreenSpaceDemoPage() {
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});

  const currentVideo = VIDEOS[activeVideoIdx];

  function toggleBookmark(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setBookmarked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function nextVideo() {
    setActiveVideoIdx((i) => (i + 1) % VIDEOS.length);
  }

  function prevVideo() {
    setActiveVideoIdx((i) => (i - 1 + VIDEOS.length) % VIDEOS.length);
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-3">
        {/* Top Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Hero */}
          <div className="lg:col-span-4 flex flex-col relative">
            <div className="absolute -left-10 -top-10 size-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <Link
                href="/projects/greenspace/artifacts"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <ArrowLeft className="size-3.5" />
                Back to GreenSpace
              </Link>

              <div className="mt-3">
                <p className="text-[10px] font-bold tracking-[0.18em] text-emerald-600 dark:text-emerald-400 uppercase">
                  GREEN SPACE · VIDEO DEMOS
                </p>
                <h1 className="mt-1.5 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                  Green Space
                  <br />
                  Field Demonstrations.
                </h1>
              </div>

              <p className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-md">
                Real-world AI classification recordings captured during field
                testing across multiple terrain types and soil conditions.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Cpu className="size-2.5" />
                  AI Detection
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-violet-500/40 bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-violet-600 dark:text-violet-400">
                  <Video className="size-2.5" />
                  Field Recording
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-sky-500/40 bg-sky-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-sky-600 dark:text-sky-400">
                  <Layers className="size-2.5" />
                  Computer Vision
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="size-2.5" />
                  Flutter
                </span>
              </div>
            </div>
          </div>

          {/* Center Video Player */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            <div
              className="relative w-full max-w-md mx-auto lg:max-w-none lg:mx-0 rounded-xl overflow-hidden border border-emerald-500/25 bg-black shadow-[0_0_40px_rgba(0,0,0,0.55)] aspect-[9/16] max-h-[70vh] sm:aspect-video sm:max-h-none"
            >
              <div className="absolute inset-0">
                <VideoPlayer
                  key={currentVideo.src}
                  src={streamUrl(currentVideo.src)}
                  thumbnail={cloudinaryThumb(currentVideo.src)}
                  title={currentVideo.title}
                  maxHeight={999}
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card/80 p-3 backdrop-blur-md flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-foreground truncate">
                  {currentVideo.title}
                </h3>
                <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">
                  {currentVideo.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-mono font-bold text-foreground">
                  {activeVideoIdx + 1}/{VIDEOS.length}
                </span>
                <button
                  onClick={prevVideo}
                  className="p-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  aria-label="Previous video"
                >
                  <ChevronLeft className="size-3.5" />
                </button>
                <button
                  onClick={nextVideo}
                  className="p-1 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                  aria-label="Next video"
                >
                  <ChevronRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Project Details */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-card p-4 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2 border-b border-border pb-2.5 mb-3">
                <Calendar className="size-3.5 text-emerald-500" />
                <h2 className="text-xs font-bold text-foreground tracking-wide">
                  Project Details
                </h2>
              </div>

              <div className="flex flex-col gap-2.5 text-[11px] text-muted-foreground">
                {DETAIL_ROWS.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="flex items-center gap-1.5">
                      <Icon className="size-3 shrink-0" />
                      {label}
                    </span>
                    <span className="font-semibold text-foreground text-right">
                      {value}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-0.5">
                  <span>Status</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3" /> Duration
                  </span>
                  <span className="font-semibold text-foreground">
                    May 2024 – Jun 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: compact Demonstrations + Workflow */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          <div className="lg:col-span-9 flex flex-col">
            <div className="flex items-center justify-between mb-3 gap-3">
              <div className="flex items-center gap-2">
                <Video className="size-3.5 text-emerald-500" />
                <h2 className="text-sm font-extrabold text-foreground tracking-wide">
                  Recorded Demonstrations
                </h2>
              </div>
              <span className="text-[11px] text-muted-foreground font-medium shrink-0">
                3 Videos Captured in the Field
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
              {VIDEOS.map((vid, idx) => {
                const isActive = idx === activeVideoIdx;
                const isBookmarked = !!bookmarked[vid.id];
                return (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => setActiveVideoIdx(idx)}
                    className={`group relative flex flex-col rounded-xl border p-2.5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-emerald-500 bg-card shadow-[0_0_20px_rgba(16,185,129,0.18)] ring-1 ring-emerald-500/40"
                        : "border-border bg-card/70 hover:border-emerald-500/40 hover:bg-card"
                    }`}
                  >
                    {/* Compact thumbnail — portrait-aware on mobile */}
                    <div className="relative w-full aspect-[9/16] max-h-40 sm:max-h-none sm:aspect-[16/9] rounded-lg overflow-hidden bg-black border border-zinc-800 mx-auto">
                      <img
                        src={cloudinaryThumb(vid.src)}
                        alt={vid.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <span className="size-8 rounded-full bg-emerald-500/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="size-3.5 fill-black ml-0.5" />
                        </span>
                      </div>
                      <span className="absolute top-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-mono font-bold text-white border border-white/10">
                        {vid.duration}
                      </span>
                    </div>

                    <h3 className="mt-2 text-[11px] font-bold text-foreground truncate">
                      {vid.title}
                    </h3>

                    <div className="mt-1.5 flex items-start justify-between gap-2">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                          AI Confidence
                        </span>
                        <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">
                          {vid.confidence}
                        </span>
                      </div>
                      <div className="text-right text-[9px] text-muted-foreground leading-tight">
                        <span className="block">{vid.location}</span>
                        <span className="block font-mono">{vid.date}</span>
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-border flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 inline-flex items-center gap-1 group-hover:underline">
                        View Demo
                        <ArrowRight className="size-2.5" />
                      </span>

                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => toggleBookmark(vid.id, e)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleBookmark(
                              vid.id,
                              e as unknown as React.MouseEvent,
                            );
                          }
                        }}
                        className={`p-1 rounded-md border transition-colors ${
                          isBookmarked
                            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/40"
                            : "bg-muted text-muted-foreground border-border hover:text-foreground"
                        }`}
                        title="Save video bookmark"
                      >
                        <Bookmark
                          className={`size-3 ${
                            isBookmarked ? "fill-emerald-500" : ""
                          }`}
                        />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Workflow — same height as demo cards row */}
          <div className="lg:col-span-3 flex">
            <div className="rounded-xl border border-border bg-card p-3.5 backdrop-blur-md shadow-xl w-full flex flex-col">
              <div className="flex items-center gap-2 border-b border-border pb-2 mb-3 shrink-0">
                <Target className="size-3.5 text-emerald-500" />
                <h2 className="text-xs font-bold text-foreground tracking-wide">
                  Workflow
                </h2>
              </div>

              <div className="relative flex flex-col justify-between flex-1 gap-2.5 pl-0.5">
                <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
                {WORKFLOW_STEPS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.title} className="relative flex gap-2.5 items-start">
                      <span
                        className={`relative z-10 size-6 rounded-full flex items-center justify-center ring-2 shrink-0 ${step.color}`}
                      >
                        <Icon className="size-3" />
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <h4 className="text-[11px] font-bold text-foreground leading-tight">
                          {step.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-snug mt-0.5">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Field Test Analytics — compact */}
        <div className="mt-4 rounded-xl border border-border bg-card/60 p-3.5 sm:p-4 backdrop-blur-md">
          <h2 className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.18em] mb-3">
            Field Test Analytics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            <div className="rounded-lg border border-border bg-background/50 p-3 flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Video className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-muted-foreground">
                  Total Videos
                </span>
                <span className="text-base font-extrabold text-foreground leading-tight">
                  3
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background/50 p-3 flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                <Target className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-muted-foreground">
                  Average Accuracy
                </span>
                <span className="text-base font-extrabold text-foreground leading-tight">
                  97.6%
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background/50 p-3 flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <Layers className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-muted-foreground">
                  Classes Detected
                </span>
                <span className="text-base font-extrabold text-foreground leading-tight">
                  3
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background/50 p-3 flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Zap className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-muted-foreground">
                  Avg. Processing Time
                </span>
                <span className="text-base font-extrabold text-foreground leading-tight">
                  140ms
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-background/50 p-3 flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <div className="size-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <TrendingUp className="size-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] text-muted-foreground">
                  Model Performance
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 leading-tight">
                  Excellent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA — compact */}
        <div className="mt-4 rounded-xl border border-border bg-card/70 p-3.5 sm:p-4 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Leaf className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Interested in this AI project?
              </h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Explore the code, documentation and technical details.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full md:w-auto">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-[11px] font-bold text-foreground hover:bg-accent transition-all"
            >
              <GitHubIcon className="size-3.5" />
              <span>View Source Code</span>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-[11px] font-bold text-foreground hover:bg-accent transition-all"
            >
              <FileText className="size-3.5" />
              <span>Technical Documentation</span>
            </a>

            <Link
              href="/projects/welfaretracker/artifacts"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-black px-4 py-2 text-[11px] font-bold shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 transition-all"
            >
              <span>Next Project</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
