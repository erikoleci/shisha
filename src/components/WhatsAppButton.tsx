import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getGeneralWhatsAppUrl } from '../config/whatsapp';

// Floating shortcut to WhatsApp. Kept in WhatsApp green so it is recognised at a glance.
export const WhatsAppButton: React.FC = () => (
  <a
    href={getGeneralWhatsAppUrl()}
    target="_blank"
    rel="noopener noreferrer"
    id="floating-whatsapp-btn"
    aria-label="Na shkruaj në WhatsApp"
    className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-[#1f8f4e] hover:bg-[#25a35a] text-white flex items-center justify-center shadow-[0_8px_24px_rgb(0_0_0/0.45)] transition-colors"
  >
    <MessageCircle className="w-6 h-6" />
  </a>
);
