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
  Leaf,
  Sparkles,
  Plus,
  Minus,
  LayoutGrid,
  LayoutDashboard,
  GalleryHorizontal,
} from "lucide-react";

const CURSOR_COLORS = ["#10b981", "#8b5cf6", "#06b6d4", "#f43f5e", "#f59e0b"];

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

/* ─── Inline Tech SVGs ───────────────────────────────────────────── */

function ReactNativeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-11.5 -10.23174 23 20.46348"
      fill="none"
    >
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function TypeScriptIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none">
      <rect width="128" height="128" rx="16" fill="#3178C6" />
      <path
        d="M68.5 106c2.7 1.8 6.4 2.8 10.3 2.8 9.3 0 14.8-4.8 14.8-12 0-14.7-21.7-10.4-21.7-25.5 0-6.7 5.6-11.7 15.3-11.7 4.1 0 7.6.8 10.1 2.1l-2.6 9.4c-2.1-1.1-5-1.9-8-1.9-4.8 0-7.3 2.1-7.3 4.8 0 13.5 21.6 9.2 21.6 25.1 0 8.3-6.5 13.5-17.6 13.5-5.3 0-9.8-1.2-12.7-3.1l2.8-9.5zm-33-35.1h15.9v41.3H63v11.4H35.5v-11.4h11.6V70.9H35.5V59.6z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function SupabaseIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 106 106" fill="none">
      <path
        d="M62.6 102.8c-2.3 2.8-6.9 1.2-6.9-2.4V62.4H9.5c-3.7 0-5.8-4.3-3.4-7.2L52.8 3.2c2.3-2.8 6.9-1.2 6.9 2.4V43.6h46.2c3.7 0 5.8 4.3 3.4 7.2L62.6 102.8z"
        fill="url(#supabase_grad_art)"
      />
      <defs>
        <linearGradient
          id="supabase_grad_art"
          x1="5.5"
          y1="3.2"
          x2="103"
          y2="102.8"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3ECF8E" />
          <stop offset="1" stopColor="#3ECF8E" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ─── Data Types ─────────────────────────────────────────────────── */
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
      "A modern environmental awareness app that connects people to nature. Clean, intuitive and built for impact.",
    tags: ["React Native", "TypeScript", "Supabase", "2026"],
    category: "Authentication",
    platform: "Android & IOS",
    role: "Fullstack Developer",
    duration: "65 weeks",
    status: " 75% Completed",
    images: [
      {
        num: "01",
        caption: "Splash Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959614/splash_i9tcea.jpg",
      },
      {
        num: "02",
        caption: "Auth Selection",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959141/auth_selection_screen_yx81mo.jpg",
      },
      {
        num: "03",
        caption: "Login Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959617/login_screen_vms3ca.jpg",
      },
      {
        num: "04",
        caption: "Sign Up Screen",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959610/signup_screen_ulvvbz.jpg",
      },
      {
        num: "05",
        caption: "Forgot Password",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959613/4got_pass_jgjg9h.jpg",
      },
    ],
  },
  {
    title: "Dashboard Screens",
    tagline: "Community & Engagement",
    description:
      "Events, forum discussions, and Green Guardian reporting workflow for active community participation.",
    tags: ["React Native", "TypeScript", "Supabase", "2026"],
    category: "Dashboard & Forum",
    platform: "Android & IOS",
    role: "Fullstack Developer",
    duration: "3 Weeks",
    status: "75% Completed",
    images: [
      {
        num: "01",
        caption: "Dashboard",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959050/dashboard_screen_ncgdqw.jpg",
      },
      {
        num: "02",
        caption: "Events",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959051/events_screen_jeltgh.jpg",
      },
      {
        num: "03",
        caption: "Forum Main",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959052/forum_screen_1_vj3t4q.jpg",
      },
      {
        num: "04",
        caption: "Forum Details",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959053/forum_screen_2_loihvi.jpg",
      },
      {
        num: "05",
        caption: "Green Guardian Overview",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959141/green_guardian_ozpcam.jpg",
      },
      {
        num: "06",
        caption: "Guardian Reports 1",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959065/green_guardian_reports_1_u1lt7r.jpg",
      },
      {
        num: "07",
        caption: "Guardian Reports 2",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959139/green_guardian_reports_2_gr6zig.jpg",
      },
      {
        num: "08",
        caption: "Image Reco Main",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959141/image_reco_scr_cidydq.jpg",
      },
      {
        num: "09",
        caption: "Image Reco Result",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959141/image_reco_jdfcs3.jpg",
      },
      {
        num: "10",
        caption: "Image Reco Detail",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959810/image_recoo_uo885b.jpg",
      },
      {
        num: "11",
        caption: "News Feed 1",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959140/news_screen_2_m5xthq.jpg",
      },
      {
        num: "12",
        caption: "Guardian Reports Full",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959141/green_guardian_reports_1_aq1w9b.jpg",
      },
    ],
  },
  {
    title: "Image Recognition Engine",
    tagline: "Soil Classification AI",
    description:
      "Sage PyTorch model classification results surfaced as clear, actionable field guidance for agricultural users.",
    tags: ["React Native", "PyTorch", "Supabase", "2026"],
    category: "AI Classifier",
    platform: "Android & IOS",
    role: "ML & Fullstack Engineer",
    duration: "4 Weeks",
    status: "75% Completed",
    images: [
      {
        num: "01",
        caption: "Barren Soil Classification",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959039/barren_soil_classification_hxdulg.jpg",
      },
      {
        num: "02",
        caption: "Phase 1 — Barren",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959038/phase_1_barren_1_jswhpx.jpg",
      },
      {
        num: "03",
        caption: "Phase 1 — Semi Vegetative 1",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959040/phase_1_semi_vegetative_1_ndxcbw.jpg",
      },
      {
        num: "04",
        caption: "Phase 1 — Semi Vegetative 2",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959039/phase_1_semi_vegetative_2_mrljyw.jpg",
      },
      {
        num: "05",
        caption: "Phase 1 — Semi Vegetative 3",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959045/phase_1_semi_vegetative_3_x1d1ee.jpg",
      },
      {
        num: "06",
        caption: "Semi Vegetative Detail",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959046/semi_vegetative_detail_gzhslv.jpg",
      },
      {
        num: "07",
        caption: "Suspected Fertile 2",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959045/suspected_fertile_2_pqlcso.jpg",
      },
      {
        num: "08",
        caption: "Suspected Fertile 3",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959049/suspected_fertile_3_vvfwp0.jpg",
      },
      {
        num: "09",
        caption: "Suspected Fertile Phase 1 — 1",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959049/suspected_fertile_phase_1_1_uu8m9v.jpg",
      },
      {
        num: "10",
        caption: "Suspected Fertile Phase 1 — 2",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959049/suspected_fertile_phase_1_2_jftamo.jpg",
      },
      {
        num: "11",
        caption: "Suspected Fertile Phase 1 — 3",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959050/suspected_fertile_phase_1_3_sdmxhc.jpg",
      },
    ],
  },
  {
    title: "Profile Screen & Reports",
    tagline: "User Profiles & Analytics",
    description:
      "Visual reporting tools, user activity metrics, and profile management interface for field personnel.",
    tags: ["React Native", "TypeScript", "Supabase", "2026"],
    category: "Analytics & Profile",
    platform: "Android & IOS",
    role: "Fullstack Developer",
    duration: "2 Weeks",
    status: "75% Completed",
    images: [
      {
        num: "01",
        caption: "Profile Main 1",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959037/profile_screen_1_iypxl8.jpg",
      },
      {
        num: "02",
        caption: "Profile Main 2",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959038/profile_screen_2_npqm0i.jpg",
      },
      {
        num: "03",
        caption: "Profile Edit",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959037/profile_edit_tzygjf.jpg",
      },
      {
        num: "04",
        caption: "Reports Overview",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959037/reports_xjjgki.jpg",
      },
      {
        num: "05",
        caption: "Reports Modal",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959039/reports_modal_av19lc.jpg",
      },
      {
        num: "06",
        caption: "Visual Analytics 1",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959038/visual_vgfgqw.jpg",
      },
      {
        num: "07",
        caption: "Visual Analytics 2",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959038/visual2_mheoo8.jpg",
      },
      {
        num: "08",
        caption: "Visual Analytics 3",
        resolution: "1080 × 2400",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959038/visua3_vtv3f7.jpg",
      },
    ],
  },
];

type ScreenViewMode = "grid" | "tiles" | "carousel";

export default function GreenSpaceArtifactsPage() {
  const [sectionIdx, setSectionIdx] = useState(0); // Defaults to Auth Screens (0)
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState(false);
  const [screenView, setScreenView] = useState<ScreenViewMode>("grid");
  const screenCarouselRef = useRef<HTMLDivElement | null>(null);

  const section = SECTIONS[sectionIdx];
  useEffect(() => {
    setActiveScreenIdx(0);
    // Preload first 3 images of each new section
    section.images.slice(0, 3).forEach((img) => {
      const el = new Image();
      el.src = img.src;
    });
  }, [sectionIdx]);

  const currentScreen = section.images[activeScreenIdx] || section.images[0];

  // Preload adjacent images for instant cycling
  useEffect(() => {
    const preload = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    const prev =
      section.images[
        (activeScreenIdx - 1 + section.images.length) % section.images.length
      ];
    const next = section.images[(activeScreenIdx + 1) % section.images.length];
    if (prev) preload(prev.src);
    if (next) preload(next.src);
  }, [activeScreenIdx, section.images]);

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
    <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30 selection:text-emerald-500 font-sans pb-16 transition-colors duration-300">
      <div className="w-full border-b border-border bg-card/80 backdrop-blur-md px-4 sm:px-8 lg:px-12 py-0.5 sticky top-4 z-30">
        <div className="flex items-center justify-center gap-3 max-w-7xl mx-auto h-auto md:h-10 relative">
          <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {SECTIONS.map((sec, idx) => (
              <button
                key={sec.title}
                onClick={() => setSectionIdx(idx)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  idx === sectionIdx
                    ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black shadow-lg shadow-emerald-500/25 font-bold"
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
              : sectionIdx < 2
                ? SECTIONS.slice(0, 2).map((sec, idx) => ({ sec, idx }))
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
                    ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black shadow-md font-bold"
                    : "bg-muted/80 text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {sec.title}
              </button>
            ))}

            {/* Toggle Plus / Minus Button */}
            {!expandedSections ? (
              <button
                onClick={() => setExpandedSections(true)}
                className="px-2.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1 hover:bg-emerald-500/20 transition-all cursor-pointer"
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

          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hidden sm:inline-flex items-center gap-1.5 absolute right-6">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-ping" />
            Showing: {section.title} ({section.images.length} Screens)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-6">
        {/* ─── Top Main Grid (Hero Overview + Phone Frame + Sidebar) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Hero Header Column (Cols 1 to 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
            <div>
              {/* Back to Projects Pill */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
              >
                <ArrowLeft className="size-3.5" />
                Back to Projects
              </Link>

              {/* Title & Tagline */}
              <div className="mt-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-600 dark:text-emerald-400 drop-shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                  GreenSpace
                </h1>
                <p className="mt-1 text-lg sm:text-xl font-medium text-muted-foreground">
                  {section.tagline}
                </p>
              </div>

              {/* Badges Row */}
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <Smartphone className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  Screens
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <ReactNativeIcon className="size-3.5" />
                  React Native
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <TypeScriptIcon className="size-3.5" />
                  TypeScript
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <SupabaseIcon className="size-3.5" />
                  Supabase
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <Calendar className="size-3.5 text-muted-foreground" />
                  2026
                </span>
              </div>

              {/* Description Paragraph */}
              <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                {section.description}
              </p>
            </div>

            {/* View Case Study Button */}
            <div className="mt-8">
              <Link
                href="/projects/greenspace/demo"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-500/50 bg-emerald-500/10 dark:bg-emerald-950/40 px-6 py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 transition-all hover:bg-emerald-500/20 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] group"
              >
                <span>View Case Study</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Center Stage Phone Mockup (Cols 6 to 8) */}
          <div className="lg:col-span-4 flex items-center justify-center relative my-4 lg:my-0">
            {/* Backdrop Radial Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-96 bg-emerald-500/20 dark:bg-emerald-500/15 blur-3xl rounded-full animate-pulse" />
              <svg
                className="absolute size-[420px] text-emerald-500/20 dark:text-emerald-500/15 pointer-events-none"
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

            {/* iPhone Frame Container */}
            <div className="relative z-10 w-[240px] sm:w-[260px] h-[500px] sm:h-[530px] rounded-[42px] border-[7px] border-zinc-900 dark:border-zinc-800 bg-zinc-950 p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.3),0_0_40px_rgba(16,185,129,0.2)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(16,185,129,0.25)] flex flex-col overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
              {/* Camera Notch / Dynamic Island */}
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
                  <p className="text-[10px] text-emerald-400 font-mono">
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
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
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
                    GreenSpace
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
                    <span title="React Native">
                      <ReactNativeIcon className="size-3.5" />
                    </span>
                    <span title="TypeScript">
                      <TypeScriptIcon className="size-3.5" />
                    </span>
                    <span title="Supabase">
                      <SupabaseIcon className="size-3.5" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1.5">Status</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 dark:border-emerald-800/80 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {section.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Like this project Card */}
            <div className="rounded-2xl border border-border bg-card p-5 backdrop-blur-md shadow-xl flex flex-col gap-3 text-card-foreground">
              <div className="size-10 rounded-full bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 dark:border-emerald-800/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <Leaf className="size-5" />
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
              <span className="size-2 rounded-full bg-emerald-500" />
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
                  className={`p-1.5 rounded-md transition-colors ${screenView === "grid" ? "bg-background text-emerald-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutGrid className="size-3" />
                </button>
                <button
                  onClick={() => setScreenView("tiles")}
                  title="Tiles"
                  className={`p-1.5 rounded-md transition-colors ${screenView === "tiles" ? "bg-background text-emerald-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutDashboard className="size-3" />
                </button>
                <button
                  onClick={() => setScreenView("carousel")}
                  title="Carousel"
                  className={`p-1.5 rounded-md transition-colors ${screenView === "carousel" ? "bg-background text-emerald-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <GalleryHorizontal className="size-3" />
                </button>
              </div>
              {/* Dots & arrows — hidden in carousel mode */}
              {screenView !== "carousel" && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {section.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveScreenIdx(i)}
                        className={`size-2 rounded-full transition-all ${i === activeScreenIdx ? "bg-emerald-500 w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
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

          {/* Grid of Mobile Screen Cards */}
          {screenView === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {section.images.map((img, i) => {
                const isActive = i === activeScreenIdx;
                return (
                  <div
                    key={img.src}
                    onClick={() => {
                      setActiveScreenIdx(i);
                      setLightboxIdx(i);
                    }}
                    className={`group relative flex flex-col rounded-2xl border p-3 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-emerald-500 bg-card shadow-[0_0_25px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50"
                        : "border-border bg-card/60 hover:border-accent-foreground/30 hover:bg-card"
                    }`}
                  >
                    {/* Number Badge Top Left */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-lg text-[11px] font-bold ${
                          isActive
                            ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black font-extrabold"
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
                        className="absolute bottom-3 right-3 z-20 size-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:bg-emerald-500 hover:text-black hover:border-emerald-400 transition-all"
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

          {/* Tiles View */}
          {screenView === "tiles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.images.map((img, i) => {
                const isActive = i === activeScreenIdx;
                return (
                  <div
                    key={img.src}
                    onClick={() => {
                      setActiveScreenIdx(i);
                      setLightboxIdx(i);
                    }}
                    className={`group relative flex flex-col rounded-2xl border p-3 cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-emerald-500 bg-card shadow-[0_0_25px_rgba(16,185,129,0.25)] ring-1 ring-emerald-500/50"
                        : "border-border bg-card/60 hover:border-accent-foreground/30 hover:bg-card"
                    }`}
                  >
                    {/* Number Badge Top Left */}
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-lg text-[11px] font-bold ${
                          isActive
                            ? "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-black font-extrabold"
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
                        className="absolute bottom-3 right-3 z-20 size-8 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:bg-emerald-500 hover:text-black hover:border-emerald-400 transition-all"
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

          {/* Carousel View */}
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
                        <p className="text-[10px] text-emerald-400 font-mono">
                          {img.num} · {img.resolution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 absolute bottom-4 right-4">
                <button
                  onClick={scrollScreenPrev}
                  aria-label="Previous"
                  className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={scrollScreenNext}
                  aria-label="Next"
                  className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all"
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
            href="/projects"
            className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="size-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Leaf className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] text-muted-foreground font-normal">
                ← Previous Project
              </span>
              <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                AgriPredict Dashboard
              </span>
            </div>
          </Link>

          {/* Explore More Projects */}
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-bold text-foreground hover:bg-accent transition-all"
          >
            <Grid className="size-3.5 text-emerald-600 dark:text-emerald-400" />
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
                E-Learning Platform
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
            className="absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-zinc-900/80 text-white border border-zinc-700 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors z-30"
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
            className="absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-zinc-900/80 text-white border border-zinc-700 flex items-center justify-center hover:bg-emerald-500 hover:text-black transition-colors z-30"
            aria-label="Next image"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </div>
  );
}
