import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HighSpecHR",
  description:
    "HighSpecHR is a recruitment and workforce management platform designed to simplify HR operations, hiring workflows, and reporting.",
  alternates: {
    canonical: "/projects/highspechr",
  },
  openGraph: {
    title: "HighSpecHR | HR Platform",
    description:
      "A workforce and recruitment platform for managing hiring, employee workflows, and HR reporting.",
    url: "https://musonzahw.co.zw/projects/highspechr",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HighSpecHR | HR Platform",
    description:
      "A workforce and recruitment platform for managing hiring, employee workflows, and HR reporting.",
  },
};

export default function HighSpecHRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
