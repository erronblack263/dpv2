"use client";

import { useEffect, useState, useRef } from "react";

const lines = [
  { type: "prompt" as const, text: "whoami" },
  { type: "output" as const, text: "Witness H Musonza" },
  { type: "prompt" as const, text: "skills --list" },
  { type: "bullet" as const, text: "Java" },
  { type: "bullet" as const, text: "Spring Boot" },
  { type: "bullet" as const, text: "Flutter" },
  { type: "bullet" as const, text: "Docker" },
  { type: "bullet" as const, text: "PostgreSQL" },
  { type: "bullet" as const, text: "Redis" },
  { type: "bullet" as const, text: "TypeScript" },
  { type: "prompt" as const, text: "status" },
  { type: "highlight" as const, text: "Building scalable solutions" },
  { type: "prompt" as const, text: "mission" },
  { type: "highlight" as const, text: "Making an impact every day 🚀" },
  { type: "prompt" as const, text: "_", cursor: true },
];

export function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function showNext(idx: number) {
      if (idx >= lines.length) return;
      setVisibleCount(idx + 1);
      const delay = lines[idx].type === "prompt" ? 400 : 80;
      timerRef.current = setTimeout(() => showNext(idx + 1), delay);
    }
    timerRef.current = setTimeout(() => showNext(0), 400);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[310px] xl:max-w-[340px] shrink-0 mx-auto lg:ml-auto">
      {/* Outer Glow & Gradient border shell */}
      <div
        className="rounded-xl p-[1px] shadow-[0_0_30px_rgba(139,92,246,0.18)] transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(167,139,250,0.45), rgba(56,189,248,0.25), rgba(139,92,246,0.15))",
        }}
      >
        <div className="rounded-xl overflow-hidden bg-white/95 dark:bg-[#07070e]/95 backdrop-blur-xl font-mono text-[11px] shadow-xl border border-border/80 dark:border-white/10">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-100/80 dark:bg-white/[0.04] border-b border-border/60 dark:border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-[#ff5f56] shadow-[0_0_5px_rgba(255,95,86,0.6)]" />
              <span className="size-2 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_rgba(255,189,46,0.6)]" />
              <span className="size-2 rounded-full bg-[#27c93f] shadow-[0_0_5px_rgba(39,201,63,0.6)]" />
              <span className="ml-1.5 text-[10px] text-slate-500 dark:text-white/50 font-medium">
                ~/.developer.sh
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
              Online
            </span>
          </div>

          {/* Terminal output */}
          <div className="p-3 space-y-1 min-h-[220px]">
            {lines.slice(0, visibleCount).map((line, i) => (
              <div key={i} className="flex items-start gap-1.5 leading-snug">
                {line.type === "prompt" ? (
                  <>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                      $
                    </span>
                    <span
                      className={
                        line.cursor
                          ? "text-slate-900 dark:text-white animate-pulse font-bold"
                          : "text-violet-700 dark:text-violet-300 font-medium"
                      }
                    >
                      {line.text}
                    </span>
                  </>
                ) : line.type === "bullet" ? (
                  <span className="text-slate-700 dark:text-violet-200/90 pl-3 flex items-center gap-1.5">
                    <span className="text-violet-600 dark:text-violet-400 text-[9px]">
                      •
                    </span>
                    {line.text}
                  </span>
                ) : line.type === "highlight" ? (
                  <span className="text-cyan-600 dark:text-cyan-400 font-semibold pl-3 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]">
                    {line.text}
                  </span>
                ) : (
                  <span className="text-slate-800 dark:text-slate-200 pl-3">
                    {line.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
