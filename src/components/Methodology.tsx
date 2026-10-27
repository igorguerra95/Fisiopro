import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { HeartHandshake, Sparkles, Smile, ShieldCheck, ArrowRight } from 'lucide-react';

interface MethodologyProps {
  onOpenBooking: () => void;
  onOpenTriage: () => void;
}

export function Methodology({ onOpenBooking, onOpenTriage }: MethodologyProps) {
  const { t } = useLanguage();

  const stepIcons = [
    <HeartHandshake className="w-5 h-5 text-[#6B21A8]" />,
    <Sparkles className="w-5 h-5 text-[#16A34A]" />,
    <Smile className="w-5 h-5 text-[#6B21A8]" />,
    <ShieldCheck className="w-5 h-5 text-[#16A34A]" />,
  ];

  return (
    <section id="metodo" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#16A34A] mb-3">
            <span>Passo a Passo</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Sem Complicação</span>
          </div>
          <h2 className="section-headline font-bold text-slate-950 text-balance tracking-tight mb-4">
            {t.howItWorks.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            {t.howItWorks.sectionSubtitle}
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {t.howItWorks.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#FAFAFB] border hairline-border card-elevation-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-[#6B21A8] font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white shadow-xs border hairline-border flex items-center justify-center">
                    {stepIcons[idx % stepIcons.length]}
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 text-[11px] font-semibold text-[#16A34A] flex items-center gap-1">
                <span>Foco na sua melhora</span>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2">
              Pronto para dar o primeiro passo rumo a uma vida sem dor com a nossa equipe FisioPro?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Faça nossa triagem rápida ou agende uma conversa acolhedora com a nossa equipe FisioPro no Umarizal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenTriage}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#6B21A8] hover:bg-[#581C87] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Fazer Triagem Online</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Falar com a Recepção</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
