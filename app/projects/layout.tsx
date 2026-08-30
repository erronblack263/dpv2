import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "View selected projects from Witness H Musonza, including AI systems, mobile apps, web platforms, and systems programming work.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
