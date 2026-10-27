import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  Activity, 
  Layers, 
  Heart, 
  Dumbbell, 
  Home, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

import biomechanicalImg from '../assets/images/biomechanical_assessment_1792168105582.jpg';
import pilatesClinicoImg from '../assets/images/pilates_clinico_studio_1793051447045.jpg';
import injuryPreventionImg from '../assets/images/injury_prevention_assessment_1793049797414.jpg';
import recoveryImg from '../assets/images/sports_rehab_recovery_1792168105679.jpg';
import homeCareImg from '../assets/images/home_care_physiotherapy_1793049985747.jpg';

interface SpecialtiesProps {
  onSelectService: (serviceName: string) => void;
}

export function Specialties({ onSelectService }: SpecialtiesProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>('reab-ortopedica-esportiva');

  const tabIcons: Record<string, React.ReactNode> = {
    'reab-ortopedica-esportiva': <Activity className="w-4 h-4" />,
    'pilates-clinico': <Layers className="w-4 h-4" />,
    'prevencao-lesoes': <Heart className="w-4 h-4" />,
    'recovery-muscular': <Dumbbell className="w-4 h-4" />,
    'home-care': <Home className="w-4 h-4" />,
  };

  const imagesMap: Record<string, string> = {
    'reab-ortopedica-esportiva': biomechanicalImg,
    'pilates-clinico': pilatesClinicoImg,
    'prevencao-lesoes': injuryPreventionImg,
    'recovery-muscular': recoveryImg,
    'home-care': homeCareImg,
  };

  const imagePositionMap: Record<string, string> = {
    'reab-ortopedica-esportiva': 'object-[center_20%]',
    'pilates-clinico': 'object-[center_42%]',
    'prevencao-lesoes': 'object-[center_22%]',
    'recovery-muscular': 'object-[center_35%]',
    'home-care': 'object-[center_22%]',
  };

  const currentService = t.specialties.items.find((item) => item.id === activeTab) || t.specialties.items[0];

  return (
    <section id="especialidades" className="py-20 lg:py-28 bg-[#FAFAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B21A8] mb-3">
            <span>Especialidades Clínicas</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Cuidado Individualizado & Pilates</span>
          </div>
          <h2 className="section-headline font-bold text-slate-950 text-balance tracking-tight mb-4">
            {t.specialties.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            {t.specialties.sectionSubtitle}
          </p>
        </div>

        {/* Interactive Segmented Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {t.specialties.items.map((service) => {
            const isActive = activeTab === service.id;
            const tabDisplayNames: Record<string, string> = {
              'reab-ortopedica-esportiva': 'Reabilitação Ortopédica e Esportiva',
              'pilates-clinico': 'Pilates Clínico',
              'prevencao-lesoes': 'Prevenção de Lesões e Longevidade',
              'recovery-muscular': 'Recovery de Alta Performance',
              'home-care': 'Home Care & Eventos',
            };

            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#6B21A8] text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-slate-900 border hairline-border hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-slate-400'}>
                  {tabIcons[service.id] || <Activity className="w-4 h-4" />}
                </span>
                <span>{tabDisplayNames[service.id] || service.title}</span>
                <span className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {service.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Service Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl p-6 sm:p-10 border hairline-border shadow-sm"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Details (7 cols on tablet & desktop, order-2 on mobile for immediate visual confirmation) */}
              <div className="md:col-span-7 flex flex-col justify-between order-2 md:order-1">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-3">
                    <span className="font-semibold text-[#6B21A8]">{currentService.badge}</span>
                    <span aria-hidden="true">·</span>
                    <span>Público: {currentService.audience}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-900 tracking-tight mb-3">
                    {currentService.title}
                  </h3>

                  {currentService.summary && (
                    <p className="text-sm font-semibold text-[#6B21A8] mb-4 bg-purple-50/70 p-3 rounded-xl border border-purple-100/90">
                      {currentService.summary}
                    </p>
                  )}

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                    {currentService.description}
                  </p>

                  {/* 3 Balõezinhos (Idosos & Longevidade, Atletas & Performance, Diagnóstico de Risco) */}
                  {'pills' in currentService && Array.isArray((currentService as any).pills) && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {((currentService as any).pills as { title: string; desc: string }[]).map((pill, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100/80 shadow-2xs flex flex-col justify-between"
                        >
                          <span className="inline-block text-[11px] font-bold text-[#6B21A8] uppercase tracking-wider mb-1">
                            {pill.title}
                          </span>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {pill.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Diagnóstico de Risco Callout (Prevenção) */}
                  {currentService.highlightBox && (
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                        <ShieldAlert className="w-4 h-4 text-amber-600" />
                        <span>{currentService.highlightBox.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {currentService.highlightBox.desc}
                      </p>
                    </div>
                  )}

                  {/* Fases Estruturadas (4 Etapas do Tratamento) */}
                  {'phases' in currentService && Array.isArray((currentService as any).phases) && (
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                        ETAPAS DO TRATAMENTO:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {((currentService as any).phases as { step: string; title: string; desc: string }[]).map((phase) => (
                          <div
                            key={phase.step}
                            className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex flex-col justify-start"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-purple-200/70 text-[#6B21A8]">
                                {phase.step}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900">
                                {phase.title}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {phase.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Techniques & Resources (Reabilitação e Recovery) */}
                  {currentService.techniques && (
                    <div className="pt-2 border-t border-slate-100 mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        {currentService.techTitle || 'TÉCNICAS E RECURSOS FÍSICOS:'}
                      </h4>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {currentService.techniques.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-purple-50/80 text-slate-700 px-3 py-1.5 rounded-lg border border-purple-100/80 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Benefits & Differentials (Pilates, Prevenção, Home Care) */}
                  {currentService.benefits && (
                    <div className="mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                        {currentService.methodTitle || 'Diferenciais do Método FisioPro:'}
                      </h4>
                      <ul className="space-y-2.5">
                        {currentService.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <span className="mt-0.5 w-4 h-4 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onSelectService(currentService.title)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#6B21A8] hover:bg-[#581C87] rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Entrar em contato sobre esta especialidade</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-500 text-center sm:text-left">
                    Atendimento particular com hora marcada no Umarizal
                  </span>
                </div>
              </div>

              {/* Right Column: Visual (5 cols on tablet & desktop, order-1 on mobile) */}
              <div className="md:col-span-5 flex flex-col order-1 md:order-2 gap-3.5 md:sticky md:top-24">
                <div className="relative rounded-2xl overflow-hidden hairline-border bg-slate-900 w-full aspect-[3/4] min-h-[440px] sm:min-h-[500px] shadow-md group">
                  {/* Full height 3:4 container showing complete photo without cropping */}
                  <img
                    src={imagesMap[currentService.id] || imagesMap['reab-ortopedica-esportiva']}
                    alt={currentService.title}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      imagePositionMap[currentService.id] || 'object-[center_20%]'
                    }`}
                    loading="eager"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white pointer-events-none z-20">
                    <p className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-0.5">
                      FisioPro · Belém
                    </p>
                    <p className="text-sm sm:text-base font-bold font-display leading-tight drop-shadow-sm">
                      {currentService.title}
                    </p>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {currentService.badge} · Cuidado individualizado
                    </p>
                  </div>
                </div>

                {/* Reassurance Strip below image */}
                <div className="hidden sm:flex p-3 rounded-xl bg-slate-50 border hairline-border items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Atendimento 1 a 1</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span>Hora Marcada</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-[#6B21A8] font-bold">Umarizal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
