"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, ChevronLeft, ChevronRight, X } from "lucide-react";

const sections: { title: string; images: { src: string; caption: string }[] }[] = [
  {
    title: 'Auth Screens',
    images: [
      { src: 'https://res.cloudinary.com/virfpzu4/image/upload/v1784627935/splash_screen_nqcwym.jpg', caption: 'Splash Screen' },
      { src: 'https://res.cloudinary.com/virfpzu4/image/upload/v1784627934/role_selection_dmnbqu.jpg', caption: 'Role Selection Screen' },
      { src: 'https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/register_tewkit.jpg', caption: 'Register Screen' },
      { src: 'https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/password_strength_b0b1pz.jpg', caption: 'Password Strength Screen' },
      { src: 'https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/login_2_m94qje.jpg', caption: 'Login Screen' },
    ],
  },
];

const allImages = sections.flatMap((s) => s.images);

export default function WelfareTrackerArtifactsPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  function prev() {
    setLightbox((i) =>
      i !== null ? (i - 1 + allImages.length) % allImages.length : null,
    );
  }
  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % allImages.length : null));
  }

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pt-12 pb-24 sm:px-6">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to Projects
        </Link>

        <div className="mb-10 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15">
            <Shield className="size-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              WelfareTracker — Project Artifacts
            </h1>
            <p className="mt-2 text-muted-foreground">
              Screenshots and design artifacts from the WelfareTracker platform.
              Tap any image to view full size.
            </p>
          </div>
        </div>

        {sections.length > 0 ? (
          sections.map((section) => (
            <div key={section.title} className="mb-14">
              <div className="mb-6 flex items-center gap-3">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                  {section.title}
                </h2>
                <div className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {section.images.map((img) => {
                  const globalIdx = allImages.findIndex(
                    (i) => i.src === img.src,
                  );
                  return (
                    <button
                      key={img.src}
                      onClick={() => setLightbox(globalIdx)}
                      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md"
                    >
                      <div className="h-36 w-full overflow-hidden bg-muted">
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
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-24 text-center">
            <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted">
              <Shield className="size-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold">No artifacts yet</h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Add screenshots to{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                /public/artifacts/welfaretracker/
              </code>{" "}
              and update the sections array in this page.
            </p>
          </div>
        )}
      </section>

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
