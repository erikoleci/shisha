import React, { useState, useEffect } from 'react';
import { MessageCircle, Instagram, Menu, X } from 'lucide-react';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../config/whatsapp';
import mraLogo from '../assets/mra-logo.jpeg';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  isSupabaseConnected?: boolean;
}

const navItems = [
  { id: 'products', label: 'Katalogu' },
  { id: 'categories', label: 'Kategoritë' },
  { id: 'about', label: 'Rreth nesh' },
  { id: 'contact', label: 'Kontakt' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-ink/95 backdrop-blur-md border-b border-bone/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left"
          id="brand-logo-btn"
          aria-label="MRA Shisha, kthehu në fillim"
        >
          <img src={mraLogo} alt="" className="h-9 w-9 object-cover rounded-full ring-1 ring-bone/20" />
          <span className="display text-lg sm:text-xl text-bone" style={{ letterSpacing: '0.12em' }}>
            MRA Shisha
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-8" aria-label="Navigimi kryesor">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              id={`nav-link-${item.id}`}
              className={`relative py-1 text-[0.95rem] transition-colors ${
                activeSection === item.id ? 'text-bone' : 'text-slate-400 hover:text-bone'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-crimson" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={WHATSAPP_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-bone transition-colors"
            aria-label={`Instagram ${WHATSAPP_CONFIG.instagramHandle}`}
            id="navbar-instagram-link"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj të bëj një porosi nga MRA Shisha.')}
            target="_blank"
            rel="noopener noreferrer"
            id="navbar-order-now-btn"
            className="btn btn-ghost !py-2 !px-4 !text-sm"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Porosit</span>
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 -mr-2 text-bone"
          aria-label={mobileMenuOpen ? 'Mbyll menunë' : 'Hap menunë'}
          aria-expanded={mobileMenuOpen}
          id="mobile-menu-toggle-btn"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-bone/10 px-4 pb-6">
          <nav className="flex flex-col" aria-label="Navigimi në telefon">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="display text-left text-xl py-4 border-b border-bone/10 text-bone"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3">
            <a
              href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj të porosis nga MRA Shisha.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Porosit në WhatsApp</span>
            </a>
            <a
              href={WHATSAPP_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <Instagram className="w-4 h-4" aria-hidden="true" />
              <span>{WHATSAPP_CONFIG.instagramHandle}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
