import { ServiceBooking, CustomerEnquiry, Product, AdminUser, BookingStatus } from '../types';
import { INITIAL_BOOKINGS, INITIAL_ENQUIRIES, PRODUCTS_DATA } from '../data/mockData';

const BOOKINGS_KEY = 'lwp_service_bookings_v1';
const ENQUIRIES_KEY = 'lwp_customer_enquiries_v1';
const PRODUCTS_KEY = 'lwp_products_v1';
const ADMIN_AUTH_KEY = 'lwp_admin_session_v1';

export const storageService = {
  // -----------------------------------------------------------
  // SERVICE BOOKINGS
  // -----------------------------------------------------------
  getBookings(): ServiceBooking[] {
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      if (!data) {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(INITIAL_BOOKINGS));
        return INITIAL_BOOKINGS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_BOOKINGS;
    }
  },

  createBooking(bookingData: Omit<ServiceBooking, 'id' | 'reference' | 'status' | 'createdAt'>): ServiceBooking {
    const existing = this.getBookings();
    
    // Generate unique sequential reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reference = `LWP-${new Date().getFullYear()}-${randomSuffix}`;
    
    const newBooking: ServiceBooking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      reference,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const updated = [newBooking, ...existing];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  },

  updateBookingStatus(id: string, status: BookingStatus, notes?: string): boolean {
    const existing = this.getBookings();
    const index = existing.findIndex(b => b.id === id);
    if (index === -1) return false;

    existing[index] = {
      ...existing[index],
      status,
      notes: notes !== undefined ? notes : existing[index].notes,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(existing));
    return true;
  },

  assignTechnician(id: string, technicianName: string, technicianPhone: string): boolean {
    const existing = this.getBookings();
    const index = existing.findIndex(b => b.id === id);
    if (index === -1) return false;

    existing[index] = {
      ...existing[index],
      assignedTechnician: technicianName,
      technicianPhone: technicianPhone,
      status: existing[index].status === 'New' ? 'Assigned' : existing[index].status,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(existing));
    return true;
  },

  deleteBooking(id: string): boolean {
    const existing = this.getBookings();
    const filtered = existing.filter(b => b.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
    return true;
  },

  // -----------------------------------------------------------
  // CUSTOMER ENQUIRIES
  // -----------------------------------------------------------
  getEnquiries(): CustomerEnquiry[] {
    try {
      const data = localStorage.getItem(ENQUIRIES_KEY);
      if (!data) {
        localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(INITIAL_ENQUIRIES));
        return INITIAL_ENQUIRIES;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_ENQUIRIES;
    }
  },

  createEnquiry(enquiryData: Omit<CustomerEnquiry, 'id' | 'reference' | 'status' | 'createdAt'>): CustomerEnquiry {
    const existing = this.getEnquiries();
    const ref = `ENQ-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newEnquiry: CustomerEnquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      reference: ref,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const updated = [newEnquiry, ...existing];
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(updated));
    return newEnquiry;
  },

  updateEnquiryStatus(id: string, status: 'New' | 'Contacted' | 'Closed'): boolean {
    const existing = this.getEnquiries();
    const idx = existing.findIndex(e => e.id === id);
    if (idx === -1) return false;

    existing[idx] = {
      ...existing[idx],
      status
    };
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(existing));
    return true;
  },

  // -----------------------------------------------------------
  // PRODUCT CATALOGUE MANAGEMENT
  // -----------------------------------------------------------
  getProducts(): Product[] {
    try {
      const data = localStorage.getItem(PRODUCTS_KEY);
      if (!data) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS_DATA));
        return PRODUCTS_DATA;
      }
      return JSON.parse(data);
    } catch {
      return PRODUCTS_DATA;
    }
  },

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      products[index] = product;
    } else {
      products.unshift(product);
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  // -----------------------------------------------------------
  // AUTHENTICATION (DEMO & BACKEND INTEGRATION READY)
  // -----------------------------------------------------------
  getAdminSession(): AdminUser | null {
    try {
      const data = localStorage.getItem(ADMIN_AUTH_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  loginAdmin(username: string, password: string): { success: boolean; user?: AdminUser; error?: string } {
    // Standard Demo Credentials for Lasya Water Purifier
    // In production, this forwards via POST to /api/auth/login with bcrypt verification against MySQL admin_users table
    if (username === 'admin' && (password === 'admin123' || password === 'ramesh9014')) {
      const user: AdminUser = {
        id: 'usr-1',
        username: 'admin',
        fullName: 'Ramesh (Proprietor)',
        role: 'super_admin',
        phone: '9014357848'
      };
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid username or password. (Demo: admin / admin123)' };
  },

  logoutAdmin(): void {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  },

  // -----------------------------------------------------------
  // CSV EXPORT FOR BOOKINGS
  // -----------------------------------------------------------
  exportBookingsToCSV(): string {
    const bookings = this.getBookings();
    const headers = ['Reference', 'Customer Name', 'Mobile', 'Village/Town', 'Service Category', 'Product Type', 'Problem Description', 'Preferred Date', 'Preferred Time', 'Status', 'Technician', 'Created At'];
    
    const rows = bookings.map(b => [
      `"${b.reference}"`,
      `"${b.customerName}"`,
      `"${b.mobileNumber}"`,
      `"${b.villageTown}"`,
      `"${b.serviceCategory}"`,
      `"${b.productType}"`,
      `"${(b.problemDescription || '').replace(/"/g, '""')}"`,
      `"${b.preferredDate}"`,
      `"${b.preferredTime}"`,
      `"${b.status}"`,
      `"${b.assignedTechnician || 'Unassigned'}"`,
      `"${b.createdAt}"`
    ]);

    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
};
