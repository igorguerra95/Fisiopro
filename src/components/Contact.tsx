import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.tsx';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';

export function Contact() {
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(t.booking.serviceOptions[0]);
  const [painLevel, setPainLevel] = useState(5);
  const [period, setPeriod] = useState('morning');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      setSubmitted(true);
    }
  };

  const getWhatsAppDirectLink = () => {
    const shift = period === 'morning' ? 'Manhã (07h às 12h)' : 'Tarde (14h às 19h)';
    const text = encodeURIComponent(
      `Olá, FisioPro! Gostaria de agendar uma consulta.\n\n` +
      `*Nome:* ${name || 'Não informado'}\n` +
      `*Telefone:* ${phone || 'Não informado'}\n` +
      `*Serviço:* ${service}\n` +
      `*Nível de dor:* ${painLevel}/10\n` +
      `*Turno desejado:* ${shift}\n` +
      (message ? `*Mensagem:* ${message}\n` : '') +
      `\nQuais os próximos horários disponíveis?`
    );
    return `https://wa.me/5591991717181?text=${text}`;
  };

  const getPainDescription = (val: number) => {
    if (val === 0) return '0 - Sem dor';
    if (val <= 3) return `${val} - Leve`;
    if (val <= 6) return `${val} - Moderada`;
    if (val <= 8) return `${val} - Forte`;
    return `${val} - Extrema`;
  };

  return (
    <section id="contato" className="py-20 lg:py-28 bg-[#FAFAFB] border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B21A8] mb-3">
            <span>Fácil Acesso no Umarizal</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Belém - PA</span>
          </div>
          <h2 className="section-headline font-bold text-slate-950 text-balance tracking-tight mb-4">
            {t.contact.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed text-balance">
            {t.contact.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Location Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-white border hairline-border shadow-xs">
              <h3 className="text-lg font-bold font-display text-slate-900 mb-6">
                {t.contact.infoTitle}
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6B21A8] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.addressLabel}
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5 leading-snug">
                      {t.contact.addressValue}
                    </p>
                    <a
                      href="https://maps.google.com/?q=Av.+Alcindo+Cacela,+624+-+Umarizal,+Bel%C3%A9m+-+PA"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B21A8] hover:text-[#581C87] mt-2 transition-colors"
                    >
                      <span>{t.contact.mapCTA}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.phoneLabel}
                    </h4>
                    <p className="text-base font-bold text-slate-900 mt-0.5">
                      {t.contact.phoneValue}
                    </p>
                    <a
                      href="https://wa.me/5591991717181"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#16A34A] hover:text-[#15803D] mt-1 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Falar diretamente no WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#6B21A8] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.scheduleLabel}
                    </h4>
                    <p className="text-sm font-semibold text-slate-900 mt-0.5">
                      {t.contact.scheduleValue}
                    </p>
                  </div>
                </div>

                {/* Model */}
                <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {t.contact.modelLabel}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {t.contact.modelValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inline Lead Capture Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border hairline-border shadow-xs">
            {!submitted ? (
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900 mb-1">
                  {t.contact.formTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-6">
                  {t.contact.formSubtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome completo"
                        className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        WhatsApp com DDD *
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

                  {/* PAIN LEVEL 0 TO 10 IN INLINE FORM */}
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <HeartPulse className="w-4 h-4 text-[#6B21A8]" />
                        <span>Qual o seu nível de dor hoje? (De 0 a 10)</span>
                      </label>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white text-[#6B21A8] shadow-xs border border-purple-200">
                        {getPainDescription(painLevel)}
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

                    <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
                      <span>0 (Sem dor)</span>
                      <span>5 (Moderada)</span>
                      <span>10 (Muito forte)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Serviço Desejado
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

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                        Melhor Turno para Você
                      </label>
                      <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8]"
                      >
                        <option value="morning">Manhã (07h às 12h)</option>
                        <option value="afternoon">Tarde (14h às 19h)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                      Conte-nos brevemente o que está sentindo
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ex: Sinto dor na lombar ao levantar da cadeira; ou gostaria de conhecer o Pilates."
                      className="w-full px-3.5 py-2.5 rounded-xl border hairline-border bg-slate-50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B21A8]/20 focus:border-[#6B21A8] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-[#6B21A8] hover:bg-[#581C87] shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                    >
                      <Send className="w-4 h-4" />
                      <span>{t.nav.cta}</span>
                    </button>

                    <a
                      href={getWhatsAppDirectLink()}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="py-3.5 px-5 rounded-xl font-semibold text-sm text-[#16A34A] bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Direto</span>
                    </a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold font-display text-slate-900 mb-2">
                  Mensagem Enviada!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto mb-6 leading-relaxed">
                  Agradecemos seu contato. Nossa equipe da FisioPro entrará em contato em instantes pelo WhatsApp para sugerir os melhores horários.
                </p>

                <div className="flex gap-3">
                  <a
                    href={getWhatsAppDirectLink()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="py-2.5 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#16A34A] hover:bg-[#15803D] flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Abrir no WhatsApp</span>
                  </a>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                  >
                    Nova mensagem
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
