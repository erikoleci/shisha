import React from 'react';
import { WHATSAPP_CONFIG } from '../config/whatsapp';
import mraLogo from '../assets/mra-logo.jpeg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdminModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminModal }) => {
  const links = [
    { id: 'products', name: 'Katalogu' },
    { id: 'categories', name: 'Kategoritë' },
    { id: 'about', name: 'Rreth nesh' },
    { id: 'contact', name: 'Kontakt' },
  ];

  return (
    <footer className="border-t border-bone/10 bg-ink px-4 sm:px-6 lg:px-8 pt-14 pb-28 md:pb-14">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start justify-between gap-10">
        <div className="flex items-center gap-4">
          <img src={mraLogo} alt="" className="h-14 w-14 object-cover rounded-full ring-1 ring-bone/20" />
          <div>
            <span className="display text-xl text-bone" style={{ letterSpacing: '0.12em' }}>
              MRA Shisha
            </span>
            <p className="text-sm text-slate-400 mt-1">Tiranë · dërgesë në gjithë Shqipërinë</p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Lidhjet e fundit të faqes">
          {links.map((l) => (
            <button key={l.id} onClick={() => onNavigate(l.id)} className="text-slate-300 hover:text-bone">
              {l.name}
            </button>
          ))}
          <a href={WHATSAPP_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-bone">
            Instagram
          </a>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-bone/10 flex flex-col sm:flex-row justify-between gap-3 text-sm text-slate-500">
        <p>© {new Date().getFullYear()} MRA Shisha. Të gjitha të drejtat e rezervuara.</p>
        <button onClick={onOpenAdminModal} className="text-left sm:text-right text-slate-600 hover:text-slate-300">
          Hyrje për stafin
        </button>
      </div>
    </footer>
  );
};
