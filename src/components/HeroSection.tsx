import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles, ShieldCheck, Award } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../config/whatsapp';
import { SmokeBackground } from './SmokeBackground';

interface HeroSectionProps {
  onShopClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick }) => {
  return (
    <section id="home" className="relative z-10 min-h-[92vh] flex items-center justify-center pt-32 pb-20 text-white overflow-hidden">
      
      {/* High Definition Ambient Smoke & Video Background */}
      <SmokeBackground />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* VIP Premium Boutique Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/90 border border-red-500/40 shadow-xl shadow-red-500/10 mb-8 backdrop-blur-xl animate-fadeIn">
          <Award className="w-4 h-4 text-red-400" />
          <span className="text-xs font-black tracking-[0.25em] text-red-300 uppercase">
            MRA SHISHA ALBANIA
          </span>
        </div>

        {/* Main Title - Dark Luxury Typography */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight font-serif text-white max-w-5xl leading-[1.02] mb-6 drop-shadow-2xl">
          LUXURY <br />
          <span className="bg-gradient-to-r from-red-200 via-red-400 to-red-600 bg-clip-text text-transparent italic font-serif">
            HOOKAH EXPERIENCE
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl font-light leading-relaxed mb-12 text-balance">
          Shishe, aroma dhe aksesorë premium — zgjedhur për ekspertë.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-16">
          <button
            onClick={onShopClick}
            id="hero-shop-products-btn"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:from-red-300 hover:to-red-500 text-slate-950 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-500/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-red-300/50"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span>Shfeto Katalogun</span>
          </button>

          <a
            href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj të pyes për produktet në MRA Shisha.')}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-order-btn"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-emerald-400/40 backdrop-blur-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>WhatsApp: 0674933622</span>
          </a>
        </div>

      </div>
    </section>
  );
};
