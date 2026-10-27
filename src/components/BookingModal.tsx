import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { X, CheckCircle2, MessageCircle, Calendar, Send, ShieldCheck, HeartPulse } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedPainLevel?: number;
  preselectedComplaint?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedService,
  preselectedPainLevel,
  preselectedComplaint,
}: BookingModalProps) {
  const { t } = useLanguage();

  const [service, setService] = useState<string>(
    preselectedService || t.booking.serviceOptions[0]
  );
  const [painLevel, setPainLevel] = useState<number>(
    preselectedPainLevel !== undefined ? preselectedPainLevel : 5
  );
  const [complaint, setComplaint] = useState<string>(preselectedComplaint || '');
  const [preferredPeriod, setPreferredPeriod] = useState<'morning' | 'afternoon' | 'any'>('morning');
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (preselectedService) setService(preselectedService);
    if (preselectedPainLevel !== undefined) setPainLevel(preselectedPainLevel);
  }, [preselectedService, preselectedPainLevel]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage('Por favor, informe seu nome e telefone/WhatsApp.');
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
  };

  const getWhatsAppLink = () => {
    const periodText =
      preferredPeriod === 'morning'
        ? 'Manhã (07h às 12h)'
        : preferredPeriod === 'afternoon'
        ? 'Tarde (14h às 19h)'
        : 'Qualquer horário';

    const text = encodeURIComponent(
      `Olá! Gostaria de agendar um horário na FisioPro.\n\n` +
      `*Nome:* ${fullName || 'Não informado'}\n` +
      `*Telefone:* ${phone || 'Não informado'}\n` +
      `*Serviço:* ${service}\n` +
      `*Nível de dor:* ${painLevel}/10\n` +
      (complaint ? `*Queixa:* ${complaint}\n` : '') +
      `*Turno preferido:* ${periodText}\n` +
      (preferredDate ? `*Data sugerida:* ${preferredDate}\n` : '') +
      `\nPodem me informar a disponibilidade de horários?`
    );

    return `https://wa.me/5591991717181?text=${text}`;
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const getPainLabel = (val: number) => {
    if (val === 0) return '0 - Sem dor';
    if (val <= 3) return `${val} - Dor leve`;
    if (val <= 6) return `${val} - Dor moderada`;
    if (val <= 8) return `${val} - Dor intensa`;
    return `${val} - Dor extrema`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 border hairline-border overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B21A8]">
                FisioPro Umarizal · Belém
              </span>
              <h3 className="text-2xl font-bold font-display text-slate-900 mt-1">
                {t.booking.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                {t.booking.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  {t.booking.serviceLabel}
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                >
                  {t.booking.serviceOptions.map((opt, idx) => (
                    <option key={idx} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* PAIN LEVEL (0 to 10) - MANDATORY USER REQUEST */}
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-[#6B21A8]" />
                    <span>{t.booking.painLevelLabel}</span>
                  </label>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#6B21A8] shadow-xs border border-purple-200">
                    {getPainLabel(painLevel)}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={painLevel}
                  onChange={(e) => setPainLevel(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#6B21A8]"
                />

                <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-medium">
                  <span>0 (Sem dor)</span>
                  <span>5 (Moderada)</span>
                  <span>10 (Muito forte)</span>
                </div>
              </div>

              {/* Complaint Description */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  {t.booking.complaintLabel}
                </label>
                <input
                  type="text"
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  placeholder={t.booking.complaintPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                />
              </div>

              {/* Shift and Preferred Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    {t.booking.periodLabel}
                  </label>
                  <select
                    value={preferredPeriod}
                    onChange={(e) => setPreferredPeriod(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                  >
                    <option value="morning">{t.booking.periodOptions.morning}</option>
                    <option value="afternoon">{t.booking.periodOptions.afternoon}</option>
                    <option value="any">{t.booking.periodOptions.any}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    {t.booking.dateLabel}
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    {t.booking.fullNameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome"
                    className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    {t.booking.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(91) 99171-7181"
                    className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-lg bg-red-50 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-[#6B21A8] hover:bg-[#581C87] shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.booking.submitButton}</span>
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-[#16A34A] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.booking.directWhatsApp}</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation State */
          <div className="py-6 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-bold font-display text-slate-900 mb-2">
              {t.booking.successTitle}
            </h3>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
              {t.booking.successMessage}
            </p>

            <div className="w-full p-4 rounded-2xl bg-slate-50 border hairline-border text-left text-xs space-y-1.5 mb-6 text-slate-700">
              <p><strong>Paciente:</strong> {fullName}</p>
              <p><strong>Contato:</strong> {phone}</p>
              <p><strong>Serviço:</strong> {service}</p>
              <p><strong>Nível de dor informado:</strong> {painLevel}/10 ({getPainLabel(painLevel)})</p>
              <p><strong>Turno preferido:</strong> {preferredPeriod === 'morning' ? 'Manhã (07h às 12h)' : 'Tarde (14h às 19h)'}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer noopener"
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm text-white bg-[#16A34A] hover:bg-[#15803D] flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirmar agora no WhatsApp</span>
              </a>

              <button
                onClick={handleResetAndClose}
                className="py-3 px-5 rounded-xl font-medium text-xs sm:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
              >
                {t.booking.closeButton}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
