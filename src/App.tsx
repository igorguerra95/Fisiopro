/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { TriageQuiz } from './components/TriageQuiz.tsx';
import { Specialties } from './components/Specialties.tsx';
import { Methodology } from './components/Methodology.tsx';
import { About } from './components/About.tsx';
import { Testimonials } from './components/Testimonials.tsx';
import { Contact } from './components/Contact.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.tsx';
import { BookingModal } from './components/BookingModal.tsx';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined);
  const [selectedPainLevel, setSelectedPainLevel] = useState<number | undefined>(undefined);
  const [selectedComplaint, setSelectedComplaint] = useState<string | undefined>(undefined);

  const handleOpenBooking = (serviceName?: string, pain?: number, complaint?: string) => {
    setSelectedService(serviceName);
    setSelectedPainLevel(pain);
    setSelectedComplaint(complaint);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedService(undefined);
    setSelectedPainLevel(undefined);
    setSelectedComplaint(undefined);
  };

  const handleScrollToTriage = () => {
    const el = document.getElementById('triagem');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFB] text-slate-900 selection:bg-[#6B21A8]/20 selection:text-[#581C87]">
        {/* Navigation Bar */}
        <Header 
          onOpenBooking={() => handleOpenBooking()} 
          onOpenTriage={handleScrollToTriage}
        />

        {/* Main Landing Page Content */}
        <main className="flex-1">
          {/* 1. Início (Hero) */}
          <Hero 
            onOpenBooking={() => handleOpenBooking()} 
            onOpenTriage={handleScrollToTriage}
          />

          {/* 2. Triagem Interativa com Escala de Dor 0 a 10 & Recomendação */}
          <TriageQuiz 
            onSelectRecommendedService={(service, pain, complaint) => 
              handleOpenBooking(service, pain, complaint)
            }
          />

          {/* 3. Nossos Serviços (sem jargões técnicos) */}
          <Specialties onSelectService={(service) => handleOpenBooking(service)} />

          {/* 4. Como Cuidamos de Você (Passo a passo humano) */}
          <Methodology 
            onOpenBooking={() => handleOpenBooking()}
            onOpenTriage={handleScrollToTriage}
          />

          {/* 5. A Clínica no Umarizal */}
          <About onOpenBooking={() => handleOpenBooking()} />

          {/* 6. Depoimentos Reais */}
          <Testimonials />

          {/* 7. Contato & Agendamento com Escala de Dor */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsApp />

        {/* Interactive Booking Modal with Pain Level 0-10 */}
        <BookingModal
          isOpen={isBookingOpen}
          onClose={handleCloseBooking}
          preselectedService={selectedService}
          preselectedPainLevel={selectedPainLevel}
          preselectedComplaint={selectedComplaint}
        />
      </div>
    </LanguageProvider>
  );
}
