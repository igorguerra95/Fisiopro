import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Language } from '../types/index.ts';
import { Globe, Menu, X, PhoneCall, Sparkles } from 'lucide-react';
import { FisioProLogo } from './FisioProLogo.tsx';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenTriage: () => void;
}

export function Header({ onOpenBooking, onOpenTriage }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, href: '#inicio' },
    { label: t.nav.triage, href: '#triagem', highlight: true },
    { label: t.nav.services, href: '#especialidades' },
    { label: t.nav.howItWorks, href: '#metodo' },
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.testimonials, href: '#depoimentos' },
    { label: t.nav.contact, href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
            : 'bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Strictly 3 zones Top Bar Contract with responsive spacing */}
          <div className="flex items-center justify-between gap-2.5 sm:gap-4 lg:gap-6">
            {/* Zone 1: Clinic Official Complete Logo (Symbol + stylized text, transparent background) */}
            <a
              href="#inicio"
              className="flex items-center whitespace-nowrap shrink-0 group py-1"
              aria-label="FisioPro - Fisioterapia e Pilates"
            >
              <FisioProLogo className="h-8 sm:h-9 md:h-10 w-auto transition-transform duration-200 group-hover:scale-[1.02]" />
            </a>

            {/* Zone 2: Single-line clean text nav links (fits perfectly at 100% zoom across all screens) */}
            <nav className="hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 text-xs xl:text-[13px] 2xl:text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`hover:text-[#6B21A8] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 px-0.5 flex items-center gap-1 ${
                    link.highlight ? 'text-[#6B21A8] font-bold' : ''
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3 h-3 text-[#16A34A]" />}
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>

            {/* Zone 3: 1 primary action button + language switcher */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Language Selector */}
              <div className="hidden sm:flex items-center gap-0.5 text-[10px] sm:text-[11px] border border-slate-200 rounded-lg p-0.5 bg-slate-50/80">
                <Globe className="w-3 h-3 text-slate-400 ml-1 mr-0.5" />
                {(['pt-BR', 'en', 'es'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      language === lang
                        ? 'bg-white text-[#6B21A8] shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {lang === 'pt-BR' ? 'PT' : lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Primary Action Button */}
              <button
                onClick={onOpenBooking}
                className="hidden sm:inline-flex items-center justify-center px-3 sm:px-3.5 xl:px-4 py-2 text-xs sm:text-xs xl:text-sm font-semibold text-white bg-[#6B21A8] hover:bg-[#581C87] rounded-xl shadow-xs hover:shadow transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
              >
                {t.nav.cta}
              </button>

              {/* Mobile/Tablet hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Abrir menu de navegação"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-xs pt-20 px-4 pb-6 transition-all">
          <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-100 max-w-sm mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <FisioProLogo className="h-7 sm:h-8 w-auto" />
              <div className="flex items-center gap-1 text-xs border border-slate-200 rounded-lg p-0.5">
                {(['pt-BR', 'en', 'es'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                      language === lang
                        ? 'bg-[#6B21A8] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'pt-BR' ? 'PT' : lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-left px-3 py-2.5 rounded-lg font-medium transition-colors text-base flex items-center justify-between ${
                    link.highlight
                      ? 'text-[#6B21A8] bg-purple-50 font-bold'
                      : 'text-slate-700 hover:text-[#6B21A8] hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && <Sparkles className="w-4 h-4 text-[#16A34A]" />}
                </button>
              ))}
            </nav>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-[#6B21A8] hover:bg-[#581C87] rounded-xl shadow-sm transition-all cursor-pointer"
              >
                {t.nav.cta}
              </button>
              <a
                href="https://wa.me/5591991717181"
                target="_blank"
                rel="noreferrer noopener"
                className="w-full py-2.5 text-center text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#16A34A]" />
                (91) 99171-7181
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
