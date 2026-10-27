import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Clock, MapPin, Calendar, CheckCircle } from 'lucide-react';
import pilatesClinicoStudioImg from '../assets/images/pilates_clinico_studio_1793051447045.jpg';
import biomechanicalImg from '../assets/images/biomechanical_assessment_1792168105582.jpg';
import recoveryImg from '../assets/images/sports_rehab_recovery_1792168105679.jpg';

interface AboutProps {
  onOpenBooking: () => void;
}

const clinicSpaces = [
  {
    id: 'pilates',
    label: 'Pilates Clínico',
    tag: 'Estúdio Privativo',
    title: 'Aparelhos completos com turmas de até 3 alunos',
    image: pilatesClinicoStudioImg,
    alt: 'Estúdio aconchegante de Pilates FisioPro no Umarizal',
    position: 'object-[center_42%]',
  },
  {
    id: 'consultorio',
    label: 'Consultório & Reab',
    tag: 'Avaliação Individualizada',
    title: 'Ambiente exclusivo para diagnóstico biomecânico e alívio da dor',
    image: biomechanicalImg,
    alt: 'Consultório de Fisioterapia e Avaliação Biomecânica FisioPro',
    position: 'object-[center_20%]',
  },
  {
    id: 'recovery',
    label: 'Recovery & Bem-estar',
    tag: 'Tecnologia Avançada',
    title: 'Botas pneumáticas e recursos de ponta para regeneração',
    image: recoveryImg,
    alt: 'Espaço de Recovery e Recuperação Muscular FisioPro',
    position: 'object-[center_35%]',
  },
];

export function About({ onOpenBooking }: AboutProps) {
  const { t } = useLanguage();
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const currentSpace = clinicSpaces[activeSpaceIndex];

  return (
    <section id="sobre" className="py-20 lg:py-28 bg-[#FAFAFB] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Showcase of the Space (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Main Image with Full Height Framing matching the 3:4 photo without cropping */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg hairline-border bg-slate-900 aspect-[3/4] min-h-[420px] sm:min-h-[480px] w-full group">
              <img
                key={currentSpace.id}
                src={currentSpace.image}
                alt={currentSpace.alt}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${currentSpace.position}`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white z-20 pointer-events-none">
                <p className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider mb-0.5">
                  {currentSpace.tag}
                </p>
                <p className="text-xs sm:text-sm font-bold leading-snug drop-shadow-sm">
                  {currentSpace.title}
                </p>
              </div>
            </div>

            {/* Horizontal Thumbnails */}
            <div className="grid grid-cols-3 gap-2">
              {clinicSpaces.map((space, idx) => {
                const isActive = idx === activeSpaceIndex;
                return (
                  <button
                    key={space.id}
                    onClick={() => setActiveSpaceIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] transition-all cursor-pointer border ${
                      isActive
                        ? 'ring-2 ring-[#6B21A8] border-transparent shadow-xs scale-[1.02]'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={space.image}
                      alt={space.label}
                      className={`w-full h-full object-cover ${space.position}`}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 flex items-end p-1.5">
                      <span className="text-[10px] font-semibold text-white leading-tight truncate">
                        {space.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Clinic Schedule and Location Card */}
            <div className="p-6 rounded-2xl bg-white border hairline-border shadow-xs">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-[#6B21A8] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {t.about.scheduleCard.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.about.scheduleCard.days}
                  </p>
                  <p className="text-sm font-semibold text-[#6B21A8] mt-1 leading-snug">
                    {t.about.scheduleCard.shifts}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Endereço
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {t.about.scheduleCard.address}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 leading-snug">
                {t.about.scheduleCard.note}
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B21A8] mb-3">
              <span>Sobre a FisioPro</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Cuidado Humanizado</span>
            </div>

            <h2 className="section-headline font-bold text-slate-950 text-balance tracking-tight mb-6">
              {t.about.sectionTitle}
            </h2>

            <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed mb-4 text-balance">
              {t.about.storyParagraph1}
            </p>

            <p className="text-base text-slate-600 leading-relaxed mb-8 text-balance">
              {t.about.storyParagraph2}
            </p>

            {/* Features List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {t.about.features.map((feat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border hairline-border">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <h4 className="text-sm font-bold text-slate-900">
                      {feat.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#6B21A8] hover:bg-[#581C87] rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar uma Conversa ou Avaliação</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
