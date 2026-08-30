import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "Software Developer | Witness H Musonza",
  description:
    "Witness H Musonza builds full-stack web, mobile, AI, and systems products for businesses that need elegant digital solutions.",
  alternates: {
    canonical: "/hero-landing",
  },
};

export default function HeroLandingPage() {
  return <LandingPage />;
}
