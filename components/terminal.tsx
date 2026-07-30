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
  { type: "output" as const, text: "Building scalable solutions" },
  { type: "prompt" as const, text: "mission" },
  { type: "output" as const, text: "Making an impact every day 🚀" },
  { type: "prompt" as const, text: "_", cursor: true },
];

export function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function showNext(idx: number) {
      if (idx >= lines.length) return;
      setVisibleCount(idx + 1);
      const delay = lines[idx].type === "prompt" ? 500 : 100;
      timerRef.current = setTimeout(() => showNext(idx + 1), delay);
    }
    timerRef.current = setTimeout(() => showNext(0), 600);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[250px] shrink-0">
      {/* Gradient border shell */}
      <div
        className="rounded-2xl p-[1px] shadow-[0_0_40px_rgba(139,92,246,0.25)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(167,139,250,0.55), rgba(56,189,248,0.25), rgba(139,92,246,0.15))",
        }}
      >
        <div className="rounded-2xl overflow-hidden bg-[#08080e]/90 backdrop-blur-xl font-mono text-[11px]">
          <div className="flex items-center justify-between gap-2 px-3 py-2 bg-white/[0.04] border-b border-white/10">
            <div className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-red-500/90 shadow-[0_0_6px_rgba(239,68,68,0.6)]" />
              <span className="size-2 rounded-full bg-yellow-500/90 shadow-[0_0_6px_rgba(234,179,8,0.6)]" />
              <span className="size-2 rounded-full bg-green-500/90 shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
              <span className="ml-1.5 text-[10px] text-white/45">
                ~/developer.sh
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400">
              <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
              Online
            </span>
          </div>

          <div className="px-3 py-2.5 space-y-0.5 min-h-[170px]">
            {lines.slice(0, visibleCount).map((line, i) => (
              <div key={i} className="flex items-start gap-1.5 leading-snug">
                {line.type === "prompt" ? (
                  <>
                    <span className="text-emerald-400 shrink-0">$</span>
                    <span
                      className={
                        line.cursor
                          ? "text-white/80 animate-pulse"
                          : "text-violet-200/90"
                      }
                    >
                      {line.text}
                    </span>
                  </>
                ) : line.type === "bullet" ? (
                  <span className="text-cyan-300/90 pl-3.5 flex items-center gap-1.5">
                    <span className="text-white/30">•</span>
                    {line.text}
                  </span>
                ) : (
                  <span className="text-sky-300/90 pl-3.5">{line.text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
