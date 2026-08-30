import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Space Artifacts",
  description:
    "Browse the Green Space design and product artifacts, including soil detection screens, dashboards, and UX documentation.",
  alternates: {
    canonical: "/projects/greenspace/artifacts",
  },
  openGraph: {
    title: "Green Space Artifacts",
    description:
      "Review the Green Space product artifacts, dashboards, and AI-powered agricultural UI designs.",
    url: "https://portfolio.sagetech.co.zw/projects/greenspace/artifacts",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Space Artifacts",
    description:
      "Review the Green Space product artifacts, dashboards, and AI-powered agricultural UI designs.",
  },
};

export default function GreenSpaceArtifactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
