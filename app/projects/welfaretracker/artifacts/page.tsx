"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ShieldAlert } from "lucide-react";

/* ─── Section metadata ────────────────────────────────────────── */
const sectionMeta: Record<string, { subtitle: string; description: string; gradient: string }> = {
  "Auth Screens": {
    subtitle: "Auth Screens",
    description: "A complete authentication flow for secure access, role selection, registration, and sign-in.",
    gradient: "from-blue-500 via-sky-400 to-indigo-500",
  },
  "Home": {
    subtitle: "Home & emergency response",
    description: "Panic alert and real-time response controls built for field teams.",
    gradient: "from-indigo-500 via-blue-400 to-sky-500",
  },
  "Profile Screens": {
    subtitle: "User profiles & settings",
    description: "Profile management, language settings and advanced options for users.",
    gradient: "from-sky-500 via-blue-500 to-violet-500",
  },
  "Dark Mode": {
    subtitle: "Dark mode experience",
    description: "Full dark mode support across all screens for low-light environments.",
    gradient: "from-slate-600 via-blue-800 to-indigo-900",
  },
};

/* ─── Image data ──────────────────────────────────────────────── */
const sections = [
  {
    title: "Auth Screens",
    images: [
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627935/splash_screen_nqcwym.jpg", caption: "Splash Screen" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627934/role_selection_dmnbqu.jpg", caption: "Role Selection Screen" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/register_tewkit.jpg", caption: "Register Screen" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/password_strength_b0b1pz.jpg", caption: "Password Strength Screen" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784627933/login_2_m94qje.jpg", caption: "Login Screen" },
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
  {
    title: "Dark Mode",
    images: [
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784715221/home_screen_dark_extxvg.jpg", caption: "Home Screen Dark" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784715219/chst_screen_dark_ieuvrm.jpg", caption: "Chat Screen Dark" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784715222/map_screen_dark_fbbngw.jpg", caption: "Map Screen Dark" },
      { src: "https://res.cloudinary.com/virfpzu4/image/upload/v1784715547/location_details_vam4jx.jpg", caption: "Location Details" },
    ],
  },
];

const allImages = sections.flatMap((s) => s.images);

const sectionOffsets = sections.reduce<number[]>((acc, _s, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + sections[i - 1].images.length);
  return acc;
}, []);

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
            WelfareTracker · {section.title}
          </p>
          <p className="text-sm font-bold text-foreground mt-0.5">{section.images.length} screens</p>
        </div>
      </div>
      <div className="w-full px-6 pt-20 pb-8">
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

/* ─── Typewriter (copied from certificates page) ──────────────────────────────────────────────── */

const CURSOR_COLORS = ["#8b5cf6", "#06b6d4", "#f43f5e", "#f59e0b", "#10b981"];

function TypewriterText({ text, speed = 40, pause = 3000 }: { text: string; speed?: number; pause?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const idxRef = useRef(0);

  // Typing loop
  useEffect(() => {
    let cancelled = false;
    let typingId: ReturnType<typeof setInterval> | null = null;
    let pauseId: ReturnType<typeof setTimeout> | null = null;

    const runCycle = () => {
      if (cancelled) return;
      idxRef.current = 0;
      setDisplayed("");
      typingId = setInterval(() => {
        if (cancelled) { clearInterval(typingId!); return; }
        idxRef.current += 1;
        setDisplayed(text.slice(0, idxRef.current));
        if (idxRef.current >= text.length) {
          clearInterval(typingId!);
          pauseId = setTimeout(runCycle, pause);
        }
      }, speed);
    };

    runCycle();
    return () => {
      cancelled = true;
      if (typingId) clearInterval(typingId);
      if (pauseId) clearTimeout(pauseId);
    };
  }, [text, speed, pause]);

  // Cursor color cycle — every 3 s
  useEffect(() => {
    const id = setInterval(() => {
      setColorIdx((i) => (i + 1) % CURSOR_COLORS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <span>
      {displayed}
      <span
        className="inline-block w-[3px] h-[0.85em] ml-1 align-middle rounded-sm animate-pulse transition-colors duration-700"
        style={{ backgroundColor: CURSOR_COLORS[colorIdx] }}
      />
    </span>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function WelfareTrackerArtifactsPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [disclaimerDismissed, setDisclaimerDismissed] = useState(false);

  function prev() {
    setLightbox((i) => (i !== null ? (i - 1 + allImages.length) % allImages.length : null));
  }
  function next() {
    setLightbox((i) => (i !== null ? (i + 1) % allImages.length : null));
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        <div className="w-full px-5 sm:px-8 lg:px-12 pt-6 pb-20">
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
              WelfareTracker · Image Artifacts
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
              <TypewriterText text={"A closer look at WelfareTracker."} />
            </h1>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl leading-relaxed">
              A visual record of the welfare tracking experience, emergency response controls, and field safety systems behind WelfareTracker.
            </p>
          </div>

          {/* Section cards — 3 columns */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, idx) => {
              const meta = sectionMeta[section.title] ?? {
                subtitle: section.title,
                description: `${section.images.length} screenshots`,
                gradient: "from-blue-500 to-indigo-600",
              };
              return (
                <button
                  key={section.title}
                  onClick={() => setActiveSection(idx)}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:border-border/60 hover:shadow-xl hover:-translate-y-0.5 focus:outline-none"
                >
                  {/* Gradient image area */}
                  <div className={`relative w-full aspect-[16/9] bg-gradient-to-br ${meta.gradient} overflow-hidden`}>
                    {section.images[0] && (
                      <img
                        src={section.images[0].src}
                        alt={section.title}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-20"
                      />
                    )}
                  </div>
                  {/* Text */}
                  <div className="p-4 flex flex-col gap-1.5">
                    <h2 className="text-sm font-bold text-foreground">{meta.subtitle}</h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">{meta.description}</p>
                    <div className="mt-1.5">
                      <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
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
        <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 pt-20" onClick={() => setLightbox(null)}>
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

      {/* Disclaimer modal */}
      {!disclaimerDismissed && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
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
                For more information, contact <span className="font-semibold text-foreground">Sage</span> on{" "}
                <a href="mailto:musonzahw@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80">musonzahw@gmail.com</a>{" "}
                for a full presentation.
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <Link href="/projects" className="flex-1 flex items-center justify-center rounded-2xl border border-border bg-background py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
                Go Back
              </Link>
              <button onClick={() => setDisclaimerDismissed(true)} className="flex-1 rounded-2xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold transition-colors hover:bg-primary/90">
                I Understand, Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
