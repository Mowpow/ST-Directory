import { supabase } from './supabase';

export interface Dealer {
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

interface SupabaseDealer {
  id: string;
  name: string;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  sales: string | null;
  parts: string | null;
  service: string | null;
  rental: string | null;
}

function transformDealer(dbDealer: SupabaseDealer): Dealer {
  const services: string[] = [];
  
  if (dbDealer.sales === 'Yes') services.push('Sales');
  if (dbDealer.parts === 'Yes') services.push('Parts');
  if (dbDealer.service === 'Yes') services.push('Service');
  if (dbDealer.rental === 'Yes') services.push('Rental');

  return {
    id: dbDealer.id,
    name: dbDealer.name,
    address: {
      street: dbDealer.street_address || '',
      city: dbDealer.city || '',
      state: (dbDealer.state || '').toUpperCase(),
      zip: dbDealer.zip_code || '',
    },
    phone: dbDealer.phone || '',
    email: dbDealer.email || undefined,
    website: dbDealer.website || undefined,
    services: services.length > 0 ? services : undefined,
  };
}

export async function getDealers(): Promise<Dealer[]> {
  try {
    const { data, error } = await supabase
      .from('dealers')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching dealers:', error);
      return [];
    }

    if (!data) {
      return [];
    }

    return data.map(transformDealer);
  } catch (error) {
    console.error('Error fetching dealers:', error);
    return [];
  }
}
