import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WelfareTracker Demo",
  description:
    "See the WelfareTracker demo for employee safety workflows, field monitoring, geofencing, and emergency alert flow.",
  alternates: {
    canonical: "/projects/welfaretracker/demo",
  },
  openGraph: {
    title: "WelfareTracker Demo",
    description:
      "Review the WelfareTracker demo for emergency alerts, safe-zone setup, and field operations monitoring.",
    url: "https://portfolio.sagetech.co.zw/projects/welfaretracker/demo",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WelfareTracker Demo",
    description:
      "Review the WelfareTracker demo for emergency alerts, safe-zone setup, and field operations monitoring.",
  },
};

export default function WelfareTrackerDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
