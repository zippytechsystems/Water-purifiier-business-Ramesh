import React, { useState, useRef, useEffect } from 'react';
import { PageRoute, Product, ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useSmoothScroll } from '../context/SmoothScrollContext';
import { BUSINESS_INFO, PRODUCTS_DATA, SERVICES_DATA, REVIEWS_DATA, SERVICE_AREAS_DATA } from '../data/mockData';
import { getProductWhatsAppUrl, getServiceEnquiryWhatsAppUrl, getGeneralWhatsAppUrl, getDirectWhatsAppBookingUrl } from '../utils/whatsapp';
import { 
  Droplets, 
  ShieldCheck, 
  Wrench, 
  Award, 
  PhoneCall, 
  MessageCircle, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle, 
  Star, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  MapPin, 
  ExternalLink,
  Sparkles,
  ArrowRight,
  Filter,
  Layers,
  HeartHandshake,
  Navigation,
  Clock,
  Home,
  Download,
  CalendarCheck,
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectService?: (serviceName: string) => void;
  onOpenInstallModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectService, onOpenInstallModal }) => {
  const { isTelugu, t } = useLanguage();
  const { scrollToTop } = useSmoothScroll();

  // Service Areas filter state
  const [areaFilter, setAreaFilter] = useState<'all' | 'primary' | 'hub' | 'village'>('all');

  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Hero Image Carousel State
  const [heroSlide, setHeroSlide] = useState(0);
  const [isHeroAutoPlay, setIsHeroAutoPlay] = useState(true);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const heroTouchStartX = useRef<number | null>(null);
  const heroTouchEndX = useRef<number | null>(null);

  // FAQ Accordion State & Search Keyword Questions for #1 Google Local Ranking
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const localFaqs = [
    {
      id: 'faq-1',
      qEn: "Where can I get the best water purifier in Ragunadhpally & RO service?",
      qTe: "రఘునాథపల్లిలో బెస్ట్ వాటర్ ప్యూరిఫైయర్ సేల్స్ & RO సర్వీస్ ఎక్కడ లభిస్తుంది?",
      aEn: "Lasya Water Purifier (PURE Priya's AquaFresh) on Khilashapur Road, Raghunathpally (506244) is the #1 showroom & service center. We provide instant doorstep delivery, 1-Year Guarantee on new purifiers, filter replacement, and repairs within 30-60 minutes across Raghunathpally village. Call 9014357848 or WhatsApp 9182857848.",
      aTe: "ఖిలాషాపూర్ రోడ్, రఘునాథపల్లి (506244) వద్ద ఉన్న లాస్య వాటర్ ప్యూరిఫైయర్ (ప్యూర్ ప్రియాస్ ఆక్వాఫ్రెష్) రఘునాథపల్లి మరియు పరిసర ప్రాంతాలలో అత్యంత నమ్మకమైన నెంబర్ 1 వాటర్ ప్యూరిఫైయర్ షోరూమ్. కొత్త మెషిన్లపై 1 ఇయర్ గ్యారంటీ, 30-60 నిమిషాల్లో డోర్‌స్టెప్ రిపేర్ & ఫిల్టర్ రీప్లేస్‌మెంట్ సదుపాయం కలదు. కాల్: 9014357848.",
      whatsappText: "Hello Ramesh garu, I need Water Purifier Sales / Service in Ragunadhpally village."
    },
    {
      id: 'faq-2',
      qEn: "Do you provide water purifier sales and repair in Janagoan and surrounding circle?",
      qTe: "జనగామ మరియు చుట్టుపక్కల సర్కిల్‌లో వాటర్ ప్యూరిఫైయర్ సేల్స్ మరియు సర్వీస్ అందిస్తారా?",
      aEn: "Yes, Lasya Water Purifier provides prompt doorstep sales, installation, and repair across Jangaon town and the total Jangaon circle including Station Ghanpur, Zaffergadh, Lingala Ghanpur, Bachannapet, and Devaruppula. Genuine RO membranes, filters, and booster pumps always in stock.",
      aTe: "అవును, జనగామ టౌన్ మరియు జనగామ సర్కిల్ మొత్తానికి (స్టేషన్ ఘన్‌పూర్, జాఫర్‌గఢ్, లింగాల ఘన్‌పూర్, బచ్చన్నపేట, దేవరుప్పుల) వేగవంతమైన డోర్‌స్టెప్ వాటర్ ప్యూరిఫైయర్ సర్వీస్, అసలైన ఫిల్టర్ల మార్పిడి మరియు కొత్త మెషీన్ల డెలివరీ అందిస్తున్నాము.",
      whatsappText: "Hello Ramesh garu, I need Water Purifier Sales / Service in Jangaon circle."
    },
    {
      id: 'faq-3',
      qEn: "How to find near by water purify and repair service in Raghunathpally circle?",
      qTe: "రఘునాథపల్లి సర్కిల్‌లో దగ్గరలో ఉన్న (Near By) వాటర్ ప్యూరిఫైయర్ సర్వీస్ ఎలా బుక్ చేయాలి?",
      aEn: "If you search for 'near by water purify' or 'water purifier repair near me' in Raghunathpally or Jangaon circle, Lasya Water Purifier on Khilashapur Road is your closest direct service center. Simply call 9014357848 or send a WhatsApp message to 9182857848 for a 30-minute technician dispatch.",
      aTe: "రఘునాథపల్లి లేదా జనగామ సర్కిల్ లో మీ ఇంటికి దగ్గరలో నమ్మకమైన వాటర్ ప్యూరిఫైయర్ సర్వీస్ కావాలంటే, ఖిలాషాపూర్ రోడ్డులోని లాస్య వాటర్ ప్యూరిఫైయర్ కు కాల్ 9014357848 లేదా వాట్సాప్ 9182857848 ద్వారా వెంటనే టెక్నీషియన్‌ను బుక్ చేసుకోవచ్చు.",
      whatsappText: "Hello Ramesh garu, I am looking for near by water purifier technician."
    },
    {
      id: 'faq-4',
      qEn: "Which villages are covered in the total Raghunathpally circle?",
      qTe: "టోటల్ రఘునాథపల్లి సర్కిల్‌లోని ఏయే గ్రామాలకు డోర్‌స్టెప్ సర్వీస్ వస్తుంది?",
      aEn: "We provide 100% doorstep coverage for all villages across Raghunathpally mandal and circle, including Raghunathpally village, Khilashapur Road, Kanchanpally, Madharam, Ashwaraopally, Gabbeta, Veldi, Ibrahimbad, Kaloor, Kodavatoor, Mundrai, and Nidigonda with free water TDS testing.",
      aTe: "రఘునాథపల్లి విలేజ్, ఖిలాషాపూర్, కంచనపల్లి, మాదారం, అశ్వరావుపల్లి, గబ్బెట, వెల్ది, ఇబ్రహీంబాద్, కాలూర్, కొడవటూరు, ముండ్రాయి, నిడిగొండ సహా రఘునాథపల్లి సర్కిల్‌లోని ప్రతి గ్రామానికి మా డోర్‌స్టెప్ టెక్నీషియన్ సర్వీస్ అందుబాటులో ఉంటుంది.",
      whatsappText: "Hello Ramesh garu, I need RO Service in my village in Raghunathpally circle."
    },
    {
      id: 'faq-5',
      qEn: "What warranty and service guarantee do you provide on new water purifiers?",
      qTe: "కొత్త వాటర్ ప్యూరిఫైయర్లపై ఎలాంటి గ్యారంటీ & సర్వీస్ సపోర్ట్ ఉంటుంది?",
      aEn: "We provide an official 1-Year Guarantee on qualifying domestic and commercial water purifiers, along with free doorstep installation, water TDS testing, 100% original RO membranes, and dependable post-sales support directly from our Raghunathpally showroom.",
      aTe: "మేము అందించే అన్ని డొమెస్టిక్ మరియు కమర్షియల్ వాటర్ ప్యూరిఫైయర్లపై 1 ఇయర్ అధికారిక గ్యారంటీ, ఉచిత ఇన్స్టాలేషన్, వాటర్ TDS టెస్టింగ్ మరియు 100% అసలైన RO స్పేర్ పార్ట్స్ గ్యారంటీ ఇవ్వబడును.",
      whatsappText: "Hello Ramesh garu, I want to know about 1-Year Guarantee Water Purifiers."
    }
  ];

  // 4 Featured Showcase Slides for Water Purifiers & Services
  const heroSlides = [
    {
      id: 'slide-1',
      image: '/images/brand/purifier-hero-slide-2.jpg',
      badgeEn: 'Smart Digital RO • Pure Mineral',
      badgeTe: 'స్మార్ట్ RO • ప్యూర్ మినరల్',
      titleEn: "Priya's AquaFresh Sleek Wall-Mount RO",
      titleTe: "ప్రియాస్ ఆక్వాఫ్రెష్ స్లీక్ వాల్-మౌంట్ RO",
      highlightEn: 'Multi-stage RO + UV purification with active copper infusion & digital pure water indicator',
      highlightTe: 'మల్టీ-స్టేజ్ RO + UV మరియు కాపర్ ఇన్ఫ్యూషన్ తో స్వచ్ఛమైన తాగునీరు',
      ctaTextEn: 'Explore Purifiers',
      ctaTextTe: 'ప్రాడక్ట్స్ చూడండి',
      targetPage: 'water-purifiers' as PageRoute,
      accent: 'cyan'
    },
    {
      id: 'slide-2',
      image: '/images/brand/purifier-hero-slide-3.jpg',
      badgeEn: 'Advanced 6-Stage Filtration',
      badgeTe: 'అడ్వాన్స్‌డ్ 6-స్టేజ్ ఫిల్ట్రేషన్',
      titleEn: 'Heavy-Duty Multi-Stage RO Filtration',
      titleTe: 'హెవీ-డ్యూటీ RO వాటర్ ప్యూరిఫైయర్',
      highlightEn: 'High-rejection thin-film membrane for high TDS borewell & tap water with transparent filter bowls',
      highlightTe: 'బోరు నీటిలోని ఉప్పు, బ్యాక్టీరియా మరియు లవణాల సంపూర్ణ నివారణ',
      ctaTextEn: 'View Specifications',
      ctaTextTe: 'వివరాలు చూడండి',
      targetPage: 'water-purifiers' as PageRoute,
      accent: 'sky'
    },
    {
      id: 'slide-3',
      image: '/images/brand/hero-water-purifiers.jpg',
      badgeEn: '1 Year Guaranty • Best Selling',
      badgeTe: '1 ఇయర్ గ్యారంటీ • బెస్ట్ సెల్లింగ్',
      titleEn: "Priya's AquaFresh Domestic & Commercial",
      titleTe: 'ప్రియాస్ ఆక్వాఫ్రెష్ డొమెస్టిక్ & కమర్షియల్',
      highlightEn: 'All types of water purifiers with 1-Year Guaranty, food-grade storage & continuous service',
      highlightTe: 'అన్ని రకాల వాటర్ ప్యూరిఫైయర్లపై 1 ఇయర్ గ్యారంటీ & స్థానిక విశ్వసనీయ సేవలు',
      ctaTextEn: 'WhatsApp Booking',
      ctaTextTe: 'వాట్సాప్ లో బుక్ చేయండి',
      isWhatsApp: true,
      targetPage: 'water-purifiers' as PageRoute,
      accent: 'emerald'
    },
    {
      id: 'slide-4',
      image: '/images/brand/purifier-hero-slide-4.jpg',
      badgeEn: 'Doorstep Service • Raghunathpally & Jangaon',
      badgeTe: 'డోర్‌స్టెప్ సర్వీస్ • రఘునాథపల్లి & జనగామ',
      titleEn: 'Expert Doorstep Service & Maintenance',
      titleTe: 'నిపుణులైన సర్వీస్ & త్వరిత రిపేర్లు',
      highlightEn: 'Experienced technicians for leak fixes, filter replacements, and instant diagnostics at your home',
      highlightTe: 'డోర్‌స్టెప్ ఇన్స్టాలేషన్, జనరల్ సర్వీస్ మరియు ఒరిజినల్ స్పేర్ పార్ట్స్ సదుపాయం',
      ctaTextEn: 'Book Doorstep Service',
      ctaTextTe: 'సర్వీస్ బుకింగ్',
      targetPage: 'service-booking' as PageRoute,
      accent: 'cyan'
    }
  ];

  // Auto-slide effect (cycles every 4500ms)
  useEffect(() => {
    if (!isHeroAutoPlay || isHeroHovered) return;
    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHeroAutoPlay, isHeroHovered, heroSlides.length]);

  const handleNextHeroSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevHeroSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleHeroTouchStart = (e: React.TouchEvent) => {
    heroTouchStartX.current = e.touches[0].clientX;
  };

  const handleHeroTouchMove = (e: React.TouchEvent) => {
    heroTouchEndX.current = e.touches[0].clientX;
  };

  const handleHeroTouchEnd = () => {
    if (heroTouchStartX.current !== null && heroTouchEndX.current !== null) {
      const diff = heroTouchStartX.current - heroTouchEndX.current;
      if (diff > 45) {
        handleNextHeroSlide();
      } else if (diff < -45) {
        handlePrevHeroSlide();
      }
    }
    heroTouchStartX.current = null;
    heroTouchEndX.current = null;
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleBookService = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    onNavigate('service-booking');
    scrollToTop(false);
  };

  // Reusable Hero Carousel subcomponent (rendered on desktop and mobile)
  const renderHeroCarousel = () => (
    <div className="relative w-full max-w-2xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-cyan-500/30 glass-card-dark p-2 sm:p-2.5 group select-none">
      {/* Outer Ambient Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-sky-600/20 to-emerald-500/20 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 -z-10 pointer-events-none"></div>

      {/* Carousel Viewport (Bigger, Taller, Wide Aspect) */}
      <div
        className="relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] min-h-[360px] xs:min-h-[390px] sm:min-h-[440px] lg:min-h-[470px] rounded-2xl overflow-hidden bg-slate-950"
        onMouseEnter={() => setIsHeroHovered(true)}
        onMouseLeave={() => setIsHeroHovered(false)}
        onTouchStart={handleHeroTouchStart}
        onTouchMove={handleHeroTouchMove}
        onTouchEnd={handleHeroTouchEnd}
      >
        {/* All Slides with Cross-Fade */}
        {heroSlides.map((slide, idx) => {
          const isActive = idx === heroSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
                isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
              aria-hidden={!isActive}
            >
              {/* Background Purifier Image with High-Priority LCP for Slide 1 */}
              <img
                src={slide.image}
                alt={slide.titleEn}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                loading={idx === 0 ? "eager" : "lazy"}
                fetchPriority={idx === 0 ? "high" : "low"}
                width="1200"
                height="800"
              />
              
              {/* Multilayer gradient scrims for pristine text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent"></div>

              {/* Slide Top Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 flex items-center gap-2 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-slate-950/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isTelugu ? slide.badgeTe : slide.badgeEn}</span>
                </span>
              </div>

              {/* Slide Bottom Glassmorphic Content Card */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 shadow-2xl z-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1 max-w-md text-left">
                    <p className="text-[11px] uppercase font-extrabold text-cyan-400 tracking-wider flex items-center gap-1.5">
                      <Droplets className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{isTelugu ? 'ప్యూర్ ఆక్వాఫ్రెష్' : "Priya's AquaFresh Collection"}</span>
                    </p>
                    <p className="text-white text-base sm:text-lg lg:text-xl font-extrabold leading-snug">
                      {isTelugu ? slide.titleTe : slide.titleEn}
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                      {isTelugu ? slide.highlightTe : slide.highlightEn}
                    </p>
                  </div>

                  {/* Direct Action Button on Slide with Strict Focus Control */}
                  <div className="shrink-0 flex items-center gap-2">
                    {slide.isWhatsApp ? (
                      <a
                        href={getGeneralWhatsAppUrl(isTelugu)}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`WhatsApp Enquiry: ${slide.titleEn}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-md transition-all flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-700" />
                        <span>{isTelugu ? 'వాట్సాప్' : 'WhatsApp'}</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          onNavigate(slide.targetPage);
                          scrollToTop(false);
                        }}
                        tabIndex={isActive ? 0 : -1}
                        aria-label={`${slide.ctaTextEn}: ${slide.titleEn}`}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{isTelugu ? slide.ctaTextTe : slide.ctaTextEn}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Floating 1-Year Guarantee Badge pinned on top-right */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-18 h-18 sm:w-20 sm:h-20 rounded-full shadow-2xl p-1 bg-gradient-to-tr from-amber-400 to-yellow-300 animate-float z-30 pointer-events-none">
          <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-1 border border-yellow-400/50">
            <span className="text-[9.5px] sm:text-[10px] font-bold text-yellow-400 leading-none">1 YEAR</span>
            <span className="text-[7.5px] sm:text-[8px] font-extrabold text-white uppercase tracking-tighter">GUARANTY</span>
            <div className="flex gap-0.5 mt-0.5">
              <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
              <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
              <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Previous Slide Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevHeroSlide();
          }}
          aria-label="Previous Slide"
          className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 z-30 opacity-80 hover:opacity-100 cursor-pointer shadow-lg active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Slide Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNextHeroSlide();
          }}
          aria-label="Next Slide"
          className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-950/60 hover:bg-cyan-500 text-white hover:text-slate-950 border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 z-30 opacity-80 hover:opacity-100 cursor-pointer shadow-lg active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicator Bar & Autoplay Toggle */}
        <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 z-30">
          <div className="flex items-center gap-1.5">
            {heroSlides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setHeroSlide(dotIdx)}
                aria-label={`Go to slide ${dotIdx + 1}`}
                className="p-2 flex items-center justify-center cursor-pointer focus:outline-none"
              >
                <span
                  className={`block transition-all duration-300 rounded-full ${
                    dotIdx === heroSlide
                      ? 'w-7 sm:w-8 h-1.5 bg-gradient-to-r from-cyan-400 to-emerald-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : 'w-2 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="h-3 w-px bg-white/20 mx-0.5"></div>
          <button
            onClick={() => setIsHeroAutoPlay(!isHeroAutoPlay)}
            title={isHeroAutoPlay ? "Pause Auto-slide" : "Play Auto-slide"}
            className="text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {isHeroAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <span className="text-[10px] font-mono text-cyan-300 font-semibold tracking-wider">
            0{heroSlide + 1}/0{heroSlides.length}
          </span>
        </div>

        {/* Animated Progress Bar along the bottom of the card */}
        {isHeroAutoPlay && !isHeroHovered && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-900/60 z-30 overflow-hidden">
            <div
              key={heroSlide}
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 animate-hero-progress"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* ======================================================= */}
      {/* SECTION 1: HERO SECTION                                 */}
      {/* ======================================================= */}
      <section className="relative overflow-hidden bg-hero-mesh text-white pt-10 pb-16 lg:pt-14 lg:pb-24">
        {/* Decorative Floating Droplets & Glows */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
            {/* Left Column: Headlines, Highlights & CTAs */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-inner backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t("Lasya Water Purifier – #1 in Ragunadhpally & Jangaon Circle", "లాస్య వాటర్ ప్యూరిఫైయర్ – రఘునాథపల్లి & జనగామ సర్కిల్ #1")}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t("Pure Water.", "స్వచ్ఛమైన నీరు.")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-300">
                  {t("Healthy Life.", "ఆరోగ్యకరమైన జీవితం.")}
                </span>
              </h1>

              {/* Mobile Only: Big Auto-Sliding Purifier Carousel placed right below options & headline */}
              <div className="block lg:hidden w-full pt-2 pb-2">
                {renderHeroCarousel()}
              </div>

              {/* Subheadline */}
              <p className="text-base sm:text-xl font-semibold text-slate-200 leading-snug">
                {t(
                  BUSINESS_INFO.subheadlineEn,
                  BUSINESS_INFO.subheadlineTe
                )}
              </p>

              {/* Supporting Description */}
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                {t(
                  BUSINESS_INFO.supportingTextEn,
                  BUSINESS_INFO.supportingTextTe
                )}
              </p>

              {/* Guarantee Highlight Banner */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center gap-3 backdrop-blur-md max-w-lg mx-auto lg:mx-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-left text-xs sm:text-sm">
                  <p className="font-bold text-white">
                    {t("1 Year Guaranty on Water Purifiers", "వాటర్ ప్యూరిఫైయర్లపై 1 ఇయర్ గ్యారంటీ")}
                  </p>
                  <p className="text-slate-400 text-xs">
                    {t("Special discounts & trusted local technical support in Raghunathpally.", "భారీ డిస్కౌంట్లు & రఘునాథపల్లిలో నమ్మకమైన స్థానిక సర్వీస్.")}
                  </p>
                </div>
              </div>

              {/* Primary Call to Actions */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
                {/* Explore Products */}
                <button
                  onClick={() => onNavigate('water-purifiers')}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>{t("Explore Products", "ప్రాడక్ట్స్ చూడండి")}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Book a Service */}
                <button
                  onClick={() => onNavigate('service-booking')}
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <span>{t("Book a Service", "సర్వీస్ బుకింగ్")}</span>
                </button>

                {/* WhatsApp Us */}
                <a
                  href={getGeneralWhatsAppUrl(isTelugu)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact Lasya Water Purifier on WhatsApp"
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg hover:shadow-emerald-700/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
                  <span>{t("WhatsApp Us", "వాట్సాప్")}</span>
                </a>
              </div>

              {/* Verified Features Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Doorstep Service</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Genuine Filters & Spares</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Raghunathpally & Jangaon Area</span>
                </span>
              </div>
            </div>

            {/* Right Column: Hero Showcase Visual Carousel (Desktop & Tablet) */}
            <div className="hidden lg:flex lg:col-span-6 relative justify-center w-full">
              {renderHeroCarousel()}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 1.5: MOBILE SCREEN 5 ESSENTIAL QUICK OPTIONS    */}
      {/* 1. Home Page | 2. Sales & Services | 3. Booking | 4. Install App | 5. WhatsApp Booking */}
      {/* ======================================================= */}
      <section className="lg:hidden w-full bg-slate-900 border-y border-cyan-500/30 px-3 sm:px-4 py-3 shadow-xl">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isTelugu ? 'ముఖ్యమైన ఆప్షన్లు' : 'Quick Options'}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              {isTelugu ? 'రఘునాథపల్లి & జనగామ' : "Priya's AquaFresh"}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {/* 1. Home Page */}
            <button
              onClick={() => {
                onNavigate('home');
                scrollToTop(false);
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-cyan-500/20 to-blue-600/30 text-cyan-300 ring-1 ring-cyan-400/50 shadow-sm transition-all active:scale-95 cursor-pointer"
              title="Home Page"
            >
              <Home className="w-4 h-4 mb-1 text-cyan-400" />
              <span className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight truncate w-full text-center">
                {isTelugu ? 'హోమ్' : 'Home'}
              </span>
            </button>

            {/* 2. Sales & Services */}
            <button
              onClick={() => {
                onNavigate('services');
                scrollToTop(false);
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700/80 transition-all active:scale-95 cursor-pointer"
              title="Sales and Services"
            >
              <Wrench className="w-4 h-4 mb-1 text-cyan-400" />
              <span className="text-[9px] sm:text-[10px] font-bold leading-tight truncate w-full text-center">
                {isTelugu ? 'సేల్స్ & సర్వీస్' : 'Services'}
              </span>
            </button>

            {/* 3. Booking */}
            <button
              onClick={() => {
                onNavigate('service-booking');
                scrollToTop(false);
              }}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700/80 transition-all active:scale-95 cursor-pointer"
              title="Book Service"
            >
              <CalendarCheck className="w-4 h-4 mb-1 text-sky-400" />
              <span className="text-[9.5px] sm:text-[10.5px] font-bold leading-tight truncate w-full text-center">
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
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-700/70 shadow-xs transition-all active:scale-95 cursor-pointer"
              title="Install App"
            >
              <Download className="w-4 h-4 mb-1 text-cyan-400 animate-bounce" />
              <span className="text-[9px] sm:text-[10px] font-bold leading-tight truncate w-full text-center text-cyan-300">
                {isTelugu ? 'ఇన్‌స్టాల్' : 'Install App'}
              </span>
            </button>

            {/* 5. WhatsApp Booking */}
            <a
              href={getDirectWhatsAppBookingUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700/70 shadow-xs transition-all active:scale-95"
              title="WhatsApp Booking"
            >
              <MessageCircle className="w-4 h-4 mb-1 fill-emerald-400 text-emerald-950" />
              <span className="text-[9px] sm:text-[10px] font-bold leading-tight truncate w-full text-center text-emerald-300">
                {isTelugu ? 'వాట్సాప్' : 'WhatsApp'}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 2: BUSINESS HIGHLIGHTS                          */}
      {/* ======================================================= */}
      <section className="py-14 bg-white border-b border-slate-200 scroll-defer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-100 shadow-xs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center mb-4 shadow-md shadow-cyan-600/20">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                {t("Quality Water Purifiers", "నాణ్యమైన వాటర్ ప్యూరిఫైయర్లు")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t(
                  "High rejection RO, UV, and multi-stage purification systems eliminating bacteria, heavy metals, and high TDS.",
                  "బోరు మరియు ట్యాప్ నీటిలోని లవణాలు, కాలుష్యాలను తొలగించి స్వచ్ఛమైన నీటిని అందించే ప్యూరిఫైయర్లు."
                )}
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-xs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-600/20">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                {t("Professional Service", "నిపుణులైన సర్వీస్")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t(
                  "Experienced technicians for precision wall-mounting, leak fixes, filter changes, and circuit diagnostics.",
                  "అనుభవజ్ఞులైన టెక్నీషియన్లతో డోర్‌స్టెప్ ఇన్స్టాలేషన్, జనరల్ సర్వీస్ మరియు త్వరిత రిపేర్ సదుపాయం."
                )}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 shadow-xs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                {t("Genuine Spare Parts", "అసలైన స్పేర్ పార్ట్స్")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t(
                  "Original membranes, sediment candles, carbon filters, booster pumps, adapters, and AC components in stock.",
                  "అన్ని రకాల ప్యూరిఫైయర్లు మరియు అప్లయన్సెస్ కు సరిపోయే ఒరిజినల్ స్పేర్ పార్ట్స్ నిరంతరం లభ్యం."
                )}
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-50 to-white border border-sky-100 shadow-xs hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4 shadow-md shadow-slate-900/20">
                <HeartHandshake className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                {t("Customer Support", "కస్టమర్ ఫ్రెండ్లీ సపోర్ట్")}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {t(
                  "Fast response on Call & WhatsApp: 9014357848 & 9182857848 for Raghunathpally & Jangaon families.",
                  "కాల్ మరియు వాట్సాప్ ద్వారా సులభమైన సహాయం మరియు వేగవంతమైన కస్టమర్ రెస్పాన్స్."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 3: OUR PRODUCTS                                 */}
      {/* ======================================================= */}
      <section className="py-20 bg-slate-50 scroll-defer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 mb-1.5 block">
                {t("Product Catalogue", "మా ప్రాడక్ట్స్")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {t("Water Purifiers & Home Appliances", "వాటర్ ప్యూరిఫైయర్లు & హోమ్ అప్లయన్సెస్")}
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-md mt-2 md:mt-0">
              {t(
                "All types of water purifiers, fridges, washing machines, air coolers, and AC spares available under one roof.",
                "అన్ని రకాల వాటర్ ప్యూరిఫైయర్లు, ఫ్రిడ్జ్ లు, వాషింగ్ మెషిన్లు, ఎయిర్ కూలర్లు, AC స్పేర్ పార్ట్స్ అందుబాటులో కలవు."
              )}
            </p>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS_DATA.slice(0, 8).map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 bg-slate-100 overflow-hidden p-4 flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.nameEn}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="300"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-white shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  {product.warrantyEn && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      1 Year Guaranty
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 block mb-1">
                      {product.subCategory || product.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-cyan-700 transition-colors">
                      {isTelugu ? product.nameTe : product.nameEn}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      {isTelugu ? product.descriptionTe : product.descriptionEn}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    {/* User requirement: Direct WhatsApp Business sell/enquire */}
                    <a
                      href={getProductWhatsAppUrl(product, isTelugu)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${product.nameEn} on WhatsApp`}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-700" />
                      <span>{t("Enquire on WhatsApp", "వాట్సాప్ లో ధర అడగండి")}</span>
                    </a>

                    <button
                      onClick={() => onNavigate('water-purifiers')}
                      className="w-full py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer text-center"
                    >
                      {t("View Details", "వివరాలు చూడండి")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('water-purifiers')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all cursor-pointer"
            >
              <span>{t("View Full Product & Appliance Catalogue", "పూర్తి ప్రాడక్ట్స్ కేటలాగ్ చూడండి")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 4: OUR SERVICES                                 */}
      {/* ======================================================= */}
      <section className="py-20 bg-white scroll-defer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 mb-2 block">
              {t("Professional Solutions", "మా సేవలు")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              {t("Water Purifier Repair, Maintenance & Installation", "వాటర్ ప్యూరిఫైయర్ సర్వీస్ & రిపేర్లు")}
            </h2>
            <p className="text-sm text-slate-600">
              {t(
                "All types of water purifiers serviced and repaired with genuine parts and verified technicians in Raghunathpally and Jangaon district.",
                "అన్ని రకాల వాటర్ ప్యూరిఫైయర్లకు సర్వీస్ మరియు రిపేర్లు చేయబడును. ఒరిజినల్ స్పేర్ పార్ట్స్ మాత్రమే వాడబడును."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((service) => (
              <div 
                key={service.id}
                className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-cyan-200 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-600/10 text-cyan-700 flex items-center justify-center mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {isTelugu ? service.titleTe : service.titleEn}
                  </h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {isTelugu ? service.descriptionTe : service.descriptionEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Est. Time:</span>
                    <span className="font-semibold text-slate-700">{service.estimatedTime}</span>
                  </div>

                  <button
                    onClick={() => handleBookService(service.titleEn)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    {t("Book Service", "సర్వీస్ బుక్ చేయండి")}
                  </button>

                  <a
                    href={getServiceEnquiryWhatsAppUrl(service.titleEn, isTelugu)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`WhatsApp Enquiry for ${service.titleEn}`}
                    className="w-full py-2 rounded-xl border border-emerald-700/50 text-emerald-800 hover:bg-emerald-50 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Enquiry</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 5: WHY CHOOSE US?                               */}
      {/* ======================================================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden scroll-defer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 block">
                {t("Customer First Promise", "మా ప్రత్యేకతలు")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                {t("Why Choose Priya's AquaFresh & Lasya Water Purifiers?", "మమ్మల్ని ఎందుకు ఎంచుకోవాలి?")}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t(
                  "We believe that clean and pure drinking water is the foundational necessity for every healthy family. We don't just sell water purifiers; we provide lifelong reliable doorstep service and original replacement parts.",
                  "స్వచ్ఛమైన తాగునీరు ప్రతి కుటుంబ ఆరోగ్యానికి పునాది. మేము కేవలం ప్యూరిఫైయర్లు అమ్మడమే కాకుండా, నమ్మకమైన డోర్‌స్టెప్ సర్వీస్ మరియు ఒరిజినల్ స్పేర్ పార్ట్స్ సపోర్ట్ అందిస్తాము."
                )}
              </p>

              <div className="pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Us: {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  titleEn: "Experienced Technical Support",
                  titleTe: "అనుభవజ్ఞులైన టెక్నీషియన్లు",
                  descEn: "Trained professionals with deep understanding of rural & urban water quality issues."
                },
                {
                  titleEn: "Quality Products",
                  titleTe: "నాణ్యమైన వాటర్ ప్యూరిఫైయర్లు",
                  descEn: "Heavy-duty domestic and commercial purifiers with food-grade tanks."
                },
                {
                  titleEn: "Reliable Service",
                  titleTe: "సకాలంలో డోర్‌స్టెప్ సర్వీస్",
                  descEn: "Fast turnaround times on breakdown repairs and routine maintenance."
                },
                {
                  titleEn: "Spare Parts Availability",
                  titleTe: "ఒరిజినల్ స్పేర్ పార్ట్స్ లభ్యం",
                  descEn: "100% genuine filters, membranes, booster pumps, adapters, and AC spares in stock."
                },
                {
                  titleEn: "Customer-Friendly Support",
                  titleTe: "కస్టమర్ ఫ్రెండ్లీ సపోర్ట్",
                  descEn: "Clear, transparent advice without false promises or forced part replacements."
                },
                {
                  titleEn: "Local Service Assistance",
                  titleTe: "స్థానిక సేవా సహకారం",
                  descEn: "Located right on Khilashapur Road, Raghunathpally – always accessible when needed."
                }
              ].map((item, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex flex-col justify-start">
                  <div className="flex items-center gap-2 mb-2 text-cyan-400 font-bold text-sm">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{isTelugu ? item.titleTe : item.titleEn}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 6: WARRANTY & GUARANTEE                         */}
      {/* ======================================================= */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-900 text-white relative scroll-defer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col lg:flex-row items-center gap-8 justify-between shadow-2xl">
            <div className="flex items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
              {/* 1 Year Guaranty Badge Cropped from Poster */}
              <div className="w-24 h-24 rounded-2xl bg-amber-400/20 p-2 border border-amber-400/40 flex items-center justify-center shrink-0">
                <img
                  src="/images/brand/one-year-guarantee-badge.png"
                  alt="1 Year Guarantee Badge"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  {t("Client Guarantee & Transparency", "వారంటీ & గ్యారంటీ వివరాలు")}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {t("1 Year Guaranty on Eligible Water Purifiers", "వాటర్ ప్యూరిఫైయర్లపై 1 ఇయర్ గ్యారంటీ లభిస్తుంది")}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {t(
                    "Our promotional guarantee covers qualifying water purifier units against manufacturing and component defects. Actual warranty scope depends on product model and specific manufacturer/business warranty terms.",
                    "మా వద్ద లభించే వాటర్ ప్యూరిఫైయర్లకు మోడల్ నిబంధనల ప్రకారం 1 ఇయర్ గ్యారంటీ లభిస్తుంది. పూర్తి వివరాలకు మా ప్రతినిధిని సంప్రదించండి."
                  )}
                </p>
              </div>
            </div>

            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm whitespace-nowrap shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {t("Ask Warranty Details on WhatsApp", "వారంటీ వివరాలు వాట్సాప్ లో అడగండి")}
            </a>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 7: PROMOTIONAL VIDEO                            */}
      {/* ======================================================= */}
      <section className="py-20 bg-slate-900 text-white scroll-defer">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400 mb-2 block">
              {t("Official Business Video", "షోరూమ్ & ప్రాడక్ట్ వీడియో")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              {t("Watch Priya's AquaFresh in Action", "ప్రియాస్ ఆక్వాఫ్రెష్ పరిచయ వీడియో చూడండి")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t(
                "Experience our showroom collection, water purifier features, and customer commitment directly from our business representative.",
                "మా వాటర్ ప్యూరిఫైయర్లు, హోమ్ అప్లయన్సెస్ మరియు సర్వీస్ వివరాలను వీడియో రూపంలో చూడండి."
              )}
            </p>
          </div>

          {/* Video Player Card */}
          <div className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border border-slate-700/80 group">
            <video
              ref={videoRef}
              src="/videos/promotional-video.mp4"
              poster="/images/gallery/frame-04-purifier-display.png"
              playsInline
              loop
              preload="none"
              muted={isMuted}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full max-h-[580px] object-contain bg-black"
            >
              <track kind="captions" src="/videos/captions.vtt" srcLang="en" label="English" default />
            </video>

            {/* Custom Overlay Controls */}
            {!isPlaying && (
              <div 
                onClick={togglePlay}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-opacity"
              >
                <div className="w-20 h-20 rounded-full bg-cyan-500/90 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-slate-950 ml-1" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Priya's AquaFresh Official Showcase</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Khilashapur Road, Raghunathpally</span>
            </span>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 8: CUSTOMER REVIEWS & RATINGS                   */}
      {/* ======================================================= */}
      <section className="py-20 bg-slate-50 scroll-defer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 mb-2 block">
              {t("Customer Reviews & Ratings", "కస్టమర్ల అభిప్రాయాలు & రేటింగ్స్")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
              {t("Trusted Across Raghunathpally & Jangaon", "గ్రామస్థులు & వినియోగదారుల విశ్వాసం")}
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-900">4.9 / 5.0 Rating</span>
              <span>•</span>
              <span>{t("Verified Doorstep Service", "నమ్మకమైన స్థానిక సర్వీస్")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {REVIEWS_DATA.slice(0, 3).map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex gap-1 text-amber-400">
                      {Array.from({ length: Math.max(1, Math.min(5, Math.floor(rev.rating || 5))) }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium mb-3">
                    {rev.serviceAvailed}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{rev.customerName}</p>
                    <p className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-800" />
                      <span>{rev.villageTown}</span>
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {rev.createdAt}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('reviews')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{t("View All Customer Reviews & Submit Rating", "అన్ని రివ్యూలు చూడండి & రేటింగ్ ఇవ్వండి")}</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 9: LOCAL SERVICE AREAS & COVERAGE (SEO RANKING) */}
      {/* ======================================================= */}
      <section id="service-areas" className="py-20 bg-slate-900 text-white relative overflow-hidden scroll-defer">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t("Local Coverage & Doorstep Service Hub", "స్థానిక సర్వీస్ నెట్‌వర్క్")}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {t(
                "#1 Water Purifier Sales & RO Service in Raghunathpally & Jangaon",
                "రఘునాథపల్లి, జనగామ & చుట్టుపక్కల గ్రామాల నెం.1 సర్వీస్ నెట్‌వర్క్"
              )}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t(
                "Located on Khilashapur Road, Raghunathpally (506244), PURE AquaFresh provides fast 30-minute doorstep service, genuine filter replacements, and new machine delivery across all neighboring villages & mandals.",
                "ఖిలాషాపూర్ రోడ్, రఘునాథపల్లి కేంద్రంగా జనగామ మరియు చుట్టుపక్కల గ్రామాల ప్రజలకు స్వచ్ఛమైన తాగునీటి కోసం వేగవంతమైన డోర్‌స్టెప్ వాటర్ ప్యూరిఫైయర్ సర్వీస్ అందిస్తున్నాము."
              )}
            </p>

            {/* Area Category Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                { id: 'all', labelEn: 'All Service Locations', labelTe: 'అన్ని ప్రాంతాలు' },
                { id: 'primary', labelEn: 'Raghunathpally & Highway', labelTe: 'రఘునాథపల్లి & ఖిలాషాపూర్ రోడ్' },
                { id: 'hub', labelEn: 'Jangaon Town HQ', labelTe: 'జనగామ టౌన్' },
                { id: 'village', labelEn: 'Surrounding Villages', labelTe: 'చుట్టుపక్కల గ్రామాలు' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setAreaFilter(btn.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    areaFilter === btn.id
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {isTelugu ? btn.labelTe : btn.labelEn}
                </button>
              ))}
            </div>
          </div>

          {/* Area Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {SERVICE_AREAS_DATA
              .filter(area => {
                if (areaFilter === 'all') return true;
                if (areaFilter === 'primary') return area.category === 'primary';
                if (areaFilter === 'hub') return area.category === 'hub';
                if (areaFilter === 'village') return area.category === 'village' || area.category === 'mandal';
                return true;
              })
              .map((area) => (
                <div 
                  key={area.id}
                  className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 hover:border-cyan-500/50 shadow-lg hover:shadow-cyan-500/10 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Distance & Pincode Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-cyan-400" />
                        <span>{area.distanceKm}</span>
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                        PIN: {area.pincode}
                      </span>
                    </div>

                    {/* Area Title */}
                    <h3 className="font-extrabold text-white text-base sm:text-lg mb-1 group-hover:text-cyan-300 transition-colors">
                      {isTelugu ? area.nameTe : area.nameEn}
                    </h3>
                    
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {isTelugu ? area.highlightTe : area.highlightEn}
                    </p>
                  </div>

                  {/* Actions: WhatsApp & Call */}
                  <div className="pt-3 border-t border-slate-700/60 flex items-center gap-2">
                    <a
                      href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=Hello%20Ramesh%20garu,%20I%20am%20from%20${encodeURIComponent(area.nameEn)}.%20I%20need%20Water%20Purifier%20Service%20or%20New%20Machine.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Book Water Purifier Service in ${area.nameEn} on WhatsApp`}
                      className="flex-1 py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>{t("Book in " + area.nameEn.split(' ')[0], area.nameTe.split(' ')[0] + " లో బుకింగ్")}</span>
                    </a>

                    <a
                      href={`tel:${BUSINESS_INFO.phone}`}
                      className="py-2 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center justify-center transition-colors"
                      title={`Call Technician for ${area.nameEn}`}
                      aria-label={`Call Technician for ${area.nameEn}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                    </a>
                  </div>
                </div>
              ))}
          </div>

          {/* Guarantee & Search Keywords Banner */}
          <div className="p-6 rounded-3xl bg-slate-950/80 border border-slate-800 text-center space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>30-60 Minute Doorstep Response</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-cyan-400" />
                <span>100% Genuine Filters & Spares</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>1 Year Guarantee on Purifiers</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Free TDS Water Health Audit</span>
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-500 max-w-4xl mx-auto leading-relaxed border-t border-slate-800/80 pt-3">
              <strong>Serving Locations:</strong> Raghunathpally (506244), Khilashapur Road, Jangaon Town (506167), Kanchanpally, Madharam, Ashwaraopally, Gabbeta, Veldi, Ibrahimbad, Kaloor, Kodavatoor, Mundrai, Station Ghanpur (506144), Zaffergadh (506316), Lingala Ghanpur, Bachannapet (506302), Devaruppula, Tarigoppula, Telangana.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 9.5: LOCAL SEO SEARCH DIRECTORY & FAQS          */}
      {/* Targeted for Google #1 Ranking for Ragunadhpally & Jangaon */}
      {/* ======================================================= */}
      <section id="faqs" className="py-20 bg-slate-900 text-white scroll-defer relative overflow-hidden border-t border-slate-800">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-inner">
              <Search className="w-4 h-4 text-cyan-400" />
              <span>{t("Google Search & Local FAQ Directory", "గూగుల్ సెర్చ్ & స్థానిక సందేహాలు - సమాధానాలు")}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {t(
                "Water Purifier in Ragunadhpally & Jangaon Circle",
                "రఘునాథపల్లి & జనగామ సర్కిల్‌లో వాటర్ ప్యూరిఫైయర్ సేల్స్ & సర్వీస్"
              )}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t(
                "Searching for 'near by water purify', 'water purifier in ragunadhpally', or 'water purifier in janagoan'? Lasya Water Purifier provides 30-minute doorstep service, 1-Year Guarantee, and original filter replacements across all neighboring circle villages.",
                "మీరు 'దగ్గరలోని వాటర్ ప్యూరిఫైయర్' లేదా 'రఘునాథపల్లి, జనగామలో వాటర్ ప్యూరిఫైయర్ సర్వీస్' కోసం వెతుకుతున్నారా? లాస్య వాటర్ ప్యూరిఫైయర్ ద్వారా 30 నిమిషాల్లో డోర్‌స్టెప్ రిపేర్ మరియు 1 ఇయర్ గ్యారంటీ మెషీన్లు లభిస్తాయి."
              )}
            </p>
          </div>

          {/* Quick Search Intent Keyword Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
            {[
              {
                label: "📍 Water Purifier in Ragunadhpally Village",
                msg: "Hello Ramesh garu, I need a water purifier in Ragunadhpally village."
              },
              {
                label: "📍 Water Purifier in Janagoan / Jangaon Circle",
                msg: "Hello Ramesh garu, I need water purifier sales/service in Jangaon circle."
              },
              {
                label: "📍 Near By Water Purify Doorstep Service",
                msg: "Hello Ramesh garu, I need near by water purifier doorstep service."
              },
              {
                label: "📍 Total Raghunathpally Circle (30-Min Visit)",
                msg: "Hello Ramesh garu, I am from Raghunathpally circle and need RO technician visit."
              },
              {
                label: "📍 Khilashapur Road Showroom & Spares",
                msg: "Hello Ramesh garu, I want to visit your showroom on Khilashapur Road."
              },
              {
                label: "📍 1-Year Guarantee RO + UV + Alkaline Purifiers",
                msg: "Hello Ramesh garu, I want to buy 1-Year Guarantee RO Purifier."
              }
            ].map((badge, bIdx) => (
              <a
                key={bIdx}
                href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(badge.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800/90 text-cyan-300 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700 hover:border-cyan-400 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>{badge.label}</span>
              </a>
            ))}
          </div>

          {/* Accordion FAQ Cards Grid */}
          <div className="max-w-4xl mx-auto space-y-4">
            {localFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isOpen ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-cyan-400'
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                        {isTelugu ? faq.qTe : faq.qEn}
                      </h3>
                    </div>
                    <div className="shrink-0 text-slate-400">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-700/50 space-y-4">
                      <p className="pt-2">
                        {isTelugu ? faq.aTe : faq.aEn}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <a
                          href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(faq.whatsappText)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ask on WhatsApp: ${faq.qEn}`}
                          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-white" />
                          <span>{t("Enquire on WhatsApp", "వాట్సాప్ లో అడగండి")}</span>
                        </a>

                        <a
                          href={`tel:${BUSINESS_INFO.phone}`}
                          className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Call: {BUSINESS_INFO.phone}</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Help Notice */}
          <div className="mt-12 text-center text-xs text-slate-400">
            <p>
              {t(
                "Need urgent doorstep service in Raghunathpally or Jangaon circle? Call Ramesh garu directly at 9014357848.",
                "రఘునాథపల్లి లేదా జనగామ సర్కిల్‌లో తక్షణ వాటర్ ప్యూరిఫైయర్ సర్వీస్ కోసం రమేష్ గారికి కాల్ చేయండి: 9014357848."
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 10: CTA BANNER SECTION                          */}
      {/* ======================================================= */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900 text-white text-center scroll-defer">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            {t(
              "Need Pure Water or Professional Water Purifier Service?",
              "స్వచ్ఛమైన తాగునీరు లేదా వాటర్ ప్యూరిఫైయర్ సర్వీస్ కావాలా?"
            )}
          </h2>
          <p className="text-base text-cyan-100 max-w-2xl mx-auto">
            {t(
              "Contact Priya's AquaFresh for product enquiries and service assistance in Raghunathpally, Jangaon, and neighboring villages.",
              "కొత్త ప్యూరిఫైయర్ కొనుగోలు, ఇన్స్టాలేషన్ లేదా రిపేర్ల కోసం లాస్య వాటర్ ప్యూరిఫైయర్ ను ఇప్పుడే సంప్రదించండి."
            )}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm shadow-xl hover:bg-slate-100 transition-transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-cyan-800" />
              <span>Call Now: {BUSINESS_INFO.phone}</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact Lasya Water Purifiers on WhatsApp"
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-xl transition-transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-700" />
              <span>WhatsApp Now</span>
            </a>

            <button
              onClick={() => onNavigate('service-booking')}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm shadow-xl transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>{t("Book a Service", "సర్వీస్ బుకింగ్")}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 11: GOOGLE MAPS & STORE LOCATION               */}
      {/* ======================================================= */}
      <section className="py-20 bg-white scroll-defer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Location Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 block">
                {t("Store Location", "మా చిరునామా")}
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900">
                {t("Visit Our Showroom & Service Center", "మా షాప్ ను సందర్శించండి")}
              </h2>
              
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Priya's AquaFresh</h3>
                    <p className="text-xs text-slate-600 font-telugu font-semibold">
                      లాస్య వాటర్ ప్యూరిఫైయర్ సేల్స్ & సర్వీసెస్
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      {BUSINESS_INFO.addressEn}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                  <p><strong>Calling Helpline:</strong> {BUSINESS_INFO.phone}</p>
                  <p><strong>WhatsApp Support:</strong> {BUSINESS_INFO.whatsapp}</p>
                  <p><strong>GST Registration:</strong> {BUSINESS_INFO.gstNumber}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={BUSINESS_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Responsive Google Maps Embed with Exact Client Coordinates */}
            <div className="lg:col-span-7">
              <div className="w-full h-[400px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative bg-slate-100">
                <iframe
                  src={BUSINESS_INFO.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Priya's AquaFresh Lasya Water Purifier Google Maps Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
