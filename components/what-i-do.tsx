import Link from "next/link";
import { ArrowUpRight, Code2, Database, Pencil, Cloud } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Fullstack Development",
    tagline: "Service · Engineering",
    description:
      "Building robust end-to-end applications with modern web and mobile stacks.",
    gradient: "from-indigo-700 via-indigo-600 to-purple-900",
  },
  {
    icon: Database,
    title: "Backend Engineering",
    tagline: "Service · Architecture",
    description:
      "Designing scalable APIs, databases and cloud-ready microservice architectures.",
    gradient: "from-blue-600 via-sky-500 to-indigo-900",
  },
  {
    icon: Pencil,
    title: "UI/UX Development",
    tagline: "Service · Product Design",
    description:
      "Crafting responsive, sleek, and highly intuitive user interfaces.",
    gradient: "from-cyan-700 via-teal-600 to-blue-900",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    tagline: "Service · Cloud Systems",
    description:
      "Containerization, automated CI/CD pipelines and seamless cloud deployments.",
    gradient: "from-violet-800 via-purple-700 to-pink-900",
  },
];

export function WhatIDo() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5">
      <div className="text-center mb-4 sm:mb-5">
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
          What I do
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Turning ideas into powerful digital experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {services.map(({ icon: Icon, title, tagline, description, gradient }) => (
          <div
            key={title}
            className="group flex flex-col rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#080812]/90 backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-md hover:border-violet-500/50 dark:hover:border-violet-500/40 hover:shadow-[0_12px_36px_rgba(124,58,237,0.18)] hover:-translate-y-0.5"
          >
            {/* Top Thumbnail Banner Box */}
            <div className="p-2 pb-0">
              <div
                className={`w-full h-20 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden shadow-inner`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon className="size-7 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
              </div>
            </div>

            {/* Card Content Body */}
            <div className="flex flex-col flex-1 p-3.5 gap-2 justify-between">
              <div>
                <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 tracking-wide uppercase">
                  {tagline}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-foreground dark:text-white leading-snug mt-0.5">
                  {title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                  {description}
                </p>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-between pt-2.5 border-t border-border/60 dark:border-white/10 mt-2">
                <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400">View projects</span>
                <Link
                  href="/projects"
                  aria-label={`Explore ${title}`}
                  className="flex size-7 items-center justify-center rounded-full border border-border/80 dark:border-white/15 bg-muted/60 dark:bg-white/5 text-foreground/80 dark:text-slate-300 transition-all group-hover:bg-violet-600 group-hover:text-white group-hover:border-violet-500 group-hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]"
                >
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

