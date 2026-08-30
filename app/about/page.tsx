import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Witness H Musonza, a software developer building digital products, experiences, and systems with a product-first mindset.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <LandingPage />;
}
