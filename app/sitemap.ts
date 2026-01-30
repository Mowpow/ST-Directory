import { MetadataRoute } from "next";
import dealersData from "@/data/dealers.json";

interface Dealer {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phone: string;
  email?: string;
  website?: string;
  services?: string[];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yourdomain.com"; // Update with your actual domain
  
  const dealers = dealersData.dealers as Dealer[];
  const dealerPages = dealers.map((dealer) => ({
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
