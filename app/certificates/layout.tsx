import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Browse software engineering certifications and training credentials earned by Witness H Musonza.",
  alternates: {
    canonical: "/certificates",
  },
};

export default function CertificatesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
