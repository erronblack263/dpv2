import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Explore Witness H Musonza's portfolio of web apps, mobile products, AI experiences, and software engineering work.",
  alternates: {
    canonical: "/home",
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
