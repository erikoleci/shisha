import React, { useState } from 'react';
import { MessageCircle, Instagram, Mail, MapPin } from 'lucide-react';
import { WHATSAPP_CONFIG, getGeneralWhatsAppUrl } from '../config/whatsapp';

const fieldClass =
  'w-full bg-ink border border-bone/15 text-bone placeholder-slate-500 px-4 py-3 rounded-[2px] focus:outline-none focus:border-bone/50';

export const ContactSection: React.FC = () => {
  const [customMsg, setCustomMsg] = useState('');
  const [senderName, setSenderName] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const fullMessage = `Përshëndetje MRA Shisha!\n\nJam: ${senderName || 'Klient'}\n\n${customMsg}`;
    window.open(`https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=${encodeURIComponent(fullMessage)}`, '_blank');
  };

  const channels = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: WHATSAPP_CONFIG.displayNumber,
      href: getGeneralWhatsAppUrl(),
      id: 'contact-card-whatsapp',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      value: WHATSAPP_CONFIG.instagramHandle,
      href: WHATSAPP_CONFIG.instagramUrl,
      id: 'contact-card-instagram',
    },
    { icon: Mail, label: 'Email', value: WHATSAPP_CONFIG.email, href: `mailto:${WHATSAPP_CONFIG.email}` },
    { icon: MapPin, label: 'Dërgesa', value: WHATSAPP_CONFIG.address },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-ink/70 border-t border-bone/10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="rule mb-6" />
          <h2 className="display text-3xl sm:text-4xl text-bone">Kontakt</h2>
          <p className="mt-4 text-slate-400 leading-relaxed max-w-sm">
            Pyetje për një produkt apo porosi? Përgjigjemi në WhatsApp.
          </p>

          <ul className="mt-10 border-t border-bone/10">
            {channels.map(({ icon: Icon, label, value, href, id }) => {
              const body = (
                <>
                  <Icon className="w-5 h-5 text-red-300 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <span className="block text-sm text-slate-400">{label}</span>
                    <span className="block text-bone">{value}</span>
                  </span>
                </>
              );
              return (
                <li key={label} className="border-b border-bone/10">
                  {href ? (
                    <a
                      href={href}
                      id={id}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-start gap-4 py-4 hover:bg-bone/[0.03] transition-colors"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 py-4">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <form onSubmit={handleSend} className="lg:col-span-7 lg:pt-[5.5rem] space-y-5">
          <h3 className="text-xl font-medium text-bone">Shkruaj mesazhin këtu, e hapim në WhatsApp</h3>
          <label className="block">
            <span className="block text-sm text-slate-400 mb-2">Emri</span>
            <input
              type="text"
              autoComplete="name"
              placeholder="Emri yt"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className={fieldClass}
            />
          </label>
          <label className="block">
            <span className="block text-sm text-slate-400 mb-2">Mesazhi</span>
            <textarea
              rows={5}
              required
              placeholder="P.sh. a e keni shishën El-Badia në gjendje?"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className={`${fieldClass} resize-none`}
            />
          </label>
          <button type="submit" id="contact-form-submit-btn" className="btn btn-primary w-full sm:w-auto">
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Hap në WhatsApp</span>
          </button>
        </form>
      </div>
    </section>
  );
};
