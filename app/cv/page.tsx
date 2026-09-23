"use client";

import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileText,
  Mail,
  Maximize2,
  X,
} from "lucide-react";
import Link from "next/link";

const CV_PAGE_URLS = [
  "https://res.cloudinary.com/virfpzu4/image/upload/pg_1,w_1600,q_auto,f_auto/v1790154669/witness_musonza_cv_tnsnt0.jpg",
  "https://res.cloudinary.com/virfpzu4/image/upload/pg_2,w_1600,q_auto,f_auto/v1790154669/witness_musonza_cv_tnsnt0.jpg",
];

function blockDocumentSaving(event: SyntheticEvent) {
  event.preventDefault();
}

export default function CVPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePage, setActivePage] = useState(0);

  function openPage(index: number) {
    setActivePage(index);
    setLightboxOpen(true);
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "Escape" ||
        ((event.ctrlKey || event.metaKey) && ["s", "p", "u"].includes(event.key.toLowerCase()))
      ) {
        event.preventDefault();
        if (event.key === "Escape") setLightboxOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <main
      className="min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 lg:px-12"
      onContextMenu={blockDocumentSaving}
    >
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
                onClick={() => openPage(0)}
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
            className="relative overflow-hidden rounded-xl border border-border bg-card p-3 shadow-[0_24px_80px_rgba(15,23,42,0.22)] sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between px-1">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-500">
                  Original document
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Curriculum vitae · 2 pages
                </p>
              </div>
              <button
                type="button"
                onClick={() => openPage(0)}
                className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-violet-500"
                aria-label="Open CV in lightbox"
                title="Open CV in lightbox"
              >
                <Maximize2 className="size-4" />
              </button>
            </div>
            <div className="space-y-4">
              {CV_PAGE_URLS.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => openPage(index)}
                  className="block max-h-[min(72vh,820px)] w-full cursor-zoom-in overflow-hidden rounded-md bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
                  aria-label={`Open CV page ${index + 1} in lightbox`}
                >
                  <img
                    src={src}
                    alt={`Witness H Musonza CV page ${index + 1}`}
                    className="block h-auto max-h-[min(72vh,820px)] w-full object-contain object-top select-none"
                    draggable={false}
                    onContextMenu={blockDocumentSaving}
                  />
                </button>
              ))}
            </div>
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
          onContextMenu={blockDocumentSaving}
        >
          <div
            className="relative h-[94vh] w-full max-w-6xl overflow-y-auto rounded-xl border border-white/15 bg-slate-100 p-3 shadow-2xl sm:p-5"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="fixed right-5 top-5 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors hover:bg-violet-600"
              aria-label="Close CV lightbox"
              title="Close CV lightbox"
            >
              <X className="size-5" />
            </button>
            <div className="relative mx-auto flex h-full max-w-4xl items-center justify-center">
              <img
                src={CV_PAGE_URLS[activePage]}
                alt={`Witness H Musonza CV page ${activePage + 1}`}
                className="max-h-full max-w-full select-none bg-white object-contain shadow-sm"
                draggable={false}
                onContextMenu={blockDocumentSaving}
              />
              <button
                type="button"
                onClick={() =>
                  setActivePage(
                    (page) => (page - 1 + CV_PAGE_URLS.length) % CV_PAGE_URLS.length,
                  )
                }
                className="absolute left-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors hover:bg-violet-600"
                aria-label="Previous CV page"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActivePage((page) => (page + 1) % CV_PAGE_URLS.length)
                }
                className="absolute right-2 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-900/80 text-white transition-colors hover:bg-violet-600"
                aria-label="Next CV page"
              >
                <ChevronRight className="size-5" />
              </button>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white">
                Page {activePage + 1} of {CV_PAGE_URLS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
