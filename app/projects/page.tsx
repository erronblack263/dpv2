"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Image as ImageIcon, GitBranch } from "lucide-react";

/* ─── Data ────────────────────────────────────────────────────── */

type Category = "All work" | "Web platforms" | "Mobile";

interface Project {
  title: string;
  tagline: string; // e.g. "Mobile · AgriTech"
  description: string;
  tech: string[];
  category: Category;
  /** Tailwind gradient classes for the thumbnail */
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
    demo: "#",
    artifacts: "/projects/welfaretracker/artifacts",
    github: "#",
  },
  {
    title: "TaskFlow Mobile",
    tagline: "Mobile · Productivity",
    description:
      "A thoughtfully designed productivity companion with offline-first support and seamless sync.",
    tech: ["React Native", "TypeScript", "SQLite", "Redux"],
    category: "Mobile",
    gradient: "from-zinc-800 via-zinc-700 to-zinc-900",
    demo: "#",
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

/* ─── Thumbnail ───────────────────────────────────────────────── */

function Thumbnail({ gradient }: Readonly<{ gradient: string }>) {
  return (
    <div
      className={`w-full aspect-[16/9] rounded-xl bg-gradient-to-br ${gradient}`}
    />
  );
}

/* ─── Card ────────────────────────────────────────────────────── */

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const tagParts = project.tagline.split(" · ");

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 shadow-[0_6px_18px_rgba(124,58,237,0.06)] hover:border-violet-500/40 hover:shadow-[0_18px_40px_rgba(124,58,237,0.16)] hover:-translate-y-0.5">
      {/* Thumbnail */}
      <div className="p-3 pb-0">
        <Thumbnail gradient={project.gradient} />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category label */}
        <div className="flex flex-wrap gap-1 text-xs font-medium text-violet-500">
          {tagParts.map((part, i) => (
            <span key={part}>
              {i > 0 && <span className="text-muted-foreground/40 mr-1">·</span>}
              {part}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech chips */}
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

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.demo && project.demo !== "#" && (
            <Link
              href={project.demo}
              className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Play className="size-3" />
              Video demo
            </Link>
          )}
          {project.artifacts && (
            <Link
              href={project.artifacts}
              className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <ImageIcon className="size-3" />
              Image artifacts
            </Link>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
            >
              <GitBranch className="size-3" />
              GitHub repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All work");

  const filtered =
    active === "All work"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-16">
        {/* Back pill */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mt-5">
          <p className="text-sm font-medium text-violet-500 tracking-wide">
            Selected work · 2023—2026
          </p>
          <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            Projects built for clarity, scale and impact.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-xl leading-relaxed">
            A focused collection of web platforms, mobile tools and backend
            systems designed to solve real-world problems.
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-6 flex flex-wrap gap-6 border-b border-border pb-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-sm font-medium pb-1 transition-colors ${
                active === cat
                  ? "text-violet-500 border-b-2 border-violet-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
