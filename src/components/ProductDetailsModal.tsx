import React, { useState } from 'react';
import { Product } from '../types';
import { X, MessageCircle, CheckCircle2, ShieldCheck, Truck, Copy, Check } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectRelated?: (product: Product) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  const images = product.gallery && product.gallery.length > 0 
    ? [product.image, ...product.gallery.filter(img => img !== product.image)]
    : [product.image];

  const totalPrice = product.price * quantity;

  // Formatted Albanian message
  const generateFormattedMessage = () => {
    return `Përshëndetje Shisha Store,
Jam i interesuar të porosis këtë produkt:

Produkti: ${product.name}${quantity > 1 ? ` (Sasia: ${quantity})` : ''}
Kategoria: ${product.category}
Çmimi i Përgjithshëm: ${totalPrice}€

Ju lutem më konfirmoni disponueshmërinë dhe mënyrën e dërgesës!`;
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(generateFormattedMessage())}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generateFormattedMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-amber-500/30 transition-all shadow-lg"
          id="close-product-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Gallery */}
          <div className="p-6 bg-slate-950 flex flex-col justify-between border-b md:border-b-0 md:border-r border-amber-500/20">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-900 border border-amber-500/30 mb-4 shadow-xl">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop";
                }}
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 shadow-md border border-amber-300">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img ? 'border-amber-400 scale-105 shadow-md' : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Guarantees */}
            <div className="mt-4 pt-4 border-t border-amber-500/10 grid grid-cols-2 gap-2 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Origjinale VIP</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Postë 24h ne Shqipëri</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Order Form */}
          <div className="p-6 md:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto bg-slate-900">
            
            <div>
              {/* Category & Availability */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                  {product.category}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Në Gjendje</span>
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-black text-white font-serif tracking-tight mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4 pb-3 border-b border-amber-500/20">
                <span className="text-3xl font-black text-amber-400 font-serif">
                  {totalPrice}
                  <span className="text-amber-300 text-sm ml-1.5 font-sans">ALL</span>
                </span>
                {quantity > 1 && (
                  <span className="text-xs text-slate-400 font-light">
                    ({product.price} ALL / copë)
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase text-amber-300/80 tracking-widest mb-1">Përshkrimi</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="mb-4 bg-slate-950 p-3.5 rounded-xl border border-amber-500/20">
                  <h4 className="text-xs font-bold uppercase text-amber-400 tracking-wider mb-2">Specifikat Teknike</h4>
                  <div className="space-y-1.5 text-xs">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-slate-800 pb-1 last:border-0 last:pb-0">
                        <span className="text-slate-400 font-light">{key}:</span>
                        <span className="text-white font-bold text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-4 flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-amber-500/20">
                <span className="text-xs font-bold text-amber-300 uppercase">Sasia:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-amber-500/30 text-white font-bold text-base flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors shadow-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="text-sm font-black text-amber-400 w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-amber-500/30 text-white font-bold text-base flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-colors shadow-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Automated WhatsApp Message Preview */}
              <div className="mb-4 bg-slate-950 p-3 rounded-xl border border-amber-500/20 text-left">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase text-amber-300 tracking-wider">
                    Teksti i Porosisë në WhatsApp
                  </span>
                  <button
                    onClick={handleCopyMessage}
                    className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Kopjuar' : 'Kopjo Text'}</span>
                  </button>
                </div>
                <p className="text-xs text-slate-300 font-mono whitespace-pre-line leading-snug bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  {generateFormattedMessage()}
                </p>
              </div>

            </div>

            {/* Direct WhatsApp Order CTA */}
            <div className="pt-3 border-t border-amber-500/10">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                id="modal-whatsapp-submit-btn"
                className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 hover:scale-[1.01] active:scale-[0.99] transition-all border border-emerald-400/30"
              >
                <MessageCircle className="w-5 h-5 text-emerald-200" />
                <span>Porosit Tani në WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-400 text-center mt-2.5 font-light">
                Porosi direkte në numrin: <span className="font-bold text-amber-400 font-mono">0696234684</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
