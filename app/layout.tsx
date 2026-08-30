import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ContactDrawer } from "@/components/contact-drawer";
import { NetworkStatus } from "@/components/network-status";
import { SiteStructuredData } from "@/components/site-structured-data";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl = "https://portfolio.sagetech.co.zw";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Witness H Musonza | Software Developer",
    template: "%s | Witness H Musonza",
  },
  description:
    "Witness H Musonza is a software developer building full-stack web and mobile products, AI experiences, and systems-focused software for real-world impact.",
  applicationName: "Witness H Musonza Portfolio",
  authors: [{ name: "Witness H Musonza" }],
  keywords: [
    "Software Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Web Developer",
    "Portfolio",
    "AI Developer",
    "React Native",
    "Next.js",
    "Python",
    "Product Engineer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Witness H Musonza | Software Developer",
    description:
      "Full-stack software developer creating scalable products across mobile, web, AI, and systems engineering.",
    url: siteUrl,
    siteName: "Witness H Musonza Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/witness-avatar.png",
        width: 1200,
        height: 630,
        alt: "Witness H Musonza portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Witness H Musonza | Software Developer",
    description:
      "Full-stack software developer creating scalable products across mobile, web, AI, and systems engineering.",
    images: ["/witness-avatar.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#f7f9fc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} bg-background overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col justify-between">
            <SiteNav />
            <main
              style={{ position: "relative", zIndex: 1 }}
              className="w-full overflow-x-hidden flex-1"
            >
              {children}
            </main>
            <SiteFooter />
            <ContactDrawer />
            <NetworkStatus />
          </div>
        </ThemeProvider>
        <SiteStructuredData />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
