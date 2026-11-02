import React, { useState } from 'react';
import { ServiceCategory, ServiceBookingData } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { getBookingWhatsAppUrl, getGeneralWhatsAppUrl } from '../utils/whatsapp';
import { BUSINESS_INFO } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Home, 
  Wrench, 
  AlertCircle, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  RotateCcw,
  PhoneCall
} from 'lucide-react';

interface ServiceBookingPageProps {
  initialService?: string;
  onNavigateHome: () => void;
}

export const ServiceBookingPage: React.FC<ServiceBookingPageProps> = ({ 
  initialService = 'General Service',
  onNavigateHome 
}) => {
  const { isTelugu, t } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    address: '',
    villageTown: 'Raghunathpally',
    serviceCategory: (initialService as ServiceCategory) || 'General Service',
    productType: "Priya's AquaFresh RO Water Purifier",
    problemDescription: '',
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    preferredTime: '10:00 AM – 12:00 PM'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ServiceBookingData | null>(null);

  const serviceCategories: ServiceCategory[] = [
    'New Installation',
    'General Service',
    'Water Leakage',
    'Filter Replacement',
    'RO Repair',
    'Membrane Replacement',
    'Other Service'
  ];

  const productTypes = [
    "Priya's AquaFresh RO Water Purifier",
    "Aquaguard / Multi-Brand Domestic RO",
    "UV Water Purifier",
    "Commercial RO Water Plant (25/50 LPH)",
    "Refrigerator (Fridge)",
    "Washing Machine",
    "Air Cooler",
    "Split / Window AC"
  ];

  const timeSlots = [
    "08:00 AM – 10:00 AM",
    "10:00 AM – 12:00 PM",
    "12:00 PM – 02:00 PM",
    "02:00 PM – 04:00 PM",
    "04:00 PM – 06:00 PM",
    "06:00 PM – 08:00 PM"
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter customer name (at least 2 letters).';
    }

    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length !== 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please enter street / house address.';
    }

    if (!formData.villageTown.trim()) {
      newErrors.villageTown = 'Please enter village or town name.';
    }

    if (!formData.problemDescription.trim() || formData.problemDescription.trim().length < 5) {
      newErrors.problemDescription = 'Please briefly describe the service need or problem (min 5 chars).';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred service date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate clean unique reference
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const reference = `LWP-${new Date().getFullYear()}-${randomSuffix}`;

      const newBooking: ServiceBookingData = {
        reference,
        customerName: formData.customerName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        address: formData.address.trim(),
        villageTown: formData.villageTown.trim(),
        serviceCategory: formData.serviceCategory,
        productType: formData.productType,
        problemDescription: formData.problemDescription.trim(),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        createdAt: new Date().toISOString()
      };

      setConfirmedBooking(newBooking);

      // Persist to Hostinger MySQL Database API asynchronously
      fetch('/api/bookings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booking_reference: newBooking.reference,
          customer_name: newBooking.customerName,
          mobile_number: newBooking.mobileNumber,
          address: newBooking.address,
          village_town: newBooking.villageTown,
          service_category: newBooking.serviceCategory,
          product_type: newBooking.productType,
          problem_description: newBooking.problemDescription,
          preferred_date: newBooking.preferredDate,
          preferred_time: newBooking.preferredTime
        })
      }).catch(() => {});

      // Persist to localStorage for offline access
      try {
        const stored = localStorage.getItem('aquafresh_local_bookings');
        const list = stored ? JSON.parse(stored) : [];
        localStorage.setItem('aquafresh_local_bookings', JSON.stringify([newBooking, ...list]));
      } catch {}

      // Open WhatsApp directly with pre-filled message
      const whatsappUrl = getBookingWhatsAppUrl(newBooking, isTelugu);
      window.open(whatsappUrl, '_blank');
    } catch {
      alert('Unable to format booking. Please call our hotline directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    setFormData({
      customerName: '',
      mobileNumber: '',
      address: '',
      villageTown: 'Raghunathpally',
      serviceCategory: 'General Service',
      productType: "Priya's AquaFresh RO Water Purifier",
      problemDescription: '',
      preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      preferredTime: '10:00 AM – 12:00 PM'
    });
    setErrors({});
  };

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>{t("Doorstep Service & Repair", "డోర్‌స్టెప్ సర్వీస్ & రిపేర్లు")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t("Water Purifier Service Booking", "వాటర్ ప్యూరిఫైయర్ సర్వీస్ బుకింగ్")}
          </h1>
          <p className="text-sm text-slate-600 mt-2">
            {t(
              "Schedule your doorstep service in Raghunathpally, Jangaon, and neighboring areas. Fill details below and confirm directly on WhatsApp Business with our technician team.",
              "రఘునాథపల్లి, జనగామ మరియు పరిసర గ్రామాలకు సులభమైన సర్వీస్ బుకింగ్. వివరాలు నమోదు చేసి నేరుగా వాట్సాప్ లో నిర్ధారించుకోండి."
            )}
          </p>
        </div>

        {/* ======================================================= */}
        {/* CONFIRMATION SCREEN: DIRECT WHATSAPP ACTION             */}
        {/* ======================================================= */}
        {confirmedBooking ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-2xl animate-in zoom-in-95 duration-300 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 block mb-1">
              {t("WhatsApp Service Request Ready!", "వాట్సాప్ సర్వీస్ అభ్యర్థన సిద్ధమైంది!")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Reference #{confirmedBooking.reference}
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mb-8">
              {t(
                `Thank you, ${confirmedBooking.customerName}. Your service request for "${confirmedBooking.serviceCategory}" has been prepared. WhatsApp should open automatically. If it didn't open, tap the button below.`,
                `ధన్యవాదాలు, ${confirmedBooking.customerName}. మీ "${confirmedBooking.serviceCategory}" అభ్యర్థన వివరాలు సిద్ధమయ్యాయి. వాట్సాప్ లో పంపి తక్షణమే టెక్నీషియన్ ను నిర్ధారించుకోండి.`
              )}
            </p>

            {/* Booking Details Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left max-w-lg mx-auto mb-8 space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Service Category:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.serviceCategory}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Product:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.productType}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Customer Mobile:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.mobileNumber}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Preferred Slot:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.preferredDate} ({confirmedBooking.preferredTime})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Location:</span>
                <span className="font-bold text-slate-900">{confirmedBooking.villageTown}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-semibold text-slate-800 text-right max-w-[60%]">{confirmedBooking.address}</span>
              </div>
            </div>

            {/* DIRECT WHATSAPP ACTION BUTTONS */}
            <div className="space-y-3 max-w-lg mx-auto">
              <a
                href={getBookingWhatsAppUrl(confirmedBooking, isTelugu)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>{t("Send Booking to WhatsApp (9182857848)", "వాట్సాప్ కు పంపండి (9182857848)")}</span>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="w-full py-3 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>{t(`Call Direct Hotline: ${BUSINESS_INFO.phone}`, `హెల్ప్‌లైన్ కాల్: ${BUSINESS_INFO.phone}`)}</span>
              </a>

              <div className="p-3.5 rounded-xl bg-slate-100 text-slate-600 text-[11px] leading-relaxed border border-slate-200/80 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline-block mr-1 align-text-bottom" />
                <span>
                  {t(
                    "Direct WhatsApp Connection: Your service enquiry is delivered directly to our official business WhatsApp without storing unnecessary database records. 100% genuine parts & verified local technicians.",
                    "నేరుగా వాట్సాప్ కనెక్షన్: మీ వివరాలు నేరుగా మా వాట్సాప్ బిజినెస్ కు చేరుతాయి. స్వచ్ఛమైన స్పేర్ పార్ట్స్ మరియు అనుభవజ్ఞులైన స్థానిక టెక్నీషియన్లు."
                  )}
                </span>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer flex items-center gap-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t("Book Another Service", "మరొక సర్వీస్ బుక్ చేయండి")}</span>
                </button>

                <button
                  onClick={onNavigateHome}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold cursor-pointer"
                >
                  <span>{t("Back to Home", "హోమ్ పేజీకి వెళ్లండి")}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ======================================================= */
          /* SERVICE BOOKING FORM                                    */
          /* ======================================================= */
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Customer Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Customer Name", "కస్టమర్ పేరు")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border ${
                        errors.customerName ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                  </div>
                  {errors.customerName && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.customerName}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Mobile Number", "మొబైల్ నెంబర్")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="e.g. 9848012345"
                      maxLength={10}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border ${
                        errors.mobileNumber ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Village / Town */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Village / Town", "గ్రామం / పట్టణం")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.villageTown}
                      onChange={(e) => setFormData({ ...formData, villageTown: e.target.value })}
                      placeholder="e.g. Raghunathpally / Khilashapur / Jangaon"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border ${
                        errors.villageTown ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                  </div>
                  {errors.villageTown && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.villageTown}
                    </p>
                  )}
                </div>

                {/* Street / House Address */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Street Address / Landmark", "వీధి / ఇంటి నెంబర్ / ల్యాండ్‌మార్క్")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Home className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="e.g. H.No 2-45, Near Gram Panchayat"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border ${
                        errors.address ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                      } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.address}
                    </p>
                  )}
                </div>
              </div>

              {/* Service & Product Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Service Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Service Category", "సర్వీస్ రకం")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value as ServiceCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                  >
                    {serviceCategories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Product Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Product Type", "ప్రాడక్ట్ రకం")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.productType}
                    onChange={(e) => setFormData({ ...formData, productType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                  >
                    {productTypes.map((prod) => (
                      <option key={prod} value={prod}>{prod}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Problem Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {t("Problem Description / Details", "సమస్య వివరాలు")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.problemDescription}
                  onChange={(e) => setFormData({ ...formData, problemDescription: e.target.value })}
                  placeholder={t(
                    "e.g. Water purifier leaking from bottom, bad taste, slow filtration, motor not starting...",
                    "ఉదా: నీరు లీక్ అవుతోంది, ఫిల్టర్ మార్చాలి, మోటార్ స్టార్ట్ అవ్వడం లేదు..."
                  )}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm border ${
                    errors.problemDescription ? 'border-red-500 bg-red-50/30' : 'border-slate-300'
                  } focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                />
                {errors.problemDescription && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.problemDescription}
                  </p>
                )}
              </div>

              {/* Preferred Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Preferred Date", "తేదీ")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                    />
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {t("Preferred Time Slot", "సమయం")} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-base shadow-xl hover:shadow-cyan-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Formatting WhatsApp message...</span>
                  ) : (
                    <>
                      <span>{t("Confirm Service Booking & Open WhatsApp", "సర్వీస్ వివరాలు వాట్సాప్ లో పంపండి")}</span>
                      <ArrowRight className="w-5 h-5 text-emerald-400" />
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {t("Prefer chatting directly on WhatsApp?", "నేరుగా వాట్సాప్ లో మాట్లాడాలనుకుంటున్నారా?")}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {t("Message Priya's AquaFresh directly on WhatsApp: 9182857848", "మా వాట్సాప్ నెంబర్ కు మెసేజ్ చేసి వెంటనే మాట్లాడండి")}
                    </p>
                  </div>
                </div>

                <a
                  href={getGeneralWhatsAppUrl(isTelugu)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm whitespace-nowrap transition-colors"
                >
                  Open WhatsApp Chat
                </a>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
