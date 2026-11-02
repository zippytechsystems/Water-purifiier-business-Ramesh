import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { GALLERY_DATA } from '../data/mockData';
import { Image, Eye, ZoomIn, CheckCircle } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const tabs = [
    { id: 'all', labelEn: 'All Photos', labelTe: 'అన్ని ఫోటోలు' },
    { id: 'showroom', labelEn: 'Showroom & Brand', labelTe: 'షోరూమ్ & బ్రాండ్' },
    { id: 'products', labelEn: 'Products & Spares', labelTe: 'ప్రాడక్ట్స్ & స్పేర్స్' },
    { id: 'purity', labelEn: 'Water Purity & Demo', labelTe: 'స్వచ్ఛమైన నీరు & డెమో' },
  ];

  const filteredGallery = activeTab === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(g => g.category === activeTab);

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
            <Image className="w-3.5 h-3.5" />
            <span>{t("Verified Showroom Showcase", "షోరూమ్ & వీడియో గ్యాలరీ")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Showroom & Product Gallery", "మా గ్యాలరీ")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Authentic photos from Priya's AquaFresh showroom on Khilashapur Road, Raghunathpally – showcasing our water purifier collection, AC spares, and appliances.",
              "రఘునాథపల్లిలోని ప్రియాస్ ఆక్వాఫ్రెష్ షోరూమ్, వాటర్ ప్యూరిఫైయర్లు మరియు అప్లయన్సెస్ ఫోటో గ్యాలరీ."
            )}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isTelugu ? tab.labelTe : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item.imageUrl)}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-4/3 bg-slate-950 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.titleEn}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-cyan-600 transition-colors">
                    {isTelugu ? item.titleTe : item.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {isTelugu ? item.captionTe : item.captionEn}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-200"
          >
            <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-slate-950 p-2 border border-white/20">
              <img
                src={selectedImage}
                alt="Enlarged gallery view"
                className="max-w-full max-h-[85vh] object-contain rounded-xl mx-auto"
              />
              <p className="text-center text-xs text-slate-400 mt-2">
                Click anywhere to close
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
