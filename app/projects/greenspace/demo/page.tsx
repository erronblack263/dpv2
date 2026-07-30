"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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

const videos = [
  {
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198863/barren_ejlj1f.mp4",
    title: "Barren soil classification",
    description:
      "Green Space identifies barren ground from the captured field view.",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198836/semi_vegetative_qcxbcl.mp4",
    title: "Semi-vegetative classification",
    description: "A recorded classification pass for semi-vegetative conditions.",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/video/upload/v1784198836/suspected_fert_evxewb.mp4",
    title: "Suspected fertile soil",
    description:
      "Real-time classification of suspected fertile soil with confidence scoring.",
  },
];

function VideoCard({
  video,
}: {
  readonly video: { src: string; title: string; description: string };
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-violet-500/40 hover:shadow-2xl hover:-translate-y-0.5">
      <VideoPlayer
        src={streamUrl(video.src)}
        thumbnail={cloudinaryThumb(video.src)}
        title={video.title}
        maxHeight={300}
      />
      <div className="flex flex-col gap-1.5 p-4">
        <h2 className="font-bold text-foreground">{video.title}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {video.description}
        </p>
      </div>
    </div>
  );
}

export default function GreenSpaceDemoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full px-5 sm:px-8 lg:px-12 pt-12 pb-14">
        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          Back to projects
        </Link>

        {/* Header */}
        <div className="mt-5 text-left">
          <p className="text-sm font-semibold tracking-wide text-violet-500">
            GREEN SPACE · VIDEO DEMOS
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Green Space in action.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A set of field recordings showing the Green Space workflow across
            barren, semi-vegetative, and suspected fertile soil conditions.
          </p>
        </div>

        {/* Video grid — 2 columns */}
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
          {videos.map((video) => (
            <VideoCard key={video.src} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
