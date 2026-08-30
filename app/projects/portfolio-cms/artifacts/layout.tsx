import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SageOS Artifacts",
  description:
    "Browse the SageOS operating system screenshots, command-line tools, and desktop interface artifacts from the project.",
  alternates: {
    canonical: "/projects/portfolio-cms/artifacts",
  },
  openGraph: {
    title: "SageOS Artifacts",
    description:
      "Explore the SageOS desktop, command-line, and system interface artifacts from the custom operating system project.",
    url: "https://portfolio.sagetech.co.zw/projects/portfolio-cms/artifacts",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SageOS Artifacts",
    description:
      "Explore the SageOS desktop, command-line, and system interface artifacts from the custom operating system project.",
  },
};

export default function SageOSArtifactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
