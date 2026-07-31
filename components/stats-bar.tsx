import { Code2, Star, Rocket, Users } from "lucide-react";

const stats = [
  {
    icon: Code2,
    value: "4",
    label: "Projects Completed",
    subtext: "Across various domains of web, mobile and systems development",
    iconBg: "bg-sky-500/15 border-sky-400/40 text-sky-400",
    iconGlow: "shadow-[0_0_18px_rgba(56,189,248,0.4)]",
  },
  {
    icon: Star,
    value: "2",
    label: "Years of Experience",
    subtext: "Building solutions",
    iconBg: "bg-violet-500/15 border-violet-400/40 text-violet-400",
    iconGlow: "shadow-[0_0_18px_rgba(167,139,250,0.4)]",
  },
  {
    icon: Rocket,
    value: "5+",
    label: " Full-Stack Technologies",
    subtext: "And continuously growing",
    iconBg: "bg-emerald-500/15 border-emerald-400/40 text-emerald-400",
    iconGlow: "shadow-[0_0_18px_rgba(52,211,153,0.4)]",
  },
  {
    icon: Users,
    value: "3",
    label: "Models Trained",
    subtext: "Knowledge in applicarion of modrl training",
    iconBg: "bg-fuchsia-500/15 border-fuchsia-400/40 text-fuchsia-400",
    iconGlow: "shadow-[0_0_18px_rgba(232,121,249,0.4)]",
  },
];

export function StatsBar() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 py-3 sm:py-4">
      <div
        className="rounded-2xl p-[1px] shadow-[0_0_30px_rgba(139,92,246,0.1)]"
        style={{
          background:
            "linear-gradient(90deg, rgba(167,139,250,0.3), rgba(56,189,248,0.15), rgba(139,92,246,0.2))",
        }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-card/60 dark:bg-[#0c0c12]/70 backdrop-blur-xl">
          <div className="absolute inset-0 opacity-40 pointer-events-none bg-gradient-to-br from-white/[0.04] to-transparent" />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border/60">
            {stats.map(({ icon: Icon, value, label, subtext, iconBg, iconGlow }) => (
              <div key={label} className="p-3.5 sm:p-4">
                <div
                  className={`size-8 rounded-xl border flex items-center justify-center mb-2.5 ${iconBg} ${iconGlow}`}
                >
                  <Icon className="size-4" />
                </div>
                <p className="text-xl sm:text-2xl font-extrabold text-foreground leading-none">
                  {value}
                </p>
                <p className="mt-1.5 text-[11px] sm:text-xs font-semibold text-foreground leading-tight">
                  {label}
                </p>
                <p className="mt-0.5 text-[9px] sm:text-[10px] text-muted-foreground leading-tight">
                  {subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
