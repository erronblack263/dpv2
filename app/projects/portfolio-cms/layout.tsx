import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SageOS",
  description:
    "SageOS is a systems programming project exploring kernel concepts, operating system design, process management, and desktop UX.",
  alternates: {
    canonical: "/projects/portfolio-cms",
  },
  openGraph: {
    title: "SageOS | Systems Programming Project",
    description:
      "A custom operating system project exploring kernel architecture, process scheduling, and desktop system interfaces.",
    url: "https://portfolio.sagetech.co.zw/projects/portfolio-cms",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SageOS | Systems Programming Project",
    description:
      "A custom operating system project exploring kernel architecture, process scheduling, and desktop system interfaces.",
  },
};

export default function SageOSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
