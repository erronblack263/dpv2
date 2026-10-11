"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScrollProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let lenis: Lenis | undefined;

    const updateScroll = () => {
      lenis?.destroy();
      lenis = undefined;

      if (!motionPreference.matches) {
        lenis = new Lenis({
          anchors: true,
          autoRaf: true,
          lerp: 0.18,
          wheelMultiplier: 1,
        });
      }
    };

    updateScroll();
    motionPreference.addEventListener("change", updateScroll);

    return () => {
      motionPreference.removeEventListener("change", updateScroll);
      lenis?.destroy();
    };
  }, []);

  return children;
}
