import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management Demo",
  description:
    "See the Sage Inventory Management system demo for product workflows, stock management, and data operations in action.",
  alternates: {
    canonical: "/projects/inventory-management/demo",
  },
  openGraph: {
    title: "Inventory Management Demo",
    description:
      "Watch the Sage Inventory Management demo showcasing product, stock, and workflow operations in a desktop system.",
    url: "https://portfolio.sagetech.co.zw/projects/inventory-management/demo",
    siteName: "Witness H Musonza Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inventory Management Demo",
    description:
      "Watch the Sage Inventory Management demo showcasing product, stock, and workflow operations in a desktop system.",
  },
};

export default function InventoryManagementDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
