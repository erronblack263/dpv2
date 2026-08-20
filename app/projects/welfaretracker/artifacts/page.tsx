"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
  Grid,
  Smartphone,
  Calendar,
  Layers,
  Monitor,
  User,
  Clock,
  Wrench,
  ShieldAlert,
  Sparkles,
  Plus,
  Minus,
  LayoutGrid,
  LayoutDashboard,
  GalleryHorizontal,
} from "lucide-react";
type ScreenViewMode = "grid" | "tiles" | "carousel";

const CURSOR_COLORS = ["#0284c7", "#8b5cf6", "#06b6d4", "#f43f5e", "#10b981"];

function TypewriterText({
  text,
  speed = 40,
  pause = 3000,
}: {
  text: string;
  speed?: number;
  pause?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  const [colorIdx, setColorIdx] = useState(0);
  const idxRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    let typingId: ReturnType<typeof setInterval> | null = null;
    let pauseId: ReturnType<typeof setTimeout> | null = null;

    const runCycle = () => {
      if (cancelled) return;
      idxRef.current = 0;
      setDisplayed("");
      typingId = setInterval(() => {
        if (cancelled) {
          clearInterval(typingId!);
          return;
        }
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

function FlutterIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 417 512" fill="none">
      <path
        d="M256.3 0L76.5 180.3l62.8 62.8L382.1 0h-125.8zM256.3 255.4L139.7 372.1l116.6 116.6H382L256.3 363.1l62.8-62.8L382 255.4h-125.7z"
        fill="#47C5FB"
      />
      <path
        d="M256.3 255.4L193.5 318.2l62.8 62.8 62.8-62.8-62.8-62.8z"
        fill="#00569E"
      />
      <path
        d="M256.3 381L193.5 318.2l-53.8 53.9 116.6 116.6h125.7L256.3 381z"
        fill="#02569B"
      />
    </svg>
  );
}

function DartIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none">
      <path
        d="M12.5 163.6l73-151.1h91.1L243.5 83l-73 151.1H79.4L12.5 163.6z"
        fill="#0175C2"
      />
      <path
        d="M12.5 163.6L79.4 234.1h91.1l73-151.1-73-70.5H79.4L12.5 163.6z"
        fill="#02569B"
      />
      <path
        d="M176.6 12.5L103.6 83l-73 80.6 48.9 48.9 73-151.1 24.1-48.9z"
        fill="#40C4FF"
      />
    </svg>
  );
}

function FirebaseIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 352" fill="none">
      <path
        d="M0 282.5l2.1-3.6 96.6-183.9-46.7-88c-2.3-4.3-8.7-3.9-10.4.7L0 282.5z"
        fill="#FFC400"
      />
      <path
        d="M134.9 150.3l31-31.4c2.5-2.5 6.6-1.9 8.2 1.3l81.6 162.3-120.8-132.2z"
        fill="#FF3D00"
      />
      <path
        d="M.4 285.3l122.9 69c2.9 1.6 6.5 1.6 9.4 0l122.9-69-42.3-239.5c-.8-4.7-6.5-6.6-10-3.3L.4 285.3z"
        fill="#FFA000"
      />
    </svg>
  );
}

interface ScreenImage {
  num: string;
  caption: string;
  resolution: string;
  src: string;
}

interface SectionData {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  category: string;
  platform: string;
  role: string;
  duration: string;
  status: string;
  images: ScreenImage[];
}

const SECTIONS: SectionData[] = [
  {
    title: "Auth Screens",
    tagline: "Mobile App UI/UX Design",
    description:
      "A complete authentication flow for secure access, role selection, registration, and sign-in for field personnel.",
    tags: ["Flutter", "Dart", "Firebase", "2026"],
    category: "Authentication",
    platform: "Android / iOS",
    role: "Fullstack Developer",
    duration: "2 Weeks",
    status: " 90% Completed",
    images: [
      {
        num: "01",
        caption: "Splash Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784627935/splash_screen_nqcwym.jpg",
      },
      {
        num: "02",
        caption: "Role Selection Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784627934/role_selection_dmnbqu.jpg",
      },
      {
        num: "03",
        caption: "Register Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784627933/register_tewkit.jpg",
      },
      {
        num: "04",
        caption: "Password Strength Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784627933/password_strength_b0b1pz.jpg",
      },
      {
        num: "05",
        caption: "Login Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784627933/login_2_m94qje.jpg",
      },
    ],
  },
  {
    title: "Home",
    tagline: "Home & Emergency Response",
    description:
      "Panic alert and real-time response controls built for field team safety and geofence tracking.",
    tags: ["Flutter", "Dart", "Firebase", "2026"],
    category: "Welfare & Safety",
    platform: "Android / iOS",
    role: "Fullstack Developer",
    duration: "3 Weeks",
    status: "90% Completed",
    images: [
      {
        num: "01",
        caption: "Sidebar",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633672/sidebar_wngw8p.jpg",
      },
      {
        num: "02",
        caption: "Check In",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633671/check_in_pivmdg.jpg",
      },
      {
        num: "03",
        caption: "SOS Alert",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633670/sos-alert_tcqzwh.jpg",
      },
      {
        num: "04",
        caption: "Notifications Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633670/notifications-screen_laej2i.jpg",
      },
      {
        num: "05",
        caption: "Home Theme Change",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633670/purple_theme_change_3_jmqtqt.jpg",
      },
      {
        num: "06",
        caption: "Purple Theme 2",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633670/purple_theme_change_1_tei1xk.jpg",
      },
      {
        num: "07",
        caption: "Signout Confirmation",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633669/signout_confirmation_i0byec.jpg",
      },
      {
        num: "08",
        caption: "Theme Switch Section",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633668/color_theme_switch_lsdddp.jpg",
      },
      {
        num: "09",
        caption: "Purple Theme 3",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784633668/purple_theme_change_2_pjeszi.jpg",
      },
    ],
  },
  {
    title: "Profile Screens",
    tagline: "User Profiles & Settings",
    description:
      "Profile management, language settings and advanced safety options for field users and supervisors.",
    tags: ["Flutter", "Dart", "Firebase", "2026"],
    category: "Profile & Settings",
    platform: "Android / iOS",
    role: "Fullstack Developer",
    duration: "2 Weeks",
    status: "90% Completed",
    images: [
      {
        num: "01",
        caption: "Parent Profile Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784669050/parent_profile_screen_xvrybj.jpg",
      },
      {
        num: "02",
        caption: "Child / User Profile Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784669053/profile_screen_r97k3p.jpg",
      },
      {
        num: "03",
        caption: "Language Picker",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784669724/language_picker_tcqrn7.jpg",
      },
      {
        num: "04",
        caption: "Advanced Options",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784669727/advanced_options_wijeh4.jpg",
      },
      {
        num: "05",
        caption: "Contact Details",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784669730/contact_details_avdit6.jpg",
      },
    ],
  },
  {
    title: "Dark Mode",
    tagline: "Dark Mode Experience",
    description:
      "Full dark mode support across all screens for low-light environments and night shifts.",
    tags: ["Flutter", "Dart", "Firebase", "2026"],
    category: "Theme & Dark Mode",
    platform: "Android / iOS",
    role: "Fullstack Developer",
    duration: "1 Week",
    status: "90% Completed",
    images: [
      {
        num: "01",
        caption: "Home Screen Dark",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784715221/home_screen_dark_extxvg.jpg",
      },
      {
        num: "02",
        caption: "Chat Screen Dark",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784715219/chst_screen_dark_ieuvrm.jpg",
      },
      {
        num: "03",
        caption: "Map Screen Dark",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784715222/map_screen_dark_fbbngw.jpg",
      },
      {
        num: "04",
        caption: "Location Details",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784715547/location_details_vam4jx.jpg",
      },
    ],
  },
];

export default function WelfareTrackerArtifactsPage() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState(false);
  const [screenView, setScreenView] = useState<ScreenViewMode>("grid");
  const screenCarouselRef = useRef<HTMLDivElement | null>(null);

  const section = SECTIONS[sectionIdx];
  useEffect(() => {
    setActiveScreenIdx(0);
  }, [sectionIdx]);

  const currentScreen = section.images[activeScreenIdx] || section.images[0];

  function nextScreen() {
    setActiveScreenIdx((i) => (i + 1) % section.images.length);
  }

  function prevScreen() {
    setActiveScreenIdx(
      (i) => (i - 1 + section.images.length) % section.images.length,
    );
  }

  function scrollScreenPrev() {
    const el = screenCarouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: -Math.round(el.clientWidth * 0.8),
      behavior: "smooth",
    });
  }

  function scrollScreenNext() {
    const el = screenCarouselRef.current;
    if (!el) return;
    el.scrollBy({ left: Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-sky-500/30 selection:text-sky-500 font-sans pb-16 transition-colors duration-300">
      <div className="w-full border-b border-border bg-card/80 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-0.5 sticky top-4 z-30">
        <div className="flex items-center justify-center gap-3 max-w-7xl mx-auto h-auto md:h-10 relative">
          <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {SECTIONS.map((sec, idx) => (
              <button
                key={sec.title}
                onClick={() => setSectionIdx(idx)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  idx === sectionIdx
                    ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-black shadow-lg shadow-sky-500/25 font-bold"
                    : "bg-muted/80 text-muted-foreground border border-border hover:text-foreground hover:bg-accent"
                }`}
              >
                {sec.title}
              </button>
            ))}
          </div>

          <div className="flex md:hidden items-center gap-1.5 whitespace-nowrap overflow-x-auto py-0">
            {(expandedSections
              ? SECTIONS.map((sec, idx) => ({ sec, idx }))
              : sectionIdx < 3
                ? SECTIONS.slice(0, 3).map((sec, idx) => ({ sec, idx }))
                : [
                    { sec: SECTIONS[0], idx: 0 },
                    { sec: SECTIONS[1], idx: 1 },
                    { sec: SECTIONS[sectionIdx], idx: sectionIdx },
                  ]
            ).map(({ sec, idx }) => (
              <button
                key={sec.title}
                onClick={() => setSectionIdx(idx)}
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  idx === sectionIdx
                    ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-black shadow-md font-bold"
                    : "bg-muted/80 text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {sec.title}
              </button>
            ))}

            {!expandedSections ? (
              <button
                onClick={() => setExpandedSections(true)}
                className="px-2.5 py-1.5 rounded-full text-xs font-bold bg-sky-500/10 dark:bg-sky-950 text-sky-600 dark:text-sky-400 border border-sky-500/30 flex items-center gap-1 hover:bg-sky-500/20 transition-all cursor-pointer"
                title="Show all sections"
              >
                <Plus className="size-3.5 stroke-[2.5]" />
                <span>More</span>
              </button>
            ) : (
              <button
                onClick={() => setExpandedSections(false)}
                className="px-2.5 py-1.5 rounded-full text-xs font-bold bg-red-500/10 dark:bg-red-950 text-red-500 dark:text-red-400 border border-red-500/30 flex items-center gap-1 hover:bg-red-500/20 transition-all cursor-pointer"
                title="Collapse sections"
              >
                <Minus className="size-3.5 stroke-[2.5]" />
                <span>Less</span>
              </button>
            )}
          </div>

          <span className="text-xs font-medium text-sky-600 dark:text-sky-400 hidden sm:inline-flex items-center gap-1.5 absolute right-6">
            <span className="size-1.5 rounded-full bg-sky-500 animate-ping" />
            Showing: {section.title} ({section.images.length} Screens)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
            <div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <ArrowLeft className="size-3.5" />
                Back to Projects
              </Link>

              <div className="mt-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-sky-600 dark:text-sky-400 drop-shadow-[0_0_25px_rgba(14,165,233,0.2)]">
                  WelfareTracker
                </h1>
                <p className="mt-1 text-lg sm:text-xl font-medium text-muted-foreground">
                  {section.tagline}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <Smartphone className="size-3.5 text-sky-600 dark:text-sky-400" />
                  Screens
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <FlutterIcon className="size-3.5" />
                  Flutter
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <DartIcon className="size-3.5" />
                  Dart
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <FirebaseIcon className="size-3.5" />
                  Firebase
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  2026
                </span>
              </div>

              <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                {section.description}
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-sky-500/50 bg-sky-500/10 dark:bg-sky-950/40 px-6 py-2.5 text-sm font-semibold text-sky-600 dark:text-sky-400 transition-all hover:bg-sky-500/20 hover:border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.15)] group"
              >
                <span>Explore All Features</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 flex items-center justify-center relative my-4 lg:my-0">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-96 bg-sky-500/20 dark:bg-sky-500/15 blur-3xl rounded-full animate-pulse" />
              <svg
                className="absolute size-[420px] text-sky-500/20 dark:text-sky-500/15 pointer-events-none"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="85"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="98"
                  stroke="currentColor"
                  strokeWidth="0.75"
                />
              </svg>
            </div>

            <div className="relative z-10 w-[240px] sm:w-[260px] h-[500px] sm:h-[530px] rounded-[42px] border-[7px] border-zinc-900 dark:border-zinc-800 bg-zinc-950 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(14,165,233,0.2)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(14,165,233,0.25)] flex flex-col overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 w-24 h-4 rounded-full bg-black flex items-center justify-center gap-2">
                <div className="size-2 rounded-full bg-zinc-900 border border-zinc-800" />
                <div className="size-1.5 rounded-full bg-blue-950" />
              </div>

              {/* Display Screen */}
              <div className="relative w-full h-full rounded-[34px] overflow-hidden bg-zinc-900">
                <img
                  src={currentScreen.src}
                  alt={currentScreen.caption}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Overlay Caption Badge inside Phone */}
                <div className="absolute bottom-3 left-3 right-3 z-20 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 px-3 py-2 text-center text-white">
                  <p className="text-xs font-bold tracking-wide truncate">
                    {currentScreen.caption}
                  </p>
                  <p className="text-[10px] text-sky-400 font-mono">
                    {currentScreen.num} /{" "}
                    {section.images.length.toString().padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Cols 9 to 12) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Project Details Card */}
            <div className="rounded-2xl border border-border bg-card p-5 backdrop-blur-md shadow-xl text-card-foreground">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <span className="size-2 rounded-full bg-sky-500 animate-pulse" />
                <h2 className="text-sm font-bold text-foreground tracking-wide">
                  Project Details
                </h2>
              </div>

              <div className="flex flex-col gap-3.5 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Monitor className="size-3.5" /> Project
                  </span>
                  <span className="font-semibold text-foreground">
                    WelfareTracker
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="size-3.5" /> Category
                  </span>
                  <span className="font-semibold text-foreground">
                    {section.category}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="size-3.5" /> Screens
                  </span>
                  <span className="font-semibold text-foreground">
                    {section.images.length} Screens
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Monitor className="size-3.5" /> Platform
                  </span>
                  <span className="font-semibold text-foreground">
                    {section.platform}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <User className="size-3.5" /> Role
                  </span>
                  <span className="font-semibold text-foreground">
                    {section.role}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" /> Duration
                  </span>
                  <span className="font-semibold text-foreground">
                    {section.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="size-3.5" /> Tech Stack
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span title="Flutter">
                      <FlutterIcon className="size-3.5" />
                    </span>
                    <span title="Dart">
                      <DartIcon className="size-3.5" />
                    </span>
                    <span title="Firebase">
                      <FirebaseIcon className="size-3.5" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5">Status</span>
                  <span className="inline-flex items-center rounded-full bg-sky-500/10 dark:bg-sky-950 border border-sky-500/30 dark:border-sky-800/80 px-2.5 py-0.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                    {section.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Like this project Card */}
            <div className="rounded-2xl border border-border bg-card p-5 backdrop-blur-md shadow-xl flex flex-col gap-3 text-card-foreground">
              <div className="size-10 rounded-full bg-sky-500/10 dark:bg-sky-950 border border-sky-500/30 dark:border-sky-800/80 flex items-center justify-center text-sky-600 dark:text-sky-400">
                <ShieldAlert className="size-5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-foreground">
                  Like this project?
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Let&apos;s create something amazing together.
                </p>
              </div>

              <Link
                href="/contact"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-xs font-bold text-white transition-all hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-600/30 group"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* ─── Bottom Section: Screens Showcase Grid / Carousel ─── */}
        <div className="mt-14 border-t border-border pt-8">
          {/* Section Header with Carousel Navigation Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-sky-500" />
              <h2 className="text-lg font-extrabold text-foreground tracking-wide">
                Screens
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Screen view toggle */}
              <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
                <button
                  onClick={() => setScreenView("grid")}
                  title="Grid"
                  className={`p-1.5 rounded-md transition-colors ${screenView === "grid" ? "bg-background text-sky-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutGrid className="size-3" />
                </button>
                <button
                  onClick={() => setScreenView("tiles")}
                  title="Tiles"
                  className={`p-1.5 rounded-md transition-colors ${screenView === "tiles" ? "bg-background text-sky-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutDashboard className="size-3" />
                </button>
                <button
                  onClick={() => setScreenView("carousel")}
                  title="Carousel"
                  className={`p-1.5 rounded-md transition-colors ${screenView === "carousel" ? "bg-background text-sky-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <GalleryHorizontal className="size-3" />
                </button>
              </div>

              {/* Carousel dots & arrows — only shown in grid/tiles */}
              {screenView !== "carousel" && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {section.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenIdx(i)}
                        className={`size-2 rounded-full transition-all ${
                          i === activeScreenIdx
                            ? "bg-sky-500 w-4"
                            : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                        }`}
                        aria-label={`Go to screen ${i + 1}`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-1 border-l border-border pl-3">
                    <button
                      onClick={prevScreen}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      aria-label="Previous screen"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      onClick={nextScreen}
                      className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                      aria-label="Next screen"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Grid view */}
          {screenView === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {section.images.map((img, i) => {
                const isActive = i === activeScreenIdx;
                return (
                  <div
                    key={img.src}
                    onClick={() => setActiveScreenIdx(i)}
                    className={`group relative flex flex-col rounded-2xl border p-3 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-sky-500 bg-card shadow-[0_0_25px_rgba(14,165,233,0.25)] ring-1 ring-sky-500/50"
                        : "border-border bg-card/60 hover:border-accent-foreground/30 hover:bg-card"
                    }`}
                  >
                    {/* Number Badge Top Left */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-lg text-[11px] font-bold ${
                          isActive
                            ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-black font-extrabold"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {img.num}
                      </span>
                    </div>

                    {/* Thumbnail Mockup Frame */}
                    <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-black flex items-center justify-center p-1.5 border border-zinc-800 transition-colors">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Quick Lightbox View Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIdx(i);
                        }}
                        className="absolute bottom-3 right-3 z-20 size-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:bg-sky-500 hover:text-black hover:border-sky-400 transition-all"
                        title="Open full view"
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>

                    {/* Caption Footer */}
                    <div className="mt-3 flex flex-col gap-0.5">
                      <p className="text-xs font-bold text-foreground truncate">
                        {img.caption}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {img.resolution}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Tiles view — larger 2-col grid */}
          {screenView === "tiles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.images.map((img, i) => {
                const isActive = i === activeScreenIdx;
                return (
                  <div
                    key={img.src}
                    onClick={() => setActiveScreenIdx(i)}
                    className={`group relative flex flex-col rounded-2xl border p-3 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-sky-500 bg-card shadow-[0_0_25px_rgba(14,165,233,0.25)] ring-1 ring-sky-500/50"
                        : "border-border bg-card/60 hover:border-accent-foreground/30 hover:bg-card"
                    }`}
                  >
                    {/* Number Badge Top Left */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-lg text-[11px] font-bold ${
                          isActive
                            ? "bg-sky-600 dark:bg-sky-500 text-white dark:text-black font-extrabold"
                            : "bg-muted text-muted-foreground border border-border"
                        }`}
                      >
                        {img.num}
                      </span>
                    </div>

                    {/* Thumbnail Mockup Frame */}
                    <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-black flex items-center justify-center p-1.5 border border-zinc-800 transition-colors">
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Quick Lightbox View Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIdx(i);
                        }}
                        className="absolute bottom-3 right-3 z-20 size-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:bg-sky-500 hover:text-black hover:border-sky-400 transition-all"
                        title="Open full view"
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>

                    {/* Caption Footer */}
                    <div className="mt-3 flex flex-col gap-0.5">
                      <p className="text-xs font-bold text-foreground truncate">
                        {img.caption}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {img.resolution}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Carousel view */}
          {screenView === "carousel" && (
            <div className="relative">
              <div
                ref={screenCarouselRef}
                className="-mx-4 px-4 overflow-x-auto scrollbar-none flex gap-4 snap-x snap-mandatory pb-16"
              >
                {section.images.map((img, i) => (
                  <div
                    key={img.src}
                    className="shrink-0 snap-center w-[72%] sm:w-[45%] lg:w-[28%]"
                  >
                    {/* Tall portrait carousel card */}
                    <div
                      onClick={() => {
                        setActiveScreenIdx(i);
                        setLightboxIdx(i);
                      }}
                      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                      style={{ height: "420px" }}
                    >
                      <div className="absolute inset-0 bg-zinc-900 rounded-2xl border border-zinc-800" />
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent rounded-2xl" />
                      <div className="relative z-10 mt-auto p-4">
                        <p className="text-xs font-bold text-white truncate">
                          {img.caption}
                        </p>
                        <p className="text-[10px] text-sky-400 font-mono">
                          {img.num} · {img.resolution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Apple-style circular arrows */}
              <div className="flex items-center gap-2 absolute bottom-4 right-4">
                <button
                  onClick={scrollScreenPrev}
                  aria-label="Previous"
                  className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={scrollScreenNext}
                  aria-label="Next"
                  className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-all"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ─── Bottom Projects Footer Navigation ─── */}
        <div className="mt-16 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Previous Project */}
          <Link
            href="/projects/greenspace/artifacts"
            className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="size-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] text-muted-foreground font-normal">
                ← Previous Project
              </span>
              <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                GreenSpace Artifacts
              </span>
            </div>
          </Link>

          {/* Explore More Projects */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-bold text-foreground hover:bg-accent transition-all"
          >
            <Grid className="size-3.5 text-sky-600 dark:text-sky-400" />
            <span>Explore More Projects</span>
          </Link>

          {/* Next Project */}
          <Link
            href="/projects"
            className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group text-right"
          >
            <div>
              <span className="block text-[10px] text-muted-foreground font-normal">
                Next Project →
              </span>
              <span className="group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                TaskFlow Mobile
              </span>
            </div>
            <div className="size-8 rounded-xl bg-violet-500/10 dark:bg-violet-950 border border-violet-500/30 dark:border-violet-800 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Sparkles className="size-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* ─── Lightbox Modal ─── */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-4 sm:p-6 overflow-hidden"
          onClick={() => setLightboxIdx(null)}
        >
          {/* Prominent Top Right Close Button */}
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-600/40 border border-white/30 px-4 py-2 text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Close enlarged preview"
          >
            <X className="size-4 stroke-[3]" />
            <span>Close</span>
          </button>

          {/* Left Slide Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx(
                (lightboxIdx - 1 + section.images.length) %
                  section.images.length,
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-zinc-900/80 text-white border border-zinc-700 flex items-center justify-center hover:bg-sky-500 hover:text-black transition-colors z-30"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6" />
          </button>

          {/* Center Enlarged Image Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-h-[85vh] max-w-xl"
          >
            <img
              src={section.images[lightboxIdx].src}
              alt={section.images[lightboxIdx].caption}
              className="max-h-[70vh] sm:max-h-[75vh] w-auto rounded-2xl object-contain shadow-2xl border border-zinc-800"
            />
            <div className="mt-3 flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-bold text-white">
                {section.images[lightboxIdx].caption}
              </p>
              <p className="text-xs text-zinc-400 font-mono">
                Screen {lightboxIdx + 1} of {section.images.length} ·{" "}
                {section.images[lightboxIdx].resolution}
              </p>

              {/* Bottom Visible Close Button */}
              <button
                onClick={() => setLightboxIdx(null)}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-red-600 hover:border-red-500 text-white border border-white/20 px-5 py-1.5 text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                <X className="size-3.5" />
                Close Preview
              </button>
            </div>
          </div>

          {/* Right Slide Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx + 1) % section.images.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-zinc-900/80 text-white border border-zinc-700 flex items-center justify-center hover:bg-sky-500 hover:text-black transition-colors z-30"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </div>
  );
}
