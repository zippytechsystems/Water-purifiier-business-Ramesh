import React from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES_DATA, BUSINESS_INFO } from '../data/mockData';
import { getServiceEnquiryWhatsAppUrl } from '../utils/whatsapp';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  MessageCircle, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Droplets,
  PhoneCall
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageRoute) => void;
  onSelectService: (serviceName: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate, onSelectService }) => {
  const { isTelugu, t } = useLanguage();

  const handleBook = (title: string) => {
    onSelectService(title);
    onNavigate('service-booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t("Expert Technical Solutions", "నిపుణులైన సర్వీస్ & రిపేర్లు")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Water Purifier Services & Repair", "వాటర్ ప్యూరిఫైయర్ సేల్స్ & సర్వీసెస్")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Comprehensive installation, troubleshooting, membrane replacement, and periodic maintenance for domestic and commercial water purifiers in Raghunathpally & Jangaon.",
              "అన్ని రకాల వాటర్ ప్యూరిఫైయర్లకు నమ్మకమైన డోర్‌స్టెప్ ఇన్స్టాలేషన్, సర్వీస్ మరియు రిపేర్లు చేయబడును. అసలైన స్పేర్ పార్ట్స్ మాత్రమే వాడబడును."
            )}
          </p>
        </div>

        {/* Services Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-600/10 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                    <Wrench className="w-7 h-7" />
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Est. Time: {service.estimatedTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">
                  {isTelugu ? service.titleTe : service.titleEn}
                </h3>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {isTelugu ? service.descriptionTe : service.descriptionEn}
                </p>

                {/* Highlights */}
                <div className="space-y-2 mb-8">
                  {(isTelugu ? service.highlightsTe : service.highlightsEn).map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleBook(service.titleEn)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{t("Book Doorstep Visit", "సర్వీస్ బుక్ చేయండి")}</span>
                </button>

                <a
                  href={getServiceEnquiryWhatsAppUrl(service.titleEn, isTelugu)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>{t("WhatsApp Enquiry", "వాట్సాప్ లో అడగండి")}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Breakdown Helpline */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              {t("Immediate Technician Support", "తక్షణ టెక్నీషియన్ సాయం")}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              {t(
                "Is Your Water Purifier Leaking or Not Dispensing Water?",
                "మీ వాటర్ ప్యూరిఫైయర్ లీక్ అవుతోందా లేదా నీరు రావడం లేదా?"
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {t(
                "Don't worry! Call our direct service line or book an appointment online. Our local technician will attend to your problem promptly.",
                "ఆందోళన చెందకండి! మా హెల్ప్‌లైన్ కు కాల్ చేయండి లేదా ఆన్‌లైన్ లో బుక్ చేయండి. మా టెక్నీషియన్ త్వరితగతిన సమస్యను పరిష్కరిస్తారు."
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm text-center shadow-lg transition-transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {BUSINESS_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                onSelectService('Water Leakage');
                onNavigate('service-booking');
              }}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-sm text-center transition-all cursor-pointer"
            >
              {t("Book Leak Repair", "లీకేజ్ రిపేర్ బుక్ చేయండి")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
