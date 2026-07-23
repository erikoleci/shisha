import React from 'react';
import { Sparkles, Wind, Box, Wrench, Layers } from 'lucide-react';
import { CategoryType } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (category: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory
}) => {

  const categories: {
    id: CategoryType;
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    badge: string;
  }[] = [
    {
      id: 'Premium Hookahs',
      title: 'Premium Hookahs',
      description: 'Shishe ekskluzive kristali, çelik inox 304 me shkarkim 360° dhe dizajn luksoz El-Badia.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      icon: <Sparkles className="w-5 h-5 text-slate-950" />,
      badge: 'Luxury Series'
    },
    {
      id: 'Classic Hookahs',
      title: 'Classic Hookahs',
      description: 'Shishe me dizajn klasik dhe modele kompakte udhëtimi ultra rezistente.',
      image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=800&auto=format&fit=crop',
      icon: <Box className="w-5 h-5 text-slate-950" />,
      badge: 'Classic Series'
    },
    {
      id: 'Flavors',
      title: 'Flavors & Aromas',
      description: 'Aroma premium frutash, Double Apple, Love 66, mentoll dhe përzierje speciale.',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop',
      icon: <Wind className="w-5 h-5 text-slate-950" />,
      badge: 'Aroma Premium'
    },
    {
      id: 'Bowls',
      title: 'Bowls & Argjilë',
      description: 'Lule argjile phunnel, kamine, pjekje e lartë që mban nxehtësinë dhe aromën.',
      image: 'https://images.unsplash.com/photo-1517263904808-5dc91e3e7044?q=80&w=800&auto=format&fit=crop',
      icon: <Layers className="w-5 h-5 text-slate-950" />,
      badge: 'HC Phunnel'
    },
    {
      id: 'Accessories',
      title: 'Accessories & HMD',
      description: 'Sisteme Kaloud HMD, pinca gold, pjata dhe pajisje elitare.',
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop',
      icon: <Wrench className="w-5 h-5 text-slate-950" />,
      badge: 'Kaloud Original'
    },
    {
      id: 'Hoses',
      title: 'Hoses & Handles',
      description: 'Zorrë silikoni ushqimor me doreza alumini, karboni dhe soft-touch.',
      image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=800&auto=format&fit=crop',
      icon: <Wind className="w-5 h-5 text-slate-950" />,
      badge: 'Soft-Touch'
    },
    {
      id: 'Charcoal',
      title: 'Coconut Charcoal',
      description: 'Qymyr natyral kokosi cilësor me djegie deri në 90 minuta pa erë e hi minimal.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
      icon: <Sparkles className="w-5 h-5 text-slate-950" />,
      badge: '100% Natyral'
    }
  ];

  return (
    <section id="categories" className="py-20 bg-slate-950 text-white border-y border-amber-500/20 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-amber-500/30 shadow-md mb-4 backdrop-blur-md">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">Kategoritë VIP</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight mb-4">
            Eksploro Koleksionet Tona Lux
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Klikoni mbi kategorinë për të shfletuar produktet dhe porositur me 1 klik në WhatsApp.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-80 rounded-2xl overflow-hidden bg-slate-900 border border-amber-500/20 hover:border-amber-500/70 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 cursor-pointer flex flex-col justify-end p-6"
            >
              {/* Image background */}
              <img
                src={cat.image}
                alt={cat.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-50 group-hover:opacity-75"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-slate-950/90 text-amber-300 border border-amber-500/40 backdrop-blur-md shadow-lg">
                  {cat.badge}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 text-white">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-3 shadow-lg shadow-amber-500/20 text-slate-950">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-black font-serif text-white group-hover:text-amber-300 transition-colors mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-300 font-light line-clamp-2 leading-relaxed mb-4">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>Shiko Produktet</span>
                  <span>→</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
