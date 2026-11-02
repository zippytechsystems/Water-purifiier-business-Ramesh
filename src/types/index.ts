export type Language = 'en' | 'te';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'water-purifiers'
  | 'appliances'
  | 'services'
  | 'service-booking'
  | 'spare-parts'
  | 'gallery'
  | 'reviews'
  | 'contact'
  | 'privacy';

export interface CustomerReview {
  id: string | number;
  customerName: string;
  villageTown: string;
  rating: number;
  serviceAvailed: string;
  comment: string;
  createdAt: string;
  isVerified?: boolean;
}

export type ServiceCategory = 
  | 'New Installation'
  | 'General Service'
  | 'Water Leakage'
  | 'Filter Replacement'
  | 'RO Repair'
  | 'Membrane Replacement'
  | 'Other Service';

export interface ServiceBookingData {
  reference: string;
  customerName: string;
  mobileNumber: string;
  address: string;
  villageTown: string;
  serviceCategory: ServiceCategory;
  productType: string;
  problemDescription: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
}

export interface CustomerEnquiryData {
  reference: string;
  name: string;
  phone: string;
  interest: string;
  villageTown?: string;
  message: string;
  createdAt: string;
}

export interface Product {
  id: string;
  nameEn: string;
  nameTe: string;
  category: 'water-purifiers' | 'fridges' | 'washing-machines' | 'air-coolers' | 'ac-spare-parts';
  subCategory?: string;
  descriptionEn: string;
  descriptionTe: string;
  featuresEn: string[];
  featuresTe: string[];
  imageUrl: string;
  warrantyEn?: string;
  warrantyTe?: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleTe: string;
  category: ServiceCategory;
  descriptionEn: string;
  descriptionTe: string;
  iconName: string;
  estimatedTime: string;
  highlightsEn: string[];
  highlightsTe: string[];
}

export interface SparePartItem {
  id: string;
  nameEn: string;
  nameTe: string;
  category: string;
  compatibility: string;
  descriptionEn: string;
  descriptionTe: string;
  imageUrl: string;
  inStock: boolean;
}

export interface GalleryItem {
  id: string;
  titleEn: string;
  titleTe: string;
  category: 'showroom' | 'products' | 'service' | 'purity';
  imageUrl: string;
  captionEn: string;
  captionTe: string;
}

export interface ServiceArea {
  id: string;
  nameEn: string;
  nameTe: string;
  category: 'primary' | 'hub' | 'village' | 'mandal';
  pincode: string;
  distanceKm: string;
  highlightEn: string;
  highlightTe: string;
}

