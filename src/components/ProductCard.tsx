import React from 'react';
import { Product } from '../types';
import { MessageCircle, Eye, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { getProductWhatsAppUrl } from '../config/whatsapp';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct
}) => {
  const whatsAppUrl = getProductWhatsAppUrl(product);

  return (
    <div
      className="group relative bg-slate-900 rounded-2xl border border-amber-500/20 hover:border-amber-500/70 transition-all duration-300 shadow-xl shadow-slate-950/40 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between overflow-hidden text-white"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div 
        className="relative aspect-square w-full bg-slate-950 overflow-hidden cursor-pointer" 
        onClick={() => onSelectProduct(product)}
      >
        <img
          src={product.image_url}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";
          }}
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          {product.badge ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-md flex items-center gap-1 border border-amber-300">
              <Sparkles className="w-3 h-3 fill-slate-950/30" />
              {product.badge}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-950/80 border border-amber-500/30 text-amber-300 backdrop-blur-md shadow-md uppercase tracking-wider">
              {product.category}
            </span>
          )}

          {/* Availability Badge */}
          {product.available ? (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 backdrop-blur-md flex items-center gap-1 shadow-md">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Në Gjendje</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-rose-950/80 border border-rose-500/40 text-rose-300 backdrop-blur-md flex items-center gap-1 shadow-md">
              <XCircle className="w-3 h-3 text-rose-400" />
              <span>Mungon</span>
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            id={`quick-view-btn-${product.id}`}
            className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl border border-amber-200"
          >
            <Eye className="w-3.5 h-3.5 text-slate-950" />
            <span>Shiko Detajet</span>
          </button>
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow justify-between gap-3 bg-gradient-to-b from-slate-900 to-slate-950">
        <div>
          <span className="text-[10px] font-bold text-amber-400/90 uppercase tracking-[0.15em] block mb-1">
            {product.category}
          </span>
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer font-serif tracking-wide"
          >
            {product.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed font-light">
            {product.description}
          </p>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between gap-3 mt-auto">
          <div>
            <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider">Çmimi VIP</span>
            <span className="text-lg font-black text-amber-400 font-serif">
              {product.price} <span className="text-xs font-sans text-amber-300 font-semibold">ALL</span>
            </span>
          </div>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`order-whatsapp-btn-${product.id}`}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-950/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-emerald-400/30"
            title="Porosit direkte në WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
            <span>Porosit</span>
          </a>
        </div>
      </div>
    </div>
  );
};
