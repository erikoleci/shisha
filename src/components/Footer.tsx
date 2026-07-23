import React from 'react';
import { Flame, Instagram, MessageCircle, Mail, MapPin } from 'lucide-react';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../config/whatsapp';
import { CATEGORIES } from '../types';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 text-sm relative overflow-hidden border-t border-amber-500/30">
      
      {/* Top Accent Line */}
      <div className="h-0.5 bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
                <Flame className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-serif uppercase">
                Shisha<span className="text-amber-400">Store</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 font-light leading-relaxed max-w-sm">
              Dyqani specialist online në Shqipëri me stil El-Badia për shitjen e shishave origjinale, aromave premium, luleve të argjilës dhe aksesorëve me dërgesë në të gjithë Shqipërinë.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={WHATSAPP_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 hover:bg-slate-800 hover:border-amber-400 flex items-center justify-center transition-all shadow-md"
                title="Instagram Official"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href={getGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-400 hover:bg-slate-800 hover:border-emerald-400 flex items-center justify-center transition-all shadow-md"
                title="WhatsApp Direct"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-amber-300 font-black uppercase text-xs tracking-widest mb-4 border-b border-amber-500/20 pb-2">
              Navigimi
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {[
                { id: 'home', name: 'Kreu' },
                { id: 'products', name: 'Katalogu VIP' },
                { id: 'categories', name: 'Kategoritë' },
                { id: 'about', name: 'Rreth Nesh' },
                { id: 'contact', name: 'Kontakt' },
                { id: 'admin', name: 'Admin Dashboard' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-amber-300 font-black uppercase text-xs tracking-widest mb-4 border-b border-amber-500/20 pb-2">
              Kategoritë
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => onNavigate('products')}
                    className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-amber-300 font-black uppercase text-xs tracking-widest mb-4 border-b border-amber-500/20 pb-2">
              Kontakt Direkt
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono text-white font-bold">{WHATSAPP_CONFIG.displayNumber}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">{WHATSAPP_CONFIG.instagramHandle}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-300">{WHATSAPP_CONFIG.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-slate-300">{WHATSAPP_CONFIG.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-light">
          <p>© {new Date().getFullYear()} Shisha Store Albania. Të gjitha të drejtat e rezervuara.</p>
        </div>

      </div>
    </footer>
  );
};
