import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HighSpecHR Artifacts",
  description:
    "View HighSpecHR product screens, onboarding flow, recruitment pipelines, and employee management artifacts from this HR platform project.",
  alternates: {
    canonical: "/projects/highspechr/artifacts",
  },
  openGraph: {
    title: "HighSpecHR Artifacts",
    description:
      "Explore the HighSpecHR artifact gallery covering onboarding, recruitment, employee workflows, and reporting interfaces.",
    url: "https://musonzahw.co.zw/projects/highspechr/artifacts",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HighSpecHR Artifacts",
    description:
      "Explore the HighSpecHR artifact gallery covering onboarding, recruitment, employee workflows, and reporting interfaces.",
  },
};

export default function HighSpecHRArtifactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
