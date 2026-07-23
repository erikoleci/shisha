import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Menu, X, Database, ShieldCheck, Sparkles } from 'lucide-react';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../config/whatsapp';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  isSupabaseConnected?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenAdmin,
  isSupabaseConnected = true
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Kreu' },
    { id: 'products', label: 'Katalogu VIP' },
    { id: 'categories', label: 'Kategoritë' },
    { id: 'about', label: 'Rreth Nesh' },
    { id: 'contact', label: 'Kontakt' },
    { id: 'admin', label: 'Admin' }
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 shadow-2xl shadow-slate-950/50 py-3 text-white'
          : 'bg-slate-950/70 backdrop-blur-md border-b border-white/10 py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Typographic Logo ONLY - Flame Icon Removed as requested */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col group text-left focus:outline-none py-1"
            id="brand-logo-btn"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-[0.2em] font-serif uppercase text-white group-hover:text-amber-400 transition-colors">
                SHISHA<span className="text-amber-500">STORE</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 tracking-wider uppercase">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                EL-BADIA VIP
              </span>
            </div>
            <span className="block text-[9px] tracking-[0.3em] text-slate-400 uppercase font-semibold -mt-0.5">
              BOUTIQUE & HOOKAH LOUNGE ALBANIA
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-amber-500/20 shadow-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                id={`nav-link-${item.id}`}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 tracking-wide uppercase ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-amber-400 hover:bg-slate-800/80'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & WhatsApp Order Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('admin')}
              className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-400 hover:text-amber-300 transition-all duration-200 shadow-sm"
              title="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            <a
              href={WHATSAPP_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-amber-500/30 text-amber-400 hover:text-amber-300 transition-all duration-200 shadow-sm"
              title="Instagram Official"
              id="navbar-instagram-link"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* Order Now WhatsApp CTA */}
            <a
              href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj të bëj një porosi nga Shisha Store.')}
              target="_blank"
              rel="noopener noreferrer"
              id="navbar-order-now-btn"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-950/50 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 border border-emerald-400/30"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Porosit në WhatsApp</span>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj të porosis shisha.')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 px-3 shadow-md"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="text-[11px] font-extrabold uppercase">WhatsApp</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 focus:outline-none"
              aria-label="Toggle Navigation"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-amber-500/20 space-y-2 bg-slate-950/95 rounded-2xl p-4 border shadow-2xl animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeSection === item.id
                    ? 'bg-amber-500 text-slate-950 font-black'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-amber-400'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <a
                href={WHATSAPP_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 flex items-center gap-1.5 font-bold"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram: {WHATSAPP_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
