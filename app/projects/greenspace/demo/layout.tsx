import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Space Demo",
  description:
    "Watch the Green Space product demo to see the app flow, soil intelligence features, and crop analysis experience in action.",
  alternates: {
    canonical: "/projects/greenspace/demo",
  },
  openGraph: {
    title: "Green Space Demo",
    description:
      "See the Green Space product demo showcasing soil intelligence, AI predictions, and field workflows.",
    url: "https://portfolio.sagetech.co.zw/projects/greenspace/demo",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Space Demo",
    description:
      "See the Green Space product demo showcasing soil intelligence, AI predictions, and field workflows.",
  },
};

export default function GreenSpaceDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
