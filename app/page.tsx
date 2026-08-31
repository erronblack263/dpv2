import type { Metadata } from "next";
import HeroLandingClient from "@/app/hero-landing/hero-landing-client";

export const metadata: Metadata = {
  title: "Witness H Musonza | Software Developer",
  description:
    "Fullstack engineer specialising in mobile, web and backend systems. Building scalable digital solutions with little hassle.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HeroLandingClient />;
}
