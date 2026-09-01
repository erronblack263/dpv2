import type { Metadata } from "next";
import { HeroLanding } from "@/components/hero-landing";

const siteUrl = "https://portfolio.sagetech.co.zw";
const avatarUrl = `${siteUrl}/witness-avatar.png`;

export const metadata: Metadata = {
  title: "Witness H Musonza | Software Developer",
  description:
    "Fullstack engineer specialising in mobile, web and backend systems. Building scalable digital solutions with little hassle.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Witness H Musonza | Software Developer",
    description:
      "Fullstack engineer specialising in mobile, web and backend systems. Building scalable digital solutions with little hassle.",
    url: siteUrl,
    siteName: "Witness H Musonza Portfolio",
    images: [
      {
        url: avatarUrl,
        width: 1200,
        height: 630,
        alt: "Witness H Musonza portrait",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Witness H Musonza | Software Developer",
    description:
      "Fullstack engineer specialising in mobile, web and backend systems. Building scalable digital solutions with little hassle.",
    images: [avatarUrl],
  },
  other: {
    thumbnail: avatarUrl,
    "image-thumbnail": avatarUrl,
  },
};

export default function Page() {
  return <HeroLanding />;
}
