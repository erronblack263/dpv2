"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ExternalLink, Code2, Star, LayoutGrid, X } from "lucide-react";
import { Skills } from "@/components/skills";
import { Button } from "@/components/ui/button";
import { ScrollIndicator } from "@/components/scroll-indicator";

const featured = [
  {
    title: "GreenSpace 🏆",
    description:
      "An award-winning agricultural intelligence platform powered by Sage — a custom-trained machine learning model for soil classification, fertility prediction, and accurate soil naming. Features smart image recognition for soil scanning via camera, a React Native (TypeScript) frontend, and rich community engagement tools including event planning, a social forum, and real-time messaging — all backed by Supabase BaaS.",
    tags: [
      "React Native",
      "TypeScript",
      "Python",
      "Machine Learning",
      "Supabase",
      "Image Recognition",
    ],
    demo: "/projects/greenspace/demo",
    github: "#",
    artifacts: "/projects/greenspace/artifacts",
    gradient: "from-green-900/40 to-emerald-800/30",
    svgColor: "#4ade80",
  },
  {
    title: "WelfareTracker",
    description:
      "A cross-platform welfare management system built with Flutter and Dart, powered by Firebase BaaS. Features real-time welfare tracking, geofence management for location-based alerts, and a panic alert system for emergency response — designed for organizations managing field staff safety.",
    tags: ["Flutter", "Dart", "Firebase", "Geofencing", "Real-time"],
    demo: "#",
    github: "#",
    artifacts: "/projects/welfaretracker/artifacts",
    gradient: "from-blue-900/40 to-indigo-800/30",
    svgColor: "#60a5fa",
  },
];

const projects = [
  {
    title: "Task Management App",
    description:
      "A Kanban-style task manager with drag-and-drop, team collaboration, and real-time updates.",
    image: "/placeholder.jpg",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    demo: "#",
    github: "#",
  },
  {
    title: "Mobile Fitness Tracker",
    description:
      "Cross-platform mobile app to track workouts, nutrition, and progress with charts and insights.",
    image: "/placeholder.jpg",
    tags: ["Flutter", "Dart", "Firebase"],
    demo: "#",
    github: "#",
  },
  {
    title: "AI Chat Assistant",
    description:
      "A conversational AI interface powered by OpenAI, with chat history and markdown rendering.",
    image: "/placeholder.jpg",
    tags: ["Next.js", "OpenAI", "TypeScript", "Tailwind CSS"],
    demo: "#",
    github: "#",
  },
  {
    title: "Portfolio CMS",
    description:
      "A headless CMS for managing portfolio content with a drag-and-drop page builder.",
    image: "/placeholder.jpg",
    tags: ["React", "Spring Boot", "PostgreSQL"],
    demo: "#",
    github: "#",
  },
  {
    title: "Weather Dashboard",
    description:
      "Real-time weather dashboard with location search, forecasts, and interactive maps.",
    image: "/placeholder.jpg",
    tags: ["React", "Python", "REST API"],
    demo: "#",
    github: "#",
  },
];

function ProjectsPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showProjects = searchParams.get("view") === "projects";
  const [page, setPage] = useState(1);
  const [descExpanded, setDescExpanded] = useState(false);
  const PER_PAGE = 3;
  const totalPages = Math.ceil(projects.length / PER_PAGE);
  const paginated = projects.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function openProjects() {
    router.push("/projects?view=projects");
  }

  function closeProjects() {
    setPage(1);
    router.push("/projects");
  }

  return (
    <div className="w-full">
      {/* Hero banner — starts from top, floats behind nav */}
      <div className="relative w-full h-56 sm:h-72 overflow-hidden -mt-16">
        <Image
          src="/projects.jpg.jpg"
          alt="Projects banner"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-8 pt-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-primary">My Projects</span>{" "}
            <span className="text-white">Portfolio</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/70 max-w-lg">
            A showcase of applications, tools and systems I&apos;ve designed and
            built.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-8 pb-24 sm:px-6">
        {/* Skills section — hidden when projects are shown */}
        {!showProjects && (
          <Skills onViewProjects={() => openProjects()} />
        )}

        {/* Projects section — shown when toggled */}
        {showProjects && (
          <div>
            <ScrollIndicator />
            {/* Header row with dismiss button */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                  My Projects
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  A selection of things I&apos;ve built.
                </p>
              </div>
              <Button
                variant="outline"
                className="shrink-0"
                onClick={() => {
                  closeProjects();
                  setPage(1);
                }}
              >
                <X className="size-4" />
                Close
              </Button>
            </div>
            {/* Featured projects — page 1 only */}
            {page === 1 && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="size-4 text-primary fill-primary" />
                  <span className="text-sm font-semibold text-primary uppercase tracking-widest">
                    Featured Projects
                  </span>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  {featured.map((f) => (
                    <div
                      key={f.title}
                      className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-xl"
                    >
                      {/* Illustration */}
                      <div
                        className={`relative h-36 bg-gradient-to-br ${f.gradient} overflow-hidden flex items-center justify-center`}
                      >
                        <div
                          className="absolute top-4 left-4 size-24 rounded-full blur-3xl"
                          style={{ background: f.svgColor + "33" }}
                        />
                        <div
                          className="absolute bottom-4 right-4 size-16 rounded-full blur-2xl"
                          style={{ background: f.svgColor + "22" }}
                        />
                        <span className="text-5xl">
                          {f.title.includes("GreenSpace") ? "🌱" : "🛡️"}
                        </span>
                      </div>
                      {/* Info */}
                      <div className="flex flex-col justify-between p-5">
                        <div>
                          <h2 className="text-xl font-extrabold tracking-tight">
                            {f.title}
                          </h2>
                          <p
                            className={`mt-2 text-sm text-muted-foreground leading-relaxed ${descExpanded ? "" : "line-clamp-3"}`}
                          >
                            {f.description}
                          </p>
                          <button
                            onClick={() => setDescExpanded((v) => !v)}
                            className="mt-1 text-xs font-semibold text-primary hover:underline"
                          >
                            {descExpanded ? "Show less ↑" : "Read more ↓"}
                          </button>
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {f.tags.map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <a
                            href={f.demo}
                            className="flex items-center gap-1.5 rounded-2xl bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold transition-colors hover:bg-primary/90"
                          >
                            <ExternalLink className="size-3.5" /> Live Demo
                          </a>
                          <a
                            href={f.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 rounded-2xl border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                          >
                            <Code2 className="size-3.5" /> GitHub
                          </a>
                          {f.artifacts !== "#" && (
                            <a
                              href={f.artifacts}
                              className="flex items-center gap-1.5 rounded-2xl border border-border bg-background px-4 py-2 text-xs font-semibold transition-colors hover:bg-accent"
                            >
                              <ExternalLink className="size-3.5" /> Artifacts
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}{" "}
            {/* end page 1 featured */}
            {/* Project grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginated.map((project) => (
                <div
                  key={project.title}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative h-44 bg-muted overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <div>
                      <h3 className="font-bold text-base">{project.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto flex gap-2 pt-2">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-primary-foreground py-2 text-xs font-semibold transition-colors hover:bg-primary/90"
                      >
                        <ExternalLink className="size-3.5" /> Demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-semibold transition-colors hover:bg-accent"
                      >
                        <Code2 className="size-3.5" /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
                >
                  ‹
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`flex size-9 items-center justify-center rounded-xl border text-sm font-medium transition-colors ${
                        p === page
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-accent"
                      }`}
                    >
                      {p}
                    </button>
                  ),
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex size-9 items-center justify-center rounded-xl border border-border bg-background text-sm font-medium transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
                >
                  ›
                </button>
              </div>
            )}
            {/* Back to skills */}
            <div className="mt-10 flex justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  closeProjects();
                  setPage(1);
                }}
              >
                <LayoutGrid className="size-4" />
                Back to Skills
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense>
      <ProjectsPageInner />
    </Suspense>
  );
}
