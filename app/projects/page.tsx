"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  Image as ImageIcon,
  GitBranch,
  LayoutGrid,
  List,
  LayoutDashboard,
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
type ViewMode = "grid" | "list" | "tiles";

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

/* ─── TILE compact card ───────────────────────────────────────── */
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
  const [view, setView] = useState<ViewMode>("grid");

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
          <div className="mt-6 flex items-center justify-between border-b border-border pb-3">
            <div className="flex flex-wrap gap-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`text-sm font-medium pb-1 transition-colors ${active === cat ? "text-violet-500 border-b-2 border-violet-500" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1 shrink-0">
              <button
                onClick={() => setView("grid")}
                title="Grid view"
                className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-background text-violet-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutGrid className="size-3.5" />
              </button>
              <button
                onClick={() => setView("tiles")}
                title="Tiles view"
                className={`p-1.5 rounded-md transition-colors ${view === "tiles" ? "bg-background text-violet-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <LayoutDashboard className="size-3.5" />
              </button>
              <button
                onClick={() => setView("list")}
                title="List view"
                className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-background text-violet-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                <List className="size-3.5" />
              </button>
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
        </FadeInOnScroll>
      </div>
    </div>
  );
}
