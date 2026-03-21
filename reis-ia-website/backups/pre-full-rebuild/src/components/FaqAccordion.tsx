import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

function ChevronDown({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
        color: isOpen ? 'var(--color-accent, #C9A84C)' : 'rgba(255,255,255,0.35)',
      }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <button
              className="w-full text-left py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 rounded-sm group"
              style={{ focusRingColor: 'rgba(201,168,76,0.2)' } as React.CSSProperties}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span
                className="text-base font-semibold pr-4 transition-colors duration-200"
                style={{ color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.85)' }}
              >
                {item.question}
              </span>
              <ChevronDown isOpen={isOpen} />
            </button>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              style={{
                maxHeight: isOpen ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 350ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms ease-out',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="pb-6">
                <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
