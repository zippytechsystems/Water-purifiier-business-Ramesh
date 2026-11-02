import React from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/mockData';
import { getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { 
  ShieldCheck, 
  Droplets, 
  Award, 
  MapPin, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  HeartHandshake,
  Users,
  Wrench,
  Check
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner Section */}
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-950 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("Pure Water. Healthy Life.", "స్వచ్ఛమైన నీరు. ఆరోగ్యకరమైన జీవితం.")}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {t("About Priya's AquaFresh", "ప్రియాస్ ఆక్వాఫ్రెష్ గురించి")}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-telugu leading-relaxed">
              {isTelugu 
                ? "లాస్య వాటర్ ప్యూరిఫైయర్ సేల్స్ & సర్వీసెస్ – రఘునాథపల్లి, జనగామ జిల్లా."
                : "Lasya Water Purifier Sales & Services – Khilashapur Road, Raghunathpally, Jangaon District."}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              {t(
                "Dedicated to providing clean, purified, and healthy drinking water to households, agricultural families, schools, and commercial establishments across Raghunathpally, Jangaon, and neighboring villages.",
                "రఘునాథపల్లి మరియు పరిసర ప్రాంతాల్లోని కుటుంబాలకు, వ్యాపార సంస్థలకు స్వచ్ఛమైన మరియు ఆరోగ్యకరమైన తాగునీటిని అందించడమే మా ముఖ్య లక్ష్యం."
              )}
            </p>
          </div>
        </div>

        {/* Core Pillars: Who We Are & Our Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-600 block">
              {t("Who We Are", "మా నేపథ్యం & లక్ష్యం")}
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              {t("Your Trusted Neighborhood Water Partner", "మీ విశ్వసనీయ వాటర్ ప్యూరిఫైయర్ భాగస్వామి")}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t(
                "Priya's AquaFresh operates under Lasya Water Purifier Sales & Services in Raghunathpally, Jangaon District, Telangana. We are a registered business (GST: 36ETWPA6540J1Z7) specializing in domestic & commercial RO water purifiers, original spare parts, and home appliances.",
                "లాస్య వాటర్ ప్యూరిఫైయర్ సేల్స్ & సర్వీసెస్ ఆధ్వర్యంలో నడుస్తున్న ప్రియాస్ ఆక్వాఫ్రెష్ ప్రభుత్వ నమోదిత సంస్థ (GST: 36ETWPA6540J1Z7). రఘునాథపల్లిలో నాణ్యమైన ప్యూరిఫైయర్లు మరియు అప్లయన్సెస్ విక్రయం మరియు సర్వీస్ అందిస్తున్నాము."
              )}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t(
                "Many villages and towns in Telangana face challenges with high Total Dissolved Solids (TDS), salinity, and chemical impurities in borewell water. Our priority is to install properly calibrated multi-stage RO purifiers that remove harmful contamination while retaining essential minerals for health.",
                "బోరు నీటిలో అధిక ఉప్పు, లవణాలు మరియు ఫ్లోరైడ్ వల్ల వచ్చే ఆరోగ్య సమస్యలను నివారించడానికి ఆధునిక RO మరియు UV టెక్నాలజీతో స్వచ్ఛమైన నీటిని అందించేందుకు మేము కట్టుబడి ఉన్నాము."
              )}
            </p>

            <div className="pt-2">
              <a
                href={getGeneralWhatsAppUrl(isTelugu)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t("Chat with Store Representative", "వాట్సాప్ లో మాట్లాడండి")}</span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-white p-3">
            <img
              src="/images/brand/business-banner.jpg"
              alt="Priya's AquaFresh Lasya Water Purifier Store Banner"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>
        </div>

        {/* Our Comprehensive Business Offerings */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900">
              {t("Our Complete Scope of Services", "మా సేవలు & ఉత్పత్తులు")}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Quality Water Purifiers, Professional Service and Reliable Spare Parts – All Under One Roof.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-600 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                {t("Water Purification Solutions", "వాటర్ ప్యూరిఫికేషన్ సొల్యూషన్స్")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Domestic RO, UV, and heavy-duty 5-stage filtration purifiers. Commercial RO plants for small industries, hostels, and offices.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                {t("Installation & Doorstep Repair", "ఇన్స్టాలేషన్ & డోర్‌స్టెప్ రిపేర్")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skilled technician visits for new installations, regular servicing, pump fixes, filter replacement, and leak repairs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">
                {t("Genuine Spare Parts & Appliances", "ఒరిజినల్ స్పేర్స్ & అప్లయన్సెస్")}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct stock of original membranes, booster pumps, adapters, and home appliances including fridges, washing machines, coolers, and AC spares.
              </p>
            </div>
          </div>
        </div>

        {/* Commitment to Local Customers */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-extrabold text-white">
              {t("Dedicated to Raghunathpally & Jangaon", "రఘునాథపల్లి ప్రజల సేవలో")}
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              We operate locally with full accountability. No dealing with distant call centers; contact us directly for same-day service appointments.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('service-booking')}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              {t("Book a Service", "సర్వీస్ బుకింగ్")}
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
            >
              {t("Contact Us", "సంప్రదించండి")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
