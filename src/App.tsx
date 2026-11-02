import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { WaterPurifiersPage } from './pages/WaterPurifiersPage';
import { AppliancesPage } from './pages/AppliancesPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceBookingPage } from './pages/ServiceBookingPage';
import { SparePartsPage } from './pages/SparePartsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageRoute>(() => {
    // Check URL hash for direct links or fallback to home
    const hash = window.location.hash.replace('#', '') as PageRoute;
    const validPages: PageRoute[] = [
      'home', 'about', 'water-purifiers', 'appliances', 'services', 
      'service-booking', 'spare-parts', 'gallery', 'contact', 'privacy'
    ];
    return validPages.includes(hash) ? hash : 'home';
  });

  const [selectedService, setSelectedService] = useState<string>('General Service');

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validPages: PageRoute[] = [
        'home', 'about', 'water-purifiers', 'appliances', 'services', 
        'service-booking', 'spare-parts', 'gallery', 'contact', 'privacy'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Navigation Header */}
      <Header currentPage={currentPage} onNavigate={navigateTo} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={navigateTo} 
            onSelectService={(srv) => setSelectedService(srv)} 
          />
        )}

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

        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}

        {currentPage === 'privacy' && (
          <PrivacyPolicyPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Corporate Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Floating Call & WhatsApp Buttons */}
      <FloatingActions onNavigate={navigateTo} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
