import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  description:
    "View the curriculum vitae of Witness H Musonza, a software developer specialising in mobile, web, backend, and systems engineering.",
  alternates: {
    canonical: "/cv",
  },
  openGraph: {
    title: "Curriculum Vitae | Witness H Musonza",
    description:
      "Explore Witness H Musonza's software engineering experience, education, projects, and technical skills.",
    url: "https://portfolio.sagetech.co.zw/cv",
    siteName: "Witness H Musonza Portfolio",
    type: "profile",
  },
};

export default function CVLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
