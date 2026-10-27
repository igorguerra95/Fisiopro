import React from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';

import marinaAvatar from '../assets/images/avatar_marina_candid_1793051750085.jpg';
import lucasAvatar from '../assets/images/avatar_lucas_man_candid_1793051777405.jpg';
import teresaAvatar from '../assets/images/avatar_teresa_candid_1793051791916.jpg';

const avatarMap: Record<string, string> = {
  'test-1': marinaAvatar,
  'test-2': lucasAvatar,
  'test-3': teresaAvatar,
};

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B21A8] mb-3">
              <span>Avaliações Verificadas</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Google Meu Negócio</span>
            </div>
            <h2 className="section-headline font-bold text-slate-950 text-balance tracking-tight mb-4">
              {t.testimonials.sectionTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
              {t.testimonials.sectionSubtitle}
            </p>
          </div>

          <a
            href="https://www.google.com/search?q=fisiopro&oq=fisiopro#lrd=0x92a48dc841d2a923:0xedcccb6cd12f1b8c,1,,,,"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white border hairline-border shadow-xs hover:border-[#6B21A8] transition-all text-xs font-semibold text-slate-800 hover:text-[#6B21A8] shrink-0 self-start md:self-auto"
          >
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>5.0 no Google · Ver no Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.items.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-2xl bg-[#FAFAFB] border hairline-border flex flex-col justify-between card-elevation-hover"
            >
              <div>
                {/* 5 Stars + Google Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-md border hairline-border shadow-2xs">
                    Google Review
                  </span>
                </div>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic mb-6">
                  "{test.quote}"
                </p>

                {/* Outcome Callout */}
                <div className="p-3 rounded-xl bg-white border hairline-border mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A] mb-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Resultado Alcançado</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    {test.outcome}
                  </p>
                </div>
              </div>

              {/* Author footer with realistic thumbnail avatar */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-purple-100 shadow-xs bg-slate-100">
                  <img
                    src={avatarMap[test.id]}
                    alt={test.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {test.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {test.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
