"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, FileText, Mail, Maximize2, X } from "lucide-react";
import Link from "next/link";

const CV_URL =
  "https://res.cloudinary.com/virfpzu4/image/upload/v1790154669/witness_musonza_cv_tnsnt0.pdf";

export default function CVPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <main className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" /> Back to About
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
            <FileText className="size-4 text-violet-500" /> CV showcase
          </div>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <section className="lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-500">
              Curriculum Vitae
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Witness H Musonza
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              View the original CV in a focused document viewer.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(124,58,237,0.4)] transition-all hover:bg-violet-500"
              >
                <Maximize2 className="size-4" /> Open full CV
              </button>
              <a
                href="mailto:musonzahw@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                <Mail className="size-4" /> Contact me
              </a>
            </div>
          </section>

          <section
            aria-label="CV preview"
            className="relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-500">
                  Original document
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  witness_musonza_cv.pdf
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-violet-500"
                aria-label="Open CV in lightbox"
                title="Open CV in lightbox"
              >
                <Maximize2 className="size-4" />
              </button>
            </div>
            <iframe
              title="Witness H Musonza CV preview"
              src={`${CV_URL}#view=FitH`}
              className="h-[min(78vh,900px)] w-full bg-white"
            />
          </section>
        </div>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/85 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Curriculum Vitae lightbox"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative h-[94vh] w-full max-w-6xl overflow-hidden rounded-xl border border-white/15 bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute right-3 top-3 z-10">
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors hover:bg-violet-600"
                aria-label="Close CV lightbox"
                title="Close CV lightbox"
              >
                <X className="size-5" />
              </button>
            </div>
            <iframe
              title="Witness H Musonza CV lightbox"
              src={`${CV_URL}#view=FitH`}
              className="h-full w-full bg-white"
            />
          </div>
        </div>
      )}
    </main>
  );
}
