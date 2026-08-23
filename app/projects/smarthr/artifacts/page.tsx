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
  Monitor,
  Calendar,
  Layers,
  User,
  Clock,
  Wrench,
  Sparkles,
  Plus,
  Minus,
  LayoutGrid,
  LayoutDashboard,
  GalleryHorizontal,
} from "lucide-react";

function ReactIcon({ className = "size-4" }: { className?: string }) {
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

function SpringIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="32" fill="#6DB33F" />
      <path
        d="M44 16c-4 4-12 6-18 14-4 5-5 11-3 16 2 4 7 7 13 7s11-3 14-8c4-7 2-16-3-22-2-3-2-5-3-7z"
        fill="white"
        opacity="0.9"
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
    tagline: "Authentication & Onboarding",
    description:
      "Secure login and signup flows with form validation, error handling and seamless account creation for SmartHR users.",
    category: "Authentication",
    platform: "Web",
    role: "Fullstack Developer",
    duration: "2 Weeks",
    status: "65% Complete",
    images: [
      {
        num: "01",
        caption: "SIGNUP PAGE",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785842017/smarthr_signup_screen_tlpfpf.png",
      },
      {
        num: "02",
        caption: "SIGN IN",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785842011/smarthr_sign_in_screen_ml808d.png",
      },
    ],
  },
  {
    title: "Dashboard & Overview",
    tagline: "HR Analytics & Insights",
    description:
      "Central command centre for HR teams — real-time smart recruitment, hiring pipeline status, and key workforce metrics at a glance.",
    category: "Dashboard",
    platform: "Web",
    role: "Fullstack Developer",
    duration: "3 Weeks",
    status: "65% Complete",
    images: [
      {
        num: "01",
        caption: "Landing Page",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785842008/smarthr_xwyta5.png",
      },
      {
        num: "02",
        caption: "Analytics Overview",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841967/smarthr_dashboard_analytics_auyiv8.png",
      },
      {
        num: "03",
        caption: "Headcount Report",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841970/smarthr_headcount_report_lwq9ve.png",
      },
      {
        num: "04",
        caption: "Job Application Page",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841974/job_application_page_kjvzbm.png",
      },
      {
        num: "05",
        caption: "Candidate Applications",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841954/candidate_applications_drawer_ngoodi.png",
      },
      {
        num: "06",
        caption: "Jobs Page",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841955/candidate_jobs_page_dvfski.png",
      },
      {
        num: "07",
        caption: "Profile Page",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841957/candidates_profile_page_nvwbda.png",
      },
      {
        num: "08",
        caption: "Notifications Page",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841953/candidate_notifications_page_gzbzrq.png",
      },
      {
        num: "09",
        caption: "Departments Page",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841989/recruiter_department_page_a3b9sf.png",
      },
      {
        num: "10",
        caption: "Interviews Page",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841958/candidate_interviews_page_fbsg6u.png",
      },
    ],
  },
  {
    title: "Admin Management",
    tagline: "Hiring & Candidate Tracking",
    description:
      "Full-cycle recruitment workflow — job postings, application tracking, interview scheduling and offer management in one place.",
    category: "Recruitment",
    platform: "Web",
    role: "Fullstack Developer",
    duration: "4 Weeks",
    status: "65% Complete",
    images: [
      {
        num: "01",
        caption: "Job Listings",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841981/smarthr_recruitment_jobs_s0ynpe.png",
      },
      {
        num: "02",
        caption: "Candidate Pipeline",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841986/smarthr_candidate_pipeline_ab4dfd.png",
      },
      {
        num: "03",
        caption: "Candidate Profile",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841988/smarthr_candidate_profile_hafk5g.png",
      },
      {
        num: "04",
        caption: "Interview Scheduler",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841987/smarthr_interview_scheduler_l2j6o0.png",
      },
      {
        num: "05",
        caption: "ADMIN APPLICATION MANAGEMENT",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785879124/admin_apploications_management_review_pey7gr.png",
      },
      {
        num: "06",
        caption: "USR MANAGEMENT SYSTEM",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785879123/admin_user_management_page_xmcmt7.png",
      },
      {
        num: "07",
        caption: "admin jobs management system",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785879132/admin_jobs_management_page_giqmaw.png",
      },
    ],
  },
  {
    title: "Assessment Engine",
    tagline: "Skills & Candidate Assessment",
    description:
      "Automated candidate assessment with customisable tests, scoring rubrics and AI-assisted shortlisting for faster hiring decisions.",
    category: "Assessment",
    platform: "Web",
    role: "Fullstack Developer",
    duration: "3 Weeks",
    status: "65% Complete",
    images: [
      {
        num: "01",
        caption: "Assessment Form",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1787143855/assesment_form_iveje5.png",
      },
      {
        num: "02",
        caption: "Assessment Breakdown Results",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1787143847/assesment-breakdown_results_br6del.png",
      },
      {
        num: "03",
        caption: "Assessment Metrics",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1787143847/assesement-metrics_fkwste.png",
      },
      {
        num: "04",
        caption: "Assessment Scoring Modal",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1787143845/assesment-scoring_modal_vhhyzy.png",
      },
      {
        num: "05",
        caption: "Psychometric Test Submission",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786007170/psychometrci_test_submission_s5ed8j.png",
      },
    ],
  },
  {
    title: "Employee Management",
    tagline: "Workforce & Onboarding",
    description:
      "Employee profiles, onboarding workflows, department management and performance tracking for growing teams.",
    category: "Employee Management",
    platform: "Web",
    role: "Fullstack Developer",
    duration: "2 Weeks",
    status: "65% Complete",
    images: [
      {
        num: "01",
        caption: "Employee Directory",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841960/smarthr_employee_directory_uxukug.png",
      },
      {
        num: "02",
        caption: "Employee Profile",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841961/smarthr_employee_profile_dnzdga.png",
      },
      {
        num: "03",
        caption: "Onboarding Flow",
        resolution: "1200 × 900",
        src: "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785841962/smarthr_employee_onboarding_ruxoej.png",
      },
    ],
  },
];

type ScreenViewMode = "grid" | "tiles" | "carousel";

export default function SmartHRArtifactsPage() {
  const [sectionIdx, setSectionIdx] = useState(0);
  const [activeScreenIdx, setActiveScreenIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [expandedSections, setExpandedSections] = useState(false);
  const [screenView, setScreenView] = useState<ScreenViewMode>("grid");
  const screenCarouselRef = useRef<HTMLDivElement | null>(null);

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

  const section = SECTIONS[sectionIdx];
  useEffect(() => {
    setActiveScreenIdx(0);
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

  return (
    <div className="min-h-screen bg-background text-foreground font-sans pb-16 transition-colors duration-300">
      {/* Sticky tabs bar */}
      <div className="w-full border-b border-border bg-card backdrop-blur-md px-4 sm:px-8 lg:px-12 py-0.5 sticky top-4 z-30">
        <div className="flex items-center justify-center gap-3 max-w-7xl mx-auto h-auto md:h-10 relative">
          <div className="hidden md:flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {SECTIONS.map((sec, idx) => (
              <button
                key={sec.title}
                onClick={() => setSectionIdx(idx)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  idx === sectionIdx
                    ? "bg-violet-600 dark:bg-violet-500 text-white dark:text-black shadow-lg shadow-violet-500/25 font-bold"
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
                    ? "bg-violet-600 dark:bg-violet-500 text-white dark:text-black shadow-md font-bold"
                    : "bg-muted/80 text-muted-foreground border border-border hover:text-foreground"
                }`}
              >
                {sec.title}
              </button>
            ))}

            {/* Toggle More / Less Button */}
            {!expandedSections ? (
              <button
                onClick={() => setExpandedSections(true)}
                className="px-2.5 py-1.5 rounded-full text-xs font-bold bg-violet-500/10 dark:bg-violet-950 text-violet-600 dark:text-violet-400 border border-violet-500/30 flex items-center gap-1 hover:bg-violet-500/20 transition-all cursor-pointer"
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

          <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400 hidden sm:inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-violet-500 animate-ping" />
            Showing: {section.title} ({section.images.length} Screens)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left column */}
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
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-violet-600 dark:text-violet-400 drop-shadow-[0_0_25px_rgba(124,58,237,0.2)]">
                  SmartHR
                </h1>
                <p className="mt-1 text-lg sm:text-xl font-medium text-muted-foreground">
                  {section.tagline}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <Monitor className="size-3.5 text-violet-600 dark:text-violet-400" />
                  Web
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <ReactIcon className="size-3.5" />
                  React
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <TypeScriptIcon className="size-3.5" />
                  TypeScript
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  <SpringIcon className="size-3.5" />
                  Spring Boot
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
                className="inline-flex items-center gap-2 rounded-full border border-violet-500/50 bg-violet-500/10 dark:bg-violet-950/40 px-6 py-2.5 text-sm font-semibold text-violet-600 dark:text-violet-400 transition-all hover:bg-violet-500/20 hover:border-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.15)] group"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Center — Laptop mockup */}
          <div className="lg:col-span-4 flex items-start justify-center relative my-4 lg:my-0 lg:pt-10">
            {/* Backdrop glow — desktop only */}
            <div className="hidden lg:block absolute top-8 left-1/2 -translate-x-1/2 w-72 h-52 bg-violet-500/20 dark:bg-violet-500/15 blur-3xl rounded-full animate-pulse pointer-events-none" />
            {/* Dashed ring — desktop only */}
            <svg
              className="hidden lg:block absolute top-4 left-1/2 -translate-x-1/2 w-[340px] h-[340px] pointer-events-none"
              viewBox="0 0 200 200"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="85"
                stroke="#8b5cf6"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <circle
                cx="100"
                cy="100"
                r="98"
                stroke="#8b5cf6"
                strokeOpacity="0.3"
                strokeWidth="1"
              />
            </svg>

            {/* Laptop frame */}
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px]">
              {/* Screen bezel */}
              <div
                className="relative rounded-t-xl border-[7px] border-zinc-900 dark:border-zinc-800 bg-zinc-950 shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(124,58,237,0.2)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(124,58,237,0.25)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
                style={{ aspectRatio: "16/10" }}
              >
                {/* Camera dot */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 size-1.5 rounded-full bg-zinc-700" />
                {/* Screen content */}
                <div className="relative w-full h-full bg-zinc-950 overflow-hidden">
                  <img
                    src={currentScreen.src}
                    alt={currentScreen.caption}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  {/* Caption overlay */}
                  <div className="absolute bottom-2 left-2 right-2 z-20 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 px-3 py-2 text-center text-white">
                    <p className="text-xs font-bold tracking-wide truncate">
                      {currentScreen.caption}
                    </p>
                    <p className="text-[10px] text-violet-400 font-mono">
                      {currentScreen.num} /{" "}
                      {section.images.length.toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>
              </div>
              {/* Laptop hinge + base */}
              <div className="h-3 bg-gradient-to-b from-zinc-800 to-zinc-900 border-x-[7px] border-zinc-900 dark:border-zinc-800" />
              <div className="h-2.5 bg-zinc-900 dark:bg-zinc-800 rounded-b-xl mx-[-5px] shadow-[0_6px_20px_rgba(0,0,0,0.5)]" />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-4 relative z-0">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-xl text-card-foreground">
              <div className="flex items-center gap-2 border-b border-border pb-3 mb-4">
                <span className="size-2 rounded-full bg-violet-500 animate-pulse" />
                <h2 className="text-sm font-bold text-foreground tracking-wide">
                  Project Details
                </h2>
              </div>
              <div className="flex flex-col gap-3.5 text-xs text-muted-foreground">
                {[
                  {
                    icon: <Monitor className="size-3.5" />,
                    label: "Project",
                    value: "SmartHR",
                  },
                  {
                    icon: <Layers className="size-3.5" />,
                    label: "Category",
                    value: section.category,
                  },
                  {
                    icon: <Monitor className="size-3.5" />,
                    label: "Screens",
                    value: `${section.images.length} Screens`,
                  },
                  {
                    icon: <Monitor className="size-3.5" />,
                    label: "Platform",
                    value: section.platform,
                  },
                  {
                    icon: <User className="size-3.5" />,
                    label: "Role",
                    value: section.role,
                  },
                  {
                    icon: <Clock className="size-3.5" />,
                    label: "Duration",
                    value: section.duration,
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-1.5">
                      {icon} {label}
                    </span>
                    <span className="font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Wrench className="size-3.5" /> Tech
                  </span>
                  <div className="flex items-center gap-1.5">
                    <ReactIcon className="size-3.5" />
                    <TypeScriptIcon className="size-3.5" />
                    <SpringIcon className="size-3.5" />
                  </div>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span>Status</span>
                  <span className="inline-flex items-center rounded-full bg-violet-500/10 dark:bg-violet-950 border border-violet-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-violet-600 dark:text-violet-400">
                    {section.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-xl flex flex-col gap-3 text-card-foreground">
              <div className="size-10 rounded-full bg-violet-500/10 dark:bg-violet-950 border border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400">
                <Sparkles className="size-5" />
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

        {/* Screens grid */}
        <div className="mt-10 border-t border-border pt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-violet-500" />
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
                  className={`p-1.5 rounded-md transition-colors ${screenView === "grid" ? "bg-background text-violet-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutGrid className="size-3" />
                </button>
                <button
                  onClick={() => setScreenView("tiles")}
                  title="Tiles"
                  className={`p-1.5 rounded-md transition-colors ${screenView === "tiles" ? "bg-background text-violet-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <LayoutDashboard className="size-3" />
                </button>
                <button
                  onClick={() => setScreenView("carousel")}
                  title="Carousel"
                  className={`p-1.5 rounded-md transition-colors ${screenView === "carousel" ? "bg-background text-violet-500 shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
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
                        className={`size-2 rounded-full transition-all ${i === activeScreenIdx ? "bg-violet-500 w-4" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"}`}
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

          {/* Screen cards — grid view */}
          {screenView === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {section.images.map((img, i) => {
                const isActive = i === activeScreenIdx;
                return (
                  <div
                    key={img.src}
                    onClick={() => setActiveScreenIdx(i)}
                    className={`group relative flex flex-col rounded-2xl border p-3 cursor-pointer transition-all duration-300 ${isActive ? "border-violet-500 bg-card shadow-[0_0_25px_rgba(124,58,237,0.25)] ring-1 ring-violet-500/50" : "border-border bg-card/60 hover:border-accent-foreground/30 hover:bg-card"}`}
                  >
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-lg text-[11px] font-bold ${isActive ? "bg-violet-600 dark:bg-violet-500 text-white font-extrabold" : "bg-muted text-muted-foreground border border-border"}`}
                      >
                        {img.num}
                      </span>
                    </div>
                    {/* Laptop-style thumbnail */}
                    <div
                      className="relative w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800"
                      style={{ aspectRatio: "16/10" }}
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIdx(i);
                        }}
                        className="absolute bottom-2 right-2 z-20 size-7 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:bg-violet-500 transition-all"
                        title="Expand"
                      >
                        <Eye className="size-3.5" />
                      </button>
                    </div>
                    <div className="mt-2.5 flex flex-col gap-0.5">
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

          {/* Screen cards — tiles view */}
          {screenView === "tiles" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.images.map((img, i) => {
                const isActive = i === activeScreenIdx;
                return (
                  <div
                    key={img.src}
                    onClick={() => setActiveScreenIdx(i)}
                    className={`group relative flex flex-col rounded-2xl border p-3 cursor-pointer transition-all duration-300 ${isActive ? "border-violet-500 bg-card shadow-[0_0_25px_rgba(124,58,237,0.25)] ring-1 ring-violet-500/50" : "border-border bg-card/60 hover:border-accent-foreground/30 hover:bg-card"}`}
                  >
                    <div className="absolute top-4 left-4 z-20">
                      <span
                        className={`inline-flex items-center justify-center size-6 rounded-lg text-[11px] font-bold ${isActive ? "bg-violet-600 dark:bg-violet-500 text-white font-extrabold" : "bg-muted text-muted-foreground border border-border"}`}
                      >
                        {img.num}
                      </span>
                    </div>
                    {/* Laptop-style thumbnail */}
                    <div
                      className="relative w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800"
                      style={{ aspectRatio: "16/10" }}
                    >
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setLightboxIdx(i);
                        }}
                        className="absolute bottom-2 right-2 z-20 size-7 rounded-lg bg-black/70 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-80 hover:opacity-100 hover:bg-violet-500 transition-all"
                        title="Expand"
                      >
                        <Eye className="size-3.5" />
                      </button>
                    </div>
                    <div className="mt-2.5 flex flex-col gap-0.5">
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

          {/* Screen cards — carousel view */}
          {screenView === "carousel" && (
            <div className="relative">
              <div
                ref={screenCarouselRef}
                className="-mx-4 px-4 overflow-x-auto scrollbar-none flex gap-4 snap-x snap-mandatory pb-16"
              >
                {section.images.map((img, i) => (
                  <div
                    key={img.src}
                    className="shrink-0 snap-center w-[85%] sm:w-[60%] lg:w-[42%]"
                  >
                    <div
                      onClick={() => {
                        setActiveScreenIdx(i);
                        setLightboxIdx(i);
                      }}
                      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.02] border border-zinc-800"
                      style={{ aspectRatio: "16/10" }}
                    >
                      <div className="absolute inset-0 bg-zinc-900" />
                      <img
                        src={img.src}
                        alt={img.caption}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="relative z-10 mt-auto p-4">
                        <p className="text-xs font-bold text-white truncate">
                          {img.caption}
                        </p>
                        <p className="text-[10px] text-violet-400 font-mono">
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
                  className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  onClick={scrollScreenNext}
                  aria-label="Next"
                  className="flex items-center justify-center size-10 rounded-full bg-card border border-border shadow-md text-foreground hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer nav */}
        <div className="mt-14 rounded-2xl border border-border bg-card/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/projects/welfaretracker/artifacts"
            className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="size-8 rounded-xl bg-sky-500/10 dark:bg-sky-950 border border-sky-500/30 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Sparkles className="size-4" />
            </div>
            <div>
              <span className="block text-[10px] text-muted-foreground font-normal">
                ← Previous Project
              </span>
              <span className="group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                WelfareTracker Artifacts
              </span>
            </div>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-bold text-foreground hover:bg-accent transition-all"
          >
            <Grid className="size-3.5 text-violet-600 dark:text-violet-400" />
            <span>All Projects</span>
          </Link>
          <Link
            href="/projects/greenspace/artifacts"
            className="flex items-center gap-3 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group text-right"
          >
            <div>
              <span className="block text-[10px] text-muted-foreground font-normal">
                Next Project →
              </span>
              <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                GreenSpace Artifacts
              </span>
            </div>
            <div className="size-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Sparkles className="size-4" />
            </div>
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-red-600 hover:bg-red-500 text-white border border-white/30 px-4 py-2 text-xs font-bold shadow-xl cursor-pointer"
          >
            <X className="size-4 stroke-[3]" />
            <span>Close</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx(
                (lightboxIdx - 1 + section.images.length) %
                  section.images.length,
              );
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-zinc-900/80 text-white border border-zinc-700 flex items-center justify-center hover:bg-violet-500 transition-colors z-30"
          >
            <ChevronLeft className="size-6" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center max-w-4xl w-full max-h-[85vh]"
          >
            <img
              src={section.images[lightboxIdx].src}
              alt={section.images[lightboxIdx].caption}
              className="max-h-[70vh] w-auto rounded-2xl object-contain shadow-2xl border border-zinc-800"
            />
            <div className="mt-3 flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-bold text-white">
                {section.images[lightboxIdx].caption}
              </p>
              <p className="text-xs text-zinc-400 font-mono">
                Screen {lightboxIdx + 1} of {section.images.length} ·{" "}
                {section.images[lightboxIdx].resolution}
              </p>
              <button
                onClick={() => setLightboxIdx(null)}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-red-600 text-white border border-white/20 px-5 py-1.5 text-xs font-bold transition-all cursor-pointer"
              >
                <X className="size-3.5" /> Close Preview
              </button>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx + 1) % section.images.length);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 size-11 rounded-full bg-zinc-900/80 text-white border border-zinc-700 flex items-center justify-center hover:bg-violet-500 transition-colors z-30"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </div>
  );
}
