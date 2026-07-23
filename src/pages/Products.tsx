import React, { useState, useMemo } from 'react';
import { Product, FilterOptions } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { Sparkles, PackageX } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  selectedCategory?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  onSelectProduct,
  selectedCategory
}) => {
  const [filters, setFilters] = useState<FilterOptions>({
    category: selectedCategory || 'All',
    searchQuery: '',
    maxPrice: 500,
    onlyAvailable: false,
    sortBy: 'featured'
  });

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (filters.category !== 'All' && p.category !== filters.category) {
          return false;
        }
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const nameMatch = p.name.toLowerCase().includes(query);
          const descMatch = p.description.toLowerCase().includes(query);
          const catMatch = p.category.toLowerCase().includes(query);
          if (!nameMatch && !descMatch && !catMatch) return false;
        }
        if (filters.onlyAvailable && !p.available) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [products, filters]);

  return (
    <section id="products" className="py-20 bg-slate-950 text-white relative border-t border-amber-500/20">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 shadow-md mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
              KATALOGU EL-BADIA VIP
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight mb-4">
            Koleksioni ynë i Shishave & Aksesorëve
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            Zgjidhni produktin tuaj të preferuar dhe klikoni "Porosit" për të dërguar porosinë automatikisht në WhatsApp.
          </p>
        </div>

        {/* Filter Controls Component */}
        <ProductFilters
          filters={filters}
          onFilterChange={setFilters}
          totalResults={filteredProducts.length}
        />

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/90 rounded-2xl border border-amber-500/30 p-8 max-w-lg mx-auto shadow-2xl">
            <PackageX className="w-12 h-12 text-amber-500/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white font-serif mb-2">
              Nuk u gjet asnjë produkt!
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-light leading-relaxed">
              Nuk u gjetën produkte për filtrat e zgjedhur. Provoni të ndryshoni kategorinë ose fshini kërkimin.
            </p>
            <button
              onClick={() => setFilters({
                category: 'All',
                searchQuery: '',
                maxPrice: 500,
                onlyAvailable: false,
                sortBy: 'featured'
              })}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Rivendos Filtrat
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
