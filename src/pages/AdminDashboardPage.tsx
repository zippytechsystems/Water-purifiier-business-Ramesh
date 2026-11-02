import React, { useState, useEffect } from 'react';
import { PageRoute, ServiceBooking, CustomerEnquiry, Product, AdminUser, BookingStatus } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { storageService } from '../services/storageService';
import { getAdminCustomerWhatsAppUrl } from '../utils/whatsapp';
import { BUSINESS_INFO } from '../data/mockData';
import { 
  Lock, 
  User, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Layers, 
  LogOut, 
  FileDown, 
  MessageCircle, 
  Phone, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Plus, 
  Printer, 
  Database,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Inbox
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { isTelugu, t } = useLanguage();

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => storageService.getAdminSession());
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: '' });
  const [loginError, setLoginError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<'bookings' | 'enquiries' | 'products' | 'database'>('bookings');

  // Live Data State
  const [bookings, setBookings] = useState<ServiceBooking[]>([]);
  const [enquiries, setEnquiries] = useState<CustomerEnquiry[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Filtering
  const [bookingFilterStatus, setBookingFilterStatus] = useState<string>('All');
  const [bookingSearch, setBookingSearch] = useState<string>('');

  // Assign Technician Modal State
  const [assignModalBooking, setAssignModalBooking] = useState<ServiceBooking | null>(null);
  const [technicianName, setTechnicianName] = useState('Ramesh (Lead Technician)');
  const [technicianPhone, setTechnicianPhone] = useState('9014357848');

  // Add Product Modal State
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    nameEn: '',
    nameTe: '',
    category: 'water-purifiers' as const,
    subCategory: 'Domestic RO',
    descriptionEn: '',
    descriptionTe: '',
    imageUrl: '/images/products/water-purifiers/priya-aquafresh-sleek-ro.png',
    warrantyEn: '1 Year Guaranty'
  });

  const loadData = () => {
    setBookings(storageService.getBookings());
    setEnquiries(storageService.getEnquiries());
    setProducts(storageService.getProducts());
  };

  useEffect(() => {
    if (adminUser) {
      loadData();
    }
  }, [adminUser]);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = storageService.loginAdmin(loginForm.username, loginForm.password);
    if (res.success && res.user) {
      setAdminUser(res.user);
      setLoginError('');
      loadData();
    } else {
      setLoginError(res.error || 'Authentication failed.');
    }
  };

  const handleLogout = () => {
    storageService.logoutAdmin();
    setAdminUser(null);
  };

  // Status Change
  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    storageService.updateBookingStatus(id, newStatus);
    loadData();
  };

  // Assign Technician Submit
  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (assignModalBooking) {
      storageService.assignTechnician(assignModalBooking.id, technicianName, technicianPhone);
      setAssignModalBooking(null);
      loadData();
    }
  };

  // Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.nameEn.trim()) return;

    const createdProd: Product = {
      id: `p-${Date.now()}`,
      nameEn: newProduct.nameEn,
      nameTe: newProduct.nameTe || newProduct.nameEn,
      category: newProduct.category,
      subCategory: newProduct.subCategory,
      descriptionEn: newProduct.descriptionEn,
      descriptionTe: newProduct.descriptionTe || newProduct.descriptionEn,
      featuresEn: ["Original Components", "Doorstep Delivery"],
      featuresTe: ["ఒరిజినల్ భాగాలు", "డోర్‌స్టెప్ డెలివరీ"],
      imageUrl: newProduct.imageUrl,
      warrantyEn: newProduct.warrantyEn,
      warrantyTe: "1 ఇయర్ గ్యారంటీ"
    };

    storageService.saveProduct(createdProd);
    setIsAddProductOpen(false);
    loadData();
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = storageService.exportBookingsToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `lasya_water_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print Job Sheet
  const handlePrintBooking = (booking: ServiceBooking) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Service Job Sheet #${booking.reference}</title>
          <style>
            body { font-family: sans-serif; padding: 24px; color: #111; }
            .header { border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 20px; }
            .title { font-size: 20px; font-weight: bold; }
            .meta { font-size: 13px; color: #555; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }
            th, td { border: 1px solid #ccc; padding: 8px 12px; text-align: left; }
            th { background: #f0f0f0; width: 35%; }
            .sign { margin-top: 50px; display: flex; justify-content: space-between; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Priya's AquaFresh – Lasya Water Purifier Sales & Services</div>
            <div class="meta">Khilashapur Road, Raghunathpally, Jangaon Dist. | Phone: 9014357848 / 9182857848 | GST: 36ETWPA6540J1Z7</div>
          </div>
          <h3>TECHNICIAN FIELD SERVICE JOB SHEET</h3>
          <table>
            <tr><th>Job Sheet Reference</th><td><strong>${booking.reference}</strong></td></tr>
            <tr><th>Customer Name</th><td>${booking.customerName}</td></tr>
            <tr><th>Mobile Number</th><td>${booking.mobileNumber}</td></tr>
            <tr><th>Service Category</th><td><strong>${booking.serviceCategory}</strong></td></tr>
            <tr><th>Product / Machine</th><td>${booking.productType}</td></tr>
            <tr><th>Problem Reported</th><td>${booking.problemDescription}</td></tr>
            <tr><th>Village / Town</th><td>${booking.villageTown}</td></tr>
            <tr><th>Address</th><td>${booking.address}</td></tr>
            <tr><th>Appointment Date & Time</th><td>${booking.preferredDate} (${booking.preferredTime})</td></tr>
            <tr><th>Current Status</th><td>${booking.status}</td></tr>
            <tr><th>Assigned Technician</th><td>${booking.assignedTechnician || 'Unassigned'} (${booking.technicianPhone || ''})</td></tr>
            <tr><th>Technician Resolution Notes</th><td></td></tr>
            <tr><th>TDS Reading (Input / Output)</th><td>Input: ______ ppm | Output: ______ ppm</td></tr>
          </table>
          <div class="sign">
            <div>Customer Signature: _______________________</div>
            <div>Technician Signature: _______________________</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  // KPIs
  const totalBookings = bookings.length;
  const newBookings = bookings.filter(b => b.status === 'New').length;
  const inProgressBookings = bookings.filter(b => b.status === 'In Progress' || b.status === 'Assigned' || b.status === 'Confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'Completed').length;
  const totalEnquiries = enquiries.length;

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesStatus = bookingFilterStatus === 'All' || b.status === bookingFilterStatus;
    const matchesSearch = 
      b.customerName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.mobileNumber.includes(bookingSearch) ||
      b.reference.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.villageTown.toLowerCase().includes(bookingSearch.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // =======================================================
  // 1. ADMIN LOGIN SCREEN IF NOT AUTHENTICATED
  // =======================================================
  if (!adminUser) {
    return (
      <div className="w-full py-20 bg-slate-900 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-700">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white mx-auto flex items-center justify-center shadow-lg mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Admin Management Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Priya's AquaFresh – Lasya Water Purifier Sales & Services
            </p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs mb-5 flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <p className="font-semibold text-slate-700 mb-0.5">Demo Credentials:</p>
              <p>Username: <code className="text-cyan-700 font-bold">admin</code> | Password: <code className="text-cyan-700 font-bold">admin123</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Secure Login
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // =======================================================
  return (
    <div className="w-full py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Bar */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900">Admin Operations Dashboard</h1>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Live</span>
              </div>
              <p className="text-xs text-slate-500">
                Logged in as <strong>{adminUser.fullName}</strong> ({adminUser.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title="Download Bookings as CSV spreadsheet"
            >
              <FileDown className="w-4 h-4 text-cyan-600" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold cursor-pointer"
            >
              View Site
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Total Bookings</span>
            <span className="text-2xl font-black text-slate-900">{totalBookings}</span>
            <span className="text-[10px] text-slate-500 block mt-1">Recorded services</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs">
            <span className="text-[11px] font-bold text-amber-600 uppercase block mb-1">New Unassigned</span>
            <span className="text-2xl font-black text-amber-700">{newBookings}</span>
            <span className="text-[10px] text-amber-600 font-semibold block mt-1">Action required</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-xs">
            <span className="text-[11px] font-bold text-blue-600 uppercase block mb-1">In Progress</span>
            <span className="text-2xl font-black text-blue-700">{inProgressBookings}</span>
            <span className="text-[10px] text-blue-600 block mt-1">Confirmed / Assigned</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
            <span className="text-[11px] font-bold text-emerald-600 uppercase block mb-1">Completed</span>
            <span className="text-2xl font-black text-emerald-700">{completedBookings}</span>
            <span className="text-[10px] text-emerald-600 block mt-1">Successfully resolved</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">Enquiries</span>
            <span className="text-2xl font-black text-slate-900">{totalEnquiries}</span>
            <span className="text-[10px] text-slate-500 block mt-1">Customer questions</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 px-4 font-bold text-sm cursor-pointer border-b-2 transition-all ${
              activeTab === 'bookings'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Service Bookings ({totalBookings})
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-3 px-4 font-bold text-sm cursor-pointer border-b-2 transition-all ${
              activeTab === 'enquiries'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer Leads & Enquiries ({totalEnquiries})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 px-4 font-bold text-sm cursor-pointer border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Product Catalogue Manager
          </button>
          <button
            onClick={() => setActiveTab('database')}
            className={`pb-3 px-4 font-bold text-sm cursor-pointer border-b-2 transition-all ${
              activeTab === 'database'
                ? 'border-cyan-600 text-cyan-700'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            MySQL Database Architecture
          </button>
        </div>

        {/* ======================================================= */}
        {/* TAB 1: SERVICE BOOKINGS MANAGEMENT                      */}
        {/* ======================================================= */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {['All', 'New', 'Confirmed', 'Assigned', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setBookingFilterStatus(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap ${
                      bookingFilterStatus === status
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  placeholder="Search customer, phone, ref..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-extrabold tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Ref & Date</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">Service & Product</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Slot</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Technician</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-10 text-center text-slate-400">
                          No service bookings found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-extrabold text-slate-900 block">{b.reference}</span>
                            <span className="text-[10px] text-slate-400">
                              {new Date(b.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-900 block">{b.customerName}</span>
                            <a href={`tel:${b.mobileNumber}`} className="text-cyan-600 hover:underline">
                              {b.mobileNumber}
                            </a>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 block">{b.serviceCategory}</span>
                            <span className="text-[11px] text-slate-500 block truncate max-w-[180px]">
                              {b.productType}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-medium text-slate-700 block">{b.villageTown}</span>
                            <span className="text-[11px] text-slate-400 truncate max-w-[150px] block">
                              {b.address}
                            </span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className="font-medium text-slate-800 block">{b.preferredDate}</span>
                            <span className="text-[10px] text-slate-500">{b.preferredTime}</span>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            <select
                              value={b.status}
                              onChange={(e) => handleStatusChange(b.id, e.target.value as BookingStatus)}
                              className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                                b.status === 'Completed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : b.status === 'New'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : b.status === 'In Progress' || b.status === 'Assigned'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : 'bg-slate-100 text-slate-700 border-slate-300'
                              } focus:outline-none`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Assigned">Assigned</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          <td className="py-3 px-4 whitespace-nowrap">
                            {b.assignedTechnician ? (
                              <div>
                                <span className="font-bold text-slate-800 block">{b.assignedTechnician}</span>
                                <span className="text-[10px] text-slate-500">{b.technicianPhone}</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => setAssignModalBooking(b)}
                                className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold cursor-pointer"
                              >
                                + Assign
                              </button>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right whitespace-nowrap space-x-1.5">
                            {/* WhatsApp Direct Reply to Customer */}
                            <a
                              href={getAdminCustomerWhatsAppUrl(b.mobileNumber, b.customerName, b.reference)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 inline-flex items-center"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                            </a>

                            {/* Print Job Sheet */}
                            <button
                              onClick={() => handlePrintBooking(b)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 inline-flex items-center cursor-pointer"
                              title="Print Technician Job Sheet"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => {
                                if (confirm(`Delete booking #${b.reference}?`)) {
                                  storageService.deleteBooking(b.id);
                                  loadData();
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 inline-flex items-center cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 2: CUSTOMER LEADS & ENQUIRIES                       */}
        {/* ======================================================= */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[10px] font-extrabold tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Ref</th>
                    <th className="py-3 px-4">Name & Phone</th>
                    <th className="py-3 px-4">Interest</th>
                    <th className="py-3 px-4">Village</th>
                    <th className="py-3 px-4">Message</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {enquiries.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-mono font-bold text-slate-700">{e.reference}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{e.name}</span>
                        <a href={`tel:${e.phone}`} className="text-cyan-600 hover:underline">{e.phone}</a>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">{e.interest}</td>
                      <td className="py-3 px-4 text-slate-600">{e.villageTown || 'N/A'}</td>
                      <td className="py-3 px-4 max-w-xs text-slate-600">{e.message}</td>
                      <td className="py-3 px-4">
                        <select
                          value={e.status}
                          onChange={(ev) => {
                            storageService.updateEnquiryStatus(e.id, ev.target.value as any);
                            loadData();
                          }}
                          className="px-2 py-1 rounded border border-slate-300 text-xs font-semibold"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a
                          href={getAdminCustomerWhatsAppUrl(e.phone, e.name, e.reference)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 inline-flex items-center"
                          title="Reply on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 3: PRODUCT CATALOGUE MANAGER                        */}
        {/* ======================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-600">Total Products in Catalogue: {products.length}</span>
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="aspect-4/3 bg-slate-100 rounded-xl overflow-hidden mb-3 p-2 flex items-center justify-center">
                      <img src={p.imageUrl} alt={p.nameEn} className="max-h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold text-cyan-600 uppercase block">{p.category}</span>
                    <h3 className="font-bold text-slate-900 text-sm mb-1">{p.nameEn}</h3>
                    <p className="text-xs text-slate-500 font-telugu">{p.nameTe}</p>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2">{p.descriptionEn}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-4">
                    <span>{p.warrantyEn || '1 Year Guaranty'}</span>
                    <span className="text-emerald-600 font-bold">Active in Catalog</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 4: MYSQL DATABASE ARCHITECTURE & API                */}
        {/* ======================================================= */}
        {activeTab === 'database' && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">MySQL Database Architecture & SQL Schema</h3>
                <p className="text-xs text-slate-500">
                  Ready for production deployment at Hostinger or any Linux VPS with Node/PHP/MySQL.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The project includes a complete relational database schema generated in <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-cyan-700">/database/schema.sql</code>. It includes tables for <code>admin_users</code>, <code>product_categories</code>, <code>products</code>, <code>services</code>, <code>service_bookings</code>, <code>customer_enquiries</code>, <code>spare_parts</code>, and a high-performance reporting view <code>v_dashboard_kpis</code>.
            </p>

            <div className="bg-slate-950 text-cyan-400 p-4 rounded-2xl font-mono text-xs overflow-x-auto space-y-2">
              <p className="text-slate-400">-- Quick Database Verification Command:</p>
              <p className="text-white">mysql -u root -p &lt; database/schema.sql</p>
              <p className="text-slate-500 mt-2">-- Core Tables Provisioned:</p>
              <p className="text-emerald-400">✓ admin_users (Super admin & technician roles)</p>
              <p className="text-emerald-400">✓ service_bookings (Unique reference, mobile, slots, technician assign)</p>
              <p className="text-emerald-400">✓ customer_enquiries (WhatsApp & web leads)</p>
              <p className="text-emerald-400">✓ products & categories (Water purifiers & appliances)</p>
            </div>
          </div>
        )}

        {/* Modal: Assign Technician */}
        {assignModalBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Assign Technician to Job #{assignModalBooking.reference}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Customer: {assignModalBooking.customerName} ({assignModalBooking.villageTown})
              </p>

              <form onSubmit={handleAssignSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Technician Name</label>
                  <input
                    type="text"
                    value={technicianName}
                    onChange={(e) => setTechnicianName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Technician Mobile</label>
                  <input
                    type="tel"
                    value={technicianPhone}
                    onChange={(e) => setTechnicianPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300"
                    required
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs"
                  >
                    Confirm Assignment
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssignModalBooking(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Product */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Add Product to Catalogue</h3>
              <form onSubmit={handleAddProductSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title (English)</label>
                  <input
                    type="text"
                    value={newProduct.nameEn}
                    onChange={(e) => setNewProduct({ ...newProduct, nameEn: e.target.value })}
                    placeholder="e.g. Copper Alkaline RO Purifier"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title (Telugu)</label>
                  <input
                    type="text"
                    value={newProduct.nameTe}
                    onChange={(e) => setNewProduct({ ...newProduct, nameTe: e.target.value })}
                    placeholder="e.g. కాపర్ ఆల్కలైన్ RO ప్యూరిఫైయర్"
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300 bg-white"
                    >
                      <option value="water-purifiers">Water Purifiers</option>
                      <option value="fridges">Refrigerators</option>
                      <option value="washing-machines">Washing Machines</option>
                      <option value="air-coolers">Air Coolers</option>
                      <option value="ac-spare-parts">AC Spare Parts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Warranty</label>
                    <input
                      type="text"
                      value={newProduct.warrantyEn}
                      onChange={(e) => setNewProduct({ ...newProduct, warrantyEn: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description</label>
                  <textarea
                    value={newProduct.descriptionEn}
                    onChange={(e) => setNewProduct({ ...newProduct, descriptionEn: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 rounded-xl text-xs border border-slate-300"
                  ></textarea>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Save Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddProductOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
