import Link from "next/link";
import { ArrowUpRight, Code2, Database, Pencil, Cloud } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Fullstack Development",
    description:
      "End-to-end web apps with modern frameworks and seamless user experiences.",
    iconBg: "bg-violet-500/15 border-violet-400/40 text-violet-400",
    iconGlow: "shadow-[0_0_18px_rgba(167,139,250,0.4)]",
    border: "border-violet-500/15 hover:border-violet-400/35",
  },
  {
    icon: Database,
    title: "Backend Engineering",
    description:
      "Scalable APIs, database architecture, and high-performance server solutions.",
    iconBg: "bg-sky-500/15 border-sky-400/40 text-sky-400",
    iconGlow: "shadow-[0_0_18px_rgba(56,189,248,0.4)]",
    border: "border-sky-500/15 hover:border-sky-400/35",
  },
  {
    icon: Pencil,
    title: "UI/UX Development",
    description:
      "Beautiful, intuitive interfaces built with modern design principles.",
    iconBg: "bg-emerald-500/15 border-emerald-400/40 text-emerald-400",
    iconGlow: "shadow-[0_0_18px_rgba(52,211,153,0.4)]",
    border: "border-emerald-500/15 hover:border-emerald-400/35",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description:
      "CI/CD pipelines, containerization, and reliable cloud deployments.",
    iconBg: "bg-fuchsia-500/15 border-fuchsia-400/40 text-fuchsia-400",
    iconGlow: "shadow-[0_0_18px_rgba(232,121,249,0.4)]",
    border: "border-fuchsia-500/15 hover:border-fuchsia-400/35",
  },
];

export function WhatIDo() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-4 sm:py-5">
      <div className="text-center mb-4 sm:mb-5">
        <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
          What I do
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Turning ideas into powerful digital experiences
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        {services.map(
          ({ icon: Icon, title, description, iconBg, iconGlow, border }) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-2xl border bg-card/60 dark:bg-[#0c0c12]/70 backdrop-blur-xl p-4 transition-all duration-300 hover:bg-card dark:hover:bg-[#101018]/85 ${border}`}
            >
              <div className="absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />

              <div
                className={`relative size-9 rounded-xl border flex items-center justify-center mb-3 ${iconBg} ${iconGlow}`}
              >
                <Icon className="size-4" />
              </div>
              <h3 className="relative text-sm font-bold text-foreground leading-tight">
                {title}
              </h3>
              <p className="relative mt-1.5 text-xs text-muted-foreground leading-snug pr-8 line-clamp-2">
                {description}
              </p>
              <Link
                href="/projects"
                aria-label={`Explore ${title}`}
                className="absolute bottom-3.5 right-3.5 flex size-7 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-all group-hover:border-violet-400/40 group-hover:text-violet-400 group-hover:bg-violet-500/10 group-hover:shadow-[0_0_14px_rgba(167,139,250,0.35)]"
              >
                <ArrowUpRight className="size-3.5" />
              </Link>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
