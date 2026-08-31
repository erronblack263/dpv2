import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Witness H Musonza, a full-stack software developer and systems engineer crafting scalable digital products and seamless experiences.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <LandingPage />;
}
