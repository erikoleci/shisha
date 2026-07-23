import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { getGeneralWhatsAppUrl, WHATSAPP_CONFIG } from '../config/whatsapp';

export const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) {
      window.open(getGeneralWhatsAppUrl(), '_blank');
      return;
    }
    window.open(getGeneralWhatsAppUrl(quickMsg), '_blank');
    setQuickMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Quick Popover Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white border border-slate-200 rounded-2xl p-4 shadow-2xl animate-fadeIn text-left">
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
                <MessageCircle className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-white rounded-full" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-serif">Shisha Store Support</h4>
                <p className="text-[10px] text-emerald-600 font-semibold">Online: {WHATSAPP_CONFIG.displayNumber}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 font-normal mb-3 leading-relaxed">
            Përshëndetje! 👋 Si mund t'ju ndihmojmë me porosinë tuaj të shishës apo aromave?
          </p>

          <form onSubmit={handleSend} className="space-y-2">
            <input
              type="text"
              placeholder="Shkruaj pyetjen këtu..."
              value={quickMsg}
              onChange={(e) => setQuickMsg(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dërgo në WhatsApp</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="relative group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="floating-whatsapp-btn"
          className="relative w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white"
          aria-label="Porosit në WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          
          {/* Unread dot */}
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-amber-500 border-2 border-white rounded-full" />
        </button>
      </div>

    </div>
  );
};
