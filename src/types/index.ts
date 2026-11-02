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
  | 'contact'
  | 'privacy'
  | 'admin';

export type ServiceCategory = 
  | 'New Installation'
  | 'General Service'
  | 'Water Leakage'
  | 'Filter Replacement'
  | 'RO Repair'
  | 'Membrane Replacement'
  | 'Other Service';

export type BookingStatus = 
  | 'New'
  | 'Contacted'
  | 'Confirmed'
  | 'Assigned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';

export interface ServiceBooking {
  id: string;
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
  status: BookingStatus;
  assignedTechnician?: string;
  technicianPhone?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomerEnquiry {
  id: string;
  reference: string;
  name: string;
  phone: string;
  interest: string;
  villageTown?: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
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

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  role: 'super_admin' | 'service_manager' | 'technician';
  phone: string;
}
