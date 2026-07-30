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
  ExternalLink,
  Bookmark,
  Sparkles,
  Clock,
  Monitor,
  Calendar,
  Wrench,
  Leaf,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";
import { VideoPlayer } from "@/components/video-player";

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
    <div className="min-h-screen bg-background text-foreground font-sans pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-4">
        {/* Top Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Hero Header Info Column */}
          <div className="lg:col-span-4 flex flex-col relative">
            {/* Ambient Radial Green Glow */}
            <div className="absolute -left-10 -top-10 size-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Back to GreenSpace Pill */}
              <Link
                href="/projects/greenspace/artifacts"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <ArrowLeft className="size-3.5" />
                Back to GreenSpace
              </Link>

              {/* Title & Eyebrow Tag */}
              <div className="mt-4">
                <p className="text-[10px] font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                  GREEN SPACE · VIDEO DEMOS
                </p>
                <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] leading-tight">
                  Green Space<br />Field Demonstrations.
                </h1>
              </div>

              {/* Description Paragraph */}
              <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed">
                Real-world AI classification recordings captured during field testing across multiple terrain types and soil conditions.
              </p>

              {/* Badges Row - single line, no wrap */}
              <div className="mt-3 flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
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

          {/* Center Stage Featured Video Player Showcase (Cols 5 to 8) */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {/* Video Player Container - fixed 16:9 aspect ratio */}
            <div className="relative w-full rounded-xl overflow-hidden border border-emerald-500/30 bg-black shadow-[0_0_30px_rgba(0,0,0,0.8)]" style={{aspectRatio: '16/9'}}>
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

            {/* Featured Video Meta Footer */}
            <div className="rounded-xl border border-border bg-card p-3 backdrop-blur-md flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5 max-w-xs min-w-0">
                <h3 className="text-xs font-bold text-foreground truncate">
                  {currentVideo.title}
                </h3>
                <p className="text-[10px] text-muted-foreground truncate">
                  {currentVideo.description}
                </p>
              </div>

              {/* Pagination controls & counter */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                  <span className="font-bold text-foreground">{activeVideoIdx + 1}/3</span>
                  <button
                    onClick={prevVideo}
                    className="p-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    aria-label="Previous video"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <button
                    onClick={nextVideo}
                    className="p-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                    aria-label="Next video"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Centered Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {VIDEOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVideoIdx(i)}
                  className={`rounded-full transition-all ${
                    i === activeVideoIdx
                      ? "size-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                      : "size-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  }`}
                  aria-label={`Go to video ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar - Project Details (Cols 9 to 12) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Project Details Card */}
            <div className="rounded-2xl border border-border bg-card p-5 backdrop-blur-md shadow-xl text-card-foreground">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <Calendar className="size-4 text-emerald-500" />
                <h2 className="text-sm font-bold text-foreground tracking-wide">
                  Project Details
                </h2>
              </div>

              <div className="flex flex-col gap-3 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="size-3.5" /> Category
                  </span>
                  <span className="font-semibold text-foreground">
                    Computer Vision
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Video className="size-3.5" /> Videos
                  </span>
                  <span className="font-semibold text-foreground">3</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Monitor className="size-3.5" /> Platform
                  </span>
                  <span className="font-semibold text-foreground">Flutter</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Cpu className="size-3.5" /> Model
                  </span>
                  <span className="font-semibold text-foreground">
                    TensorFlow Lite
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Target className="size-3.5" /> Purpose
                  </span>
                  <span className="font-semibold text-foreground">
                    Soil Classification
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <FileText className="size-3.5" /> Dataset
                  </span>
                  <span className="font-semibold text-foreground">
                    Field Captures
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5">Status</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 dark:border-emerald-800/80 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    Completed
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> Duration
                  </span>
                  <span className="font-semibold text-foreground">
                    May 2024 – Jun 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section (Recorded Demonstrations + Workflow) */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Recorded Demonstrations Grid (Cols 1 to 9) */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Video className="size-4 text-emerald-500" />
                <h2 className="text-base font-extrabold text-foreground tracking-wide">
                  Recorded Demonstrations
                </h2>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                3 Videos Captured in the Field
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {VIDEOS.map((vid, idx) => {
                const isActive = idx === activeVideoIdx;
                const isBookmarked = !!bookmarked[vid.id];
                return (
                  <div
                    key={vid.id}
                    onClick={() => setActiveVideoIdx(idx)}
                    className={`group relative flex flex-col rounded-2xl border p-3.5 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-emerald-500 bg-card shadow-[0_0_25px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50"
                        : "border-border bg-card/60 hover:border-accent-foreground/30 hover:bg-card"
                    }`}
                  >
                    {/* Thumbnail Video Frame */}
                    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black flex items-center justify-center border border-zinc-800">
                      <img
                        src={cloudinaryThumb(vid.src)}
                        alt={vid.title}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="size-10 rounded-full bg-emerald-500/90 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="size-5 fill-black ml-0.5" />
                        </div>
                      </div>

                      {/* Duration Tag */}
                      <span className="absolute top-2 right-2 rounded-md bg-black/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-mono font-bold text-white border border-white/10">
                        {vid.duration}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 text-xs font-bold text-foreground truncate">
                      {vid.title}
                    </h3>

                    {/* AI Confidence */}
                    <div className="mt-2 flex items-center justify-between text-[11px]">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                          AI Confidence
                        </span>
                        <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                          {vid.confidence}
                        </span>
                      </div>
                      <div className="text-right text-[10px] text-muted-foreground leading-tight">
                        <span className="block">{vid.location}</span>
                        <span className="block font-mono">{vid.date}</span>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between">
                      <button className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
                        <span>View Demo</span>
                        <ArrowRight className="size-3" />
                      </button>

                      <button
                        onClick={(e) => toggleBookmark(vid.id, e)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          isBookmarked
                            ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/40"
                            : "bg-muted text-muted-foreground border-border hover:text-foreground"
                        }`}
                        title="Save video bookmark"
                      >
                        <Bookmark
                          className={`size-3.5 ${
                            isBookmarked ? "fill-emerald-500" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Workflow Timeline Card (Cols 10 to 12) */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-5 backdrop-blur-md shadow-xl text-card-foreground">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <Wrench className="size-4 text-emerald-500" />
                <h2 className="text-sm font-bold text-foreground tracking-wide">
                  Workflow
                </h2>
              </div>

              <div className="flex flex-col gap-4 relative pl-4 border-l border-emerald-500/30">
                {/* Step 1 */}
                <div className="relative flex flex-col gap-0.5">
                  <span className="absolute -left-[21px] top-0 size-3 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                  <h4 className="text-xs font-bold text-foreground">
                    Field Capture
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Recorded using mobile app
                  </p>
                </div>

                {/* Step 2 */}
                <div className="relative flex flex-col gap-0.5">
                  <span className="absolute -left-[21px] top-0 size-3 rounded-full bg-violet-500 ring-4 ring-violet-500/20" />
                  <h4 className="text-xs font-bold text-foreground">
                    AI Processing
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    TensorFlow Lite inference
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative flex flex-col gap-0.5">
                  <span className="absolute -left-[21px] top-0 size-3 rounded-full bg-sky-500 ring-4 ring-sky-500/20" />
                  <h4 className="text-xs font-bold text-foreground">
                    Classification
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Model predicts soil type
                  </p>
                </div>

                {/* Step 4 */}
                <div className="relative flex flex-col gap-0.5">
                  <span className="absolute -left-[21px] top-0 size-3 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                  <h4 className="text-xs font-bold text-foreground">
                    Prediction Output
                  </h4>
                  <p className="text-[11px] text-muted-foreground">
                    Displayed in mobile app
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Field Test Analytics Section */}
        <div className="mt-6">
          <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
            Field Test Analytics
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {/* Box 1 */}
            <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <Video className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">
                  Total Videos
                </span>
                <span className="text-lg font-extrabold text-foreground">3</span>
              </div>
            </div>

            {/* Box 2 */}
            <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-violet-500/10 dark:bg-violet-950 border border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400 shrink-0">
                <Target className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">
                  Average Accuracy
                </span>
                <span className="text-lg font-extrabold text-foreground">
                  97.6%
                </span>
              </div>
            </div>

            {/* Box 3 */}
            <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-sky-500/10 dark:bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
                <Layers className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">
                  Classes Detected
                </span>
                <span className="text-lg font-extrabold text-foreground">3</span>
              </div>
            </div>

            {/* Box 4 */}
            <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
              <div className="size-9 rounded-lg bg-amber-500/10 dark:bg-amber-950 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                <Zap className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">
                  Avg. Processing Time
                </span>
                <span className="text-lg font-extrabold text-foreground">
                  140ms
                </span>
              </div>
            </div>

            {/* Box 5 */}
            <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3 col-span-2 sm:col-span-1">
              <div className="size-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <TrendingUp className="size-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground">
                  Model Performance
                </span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Excellent
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Footer */}
        <div className="mt-8 rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Leaf className="size-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">
                Interested in this AI project?
              </h3>
              <p className="text-xs text-muted-foreground">
                Explore the code, documentation and technical details.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-accent transition-all"
            >
              <ExternalLink className="size-3.5" />
              <span>View Source Code</span>
            </a>

            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-accent transition-all"
            >
              <FileText className="size-3.5" />
              <span>Technical Documentation</span>
            </a>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black px-5 py-2 text-xs font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all"
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
