import { Code2, Star, Rocket, Users } from "lucide-react";

const stats = [
  {
    icon: Code2,
    value: "5+",
    label: "Projects Completed",
    category: "Frontend · Backend · Engineering",
    subtext: "Across web, mobile & systems domains",
    iconBg: "bg-sky-500/15 border-sky-400/30 text-sky-500 dark:text-sky-400",
    iconGlow: "shadow-[0_0_16px_rgba(56,189,248,0.35)]",
  },
  {
    icon: Star,
    value: "2",
    label: "Years Experience",
    category: "Career · Growth",
    subtext: "Building scalable digital solutions",
    iconBg: "bg-violet-500/15 border-violet-400/30 text-violet-500 dark:text-violet-400",
    iconGlow: "shadow-[0_0_16px_rgba(167,139,250,0.35)]",
  },
  {
    icon: Rocket,
    value: "10+",
    label: "Technologies",
    category: "Tech Stack · Expertise",
    subtext: "Mastered and continuously expanding",
    iconBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-600 dark:text-emerald-400",
    iconGlow: "shadow-[0_0_16px_rgba(52,211,153,0.35)]",
  },
  {
    icon: Users,
    value: "3+",
    label: "Models Trained",
    category: "Machine Learning · Customization",
    subtext: "High satisfaction & quality guaranteed",
    iconBg: "bg-fuchsia-500/15 border-fuchsia-400/30 text-fuchsia-500 dark:text-fuchsia-400",
    iconGlow: "shadow-[0_0_16px_rgba(232,121,249,0.35)]",
  },
];

export function StatsBar() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
      <div
        className="rounded-2xl p-[1px] shadow-[0_0_24px_rgba(139,92,246,0.12)]"
        style={{
          background:
            "linear-gradient(90deg, rgba(167,139,250,0.35), rgba(56,189,248,0.2), rgba(139,92,246,0.25))",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 dark:bg-black/30 backdrop-blur-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none dark:from-white/[0.06]" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            {stats.map(
              ({ icon: Icon, value, label, category, subtext, iconBg, iconGlow }) => (
                <div key={label} className="p-4 sm:p-4.5">
                  <div
                    className={`size-8 rounded-lg border flex items-center justify-center mb-2.5 ${iconBg} ${iconGlow}`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 tracking-wide uppercase">
                    {category}
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                      {value}
                    </h3>
                    <span className="text-xs font-bold text-foreground/80">
                      {label}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2 mt-1">
                    {subtext}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
