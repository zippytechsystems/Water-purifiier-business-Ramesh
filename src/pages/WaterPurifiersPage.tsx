import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS_DATA, BUSINESS_INFO } from '../data/mockData';
import { getProductWhatsAppUrl } from '../utils/whatsapp';
import { 
  Droplets, 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  Wrench,
  Filter,
  Tag
} from 'lucide-react';

interface WaterPurifiersPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectService?: (serviceName: string) => void;
}

export const WaterPurifiersPage: React.FC<WaterPurifiersPageProps> = ({ onNavigate, onSelectService }) => {
  const { isTelugu, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');

  // Filter only water purifiers
  const purifierProducts = PRODUCTS_DATA.filter(p => p.category === 'water-purifiers');

  const subCategories = ['All', 'Domestic RO', 'Domestic RO+UV', 'RO Filtration', 'All Brands'];

  const filteredProducts = purifierProducts.filter(p => {
    const matchesSearch = 
      p.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.nameTe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubCategory = 
      selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;

    return matchesSearch && matchesSubCategory;
  });

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
            <Droplets className="w-3.5 h-3.5" />
            <span>{t("Pure Water Systems", "స్వచ్ఛమైన తాగునీటి వ్యవస్థలు")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Water Purifiers Catalogue", "వాటర్ ప్యూరిఫైయర్లు")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Explore domestic RO, UV, RO+UV, multi-stage water purifiers, and commercial plants with 1-Year Guarantee options and doorstep installation in Raghunathpally & Jangaon.",
              "మీ ఇంటికి మరియు వ్యాపార అవసరాలకు అనువైన RO, UV వాటర్ ప్యూరిఫైయర్లు. భారీ డిస్కౌంట్లు మరియు 1 ఇయర్ గ్యారంటీ అందుబాటులో కలవు."
            )}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Subcategory Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {subCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedSubCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubCategory === cat
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search water purifiers..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
            >
              {/* Product Image Area */}
              <div className="relative aspect-4/3 bg-gradient-to-b from-slate-50 to-slate-100 p-6 flex items-center justify-center overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.nameEn}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 items-start">
                  {product.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-slate-900 text-white shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 shadow-xs flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>1 Year Guaranty</span>
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-1">
                    {product.subCategory}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-cyan-600 transition-colors">
                    {isTelugu ? product.nameTe : product.nameEn}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {isTelugu ? product.descriptionTe : product.descriptionEn}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 mb-6">
                    {(isTelugu ? product.featuresTe : product.featuresEn).map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct WhatsApp Call to Action & Book Installation */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <a
                    href={getProductWhatsAppUrl(product, isTelugu)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-500/20 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                    <span>{t("Enquire Price on WhatsApp", "ధర & డిస్కౌంట్ వాట్సాప్ లో అడగండి")}</span>
                  </a>

                  <button
                    onClick={() => {
                      if (onSelectService) {
                        onSelectService('Water Purifier Installation');
                      }
                      onNavigate('service-booking');
                    }}
                    className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5 text-cyan-600" />
                    <span>{t("Book Doorstep Installation", "ఇన్స్టాలేషన్ బుక్ చేయండి")}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner Cropped from Client Poster */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 via-slate-900 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
                {t("Local Service Support", "స్థానిక సేవా సహకారం")}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {t(
                  "Do You Need a New Water Purifier or Old Purifier Service?",
                  "మీకు కొత్త వాటర్ ప్యూరిఫైయర్ కావాలా? లేదా పాతది సర్వీస్ చేయించాలా?"
                )}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t(
                  "Contact Lasya Water Purifiers once. We provide expert advice, water TDS testing, and doorstep maintenance in Raghunathpally & Jangaon.",
                  "అయితే ఒక్కసారి లాస్య వాటర్ ప్యూరిఫైయర్ ను సంప్రదించండి. మీ ఇంటికే వచ్చి వాటర్ TDS టెస్టింగ్ చేసి సరైన సలహా ఇస్తాము."
                )}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-3 rounded-xl bg-white text-slate-950 font-bold text-xs text-center shadow-md hover:bg-slate-100 transition-colors"
              >
                Call: {BUSINESS_INFO.phone}
              </a>
              <button
                onClick={() => onNavigate('service-booking')}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center shadow-md transition-colors cursor-pointer"
              >
                {t("Book Service Online", "ఆన్‌లైన్ సర్వీస్ బుకింగ్")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
