import type { Metadata } from "next";
import { HeroLanding } from "@/components/hero-landing";

const siteUrl = "https://portfolio.sagetech.co.zw";
const avatarUrl =
  "https://portfolio.sagetech.co.zw/witness-avatar.png";

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
    type: "profile",
    images: [
      {
        url: avatarUrl,
        width: 1024,
        height: 1024,
        alt: "Witness H Musonza portrait",
      },
      {
        url: "https://res.cloudinary.com/virfpzu4/image/upload/v1788345225/20260522_194525_b3pg2a.jpg",
        width: 1200,
        height: 630,
        alt: "Witness H Musonza portrait",
      },
    ],
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
