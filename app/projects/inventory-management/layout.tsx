import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sage Inventory Management",
  description:
    "Sage Inventory Management is a desktop system for inventory tracking, CRUD operations, and operational visibility for business workflows.",
  alternates: {
    canonical: "/projects/inventory-management",
  },
  openGraph: {
    title: "Sage Inventory Management",
    description:
      "A desktop inventory management system for tracking stock, operations, and business workflow visibility.",
    url: "https://portfolio.sagetech.co.zw/projects/inventory-management",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sage Inventory Management",
    description:
      "A desktop inventory management system for tracking stock, operations, and business workflow visibility.",
  },
};

export default function InventoryManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
