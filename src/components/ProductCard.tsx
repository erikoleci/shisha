import React from 'react';
import { Product } from '../types';
import { MessageCircle } from 'lucide-react';
import { getProductWhatsAppUrl } from '../config/whatsapp';
import { categoryLabel } from '../config/categories';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop';

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const whatsAppUrl = getProductWhatsAppUrl(product);
  const price = new Intl.NumberFormat('sq-AL').format(product.price);

  return (
    <article className="group flex flex-col bg-slate-900/80 border border-bone/10" id={`product-card-${product.id}`}>
      <button
        onClick={() => onSelectProduct(product)}
        className="relative block aspect-[4/5] w-full overflow-hidden bg-ink"
        aria-label={`Shiko detajet për ${product.name}`}
        id={`quick-view-btn-${product.id}`}
      >
        <img
          src={product.image_url}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03] ${
            product.available ? '' : 'grayscale opacity-60'
          }`}
          onError={(e) => {
            (e.target as HTMLImageElement).src = FALLBACK_IMG;
          }}
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-crimson text-bone text-xs px-2.5 py-1">{product.badge}</span>
        )}
        {!product.available && (
          <span className="absolute top-3 right-3 bg-ink/90 text-slate-300 text-xs px-2.5 py-1 border border-bone/15">
            Mungon
          </span>
        )}
      </button>

      <div className="flex flex-col flex-grow p-5">
        <span className="text-sm text-slate-400">{categoryLabel(product.category)}</span>
        <h3 className="mt-1 text-lg font-medium text-bone leading-snug line-clamp-2">
          <button onClick={() => onSelectProduct(product)} className="text-left hover:text-red-200 transition-colors">
            {product.name}
          </button>
        </h3>

        <div className="mt-auto pt-5 flex items-end justify-between gap-3">
          <span className="display text-xl text-bone" style={{ letterSpacing: '0.02em' }}>
            {price} <span className="font-sans text-sm text-slate-400 font-normal">Lekë</span>
          </span>
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`order-whatsapp-btn-${product.id}`}
            className="btn btn-ghost !py-2 !px-3.5 !text-sm"
            aria-label={`Porosit ${product.name} në WhatsApp`}
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Porosit</span>
          </a>
        </div>
      </div>
    </article>
  );
};
