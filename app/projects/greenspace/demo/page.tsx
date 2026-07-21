"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Trophy } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";

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

const SIZE_OPTIONS = [
  { label: "50%", height: 200 },
  { label: "75%", height: 300 },
  { label: "100%", height: 500 },
];

const videos = [
  {
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198863/barren_ejlj1f.mp4",
    title: "Barren Soil Detection",
    description:
      "The Sage model classifying barren soil in real-time using the device camera.",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198836/semi_vegetative_qcxbcl.mp4",
    title: "Semi-Vegetative Soil Detection",
    description:
      "Live detection of semi-vegetative soil conditions with classification output.",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198836/suspected_fert_evxewb.mp4",
    title: "Suspected Fertile Soil Detection",
    description:
      "Real-time classification of suspected fertile soil with confidence scoring.",
  },
];

function VideoCard({
  video,
}: {
  readonly video: { src: string; title: string; description: string };
}) {
  const [sizeIdx, setSizeIdx] = useState(1); // default 75%
  const currentSize = SIZE_OPTIONS[sizeIdx];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg">
      {/* Video player */}
      <VideoPlayer
        src={streamUrl(video.src)}
        thumbnail={cloudinaryThumb(video.src)}
        title={video.title}
        maxHeight={currentSize.height}
      />

      {/* Info + size controls */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <div className="flex items-center gap-2">
            <Play className="size-4 text-primary shrink-0" />
            <h2 className="font-bold text-sm">{video.title}</h2>
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Size toggle */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-muted-foreground mr-1">Size:</span>
          {SIZE_OPTIONS.map((opt, i) => (
            <button
              key={opt.label}
              onClick={() => setSizeIdx(i)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                i === sizeIdx
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GreenSpaceDemoPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 pt-12 pb-24 sm:px-6">
      <Link
        href="/projects?view=projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to Projects
      </Link>

      <div className="mb-10 flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/15">
          <Trophy className="size-6 text-green-500" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            GreenSpace 🏆 — Live Demo
          </h1>
          <p className="mt-2 text-muted-foreground">
            The Sage image recognition engine in action — real-time soil
            classification via device camera.
          </p>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.src} video={video} />
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/projects/greenspace/artifacts"
          className="flex items-center gap-2 rounded-2xl border border-border bg-background px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
        >
          View All Artifacts →
        </Link>
      </div>
    </section>
  );
}
