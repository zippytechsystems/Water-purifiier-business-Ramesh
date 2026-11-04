import React, { useState, useEffect, useRef } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { BUSINESS_INFO } from '../data/mockData';
import { getGeneralWhatsAppUrl, getDirectWhatsAppBookingUrl } from '../utils/whatsapp';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Globe,
  Download,
  Star,
  Home,
  Wrench,
  Droplets,
  CalendarCheck,
  Layers,
  Sparkles,
  Image as ImageIcon,
  Info
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenInstallModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onOpenInstallModal }) => {
  const { isTelugu, toggleLanguage, t } = useLanguage();
  const { scrollToTop } = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
          setScrollProgress(progress);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { 
    labelEn: string; 
    labelTe: string; 
    page: PageRoute; 
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { labelEn: 'Home', labelTe: 'హోమ్', page: 'home', icon: Home },
    { labelEn: 'Services', labelTe: 'సర్వీసులు', page: 'services', icon: Wrench },
    { labelEn: 'Water Purifiers', labelTe: 'వాటర్ ప్యూరిఫైయర్లు', page: 'water-purifiers', icon: Droplets },
    { labelEn: 'Book Service', labelTe: 'సర్వీస్ బుకింగ్', page: 'service-booking', icon: CalendarCheck },
    { labelEn: 'Appliances', labelTe: 'అప్లయన్సెస్', page: 'appliances', icon: Layers },
    { labelEn: 'Spare Parts', labelTe: 'స్పేర్ పార్ట్స్', page: 'spare-parts', icon: Sparkles },
    { labelEn: 'Gallery', labelTe: 'గ్యాలరీ', page: 'gallery', icon: ImageIcon },
    { labelEn: 'Reviews', labelTe: 'రివ్యూలు', page: 'reviews', icon: Star },
    { labelEn: 'Contact', labelTe: 'సంప్రదించండి', page: 'contact', icon: Phone },
    { labelEn: 'About Us', labelTe: 'గురించి', page: 'about', icon: Info },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    scrollToTop(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 gpu-layer">
      {/* Dynamic Smooth Reading Progress Indicator */}
      <div className="h-0.5 w-full bg-slate-900/10 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Corporate Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
              <MapPin className="w-3.5 h-3.5" />
              <span>Khilashapur Road, Raghunathpally, Jangaon Dist.</span>
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>8:00 AM – 9:00 PM (Daily)</span>
            </span>
            <span className="hidden lg:inline-block text-slate-500">|</span>
            <span className="hidden lg:flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>GST: {BUSINESS_INFO.gstNumber}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* Install App Button in Top Bar */}
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 transition-colors text-xs font-semibold cursor-pointer border border-cyan-800/80 shadow-xs"
                title="Install App"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isTelugu ? 'యాప్ ఇన్‌స్టాల్' : 'Install App'}</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 transition-colors text-xs font-semibold cursor-pointer border border-slate-700"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isTelugu ? 'English (EN)' : 'తెలుగు (TE)'}</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg py-2 sm:py-2.5' 
            : 'bg-white/95 backdrop-blur-md py-2.5 sm:py-3.5 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 lg:gap-6">
          {/* Left Side: Brand Logo & Desktop Navigation Options together */}
          <div className="flex items-center gap-3 lg:gap-5 xl:gap-6 flex-1 min-w-0">
            {/* Logo & Brand Identity */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none cursor-pointer group shrink-0"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-blue-700 p-0.5 shadow-md flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shrink-0">
                <img 
                  src="/images/brand/pure-logo.svg" 
                  alt="PURE Water Purifiers Logo" 
                  className="w-full h-full object-cover rounded-[14px]"
                  onError={(e) => {
                    e.currentTarget.src = '/images/brand/business-logo.png';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
                    <span className="text-cyan-600 font-extrabold">PURE</span>
                  </span>
                  <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 border border-cyan-300">
                    AquaFresh
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium font-telugu leading-tight mt-0.5 line-clamp-1">
                  {isTelugu ? 'లాస్య వాటర్ సేల్స్ & సర్వీసెస్ | రఘునాథపల్లి' : "Priya's AquaFresh – Lasya Purifiers"}
                </p>
              </div>
            </button>

            {/* Desktop Navigation Links - Aligned on Left Side right next to logo */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 flex-wrap">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                const Icon = link.icon;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1 xl:gap-1.5 whitespace-nowrap ${
                      isActive
                        ? 'text-cyan-700 bg-cyan-50 font-bold shadow-xs ring-1 ring-cyan-200'
                        : 'text-slate-700 hover:text-cyan-600 hover:bg-slate-100/70'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                    <span>{isTelugu ? link.labelTe : link.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Install App Quick CTA */}
            {onOpenInstallModal && (
              <button
                onClick={onOpenInstallModal}
                className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-xl text-xs font-bold bg-cyan-50 text-cyan-800 hover:bg-cyan-100 border border-cyan-200 shadow-xs transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-cyan-600" />
                <span>{t('Install App', 'ఇన్‌స్టాల్')}</span>
              </button>
            )}

            {/* Book Service Quick CTA */}
            <button
              onClick={() => handleNavClick('service-booking')}
              className="px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {t('Book Service', 'సర్వీస్ బుకింగ్')}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 xl:px-4 py-1.5 xl:py-2 rounded-xl text-xs xl:text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md hover:shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-3.5 h-3.5 xl:w-4 xl:h-4 fill-white text-emerald-700" />
              <span>{t('WhatsApp Us', 'వాట్సాప్')}</span>
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            {/* Mobile Call Direct */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors sm:hidden shadow-sm"
              title="Call Store"
              aria-label="Call Store"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Mobile WhatsApp Direct */}
            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 transition-colors sm:hidden shadow-sm"
              title="WhatsApp Store"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
            </a>

            {/* Mobile Menu Drawer Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200 max-h-[80vh] overflow-y-auto">
            {/* Top 5 Essential Quick Actions in Drawer */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                {isTelugu ? 'ముఖ్యమైన ఆప్షన్లు' : 'Quick Options'}
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('home')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-cyan-50 hover:border-cyan-200 transition-colors"
                >
                  <Home className="w-4 h-4 text-cyan-600" />
                  <span>{isTelugu ? 'హోమ్ పేజ్' : 'Home Page'}</span>
                </button>
                <button
                  onClick={() => handleNavClick('services')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-cyan-50 hover:border-cyan-200 transition-colors"
                >
                  <Wrench className="w-4 h-4 text-cyan-600" />
                  <span>{isTelugu ? 'సేల్స్ & సర్వీస్' : 'Sales & Services'}</span>
                </button>
                <button
                  onClick={() => handleNavClick('service-booking')}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-bold hover:bg-cyan-50 hover:border-cyan-200 transition-colors"
                >
                  <CalendarCheck className="w-4 h-4 text-cyan-600" />
                  <span>{isTelugu ? 'సర్వీస్ బుకింగ్' : 'Booking'}</span>
                </button>
                {onOpenInstallModal && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInstallModal();
                    }}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-100 border border-cyan-300 text-cyan-900 text-xs font-bold hover:bg-cyan-200 transition-colors"
                  >
                    <Download className="w-4 h-4 text-cyan-700" />
                    <span>{isTelugu ? 'ఇన్‌స్టాల్ యాప్' : 'Install App'}</span>
                  </button>
                )}
                <a
                  href={getDirectWhatsAppBookingUrl(isTelugu)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
                  <span>{isTelugu ? 'వాట్సాప్ బుకింగ్ (WhatsApp Booking)' : 'WhatsApp Booking'}</span>
                </a>
              </div>
            </div>

            {/* Other Pages Navigation */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
                {isTelugu ? 'ఇతర పేజీలు' : 'All Sections'}
              </p>
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.page;
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.page}
                      onClick={() => handleNavClick(link.page)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center justify-between ${
                        isActive
                          ? 'bg-cyan-50 text-cyan-700 font-bold border border-cyan-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600' : 'text-slate-400'}`} />
                        <span>{isTelugu ? link.labelTe : link.labelEn}</span>
                      </span>
                      {isActive && <span className="w-2 h-2 rounded-full bg-cyan-600"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-center font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>{t('Direct Call: 9014357848', 'కాల్ చేయండి: 9014357848')}</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ======================================================================== */}
      {/* MOBILE COMPACT TOP OPTIONS BAR (EXACTLY 5 USER-REQUESTED OPTIONS)        */}
      {/* 1. Home Page | 2. Sales & Services | 3. Booking | 4. Install App | 5. WhatsApp Booking */}
      {/* Designed compact and perfectly fitted for mobile screens                */}
      {/* ======================================================================== */}
      <div className="lg:hidden w-full bg-slate-950/98 backdrop-blur-md border-b border-slate-800 shadow-md py-1.5 px-1.5 sm:px-3">
        <div className="max-w-md mx-auto grid grid-cols-5 gap-1 items-stretch">
          {/* 1. Home Page */}
          <button
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-center transition-all duration-150 cursor-pointer ${
              currentPage === 'home'
                ? 'bg-gradient-to-b from-cyan-500/25 to-blue-600/30 text-cyan-300 ring-1 ring-cyan-400/50 shadow-sm'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-800/80'
            }`}
            title="Home Page"
          >
            <Home className={`w-4 h-4 mb-0.5 shrink-0 ${currentPage === 'home' ? 'text-cyan-400' : 'text-slate-400'}`} />
            <span className="text-[10px] font-bold leading-tight truncate w-full">
              {isTelugu ? 'హోమ్' : 'Home'}
            </span>
          </button>

          {/* 2. Sales & Services */}
          <button
            onClick={() => handleNavClick('services')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-center transition-all duration-150 cursor-pointer ${
              currentPage === 'services' || currentPage === 'water-purifiers'
                ? 'bg-gradient-to-b from-cyan-500/25 to-blue-600/30 text-cyan-300 ring-1 ring-cyan-400/50 shadow-sm'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-800/80'
            }`}
            title="Sales and Services"
          >
            <Wrench className={`w-4 h-4 mb-0.5 shrink-0 ${currentPage === 'services' || currentPage === 'water-purifiers' ? 'text-cyan-400' : 'text-cyan-400'}`} />
            <span className="text-[9.5px] font-bold leading-tight truncate w-full">
              {isTelugu ? 'సేల్స్ & సర్వీస్' : 'Services'}
            </span>
          </button>

          {/* 3. Booking */}
          <button
            onClick={() => handleNavClick('service-booking')}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-center transition-all duration-150 cursor-pointer ${
              currentPage === 'service-booking'
                ? 'bg-gradient-to-b from-sky-500/30 to-blue-600/40 text-cyan-200 ring-1 ring-cyan-400 shadow-sm'
                : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800/90 border border-slate-800/80'
            }`}
            title="Book Service"
          >
            <CalendarCheck className={`w-4 h-4 mb-0.5 shrink-0 ${currentPage === 'service-booking' ? 'text-cyan-300' : 'text-sky-400'}`} />
            <span className="text-[10px] font-bold leading-tight truncate w-full">
              {isTelugu ? 'బుకింగ్' : 'Booking'}
            </span>
          </button>

          {/* 4. Install App */}
          <button
            onClick={() => {
              if (onOpenInstallModal) {
                onOpenInstallModal();
              }
            }}
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-center bg-cyan-950/80 hover:bg-cyan-900/90 text-cyan-300 border border-cyan-700/60 transition-all duration-150 cursor-pointer active:scale-95 shadow-xs"
            title="Install App"
          >
            <Download className="w-4 h-4 mb-0.5 shrink-0 text-cyan-400 animate-bounce" />
            <span className="text-[9.5px] font-bold leading-tight truncate w-full text-cyan-300">
              {isTelugu ? 'ఇన్‌స్టాల్' : 'Install App'}
            </span>
          </button>

          {/* 5. WhatsApp Booking */}
          <a
            href={getDirectWhatsAppBookingUrl(isTelugu)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-center bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-700/60 transition-all duration-150 active:scale-95 shadow-xs"
            title="WhatsApp Booking"
          >
            <MessageCircle className="w-4 h-4 mb-0.5 shrink-0 fill-emerald-400 text-emerald-950" />
            <span className="text-[9.5px] font-bold leading-tight truncate w-full text-emerald-300">
              {isTelugu ? 'వాట్సాప్' : 'WhatsApp'}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
