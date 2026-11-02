import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/mockData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { 
  Phone, 
  MessageCircle, 
  Menu, 
  X, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Globe,
  Lock,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { isTelugu, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdown, setProductsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { labelEn: string; labelTe: string; page: PageRoute }[] = [
    { labelEn: 'Home', labelTe: 'హోమ్', page: 'home' },
    { labelEn: 'About Us', labelTe: 'గురించి', page: 'about' },
    { labelEn: 'Water Purifiers', labelTe: 'వాటర్ ప్యూరిఫైయర్లు', page: 'water-purifiers' },
    { labelEn: 'Appliances', labelTe: 'అప్లయన్సెస్', page: 'appliances' },
    { labelEn: 'Services', labelTe: 'సర్వీసులు', page: 'services' },
    { labelEn: 'Book Service', labelTe: 'సర్వీస్ బుకింగ్', page: 'service-booking' },
    { labelEn: 'Spare Parts', labelTe: 'స్పేర్ పార్ట్స్', page: 'spare-parts' },
    { labelEn: 'Gallery', labelTe: 'గ్యాలరీ', page: 'gallery' },
    { labelEn: 'Contact', labelTe: 'సంప్రదించండి', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setProductsDropdown(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
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

            {/* Admin Login Shortcut */}
            <button
              onClick={() => handleNavClick('admin')}
              className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-cyan-300 pl-2 text-xs border-l border-slate-700"
              title="Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass-nav shadow-lg py-2.5' 
            : 'bg-white/95 backdrop-blur-md py-3.5 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-700 p-0.5 shadow-md flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              <img 
                src="/images/brand/business-logo.png" 
                alt="Priya's AquaFresh Logo" 
                className="w-full h-full object-contain bg-white rounded-lg p-1"
                onError={(e) => {
                  // Fallback to text logo if image unavailable
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight">
                  Priya's <span className="text-cyan-600">AquaFresh</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  RO & Sales
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium font-telugu leading-tight">
                {isTelugu ? 'లాస్య వాటర్ సేల్స్ & సర్వీసెస్' : 'Lasya Water Purifier Sales & Services'}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-cyan-700 bg-cyan-50 font-bold shadow-xs'
                      : 'text-slate-700 hover:text-cyan-600 hover:bg-slate-100/70'
                  }`}
                >
                  {isTelugu ? link.labelTe : link.labelEn}
                </button>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Book Service Quick CTA */}
            <button
              onClick={() => handleNavClick('service-booking')}
              className="px-4 py-2 rounded-lg text-xs md:text-sm font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              {t('Book Service', 'సర్వీస్ బుకింగ్')}
            </button>

            {/* Direct WhatsApp CTA Button */}
            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs md:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
              <span>{t('WhatsApp Us', 'వాట్సాప్')}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-600 text-white sm:hidden"
              aria-label="WhatsApp Contact"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => handleNavClick(link.page)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-50 text-cyan-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{isTelugu ? link.labelTe : link.labelEn}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-cyan-600"></span>}
                  </button>
                );
              })}

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-2 mt-2 pt-2 border-t border-slate-100"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Management Portal</span>
              </button>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('service-booking')}
                className="w-full py-3 rounded-xl bg-slate-900 text-white text-center font-bold text-sm shadow-md"
              >
                {t('Book a Water Purifier Service', 'వాటర్ ప్యూరిఫైయర్ సర్వీస్ బుక్ చేయండి')}
              </button>

              <a
                href={getGeneralWhatsAppUrl(isTelugu)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold text-sm shadow-md flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>{t('Chat on WhatsApp: 9182857848', 'వాట్సాప్ లో మెసేజ్ చేయండి: 9182857848')}</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 text-center font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-cyan-600" />
                <span>Call Hotline: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
