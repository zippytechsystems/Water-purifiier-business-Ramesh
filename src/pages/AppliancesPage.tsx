import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS_DATA } from '../data/mockData';
import { getProductWhatsAppUrl, getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { 
  Tv, 
  Wind, 
  Sparkles, 
  Wrench, 
  MessageCircle, 
  CheckCircle, 
  ShieldCheck, 
  PhoneCall,
  Flame,
  ArrowRight
} from 'lucide-react';

interface AppliancesPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AppliancesPage: React.FC<AppliancesPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Filter home appliances and spares
  const applianceProducts = PRODUCTS_DATA.filter(p => p.category !== 'water-purifiers');

  const filteredProducts = activeCategory === 'all' 
    ? applianceProducts 
    : applianceProducts.filter(p => p.category === activeCategory);

  const categories = [
    { id: 'all', labelEn: 'All Appliances', labelTe: 'అన్ని అప్లయన్సెస్' },
    { id: 'fridges', labelEn: 'Fridges (Refrigerators)', labelTe: 'ఫ్రిడ్జ్ లు' },
    { id: 'washing-machines', labelEn: 'Washing Machines', labelTe: 'వాషింగ్ మెషిన్లు' },
    { id: 'air-coolers', labelEn: 'Air Coolers', labelTe: 'ఎయిర్ కూలర్లు' },
    { id: 'ac-spare-parts', labelEn: 'AC Spare Parts', labelTe: 'AC స్పేర్ పార్ట్స్' },
  ];

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold mb-3">
            <Tv className="w-3.5 h-3.5" />
            <span>{t("Branded Home Appliances", "గృహోపకరణాలు & AC స్పేర్స్")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Products & Home Appliances", "హోమ్ అప్లయన్సెస్ & స్పేర్స్")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Refrigerators, washing machines, desert air coolers, and genuine AC spare parts with manufacturer warranty and local service assistance.",
              "ఫ్రిడ్జ్ లు, వాషింగ్ మెషిన్లు, ఎయిర్ కూలర్లు మరియు ఒరిజినల్ AC స్పేర్ పార్ట్స్ లభించును. పూర్తి వారంటీ మరియు విశ్వసనీయ డెలివరీ."
            )}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isTelugu ? cat.labelTe : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Product Visual */}
              <div className="sm:w-5/12 bg-slate-100 p-6 flex items-center justify-center relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.nameEn}
                  className="max-h-56 object-contain transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900 text-white">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Product Details */}
              <div className="p-6 sm:w-7/12 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-1">
                    {product.subCategory}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl mb-2 group-hover:text-cyan-600 transition-colors">
                    {isTelugu ? product.nameTe : product.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {isTelugu ? product.descriptionTe : product.descriptionEn}
                  </p>

                  <div className="space-y-1.5 mb-6">
                    {(isTelugu ? product.featuresTe : product.featuresEn).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct WhatsApp Purchase / Enquiry Button */}
                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={getProductWhatsAppUrl(product, isTelugu)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>{t("Enquire Price & Models on WhatsApp", "ధర & మోడల్ వివరాలు వాట్సాప్ లో అడగండి")}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Home Appliances Assurance Box */}
        <div className="mt-16 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {t("100% Genuine Products", "అసలైన ఉత్పత్తులు")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Brand new appliances directly sourced with authorized brand guarantee and safe local transit.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {t("Installation & AC Spares", "ఇన్స్టాలేషన్ & AC స్పేర్స్")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Complete AC installation materials, copper piping, compressors, and technician hardware in stock.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                {t("Fast Store Enquiries", "వేగవంతమైన సమాచారం")}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Call our direct phone line 9014357848 or chat on WhatsApp 9182857848 for instant stock availability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
