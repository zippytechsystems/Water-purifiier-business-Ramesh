import React, { useState, useEffect, Suspense, lazy } from 'react';
import { PageRoute } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { InstallAppModal } from './components/InstallAppModal';
import { HomePage } from './pages/HomePage';

// Code-split non-critical routes for faster initial load & higher Lighthouse score
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const WaterPurifiersPage = lazy(() => import('./pages/WaterPurifiersPage').then(m => ({ default: m.WaterPurifiersPage })));
const AppliancesPage = lazy(() => import('./pages/AppliancesPage').then(m => ({ default: m.AppliancesPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage })));
const ServiceBookingPage = lazy(() => import('./pages/ServiceBookingPage').then(m => ({ default: m.ServiceBookingPage })));
const SparePartsPage = lazy(() => import('./pages/SparePartsPage').then(m => ({ default: m.SparePartsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage').then(m => ({ default: m.ReviewsPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));

const PageFallback = () => (
  <div className="min-h-[60vh] flex items-center justify-center" aria-label="Loading page">
    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

const validPages: PageRoute[] = [
  'home', 'about', 'water-purifiers', 'appliances', 'services', 
  'service-booking', 'spare-parts', 'gallery', 'reviews', 'contact', 'privacy'
];

export function AppContent() {
  const { scrollToTop } = useSmoothScroll();
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    const hash = window.location.hash.replace('#', '') as PageRoute;
    return validPages.includes(hash) ? hash : 'home';
  });

  const [selectedService, setSelectedService] = useState<string>('General Service');
  const [isInstallModalOpen, setIsInstallModalOpen] = useState<boolean>(false);

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    scrollToTop(false);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
        scrollToTop(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [scrollToTop]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Navigation Header */}
      <Header 
        currentPage={currentPage} 
        onNavigate={navigateTo} 
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigateTo} 
            onSelectService={(srv) => setSelectedService(srv)}
            onOpenInstallModal={() => setIsInstallModalOpen(true)}
          />
        )}

        <Suspense fallback={<PageFallback />}>
          {currentPage === 'about' && (
            <AboutPage onNavigate={navigateTo} />
          )}

          {currentPage === 'water-purifiers' && (
            <WaterPurifiersPage 
              onNavigate={navigateTo} 
              onSelectService={(srv) => setSelectedService(srv)} 
            />
          )}

          {currentPage === 'appliances' && (
            <AppliancesPage onNavigate={navigateTo} />
          )}

          {currentPage === 'services' && (
            <ServicesPage 
              onNavigate={navigateTo} 
              onSelectService={(srv) => setSelectedService(srv)} 
            />
          )}

          {currentPage === 'service-booking' && (
            <ServiceBookingPage 
              initialService={selectedService} 
              onNavigateHome={() => navigateTo('home')} 
            />
          )}

          {currentPage === 'spare-parts' && (
            <SparePartsPage onNavigate={navigateTo} />
          )}

          {currentPage === 'gallery' && (
            <GalleryPage onNavigate={navigateTo} />
          )}

          {currentPage === 'reviews' && (
            <ReviewsPage onNavigate={navigateTo} />
          )}

          {currentPage === 'contact' && (
            <ContactPage onNavigate={navigateTo} />
          )}

          {currentPage === 'privacy' && (
            <PrivacyPolicyPage onNavigate={navigateTo} />
          )}
        </Suspense>
      </main>

      {/* Corporate Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions onNavigate={navigateTo} />

      {/* Cross-Device PWA Install Modal */}
      <InstallAppModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <AppContent />
      </SmoothScrollProvider>
    </LanguageProvider>
  );
}

export default App;
