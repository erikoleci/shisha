import React from 'react';
import { Gem, Award, Zap, MessageSquare, CheckCircle2 } from 'lucide-react';
import { getGeneralWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp';

export const AboutSection: React.FC = () => {
  const reasons = [
    {
      icon: <Gem className="w-6 h-6 text-red-400" />,
      title: "Produkte 100% Origjinale",
      description: "Përzgjedhje ekskluzive El-Badia e shisheve më cilësore, argjilave profesionale, aromave të certifikuara dhe aksesorëve."
    },
    {
      icon: <Award className="w-6 h-6 text-red-400" />,
      title: "Cilësi e Garantuar VIP",
      description: "Përdorim vetëm materiale elitare si çelik inox 304, kristal të punuar me dorë dhe alumin të anodizuar."
    },
    {
      icon: <Zap className="w-6 h-6 text-red-400" />,
      title: "Dërgesë e Shpejtë",
      description: "Dërgesa me postë brenda 24-48 orëve në të gjitha qytetet e Shqipërisë me paketim të sigurtë anti-goditje."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      title: "Porosi me 1 Klik",
      description: `Porositni drejtpërdrejt përmes WhatsApp në numrin ${WHATSAPP_CONFIG.displayNumber} pa regjistrim apo procedura të ndërlikuara.`
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 text-white border-t border-red-500/20 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-red-400 block mb-2">
            RRETH SHISHA STORE ALBANIA
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight mb-4">
            Pse Të Zgjidhni Dyqanin Tonë VIP?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
            MRA Shisha është dyqani specialist online në Shqipëri për shitjen e shishave, aromave dhe aksesorëve cilësorë me porosi direkte në WhatsApp.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {reasons.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl border border-red-500/20 hover:border-red-500/60 shadow-xl shadow-slate-950/50 hover:shadow-2xl hover:shadow-red-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white font-serif mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-red-500/10 flex items-center gap-1.5 text-red-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Garantuar 100%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-red-500/30 p-8 sm:p-12 text-center shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] pointer-events-none" />
          <h3 className="text-2xl sm:text-3xl font-black text-white font-serif mb-3">
            Keni pyetje apo kërkoni këshillim për produktin e duhur?
          </h3>
          <p className="text-slate-300 text-sm mb-8 max-w-xl mx-auto font-light leading-relaxed">
            Stafi ynë ju ndihmon të zgjidhni shishën, shijen ose aksesorët idealë për nevojat tuaja.
          </p>
          <a
            href={getGeneralWhatsAppUrl('Përshëndetje! Dëshiroj këshillim për zgjedhjen e produktit shisha.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-950/60 hover:scale-105 active:scale-95 transition-all border border-emerald-400/30"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200" />
            <span>Kontakt në WhatsApp: {WHATSAPP_CONFIG.displayNumber}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
