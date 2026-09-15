import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SageOS Video Demo",
  description:
    "Explore the SageOS operating system demo, including its kernel foundation, system utilities, and desktop environment.",
  alternates: {
    canonical: "/projects/sageOS/demo",
  },
};

export default function SageOSDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
