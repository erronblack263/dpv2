"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldAlert,
} from "lucide-react";

const sections = [
  {
    title: "Auth Screens",
    images: [
      {
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627935/splash_screen_nqcwym.jpg",
        caption: "Splash Screen",
      },
      {
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627934/role_selection_dmnbqu.jpg",
        caption: "Role Selection Screen",
      },
      {
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/register_tewkit.jpg",
        caption: "Register Screen",
      },
      {
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/password_strength_b0b1pz.jpg",
        caption: "Password Strength Screen",
      },
      {
        src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/login_2_m94qje.jpg",
        caption: "Login Screen",
      },
    ],
  },
  {
    title: "Home",
    images: [
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633672/sidebar_wngw8p.jpg", caption: "Sidebar" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633671/check_in_pivmdg.jpg", caption: "Check In" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633670/sos-alert_tcqzwh.jpg", caption: "SOS Alert" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633670/notifications-screen_laej2i.jpg", caption: "Notifications Screen" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633670/purple_theme_change_3_jmqtqt.jpg", caption: "Home Theme Change" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633670/purple_theme_change_1_tei1xk.jpg", caption: "Purple Theme 2" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633669/signout_confirmation_i0byec.jpg", caption: "Signout Confirmation" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633668/color_theme_switch_lsdddp.jpg", caption: "Theme Switch Section" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784633668/purple_theme_change_2_pjeszi.jpg", caption: "Purple Theme 3" },
    ],
  },
  {
    title: "Profile Screens",
    images: [
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784669050/parent_profile_screen_xvrybj.jpg", caption: "Parent Profile Screen" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784669053/profile_screen_r97k3p.jpg", caption: "Child / User Profile Screen" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784669724/language_picker_tcqrn7.jpg", caption: "Language Picker" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784669727/advanced_options_wijeh4.jpg", caption: "Advanced Options" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784669730/contact_details_avdit6.jpg", caption: "Contact Details" },
    ],
  },
];

const allImages = sections.flatMap((s) => s.images);

type SectionType = (typeof sections)[0];

function BentoCard({
  section,
  isExpanded,
  onClick,
}: {
  section: SectionType;
  isExpanded: boolean;
  onClick: () => void;
}) {
  const previewImage = section.images[0];
  const imageCount = section.images.length;

  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/15 focus:outline-none focus:ring-2 focus:ring-primary/50 h-64 sm:h-72 md:h-80 flex flex-col"
    >
      {/* Preview Image Background */}
      <div className="relative flex-1 w-full overflow-hidden bg-muted">
        <img
          src={previewImage.src}
          alt={section.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Content at bottom */}
      <div className="flex flex-col gap-2 sm:gap-3 p-3 sm:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
          {section.title}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs sm:text-sm text-white/80">
            {imageCount} image{imageCount !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="mt-1 sm:mt-2 w-full rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white transition-all duration-300 text-center">
          {isExpanded ? "Click to retract" : "Click to expand"}
        </div>
      </div>
    </button>
  );
}

function SectionGallery({
  section,
  globalOffset,
  onOpen,
}: {
  readonly section: SectionType;
  readonly globalOffset: number;
  readonly onOpen: (idx: number) => void;
}) {
  const [page, setPage] = useState(1);
  const perPage = 4;
  const total = section.images.length;
  const totalPages = Math.ceil(total / perPage);
  const visible = section.images.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-card">
      {/* Section header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold tracking-tight text-foreground">
            {section.title}
          </h2>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
            {total} images
          </span>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="px-6 pb-6 pt-4">
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
    </div>
  );
}

export default function WelfareTrackerArtifactsPage() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [disclaimerDismissed, setDisclaimerDismissed] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

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
          href="/projects?view=projects"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to Projects
        </Link>

        <div className="mb-12 flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-500/15">
            <Shield className="size-6 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              WelfareTracker — Project Artifacts
            </h1>
            <p className="mt-2 text-muted-foreground">
              Click a section card to explore the gallery. Tap any image to view full size.
            </p>
          </div>
        </div>

        {/* Bento Grid - Hidden when modal is open */}
        {!selectedSection && (
          <div className="mb-12 sm:mb-16 grid gap-3 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 animate-in fade-in duration-300">
            {sections.map((section) => (
              <BentoCard
                key={section.title}
                section={section}
                isExpanded={false}
                onClick={() => setSelectedSection(section.title)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Gallery Modal */}
      {selectedSection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-card border border-border rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                {selectedSection}
              </h2>
              <button
                onClick={() => setSelectedSection(null)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              {/* Instruction Banner */}
              <div className="mb-6 rounded-2xl bg-primary/10 border border-primary/30 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-primary">
                  Tap on image for full view
                </p>
              </div>
            {sections.map((section) => {
              if (section.title !== selectedSection) return null;

              const sectionOffset = sections
                .slice(0, sections.indexOf(section))
                .reduce((sum, s) => sum + s.images.length, 0);

              return (
                <SectionGallery
                  key={section.title}
                  section={section}
                  globalOffset={sectionOffset}
                  onOpen={setLightbox}
                />
              );
            })}
          </div>
        </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 pt-20"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
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
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}

      {/* Disclaimer modal — shown on first visit */}
      {!disclaimerDismissed && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 bg-amber-500/10 border-b border-amber-500/20 px-6 py-4">
              <ShieldAlert className="size-6 text-amber-500 shrink-0" />
              <h2 className="font-extrabold text-lg text-foreground">Privacy Disclaimer</h2>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Artifacts in this project contain sensitive components such as{" "}
                <span className="font-semibold text-foreground">location coordinates</span> and{" "}
                <span className="font-semibold text-foreground">real names of account holders</span>.
                They have been <span className="font-semibold text-foreground">blurred and sketched out</span> to
                protect the location and sensitive information of the originator.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                For more information, contact{" "}
                <span className="font-semibold text-foreground">Sage</span> on{" "}
                <a
                  href="mailto:musonzahw@gmail.com"
                  className="text-primary underline underline-offset-2 hover:opacity-80"
                >
                  musonzahw@gmail.com
                </a>{" "}
                for a full presentation.
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <Link
                href="/projects?view=projects"
                className="flex-1 flex items-center justify-center rounded-2xl border border-border bg-background py-2.5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Go Back
              </Link>
              <button
                onClick={() => setDisclaimerDismissed(true)}
                className="flex-1 rounded-2xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold transition-colors hover:bg-primary/90"
              >
                I Understand, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
