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
    <div className="w-full max-w-[240px] rounded-xl overflow-hidden border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.45)] font-mono text-[11px] shrink-0">
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-1">
          <span className="size-2 rounded-full bg-red-500/80" />
          <span className="size-2 rounded-full bg-yellow-500/80" />
          <span className="size-2 rounded-full bg-green-500/80" />
          <span className="ml-1.5 text-[10px] text-white/50">~/developer.sh</span>
        </div>
        <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400">
          <span className="size-1 rounded-full bg-emerald-400 animate-pulse" />
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
                      : "text-white/90"
                  }
                >
                  {line.text}
                </span>
              </>
            ) : line.type === "bullet" ? (
              <span className="text-cyan-300/90 pl-4 flex items-center gap-2">
                <span className="text-white/40">•</span>
                {line.text}
              </span>
            ) : (
              <span className="text-cyan-300/90 pl-4">{line.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
