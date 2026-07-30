import { Code2, Star, Rocket, Users } from "lucide-react";

const stats = [
  {
    icon: Code2,
    value: "15+",
    label: "Projects Completed",
    subtext: "Across various domains",
    glow: "from-violet-500/15 to-violet-500/5 border-violet-500/20",
    iconBg: "bg-violet-500/15 border-violet-500/30 text-violet-400",
  },
  {
    icon: Star,
    value: "2+",
    label: "Years of Experience",
    subtext: "Building solutions",
    glow: "from-sky-500/15 to-sky-500/5 border-sky-500/20",
    iconBg: "bg-sky-500/15 border-sky-500/30 text-sky-400",
  },
  {
    icon: Rocket,
    value: "10+",
    label: "Technologies",
    subtext: "And continuously growing",
    glow: "from-emerald-500/15 to-emerald-500/5 border-emerald-500/20",
    iconBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
  },
  {
    icon: Users,
    value: "10+",
    label: "Happy Clients",
    subtext: "Satisfaction guaranteed",
    glow: "from-fuchsia-500/15 to-fuchsia-500/5 border-fuchsia-500/20",
    iconBg: "bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-400",
  },
];

export function StatsBar() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-3 sm:py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {stats.map(({ icon: Icon, value, label, subtext, glow, iconBg }) => (
          <div
            key={label}
            className={`rounded-xl border bg-card/40 backdrop-blur-md p-3 bg-gradient-to-br ${glow}`}
          >
            <div
              className={`size-7 rounded-lg border flex items-center justify-center mb-2 ${iconBg}`}
            >
              <Icon className="size-3.5" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-foreground leading-none">
              {value}
            </p>
            <p className="mt-1 text-[11px] sm:text-xs font-semibold text-foreground leading-tight">
              {label}
            </p>
            <p className="mt-0.5 text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
              {subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
