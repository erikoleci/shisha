import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles, ShieldCheck, Truck, Clock, CheckCircle2, Flame, Award } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../config/whatsapp';
import { SmokeBackground } from './SmokeBackground';

interface HeroSectionProps {
  onShopClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 bg-slate-950 text-white overflow-hidden">
      
      {/* High Definition Ambient Smoke & Video Background */}
      <SmokeBackground />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* VIP Premium Boutique Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/90 border border-amber-500/40 shadow-xl shadow-amber-500/10 mb-8 backdrop-blur-xl animate-fadeIn">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black tracking-[0.25em] text-amber-300 uppercase">
            BOUTIQUE ZYRTARE EL-BADIA ALBANIA
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Main Title - Dark Luxury Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-serif text-white max-w-5xl leading-[1.08] mb-6 drop-shadow-2xl">
          SHISHE & AROMA VIP <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent italic font-serif">
            LUKSOZE NË SHQIPËRI
          </span>
        </h1>

        {/* Subtitle / Description */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-3xl font-light leading-relaxed mb-10 text-balance">
          Zbuloni ekskluzivitetin e shishave El-Badia, aromave premium të importuara, qymyrit natyral prej kokosi dhe aksesorëve më të mirë VIP për përvojën tuaj të përsosur.
        </p>

        {/* Quick Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 text-xs font-bold uppercase tracking-wider text-amber-200">
          <div className="flex items-center gap-2 bg-slate-900/80 border border-amber-500/30 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>100% Produkte Origjinale</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-amber-500/30 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg">
            <Truck className="w-4 h-4 text-amber-400" />
            <span>Postë Express 24H ne Shqipëri & Kosovë</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 border border-amber-500/30 px-4 py-2 rounded-xl backdrop-blur-md shadow-lg">
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Porosi me 1 Klik ne WhatsApp</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-16">
          <button
            onClick={onShopClick}
            id="hero-shop-products-btn"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-amber-300/50"
          >
            <ShoppingBag className="w-4 h-4 text-slate-950" />
            <span>Shfeto Katalogun VIP</span>
          </button>

          <a
            href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj të pyes për produktet në Shisha Store.')}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-order-btn"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-[0.15em] shadow-xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 border border-emerald-400/40 backdrop-blur-md"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Porosit në WhatsApp: 0696234684</span>
          </a>
        </div>

        {/* Trust Badges - Glassmorphic Dark Luxury */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-5xl border-t border-amber-500/20 pt-10 text-left">
          
          <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-amber-500/20 shadow-2xl hover:border-amber-500/50 transition-colors">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-black text-amber-300 uppercase tracking-widest">Cilësi e Garantuar</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Produkte origjinale me garanci te plote</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-amber-500/20 shadow-2xl hover:border-amber-500/50 transition-colors">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-black text-amber-300 uppercase tracking-widest">Shërbim i Shpejtë</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Dërgim me postë në 24-48 orë</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-amber-500/20 shadow-2xl hover:border-amber-500/50 transition-colors">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs font-black text-amber-300 uppercase tracking-widest">Asistencë 24/7</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Përgjigjemi menjëherë në WhatsApp</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
