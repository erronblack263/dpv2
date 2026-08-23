"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  LayoutGrid,
  List,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  Plus,
  Minus,
} from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";

function TypewriterText({
  text,
  speed = 50,
}: Readonly<{
  text: string;
  speed?: number;
}>) {
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

type ViewMode = "grid" | "list" | "tiles" | "carousel";

interface Cert {
  title: string;
  issuer: string;
  category: string;
  description: string;
  embed: string;
  gradient: string;
}

const allCerts: Cert[] = [
  {
    title: "Python",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential validating core Python programming concepts and practical development skills.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784812968/python_cert_koi3p2.png",
    gradient: "from-blue-800 via-blue-700 to-indigo-900",
  },
  {
    title: "JavaScript Developer",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential demonstrating modern JavaScript patterns, application architecture and best practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784804810/javascript_cert_cswyzj.png",
    gradient: "from-yellow-700 via-amber-600 to-orange-800",
  },
  {
    title: "Dart",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential validating Dart programming concepts and practical development skills.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784813291/dart_cert_d6rilt.png",
    gradient: "from-cyan-700 via-teal-600 to-blue-900",
  },
  {
    title: "Java Certificate",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Verified Java programming certificate issued by Programming Hub.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784804534/java_cert_lhbtzk.png",
    gradient: "from-red-800 via-rose-700 to-orange-900",
  },
  {
    title: "TypeScript",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential validating TypeScript development skills and typed JavaScript patterns.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567138/typescript_x9kn53.jpg",
    gradient: "from-blue-700 via-sky-600 to-indigo-800",
  },
  {
    title: "Spring Boot",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential demonstrating Spring Boot backend development and REST API design.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/spring_hjnllb.jpg",
    gradient: "from-green-800 via-emerald-700 to-green-900",
  },
  {
    title: "React",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential demonstrating React component architecture and modern frontend patterns.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567122/reat_vwgdna.jpg",
    gradient: "from-sky-600 via-cyan-500 to-blue-800",
  },
  {
    title: "Next.js",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential validating Next.js full-stack development and server-side rendering skills.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567122/nextjs_xyas9v.jpg",
    gradient: "from-zinc-700 via-zinc-600 to-zinc-900",
  },
  {
    title: "Flutter",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential demonstrating cross-platform mobile app development with Flutter and Dart.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786622074/flutter_httcwn.png",
    gradient: "from-blue-600 via-indigo-500 to-violet-800",
  },
  {
    title: "PyTorch",
    issuer: "Programming Hub",
    category: "Machine Learning",
    description:
      "Credential validating machine learning model development skills using PyTorch.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567450/machine_learning_km7s6e.png",
    gradient: "from-orange-700 via-red-600 to-rose-900",
  },
  {
    title: "DevOps Certification",
    issuer: "Programming Hub",
    category: "CI/CD",
    description:
      "Credential demonstrating system design principles, architecture patterns, and scalability practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/devops_qzj9xy.jpg",
    gradient: "from-purple-800 via-purple-700 to-indigo-900",
  },
  {
    title: "Web Development",
    issuer: "Programming Hub",
    category: "System Design",
    description:
      "Credential demonstrating advanced web development practices, modern frameworks, and best practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/web_dev_ymn5ue.jpg",
    gradient: "from-emerald-700 via-teal-600 to-cyan-800",
  },
  {
    title: "Agile Project Management",
    issuer: "Programming Hub",
    category: "System Design",
    description:
      "Credential demonstrating agile methodologies, project planning, and team collaboration practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/agile_project_management_c2ohec.jpg",
    gradient: "from-blue-700 via-indigo-600 to-purple-800",
  },
  {
    title: "Cybersecurity",
    issuer: "Programming Hub",
    category: "Security",
    description:
      "Credential demonstrating security best practices, threat assessment, and cybersecurity principles.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786622806/cybersecurity_gtexg0.png",
    gradient: "from-red-800 via-red-700 to-orange-900",
  },
];

const CATEGORIES = [
  "All",
  "Programming",
  "Framework",
  "Machine Learning",
  "System Design",
  "CI/CD",
  "Security",
];

/* ─── Cert icon ────────────────────────────────────────────────── */
function CertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-8 text-white/20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

/* ─── GRID card ────────────────────────────────────────────────── */
function GridCard({
  cert,
  onView,
}: Readonly<{
  cert: Cert;
  onView: (e: string) => void;
}>) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-violet-500/40 hover:shadow-2xl hover:-translate-y-0.5">
      <div className="p-3 pb-0">
        <div
          className={`w-full aspect-[16/9] rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center`}
        >
          <CertIcon />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="text-xs font-medium text-violet-500">
          {cert.issuer} · {cert.category}
        </div>
        <h3 className="text-lg font-bold text-foreground leading-snug">
          {cert.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {cert.description}
        </p>
        <div className="mt-auto pt-3">
          <button
            onClick={() => onView(cert.embed)}
            className="flex items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            View certificate
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── LIST row ─────────────────────────────────────────────────── */
function ListRow({
  cert,
  onView,
}: Readonly<{
  cert: Cert;
  onView: (e: string) => void;
}>) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-violet-500/40 hover:bg-accent/30">
      <div
        className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${cert.gradient} flex items-center justify-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-foreground">
            {cert.title}
          </span>
          <span className="text-[11px] text-violet-500 font-medium">
            {cert.issuer} · {cert.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {cert.description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onView(cert.embed)}
        className="shrink-0 flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-accent"
      >
        View
      </button>
    </div>
  );
}

/* ─── TILE compact card ────────────────────────────────────────── */
function TileCard({
  cert,
  onView,
}: Readonly<{
  cert: Cert;
  onView: (e: string) => void;
}>) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-violet-500/40 hover:shadow-lg hover:-translate-y-0.5">
      <div
        className={`w-full h-16 bg-gradient-to-br ${cert.gradient} flex items-center justify-center`}
      >
        <CertIcon />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <span className="text-[10px] font-semibold text-violet-500">
          {cert.category}
        </span>
        <h3 className="text-sm font-bold text-foreground leading-snug">
          {cert.title}
        </h3>
        <p className="text-[10px] text-muted-foreground">{cert.issuer}</p>
        <button
          type="button"
          onClick={() => onView(cert.embed)}
          className="mt-1 text-[10px] font-medium text-violet-500 hover:underline text-left"
        >
          View →
        </button>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function CertificatesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  function scrollPrev() {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: -Math.round(el.clientWidth * 0.8),
      behavior: "smooth",
    });
  }
  function scrollNext() {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  }

  const filtered =
    activeCategory === "All"
      ? allCerts
      : allCerts.filter((c) => c.category === activeCategory);

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <div className="w-full px-5 sm:px-8 lg:px-12 pt-6 pb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>

          <div className="mt-5 text-left">
            <p className="text-sm font-semibold tracking-wide text-violet-500">
              Professional development · {allCerts.length} credentials
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <TypewriterText text="Certificates and credentials." />
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              A growing record of focused learning across software engineering,
              cloud platforms and modern development practices.
            </p>
          </div>

          <FadeInOnScroll>
            <div className="mt-6 flex items-center justify-between border-b border-border pb-4 gap-3 flex-wrap">
              <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
                {CATEGORIES.map((cat, idx) => {
                  const isActive = activeCategory === cat;
                  const isCompleted = CATEGORIES.indexOf(activeCategory) > idx;
                  return (
                    <div key={cat} className="flex items-center">
                      {/* Node + Label */}
                      <button
                        type="button"
                        onClick={() => setActiveCategory(cat)}
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
                      {/* Connector line */}
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
                          type="button"
                          onClick={() => setView(v)}
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

          {/* Certs */}
          <FadeInOnScroll>
            {view === "grid" && (
              <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((cert) => (
                  <GridCard key={cert.embed} cert={cert} onView={setSelected} />
                ))}
              </div>
            )}
            {view === "list" && (
              <div className="mt-6 flex flex-col gap-2">
                {filtered.map((cert) => (
                  <ListRow key={cert.embed} cert={cert} onView={setSelected} />
                ))}
              </div>
            )}
            {view === "tiles" && (
              <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {filtered.map((cert) => (
                  <TileCard key={cert.embed} cert={cert} onView={setSelected} />
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
                    {filtered.map((cert) => (
                      <div
                        key={cert.embed}
                        className="shrink-0 snap-center w-[78%] sm:w-[48%] lg:w-[28%]"
                      >
                        {/* Tall portrait carousel card */}
                        <div
                          className="relative flex flex-col rounded-3xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
                          style={{ height: "480px" }}
                          onClick={() => setSelected(cert.embed)}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${cert.gradient}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          <div className="relative z-10 mt-auto p-6 flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-white/60 tracking-wide">
                              {cert.category}
                            </span>
                            <h3 className="text-2xl font-extrabold text-white leading-tight">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-white/70 mt-0.5">
                              {cert.issuer}
                            </p>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelected(cert.embed);
                              }}
                              className="mt-3 self-start flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
                            >
                              View certificate
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Apple-style circular arrows — bottom right */}
                  <div className="flex items-center gap-2 absolute bottom-4 right-4">
                    <button
                      type="button"
                      onClick={scrollPrev}
                      aria-label="Previous"
                      className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
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

      {/* Certificate modal */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Certificate preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
          onKeyDown={(e) => e.key === "Escape" && setSelected(null)}
          tabIndex={-1}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-background/80 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
            <img
              src={selected}
              alt="Certificate Preview"
              className="w-full h-auto object-contain"
              style={{ maxHeight: "80vh" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
