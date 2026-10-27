import React from 'react';
import { MessageCircle } from 'lucide-react';

export function FloatingWhatsApp() {
  const phoneNumber = '5591991717181';
  const defaultMessage = encodeURIComponent(
    'Olá! Gostaria de mais informações sobre os atendimentos de Fisioterapia e Pilates Clínico na FisioPro.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group"
    >
      {/* Tooltip on desktop hover */}
      <div className="hidden sm:flex items-center px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-medium backdrop-blur-xs shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        <span>Fale no WhatsApp · (91) 99171-7181</span>
      </div>

      {/* Pulsing button container */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 active:scale-95"
        aria-label="Iniciar conversa com a FisioPro no WhatsApp"
      >
        {/* Subtle ripple wave */}
        <span className="absolute -inset-1 rounded-full bg-[#16A34A] opacity-25 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 text-white relative z-10" />
      </a>
    </aside>
  );
}
