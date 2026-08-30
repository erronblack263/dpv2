import type { Metadata } from "next";
import HeroLandingPage from "@/app/hero-landing/page";

export const metadata: Metadata = {
  title: "Software Developer | Witness H Musonza",
  description:
    "Witness H Musonza builds full-stack web, mobile, AI, and systems products for businesses that need elegant digital solutions.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HeroLandingPage />;
}
