import { Code2, Star, Rocket, Users } from "lucide-react";

const stats = [
  {
    icon: Code2,
    value: "15+",
    label: "Projects Completed",
    category: "Portfolio · Engineering",
    subtext: "Across web, mobile & systems domains",
    gradient: "from-indigo-700 via-indigo-600 to-purple-900",
  },
  {
    icon: Star,
    value: "2+",
    label: "Years Experience",
    category: "Career · Growth",
    subtext: "Building scalable digital solutions",
    gradient: "from-blue-600 via-sky-500 to-indigo-900",
  },
  {
    icon: Rocket,
    value: "10+",
    label: "Technologies",
    category: "Stack · Expertise",
    subtext: "Mastered and continuously expanding",
    gradient: "from-cyan-700 via-teal-600 to-blue-900",
  },
  {
    icon: Users,
    value: "10+",
    label: "Happy Clients",
    category: "Impact · Trust",
    subtext: "High satisfaction & quality guaranteed",
    gradient: "from-violet-800 via-purple-700 to-pink-900",
  },
];

export function StatsBar() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(
          ({ icon: Icon, value, label, category, subtext, gradient }) => (
            <div
              key={label}
              className="group flex flex-col rounded-2xl border border-border/80 dark:border-white/10 bg-card/90 dark:bg-[#080812]/90 backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-md hover:border-violet-500/50 dark:hover:border-violet-500/40 hover:shadow-[0_10px_30px_rgba(124,58,237,0.15)] hover:-translate-y-0.5"
            >
              {/* Top Thumbnail Banner Box */}
              <div className="p-2 pb-0">
                <div
                  className={`w-full h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden shadow-inner`}
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="size-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col p-3 gap-1">
                <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 tracking-wide uppercase">
                  {category}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-foreground dark:text-white tracking-tight">
                    {value}
                  </h3>
                  <span className="text-xs font-bold text-foreground/80 dark:text-slate-200">
                    {label}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2">
                  {subtext}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
