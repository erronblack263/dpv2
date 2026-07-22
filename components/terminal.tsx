"use client";

import { useEffect, useState, useRef } from "react";

const lines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "Witness H Musonza" },
  { prompt: true, text: "skills" },
  { prompt: false, text: "Java" },
  { prompt: false, text: "Spring Boot" },
  { prompt: false, text: "Flutter" },
  { prompt: false, text: "Docker" },
  { prompt: false, text: "PostgreSQL" },
  { prompt: false, text: "Redis" },
  { prompt: false, text: "TypeScript" },
  { prompt: true, text: "status" },
  { prompt: false, text: "Building scalable solutions" },
  { prompt: false, text: "Making an impact every day 🚀" },
  { prompt: true, text: "_", cursor: true },
];

export function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function showNext(idx: number) {
      if (idx >= lines.length) return;
      setVisibleCount(idx + 1);
      // Prompt lines appear faster, output lines slightly slower
      const delay = lines[idx].prompt ? 500 : 120;
      timerRef.current = setTimeout(() => showNext(idx + 1), delay);
    }
    timerRef.current = setTimeout(() => showNext(0), 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <div className="w-full max-w-xs rounded-2xl overflow-hidden border border-white/10 bg-black/70 backdrop-blur-md shadow-2xl font-mono text-sm shrink-0">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/10">
        <span className="size-3 rounded-full bg-red-500/80" />
        <span className="size-3 rounded-full bg-yellow-500/80" />
        <span className="size-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-xs text-white/40">~developer.sh</span>
      </div>

      {/* Terminal body */}
      <div className="px-4 py-4 space-y-1 min-h-[220px]">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className="flex items-start gap-2 leading-relaxed">
            {line.prompt ? (
              <>
                <span className="text-green-400 shrink-0">$</span>
                <span className={line.cursor ? "text-white/80 animate-pulse" : "text-white/90"}>
                  {line.text}
                </span>
              </>
            ) : (
              <span className="text-cyan-300/90 pl-4">{line.text}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
