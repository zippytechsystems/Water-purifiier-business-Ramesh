import React, { useState, useRef } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { GALLERY_DATA, BUSINESS_INFO } from '../data/mockData';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Maximize2, 
  Video, 
  Image as ImageIcon, 
  ZoomIn, 
  CheckCircle, 
  MessageCircle, 
  PhoneCall,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Video State
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleLoop = () => {
    if (videoRef.current) {
      videoRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const tabs = [
    { id: 'all', labelEn: 'All Showroom Assets', labelTe: 'అన్ని షోరూమ్ ఫోటోలు' },
    { id: 'showroom', labelEn: 'Purifiers & Store', labelTe: 'వాటర్ ప్యూరిఫైయర్లు' },
    { id: 'products', labelEn: 'AC Spares & Appliances', labelTe: 'స్పేర్ పార్ట్స్ & అప్లయన్సెస్' },
    { id: 'purity', labelEn: 'Mineral Technology', labelTe: 'మినరల్ టెక్నాలజీ' },
  ];

  // Filter out any potential host portrait so that ONLY clean product/showroom equipment is rendered
  const cleanGallery = GALLERY_DATA.filter(
    item => !item.imageUrl.includes('frame-01') && !item.imageUrl.includes('frame-08') && !item.imageUrl.includes('frame-12') && !item.imageUrl.includes('frame-13')
  );

  const filteredGallery = activeTab === 'all'
    ? cleanGallery
    : cleanGallery.filter(g => g.category === activeTab);

  return (
    <div className="w-full py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3 shadow-xs">
            <Video className="w-3.5 h-3.5 text-cyan-600" />
            <span>{t("Official Business Showcase", "అధికారిక వీడియో & షోరూమ్ ప్రదర్శన")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Showroom Video & Product Gallery", "షోరూమ్ వీడియో & ప్రదర్శన")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Watch our verified business presentation and browse genuine purifier models, spare parts, and home appliances at Priya's AquaFresh, Raghunathpally.",
              "మా అధికారిక షోరూమ్ ప్రదర్శన వీడియో మరియు ప్రియాస్ ఆక్వాఫ్రెష్ వాటర్ ప్యూరిఫైయర్లు, స్పేర్ పార్ట్స్ ప్రదర్శనను ఇక్కడ చూడండి."
            )}
          </p>
        </div>

        {/* ======================================================= */}
        {/* FEATURED PROMOTIONAL VIDEO PLAYER                       */}
        {/* ======================================================= */}
        <div className="mb-16">
          <div className="bg-slate-950 rounded-3xl p-3 sm:p-5 border border-slate-800 shadow-2xl overflow-hidden">
            {/* Top Video Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 mb-2 border-b border-slate-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-bold text-white tracking-wide">
                  {t("Priya's AquaFresh – Promotional Video", "ప్రియాస్ ఆక్వాఫ్రెష్ అధికారిక పరిచయ వీడియో")}
                </span>
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50 text-[10px] font-semibold">
                  HD 1080p
                </span>
              </div>

              {/* Loop & Audio indicators */}
              <div className="flex items-center gap-2 text-slate-400">
                <button
                  onClick={toggleLoop}
                  title={isLooping ? "Auto-Loop ON" : "Auto-Loop OFF"}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                    isLooping ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <RotateCcw className={`w-3 h-3 ${isLooping ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{isLooping ? t("Loop Active", "లూప్ ఆన్") : t("Loop Off", "లూప్ ఆఫ్")}</span>
                </button>
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
                <button
                  onClick={handleFullscreen}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative aspect-video max-h-[580px] w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center group">
              <video
                ref={videoRef}
                src="/videos/promotional-video.mp4"
                poster="/images/gallery/frame-04-purifier-display.png"
                playsInline
                loop={isLooping}
                muted={isMuted}
                controls
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full object-contain bg-black"
              />

              {/* Play / Pause Center Overlay */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-opacity z-10"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-slate-950 ml-1" />
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Video Quick Action Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {t(
                    "Featuring Water Purifier Models, Refrigerators, Washing Machines & AC Spares",
                    "వాటర్ ప్యూరిఫైయర్లు, ఫ్రిడ్జ్ లు, వాషింగ్ మెషిన్లు & AC స్పేర్ పార్ట్స్ ప్రదర్శన"
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent("Hello Priya's AquaFresh, I watched your official showroom video and would like to enquire about water purifier sales and service.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t("Enquire on WhatsApp", "వాట్సాప్ ఎంక్వైరీ")}</span>
                </a>
                <button
                  onClick={() => onNavigate('service-booking')}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  <span>{t("Book Service", "సర్వీస్ బుకింగ్")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* VERIFIED SHOWROOM & PRODUCTS PHOTO COLLECTION           */}
        {/* ======================================================= */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{t("Showroom Equipment Gallery", "షోరూమ్ ఫోటోల విభాగం")}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t("Pure Water Systems & Showroom Displays", "వాటర్ ప్యూరిఫైయర్ల ఫోటో ప్రదర్శన")}
              </h2>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {isTelugu ? tab.labelTe : tab.labelEn}
                </button>
              ))}
            </div>
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
                    loading="lazy"
                    decoding="async"
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
