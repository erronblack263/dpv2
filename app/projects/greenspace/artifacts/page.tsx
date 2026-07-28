"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";

/* ─── Section metadata (subtitle shown on section card) ──────── */
const sectionMeta: Record<string, { subtitle: string; description: string; gradient: string }> = {
  "Auth Screens": {
    subtitle: "Auth Screens",
    description: "A complete authentication flow for secure access, role selection, registration, and sign-in.",
    gradient: "from-green-900 via-emerald-800 to-lime-900",
  },
  "Dashboard Screens": {
    subtitle: "Community & engagement",
    description: "Events, forum and Green Guardian reporting dashboard.",
    gradient: "from-teal-900 via-green-900 to-emerald-950",
  },
  "Image Recognition Engine": {
    subtitle: "Soil prediction",
    description: "Sage model classification results surfaced as clear, actionable field guidance.",
    gradient: "from-lime-900 via-green-900 to-teal-950",
  },
  "Profile Screen & Reports": {
    subtitle: "User profiles & analytics",
    description: "Visual reporting and profile management for field users.",
    gradient: "from-emerald-950 via-teal-900 to-green-950",
  },
};

/* ─── Image data ──────────────────────────────────────────────── */
const sections = [
  {
    title: "Auth Screens",
    images: [
      { src: "/artifacts/greenspace/auth/splash.jpg", caption: "Splash Screen" },
      { src: "/artifacts/greenspace/auth/auth_selection screen.jpg", caption: "Auth Selection" },
      { src: "/artifacts/greenspace/auth/login screen.jpg", caption: "Login Screen" },
      { src: "/artifacts/greenspace/auth/signup screen.jpg", caption: "Sign Up Screen" },
      { src: "/artifacts/greenspace/auth/4got pass.jpg", caption: "Forgot Password" },
    ],
  },
  {
    title: "Dashboard Screens",
    images: [
      { src: "/artifacts/greenspace/dashboard/dashboard screen.jpg", caption: "Dashboard" },
      { src: "/artifacts/greenspace/dashboard/events screen.jpg", caption: "Events" },
      { src: "/artifacts/greenspace/dashboard/forum screen (1).jpg", caption: "Forum Screen 1" },
      { src: "/artifacts/greenspace/dashboard/forum screen (2).jpg", caption: "Forum Screen 2" },
      { src: "/artifacts/greenspace/dashboard/green guardian reports (1).jpg", caption: "Green Guardian Reports 1" },
      { src: "/artifacts/greenspace/dashboard/green guardian reports (2).jpg", caption: "Green Guardian Reports 2" },
      { src: "/artifacts/greenspace/dashboard/green guardian.jpg", caption: "Green Guardian" },
      { src: "/artifacts/greenspace/dashboard/image reco scr.jpg", caption: "Image Recognition Screen" },
      { src: "/artifacts/greenspace/dashboard/image reco.jpg", caption: "Image Recognition Result" },
      { src: "/artifacts/greenspace/dashboard/image recoo.jpg", caption: "Image Recognition Detail" },
      { src: "/artifacts/greenspace/dashboard/news screen (1).jpg", caption: "News Screen 1" },
      { src: "/artifacts/greenspace/dashboard/news screen (2).jpg", caption: "News Screen 2" },
    ],
  },
  {
    title: "Image Recognition Engine",
    images: [
      { src: "/artifacts/greenspace/image recognition engine/barren soil classification.jpg", caption: "Barren Soil Classification" },
      { src: "/artifacts/greenspace/image recognition engine/phase 1 barren (1).jpg", caption: "Phase 1 — Barren" },
      { src: "/artifacts/greenspace/image recognition engine/phase 1 semi vegetative (1).jpg", caption: "Phase 1 — Semi Vegetative 1" },
      { src: "/artifacts/greenspace/image recognition engine/phase 1 semi vegetative (2).jpg", caption: "Phase 1 — Semi Vegetative 2" },
      { src: "/artifacts/greenspace/image recognition engine/phase 1 semi vegetative (3).jpg", caption: "Phase 1 — Semi Vegetative 3" },
      { src: "/artifacts/greenspace/image recognition engine/semi vegetative detail.jpg", caption: "Semi Vegetative Detail" },
      { src: "/artifacts/greenspace/image recognition engine/suspected fertile (2).jpg", caption: "Suspected Fertile 2" },
      { src: "/artifacts/greenspace/image recognition engine/suspected fertile (3).jpg", caption: "Suspected Fertile 3" },
      { src: "/artifacts/greenspace/image recognition engine/suspected fertile phase 1 (1).jpg", caption: "Suspected Fertile Phase 1 — 1" },
      { src: "/artifacts/greenspace/image recognition engine/suspected fertile phase 1 (2).jpg", caption: "Suspected Fertile Phase 1 — 2" },
      { src: "/artifacts/greenspace/image recognition engine/suspected fertile phase 1 (3).jpg", caption: "Suspected Fertile Phase 1 — 3" },
    ],
  },
  {
    title: "Profile Screen & Reports",
    images: [
      { src: "/artifacts/greenspace/profile screen and reports/profile screen (1).jpg", caption: "Profile Screen 1" },
      { src: "/artifacts/greenspace/profile screen and reports/profile screen (2).jpg", caption: "Profile Screen 2" },
      { src: "/artifacts/greenspace/profile screen and reports/profile edit.jpg", caption: "Profile Edit" },
      { src: "/artifacts/greenspace/profile screen and reports/reports.jpg", caption: "Reports" },
      { src: "/artifacts/greenspace/profile screen and reports/reports modal.jpg", caption: "Reports Modal" },
      { src: "/artifacts/greenspace/profile screen and reports/visual.jpg", caption: "Visual 1" },
      { src: "/artifacts/greenspace/profile screen and reports/visual2.jpg", caption: "Visual 2" },
      { src: "/artifacts/greenspace/profile screen and reports/visua3.jpg", caption: "Visual 3" },
    ],
  },
];

const allImages = sections.flatMap((s) => s.images);

/* ─── Gallery modal ───────────────────────────────────────────── */
interface GalleryModalProps {
  readonly section: typeof sections[0];
  readonly globalOffset: number;
  readonly onOpen: (idx: number) => void;
  readonly onClose: () => void;
}

function GalleryModal({ section, globalOffset, onOpen, onClose }: GalleryModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-background overflow-y-auto">
      {/* Header — pushed below the site nav */}
      <div className="sticky top-14 z-10 flex items-center justify-between border-b border-border bg-background/95 backdrop-blur-md px-6 py-4">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <ArrowLeft className="size-4" />
          Back to sections
        </button>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
            Green Space · {section.title}
          </p>
          <p className="text-sm font-bold text-foreground mt-0.5">{section.images.length} screens</p>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto w-full max-w-6xl px-6 pt-20 pb-8">
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {section.images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => onOpen(globalOffset + i)}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-violet-500/40 hover:shadow-lg focus:outline-none"
            >
              <div className="h-36 w-full overflow-hidden bg-muted">
                <img src={img.src} alt={img.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>
              <p className="px-2.5 py-2 text-xs font-medium text-muted-foreground truncate text-left">{img.caption}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function GreenSpaceArtifactsPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const sectionOffsets = sections.reduce<number[]>((acc, _s, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + sections[i - 1].images.length);
    return acc;
  }, []);

  function prev() {
    setLightbox((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null));
  }
  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % allImages.length : null));
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-6 pb-20">
          {/* Back */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <ArrowLeft className="size-4" />
            Back to projects
          </Link>

          {/* Header */}
          <div className="mt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-500">
              Green Space · Image Artifacts
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              A closer look at Green Space.
            </h1>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl leading-relaxed">
              A visual record of the mobile experience, soil prediction workflow, and Sage-backed intelligence behind Green Space.
            </p>
          </div>

          {/* Section cards — 3 columns */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, idx) => {
              const meta = sectionMeta[section.title] ?? {
                subtitle: section.title,
                description: `${section.images.length} screenshots`,
                gradient: "from-green-900 to-green-950",
              };
              return (
                <button
                  key={section.title}
                  onClick={() => setActiveSection(idx)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:border-border/60 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none"
                >
                  {/* Gradient image area — fixed height */}
                  <div className={`relative w-full h-36 bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
                    {section.images[0] && (
                      <img
                        src={section.images[0].src}
                        alt={section.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                      />
                    )}
                  </div>

                  {/* Text section below */}
                  <div className="p-5 flex flex-col gap-2">
                    <h2 className="text-base font-bold text-foreground">{meta.subtitle}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{meta.description}</p>
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-foreground">
                        View {section.title}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery modal */}
      {activeSection !== null && (
        <GalleryModal
          section={sections[activeSection]}
          globalOffset={sectionOffsets[activeSection]}
          onOpen={setLightbox}
          onClose={() => setActiveSection(null)}
        />
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 pt-20"
          onClick={() => setLightbox(null)}
        >
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Previous">
            <ChevronLeft className="size-6" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="flex flex-col items-center gap-4 max-h-full w-full max-w-lg">
            <img src={allImages[lightbox].src} alt={allImages[lightbox].caption} className="max-h-[60vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl" />
            <p className="text-sm font-medium text-white/80">{allImages[lightbox].caption}</p>
            <p className="text-xs text-white/40 mb-1">{lightbox + 1} / {allImages.length}</p>
            <button onClick={() => setLightbox(null)} className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black shadow-lg hover:bg-gray-100 transition-colors">
              <X className="size-4" /> Close
            </button>
          </div>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors" aria-label="Next">
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}
