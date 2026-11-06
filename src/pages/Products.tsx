import React, { useState, useMemo, useEffect } from 'react';
import { Product, FilterOptions } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';

interface ProductsPageProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  selectedCategory?: string;
}

const DEFAULT_FILTERS: FilterOptions = {
  category: 'All',
  searchQuery: '',
  maxPrice: 500,
  onlyAvailable: false,
  sortBy: 'featured',
};

export const ProductsPage: React.FC<ProductsPageProps> = ({ products, onSelectProduct, selectedCategory }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    ...DEFAULT_FILTERS,
    category: selectedCategory || 'All',
  });

  // Follow category picks made in the Categories section
  useEffect(() => {
    if (selectedCategory) setFilters((f) => ({ ...f, category: selectedCategory }));
  }, [selectedCategory]);

  // Only offer categories that actually have products, plus the one currently picked
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    if (filters.category !== 'All') set.add(filters.category);
    return ['All', ...Array.from(set)];
  }, [products, filters.category]);

  const filteredProducts = useMemo(() => {
    const query = filters.searchQuery.trim().toLowerCase();
    return products
      .filter((p) => {
        if (filters.category !== 'All' && p.category !== filters.category) return false;
        if (query) {
          const hay = `${p.name} ${p.description} ${p.category}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        if (filters.onlyAvailable && !p.available) return false;
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
    <section id="products" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ink/70 border-y border-bone/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <span className="rule mb-6" />
          <h2 className="display text-3xl sm:text-4xl text-bone">Katalogu</h2>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Shtyp “Porosit” te produkti dhe mesazhi me emrin dhe çmimin hapet gati në WhatsApp.
          </p>
        </div>

        <ProductFilters
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
          totalResults={filteredProducts.length}
        />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        ) : (
          <div className="py-16 border-t border-bone/10 max-w-lg">
            <h3 className="display text-xl text-bone">Asnjë produkt këtu</h3>
            <p className="mt-3 text-slate-400 leading-relaxed">
              Nuk ka produkte për këtë zgjedhje. Pastro filtrat ose na shkruaj në WhatsApp, mund ta sjellim me porosi.
            </p>
            <button onClick={() => setFilters(DEFAULT_FILTERS)} className="btn btn-ghost mt-6">
              Pastro filtrat
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
