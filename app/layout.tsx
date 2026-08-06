import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ContactDrawer } from "@/components/contact-drawer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
export const metadata: Metadata = {
  title: "Witness H Musonza — Software Developer",
  description:
    "Portfolio of Witness Musonza, a fullstack software developer crafting seamless user experiences.",
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
      className={`${inter.variable} bg-background overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
