import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import heroClinicImg from '../assets/images/hero_physiotherapy_clinic_1792168104226.jpg';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenTriage: () => void;
}

export function Hero({ onOpenBooking, onOpenTriage }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section id="inicio" className="relative pt-16 pb-8 lg:pt-20 lg:pb-10 overflow-hidden">
      {/* Background Architectural Atmosphere */}
      <div className="absolute top-0 right-0 -z-10 w-[55vw] h-[55vw] max-w-[650px] max-h-[650px] bg-gradient-to-br from-[#6B21A8]/10 via-[#16A34A]/5 to-transparent rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 left-0 -z-10 w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] bg-gradient-to-tr from-[#16A34A]/8 via-purple-100/40 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 2-Column Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: Copy & Value Proposition (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Subtle editorial kicker */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#6B21A8] mb-2 sm:mb-2.5">
              <span>{t.brand.locationShort}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="hero-headline font-bold text-slate-950 text-balance tracking-tight mb-3">
              {t.hero.headlineStart}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B21A8] via-[#7E22CE] to-[#16A34A]">
                {t.hero.headlineHighlight}
              </span>
            </h1>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 leading-relaxed max-w-xl text-balance mb-4 sm:mb-5">
              {t.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-4 sm:mb-5">
              <button
                onClick={onOpenTriage}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-[#6B21A8] hover:bg-[#581C87] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group active:scale-[0.99]"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>{t.hero.ctaTriage}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-200 cursor-pointer shadow-xs hover:border-slate-300"
              >
                {t.hero.ctaPrimary}
              </button>
            </div>

            {/* Quiet credibility markers - unboxed metadata in human words */}
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 text-[11px] sm:text-xs font-medium text-slate-500 pt-2.5 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span>Fisioterapeuta exclusivo para você</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span>Turmas de Pilates com até 3 alunos</span>
              </div>
              <span aria-hidden="true" className="text-slate-300 hidden sm:inline">·</span>
              <div className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#6B21A8] shrink-0" />
                <span>Hora marcada no Umarizal</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Focal Carrier (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hairline-border bg-slate-900 aspect-[3/4] w-full max-w-[300px] sm:max-w-sm lg:max-w-[380px] mx-auto max-h-[380px] sm:max-h-[410px] lg:max-h-[430px] group">
              {/* Full height 3:4 container showing 100% of the reception photo */}
              <img
                src={heroClinicImg}
                alt="Instalações modernas e acolhedoras da clínica FisioPro em Belém"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="eager"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Minimal floating badges that do not block the photo */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                <div className="px-2.5 py-1.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-white/15 text-white shadow-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A] shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-100">
                    Umarizal · Belém
                  </span>
                </div>
                <div className="px-2.5 py-1 rounded-xl bg-white/90 backdrop-blur-md text-[#16A34A] text-[10px] sm:text-[11px] font-bold border border-emerald-100 shadow-sm">
                  Atendimento Exclusivo
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Column Strip below hero split - Clear words for patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 p-4 sm:p-5 bg-white rounded-2xl border hairline-border shadow-xs"
        >
          {t.hero.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                idx !== 0 ? 'md:border-l md:border-slate-100 md:pl-6' : ''
              }`}
            >
              <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-slate-800 mt-1">
                {stat.label}
              </span>
              <span className="text-xs text-slate-500 mt-0.5 leading-snug">
                {stat.detail}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
