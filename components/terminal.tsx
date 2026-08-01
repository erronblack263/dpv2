"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type TerminalLine = {
  type: "prompt" | "output" | "bullet" | "highlight" | "error";
  text: string;
};

const getLineContent = (line: TerminalLine) => {
  if (line.type === "prompt") {
    return (
      <>
        <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
          $
        </span>
        <span className="text-violet-700 dark:text-violet-300 font-medium">
          {line.text}
        </span>
      </>
    );
  }

  if (line.type === "bullet") {
    return (
      <span className="text-slate-700 dark:text-violet-200/90 pl-3 flex items-center gap-1.5">
        <span className="text-violet-600 dark:text-violet-400 text-[9px]">
          •
        </span>
        {line.text}
      </span>
    );
  }

  if (line.type === "highlight") {
    return (
      <span className="text-cyan-600 dark:text-cyan-400 font-semibold pl-3 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]">
        {line.text}
      </span>
    );
  }

  if (line.type === "error") {
    return (
      <span className="text-rose-600 dark:text-rose-400 pl-3">{line.text}</span>
    );
  }

  return (
    <span className="text-slate-800 dark:text-slate-200 pl-3">{line.text}</span>
  );
};

const getHelpLines = (): TerminalLine[] => [
  { type: "output", text: "Available commands:" },
  { type: "bullet", text: "whoami" },
  { type: "bullet", text: "skills" },
  { type: "bullet", text: "status" },
  { type: "bullet", text: "mission" },
  { type: "bullet", text: "projects" },
  { type: "bullet", text: "certificates" },
  { type: "bullet", text: "contact" },
  { type: "bullet", text: "clear" },
];

const makeCommandResponse = (command: string): TerminalLine[] => {
  const trimmed = command.trim();
  const normalized = trimmed.toLowerCase();

  if (!trimmed) {
    return [] as TerminalLine[];
  }

  if (normalized === "help" || normalized === "?") {
    return getHelpLines();
  }

  if (normalized === "whoami") {
    return [{ type: "output", text: "Witness H Musonza" }];
  }

  if (normalized === "skills" || normalized === "skills --list") {
    return [
      { type: "output", text: "Core stack:" },
      { type: "bullet", text: "Java" },
      { type: "bullet", text: "Spring Boot" },
      { type: "bullet", text: "Flutter" },
      { type: "bullet", text: "Docker" },
      { type: "bullet", text: "PostgreSQL" },
      { type: "bullet", text: "Redis" },
      { type: "bullet", text: "TypeScript" },
    ];
  }

  if (normalized === "status") {
    return [{ type: "highlight", text: "Building scalable solutions" }];
  }

  if (normalized === "mission") {
    return [{ type: "highlight", text: "Making an impact every day 🚀" }];
  }

  if (
    normalized === "projects" ||
    normalized === "project" ||
    normalized.startsWith("cd project") ||
    normalized.startsWith("open project") ||
    normalized.startsWith("goto project")
  ) {
    return [{ type: "highlight", text: "Navigating to /projects..." }];
  }

  if (normalized === "contact") {
    return [{ type: "output", text: "Opening contact form..." }];
  }

  if (normalized === "certificates") {
    return [{ type: "highlight", text: "Navigating to /certificates..." }];
  }

  if (normalized === "clear") {
    return [];
  }

  return [
    { type: "error", text: `command not found: ${trimmed}` },
    { type: "output", text: "Try one of the commands shown above." },
  ];
};

export function Terminal() {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", text: "Welcome to the developer terminal." },
    ...getHelpLines(),
    { type: "output", text: "Type a command to explore the portfolio." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo({
      top: outputRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const submitCommand = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    const normalized = trimmed.toLowerCase();
    const response = makeCommandResponse(trimmed);
    setLines((current) => [
      ...current,
      { type: "prompt", text: trimmed },
      ...response,
    ]);

    if (
      normalized === "projects" ||
      normalized === "project" ||
      normalized.startsWith("cd project") ||
      normalized.startsWith("open project") ||
      normalized.startsWith("goto project")
    ) {
      setTimeout(() => router.push("/projects"), 300);
    }

    if (normalized === "contact") {
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-contact-drawer"));
        }
      }, 300);
    }

    if (normalized === "certificates") {
      setTimeout(() => router.push("/certificates"), 300);
    }

    setHistory((current) => [...current, trimmed]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitCommand(input);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) {
        return;
      }

      const nextIndex =
        historyIndex < 0 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (history.length === 0) {
        return;
      }

      const nextIndex =
        historyIndex < 0 ? -1 : Math.min(history.length - 1, historyIndex + 1);
      setHistoryIndex(nextIndex);
      setInput(nextIndex >= 0 ? history[nextIndex] : "");
    }
  };

  return (
    <div className="relative w-full max-w-full lg:max-w-[320px] xl:max-w-[350px] shrink-0 mx-auto lg:ml-auto">
      <div
        className="rounded-xl p-[1px] shadow-[0_0_30px_rgba(139,92,246,0.18)] transition-all"
        style={{
          background:
            "linear-gradient(135deg, rgba(167,139,250,0.45), rgba(56,189,248,0.25), rgba(139,92,246,0.15))",
        }}
      >
        <div className="rounded-xl overflow-hidden bg-white/95 dark:bg-[#07070e]/95 backdrop-blur-xl font-mono text-[11px] shadow-xl border border-border/80 dark:border-white/10">
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
              <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />{" "}
              Interactive
            </span>
          </div>

          <div
            ref={outputRef}
            className="p-3 space-y-1 min-h-[220px] max-h-[320px] overflow-y-auto"
          >
            {lines.map((line, index) => (
              <div
                key={`${line.text}-${index}`}
                className="flex items-start gap-1.5 leading-snug"
              >
                {getLineContent(line)}
              </div>
            ))}

            <form
              onSubmit={handleSubmit}
              className="mt-2 flex items-center gap-1.5 leading-snug"
            >
              <span className="text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                $
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="Type a command"
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
