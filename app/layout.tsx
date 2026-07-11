import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { AmbientBackground } from "@/components/ambient-background";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Witness — Software Developer",
  description:
    "Portfolio of Witness, a fullstack software developer crafting seamless user experiences.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen text-foreground">
            <AmbientBackground />
            <SiteNav />
            <main style={{ position: "relative", zIndex: 1 }}>{children}</main>
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
