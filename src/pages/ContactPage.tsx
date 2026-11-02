import React, { useState } from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/mockData';
import { storageService } from '../services/storageService';
import { getGeneralWhatsAppUrl, formatWhatsAppUrl } from '../utils/whatsapp';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  Mail,
  AlertCircle
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    interest: "Priya's AquaFresh Water Purifiers",
    villageTown: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Please fill all required fields.');
      return;
    }

    const clean = form.phone.replace(/\D/g, '');
    if (clean.length !== 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    try {
      storageService.createEnquiry({
        name: form.name.trim(),
        phone: form.phone.trim(),
        interest: form.interest,
        villageTown: form.villageTown.trim(),
        message: form.message.trim()
      });

      setSubmitted(true);
      setError('');
    } catch {
      setError('Failed to submit enquiry. Please call us directly.');
    }
  };

  const getCustomWhatsAppEnquiry = () => {
    const text = `Hello Priya's AquaFresh,
My Name: ${form.name}
Mobile: ${form.phone}
Village: ${form.villageTown || 'Raghunathpally'}
Interest: ${form.interest}
Message: ${form.message}`;
    return formatWhatsAppUrl(text);
  };

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>{t("Customer Assistance & Store", "సంప్రదించండి")}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t("Contact Priya's AquaFresh", "మమ్మల్ని సంప్రదించండి")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            {t(
              "Visit our showroom on Khilashapur Road, Raghunathpally or connect via Call and WhatsApp for immediate product enquiries and service booking.",
              "రఘునాథపల్లిలోని మా షాప్ కు రండి లేదా ఫోన్ కాల్ మరియు వాట్సాప్ ద్వారా మమ్మల్ని వెంటనే సంప్రదించండి."
            )}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: WhatsApp Business */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 fill-emerald-600 text-white" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                WhatsApp Business
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Instant messaging for product prices, photos, and quick service support.
              </p>
            </div>
            <a
              href={getGeneralWhatsAppUrl(isTelugu)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs text-center transition-colors"
            >
              {BUSINESS_INFO.whatsapp}
            </a>
          </div>

          {/* Card 2: Phone Hotline */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Direct Calling Hotline
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Speak directly with our technical lead for urgent water purifier issues.
              </p>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center transition-colors"
            >
              {BUSINESS_INFO.phone}
            </a>
          </div>

          {/* Card 3: Store Address */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Showroom Location
              </h3>
              <p className="text-xs text-slate-600 mb-4">
                Khilashapur Road, Raghunathpally, Jangaon Dist, Telangana.
              </p>
            </div>
            <a
              href={BUSINESS_INFO.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Card 4: Working Hours & GST */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Store Hours & GST
              </h3>
              <p className="text-xs text-slate-600 space-y-1 mb-4">
                <span className="block font-semibold">Mon - Sun: 8:00 AM – 9:00 PM</span>
                <span className="block text-[11px] text-slate-500">GST: {BUSINESS_INFO.gstNumber}</span>
              </p>
            </div>
            <button
              onClick={() => onNavigate('service-booking')}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs text-center transition-colors cursor-pointer"
            >
              Book Service Online
            </button>
          </div>
        </div>

        {/* Map and Enquiry Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
            <h3 className="text-xl font-extrabold text-slate-900 mb-1">
              {t("Send a Quick Enquiry", "సందేశం పంపండి")}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              {t("Fill this form or send details on WhatsApp directly.", "వివరాలు నమోదు చేయండి లేదా నేరుగా వాట్సాప్ చేయండి.")}
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">
                  {t("Enquiry Sent Successfully!", "మీ సందేశం అందింది!")}
                </h4>
                <p className="text-xs text-slate-600">
                  {t(
                    "Our representative will review your message and contact you promptly.",
                    "మా ప్రతినిధి మీ వివరాలను చూసి వెంటనే సంప్రదిస్తారు."
                  )}
                </p>

                <a
                  href={getCustomWhatsAppEnquiry()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Forward Details to WhatsApp</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="block mx-auto text-xs text-slate-500 hover:underline pt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Village / Town
                  </label>
                  <input
                    type="text"
                    value={form.villageTown}
                    onChange={(e) => setForm({ ...form, villageTown: e.target.value })}
                    placeholder="e.g. Raghunathpally, Jangaon"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Interested In
                  </label>
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="Priya's AquaFresh Water Purifiers">Priya's AquaFresh Water Purifiers</option>
                    <option value="Water Purifier Service / Repair">Water Purifier Service / Repair</option>
                    <option value="Filter & Membrane Replacement">Filter & Membrane Replacement</option>
                    <option value="AC Spare Parts / Compressor">AC Spare Parts / Compressor</option>
                    <option value="Refrigerators / Washing Machines / Coolers">Refrigerators / Washing Machines / Coolers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message / Question *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder="Tell us what you need..."
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Enquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Embedded Map Container */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative bg-slate-100">
              <iframe
                src={BUSINESS_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Priya's AquaFresh Location on Google Maps"
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                <span>Exact coordinates: {BUSINESS_INFO.locationCoordinates}</span>
              </span>

              <a
                href={BUSINESS_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-cyan-600 hover:underline"
              >
                <span>Open in Google Maps App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
