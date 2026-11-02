import React from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/mockData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react';

interface FloatingActionsProps {
  onNavigate: (page: PageRoute) => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();

  return (
    <div className="fixed bottom-5 right-4 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Quick Service Booking Bubble */}
      <button
        onClick={() => {
          onNavigate('service-booking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white text-xs font-bold shadow-xl hover:shadow-2xl border border-slate-700/80 backdrop-blur-md transform hover:scale-105 transition-all cursor-pointer group"
        title="Book Water Purifier Service"
      >
        <CalendarCheck className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">
          {t('Book Service', 'సర్వీస్ బుకింగ్')}
        </span>
      </button>

      {/* Mobile-Only Direct Call Float Button */}
      <a
        href={`tel:${BUSINESS_INFO.phone}`}
        className="pointer-events-auto sm:hidden flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white shadow-xl hover:shadow-blue-500/40 active:scale-95 transition-all"
        title="Call Now"
        aria-label="Call Store"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Main Floating WhatsApp Button with Ripple Ping Animation */}
      <div className="relative pointer-events-auto group">
        {/* Pulsing Aura */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/40 animate-ping opacity-75"></span>

        <a
          href={getGeneralWhatsAppUrl(isTelugu)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl hover:shadow-emerald-500/50 transition-all transform hover:scale-105 active:scale-95"
          title="Direct WhatsApp Business Chat"
          aria-label="Direct WhatsApp Business Chat"
        >
          <MessageCircle className="w-6 h-6 fill-white text-emerald-500 shrink-0" />
          <div className="hidden md:flex flex-col text-left leading-tight pr-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-100">
              {t('Chat with Us', 'వాట్సాప్ చాట్')}
            </span>
            <span className="text-xs font-extrabold text-white">
              WhatsApp Business
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
