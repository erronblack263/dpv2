import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio.sagetech.co.zw";

  const routes = [
    "",
    "/about",
    "/projects",
    "/achievements",
    "/contact",
    "/certificates",
    "/cv",
    "/projects/greenspace",
    "/projects/greenspace/demo",
    "/projects/greenspace/artifacts",
    "/projects/welfaretracker",
    "/projects/welfaretracker/demo",
    "/projects/welfaretracker/artifacts",
    "/projects/smarthr",
    "/projects/smarthr/artifacts",
    "/projects/sageOS",
    "/projects/sageOS/demo",
    "/projects/sageOS/artifacts",
    "/projects/ai-chat-assistant",
    "/projects/inventory-management",
    "/projects/inventory-management/demo",
    "/projects/portfolio-cms",
    "/projects/portfolio-cms/demo",
    "/projects/portfolio-cms/artifacts",
    "/projects/weather-dashboard/artifacts",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
