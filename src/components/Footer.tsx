import React from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { BUSINESS_INFO } from '../data/mockData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Droplet,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();
  const { scrollToTop } = useSmoothScroll();

  const handleNav = (page: PageRoute) => {
    onNavigate(page);
    scrollToTop(false);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 scroll-defer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-md shrink-0">
                <img 
                  src="/images/brand/pure-logo.svg" 
                  alt="PURE Water Purifiers" 
                  className="w-full h-full object-cover rounded-[14px]"
                  onError={(e) => {
                    e.currentTarget.src = '/images/brand/business-logo.png';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-2xl text-white tracking-tight leading-none">
                    <span className="text-cyan-400">PURE</span>
                  </h3>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700">
                    AquaFresh
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-telugu mt-0.5">
                  {isTelugu ? 'లాస్య వాటర్ సేల్స్ & సర్వీసెస్ | రఘునాథపల్లి' : "Priya's AquaFresh – Lasya Purifiers"}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              {t(
                "Your trusted local partner for premium domestic & commercial water purifiers, professional doorstep installation, repair services, original spare parts, and home appliances in Raghunathpally & Jangaon.",
                "రఘునాథపల్లి మరియు జనగామ ప్రాంతంలో స్వచ్ఛమైన తాగునీటి కోసం వాటర్ ప్యూరిఫైయర్ సేల్స్, ఇన్స్టాలేషన్, సర్వీస్ మరియు ఒరిజినల్ స్పేర్ పార్ట్స్ అందించే నమ్మకమైన సంస్థ."
              )}
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GSTIN: <strong className="text-slate-200">{BUSINESS_INFO.gstNumber}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1 Year Guarantee on Eligible Models</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs flex items-center gap-2 border-l-2 border-cyan-500 pl-2.5">
              <span>{t('Explore Pages', 'ముఖ్యమైన లింకులు')}</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('Home Page', 'హోమ్ పేజీ')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('about')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('About Our Business', 'మా గురించి')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('water-purifiers')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('Water Purifiers Catalogue', 'వాటర్ ప్యూరిఫైయర్లు')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('appliances')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('Home Appliances (Fridges, Coolers, AC)', 'హోమ్ అప్లయన్సెస్')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('Repair & Maintenance Services', 'సర్వీసులు & రిపేర్లు')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('service-booking')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-cyan-300 font-semibold"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t('Online Service Booking', 'ఆన్‌లైన్ సర్వీస్ బుకింగ్')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('spare-parts')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('Genuine Spare Parts', 'స్పేర్ పార్ట్స్')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('gallery')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
                  <span>{t('Showroom & Product Gallery', 'గ్యాలరీ')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('reviews')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-slate-100 font-semibold text-amber-300 hover:text-amber-200"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('Customer Reviews & Ratings', 'కస్టమర్ రివ్యూలు & రేటింగ్స్')}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('privacy')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer text-slate-500 hover:text-slate-300 text-xs pt-1"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600" />
                  <span>{t('Privacy Policy', 'ప్రైవసీ పాలసీ')}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Water Purifier Solutions */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs flex items-center gap-2 border-l-2 border-cyan-500 pl-2.5">
              <span>{t('Our Services', 'మా సేవలు')}</span>
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>RO & UV Water Purifier Installation</span>
              </li>
              <li className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Filter & Carbon Cartridge Replacement</span>
              </li>
              <li className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>High-TDS Membrane Replacement</span>
              </li>
              <li className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Pump, Adapter & SMPS Circuit Repair</span>
              </li>
              <li className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Water Leakage & Joint Troubleshooting</span>
              </li>
              <li className="flex items-center gap-2">
                <Droplet className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Commercial RO Plant Maintenance</span>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs font-semibold text-cyan-300 mb-1">
                {t('Need urgent doorstep assistance?', 'అర్జెంట్ సర్వీస్ అవసరమా?')}
              </p>
              <p className="text-xs text-slate-400 mb-2">
                {t('Call our direct helpline for same-day service in Raghunathpally & Jangaon.', 'రఘునాథపల్లి & జనగామ ప్రాంతాల్లో సేమ్-డే సర్వీస్ కోసం సంప్రదించండి.')}
              </p>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-cyan-600 hover:bg-cyan-500 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Column 4: Contact & Location */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase text-xs flex items-center gap-2 border-l-2 border-cyan-500 pl-2.5">
              <span>{t('Contact & Store Location', 'షాప్ అడ్రస్ & సంప్రదింపులు')}</span>
            </h4>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Khilashapur Road</p>
                  <p className="text-xs text-slate-300">Village & Mandal: Raghunathpally</p>
                  <p className="text-xs text-slate-300">District: Jangaon, Telangana, India</p>
                  <a 
                    href={BUSINESS_INFO.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-cyan-300 hover:underline mt-1 font-semibold"
                  >
                    <span>Get Google Map Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-300 shrink-0" />
                <div>
                  <span className="text-xs text-slate-300 block">Calling Number:</span>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-white font-bold hover:text-cyan-300">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs text-slate-300 block">WhatsApp Business:</span>
                  <a 
                    href={getGeneralWhatsAppUrl(isTelugu)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 font-bold hover:underline"
                  >
                    {BUSINESS_INFO.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                <div>
                  <span className="text-xs text-slate-300 block">Store Working Hours:</span>
                  <span className="text-xs text-slate-200">Mon - Sun: 8:00 AM - 9:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} <strong className="text-slate-200">Priya's AquaFresh – Lasya Water Purifier Sales & Services</strong>. All Rights Reserved.
          </p>

          <p className="text-center md:text-right text-[11px] max-w-xl text-slate-400 leading-normal">
            * Note: The 1-Year Guarantee mentioned on business promotional materials applies to eligible models and services as per business warranty terms. Service area covers Raghunathpally, Jangaon, and neighboring villages.
          </p>
        </div>
      </div>
    </footer>
  );
};
