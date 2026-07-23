export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
  created_at?: string;
  
  // Optional display helpers
  badge?: string;
  featured?: boolean;
  specs?: Record<string, string>;
  gallery?: string[];
  gallery_images?: string[];
}

export type CategoryType = 
  | 'All'
  | 'Premium Hookahs'
  | 'Classic Hookahs'
  | 'Accessories'
  | 'Bowls'
  | 'Hoses'
  | 'Charcoal'
  | 'Flavors';

export const CATEGORIES: CategoryType[] = [
  'All',
  'Premium Hookahs',
  'Classic Hookahs',
  'Accessories',
  'Bowls',
  'Hoses',
  'Charcoal',
  'Flavors'
];

export interface FilterOptions {
  category: string;
  searchQuery: string;
  maxPrice: number;
  onlyAvailable: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'name';
}
