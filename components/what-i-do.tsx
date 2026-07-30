import Link from "next/link";
import { ArrowUpRight, Code2, Database, Palette, Cloud } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Fullstack Development",
    description:
      "End-to-end web apps with modern frameworks and seamless user experiences.",
    iconBg: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  },
  {
    icon: Database,
    title: "Backend Engineering",
    description:
      "Scalable APIs, database architecture, and high-performance server solutions.",
    iconBg: "bg-sky-500/15 border-sky-500/30 text-sky-400",
  },
  {
    icon: Palette,
    title: "UI/UX Development",
    description:
      "Beautiful, intuitive interfaces built with modern design principles.",
    iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description:
      "CI/CD pipelines, containerization, and reliable cloud deployments.",
    iconBg: "bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-400",
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
        {services.map(({ icon: Icon, title, description, iconBg }) => (
          <article
            key={title}
            className="group relative rounded-xl border border-border bg-card/40 backdrop-blur-md p-3.5 sm:p-4 transition-all duration-300 hover:border-primary/30 hover:bg-card/60"
          >
            <div
              className={`size-8 rounded-lg border flex items-center justify-center mb-2.5 ${iconBg}`}
            >
              <Icon className="size-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground leading-tight">
              {title}
            </h3>
            <p className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground leading-snug pr-6 line-clamp-2">
              {description}
            </p>
            <Link
              href="/projects"
              aria-label={`Explore ${title}`}
              className="absolute bottom-3 right-3 flex size-6 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-all group-hover:border-primary/40 group-hover:text-primary group-hover:bg-primary/10"
            >
              <ArrowUpRight className="size-3" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
