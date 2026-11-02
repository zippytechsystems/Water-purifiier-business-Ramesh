import { ServiceBooking, Product, SparePartItem } from '../types';
import { BUSINESS_INFO } from '../data/mockData';

const WHATSAPP_NUMBER = BUSINESS_INFO.whatsapp; // 9182857848

/**
 * Clean phone number to ensure proper international format for WhatsApp API
 */
export function formatWhatsAppUrl(message: string, customPhone?: string): string {
  const phone = (customPhone || WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
  // If it's a 10 digit Indian number without country code, add 91
  const fullPhone = phone.length === 10 ? `91${phone}` : phone;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${fullPhone}?text=${encodedMessage}`;
}

/**
 * Direct WhatsApp link for Product Sales / Enquiry
 */
export function getProductWhatsAppUrl(product: Product, isTelugu: boolean = false): string {
  const greeting = isTelugu 
    ? `నమస్తే ప్రియాస్ ఆక్వాఫ్రెష్ (లాస్య వాటర్ సేల్స్ & సర్వీసెస్),` 
    : `Hello Priya's AquaFresh (Lasya Water Purifier Sales & Services),`;
  
  const interestText = isTelugu 
    ? `నేను ఈ ప్రాడక్ట్ కొనుగోలు / వివరాల కోసం సంప్రదిస్తున్నాను:` 
    : `I am interested in purchasing / enquiring about this product:`;

  const productName = isTelugu ? product.nameTe : product.nameEn;
  const warranty = isTelugu ? (product.warrantyTe || '1 Year Guaranty') : (product.warrantyEn || '1 Year Guaranty');

  const message = `${greeting}
${interestText}

📦 *${productName}*
🏷️ *Category:* ${product.category}
🛡️ *Warranty:* ${warranty}
📍 *Location:* Raghunathpally / Jangaon

దయచేసి బెస్ట్ డిస్కౌంట్ ధర, డెలివరీ మరియు ఇన్స్టాలేషన్ వివరాలు తెలియజేయగలరు.
Please share best discount price, availability and installation details.`;

  return formatWhatsAppUrl(message);
}

/**
 * Direct WhatsApp link for Service Booking Submission
 */
export function getBookingWhatsAppUrl(booking: ServiceBooking, isTelugu: boolean = false): string {
  const title = isTelugu 
    ? `*లాస్య వాటర్ ప్యూరిఫైయర్ - సర్వీస్ బుకింగ్ అభ్యర్థన*`
    : `*PRIYA'S AQUAFRESH – SERVICE BOOKING REQUEST*`;

  const message = `${title}
━━━━━━━━━━━━━━━━━━━
📋 *Booking Ref:* #${booking.reference}
👤 *Customer Name:* ${booking.customerName}
📱 *Mobile Number:* ${booking.mobileNumber}
📍 *Village / Town:* ${booking.villageTown}
🏠 *Address:* ${booking.address}
━━━━━━━━━━━━━━━━━━━
🛠️ *Service Required:* ${booking.serviceCategory}
⚙️ *Product Type:* ${booking.productType}
⚠️ *Problem Description:* ${booking.problemDescription}
📅 *Preferred Date:* ${booking.preferredDate}
⏰ *Preferred Time:* ${booking.preferredTime}
━━━━━━━━━━━━━━━━━━━
దయచేసి ఈ సర్వీస్ బుకింగ్ ను కన్ఫర్మ్ చేసి టెక్నీషియన్ విజిట్ వివరాలు తెలియజేయగలరు.
Please confirm this service booking and technician visit timing.`;

  return formatWhatsAppUrl(message);
}

/**
 * Direct WhatsApp link for Specific Service Cards
 */
export function getServiceEnquiryWhatsAppUrl(serviceTitle: string, isTelugu: boolean = false): string {
  const greeting = isTelugu 
    ? `నమస్తే ప్రియాస్ ఆక్వాఫ్రెష్ (లాస్య వాటర్ సర్వీసెస్),`
    : `Hello Priya's AquaFresh (Lasya Water Services),`;

  const message = `${greeting}
నాకు వాటర్ ప్యూరిఫైయర్ సర్వీస్ సాయం కావాలి:
🔧 *Service:* ${serviceTitle}
📍 *Location:* Raghunathpally / Jangaon Area

దయచేసి ఎప్పుడు టెక్నీషియన్ అందుబాటులో ఉంటారో మరియు ఛార్జీలు తెలియజేయగలరు.
Please let me know technician availability and estimated service charges.`;

  return formatWhatsAppUrl(message);
}

/**
 * Direct WhatsApp link for Spare Parts Enquiry
 */
export function getSparePartWhatsAppUrl(part: SparePartItem, isTelugu: boolean = false): string {
  const partName = isTelugu ? part.nameTe : part.nameEn;
  const message = `Hello Priya's AquaFresh (Lasya Water Purifier),
I need genuine spare parts:

⚙️ *Part Name:* ${partName}
🔧 *Category:* ${part.category}
🎯 *Compatibility:* ${part.compatibility}
📦 *Stock Status:* Available

దయచేసి స్టాక్ మరియు బెస్ట్ ప్రైస్ తెలియజేయగలరు.
Please confirm stock availability and pricing for delivery in Raghunathpally / Jangaon area.`;

  return formatWhatsAppUrl(message);
}

/**
 * Direct General WhatsApp Inquiry
 */
export function getGeneralWhatsAppUrl(isTelugu: boolean = false): string {
  const message = isTelugu 
    ? `నమస్తే ప్రియాస్ ఆక్వాఫ్రెష్ - లాస్య వాటర్ సేల్స్ & సర్వీసెస్, నేను వాటర్ ప్యూరిఫైయర్ సేల్స్ మరియు సర్వీస్ వివరాల కోసం సంప్రదిస్తున్నాను.`
    : `Hello Priya's AquaFresh - Lasya Water Purifier Sales & Services, I am contacting you for water purifier sales, installation, or service assistance.`;

  return formatWhatsAppUrl(message);
}

/**
 * Admin direct reply to customer on WhatsApp
 */
export function getAdminCustomerWhatsAppUrl(customerPhone: string, customerName: string, bookingRef: string): string {
  const message = `Hello ${customerName},
Greetings from *Priya's AquaFresh – Lasya Water Purifier Sales & Services*, Raghunathpally.

We have received your Service Request #${bookingRef}.
Our technician is reviewing your request. Please let us know if you need any immediate assistance.
📞 Contact: ${BUSINESS_INFO.phone}`;

  return formatWhatsAppUrl(message, customerPhone);
}
