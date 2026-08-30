import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartHR",
  description:
    "SmartHR is a recruitment and workforce management platform designed to simplify HR operations, hiring workflows, and reporting.",
  alternates: {
    canonical: "/projects/smarthr",
  },
  openGraph: {
    title: "SmartHR | HR Platform",
    description:
      "A workforce and recruitment platform for managing hiring, employee workflows, and HR reporting.",
    url: "https://portfolio.sagetech.co.zw/projects/smarthr",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmartHR | HR Platform",
    description:
      "A workforce and recruitment platform for managing hiring, employee workflows, and HR reporting.",
  },
};

export default function SmartHRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
