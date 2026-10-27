import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { MapPin, Phone, Clock, ArrowUp } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-2.5 text-lg font-bold text-white mb-3">
              <img
                src="/src/assets/images/fisiopro_logo.svg"
                alt="Logo FisioPro"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display tracking-tight text-white">
                Fisio<span className="text-[#A855F7]">Pro</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6 max-w-sm">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <span>Fisioterapia Especializada & Pilates</span>
              <span aria-hidden="true">·</span>
              <span>Umarizal · Belém</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.linksTitle}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#triagem" className="hover:text-white transition-colors text-purple-300 font-medium">
                  {t.nav.triage}
                </a>
              </li>
              <li>
                <a href="#especialidades" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="#metodo" className="hover:text-white transition-colors">
                  {t.nav.howItWorks}
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="#depoimentos" className="hover:text-white transition-colors">
                  {t.nav.testimonials}
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Specialties (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.servicesTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>Reabilitação Ortopédica e Esportiva</li>
              <li>Pilates Clínico</li>
              <li>Programa de Prevenção de Lesões e Longevidade</li>
              <li>Recovery de Alta Performance</li>
              <li>Home Care e Cobertura de Eventos Esportivos</li>
            </ul>
          </div>

          {/* Contact & Location (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  Av. Alcindo Cacela, 624 - Umarizal, Belém - PA
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#22C55E] shrink-0" />
                <a
                  href="https://wa.me/5591991717181"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-slate-200 hover:text-white font-semibold transition-colors"
                >
                  (91) 99171-7181
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-relaxed">
                  Segunda a Sexta: 07h às 12h e 14h às 19h<br />
                  Sábado: 8h às 13h
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} {t.footer.rights}</p>
          <p>{t.footer.notice}</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Voltar ao topo da página"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
