import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "See the achievements, certifications, and recognition earned by Witness H Musonza across software engineering and product work.",
  alternates: {
    canonical: "/achievements",
  },
};

export default function AchievementsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
