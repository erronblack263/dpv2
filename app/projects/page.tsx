"use client";

import React, { useState, useEffect, memo, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Image as ImageIcon,
  GitBranch,
  LayoutGrid,
  List,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
} from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

function TypewriterText({
  text,
  speed = 50,
}: {
  text: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let cancelled = false;
    let idx = 0;
    const type = () => {
      if (cancelled) return;
      if (idx <= text.length) {
        setDisplayed(text.slice(0, idx));
        idx++;
        setTimeout(type, speed);
      }
    };
    type();
    return () => {
      cancelled = true;
    };
  }, [text, speed]);
  return <span>{displayed}</span>;
}

type Category = "All work" | "Web platforms" | "Mobile";
type ViewMode = "grid" | "list" | "tiles" | "carousel";

interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  category: Category;
  gradient: string;
  demo?: string;
  artifacts?: string;
  github?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Green Space",
    tagline: "Mobile · AgriTech",
    description:
      "A React Native app powered by Sage, a Python-trained soil fertility prediction and classification model. Built with Supabase, PyTorch, scikit-learn, NumPy and pandas.",
    tech: [
      "React Native",
      "TypeScript",
      "Python",
      "Machine Learning",
      "Supabase",
      "Image Recognition",
    ],
    category: "Mobile",
    gradient: "from-green-800 via-emerald-700 to-green-900",
    demo: "/projects/greenspace/demo",
    artifacts: "/projects/greenspace/artifacts",
    github: "#",
  },
  {
    title: "WelfareTracker",
    tagline: "Mobile · Welfare Management",
    description:
      "A cross-platform welfare management system for field staff safety, with real-time tracking, geofence alerts, and emergency panic response.",
    tech: ["Flutter", "Dart", "Firebase", "Geofencing", "Real-time"],
    category: "Mobile",
    gradient: "from-sky-500 via-blue-400 to-yellow-400",
    demo: "/projects/welfaretracker/demo",
    artifacts: "/projects/welfaretracker/artifacts",
    github: "#",
  },
  {
    title: "SmartHR",
    tagline: "Web platforms · HR",
    description:
      "A HR web platform that streamlines hiring, recruitment and candidate assessment with automated workflows and real-time analytics.",
    tech: ["React Native", "TypeScript", "SQLite", "Redux"],
    category: "Web platforms",
    gradient: "from-zinc-800 via-zinc-700 to-zinc-900",
    demo: "#",
    artifacts: "/projects/smarthr/artifacts",
    github: "#",
  },
  {
    title: "Portfolio CMS",
    tagline: "Web platforms · Content",
    description:
      "A headless CMS for managing portfolio content with a drag-and-drop page builder and live preview.",
    tech: ["Next.js", "Spring Boot", "PostgreSQL", "TypeScript"],
    category: "Web platforms",
    gradient: "from-violet-800 via-purple-700 to-indigo-900",
    demo: "#",
    github: "#",
  },
  {
    title: "AI Chat Assistant",
    tagline: "Web platforms · AI",
    description:
      "A conversational AI interface powered by OpenAI, with persistent chat history, markdown rendering and streaming.",
    tech: ["Next.js", "OpenAI", "TypeScript", "Tailwind CSS"],
    category: "Web platforms",
    gradient: "from-rose-800 via-pink-700 to-purple-900",
    demo: "#",
    github: "#",
  },
  {
    title: "Weather Dashboard",
    tagline: "Web platforms · Data",
    description:
      "Real-time weather dashboard with location search, 7-day forecasts and interactive map overlays.",
    tech: ["React", "Python", "REST API", "Leaflet"],
    category: "Web platforms",
    gradient: "from-cyan-700 via-teal-600 to-blue-900",
    demo: "#",
    github: "#",
  },
];

const CATEGORIES: Category[] = ["All work", "Web platforms", "Mobile"];

/* ─── Shared action buttons ───────────────────────────────────── */
function ActionButtons({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.demo && project.demo !== "#" && (
        <Link
          href={project.demo}
          className="flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <Play className="size-3" /> Video demo
        </Link>
      )}
      {project.artifacts && (
        <Link
          href={project.artifacts}
          className="flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <ImageIcon className="size-3" /> Artifacts
        </Link>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
        >
          <GitBranch className="size-3" /> GitHub
        </a>
      )}
    </div>
  );
}

/* ─── GRID card ───────────────────────────────────────────────── */
const GridCard = memo(function GridCard({ project }: { project: Project }) {
  const tagParts = project.tagline.split(" · ");
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 shadow-[0_6px_18px_rgba(124,58,237,0.06)] hover:border-violet-500/40 hover:shadow-[0_18px_40px_rgba(124,58,237,0.16)] hover:-translate-y-0.5">
      <div className="p-3 pb-0">
        <div
          className={`relative w-full aspect-[16/9] rounded-xl bg-gradient-to-br ${project.gradient} overflow-hidden`}
        />
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex flex-wrap gap-1 text-xs font-medium text-violet-500">
          {tagParts.map((part, i) => (
            <span key={part}>
              {i > 0 && (
                <span className="text-muted-foreground/40 mr-1">·</span>
              )}
              {part}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold text-foreground leading-snug">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-x-1 gap-y-0.5 mt-auto pt-1 text-[11px] font-medium text-violet-500">
          {project.tech.map((t, i) => (
            <span key={t}>
              {t}
              {i < project.tech.length - 1 && (
                <span className="text-muted-foreground/30 ml-1">·</span>
              )}
            </span>
          ))}
        </div>
        <div className="pt-2">
          <ActionButtons project={project} />
        </div>
      </div>
    </div>
  );
});

/* ─── LIST row ────────────────────────────────────────────────── */
const ListRow = memo(function ListRow({ project }: { project: Project }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-violet-500/40 hover:bg-accent/30">
      {/* Left: swatch + info */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className={`shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${project.gradient} mt-0.5`}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-bold text-foreground truncate">
              {project.title}
            </span>
            <span className="text-[11px] text-violet-500 font-medium whitespace-nowrap">
              {project.tagline}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 hidden sm:block">
            {project.description}
          </p>
          {/* Tech tags — only on lg */}
          <div className="hidden lg:flex gap-1 flex-wrap mt-1">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium text-violet-500 bg-violet-500/10 rounded-full px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Right: action buttons */}
      <div className="flex flex-wrap gap-1.5 shrink-0 ml-12 sm:ml-0">
        <ActionButtons project={project} />
      </div>
    </div>
  );
});

/* ─── CAROUSEL card — tall portrait, text overlay ─────────── */
const CarouselCard = memo(function CarouselCard({
  project,
}: {
  project: Project;
}) {
  const tagParts = project.tagline.split(" · ");
  return (
    <div
      className="relative flex flex-col rounded-3xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
      style={{ height: "480px" }}
    >
      {/* Full-bleed gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {/* Text content at bottom */}
      <div className="relative z-10 mt-auto p-6 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-white/60 tracking-wide">
          {tagParts[tagParts.length - 1]}
        </span>
        <h3 className="text-2xl font-extrabold text-white leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-white/70 line-clamp-2 mt-0.5">
          {project.description}
        </p>
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.demo && project.demo !== "#" && (
            <Link
              href={project.demo}
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
            >
              <Play className="size-3" /> Video demo
            </Link>
          )}
          {project.artifacts && (
            <Link
              href={project.artifacts}
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
            >
              <ImageIcon className="size-3" /> Artifacts
            </Link>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
            >
              <GitBranch className="size-3" /> GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
});
const TileCard = memo(function TileCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-violet-500/40 hover:shadow-[0_8px_24px_rgba(124,58,237,0.12)] hover:-translate-y-0.5">
      <div className={`w-full h-20 bg-gradient-to-br ${project.gradient}`} />
      <div className="p-3 flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold text-violet-500">
          {project.tagline}
        </span>
        <h3 className="text-sm font-bold text-foreground leading-snug">
          {project.title}
        </h3>
        <p className="text-[11px] text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="pt-1">
          <ActionButtons project={project} />
        </div>
      </div>
    </div>
  );
});

/* ─── Page ────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All work");
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window !== "undefined") {
      return (sessionStorage.getItem("projects-view") as ViewMode) || "grid";
    }
    return "grid";
  });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  function changeView(v: ViewMode) {
    setView(v);
    sessionStorage.setItem("projects-view", v);
  }

  function scrollPrev() {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: -amount, behavior: "smooth" });
  }

  function scrollNext() {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  const filtered =
    active === "All work"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full px-5 sm:px-8 lg:px-12 pt-6 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <ArrowLeft className="size-4" /> Back to Home
        </Link>

        <div className="mt-5">
          <p className="text-sm font-medium text-violet-500 tracking-wide">
            Selected work · 2023—2026
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <TypewriterText text="Projects built for clarity, scale and impact." />
          </h1>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A focused collection of web platforms, mobile tools and backend
            systems designed to solve real-world problems.
          </p>
        </div>

        {/* Filter tabs + view toggle */}
        <FadeInOnScroll delay={100}>
          <div className="mt-6 flex items-center justify-between border-b border-border pb-4 gap-3 flex-wrap">
            {/* Stepper breadcrumb categories */}
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
              {CATEGORIES.map((cat, idx) => {
                const isActive = active === cat;
                const isCompleted = CATEGORIES.indexOf(active) > idx;
                return (
                  <div key={cat} className="flex items-center">
                    <button
                      onClick={() => setActive(cat)}
                      className="flex flex-col items-center gap-1.5 group"
                    >
                      <div
                        className={`flex items-center justify-center size-8 rounded-full border-2 transition-all duration-200 ${
                          isActive
                            ? "bg-violet-600 border-violet-600 text-white shadow-[0_0_12px_rgba(124,58,237,0.5)]"
                            : isCompleted
                              ? "bg-violet-600/20 border-violet-500 text-violet-500"
                              : "bg-muted border-border text-muted-foreground group-hover:border-violet-400 group-hover:text-violet-400"
                        }`}
                      >
                        {isCompleted ? (
                          <svg
                            className="size-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <span className="text-[10px] font-bold">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                      <span
                        className={`text-[11px] font-semibold whitespace-nowrap transition-colors ${
                          isActive
                            ? "text-violet-500"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {cat}
                      </span>
                    </button>
                    {idx < CATEGORIES.length - 1 && (
                      <div
                        className={`h-[2px] w-8 sm:w-12 mx-1 mb-4 rounded-full transition-colors ${
                          isCompleted ? "bg-violet-500/60" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* View toggle — stepper style */}
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-none shrink-0">
              {(["grid", "tiles", "carousel", "list"] as const).map(
                (v, idx) => {
                  const labels: Record<string, string> = {
                    grid: "Grid",
                    tiles: "Tiles",
                    carousel: "Carousel",
                    list: "List",
                  };
                  const icons: Record<string, React.ReactNode> = {
                    grid: <LayoutGrid className="size-3" />,
                    tiles: <LayoutDashboard className="size-3" />,
                    carousel: <GalleryHorizontal className="size-3" />,
                    list: <List className="size-3" />,
                  };
                  const views = ["grid", "tiles", "carousel", "list"];
                  const isActive = view === v;
                  const isCompleted = views.indexOf(view) > idx;
                  return (
                    <div key={v} className="flex items-center">
                      <button
                        onClick={() => changeView(v)}
                        className="flex flex-col items-center gap-1.5 group"
                      >
                        <div
                          className={`flex items-center justify-center size-7 rounded-full border-2 transition-all duration-200 ${
                            isActive
                              ? "bg-violet-600 border-violet-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.5)]"
                              : isCompleted
                                ? "bg-violet-600/20 border-violet-500 text-violet-500"
                                : "bg-muted border-border text-muted-foreground group-hover:border-violet-400 group-hover:text-violet-400"
                          }`}
                        >
                          {icons[v]}
                        </div>
                        <span
                          className={`text-[10px] font-semibold whitespace-nowrap transition-colors ${
                            isActive
                              ? "text-violet-500"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {labels[v]}
                        </span>
                      </button>
                      {idx < 3 && (
                        <div
                          className={`h-[2px] w-6 sm:w-8 mx-1 mb-4 rounded-full transition-colors ${
                            isCompleted ? "bg-violet-500/60" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </FadeInOnScroll>

        {/* Projects */}
        <FadeInOnScroll delay={200}>
          {view === "grid" && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <GridCard key={p.title} project={p} />
              ))}
            </div>
          )}
          {view === "list" && (
            <div className="mt-6 flex flex-col gap-2">
              {filtered.map((p) => (
                <ListRow key={p.title} project={p} />
              ))}
            </div>
          )}
          {view === "tiles" && (
            <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <TileCard key={p.title} project={p} />
              ))}
            </div>
          )}
          {view === "carousel" && (
            <div className="mt-6">
              <div className="relative">
                <div
                  ref={carouselRef}
                  className="-mx-4 px-4 overflow-x-auto scrollbar-none flex gap-4 snap-x snap-mandatory pb-16"
                >
                  {filtered.map((p) => (
                    <div
                      key={p.title}
                      className="shrink-0 snap-center w-[78%] sm:w-[48%] lg:w-[30%]"
                    >
                      <CarouselCard project={p} />
                    </div>
                  ))}
                </div>

                {/* Apple-style circular arrows — bottom right */}
                <div className="flex items-center gap-2 absolute bottom-4 right-4">
                  <button
                    onClick={scrollPrev}
                    aria-label="Previous"
                    className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    onClick={scrollNext}
                    aria-label="Next"
                    className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </FadeInOnScroll>
      </div>
    </div>
  );
}
