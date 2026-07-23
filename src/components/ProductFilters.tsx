import React from 'react';
import { CATEGORIES } from '../data/products';
import { FilterOptions } from '../types';
import { Search, RotateCcw, CheckCircle2 } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  totalResults: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  totalResults
}) => {

  const handleCategoryClick = (cat: string) => {
    onFilterChange({ ...filters, category: cat });
  };

  const handleReset = () => {
    onFilterChange({
      category: 'All',
      searchQuery: '',
      maxPrice: 500,
      onlyAvailable: false,
      sortBy: 'featured'
    });
  };

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl p-5 shadow-2xl mb-10 text-white">
      
      {/* Category Pills Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5 border-b border-amber-500/20 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer uppercase tracking-wider ${
              filters.category === cat
                ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-amber-300 border border-amber-500/20'
            }`}
          >
            {cat === 'All' ? 'Të Gjitha' : cat}
          </button>
        ))}
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-amber-400/80 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Kërko produkt me emër ose përshkrim..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase"
            >
              Fshi
            </button>
          )}
        </div>

        {/* Sort By Dropdown */}
        <div className="md:col-span-3">
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as any })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-slate-200 text-xs sm:text-sm focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="featured">I Rekomanduar</option>
            <option value="price-asc">Çmimi: Ulët ku Lartë</option>
            <option value="price-desc">Çmimi: Lartë ku Ulët</option>
            <option value="name">Sipas Emrit (A-Z)</option>
          </select>
        </div>

        {/* Availability Toggle */}
        <div className="md:col-span-2">
          <button
            onClick={() => onFilterChange({ ...filters, onlyAvailable: !filters.onlyAvailable })}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              filters.onlyAvailable
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-slate-950 border-amber-500/20 text-slate-300 hover:bg-slate-800 hover:text-amber-300'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${filters.onlyAvailable ? 'text-emerald-400' : 'text-slate-500'}`} />
            <span>Në Gjendje</span>
          </button>
        </div>

        {/* Reset Button & Count */}
        <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-3">
          <span className="text-xs text-amber-300/80 font-bold uppercase tracking-wider">
            {totalResults} {totalResults === 1 ? 'produkt' : 'produkte'}
          </span>
          
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-colors cursor-pointer"
            title="Rivendos filtrat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
