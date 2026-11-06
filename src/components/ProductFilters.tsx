import React from 'react';
import { FilterOptions } from '../types';
import { Search, X } from 'lucide-react';
import { categoryLabel } from '../config/categories';

interface ProductFiltersProps {
  categories: string[];
  filters: FilterOptions;
  onFilterChange: (newFilters: FilterOptions) => void;
  totalResults: number;
}

const fieldClass =
  'w-full bg-ink border border-bone/15 text-bone placeholder-slate-500 text-[0.95rem] px-3.5 py-2.5 rounded-[2px] focus:outline-none focus:border-bone/50';

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
  totalResults,
}) => {
  return (
    <div className="mb-10">
      {/* Category tabs */}
      <div
        className="flex gap-6 overflow-x-auto scrollbar-none border-b border-bone/10 -mx-4 px-4 sm:mx-0 sm:px-0"
        role="tablist"
        aria-label="Kategoritë"
      >
        {categories.map((cat) => {
          const active = filters.category === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={active}
              onClick={() => onFilterChange({ ...filters, category: cat })}
              id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className={`relative whitespace-nowrap py-3 text-[0.95rem] transition-colors ${
                active ? 'text-bone' : 'text-slate-400 hover:text-bone'
              }`}
            >
              {categoryLabel(cat)}
              {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-crimson" />}
            </button>
          );
        })}
      </div>

      {/* Search, sort, availability */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_14rem_auto] gap-3 items-center">
        <label className="relative block">
          <span className="sr-only">Kërko produkt</span>
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="search"
            placeholder="Kërko produkt"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className={`${fieldClass} !pl-10 !pr-10`}
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-bone"
              aria-label="Pastro kërkimin"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </label>

        <label className="block">
          <span className="sr-only">Rendit sipas</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })}
            className={`${fieldClass} cursor-pointer`}
          >
            <option value="featured">Të rekomanduara</option>
            <option value="price-asc">Çmimi: nga më i ulëti</option>
            <option value="price-desc">Çmimi: nga më i larti</option>
            <option value="name">Emri (A–Z)</option>
          </select>
        </label>

        <div className="flex items-center justify-between md:justify-end gap-5">
          <label className="flex items-center gap-2 text-[0.95rem] text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.onlyAvailable}
              onChange={() => onFilterChange({ ...filters, onlyAvailable: !filters.onlyAvailable })}
              className="w-4 h-4 accent-[#b0243a]"
            />
            Vetëm në gjendje
          </label>
          <span className="text-sm text-slate-500 whitespace-nowrap" aria-live="polite">
            {totalResults} {totalResults === 1 ? 'produkt' : 'produkte'}
          </span>
        </div>
      </div>
    </div>
  );
};
