import React from 'react';
import { categoryLabel } from '../config/categories';

interface CategoriesSectionProps {
  onSelectCategory: (category: string) => void;
}

const categories: { id: string; description: string }[] = [
  { id: 'Premium Hookahs', description: 'Kristal, çelik inox 304, shkarkim 360°.' },
  { id: 'Classic Hookahs', description: 'Modele klasike dhe kompakte për udhëtim.' },
  { id: 'Flavors', description: 'Double Apple, Love 66, mentol dhe përzierje speciale.' },
  { id: 'Bowls', description: 'Phunnel dhe kaminë argjile që mbajnë nxehtësinë.' },
  { id: 'Accessories', description: 'Kaloud HMD, pinca dhe pjata.' },
  { id: 'Hoses', description: 'Silikon ushqimor me doreza alumini ose karboni.' },
  { id: 'Charcoal', description: 'Kokos natyral, deri në 90 minuta djegie, pak hi.' },
];

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <span className="rule mb-6" />
          <h2 className="display text-3xl sm:text-4xl text-bone">Kategoritë</h2>
          <p className="mt-4 text-slate-400 leading-relaxed max-w-sm">
            Zgjidh një kategori për të parë produktet që kemi në dyqan.
          </p>
        </div>

        <ul className="lg:col-span-8 border-t border-bone/10">
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelectCategory(cat.id)}
                className="group w-full text-left py-5 sm:py-6 border-b border-bone/10 grid sm:grid-cols-[minmax(0,15rem)_1fr] gap-x-8 gap-y-1 items-baseline"
              >
                <span className="display text-xl sm:text-2xl text-bone group-hover:text-red-300 transition-colors">
                  {categoryLabel(cat.id)}
                </span>
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {cat.description}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
