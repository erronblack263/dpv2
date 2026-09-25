import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        disallow: ["/landing.png", "/landing-light.png"],
      },
    ],
    sitemap: "https://portfolio.sagetech.co.zw/sitemap.xml",
    host: "https://portfolio.sagetech.co.zw",
  };
}
