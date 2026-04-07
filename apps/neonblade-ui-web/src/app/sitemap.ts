import type { MetadataRoute } from "next";
import { categories } from "@/lib/docs/data";

const BASE_URL = "https://neonbladeui.neuronrush.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/components`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamically generate entries for every components/[category]/[slug] route
  const componentRoutes: MetadataRoute.Sitemap = categories.flatMap((category) =>
    category.components.map((component) => ({
      url: `${BASE_URL}/components/${category.slug}/${component.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...componentRoutes];
}
