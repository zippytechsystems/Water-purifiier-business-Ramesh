import React from 'react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { BUSINESS_INFO } from '../data/mockData';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();

  return (
    <div className="w-full py-16 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <button
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t("Back to Home", "హోమ్ పేజీకి వెళ్లండి")}</span>
        </button>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
              <span>Data Protection & Ethics</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Last Updated: November 2026 | Priya's AquaFresh – Lasya Water Purifier Sales & Services
            </p>
          </div>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                When you book a service or make an enquiry with Priya's AquaFresh – Lasya Water Purifier Sales & Services, we collect essential customer contact information solely to coordinate doorstep technician visits and product deliveries:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
                <li>Customer Name</li>
                <li>Contact Mobile Number</li>
                <li>Delivery & Service Street Address and Village/Town</li>
                <li>Water Purifier Brand/Model and Problem Description</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
              <p>
                The information you provide is used strictly for legitimate business purposes:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-700">
                <li>Assigning qualified service technicians to your doorstep in Raghunathpally & Jangaon.</li>
                <li>Confirming service booking appointments and sharing arrival estimates.</li>
                <li>Maintaining service warranty and filter replacement reminder records.</li>
                <li>Communicating through direct WhatsApp and phone calls requested by you.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">3. Data Sharing & Security</h2>
              <p>
                We do not sell, rent, lease, or share your personal contact details with third-party telemarketers or advertisers. Customer service records are maintained in a secure database accessible only to authorized managerial and technical personnel.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">4. WhatsApp Business Communications</h2>
              <p>
                By clicking on our WhatsApp buttons or sending booking confirmations, you initiate direct end-to-end encrypted messaging with our official WhatsApp Business account (<strong>9182857848</strong>). You may opt-out or request deletion of your contact records at any time.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">5. Contact Information & Grievances</h2>
              <p>
                For any privacy questions or requests to update your service records, please contact:
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1">
                <p><strong>Business Name:</strong> Priya's AquaFresh – Lasya Water Purifier Sales & Services</p>
                <p><strong>Address:</strong> Khilashapur Road, Raghunathpally, Jangaon District, Telangana</p>
                <p><strong>Phone:</strong> {BUSINESS_INFO.phone}</p>
                <p><strong>WhatsApp:</strong> {BUSINESS_INFO.whatsapp}</p>
                <p><strong>GSTIN:</strong> {BUSINESS_INFO.gstNumber}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
