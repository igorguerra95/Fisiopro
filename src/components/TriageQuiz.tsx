import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  RotateCcw, 
  MessageCircle, 
  Calendar,
  AlertCircle,
  Activity,
  Heart,
  Home,
  Dumbbell
} from 'lucide-react';

interface TriageQuizProps {
  onSelectRecommendedService: (serviceName: string, painLevel: number, complaint: string) => void;
}

export function TriageQuiz({ onSelectRecommendedService }: TriageQuizProps) {
  const { t } = useLanguage();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [complaint, setComplaint] = useState<string>('coluna');
  const [painLevel, setPainLevel] = useState<number>(5);
  const [duration, setDuration] = useState<string>('meses');
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  // Return color based on pain 0-10
  const getPainColor = (val: number) => {
    if (val === 0) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (val <= 3) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (val <= 6) return 'text-amber-700 bg-amber-50 border-amber-300';
    if (val <= 8) return 'text-orange-700 bg-orange-50 border-orange-300';
    return 'text-rose-700 bg-rose-50 border-rose-300';
  };

  const getPainBadgeText = (val: number) => {
    if (val === 0) return 'Sem dor';
    if (val <= 3) return 'Dor leve';
    if (val <= 6) return 'Dor moderada';
    if (val <= 8) return 'Dor intensa';
    return 'Dor extrema / severa';
  };

  // Recommendation logic
  const calculateRecommendation = () => {
    if (complaint === 'em_casa') {
      return {
        id: 'home-care',
        title: 'Fisioterapia no Conforto da sua Casa (Home Care)',
        badge: 'Atendimento Domiciliar',
        reason:
          'Como você precisa de cuidados sem sair de casa, levamos todos os aparelhos e o fisioterapeuta até seu domicílio para tratar sua recuperação com total segurança.',
        firstStep:
          'Avaliação cuidadosa do seu espaço e das suas limitações físicas, iniciando os movimentos de alívio no seu quarto ou sala.',
      };
    }

    if (complaint === 'fadiga_treino' && painLevel <= 4) {
      return {
        id: 'recovery-muscular',
        title: 'Recovery: Alívio Rápido do Cansaço Muscular',
        badge: 'Alívio & Descanso',
        reason:
          'Seu incômodo é decorrente do esforço físico e acúmulo de cansaço. As botas pneumáticas de compressão e massagem terapêutica vão drenar as pernas e acelerar a recuperação muscular.',
        firstStep:
          'Sessão relaxante de 30 a 50 minutos com botas de compressão sequencial e massagem nas regiões mais sobrecarregadas.',
      };
    }

    if (complaint === 'idoso_equilibrio' || (complaint === 'pos_cirurgia' && painLevel <= 3)) {
      return {
        id: 'prevencao-lesoes',
        title: 'Programa de Prevenção de Lesões e Longevidade',
        badge: 'Performance & Longevidade',
        reason:
          'Seu foco principal é ter firmeza nos passos, equilíbrio e autonomia. Nosso programa previne quedas, fortalece as articulações e identifica precocemente fatores de risco para garantir longevidade com qualidade.',
        firstStep:
          'Avaliação funcional e testes de equilíbrio e força, seguida de exercícios adaptados com segurança total.',
      };
    }

    if (painLevel >= 4 || complaint === 'pos_cirurgia' || complaint === 'articulacao') {
      return {
        id: 'reab-ortopedica-esportiva',
        title: 'Reabilitação Ortopédica e Esportiva',
        badge: 'Cuidado Exclusivo',
        reason:
          `Com dor nível ${painLevel}/10, o mais indicado é o tratamento com Reabilitação Ortopédica e Esportiva. Você terá atenção de um fisioterapeuta dedicado focado na melhora da dor, exercícios terapêuticos com progressão gradual e recuperação dos seus movimentos.`,
        firstStep:
          'Avaliação funcional e início dos cuidados para melhora da dor com terapia manual, exercícios terapêuticos e recursos modernos.',
      };
    }

    // Mild pain or posture focus -> Pilates Clínico
    return {
      id: 'pilates-clinico',
      title: 'Pilates Clínico',
      badge: 'Coluna, Postura & Bem-estar',
      reason:
        `Com dor nível ${painLevel}/10 e busca por melhora da postura, o Pilates Clínico em aparelhos completos é o caminho ideal para fortalecer o corpo e proteger sua coluna com acompanhamento profissional contínuo.`,
      firstStep:
        'Aula experimental em ambiente acolhedor, com acompanhamento exclusivo do fisioterapeuta para adaptar cada movimento às suas necessidades.',
    };
  };

  const recommendation = calculateRecommendation();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setHasFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setHasFinished(false);
  };

  const getWhatsAppMessage = () => {
    const text = encodeURIComponent(
      `Olá, FisioPro! Fiz a triagem no site e gostaria de agendar uma avaliação.\n\n` +
      `*Serviço indicado:* ${recommendation.title}\n` +
      `*Nível de dor:* ${painLevel}/10 (${getPainBadgeText(painLevel)})\n` +
      `*Principal queixa:* ${t.triage.step1Options.find((o) => o.id === complaint)?.label || complaint}\n` +
      `*Tempo do incômodo:* ${t.triage.step3Options.find((o) => o.id === duration)?.label || duration}\n\n` +
      `Quais os próximos horários disponíveis no Umarizal?`
    );
    return `https://wa.me/5591991717181?text=${text}`;
  };

  return (
    <section id="triagem" className="py-20 lg:py-24 bg-gradient-to-b from-white via-purple-50/30 to-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/80 text-[#6B21A8] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.triage.tag}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-950 tracking-tight mb-3">
            {t.triage.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
            {t.triage.subtitle}
          </p>
        </div>

        {/* Triage Container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border hairline-border shadow-md relative overflow-hidden">
          {!hasFinished ? (
            <div>
              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
                  <span>Passo {currentStep} de 3</span>
                  <span>{currentStep === 1 ? 'Queixa Principal' : currentStep === 2 ? 'Nível da Dor (0 a 10)' : 'Duração'}</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#6B21A8] h-full transition-all duration-300"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step 1: Complaint */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {t.triage.step1Title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Selecione a opção mais parecida com o que você está sentindo:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {t.triage.step1Options.map((opt) => {
                      const isSelected = complaint === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setComplaint(opt.id)}
                          className={`p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center gap-3.5 ${
                            isSelected
                              ? 'bg-purple-50/80 border-[#6B21A8] shadow-xs text-slate-900'
                              : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#6B21A8] text-white' : 'bg-white text-slate-400 border hairline-border'
                          }`}>
                            <CheckCircle2 className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-20'}`} />
                          </div>
                          <span className="text-xs sm:text-sm font-medium leading-snug">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Pain Level (0 to 10) - MANDATORY FROM USER */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                      {t.triage.step2Title}
                    </h3>
                    <span className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold border ${getPainColor(painLevel)}`}>
                      Nível {painLevel} · {getPainBadgeText(painLevel)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500 mb-8">
                    {t.triage.step2Subtitle}
                  </p>

                  {/* Big Number Selector & Slider */}
                  <div className="p-6 rounded-2xl bg-slate-50 border hairline-border mb-8">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-3">
                      <span>0 (Sem dor)</span>
                      <span>5 (Dor moderada)</span>
                      <span>10 (Dor insuportável)</span>
                    </div>

                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={painLevel}
                      onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
                      className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#6B21A8]"
                    />

                    {/* Quick Select Buttons 0 to 10 */}
                    <div className="grid grid-cols-11 gap-1.5 mt-6">
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                        const isSelected = painLevel === num;
                        return (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setPainLevel(num)}
                            className={`h-11 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                              isSelected
                                ? 'bg-[#6B21A8] text-white shadow-md scale-105'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border hairline-border'
                            }`}
                          >
                            {num}
                          </button>
                        );
                      })}
                    </div>

                    {/* Pain Explanation Callout */}
                    <div className="mt-5 p-3 rounded-xl bg-white border hairline-border text-xs text-slate-600">
                      <strong className="text-slate-900">Significado do seu nível: </strong>
                      {painLevel === 0 && t.triage.painLabels.zero}
                      {painLevel >= 1 && painLevel <= 3 && t.triage.painLabels.mild}
                      {painLevel >= 4 && painLevel <= 6 && t.triage.painLabels.moderate}
                      {painLevel >= 7 && painLevel <= 9 && t.triage.painLabels.severe}
                      {painLevel === 10 && t.triage.painLabels.extreme}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Duration */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                    {t.triage.step3Title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Isso nos ajuda a saber se o tratamento deve focar em alívio rápido ou reabilitação de longo prazo:
                  </p>

                  <div className="space-y-3 mb-8">
                    {t.triage.step3Options.map((opt) => {
                      const isSelected = duration === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDuration(opt.id)}
                          className={`w-full p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-purple-50/80 border-[#6B21A8] shadow-xs text-slate-900 font-semibold'
                              : 'bg-slate-50/60 border-slate-200/70 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <span className="text-xs sm:text-sm">{opt.label}</span>
                          <CheckCircle2 className={`w-5 h-5 shrink-0 ml-3 ${isSelected ? 'text-[#6B21A8]' : 'text-slate-300'}`} />
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#6B21A8] hover:bg-[#581C87] shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  <span>{currentStep === 3 ? 'Ver meu serviço ideal' : 'Continuar'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Result & Recommendation Screen */
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#16A34A] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  {t.triage.resultBadge}
                </span>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.triage.redoButton}</span>
                </button>
              </div>

              <div className="mb-6">
                <p className="text-xs text-slate-500 font-medium">
                  {t.triage.resultTitle}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-slate-950 mt-1 mb-2">
                  {recommendation.title}
                </h3>
                <div className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 text-[#6B21A8]">
                  <span>{recommendation.badge}</span>
                  <span>·</span>
                  <span>Dor informada: {painLevel}/10</span>
                </div>
              </div>

              {/* Explanations */}
              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-2xl bg-[#FAFAFB] border hairline-border">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                    {t.triage.whyRecommended}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {recommendation.reason}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#16A34A] mb-1.5">
                    {t.triage.firstSessionInfo}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {recommendation.firstStep}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppMessage()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex-1 py-3.5 px-5 rounded-xl font-semibold text-sm text-white bg-[#16A34A] hover:bg-[#15803D] shadow-md transition-all flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.triage.ctaWhatsApp}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    onSelectRecommendedService(recommendation.title, painLevel, complaint);
                  }}
                  className="flex-1 py-3.5 px-5 rounded-xl font-semibold text-sm text-white bg-[#6B21A8] hover:bg-[#581C87] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t.triage.ctaForm}</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
