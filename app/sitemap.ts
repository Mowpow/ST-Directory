import { MetadataRoute } from "next";
import dealersData from "@/data/dealers.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourdomain.com"; // Update with your actual domain
  
  const dealerPages = dealersData.dealers.map((dealer) => ({
    url: `${baseUrl}/dealers/${dealer.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...dealerPages,
  ];
}
