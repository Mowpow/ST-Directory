import DealerCard from "./DealerCard";

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

interface DealerListProps {
  dealers: Dealer[];
}

export default function DealerList({ dealers }: DealerListProps) {
  if (dealers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No dealerships found matching your criteria.</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dealers.map((dealer) => (
        <DealerCard key={dealer.id} dealer={dealer} />
      ))}
    </div>
  );
}
