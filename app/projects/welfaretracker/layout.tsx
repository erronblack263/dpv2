import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WelfareTracker",
  description:
    "WelfareTracker is a field operations platform that improves staff safety, emergency response, and welfare monitoring with geofencing and live tracking.",
  alternates: {
    canonical: "/projects/welfaretracker",
  },
  openGraph: {
    title: "WelfareTracker | Field Safety Platform",
    description:
      "A welfare and emergency response platform built for field teams, live tracking, and safer operations.",
    url: "https://portfolio.sagetech.co.zw/projects/welfaretracker",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WelfareTracker | Field Safety Platform",
    description:
      "A welfare and emergency response platform built for field teams, live tracking, and safer operations.",
  },
};

export default function WelfareTrackerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
