import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Green Space",
  description:
    "Green Space is a mobile agri-tech solution that uses soil analysis, image recognition, and data-driven insights to support better crop decisions.",
  alternates: {
    canonical: "/projects/greenspace",
  },
  openGraph: {
    title: "Green Space | Agri-Tech Project",
    description:
      "AI-assisted soil classification and crop intelligence for better agricultural decision-making.",
    url: "https://portfolio.sagetech.co.zw/projects/greenspace",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Space | Agri-Tech Project",
    description:
      "AI-assisted soil classification and crop intelligence for better agricultural decision-making.",
  },
};

export default function GreenSpaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
