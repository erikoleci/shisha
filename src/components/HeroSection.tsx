import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp';
import mraLogo from '../assets/mra-logo.jpeg';

interface HeroSectionProps {
  onShopClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onShopClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center px-4 py-16 sm:py-20"
    >
      <div className="w-full max-w-3xl flex flex-col items-center text-center">
        {/* The emblem, rising out of the damask backdrop */}
        <img
          src={mraLogo}
          alt="Emblema e MRA Shisha: shqiponja dykrenare dhe luftëtari"
          className="emblem-in w-[min(78vw,420px)] aspect-square object-cover"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 52%, transparent 71%)',
            maskImage: 'radial-gradient(circle at 50% 50%, #000 52%, transparent 71%)',
          }}
        />

        <h1
          className="display rise-in mt-2 text-[2.6rem] sm:text-6xl md:text-7xl text-bone"
          style={{ animationDelay: '0.5s', letterSpacing: '0.08em' }}
        >
          MRA Shisha
        </h1>

        <p
          className="rise-in mt-5 max-w-md text-base sm:text-lg text-slate-300 font-light leading-relaxed"
          style={{ animationDelay: '0.7s' }}
        >
          Shisha, aroma dhe aksesorë të zgjedhur me kujdes. Porosit në WhatsApp, dërgesë në gjithë Shqipërinë.
        </p>

        <div
          className="rise-in mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          style={{ animationDelay: '0.9s' }}
        >
          <button onClick={onShopClick} id="hero-shop-products-btn" className="btn btn-primary">
            Shiko katalogun
          </button>
          <a
            href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj të pyes për produktet në MRA Shisha.')}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-order-btn"
            className="btn btn-ghost"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>{WHATSAPP_CONFIG.displayNumber}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
