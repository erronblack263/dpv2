"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

// Paths where nav + footer should be hidden (full-screen splash pages)
const HIDDEN_ON = ["/"];

export function NavWrapper() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <SiteNav />;
}

export function FooterWrapper() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;
  return <SiteFooter />;
}
