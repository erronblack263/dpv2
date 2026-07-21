"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const sections = [
  {
    title: "Auth Screens",
    images: [
      {
        src: "/artifacts/greenspace/auth/splash.jpg",
        caption: "Splash Screen",
      },
      {
        src: "/artifacts/greenspace/auth/auth_selection screen.jpg",
        caption: "Auth Selection",
      },
      {
        src: "/artifacts/greenspace/auth/login screen.jpg",
        caption: "Login Screen",
      },
      {
        src: "/artifacts/greenspace/auth/signup screen.jpg",
        caption: "Sign Up Screen",
      },
      {
        src: "/artifacts/greenspace/auth/4got pass.jpg",
        caption: "Forgot Password",
      },
    ],
  },
  {
    title: "Dashboard Screens",
    images: [
      {
        src: "/artifacts/greenspace/dashboard/dashboard screen.jpg",
        caption: "Dashboard",
      },
      {
        src: "/artifacts/greenspace/dashboard/events screen.jpg",
        caption: "Events",
      },
      {
        src: "/artifacts/greenspace/dashboard/forum screen (1).jpg",
        caption: "Forum Screen 1",
      },
      {
        src: "/artifacts/greenspace/dashboard/forum screen (2).jpg",
        caption: "Forum Screen 2",
      },
      {
        src: "/artifacts/greenspace/dashboard/green guardian reports (1).jpg",
        caption: "Green Guardian Reports 1",
      },
      {
        src: "/artifacts/greenspace/dashboard/green guardian reports (2).jpg",
        caption: "Green Guardian Reports 2",
      },
      {
        src: "/artifacts/greenspace/dashboard/green guardian.jpg",
        caption: "Green Guardian",
      },
      {
        src: "/artifacts/greenspace/dashboard/image reco scr.jpg",
        caption: "Image Recognition Screen",
      },
      {
        src: "/artifacts/greenspace/dashboard/image reco.jpg",
        caption: "Image Recognition Result",
      },
      {
        src: "/artifacts/greenspace/dashboard/image recoo.jpg",
        caption: "Image Recognition Detail",
      },
      {
        src: "/artifacts/greenspace/dashboard/news screen (1).jpg",
        caption: "News Screen 1",
      },
      {
        src: "/artifacts/greenspace/dashboard/news screen (2).jpg",
        caption: "News Screen 2",
      },
    ],
  },
  {
    title: "Image Recognition Engine",
    images: [
      {
        src: "/artifacts/greenspace/image recognition engine/barren soil classification.jpg",
        caption: "Barren Soil Classification",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/phase 1 barren (1).jpg",
        caption: "Phase 1 — Barren",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/phase 1 semi vegetative (1).jpg",
        caption: "Phase 1 — Semi Vegetative 1",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/phase 1 semi vegetative (2).jpg",
        caption: "Phase 1 — Semi Vegetative 2",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/phase 1 semi vegetative (3).jpg",
        caption: "Phase 1 — Semi Vegetative 3",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/semi vegetative detail.jpg",
        caption: "Semi Vegetative Detail",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/suspected fertile (2).jpg",
        caption: "Suspected Fertile 2",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/suspected fertile (3).jpg",
        caption: "Suspected Fertile 3",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/suspected fertile phase 1 (1).jpg",
        caption: "Suspected Fertile Phase 1 — 1",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/suspected fertile phase 1 (2).jpg",
        caption: "Suspected Fertile Phase 1 — 2",
      },
      {
        src: "/artifacts/greenspace/image recognition engine/suspected fertile phase 1 (3).jpg",
        caption: "Suspected Fertile Phase 1 — 3",
      },
    ],
  },
  {
    title: "Profile Screen & Reports",
    images: [
      {
        src: "/artifacts/greenspace/profile screen and reports/profile screen (1).jpg",
        caption: "Profile Screen 1",
      },
      {
        src: "/artifacts/greenspace/profile screen and reports/profile screen (2).jpg",
        caption: "Profile Screen 2",
      },
      {
        src: "/artifacts/greenspace/profile screen and reports/profile edit.jpg",
        caption: "Profile Edit",
      },
      {
        src: "/artifacts/greenspace/profile screen and reports/reports.jpg",
        caption: "Reports",
      },
      {
        src: "/artifacts/greenspace/profile screen and reports/reports modal.jpg",
        caption: "Reports Modal",
      },
      {
        src: "/artifacts/greenspace/profile screen and reports/visual.jpg",
        caption: "Visual 1",
      },
      {
        src: "/artifacts/greenspace/profile screen and reports/visual2.jpg",
        caption: "Visual 2",
      },
      {
        src: "/artifacts/greenspace/profile screen and reports/visua3.jpg",
        caption: "Visual 3",
      },
    ],
  },
];

const allImages = sections.flatMap((s) => s.images);

type SectionType = (typeof sections)[0];

function SectionGallery({
  section,
  globalOffset,
  onOpen,
}: {
  section: SectionType;
  globalOffset: number;
  onOpen: (idx: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 4;
  const total = section.images.length;
  const totalPages = Math.ceil(total / perPage);
  const visible = section.images.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl border border-border bg-card">
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-accent/50"
      >
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold tracking-tight text-foreground">
            {section.title}
          </h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {total} images
          </span>
        </div>
        <ChevronDown
          className={`size-5 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Collapsible content */}
      {open && (
        <div className="border-t border-border px-6 pb-6 pt-4">
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {visible.map((img) => {
              const globalIdx =
                globalOffset +
                section.images.findIndex((i) => i.src === img.src);
              return (
                <button
                  key={img.src}
                  onClick={() => onOpen(globalIdx)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-all hover:border-primary/40 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <div className="h-36 w-full overflow-hidden bg-muted sm:h-40">
                    <img
                      src={img.src}
                      alt={img.caption}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="px-2 py-2 text-xs font-medium text-muted-foreground truncate text-left">
                    {img.caption}
                  </p>
                </button>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`flex size-8 items-center justify-center rounded-lg border text-xs font-semibold transition-colors ${p === page ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-accent"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex size-8 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-accent disabled:opacity-40 disabled:pointer-events-none"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GreenSpaceArtifactsPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function prev() {
    setLightbox((i) =>
      i !== null ? (i - 1 + allImages.length) % allImages.length : null,
    );
  }
  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % allImages.length : null));
  }

  let offset = 0;

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-12 pb-24 sm:px-6">
        <Link
          href="/projects?view=projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to Projects
        </Link>

        <div className="mb-10 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-green-500/15">
            <Trophy className="size-6 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              GreenSpace 🏆 — Project Artifacts
            </h1>
            <p className="mt-2 text-muted-foreground">
              Click a section to expand. Tap any image to view full size.
            </p>
          </div>
        </div>

        {sections.map((section) => {
          const sectionOffset = offset;
          offset += section.images.length;
          return (
            <SectionGallery
              key={section.title}
              section={section}
              globalOffset={sectionOffset}
              onOpen={setLightbox}
            />
          );
        })}
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 pt-20"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="size-6" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-4 max-h-full w-full max-w-lg"
          >
            <img
              src={allImages[lightbox].src}
              alt={allImages[lightbox].caption}
              className="max-h-[60vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
            />
            <p className="text-sm font-medium text-white/80">
              {allImages[lightbox].caption}
            </p>
            <p className="text-xs text-white/40 mb-1">
              {lightbox + 1} / {allImages.length}
            </p>
            <button
              onClick={() => setLightbox(null)}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X className="size-4" /> Close
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}
