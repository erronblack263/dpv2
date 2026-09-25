"use client";

import { animate } from "animejs";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const shouldAnimate =
      pathname.startsWith("/projects") || pathname === "/cv";
    if (!content || !shouldAnimate) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      content.style.opacity = "1";
      content.style.transform = "";
      return;
    }

    content.style.opacity = "0";
    content.style.transform = "translateY(12px)";

    animate(content, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 500,
      ease: "outCubic",
      onComplete: () => {
        content.style.transform = "";
      },
    });
  }, [pathname]);

  return <div ref={contentRef}>{children}</div>;
}