import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio.sagetech.co.zw";

  const routes = [
    "",
    "/home",
    "/projects",
    "/achievements",
    "/contact",
    "/certificates",
    "/projects/greenspace/demo",
    "/projects/greenspace/artifacts",
    "/projects/welfaretracker/demo",
    "/projects/welfaretracker/artifacts",
    "/projects/smarthr/artifacts",
    "/projects/portfolio-cms/artifacts",
    "/projects/ai-chat-assistant",
    "/projects/inventory-management/demo",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
