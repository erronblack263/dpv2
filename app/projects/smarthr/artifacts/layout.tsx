import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartHR Artifacts",
  description:
    "View SmartHR product screens, onboarding flow, recruitment pipelines, and employee management artifacts from this HR platform project.",
  alternates: {
    canonical: "/projects/smarthr/artifacts",
  },
  openGraph: {
    title: "SmartHR Artifacts",
    description:
      "Explore the SmartHR artifact gallery covering onboarding, recruitment, employee workflows, and reporting interfaces.",
    url: "https://portfolio.sagetech.co.zw/projects/smarthr/artifacts",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartHR Artifacts",
    description:
      "Explore the SmartHR artifact gallery covering onboarding, recruitment, employee workflows, and reporting interfaces.",
  },
};

export default function SmartHRArtifactsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
