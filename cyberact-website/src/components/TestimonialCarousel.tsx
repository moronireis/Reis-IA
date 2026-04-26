import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Conseguimos em pouco tempo monitorar todos os nossos imóveis com uma estratégia que nos economizou dinheiro e tempo.",
    name: "Alexandre",
    company: "Coelho da Fonseca"
  },
  {
    quote: "A equipe da CyberAct resolveu em uma semana o que tentamos resolver internamente por meses. Suporte rápido e sem enrolação.",
    name: "Ricardo M.",
    company: "Indústria Metalúrgica"
  },
  {
    quote: "Desde que terceirizamos a TI com a CyberAct, zero dor de cabeça. Resposta em minutos, não em dias. Outro nível.",
    name: "Fernanda S.",
    company: "Escritório de Advocacia"
  },
  {
    quote: "O projeto de rede ficou impecável. WiFi cobrindo cada canto do galpão, com garantia de 5 anos. Recomendo sem pensar.",
    name: "Carlos A.",
    company: "Logística e Distribuição"
  },
  {
    quote: "Depois do ransomware, achei que tínhamos perdido tudo. O backup da CyberAct restaurou em poucas horas. Salvou a empresa.",
    name: "Patrícia L.",
    company: "Clínica Médica"
  }
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setIsAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        {/* Quote icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mx-auto mb-6 md:mb-8" style={{ color: 'rgba(230, 57, 70, 0.3)' }}>
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" fill="currentColor"/>
        </svg>

        {/* Testimonial */}
        <div
          className="transition-all duration-400 ease-in-out"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateX(-30px)' : 'translateX(0)',
          }}
        >
          <blockquote className="text-base sm:text-xl md:text-2xl font-light leading-relaxed mb-6 md:mb-8 px-2" style={{ color: '#ffffff', minHeight: '4rem' }}>
            "{testimonials[current].quote}"
          </blockquote>
          <div>
            <p className="text-sm font-medium" style={{ color: '#ffffff' }}>{testimonials[current].name}</p>
            <p className="text-xs mt-1" style={{ color: '#a0a0a0' }}>{testimonials[current].company}</p>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAnimating(true); setTimeout(() => { setCurrent(i); setIsAnimating(false); }, 400); }}
              className="transition-all duration-300"
              style={{
                width: i === current ? '2rem' : '0.5rem',
                height: '0.5rem',
                backgroundColor: i === current ? '#e63946' : '#2a2a2a',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label={`Depoimento ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
