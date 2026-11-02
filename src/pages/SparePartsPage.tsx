import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SPARE_PARTS_DATA, BUSINESS_INFO } from '../data/mockData';
import { getSparePartWhatsAppUrl } from '../utils/whatsapp';
import { 
  Layers, 
  Search, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Tag, 
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface SparePartsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const SparePartsPage: React.FC<SparePartsPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Water Purifier Filter',
    'Membrane',
    'Electrical / Pump',
    'AC & Appliance Part'
  ];

  const filteredParts = SPARE_PARTS_DATA.filter(part => {
    const matchesSearch = 
      part.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.nameTe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.compatibility.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || part.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{t("100% Genuine Components", "అసలైన స్పేర్ పార్ట్స్")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Water Purifier & AC Spare Parts", "స్పేర్ పార్ట్స్ డైరెక్టరీ")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Reliable spare parts for all domestic & commercial water purifiers, refrigerators, air coolers, and air conditioners in Raghunathpally & Jangaon.",
              "అన్ని ప్రముఖ బ్రాండ్ల వాటర్ ప్యూరిఫైయర్లు మరియు అప్లయన్సెస్ కు సరిపోయే ఒరిజినల్ ఫిల్టర్లు, మెంబ్రేన్లు, మోటార్లు మరియు స్పేర్ పార్ట్స్."
            )}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search parts or compatibility..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
            />
          </div>
        </div>

        {/* Spare Parts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredParts.map((part) => (
            <div
              key={part.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-4/3 rounded-2xl bg-slate-100 mb-4 overflow-hidden p-3 flex items-center justify-center">
                  <img
                    src={part.imageUrl}
                    alt={part.nameEn}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    In Stock
                  </span>
                </div>

                <span className="text-[10px] uppercase font-bold text-emerald-600 block mb-1">
                  {part.category}
                </span>
                <h3 className="font-extrabold text-slate-900 text-base mb-1.5 group-hover:text-emerald-600 transition-colors">
                  {isTelugu ? part.nameTe : part.nameEn}
                </h3>
                <p className="text-xs text-slate-500 mb-2 font-medium">
                  <strong>Compatibility:</strong> {part.compatibility}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {isTelugu ? part.descriptionTe : part.descriptionEn}
                </p>
              </div>

              {/* Direct WhatsApp Call to Action */}
              <div className="pt-3 border-t border-slate-100">
                <a
                  href={getSparePartWhatsAppUrl(part, isTelugu)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                  <span>{t("Enquire Price on WhatsApp", "ధర & లభ్యత అడగండి")}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Technician Spares Bulk Callout */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-extrabold text-slate-900">
              {t("Are you a local technician or looking for bulk parts?", "మీరు స్థానిక టెక్నీషియనా లేదా బల్క్ స్పేర్స్ కావాలా?")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              {t(
                "We provide reliable wholesale & technician pricing for RO filters, membranes, and AC accessories.",
                "రఘునాథపల్లి & జనగామ టెక్నీషియన్లకు నాణ్యమైన స్పేర్స్ అందుబాటులో ఉంచబడును."
              )}
            </p>
          </div>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs whitespace-nowrap shadow-md transition-colors"
          >
            Call: {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
};
