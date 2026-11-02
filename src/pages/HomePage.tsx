import React, { useState, useRef } from 'react';
import { PageRoute, Product, ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO, PRODUCTS_DATA, SERVICES_DATA, REVIEWS_DATA } from '../data/mockData';
import { getProductWhatsAppUrl, getServiceEnquiryWhatsAppUrl, getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { 
  Droplets, 
  ShieldCheck, 
  Wrench, 
  Award, 
  PhoneCall, 
  MessageCircle, 
  ChevronRight, 
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
  HeartHandshake
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectService?: (serviceName: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectService }) => {
  const { isTelugu, t } = useLanguage();

  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* ======================================================= */}
      {/* SECTION 1: HERO SECTION                                 */}
      {/* ======================================================= */}
      <section className="relative overflow-hidden bg-hero-mesh text-white pt-12 pb-20 lg:pt-16 lg:pb-28">
        {/* Decorative Floating Droplets & Glows */}
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold shadow-inner backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t("Priya's AquaFresh – Authorized Sales & Services", "ప్రియాస్ ఆక్వాఫ్రెష్ – లాస్య వాటర్ ప్యూరిఫైయర్స్")}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {t("Pure Water.", "స్వచ్ఛమైన నీరు.")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-emerald-300">
                  {t("Healthy Life.", "ఆరోగ్యకరమైన జీవితం.")}
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl font-semibold text-slate-200 leading-snug">
                {t(
                  BUSINESS_INFO.subheadlineEn,
                  BUSINESS_INFO.subheadlineTe
                )}
              </p>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
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
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
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
                  className="px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg hover:shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>{t("WhatsApp Us", "వాట్సాప్")}</span>
                </a>
              </div>

              {/* Verified Features Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 text-xs text-slate-300">
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

            {/* Right Column: Hero Showcase Visual */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 glass-card-dark p-2 group">
                {/* Background Hero Reference Image */}
                <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src="/images/brand/hero-water-purifiers.jpg"
                    alt="Water Purifier Showcase Priya's AquaFresh"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                  {/* Water splash label */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase font-extrabold text-cyan-400 tracking-wider">
                        {t("Multi-Stage RO Technology", "మల్టీ-స్టేజ్ RO టెక్నాలజీ")}
                      </p>
                      <p className="text-white text-sm font-bold">
                        Priya's AquaFresh Domestic & Commercial
                      </p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-cyan-300" />
                    </div>
                  </div>
                </div>

                {/* Floating 1-Year Guarantee Badge on Hero Card */}
                <div className="absolute -top-3 -right-3 w-20 h-20 rounded-full shadow-2xl p-1 bg-gradient-to-tr from-amber-400 to-yellow-300 animate-float">
                  <div className="w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center text-center p-1 border border-yellow-400/50">
                    <span className="text-[10px] font-bold text-yellow-400 leading-none">1 YEAR</span>
                    <span className="text-[8px] font-extrabold text-white uppercase tracking-tighter">GUARANTY</span>
                    <div className="flex gap-0.5 mt-0.5">
                      <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                      <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                      <Star className="w-2 h-2 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================= */}
      {/* SECTION 2: BUSINESS HIGHLIGHTS                          */}
      {/* ======================================================= */}
      <section className="py-14 bg-white border-b border-slate-200">
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 mb-1.5 block">
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
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-white shadow-xs">
                      {product.badge}
                    </span>
                  )}
                  {product.warrantyEn && (
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                      1 Year Guaranty
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 block mb-1">
                      {product.subCategory || product.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-cyan-600 transition-colors">
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
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 mb-2 block">
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
                    className="w-full py-2 rounded-xl border border-emerald-600/40 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-colors"
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
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
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
      <section className="py-16 bg-gradient-to-r from-blue-900 to-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col lg:flex-row items-center gap-8 justify-between shadow-2xl">
            <div className="flex items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
              {/* 1 Year Guaranty Badge Cropped from Poster */}
              <div className="w-24 h-24 rounded-2xl bg-amber-400/20 p-2 border border-amber-400/40 flex items-center justify-center shrink-0">
                <img
                  src="/images/brand/one-year-guarantee-badge.png"
                  alt="1 Year Guarantee Badge"
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
      <section className="py-20 bg-slate-900 text-white">
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
              preload="metadata"
              muted={isMuted}
              controls
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full max-h-[580px] object-contain bg-black"
            />

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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 mb-2 block">
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
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
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
                    <h4 className="font-bold text-slate-900 text-sm">{rev.customerName}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-500" />
                      <span>{rev.villageTown}</span>
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400">
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
      {/* SECTION 9: CTA BANNER SECTION                           */}
      {/* ======================================================= */}
      <section className="py-16 bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900 text-white text-center">
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
              <PhoneCall className="w-4 h-4 text-cyan-600" />
              <span>Call Now: {BUSINESS_INFO.phone}</span>
            </a>

            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-xl transition-transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white text-emerald-500" />
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
      {/* SECTION 10: GOOGLE MAPS & STORE LOCATION                */}
      {/* ======================================================= */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Location Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 block">
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
