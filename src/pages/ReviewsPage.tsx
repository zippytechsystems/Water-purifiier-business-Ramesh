import React, { useState, useEffect } from 'react';
import { PageRoute, CustomerReview } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { REVIEWS_DATA, BUSINESS_INFO } from '../data/mockData';
import { 
  Star, 
  MessageSquare, 
  CheckCircle, 
  Send, 
  PlusCircle, 
  X, 
  ThumbsUp, 
  ShieldCheck, 
  MapPin, 
  MessageCircle,
  PhoneCall,
  Sparkles
} from 'lucide-react';

interface ReviewsPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();
  const [reviews, setReviews] = useState<CustomerReview[]>(REVIEWS_DATA);
  const [activeFilter, setActiveFilter] = useState<'all' | '5' | 'installation' | 'service'>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  // Form State
  const [name, setName] = useState<string>('');
  const [village, setVillage] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [service, setService] = useState<string>('Domestic RO Purifier Installation');
  const [comment, setComment] = useState<string>('');

  // Load reviews from Hostinger API and localStorage on mount
  useEffect(() => {
    // 1. Fetch from Hostinger MySQL API
    fetch('/api/reviews.php')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          // Merge API reviews with local
          const apiReviews: CustomerReview[] = res.data.map((item: any) => ({
            id: item.id || `api-${Math.random()}`,
            customerName: item.customer_name || item.customerName,
            villageTown: item.village_town || item.villageTown,
            rating: Number(item.rating) || 5,
            serviceAvailed: item.service_availed || item.serviceAvailed,
            comment: item.comment,
            createdAt: item.created_at ? item.created_at.substring(0, 10) : new Date().toISOString().substring(0, 10),
            isVerified: true
          }));

          // Load local reviews
          const stored = localStorage.getItem('aquafresh_custom_reviews');
          const localReviews: CustomerReview[] = stored ? JSON.parse(stored) : [];

          // Combine with deduplication
          const combined = [...localReviews, ...apiReviews];
          const unique = Array.from(new Map(combined.map(item => [item.customerName + item.comment, item])).values());
          if (unique.length > 0) {
            setReviews(unique);
          }
        }
      })
      .catch(() => {
        // Fallback to local storage
        const stored = localStorage.getItem('aquafresh_custom_reviews');
        if (stored) {
          try {
            const localReviews: CustomerReview[] = JSON.parse(stored);
            setReviews([...localReviews, ...REVIEWS_DATA]);
          } catch {}
        }
      });
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setIsSubmitting(true);

    const newReview: CustomerReview = {
      id: `local-${Date.now()}`,
      customerName: name.trim(),
      villageTown: village.trim() || 'Raghunathpally',
      rating,
      serviceAvailed: service,
      comment: comment.trim(),
      createdAt: new Date().toISOString().substring(0, 10),
      isVerified: true
    };

    // 1. Send to Hostinger MySQL API
    try {
      await fetch('/api/reviews.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: newReview.customerName,
          village_town: newReview.villageTown,
          rating: newReview.rating,
          service_availed: newReview.serviceAvailed,
          comment: newReview.comment
        })
      });
    } catch {}

    // 2. Save to localStorage
    try {
      const stored = localStorage.getItem('aquafresh_custom_reviews');
      const existing: CustomerReview[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem('aquafresh_custom_reviews', JSON.stringify([newReview, ...existing]));
    } catch {}

    // 3. Update state
    setReviews(prev => [newReview, ...prev]);
    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Optional WhatsApp share link
    const waText = encodeURIComponent(
      `Hello Ramesh garu, I just submitted a ${rating}-Star Customer Review on Priya's AquaFresh website!\n\n` +
      `👤 Name: ${newReview.customerName}\n` +
      `📍 Location: ${newReview.villageTown}\n` +
      `⭐ Rating: ${rating} / 5 Stars\n` +
      `🔧 Service: ${newReview.serviceAvailed}\n` +
      `💬 Feedback: "${newReview.comment}"`
    );

    setTimeout(() => {
      window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${waText}`, '_blank');
      setIsModalOpen(false);
      setSubmitSuccess(false);
      setName('');
      setVillage('');
      setComment('');
      setRating(5);
    }, 1500);
  };

  const filteredReviews = reviews.filter(rev => {
    if (activeFilter === '5') return rev.rating === 5;
    if (activeFilter === 'installation') return rev.serviceAvailed.toLowerCase().includes('installation') || rev.serviceAvailed.toLowerCase().includes('plant');
    if (activeFilter === 'service') return rev.serviceAvailed.toLowerCase().includes('service') || rev.serviceAvailed.toLowerCase().includes('filter') || rev.serviceAvailed.toLowerCase().includes('repair');
    return true;
  });

  return (
    <div className="w-full py-12 sm:py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3 shadow-xs">
            <Star className="w-3.5 h-3.5 fill-cyan-600 text-cyan-600" />
            <span>{t("Verified Customer Feedback", "కస్టమర్ రివ్యూలు & రేటింగ్స్")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Customer Reviews & Experiences", "మా కస్టమర్ల అనుభవాలు")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Read genuine reviews from families and businesses across Raghunathpally, Jangaon, and nearby mandals who trust Priya's AquaFresh for pure drinking water.",
              "రఘునాథపల్లి, జనగామ మరియు పరిసర గ్రామాల ప్రజలు ప్రియాస్ ఆక్వాఫ్రెష్ సేవలపై తెలిపిన నిజమైన అభిప్రాయాలు."
            )}
          </p>
        </div>

        {/* ======================================================= */}
        {/* OVERALL RATING KPI & WRITE A REVIEW BANNER              */}
        {/* ======================================================= */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Score Block */}
            <div className="lg:col-span-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-slate-800 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">4.9</span>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 mt-1 block">
                    {t("Based on 120+ happy customers", "120+ సంతృప్తికర కస్టమర్ల ఆధారంగా")}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-2">
                {t("100% Genuine service reviews in Jangaon district.", "జనగామ జిల్లాలో 100% నమ్మకమైన సర్వీస్ రివ్యూలు.")}
              </p>
            </div>

            {/* Highlights */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{t("Prompt Doorstep Service", "సమయానికి డోర్‌స్టెప్ సర్వీస్")}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
                <span>{t("Original Filters & Spares", "ఒరిజినల్ ఫిల్టర్లు")}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>{t("1-Year Guarantee Support", "1 ఇయర్ గ్యారంటీ")}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-2.5">
                <ThumbsUp className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{t("Honest & Reasonable Pricing", "సహేతుకమైన ధరలు")}</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="lg:col-span-3 text-center lg:text-right">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm shadow-xl transition-all cursor-pointer transform hover:scale-105"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{t("Write a Review", "మీ అభిప్రాయాన్ని రాయండి")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* REVIEW FILTERS                                          */}
        {/* ======================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {[
            { id: 'all', labelEn: 'All Reviews', labelTe: 'అన్ని రివ్యూలు' },
            { id: '5', labelEn: '5-Star Ratings', labelTe: '5-స్టార్ రేటింగ్స్' },
            { id: 'installation', labelEn: 'Installation & Plants', labelTe: 'ఇన్‌స్టాలేషన్' },
            { id: 'service', labelEn: 'Filters & Repair', labelTe: 'సర్వీస్ & రిపేర్స్' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {isTelugu ? f.labelTe : f.labelEn}
            </button>
          ))}
        </div>

        {/* ======================================================= */}
        {/* REVIEWS GRID                                            */}
        {/* ======================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-cyan-100 text-cyan-800 font-extrabold flex items-center justify-center text-sm shadow-xs">
                      {rev.customerName.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{rev.customerName}</span>
                        {rev.isVerified && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-100" />
                        )}
                      </h3>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <MapPin className="w-3 h-3 text-cyan-600" />
                        <span>{rev.villageTown}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Service Tag */}
                <div className="mb-3">
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold">
                    {rev.serviceAvailed}
                  </span>
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Date */}
              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Verified Customer</span>
                <span>{rev.createdAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-700 p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-2">
              {t("Need Clean Water for Your Family?", "మీ ఇంటికి స్వచ్ఛమైన నీరు కావాలా?")}
            </h3>
            <p className="text-xs sm:text-sm text-cyan-100 max-w-xl">
              {t(
                "Call Ramesh Kumar on 9014357848 or message on WhatsApp 9182857848 for new purifiers, filter replacements and repairs in Raghunathpally.",
                "కొత్త వాటర్ ప్యూరిఫైయర్లు, ఫిల్టర్ రీప్లేస్‌మెంట్ లేదా సర్వీస్ కోసం రఘునాథపల్లిలో ఇప్పుడే కాల్ చేయండి."
              )}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent("Hello Priya's AquaFresh, I saw your customer reviews and would like to enquire about water purifier service.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-md hover:bg-slate-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>{t("WhatsApp Us", "వాట్సాప్ మెసేజ్")}</span>
            </a>
            <button
              onClick={() => onNavigate('service-booking')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-950 text-white font-extrabold text-xs shadow-md hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <span>{t("Book Service", "సర్వీస్ బుకింగ్")}</span>
            </button>
          </div>
        </div>

        {/* ======================================================= */}
        {/* WRITE A REVIEW MODAL                                    */}
        {/* ======================================================= */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
              
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-1 block">
                  {t("Share Your Experience", "మీ అభిప్రాయాన్ని తెలపండి")}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {t("Write a Review for Priya's AquaFresh", "ప్రియాస్ ఆక్వాఫ్రెష్ రివ్యూ ఫారమ్")}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t(
                    "Your feedback helps your neighbors in Raghunathpally & Jangaon choose safe drinking water.",
                    "మీ అభిప్రాయం ఇతర కుటుంబాలకు మంచి వాటర్ ప్యూరిఫైయర్ ఎంచుకోవడంలో సహాయపడుతుంది."
                  )}
                </p>
              </div>

              {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-in zoom-in-95 duration-200">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-slate-900 mb-1">
                    {t("Thank You for Your Review!", "మీ రివ్యూకు ధన్యవాదాలు!")}
                  </h4>
                  <p className="text-xs text-slate-600 mb-3">
                    {t(
                      "Your review has been recorded and will also be sent to our WhatsApp helpline.",
                      "మీ రివ్యూ విజయవంతంగా నమోదైంది మరియు వాట్సాప్ ద్వారా యజమానికి చేరింది."
                    )}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  {/* Star Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {t("Rating (Stars)", "స్టార్ రేటింగ్")} *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="p-1 cursor-pointer transition-transform hover:scale-125"
                        >
                          <Star 
                            className={`w-7 h-7 ${
                              (hoverRating || rating) >= star 
                                ? 'fill-amber-400 text-amber-400' 
                                : 'text-slate-300'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-bold text-slate-700">
                        {rating} / 5 {t("Stars", "స్టార్స్")}
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("Your Name", "మీ పేరు")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Reddy"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-slate-50"
                    />
                  </div>

                  {/* Village / Town */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("Village / Town", "గ్రామం / ప్రాంతం")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      placeholder="e.g. Raghunathpally / Jangaon / Khilashapur"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-slate-50"
                    />
                  </div>

                  {/* Service Availed */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("Service Availed", "తీసుకున్న సర్వీస్")}
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-slate-50"
                    >
                      <option value="Domestic RO Purifier Installation">Domestic RO Purifier Installation</option>
                      <option value="Water Purifier Filter Replacement">Water Purifier Filter Replacement</option>
                      <option value="RO Purifier Repair & Servicing">RO Purifier Repair & Servicing</option>
                      <option value="Commercial RO Plant Setup">Commercial RO Plant Setup</option>
                      <option value="Alkaline RO Purifier Purchase">Alkaline RO Purifier Purchase</option>
                      <option value="Fridge & Appliance Servicing">Fridge & Appliance Servicing</option>
                    </select>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("Your Review & Feedback", "మీ అభిప్రాయం")} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder={t("Share your experience with our purifier installation, repair, or water taste...", "మా వాటర్ ప్యూరిఫైయర్ సర్వీస్ గురించి మీ అభిప్రాయాన్ని ఇక్కడ రాయండి...")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-cyan-500 bg-slate-50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t("Submitting...", "సమర్పిస్తున్నాము...") : t("Submit Review & Share on WhatsApp", "రివ్యూ సమర్పించండి")}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
