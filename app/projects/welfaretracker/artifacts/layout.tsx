import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WelfareTracker Artifacts",
  description:
    "Explore the WelfareTracker design system, safety dashboards, monitoring screens, and operational artifacts from the project.",
  alternates: {
    canonical: "/projects/welfaretracker/artifacts",
  },
  openGraph: {
    title: "WelfareTracker Artifacts",
    description:
      "Review the WelfareTracker product screens and field operations artifacts that guide the safety workflow design.",
    url: "https://portfolio.sagetech.co.zw/projects/welfaretracker/artifacts",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WelfareTracker Artifacts",
    description:
      "Review the WelfareTracker product screens and field operations artifacts that guide the safety workflow design.",
  },
};

export default function WelfareTrackerArtifactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
