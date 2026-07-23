import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, MapPin, Clock, Send, Sparkles, Phone } from 'lucide-react';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../config/whatsapp';

export const ContactSection: React.FC = () => {
  const [customMsg, setCustomMsg] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSendCustomWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    const fullMessage = `Përshëndetje MRA Shisha!
Përshëndetje, unë jam: ${senderName || 'Klient'}

Mesazhi im:
${customMsg}`;

    const url = `https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(fullMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-slate-950 text-white border-t border-red-500/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-red-500/30 shadow-md mb-3">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-red-300">Na Kontaktoni</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight mb-3">
            Komunikoni me Dyqanin Tonë VIP
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-light">
            Jemi në disponibilitetin tuaj për çdo porosi, pyetje apo kërkesë produkti me dërgesë në gjithë Shqipërinë.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Info Cards */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-400 hover:bg-slate-800 transition-all duration-300 flex items-center justify-between shadow-2xl block"
              id="contact-card-whatsapp"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-950/50">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">WhatsApp Porosi</span>
                  <h3 className="text-base font-black text-white font-mono">{WHATSAPP_CONFIG.displayNumber}</h3>
                  <p className="text-xs text-slate-400 font-light">Porosit & Bisedo me 1 Klik</p>
                </div>
              </div>
              <span className="text-emerald-400 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Instagram Card */}
            <a
              href={WHATSAPP_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-slate-900/90 border border-red-500/30 hover:border-red-400 hover:bg-slate-800 transition-all duration-300 flex items-center justify-between shadow-2xl block"
              id="contact-card-instagram"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 shadow-lg">
                  <Instagram className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-red-300 uppercase tracking-wider block">Instagram Official</span>
                  <h3 className="text-base font-bold text-white font-serif">{WHATSAPP_CONFIG.instagramHandle}</h3>
                  <p className="text-xs text-slate-400 font-light">Ndiqni produktet & risitë e reja</p>
                </div>
              </div>
              <span className="text-red-400 font-bold text-lg group-hover:translate-x-1 transition-transform">→</span>
            </a>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-red-500/20 flex items-center gap-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Email Adresa</span>
                <h3 className="text-sm font-bold text-white">{WHATSAPP_CONFIG.email}</h3>
                <p className="text-xs text-slate-400 font-light">Për furnizime apo pyetje</p>
              </div>
            </div>

            {/* Location & Hours Card */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-red-500/20 space-y-3 shadow-xl">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block font-light">Shërbimi</span>
                  <span className="text-xs font-bold text-white">{WHATSAPP_CONFIG.address}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-red-500/10">
                <Clock className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-400 block font-light">Koha e Përgjigjes</span>
                  <span className="text-xs font-bold text-white">{WHATSAPP_CONFIG.workingHours}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Quick WhatsApp Form */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-red-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between backdrop-blur-xl">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-500/20">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-serif">Dërgo Mesazh në WhatsApp</h3>
                  <p className="text-xs text-slate-300 mt-1 font-light">
                    Shkruani pyetjen apo kërkesën tuaj dhe do të hapet automatikisht biseda në WhatsApp me {WHATSAPP_CONFIG.displayNumber}.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleSendCustomWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-red-300 tracking-wider mb-1.5">
                    Emri Juaj
                  </label>
                  <input
                    type="text"
                    placeholder="Filan Fisteku"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-red-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-red-300 tracking-wider mb-1.5">
                    Mesazhi ose Pyetja për Produktin
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Përshëndetje, dëshiroj pyetje për shishen..."
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-red-500/30 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-red-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  id="contact-form-submit-btn"
                  className="w-full py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition-all cursor-pointer border border-emerald-400/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Dërgo Mesazhin në WhatsApp ({WHATSAPP_CONFIG.displayNumber})</span>
                </button>
              </form>
            </div>

            <div className="mt-6 pt-3 border-t border-red-500/10 text-center">
              <p className="text-xs text-slate-400 font-light">
                Përgjigje e menjëhershme nga operatori ynë.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
