import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://teknisini.com";

  return [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
