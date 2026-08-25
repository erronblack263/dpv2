"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { animate, stagger } from "animejs";
import {
  Medal,
  Trophy,
  Star,
  Sparkles,
  ChevronRight,
  BadgeCheck,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

const WavyBackground = dynamic(
  () =>
    import("@/components/ui/wavy-background").then((mod) => ({
      default: mod.WavyBackground,
    })),
  { ssr: false },
);

const DARK_WAVE_COLORS = [
  "#38bdf8",
  "#818cf8",
  "#a78bfa",
  "#6366f1",
  "#22d3ee",
];
const LIGHT_WAVE_COLORS = [
  "#6366f1",
  "#818cf8",
  "#38bdf8",
  "#a78bfa",
  "#22d3ee",
];

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const step = target / (duration / 16);
        const id = setInterval(() => {
          start += step;
          if (start >= target) {
            setValue(target);
            clearInterval(id);
          } else {
            setValue(Math.floor(start));
          }
        }, 16);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
}) {
  const { value: count, ref } = useCountUp(value);
  return (
    <div
      ref={ref}
      data-achievement-surface
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 dark:bg-white/[0.03] backdrop-blur-md p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(124,58,237,0.12)]"
    >
      <div className="flex items-center gap-4">
        <div className="flex size-12 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 transition-colors">
          <Icon className="size-6" />
        </div>
        <div>
          <p className="text-3xl font-extrabold text-foreground tabular-nums">
            {count}+
          </p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
      </div>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </div>
  );
}

function TimelineItem({
  year,
  title,
  description,
  highlight,
  idx,
}: {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
  idx: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative pl-8 sm:pl-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ${idx * 0.15}s, transform 0.6s ${idx * 0.15}s`,
      }}
    >
      <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-px bg-border" />
      <div
        className={`absolute left-[6px] sm:left-[10px] top-1.5 size-3.5 rounded-full border-2 ${
          highlight
            ? "border-violet-500 bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
            : "border-border bg-card dark:bg-background"
        }`}
      />

      <div
        className={`rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
          highlight
            ? "border-violet-500/30 bg-violet-50/60 dark:bg-violet-500/[0.06] shadow-[0_0_40px_rgba(139,92,246,0.1)]"
            : "border-border bg-card/50 dark:bg-white/[0.02] hover:border-primary/20"
        }`}
      >
        <span className="inline-block rounded-full bg-violet-100 dark:bg-violet-500/15 px-3 py-0.5 text-[11px] font-bold text-violet-700 dark:text-violet-300 tracking-wide mb-2">
          {year}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
          {title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
const GRAD_PHOTOS = [
  {
    src: "https://res.cloudinary.com/virfpzu4/image/upload/f_jpg,q_auto,w_800,c_fill/v1787308624/20251125_095039_bovnbc.heic",
    alt: "Graduation ceremony",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/image/upload/f_jpg,q_auto,w_800,c_fill/v1787308550/20251125_092425_ku77yl.heic",
    alt: "Graduation day",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/image/upload/f_jpg,q_auto,w_800,c_fill/v1787308582/20251125_111457_cki3uj.jpg",
    alt: "Graduation celebration",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/image/upload/f_jpg,q_auto,w_800,c_fill/v1787308297/IMGL9986_uynqcz.jpg",
    alt: "Graduation portrait",
  },
  {
    src: "https://res.cloudinary.com/virfpzu4/image/upload/f_jpg,q_auto,w_800,c_fill/v1787308331/IMGL9987_lpotiw.jpg",
    alt: "Graduation photo",
  },
];

function GraduationCard() {
  const [open, setOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (lightbox === null) return;
    const preload = (src: string) => {
      const img = new window.Image();
      img.src = src;
    };
    const prev =
      GRAD_PHOTOS[(lightbox - 1 + GRAD_PHOTOS.length) % GRAD_PHOTOS.length];
    const next = GRAD_PHOTOS[(lightbox + 1) % GRAD_PHOTOS.length];
    preload(prev.src);
    preload(next.src);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        setLightbox((i) => (i! + 1) % GRAD_PHOTOS.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i! - 1 + GRAD_PHOTOS.length) % GRAD_PHOTOS.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <>
      <div
        data-achievement-surface
        className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-50/80 via-card/90 to-card/90 dark:from-emerald-500/[0.06] dark:via-card/80 dark:to-card/80 p-7 shadow-[0_0_60px_rgba(16,185,129,0.08)] transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(16,185,129,0.25)] hover:border-emerald-500/50"
      >
        <div
          className="absolute -top-24 -left-24 size-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          aria-hidden="true"
        />

        <div className="relative flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <GraduationCap className="size-7" />
            </div>
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 tracking-wide mb-2">
                <Sparkles className="size-3" />
                MILESTONE
              </span>
              <h2 className="text-xl font-extrabold text-foreground leading-snug">
                Graduation — Class of 2025
              </h2>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Graduated in the{" "}
            <strong className="text-foreground">Software Engineering</strong>{" "}
            field from{" "}
            <strong className="text-foreground">
              Telone Center for Learning
            </strong>
            , Class of 2025 — the culmination of years of rigorous study,
            hands-on projects, and continuous growth.
          </p>

          <button
            onClick={() =>
              setOpen((v) => {
                if (!v)
                  GRAD_PHOTOS.forEach((p) => {
                    const img = new window.Image();
                    img.src = p.src;
                  });
                return !v;
              })
            }
            aria-expanded={open}
            className="flex items-center gap-2 self-start text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
          >
            <span>{open ? "Hide gallery" : "View graduation gallery"}</span>
            <ChevronDown
              className="size-4 transition-transform duration-300"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />
          </button>

          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: open ? "600px" : "0px", opacity: open ? 1 : 0 }}
          >
            <div className="pt-1">
              <h3 className="text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                Graduation Gallery
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {GRAD_PHOTOS.map(({ src, alt }, idx) => (
                  <button
                    key={src}
                    onClick={() => setLightbox(idx)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border transition-all hover:border-emerald-500/40 hover:shadow-[0_0_16px_rgba(16,185,129,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    aria-label={`Open ${alt} in fullscreen`}
                  >
                    <img
                      src={src}
                      alt={alt}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-[10px] font-semibold bg-black/50 px-2 py-1 rounded-full">
                        View
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
          }}
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4 flex flex-col items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Counter */}
            <p className="text-white/60 text-xs font-medium tracking-wide">
              {lightbox + 1} / {GRAD_PHOTOS.length}
            </p>

            {/* Main image */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center">
              <img
                src={GRAD_PHOTOS[lightbox].src}
                alt={GRAD_PHOTOS[lightbox].alt}
                className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
              />
            </div>

            {/* Caption */}
            <p className="text-white/70 text-sm">{GRAD_PHOTOS[lightbox].alt}</p>

            {/* Thumbnail strip */}
            <div className="flex gap-2 mt-1">
              {GRAD_PHOTOS.map(({ src, alt }, idx) => (
                <button
                  key={src}
                  onClick={() => setLightbox(idx)}
                  className={`relative size-12 overflow-hidden rounded-lg border-2 transition-all ${idx === lightbox ? "border-emerald-400 scale-110" : "border-white/20 opacity-60 hover:opacity-100"}`}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(
                (i) => (i! - 1 + GRAD_PHOTOS.length) % GRAD_PHOTOS.length,
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
            aria-label="Previous photo"
          >
            <ChevronRight className="size-5 rotate-180" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! + 1) % GRAD_PHOTOS.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-sm"
            aria-label="Next photo"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Close button */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-16 right-4 flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 text-white px-4 py-2 text-xs font-bold shadow-xl border border-white/20 transition-all cursor-pointer"
            aria-label="Close lightbox"
          >
            <span className="text-base font-bold">✕</span>
            <span>Close</span>
          </button>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────
   Main page content
   ───────────────────────────────────────────── */
export function AchievementsContent() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const surfaces = document.querySelectorAll<HTMLElement>(
      "[data-achievement-surface]",
    );
    if (!surfaces.length) return;

    const animation = animate(surfaces, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: stagger(90),
      duration: 650,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, []);

  const isDark = !mounted || resolvedTheme === "dark";
  const bgFill = isDark ? "#000000" : "#f1f5f9";

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-background"
      style={{ backgroundColor: bgFill }}
    >
      {/* ── Ambient light beams (purple diagonal, matching hero-landing) ── */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "8%",
            width: "2px",
            height: "120%",
            background:
              "linear-gradient(180deg, transparent 0%, #c084fc 25%, #ffffff 50%, #c084fc 75%, transparent 100%)",
            transform: "rotate(32deg)",
            transformOrigin: "top center",
            filter: "blur(0.5px)",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-10%",
            left: "4%",
            width: "220px",
            height: "110%",
            background:
              "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.06) 15%, rgba(168,85,247,0.25) 40%, rgba(168,85,247,0.06) 70%, transparent 100%)",
            transform: "rotate(32deg)",
            transformOrigin: "top center",
            filter: "blur(55px)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground font-medium">Achievements</span>
        </nav>

        {/* Page heading */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-3">
            <p className="text-xs font-semibold text-violet-600 dark:text-violet-400 tracking-wide uppercase">
              Personal Achievements
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
            Milestones &{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg,#a855f7,#7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Achievements
            </span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-2xl">
            A collection of awards, recognitions, and key milestones that have
            shaped my journey as a software developer and engineer.
          </p>
        </div>

        {/* ── Achievement cards — side by side on desktop ──────── */}
        <div className="relative isolate grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 items-stretch">
          <WavyBackground
            containerClassName="!absolute top-0 left-1/2 !right-auto !w-screen !h-full -translate-x-1/2 pointer-events-none"
            className="hidden"
            backgroundFill={bgFill}
            waveOpacity={isDark ? 0.55 : 0.4}
            blur={10}
            speed="slow"
            waveWidth={52}
            fitContainer
            colors={isDark ? DARK_WAVE_COLORS : LIGHT_WAVE_COLORS}
          />

          {/* GreenSpace award card */}
          <div
            data-achievement-surface
            className="relative z-10 overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-br from-violet-50/80 via-card/90 to-card/90 dark:from-violet-500/[0.08] dark:via-card/80 dark:to-card/80 p-7 shadow-[0_0_60px_rgba(139,92,246,0.1)] h-full transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(139,92,246,0.35)] hover:border-violet-500/50"
          >
            {/* Background glow */}
            <div
              className="absolute -top-24 -right-24 size-72 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col gap-5">
              {/* Header row */}
              <div className="flex items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 text-white shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                  <Medal className="size-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 dark:bg-violet-500/20 px-3 py-0.5 text-[11px] font-bold text-violet-700 dark:text-violet-300 tracking-wide mb-2">
                    <Sparkles className="size-3" />
                    FEATURED ACHIEVEMENT
                  </span>
                  <h2 className="text-xl font-extrabold text-foreground leading-snug">
                    Best Innovative Project — GreenSpace
                  </h2>
                </div>
              </div>

              {/* Body */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                Awarded{" "}
                <strong className="text-foreground">
                  Best Innovative Project by a Male Student in Software
                  Engineering
                </strong>{" "}
                by{" "}
                <strong className="text-foreground">
                  Telone Center for Learning
                </strong>{" "}
                for the <strong className="text-foreground">GreenSpace</strong>{" "}
                project — recognised for exceptional technical innovation,
                real-world impact, and creative problem-solving. Presented to
                project creator{" "}
                <strong className="text-foreground">Witness Musonza</strong>.
              </p>
            </div>
          </div>

          {/* Graduation card */}
          <div className="relative z-10">
            <GraduationCard />
          </div>
        </div>

        {/* ── Stats row ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <StatCard
            icon={Trophy}
            value={1}
            label="Best Innovative Project Awards"
          />
          <StatCard icon={Star} value={10} label="Projects Delivered" />
          <StatCard icon={BadgeCheck} value={5} label="Certifications Earned" />
        </div>

        {/* ── Achievement timeline ───────────────────────────────── */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
            Journey Timeline
          </h2>
        </div>

        <div className="flex flex-col gap-6">
          <TimelineItem
            idx={0}
            year="2025"
            title="Best Innovative Project — GreenSpace"
            description="Awarded Best Innovative Project by a Male Student in Software Engineering by Telone Center for Learning. GreenSpace showcased multi-layer soil analysis, YOLOv5 detection, and a custom CNN classifier — earning Witness Musonza this prestigious recognition."
            highlight
          />
          <TimelineItem
            idx={1}
            year="2024"
            title="Fullstack Portfolio Redesign"
            description="Redesigned and rebuilt my developer portfolio from the ground up using Next.js, Tailwind CSS, and modern animation libraries — creating a premium, performant web experience."
          />
          <TimelineItem
            idx={2}
            year="2024"
            title="Multiple Certifications"
            description="Earned industry-recognised certifications in software development, cloud computing, and systems architecture, solidifying expertise across the stack."
          />
          <TimelineItem
            idx={3}
            year="2023"
            title="First Major Client Project"
            description="Successfully delivered a full-scale application for a real-world client, handling everything from requirements gathering to deployment and maintenance."
          />
          <TimelineItem
            idx={4}
            year="2022"
            title="Started Software Engineering Journey"
            description="Began formal studies and self-directed learning in software engineering, building a strong foundation in algorithms, data structures, and modern development practices."
          />
        </div>

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Interested in working together?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.5)] transition-all hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(124,58,237,0.7)]"
          >
            Get in Touch
            <ChevronRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
