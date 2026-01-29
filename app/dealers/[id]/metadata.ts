import { Metadata } from "next";
import dealersData from "@/data/dealers.json";
import { getFullAddress } from "@/lib/utils";

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

interface MetadataProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { id } = await params;
  const dealers = dealersData.dealers as Dealer[];
  const dealer = dealers.find((d) => d.id === id);

  if (!dealer) {
    return {
      title: "Dealership Not Found",
    };
  }

  const fullAddress = getFullAddress(dealer.address);
  const servicesText = dealer.services && dealer.services.length > 0 
    ? `Services: ${dealer.services.join(", ")}. ` 
    : "";

  return {
    title: `${dealer.name} | Semi Trailer Dealership Directory`,
    description: `Find ${dealer.name} at ${fullAddress}. Contact: ${dealer.phone}. ${servicesText}Browse our nationwide directory of semi-trailer dealerships.`,
  };
}
